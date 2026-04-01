# GridMind - Technical Reference Document

## Project: GridMind & SCADA Development

> **Purpose**: This document consolidates all DSO data, product datasheets, and technical specifications for the development of the GridMind solution - a proprietary Energy Management System and SCADA platform with integrated Battery Storage Management (BSM) in Phase 2.

> **Version**: 1.0  
> **Date**: January 27, 2026  
> **Status**: Development Reference

---

## 1. PROJECT OVERVIEW

### 1.1 GridMind Vision

| Phase | Scope | Timeline |
|-------|-------|----------|
| **Phase 1** | EMS/SCADA Core Development | 2026 |
| **Phase 2** | Integrated BSM (Battery Storage Management) + Smart Maintenance | 2026-2027 |
| **Phase 3** | Grid Services & Market Integration | 2027+ |

### 1.2 Key Objectives

1. **DSO Compliance**: Full IEC 60870-5-104 integration with Cyprus EAC SCADA
2. **Real-Time Control**: Millisecond-level response for active/reactive power commands
3. **Multi-Vendor Support**: Interface with Linyang BESS, Kehua PCS, and future equipment
4. **Cybersecurity**: NIS2-compliant architecture
5. **Market Ready**: Grid services (FCR, aFRR) and arbitrage optimization
6. **Smart Maintenance**: Alarm-driven engineer dispatch with call verification and SLA tracking

---

## 2. CYPRUS DSO REQUIREMENTS

### 2.1 Regulatory Authorities

| Authority | Role | Greek Name | Jurisdiction |
|-----------|------|------------|--------------|
| **EAC (ΑΗΚ)** | Distribution System Operator (DSO) | Αρχή Ηλεκτρισμού Κύπρου | Grid connections ≤8MW |
| **TSOC (ΔΣΜΚ)** | Transmission System Operator (TSO) | Διαχειριστής Συστήματος Μεταφοράς Κύπρου | Grid connections >8MW |
| **CERA (ΡΑΕΚ)** | Energy Regulatory Authority | Ρυθμιστική Αρχή Ενέργειας Κύπρου | Licensing & Market Rules |
| **ETEK (ΕΤΕΚ)** | Technical Chamber of Cyprus | Επιστημονικό Τεχνικό Επιμελητήριο Κύπρου | Engineering Standards |

### 2.2 BESS System Categories

| Category | Description | SCADA Required | Charging Source |
|----------|-------------|----------------|-----------------|
| **Category A** | Self-Consumption RES with BESS | No (≤120kW) | RES only |
| **Category B** | RES with Integrated Storage (Hybrid) | Yes (≥120kW) | RES only |
| **Category C** | Standalone Storage Facility (EAH) | Yes (≥120kW) | Grid and/or RES |

---

## 3. COMMUNICATION PROTOCOLS

### 3.1 Primary Protocol: IEC 60870-5-104

> **Mandatory** for all grid-connected BESS ≥120kW in Cyprus

| Parameter | Requirement |
|-----------|-------------|
| **Protocol** | IEC 60870-5-104 |
| **Transport** | TCP/IP |
| **Default Port** | 2404 |
| **Application Layer** | ASDU (Application Service Data Unit) |

#### IEC 104 Data Types

| Type ID | Description | Direction |
|---------|-------------|-----------|
| M_SP_NA_1 (1) | Single-point information | Monitored |
| M_DP_NA_1 (3) | Double-point information | Monitored |
| M_ME_NC_1 (13) | Measured value, short floating point | Monitored |
| M_ME_NB_1 (11) | Measured value, scaled value | Monitored |
| C_SC_NA_1 (45) | Single command | Control |
| C_SE_NC_1 (50) | Set-point command, short floating point | Control |

#### Required SCADA Points - Active Power Control

| Signal Type | Description | Address | Data Type |
|-------------|-------------|---------|-----------|
| **Setpoint** | Active Power Setpoint (kW) | 30 | IEEE 754 Float |
| **Feedback** | Setpoint Feedback (kW) | 503 | IEEE 754 Float |
| **Status** | Command Accepted/Rejected | 103 | Single-point |

#### Required SCADA Points - Reactive Power Control

| Signal Type | Description | Address | Data Type |
|-------------|-------------|---------|-----------|
| **Setpoint** | Reactive Power Setpoint (kVAr) | 31 | IEEE 754 Float |
| **Feedback** | Setpoint Feedback (kVAr) | 504 | IEEE 754 Float |
| **Status** | Command Accepted/Rejected | 104 | Single-point |

