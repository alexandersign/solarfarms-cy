//! NATS Bridge
//!
//! Handles NATS JetStream connection for edge-to-cloud messaging.
//! Publishes telemetry to cloud subjects and subscribes to command subjects.

use anyhow::Result;
use gridmind_common::TelemetryEnvelope;
use tracing::{debug, error, info};

/// NATS bridge for cloud communication.
pub struct NatsBridge {
    nats_url: String,
    site_id: String,
    client: Option<async_nats::Client>,
}

impl NatsBridge {
    pub fn new(nats_url: &str, site_id: &str) -> Self {
        Self {
            nats_url: nats_url.to_string(),
            site_id: site_id.to_string(),
            client: None,
        }
    }

    /// Connect to the NATS server.
    pub async fn connect(&mut self) -> Result<()> {
        let client = async_nats::connect(&self.nats_url).await?;
        self.client = Some(client);
        info!("NATS connected to {}", self.nats_url);
        Ok(())
    }

    /// Publish a telemetry envelope to the cloud.
    pub async fn publish_telemetry(&self, envelope: &TelemetryEnvelope) -> Result<()> {
        let client = self
            .client
            .as_ref()
            .ok_or_else(|| anyhow::anyhow!("NATS not connected"))?;

        let subject = format!("gridmind.{}.telemetry", self.site_id);
        let payload = serde_json::to_vec(envelope)?;

        client
            .publish(subject.clone(), payload.into())
            .await?;

        debug!("Published telemetry to {}", subject);
        Ok(())
    }

    /// Check if connected.
    pub fn is_connected(&self) -> bool {
        self.client.is_some()
    }

    /// Disconnect from NATS.
    pub async fn disconnect(&mut self) {
        self.client = None;
        info!("NATS disconnected");
    }
}
