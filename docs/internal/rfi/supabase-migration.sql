-- ============================================================
-- RFI / RFP Tracker — Supabase Migration
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Main tracker table
CREATE TABLE IF NOT EXISTS rfi_tracker (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),

  -- Core fields
  reference     TEXT NOT NULL,           -- LCY-RFI-001
  type          TEXT NOT NULL DEFAULT 'RFI',  -- RFI | RFP | RFQ | RFC | NDA | OTHER
  direction     TEXT NOT NULL DEFAULT 'outbound', -- outbound | inbound
  subject       TEXT NOT NULL,
  description   TEXT,

  -- Parties
  from_company  TEXT NOT NULL,
  from_contact  TEXT,
  from_email    TEXT,
  to_company    TEXT NOT NULL,
  to_contact    TEXT,
  to_email      TEXT,

  -- Dates
  date_sent     DATE,
  date_due      DATE,
  date_responded DATE,

  -- Status & priority
  status        TEXT NOT NULL DEFAULT 'draft',
  priority      TEXT NOT NULL DEFAULT 'medium',

  -- Categorisation
  category      TEXT,            -- Technical, Commercial, Legal, MV Equipment, EMS/SCADA
  items_count   INT DEFAULT 0,
  items_resolved INT DEFAULT 0,

  -- Response
  response_summary TEXT,

  -- File reference (local path)
  file_ref      TEXT,

  -- Email tracking
  email_sent    BOOLEAN DEFAULT FALSE,
  email_message_id TEXT,

  -- Metadata
  tags          TEXT[] DEFAULT '{}',
  notes         TEXT
);

-- 2. Correspondence log (individual emails per RFI)
CREATE TABLE IF NOT EXISTS rfi_correspondence (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now(),

  rfi_id        UUID NOT NULL REFERENCES rfi_tracker(id) ON DELETE CASCADE,
  direction     TEXT NOT NULL DEFAULT 'sent',   -- sent | received
  date          DATE NOT NULL,
  from_email    TEXT NOT NULL,
  to_email      TEXT NOT NULL,
  subject       TEXT NOT NULL,
  body_preview  TEXT,
  email_message_id TEXT,
  attachments   TEXT[] DEFAULT '{}'
);

-- 3. Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_rfi_status     ON rfi_tracker(status);
CREATE INDEX IF NOT EXISTS idx_rfi_priority   ON rfi_tracker(priority);
CREATE INDEX IF NOT EXISTS idx_rfi_direction  ON rfi_tracker(direction);
CREATE INDEX IF NOT EXISTS idx_rfi_type       ON rfi_tracker(type);
CREATE INDEX IF NOT EXISTS idx_rfi_date_due   ON rfi_tracker(date_due);
CREATE INDEX IF NOT EXISTS idx_rfi_corr_rfi   ON rfi_correspondence(rfi_id);

-- 4. Enable Row Level Security (optional — disable if only server-side access)
ALTER TABLE rfi_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfi_correspondence ENABLE ROW LEVEL SECURITY;

-- Allow anon key full access (since dashboard is password-protected at app level)
CREATE POLICY "Allow full access to rfi_tracker" ON rfi_tracker
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access to rfi_correspondence" ON rfi_correspondence
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rfi_tracker_updated_at
  BEFORE UPDATE ON rfi_tracker
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
