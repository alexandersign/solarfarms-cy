-- =====================================================
-- Lock every public table behind Row Level Security.
--
-- The anon key is public (browser + git). Without RLS, anyone
-- who has the project URL can read, update, and delete leads,
-- CRM prospects, and HR rows.
--
-- App access: API routes use SUPABASE_SERVICE_ROLE_KEY, which
-- bypasses RLS. Do not add anon SELECT/UPDATE/DELETE policies.
--
-- Run in the Supabase SQL Editor for project solarfarms-cy-leads
-- (iipbxwyvlzxthlblayvw), then confirm advisors no longer flag
-- rls_disabled_in_public.
-- =====================================================

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT c.relname AS tablename
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relkind = 'r'
      AND c.relname NOT LIKE 'pg_%'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;

-- Drop leftover policies (including "public insert/read") so anon
-- cannot use GRANT ALL that older schemas applied.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- Defense in depth: stop anon/authenticated table privileges.
-- Service role still has full access via the supabase_admin bypass.
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;

-- Verify: every public table should show rowsecurity = true
SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relkind = 'r'
ORDER BY 1;
