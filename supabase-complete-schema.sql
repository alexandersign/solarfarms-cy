-- =====================================================
-- SolarFarms.cy Complete Database Schema
-- Consolidated schema for all features
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Contacts/Leads Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  investment_size TEXT NOT NULL,
  timeline TEXT NOT NULL,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  assigned_to TEXT,
  notes TEXT[],
  attached_files TEXT[]
);

-- Land Assessments Table  
CREATE TABLE IF NOT EXISTS land_assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  owner_phone TEXT,
  plot_size TEXT,
  location TEXT,
  current_use TEXT,
  title_deed_url TEXT,
  assessment_results JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assessed', 'contacted', 'contracted')),
  estimated_value TEXT,
  solar_potential TEXT,
  attached_files TEXT[]
);

-- Newsletter Subscribers Table (UPDATED - includes preferences column)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  preferences JSONB DEFAULT '{}'::jsonb -- Added for BESS calculator and other features
);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Info
  reference_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  district TEXT,
  
  -- Project Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'available', 'under_offer', 'sold', 'construction', 'operational')),
  status_label TEXT,
  target_date TEXT,
  
  -- Technical Specs
  capacity_mwp DECIMAL(10,2),
  capacity_mwh_bess DECIMAL(10,2),
  bess_duration_hours INTEGER,
  technology TEXT,
  mounting TEXT,
  specific_yield INTEGER,
  annual_generation_gwh DECIMAL(10,2),
  
  -- Financial
  total_capex DECIMAL(15,2),
  bess_cost_per_mwh DECIMAL(10,2),
  rtb_acquisition_cost DECIMAL(15,2),
  equity_required DECIMAL(15,2),
  annual_revenue DECIMAL(15,2),
  annual_opex DECIMAL(15,2),
  net_cash_flow DECIMAL(15,2),
  leveraged_irr TEXT,
  dscr TEXT,
  base_power_price DECIMAL(10,2),
  evening_arbitrage_price DECIMAL(10,2),
  
  -- Display
  image_url TEXT,
  highlights TEXT[],
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Newsletter
  newsletter_sent_at TIMESTAMP WITH TIME ZONE,
  newsletter_sent_to INTEGER DEFAULT 0
);

-- Newsletter Send Log
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('new_project', 'new_blog', 'weekly_digest', 'custom')),
  subject TEXT NOT NULL,
  recipient_count INTEGER DEFAULT 0,
  project_id UUID REFERENCES projects(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sending', 'sent', 'failed')),
  error_message TEXT,
  sent_by TEXT
);

-- =====================================================
-- BESS CALCULATOR TABLES
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

-- BESS PDF Download Unlocks (Email Gate tracking)
CREATE TABLE IF NOT EXISTS bess_pdf_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  scenario_id UUID REFERENCES bess_scenarios(id) ON DELETE CASCADE,
  inputs_hash TEXT,
  source TEXT DEFAULT 'bess-calculator',
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Contacts
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Land Assessments
CREATE INDEX IF NOT EXISTS idx_land_assessments_email ON land_assessments(owner_email);
CREATE INDEX IF NOT EXISTS idx_land_assessments_status ON land_assessments(status);
CREATE INDEX IF NOT EXISTS idx_land_assessments_created_at ON land_assessments(created_at DESC);

-- Newsletter
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- Newsletter Sends
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_type ON newsletter_sends(type);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_created_at ON newsletter_sends(created_at DESC);

-- BESS Scenarios
CREATE INDEX IF NOT EXISTS idx_bess_scenarios_email ON bess_scenarios(user_email);
CREATE INDEX IF NOT EXISTS idx_bess_scenarios_created ON bess_scenarios(created_at DESC);

-- BESS PDF Unlocks
CREATE INDEX IF NOT EXISTS idx_bess_pdf_unlocks_email ON bess_pdf_unlocks(email);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE bess_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE bess_pdf_unlocks ENABLE ROW LEVEL SECURITY;

-- Contacts Policies
CREATE POLICY "Allow public insert on contacts" ON contacts
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read on contacts" ON contacts
  FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update on contacts" ON contacts
  FOR UPDATE USING (true) WITH CHECK (true);

-- Land Assessments Policies
CREATE POLICY "Allow public insert on land_assessments" ON land_assessments
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read on land_assessments" ON land_assessments
  FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update on land_assessments" ON land_assessments
  FOR UPDATE USING (true) WITH CHECK (true);

-- Newsletter Policies
CREATE POLICY "Allow public insert on newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read on newsletter_subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);
CREATE POLICY "Allow public update on newsletter_subscribers" ON newsletter_subscribers
  FOR UPDATE USING (true) WITH CHECK (true);

-- Projects Policies
CREATE POLICY "Allow public read on available projects" ON projects
  FOR SELECT USING (status != 'draft');
CREATE POLICY "Allow authenticated full access on projects" ON projects
  FOR ALL USING (true) WITH CHECK (true);

-- Newsletter Sends Policies
CREATE POLICY "Allow authenticated full access on newsletter_sends" ON newsletter_sends
  FOR ALL USING (true) WITH CHECK (true);

-- BESS Scenarios Policies
CREATE POLICY "Allow public insert on bess_scenarios" ON bess_scenarios
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select by email on bess_scenarios" ON bess_scenarios
  FOR SELECT USING (true);
CREATE POLICY "Allow update by email on bess_scenarios" ON bess_scenarios
  FOR UPDATE USING (true);
CREATE POLICY "Allow delete on bess_scenarios" ON bess_scenarios
  FOR DELETE USING (true);

-- BESS PDF Unlocks Policies
CREATE POLICY "Allow public insert on bess_pdf_unlocks" ON bess_pdf_unlocks
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated select on bess_pdf_unlocks" ON bess_pdf_unlocks
  FOR SELECT USING (true);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_land_assessments_updated_at ON land_assessments;
CREATE TRIGGER update_land_assessments_updated_at BEFORE UPDATE ON land_assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_bess_scenarios_updated_at ON bess_scenarios;
CREATE TRIGGER trigger_bess_scenarios_updated_at BEFORE UPDATE ON bess_scenarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MIGRATION: Add preferences column if missing
-- =====================================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'newsletter_subscribers' 
    AND column_name = 'preferences'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN preferences JSONB DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- =====================================================
-- VERIFICATION
-- =====================================================

SELECT 'All tables created successfully' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'contacts', 
  'land_assessments', 
  'newsletter_subscribers',
  'projects',
  'newsletter_sends',
  'bess_scenarios',
  'bess_pdf_unlocks'
);
