//! Real-Time Control Loop
//!
//! Core control loop running at configurable cycle time (default 100ms).
//! Executes the following sequence each cycle:
//! 1. Read measurements from PCS and BMS
//! 2. Evaluate protection conditions
//! 3. Evaluate state machine transitions
//! 4. Calculate setpoints (PQ dispatch, droop, LFSM-O)
//! 5. Apply ramp rate limits
//! 6. Write setpoints to PCS
//! 7. Update SCADA event buffer
//! 8. Publish telemetry

use chrono::Utc;
use gridmind_common::*;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::mpsc;
use tracing::{debug, error, info, warn};

use crate::protection::ProtectionEngine;
use crate::state_machine::StateMachine;

/// Control loop output - the computed setpoint for PCS.
#[derive(Debug, Clone)]
pub struct ControlOutput {
    /// Active power setpoint in kW
    pub active_power_kw: f32,
    /// Reactive power setpoint in kVAr
    pub reactive_power_kvar: f32,
    /// Whether the output has changed from last cycle
    pub changed: bool,
}

/// The real-time control loop engine.
pub struct ControlLoop {
    /// Control loop configuration
    config: ControlConfig,
    /// Protection settings
    protection_settings: ProtectionSettings,
    /// Last commanded setpoint
    last_setpoint: ControlOutput,
    /// Current target from optimizer/DSO
    target_setpoint: ControlOutput,
    /// Maximum power based on discrete power level
    max_power_fraction: f32,
    /// Rated power in kW
    rated_power_kw: f32,
    /// LFSM-O active flag
    lfsm_o_active: bool,
    /// Q(U) contribution
    qu_reactive_kvar: f32,
}

impl ControlLoop {
    pub fn new(
        config: ControlConfig,
        protection_settings: ProtectionSettings,
        rated_power_kw: f32,
    ) -> Self {
        Self {
            config,
            protection_settings,
            last_setpoint: ControlOutput {
                active_power_kw: 0.0,
                reactive_power_kvar: 0.0,
                changed: false,
            },
            target_setpoint: ControlOutput {
                active_power_kw: 0.0,
                reactive_power_kvar: 0.0,
                changed: false,
            },
            max_power_fraction: 1.0,
            rated_power_kw,
            lfsm_o_active: false,
            qu_reactive_kvar: 0.0,
        }
    }

    /// Set the target setpoint from DSO/optimizer command.
    pub fn set_target(&mut self, active_kw: f32, reactive_kvar: f32) {
        self.target_setpoint = ControlOutput {
            active_power_kw: active_kw,
            reactive_power_kvar: reactive_kvar,
            changed: true,
        };
        debug!("Control target set: P={:.1}kW Q={:.1}kVAr", active_kw, reactive_kvar);
    }

    /// Set discrete power level from DSO command.
    pub fn set_power_level(&mut self, level: DiscretePowerLevel) {
        self.max_power_fraction = level.fraction();
        info!(
            "Power level set to {:?} ({:.0}%)",
            level,
            self.max_power_fraction * 100.0
        );
    }

