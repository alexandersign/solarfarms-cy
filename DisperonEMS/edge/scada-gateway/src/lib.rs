//! GridMind SCADA Gateway
//!
//! IEC 60870-5-104 server implementation for DSO/TSO communication.
//! Handles incoming commands (P/Q setpoints, discrete power levels)
//! and reports measurements, status, and events to the grid operator.

pub mod iec104_server;
pub mod point_map;
pub mod command_handler;
pub mod event_buffer;

pub use iec104_server::Iec104Server;
pub use point_map::PointMap;
pub use command_handler::CommandHandler;
pub use event_buffer::EventBuffer;
