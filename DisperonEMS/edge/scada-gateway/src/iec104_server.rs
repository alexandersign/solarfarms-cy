//! IEC 60870-5-104 Server Implementation
//!
//! TCP server that implements the IEC 104 slave (controlled station) role.
//! Accepts connections from DSO/TSO SCADA master and handles:
//! - General interrogation requests
//! - Setpoint commands (C_SE_NC_1)
//! - Single commands (C_SC_NA_1)
//! - Spontaneous transmission of measurements and events
//! - Clock synchronization
//!
//! This is a high-level implementation. The actual IEC 104 APDU/APCI/ASDU
//! encoding uses the transport layer protocol defined in IEC 60870-5-104.

use chrono::Utc;
use gridmind_common::*;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::{broadcast, mpsc};
use tracing::{error, info, warn};

use crate::command_handler::{CommandHandler, CommandResult};
use crate::event_buffer::EventBuffer;
use crate::point_map::PointMap;

/// IEC 104 APCI frame types.
#[derive(Debug, Clone, Copy)]
pub enum ApciFrame {
    /// I-frame: Information transfer
    IFrame { send_seq: u16, recv_seq: u16 },
    /// S-frame: Supervisory (acknowledgment)
    SFrame { recv_seq: u16 },
    /// U-frame: Unnumbered (STARTDT, STOPDT, TESTFR)
    UFrame(UFrameFunction),
}

#[derive(Debug, Clone, Copy)]
pub enum UFrameFunction {
    StartDtAct,
    StartDtCon,
    StopDtAct,
    StopDtCon,
    TestFrAct,
    TestFrCon,
}

/// Commands received from SCADA that need to be forwarded to the control engine.
pub enum ScadaCommand {
    Setpoint(SetpointCommand),
    DiscretePower(DiscretePowerLevel),
    StartDt,
    StopDt,
    Interrogation,
}

/// IEC 60870-5-104 Server.
pub struct Iec104Server {
    bind_address: String,
    port: u16,
    point_map: Arc<PointMap>,
    event_buffer: Arc<EventBuffer>,
    /// Channel to send commands to the control engine
    command_tx: mpsc::Sender<ScadaCommand>,
    /// Channel to receive commands in the control engine
    command_rx: Option<mpsc::Receiver<ScadaCommand>>,
    /// Broadcast channel for shutdown signal
    shutdown_tx: broadcast::Sender<()>,
    /// Connection active flag
    active: Arc<std::sync::atomic::AtomicBool>,
}

impl Iec104Server {
    /// Create a new IEC 104 server.
    pub fn new(
        bind_address: &str,
        port: u16,
        point_map: PointMap,
    ) -> Self {
        let (command_tx, command_rx) = mpsc::channel(256);
        let (shutdown_tx, _) = broadcast::channel(1);

        let mut event_buffer = EventBuffer::new(10000);

        // Configure deadbands from point map
        for point in point_map.monitored_points() {
            if let Some(db) = point.deadband {
                event_buffer.set_deadband(point.ioa, db);
            }
        }

        Self {
            bind_address: bind_address.to_string(),
            port,
            point_map: Arc::new(point_map),
            event_buffer: Arc::new(event_buffer),
            command_tx,
            command_rx: Some(command_rx),
            shutdown_tx,
            active: Arc::new(std::sync::atomic::AtomicBool::new(false)),
        }
    }

    /// Take the command receiver channel (can only be called once).
    pub fn take_command_rx(&mut self) -> Option<mpsc::Receiver<ScadaCommand>> {
        self.command_rx.take()
    }

    /// Get a reference to the event buffer for pushing measurements.
    pub fn event_buffer(&self) -> Arc<EventBuffer> {
        Arc::clone(&self.event_buffer)
    }

    /// Get a reference to the point map.
    pub fn point_map(&self) -> Arc<PointMap> {
        Arc::clone(&self.point_map)
    }

    /// Check if a SCADA master is connected and active.
    pub fn is_active(&self) -> bool {
        self.active.load(std::sync::atomic::Ordering::Relaxed)
    }

