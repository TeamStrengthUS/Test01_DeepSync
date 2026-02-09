-- TEAMSTRENGTH OVERWATCH: ADMIN POLICY UPDATE
-- ENABLING SUPER-ADMIN VISIBILITY V3.1

-- 1. Admin Verification Function
-- Checks if the authenticated user has a @teamstrength.com email address.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT (auth.jwt() ->> 'email') ILIKE '%@teamstrength.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Teammate Node Admin Policies
-- Admins can view and update any node for monitoring and emergency suspension.
CREATE POLICY "Admins can view all nodes" ON public.teammate_node
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all nodes" ON public.teammate_node
    FOR UPDATE USING (public.is_admin());

-- 3. Security Strikes Admin Policies
-- Admins can view the full audit stream of security strikes across the entire mesh.
CREATE POLICY "Admins can view all strikes" ON public.security_strikes
    FOR SELECT USING (public.is_admin());

-- 4. Explicitly Grant Usage to authenticated users for the function
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Notify operators
COMMENT ON FUNCTION public.is_admin() IS 'Security guard for Project Overwatch dashboard. Restricted to teamstrength.com employees.';