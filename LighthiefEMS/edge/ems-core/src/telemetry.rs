//! Telemetry Collection and Export
//!
//! Collects measurements, state changes, and events into telemetry
//! envelopes for transmission to the cloud platform via the edge agent.

use chrono::Utc;
use gridmind_common::*;
use std::time::Instant;
use tokio::sync::mpsc;
use tracing::{debug, info};
use uuid::Uuid;

/// Telemetry collector that packages measurements for cloud transmission.
pub struct TelemetryCollector {
    site_id: String,
    tx: mpsc::Sender<TelemetryEnvelope>,
    start_time: Instant,
}

impl TelemetryCollector {
    /// Create a new telemetry collector.
    ///
    /// Returns the collector and a receiver channel for the edge agent.
    pub fn new(site_id: &str, buffer_size: usize) -> (Self, mpsc::Receiver<TelemetryEnvelope>) {
        let (tx, rx) = mpsc::channel(buffer_size);
        let collector = Self {
            site_id: site_id.to_string(),
            tx,
            start_time: Instant::now(),
        };
        (collector, rx)
    }

    /// Send a measurement telemetry envelope.
    pub async fn send_measurement(&self, measurement: SystemMeasurement) {
        let envelope = TelemetryEnvelope {
            site_id: self.site_id.clone(),
            message_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            payload: TelemetryPayload::Measurement(measurement),
        };

        if let Err(e) = self.tx.send(envelope).await {
            debug!("Telemetry channel full, dropping measurement: {}", e);
        }
    }

    /// Send a state change telemetry envelope.
    pub async fn send_state_change(
        &self,
        previous: SystemState,
        current: SystemState,
        reason: String,
    ) {
        let envelope = TelemetryEnvelope {
            site_id: self.site_id.clone(),
            message_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            payload: TelemetryPayload::StateChange {
                previous,
                current,
                reason,
            },
        };

        if let Err(e) = self.tx.send(envelope).await {
            debug!("Telemetry channel full, dropping state change: {}", e);
        }
    }

    /// Send an alarm telemetry envelope.
    pub async fn send_alarm(&self, alarm: Alarm) {
        let envelope = TelemetryEnvelope {
            site_id: self.site_id.clone(),
            message_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            payload: TelemetryPayload::Alarm(alarm),
        };

        if let Err(e) = self.tx.send(envelope).await {
            debug!("Telemetry channel full, dropping alarm: {}", e);
        }
    }

    /// Send a command execution telemetry envelope.
    pub async fn send_command_executed(&self, command: SetpointCommand, ack: CommandAck) {
        let envelope = TelemetryEnvelope {
            site_id: self.site_id.clone(),
            message_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            payload: TelemetryPayload::CommandExecuted { command, ack },
        };

        if let Err(e) = self.tx.send(envelope).await {
            debug!("Telemetry channel full, dropping command event: {}", e);
        }
    }

    /// Send a heartbeat.
    pub async fn send_heartbeat(&self, state: SystemState) {
        let uptime = self.start_time.elapsed().as_secs();
        let envelope = TelemetryEnvelope {
            site_id: self.site_id.clone(),
            message_id: Uuid::new_v4(),
            timestamp: Utc::now(),
            payload: TelemetryPayload::Heartbeat {
                state,
                uptime_seconds: uptime,
            },
        };

        if let Err(e) = self.tx.send(envelope).await {
            debug!("Telemetry channel full, dropping heartbeat: {}", e);
        }
    }
}
