//! Edge Agent
//!
//! Handles communication between the edge EMS and the cloud platform.
//! Provides store-and-forward capability for telemetry when cloud
//! connectivity is lost, and receives commands from the cloud optimizer.

pub mod nats_bridge;
pub mod store_forward;

use anyhow::Result;
use gridmind_common::TelemetryEnvelope;
use tokio::sync::mpsc;
use tracing::{error, info, warn};

use nats_bridge::NatsBridge;
use store_forward::StoreForward;

/// Edge agent managing cloud communication.
pub struct EdgeAgent {
    nats_url: String,
    site_id: String,
}

impl EdgeAgent {
    pub fn new(nats_url: &str, site_id: &str) -> Self {
        Self {
            nats_url: nats_url.to_string(),
            site_id: site_id.to_string(),
        }
    }

    /// Run the edge agent, consuming telemetry from the control loop.
    pub async fn run(
        &mut self,
        mut telemetry_rx: mpsc::Receiver<TelemetryEnvelope>,
    ) -> Result<()> {
        info!("Edge agent starting for site {}", self.site_id);

        let mut store = StoreForward::new(&format!("data/{}_buffer.db", self.site_id))?;
        let mut bridge = NatsBridge::new(&self.nats_url, &self.site_id);
        let mut connected = false;

        // Try initial connection
        match bridge.connect().await {
            Ok(()) => {
                connected = true;
                info!("Edge agent connected to NATS");
            }
            Err(e) => {
                warn!("NATS connection failed, buffering locally: {}", e);
            }
        }

        loop {
            tokio::select! {
                Some(envelope) = telemetry_rx.recv() => {
                    if connected {
                        match bridge.publish_telemetry(&envelope).await {
                            Ok(()) => {}
                            Err(e) => {
                                warn!("NATS publish failed, buffering: {}", e);
                                connected = false;
                                store.buffer(envelope)?;
                            }
                        }
                    } else {
                        store.buffer(envelope)?;
                    }
                }

                // Reconnection attempt every 10 seconds
                _ = tokio::time::sleep(std::time::Duration::from_secs(10)), if !connected => {
                    match bridge.connect().await {
                        Ok(()) => {
                            connected = true;
                            info!("Reconnected to NATS, flushing buffer");

                            // Flush buffered messages
                            let buffered = store.drain()?;
                            for envelope in buffered {
                                if let Err(e) = bridge.publish_telemetry(&envelope).await {
                                    warn!("Failed to flush buffered message: {}", e);
                                    store.buffer(envelope)?;
                                    connected = false;
                                    break;
                                }
                            }
                        }
                        Err(e) => {
                            warn!("NATS reconnection failed: {}", e);
                        }
                    }
                }

                else => break
            }
        }

        info!("Edge agent stopped");
        Ok(())
    }
}
