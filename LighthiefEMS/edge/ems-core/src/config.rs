//! Site Configuration Loader
//!
//! Loads site-specific configuration from YAML files. Configuration
//! includes device connections, SCADA settings, protection parameters,
//! and control loop tuning.

use anyhow::{Context, Result};
use gridmind_common::*;
use std::path::Path;
use tracing::info;

/// Load site configuration from a YAML file.
pub fn load_site_config(path: &Path) -> Result<SiteConfig> {
    let contents = std::fs::read_to_string(path)
        .with_context(|| format!("Failed to read config file: {}", path.display()))?;

    let config: SiteConfig = serde_yaml::from_str(&contents)
        .with_context(|| format!("Failed to parse config file: {}", path.display()))?;

    info!(
        "Site configuration loaded: {} ({}) - {:.0}kW / {:.0}kWh",
        config.site_name, config.site_id, config.rated_power_kw, config.rated_energy_kwh
    );

    validate_config(&config)?;
    Ok(config)
}

/// Validate configuration values.
fn validate_config(config: &SiteConfig) -> Result<()> {
    if config.rated_power_kw <= 0.0 {
        anyhow::bail!("rated_power_kw must be positive, got {}", config.rated_power_kw);
    }
    if config.rated_energy_kwh <= 0.0 {
        anyhow::bail!("rated_energy_kwh must be positive, got {}", config.rated_energy_kwh);
    }
    if config.control.cycle_time_ms < 10 {
        anyhow::bail!(
            "cycle_time_ms too small ({}ms), minimum is 10ms",
            config.control.cycle_time_ms
        );
    }
    if config.control.soc_low_limit < 0.0 || config.control.soc_low_limit > 100.0 {
        anyhow::bail!("soc_low_limit out of range: {}", config.control.soc_low_limit);
    }
    if config.control.soc_high_limit < 0.0 || config.control.soc_high_limit > 100.0 {
        anyhow::bail!("soc_high_limit out of range: {}", config.control.soc_high_limit);
    }
    if config.control.soc_low_limit >= config.control.soc_high_limit {
        anyhow::bail!(
            "soc_low_limit ({}) must be less than soc_high_limit ({})",
            config.control.soc_low_limit,
            config.control.soc_high_limit
        );
    }

    Ok(())
}

/// Create a default development configuration.
pub fn default_dev_config() -> SiteConfig {
    SiteConfig {
        site_id: "CY-BESS-001".to_string(),
        site_name: "Cyprus BESS Pilot".to_string(),
        market: "cyprus".to_string(),
        rated_power_kw: 1250.0,
        rated_energy_kwh: 5015.0,
        pcs: DeviceConnectionConfig {
            host: "192.168.1.10".to_string(),
            port: 502,
            unit_id: 1,
            poll_interval_ms: 1000,
            timeout_ms: 3000,
            driver: "kehua_bcs1250k".to_string(),
        },
        bms: DeviceConnectionConfig {
            host: "192.168.1.20".to_string(),
            port: 502,
            unit_id: 1,
            poll_interval_ms: 1000,
            timeout_ms: 3000,
            driver: "linyang_atlantic".to_string(),
        },
        scada: ScadaServerConfig {
            bind_address: "0.0.0.0".to_string(),
            port: 2404,
            common_address: 1,
            point_map_file: "config/scada/eac_point_map.yaml".to_string(),
        },
        cloud: CloudBridgeConfig {
            nats_url: "nats://cloud.gridmind.com:4222".to_string(),
            site_id: "CY-BESS-001".to_string(),
            telemetry_interval_ms: 1000,
            tls_enabled: true,
            cert_path: Some("/etc/gridmind/certs/client.crt".to_string()),
            key_path: Some("/etc/gridmind/certs/client.key".to_string()),
        },
        protection: ProtectionSettings::default(),
        control: ControlConfig {
            min_command_interval_s: 1.0,
            cycle_time_ms: 100,
            soc_low_limit: 5.0,
            soc_high_limit: 95.0,
            max_ramp_rate_kw_per_s: 250.0,
            default_mode: ControlMode::PQ,
        },
    }
}
