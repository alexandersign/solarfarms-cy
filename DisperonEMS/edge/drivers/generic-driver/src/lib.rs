//! Generic Driver Abstraction Layer
//!
//! Defines the `DeviceDriver` trait that all hardware device drivers must
//! implement. This abstraction allows the control engine to work with any
//! vendor's PCS, BMS, or protection relay without knowing the underlying
//! protocol details.

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use gridmind_common::{
    Alarm, BmsMeasurement, CommandAck, PcsMeasurement, SetpointCommand,
};
use serde::{Deserialize, Serialize};
use thiserror::Error;

// ─── Driver Errors ───────────────────────────────────────────────────────────

#[derive(Error, Debug)]
pub enum DriverError {
    #[error("Connection failed: {0}")]
    ConnectionFailed(String),

    #[error("Communication timeout after {0}ms")]
    Timeout(u64),

    #[error("Device returned error: code={code}, message={message}")]
    DeviceError { code: u16, message: String },

    #[error("Invalid response from device: {0}")]
    InvalidResponse(String),

    #[error("Driver not connected")]
    NotConnected,

    #[error("Command rejected: {0}")]
    CommandRejected(String),

    #[error("Configuration error: {0}")]
    ConfigError(String),

    #[error("Protocol error: {0}")]
    ProtocolError(String),

    #[error(transparent)]
    Other(#[from] anyhow::Error),
}

pub type DriverResult<T> = Result<T, DriverError>;

// ─── Device Info ─────────────────────────────────────────────────────────────

/// Static information about a connected device.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeviceInfo {
    pub manufacturer: String,
    pub model: String,
    pub serial_number: Option<String>,
    pub firmware_version: Option<String>,
    pub device_type: DeviceType,
    pub rated_power_kw: Option<f32>,
    pub rated_energy_kwh: Option<f32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum DeviceType {
    Pcs,
    Bms,
    ProtectionRelay,
    Meter,
    Other,
}

// ─── Connection State ────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ConnectionState {
    Disconnected,
    Connecting,
    Connected,
    Error,
}

// ─── PCS Driver Trait ────────────────────────────────────────────────────────

/// Trait for Power Conversion System (PCS/inverter) drivers.
///
/// Implementations handle the vendor-specific protocol details for reading
/// measurements and sending setpoint commands to the PCS.
#[async_trait]
pub trait PcsDriver: Send + Sync {
    /// Connect to the PCS device.
    async fn connect(&mut self) -> DriverResult<()>;

    /// Disconnect from the PCS device.
    async fn disconnect(&mut self) -> DriverResult<()>;

    /// Check if the driver is connected.
    fn is_connected(&self) -> bool;

    /// Get the current connection state.
    fn connection_state(&self) -> ConnectionState;

    /// Read all PCS measurements.
    async fn read_measurements(&self) -> DriverResult<PcsMeasurement>;

    /// Send a setpoint command to the PCS.
    async fn write_setpoint(&self, cmd: &SetpointCommand) -> DriverResult<CommandAck>;

    /// Send a start command to the PCS.
    async fn start(&self) -> DriverResult<CommandAck>;

    /// Send a stop command to the PCS.
    async fn stop(&self) -> DriverResult<CommandAck>;

    /// Read active alarms from the PCS.
    async fn read_alarms(&self) -> DriverResult<Vec<Alarm>>;

    /// Get static device information.
    fn device_info(&self) -> &DeviceInfo;

    /// Get the last successful communication timestamp.
    fn last_comm_time(&self) -> Option<DateTime<Utc>>;
}

// ─── BMS Driver Trait ────────────────────────────────────────────────────────

/// Trait for Battery Management System (BMS) drivers.
///
/// Implementations handle reading battery state data, alarms, and cell-level
/// information from the BMS controller.
#[async_trait]
pub trait BmsDriver: Send + Sync {
    /// Connect to the BMS.
    async fn connect(&mut self) -> DriverResult<()>;

    /// Disconnect from the BMS.
    async fn disconnect(&mut self) -> DriverResult<()>;

    /// Check if the driver is connected.
    fn is_connected(&self) -> bool;

    /// Get the current connection state.
    fn connection_state(&self) -> ConnectionState;

    /// Read system-level BMS measurements.
    async fn read_measurements(&self) -> DriverResult<BmsMeasurement>;

    /// Read active alarms from the BMS.
    async fn read_alarms(&self) -> DriverResult<Vec<Alarm>>;

    /// Get static device information.
    fn device_info(&self) -> &DeviceInfo;

    /// Get the last successful communication timestamp.
    fn last_comm_time(&self) -> Option<DateTime<Utc>>;
}

// ─── Protection Relay Driver Trait ───────────────────────────────────────────

/// Relay status information.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RelayStatus {
    pub timestamp: DateTime<Utc>,
    pub tripped: bool,
    pub trip_code: Option<u16>,
    pub breaker_closed: bool,
    pub fault_detected: bool,
    pub fault_type: Option<String>,
}

/// Trait for protection relay drivers (IEC 61850 or Modbus).
#[async_trait]
pub trait ProtectionRelayDriver: Send + Sync {
    /// Connect to the protection relay.
    async fn connect(&mut self) -> DriverResult<()>;

    /// Disconnect from the protection relay.
    async fn disconnect(&mut self) -> DriverResult<()>;

    /// Check if the driver is connected.
    fn is_connected(&self) -> bool;

    /// Read current relay status.
    async fn read_status(&self) -> DriverResult<RelayStatus>;

    /// Send a trip command.
    async fn trip(&self) -> DriverResult<CommandAck>;

    /// Send a close (reset) command.
    async fn close(&self) -> DriverResult<CommandAck>;

    /// Get device information.
    fn device_info(&self) -> &DeviceInfo;
}
