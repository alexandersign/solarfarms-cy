-- ============================================================
-- PV Prospects — RTB / BESS intelligence columns (Cyprus pipeline)
-- Run in Supabase SQL Editor after baseline pv_prospects exists.
-- ============================================================

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS rtb_status TEXT;
-- candidate | verified | not_rtb | partial_candidate

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS connection_terms_status TEXT DEFAULT 'none';
-- none | applied | preliminary_issued | final_issued

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS env_permit_status TEXT DEFAULT 'none';
-- none | applied | approved

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS building_permit_status TEXT DEFAULT 'none';
-- none | applied | approved

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS satellite_check TEXT DEFAULT 'unknown';
-- not_built | partially_built | built | unknown

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS bess_sales_angle TEXT DEFAULT 'none';
-- retrofit | pre_sale | both | none

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS construction_mwp DECIMAL;
ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS operational_mwp DECIMAL;

COMMENT ON COLUMN pv_prospects.rtb_status IS 'RTB pipeline: candidate=no operational CERA row; verified=manual; not_rtb=mixed or below threshold';
COMMENT ON COLUMN pv_prospects.bess_sales_angle IS 'Commercial angle from CERA CSV aggregate';
