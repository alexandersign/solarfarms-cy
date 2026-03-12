//! Driver Registry
//!
//! Factory pattern for creating device drivers based on configuration.
//! Allows runtime selection of vendor-specific drivers without the control
//! engine needing to know about specific implementations.

use gridmind_common::DeviceConnectionConfig;
use gridmind_generic_driver::{BmsDriver, DriverError, DriverResult, PcsDriver};
use tracing::info;

use crate::bms_driver::LinyangBmsDriver;
use crate::pcs_driver::KehuaPcsDriver;

/// Registry for creating device drivers from configuration.
pub struct DriverRegistry;

impl DriverRegistry {
    /// Create a PCS driver based on configuration.
    ///
    /// Supported drivers:
    /// - `kehua_bcs1250k` - Kehua BCS1250K-C-HUD via Modbus TCP
    pub fn create_pcs_driver(config: &DeviceConnectionConfig) -> DriverResult<Box<dyn PcsDriver>> {
        info!("Creating PCS driver: {}", config.driver);

        match config.driver.as_str() {
            "kehua_bcs1250k" => {
                let driver = KehuaPcsDriver::new(
                    &config.host,
                    config.port,
                    config.unit_id,
                    config.timeout_ms,
                );
                Ok(Box::new(driver))
            }
            other => Err(DriverError::ConfigError(format!(
                "Unknown PCS driver: '{}'. Supported: kehua_bcs1250k",
                other
            ))),
        }
    }

    /// Create a BMS driver based on configuration.
    ///
    /// Supported drivers:
    /// - `linyang_atlantic` - Linyang Power Atlantic via Modbus TCP
    pub fn create_bms_driver(config: &DeviceConnectionConfig) -> DriverResult<Box<dyn BmsDriver>> {
        info!("Creating BMS driver: {}", config.driver);

        match config.driver.as_str() {
            "linyang_atlantic" => {
                let driver = LinyangBmsDriver::new(
                    &config.host,
                    config.port,
                    config.unit_id,
                    config.timeout_ms,
                );
                Ok(Box::new(driver))
            }
            other => Err(DriverError::ConfigError(format!(
                "Unknown BMS driver: '{}'. Supported: linyang_atlantic",
                other
            ))),
        }
    }
}
