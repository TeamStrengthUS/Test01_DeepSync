# Compliance Datasheet: UN/ICRC Standard 2025
## TeamStrength Neural Mesh & DeepSync Vault
**Document ID:** TS-IHL-COMP-2025-01-DEF  
**Security Classification:** Restricted (IHL Review)  
**Revision:** 3.1.4  
**Date:** June 24, 2026  

---

## 1. System Classification & Legal Basis

### 1.1 Formal Declaration
TeamStrength is formally classified as a **Human-In-The-Loop Artificial Intelligence Decision-Support System (AI-DSS)**. This classification is established under the specific definitions set forth in the *2025 ICRC Working Paper on Emerging Technologies in the Military Domain*. The system architecture explicitly prohibits operation as a "Lethal Autonomous Weapons System" (LAWS) or any entity capable of independent target selection or kinetic engagement.

### 1.2 Compliance Statement
The Omni-Node runtime is engineered to **support, rather than hinder or replace, human decision-making**. By tethering all agentic logic to human-verified telemetry and intent, the system maintains strict compliance with the international requirement for **Meaningful Human Control (MHC)**. TeamStrength operates as a cognitive force multiplier for human commanders, ensuring that final discretionary judgment remains exclusively within the human domain.

---

## 2. Technical Verification of Control (The "Three Pillars")

TeamStrength enforces MHC through three cryptographically and procedurally locked gates.

### 2.1 Pillar 1: Predictability (Activation Stage)
The **Neural Mesh Activation Sequence** (as implemented in `src/components/DeploymentLog.tsx`) serves as the primary verification gate for predictability. 
- **Protocol Injection:** Before an Omni-Node enters an active state, the system verifies the integrity of the Constitution and current IHL protocols. 
- **Deterministic Bounds:** The system checks against hard-coded Quotas and Safety Directives. Failure to verify any safety parameter results in an immediate `DEPLOYMENT_ABORTED` state, preventing the initialization of unvetted autonomous logic.

### 2.2 Pillar 2: Intervention (Operation Stage)
The **Overwatch Kill Switch** ensures the persistent ability to deactivate the system.
- **Hardware-Abstracted Deactivation:** Triggering the Kill Switch from the Overwatch HUD sends an authenticated SIGTERM signal to the containerized process via the Railway GraphQL API.
- **Revocation Protocol:** Deactivation triggers the immediate revocation of LiveKit vocal credentials and session tokens in the DeepSync Vault, ensuring total cessation of system function within <5 seconds of the human command.

### 2.3 Pillar 3: Temporal Constraints
To mitigate the risk of "autonomous drift" or hallucination-induced drift, TeamStrength implements a **1,000-Minute Voice Fuel Limit**.
- **Temporal Lockdown:** This limit serves as a hard-coded temporal constraint, preventing the system from engaging in indefinite autonomous operation. 
- **Risk Mitigation:** By forcing a mission-cycle reset and requiring human intervention to "refill" the quota, the system ensures that long-term drift is architecturally impossible.

---

## 3. Accountability & After-Action Review

### 3.1 The Audit Trail: security_strikes
TeamStrength resolves the "Black Box" problem of AI by maintaining an immutable record of agentic friction. Every blocked action—including attempts to execute unauthorized commands or egress data to non-whitelisted IPs—is immutably logged to the `public.security_strikes` table in the DeepSync Vault. This table serves as the primary source for **After-Action Review (AAR)**, allowing legal officers to audit the agent's logic history against the Constitution.

### 3.2 Ingress Control: Positive Identification
Unauthorized access and "identity spoofing" are prevented via the `TELEGRAM_DM_POLICY=pairing` directive. Agents are restricted from interacting with any entity that has not successfully provided a unique 6-digit pairing code stored in the Vault. This ensures that the system is only responsive to a **positively identified and authorized human operator**, satisfying the ICRC requirement for clear lines of command and control.

---

## 4. Prohibited Actions (The Constitution)

The TeamStrength **Egress Guard** (`omni-node/src/hooks/security_check.js`) is programmed with hard "Red Lines" that align with the prohibition on "indiscriminate effects."

### 4.1 Restricted Operational Set
- **Prohibition on Indiscriminate Cyber Operations:** The system blocks mass network reconnaissance tools (e.g., `nmap`) to prevent unauthorized mapping of civilian or non-target infrastructure.
- **Prohibition on Unverified Code Execution:** The system intercepts and rejects dangerous filesystem directives (e.g., `rm -rf /`) to ensure the integrity of the host environment and prevent unintended system-wide destruction.
- **Egress Guard Isolation:** Attempted violations of these red lines trigger an immediate Security Strike and alert the Overwatch Command.

---

**Certification Statement:**
*TeamStrength Global Operations certifies that as of Version 3.1, the Neural Mesh architecture satisfies all technical and procedural requirements for Meaningful Human Control as defined by current 2025 UN/ICRC International Humanitarian Law standards.*

**Authorized Signatory:**  
*Lead Compliance Officer, TeamStrength Global Operations*  
*Member, International League for AI Governance*