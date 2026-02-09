const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const USER_ID = process.env.USER_ID;
const NODE_ID = process.env.NODE_ID;
const LETTA_BASE_URL = process.env.LETTA_BASE_URL || 'http://127.0.0.1:8283';
const LETTA_AGENT_ID_ENV = process.env.LETTA_AGENT_ID;
const LETTA_MODEL = process.env.LETTA_MODEL || 'openai/gpt-4o-mini';
const LETTA_EMBEDDING = process.env.LETTA_EMBEDDING || 'openai/text-embedding-3-small';
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 2000);
const LETTA_AUTH_TOKEN = process.env.LETTA_AUTH_TOKEN;

if (!SUPABASE_URL || !SUPABASE_KEY || !USER_ID) {
  console.error('Missing SUPABASE_URL, SUPABASE_KEY, or USER_ID');
  process.exit(1);
}

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

const lettaHeaders = {
  'Content-Type': 'application/json',
  ...(LETTA_AUTH_TOKEN ? { Authorization: `Bearer ${LETTA_AUTH_TOKEN}` } : {})
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const parseAssistantMessage = (response) => {
  const messages = response?.messages || [];
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    const type = msg?.message_type || msg?.role;
    if (type && String(type).toLowerCase().includes('assistant')) {
      if (typeof msg.content === 'string') return msg.content;
      if (Array.isArray(msg.content)) {
        return msg.content.map((c) => c.text || '').join('\n').trim();
      }
    }
  }
  return null;
};

const waitForServer = async () => {
  const healthUrl = `${LETTA_BASE_URL}/v1/health`;
  for (let i = 0; i < 30; i += 1) {
    try {
      const res = await fetch(healthUrl);
      if (res.ok) return true;
    } catch (_e) {
      // ignore
    }
    await sleep(1000);
  }
  return false;
};

const ensureAgent = async () => {
  if (LETTA_AGENT_ID_ENV) return LETTA_AGENT_ID_ENV;

  const res = await fetch(`${LETTA_BASE_URL}/v1/agents/`, {
    method: 'POST',
    headers: lettaHeaders,
    body: JSON.stringify({
      name: `TeamStrength Node ${NODE_ID || USER_ID}`,
      model: LETTA_MODEL,
      embedding: LETTA_EMBEDDING,
      memory_blocks: [
        { label: 'human', value: `User ID: ${USER_ID}` },
        { label: 'persona', value: 'You are TeamStrength, a compliant, helpful AI teammate.' }
      ]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create agent: ${text}`);
  }
  const data = await res.json();
  const agentId = data?.id;
  if (!agentId) throw new Error('Agent ID missing from response');

  // persist agent id to Supabase
  if (NODE_ID) {
    await fetch(`${SUPABASE_URL}/rest/v1/teammate_node?node_id=eq.${NODE_ID}`, {
      method: 'PATCH',
      headers: supabaseHeaders,
      body: JSON.stringify({ neural_id: agentId })
    });
  }

  return agentId;
};

const sendToAgent = async (agentId, text) => {
  const res = await fetch(`${LETTA_BASE_URL}/v1/agents/${agentId}/messages`, {
    method: 'POST',
    headers: lettaHeaders,
    body: JSON.stringify({ input: text })
  });
  const data = await res.json();
  const reply = parseAssistantMessage(data);
  return reply || 'ACK';
};

const markRead = async (id) => {
  await fetch(`${SUPABASE_URL}/rest/v1/web_chat_buffer?id=eq.${id}`, {
    method: 'PATCH',
    headers: supabaseHeaders,
    body: JSON.stringify({ is_read: true })
  });
};

const insertOutbound = async (content) => {
  const payload = {
    user_id: USER_ID,
    direction: 'outbound',
    content,
    is_read: false,
    ...(NODE_ID ? { node_id: NODE_ID } : {})
  };
  await fetch(`${SUPABASE_URL}/rest/v1/web_chat_buffer`, {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify(payload)
  });
};

const pollLoop = async () => {
  const ready = await waitForServer();
  if (!ready) throw new Error('Letta server not reachable');

  const agentId = await ensureAgent();
  console.log(`Relay online. Agent: ${agentId}`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const url = `${SUPABASE_URL}/rest/v1/web_chat_buffer?user_id=eq.${USER_ID}&direction=eq.inbound&is_read=eq.false&order=created_at.asc&select=id,content,created_at`;
      const res = await fetch(url, { headers: supabaseHeaders });
      const messages = await res.json();

      if (Array.isArray(messages) && messages.length > 0) {
        for (const msg of messages) {
          const reply = await sendToAgent(agentId, msg.content);
          await insertOutbound(reply);
          await markRead(msg.id);
        }
      }
    } catch (err) {
      console.error('Relay error:', err?.message || err);
    }
    await sleep(POLL_INTERVAL_MS);
  }
};

pollLoop().catch((err) => {
  console.error('Fatal relay error:', err?.message || err);
  process.exit(1);
});
