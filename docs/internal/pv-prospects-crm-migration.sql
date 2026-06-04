-- ============================================================
-- CRM multi-user assignment columns — run once in Supabase SQL editor
-- ============================================================

ALTER TABLE pv_prospects
  ADD COLUMN IF NOT EXISTS assigned_to   TEXT,   -- email of the CRM user responsible
  ADD COLUMN IF NOT EXISTS assigned_name TEXT,   -- display name (e.g. "Alexander")
  ADD COLUMN IF NOT EXISTS segment       TEXT DEFAULT 'developer', -- 'developer' | 'commercial'
  ADD COLUMN IF NOT EXISTS email_confidence NUMERIC,               -- Hunter score 0-100
  -- RTB / project status (developer segment) — declared in PvProspect type
  ADD COLUMN IF NOT EXISTS rtb_status              TEXT,
  ADD COLUMN IF NOT EXISTS connection_terms_status TEXT,
  ADD COLUMN IF NOT EXISTS env_permit_status       TEXT,
  ADD COLUMN IF NOT EXISTS building_permit_status  TEXT,
  ADD COLUMN IF NOT EXISTS satellite_check         TEXT,  -- 'not_built'|'partially_built'|'built'|'unknown'
  ADD COLUMN IF NOT EXISTS bess_sales_angle        TEXT,
  ADD COLUMN IF NOT EXISTS construction_mwp        NUMERIC,
  ADD COLUMN IF NOT EXISTS operational_mwp         NUMERIC,
  -- Commercial segment (rooftop self-consumption prospects)
  ADD COLUMN IF NOT EXISTS place_id            TEXT,    -- Google place_id (dedup key)
  ADD COLUMN IF NOT EXISTS roof_area_m2        NUMERIC,
  ADD COLUMN IF NOT EXISTS annual_kwh          NUMERIC,
  ADD COLUMN IF NOT EXISTS annual_savings_eur  NUMERIC,
  ADD COLUMN IF NOT EXISTS payback_years       NUMERIC,
  ADD COLUMN IF NOT EXISTS has_existing_pv     BOOLEAN,
  ADD COLUMN IF NOT EXISTS roof_image_url      TEXT;     -- /crm-roofs/<place_id>.png

CREATE INDEX IF NOT EXISTS idx_pv_prospects_assigned ON pv_prospects(assigned_to);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_segment  ON pv_prospects(segment);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_rtb      ON pv_prospects(rtb_status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_pv_prospects_place_id
  ON pv_prospects(place_id) WHERE place_id IS NOT NULL;

-- Outreach suppression + send-tracking are stored on the existing tags[] column
-- ('unsubscribed', 'intro_sent:<date>', 'batch:<date>') — no extra tables needed.

-- Phase 2: search aliases, activity feed, industry
ALTER TABLE pv_prospects
  ADD COLUMN IF NOT EXISTS search_aliases TEXT,                        -- transliterated names for EN search
  ADD COLUMN IF NOT EXISTS activity_feed  JSONB DEFAULT '[]'::jsonb,  -- dated notes / events [{ts,author,type,body}]
  ADD COLUMN IF NOT EXISTS industry       TEXT;                        -- commercial sector (warehouse, hotel, clinic…)

CREATE INDEX IF NOT EXISTS idx_pv_prospects_industry ON pv_prospects(industry);

-- Directors (register + multi-director search)
ALTER TABLE pv_prospects
  ADD COLUMN IF NOT EXISTS contact_director_1 TEXT,
  ADD COLUMN IF NOT EXISTS contact_director_2 TEXT,
  ADD COLUMN IF NOT EXISTS all_directors      TEXT;  -- display: "Name1 · Name2 · …"

-- Verify
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'pv_prospects'
  AND column_name IN ('assigned_to', 'segment', 'rtb_status', 'satellite_check',
                      'place_id', 'roof_image_url', 'annual_savings_eur',
                      'search_aliases', 'activity_feed', 'industry',
                      'contact_director_1', 'contact_director_2', 'all_directors');
