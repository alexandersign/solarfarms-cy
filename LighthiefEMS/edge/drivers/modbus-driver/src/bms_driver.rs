//! Linyang Power Atlantic BMS Driver (Modbus TCP)
//!
//! Implements the BmsDriver trait for the Linyang Power Atlantic BESS
//! using Modbus TCP protocol. Register map based on Linyang documentation.
//!
//! Key registers (from readme Section 12.3):
//!   Input: 30001     System SOC (%) - UINT16 (×0.1)
//!   Input: 30002     System SOH (%) - UINT16 (×0.1)
//!   Input: 30003-04  System Voltage (V) - Float32
//!   Input: 30005-06  System Current (A) - Float32
//!   Input: 30007-08  System Power (kW) - Float32
//!   Input: 30009     Max Cell Voltage (mV) - UINT16
//!   Input: 30010     Min Cell Voltage (mV) - UINT16
//!   Input: 30011     Max Cell Temperature (°C) - INT16 (×0.1)
//!   Input: 30012     Min Cell Temperature (°C) - INT16 (×0.1)
//!   Input: 30013     Number of Online Clusters - UINT16
//!   Input: 30014     Alarm Code Word 1 - UINT16
//!   Input: 30015     Alarm Code Word 2 - UINT16
//!   Input: 30016     BMS Status - UINT16

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use gridmind_common::*;
use gridmind_generic_driver::*;
use parking_lot::RwLock;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio_modbus::prelude::*;
use tokio_modbus::client::tcp;
use tracing::{debug, error, info, warn};
use uuid::Uuid;

// ─── Modbus Register Addresses ───────────────────────────────────────────────

mod input_regs {
    /// System SOC (%) - UINT16 scaled by 0.1
    pub const SYSTEM_SOC: u16 = 0; // 30001
    /// System SOH (%) - UINT16 scaled by 0.1
    pub const SYSTEM_SOH: u16 = 1; // 30002
    /// System Voltage (V) - Float32, 2 registers
    pub const SYSTEM_VOLTAGE: u16 = 2; // 30003
    /// System Current (A) - Float32, 2 registers
    pub const SYSTEM_CURRENT: u16 = 4; // 30005
    /// System Power (kW) - Float32, 2 registers
    pub const SYSTEM_POWER: u16 = 6; // 30007
    /// Max Cell Voltage (mV) - UINT16
    pub const MAX_CELL_VOLTAGE: u16 = 8; // 30009
    /// Min Cell Voltage (mV) - UINT16
    pub const MIN_CELL_VOLTAGE: u16 = 9; // 30010
    /// Max Cell Temperature (°C) - INT16 scaled by 0.1
    pub const MAX_CELL_TEMP: u16 = 10; // 30011
    /// Min Cell Temperature (°C) - INT16 scaled by 0.1
    pub const MIN_CELL_TEMP: u16 = 11; // 30012
    /// Number of Online Clusters - UINT16
    pub const ONLINE_CLUSTERS: u16 = 12; // 30013
    /// Alarm Code Word 1 - UINT16
    pub const ALARM_WORD_1: u16 = 13; // 30014
    /// Alarm Code Word 2 - UINT16
    pub const ALARM_WORD_2: u16 = 14; // 30015
    /// BMS Status - UINT16
    pub const BMS_STATUS: u16 = 15; // 30016
}

// ─── BMS Alarm Interpretation ────────────────────────────────────────────────

struct AlarmDef {
    bit: u16,
    severity: AlarmSeverity,
    message: &'static str,
}

