
-- TEAMSTRENGTH FUEL ACCOUNTING V1.0
CREATE OR REPLACE FUNCTION public.increment_voice_fuel(p_node_id UUID, p_minutes FLOAT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.teammate_node
    SET voice_fuel_minutes = COALESCE(voice_fuel_minutes, 0) + p_minutes,
        last_active = NOW()
    WHERE node_id = p_node_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
