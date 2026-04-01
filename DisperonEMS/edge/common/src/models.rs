//! Core data models for GridMind edge platform.
//!
//! All measurements, commands, alarms, and state representations used
//! throughout the edge system. These types are serialized via protobuf
//! for edge-cloud communication and via JSON for local storage.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

// ─── System State ────────────────────────────────────────────────────────────

/// Top-level system operating state (state machine).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum SystemState {
    /// Initial startup - performing self-checks
    Init,
    /// All systems ready, waiting for command
    Standby,
    /// Actively charging battery (P < 0 from grid perspective)
    Charging,
    /// Actively discharging battery (P > 0 to grid)
    Discharging,
    /// Minimum power mode, maintaining temperature
    Idle,
    /// Fault detected - safe shutdown, alarm active
    Fault,
    /// Emergency stop - all contactors open
    EmergencyStop,
}

impl std::fmt::Display for SystemState {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SystemState::Init => write!(f, "INIT"),
            SystemState::Standby => write!(f, "STANDBY"),
            SystemState::Charging => write!(f, "CHARGING"),
            SystemState::Discharging => write!(f, "DISCHARGING"),
            SystemState::Idle => write!(f, "IDLE"),
            SystemState::Fault => write!(f, "FAULT"),
            SystemState::EmergencyStop => write!(f, "EMERGENCY_STOP"),
        }
    }
}

// ─── Control Modes ───────────────────────────────────────────────────────────

/// Operating control mode for the PCS.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ControlMode {
    /// Fixed P and Q setpoints - normal DSO dispatch
    PQ,
    /// Voltage/Frequency control - grid support
    VF,
    /// Virtual Synchronous Generator - inertia emulation
    VSG,
    /// Frequency-proportional response - FCR/aFRR
    Droop,
    /// No grid injection - self-consumption only
    ZeroExport,
}

// ─── Measurements ────────────────────────────────────────────────────────────

/// Complete electrical measurement snapshot from PCS.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PcsMeasurement {
    pub timestamp: DateTime<Utc>,
    /// Active power in kW (positive = discharging/export, negative = charging/import)
    pub active_power_kw: f32,
    /// Reactive power in kVAr
    pub reactive_power_kvar: f32,
    /// DC bus voltage in V
    pub dc_voltage_v: f32,
    /// DC current in A
    pub dc_current_a: f32,
    /// AC voltage in V (line-to-line or line-to-neutral depending on config)
    pub ac_voltage_v: f32,
    /// AC current in A
    pub ac_current_a: f32,
    /// Grid frequency in Hz
    pub frequency_hz: f32,
    /// Power factor (0.0 to 1.0)
    pub power_factor: f32,
    /// PCS operating status code
    pub status: u16,
    /// Fault code (0 = no fault)
    pub fault_code: u16,
}

/// Complete BMS measurement snapshot.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BmsMeasurement {
    pub timestamp: DateTime<Utc>,
    /// State of Charge in % (0.0 - 100.0)
    pub soc_percent: f32,
    /// State of Health in % (0.0 - 100.0)
    pub soh_percent: f32,
    /// Total system DC voltage in V
    pub system_voltage_v: f32,
    /// Total system DC current in A (positive = discharge)
    pub system_current_a: f32,
    /// Total system power in kW
    pub system_power_kw: f32,
    /// Maximum cell voltage in mV
    pub max_cell_voltage_mv: u16,
    /// Minimum cell voltage in mV
    pub min_cell_voltage_mv: u16,
    /// Maximum cell temperature in deg C (scaled x0.1)
    pub max_cell_temp_c: f32,
    /// Minimum cell temperature in deg C (scaled x0.1)
    pub min_cell_temp_c: f32,
    /// Number of online battery clusters
    pub online_clusters: u16,
    /// Alarm code word 1 (bitmask)
    pub alarm_word_1: u16,
    /// Alarm code word 2 (bitmask)
    pub alarm_word_2: u16,
    /// BMS overall status
    pub status: u16,
}

/// Combined system measurement for telemetry.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemMeasurement {
    pub site_id: String,
    pub timestamp: DateTime<Utc>,
    pub pcs: Option<PcsMeasurement>,
    pub bms: Option<BmsMeasurement>,
    pub state: SystemState,
    pub control_mode: ControlMode,
}

// ─── Commands ────────────────────────────────────────────────────────────────

