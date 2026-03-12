-- ============================================================
-- FIELD SERVICE MANAGEMENT SYSTEM (FSMS) - Database Schema
-- Lighthief Cyprus Ltd
-- ============================================================

-- Enable UUID extension (already enabled in existing Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. SERVICE USERS (managed by Auth.js, extended with roles)
-- ============================================================
CREATE TABLE IF NOT EXISTS service_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('serviceman', 'manager', 'client')),
  phone TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  tablet_device_id TEXT,
  current_lat DECIMAL(10, 8),
  current_lng DECIMAL(11, 8),
  location_updated_at TIMESTAMPTZ,
  client_group TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_users_role ON service_users(role);
CREATE INDEX idx_service_users_email ON service_users(email);
CREATE INDEX idx_service_users_client_group ON service_users(client_group);

-- ============================================================
-- 2. SERVICE PARKS (site registry)
-- ============================================================
CREATE TABLE IF NOT EXISTS service_parks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT UNIQUE NOT NULL,
  park_type TEXT NOT NULL CHECK (park_type IN ('bess', 'pv')),
  client_group TEXT NOT NULL,
  site_name TEXT NOT NULL,
  site_address TEXT,
  district TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  capacity_mw DECIMAL(8, 2),
  capacity_mwh DECIMAL(8, 2),
  container_count INTEGER,
  commissioning_date DATE,
  warranty_expiry DATE,
  ltsa_tier TEXT CHECK (ltsa_tier IN ('A', 'B', 'C', 'D')),
  voltus_site_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_parks_type ON service_parks(park_type);
CREATE INDEX idx_service_parks_client_group ON service_parks(client_group);
CREATE INDEX idx_service_parks_district ON service_parks(district);

-- ============================================================
-- 3. ALARMS
-- ============================================================
CREATE TABLE IF NOT EXISTS alarms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  park_id UUID REFERENCES service_parks(id) ON DELETE CASCADE,
  source TEXT NOT NULL CHECK (source IN ('voltus', 'manual', 'system')),
  voltus_alarm_id TEXT,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'major', 'minor', 'informational')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active', 'acknowledged', 'work_order_created', 'resolved'
  )),
  title TEXT NOT NULL,
  description TEXT,
  alarm_code TEXT,
  component TEXT,
  acknowledged_by UUID REFERENCES service_users(id),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alarms_park ON alarms(park_id);
CREATE INDEX idx_alarms_status ON alarms(status);
CREATE INDEX idx_alarms_severity ON alarms(severity);
CREATE INDEX idx_alarms_created ON alarms(created_at DESC);

-- ============================================================
-- 4. WORK ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wo_number TEXT UNIQUE NOT NULL,
  park_id UUID REFERENCES service_parks(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES service_users(id),
  created_by UUID REFERENCES service_users(id),
  type TEXT NOT NULL CHECK (type IN (
    'preventive', 'corrective', 'inspection',
    'commissioning', 'warranty_claim', 'emergency'
  )),
  priority TEXT NOT NULL CHECK (priority IN ('critical', 'major', 'minor', 'routine')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN (
    'open', 'assigned', 'in_transit', 'on_site',
    'in_progress', 'pending_parts', 'completed', 'cancelled'
  )),
  title TEXT NOT NULL,
  description TEXT,
  checklist_template_id TEXT,
  scheduled_date DATE,
  eta_minutes INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  alarm_id UUID REFERENCES alarms(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wo_assigned ON work_orders(assigned_to);
CREATE INDEX idx_wo_park ON work_orders(park_id);
CREATE INDEX idx_wo_status ON work_orders(status);
CREATE INDEX idx_wo_scheduled ON work_orders(scheduled_date);
CREATE INDEX idx_wo_number ON work_orders(wo_number);

-- Back-reference from alarms to work orders
ALTER TABLE alarms ADD COLUMN IF NOT EXISTS work_order_id UUID REFERENCES work_orders(id);

-- ============================================================
-- 5. CHECKLIST SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS checklist_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  submitted_by UUID REFERENCES service_users(id),
  data JSONB NOT NULL,
  result TEXT CHECK (result IN ('pass', 'fail', 'partial')),
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checklist_wo ON checklist_submissions(work_order_id);
CREATE INDEX idx_checklist_template ON checklist_submissions(template_id);

-- ============================================================
-- 6. SERVICE PHOTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS service_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  checklist_submission_id UUID REFERENCES checklist_submissions(id),
  uploaded_by UUID REFERENCES service_users(id),
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  caption TEXT,
  category TEXT CHECK (category IN (
    'defect', 'before', 'after', 'thermal',
    'serial_number', 'general', 'warranty_evidence'
  )),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_photos_wo ON service_photos(work_order_id);

-- ============================================================
-- 7. LOCATION HISTORY (GPS tracking)
-- ============================================================
CREATE TABLE IF NOT EXISTS location_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES service_users(id) ON DELETE CASCADE,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  accuracy DECIMAL(8, 2),
  speed DECIMAL(6, 2),
  heading DECIMAL(5, 2),
  work_order_id UUID REFERENCES work_orders(id),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_location_user ON location_history(user_id);
CREATE INDEX idx_location_time ON location_history(recorded_at DESC);
CREATE INDEX idx_location_user_time ON location_history(user_id, recorded_at DESC);

-- Partition hint: for production, consider partitioning by month
-- CREATE TABLE location_history_2026_03 PARTITION OF location_history
--   FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');

-- ============================================================
-- 8. INVENTORY ITEMS (warehouse parts catalog)
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE NOT NULL,
  qr_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'bms', 'cooling', 'electrical', 'pcs',
    'sensors', 'communications', 'consumables',
    'pv_panels', 'pv_inverters', 'pv_electrical', 'other'
  )),
  description TEXT,
  unit TEXT DEFAULT 'each',
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 1,
  reorder_point INTEGER NOT NULL DEFAULT 2,
  reorder_qty INTEGER,
  lead_time_days INTEGER,
  unit_cost DECIMAL(10, 2),
  supplier TEXT,
  oem_part_number TEXT,
  compatible_with TEXT[],
  location_in_warehouse TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inventory_category ON inventory_items(category);
