
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
    const { message } = body;

    if (message && message.text) {
      const chatId = message.chat.id.toString();
      
      // Attempt to find the node paired with this Telegram Chat ID
      // We look in channel_config for 'telegram_chat_id'
      const { data: node } = await supabase
        .from('teammate_node')
        .select('user_id, node_id')
        .contains('channel_config', { telegram_chat_id: chatId })
        .single();

      if (node) {
        // Push to buffer for Omni-Node to ingest
        await supabase.from('web_chat_buffer').insert({
          user_id: node.user_id,
          node_id: node.node_id,
          direction: 'inbound',
          content: message.text,
          is_read: false
        });
        console.log(`[TELEGRAM] Routed message from ${chatId} to Node ${node.node_id}`);
      } else {
        // Handle Pairing Sequence
        if (message.text.includes('-')) {
          const code = message.text.trim();
          // Verify code and pair (Simplified logic for now)
          console.log(`[TELEGRAM] Unrecognized chat ${chatId} sent pairing attempt: ${code}`);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
