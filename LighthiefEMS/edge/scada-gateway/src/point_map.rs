//! SCADA Point Map
//!
//! Configurable mapping between IEC 60870-5-104 information object
//! addresses (IOA) and internal EMS data points. Loaded from YAML
//! configuration per DSO requirements.
//!
//! IEC 104 Type IDs used:
//!   M_SP_NA_1 (1)  - Single-point information (monitored)
//!   M_DP_NA_1 (3)  - Double-point information (monitored)
//!   M_ME_NC_1 (13) - Measured value, short floating point (monitored)
//!   M_ME_NB_1 (11) - Measured value, scaled value (monitored)
//!   C_SC_NA_1 (45) - Single command (control)
//!   C_SE_NC_1 (50) - Set-point command, short floating point (control)

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tracing::info;

/// IEC 104 Type IDs relevant to BESS SCADA.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum TypeId {
    /// Single-point information (monitored)
    M_SP_NA_1 = 1,
    /// Double-point information (monitored)
    M_DP_NA_1 = 3,
    /// Measured value, scaled value (monitored)
    M_ME_NB_1 = 11,
    /// Measured value, short floating point (monitored)
    M_ME_NC_1 = 13,
    /// Single command (control)
    C_SC_NA_1 = 45,
    /// Set-point command, short floating point (control)
    C_SE_NC_1 = 50,
}

/// Direction of a SCADA point.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum Direction {
    /// Monitored: data flows from EMS to DSO
    Monitor,
    /// Control: commands flow from DSO to EMS
    Control,
}

/// A single SCADA point definition.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScadaPoint {
    /// Information Object Address (IOA) in IEC 104
    pub ioa: u32,
    /// IEC 104 type ID
    pub type_id: TypeId,
    /// Direction (monitor or control)
    pub direction: Direction,
    /// Internal EMS data point name
    pub internal_name: String,
    /// Human-readable description
    pub description: String,
    /// Engineering unit (kW, kVAr, Hz, V, %, etc.)
    pub unit: Option<String>,
    /// Scale factor to apply (multiply raw value)
    pub scale_factor: f32,
    /// Offset to apply after scaling
    pub offset: f32,
    /// Deadband for spontaneous transmission (for monitored floats)
    pub deadband: Option<f32>,
}

/// Complete SCADA point map for a site.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PointMap {
    /// Common Address of ASDU (station address)
    pub common_address: u16,
    /// All defined SCADA points
    pub points: Vec<ScadaPoint>,
    /// Lookup by IOA for fast command routing
    #[serde(skip)]
    ioa_index: HashMap<u32, usize>,
    /// Lookup by internal name for fast value updates
    #[serde(skip)]
    name_index: HashMap<String, usize>,
}

impl PointMap {
    /// Create a new point map and build indices.
    pub fn new(common_address: u16, points: Vec<ScadaPoint>) -> Self {
        let mut ioa_index = HashMap::new();
        let mut name_index = HashMap::new();

        for (i, point) in points.iter().enumerate() {
            ioa_index.insert(point.ioa, i);
            name_index.insert(point.internal_name.clone(), i);
        }

        info!(
            "Point map loaded: {} points, common address {}",
            points.len(),
            common_address
        );

        Self {
            common_address,
            points,
            ioa_index,
            name_index,
        }
    }

    /// Get a point by its IOA.
    pub fn get_by_ioa(&self, ioa: u32) -> Option<&ScadaPoint> {
        self.ioa_index.get(&ioa).map(|&i| &self.points[i])
    }

    /// Get a point by its internal name.
    pub fn get_by_name(&self, name: &str) -> Option<&ScadaPoint> {
        self.name_index.get(name).map(|&i| &self.points[i])
    }

    /// Get all monitored points.
    pub fn monitored_points(&self) -> impl Iterator<Item = &ScadaPoint> {
        self.points
            .iter()
            .filter(|p| p.direction == Direction::Monitor)
    }

    /// Get all control points.
    pub fn control_points(&self) -> impl Iterator<Item = &ScadaPoint> {
        self.points
            .iter()
            .filter(|p| p.direction == Direction::Control)
    }

