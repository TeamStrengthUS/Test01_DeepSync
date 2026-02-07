# Compliance Datasheet: UN/ICRC Standard 2025
## TeamStrength Neural Mesh & DeepSync Vault
**Document ID:** TS-IHL-COMP-2025-01  
**Status:** Certified (Internal Review)  
**Date:** June 20, 2026  

---

## 1. System Classification

### 1.1 Declaration of Nature
The TeamStrength Omni-Node system is formally classified as a **Human-In-The-Loop Artificial Intelligence Decision-Support System (AI-DSS)**. Under no circumstances is the system to be categorized as an autonomous weapon system (AWS) or a kinetic-effect-driven autonomous entity.

### 1.2 Legal Basis & Alignment
This classification is predicated on the design requirement that the system functions to **support, rather than replace, human judgment**. This architectural constraint directly aligns with the *2025 ICRC Working Paper on Emerging Technologies in the Military Domain*, which emphasizes that AI must remain a tool of cognitive augmentation for human commanders and operators.

---

## 2. Control Mechanisms (Technical Verification)

TeamStrength enforces "Meaningful Human Control" through three distinct architectural gates, ensuring that system behavior remains within the bounds of International Humanitarian Law (IHL).

### 2.1 The Activation Stage: Predictability & Reliability
The **Neural Mesh Activation Sequence** (implemented in `DeploymentLog.tsx`) serves as the primary verification gate for predictability. 
- **Requirement:** Systems must demonstrate deterministic initialization before engaging in data processing.
- **Implementation:** The sequential injection of Constitution and IHL protocols ensures that the agent's logic is tethered to human-approved directives before the secure uplink is established.

### 2.2 The Operation Stage: Supervision & Intervention
The **Overwatch HUD** provides real-time human supervision of all active nodes.
- **Intervention Protocol:** The "Neural Kill Switch" satisfies the ICRC requirement for "effective human supervision and the potential for immediate intervention and deactivation."
- **Execution:** Triggering the Kill Switch sends a direct SIGTERM to the Docker container via the Railway GraphQL API and revokes all active session tokens in the DeepSync Vault, ensuring total cessation of function within <5 seconds.

### 2.3 Temporal Limits: Scope of Operation
To mitigate the risk of "indefinite autonomous drift," TeamStrength implements **Neural Voice Fuel Quotas**.
- **Hard Limit:** The 1,000-minute monthly quota serves as a formal **Time Frame of Operation** constraint.
- **Compliance Logic:** By strictly limiting the temporal scope of the agent's active processing window, TeamStrength ensures that the system cannot operate outside of human-approved mission cycles.

---

## 3. Accountability & Audit

### 3.1 The "Black Box" Solution: After-Action Review (AAR)
The ICRC identifies the "Black Box Problem" as a primary barrier to AI accountability. TeamStrength resolves this via the **DeepSync Immutable Security Ledger** (`public.security_strikes`).
- **Function:** Every attempted breach of the Constitution is logged with a timestamp, target UID, and violation type.
- **AAR Implementation:** This table provides an immutable record for post-mission audit, satisfying the requirement for transparent After-Action Review mechanisms in autonomous processing.

### 3.2 Ingress Control: Positive Identification
Unauthorized system access is prevented through a strict **Ingress Pairing Policy** (`TELEGRAM_DM_POLICY=pairing`).
- **Identity Verification:** Agents are prohibited from interacting with any entity that has not provided a 6-digit pairing code stored in the Vault. This ensures that the system is only responsive to a positively identified, authorized human operator.

---

## 4. Prohibited Actions (The Constitution)

The TeamStrength **Egress Guard** (`security_check.js`) is hard-coded to block actions that could result in "indiscriminate effects" or unauthorized cyber-offensive operations. 

### 4.1 Restricted Command Set
The following commands are flagged as "Constitution Violations" and trigger an immediate Security Strike:
- `rm -rf /`: Prevention of indiscriminate system destruction.
- `nmap`: Prevention of unauthorized reconnaissance and network mapping.
- `curl` / `wget`: Restriction of arbitrary data egress and foreign code ingestion.
- `nc` (Netcat) / `mkfifo`: Prevention of unauthorized reverse shells and backdoors.

### 4.2 Proportionality Constraint
The system is programmed to refuse any directive that violates the **Principle of Proportionality**. If an agent's logic suggests an action that exceeds its defined mission parameters, the Neural Mesh triggers an automatic "Audit Hold," requiring human multi-sig approval before proceeding.

---

**Certification Statement:**
*TeamStrength certifies that as of Version 3.1, the Neural Mesh architecture satisfies the technical requirements for Meaningful Human Control as defined by current 2025 International Humanitarian Law standards.*

**Authorized Signatory:**  
*Lead Compliance Officer, TeamStrength Global Operations*