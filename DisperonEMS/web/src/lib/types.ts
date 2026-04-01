/**
 * TypeScript type definitions for the GridMind frontend.
 */

// ─── System Types ────────────────────────────────────────────────────────────

export type SystemState =
  | "INIT"
  | "STANDBY"
  | "CHARGING"
  | "DISCHARGING"
  | "IDLE"
  | "FAULT"
  | "EMERGENCY_STOP";

export type ControlMode = "PQ" | "VF" | "VSG" | "DROOP" | "ZERO_EXPORT";

export type AlarmSeverity = "info" | "warning" | "alarm" | "critical" | "emergency";
export type AlarmState = "active" | "acknowledged" | "cleared";

// ─── Site ────────────────────────────────────────────────────────────────────

export interface Site {
  id: string;
  site_id: string;
  name: string;
  market: string;
  status: string;
  latitude?: number;
  longitude?: number;
  rated_power_kw: number;
  rated_energy_kwh: number;
  dso_name?: string;
  tso_name?: string;
  created_at: string;
  updated_at: string;
}

// ─── Measurements ────────────────────────────────────────────────────────────

export interface PcsMeasurement {
  timestamp: string;
  active_power_kw: number;
  reactive_power_kvar: number;
  dc_voltage_v: number;
  dc_current_a: number;
  ac_voltage_v: number;
  ac_current_a: number;
  frequency_hz: number;
  power_factor: number;
  status: number;
  fault_code: number;
}

export interface BmsMeasurement {
  timestamp: string;
  soc_percent: number;
  soh_percent: number;
  system_voltage_v: number;
  system_current_a: number;
  system_power_kw: number;
  max_cell_voltage_mv: number;
  min_cell_voltage_mv: number;
  max_cell_temp_c: number;
  min_cell_temp_c: number;
  online_clusters: number;
  alarm_word_1: number;
  alarm_word_2: number;
  status: number;
}

export interface SystemMeasurement {
  site_id: string;
  timestamp: string;
  pcs?: PcsMeasurement;
  bms?: BmsMeasurement;
  state: SystemState;
  control_mode: ControlMode;
}

// ─── Alarms ──────────────────────────────────────────────────────────────────

export interface Alarm {
  id: string;
  severity: AlarmSeverity;
  state: AlarmState;
  source: string;
  code: number;
  message: string;
  details?: string;
  timestamp: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
  cleared_at?: string;
}

// ─── Commands ────────────────────────────────────────────────────────────────

export interface Command {
  id: string;
  source: string;
  status: string;
  active_power_kw?: number;
  reactive_power_kvar?: number;
  mode?: string;
  reason?: string;
  response?: string;
  created_at: string;
  completed_at?: string;
}

// ─── Trading ─────────────────────────────────────────────────────────────────

export interface Trade {
  id: string;
  market: string;
  exchange?: string;
  product: string;
  direction: "buy" | "sell";
  quantity_mw: number;
  price_eur_mwh: number;
  delivery_start: string;
  delivery_end: string;
  status: string;
  pnl_eur?: number;
  created_at: string;
  executed_at?: string;
}

export interface PortfolioSummary {
  total_trades: number;
  total_volume_mwh: number;
  total_pnl_eur: number;
  open_positions: number;
  by_market: Record<string, { count: number; volume_mwh: number; pnl_eur: number }>;
}
