
declare const Deno: any;
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { AccessToken } from "https://esm.sh/livekit-server-sdk@1.2.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { user_id, node_id } = await req.json();
    
    // 1. Resolve Tier Limits
    const { data: sub } = await supabase.from('subscriptions').select('tier').eq('user_id', user_id).single();
    const tierId = sub?.tier ?? 'scout_free';
    const { data: tier } = await supabase.from('tier_definitions').select('*').eq('tier_id', tierId).single();

    // 2. Resource Validation
    const { data: node } = await supabase.from('teammate_node').select('*').eq('node_id', node_id).single();
    if (node?.is_suspended) throw new Error("NODE_SUSPENDED");

    const fuelLimit = tier?.voice_fuel_cap ?? 1000;
    const voiceEnabled = fuelLimit === -1 || (node?.voice_fuel_minutes ?? 0) < fuelLimit;

    // 3. LiveKit Token Vending
    const lkKey = Deno.env.get('LIVEKIT_API_KEY');
    const lkSecret = Deno.env.get('LIVEKIT_API_SECRET');
    let voiceToken = "";

    if (voiceEnabled && lkKey && lkSecret) {
      const at = new AccessToken(lkKey, lkSecret, {
        identity: `agent_${node_id}`,
        ttl: 3600 * 24, // 24hr session
      });
      at.addGrant({ roomJoin: true, room: `room_${node_id}`, canPublish: true, canSubscribe: true });
      voiceToken = await at.toJwt();
    }

    // 4. Railway Deployment Ingress
    const railwayToken = Deno.env.get('RAILWAY_API_TOKEN');
    const railwayServiceId = Deno.env.get('RAILWAY_SERVICE_ID');

    if (railwayToken && railwayServiceId) {
      const mutation = `mutation deploymentCreate($input: DeploymentCreateInput!) { deploymentCreate(input: $input) { id } }`;
      const variables = {
        input: {
          serviceId: railwayServiceId,
          variables: {
            OPENAI_API_KEY: Deno.env.get('OPENAI_API_KEY'),
            SUPABASE_URL: Deno.env.get('SUPABASE_URL'),
            SUPABASE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
            USER_ID: user_id,
            NODE_ID: node_id,
            LIVEKIT_URL: Deno.env.get('LIVEKIT_URL'),
            LIVEKIT_API_KEY: lkKey,
            LIVEKIT_API_SECRET: lkSecret,
            LETTA_AGENT_ID: node?.neural_id || "pending"
          }
        }
      };

      const res = await fetch("https://backboard.railway.app/graphql/v2", {
        method: "POST",
        headers: { "Authorization": `Bearer ${railwayToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables })
      });
      const json = await res.json();
      const depId = json?.data?.deploymentCreate?.id;

      if (depId) {
        await supabase.from('teammate_node').update({ mesh_container_id: depId }).eq('node_id', node_id);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      voice_token: voiceToken, 
      voice_enabled: voiceEnabled 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
