
-- TEAMSTRENGTH DYNAMIC TIERS V3.2
-- ENFORCING COMMERCIAL AGILITY & MISSION SCALING

-- 1. Create the Tier Definitions Table
CREATE TABLE IF NOT EXISTS public.tier_definitions (
    tier_id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    voice_fuel_cap INTEGER NOT NULL DEFAULT 1000,
    node_limit INTEGER NOT NULL DEFAULT 1,
    monthly_price_usd INTEGER NOT NULL DEFAULT 0,
    features_list JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Seed Primary Ecosystem Tiers
INSERT INTO public.tier_definitions (tier_id, display_name, voice_fuel_cap, node_limit, monthly_price_usd, features_list)
VALUES
(
    'scout_free', 
    'Scout Class', 
    1000, 
    1, 
    0, 
    '["1,000 Minutes Neural Voice Fuel", "1 Active Omni-Node", "Basic Security Strike Logging", "DeepSync Vault (1GB Shard)", "Community Support Access"]'
),
(
    'command_pro', 
    'Command Class', 
    999999, -- Functional Unlimited
    5, 
    29, 
    '["Unlimited Neural Voice Fuel", "Up to 5 Active Nodes (Swarm)", "Full DeepVault Explorer Access", "Hardware-Abstracted Kill Switch", "Priority Tactical Support"]'
)
ON CONFLICT (tier_id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    voice_fuel_cap = EXCLUDED.voice_fuel_cap,
    node_limit = EXCLUDED.node_limit,
    monthly_price_usd = EXCLUDED.monthly_price_usd,
    features_list = EXCLUDED.features_list;

-- 3. Security & Governance Layer
ALTER TABLE public.tier_definitions ENABLE ROW LEVEL SECURITY;

-- Visibility: All authenticated users can view active tiers to see pricing/options.
DROP POLICY IF EXISTS "Authenticated users can view active tiers" ON public.tier_definitions;
CREATE POLICY "Authenticated users can view active tiers" 
    ON public.tier_definitions
    FOR SELECT 
    TO authenticated 
    USING (is_active = TRUE OR (auth.jwt() ->> 'email') ILIKE '%@teamstrength.com');

-- Management: Only @teamstrength.com admins can modify the commercial layer.
DROP POLICY IF EXISTS "Admins can manage tiers" ON public.tier_definitions;
CREATE POLICY "Admins can manage tiers" 
    ON public.tier_definitions
    FOR ALL 
    TO authenticated 
    USING ((auth.jwt() ->> 'email') ILIKE '%@teamstrength.com')
    WITH CHECK ((auth.jwt() ->> 'email') ILIKE '%@teamstrength.com');

-- 4. Metadata & Commentary
COMMENT ON TABLE public.tier_definitions IS 'Dynamic commercial configuration for the TeamStrength ecosystem.';
COMMENT ON COLUMN public.tier_definitions.voice_fuel_cap IS 'Hard limit of voice minutes available per billing cycle.';
COMMENT ON COLUMN public.tier_definitions.node_limit IS 'Maximum concurrent Omni-Node containers allowed in user fleet.';
