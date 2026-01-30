-- SolarFarms.cy Projects Table Schema
-- Run these commands in your Supabase SQL editor

-- Projects Table for CMS management
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
  status_label TEXT, -- Custom display label
  target_date TEXT, -- e.g. "Q4 2026"
  
  -- Technical Specs
  capacity_mwp DECIMAL(10,2),
  capacity_mwh_bess DECIMAL(10,2),
  bess_duration_hours INTEGER,
  technology TEXT, -- "Bifacial", "Monocrystalline", "Tracker"
  mounting TEXT, -- "Fixed Tilt", "Single-Axis Tracker"
  specific_yield INTEGER, -- kWh/kWp
  annual_generation_gwh DECIMAL(10,2),
  
  -- Financial
  total_capex DECIMAL(15,2),
  bess_cost_per_mwh DECIMAL(10,2),
  rtb_acquisition_cost DECIMAL(15,2),
  equity_required DECIMAL(15,2),
  annual_revenue DECIMAL(15,2),
  annual_opex DECIMAL(15,2),
  net_cash_flow DECIMAL(15,2),
  leveraged_irr TEXT, -- e.g. "35%+" 
  dscr TEXT, -- e.g. "Above 3.0x"
  
  -- Revenue Assumptions
  base_power_price DECIMAL(10,2), -- €/MWh
  evening_arbitrage_price DECIMAL(10,2), -- €/MWh
  
  -- Display
  image_url TEXT,
  highlights TEXT[], -- Array of highlight strings
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Newsletter
  newsletter_sent_at TIMESTAMP WITH TIME ZONE,
  newsletter_sent_to INTEGER DEFAULT 0
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies - Public can read available projects, admin can manage all
CREATE POLICY "Allow public read on available projects" ON projects
  FOR SELECT TO PUBLIC USING (status != 'draft');

CREATE POLICY "Allow authenticated full access on projects" ON projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Newsletter send log table
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

CREATE INDEX IF NOT EXISTS idx_newsletter_sends_type ON newsletter_sends(type);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_created_at ON newsletter_sends(created_at DESC);

ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated full access on newsletter_sends" ON newsletter_sends
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert Agios Theodoros project
INSERT INTO projects (
  reference_code,
  title,
  slug,
  location,
  district,
  status,
  status_label,
  target_date,
  capacity_mwp,
  capacity_mwh_bess,
  bess_duration_hours,
  technology,
  mounting,
  specific_yield,
  annual_generation_gwh,
  total_capex,
  bess_cost_per_mwh,
  rtb_acquisition_cost,
  equity_required,
  annual_revenue,
  annual_opex,
  net_cash_flow,
  leveraged_irr,
  dscr,
  base_power_price,
  evening_arbitrage_price,
  image_url,
  highlights,
  featured
) VALUES (
  'PARK-RTB-2026',
  'Agios Theodoros Solar Park with Battery Storage',
  'agios-theodoros-rtb',
  'Agios Theodoros, Larnaca District, Cyprus',
  'Larnaca',
  'available',
  'Ready to Build',
  'Q4 2026',
  2.64,
  10.56,
  4,
  'Bifacial PV',
  'Fixed Tilt',
  2100,
  5.54,
  4590000,
  127000,
  1000000,
  1750000,
  1230000,
  89000,
  1140000,
  '35%+',
  'Above 3.0x',
  110,
  160,
  '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg',
  ARRAY[
    'Integrated 10.56 MWh BESS - 4-hour duration (€127k/MWh)',
    'Bifacial PV modules - 2,100 kWh/kWp yield',
    'Zero curtailment risk with battery arbitrage',
    'Leveraged equity IRR: high 30% range',
    'Single operator: Lighthief EPC + O&M'
  ],
  true
);

-- Verify tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'newsletter_sends');