/// Setpoint command for PCS control.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SetpointCommand {
    pub id: Uuid,
    pub timestamp: DateTime<Utc>,
    pub source: CommandSource,
    /// Active power setpoint in kW (positive = discharge, negative = charge)
    pub active_power_kw: Option<f32>,
    /// Reactive power setpoint in kVAr
    pub reactive_power_kvar: Option<f32>,
    /// Operating mode to set
    pub mode: Option<ControlMode>,
    /// Start/stop command (true = start, false = stop)
    pub start_stop: Option<bool>,
}

/// Source of a control command.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CommandSource {
    /// Command from DSO/TSO via IEC 104
    ScadaDso,
    /// Command from cloud optimizer
    CloudOptimizer,
    /// Command from local HMI/operator
    LocalOperator,
    /// Command from trading engine
    TradingEngine,
    /// Command from protection logic
    Protection,
    /// Automatic (state machine transition)
    Automatic,
}

/// Discrete power level command from DSO (Cyprus EAC specific).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum DiscretePowerLevel {
    /// 100% of installed capacity - normal operation
    Level1Full,
    /// 60% of installed capacity - grid congestion
    Level2Reduced,
    /// 30% of installed capacity - high congestion
    Level3Minimum,
    /// 0% zero export - emergency curtailment
    Level4ZeroExport,
}

impl DiscretePowerLevel {
    /// Returns the power fraction (0.0 - 1.0) for this level.
    pub fn fraction(&self) -> f32 {
        match self {
            DiscretePowerLevel::Level1Full => 1.0,
            DiscretePowerLevel::Level2Reduced => 0.6,
            DiscretePowerLevel::Level3Minimum => 0.3,
            DiscretePowerLevel::Level4ZeroExport => 0.0,
        }
    }
}

/// Command acknowledgment from device.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CommandAck {
    pub command_id: Uuid,
    pub timestamp: DateTime<Utc>,
    pub accepted: bool,
    pub reason: Option<String>,
}

// ─── Alarms ──────────────────────────────────────────────────────────────────

/// Alarm severity levels.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
pub enum AlarmSeverity {
    Info,
    Warning,
    Alarm,
    Critical,
    Emergency,
}

/// Alarm state.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AlarmState {
    Active,
    Acknowledged,
    Cleared,
}

/// System alarm event.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Alarm {
    pub id: Uuid,
    pub site_id: String,
    pub timestamp: DateTime<Utc>,
    pub severity: AlarmSeverity,
    pub state: AlarmState,
    pub source: String,
    pub code: u32,
    pub message: String,
    pub details: Option<String>,
    pub acknowledged_by: Option<String>,
    pub acknowledged_at: Option<DateTime<Utc>>,
    pub cleared_at: Option<DateTime<Utc>>,
}

// ─── BMS Alarm Codes ─────────────────────────────────────────────────────────

/// BMS alarm bit definitions for alarm_word_1.
pub mod bms_alarms {
    pub const CELL_OVERVOLTAGE: u16 = 1 << 0;
    pub const CELL_UNDERVOLTAGE: u16 = 1 << 1;
    pub const PACK_OVERVOLTAGE: u16 = 1 << 2;
    pub const PACK_UNDERVOLTAGE: u16 = 1 << 3;
    pub const CHARGE_OVERCURRENT: u16 = 1 << 4;
    pub const DISCHARGE_OVERCURRENT: u16 = 1 << 5;
    pub const CELL_OVERTEMPERATURE: u16 = 1 << 6;
    pub const CELL_UNDERTEMPERATURE: u16 = 1 << 7;
    pub const ISOLATION_FAULT: u16 = 1 << 8;
    pub const BMS_COMMUNICATION_FAULT: u16 = 1 << 9;
    pub const CONTACTOR_FAULT: u16 = 1 << 10;
    pub const FAN_FAULT: u16 = 1 << 11;
    pub const COOLING_SYSTEM_FAULT: u16 = 1 << 12;
    pub const SOC_LOW_WARNING: u16 = 1 << 13;
    pub const SOC_HIGH_WARNING: u16 = 1 << 14;
    pub const IMBALANCE_WARNING: u16 = 1 << 15;
}

// ─── Protection Settings ─────────────────────────────────────────────────────

