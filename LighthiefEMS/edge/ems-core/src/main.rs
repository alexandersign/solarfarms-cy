//! GridMind Edge Core
//!
//! Main entry point for the edge EMS application. Initializes all
//! subsystems and runs the main control loop:
//!
//! 1. Load configuration
//! 2. Initialize drivers (PCS, BMS)
//! 3. Start SCADA gateway (IEC 104 server)
//! 4. Start edge agent (NATS cloud bridge)
//! 5. Run control loop (state machine + protection + setpoint dispatch)

mod config;
mod control_loop;
mod protection;
mod state_machine;
mod telemetry;

use anyhow::Result;
use chrono::Utc;
use gridmind_common::*;
use gridmind_generic_driver::{BmsDriver, PcsDriver};
use gridmind_modbus_driver::DriverRegistry;
use gridmind_scada_gateway::*;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::mpsc;
use tracing::{error, info, warn};
use uuid::Uuid;

use crate::control_loop::ControlLoop;
use crate::protection::ProtectionEngine;
use crate::state_machine::StateMachine;
use crate::telemetry::TelemetryCollector;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize logging
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::from_default_env()
                .add_directive("gridmind=info".parse()?)
                .add_directive("info".parse()?),
        )
        .with_target(true)
        .with_thread_ids(true)
        .json()
        .init();

    info!("╔══════════════════════════════════════════════════╗");
    info!("║        GridMind Edge Core v0.1.0            ║");
    info!("║        Energy Management System                 ║");
    info!("╚══════════════════════════════════════════════════╝");

    // ── Load Configuration ──
    let config_path = std::env::args()
        .nth(1)
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("config/site.yaml"));

    let site_config = if config_path.exists() {
        config::load_site_config(&config_path)?
    } else {
        warn!("Config file not found, using default development config");
        config::default_dev_config()
    };

    info!(
        "Site: {} ({}) | Market: {} | Power: {:.0}kW | Energy: {:.0}kWh",
        site_config.site_name,
        site_config.site_id,
        site_config.market,
        site_config.rated_power_kw,
        site_config.rated_energy_kwh
    );

    // ── Initialize Drivers ──
    let mut pcs_driver = DriverRegistry::create_pcs_driver(&site_config.pcs)?;
    let mut bms_driver = DriverRegistry::create_bms_driver(&site_config.bms)?;

    info!("PCS driver: {} {}", pcs_driver.device_info().manufacturer, pcs_driver.device_info().model);
    info!("BMS driver: {} {}", bms_driver.device_info().manufacturer, bms_driver.device_info().model);

    // ── Initialize SCADA Gateway ──
    let point_map = PointMap::default_cyprus_eac();
    let mut scada_server = Iec104Server::new(
        &site_config.scada.bind_address,
        site_config.scada.port,
        point_map,
    );

    let scada_command_rx = scada_server.take_command_rx().expect("Command RX already taken");
    let event_buffer = scada_server.event_buffer();

    scada_server.start().await?;
    info!("SCADA gateway started on port {}", site_config.scada.port);

    // ── Initialize Telemetry ──
    let (telemetry, telemetry_rx) = TelemetryCollector::new(&site_config.site_id, 10000);

    // ── Initialize Edge Agent ──
    let edge_agent = gridmind_edge_agent::EdgeAgent::new(
        &site_config.cloud.nats_url,
        &site_config.site_id,
    );

    // Start edge agent in background
    let agent_handle = tokio::spawn({
        let mut agent = edge_agent;
        async move {
            if let Err(e) = agent.run(telemetry_rx).await {
                error!("Edge agent error: {}", e);
            }
        }
    });

    // ── Initialize Control Subsystems ──
    let mut state_machine = StateMachine::new();
    let mut protection = ProtectionEngine::new(site_config.protection.clone());
    let mut control_loop = ControlLoop::new(
        site_config.control.clone(),
        site_config.protection.clone(),
        site_config.rated_power_kw,
    );

    // ── Connect to Devices ──
    info!("Connecting to field devices...");

    let pcs_connected = match pcs_driver.connect().await {
        Ok(()) => true,
        Err(e) => {
            warn!("PCS connection failed: {} (will retry)", e);
            false
        }
    };

    let bms_connected = match bms_driver.connect().await {
        Ok(()) => true,
        Err(e) => {
            warn!("BMS connection failed: {} (will retry)", e);
            false
        }
    };

    // ── Main Control Loop ──
    info!("Starting main control loop (cycle time: {}ms)", site_config.control.cycle_time_ms);

    let cycle_time = Duration::from_millis(site_config.control.cycle_time_ms);
    let mut interval = tokio::time::interval(cycle_time);
    let mut heartbeat_counter: u64 = 0;
    let mut scada_command_rx = scada_command_rx;

    // Shutdown signal
    let (shutdown_tx, mut shutdown_rx) = mpsc::channel::<()>(1);

    // Handle Ctrl+C
    let shutdown_tx_clone = shutdown_tx.clone();
    tokio::spawn(async move {
        tokio::signal::ctrl_c().await.ok();
        info!("Shutdown signal received");
        let _ = shutdown_tx_clone.send(()).await;
    });

    let mut last_command: Option<SetpointCommand> = None;
    let dt_seconds = site_config.control.cycle_time_ms as f32 / 1000.0;

    loop {
        tokio::select! {
            _ = interval.tick() => {
                heartbeat_counter += 1;

                // ── 1. Read Measurements ──
                let pcs_measurement = if pcs_driver.is_connected() {
                    match pcs_driver.read_measurements().await {
                        Ok(m) => Some(m),
                        Err(e) => {
                            warn!("PCS read error: {}", e);
                            None
                        }
                    }
                } else {
                    None
                };

                let bms_measurement = if bms_driver.is_connected() {
                    match bms_driver.read_measurements().await {
                        Ok(m) => Some(m),
                        Err(e) => {
                            warn!("BMS read error: {}", e);
                            None
                        }
                    }
                } else {
                    None
                };

                // ── 2. Evaluate Protection ──
                if let Some(ref pcs_data) = pcs_measurement {
                    let trips = protection.evaluate(pcs_data);
                    if !trips.is_empty() {
                        let reason = trips.iter()
                            .map(|t| format!("{}", t.function))
                            .collect::<Vec<_>>()
                            .join(", ");
                        state_machine.fault(&format!("Protection trip: {}", reason));
                    }
                }

                // ── 3. Evaluate State Machine ──
                if let Some(transition) = state_machine.evaluate(
                    &pcs_measurement,
                    &bms_measurement,
                    &last_command,
                ) {
                    telemetry.send_state_change(
                        transition.from,
                        transition.to,
                        transition.reason.clone(),
                    ).await;
                }

                // ── 4. Execute Control Loop ──
                let output = control_loop.execute_cycle(
                    &pcs_measurement,
                    &bms_measurement,
                    state_machine.state(),
                    dt_seconds,
                );

                // ── 5. Write Setpoints to PCS ──
                if output.changed && pcs_driver.is_connected() {
                    let cmd = SetpointCommand {
                        id: Uuid::new_v4(),
                        timestamp: Utc::now(),
                        source: CommandSource::Automatic,
                        active_power_kw: Some(output.active_power_kw),
                        reactive_power_kvar: Some(output.reactive_power_kvar),
                        mode: None,
                        start_stop: None,
                    };

                    match pcs_driver.write_setpoint(&cmd).await {
                        Ok(ack) => {
                            telemetry.send_command_executed(cmd, ack).await;
                        }
                        Err(e) => {
                            error!("Failed to write setpoint to PCS: {}", e);
                        }
                    }
                }

                // ── 6. Update SCADA Event Buffer ──
                if let Some(ref pcs_data) = pcs_measurement {
                    event_buffer.push_float(100, pcs_data.active_power_kw);
                    event_buffer.push_float(101, pcs_data.reactive_power_kvar);
                    event_buffer.push_float(102, pcs_data.frequency_hz);
                    event_buffer.push_float(503, output.active_power_kw);
                    event_buffer.push_float(504, output.reactive_power_kvar);
                }
                if let Some(ref bms_data) = bms_measurement {
                    event_buffer.push_float(200, bms_data.soc_percent);
                    event_buffer.push_float(201, bms_data.soh_percent);
                }

                // System status
                let is_ready = state_machine.state() != SystemState::Fault
                    && state_machine.state() != SystemState::EmergencyStop;
                event_buffer.push_single_point(300, is_ready);
                event_buffer.push_single_point(301, state_machine.state() == SystemState::Fault);

                // ── 7. Publish Telemetry ──
                let system_measurement = SystemMeasurement {
                    site_id: site_config.site_id.clone(),
                    timestamp: Utc::now(),
                    pcs: pcs_measurement,
                    bms: bms_measurement,
                    state: state_machine.state(),
                    control_mode: site_config.control.default_mode,
                };
                telemetry.send_measurement(system_measurement).await;

                // Heartbeat every 60 cycles
                if heartbeat_counter % 60 == 0 {
                    telemetry.send_heartbeat(state_machine.state()).await;
                }

                // Clear last command after processing
                last_command = None;
            }

            // ── Handle SCADA Commands ──
            Some(scada_cmd) = scada_command_rx.recv() => {
                match scada_cmd {
                    gridmind_scada_gateway::iec104_server::ScadaCommand::Setpoint(cmd) => {
                        info!("SCADA setpoint command received: P={:?}kW Q={:?}kVAr",
                            cmd.active_power_kw, cmd.reactive_power_kvar);
                        if let Some(p) = cmd.active_power_kw {
                            control_loop.set_target(p, control_loop.last_output().reactive_power_kvar);
                        }
                        if let Some(q) = cmd.reactive_power_kvar {
                            control_loop.set_target(control_loop.last_output().active_power_kw, q);
                        }
                        last_command = Some(cmd);
                    }
                    gridmind_scada_gateway::iec104_server::ScadaCommand::DiscretePower(level) => {
                        info!("SCADA discrete power level: {:?}", level);
                        control_loop.set_power_level(level);
                    }
                    gridmind_scada_gateway::iec104_server::ScadaCommand::StartDt => {
                        info!("SCADA data transfer started");
                    }
                    gridmind_scada_gateway::iec104_server::ScadaCommand::StopDt => {
                        info!("SCADA data transfer stopped");
                    }
                    gridmind_scada_gateway::iec104_server::ScadaCommand::Interrogation => {
                        info!("SCADA general interrogation");
                    }
                }
            }

            // ── Shutdown ──
            _ = shutdown_rx.recv() => {
                info!("Shutting down EMS...");
                break;
            }
        }
    }

    // ── Cleanup ──
    info!("Stopping PCS...");
    if pcs_driver.is_connected() {
        let _ = pcs_driver.stop().await;
        let _ = pcs_driver.disconnect().await;
    }
    if bms_driver.is_connected() {
        let _ = bms_driver.disconnect().await;
    }
    scada_server.shutdown();

    info!("GridMind shutdown complete");
    Ok(())
}
