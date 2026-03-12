//! Kehua BCS1250K-C-HUD PCS Driver (Modbus TCP)
//!
//! Implements the PcsDriver trait for the Kehua BCS1250K PCS using Modbus TCP.
//! Register map based on Kehua Modbus Communication Protocol document.
//!
//! Key registers (from readme Section 12.2):
//!   Holding: 40001-40002 Active Power Setpoint (Float32)
//!   Holding: 40003-40004 Reactive Power Setpoint (Float32)
//!   Holding: 40005     Operating Mode (UINT16)
//!   Holding: 40006     Start/Stop Command (UINT16)
//!   Input:   30001-30002 Active Power Actual (Float32)
//!   Input:   30003-30004 Reactive Power Actual (Float32)
//!   Input:   30005-30006 DC Voltage (Float32)
//!   Input:   30007-30008 DC Current (Float32)
//!   Input:   30009-30010 AC Voltage (Float32)
//!   Input:   30011-30012 AC Current (Float32)
//!   Input:   30013-30014 Frequency (Float32)
//!   Input:   30015     Power Factor (Float32)
//!   Input:   30016     PCS Status (UINT16)
//!   Input:   30017     Fault Code (UINT16)

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use gridmind_common::*;
use gridmind_generic_driver::*;
use parking_lot::RwLock;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpStream;
use tokio_modbus::prelude::*;
use tokio_modbus::client::tcp;
use tracing::{debug, error, info, warn};
use uuid::Uuid;

// ─── Modbus Register Addresses ───────────────────────────────────────────────

/// Kehua PCS Holding Register addresses (0-indexed for Modbus library).
mod holding_regs {
    /// Active Power Setpoint (kW) - Float32, 2 registers
    pub const ACTIVE_POWER_SETPOINT: u16 = 0; // 40001
    /// Reactive Power Setpoint (kVAr) - Float32, 2 registers
    pub const REACTIVE_POWER_SETPOINT: u16 = 2; // 40003
    /// Operating Mode - UINT16
    pub const OPERATING_MODE: u16 = 4; // 40005
    /// Start/Stop Command - UINT16 (1=start, 0=stop)
    pub const START_STOP: u16 = 5; // 40006
}

/// Kehua PCS Input Register addresses (0-indexed for Modbus library).
mod input_regs {
    /// Active Power Actual (kW) - Float32, 2 registers
    pub const ACTIVE_POWER: u16 = 0; // 30001
    /// Reactive Power Actual (kVAr) - Float32, 2 registers
    pub const REACTIVE_POWER: u16 = 2; // 30003
    /// DC Voltage (V) - Float32
    pub const DC_VOLTAGE: u16 = 4; // 30005
    /// DC Current (A) - Float32
    pub const DC_CURRENT: u16 = 6; // 30007
    /// AC Voltage (V) - Float32
    pub const AC_VOLTAGE: u16 = 8; // 30009
    /// AC Current (A) - Float32
    pub const AC_CURRENT: u16 = 10; // 30011
    /// Frequency (Hz) - Float32
    pub const FREQUENCY: u16 = 12; // 30013
    /// Power Factor - Float32
    pub const POWER_FACTOR: u16 = 14; // 30015
    /// PCS Status - UINT16
    pub const PCS_STATUS: u16 = 15; // 30016
    /// Fault Code - UINT16
    pub const FAULT_CODE: u16 = 16; // 30017
}

/// PCS operating mode codes.
#[repr(u16)]
pub enum PcsMode {
    Standby = 0,
    PQ = 1,
    VF = 2,
    VSG = 3,
    Droop = 4,
}

// ─── Driver Implementation ──────────────────────────────────────────────────

/// Kehua BCS1250K PCS driver over Modbus TCP.
pub struct KehuaPcsDriver {
    address: SocketAddr,
    unit_id: u8,
    timeout_ms: u64,
    context: Arc<RwLock<Option<tokio_modbus::client::Context>>>,
    conn_state: Arc<RwLock<ConnectionState>>,
    last_comm: Arc<RwLock<Option<DateTime<Utc>>>>,
    device_info: DeviceInfo,
}