#### Discrete Active Power Commands

| Command | Power Level | Use Case |
|---------|-------------|----------|
| Level 1 | 100% of installed capacity | Normal operation |
| Level 2 | 60% of installed capacity | Grid congestion |
| Level 3 | 30% of installed capacity | High congestion |
| Level 4 | 0% (Zero Export) | Emergency curtailment |

### 3.2 Secondary Protocols

| Protocol | Use Case | Port |
|----------|----------|------|
| **Modbus TCP** | Internal device communication | 502 |
| **IEC 61850** | Substation communication (MMS) | 102 |
| **IEC 61850 GOOSE** | Fast messaging | Multicast |
| **REST API** | Cloud integration, external systems | 443 |

### 3.3 Communication Infrastructure Options

| Type | Description | Monthly Cost | Latency |
|------|-------------|--------------|---------|
| **M2M (2G/4G)** | Mobile network | ~€15/month | 50-200ms |
| **E-LINE** | Ethernet point-to-point | €160-200/month | <10ms |
| **Fiber Optic** | EAC private network | €25/month | <5ms |

---

## 4. CONTROL REQUIREMENTS

### 4.1 Response Time Requirements

| Parameter | Requirement | GridMind Target |
|-----------|-------------|---------------------|
| **Command Acknowledgment** | ≤3 seconds | <500ms |
| **Power Adjustment Time** | ≤60 seconds | <10 seconds |
| **Setpoint Command Frequency** | ≥20 seconds between commands | Configurable |
| **Control Accuracy** | ±2% of setpoint | ±1% |

### 4.2 Required Measurements

| Category | Parameters |
|----------|------------|
| **Electrical** | P, Q, S, V, I, f, PF, cos φ, THD |
| **BESS Specific** | SOC, SOH, Temperature, Charge/Discharge Status |
| **Protection** | Relay status, Trip indications, Fault codes |
| **Environmental** | Irradiance, Ambient Temperature, Humidity |

---

## 5. PROTECTION SETTINGS

### 5.1 Inverter Protection (Mandatory)

| Protection Type | Threshold | Operate Time |
|-----------------|-----------|--------------|
| **Undervoltage Stage 1** | 0.9 Un (207V) | 0.2 s |
| **Overvoltage Stage 1** | 1.1 Un (253V) | 0.2 s |
| **Underfrequency Stage 1** | 47 Hz | 0.2 s |
| **Overfrequency Stage 1** | 52 Hz | 0.2 s |
| **Loss of Mains** | Active anti-islanding | Immediate |

### 5.2 Voltage Operating Range

| Voltage Level | Nominal | Min (0.9 pu) | Max (1.1 pu) |
|---------------|---------|--------------|--------------|
| LV (230V) | 230V | 207V | 253V |
| MV (11kV) | 11,000V | 9,900V | 12,100V |
| MV (22kV) | 22,000V | 19,800V | 24,200V |

### 5.3 Frequency Response (LFSM-O)

| Parameter | Value |
|-----------|-------|
| Activation Threshold (fULCO) | 50.2 Hz |
| Droop Rate | 100% PM per Hz (10% per 0.1 Hz) |
| BESS Transition Frequency | 50.7 Hz |
| Maximum Charging Frequency | 52.0 Hz |
| Recovery Rate | 10% PAmax per minute |

### 5.4 Q(U) Control Curve (Discharging Mode)

| Voltage (V) | Voltage (pu) | Reactive Power Q/Srated |
|-------------|--------------|-------------------------|
| 212V | 0.92 pu | +40% (supplying/capacitive) |
| 223V | 0.97 pu | 0% (deadband start) |
| 230V | 1.00 pu | 0% (reference) |
| 237V | 1.03 pu | 0% (deadband end) |
| 246V | 1.07 pu | -40% (absorbing/inductive) |

---

## 6. BESS PRODUCT SPECIFICATIONS

### 6.1 Battery Container - Linyang Power Atlantic