    /// Load default Cyprus EAC point map.
    pub fn default_cyprus_eac() -> Self {
        let points = vec![
            // ── Active Power Control ──
            ScadaPoint {
                ioa: 30,
                type_id: TypeId::C_SE_NC_1,
                direction: Direction::Control,
                internal_name: "active_power_setpoint_kw".to_string(),
                description: "Active Power Setpoint (kW)".to_string(),
                unit: Some("kW".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            ScadaPoint {
                ioa: 503,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "active_power_feedback_kw".to_string(),
                description: "Active Power Setpoint Feedback (kW)".to_string(),
                unit: Some("kW".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(1.0),
            },
            ScadaPoint {
                ioa: 103,
                type_id: TypeId::M_SP_NA_1,
                direction: Direction::Monitor,
                internal_name: "active_power_cmd_status".to_string(),
                description: "Active Power Command Accepted/Rejected".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            // ── Reactive Power Control ──
            ScadaPoint {
                ioa: 31,
                type_id: TypeId::C_SE_NC_1,
                direction: Direction::Control,
                internal_name: "reactive_power_setpoint_kvar".to_string(),
                description: "Reactive Power Setpoint (kVAr)".to_string(),
                unit: Some("kVAr".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            ScadaPoint {
                ioa: 504,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "reactive_power_feedback_kvar".to_string(),
                description: "Reactive Power Setpoint Feedback (kVAr)".to_string(),
                unit: Some("kVAr".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(1.0),
            },
            ScadaPoint {
                ioa: 104,
                type_id: TypeId::M_SP_NA_1,
                direction: Direction::Monitor,
                internal_name: "reactive_power_cmd_status".to_string(),
                description: "Reactive Power Command Accepted/Rejected".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            // ── System Measurements ──
            ScadaPoint {
                ioa: 100,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "active_power_actual_kw".to_string(),
                description: "Active Power Actual (kW)".to_string(),
                unit: Some("kW".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(5.0),
            },
            ScadaPoint {
                ioa: 101,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "reactive_power_actual_kvar".to_string(),
                description: "Reactive Power Actual (kVAr)".to_string(),
                unit: Some("kVAr".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(5.0),
            },
            ScadaPoint {
                ioa: 102,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "frequency_hz".to_string(),
                description: "Grid Frequency (Hz)".to_string(),
                unit: Some("Hz".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(0.01),
            },
            ScadaPoint {
                ioa: 200,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "soc_percent".to_string(),
                description: "State of Charge (%)".to_string(),
                unit: Some("%".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(0.5),
            },
            ScadaPoint {
                ioa: 201,
                type_id: TypeId::M_ME_NC_1,
                direction: Direction::Monitor,
                internal_name: "soh_percent".to_string(),
                description: "State of Health (%)".to_string(),
                unit: Some("%".to_string()),
                scale_factor: 1.0,
                offset: 0.0,
                deadband: Some(0.1),
            },
            // ── System Status ──
            ScadaPoint {
                ioa: 300,
                type_id: TypeId::M_SP_NA_1,
                direction: Direction::Monitor,
                internal_name: "system_ready".to_string(),
                description: "System Ready Status".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            ScadaPoint {
                ioa: 301,
                type_id: TypeId::M_SP_NA_1,
                direction: Direction::Monitor,
                internal_name: "system_fault".to_string(),
                description: "System Fault Active".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            // ── Discrete Power Commands ──
            ScadaPoint {
                ioa: 50,
                type_id: TypeId::C_SC_NA_1,
                direction: Direction::Control,
                internal_name: "power_level_1".to_string(),
                description: "Power Level 1 - 100% capacity".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            ScadaPoint {
                ioa: 51,
                type_id: TypeId::C_SC_NA_1,
                direction: Direction::Control,
                internal_name: "power_level_2".to_string(),
                description: "Power Level 2 - 60% capacity".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            ScadaPoint {
                ioa: 52,
                type_id: TypeId::C_SC_NA_1,
                direction: Direction::Control,
                internal_name: "power_level_3".to_string(),
                description: "Power Level 3 - 30% capacity".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
            ScadaPoint {
                ioa: 53,
                type_id: TypeId::C_SC_NA_1,
                direction: Direction::Control,
                internal_name: "power_level_4".to_string(),
                description: "Power Level 4 - 0% (Zero Export)".to_string(),
                unit: None,
                scale_factor: 1.0,
                offset: 0.0,
                deadband: None,
            },
        ];

        Self::new(1, points)
    }
}
