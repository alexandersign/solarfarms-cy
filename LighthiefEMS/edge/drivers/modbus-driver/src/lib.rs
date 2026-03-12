//! Modbus TCP Driver Implementation
//!
//! Provides concrete PCS and BMS driver implementations using Modbus TCP
//! protocol. Includes register maps for Kehua PCS and Linyang BMS.

pub mod pcs_driver;
pub mod bms_driver;
pub mod registry;

pub use pcs_driver::KehuaPcsDriver;
pub use bms_driver::LinyangBmsDriver;
pub use registry::DriverRegistry;