/// Grid protection settings (configurable per market/grid code).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProtectionSettings {
    /// Undervoltage stage 1 threshold (per-unit)
    pub undervoltage_stage1_pu: f32,
    /// Undervoltage stage 1 trip time (seconds)
    pub undervoltage_stage1_time_s: f32,
    /// Overvoltage stage 1 threshold (per-unit)
    pub overvoltage_stage1_pu: f32,
    /// Overvoltage stage 1 trip time (seconds)
    pub overvoltage_stage1_time_s: f32,
    /// Underfrequency stage 1 threshold (Hz)
    pub underfrequency_stage1_hz: f32,
    /// Underfrequency stage 1 trip time (seconds)
    pub underfrequency_stage1_time_s: f32,
    /// Overfrequency stage 1 threshold (Hz)
    pub overfrequency_stage1_hz: f32,
    /// Overfrequency stage 1 trip time (seconds)
    pub overfrequency_stage1_time_s: f32,
    /// Nominal voltage (V)
    pub nominal_voltage_v: f32,
    /// Nominal frequency (Hz)
    pub nominal_frequency_hz: f32,
    /// LFSM-O activation frequency (Hz)
    pub lfsm_o_activation_hz: f32,
    /// LFSM-O droop rate (fraction per Hz, e.g. 1.0 = 100%/Hz)
    pub lfsm_o_droop_per_hz: f32,
    /// Q(U) curve control points: (voltage_pu, q_fraction)
    pub qu_curve: Vec<(f32, f32)>,
}

impl Default for ProtectionSettings {
    /// Default settings for Cyprus (EN 50549-2 / EAC requirements).
    fn default() -> Self {
        Self {
            undervoltage_stage1_pu: 0.9,
            undervoltage_stage1_time_s: 0.2,
            overvoltage_stage1_pu: 1.1,
            overvoltage_stage1_time_s: 0.2,
            underfrequency_stage1_hz: 47.0,
            underfrequency_stage1_time_s: 0.2,
            overfrequency_stage1_hz: 52.0,
            overfrequency_stage1_time_s: 0.2,
            nominal_voltage_v: 230.0,
            nominal_frequency_hz: 50.0,
            lfsm_o_activation_hz: 50.2,
            lfsm_o_droop_per_hz: 1.0,
            qu_curve: vec![
                (0.92, 0.40),  // 212V -> +40% capacitive
                (0.97, 0.00),  // 223V -> deadband start
                (1.00, 0.00),  // 230V -> reference
                (1.03, 0.00),  // 237V -> deadband end
                (1.07, -0.40), // 246V -> -40% inductive
            ],
        }
    }
}

// ─── Site Configuration ──────────────────────────────────────────────────────

/// Site-level configuration loaded from YAML.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SiteConfig {
    pub site_id: String,
    pub site_name: String,
    pub market: String,
    /// Rated power capacity in kW
    pub rated_power_kw: f32,
    /// Rated energy capacity in kWh
    pub rated_energy_kwh: f32,
    /// PCS connection settings
    pub pcs: DeviceConnectionConfig,
    /// BMS connection settings
    pub bms: DeviceConnectionConfig,
    /// SCADA (IEC 104) server settings
    pub scada: ScadaServerConfig,
    /// NATS cloud bridge settings
    pub cloud: CloudBridgeConfig,
    /// Protection settings
    pub protection: ProtectionSettings,
    /// Control loop settings
    pub control: ControlConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeviceConnectionConfig {
    pub host: String,
    pub port: u16,
    pub unit_id: u8,
    pub poll_interval_ms: u64,
    pub timeout_ms: u64,
    pub driver: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScadaServerConfig {
    pub bind_address: String,
    pub port: u16,
    pub common_address: u16,
    pub point_map_file: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CloudBridgeConfig {
    pub nats_url: String,
    pub site_id: String,
    pub telemetry_interval_ms: u64,
    pub tls_enabled: bool,
    pub cert_path: Option<String>,
    pub key_path: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ControlConfig {
    /// Minimum seconds between setpoint commands to PCS
    pub min_command_interval_s: f32,
    /// Control loop cycle time in ms
    pub cycle_time_ms: u64,
    /// SOC low limit for discharge (%)
    pub soc_low_limit: f32,
    /// SOC high limit for charge (%)
    pub soc_high_limit: f32,
    /// Maximum ramp rate (kW/s)
    pub max_ramp_rate_kw_per_s: f32,
    /// Default control mode at startup
    pub default_mode: ControlMode,
}

// ─── Telemetry Envelope ──────────────────────────────────────────────────────

/// Envelope for edge-to-cloud telemetry messages via NATS.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TelemetryEnvelope {
    pub site_id: String,
    pub message_id: Uuid,
    pub timestamp: DateTime<Utc>,
    pub payload: TelemetryPayload,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum TelemetryPayload {
    Measurement(SystemMeasurement),
    Alarm(Alarm),
    StateChange {
        previous: SystemState,
        current: SystemState,
        reason: String,
    },
    CommandExecuted {
        command: SetpointCommand,
        ack: CommandAck,
    },
    Heartbeat {
        state: SystemState,
        uptime_seconds: u64,
    },
}
