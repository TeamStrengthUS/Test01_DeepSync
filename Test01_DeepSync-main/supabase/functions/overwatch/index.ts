// Declare Deno to resolve "Cannot find name 'Deno'" errors in the TypeScript execution context
declare const Deno: any;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { node_id } = await req.json();
    if (!node_id) {
      throw new Error("Missing node_id in request body");
    }

    const { data: node, error: nodeError } = await supabase
      .from("teammate_node")
      .select("node_id, user_id, mesh_container_id")
      .eq("node_id", node_id)
      .eq("user_id", userData.user.id)
      .single();

    if (nodeError || !node) {
      return new Response(JSON.stringify({ error: "Node not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { error: updateError } = await supabase
      .from("teammate_node")
      .update({ is_suspended: true })
      .eq("node_id", node_id)
      .eq("user_id", userData.user.id);

    if (updateError) {
      throw updateError;
    }

    const railwayToken = Deno.env.get("RAILWAY_API_TOKEN");
    if (railwayToken && node.mesh_container_id) {
      const mutation = `
        mutation deploymentStop($id: String!) {
          deploymentStop(id: $id)
        }`;

      await fetch("https://backboard.railway.app/graphql/v2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${railwayToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation, variables: { id: node.mesh_container_id } }),
      });
    }

    return new Response(JSON.stringify({ success: true, node_id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