| Parameter | ME 5.015 MWh | ME 4.179 MWh |
|-----------|--------------|--------------|
| **Manufacturer** | Jiangsu Linyang Energy Storage Technology | Same |
| **Container Type** | 20HC | 20HC |
| **DC Capacity** | 5,015 kWh | 4,179 kWh |
| **Configuration** | 12P416S | 10P416S |
| **DC Voltage Range** | 1,164.8 – 1,497.6 V | Same |
| **Nominal Voltage** | 1,331.2 V | Same |
| **Rated Power (1C)** | 2,500 kW | 2,090 kW |
| **Rated Power (0.5C)** | 1,250 kW | 1,045 kW |
| **Dimensions (W×D×H)** | 6,058 × 2,438 × 2,896 mm | Same |
| **Weight** | ~41.5 tonnes | ~38.5 tonnes |
| **IP Rating** | IP55 | IP55 |
| **Anti-Corrosion** | C4 (ISO 12944) | C3 |
| **Thermal Management** | Liquid Cooling (60 kW) | Liquid Cooling |
| **Communication** | Modbus TCP / IEC 104 / IEC 61850 | Same |

### 6.2 Battery Cell Specifications (EVE LFP 314Ah)

| Parameter | Value |
|-----------|-------|
| **Cell Type** | LFP (Lithium Iron Phosphate) |
| **Manufacturer** | EVE Energy (EVE LF314) |
| **Cell Capacity** | 314 Ah |
| **Nominal Voltage** | 3.2 V |
| **Voltage Range** | 2.5 – 3.65 V |
| **Rated Energy** | 1,004.8 Wh |
| **Standard C-Rate** | 0.5C (157A) |
| **Maximum C-Rate** | 1C (314A) |
| **Cell Weight** | 5.6 ± 0.3 kg |
| **Cycle Life (Standard)** | 6,000 cycles @ 0.5C, 25°C, 100%DOD, 80%SOH |
| **Cycle Life (Extended)** | 8,000 cycles @ 0.5C, 25°C, 90%DOD, 70%SOH |
| **Round-Trip Efficiency** | 94% @ 0.5P (cell level) |

### 6.3 System Efficiency

| Component | Charging | Discharging |
|-----------|----------|-------------|
| HV Transformer | 99.95% | 99.50% |
| MV Cable | 99.95% | 99.50% |
| MV Transformer | 99.00% | 99.00% |
| LV Cable | 99.95% | 99.95% |
| **PCS** | **98.20%** | **98.50%** |
| DC Cable | 99.80% | 99.80% |
| **Battery** | **96.50%** | **97.50%** |
| **System RTE (AC-AC)** | - | **87.8%** |

---

## 7. PCS SPECIFICATIONS

### 7.1 Kehua BCS1250K-C-HUD (Primary PCS)

| Parameter | Value |
|-----------|-------|
| **Manufacturer** | Xiamen Kehua Digital Energy Tech Co., Ltd |
| **Model** | BCS1250K-C-HUD |
| **Rated Power** | 1,250 kW |
| **Max Power** | 1,375 kVA |
| **DC Voltage Range** | 1,060 – 1,500 Vdc |
| **Max DC Current** | 1,403 A |
| **AC Voltage** | 690 Vac |
| **Max AC Current** | 1,150.6 A |
| **Maximum Efficiency** | ≥99% |
| **Power Factor** | >0.99 @ rated power |
| **PF Adjustable Range** | -1 (leading) to +1 (lagging) |
| **THDi** | <3% @ rated power |
| **IP Rating** | IP65 |
| **Corrosion Protection** | C5 |
| **Operating Temp** | -35°C to +60°C |

#### Communication Interfaces

| Interface | Protocol |
|-----------|----------|
| RS485 | Modbus RTU |
| Ethernet (4 ports) | Modbus TCP, IEC 61850, IEC 104 |
| CAN | Internal BMS communication |

#### Grid-Forming Features

| Feature | Support |
|---------|---------|
| VSG (Virtual Synchronous Generator) | ✅ Yes |
| Black-Start | ✅ Yes |
| VF (Voltage-Frequency) Mode | ✅ Yes |
| PQ Mode | ✅ Yes |
| Multi-Mode Switching | ✅ Yes |
| Response Time | Millisecond-level |

### 7.2 Containerized PCS - BCS10000K-C-HUD/T8 (10 MW)

| Parameter | Value |
|-----------|-------|
| **Configuration** | 8 × BCS1250K-C-HUD |
| **Rated Power** | 10,000 kW (10 MW) |
| **Max Power** | 11,000 kVA |
| **Container Type** | 40HC |
| **Dimensions (W×H×D)** | 12,192 × 2,896 × 2,438 mm |
| **Weight** | ≤38,000 kg |
| **Integrated Transformer** | 10 MVA, 0.69/35kV, Dy11-y11 |
| **IP Rating (PCS)** | IP65 |
| **IP Rating (Skid)** | IP54 |

