//! EMS State Machine
//!
//! Manages the top-level operating state of the BESS system.
//! State transitions are driven by commands, measurements, protection
//! events, and fault conditions.
//!
//! States: INIT -> STANDBY <-> CHARGING / DISCHARGING -> IDLE -> FAULT
//!
//! See readme Section 13.1 for the full state diagram.

use chrono::{DateTime, Utc};
use gridmind_common::*;
use tracing::{error, info, warn};

/// State transition event.
#[derive(Debug, Clone)]
pub struct StateTransition {
    pub timestamp: DateTime<Utc>,
    pub from: SystemState,
    pub to: SystemState,
    pub reason: String,
}

/// The EMS state machine.
pub struct StateMachine {
    current_state: SystemState,
    previous_state: SystemState,
    state_entered_at: DateTime<Utc>,
    transition_history: Vec<StateTransition>,
    max_history: usize,
    /// Fault conditions that prevent leaving FAULT state
    active_faults: Vec<String>,
}

impl StateMachine {
    pub fn new() -> Self {
        info!("State machine initialized in INIT state");
        Self {
            current_state: SystemState::Init,
            previous_state: SystemState::Init,
            state_entered_at: Utc::now(),
            transition_history: Vec::new(),
            max_history: 1000,
            active_faults: Vec::new(),
        }
    }

    /// Get the current state.
    pub fn state(&self) -> SystemState {
        self.current_state
    }

    /// Get the previous state.
    pub fn previous_state(&self) -> SystemState {
        self.previous_state
    }

    /// Get how long the system has been in the current state.
    pub fn time_in_state(&self) -> chrono::Duration {
        Utc::now() - self.state_entered_at
    }

    /// Get active faults.
    pub fn active_faults(&self) -> &[String] {
        &self.active_faults
    }

    /// Attempt a state transition. Returns Ok(transition) if successful.
    pub fn transition(
        &mut self,
        target: SystemState,
        reason: &str,
    ) -> Result<StateTransition, String> {
        // Validate the transition
        if !self.is_valid_transition(target) {
            let msg = format!(
                "Invalid transition: {} -> {} (reason: {})",
                self.current_state, target, reason
            );
            warn!("{}", msg);
            return Err(msg);
        }

        let transition = StateTransition {
            timestamp: Utc::now(),
            from: self.current_state,
            to: target,
            reason: reason.to_string(),
        };

        info!(
            "State transition: {} -> {} ({})",
            self.current_state, target, reason
        );

        self.previous_state = self.current_state;
        self.current_state = target;
        self.state_entered_at = Utc::now();

        // Clear faults when leaving FAULT state
        if self.previous_state == SystemState::Fault && target != SystemState::Fault {
            self.active_faults.clear();
        }

        // Maintain history
        if self.transition_history.len() >= self.max_history {
            self.transition_history.remove(0);
        }
        self.transition_history.push(transition.clone());

        Ok(transition)
    }

    /// Force transition to FAULT state.
    pub fn fault(&mut self, fault_reason: &str) -> StateTransition {
        error!("FAULT: {}", fault_reason);
        self.active_faults.push(fault_reason.to_string());

        let transition = StateTransition {
            timestamp: Utc::now(),
            from: self.current_state,
            to: SystemState::Fault,
            reason: fault_reason.to_string(),
        };

        self.previous_state = self.current_state;
        self.current_state = SystemState::Fault;
        self.state_entered_at = Utc::now();
        self.transition_history.push(transition.clone());

        transition
    }

    /// Force transition to EMERGENCY_STOP.
    pub fn emergency_stop(&mut self, reason: &str) -> StateTransition {
        error!("EMERGENCY STOP: {}", reason);

        let transition = StateTransition {
            timestamp: Utc::now(),
            from: self.current_state,
            to: SystemState::EmergencyStop,
            reason: reason.to_string(),
        };

        self.previous_state = self.current_state;
        self.current_state = SystemState::EmergencyStop;
        self.state_entered_at = Utc::now();
        self.transition_history.push(transition.clone());

        transition
    }

