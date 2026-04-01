# GridMind Integrated Architecture: EMS + Trading + Smart Maintenance

> **Version**: 1.0
> **Date**: 2026-02-10
> **Purpose**: Defines how EMS, SCADA, trading, and maintenance systems work together for optimal energy management, market participation, and asset reliability.

---

## 1. SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SYSTEMS                                       │
│  ┌─────────────┐  ┌───────────┐  ┌────────────────┐  ┌──────────────────────┐  │
│  │ DSO/TSO     │  │ TSOC MMS  │  │ Engineers /     │  │ Weather / ENTSO-E    │  │
│  │ SCADA       │  │ Market    │  │ Mobile App      │  │ Data Sources         │  │
│  │ (IEC 104)   │  │ (SOAP/XML)│  │ (Push/SMS/Call) │  │ (REST APIs)          │  │
│  └──────┬──────┘  └─────┬─────┘  └───────┬────────┘  └──────────┬───────────┘  │
└─────────┼───────────────┼────────────────┼───────────────────────┼──────────────┘
          │               │                │                       │
┌─────────▼───────────────▼────────────────▼───────────────────────▼──────────────┐
│                         GRIDMIND CLOUD PLATFORM                                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────────────────┐ │
│  │  TRADING MODULE │  │  OPTIMIZATION   │  │  SMART MAINTENANCE MODULE        │ │
│  │                 │  │  ENGINE         │  │                                  │ │
│  │  • MMS Client   │  │                 │  │  • Alarm Escalation Engine       │ │
│  │  • CIM XML      │  │  • Revenue      │  │  • Engineer Call Dispatch        │ │
│  │  • DAM Offers   │  │    Maximizer    │  │  • Call Pickup Verification      │ │
│  │  • BEO/RCO      │  │  • SOC Planner  │  │  • Response Time Tracker         │ │
│  │  • Settlement   │  │  • Degradation- │  │  • Work Order Management         │ │
│  │  • Gate Sched.  │  │    Aware Sched. │  │  • Engineer GPS/Status Tracker   │ │
│  │                 │  │  • Multi-Stack  │  │  • Maintenance History           │ │
│  │                 │  │    Optimizer    │  │  • Predictive Maintenance        │ │
│  └────────┬────────┘  └───────┬─────────┘  └───────────────┬────────────────┘  │
│           │                   │                             │                    │
│  ┌────────▼───────────────────▼─────────────────────────────▼──────────────────┐ │
│  │                     CORE PLATFORM SERVICES                                  │ │
│  │  FastAPI  │  PostgreSQL + TimescaleDB  │  Redis  │  NATS  │  Keycloak      │ │
│  └──────────────────────────┬──────────────────────────────────────────────────┘ │
└─────────────────────────────┼──────────────────────────────────────────────────┘
                              │ NATS JetStream
┌─────────────────────────────▼──────────────────────────────────────────────────┐
│                         EDGE LAYER (Per Site)                                   │
│                                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────────┐  │
│  │  SCADA Gateway   │  │  EMS Core        │  │  BSM Analytics               │  │
│  │  (IEC 104 Server)│  │  (Control Loop)  │  │  (SOC/SOH/Thermal/Warranty)  │  │
│  │                  │  │                  │  │                              │  │
│  │  • DSO Commands  │◄─┤  • State Machine │◄─┤  • Kalman Filter SOC        │  │
│  │  • Measurements  │  │  • Protection    │  │  • Degradation Tracking      │  │
│  │  • Events        │  │  • PQ Dispatch   │  │  • Thermal Optimization      │  │
│  │  • Point Map     │  │  • LFSM-O/Q(U)  │  │  • Warranty Monitoring       │  │
│  └──────────────────┘  │  • MMS Dispatch  │  └──────────────────────────────┘  │
│                        │    Handler       │                                     │
│                        └────────┬─────────┘                                     │
│                                 │ Modbus TCP / IEC 61850                        │
│                        ┌────────▼─────────┐                                     │
│                        │  PCS + BMS + Relay│                                     │
│                        └──────────────────┘                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. OPTIMIZATION ENGINE - HOW EMS MAXIMIZES VALUE

### 2.1 Revenue Maximization Loop

The optimization engine runs continuously, coordinating between trading and real-time control:

```
Every 5 minutes:
  1. Forecast prices (DAM, balancing, reserves)
  2. Forecast RES generation (if co-located)
  3. Get current SOC, SOH, temperature
  4. Get maintenance schedule constraints
  5. Run multi-objective optimization:
     ├── Maximize: Trading revenue (DAM arbitrage + reserves)
     ├── Minimize: Battery degradation cost per cycle
     ├── Constraint: SOC bounds for reserve commitments
     ├── Constraint: Maintenance windows (no trading during maintenance)
     ├── Constraint: Thermal limits
     └── Constraint: Warranty conditions
  6. Generate optimal schedule:
     ├── DAM offers/bids for next trading day
     ├── BEO for current/next ISP
     ├── FCR/aFRR/mFRR capacity offers
     └── SOC management targets
```