---

## 8. BMS ARCHITECTURE

### 8.1 Three-Level Hierarchy

| Level | Component | Function | Qty per Container |
|-------|-----------|----------|-------------------|
| **L1** | BMU (Battery Management Unit) | Cell-level monitoring | 96 (2 per pack) |
| **L2** | BCMU (Battery Cluster Management Unit) | Cluster-level control | 12 (1 per cluster) |
| **L3** | BAMS (Battery Array Management System) | System-level management | 2 (redundant) |

### 8.2 BMU Specifications (Level 1)

| Parameter | Value |
|-----------|-------|
| Voltage Samples | 52 per BMU |
| Temperature Samples | 12 per BMU |
| Cell Voltage Range | 0 – 5 V |
| Cell Voltage Accuracy | ±5 mV |
| Voltage Sampling Period | ≤100 ms |
| Cell Temperature Range | -40 to +105°C |
| Cell Temperature Accuracy | ±1°C |
| Temperature Sampling Period | ≤200 ms |
| Equalization Mode | Passive |
| Communication | CAN 2.0 |

### 8.3 BCMU Specifications (Level 2)

| Parameter | Value |
|-----------|-------|
| Total Voltage Range | 0 – 1,500 V |
| Total Voltage Accuracy | ±0.5% FSR |
| Current Measuring Range | ±400 A |
| Current Accuracy | ±0.5% FSR |
| **SOC Calculation Accuracy** | ≤5% |
| **Energy Calculation Error** | ≤±2% |
| Communication | CAN / RS485 / Modbus |

### 8.4 BAMS Specifications (Level 3)

| Parameter | Value |
|-----------|-------|
| Operating Voltage | 24 V DC |
| Operating Temperature | -20 to +85°C |
| Communication Protocols | CAN / RS485 / Modbus TCP/RTU / Ethernet |
| Redundancy | Hot standby (2 hosts) |

### 8.5 BMS Data Points for EMS Integration

| Category | Data Points |
|----------|-------------|
| **Cell Level** | Voltage (52×BMU), Temperature (12×BMU) |
| **Cluster Level** | SOC, SOH, Total Voltage, Total Current, Min/Max Cell V/T |
| **Container Level** | System SOC, System SOH, Power, Energy, Alarms, Status |
| **Alarms** | Overvoltage, Undervoltage, Overcurrent, Over/Under Temp, Isolation Fault |

---

## 9. SWITCHGEAR SPECIFICATIONS

### 9.1 MV Switchgear (Pending Confirmation)

| Parameter | Specification |
|-----------|---------------|
| **Preferred Brand** | Schneider Electric |
| **Type** | SF6 or Air-Insulated (TBD) |
| **Voltage Rating** | 11 kV or 22 kV |
| **RMU Options** | SM6, RM6, or Premset |
| **Protection Relays** | ABB REF615 or Schneider Sepam (TBD) |

### 9.2 Protection Relay Requirements

| Function | Description |
|----------|-------------|
| 50/51 | Overcurrent (instantaneous/time-delayed) |
| 67 | Directional overcurrent |
| 81O/U | Over/Under frequency |
| 27/59 | Under/Over voltage |
| 46 | Negative sequence current |
| 21 | Distance protection |
| 25 | Synchrocheck |
| 79 | Recloser |

---

## 10. TRANSFORMER SPECIFICATIONS

### 10.1 MV Transformer (Integrated in Skid)

| Parameter | 10 MVA (Confirmed) |
|-----------|-------------------|
| **Manufacturer** | Kehua Tech |
| **Model** | SL-10000 |
| **Rated Power** | 10,000 kVA |
| **Voltage Ratio** | 0.69 kV / 35 kV (customizable 6-35kV) |
| **Type** | Oil-immersed |
| **Vector Group** | Dy11-y11 |
| **Efficiency** | 99% |
| **Monitoring** | Real-time condition monitoring |

### 10.2 Required Transformer Data Points

| Parameter | Description |
|-----------|-------------|
| Oil Temperature | Top oil, winding hotspot |
| Load Current | Per phase |
| Tap Position | OLTC position (if applicable) |
| Gas Analysis | Dissolved gas monitoring |
| Status | In-service, tripped, standby |

---

## 11. CERTIFICATIONS STATUS

### 11.1 Available Certifications

