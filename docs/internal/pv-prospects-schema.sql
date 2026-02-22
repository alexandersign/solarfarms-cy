-- ============================================================
-- PV Plant Prospects CRM - Supabase Schema
-- Run this in Supabase SQL Editor to create the table
-- ============================================================

-- Create the pv_prospects table
CREATE TABLE IF NOT EXISTS pv_prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Plant Information
  plant_name TEXT NOT NULL,
  cera_license_no TEXT,
  capacity_mwp DECIMAL,
  technology TEXT DEFAULT 'PV',           -- PV, Wind, Biomass, BESS, Hybrid
  plant_status TEXT DEFAULT 'operational', -- operational, under_construction, licensed, planned, decommissioned
  location TEXT,
  district TEXT,                           -- Nicosia, Limassol, Larnaca, Paphos, Famagusta, Kyrenia
  grid_connection_point TEXT,
  commissioning_date TEXT,
  curtailment_rate DECIMAL,               -- % curtailment if known

  -- Company Information
  company_name TEXT,
  company_reg_no TEXT,                    -- Cyprus Dept of Registrar number (e.g. HE 123456)
  parent_group TEXT,                       -- Holding/group company
  registered_address TEXT,
  company_website TEXT,

  -- Primary Decision Maker
  contact_name TEXT,
  contact_title TEXT,                      -- CEO, Director, Managing Partner, etc.
  contact_email TEXT,
  contact_phone TEXT,
  contact_linkedin TEXT,

  -- Secondary Contact
  secondary_contact_name TEXT,
  secondary_contact_title TEXT,
  secondary_contact_email TEXT,
  secondary_contact_phone TEXT,
  secondary_contact_linkedin TEXT,

  -- Outreach CRM Fields
  outreach_status TEXT DEFAULT 'new',
  -- Statuses: new, researching, contacted, responded, meeting_set, proposal_sent, negotiating, won, lost, not_interested
  outreach_channel TEXT,                   -- email, phone, linkedin, referral, in_person
  first_contact_date TIMESTAMP WITH TIME ZONE,
  last_contact_date TIMESTAMP WITH TIME ZONE,
  next_follow_up DATE,

  -- Opportunity Details
  offer_type TEXT,                         -- bess_retrofit, acquisition, epc, o_and_m, partnership, consulting
  estimated_deal_value DECIMAL,
  bess_potential_mwh DECIMAL,

  -- Metadata
  notes TEXT,
  data_source TEXT,                        -- cera, company_register, linkedin, referral, web_research, conference
  tags TEXT[] DEFAULT '{}',
  priority TEXT DEFAULT 'medium'           -- low, medium, high, urgent
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_pv_prospects_outreach_status ON pv_prospects(outreach_status);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_priority ON pv_prospects(priority);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_district ON pv_prospects(district);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_company ON pv_prospects(company_name);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_next_follow_up ON pv_prospects(next_follow_up);
CREATE INDEX IF NOT EXISTS idx_pv_prospects_offer_type ON pv_prospects(offer_type);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_pv_prospects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS pv_prospects_updated_at ON pv_prospects;
CREATE TRIGGER pv_prospects_updated_at
  BEFORE UPDATE ON pv_prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_pv_prospects_updated_at();

-- Enable Row Level Security (allow service role full access)
ALTER TABLE pv_prospects ENABLE ROW LEVEL SECURITY;

-- Policy: allow all operations for authenticated/service role
CREATE POLICY "Allow all for service role" ON pv_prospects
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- DSO/TSO Contacts Reference Table (small, static)
-- ============================================================

CREATE TABLE IF NOT EXISTS grid_operator_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  organization TEXT NOT NULL,             -- EAC DSO, TSOC, CERA
  department TEXT,
  contact_name TEXT,
  contact_title TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  notes TEXT
);

ALTER TABLE grid_operator_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for service role on grid contacts" ON grid_operator_contacts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed DSO/TSO contacts
INSERT INTO grid_operator_contacts (organization, department, contact_name, contact_title, email, phone, address, website, notes) VALUES
  ('EAC - Electricity Authority of Cyprus', 'Distribution System Operator (DSO)', NULL, 'DSO Unit', 'eac@eac.com.cy', '+357 22 201000', '11 Amfipoleos St., 2025 Strovolos, P.O. Box 24506, 1399 Lefkosia', 'https://www.eac.com.cy', 'Main DSO for Cyprus. Emergency line: 1800. Handles grid connections, metering, and distribution network.'),
  ('TSOC - Transmission System Operator Cyprus', 'Transmission Operations', 'Stavros Stavrinos', 'Director', 'director@dsm.org.cy', '+357 22 277000', NULL, 'https://www.tsoc.org.cy', 'Responsible for transmission grid operation. Member of ENTSO-E. Contact page: tsoc.org.cy/organization/contact-us/'),
  ('CERA - Cyprus Energy Regulatory Authority', 'Licensing & Regulation', NULL, 'Licensing Department', NULL, '+357 22 666363', '81-83 Griva Digeni Avenue, 1080 Nicosia', 'https://www.cera.org.cy', 'Issues construction & operation licenses for RES >8MW. Maintains producer licensing archive.'),
  ('CSE - Cyprus Stock Exchange / Energy Market', 'Day-Ahead Market (DAM)', NULL, NULL, NULL, NULL, NULL, 'https://www.cse.com.cy/en-GB/AGORA-ELECTRISMOY/Home/', 'Operates the Cyprus electricity Day-Ahead Market. Market data and participant info.');
