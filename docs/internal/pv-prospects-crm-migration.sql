-- ============================================================
-- CRM multi-user assignment columns — run once in Supabase SQL editor
-- ============================================================

ALTER TABLE pv_prospects
  ADD COLUMN IF NOT EXISTS assigned_to   TEXT,   -- email of the CRM user responsible
  ADD COLUMN IF NOT EXISTS assigned_name TEXT,   -- display name (e.g. "Alexander")
  ADD COLUMN IF NOT EXISTS segment       TEXT DEFAULT 'developer'; -- 'developer' | 'commercial'

CREATE INDEX IF NOT EXISTS idx_pv_prospects_assigned ON pv_prospects(assigned_to);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_segment  ON pv_prospects(segment);

-- Outreach suppression + send-tracking are stored on the existing tags[] column
-- ('unsubscribed', 'intro_sent:<date>', 'batch:<date>') — no extra tables needed.

-- Verify
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'pv_prospects'
  AND column_name IN ('assigned_to', 'assigned_name', 'segment');
