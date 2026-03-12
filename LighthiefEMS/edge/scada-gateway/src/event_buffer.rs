//! Event Buffer for IEC 104 Spontaneous Transmission
//!
//! Maintains a buffer of events (measurement changes, alarms, state changes)
//! that need to be transmitted to the DSO/TSO via IEC 104 spontaneous
//! transmission. Implements deadband filtering for analog values.

use chrono::{DateTime, Utc};
use parking_lot::RwLock;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, VecDeque};
use tracing::debug;

/// An event to be transmitted via IEC 104.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScadaEvent {
    pub timestamp: DateTime<Utc>,
    pub ioa: u32,
    pub value: ScadaValue,
    pub cause_of_transmission: CauseOfTransmission,
}

/// SCADA value types.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ScadaValue {
    /// Single-point (boolean)
    SinglePoint(bool),
    /// Double-point (0=intermediate, 1=off, 2=on, 3=indeterminate)
    DoublePoint(u8),
    /// Measured float value
    MeasuredFloat(f32),
    /// Measured scaled value
    MeasuredScaled(i16),
}

/// IEC 104 Cause of Transmission.
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum CauseOfTransmission {
    /// Periodic/cyclic (1)
    Periodic = 1,
    /// Background scan (2)
    Background = 2,
    /// Spontaneous (3)
    Spontaneous = 3,
    /// Interrogation (20)
    Interrogation = 20,
}

/// Event buffer with deadband filtering.
pub struct EventBuffer {
    /// Queue of pending events to transmit
    queue: RwLock<VecDeque<ScadaEvent>>,
    /// Last transmitted values for deadband comparison
    last_values: RwLock<HashMap<u32, f32>>,
    /// Deadband configuration per IOA
    deadbands: HashMap<u32, f32>,
    /// Maximum queue size
    max_queue_size: usize,
}

impl EventBuffer {
    pub fn new(max_queue_size: usize) -> Self {
        Self {
            queue: RwLock::new(VecDeque::with_capacity(max_queue_size)),
            last_values: RwLock::new(HashMap::new()),
            deadbands: HashMap::new(),
            max_queue_size,
        }
    }

    /// Set deadband for a specific IOA.
    pub fn set_deadband(&mut self, ioa: u32, deadband: f32) {
        self.deadbands.insert(ioa, deadband);
    }

    /// Push a float measurement event, applying deadband filtering.
    /// Returns true if the event was added (exceeded deadband).
    pub fn push_float(&self, ioa: u32, value: f32) -> bool {
        // Check deadband
        if let Some(&deadband) = self.deadbands.get(&ioa) {
            let last = self.last_values.read();
            if let Some(&last_val) = last.get(&ioa) {
                if (value - last_val).abs() < deadband {
                    return false; // Within deadband, skip
                }
            }
        }

        // Update last value
        self.last_values.write().insert(ioa, value);

        // Add event to queue
        let event = ScadaEvent {
            timestamp: Utc::now(),
            ioa,
            value: ScadaValue::MeasuredFloat(value),
            cause_of_transmission: CauseOfTransmission::Spontaneous,
        };

        let mut queue = self.queue.write();
        if queue.len() >= self.max_queue_size {
            queue.pop_front(); // Drop oldest if full
        }
        queue.push_back(event);
        debug!("SCADA event queued: IOA={} value={:.2}", ioa, value);
        true
    }

    /// Push a single-point (boolean) event.
    pub fn push_single_point(&self, ioa: u32, value: bool) {
        let event = ScadaEvent {
            timestamp: Utc::now(),
            ioa,
            value: ScadaValue::SinglePoint(value),
            cause_of_transmission: CauseOfTransmission::Spontaneous,
        };

        let mut queue = self.queue.write();
        if queue.len() >= self.max_queue_size {
            queue.pop_front();
        }
        queue.push_back(event);
        debug!("SCADA event queued: IOA={} value={}", ioa, value);
    }

    /// Drain all pending events from the buffer.
    pub fn drain(&self) -> Vec<ScadaEvent> {
        let mut queue = self.queue.write();
        queue.drain(..).collect()
    }

    /// Get the number of pending events.
    pub fn pending_count(&self) -> usize {
        self.queue.read().len()
    }

    /// Generate interrogation response with all current values.
    pub fn interrogation_response(&self) -> Vec<ScadaEvent> {
        let last = self.last_values.read();
        last.iter()
            .map(|(&ioa, &value)| ScadaEvent {
                timestamp: Utc::now(),
                ioa,
                value: ScadaValue::MeasuredFloat(value),
                cause_of_transmission: CauseOfTransmission::Interrogation,
            })
            .collect()
    }
}