const ALARM_WORD_1_DEFS: &[AlarmDef] = &[
    AlarmDef { bit: 0, severity: AlarmSeverity::Critical, message: "Cell overvoltage" },
    AlarmDef { bit: 1, severity: AlarmSeverity::Critical, message: "Cell undervoltage" },
    AlarmDef { bit: 2, severity: AlarmSeverity::Alarm, message: "Pack overvoltage" },
    AlarmDef { bit: 3, severity: AlarmSeverity::Alarm, message: "Pack undervoltage" },
    AlarmDef { bit: 4, severity: AlarmSeverity::Critical, message: "Charge overcurrent" },
    AlarmDef { bit: 5, severity: AlarmSeverity::Critical, message: "Discharge overcurrent" },
    AlarmDef { bit: 6, severity: AlarmSeverity::Alarm, message: "Cell over-temperature" },
    AlarmDef { bit: 7, severity: AlarmSeverity::Alarm, message: "Cell under-temperature" },
    AlarmDef { bit: 8, severity: AlarmSeverity::Critical, message: "Isolation fault" },
    AlarmDef { bit: 9, severity: AlarmSeverity::Alarm, message: "BMS communication fault" },
    AlarmDef { bit: 10, severity: AlarmSeverity::Critical, message: "Contactor fault" },
    AlarmDef { bit: 11, severity: AlarmSeverity::Warning, message: "Fan fault" },
    AlarmDef { bit: 12, severity: AlarmSeverity::Alarm, message: "Cooling system fault" },
    AlarmDef { bit: 13, severity: AlarmSeverity::Warning, message: "SOC low warning" },
    AlarmDef { bit: 14, severity: AlarmSeverity::Warning, message: "SOC high warning" },
    AlarmDef { bit: 15, severity: AlarmSeverity::Warning, message: "Cell imbalance warning" },
];

// ─── Driver Implementation ──────────────────────────────────────────────────

/// Linyang Power Atlantic BMS driver over Modbus TCP.
pub struct LinyangBmsDriver {
    address: SocketAddr,
    unit_id: u8,
    timeout_ms: u64,
    context: Arc<RwLock<Option<tokio_modbus::client::Context>>>,
    conn_state: Arc<RwLock<ConnectionState>>,
    last_comm: Arc<RwLock<Option<DateTime<Utc>>>>,
    device_info: DeviceInfo,
}

