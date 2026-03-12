# CYPRUS DSO (EAC) TECHNICAL COMPLIANCE
## BESS Grid Connection Requirements

**Document Reference:** LCY-DSO-001
**Version:** 3.0
**Effective Date:** January 2026
**Source:** EAC Technical Guide for Storage – Edition 2025.1

---

## 1. APPLICABLE STANDARDS

### 1.1 Primary References

| Document | Edition | Description |
|----------|---------|-------------|
| EAC Technical Guide for Storage | 2025.1 | ΣΑΗΕ connection requirements |
| EAC Technical Guide for RES | 2025 | Renewable energy systems |
| DSO PV Requirements | 2025 | Photovoltaic connection |
| IEC 60870-5-104 | - | SCADA communication protocol |

### 1.2 BESS Categories

| Category | Description | SCADA Required |
|----------|-------------|----------------|
| **A** | RES + BESS for self-consumption (Net Billing/Metering) | >120kW |
| **B** | RES with integrated storage (αποφόρτιση ≤50% RES capacity) | >120kW |
| **C** | Standalone BESS (may include RES) | >120kW |

**Your Project:** Category B or C (utility-scale with integrated PV)

---

## 2. CONNECTION TOPOLOGY

### 2.1 AC-Coupled vs DC-Coupled

```
AC-Coupled (Separate Inverters)          DC-Coupled (Hybrid Inverter)
┌─────────┐    ┌─────────┐               ┌─────────────────────┐
│   PV    │    │  BESS   │               │   Hybrid Inverter   │
│ Inverter│    │ Inverter│               │  ┌─────┐  ┌─────┐  │
└────┬────┘    └────┬────┘               │  │ PV  │  │BESS │  │
     │              │                     │  │ DC  │  │ DC  │  │
     └──────┬───────┘                     │  └──┬──┘  └──┬──┘  │
            │                             │     └───┬────┘     │
        ┌───┴───┐                         └─────────┼──────────┘
        │   S   │ ← Direction Sensor                │
        │       │                               ┌───┴───┐
        └───┬───┘                               │   S   │
            │                                   └───┬───┘
    ════════╪════════                               │
         Grid                               ════════╪════════
                                                 Grid
```

**Direction Sensor (S):** Communicates with inverter management system to prevent grid energy exchange from BESS.

---

## 3. REACTIVE POWER CONTROL Q(V)

### 3.1 Q(V) Characteristic Curve

The PCS must implement voltage-dependent reactive power control:

```
Q/Srated (%)
    │
 40 ├────────────────●────────┐
    │               /         │
    │              /          │
    ├─────────────●           │
    │            /            │
  0 ├──────────────────●──────●─────────────► V
    │                  │      │
    ├──────────────────●──────●
    │                        \
-40 ├────────────────────────────●
    │
    Vv1    Vv2      Vv3    Vv4
   212V   223V     237V   246V
   0.92   0.97     1.03   1.07 p.u.
```

### 3.2 Q(V) Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Vv1** | 212V (0.92 p.u.) | Start supplying Q |
| **Vv2** | 223V (0.97 p.u.) | End supplying Q ramp |
| **VQ0** | 230V (1.00 p.u.) | Reference voltage |
| **Vv3** | 237V (1.03 p.u.) | Start absorbing Q ramp |
| **Vv4** | 246V (1.07 p.u.) | Full Q absorption |
| **Deadband** | 0.97 - 1.03 p.u. | No Q injection/absorption |
| **Q capability** | ±40% of Srated | Minimum requirement |
| **Power factor** | ≥0.9 (ind/cap) | At max active power |

### 3.3 P(V) Characteristics for DC-Coupled

**Charging Mode:**

| Voltage | Power |
|---------|-------|
| < 0.90 p.u. (207V) | 0% (stop charging) |
| 0.90 - 0.93 p.u. | Ramp 0-100% |
| ≥ 0.93 p.u. (214V) | 100% (full charging) |

