-- ============================================================
-- ALEX PERSONAL TASK HUB - Database Schema
-- Cross-project task management for Alexander Papacosta
-- ============================================================

CREATE TABLE IF NOT EXISTS alex_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  project TEXT NOT NULL CHECK (project IN (
    'bess_cyprus', '7sun', 'greece', 'ems', 'shark_fund',
    'bd_cyprus', 'legal', 'clients', 'platform'
  )),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN (
    'critical', 'high', 'medium', 'low'
  )),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN (
    'not_started', 'in_progress', 'complete', 'blocked', 'deferred'
  )),
  deadline DATE,
  delegated_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_alex_tasks_project ON alex_tasks(project);
CREATE INDEX idx_alex_tasks_status ON alex_tasks(status);
CREATE INDEX idx_alex_tasks_priority ON alex_tasks(priority);
CREATE INDEX idx_alex_tasks_deadline ON alex_tasks(deadline);
CREATE INDEX idx_alex_tasks_status_deadline ON alex_tasks(status, deadline);
