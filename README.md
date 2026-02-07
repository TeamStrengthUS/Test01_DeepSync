# TeamStrength | Premium Team Analytics

A high-performance SaaS platform for team intelligence and agentic operations.

## Security & Governance

### Meaningful Human Control (IHL Compliance)
TeamStrength is architected to adhere to International Humanitarian Law (IHL) standards for "Meaningful Human Control." This ensures that every autonomous agent operates within a predictable framework and can be immediately deactivated by a human operator.

### The "Three Strikes" Policy
The **Project Overwatch** HUD monitors all agent behavior via immutable audit logs stored in the **DeepSync Vault**.
- **Automated Suspension:** If an agent triggers 3 security strikes (violations of the Constitution) within a 24-hour window, the node is automatically suspended.
- **Manual Override:** Admins at `teamstrength.com` have access to the **Neural Kill Switch** to terminate rogue nodes instantly.

### Ingress Control (Pairing Mode)
To prevent unauthorized access, all agent nodes utilize a "Pairing Mode" workflow:
1. **Provisioning:** User provides a Bot Token.
2. **Pairing:** The system generates a unique 6-digit code.
3. **Verification:** The user must send this code to the bot to verify human ownership and authorize the Neural Mesh link.
4. **DM Policy:** `TELEGRAM_DM_POLICY=pairing` ensures the bot only responds to paired administrators.

### Egress Guard (The Constitution)
All tools (bash, web search, etc.) pass through the **Egress Guard Hook**. This system prompt and logical filter blocks dangerous commands:
- `rm -rf` / `mkfifo` / `nc`
- Unauthorized network scanning (`nmap`)
- Data exfiltration to non-whitelisted IPs

> [!WARNING]
> This system enforces IHL compliance via immutable audit logs. Attempting to bypass the TeamStrength Constitution will result in immediate node suspension and administrative review.

---
© 2024 TEAMSTRENGTH.US