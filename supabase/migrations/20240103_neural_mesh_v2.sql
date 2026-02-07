-- TEAMSTRENGTH NEURAL MESH V2: NODE MONITORING
-- ENFORCING DISTRIBUTED CONSISTENCY V3.1

-- 1. Mesh Nodes: Tracking global compute shards
CREATE TABLE public.mesh_nodes (
    id TEXT PRIMARY KEY,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    last_sync TIMESTAMPTZ DEFAULT NOW(),
    current_load INTEGER DEFAULT 0
);

-- 2. Seed Data: Primary Global Hubs
INSERT INTO public.mesh_nodes (id, location, status, current_load)
VALUES 
    ('PHX-Primary', 'Phoenix, AZ', 'active', 42),
    ('LDN-Edge-01', 'London, UK', 'active', 28),
    ('SIN-Edge-02', 'Singapore', 'active', 15)
ON CONFLICT (id) DO NOTHING;

-- 3. RLS POLICIES: Restricted Monitoring
ALTER TABLE public.mesh_nodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can monitor all nodes" ON public.mesh_nodes
    FOR SELECT USING (auth.role() = 'authenticated');

-- 4. Notify Operators
COMMENT ON TABLE public.mesh_nodes IS 'Real-time telemetry for TeamStrength Global Compute Shards.';