
declare const Deno: any;
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    const { event, participant, room } = body;

    // Filter for TeamStrength Agents
    if (participant?.identity?.startsWith('agent_')) {
      const nodeId = participant.identity.replace('agent_', '');

      if (event === 'participant_joined') {
        // Log entry in Vault
        await supabase.from('voice_sessions').insert({
          node_id: nodeId,
          participant_identity: participant.identity,
          room_name: room?.name,
          started_at: new Date().toISOString(),
        });
        console.log(`[FUEL] Session started for Node: ${nodeId}`);
      } else if (event === 'participant_left') {
        // Find active session to calculate delta
        const { data: session } = await supabase
          .from('voice_sessions')
          .select('*')
          .eq('node_id', nodeId)
          .eq('participant_identity', participant.identity)
          .is('ended_at', null)
          .order('started_at', { ascending: false })
          .limit(1)
          .single();

        if (session) {
          const endedAt = new Date();
          const startedAt = new Date(session.started_at);
          const durationSec = Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000);
          const durationMin = durationSec / 60;

          // Update Vault records
          await supabase.from('voice_sessions').update({
            ended_at: endedAt.toISOString(),
            duration_seconds: durationSec
          }).eq('id', session.id);

          // Atomic deduction via RPC
          await supabase.rpc('increment_voice_fuel', {
            p_node_id: nodeId,
            p_minutes: durationMin
          });
          
          console.log(`[FUEL] Session ended. Node ${nodeId} consumed ${durationMin.toFixed(2)} mins.`);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error("[LIVEKIT_WEBHOOK_ERROR]", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