    /// Execute one control cycle.
    ///
    /// Returns the computed control output to send to the PCS.
    pub fn execute_cycle(
        &mut self,
        pcs: &Option<PcsMeasurement>,
        bms: &Option<BmsMeasurement>,
        state: SystemState,
        dt_seconds: f32,
    ) -> ControlOutput {
        // Start with target setpoint
        let mut output_p = self.target_setpoint.active_power_kw;
        let mut output_q = self.target_setpoint.reactive_power_kvar;

        // ── Apply LFSM-O (overfrequency power reduction) ──
        if let Some(pcs_data) = pcs {
            let freq = pcs_data.frequency_hz;
            let f_act = self.protection_settings.lfsm_o_activation_hz;

            if freq > f_act {
                // LFSM-O: reduce power proportionally
                let delta_f = freq - f_act;
                let droop = self.protection_settings.lfsm_o_droop_per_hz;
                let reduction_fraction = (delta_f * droop).min(1.0);
                let max_power = self.rated_power_kw * self.max_power_fraction;
                let reduction_kw = max_power * reduction_fraction;

                output_p = (output_p - reduction_kw).max(0.0);
                self.lfsm_o_active = true;
                debug!(
                    "LFSM-O active: f={:.2}Hz, reduction={:.1}kW ({:.1}%)",
                    freq, reduction_kw, reduction_fraction * 100.0
                );
            } else {
                self.lfsm_o_active = false;
            }
        }

        // ── Apply Q(U) reactive power control ──
        if let Some(pcs_data) = pcs {
            let voltage_pu = pcs_data.ac_voltage_v / self.protection_settings.nominal_voltage_v;
            self.qu_reactive_kvar = self.calculate_qu(voltage_pu);
            output_q += self.qu_reactive_kvar;
        }

        // ── Apply SOC limits ──
        if let Some(bms_data) = bms {
            // Prevent discharge below SOC low limit
            if bms_data.soc_percent <= self.config.soc_low_limit && output_p > 0.0 {
                output_p = 0.0;
                warn!(
                    "SOC low limit reached ({:.1}% <= {:.1}%), discharge blocked",
                    bms_data.soc_percent, self.config.soc_low_limit
                );
            }
            // Prevent charge above SOC high limit
            if bms_data.soc_percent >= self.config.soc_high_limit && output_p < 0.0 {
                output_p = 0.0;
                warn!(
                    "SOC high limit reached ({:.1}% >= {:.1}%), charge blocked",
                    bms_data.soc_percent, self.config.soc_high_limit
                );
            }
        }

        // ── Apply power level constraint ──
        let max_allowed = self.rated_power_kw * self.max_power_fraction;
        output_p = output_p.clamp(-max_allowed, max_allowed);

        // ── Apply ramp rate limiting ──
        let max_delta = self.config.max_ramp_rate_kw_per_s * dt_seconds;
        let delta_p = output_p - self.last_setpoint.active_power_kw;
        if delta_p.abs() > max_delta {
            output_p = self.last_setpoint.active_power_kw + delta_p.signum() * max_delta;
            debug!(
                "Ramp rate limited: delta={:.1}kW, max={:.1}kW/cycle",
                delta_p, max_delta
            );
        }

        // ── State-based constraints ──
        match state {
            SystemState::Standby | SystemState::Init => {
                output_p = 0.0;
                output_q = 0.0;
            }
            SystemState::Fault | SystemState::EmergencyStop => {
                output_p = 0.0;
                output_q = 0.0;
            }
            SystemState::Idle => {
                output_p = 0.0;
                // Keep Q for grid support if needed
            }
            _ => {}
        }

        let changed = (output_p - self.last_setpoint.active_power_kw).abs() > 0.1
            || (output_q - self.last_setpoint.reactive_power_kvar).abs() > 0.1;

        let output = ControlOutput {
            active_power_kw: output_p,
            reactive_power_kvar: output_q,
            changed,
        };

        self.last_setpoint = output.clone();
        output
    }

    /// Calculate Q(U) reactive power from voltage per-unit value.
    /// Interpolates the Q(U) curve from protection settings.
    fn calculate_qu(&self, voltage_pu: f32) -> f32 {
        let curve = &self.protection_settings.qu_curve;

        if curve.is_empty() {
            return 0.0;
        }

        // Below first point
        if voltage_pu <= curve[0].0 {
            return curve[0].1 * self.rated_power_kw;
        }

        // Above last point
        if voltage_pu >= curve[curve.len() - 1].0 {
            return curve[curve.len() - 1].1 * self.rated_power_kw;
        }

        // Linear interpolation between points
        for i in 0..curve.len() - 1 {
            let (v1, q1) = curve[i];
            let (v2, q2) = curve[i + 1];

            if voltage_pu >= v1 && voltage_pu <= v2 {
                let t = (voltage_pu - v1) / (v2 - v1);
                let q = q1 + t * (q2 - q1);
                return q * self.rated_power_kw;
            }
        }

        0.0
    }

    /// Get the current LFSM-O status.
    pub fn is_lfsm_o_active(&self) -> bool {
        self.lfsm_o_active
    }

    /// Get the last computed output.
    pub fn last_output(&self) -> &ControlOutput {
        &self.last_setpoint
    }
}