**Discharging Mode:**

| Voltage | Power |
|---------|-------|
| ≤ 1.07 p.u. (246V) | 100% (normal) |
| 1.07 - 1.10 p.u. | Ramp 100-0% |
| ≥ 1.10 p.u. (253V) | 0% (stop export) |

---

## 4. FREQUENCY RESPONSE

### 4.1 Overfrequency Response (f > 50.2 Hz)

| Frequency | Behavior |
|-----------|----------|
| **47.0 - 50.2 Hz** | Normal operation |
| **50.2 - 50.7 Hz** | Reduce discharge by 100% PM / Hz |
| **50.7 - 52.0 Hz** | Transition to max charging |
| **> 52.0 Hz** | Disconnect (protection) |

**Droop:** 10% power reduction per 0.1 Hz (= 100% PM / Hz)

### 4.2 Underfrequency Response

| Frequency | Behavior |
|-----------|----------|
| **49.5 - 50.0 Hz** | Normal operation |
| **< 49.5 Hz** | Support frequency (if capable) |
| **< 47.0 Hz** | Disconnect (protection) |

### 4.3 Recovery Rate

When frequency returns below 50.2 Hz:
- Maximum ramp rate: **10% of PAmax per minute**

---

## 5. PROTECTION SETTINGS

### 5.1 Inverter Protection (Table 1 from EAC Guide)

| Protection | Parameter | Setting | Trip Time |
|------------|-----------|---------|-----------|
| **Undervoltage Stage 1** | V< | 0.90 Un (207V) | 0.2s |
| **Overvoltage Stage 1** | V> | 1.10 Un (253V) | 0.2s |
| **Underfrequency Stage 1** | f< | 47 Hz | 0.2s |
| **Overfrequency Stage 1** | f> | 52 Hz | 0.2s |
| **Loss of Mains** | ROCOF | Active Anti-Islanding | Enabled |

### 5.2 Grid Protection Relay (for systems ≥20kWp)

External grid protection relay required with same settings as above.

---

## 6. SCADA/TELEMETRY ARCHITECTURE

### 6.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           PV PARK SITE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │   Battery   │    │   Battery   │    │   Weather   │              │
│  │    EMS      │────│    BESS     │    │   Station   │              │
│  └──────┬──────┘    └─────────────┘    └──────┬──────┘              │
│         │ Modbus/IEC 61850                    │                      │
│         │                                     │                      │
│  ┌──────┴──────┐    ┌─────────────┐    ┌─────┴───────┐              │
│  │  RTU / PLC  │────│   Network   │────│    Power    │              │
│  │             │    │   Switch    │    │   Quality   │              │
│  └──────┬──────┘    └──────┬──────┘    │  Analyzer   │              │
│         │                  │           └─────────────┘              │
│    IEC 60870-5-104         │                                        │
│         │            ┌─────┴─────┐    ┌─────────────┐               │
│         │            │   Grid    │    │     MV      │               │
│         │            │Protection │    │ Switchgear  │               │
│         │            │   Relay   │    └─────────────┘               │
│         │            └───────────┘                                   │
│  ┌──────┴──────┐                                                     │
│  │  Cellular   │ ← External 4G Antenna                              │
│  │  Router /   │                                                     │
│  │  E-Line     │                                                     │
│  └──────┬──────┘                                                     │
│         │ IEC 60870-5-104                                            │
└─────────┼────────────────────────────────────────────────────────────┘
          │
          │ GPRS/M2M or E-Line (CYTA)
          │
┌─────────┴────────────────────────────────────────────────────────────┐
│                           DSO (EAC)                                   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │   Radius    │    │  FireWall   │    │   SCADA     │              │
│  │   Server    │────│             │────│Infrastructure│              │
│  └─────────────┘    └─────────────┘    └─────────────┘              │
│                                              │                       │
│                                    ┌─────────┴─────────┐             │
│                                    │    ΕΚΕΔ (EKED)    │             │
│                                    │ National Control  │             │
│                                    │     Centre        │             │
│                                    └───────────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Required Equipment

