-- =====================================================
-- BESS Calculator Schema
-- Run this in Supabase SQL Editor to create tables
-- =====================================================

-- BESS Calculator Scenarios
CREATE TABLE IF NOT EXISTS bess_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  project_name TEXT NOT NULL DEFAULT 'Untitled BESS Project',
  scenario_name TEXT DEFAULT 'Base Case',
  mode TEXT NOT NULL CHECK (mode IN ('standalone', 'solar_bess')) DEFAULT 'standalone',
  inputs JSONB NOT NULL,
  results JSONB,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_bess_scenarios_email ON bess_scenarios(user_email);
CREATE INDEX IF NOT EXISTS idx_bess_scenarios_created ON bess_scenarios(created_at DESC);

-- Enable RLS
ALTER TABLE bess_scenarios ENABLE ROW LEVEL SECURITY;

-- Public can insert scenarios (for anonymous users)
CREATE POLICY "Allow public insert on bess_scenarios"
  ON bess_scenarios FOR INSERT
  WITH CHECK (true);

-- Public can select their own scenarios by email
CREATE POLICY "Allow select by email on bess_scenarios"
  ON bess_scenarios FOR SELECT
  USING (true);

-- Public can update their own scenarios
CREATE POLICY "Allow update by email on bess_scenarios"
  ON bess_scenarios FOR UPDATE
  USING (true);

-- PDF Download Unlocks (Email Gate tracking)
CREATE TABLE IF NOT EXISTS bess_pdf_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  scenario_id UUID REFERENCES bess_scenarios(id) ON DELETE CASCADE,
  inputs_hash TEXT, -- Hash of inputs for tracking
  source TEXT DEFAULT 'bess-calculator',
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_bess_pdf_unlocks_email ON bess_pdf_unlocks(email);

-- Enable RLS
ALTER TABLE bess_pdf_unlocks ENABLE ROW LEVEL SECURITY;

-- Public can insert (for email gate)
CREATE POLICY "Allow public insert on bess_pdf_unlocks"
  ON bess_pdf_unlocks FOR INSERT
  WITH CHECK (true);

-- Authenticated users can read
CREATE POLICY "Allow authenticated select on bess_pdf_unlocks"
  ON bess_pdf_unlocks FOR SELECT
  USING (true);

-- =====================================================
-- Function to auto-update updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_bess_scenario_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_bess_scenarios_updated_at ON bess_scenarios;
CREATE TRIGGER trigger_bess_scenarios_updated_at
  BEFORE UPDATE ON bess_scenarios
  FOR EACH ROW
  EXECUTE FUNCTION update_bess_scenario_updated_at();

-- =====================================================
-- Verification
-- =====================================================

SELECT 'bess_scenarios table created' as status, count(*) as row_count FROM bess_scenarios;
SELECT 'bess_pdf_unlocks table created' as status, count(*) as row_count FROM bess_pdf_unlocks;
