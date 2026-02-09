# TeamStrength | Premium Team Analytics & Agentic Operations

TeamStrength is a high-performance, AI-native SaaS platform designed for distributed team intelligence and autonomous operations. Built on a "Privacy-First" architecture, it bridges the gap between raw telemetry and actionable team wisdom.

## System Architecture & Nomenclature

The TeamStrength platform operates on a specialized technical stack mapped to our strategic nomenclature.

### 1. The Omni-Node (Agent Runtime)
**Powered by: Letta (formerly MemGPT) + Docker + Railway**

The "Omni-Node" is the primary execution environment for your autonomous agents. 
- **LettaBot Core:** Every node runs a customized Docker container utilizing Letta for long-term memory management and tool-use precision.
- **Outbound-Only Networking:** For maximum security, nodes utilize **Reverse Websockets**. There are no open inbound ports; the node establishes a secure egress connection to the Neural Mesh.
- **Credential Sidecar:** A background process (`sync_sessions.js`) monitors the node's filesystem to persist WhatsApp/Signal session tokens into the **DeepSync Vault** (Supabase Storage), allowing for seamless node migrations and recovery.

### 2. DeepSync Vault (The Brain)
**Powered by: Supabase (PostgreSQL + pgvector)**

The "DeepSync Vault" is the persistence layer where state, memory shards, and user identity are secured.
- **Row Level Security (RLS):** We enforce absolute data sovereignty. RLS policies ensure that agent memories are cryptographically isolated and only accessible to the authorized human operator.
- **Vector Sharding:** High-dimensional embeddings are stored and queried within the Vault to provide agents with sub-second context retrieval.

### 3. Neural Voice Fuel (The Quota)
**Powered by: LiveKit Cloud + Deepgram**

Voice capabilities are orchestrated via the LiveKit protocol to ensure sub-100ms latency in vocal interactions.
- **Hard Quota Enforcement:** To prevent overage charges and ensure system stability, the **Free Tier is strictly capped at 1,000 minutes per month.**
- **Edge Governance:** This limit is enforced by the `handle-livekit-event` Supabase Edge Function, which monitors active session duration and revokes tokens the moment the threshold is breached.

## Governance & IHL Compliance

### Meaningful Human Control (ICRC Standards)
TeamStrength is architected to adhere to International Humanitarian Law (IHL) and ICRC standards for autonomous systems. We ensure that every agent operates under **Meaningful Human Control**.

- **The Neural Kill Switch:** A hardware-abstracted "Emergency Deactivate" signal is available in the Overwatch HUD. Activating this switch sends an immediate SIGTERM to the Omni-Node container and revokes all active API credentials in the DeepSync Vault.
- **Ingress Pairing:** Unauthorized access is prevented via `TELEGRAM_DM_POLICY=pairing`. An agent will only interact with a human after a 6-digit secure code (stored in the Vault) is provided to authorize identity.
- **Predictable Activation:** The system is designed to be deterministic. Agents cannot self-replicate or modify their "Constitution" (System Prompt) without explicit human multi-sig approval.

---

### Getting Started
1. **Authorize Ingress:** Link your Telegram or Slack tokens in the Channel Matrix.
2. **Provision Omni-Node:** Launch your dedicated compute shard on the Neural Mesh.
3. **Refine Skills:** Use the Skill Configurator to bridge tools into your agent's logic.

---
### Local Development
1. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`

---
© 2026 TEAMSTRENGTH.US | IHL-Compliance Certified Platform