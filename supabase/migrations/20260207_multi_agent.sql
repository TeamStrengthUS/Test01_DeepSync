
-- TEAMSTRENGTH FLEET UPGRADE V3.2
-- TRANSITIONING TO 1:N MULTI-AGENT ARCHITECTURE

-- 1. Modify teammate_node to support multiple entries per user
ALTER TABLE public.teammate_node DROP CONSTRAINT teammate_node_pkey;
ALTER TABLE public.teammate_node ADD COLUMN id UUID PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE public.teammate_node ADD COLUMN name TEXT DEFAULT 'Alpha-Node';
ALTER TABLE public.teammate_node ADD COLUMN mesh_location TEXT DEFAULT 'PHX-01';

-- 2. Ensure user_id is indexed for fleet lookups
CREATE INDEX idx_teammate_node_user_id ON public.teammate_node(user_id);

-- 3. Create a table for Vault Memory shards (DeepVault)
-- This maps to the Letta memory store
CREATE TABLE public.memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.teammate_node(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('Core', 'Archival')),
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- For DeepSync vector search
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS for Fleet Access
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own node shards" ON public.memories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.teammate_node 
            WHERE id = memories.node_id 
            AND user_id = auth.uid()
        )
    );

-- 5. Fleet Limit Trigger
-- Prevents Pro users from deploying more than 2 nodes
CREATE OR REPLACE FUNCTION public.check_fleet_limit()
RETURNS TRIGGER AS $$
DECLARE
    node_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO node_count 
    FROM public.teammate_node 
    WHERE user_id = NEW.user_id;

    -- Mock check: In production, verify against subscription_tier in user_profile
    IF node_count >= 2 THEN
        RAISE EXCEPTION 'FLEET_QUOTA_EXCEEDED: Upgrade to Command Tier required for >2 active Omni-Nodes.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER tr_fleet_limit_check
BEFORE INSERT ON public.teammate_node
FOR EACH ROW EXECUTE FUNCTION public.check_fleet_limit();

-- 6. Commentary
COMMENT ON TABLE public.teammate_node IS 'Neural Mesh fleet nodes belonging to authenticated humans.';
COMMENT ON TABLE public.memories IS 'DeepSync Vault state shards accessible via DeepVault Explorer.';
