# Technical Architecture: TeamStrength DeepSync

## Overview
TeamStrength utilizes a distributed "Neural Mesh" architecture. This document provides a deep dive into the technical implementation of the components described in the README.

## 1. Node Execution (Omni-Node)
The Omni-Node is a standalone Docker environment designed for high-availability agentic processing.

### Component Stack:
- **Runtime:** Node.js / Python (via Letta)
- **Networking:** Secure WebSocket (WSS) Egress
- **Identity:** Environment-injected `USER_ID` and `NEURAL_ID`

### Security Protocol:
Omni-Nodes operate within a "Strict Sandbox." They have no access to the host's network and can only communicate with the specific URLs whitelisted in the Egress Guard (e.g., Supabase API, LiveKit Edge).

## 2. Memory Synchronization (DeepSync)
Memory is not stored locally on the node. Instead, the node maintains a "Cache Shard" while the source of truth resides in the DeepSync Vault.

### Sync Logic:
1. **Ingest:** Data arrives via a Channel (Telegram/Slack).
2. **Embed:** Letta generates a vector embedding.
3. **Commit:** The embedding is sent to Supabase `public.embeddings` table via the `sync_sessions.js` sidecar.
4. **Retrieve:** Upon a new query, the node performs a similarity search against the Vault.

## 3. Real-time Vocal Interaction (LiveKit)
We bypass traditional HTTP polling for voice.

- **Signaling:** Handled via Supabase Edge Functions.
- **Transport:** WebRTC (UDP) directly between the user's browser and the LiveKit SFU.
- **Processing:** Deepgram performs STT (Speech-to-Text) inside the Mesh, which is then fed into the Omni-Node's logic loop.

## 4. Governance Ledger
Every action taken by an Omni-Node is recorded in the **Immutable Security Ledger**.

- **Strike Enforcement:** If the `preToolExecution` hook detects a violation (e.g., attempt to run `nmap`), it writes to the `security_strikes` table.
- **Post-Action Audit:** Supabase triggers monitor the strike count. At 3 strikes, the `is_suspended` flag is flipped, and a signal is sent to Railway to kill the container.

---
*Document Version: 3.1.2*
*Compliance Audit: Passed (2026-01-01)*