| Equipment | Purpose | Specification |
|-----------|---------|---------------|
| **RTU** | Remote Terminal Unit | IEC 60870-5-104 master |
| **Cellular Router** | 4G/E-Line communication | CYTA M2M or E-Line |
| **External 4G Antenna** | Signal amplification | Low loss coaxial |
| **Network Switch** | Local network | Industrial Ethernet |
| **Power Quality Analyzer** | Grid measurements | PQDIF/COMTRADE capable |
| **Grid Protection Relay** | Protection functions | IEC compliant |
| **Weather Station** | Meteorological data | For ≥500kW plants |
| **UPS** | Backup power | 230V + 24/48V DC |

---

## 7. IEC 60870-5-104 COMMUNICATION

### 7.1 RTU Timing Parameters

| Parameter | Default | Required | Description |
|-----------|---------|----------|-------------|
| **t0** | 30s | 30s | Connection establishment timeout |
| **t1** | 15s | 15s | Send/test APDU timeout |
| **t2** | 10s | 10s | Acknowledge timeout (t2 < t1) |
| **t3** | 20s | 20s | Test frame timeout (idle state) |
| **k** | 12 APDUs | 12 APDUs | Max outstanding I-format APDUs |
| **w** | 8 APDUs | 8 APDUs | Latest acknowledge threshold |

### 7.2 Port Settings

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Port Number** | 2404 | Standard IEC 104 port |
| **Buffer Size** | 10-1000 | - |
| **Short Pulse Duration** | 500 ms | - |
| **Long Pulse Duration** | 1000 ms | - |

---

## 8. TELEMETRY SIGNALS

### 8.1 Measurement Signals (Power Quality Analyzer)

| IEC Addr | Type | Signal | Range | Hysteresis |
|----------|------|--------|-------|------------|
| **500** | M_ME_NC_1 | Output Voltage (avg L-L) | 0-30kV | 1V (LV) / 50V (MV) |
| **501** | M_ME_NC_1 | Output Active Power | 0-Pinstalled | 100W |
| **502** | M_ME_NC_1 | Output Reactive Power | -Qmax to +Qmax | 100VAr |
| **503** | M_ME_NC_1 | Active Power Setpoint Feedback | 0-Pinstalled | - |
| **504** | M_ME_NC_1 | Reactive Power Setpoint Feedback | -Qmax to +Qmax | - |
| **505** | M_ME_NC_1 | PV Plant Availability | 0-100% | - |
| **509** | M_ME_NC_1 | Output Power Factor (cosφ) | 0-1 | 0.005 |
| **510** | M_ME_NC_1 | Net Active Power | - | For zero-export |
| **511** | M_ME_NC_1 | Net Reactive Power | - | For zero-export |

**Note:** Net injection signals (510, 511) apply only to Zero Export systems.

### 8.2 Weather Station Signals (≥500kW plants)

| IEC Addr | Type | Signal | Unit | Range |
|----------|------|--------|------|-------|
| **506** | M_ME_NC_1 | Sun Radiation | W/m² | 0-1200, Hyst 1 |
| **507** | M_ME_NC_1 | Air Temperature | °C | -100 to +100, Hyst 0.5 |
| **508** | M_ME_NC_1 | Wind Speed Average | m/s | 0-100, Hyst 0.1 |

### 8.3 BESS-Specific Signals

| IEC Addr | Type | Signal | Description |
|----------|------|--------|-------------|
| **113** | M_SP_NA_1 | BESS Availability | 1=Available, 0=Unavailable |
| **27** | C_DC_NA_1 | BESS Active Power SCADA Control | Activate/Deactivate |
| **127** | M_DP_NA_1 | BESS Active Power Control Feedback | Confirmation |

---

## 9. CONTROL COMMANDS

### 9.1 Circuit Breaker Control

