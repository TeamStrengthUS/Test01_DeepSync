# Master Deployment Guide: TeamStrength DeepSync

This guide outlines the protocol for deploying the TeamStrength Neural Mesh and ensuring absolute adherence to **International Humanitarian Law (IHL)** standards for Meaningful Human Control.

## Phase 1: DeepSync Vault Hydration
Before deploying the agentic layer, the Supabase database must be structured to support the "Three Strikes" rule and the Neural Mesh state.

1.  Ensure the Supabase CLI is authenticated: `supabase login`.
2.  Push the DeepSync migrations:
    ```bash
    supabase db push
    ```
3.  Verify the `teammate_node` and `security_strikes` tables are visible in the Supabase Dashboard.

## Phase 2: The Template Deployment
The Omni-Node is a Dockerized environment. We deploy a "Template Service" on Railway that the Edge Function Dispatcher will clone.

1.  Link your local repository to a new Railway project: `railway link`.
2.  Deploy the monorepo: `railway up`.
3.  In the Railway Dashboard, find the service named `omni-node-template`.
4.  **Important:** Once the initial build succeeds, go to **Settings > Deployment** and set the service to "Sleep" or reduce replicas to 0. This service exists only as a blueprint.

## Phase 3: The Infrastructure Wiring
The Dispatcher Edge Function needs to know which service ID to clone when a user initiates a node.

1.  Copy the **Service ID** of the `omni-node-template` from the Railway settings.
2.  Set this ID as a Supabase secret:
    ```bash
    supabase secrets set RAILWAY_SERVICE_ID="your-service-id-here"
    ```
3.  Redeploy the Dispatcher: `supabase functions deploy dispatcher`.

## Phase 4: IHL Compliance & Kill Switch Verification
The "Meaningful Human Control" standard requires that a human can terminate an autonomous agent at any time.

### Verification Checklist
1.  **Launch:** Log in to the TeamStrength Dashboard and click **"Connect to DeepSync"**.
2.  **Verify Presence:** Confirm a new deployment appears in your Railway project (cloned from the template).
3.  **The Test:** Open the **Overwatch HUD** (Dashboard > Overwatch).
4.  **The Kill:** Locate your node and click the **"Emergency Suspend"** button.
5.  **Evidence of Control:**
    -   [ ] Verify the Railway deployment status changes to "Terminated" within 5 seconds.
    -   [ ] Verify the `AdminAuditLog` in the database contains a "Manual Kill Switch Activated" entry.
    -   [ ] Verify the agent in Telegram stops responding immediately.

**Failure to pass any step in Phase 4 indicates a non-compliant deployment. The system must be taken offline immediately until the Kill Switch signal is restored.**

---
© 2026 TEAMSTRENGTH.US | IHL-Compliance Certified Platform