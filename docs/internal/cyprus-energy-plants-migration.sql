-- ============================================================
-- Cyprus Energy Plants + EAC RES Systems (prospect intelligence)
-- Run in Supabase SQL Editor after baseline pv_prospects exists.
-- ============================================================

CREATE TABLE IF NOT EXISTS eac_res_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  district TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  capacity_kw DECIMAL,
  technology TEXT,
  municipality TEXT,
  feeder_substation TEXT,
  application_ref TEXT,
  meter_id TEXT,
  raw_row JSONB,
  source_pdf_url TEXT,
  source_pdf_sha256 TEXT,
  normalized_name TEXT
);

CREATE INDEX IF NOT EXISTS idx_eac_res_district ON eac_res_systems(district);
CREATE INDEX IF NOT EXISTS idx_eac_res_normalized ON eac_res_systems(normalized_name);
CREATE INDEX IF NOT EXISTS idx_eac_res_municipality ON eac_res_systems(municipality);

CREATE TABLE IF NOT EXISTS cyprus_energy_plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cera_license_no TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  company_reg_no TEXT,
  pv_kw DECIMAL DEFAULT 0,
  bess_kw DECIMAL DEFAULT 0,
  bess_kwh DECIMAL DEFAULT 0,
  plant_class TEXT NOT NULL,
  license_status TEXT NOT NULL,
  license_type_raw TEXT,
  operating_regime TEXT,
  district TEXT,
  municipality TEXT,
  license_start_date TEXT,
  license_end_date TEXT,
  eac_res_listed BOOLEAN DEFAULT FALSE,
  eac_match_id UUID REFERENCES eac_res_systems(id) ON DELETE SET NULL,
  eac_match_confidence DECIMAL,
  eac_listed_capacity_kw DECIMAL,
  connection_terms_status TEXT DEFAULT 'unknown',
  commercial_segments TEXT[] DEFAULT '{}',
  priority_score INTEGER DEFAULT 0,
  outreach_priority TEXT DEFAULT 'medium',
  existing_client BOOLEAN DEFAULT FALSE,
  portfolio_group TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_cyprus_plants_company ON cyprus_energy_plants(company_name);
CREATE INDEX IF NOT EXISTS idx_cyprus_plants_district ON cyprus_energy_plants(district);
CREATE INDEX IF NOT EXISTS idx_cyprus_plants_class ON cyprus_energy_plants(plant_class);
CREATE INDEX IF NOT EXISTS idx_cyprus_plants_eac_listed ON cyprus_energy_plants(eac_res_listed);
CREATE INDEX IF NOT EXISTS idx_cyprus_plants_segments ON cyprus_energy_plants USING GIN(commercial_segments);

ALTER TABLE pv_prospects ADD COLUMN IF NOT EXISTS plant_id UUID REFERENCES cyprus_energy_plants(id) ON DELETE SET NULL;

COMMENT ON COLUMN cyprus_energy_plants.plant_class IS 'pv_only | pv_bess_hybrid | bess_standalone';
COMMENT ON COLUMN cyprus_energy_plants.license_status IS 'operational | under_construction';
COMMENT ON COLUMN cyprus_energy_plants.connection_terms_status IS 'unknown | none | applied | preliminary_issued | final_issued — manual unless EAC portal wired';
COMMENT ON COLUMN cyprus_energy_plants.eac_res_listed IS 'Listed on EAC RES System Table (distribution network inventory; NOT same as private connection terms PDF)';

ALTER TABLE eac_res_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE cyprus_energy_plants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for service role on eac_res_systems" ON eac_res_systems
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for service role on cyprus_energy_plants" ON cyprus_energy_plants
  FOR ALL USING (true) WITH CHECK (true);