| IEC Addr | Type | Command | States |
|----------|------|---------|--------|
| **10** | C_DC_NA_1 | CB Control | 01=Open, 10=Close |
| **100** | M_DP_NA_1 | CB Status Feedback | Confirmation |
| **101** | M_SP_NA_1 | CB SCADA Control | 0=Remote, 1=Local |

### 9.2 Active Power Control

| IEC Addr | Type | Command | Description |
|----------|------|---------|-------------|
| **25** | C_DC_NA_1 | Active Power SCADA Control | Enable/Disable |
| **125** | M_DP_NA_1 | Active Power Control Feedback | Confirmation |
| **30** | C_SE_NB_1 | Active Power Setpoint | 0 - Pinstalled (kW) |
| **103** | M_SP_NA_1 | Setpoint Accepted/Rejected | 3s pulse |

**Discrete Power Levels (Double Commands):**
- 100% of installed capacity
- 60% of installed capacity
- 30% of installed capacity
- 0% (shutdown)

### 9.3 Reactive Power Control

| IEC Addr | Type | Command | Description |
|----------|------|---------|-------------|
| **26** | C_DC_NA_1 | Reactive Power SCADA Control | Enable/Disable |
| **126** | M_DP_NA_1 | Reactive Power Control Feedback | Confirmation |
| **31** | C_SE_NB_1 | Reactive Power Setpoint | -Qmax to +Qmax (kVAr) |
| **104** | M_SP_NA_1 | Setpoint Accepted/Rejected | 3s pulse |

**Note:** Qmax = Pinstalled × 0.6 (for cosφ = 0.8)

### 9.4 Zero Export Control

| IEC Addr | Type | Command | Description |
|----------|------|---------|-------------|
| - | C_DC_NA_1 | Zero Export Operation | Enable/Disable zero export |

### 9.5 Market Participation

| IEC Addr | Type | Signal | Description |
|----------|------|--------|-------------|
| **102** | M_SP_NA_1 | Market Participation | 0=Deactivated, 1=Activated |

---

## 10. PROTECTION SIGNALS

### 10.1 Grid Protection Relay Signals

| IEC Addr | Type | Signal | States |
|----------|------|--------|--------|
| **105** | M_SP_NA_1 | Overcurrent Protection | 0=Idle, 1=Operated |
| **106** | M_SP_NA_1 | Grid Relay Malfunction | 0=OK, 1=Fault |
| **107** | M_SP_NA_1 | Overfrequency Protection | 0=Idle, 1=Operated |
| **108** | M_SP_NA_1 | Underfrequency Protection | 0=Idle, 1=Operated |
| **109** | M_SP_NA_1 | Overvoltage Protection | 0=Idle, 1=Operated |
| **110** | M_SP_NA_1 | Undervoltage Protection | 0=Idle, 1=Operated |
| **111** | M_SP_NA_1 | Loss of Mains (ROCOF) | 0=Idle, 1=Operated |
| **112** | M_SP_NA_1 | Earth Fault Protection | 0=Idle, 1=Operated (MV only) |

---

## 11. POWER QUALITY REQUIREMENTS

### 11.1 DC Injection

| Parameter | Limit |
|-----------|-------|
| Total DC injection | < 1% of rated inverter current |

### 11.2 Harmonics

| Parameter | Limit |
|-----------|-------|
| Total Harmonic Distortion (THDi) | < 5% of rated current |

### 11.3 Synchronization Requirements

| Parameter | Tolerance |
|-----------|-----------|
| Frequency difference | < 1% (49.5 - 50.5 Hz) |
| Voltage difference | < 10% (207V - 253V) |
| Phase sequence | Must match |
| Phase angle deviation | < 10% |

---

## 12. RECONNECTION REQUIREMENTS

### 12.1 Reconnection Timing

After any disconnection event:

| System | Wait Time | Ramp Rate |
|--------|-----------|-----------|
| AC-Coupled RES Inverter | 3 minutes | Per EAC RES Guide |
| AC-Coupled BESS Inverter | 3 minutes | - |
| DC-Coupled Hybrid | 3 minutes | - |

