# GridMind - System Architecture & Feature Specification

> **For**: Development Team
> **Version**: 1.0
> **Date**: 10 February 2026
> **Status**: Active Development
> **Project**: GridMind EMS + SCADA + Trading + Smart Maintenance

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Repository Structure](#3-repository-structure)
4. [System Architecture](#4-system-architecture)
5. [Edge Layer (Rust)](#5-edge-layer-rust)
6. [Cloud Layer (Python)](#6-cloud-layer-python)
7. [Web Dashboard (TypeScript/React)](#7-web-dashboard-typescriptreact)
8. [Data Models & Database Schema](#8-data-models--database-schema)
9. [API Reference](#9-api-reference)
10. [Smart Maintenance System](#10-smart-maintenance-system)
11. [Market Trading (MMS Integration)](#11-market-trading-mms-integration)
12. [BSM Analytics](#12-bsm-analytics)
13. [Optimization Engine](#13-optimization-engine)
14. [Communication & Messaging](#14-communication--messaging)
15. [Security & Authentication](#15-security--authentication)
16. [Configuration](#16-configuration)
17. [Development Environment Setup](#17-development-environment-setup)
18. [Feature Status & Roadmap](#18-feature-status--roadmap)
19. [Coding Standards](#19-coding-standards)

---

## 1. PROJECT OVERVIEW

### 1.1 What Is GridMind?

GridMind is a proprietary Energy Management System (EMS) and SCADA platform for Battery Energy Storage Systems (BESS). It manages the full lifecycle of grid-connected battery assets:

- **Real-time control** of power converters and battery management systems
- **SCADA integration** with the Cyprus DSO (EAC) via IEC 60870-5-104
- **Energy trading** on the Cyprus electricity market (DAM, Balancing, Reserves)
- **Smart maintenance** with automated alarm escalation, engineer dispatch, and SLA tracking
- **Battery health management** with advanced SOC/SOH estimation and degradation prediction

### 1.2 Target Deployment

| Parameter | Value |
|-----------|-------|
| **Market** | Cyprus (EAC/TSOC) |
| **Grid Standard** | EN 50549-2 |
| **First Site** | CY-BESS-001 |
| **PCS** | Kehua BCS1250K (1.25 MW) |
| **Battery** | Linyang Power Atlantic (5.02 MWh, LFP EVE LF314 cells) |
| **Config** | 12P416S (12 parallel, 416 series) |
| **Grid Connection** | 11 kV via 10 MVA transformer |
| **BESS Category** | Category C (Standalone, Grid-charged) |

### 1.3 Development Phases

| Phase | Scope | Timeline | Status |
|-------|-------|----------|--------|
| **Phase 1** | EMS/SCADA Core | 2026 | **In Progress** |
| **Phase 2** | BSM + Smart Maintenance | 2026-2027 | Code scaffolded |
| **Phase 3** | Market Integration (MMS) | 2027+ | Specs documented |

---

## 2. TECHNOLOGY STACK

### 2.1 Languages

| Layer | Language | Why |
|-------|----------|-----|
| **Edge (real-time)** | Rust | Deterministic latency, memory safety, no GC pauses. 100ms control loop. |
| **Cloud (services)** | Python 3.12+ | FastAPI ecosystem, ML libraries (sklearn, torch), data processing (pandas). |
| **Web (dashboard)** | TypeScript + React | Next.js 14, Tailwind CSS. Modern UI with SSR. |

### 2.2 Infrastructure

| Service | Technology | Port | Purpose |
|---------|-----------|------|---------|
| **PostgreSQL 16** | Relational DB | 5432 | Sites, devices, users, alarms, trades, work orders |
| **TimescaleDB** | Time-series DB | 5433 | Telemetry, measurements, high-frequency data |
| **Redis 7** | Cache/PubSub | 6379 | Session cache, real-time data, rate limiting |
| **NATS JetStream** | Messaging | 4222 | Edge-to-cloud telemetry, commands, events |
| **Keycloak** | Auth (OIDC) | 8080 | User authentication, RBAC, SSO |
| **Grafana** | Monitoring | 3001 | Operational dashboards, time-series visualization |

### 2.3 Key Libraries

**Edge (Rust)**:
- `tokio` - Async runtime
- `tokio-modbus` - Modbus TCP client for PCS/BMS
- `async-nats` - NATS messaging
- `rusqlite` - SQLite for store-and-forward buffer
- `serde` / `serde_json` / `serde_yaml` - Serialization

**Cloud (Python)**:
- `fastapi` + `uvicorn` - HTTP API
- `sqlalchemy` (async) - ORM
- `pydantic` - Schema validation
- `structlog` - Structured logging
- `numpy` / `pandas` / `scikit-learn` - Analytics + ML
- `lxml` / `zeep` - SOAP/XML for MMS (Phase 3)

**Web (TypeScript)**:
- `next` 14 - React framework
- `tailwindcss` - Utility CSS
- `recharts` (planned) - Charts
- `leaflet` (planned) - Map for engineer tracking

---

## 3. REPOSITORY STRUCTURE

```
LighthiefEMS/
│
├── edge/                          # EDGE LAYER (Rust) ────────────────
│   ├── Cargo.toml                 # Workspace root
│   ├── ems-core/src/              # Main EMS application
│   │   ├── main.rs                # Entry point, control loop orchestration
│   │   ├── control_loop.rs        # PQ dispatch, LFSM-O, Q(U), ramp rate
│   │   ├── state_machine.rs       # INIT→STANDBY→CHARGING/DISCHARGING→FAULT
│   │   ├── protection.rs          # Grid protection (EN 50549-2)
│   │   ├── config.rs              # YAML config loader
│   │   └── telemetry.rs           # Cloud telemetry publisher
│   ├── scada-gateway/src/         # IEC 60870-5-104 server
│   │   ├── iec104_server.rs       # TCP server, APCI frame handling
│   │   ├── command_handler.rs     # DSO command processing
│   │   ├── event_buffer.rs        # Spontaneous event queue
│   │   └── point_map.rs           # IOA ↔ internal data mapping
│   ├── edge-agent/src/            # Cloud communication bridge
│   │   ├── lib.rs                 # Main agent coordinator
│   │   ├── nats_bridge.rs         # NATS JetStream publisher
│   │   └── store_forward.rs       # SQLite buffer for offline mode
│   ├── drivers/
│   │   ├── modbus-driver/src/     # Modbus TCP driver
│   │   │   ├── pcs_driver.rs      # Kehua PCS registers
│   │   │   ├── bms_driver.rs      # Linyang BMS registers
│   │   │   └── registry.rs        # Driver registry
│   │   ├── iec61850-driver/       # IEC 61850 (future, for advanced PCS)
│   │   └── generic-driver/        # Abstraction layer
│   └── common/src/                # Shared types and protobuf
│       ├── lib.rs
│       └── models.rs
│
├── cloud/                         # CLOUD LAYER (Python) ─────────────
│   ├── api/                       # FastAPI Application
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── app/
│   │       ├── main.py            # App entry, router registration
│   │       ├── config.py          # Settings (env vars)
│   │       ├── models/
│   │       │   ├── database.py    # SQLAlchemy ORM (ALL tables)
│   │       │   └── schemas.py     # Pydantic request/response models
│   │       ├── routers/
│   │       │   ├── sites.py       # Site CRUD
│   │       │   ├── telemetry.py   # Time-series data queries
│   │       │   ├── commands.py    # Power setpoint commands
│   │       │   ├── alarms.py      # Alarm management + auto-escalation
│   │       │   ├── trading.py     # Trade CRUD
│   │       │   ├── reports.py     # Data export (CSV/JSON/Excel)
│   │       │   └── maintenance.py # Engineer dispatch, work orders, SLA
│   │       ├── services/
│   │       │   ├── db_service.py  # PostgreSQL + TimescaleDB
│   │       │   ├── nats_service.py # NATS pub/sub
│   │       │   └── redis_service.py # Redis cache
│   │       └── middleware/
│   │           └── audit.py       # NIS2 audit logging
│   │
│   ├── bsm/analytics/            # Battery Storage Management
│   │   ├── soc_estimator.py       # Extended Kalman Filter SOC (±2%)
│   │   ├── soh_predictor.py       # Degradation curves (Linyang data)
│   │   ├── thermal.py             # Predictive cooling control
│   │   ├── balancing.py           # Cell voltage balancing optimizer
│   │   └── warranty.py            # Warranty condition tracker
│   │
│   ├── ems-optimizer/optimizer/   # Scheduling & Arbitrage
│   │   ├── scheduler.py           # Multi-period dispatch scheduler
│   │   └── arbitrage.py           # Price spread arbitrage finder
│   │
│   ├── forecasting/               # Price & Weather Forecasting
│   │   ├── data/
│   │   │   ├── entso_e.py         # ENTSO-E Transparency Platform client
│   │   │   └── weather.py         # Open-Meteo weather API client
│   │   └── models/
│   │       └── price_forecast.py  # Gradient Boosting price predictor
│   │
│   ├── trading/                   # Trading Engine
│   │   ├── engine/
│   │   │   ├── core.py            # Order/Position management, P&L
│   │   │   └── risk.py            # Pre-trade risk checks, kill switch
│   │   ├── markets/
│   │   │   ├── base.py            # Abstract MarketConnector
│   │   │   ├── balancing.py       # TSO balancing market (FCR/aFRR/mFRR)
│   │   │   ├── epex.py            # EPEX SPOT (simulated)
│   │   │   ├── henex.py           # HEnEx Greece (simulated)
│   │   │   └── otc.py             # OTC/bilateral trades
│   │   └── compliance/
│   │       └── remit.py           # REMIT reporting
│   │
│   └── vpp/aggregator/           # Virtual Power Plant
│       ├── portfolio.py           # Multi-site fleet management
│       ├── dispatch.py            # Fleet-level dispatch optimization
│       └── flexibility.py         # Available flexibility calculation
│
├── web/                           # WEB DASHBOARD (Next.js) ──────────
│   ├── Dockerfile
│   ├── package.json
│   └── src/app/
│       ├── layout.tsx             # Root layout with sidebar navigation
│       ├── page.tsx               # Redirect to /dashboard
│       ├── dashboard/page.tsx     # Fleet overview, KPIs, site cards
│       ├── scada/page.tsx         # Single-line diagram, live values, controls
│       ├── trading/page.tsx       # Trading desk (overview, orders, positions)
│       ├── analytics/page.tsx     # Historical data, KPIs, charts
│       ├── assets/page.tsx        # Site and device management
│       ├── alarms/page.tsx        # Alarm console with severity filtering
│       ├── maintenance/page.tsx   # Engineer tracker, work orders, escalations
│       ├── settings/page.tsx      # System configuration
│       └── admin/page.tsx         # User management, RBAC, audit log
│
├── config/                        # CONFIGURATION ─────────────────────
│   ├── markets/
│   │   ├── cyprus.yaml            # Cyprus market params + MMS + maintenance
│   │   ├── germany.yaml
│   │   ├── greece.yaml
│   │   └── template.yaml          # Template for new markets
│   ├── devices/
│   │   ├── kehua_bcs1250k.yaml    # PCS Modbus register map
│   │   └── linyang_atlantic.yaml  # BMS Modbus register map
│   └── scada/
│       └── eac_point_map.yaml     # IEC 104 IOA mapping for Cyprus EAC
│
├── docs/                          # DOCUMENTATION ─────────────────────
│   ├── DEVELOPER-GUIDE.md         # THIS DOCUMENT
│   ├── architecture/
│   │   └── ems-trading-maintenance-architecture.md
│   ├── market-guides/
│   │   └── cyprus-mms-interfaces.md  # Full MMS interface spec
│   └── protocols/
│       └── cyprus-mms-protocol.md    # SOAP/CIM XML implementation guide
│
├── tests/                         # TEST SUITES (to be implemented)
├── tools/                         # DEVELOPMENT TOOLS
│   ├── iec104-simulator/          # Simulated DSO SCADA master
│   ├── modbus-simulator/          # Simulated PCS/BMS devices
│   └── market-simulator/          # Simulated market data feed
│
└── docker-compose.yml             # Local dev stack
```

---

## 4. SYSTEM ARCHITECTURE

### 4.1 High-Level Architecture

```
                    ┌─────────────────────┐
                    │   EXTERNAL SYSTEMS   │
                    │                     │
                    │  DSO SCADA (IEC104) │
                    │  TSOC MMS (SOAP)    │
                    │  Weather APIs       │
                    │  ENTSO-E Platform   │
                    │  Engineer Mobile    │
                    │  Twilio (SMS/Call)  │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              │         CLOUD PLATFORM        │
              │                               │
              │  ┌───────────────────────┐    │
              │  │    FastAPI (8000)      │    │
              │  │  /api/v1/sites        │    │
              │  │  /api/v1/telemetry    │    │
              │  │  /api/v1/commands     │    │
              │  │  /api/v1/alarms      │    │
              │  │  /api/v1/trading     │    │
              │  │  /api/v1/reports     │    │
              │  │  /api/v1/maintenance │    │
              │  └───────────┬───────────┘    │
              │              │                │
              │  ┌───────────┼───────────┐    │
              │  │  PostgreSQL │ Timescale│    │
              │  │  Redis     │ NATS     │    │
              │  │  Keycloak  │ Grafana  │    │
              │  └───────────┬───────────┘    │
              └──────────────┼────────────────┘
                             │  NATS JetStream
              ┌──────────────┼────────────────┐
              │         EDGE (Per Site)        │
              │                               │
              │  Edge Agent ←→ NATS Bridge    │
              │       ↕                       │
              │  EMS Core (100ms loop)        │
              │       ↕          ↕            │
              │  SCADA Gateway   BSM Analytics│
              │  (IEC 104)                    │
              │       ↕                       │
              │  PCS + BMS (Modbus TCP)       │
              └───────────────────────────────┘
```

### 4.2 Data Flow

```
PCS/BMS  ──(Modbus TCP, 100ms)──→  EMS Core
EMS Core ──(NATS, 1s)──────────→  Cloud API
Cloud API ──(WebSocket)─────────→  Web Dashboard
Cloud API ──(SOAP/CIM XML)──────→  TSOC MMS (Phase 3)
Cloud API ──(Push/SMS/Call)─────→  Engineers (Maintenance)
DSO      ──(IEC 104)────────────→  SCADA Gateway → EMS Core
```

### 4.3 Control Loop Timing

| Loop | Cycle Time | Purpose |
|------|-----------|---------|
| EMS Control Loop | 100 ms | PQ dispatch, protection, LFSM-O, Q(U) |
| SCADA Event Check | 100 ms | Process incoming DSO commands |
| Telemetry to Cloud | 1 sec | Measurements, state changes |
| BSM Analytics | 1 sec | SOC/SOH estimation, thermal |
| Optimization Engine | 5 min | Schedule recalculation |
| MMS Dispatch Check | 5 min | Process dispatch instructions (Phase 3) |
| Market Offer Cycle | Per gate closure | DAM/BEO/RCO submissions (Phase 3) |

---

## 5. EDGE LAYER (Rust)

### 5.1 EMS Core (`edge/ems-core/`)

The main real-time application. Runs a 100ms control loop.

**Main Loop (main.rs)**:
```
loop every 100ms:
    1. Read PCS measurements (Modbus TCP)
    2. Read BMS measurements (Modbus TCP)
    3. Evaluate protection conditions (protection.rs)
    4. Evaluate state machine transitions (state_machine.rs)
    5. Execute control logic (control_loop.rs)
       - LFSM-O overfrequency response
       - Q(U) reactive power curve
       - SOC limits
       - Ramp rate limiting
    6. Write setpoints to PCS (Modbus TCP)
    7. Update SCADA event buffer
    8. Publish telemetry to cloud (NATS)
```

**State Machine (`state_machine.rs`)**:
```
INIT ──→ STANDBY ←──→ CHARGING
              ↑           ↓
              └─── IDLE ←─┘
              ↑           ↓
              └── DISCHARGING
              ↑
          FAULT ←── (any state on protection trip)
```

**Protection (`protection.rs`)** - EN 50549-2 compliant:

| Protection | Threshold | Trip Time |
|-----------|-----------|-----------|
| Undervoltage Stage 1 | 0.9 pu | 0.2 s |
| Overvoltage Stage 1 | 1.1 pu | 0.2 s |
| Underfrequency Stage 1 | 47 Hz | 0.2 s |
| Overfrequency Stage 1 | 52 Hz | 0.2 s |
| LFSM-O | 50.2 Hz activation | Continuous |

**Control Features (`control_loop.rs`)**:

| Feature | Description |
|---------|-------------|
| PQ Dispatch | Active/reactive power setpoint execution |
| LFSM-O | Over-frequency power reduction (1% P per 0.01 Hz above 50.2 Hz) |
| Q(U) Curve | Voltage-reactive power curve with deadband (0.97-1.03 pu) |
| SOC Limits | Low (5%) and high (95%) power cutoff |
| Ramp Rate | Max 250 kW/s rate limiting |
| Discrete Levels | DSO power curtailment: 100%, 60%, 30%, 0% |

### 5.2 SCADA Gateway (`edge/scada-gateway/`)

IEC 60870-5-104 server (slave/controlled station) for DSO integration.

**Capabilities**:
- TCP server on port 2404
- General interrogation (full station scan)
- Spontaneous transmission with deadband filtering
- Setpoint commands: active power (IOA 30), reactive power (IOA 31)
- Single commands: discrete power levels (IOA 50-53)
- Event buffer with max 10,000 entries
- Point map loaded from YAML (`config/scada/eac_point_map.yaml`)

**Point Map (Monitor direction: EMS → DSO)**:

| IOA | Name | Type | Description |
|-----|------|------|-------------|
| 1 | active_power_kw | MeasuredFloat | Active power |
| 2 | reactive_power_kvar | MeasuredFloat | Reactive power |
| 3 | voltage_v | MeasuredFloat | AC voltage |
| 4 | current_a | MeasuredFloat | AC current |
| 5 | frequency_hz | MeasuredFloat | Grid frequency |
| 6 | soc_percent | MeasuredFloat | State of Charge |
| 7 | soh_percent | MeasuredFloat | State of Health |
| 10 | system_state | SinglePoint | Operating state |
| 11 | protection_active | SinglePoint | Protection trip active |

**Point Map (Control direction: DSO → EMS)**:

| IOA | Name | Type | Description |
|-----|------|------|-------------|
| 30 | active_power_setpoint | Setpoint | kW setpoint from DSO |
| 31 | reactive_power_setpoint | Setpoint | kVAr setpoint from DSO |
| 50-53 | discrete_level_1-4 | Command | Power curtailment levels |

### 5.3 Edge Agent (`edge/edge-agent/`)

Manages cloud connectivity with resilient store-and-forward.

| Feature | Implementation |
|---------|---------------|
| Cloud messaging | NATS JetStream to `gridmind.{site_id}.telemetry` |
| Offline buffer | SQLite `telemetry_buffer` table |
| Reconnection | Retry every 10 seconds |
| Buffer drain | Oldest-first flush on reconnection |
| Message format | JSON-serialized telemetry envelopes |

### 5.4 Modbus Drivers (`edge/drivers/modbus-driver/`)

| Driver | Target | Registers |
|--------|--------|-----------|
| `pcs_driver.rs` | Kehua BCS1250K | Power setpoints, status, measurements |
| `bms_driver.rs` | Linyang BMS | Cell voltages, temperatures, SOC, alarms |
| `registry.rs` | Driver factory | Dynamic driver loading from config |

---

## 6. CLOUD LAYER (Python)

### 6.1 FastAPI Application (`cloud/api/`)

**Entry point**: `app/main.py`

The API application initializes in this order:
1. Connect PostgreSQL + TimescaleDB
2. Connect Redis
3. Connect NATS
4. Subscribe to telemetry NATS subjects
5. Register all API routers

**Registered Routers**:

| Prefix | Router | Description |
|--------|--------|-------------|
| `/api/v1/sites` | `sites.py` | Site CRUD, device management |
| `/api/v1/telemetry` | `telemetry.py` | Time-series queries with resolution |
| `/api/v1/commands` | `commands.py` | Send power setpoints to edge |
| `/api/v1/alarms` | `alarms.py` | Alarm management + auto-escalation ingest |
| `/api/v1/trading` | `trading.py` | Trade CRUD, portfolio summary |
| `/api/v1/reports` | `reports.py` | Data export (CSV/JSON/Excel) |
| `/api/v1/maintenance` | `maintenance.py` | Engineers, work orders, escalation, scheduling |

**Middleware**:
- CORS (configurable origins)
- Audit logging (NIS2 compliance)

### 6.2 Services

| Service | File | Purpose |
|---------|------|---------|
| `db_service.py` | Database | Async SQLAlchemy session management for both PostgreSQL and TimescaleDB |
| `nats_service.py` | Messaging | NATS JetStream connection, telemetry subscription, command publishing |
| `redis_service.py` | Cache | Connection management, session storage, real-time data cache |

### 6.3 Trading Engine (`cloud/trading/`)

**Core (`engine/core.py`)**:
- `Order` and `Position` dataclasses
- Order lifecycle: PENDING → SUBMITTED → FILLED / CANCELLED / REJECTED
- P&L calculation per position
- Market types: DAY_AHEAD, INTRADAY, BALANCING, RESERVE, OTC

**Risk Management (`engine/risk.py`)**:
- Pre-trade checks: position limits, order size, price reasonableness
- Post-trade checks: daily volume, daily loss limit
- Kill switch: halts all trading on breach
- Configurable `RiskLimits` dataclass

**Market Connectors (`markets/`)**:
- Abstract base: `MarketConnector` with standard interface
- `balancing.py`: FCR/aFRR/mFRR with SOC management
- `epex.py`: EPEX SPOT simulated connector
- `henex.py`: HEnEx simulated connector
- `otc.py`: Bilateral/OTC trade management

> **CRITICAL NOTE**: The existing market connectors use REST/JSON. The Cyprus MMS requires SOAP/CIM XML. A new `cloud/trading/mms/` module must be built for Phase 3. See Section 11.

### 6.4 BSM Analytics (`cloud/bsm/analytics/`)

| Module | Algorithm | Accuracy |
|--------|-----------|----------|
| `soc_estimator.py` | Extended Kalman Filter + Coulomb counting fusion | Target ±2% (vs BMS ±5%) |
| `soh_predictor.py` | Empirical degradation curves (Linyang data) | Profiles for 0.25P/0.5P, 1-2 CPD |
| `thermal.py` | PID cooling control + predictive pre-cooling | Optimal range 20-35°C |
| `balancing.py` | Cell voltage spread optimizer | Target <50mV spread |
| `warranty.py` | Condition tracker (Linyang terms) | Cell voltage, temperature, SOC limits |

### 6.5 Forecasting (`cloud/forecasting/`)

| Module | Data Source | Method |
|--------|------------|--------|
| `data/entso_e.py` | ENTSO-E Transparency Platform | Historical prices, generation, load |
| `data/weather.py` | Open-Meteo API | GHI, DNI, wind, temperature, cloud cover |
| `models/price_forecast.py` | Historical features | Gradient Boosting (sklearn), time-series CV |

### 6.6 Optimizer (`cloud/ems-optimizer/`)

| Module | Purpose |
|--------|---------|
| `scheduler.py` | Multi-period dispatch schedule, time-of-use optimization |
| `arbitrage.py` | Price spread detection, non-overlapping opportunity selection |

### 6.7 VPP Aggregator (`cloud/vpp/`)

| Module | Purpose |
|--------|---------|
| `portfolio.py` | Multi-site fleet management |
| `dispatch.py` | Fleet-level dispatch across sites |
| `flexibility.py` | Available up/down flexibility calculation |

---

## 7. WEB DASHBOARD (TypeScript/React)

### 7.1 Framework

- **Next.js 14** with App Router
- **Tailwind CSS** with custom dark theme
- **Client-side rendering** for real-time pages

### 7.2 Pages

| Route | Page | Features |
|-------|------|----------|
| `/dashboard` | Fleet Overview | Site cards, fleet KPIs, SOC bars, market price placeholder |
| `/scada` | SCADA HMI | Single-line diagram, live measurements, setpoint controls, DSO levels |
| `/trading` | Trading Desk | Portfolio P&L, market overview, orders table, positions, history |
| `/analytics` | Analytics | Energy KPIs, power/SOC charts placeholder, revenue breakdown |
| `/assets` | Asset Mgmt | Site table, PCS/BMS device details |
| `/alarms` | Alarm Console | Severity summary cards, filter by state, acknowledge/clear buttons |
| `/maintenance` | **Smart Maint.** | KPI dashboard, engineer cards with GPS, work orders with SLA timeline, escalation history, schedules |
| `/settings` | Configuration | Control params, protection settings, SCADA config, cloud connection |
| `/admin` | Administration | User table, RBAC role matrix, audit log |

### 7.3 Layout

Sidebar navigation with 9 pages. Dark theme (gray-950 background). Brand color for active state.

### 7.4 Planned Integrations (Not Yet Implemented)

- [ ] WebSocket real-time data stream (API → Dashboard)
- [ ] Recharts for time-series charts (power, SOC, prices)
- [ ] Leaflet/Mapbox for engineer GPS tracking map
- [ ] API client hooks (currently using mock data)

---

## 8. DATA MODELS & DATABASE SCHEMA

### 8.1 Existing Tables

```
sites
├── id (UUID, PK)
├── site_id (String, unique, indexed) -- e.g. "CY-BESS-001"
├── name, market, status (enum)
├── latitude, longitude, address
├── rated_power_kw, rated_energy_kwh
├── dso_name, tso_name, grid_connection_voltage_kv
├── config (JSON), commissioning_date
├── created_at, updated_at
│
├── → devices (1:many)
├── → alarms (1:many)
└── → commands (1:many)

devices
├── id (UUID, PK)
├── site_id (FK → sites)
├── device_type (enum: pcs, bms, protection_relay, meter, transformer, other)
├── manufacturer, model, serial_number, firmware_version
├── rated_power_kw, rated_energy_kwh
├── connection_host, connection_port, driver
├── is_online, last_seen_at, config (JSON)

alarms
├── id (UUID, PK)
├── site_id (FK → sites)
├── severity (enum: info, warning, alarm, critical, emergency)
├── state (enum: active, acknowledged, cleared)
├── source, code, message, details
├── timestamp, acknowledged_by, acknowledged_at, cleared_at
├── INDEX: (site_id, state), (timestamp)

commands
├── id (UUID, PK)
├── site_id (FK → sites)
├── source (cloud_optimizer, operator, trading)
├── status (enum: pending, sent, accepted, rejected, executed, failed)
├── active_power_kw, reactive_power_kvar, mode, reason
├── response, created_at, sent_at, completed_at, created_by

users
├── id (UUID, PK)
├── username, email, full_name
├── role (enum: admin, operator, viewer, trader, engineer)
├── is_active, keycloak_id, created_at, last_login_at

trades
├── id (UUID, PK)
├── site_id (FK → sites, nullable)
├── market, exchange, product, direction
├── quantity_mw, price_eur_mwh
├── delivery_start, delivery_end, status
├── order_id, counterparty, pnl_eur
├── created_at, executed_at, settled_at, created_by, notes
├── INDEX: (market, delivery_start), (site_id)
```

### 8.2 New Maintenance Tables (Added Feb 2026)

```
engineers
├── id (UUID, PK)
├── name, phone, email
├── role (enum: field_engineer, senior_engineer, manager)
├── status (enum: available, on_call, busy, off_duty, on_leave)
├── current_location_lat, current_location_lon, location_updated_at
├── certifications (JSON), assigned_sites (JSON)
├── is_active, created_at
│
├── → on_call_roster (1:many)
├── → alarm_escalations (1:many)
├── → work_orders (1:many)
└── → engineer_activity_log (1:many)

on_call_roster
├── id (UUID, PK)
├── engineer_id (FK → engineers)
├── site_id (FK → sites, nullable -- null means all sites)
├── start_time, end_time
├── priority (1=primary, 2=backup, 3=tertiary)
├── is_active
├── INDEX: (start_time, end_time), (site_id)

alarm_escalations
├── id (UUID, PK)
├── alarm_id (FK → alarms)
├── severity_level (1-5)
├── escalation_step (attempt number)
├── engineer_id (FK → engineers, nullable)
├── contact_method (enum: push, sms, call, email)
├── contact_initiated_at, contact_acknowledged_at
├── acknowledgement_method (enum: app_confirm, dtmf, callback, manual)
├── response_time_seconds, sla_met (Boolean)
├── escalated_to_next (Boolean)
├── notes
├── INDEX: (alarm_id), (engineer_id)

work_orders
├── id (UUID, PK)
├── site_id (FK → sites)
├── alarm_id (FK → alarms, nullable)
├── assigned_engineer_id (FK → engineers, nullable)
├── type (enum: reactive, preventive, predictive, inspection)
├── priority (enum: low, medium, high, critical, emergency)
├── status (enum: created, assigned, acknowledged, en_route,
│          on_site, in_progress, completed, cancelled)
├── title, description
├── checklist (JSON), parts_used (JSON)
├── root_cause, resolution
├── created_at, assigned_at, acknowledged_at, en_route_at
├── arrived_at, started_at, completed_at
├── sla_deadline, sla_met (Boolean)
├── created_by
├── INDEX: (status), (site_id), (assigned_engineer_id), (sla_deadline)

engineer_activity_log
├── id (UUID, PK)
├── engineer_id (FK → engineers)
├── work_order_id (FK → work_orders, nullable)
├── activity_type (enum: status_change, location_update,
│                  call_received, call_acknowledged,
│                  arrived_site, started_work, completed_work,
│                  note_added, photo_uploaded)
├── details (JSON), latitude, longitude, timestamp
├── INDEX: (engineer_id, timestamp), (work_order_id)

maintenance_schedules
├── id (UUID, PK)
├── site_id (FK → sites)
├── type (enum: preventive, predictive, inspection)
├── title, description
├── recurrence (enum: weekly, monthly, quarterly, semi_annual, annual)
├── next_due_date, last_completed_date
├── assigned_engineer_id (FK → engineers, nullable)
├── checklist_template (JSON)
├── estimated_duration_hours, is_active
├── INDEX: (site_id), (next_due_date)
```

---

## 9. API REFERENCE

### 9.1 Sites (`/api/v1/sites`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List all sites |
| POST | `/` | Create site |
| GET | `/{site_id}` | Get site details |
| PATCH | `/{site_id}` | Update site |
| DELETE | `/{site_id}` | Delete site |
| GET | `/{site_id}/devices` | List devices for site |
| POST | `/{site_id}/devices` | Add device to site |

### 9.2 Telemetry (`/api/v1/telemetry`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/{site_id}` | Query time-series data (start, end, resolution, metrics) |

### 9.3 Commands (`/api/v1/commands`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/{site_id}` | Send command (active_power_kw, reactive_power_kvar, mode) |
| GET | `/{site_id}` | List command history |
| GET | `/{command_id}` | Get command status |

### 9.4 Alarms (`/api/v1/alarms`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/{site_id}` | List alarms (filter: state, severity, limit) |
| GET | `/{site_id}/active` | Active alarms only |
| GET | `/summary/all` | Cross-site alarm summary |
| POST | `/{alarm_id}/acknowledge` | Acknowledge alarm |
| POST | `/{alarm_id}/clear` | Clear alarm |
| **POST** | **`/{site_id}/ingest`** | **Ingest new alarm + auto-escalate** |

### 9.5 Trading (`/api/v1/trading`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/trades` | Create trade |
| GET | `/trades` | List trades (filter: market, status, site) |
| GET | `/trades/{id}` | Get trade details |
| DELETE | `/trades/{id}` | Cancel trade |
| GET | `/portfolio/summary` | Portfolio summary with P&L |

### 9.6 Reports (`/api/v1/reports`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/{site_id}/export` | Export data (format: csv, json, xlsx) |
| GET | `/{site_id}/performance` | Performance summary report |

### 9.7 Maintenance (`/api/v1/maintenance`)

| Method | Path | Description |
|--------|------|-------------|
| **Engineers** | | |
| POST | `/engineers` | Register engineer |
| GET | `/engineers` | List engineers (filter: status, active_only) |
| GET | `/engineers/{id}` | Get engineer details |
| PATCH | `/engineers/{id}` | Update engineer |
| POST | `/engineers/{id}/location` | Update GPS from mobile app |
| POST | `/engineers/{id}/activity` | Log activity event |
| GET | `/engineers/{id}/activity` | Get activity history |
| **On-Call** | | |
| POST | `/on-call` | Create on-call slot |
| GET | `/on-call/current` | Get current on-call engineers |
| **Escalation** | | |
| POST | `/escalate/{alarm_id}` | Trigger alarm escalation |
| POST | `/escalate/{id}/acknowledge` | **Engineer confirms call pickup** |
| POST | `/escalate/{id}/escalate-next` | Escalate to next engineer |
| GET | `/escalations/pending` | Pending (unacknowledged) escalations |
| **Work Orders** | | |
| POST | `/work-orders` | Create work order |
| GET | `/work-orders` | List (filter: status, priority, site, engineer) |
| GET | `/work-orders/{id}` | Get details |
| PATCH | `/work-orders/{id}` | Update status/resolution |
| **Schedules** | | |
| POST | `/schedules` | Create maintenance schedule |
| GET | `/schedules` | List schedules |
| GET | `/schedules/upcoming` | Due within N days |
| **Dashboard** | | |
| GET | `/dashboard` | **Aggregated KPIs** (SLA %, avg response, counts) |

---

## 10. SMART MAINTENANCE SYSTEM

### 10.1 Alarm Severity & Escalation Rules

| Level | Severity | SLA | Contact | Auto Work Order | Escalation Timeout |
|-------|----------|-----|---------|----------------|-------------------|
| L1 | INFO | None | Dashboard only | No | N/A |
| L2 | WARNING | 4 hours | Push notification | No | 2 hours |
| L3 | ALARM | 1 hour | Phone call | Yes | 15 min |
| L4 | CRITICAL | 15 min | Call primary+backup | Yes | 5 min |
| L5 | EMERGENCY | 5 min | Call ALL + manager + DSO | Yes | 2 min |

### 10.2 Escalation Flow

```
Alarm Ingested (POST /alarms/{site_id}/ingest)
    │
    ├── L1: Log to dashboard only
    │
    ├── L2+: Create AlarmEscalation record
    │   ├── Find on-call engineer (on_call_roster, priority ordered)
    │   ├── Initiate contact (push for L2, call for L3+)
    │   └── Start SLA countdown
    │
    ├── L3+: Auto-create WorkOrder
    │   ├── Type: reactive
    │   ├── Priority: maps from severity
    │   ├── SLA deadline: now + SLA minutes
    │   └── Assign to on-call engineer
    │
    └── L5: Notify ALL on-call engineers simultaneously
```

### 10.3 Call Verification

When an engineer is called:
1. System records `contact_initiated_at`
2. Engineer confirms via one of:
   - **App confirm**: Tap "Acknowledge" in mobile app
   - **DTMF**: Press 1 during IVR call
   - **Callback**: Call back to confirm
   - **Manual**: Operator marks as confirmed
3. System records `contact_acknowledged_at` and calculates `response_time_seconds`
4. If no response within escalation timeout → auto-escalate to next engineer

### 10.4 Work Order Lifecycle

```
CREATED → ASSIGNED → ACKNOWLEDGED → EN_ROUTE → ON_SITE → IN_PROGRESS → COMPLETED
                                                                     → CANCELLED
```

Each transition automatically timestamps the corresponding field (`acknowledged_at`, `en_route_at`, `arrived_at`, etc.). On completion, `sla_met` is calculated by comparing `completed_at` to `sla_deadline`.

### 10.5 Engineer Tracking

- Mobile app sends GPS every 30 seconds (`POST /engineers/{id}/location`)
- Auto-detect arrival when within 200m of site coordinates
- Location stale after 15 minutes without update
- All activities logged to `engineer_activity_log` with GPS

### 10.6 Preventive Maintenance Schedules

Pre-configured in `config/markets/cyprus.yaml`:

| Schedule | Recurrence | Duration | Key Checks |
|----------|-----------|----------|------------|
| Coolant Inspection | Quarterly | 4h | Level, flow rate, filter, hoses |
| BMS Health Check | Monthly | 2h | Cell voltage spread, temps, comms |
| PCS Inspection | Semi-annual | 6h | Connections, capacitors, fans, insulation |
| HV Switching Test | Annual | 8h | Breaker, relay trip, transformer, earthing |
| Site General | Monthly | 3h | HVAC, fire suppression, CCTV, UPS |

### 10.7 Predictive Maintenance Triggers

BSM analytics automatically creates work orders when:

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Cell voltage spread | > 80 mV | Schedule balancing service |
| SOH degradation rate | > 1.5x expected | Schedule preventive inspection |
| Thermal efficiency drop | > 15% | Schedule coolant system check |
| Communication failures | > 5 in 24h | Schedule network inspection |

---

## 11. MARKET TRADING (MMS INTEGRATION)

> **Phase 3** - Specifications documented, implementation pending.
> **Key Documents**: `docs/market-guides/cyprus-mms-interfaces.md`, `docs/protocols/cyprus-mms-protocol.md`

### 11.1 Protocol

The Cyprus MMS uses a completely different protocol from the existing market connectors:

| Aspect | Existing Connectors | MMS Required |
|--------|-------------------|-------------|
| Protocol | REST/JSON | **SOAP 1.1 over HTTPS** |
| Document format | JSON | **ENTSO-E CIM XML (IEC 62325-451)** |
| Authentication | API keys | **WS-Security (UsernameToken)** |
| Validation | Server-side | **XSD schema + business rules (2-level)** |

### 11.2 New Module Required: `cloud/trading/mms/`

```
cloud/trading/mms/
├── __init__.py
├── client.py              # SOAP client with WS-Security
├── xml_builder.py         # CIM XML document generator
├── xml_parser.py          # CIM XML document parser
├── xsd_validator.py       # XSD schema validation
├── gate_scheduler.py      # Gate closure management (EET)
├── ack_handler.py         # Acknowledgement processing + retry
├── documents/
│   ├── dam_offer.py       # DAM energy offers/bids (Z02)
│   ├── beo.py             # Balancing energy offers (A37)
│   ├── rco.py             # Reserve capacity offers (A32)
│   ├── nad.py             # Non-availability declarations (A28)
│   ├── ted.py             # Techno-economic declarations (Z01)
│   ├── nominations.py     # PDN/PON/FCN (A14/Z03)
│   ├── reserve_bids.py    # RR/BS/CR bids (A24)
│   └── res_forecast.py    # RES injection forecast (A69)
└── outputs/
    ├── dispatch.py        # Dispatch instructions (Z14) → PCS setpoints
    ├── market_schedule.py # Market schedules (A09)
    ├── clearing.py        # MCP, cleared volumes (A44/Z07)
    ├── reserves.py        # Reserve awards, commitment (A38/Z09)
    └── settlement.py      # Statement and notice files (Z20-Z38)
```

### 11.3 Critical Integration: Dispatch Instructions (Z14)

The most important real-time interface. Every 5 minutes, TSOC sends dispatch instructions containing:

| Business Type | Code | Unit | Purpose |
|--------------|------|------|---------|
| Dispatch MW Gross | **Z32** | MW | **Primary power setpoint** |
| Dispatch MW Net | **Z33** | MW | **Net power setpoint** |
| FCR Up/Down | Z24/Z25 | MW | FCR capacity allocation |
| aFRR Up/Down | Z26/Z27 | MW | aFRR capacity allocation |
| mFRR Up/Down | Z28/Z29 | MW | mFRR capacity allocation |
| Start-up/Shutdown | Z16/Z17 | Boolean | Unit start/stop |
| Ramp Rate | Z18 | MW | Ramp rate instruction |

**Flow**: MMS → `dispatch.py` parser → NATS command → Edge EMS Core → PCS setpoint

### 11.4 Python Libraries for MMS

| Library | Purpose |
|---------|---------|
| `lxml` | Fast XML parsing/generation |
| `zeep` | SOAP client with WS-Security |
| `xmlschema` | XSD validation |
| `python-dateutil` | Date/time handling |
| `pytz` / `zoneinfo` | EET timezone management |

---

## 12. BSM ANALYTICS

### 12.1 SOC Estimator (Extended Kalman Filter)

**File**: `cloud/bsm/analytics/soc_estimator.py`

- Fuses Coulomb counting + OCV voltage lookup + BMS reported SOC
- Battery params: EVE LF314, 314Ah, 3.2V nominal
- OCV-SOC lookup table with LFP flat voltage curve awareness
- Returns `SOCEstimate` with uncertainty and method flag

### 12.2 SOH Predictor

**File**: `cloud/bsm/analytics/soh_predictor.py`

Uses empirical degradation data from Linyang:

| Profile | 1st Year Loss | Annual Rate | Est. Life to 80% EOL |
|---------|--------------|-------------|----------------------|
| 0.25P, 1 CPD | 3.88% | 1.52% | ~18 years |
| 0.25P, 2 CPD | 4.59% | 2.37% | ~12 years |
| 0.5P, 1 CPD | 4.04% | 1.59% | ~17 years |
| 0.5P, 2 CPD | 4.72% | 2.72% | ~10 years |

Returns: current SOH, 1yr/5yr predictions, remaining useful life, degradation cost per cycle.

### 12.3 Thermal Optimization

**File**: `cloud/bsm/analytics/thermal.py`

- PID cooling control for 60kW liquid cooling system
- Temperature ranges: Optimal (20-35°C), Warning (5-40°C), Critical (-10/+50°C)
- Pre-cooling before high-power operations
- Power derating based on temperature

### 12.4 Warranty Tracker

**File**: `cloud/bsm/analytics/warranty.py`

Monitors against Linyang warranty conditions:

| Condition | Threshold | Consequence |
|-----------|-----------|-------------|
| Cell voltage ≤ 2.5V | Immediate | Warranty void risk |
| Cell voltage < 2.8V sustained | 120 hours | Warning |
| SOC = 0% operational | 2 hours | Warning |
| Cell temperature | > 55°C | Critical alarm |

---

## 13. OPTIMIZATION ENGINE

### 13.1 Revenue Maximization Loop

Runs every 5 minutes:

```
1. Get current: SOC, SOH, temperature, protection status
2. Get maintenance windows (block trading during maintenance)
3. Forecast: DAM prices, balancing prices, reserve prices
4. Run multi-objective optimization:
   - Maximize: Trading revenue
   - Minimize: Degradation cost per cycle
   - Constraints: SOC for reserves, thermal limits, warranty, maintenance
5. Output: Optimal schedule → DAM offers, BEO, RCO, SOC targets
```

### 13.2 Arbitrage Engine

**File**: `cloud/ems-optimizer/optimizer/arbitrage.py`

- Detects price spread opportunities across trading periods
- Filters by minimum spread threshold (configurable)
- SOC-aware: ensures enough capacity for charge/discharge cycle
- Returns non-overlapping opportunity set maximizing total profit

### 13.3 Dispatch Scheduler

**File**: `cloud/ems-optimizer/optimizer/scheduler.py`

- Multi-period optimization for the next 24-48 hours
- Time-of-use scheduling based on price forecasts
- Integrates degradation cost into dispatch decisions

---

## 14. COMMUNICATION & MESSAGING

### 14.1 NATS JetStream Subjects

| Subject | Publisher | Subscriber | Payload |
|---------|-----------|------------|---------|
| `gridmind.{site_id}.telemetry` | Edge Agent | Cloud API | Measurements, state, alarms |
| `gridmind.{site_id}.commands` | Cloud API | Edge Agent | Power setpoints, mode changes |
| `gridmind.{site_id}.events` | Edge Agent | Cloud API | State changes, protection trips |

### 14.2 Message Envelope

```json
{
  "site_id": "CY-BESS-001",
  "timestamp": "2026-02-10T14:30:00Z",
  "type": "measurement",
  "payload": {
    "active_power_kw": 500.0,
    "reactive_power_kvar": 0.0,
    "soc_percent": 72.5,
    "frequency_hz": 50.01,
    "state": "DISCHARGING"
  }
}
```

### 14.3 Notification Channels (Maintenance)

| Channel | Provider | Use Case |
|---------|----------|----------|
| Push | Firebase Cloud Messaging | L2 warnings, status updates |
| SMS | Twilio | L3+ backup, confirmation codes |
| Call | Twilio | L3+ alarm dispatch, IVR confirmation |
| Email | SMTP | Reports, summaries, non-urgent |

---

## 15. SECURITY & AUTHENTICATION

### 15.1 Keycloak OIDC

- OAuth 2.0 / OpenID Connect for all API endpoints
- Role-based access control (RBAC)

### 15.2 User Roles

| Role | Dashboard | Commands | Trading | Config | Users | Alarms |
|------|-----------|----------|---------|--------|-------|--------|
| Admin | Yes | Yes | Yes | Yes | Yes | Yes |
| Operator | Yes | Yes | No | No | No | Ack |
| Trader | Yes | No | Yes | No | No | View |
| Engineer | Yes | No | No | Yes | No | Ack |
| Viewer | Yes | No | No | No | No | View |

### 15.3 NIS2 Compliance

- Audit logging middleware on all API calls
- Action log with user, timestamp, endpoint, method
- Immutable audit trail in PostgreSQL

---

## 16. CONFIGURATION

### 16.1 Key Config Files

| File | Contents |
|------|----------|
| `config/markets/cyprus.yaml` | Market parameters, MMS config, trading rules, grid protection, SCADA, maintenance SLAs |
| `config/devices/kehua_bcs1250k.yaml` | PCS Modbus register map |
| `config/devices/linyang_atlantic.yaml` | BMS Modbus register map |
| `config/scada/eac_point_map.yaml` | IEC 104 IOA ↔ internal data point mapping |
| `docker-compose.yml` | Local development stack |
| `.env` (not committed) | Secrets: DB passwords, API keys, MMS credentials |

### 16.2 Environment Variables

| Variable | Service | Description |
|----------|---------|-------------|
| `DATABASE_URL` | API | PostgreSQL connection string |
| `TIMESCALE_URL` | API | TimescaleDB connection string |
| `REDIS_URL` | API | Redis connection string |
| `NATS_URL` | API/Edge | NATS server URL |
| `KEYCLOAK_URL` | API | Keycloak server URL |
| `SECRET_KEY` | API | JWT signing key |

---

## 17. DEVELOPMENT ENVIRONMENT SETUP

### 17.1 Prerequisites

- **Docker Desktop** (for infrastructure services)
- **Rust 1.75+** (for edge layer)
- **Python 3.12+** (for cloud services)
- **Node.js 20+** (for web dashboard)

### 17.2 Quick Start

```bash
# 1. Start infrastructure
docker-compose up -d

# 2. Run cloud API
cd cloud/api
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 3. Run web dashboard
cd web
npm install
npm run dev     # → http://localhost:3000

# 4. (Optional) Run edge simulation
cd edge
cargo build --release
cargo run --bin ems-core -- --config config/site.yaml
```

### 17.3 Service URLs (Local Dev)

| Service | URL |
|---------|-----|
| Web Dashboard | http://localhost:3000 |
| API (Swagger) | http://localhost:8000/docs |
| Grafana | http://localhost:3001 |
| Keycloak | http://localhost:8080 |
| NATS Monitor | http://localhost:8222 |

---

## 18. FEATURE STATUS & ROADMAP

### 18.1 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Edge: EMS Core** | Code written | Control loop, state machine, protection |
| **Edge: SCADA Gateway** | Code written | IEC 104 server, command handler, event buffer |
| **Edge: Edge Agent** | Code written | NATS bridge, store-forward |
| **Edge: Modbus Drivers** | Code written | PCS + BMS drivers |
| **Cloud: FastAPI** | Code written | All 7 routers registered |
| **Cloud: Database Models** | Code written | 11 tables (6 original + 5 maintenance) |
| **Cloud: Pydantic Schemas** | Code written | All request/response schemas |
| **Cloud: BSM Analytics** | Code written | SOC, SOH, thermal, balancing, warranty |
| **Cloud: Forecasting** | Code written | ENTSO-E, weather, price forecast |
| **Cloud: Trading Engine** | Code written | Core, risk, 5 market connectors |
| **Cloud: Optimizer** | Code written | Scheduler, arbitrage |
| **Cloud: VPP** | Code written | Portfolio, dispatch, flexibility |
| **Web: All 9 Pages** | Code written | Mock data, no API integration yet |
| **Docker Compose** | Working | Full local dev stack |
| **Tests** | Empty directories | Needs implementation |
| **Tools/Simulators** | Empty directories | Needs implementation |

### 18.2 Phase 1 Tasks (Active)

- [ ] Integration test: Edge → NATS → Cloud API → PostgreSQL
- [ ] Wire web dashboard to API (replace mock data)
- [ ] WebSocket real-time data stream
- [ ] Recharts integration for time-series visualization
- [ ] Keycloak realm setup and API auth middleware
- [ ] DSO integration test with IEC 104 simulator
- [ ] Modbus integration test with PCS/BMS simulators

### 18.3 Phase 2 Tasks (Smart Maintenance + BSM)

- [ ] Twilio integration for SMS/call dispatch
- [ ] Firebase integration for push notifications
- [ ] Mobile app (or PWA) for engineer field use
- [ ] Leaflet map integration for engineer GPS tracking
- [ ] Database migrations (Alembic)
- [ ] Background task runner for escalation timeouts
- [ ] BSM analytics pipeline: Edge telemetry → Analytics → Alerts → Work orders
- [ ] Maintenance window → Trading blocker integration

### 18.4 Phase 3 Tasks (Market/MMS)

- [ ] `cloud/trading/mms/` module (SOAP client, CIM XML builder/parser)
- [ ] XSD schema validation framework
- [ ] DAM offer generation + submission
- [ ] BEO/RCO offer generation + submission
- [ ] Dispatch instruction handler (Z14 → PCS setpoint)
- [ ] Settlement parser
- [ ] Gate closure scheduler
- [ ] Full MMS integration test with TSOC sandbox

---

## 19. CODING STANDARDS

### 19.1 Rust (Edge)

- Use `rustfmt` and `clippy`
- All async code uses `tokio`
- Error handling: `anyhow` for applications, `thiserror` for libraries
- Logging: `tracing` crate with structured fields
- Config: `serde` + YAML deserialization

### 19.2 Python (Cloud)

- Use `ruff` for linting and formatting
- Type hints on all function signatures
- Pydantic for all external data validation
- `structlog` for structured logging (not print statements)
- Async-first: all DB and network operations use `await`
- Enums for all fixed value sets (stored as strings in PostgreSQL)

### 19.3 TypeScript (Web)

- Strict TypeScript (`strict: true`)
- Functional components with hooks
- Tailwind CSS (no custom CSS unless absolutely necessary)
- `"use client"` directive for interactive pages
- Types defined as interfaces at the top of files

### 19.4 Git

- Branch naming: `feature/`, `fix/`, `refactor/`
- Commit messages: imperative tense ("Add alarm escalation", not "Added")
- PR required for `main` branch

---

## APPENDIX A: GLOSSARY

| Term | Definition |
|------|-----------|
| **BEO** | Balancing Energy Offer |
| **BESS** | Battery Energy Storage System |
| **BMS** | Battery Management System |
| **BSM** | Battery Storage Management |
| **CIM** | Common Information Model (IEC 62325) |
| **DAM** | Day-Ahead Market |
| **DSO** | Distribution System Operator (EAC in Cyprus) |
| **EAC** | Electricity Authority of Cyprus |
| **EIC** | Energy Identification Code |
| **EMS** | Energy Management System |
| **FCR** | Frequency Containment Reserve |
| **aFRR** | Automatic Frequency Restoration Reserve |
| **mFRR** | Manual Frequency Restoration Reserve |
| **HMI** | Human-Machine Interface |
| **IOA** | Information Object Address (IEC 104) |
| **ISP** | Imbalance Settlement Period |
| **LFSM-O** | Limited Frequency Sensitive Mode - Overfrequency |
| **MMS** | Market Management System |
| **NAD** | Non-Availability Declaration |
| **NATS** | Neural Autonomic Transport System (messaging) |
| **PCS** | Power Conversion System (inverter) |
| **RCO** | Reserve Capacity Offer |
| **RTBM** | Real-Time Balancing Market |
| **SCADA** | Supervisory Control and Data Acquisition |
| **SLA** | Service Level Agreement |
| **SOC** | State of Charge |
| **SOH** | State of Health |
| **TED** | Techno-Economic Declaration |
| **TSO** | Transmission System Operator (TSOC in Cyprus) |
| **TSOC** | Transmission System Operator Cyprus |
| **VPP** | Virtual Power Plant |

---

## APPENDIX B: RELATED DOCUMENTS

| Document | Path | Contents |
|----------|------|----------|
| Project README | `readme.md` | Full project spec with DSO requirements |
| Architecture Diagram | `docs/architecture/ems-trading-maintenance-architecture.md` | Integration architecture with data flows |
| MMS Interface Guide | `docs/market-guides/cyprus-mms-interfaces.md` | Complete MMS interface specification |
| MMS Protocol Guide | `docs/protocols/cyprus-mms-protocol.md` | SOAP/CIM XML implementation details |
| Market Config | `config/markets/cyprus.yaml` | Trading parameters, grid protection, maintenance SLAs |
| EAC Point Map | `config/scada/eac_point_map.yaml` | IEC 104 IOA mapping |
| Kehua PCS Config | `config/devices/kehua_bcs1250k.yaml` | PCS Modbus registers |
| Linyang BMS Config | `config/devices/linyang_atlantic.yaml` | BMS Modbus registers |
| MMS Reference PDF | `docs/Market Participant InterfacesV1_3.pdf` | Original TSOC specification (154 pages) |