| Standard | Status | Certificate |
|----------|--------|-------------|
| **UL 1973** | ✅ Certified | MH63503 |
| **UL 9540A** | ✅ Complete (Unit PASSED) | 80239432 |
| **IEC 62619:2022** | ✅ CB Certified | BE-51213 |
| **IEC 63056:2020** | ✅ CB Certified | SG SGS-00632 |
| **UN 38.3** | ✅ Passed | 01112300005127 |
| **EN 62477-1** | ✅ Attested | N8A 130105 0006 |
| **EN IEC 61000-6-2/6-4** | ✅ Certified | E6A 130105 0005 |
| **IEC 62933-5-2** | 🔄 In Progress | Testing complete |
| **EN 50549-2** | ✅ Available | BCS1250K-C-HUD |

### 11.2 Critical for Cyprus DSO

| Document | Standard | Status | Priority |
|----------|----------|--------|----------|
| **Grid Connection Certificate** | EN 50549-2 | ✅ Available | 🔴 Critical |
| Anti-Islanding Test Report | IEC 62116 | ✅ Available | 🔴 Critical |
| LVRT/HVRT Test Report | EN 50549-2 | ✅ Available | 🔴 Critical |
| IEC 60870-5-104 Point List | IEC 60870-5-104 | ✅ Available | 🟡 High |
| Protection Settings Guide | EN 50549-2 | ❌ Missing | 🟡 High |

---

## 12. EMS/SCADA ARCHITECTURE

### 12.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GRID OPERATOR                                  │
│                    (EAC DSO / TSOC Control Center)                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ IEC 60870-5-104
                               │ (Port 2404)
┌──────────────────────────────▼──────────────────────────────────────────┐
│                         GridMind                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    SCADA Gateway (IEC 104 Server)                  │ │
│  │  • Command handling (P/Q setpoints)                                │ │
│  │  • Status reporting                                                │ │
│  │  • Event logging                                                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    EMS Core Engine                                  │ │
│  │  • Real-time control loop                                          │ │
│  │  • State machine (Charge/Discharge/Standby/Fault)                  │ │
│  │  • Protection coordination                                         │ │
│  │  • Energy optimization                                             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    BSM Module (Phase 2)                            │ │
│  │  • SOC/SOH calculation                                             │ │
│  │  • Degradation tracking                                            │ │
│  │  • Thermal management                                              │ │
│  │  • Balancing optimization                                          │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    Device Drivers                                   │ │
│  │  ├── Modbus TCP (PCS, BMS)                                         │ │
│  │  ├── IEC 61850 (Protection Relays)                                 │ │
│  │  └── REST API (Cloud, Analytics)                                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Kehua PCS     │  │  Linyang BMS    │  │   Protection    │
│  (Modbus TCP)   │  │  (Modbus TCP)   │  │    Relays       │
│                 │  │                 │  │  (IEC 61850)    │
│  • P/Q Control  │  │  • Cell data    │  │  • Trip/Close   │
│  • Grid-forming │  │  • SOC/SOH      │  │  • Fault data   │
│  • Protection   │  │  • Alarms       │  │  • Status       │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 12.2 Modbus Register Map - Kehua PCS

| Register | Description | R/W | Data Type |
|----------|-------------|-----|-----------|
| 40001-40002 | Active Power Setpoint (kW) | R/W | Float32 |
| 40003-40004 | Reactive Power Setpoint (kVAr) | R/W | Float32 |
| 40005 | Operating Mode | R/W | UINT16 |
| 40006 | Start/Stop Command | R/W | UINT16 |
| 30001-30002 | Active Power Actual (kW) | R | Float32 |
| 30003-30004 | Reactive Power Actual (kVAr) | R | Float32 |
| 30005-30006 | DC Voltage (V) | R | Float32 |
| 30007-30008 | DC Current (A) | R | Float32 |
| 30009-30010 | AC Voltage (V) | R | Float32 |
| 30011-30012 | AC Current (A) | R | Float32 |
| 30013-30014 | Frequency (Hz) | R | Float32 |
| 30015 | Power Factor | R | Float32 |
| 30016 | PCS Status | R | UINT16 |
| 30017 | Fault Code | R | UINT16 |

### 12.3 Modbus Register Map - Linyang BMS