impl KehuaPcsDriver {
    pub fn new(host: &str, port: u16, unit_id: u8, timeout_ms: u64) -> Self {
        let address: SocketAddr = format!("{}:{}", host, port)
            .parse()
            .expect("Invalid PCS address");

        Self {
            address,
            unit_id,
            timeout_ms,
            context: Arc::new(RwLock::new(None)),
            conn_state: Arc::new(RwLock::new(ConnectionState::Disconnected)),
            last_comm: Arc::new(RwLock::new(None)),
            device_info: DeviceInfo {
                manufacturer: "Xiamen Kehua Digital Energy".to_string(),
                model: "BCS1250K-C-HUD".to_string(),
                serial_number: None,
                firmware_version: None,
                device_type: DeviceType::Pcs,
                rated_power_kw: Some(1250.0),
                rated_energy_kwh: None,
            },
        }
    }

    /// Convert two u16 registers to f32 (IEEE 754 big-endian).
    fn regs_to_f32(high: u16, low: u16) -> f32 {
        let bytes = [
            (high >> 8) as u8,
            (high & 0xFF) as u8,
            (low >> 8) as u8,
            (low & 0xFF) as u8,
        ];
        f32::from_be_bytes(bytes)
    }

    /// Convert f32 to two u16 registers (IEEE 754 big-endian).
    fn f32_to_regs(value: f32) -> [u16; 2] {
        let bytes = value.to_be_bytes();
        let high = u16::from_be_bytes([bytes[0], bytes[1]]);
        let low = u16::from_be_bytes([bytes[2], bytes[3]]);
        [high, low]
    }
}

#[async_trait]
impl PcsDriver for KehuaPcsDriver {
    async fn connect(&mut self) -> DriverResult<()> {
        info!("Connecting to Kehua PCS at {}", self.address);
        *self.conn_state.write() = ConnectionState::Connecting;

        match tcp::connect_slave(self.address, Slave(self.unit_id)).await {
            Ok(ctx) => {
                *self.context.write() = Some(ctx);
                *self.conn_state.write() = ConnectionState::Connected;
                *self.last_comm.write() = Some(Utc::now());
                info!("Connected to Kehua PCS at {}", self.address);
                Ok(())
            }
            Err(e) => {
                *self.conn_state.write() = ConnectionState::Error;
                error!("Failed to connect to Kehua PCS: {}", e);
                Err(DriverError::ConnectionFailed(e.to_string()))
            }
        }
    }

    async fn disconnect(&mut self) -> DriverResult<()> {
        info!("Disconnecting from Kehua PCS");
        *self.context.write() = None;
        *self.conn_state.write() = ConnectionState::Disconnected;
        Ok(())
    }

    fn is_connected(&self) -> bool {
        *self.conn_state.read() == ConnectionState::Connected
    }

    fn connection_state(&self) -> ConnectionState {
        *self.conn_state.read()
    }

    async fn read_measurements(&self) -> DriverResult<PcsMeasurement> {
        let mut ctx_guard = self.context.write();
        let ctx = ctx_guard
            .as_mut()
            .ok_or(DriverError::NotConnected)?;

        // Read all input registers in one batch (30001-30017 = 17 registers)
        let response = ctx
            .read_input_registers(input_regs::ACTIVE_POWER, 17)
            .await
            .map_err(|e| DriverError::ProtocolError(e.to_string()))?
            .ok_or_else(|| DriverError::InvalidResponse("Empty response from PCS".into()))?;

        if response.len() < 17 {
            return Err(DriverError::InvalidResponse(format!(
                "Expected 17 registers, got {}",
                response.len()
            )));
        }

        let measurement = PcsMeasurement {
            timestamp: Utc::now(),
            active_power_kw: Self::regs_to_f32(response[0], response[1]),
            reactive_power_kvar: Self::regs_to_f32(response[2], response[3]),
            dc_voltage_v: Self::regs_to_f32(response[4], response[5]),
            dc_current_a: Self::regs_to_f32(response[6], response[7]),
            ac_voltage_v: Self::regs_to_f32(response[8], response[9]),
            ac_current_a: Self::regs_to_f32(response[10], response[11]),
            frequency_hz: Self::regs_to_f32(response[12], response[13]),
            power_factor: Self::regs_to_f32(response[14], response[14]), // single reg
            status: response[15],
            fault_code: response[16],
        };

        *self.last_comm.write() = Some(Utc::now());
        debug!(
            "PCS measurement: P={:.1}kW Q={:.1}kVAr f={:.2}Hz",
            measurement.active_power_kw,
            measurement.reactive_power_kvar,
            measurement.frequency_hz
        );

        Ok(measurement)
    }

