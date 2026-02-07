# TeamStrength | Premium Team Analytics

A high-performance SaaS platform for team intelligence and agentic operations.

## Security & Governance

### Meaningful Human Control (IHL Compliance)
TeamStrength is architected to adhere to International Humanitarian Law (IHL) standards. This ensures that every autonomous agent operates within a predictable framework and can be immediately deactivated by a human operator via the **Neural Kill Switch**.

### The "Three Strikes" Rule
Agentic behavior is monitored by the **Egress Guard**. 
- **Automated Suspension:** If an agent triggers 3 security strikes (violations of the Constitution) within a 24-hour window, the node is automatically suspended in the DeepSync Vault.
- **Manual Override:** System administrators at `teamstrength.com` have the authority to trigger an **Emergency Suspend**, which terminates the agent's Docker container and revokes all active Voice Mode tokens.

### Ingress Control (Pairing Mode)
To prevent unauthorized access to agent nodes:
- `TELEGRAM_DM_POLICY=pairing` is enforced by default.
- Agents will only respond to human operators who have successfully verified their 6-digit identity code stored in the DeepSync Vault.

### Quota Policy (Voice Fuel)
The LiveKit-powered Voice Mode is governed by a strict usage quota:
- **Free Tier:** Limited to **1,000 minutes** of total vocal interaction.
- **Enforcement:** The Key Vender (Edge Function) will refuse to generate tokens once this hard limit is reached.

---
© 2026 TEAMSTRENGTH.US