CREATE INDEX idx_inventory_sku ON inventory_items(sku);
CREATE INDEX idx_inventory_stock ON inventory_items(current_stock);

-- ============================================================
-- 9. INVENTORY TRANSACTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
  user_id UUID REFERENCES service_users(id),
  work_order_id UUID REFERENCES work_orders(id),
  type TEXT NOT NULL CHECK (type IN ('checkout', 'checkin', 'restock', 'adjustment', 'damaged')),
  quantity INTEGER NOT NULL,
  notes TEXT,
  scanned_qr BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inv_tx_item ON inventory_transactions(item_id);
CREATE INDEX idx_inv_tx_user ON inventory_transactions(user_id);
CREATE INDEX idx_inv_tx_wo ON inventory_transactions(work_order_id);

-- ============================================================
-- 10. REORDER ALERTS
-- ============================================================
CREATE TABLE IF NOT EXISTS reorder_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'reorder_triggered', 'out_of_stock')),
  current_stock INTEGER NOT NULL,
  threshold INTEGER NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'ordered', 'received', 'dismissed')),
  notified_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_reorder_status ON reorder_alerts(status);
CREATE INDEX idx_reorder_item ON reorder_alerts(item_id);

-- ============================================================
-- 11. TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_service_users_updated
  BEFORE UPDATE ON service_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_service_parks_updated
  BEFORE UPDATE ON service_parks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_work_orders_updated
  BEFORE UPDATE ON work_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_alarms_updated
  BEFORE UPDATE ON alarms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_inventory_items_updated
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update inventory stock on transactions
CREATE OR REPLACE FUNCTION update_inventory_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type IN ('checkout', 'damaged') THEN
    UPDATE inventory_items
    SET current_stock = current_stock - NEW.quantity
    WHERE id = NEW.item_id;
  ELSIF NEW.type IN ('checkin', 'restock') THEN
    UPDATE inventory_items
    SET current_stock = current_stock + NEW.quantity
    WHERE id = NEW.item_id;
  END IF;

  -- Check for low stock and create reorder alert
  PERFORM 1 FROM inventory_items
  WHERE id = NEW.item_id
    AND current_stock <= reorder_point
    AND NOT EXISTS (
      SELECT 1 FROM reorder_alerts
      WHERE item_id = NEW.item_id AND status = 'open'
    );

  IF FOUND THEN
    INSERT INTO reorder_alerts (item_id, alert_type, current_stock, threshold)
    SELECT
      id,
      CASE
        WHEN current_stock <= 0 THEN 'out_of_stock'
        WHEN current_stock <= min_stock THEN 'low_stock'
        ELSE 'reorder_triggered'
      END,
      current_stock,
      reorder_point
    FROM inventory_items WHERE id = NEW.item_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inventory_transaction
  AFTER INSERT ON inventory_transactions
  FOR EACH ROW EXECUTE FUNCTION update_inventory_stock();

-- Auto-generate work order numbers
CREATE OR REPLACE FUNCTION generate_wo_number()
RETURNS TRIGGER AS $$
DECLARE
  next_num INTEGER;
BEGIN
  IF NEW.wo_number IS NULL OR NEW.wo_number = '' THEN
    SELECT COALESCE(MAX(
      CAST(SUBSTRING(wo_number FROM 'WO-\d{4}-(\d+)') AS INTEGER)
    ), 0) + 1
    INTO next_num
    FROM work_orders
    WHERE wo_number LIKE 'WO-' || TO_CHAR(NOW(), 'YYYY') || '-%';

    NEW.wo_number = 'WO-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(next_num::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_wo_number
  BEFORE INSERT ON work_orders
  FOR EACH ROW EXECUTE FUNCTION generate_wo_number();

-- ============================================================
-- 12. ROW-LEVEL SECURITY
-- ============================================================

ALTER TABLE service_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_parks ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE alarms ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reorder_alerts ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by API routes via service key)
-- The application authenticates users at the API layer and uses
-- the service role key for all database operations.

-- Anon access: none (all access goes through authenticated API)
-- Authenticated access: managed by application logic per role

-- ============================================================
-- 13. SEED DATA - Initial manager account
-- ============================================================
-- Password: LighthiefAdmin2026! (bcrypt hash)
-- Generate new hash: npx bcryptjs hash 'YourPassword'
INSERT INTO service_users (email, password_hash, name, role, phone)
VALUES (
  'admin@lighthief.com',
  '$2a$12$placeholder_hash_replace_before_running',
  'System Admin',
  'manager',
  '+357 99 000000'
) ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- 14. STORAGE BUCKET
-- ============================================================
-- Run via Supabase Dashboard or API:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('service-photos', 'service-photos', false);
