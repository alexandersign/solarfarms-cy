-- ============================================================
-- CRM multi-user assignment columns — run once in Supabase SQL editor
-- ============================================================

ALTER TABLE pv_prospects
  ADD COLUMN IF NOT EXISTS assigned_to   TEXT,   -- email of the CRM user responsible
  ADD COLUMN IF NOT EXISTS assigned_name TEXT;   -- display name (e.g. "Alexander")

CREATE INDEX IF NOT EXISTS idx_pv_prospects_assigned
  ON pv_prospects(assigned_to);

-- Verify
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'pv_prospects'
  AND column_name IN ('assigned_to', 'assigned_name');
