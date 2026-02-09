
-- TEAMSTRENGTH FLEET UPGRADE V3.2
-- TRANSITIONING TO 1:N MULTI-AGENT ARCHITECTURE

-- 1. Create a table for Vault Memory shards (DeepVault)
-- This maps to the Letta memory store
CREATE TABLE public.memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.teammate_node(node_id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('Core', 'Archival')),
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- For DeepSync vector search
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS for Fleet Access
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own node shards" ON public.memories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.teammate_node 
            WHERE node_id = memories.node_id 
            AND user_id = auth.uid()
        )
    );
-- 3. Fleet Limit Trigger
-- 5. Fleet Limit Trigger
-- Prevents Pro users from deploying more than 2 nodes
CREATE OR REPLACE FUNCTION public.check_fleet_limit()
RETURNS TRIGGER AS $$
DECLARE
    node_count INTEGER;
    max_nodes INTEGER;
BEGIN
    SELECT COUNT(*) INTO node_count 
    FROM public.teammate_node 
    WHERE user_id = NEW.user_id;
    SELECT td.node_limit INTO max_nodes
    FROM public.subscriptions s
    JOIN public.tier_definitions td ON td.tier_id = s.tier
    WHERE s.user_id = NEW.user_id;

    IF max_nodes IS NULL THEN
        max_nodes := 1;
    END IF;

    IF node_count >= max_nodes THEN
        RAISE EXCEPTION 'FLEET_QUOTA_EXCEEDED: Upgrade required for additional Omni-Nodes.';
    END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER tr_fleet_limit_check
BEFORE INSERT ON public.teammate_node
FOR EACH ROW EXECUTE FUNCTION public.check_fleet_limit();

-- 4. Commentary
COMMENT ON TABLE public.teammate_node IS 'Neural Mesh fleet nodes belonging to authenticated humans.';
COMMENT ON TABLE public.memories IS 'DeepSync Vault state shards accessible via DeepVault Explorer.';
