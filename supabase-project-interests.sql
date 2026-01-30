-- Create project_interests table for park acquisition inquiries
-- This table stores CONFIDENTIAL buyer contact information (not shared with sellers)

CREATE TABLE IF NOT EXISTS project_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Project identification
  project_ref TEXT NOT NULL,
  
  -- Buyer contact information (PRIVATE - admin only)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  
  -- Interest details
  scenario TEXT CHECK (scenario IN ('solar-only', 'solar-bess')),
  source TEXT DEFAULT 'project_listing',
  
  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'nda-sent', 'due-diligence', 'negotiating', 'closed', 'declined')),
  assigned_to TEXT,
  
  -- Privacy and tracking
  notes TEXT[],
  nda_signed BOOLEAN DEFAULT false,
  site_visit_requested BOOLEAN DEFAULT false
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_interests_ref ON project_interests(project_ref);
CREATE INDEX IF NOT EXISTS idx_project_interests_status ON project_interests(status);
CREATE INDEX IF NOT EXISTS idx_project_interests_created_at ON project_interests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_interests_email ON project_interests(email);

-- Enable Row Level Security
ALTER TABLE project_interests ENABLE ROW LEVEL SECURITY;

-- Create policies - PUBLIC can insert (express interest)
CREATE POLICY "Allow public insert on project_interests" ON project_interests
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read (admin only)
CREATE POLICY "Allow authenticated read on project_interests" ON project_interests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on project_interests" ON project_interests
  FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE TRIGGER update_project_interests_updated_at BEFORE UPDATE ON project_interests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify table creation
SELECT 'PROJECT INTERESTS TABLE CREATED' as status,
       table_name,
       column_name,
       data_type
FROM information_schema.columns 
WHERE table_name = 'project_interests';