| Register | Description | R/W | Data Type |
|----------|-------------|-----|-----------|
| 30001 | System SOC (%) | R | UINT16 (×0.1) |
| 30002 | System SOH (%) | R | UINT16 (×0.1) |
| 30003-30004 | System Voltage (V) | R | Float32 |
| 30005-30006 | System Current (A) | R | Float32 |
| 30007-30008 | System Power (kW) | R | Float32 |
| 30009 | Max Cell Voltage (mV) | R | UINT16 |
| 30010 | Min Cell Voltage (mV) | R | UINT16 |
| 30011 | Max Cell Temperature (°C) | R | INT16 (×0.1) |
| 30012 | Min Cell Temperature (°C) | R | INT16 (×0.1) |
| 30013 | Number of Online Clusters | R | UINT16 |
| 30014 | Alarm Code Word 1 | R | UINT16 |
| 30015 | Alarm Code Word 2 | R | UINT16 |
| 30016 | BMS Status | R | UINT16 |

---

## 13. OPERATIONAL MODES

### 13.1 State Machine

```
                    ┌──────────────────┐
                    │      INIT        │
                    └────────┬─────────┘
                             │ Startup complete
                             ▼
              ┌──────────────────────────────┐
              │         STANDBY              │
              │  • All systems ready         │
              │  • Waiting for command       │
              └──────┬───────────┬───────────┘
          Charge cmd │           │ Discharge cmd
                     ▼           ▼
         ┌───────────────┐  ┌───────────────┐
         │   CHARGING    │  │  DISCHARGING  │
         │  • SOC < 100% │  │  • SOC > 0%   │
         │  • P < 0      │  │  • P > 0      │
         └───────┬───────┘  └───────┬───────┘
                 │ SOC=100%         │ SOC=0%
                 └─────────┬────────┘
                           │
                           ▼
                    ┌──────────────────┐
                    │      IDLE        │
                    │  • Min power     │
                    │  • Maintain temp │
                    └──────────────────┘
                           │ Fault detected
                           ▼
                    ┌──────────────────┐
                    │      FAULT       │
                    │  • Safe shutdown │
                    │  • Alarm active  │
                    └──────────────────┘
```

### 13.2 Control Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **PQ Mode** | Fixed P and Q setpoints | Normal DSO dispatch |
| **VF Mode** | Voltage/Frequency control | Grid support |
| **VSG Mode** | Virtual synchronous generator | Inertia emulation |
| **Droop Mode** | Frequency-proportional response | FCR/aFRR |
| **Zero Export** | No grid injection | Self-consumption |

---

## 14. GRID SERVICES CAPABILITY

### 14.1 Frequency Containment Reserve (FCR)

| Parameter | Requirement | GridMind |
|-----------|-------------|--------------|
| Activation Time | <30 seconds | <1 second |
| Full Response | <30 seconds | <10 seconds |
| Droop Setting | 4-6% | Configurable |
| Deadband | ±10 mHz | Configurable |

### 14.2 Automatic Frequency Restoration Reserve (aFRR)

| Parameter | Requirement | GridMind |
|-----------|-------------|--------------|
| Activation Time | <5 minutes | <30 seconds |
| Ramp Rate | Per TSO spec | 10-100% PM/min |
| Accuracy | ±5% of setpoint | ±2% |

---

## 15. CYBERSECURITY REQUIREMENTS

### 15.1 NIS2 Compliance

| Requirement | Implementation |
|-------------|----------------|
| Access Control | Role-based authentication (RBAC) |
| Encryption | TLS 1.3 for all external comms |
| Audit Logging | All commands logged with timestamps |
| Incident Response | Automated alerting, manual override |
| Network Segmentation | OT/IT network separation |

### 15.2 Security Architecture

| Zone | Description | Protocols |
|------|-------------|-----------|
| **Zone 1** | Field devices (PCS, BMS) | Modbus TCP (encrypted tunnel) |
| **Zone 2** | Local SCADA/EMS | Internal only |
| **Zone 3** | DMZ (IEC 104 Gateway) | IEC 104 to DSO |
| **Zone 4** | Cloud/Remote access | HTTPS/REST API |

---

## 16. DATA REQUIREMENTS

### 16.1 Data Resolution

| Data Type | Resolution | Retention |
|-----------|------------|-----------|
| Real-time measurements | 1 second | 7 days (raw) |
| Event logs | Immediate | 5 years |
| Performance data | 1 minute | 1 year (full), 10 years (aggregated) |
| Alarm history | Immediate | 5 years |

### 16.2 Data Export Formats

| Format | Use Case |
|--------|----------|
| CSV | Analysis, reporting |
| JSON | API integration |
| IEC 61968 CIM | Utility data exchange |
| Excel | Client reports |

