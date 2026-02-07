-- TEAMSTRENGTH COMMERCIAL LAYER UPGRADE V3.2
-- ENABLING MULTI-AGENT FLEETS & SUBSCRIPTION TIERS

-- 1. Subscription Tier Enumeration
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_tier') THEN
        CREATE TYPE public.subscription_tier AS ENUM ('scout_free', 'command_pro');
    END IF;
END $$;

-- 2. User Subscription Profile
-- Tracks commercial state and billing quotas
CREATE TABLE IF NOT EXISTS public.user_subscription (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tier public.subscription_tier DEFAULT 'scout_free',
    stripe_customer_id TEXT,
    voice_fuel_cap INTEGER DEFAULT 1000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Modify Teammate Node for Fleet Architecture
-- Transitions from 1:1 user-to-agent to 1:N fleet support
ALTER TABLE public.teammate_node DROP CONSTRAINT IF EXISTS teammate_node_pkey CASCADE;

-- Add node_id as a UUID Primary Key if not present
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='teammate_node' AND column_name='node_id') THEN
        ALTER TABLE public.teammate_node ADD COLUMN node_id UUID DEFAULT gen_random_uuid();
    END IF;
END $$;

ALTER TABLE public.teammate_node ADD PRIMARY KEY (node_id);

-- Add agent_callsign for node identification
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='teammate_node' AND column_name='agent_callsign') THEN
        ALTER TABLE public.teammate_node ADD COLUMN agent_callsign TEXT DEFAULT 'Alpha';
    END IF;
END $$;

-- 4. Row Level Security Policies
ALTER TABLE public.teammate_node ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscription ENABLE ROW LEVEL SECURITY;

-- Teammate Node Policies
DROP POLICY IF EXISTS "Users can manage their own fleet nodes" ON public.teammate_node;
CREATE POLICY "Users can manage their own fleet nodes" ON public.teammate_node
    FOR ALL USING (auth.uid() = user_id);

-- User Subscription Policies
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.user_subscription;
CREATE POLICY "Users can view their own subscription" ON public.user_subscription
    FOR SELECT USING (auth.uid() = user_id);

-- 5. Maintenance Metadata
COMMENT ON TABLE public.user_subscription IS 'Stores commercial tier info and hard-coded resource caps for the TeamStrength platform.';
COMMENT ON TABLE public.teammate_node IS 'Individual agent instances belonging to a human fleet in the Neural Mesh.';