### 12.2 Power Ramp Rate

Maximum power increase after reconnection:
- **10% of PAmax per minute**

---

## 13. CONTROL RESPONSE REQUIREMENTS

### 13.1 Timing Requirements

| Action | Response Time |
|--------|---------------|
| Setpoint acknowledgement | < 3 seconds |
| Power adjustment completion | < 60 seconds |
| Setpoint command frequency | ≥ 20 seconds between commands |

### 13.2 Accuracy Requirements

| Control | Accuracy |
|---------|----------|
| Active power setpoint | ±2% of (Pset - Pachieved) / Pset |
| Reactive power setpoint | ±2% of (Qset - Qachieved) / Qset |

---

## 14. TELECOMMUNICATION REQUIREMENTS

### 14.1 Connection Options

| Option | Provider | Monthly Cost |
|--------|----------|--------------|
| **E-Line** | CYTA | ~€160-200 (higher reliability) |
| **M2M GPRS** | CYTA | ~€25 (lower cost) |

### 14.2 Producer's Responsibilities

- Reliable telecommunication link operation
- Router/modem maintenance
- Antenna quality (for M2M)
- Backup power for communication equipment

**Note:** DSO may require E-Line upgrade if M2M reliability is insufficient.

---

## 15. OPERATIONAL CONSTRAINTS

### 15.1 DSO Rights

EAC/DSO reserves the right to:
- Limit or disconnect BESS for operational reasons
- Modify control setpoints
- Require zero-export operation
- Priority control over market participation

### 15.2 Producer Responsibilities

- Maintain reliable SCADA connection
- Execute DSO commands within specified time
- Do not exceed allowed injection limits
- Report any protection trips immediately

---

## 16. COMMISSIONING CHECKLIST

### 16.1 Pre-Commissioning

| Item | Check |
|------|-------|
| ☐ RTU programmed with correct addresses | |
| ☐ IEC 60870-5-104 parameters configured | |
| ☐ Telecommunication link tested | |
| ☐ Protection settings verified | |
| ☐ Q(V) curve configured | |
| ☐ P(V) curve configured (if DC-coupled) | |
| ☐ Frequency response configured | |

### 16.2 SCADA Verification

| Item | Check |
|------|-------|
| ☐ All telemetry signals communicating | |
| ☐ All control commands functional | |
| ☐ Protection signals verified | |
| ☐ Setpoint accuracy tested | |
| ☐ Response timing verified | |

### 16.3 DSO Witness Test

| Item | Check |
|------|-------|
| ☐ EKED connectivity confirmed | |
| ☐ Remote CB control tested | |
| ☐ P setpoint control tested | |
| ☐ Q setpoint control tested | |
| ☐ Zero export function tested (if applicable) | |
| ☐ Protection trip tests passed | |

---

## 17. COMPLIANCE SIGN-OFF

```
DSO TECHNICAL COMPLIANCE CERTIFICATION
═══════════════════════════════════════════════════════════════

Project: ____________________
RES Capacity: ________ kWp
BESS Capacity: ________ kW / ________ kWh

SCADA COMPLIANCE
☑ RTU correctly programmed (IEC 60870-5-104)
☑ All mandatory signals configured
☑ All control commands functional
☑ Telecommunication link reliable
☑ Response times meet requirements

GRID COMPLIANCE
☑ Q(V) characteristic configured
☑ Frequency response configured
☑ Protection settings verified
☑ Power quality requirements met
☑ Synchronization requirements met

WITNESSED BY EAC/EKED: ____________________
Date: ____________________
Signature: ____________________

PRODUCER: ____________________
Date: ____________________
Signature: ____________________
```

---

*Document Version: 3.0*
*Updated: January 2026*
*Source: EAC Technical Guide for Storage – Edition 2025.1*
*Lighthief Cyprus Ltd*