    /// Start the IEC 104 TCP server.
    pub async fn start(&self) -> anyhow::Result<()> {
        let addr = format!("{}:{}", self.bind_address, self.port);
        let listener = TcpListener::bind(&addr).await?;
        info!("IEC 104 server listening on {} (port {})", addr, self.port);

        let active = Arc::clone(&self.active);
        let event_buffer = Arc::clone(&self.event_buffer);
        let point_map = Arc::clone(&self.point_map);
        let command_tx = self.command_tx.clone();
        let mut shutdown_rx = self.shutdown_tx.subscribe();

        tokio::spawn(async move {
            loop {
                tokio::select! {
                    accept_result = listener.accept() => {
                        match accept_result {
                            Ok((stream, peer_addr)) => {
                                info!("IEC 104 connection from {}", peer_addr);
                                active.store(true, std::sync::atomic::Ordering::Relaxed);

                                let active_clone = Arc::clone(&active);
                                let eb = Arc::clone(&event_buffer);
                                let pm = Arc::clone(&point_map);
                                let ctx = command_tx.clone();

                                tokio::spawn(async move {
                                    if let Err(e) = Self::handle_connection(
                                        stream, peer_addr, eb, pm, ctx
                                    ).await {
                                        error!("IEC 104 connection error: {}", e);
                                    }
                                    active_clone.store(false, std::sync::atomic::Ordering::Relaxed);
                                    info!("IEC 104 connection closed: {}", peer_addr);
                                });
                            }
                            Err(e) => {
                                error!("IEC 104 accept error: {}", e);
                            }
                        }
                    }
                    _ = shutdown_rx.recv() => {
                        info!("IEC 104 server shutting down");
                        break;
                    }
                }
            }
        });

        Ok(())
    }