### 2.2 Degradation-Aware Scheduling

The scheduler uses SOH prediction to balance revenue against battery life:

| Factor | Impact | Optimization Response |
|--------|--------|----------------------|
| High DAM spread | More arbitrage cycles | Accept if spread > degradation cost |
| High FCR price | Reserve SOC at 50% | Prefer FCR when capacity value > arbitrage |
| High temperature | Accelerated degradation | Derate power, reduce cycling |
| Low SOH | Fewer remaining cycles | Increase minimum spread threshold |
| Maintenance window | Unavailable | Zero-offer for maintenance periods |

### 2.3 MMS Dispatch Integration

When TSOC sends a Dispatch Instruction (Z14):

```
Dispatch Instruction (Z14, every 5 min)
    │
    ├─ Z32 (Dispatch MW Gross) ──→ Primary power setpoint
    ├─ Z33 (Dispatch MW Net)   ──→ Net power setpoint
    ├─ Z24/Z25 (FCR Up/Down)  ──→ FCR droop response allocation
    ├─ Z26/Z27 (aFRR Up/Down) ──→ AGC setpoint allocation
    ├─ Z28/Z29 (mFRR Up/Down) ──→ Manual reserve allocation
    │
    ▼
EMS Core receives via NATS
    │
    ├─ Validates against SOC limits and protection
    ├─ Calculates PCS setpoint (kW/kVAr)
    ├─ Reserves SOC headroom for committed reserves
    └─ Sends to PCS via Modbus TCP (100ms control loop)
```

---

## 3. SMART MAINTENANCE SYSTEM

### 3.1 Alarm Severity Levels and Escalation

| Level | Severity | Examples | Response SLA | Escalation |
|-------|----------|----------|-------------|------------|
| **L1** | INFO | SOC low hint, scheduled event | None | Dashboard only |
| **L2** | WARNING | Cell temp elevated, SOC near limit | 4 hours | Push notification to on-call |
| **L3** | ALARM | BMS communication loss, PCS minor fault | 1 hour | Auto-call on-call engineer |
| **L4** | CRITICAL | Protection trip, cell voltage critical | 15 minutes | Call primary + backup engineer |
| **L5** | EMERGENCY | Fire detection, isolation fault, grid fault | Immediate | Call all engineers + manager + DSO |

### 3.2 Engineer Call Dispatch Flow

```
Alarm Triggered
    │
    ▼
┌─────────────────────────────┐
│  Alarm Escalation Engine    │
│  1. Classify severity (L1-L5)│
│  2. Check active work order  │
│  3. Check maintenance window │
└──────────────┬──────────────┘
               │ L3+ alarm
               ▼
┌─────────────────────────────┐
│  Engineer Dispatch           │
│  1. Look up on-call roster   │
│  2. Select nearest available │
│  3. Initiate call/SMS/push   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐     No pickup after timeout
│  Call Pickup Verification    │────────────────────┐
│  1. Wait for confirmation    │                    │
│  2. Engineer confirms via    │                    ▼
│     app / DTMF / callback   │     ┌──────────────────────┐
│  3. Record response time     │     │  Escalate to Backup  │
└──────────────┬──────────────┘     │  1. Call next engineer│
               │ Confirmed          │  2. Notify manager    │
               ▼                    │  3. Log missed call   │
┌─────────────────────────────┐     └──────────────────────┘
│  Work Order Created          │
│  1. Auto-generated from alarm│
│  2. Assigned to engineer     │
│  3. ETA tracking begins      │
│  4. Parts/tools checklist    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Engineer Tracker            │
│  1. GPS location (mobile)    │
│  2. En-route status          │
│  3. On-site confirmation     │
│  4. Work in progress         │
│  5. Completion + signoff     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Resolution & Reporting      │
│  1. Root cause recorded      │
│  2. Parts used logged        │
│  3. Alarm cleared            │
│  4. SLA compliance check     │
│  5. Maintenance history      │
└─────────────────────────────┘
```

### 3.3 Predictive Maintenance Integration

The BSM analytics module feeds into the maintenance system:

| BSM Signal | Maintenance Action |
|------------|-------------------|
| SOH dropping faster than predicted | Schedule preventive inspection |
| Cell voltage imbalance increasing | Schedule balancing service |
| Thermal system efficiency declining | Schedule coolant check |
| Warranty condition approaching limit | Alert + preventive charge cycle |
| SCADA communication intermittent | Schedule network/cable inspection |
| PCS fault code pattern detected | Schedule PCS diagnostic |

---

## 4. DATA MODEL ADDITIONS

### 4.1 New Tables

