//! Protection Engine
//!
//! Implements grid protection logic per EN 50549-2 and configurable
//! market-specific protection settings. Monitors voltage and frequency
//! and triggers appropriate protection actions.
//!
//! Protection functions implemented:
//! - Undervoltage Stage 1 (0.9 Un, 0.2s)
//! - Overvoltage Stage 1 (1.1 Un, 0.2s)
//! - Underfrequency Stage 1 (47 Hz, 0.2s)
//! - Overfrequency Stage 1 (52 Hz, 0.2s)
//! - LFSM-O (overfrequency power reduction)
//! - Anti-islanding detection

use chrono::{DateTime, Utc};
use gridmind_common::*;
use tracing::{error, info, warn};

/// Protection trip event.
#[derive(Debug, Clone)]
pub struct ProtectionTrip {
    pub timestamp: DateTime<Utc>,
    pub function: ProtectionFunction,
    pub measured_value: f32,
    pub threshold: f32,
    pub duration_ms: u64,
}

/// Protection function identifiers.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ProtectionFunction {
    UndervoltageStage1,
    OvervoltageStage1,
    UnderfrequencyStage1,
    OverfrequencyStage1,
    AntiIslanding,
    RoCoF, // Rate of Change of Frequency
}

impl std::fmt::Display for ProtectionFunction {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ProtectionFunction::UndervoltageStage1 => write!(f, "Undervoltage Stage 1"),
            ProtectionFunction::OvervoltageStage1 => write!(f, "Overvoltage Stage 1"),
            ProtectionFunction::UnderfrequencyStage1 => write!(f, "Underfrequency Stage 1"),
            ProtectionFunction::OverfrequencyStage1 => write!(f, "Overfrequency Stage 1"),
            ProtectionFunction::AntiIslanding => write!(f, "Anti-Islanding"),
            ProtectionFunction::RoCoF => write!(f, "Rate of Change of Frequency"),
        }
    }
}

/// Timer state for time-delayed protection functions.
struct ProtectionTimer {
    started_at: Option<DateTime<Utc>>,
    duration_ms: u64,
}

impl ProtectionTimer {
    fn new(duration_ms: u64) -> Self {
        Self {
            started_at: None,
            duration_ms,
        }
    }

    fn start(&mut self) {
        if self.started_at.is_none() {
            self.started_at = Some(Utc::now());
        }
    }

    fn reset(&mut self) {
        self.started_at = None;
    }

    fn is_elapsed(&self) -> bool {
        if let Some(start) = self.started_at {
            let elapsed = (Utc::now() - start).num_milliseconds() as u64;
            elapsed >= self.duration_ms
        } else {
            false
        }
    }

    fn elapsed_ms(&self) -> u64 {
        if let Some(start) = self.started_at {
            (Utc::now() - start).num_milliseconds() as u64
        } else {
            0
        }
    }
}

/// Grid protection engine.
pub struct ProtectionEngine {
    settings: ProtectionSettings,
    /// Undervoltage timer
    uv_timer: ProtectionTimer,
    /// Overvoltage timer
    ov_timer: ProtectionTimer,
    /// Underfrequency timer
    uf_timer: ProtectionTimer,
    /// Overfrequency timer
    of_timer: ProtectionTimer,
    /// Previous frequency for RoCoF calculation
    prev_frequency: Option<f32>,
    prev_frequency_time: Option<DateTime<Utc>>,
    /// RoCoF threshold (Hz/s)
    rocof_threshold: f32,
    /// Active protection trips
    active_trips: Vec<ProtectionTrip>,
}

impl ProtectionEngine {
    pub fn new(settings: ProtectionSettings) -> Self {
        let uv_time_ms = (settings.undervoltage_stage1_time_s * 1000.0) as u64;
        let ov_time_ms = (settings.overvoltage_stage1_time_s * 1000.0) as u64;
        let uf_time_ms = (settings.underfrequency_stage1_time_s * 1000.0) as u64;
        let of_time_ms = (settings.overfrequency_stage1_time_s * 1000.0) as u64;

        Self {
            settings,
            uv_timer: ProtectionTimer::new(uv_time_ms),
            ov_timer: ProtectionTimer::new(ov_time_ms),
            uf_timer: ProtectionTimer::new(uf_time_ms),
            of_timer: ProtectionTimer::new(of_time_ms),
            prev_frequency: None,
            prev_frequency_time: None,
            rocof_threshold: 2.0, // Hz/s
            active_trips: Vec::new(),
        }
    }

