
// Declare Deno to resolve "Cannot find name 'Deno'" errors in the TypeScript execution context
declare const Deno: any;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { AccessToken } from "https://esm.sh/livekit-server-sdk@1.2.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Use Deno.serve to handle incoming requests in Supabase Edge Functions
Deno.serve(async (req) => {
  // 1. Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Initialize Supabase Client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 3. Parse Request Body safely - NOW EXPECTING node_id
    const { user_id, node_id } = await req.json();
    if (!user_id || !node_id) {
      throw new Error("Missing user_id or node_id in request body");
    }

    // 4. Quota Check (Voice Fuel) for SPECIFIC NODE
    const { data: node, error: dbError } = await supabase
      .from("teammate_node")
      .select("*")
      .eq("node_id", node_id)
      .eq("user_id", user_id)
      .single();

    if (dbError || !node) {
      return new Response(JSON.stringify({ error: "Specific node not found in your fleet" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (node.is_suspended) {
      return new Response(JSON.stringify({ error: "Node suspended for security violations." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Enforce 1000-minute limit
    const voiceEnabled = (node.voice_fuel_minutes || 0) < 1000;

    // 5. Key Vending: Generate Scoped LiveKit Token
    const livekitKey = Deno.env.get("LIVEKIT_API_KEY");
    const livekitSecret = Deno.env.get("LIVEKIT_API_SECRET");
    let scopedVoiceToken = "";

    // Only generate token if voice is enabled and keys exist
    if (voiceEnabled && livekitKey && livekitSecret) {
      // Identity updated to node_id to prevent collisions with other user nodes
      const at = new AccessToken(livekitKey, livekitSecret, {
        identity: `agent_${node_id}`,
        ttl: 3600, // Token valid for 1 hour
      });
      
      // Grant permissions for the node's specific room scope
      at.addGrant({
        roomJoin: true,
        room: `room_${node_id}`,
        canPublish: true,
        canSubscribe: true,
      });
      scopedVoiceToken = await at.toJwt();
    }

    // 6. Deploy Neural Mesh Container via Railway GraphQL API
    const railwayToken = Deno.env.get("RAILWAY_API_TOKEN");
    const railwayServiceId = Deno.env.get("RAILWAY_SERVICE_ID");

    if (!railwayToken || !railwayServiceId) {
      console.warn("Railway config missing - skipping deployment trigger");
    } else {
      const railwayMutation = `
        mutation deploymentCreate($input: DeploymentCreateInput!) {
          deploymentCreate(input: $input) { id status }
        }`;

      const variables = {
        input: {
          serviceId: railwayServiceId,
          variables: {
            LETTA_AGENT_ID: node.neural_id || "new-auto-gen",
            TELEGRAM_DM_POLICY: "pairing", 
            LIVEKIT_API_KEY: livekitKey,
            LIVEKIT_API_SECRET: livekitSecret,
            LIVEKIT_URL: voiceEnabled ? Deno.env.get("LIVEKIT_URL") : "DISABLED",
            SUPABASE_URL: Deno.env.get("SUPABASE_URL"),
            SUPABASE_KEY: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), 
            USER_ID: user_id,
            NODE_ID: node_id, // Pass node identifier to container
          },
        },
      };

      // Call Railway API
      const railwayResponse = await fetch("https://backboard.railway.app/graphql/v2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${railwayToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: railwayMutation, variables }),
      });

      if (!railwayResponse.ok) {
        const errText = await railwayResponse.text();
        throw new Error(`Railway API Error: ${errText}`);
      }
    }

    // 7. Return Success
    return new Response(JSON.stringify({ 
      success: true, 
      node_id: node_id,
      voice_enabled: voiceEnabled,
      voice_token: scopedVoiceToken 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
