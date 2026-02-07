// Fix: Declare Deno as a global constant to satisfy TypeScript compilers that are not aware of the Deno runtime environment.
declare const Deno: any;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"
import { AccessToken } from "https://esm.sh/livekit-server-sdk@1.2.7"

const RAILWAY_API_TOKEN = Deno.env.get('RAILWAY_API_TOKEN')
const LIVEKIT_API_KEY = Deno.env.get('LIVEKIT_API_KEY')
const LIVEKIT_API_SECRET = Deno.env.get('LIVEKIT_API_SECRET')

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { user_id, requested_skills } = await req.json()

  // 1. Quota Check (Voice Fuel)
  const { data: node } = await supabase
    .from('teammate_node')
    .select('*')
    .eq('user_id', user_id)
    .single()

  if (node.is_suspended) {
    return new Response(JSON.stringify({ error: "Node suspended for security violations." }), { status: 403 })
  }

  // Enforce 1000-minute limit
  const voiceEnabled = node.voice_fuel_minutes < 1000

  // 2. Key Vending: Generate Scoped LiveKit Token
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: `agent_${user_id}`,
  })
  at.addGrant({ roomJoin: true, room: `room_${user_id}`, canPublish: voiceEnabled, canSubscribe: true })
  const scopedVoiceToken = at.toJwt()

  // 3. Deploy Neural Mesh Container via Railway
  const railwayMutation = `
    mutation deploymentCreate($input: DeploymentCreateInput!) {
      deploymentCreate(input: $input) { id status }
    }`

  const variables = {
    input: {
      serviceId: Deno.env.get('RAILWAY_SERVICE_ID'),
      variables: {
        LETTA_AGENT_ID: node.neural_id || "new-auto-gen",
        TELEGRAM_DM_POLICY: "pairing",
        LIVEKIT_API_KEY: LIVEKIT_API_KEY,
        LIVEKIT_API_SECRET: LIVEKIT_API_SECRET,
        LIVEKIT_URL: voiceEnabled ? Deno.env.get('LIVEKIT_URL') : "DISABLED",
        SUPABASE_URL: Deno.env.get('SUPABASE_URL'),
        SUPABASE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
        USER_ID: user_id
      }
    }
  }

  const response = await fetch("https://backboard.railway.app/graphql/v2", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RAILWAY_API_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: railwayMutation, variables })
  })

  return new Response(await response.text(), { headers: { "Content-Type": "application/json" } })
})