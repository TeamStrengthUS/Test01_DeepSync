-- TEAMSTRENGTH VOICE SESSIONS V1.0
-- Tracks LiveKit voice usage and increments fuel minutes

CREATE TABLE IF NOT EXISTS public.voice_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.teammate_node(node_id) ON DELETE SET NULL,
    participant_identity TEXT NOT NULL,
    room_name TEXT,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_voice_sessions_node_id ON public.voice_sessions(node_id);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_active_identity ON public.voice_sessions(participant_identity) WHERE ended_at IS NULL;

ALTER TABLE public.voice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own voice sessions" ON public.voice_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.teammate_node
            WHERE teammate_node.node_id = voice_sessions.node_id
            AND teammate_node.user_id = auth.uid()
        )
    );

CREATE OR REPLACE FUNCTION public.increment_voice_fuel(p_node_id UUID, p_minutes FLOAT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.teammate_node
    SET voice_fuel_minutes = COALESCE(voice_fuel_minutes, 0) + p_minutes,
        last_active = NOW()
    WHERE node_id = p_node_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