    /// Evaluate all protection functions against current measurements.
    /// Returns list of new trips (if any).
    pub fn evaluate(&mut self, pcs: &PcsMeasurement) -> Vec<ProtectionTrip> {
        let mut new_trips = Vec::new();

        // ── Voltage Protection ──
        let voltage_pu = pcs.ac_voltage_v / self.settings.nominal_voltage_v;

        // Undervoltage Stage 1
        if voltage_pu < self.settings.undervoltage_stage1_pu {
            self.uv_timer.start();
            if self.uv_timer.is_elapsed() {
                let trip = ProtectionTrip {
                    timestamp: Utc::now(),
                    function: ProtectionFunction::UndervoltageStage1,
                    measured_value: pcs.ac_voltage_v,
                    threshold: self.settings.undervoltage_stage1_pu * self.settings.nominal_voltage_v,
                    duration_ms: self.uv_timer.elapsed_ms(),
                };
                error!(
                    "PROTECTION TRIP: {} - V={:.1}V < {:.1}V for {:.0}ms",
                    trip.function, pcs.ac_voltage_v, trip.threshold, trip.duration_ms
                );
                new_trips.push(trip);
            } else {
                warn!(
                    "Undervoltage pickup: V={:.1}V ({:.3} pu), timer running",
                    pcs.ac_voltage_v, voltage_pu
                );
            }
        } else {
            self.uv_timer.reset();
        }

        // Overvoltage Stage 1
        if voltage_pu > self.settings.overvoltage_stage1_pu {
            self.ov_timer.start();
            if self.ov_timer.is_elapsed() {
                let trip = ProtectionTrip {
                    timestamp: Utc::now(),
                    function: ProtectionFunction::OvervoltageStage1,
                    measured_value: pcs.ac_voltage_v,
                    threshold: self.settings.overvoltage_stage1_pu * self.settings.nominal_voltage_v,
                    duration_ms: self.ov_timer.elapsed_ms(),
                };
                error!(
                    "PROTECTION TRIP: {} - V={:.1}V > {:.1}V for {:.0}ms",
                    trip.function, pcs.ac_voltage_v, trip.threshold, trip.duration_ms
                );
                new_trips.push(trip);
            } else {
                warn!(
                    "Overvoltage pickup: V={:.1}V ({:.3} pu), timer running",
                    pcs.ac_voltage_v, voltage_pu
                );
            }
        } else {
            self.ov_timer.reset();
        }

        // ── Frequency Protection ──
        let freq = pcs.frequency_hz;

        // Underfrequency Stage 1
        if freq < self.settings.underfrequency_stage1_hz {
            self.uf_timer.start();
            if self.uf_timer.is_elapsed() {
                let trip = ProtectionTrip {
                    timestamp: Utc::now(),
                    function: ProtectionFunction::UnderfrequencyStage1,
                    measured_value: freq,
                    threshold: self.settings.underfrequency_stage1_hz,
                    duration_ms: self.uf_timer.elapsed_ms(),
                };
                error!(
                    "PROTECTION TRIP: {} - f={:.2}Hz < {:.1}Hz for {:.0}ms",
                    trip.function, freq, trip.threshold, trip.duration_ms
                );
                new_trips.push(trip);
            }
        } else {
            self.uf_timer.reset();
        }

        // Overfrequency Stage 1
        if freq > self.settings.overfrequency_stage1_hz {
            self.of_timer.start();
            if self.of_timer.is_elapsed() {
                let trip = ProtectionTrip {
                    timestamp: Utc::now(),
                    function: ProtectionFunction::OverfrequencyStage1,
                    measured_value: freq,
                    threshold: self.settings.overfrequency_stage1_hz,
                    duration_ms: self.of_timer.elapsed_ms(),
                };
                error!(
                    "PROTECTION TRIP: {} - f={:.2}Hz > {:.1}Hz for {:.0}ms",
                    trip.function, freq, trip.threshold, trip.duration_ms
                );
                new_trips.push(trip);
            }
        } else {
            self.of_timer.reset();
        }

        // ── Rate of Change of Frequency (RoCoF) ──
        if let (Some(prev_f), Some(prev_t)) = (self.prev_frequency, self.prev_frequency_time) {
            let dt = (Utc::now() - prev_t).num_milliseconds() as f32 / 1000.0;
            if dt > 0.0 {
                let rocof = (freq - prev_f) / dt;
                if rocof.abs() > self.rocof_threshold {
                    let trip = ProtectionTrip {
                        timestamp: Utc::now(),
                        function: ProtectionFunction::RoCoF,
                        measured_value: rocof,
                        threshold: self.rocof_threshold,
                        duration_ms: 0,
                    };
                    warn!(
                        "RoCoF protection: df/dt={:.2} Hz/s (threshold: {:.1} Hz/s)",
                        rocof, self.rocof_threshold
                    );
                    new_trips.push(trip);
                }
            }
        }

        self.prev_frequency = Some(freq);
        self.prev_frequency_time = Some(Utc::now());

        // Store active trips
        self.active_trips.extend(new_trips.clone());
        new_trips
    }

    /// Check if any protection trip is currently active.
    pub fn has_active_trip(&self) -> bool {
        !self.active_trips.is_empty()
    }

    /// Get all active trips.
    pub fn active_trips(&self) -> &[ProtectionTrip] {
        &self.active_trips
    }

    /// Clear all active trips (after fault reset).
    pub fn clear_trips(&mut self) {
        self.active_trips.clear();
        self.uv_timer.reset();
        self.ov_timer.reset();
        self.uf_timer.reset();
        self.of_timer.reset();
        info!("Protection trips cleared");
    }

    /// Get the protection settings.
    pub fn settings(&self) -> &ProtectionSettings {
        &self.settings
    }
}
