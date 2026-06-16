-- ============================================================
-- HR Portal Schema — Lighthief Cyprus Ltd
-- Apply in Supabase SQL Editor
-- ============================================================

-- Leave requests submitted by employees
CREATE TABLE IF NOT EXISTS hr_leave_requests (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_email TEXT       NOT NULL,
  type          TEXT        NOT NULL CHECK (type IN ('annual','sick','unpaid','toil','public')),
  start_date    DATE        NOT NULL,
  end_date      DATE        NOT NULL,
  days          NUMERIC(4,1) NOT NULL,
  notes         TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_note    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS hr_leave_requests_email_idx ON hr_leave_requests (employee_email);
CREATE INDEX IF NOT EXISTS hr_leave_requests_status_idx ON hr_leave_requests (status);

-- Per-employee per-year leave balances (upserted by admin)
CREATE TABLE IF NOT EXISTS hr_leave_balances (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_email       TEXT        NOT NULL,
  year                 INT         NOT NULL,
  -- Annual leave (Cyprus law minimum: 20 working days)
  annual_entitlement   INT         NOT NULL DEFAULT 20,
  annual_taken         NUMERIC(4,1) NOT NULL DEFAULT 0,
  -- Sick leave (tracked, no contractual pay obligation unless contracted)
  sick_taken           NUMERIC(4,1) NOT NULL DEFAULT 0,
  -- Unpaid leave
  unpaid_taken         NUMERIC(4,1) NOT NULL DEFAULT 0,
  -- Overtime / Time Off In Lieu
  overtime_accrued     NUMERIC(5,1) NOT NULL DEFAULT 0,
  toil_taken           NUMERIC(4,1) NOT NULL DEFAULT 0,
  -- Audit
  last_updated_by      TEXT,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (employee_email, year)
);

CREATE INDEX IF NOT EXISTS hr_leave_balances_email_idx ON hr_leave_balances (employee_email);

-- Auto-update updated_at on hr_leave_requests
CREATE OR REPLACE FUNCTION hr_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hr_leave_requests_updated_at
  BEFORE UPDATE ON hr_leave_requests
  FOR EACH ROW EXECUTE FUNCTION hr_set_updated_at();

CREATE TRIGGER hr_leave_balances_updated_at
  BEFORE UPDATE ON hr_leave_balances
  FOR EACH ROW EXECUTE FUNCTION hr_set_updated_at();

-- ============================================================
-- Seed 2026 balance rows for all employees (run once)
-- Update annual_entitlement per employee if different from 20
-- ============================================================
INSERT INTO hr_leave_balances (employee_email, year, annual_entitlement)
VALUES
  ('zinovia@lighthief.com',              2026, 20),
  ('alexander.papacosta@lighthief.com',  2026, 20),
  ('office@lighthief.com',               2026, 20),
  ('costas@lighthief.com',               2026, 20)
ON CONFLICT (employee_email, year) DO NOTHING;
