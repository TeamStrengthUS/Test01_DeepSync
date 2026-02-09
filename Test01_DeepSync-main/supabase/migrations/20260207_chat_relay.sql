
-- TEAMSTRENGTH DATABASE RELAY V1.0
-- BYPASSING INBOUND FIREWALLS VIA VECTOR-READY BUFFERING

-- 1. Create the Directionality Enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'chat_direction') THEN
        CREATE TYPE public.chat_direction AS ENUM ('inbound', 'outbound');
    END IF;
END $$;

-- 2. Create the Web Chat Buffer Table
CREATE TABLE IF NOT EXISTS public.web_chat_buffer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    node_id UUID REFERENCES public.teammate_node(node_id) ON DELETE SET NULL,
    direction public.chat_direction NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Realtime Protocol
-- This allows the frontend to subscribe to 'INSERT' events for immediate HUD updates.
ALTER publication supabase_realtime ADD TABLE public.web_chat_buffer;

-- 4. Security & Isolation Layer
ALTER TABLE public.web_chat_buffer ENABLE ROW LEVEL SECURITY;

-- Users can only see and insert their own transmissions
CREATE POLICY "Users can manage their own chat buffer" 
    ON public.web_chat_buffer
    FOR ALL 
    TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 5. Metadata
COMMENT ON TABLE public.web_chat_buffer IS 'Asynchronous communication bridge between the Web HUD and restricted Omni-Node containers.';
