//! Store and Forward Buffer
//!
//! SQLite-based local buffer for telemetry messages when cloud
//! connectivity is lost. Messages are stored locally and forwarded
//! when the connection is re-established.

use anyhow::Result;
use gridmind_common::TelemetryEnvelope;
use rusqlite::Connection;
use tracing::{debug, info, warn};

/// Local store-and-forward buffer using SQLite.
pub struct StoreForward {
    conn: Connection,
}

impl StoreForward {
    /// Create a new store-forward buffer.
    pub fn new(db_path: &str) -> Result<Self> {
        // Ensure parent directory exists
        if let Some(parent) = std::path::Path::new(db_path).parent() {
            std::fs::create_dir_all(parent)?;
        }

        let conn = Connection::open(db_path)?;

        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS telemetry_buffer (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                payload TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now'))
            );
            CREATE INDEX IF NOT EXISTS idx_buffer_timestamp
                ON telemetry_buffer(timestamp);",
        )?;

        info!("Store-forward buffer initialized at {}", db_path);
        Ok(Self { conn })
    }

    /// Buffer a telemetry envelope for later transmission.
    pub fn buffer(&mut self, envelope: TelemetryEnvelope) -> Result<()> {
        let payload = serde_json::to_string(&envelope)?;
        let timestamp = envelope.timestamp.to_rfc3339();

        self.conn.execute(
            "INSERT INTO telemetry_buffer (timestamp, payload) VALUES (?1, ?2)",
            rusqlite::params![timestamp, payload],
        )?;

        debug!("Buffered telemetry message: {}", envelope.message_id);
        Ok(())
    }

    /// Drain all buffered messages (oldest first).
    pub fn drain(&mut self) -> Result<Vec<TelemetryEnvelope>> {
        let mut stmt = self
            .conn
            .prepare("SELECT id, payload FROM telemetry_buffer ORDER BY id ASC")?;

        let rows: Vec<(i64, String)> = stmt
            .query_map([], |row| {
                Ok((row.get(0)?, row.get(1)?))
            })?
            .filter_map(|r| r.ok())
            .collect();

        let mut envelopes = Vec::new();
        let mut ids_to_delete = Vec::new();

        for (id, payload) in rows {
            match serde_json::from_str::<TelemetryEnvelope>(&payload) {
                Ok(envelope) => {
                    envelopes.push(envelope);
                    ids_to_delete.push(id);
                }
                Err(e) => {
                    warn!("Failed to deserialize buffered message {}: {}", id, e);
                    ids_to_delete.push(id); // Remove corrupted entries
                }
            }
        }

        // Delete drained messages
        if !ids_to_delete.is_empty() {
            let placeholders: Vec<String> = ids_to_delete.iter().map(|_| "?".to_string()).collect();
            let sql = format!(
                "DELETE FROM telemetry_buffer WHERE id IN ({})",
                placeholders.join(",")
            );
            let params: Vec<Box<dyn rusqlite::types::ToSql>> = ids_to_delete
                .iter()
                .map(|id| Box::new(*id) as Box<dyn rusqlite::types::ToSql>)
                .collect();

            self.conn.execute(&sql, rusqlite::params_from_iter(params.iter().map(|p| p.as_ref())))?;
        }

        info!("Drained {} buffered messages", envelopes.len());
        Ok(envelopes)
    }

    /// Get the number of buffered messages.
    pub fn count(&self) -> Result<usize> {
        let count: i64 = self
            .conn
            .query_row("SELECT COUNT(*) FROM telemetry_buffer", [], |row| {
                row.get(0)
            })?;
        Ok(count as usize)
    }
}