---

## 17. PHASE 2: BATTERY STORAGE MANAGEMENT (BSM)

### 17.1 BSM Module Scope

| Function | Description |
|----------|-------------|
| **Advanced SOC Estimation** | Kalman filter, machine learning |
| **SOH Prediction** | Degradation modeling, remaining life |
| **Thermal Optimization** | Predictive cooling control |
| **Cell Balancing** | Active/passive optimization |
| **Warranty Tracking** | Cycle counting, warranty conditions |

### 17.2 Degradation Tracking

| Operating Condition | First Year Drop | Annual Degradation | Years to EOL (70%) |
|---------------------|-----------------|-------------------|-------------------|
| 0.25P, 1 CPD | 3.88% | 1.52% | ~18 years |
| 0.25P, 2 CPD | 4.59% | 2.37% | ~12 years |
| 0.5P, 1 CPD | 4.04% | 1.59% | ~17 years |
| 0.5P, 2 CPD | 4.72% | 2.72% | ~10 years |

### 17.3 Warranty Protection Monitoring

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Cell Voltage Critical | ≤2.5V | **Immediate alarm** - warranty void |
| Cell Voltage Sustained | <2.8V for 120h | **Warning** - charge immediately |
| SOC Zero State | 0% for 120h | **Warning** - charge to ≥15% |
| Operational SOC | 0% for 2h | **Warning** - charge to ≥5% |

---

## 18. AVAILABLE DOCUMENTATION

### 18.1 PCS Documentation (Kehua)

| Document | Status | Content |
|----------|--------|---------|
| BCS1000K~1250K-C-HUD Series.pdf | ✅ Available | Full datasheet |
| BCS10000K-C-HUD T8.pdf | ✅ Available | 10MW system specs |
| EN 50549-2 Certificate | ✅ Available | Grid compliance |
| EN 50549-2 Test Report | ✅ Available | LVRT/HVRT data |
| IEC 60870-5-104 Point List | ✅ Available | SCADA mapping |
| Modbus Protocol.xlsx | ✅ Available | Register map |
| Efficiency Curves V3.0 | ✅ Available | Load-based efficiency |
| P-Q Curves | ✅ Available | Capability curves |
| FRT Characteristics | ✅ Available | Frequency response |

### 18.2 BESS Documentation (Linyang)

| Document | Status | Content |
|----------|--------|---------|
| Power Atlantic 5MWh Spec | ✅ Available | Full container specs |
| Degradation Curves | ✅ Available | 4 operating conditions |
| User Manual V2.0 | ✅ Available | Operation, warranty |
| Maintenance Manual | ✅ Available | Maintenance schedules |
| LTSA Pricing | ✅ Available | O&M costs |
| Warranty Terms v2 | ✅ Available | Warranty conditions |
| UL 9540A (Unit) | ✅ PASSED | Fire safety |
| IEC 62619 CB Cert | ✅ Available | Battery safety |

### 18.3 Missing Documentation

| Document | Priority | Source |
|----------|----------|--------|
| Protection Settings Guide | 🔴 High | Kehua |
| Smaller MV Skid Datasheets (1-8MW) | 🟡 Medium | Linyang/Kehua |
| Installation Manual (MV Skid) | 🟡 Medium | Linyang |
| Black Start Procedure | 🟡 Medium | Kehua |
| Grid-Forming Configuration Guide | 🟡 Medium | Kehua |

---

## 19. REVISION HISTORY

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-27 | 1.0 | Initial document creation | AI Assistant |

---

## 20. APPENDICES

### Appendix A: IEC 60870-5-104 Full Point List

> See: `docs/internal/kehua-pcs/IEC104 Point List.xlsx`

### Appendix B: Modbus Register Maps

> See: `docs/internal/kehua-pcs/Modbus Communication Protocol.xlsx`

### Appendix C: Cyprus DSO Application Parameters

> See: `docs/CyprusDSO.md` Section 11 (DSO Application Parameters)

### Appendix D: Linyang Technical Specifications

> See: `docs/linyang.md`

---

## NEXT STEPS

### Phase 1: EMS/SCADA Core (2026)
- [ ] Finalize IEC 60870-5-104 implementation
- [ ] Develop Modbus TCP drivers for PCS and BMS
- [ ] Implement state machine and control logic
- [ ] Build HMI/SCADA interface
- [ ] DSO integration testing (EAC sandbox)

### Phase 2: BSM Integration + Smart Maintenance (2026-2027)