```
engineers
├── id (UUID, PK)
├── name (String)
├── phone (String)
├── email (String)
├── role (enum: field_engineer, senior_engineer, manager)
├── status (enum: available, on_call, busy, off_duty, on_leave)
├── current_location_lat (Float, nullable)
├── current_location_lon (Float, nullable)
├── location_updated_at (DateTime, nullable)
├── certifications (JSON - list of cert types)
├── assigned_sites (JSON - list of site IDs)
├── is_active (Boolean)
├── created_at (DateTime)

on_call_roster
├── id (UUID, PK)
├── engineer_id (FK → engineers)
├── site_id (FK → sites, nullable - null = all sites)
├── start_time (DateTime)
├── end_time (DateTime)
├── priority (Integer - 1=primary, 2=backup, 3=tertiary)
├── is_active (Boolean)

alarm_escalations
├── id (UUID, PK)
├── alarm_id (FK → alarms)
├── severity_level (Integer 1-5)
├── escalation_step (Integer - which attempt)
├── engineer_id (FK → engineers, nullable)
├── contact_method (enum: push, sms, call, email)
├── contact_initiated_at (DateTime)
├── contact_acknowledged_at (DateTime, nullable)
├── acknowledgement_method (enum: app_confirm, dtmf, callback, manual)
├── response_time_seconds (Integer, nullable)
├── sla_met (Boolean, nullable)
├── escalated_to_next (Boolean, default false)
├── notes (Text, nullable)

work_orders
├── id (UUID, PK)
├── site_id (FK → sites)
├── alarm_id (FK → alarms, nullable)
├── assigned_engineer_id (FK → engineers)
├── type (enum: reactive, preventive, predictive, inspection)
├── priority (enum: low, medium, high, critical, emergency)
├── status (enum: created, assigned, acknowledged, en_route,
│          on_site, in_progress, completed, cancelled)
├── title (String)
├── description (Text)
├── checklist (JSON - steps/parts required)
├── parts_used (JSON - parts consumed)
├── root_cause (Text, nullable)
├── resolution (Text, nullable)
├── created_at (DateTime)
├── assigned_at (DateTime, nullable)
├── acknowledged_at (DateTime, nullable)
├── en_route_at (DateTime, nullable)
├── arrived_at (DateTime, nullable)
├── started_at (DateTime, nullable)
├── completed_at (DateTime, nullable)
├── sla_deadline (DateTime)
├── sla_met (Boolean, nullable)

engineer_activity_log
├── id (UUID, PK)
├── engineer_id (FK → engineers)
├── work_order_id (FK → work_orders, nullable)
├── activity_type (enum: status_change, location_update,
│                  call_received, call_acknowledged,
│                  arrived_site, started_work, completed_work,
│                  note_added, photo_uploaded)
├── details (JSON)
├── latitude (Float, nullable)
├── longitude (Float, nullable)
├── timestamp (DateTime)

maintenance_schedules
├── id (UUID, PK)
├── site_id (FK → sites)
├── type (enum: preventive, inspection, calibration, cleaning)
├── title (String)
├── description (Text)
├── recurrence (enum: weekly, monthly, quarterly, semi_annual, annual)
├── next_due_date (DateTime)
├── last_completed_date (DateTime, nullable)
├── assigned_engineer_id (FK → engineers, nullable)
├── checklist_template (JSON)
├── estimated_duration_hours (Float)
├── is_active (Boolean)
```

---

## 5. INTEGRATION POINTS

### 5.1 EMS ↔ Trading

| Integration | Direction | Mechanism |
|-------------|-----------|-----------|
| SOC for offer generation | EMS → Trading | NATS telemetry |
| Available capacity | EMS → Trading | NATS telemetry |
| Dispatch instructions | Trading → EMS | NATS commands |
| Market schedule | Trading → EMS | NATS commands |
| Protection status | EMS → Trading | NATS events |
| Maintenance windows | Maintenance → Trading | API/DB |

### 5.2 EMS ↔ Maintenance

| Integration | Direction | Mechanism |
|-------------|-----------|-----------|
| Alarms and faults | EMS → Maintenance | NATS events → Escalation Engine |
| BMS analytics alerts | BSM → Maintenance | Predictive work orders |
| Maintenance mode command | Maintenance → EMS | NATS command (safe shutdown) |
| Post-maintenance clearance | Maintenance → EMS | Work order completion → restart |

### 5.3 Trading ↔ Maintenance

| Integration | Direction | Mechanism |
|-------------|-----------|-----------|
| Maintenance windows | Maintenance → Trading | Block trading during maintenance |
| Revenue impact alerts | Trading → Maintenance | High-value period warnings |
| Planned outage scheduling | Maintenance → Trading | NAD submission to MMS |

---

## 6. REVISION HISTORY

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-10 | 1.0 | Initial architecture document |
