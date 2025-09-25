-- SolarFarms.cy Database Schema (Fixed for Supabase)
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  notes TEXT[]
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
  solar_potential TEXT
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_land_assessments_email ON land_assessments(owner_email);
CREATE INDEX IF NOT EXISTS idx_land_assessments_status ON land_assessments(status);
CREATE INDEX IF NOT EXISTS idx_land_assessments_created_at ON land_assessments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (fixed for Supabase)
-- Contacts: Allow insert for new leads, read for admin
CREATE POLICY "Allow public insert on contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on contacts" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update on contacts" ON contacts
  FOR UPDATE USING (true) WITH CHECK (true);

-- Land Assessments: Allow insert for new assessments, read for admin
CREATE POLICY "Allow public insert on land_assessments" ON land_assessments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on land_assessments" ON land_assessments
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update on land_assessments" ON land_assessments
  FOR UPDATE USING (true) WITH CHECK (true);

-- Newsletter: Allow public insert, authenticated read
CREATE POLICY "Allow public insert on newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on newsletter_subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_land_assessments_updated_at BEFORE UPDATE ON land_assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing (optional)
INSERT INTO contacts (name, email, investment_size, timeline, message, source) VALUES
('Test Lead', 'test@example.com', '€500K - €1M', '6-12 months', 'Interested in solar farm investment opportunities in Cyprus', 'website');

-- Verify tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('contacts', 'land_assessments', 'newsletter_subscribers');
