//! IEC 104 Command Handler
//!
//! Processes incoming commands from the DSO/TSO SCADA system and converts
//! them into internal EMS setpoint commands. Handles both continuous
//! setpoint commands (P/Q) and discrete power level commands.

use chrono::Utc;
use gridmind_common::*;
use tracing::{info, warn, error};
use uuid::Uuid;

use crate::point_map::{PointMap, Direction};

/// Result of processing a SCADA command.
#[derive(Debug, Clone)]
pub enum CommandResult {
    /// Setpoint command to forward to control engine
    Setpoint(SetpointCommand),
    /// Discrete power level change
    DiscretePower(DiscretePowerLevel),
    /// Command rejected with reason
    Rejected(String),
}

/// Handles incoming IEC 104 commands from the DSO/TSO.
pub struct CommandHandler {
    point_map: PointMap,
    /// Maximum allowed active power in kW
    max_power_kw: f32,
    /// Maximum allowed reactive power in kVAr
    max_reactive_kvar: f32,
    /// Current active discrete power level
    current_power_level: DiscretePowerLevel,
}

impl CommandHandler {
    pub fn new(point_map: PointMap, max_power_kw: f32, max_reactive_kvar: f32) -> Self {
        Self {
            point_map,
            max_power_kw,
            max_reactive_kvar,
            current_power_level: DiscretePowerLevel::Level1Full,
        }
    }

    /// Process a setpoint command (C_SE_NC_1, Type 50) from SCADA.
    ///
    /// IOA 30: Active Power Setpoint (kW)
    /// IOA 31: Reactive Power Setpoint (kVAr)
    pub fn handle_setpoint(&self, ioa: u32, value: f32) -> CommandResult {
        let point = match self.point_map.get_by_ioa(ioa) {
            Some(p) => p,
            None => {
                warn!("Unknown IOA for setpoint command: {}", ioa);
                return CommandResult::Rejected(format!("Unknown IOA: {}", ioa));
            }
        };

        if point.direction != Direction::Control {
            warn!("IOA {} is not a control point", ioa);
            return CommandResult::Rejected(format!("IOA {} is monitor-only", ioa));
        }

        let scaled_value = value * point.scale_factor + point.offset;

        match point.internal_name.as_str() {
            "active_power_setpoint_kw" => {
                // Validate against max power and current discrete level
                let max_allowed = self.max_power_kw * self.current_power_level.fraction();
                if scaled_value.abs() > max_allowed {
                    warn!(
                        "Active power setpoint {:.1}kW exceeds max allowed {:.1}kW (level: {:?})",
                        scaled_value, max_allowed, self.current_power_level
                    );
                    return CommandResult::Rejected(format!(
                        "Setpoint {:.1}kW exceeds limit {:.1}kW",
                        scaled_value, max_allowed
                    ));
                }

                info!("DSO active power setpoint: {:.1} kW", scaled_value);
                CommandResult::Setpoint(SetpointCommand {
                    id: Uuid::new_v4(),
                    timestamp: Utc::now(),
                    source: CommandSource::ScadaDso,
                    active_power_kw: Some(scaled_value),
                    reactive_power_kvar: None,
                    mode: None,
                    start_stop: None,
                })
            }
            "reactive_power_setpoint_kvar" => {
                if scaled_value.abs() > self.max_reactive_kvar {
                    warn!(
                        "Reactive power setpoint {:.1}kVAr exceeds max {:.1}kVAr",
                        scaled_value, self.max_reactive_kvar
                    );
                    return CommandResult::Rejected(format!(
                        "Setpoint {:.1}kVAr exceeds limit {:.1}kVAr",
                        scaled_value, self.max_reactive_kvar
                    ));
                }

                info!("DSO reactive power setpoint: {:.1} kVAr", scaled_value);
                CommandResult::Setpoint(SetpointCommand {
                    id: Uuid::new_v4(),
                    timestamp: Utc::now(),
                    source: CommandSource::ScadaDso,
                    active_power_kw: None,
                    reactive_power_kvar: Some(scaled_value),
                    mode: None,
                    start_stop: None,
                })
            }
            other => {
                warn!("Unhandled setpoint point: {}", other);
                CommandResult::Rejected(format!("Unhandled setpoint: {}", other))
            }
        }
    }

    /// Process a single command (C_SC_NA_1, Type 45) from SCADA.
    ///
    /// IOA 50-53: Discrete power level commands
    pub fn handle_single_command(&mut self, ioa: u32, value: bool) -> CommandResult {
        let point = match self.point_map.get_by_ioa(ioa) {
            Some(p) => p,
            None => {
                warn!("Unknown IOA for single command: {}", ioa);
                return CommandResult::Rejected(format!("Unknown IOA: {}", ioa));
            }
        };

        if !value {
            // Only process ON commands for power levels
            return CommandResult::Rejected("Only ON commands accepted for power levels".into());
        }

        match point.internal_name.as_str() {
            "power_level_1" => {
                info!("DSO discrete command: Level 1 (100%)");
                self.current_power_level = DiscretePowerLevel::Level1Full;
                CommandResult::DiscretePower(DiscretePowerLevel::Level1Full)
            }
            "power_level_2" => {
                info!("DSO discrete command: Level 2 (60%)");
                self.current_power_level = DiscretePowerLevel::Level2Reduced;
                CommandResult::DiscretePower(DiscretePowerLevel::Level2Reduced)
            }
            "power_level_3" => {
                info!("DSO discrete command: Level 3 (30%)");
                self.current_power_level = DiscretePowerLevel::Level3Minimum;
                CommandResult::DiscretePower(DiscretePowerLevel::Level3Minimum)
            }
            "power_level_4" => {
                info!("DSO discrete command: Level 4 (0% - Zero Export)");
                self.current_power_level = DiscretePowerLevel::Level4ZeroExport;
                CommandResult::DiscretePower(DiscretePowerLevel::Level4ZeroExport)
            }
            other => {
                warn!("Unhandled single command point: {}", other);
                CommandResult::Rejected(format!("Unhandled command: {}", other))
            }
        }
    }

    /// Get the current discrete power level.
    pub fn current_power_level(&self) -> DiscretePowerLevel {
        self.current_power_level
    }

    /// Get the effective max power based on current discrete level.
    pub fn effective_max_power_kw(&self) -> f32 {
        self.max_power_kw * self.current_power_level.fraction()
    }
}