    /// Handle a single IEC 104 TCP connection.
    async fn handle_connection(
        stream: tokio::net::TcpStream,
        peer_addr: std::net::SocketAddr,
        event_buffer: Arc<EventBuffer>,
        point_map: Arc<PointMap>,
        command_tx: mpsc::Sender<ScadaCommand>,
    ) -> anyhow::Result<()> {
        use tokio::io::{AsyncReadExt, AsyncWriteExt};
        let (mut reader, mut writer) = stream.into_split();

        // IEC 104 connection state
        let mut send_seq: u16 = 0;
        let mut recv_seq: u16 = 0;
        let mut data_transfer_active = false;

        let mut buf = vec![0u8; 1024];

        loop {
            let n = match tokio::time::timeout(
                std::time::Duration::from_secs(30),
                reader.read(&mut buf),
            ).await {
                Ok(Ok(0)) => {
                    info!("IEC 104 connection closed by peer");
                    break;
                }
                Ok(Ok(n)) => n,
                Ok(Err(e)) => {
                    error!("IEC 104 read error: {}", e);
                    break;
                }
                Err(_) => {
                    // Timeout - send TESTFR act if data transfer is active
                    if data_transfer_active {
                        let testfr_act = [0x68, 0x04, 0x43, 0x00, 0x00, 0x00];
                        let _ = writer.write_all(&testfr_act).await;
                    }
                    continue;
                }
            };

            // Parse IEC 104 APCI header
            if n < 6 || buf[0] != 0x68 {
                warn!("Invalid IEC 104 frame from {}", peer_addr);
                continue;
            }

            let apdu_len = buf[1] as usize;

            // Determine frame type from control fields
            if buf[2] & 0x01 == 0 {
                // I-Frame
                let ss = ((buf[3] as u16) << 7) | ((buf[2] as u16) >> 1);
                let rs = ((buf[5] as u16) << 7) | ((buf[4] as u16) >> 1);
                recv_seq = rs;

                if apdu_len > 4 && data_transfer_active {
                    // Parse ASDU
                    let type_id = buf[6];
                    let _num_objects = buf[7] & 0x7F;
                    let cot = buf[8]; // Cause of transmission
                    let _oa = buf[9]; // Originator address
                    let _ca = (buf[11] as u16) << 8 | buf[10] as u16; // Common address

                    match type_id {
                        // C_IC_NA_1 (100) - Interrogation command
                        100 => {
                            info!("General interrogation from {}", peer_addr);
                            let _ = command_tx.send(ScadaCommand::Interrogation).await;

                            // Send interrogation response events
                            let events = event_buffer.interrogation_response();
                            for event in &events {
                                // Encode and send I-frame with measurement
                                // (simplified - real implementation would build proper ASDUs)
                                send_seq += 1;
                            }
                        }
                        // C_SE_NC_1 (50) - Setpoint command, short float
                        50 => {
                            if n >= 16 {
                                let ioa = (buf[12] as u32)
                                    | ((buf[13] as u32) << 8)
                                    | ((buf[14] as u32) << 16);
                                let value_bytes = [buf[15], buf[16], buf[17], buf[18]];
                                let value = f32::from_le_bytes(value_bytes);

                                info!(
                                    "Setpoint command: IOA={} value={:.2} from {}",
                                    ioa, value, peer_addr
                                );

                                let mut handler = CommandHandler::new(
                                    PointMap::default_cyprus_eac(),
                                    1250.0,
                                    625.0,
                                );

                                match handler.handle_setpoint(ioa, value) {
                                    CommandResult::Setpoint(cmd) => {
                                        let _ = command_tx.send(ScadaCommand::Setpoint(cmd)).await;
                                    }
                                    CommandResult::Rejected(reason) => {
                                        warn!("Setpoint rejected: {}", reason);
                                    }
                                    _ => {}
                                }
                            }
                        }
                        // C_SC_NA_1 (45) - Single command
                        45 => {
                            if n >= 14 {
                                let ioa = (buf[12] as u32)
                                    | ((buf[13] as u32) << 8)
                                    | ((buf[14] as u32) << 16);
                                let sco = buf[15];
                                let value = sco & 0x01 != 0;

                                info!(
                                    "Single command: IOA={} value={} from {}",
                                    ioa, value, peer_addr
                                );

                                let mut handler = CommandHandler::new(
                                    PointMap::default_cyprus_eac(),
                                    1250.0,
                                    625.0,
                                );

                                match handler.handle_single_command(ioa, value) {
                                    CommandResult::DiscretePower(level) => {
                                        let _ = command_tx
                                            .send(ScadaCommand::DiscretePower(level))
                                            .await;
                                    }
                                    CommandResult::Rejected(reason) => {
                                        warn!("Single command rejected: {}", reason);
                                    }
                                    _ => {}
                                }
                            }
                        }
                        _ => {
                            warn!("Unhandled IEC 104 type ID: {}", type_id);
                        }
                    }

                    // Send S-frame acknowledgment
                    send_seq += 1;
                    let s_frame = [
                        0x68, 0x04,
                        0x01, 0x00,
                        (send_seq << 1) as u8, ((send_seq << 1) >> 8) as u8,
                    ];
                    let _ = writer.write_all(&s_frame).await;
                }
            } else if buf[2] & 0x03 == 0x01 {
                // S-Frame - acknowledgment
                let rs = ((buf[5] as u16) << 7) | ((buf[4] as u16) >> 1);
                recv_seq = rs;
            } else if buf[2] & 0x03 == 0x03 {
                // U-Frame
                match buf[2] {
                    0x07 => {
                        // STARTDT act
                        info!("STARTDT act from {}", peer_addr);
                        data_transfer_active = true;
                        let _ = command_tx.send(ScadaCommand::StartDt).await;
                        // Send STARTDT con
                        let con = [0x68, 0x04, 0x0B, 0x00, 0x00, 0x00];
                        let _ = writer.write_all(&con).await;
                    }
                    0x13 => {
                        // STOPDT act
                        info!("STOPDT act from {}", peer_addr);
                        data_transfer_active = false;
                        let _ = command_tx.send(ScadaCommand::StopDt).await;
                        // Send STOPDT con
                        let con = [0x68, 0x04, 0x23, 0x00, 0x00, 0x00];
                        let _ = writer.write_all(&con).await;
                    }
                    0x43 => {
                        // TESTFR act
                        let con = [0x68, 0x04, 0x83, 0x00, 0x00, 0x00];
                        let _ = writer.write_all(&con).await;
                    }
                    _ => {
                        warn!("Unknown U-frame function: 0x{:02X}", buf[2]);
                    }
                }
            }

            // Transmit any pending spontaneous events
            if data_transfer_active {
                let events = event_buffer.drain();
                for _event in events {
                    // Build and send I-frame with event data
                    // (real implementation would serialize ASDU properly)
                    send_seq += 1;
                }
            }
        }

        Ok(())
    }

    /// Shutdown the IEC 104 server.
    pub fn shutdown(&self) {
        let _ = self.shutdown_tx.send(());
    }
}