impl LinyangBmsDriver {
    pub fn new(host: &str, port: u16, unit_id: u8, timeout_ms: u64) -> Self {
        let address: SocketAddr = format!("{}:{}", host, port)
            .parse()
            .expect("Invalid BMS address");

        Self {
            address,
            unit_id,
            timeout_ms,
            context: Arc::new(RwLock::new(None)),
            conn_state: Arc::new(RwLock::new(ConnectionState::Disconnected)),
            last_comm: Arc::new(RwLock::new(None)),
            device_info: DeviceInfo {
                manufacturer: "Jiangsu Linyang Energy Storage".to_string(),
                model: "Power Atlantic ME 5.015 MWh".to_string(),
                serial_number: None,
                firmware_version: None,
                device_type: DeviceType::Bms,
                rated_power_kw: Some(2500.0),
                rated_energy_kwh: Some(5015.0),
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

    /// Convert INT16 register to f32 with 0.1 scaling.
    fn int16_scaled(val: u16) -> f32 {
        (val as i16) as f32 * 0.1
    }

    /// Decode alarm word into individual alarms.
    fn decode_alarms(
        alarm_word: u16,
        definitions: &[AlarmDef],
        source: &str,
    ) -> Vec<Alarm> {
        let mut alarms = Vec::new();
        for def in definitions {
            if alarm_word & (1 << def.bit) != 0 {
                alarms.push(Alarm {
                    id: Uuid::new_v4(),
                    site_id: String::new(), // Filled by caller
                    timestamp: Utc::now(),
                    severity: def.severity,
                    state: AlarmState::Active,
                    source: source.to_string(),
                    code: def.bit as u32,
                    message: def.message.to_string(),
                    details: Some(format!("Alarm word bit {}", def.bit)),
                    acknowledged_by: None,
                    acknowledged_at: None,
                    cleared_at: None,
                });
            }
        }
        alarms
    }
}

#[async_trait]
impl BmsDriver for LinyangBmsDriver {
    async fn connect(&mut self) -> DriverResult<()> {
        info!("Connecting to Linyang BMS at {}", self.address);
        *self.conn_state.write() = ConnectionState::Connecting;

        match tcp::connect_slave(self.address, Slave(self.unit_id)).await {
            Ok(ctx) => {
                *self.context.write() = Some(ctx);
                *self.conn_state.write() = ConnectionState::Connected;
                *self.last_comm.write() = Some(Utc::now());
                info!("Connected to Linyang BMS at {}", self.address);
                Ok(())
            }
            Err(e) => {
                *self.conn_state.write() = ConnectionState::Error;
                error!("Failed to connect to Linyang BMS: {}", e);
                Err(DriverError::ConnectionFailed(e.to_string()))
            }
        }
    }

    async fn disconnect(&mut self) -> DriverResult<()> {
        info!("Disconnecting from Linyang BMS");
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

    async fn read_measurements(&self) -> DriverResult<BmsMeasurement> {
        let mut ctx_guard = self.context.write();
        let ctx = ctx_guard
            .as_mut()
            .ok_or(DriverError::NotConnected)?;

        // Read all input registers in one batch (30001-30016 = 16 registers)
        let response = ctx
            .read_input_registers(input_regs::SYSTEM_SOC, 16)
            .await
            .map_err(|e| DriverError::ProtocolError(e.to_string()))?
            .ok_or_else(|| DriverError::InvalidResponse("Empty response from BMS".into()))?;

        if response.len() < 16 {
            return Err(DriverError::InvalidResponse(format!(
                "Expected 16 registers, got {}",
                response.len()
            )));
        }

        let measurement = BmsMeasurement {
            timestamp: Utc::now(),
            soc_percent: response[0] as f32 * 0.1,
            soh_percent: response[1] as f32 * 0.1,
            system_voltage_v: Self::regs_to_f32(response[2], response[3]),
            system_current_a: Self::regs_to_f32(response[4], response[5]),
            system_power_kw: Self::regs_to_f32(response[6], response[7]),
            max_cell_voltage_mv: response[8],
            min_cell_voltage_mv: response[9],
            max_cell_temp_c: Self::int16_scaled(response[10]),
            min_cell_temp_c: Self::int16_scaled(response[11]),
            online_clusters: response[12],
            alarm_word_1: response[13],
            alarm_word_2: response[14],
            status: response[15],
        };

        *self.last_comm.write() = Some(Utc::now());
        debug!(
            "BMS measurement: SOC={:.1}% SOH={:.1}% P={:.1}kW V={:.1}V",
            measurement.soc_percent,
            measurement.soh_percent,
            measurement.system_power_kw,
            measurement.system_voltage_v
        );

        Ok(measurement)
    }

    async fn read_alarms(&self) -> DriverResult<Vec<Alarm>> {
        let measurement = self.read_measurements().await?;
        let mut alarms = Vec::new();

        // Decode alarm word 1
        alarms.extend(Self::decode_alarms(
            measurement.alarm_word_1,
            ALARM_WORD_1_DEFS,
            "BMS",
        ));

        // Check warranty-critical conditions (from readme Section 17.3)
        if measurement.min_cell_voltage_mv <= 2500 {
            alarms.push(Alarm {
                id: Uuid::new_v4(),
                site_id: String::new(),
                timestamp: Utc::now(),
                severity: AlarmSeverity::Emergency,
                state: AlarmState::Active,
                source: "BMS_WARRANTY".to_string(),
                code: 1000,
                message: "CRITICAL: Cell voltage ≤2.5V - warranty void risk!".to_string(),
                details: Some(format!(
                    "Min cell voltage: {}mV (threshold: 2500mV)",
                    measurement.min_cell_voltage_mv
                )),
                acknowledged_by: None,
                acknowledged_at: None,
                cleared_at: None,
            });
        } else if measurement.min_cell_voltage_mv < 2800 {
            alarms.push(Alarm {
                id: Uuid::new_v4(),
                site_id: String::new(),
                timestamp: Utc::now(),
                severity: AlarmSeverity::Critical,
                state: AlarmState::Active,
                source: "BMS_WARRANTY".to_string(),
                code: 1001,
                message: "WARNING: Cell voltage <2.8V - charge immediately".to_string(),
                details: Some(format!(
                    "Min cell voltage: {}mV (threshold: 2800mV)",
                    measurement.min_cell_voltage_mv
                )),
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