    async fn write_setpoint(&self, cmd: &SetpointCommand) -> DriverResult<CommandAck> {
        let mut ctx_guard = self.context.write();
        let ctx = ctx_guard
            .as_mut()
            .ok_or(DriverError::NotConnected)?;

        // Write active power setpoint if provided
        if let Some(p) = cmd.active_power_kw {
            let regs = Self::f32_to_regs(p);
            ctx.write_multiple_registers(holding_regs::ACTIVE_POWER_SETPOINT, &regs)
                .await
                .map_err(|e| DriverError::ProtocolError(e.to_string()))?;
            info!("PCS active power setpoint: {:.1} kW", p);
        }

        // Write reactive power setpoint if provided
        if let Some(q) = cmd.reactive_power_kvar {
            let regs = Self::f32_to_regs(q);
            ctx.write_multiple_registers(holding_regs::REACTIVE_POWER_SETPOINT, &regs)
                .await
                .map_err(|e| DriverError::ProtocolError(e.to_string()))?;
            info!("PCS reactive power setpoint: {:.1} kVAr", q);
        }

        // Write operating mode if provided
        if let Some(mode) = &cmd.mode {
            let mode_code = match mode {
                ControlMode::PQ => PcsMode::PQ as u16,
                ControlMode::VF => PcsMode::VF as u16,
                ControlMode::VSG => PcsMode::VSG as u16,
                ControlMode::Droop => PcsMode::Droop as u16,
                ControlMode::ZeroExport => PcsMode::PQ as u16, // PQ with P=0
            };
            ctx.write_single_register(holding_regs::OPERATING_MODE, mode_code)
                .await
                .map_err(|e| DriverError::ProtocolError(e.to_string()))?;
        }

        *self.last_comm.write() = Some(Utc::now());

        Ok(CommandAck {
            command_id: cmd.id,
            timestamp: Utc::now(),
            accepted: true,
            reason: None,
        })
    }

    async fn start(&self) -> DriverResult<CommandAck> {
        let mut ctx_guard = self.context.write();
        let ctx = ctx_guard
            .as_mut()
            .ok_or(DriverError::NotConnected)?;

        ctx.write_single_register(holding_regs::START_STOP, 1)
            .await
            .map_err(|e| DriverError::ProtocolError(e.to_string()))?;

        info!("PCS start command sent");
        *self.last_comm.write() = Some(Utc::now());

        Ok(CommandAck {
            command_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            accepted: true,
            reason: None,
        })
    }

    async fn stop(&self) -> DriverResult<CommandAck> {
        let mut ctx_guard = self.context.write();
        let ctx = ctx_guard
            .as_mut()
            .ok_or(DriverError::NotConnected)?;

        ctx.write_single_register(holding_regs::START_STOP, 0)
            .await
            .map_err(|e| DriverError::ProtocolError(e.to_string()))?;

        info!("PCS stop command sent");
        *self.last_comm.write() = Some(Utc::now());

        Ok(CommandAck {
            command_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            accepted: true,
            reason: None,
        })
    }

    async fn read_alarms(&self) -> DriverResult<Vec<Alarm>> {
        // PCS alarms are derived from the fault_code in measurements
        let measurement = self.read_measurements().await?;
        let mut alarms = Vec::new();

        if measurement.fault_code != 0 {
            alarms.push(Alarm {
                id: Uuid::new_v4(),
                site_id: String::new(), // Filled by caller
                timestamp: Utc::now(),
                severity: AlarmSeverity::Alarm,
                state: AlarmState::Active,
                source: "PCS".to_string(),
                code: measurement.fault_code as u32,
                message: format!("PCS fault code: {}", measurement.fault_code),
                details: None,
                acknowledged_by: None,
                acknowledged_at: None,
                cleared_at: None,
            });
        }

        Ok(alarms)
    }

    fn device_info(&self) -> &DeviceInfo {
        &self.device_info
    }

    fn last_comm_time(&self) -> Option<DateTime<Utc>> {
        *self.last_comm.read()
    }
}