    /// Check if a transition is valid from current state.
    fn is_valid_transition(&self, target: SystemState) -> bool {
        use SystemState::*;

        matches!(
            (self.current_state, target),
            // From INIT
            (Init, Standby) | (Init, Fault) |
            // From STANDBY
            (Standby, Charging) | (Standby, Discharging) | (Standby, Idle) | (Standby, Fault) |
            // From CHARGING
            (Charging, Standby) | (Charging, Idle) | (Charging, Fault) | (Charging, Discharging) |
            // From DISCHARGING
            (Discharging, Standby) | (Discharging, Idle) | (Discharging, Fault) | (Discharging, Charging) |
            // From IDLE
            (Idle, Standby) | (Idle, Charging) | (Idle, Discharging) | (Idle, Fault) |
            // From FAULT (only after faults cleared)
            (Fault, Standby) | (Fault, Init) |
            // Emergency stop can go to Init after reset
            (EmergencyStop, Init)
        )
    }

    /// Evaluate state transitions based on current measurements.
    pub fn evaluate(
        &mut self,
        pcs: &Option<PcsMeasurement>,
        bms: &Option<BmsMeasurement>,
        cmd: &Option<SetpointCommand>,
    ) -> Option<StateTransition> {
        match self.current_state {
            SystemState::Init => {
                // Check if all systems are ready
                if pcs.is_some() && bms.is_some() {
                    let bms_data = bms.as_ref().unwrap();
                    if bms_data.alarm_word_1 == 0 && bms_data.alarm_word_2 == 0 {
                        return self.transition(SystemState::Standby, "Initialization complete, all systems OK").ok();
                    }
                }
                None
            }

            SystemState::Standby => {
                if let Some(cmd) = cmd {
                    if let Some(p) = cmd.active_power_kw {
                        if p > 0.0 {
                            return self.transition(SystemState::Discharging, "Discharge command received").ok();
                        } else if p < 0.0 {
                            return self.transition(SystemState::Charging, "Charge command received").ok();
                        }
                    }
                }
                None
            }

            SystemState::Charging => {
                if let Some(bms_data) = bms {
                    // Transition to IDLE when fully charged
                    if bms_data.soc_percent >= 99.5 {
                        return self.transition(SystemState::Idle, "SOC reached 100%, charging complete").ok();
                    }
                }
                // Check if commanded to stop or switch
                if let Some(cmd) = cmd {
                    if let Some(p) = cmd.active_power_kw {
                        if p > 0.0 {
                            return self.transition(SystemState::Discharging, "Switched to discharge").ok();
                        } else if p == 0.0 {
                            return self.transition(SystemState::Standby, "Zero power commanded").ok();
                        }
                    }
                }
                None
            }

            SystemState::Discharging => {
                if let Some(bms_data) = bms {
                    // Transition to IDLE when fully discharged
                    if bms_data.soc_percent <= 0.5 {
                        return self.transition(SystemState::Idle, "SOC reached 0%, discharging complete").ok();
                    }
                }
                // Check if commanded to stop or switch
                if let Some(cmd) = cmd {
                    if let Some(p) = cmd.active_power_kw {
                        if p < 0.0 {
                            return self.transition(SystemState::Charging, "Switched to charge").ok();
                        } else if p == 0.0 {
                            return self.transition(SystemState::Standby, "Zero power commanded").ok();
                        }
                    }
                }
                None
            }

            SystemState::Idle => {
                // Return to standby after period or on command
                if let Some(cmd) = cmd {
                    if cmd.active_power_kw.is_some() {
                        return self.transition(SystemState::Standby, "Command received in idle").ok();
                    }
                }
                None
            }

            SystemState::Fault => {
                // Can only leave fault after all faults cleared and explicit reset
                None
            }

            SystemState::EmergencyStop => {
                // Requires manual reset
                None
            }
        }
    }

    /// Get recent transition history.
    pub fn history(&self) -> &[StateTransition] {
        &self.transition_history
    }
}
