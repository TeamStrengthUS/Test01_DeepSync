# ICRC & IHL COMPLIANCE DATASHEET (2025)

**System Name:** TeamStrength Neural Mesh
**Classification:** Human-In-The-Loop AI Decision-Support System (AI-DSS)
**Legal Framework:** UN General Assembly Resolution 79/239; 2025 ICRC Working Paper on Emerging Technologies.

---

## 1. Technical Definitions & Scope

### 1.1 Declaration of Status
TeamStrength is formally classified as an **AI-Based Decision-Support System (AI-DSS)**.
*   **Definition:** In accordance with the *2025 ICRC Working Paper*, this system is designed "to support, rather than hinder or replace, human decision-making."
*   **Non-Delegation:** The system explicitly prohibits the delegation of lethal authority or life-critical decisions to the agent. The agent functions solely as an information synthesizer, communication relay, and analytical engine.

### 1.2 Adherence to International Humanitarian Law (IHL)
The architecture enforces the fundamental principles of IHL through hard-coded constraints:
*   **Distinction:** The "Egress Guard" prevents indiscriminate cyber-actions (e.g., mass network scanning) that could harm civilian infrastructure.
*   **Proportionality:** The "Voice Fuel" quota limits the temporal scope of the agent's influence, preventing indefinite or runaway feedback loops.
*   **Precautions:** The "Launch Sequence" ensures all safety protocols are verified *before* the Activation Stage begins.

---

## 2. Meaningful Human Control (MHC) Verification

The system satisfies the ICRC requirement for **Meaningful Human Control** across all three operational stages:

### Phase A: The Development Stage (Pre-Deployment)
*   **Constraint:** **The Constitution**.
*   **Implementation:** The Omni-Node container is initialized with a system prompt (The Constitution) that overrides all user instructions.
*   **Verification:** The `tests/security/test_egress_guard.ts` suite verifies that malicious commands (e.g., `rm -rf`, `nmap`) are intercepted and blocked at the code level.

### Phase B: The Activation Stage (Predictability)
*   **Constraint:** **Ingress Pairing**.
*   **Implementation:** Per LettaBot security protocols (`TELEGRAM_DM_POLICY=pairing`), the agent will not communicate with unrecognized actors.
*   **Verification:** The **Mission Control** dashboard requires a "Pairing Code" or "QR Scan" to authorize the link, ensuring positive identification of the human operator.
*   **Transparency:** The **Deployment Log** visually confirms the loading of safety protocols before the agent goes live.

### Phase C: The Operation Stage (Intervention)
*   **Constraint:** **The Overwatch Kill Switch**.
*   **Implementation:** The **Overwatch** dashboard provides a "Deactivate" button accessible to operators.
*   **Mechanism:** Activating this switch triggers:
    1.  **Container Halt:** Immediate `SIGKILL` to the Docker container via Railway API.
    2.  **Credential Revocation:** Immediate revocation of the LiveKit API Key (Voice Stream) via Edge Function.
    3.  **Audit Log:** Immutable entry in the `security_strikes` ledger.
*   **Legal Alignment:** This satisfies the ICRC requirement for "the potential for intervention and deactivation during the operation stage."

---

## 3. Temporal Constraints & Predictability

To prevent "drift" and ensure the system operates within a predictable timeframe, TeamStrength enforces hard resource limits.

### 3.1 The "Voice Fuel" Hard Limit
*   **Specification:** 1000 Minutes / Month (LiveKit Free Tier Protocol).
*   **Mechanism:** The `handle-livekit-event` Edge Function monitors usage in real-time.
*   **Enforcement:** Upon reaching 1000 minutes, the `LIVEKIT_URL` environment variable is nullified.
*   **Compliance Value:** This acts as a **"Time Frame of Operation" constraint**, a key factor cited by the ICRC for ensuring the predictability of autonomous systems. It physically prevents the agent from operating indefinitely without human resupply.

---

## 4. Accountability & After-Action Review

To address the "Black Box" problem and ensure accountability for violations:

### 4.1 The Security Strike Ledger
*   **Data Source:** **DeepSync Vault** (`security_strikes` table).
*   **Function:** Every blocked tool execution, quota violation, or unauthorized ingress attempt is logged with a timestamp and user ID.
*   **Immutability:** Row Level Security (RLS) policies prevent standard users from deleting these logs; only the **Overwatch** admin can view/archive them.
*   **Compliance Value:** This provides the **"After-Action Review"** capability mandated by the 2025 UN standards, allowing human operators to audit the agent's logic and failures.

### 4.2 The "Three Strikes" Policy
*   **Logic:** `IF strikes >= 3 THEN is_suspended = TRUE`.
*   **Function:** The system autonomously deactivates itself if it detects a pattern of non-compliant behavior, reverting control to the human operator.

---

**Signed:** TeamStrength Compliance Division
**Date:** February 7, 2026