
-- TEAMSTRENGTH COMMERCIAL LAYER UPGRADE V3.2
-- ENABLING MULTI-AGENT FLEETS & SUBSCRIPTION TIERS

-- 1. Create Subscription Tier Enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_tier') THEN
        CREATE TYPE public.subscription_tier AS ENUM ('scout_free', 'command_pro', 'enterprise_gov');
    END IF;
END $$;

-- 2. Create Commercial Ledger: subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tier public.subscription_tier DEFAULT 'scout_free',
    voice_fuel_cap INTEGER DEFAULT 1000,
    max_nodes INTEGER DEFAULT 1,
    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Refactor teammate_node for Multi-Agent Fleets
-- Dropping PK and re-initializing with node_id
ALTER TABLE public.teammate_node DROP CONSTRAINT IF EXISTS teammate_node_pkey CASCADE;

-- Add node_id if not present
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='teammate_node' AND column_name='node_id') THEN
        ALTER TABLE public.teammate_node ADD COLUMN node_id UUID DEFAULT gen_random_uuid();
    END IF;
END $$;

ALTER TABLE public.teammate_node ADD PRIMARY KEY (node_id);

-- Add Fleet Identification Fields
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='teammate_node' AND column_name='agent_callsign') THEN
        ALTER TABLE public.teammate_node ADD COLUMN agent_callsign TEXT DEFAULT 'Alpha-1';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='teammate_node' AND column_name='agent_role') THEN
        ALTER TABLE public.teammate_node ADD COLUMN agent_role TEXT DEFAULT 'generalist';
    END IF;
END $$;

-- 4. Update Row Level Security Policies
ALTER TABLE public.teammate_node ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Teammate Node: Allow multiple agents per user
DROP POLICY IF EXISTS "Users can only view their own node" ON public.teammate_node;
DROP POLICY IF EXISTS "Users can manage their own fleet nodes" ON public.teammate_node;

CREATE POLICY "Users can manage their own fleet nodes" 
    ON public.teammate_node
    FOR ALL 
    USING (auth.uid() = user_id);

-- Subscriptions: Secure commercial data
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
CREATE POLICY "Users can view their own subscription" 
    ON public.subscriptions
    FOR SELECT 
    USING (auth.uid() = user_id);

-- 5. Maintenance Metadata
COMMENT ON TABLE public.subscriptions IS 'Commercial ledger tracking resource caps and billing for TeamStrength humans.';
COMMENT ON TABLE public.teammate_node IS 'Multi-agent fleet registry for distributed neural operations.';
