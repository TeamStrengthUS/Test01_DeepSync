
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

    // 3. Parse Request Body safely
    const { user_id, node_id } = await req.json();
    if (!user_id || !node_id) {
      throw new Error("Missing user_id or node_id in request body");
    }

    // 4. DYNAMIC TIER LOOKUP SEQUENCE
    // Step A: Fetch User Subscription Tier
    const { data: subData, error: subError } = await supabase
      .from("subscriptions")
      .select("tier")
      .eq("user_id", user_id)
      .single();

    const currentTierId = (subError || !subData) ? 'scout_free' : subData.tier;

    // Step B: Fetch Tier Resource Definitions
    const { data: tierDef, error: tierError } = await supabase
      .from("tier_definitions")
      .select("voice_fuel_cap, node_limit")
      .eq("tier_id", currentTierId)
      .single();

    if (tierError || !tierDef) {
      throw new Error(`Failed to resolve tier definitions for: ${currentTierId}`);
    }

    // Step C: Fetch Node Usage from Neural Fleet
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

    // 5. QUOTA ENFORCEMENT LOGIC (Dynamic)
    const limit = tierDef.voice_fuel_cap;
    // Convention: -1 is Unlimited. Otherwise, check current usage against cap.
    const voiceEnabled = limit === -1 || (node.voice_fuel_minutes || 0) < limit;

    // 6. Key Vending: Generate Scoped LiveKit Token
    const livekitKey = Deno.env.get("LIVEKIT_API_KEY");
    const livekitSecret = Deno.env.get("LIVEKIT_API_SECRET");
    let scopedVoiceToken = "";

    if (voiceEnabled && livekitKey && livekitSecret) {
      const at = new AccessToken(livekitKey, livekitSecret, {
        identity: `agent_${node_id}`,
        ttl: 3600,
      });
      
      at.addGrant({
        roomJoin: true,
        room: `room_${node_id}`,
        canPublish: true,
        canSubscribe: true,
      });
      scopedVoiceToken = await at.toJwt();
    }

    // 7. Deploy Neural Mesh Container via Railway GraphQL API
    const railwayToken = Deno.env.get("RAILWAY_API_TOKEN");
    const railwayServiceId = Deno.env.get("RAILWAY_SERVICE_ID");

    if (railwayToken && railwayServiceId) {
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
            NODE_ID: node_id,
            TIER_ID: currentTierId,
          },
        },
      };

      await fetch("https://backboard.railway.app/graphql/v2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${railwayToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: railwayMutation, variables }),
      });
    }

    // 8. Return Success with Context
    return new Response(JSON.stringify({ 
      success: true, 
      node_id: node_id,
      tier: currentTierId,
      voice_enabled: voiceEnabled,
      voice_fuel_limit: limit,
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
