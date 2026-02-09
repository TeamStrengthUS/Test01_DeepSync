# TeamStrength DeepSync — Handoff (2026‑02‑09)

## Repo
- GitHub: https://github.com/TeamStrengthUS/Test01_DeepSync
- Local path used during work: `/Users/christopheranderson/Downloads/Test01_DeepSync-main`

## Scope decisions (confirmed)
- **MVP**: Supabase + Railway, Web + Telegram + LiveKit voice.
- **Phase 2**: Slack + WhatsApp + SIP phone number assignment.
- **Billing**: Stripe.
- **Letta/LettaBot runtime**: Not set up yet; needs execution + plan.

## Current state (what’s implemented)

### ✅ Supabase schema + provisioning
- Consolidated schema to make `teammate_node.node_id` the **primary key** and added fleet fields.
- Added required extensions:
  - `pgcrypto` (UUID)
  - `vector` (pgvector)
- Added **auth trigger** to auto‑create:
  - default `subscriptions` row
  - initial `teammate_node` row on signup
- Fixed conflicting migrations so they no longer fight over PKs.
- Updated fleet limit trigger to use `tier_definitions`.

**Files:**
- `supabase/migrations/20240101_init_deepsync.sql`
- `supabase/migrations/20260207_commercial_layer.sql`
- `supabase/migrations/20260207_multi_agent.sql`
- `supabase/migrations/20260209_provisioning.sql` (new)

### ✅ Dispatcher updates
- The Edge Function now **stores the Railway deployment ID** in `teammate_node.mesh_container_id` after deployment.

**File:**
- `supabase/functions/dispatcher/index.ts`

### ✅ Overwatch kill switch (Edge Function)
- New `overwatch` function updates `teammate_node.is_suspended` and stops Railway deployment when available.
- Requires `SUPABASE_ANON_KEY` + `RAILWAY_API_TOKEN` in Supabase secrets.

**File:**
- `supabase/functions/overwatch/index.ts`

### ✅ Frontend auth + Supabase wiring
- Added shared Supabase client at `lib/supabaseClient.ts`.
- Added `vite-env.d.ts`.
- Replaced mocked auth in `App.tsx` with real Supabase session handling.
- `Landing.tsx` Auth component now uses shared client and correct HashRouter redirect.
- `Login.tsx` and `Register.tsx` now actually call Supabase (email/password + OAuth).
- `NeuralLink.tsx` now subscribes to real `web_chat_buffer` by user_id.
- `NeuralLink.tsx` now includes `node_id` in inbound inserts when available.
- `SubscriptionMatrix.tsx` uses real Supabase client.
- `AgenticLayer.tsx` now:
  - loads user + node + tier limits from Supabase
  - calls `dispatcher` edge function
  - triggers kill switch by updating `teammate_node.is_suspended`

**Files:**
- `lib/supabaseClient.ts` (new)
- `vite-env.d.ts` (new)
- `App.tsx`
- `pages/Landing.tsx`
- `pages/Login.tsx`
- `pages/Register.tsx`
- `components/NeuralLink.tsx`
- `components/SubscriptionMatrix.tsx`
- `pages/AgenticLayer.tsx`

### ✅ Omni‑node scaffold (Railway template)
- Created minimal `omni-node/package.json`.
- Moved `letta_skills/` into `omni-node/letta_skills/` so Docker build sees it.
- `run_wrapper.js` now checks for missing `LETTA_AGENT_ID`.
- Added `relay_worker.js` to bridge Supabase chat buffer with Letta server.
- Added `start.sh` to launch `letta server` + relay worker.
- Omni-node Dockerfile now installs Letta via pip and uses `start.sh`.

**Files:**
- `omni-node/package.json` (new)
- `omni-node/run_wrapper.js` (updated)
- `omni-node/relay_worker.js` (new)
- `omni-node/start.sh` (new)
- `scripts/register_skill.ts` (path updated)

### ✅ Railway + docs updates
- `railway.toml` now deploys **Vite frontend** instead of missing Django backend.
- Added `.env.example`.
- Updated `README.md` with local dev instructions.
- Updated `docs/DEPLOYMENT.md` with required secrets and new Vite vars.
- Updated `scripts/init_secrets.sh` to set `VITE_SUPABASE_*`.

**Files:**
- `railway.toml`
- `.env.example`
- `README.md`
- `docs/DEPLOYMENT.md`
- `scripts/init_secrets.sh`

## Known gaps / risks
1. **Letta runtime not implemented**  
   - `lettabot` binary is expected in `omni-node` but not provided.
   - Need to decide actual Letta/LettaBot image or install strategy.

2. **Kill switch only flips DB flag**  
   - It does **not** call Railway directly yet.  
   - There is a Django signal stub in `backend/` but no backend runtime.

3. **LiveKit usage accounting not built**  
   - No webhook or session tracking for `voice_fuel_minutes`.

4. **Stripe not integrated**  
   - DB has placeholders for payment links and tier defs, but no Stripe webhook handler yet.

5. **Slack/WhatsApp + SIP**  
   - UI exists, but backend integration is not started (Phase 2).

## Next steps (recommended)
### Phase 1.5 — Make MVP actually runnable
1. **Implement Letta/LettaBot runtime**  
   - Decide base image and install flow for `lettabot`.
   - Ensure `omni-node` can boot with environment variables from `dispatcher`.

2. **Add kill‑switch backend**  
   - Use Supabase Edge Function or a small backend service to call Railway API when `is_suspended` flips.

3. **Add LiveKit usage tracking**  
   - Store active session minutes in `teammate_node.voice_fuel_minutes`.

### Phase 2 — Billing & scaling
- Stripe Checkout + webhook handling.
- Slack/WhatsApp integration.
- SIP number assignment.

## Commands needed for setup (no secrets)
```bash
cp .env.example .env
```

```bash
supabase db push
```

```bash
supabase functions deploy dispatcher
supabase functions deploy overwatch
```

```bash
npm install
npm run dev
```

## Environment variables (placeholders)
**Frontend (Railway agentic-layer + local `.env`):**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Supabase Edge Function secrets (dispatcher):**
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_URL`
- `RAILWAY_API_TOKEN`
- `RAILWAY_SERVICE_ID`

**Omni-node runtime env (injected by dispatcher/Railway):**
- `SUPABASE_URL`
- `SUPABASE_KEY` (service role)
- `USER_ID`
- `NODE_ID`
- `OPENAI_API_KEY` (required by Letta server)
- Optional: `LETTA_BASE_URL`, `LETTA_MODEL`, `LETTA_EMBEDDING`, `POLL_INTERVAL_MS`

## Key files to inspect first
- `supabase/functions/dispatcher/index.ts`
- `pages/AgenticLayer.tsx`
- `components/NeuralLink.tsx`
- `omni-node/Dockerfile`
- `omni-node/run_wrapper.js`
- `railway.toml`
