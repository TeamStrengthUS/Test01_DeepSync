# TeamStrength | Master Testing & Verification Protocol (V3.2)

**Scope:** End-to-End Audit of Neural Mesh Integrity, Commercial Shards, and ICRC Compliance.  
**Audience:** Human Operators, Compliance Officers, Lead QA Engineers.  
**Standard:** Adheres to UN Resolution 79/239 and ICRC 2025 AI-DSS "Meaningful Human Control" (MHC) standards.

---

## Phase 1: The Commercial Smoke Test (Revenue & Access)
**Objective:** Verify that the "Neural Relay" (polling-based communication) successfully bypasses inbound firewall rules and that commercial resource caps are strictly enforced via the UI.

### Step 1.1: Neural Relay Communication Loop
- [ ] **Action:** Open the **NeuralLink** widget (Floating HUD) in the dashboard.
- [ ] **Action:** Send the text transmission: `"STATUS_REPORT_01"`.
- [ ] **Verification (DB):** Open the Supabase Table `web_chat_buffer`. Confirm a new row exists with `direction: 'inbound'` and your user ID.
- [ ] **Wait:** Allow 5-10 seconds for the Letta Omni-Node to poll and process.
- [ ] **Verification (Relay):** Confirm a new row appears in `web_chat_buffer` with `direction: 'outbound'`.
- [ ] **Verification (HUD):** Confirm the agent response appears in the NeuralLink chat UI.
- [ ] **Pass Criteria:** Bidirectional communication confirmed without open inbound ports on the node.

### Step 1.2: Paywall & Deployment Quota
- [ ] **Action:** Navigate to the **Fleet Selector** (Top Bar).
- [ ] **Action:** Attempt to initialize a second Omni-Node ("Bravo").
- [ ] **Verification:** Confirm the "Upgrade to Command Tier" modal appears immediately.
- [ ] **Action:** Click the "Initialize Tier" / "Upgrade" button.
- [ ] **Verification:** Confirm a new browser tab opens to the Stripe Checkout URL defined in the `tier_definitions` table.
- [ ] **Pass Criteria:** Quota Enforcement Logic (Node Limit = 1) prevents unauthorized scaling.

---

## Phase 2: The "Kill Switch" Drill (ICRC Compliance)
**Objective:** Physically verify the "Operation Stage Intervention" capability required for IHL compliance. This test proves that a human can terminate an autonomous process instantaneously.

### Step 2.1: Emergency Termination Sequence
- [ ] **Action:** Initiate an active voice session or high-load task (e.g., "Deep Research").
- [ ] **Action:** Navigate to **Overwatch HUD** (Governance > Overwatch).
- [ ] **Action:** Locate the target user/node and click the red **"EMERGENCY DEACTIVATE"** button.
- [ ] **Verification (Voice):** Confirm the LiveKit voice stream terminates immediately (Token Revocation).
- [ ] **Verification (Relay):** Confirm the **NeuralLink** chat displays "ACCESS_DENIED: NODE_DEACTIVATED".
- [ ] **Verification (Infra):** Confirm the node container status in **Railway** changes to `STOPPED` or `CRASHED` within < 5 seconds.

### Step 2.2: Accountability Audit Trail
- [ ] **Action:** Access the `security_strikes` table in the DeepSync Vault (Supabase).
- [ ] **Verification:** Confirm a log entry exists with `type: 'manual_kill_switch'`.
- [ ] **Verification:** Confirm the metadata includes `initiated_by: [Current Operator Email]`.
- [ ] **Pass Criteria:** Total cessation of autonomous functions verified across all planes (Compute, Voice, Data).

---

## Phase 3: The "Voice Fuel" Limit Test (Resource Quota)
**Objective:** Verify the hard-coded temporal constraint (1000 minutes) which ensures the predictability of autonomous system operation durations.

### Step 3.1: Temporal Boundary Simulation
- [ ] **Action:** In Supabase, manually update the `teammate_node` table for your test user.
- [ ] **SQL Command:** `UPDATE teammate_node SET voice_fuel_minutes = 1001 WHERE user_id = '[TEST_UID]';`
- [ ] **Action:** Attempt to launch or sync the Omni-Node in the **Mission Control** dashboard.
- [ ] **Verification (HUD):** Confirm the "Neural Voice Fuel" card displays a red "QUOTA EXCEEDED" warning.
- [ ] **Verification (Log):** Confirm the **Activation Sequence** terminal logs: `> VERIFYING QUOTA... [FAILED]`.
- [ ] **Pass Criteria:** Hard limit of 1000 minutes prevents system re-activation without commercial resupply.

---

## Phase 4: The MemOS Provenance Check (DeepVault)
**Objective:** Verify that every piece of ingested intelligence is tagged with precise provenance metadata to prevent "Black Box" reasoning.

### Step 4.1: Intelligence Ingestion
- [ ] **Action:** In NeuralLink, tell the agent: `"Human Operator preference for PHX-Primary node is absolute."`
- [ ] **Wait:** 3 seconds for vector synchronization.

### Step 4.2: Provenance & Lifecycle Verification
- [ ] **Action:** Navigate to the **DeepVault Explorer** page.
- [ ] **Action:** Locate the new memory shard using the "QUERY_MEMCUBE" search bar.
- [ ] **Verification (Metadata):** Confirm the following tactical indicators are present:
    - [ ] **Provenance:** `User Input` (Blue Badge)
    - [ ] **Lifecycle State:** `Active` (Teal Badge)
    - [ ] **Access Level:** `Private` (Red Badge)
- [ ] **Pass Criteria:** Intelligence provenance is immutable and transparently displayed to the human operator.

---

**Operator Signature:** ____________________  
**Date:** 2026-___-___  
**Status:** [ ] PROVISIONAL [ ] CERTIFIED (ICRC AI-DSS)