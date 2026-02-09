-- TEAMSTRENGTH AUTO-PROVISIONING V1.0
-- Seeds default subscription + initial Omni-Node on user signup

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.subscriptions WHERE user_id = NEW.id) THEN
        INSERT INTO public.subscriptions (user_id, tier)
        VALUES (NEW.id, 'scout_free');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.teammate_node WHERE user_id = NEW.id) THEN
        INSERT INTO public.teammate_node (user_id, agent_callsign, name)
        VALUES (NEW.id, 'Alpha-1', 'Alpha-Node');
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION public.handle_new_user() SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
