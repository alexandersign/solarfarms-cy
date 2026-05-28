-- Sales targeting + contact columns (run after cyprus-energy-plants-migration.sql)

ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS pipeline_stage TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS primary_sales_target TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS secondary_sales_targets TEXT[] DEFAULT '{}';
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS sales_target_summary TEXT;

ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_director_1 TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_director_2 TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_secretary TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_website TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS contact_email_source TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS registered_address TEXT;
ALTER TABLE cyprus_energy_plants ADD COLUMN IF NOT EXISTS register_enriched_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS cyprus_director_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  director_key TEXT NOT NULL,
  display_name TEXT NOT NULL,
  spv_count INTEGER DEFAULT 0,
  licence_count INTEGER DEFAULT 0,
  total_pv_mwp DECIMAL,
  total_bess_mwp DECIMAL,
  companies TEXT[] DEFAULT '{}',
  sample_targets TEXT[] DEFAULT '{}',
  districts TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(director_key)
);

ALTER TABLE cyprus_director_index ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for service role on cyprus_director_index" ON cyprus_director_index
  FOR ALL USING (true) WITH CHECK (true);