> **Architecture**: `docs/architecture/ems-trading-maintenance-architecture.md`
> **Config**: `config/markets/cyprus.yaml` (maintenance section)

#### 2.1 Battery Storage Management
- [ ] Advanced SOC/SOH algorithms (Extended Kalman Filter)
- [ ] Degradation prediction models (Linyang empirical curves)
- [ ] Thermal optimization (predictive cooling control)
- [ ] Warranty tracking dashboard

#### 2.2 Smart Maintenance System
- [ ] Engineer management (registration, certifications, site assignments)
- [ ] On-call roster management (primary, backup, tertiary engineers)
- [ ] Alarm severity-based auto-escalation (L1-L5)
- [ ] Engineer call dispatch (push/SMS/call based on severity)
- [ ] Call pickup verification (app confirm, DTMF, callback)
- [ ] Missed-call auto-escalation to backup engineer
- [ ] Work order auto-creation from L3+ alarms
- [ ] Engineer GPS tracking (mobile app integration)
- [ ] Status timeline tracking (assigned → en route → on site → completed)
- [ ] SLA compliance monitoring and reporting

#### 2.3 Preventive & Predictive Maintenance
- [ ] Recurring maintenance schedule management
- [ ] BSM analytics-driven predictive maintenance triggers
- [ ] Maintenance window coordination with trading (block offers during maintenance)
- [ ] Parts inventory tracking per work order
- [ ] Root cause analysis and resolution logging
- [ ] Non-availability declaration (A28) auto-submission during maintenance

### Phase 3: Market Integration (2027+)

> **Reference**: Market Participant Interfaces Technical Description V1.3 (TSOC, May 2023)
> **Full Guide**: `docs/market-guides/cyprus-mms-interfaces.md`

#### 3.1 MMS Integration Foundation (Critical Path)
- [ ] Implement ENTSO-E CIM XML builder (IEC 62325-451 document generation)
- [ ] Implement CIM XML parser for all MMS output documents
- [ ] Build XSD validation framework for all 8 schema types
- [ ] Create SOAP/HTTPS client with WS-Security (UsernameToken) authentication
- [ ] Obtain and configure EIC codes (participant, resources, Cyprus control area)
- [ ] Implement gate closure scheduler (EET timezone-aware)
- [ ] Build acknowledgement handler with retry logic

#### 3.2 Day-Ahead Market (DAM) Participation
- [ ] DAM energy offer generator (Simple Offers Z04, Block Offers Z05)
- [ ] DAM energy bid generator (Simple Bids Z06)
- [ ] DAM margin query via SOAP web service
- [ ] Market Clearing Price parser (A44)
- [ ] Cleared energy volumes parser (Z07)
- [ ] Market Schedule parser (A09)
- [ ] Stepwise offer optimization (30-min resolution, max 10 priority steps)

#### 3.3 Balancing Market Participation
- [ ] Balancing Energy Offer (BEO) generator (A37/A86)
- [ ] Reserve Capacity Offer (RCO) generator for FCR (A95), aFRR (A96), mFRR (A97)
- [ ] **Dispatch Instruction handler (Z14) - translates MMS 5-min dispatch to PCS setpoints**
- [ ] Commitment schedule parser (Z09)
- [ ] Reserve award parser (A38)
- [ ] BEO award parser (A83, 5-min resolution)
- [ ] SOC management for continuous reserve availability

#### 3.4 Forward Market & Reserves
- [ ] Physical Delivery/Offtake Nominations (PDN/PON - A14)
- [ ] Forward Contract Nominations for OTC bilateral (Z03)
- [ ] RR/BS/CR bid submission for long-term reserve auctions (A24)
- [ ] Non-availability declaration management (A28)
- [ ] Techno-economic declaration submission (Z01)
- [ ] RES injection forecast submission (A69)

#### 3.5 Settlement & Compliance
- [ ] Settlement statement parser (7 types: Z20-Z28)
- [ ] Billing notice parser (9 types: Z30-Z38)
- [ ] Non-compliance charge tracking and minimization
- [ ] REMIT reporting integration
- [ ] Revenue reconciliation dashboard

#### 3.6 Optimization & Intelligence
- [ ] DAM price forecasting (for optimal offer strategy)
- [ ] Arbitrage optimization using DAM + balancing spread
- [ ] Multi-revenue stack optimization (energy + reserves)
- [ ] AI-based RES injection forecasting
- [ ] Multi-site aggregation (VPP)
