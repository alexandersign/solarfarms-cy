# Cyprus DSO/TSO Technical Requirements for BESS

## Document: Grid Connection Requirements for SolarFarms.cy

> **Purpose**: This document consolidates all Cyprus DSO (EAC) and TSO (TSOC) technical requirements for:
> - Grid connection applications
> - BESS system compliance verification
> - SCADA/EMS integration
> - Protection settings
> - Project proposal documentation

> **Source**: EAC Technical Guide for Storage Systems - Edition 2026 (April 2026) — supersedes Edition 2025.1 draft

---

## 1. REGULATORY FRAMEWORK

### 1.1 Key Authorities

| Authority | Role | Greek Name |
|-----------|------|------------|
| **EAC (ΑΗΚ)** | Distribution System Operator (DSO) | Αρχή Ηλεκτρισμού Κύπρου |
| **TSOC (ΔΣΜΚ)** | Transmission System Operator (TSO) | Διαχειριστής Συστήματος Μεταφοράς Κύπρου |
| **CERA (ΡΑΕΚ)** | Energy Regulatory Authority | Ρυθμιστική Αρχή Ενέργειας Κύπρου |
| **ETEK (ΕΤΕΚ)** | Technical Chamber of Cyprus | Επιστημονικό Τεχνικό Επιμελητήριο Κύπρου |

### 1.2 Applicable Regulations

| Document | Description |
|----------|-------------|
| Distribution Rules (Κανόνες Διανομής) | DSO grid code requirements |
| Transmission Rules (Κανόνες Μεταφοράς) | TSO grid code requirements |
| Electricity Market Rules (Κανόνες Αγοράς Ηλεκτρισμού) | Market participation rules |
| Transitional Market Regulation Rules | Interim market operation |
| EN 50549-2 | Grid connection for generating plants |
| AS/NZS 4777.2:2020 | Alternative certification standard |

---

## 2. BESS SYSTEM CATEGORIES

### 2.0 Net Billing commercial terms (EAC Supply)

> **Separate from grid-connection rules.** Billing, export credit price, invoicing, and annual surplus forfeiture are governed by the **EAC Supply Net Billing Agreement** (Σύμβαση Συμψηφισμού Λογαριασμών), currently **V6 (23 Mar 2026)**.  
> Full summary: [`docs/dso/net-billing-terms-2026.md`](dso/net-billing-terms-2026.md)

### 2.1 Category A: Self-Consumption RES with Integrated BESS

> Net Billing / Net Metering systems

| Parameter | Requirement |
|-----------|-------------|
| Purpose | Increase self-consumption of RES energy |
| Grid Exchange | **NOT ALLOWED** - BESS must not exchange energy with grid |
| Charging Source | **RES only** - Cannot charge from grid |
| Maximum Single-Phase | **5.5 kVA** |
| Maximum Three-Phase | **11 kVA** |
| BESS Power Limit | ≤ RES installed capacity |
| Combined Power Limit | BESS + RES ≤ Maximum charging capacity of supply |
| Direction Sensor | **REQUIRED** - Energy flow direction sensor or smart meter |
| Off-Grid Operation | **NOT ALLOWED** |

### 2.2 Category B: RES with Integrated Storage (Hybrid)

> RES unit with storage where BESS capacity ≤ RES capacity

| Parameter | Requirement |
|-----------|-------------|
| BESS Max Power | **≤ RES installed capacity** |
| Max Discharge Capacity | **≤ 50% of RES installed capacity** |
| Combined Output | RES + BESS output ≤ RES installed capacity |
| Storage Capacity | **No limit** |
| Charging Source | **RES only** - Cannot charge from grid |
| Grid Discharge | **ALLOWED** - Per market dispatch schedule |
| SCADA Connection | **REQUIRED** for systems ≥ 120 kW |

### 2.3 Category C: Standalone Storage Facility (EAH)

> Storage facility where discharge capacity > RES capacity (or no RES). **Formally introduced in Edition 2026** — previously BESS required co-located RES; Category C enables pure battery-only grid connections.

| Parameter | Requirement |
|-----------|-------------|
| Grid Exchange | **ALLOWED** - Can charge from grid and discharge to grid |
| Charging Source | Grid and/or RES |
| Grid Discharge | **ALLOWED** - Per market dispatch schedule |
| SCADA Connection | **REQUIRED** for systems ≥ 120 kW **discharge capacity** |
| Connection Capacity | Based on **Maximum Discharge Capacity** (kW), not installed kWp |
| RES Component | Optional (does not count toward connection capacity) |
| Sizing Metric | **Μέγιστη Ικανότητα Αποφόρτισης** (Max Discharge Capacity) — new 2026 metric |

---

## 3. PROTECTION SETTINGS

### 3.1 Inverter Protection Settings (Mandatory)

| Protection Type | Parameter | Setting | Operate Time |
|-----------------|-----------|---------|--------------|
| **Undervoltage Stage 1** | Threshold | **0.9 Un** | **0.2 s** |
| **Overvoltage Stage 1** | Threshold | **1.1 Un** | **0.2 s** |
| **Underfrequency Stage 1** | Threshold | **47 Hz** | **0.2 s** |
| **Overfrequency Stage 1** | Threshold | **52 Hz** | **0.2 s** |
| **Loss of Mains** | Anti-islanding | **Active** | Activated |

### 3.2 Additional Protection (≥ 20 kWp)

For systems ≥ 20 kWp, an **external protection relay** must be installed with all protection settings per the RES Technical Guide.

### 3.3 Voltage Operating Range

| Voltage Level | Nominal | Min (continuous) | Max (continuous) |
|---------------|---------|------------------|------------------|
| LV (230V) | 230V | 207V (0.9 pu) | 253V (1.1 pu) |
| Vv1 (Q support start) | - | 212V | - |
| Vv2 (deadband start) | - | 223V | - |
| Vv3 (deadband end) | - | 237V | - |
| Vv4 (Q support max) | - | - | 246V |

### 3.4 Frequency Operating Range

| Condition | Frequency Range | Action |
|-----------|-----------------|--------|
| Normal Operation | **47.0 - 50.2 Hz** | No curtailment |
| LFSM-O Active | **50.2 - 51.2 Hz** | Active power reduction |
| BESS Transition | **50.7 Hz** | Switch to increased charging |
| Maximum Charging | **52.0 Hz** | Maximum charging rate |
| Trip | **< 47 Hz or > 52 Hz** | Disconnect within 0.2s |

---

## 4. REACTIVE POWER REQUIREMENTS

### 4.1 Power Factor Capability

| Parameter | Requirement |
|-----------|-------------|
| Minimum Power Factor | **0.9** (leading and lagging) |
| Minimum Q Capability | **43.6%** of rated apparent power |
| Q Range | **±40%** of rated S at voltage limits |

### 4.2 Q(U) Control Curve (Discharging Mode)

| Voltage (V) | Voltage (pu) | Reactive Power Q/Srated |
|-------------|--------------|-------------------------|
| 212V | 0.92 pu | **+40%** (supplying/capacitive) |
| 223V | 0.97 pu | 0% (deadband start) |
| 230V | 1.00 pu | 0% (reference) |
| 237V | 1.03 pu | 0% (deadband end) |
| 246V | 1.07 pu | **-40%** (absorbing/inductive) |

### 4.3 P(U) Control - Charging Mode

| Voltage (pu) | Charging Power |
|--------------|----------------|
| ≥ 0.93 pu (214V) | 100% |
| 0.90 - 0.93 pu | Linear reduction |
| < 0.90 pu (207V) | **0%** (stop charging) |

### 4.4 P(U) Control - Discharging Mode

| Voltage (pu) | Discharge Power |
|--------------|-----------------|
| ≤ 1.07 pu (246V) | 100% |
| 1.07 - 1.10 pu | Linear reduction |
| ≥ 1.10 pu (253V) | **0%** (stop discharging) |

---

## 5. FREQUENCY RESPONSE REQUIREMENTS

### 5.1 Overfrequency Response (LFSM-O)

| Parameter | Value |
|-----------|-------|
| Activation Threshold (fULCO) | **50.2 Hz** |
| Droop Rate | **100% PM per Hz** (10% per 0.1 Hz) |
| PM Definition | Active power at moment f exceeds 50.2 Hz |
| Operating Range | 50.2 Hz ≤ f ≤ 51.2 Hz |
| Recovery Rate | **10% PAmax per minute** |

### 5.2 BESS-Specific Frequency Response

| Frequency | BESS Charging Mode | BESS Discharging Mode |
|-----------|--------------------|-----------------------|
| 47 - 50.2 Hz | Normal operation | Normal operation |
| 50.2 - 50.7 Hz | Continue charging | Reduce discharge per droop |
| **50.7 Hz (ftransition)** | Start increasing charge | Switch to charging mode |
| 50.7 - 52 Hz | Increase to max charging | Maximum charging |
| **52 Hz (fPmin)** | Maximum charging rate | Maximum charging rate |

### 5.3 Underfrequency Response (Category C BESS)

For standalone BESS, the system should support grid frequency by **discharging** during low-frequency events (to be coordinated with TSO).

---

## 6. POWER QUALITY REQUIREMENTS

### 6.1 Harmonic Limits

| Parameter | Limit | Standard |
|-----------|-------|----------|
| **THDi (Current)** | **< 5%** of rated current | - |
| **DC Injection** | **< 1%** of rated current | - |

### 6.2 Voltage Change Limits

| Connection Level | Max Steady-State Voltage Change |
|------------------|--------------------------------|
| Low Voltage (LV) | **≤ 3%** |
| Medium Voltage (MV) | **≤ 2%** |

### 6.3 Short Circuit Contribution

- BESS inverter contribution: **1.0 - 1.2 pu** of rated current
- Must not exceed DSO network fault level capacity
- Short circuit withstand rating per Distribution Rules

---

## 7. SYNCHRONIZATION REQUIREMENTS

### 7.1 Grid Synchronization Conditions

| Parameter | Tolerance |
|-----------|-----------|
| Frequency | **±1%** of nominal (49.5 - 50.5 Hz) |
| Voltage | **±10%** of nominal (207V - 253V) |
| Phase Sequence | **Must match** |
| Phase Angle | **< 10%** deviation between phases |

### 7.2 Reconnection Requirements

| Parameter | Requirement |
|-----------|-------------|
| Reconnection Delay | **3 minutes** after grid restoration |
| Power Ramp Rate | **10% PAmax per minute** |
| Time to Full Power | **10 minutes** after reconnection |

---

## 8. SCADA REQUIREMENTS (≥ 120 kW)

### 8.1 Communication Protocol

| Parameter | Requirement |
|-----------|-------------|
| **Primary Protocol** | **IEC 60870-5-104** |
| Transport Layer | TCP/IP |
| Alternative Protocols | Modbus TCP, IEC 61850 (for internal use) |

### 8.2 Communication Options

| Type | Description | Monthly Cost |
|------|-------------|--------------|
| **M2M (2G/4G)** | Mobile network connection | ~€15/month |
| **E-LINE** | Ethernet point-to-point | Provider rates |
| **Fiber Optic** | EAC private network (if available) | €25/month |

### 8.3 Required SCADA Points - Active Power Control

| Signal Type | Description | Address |
|-------------|-------------|---------|
| **Setpoint** | Active Power Setpoint | 30 |
| **Feedback** | Setpoint Feedback (IEEE 754) | 503 |
| **Status** | Command Accepted/Rejected | 103 |

### 8.4 Required SCADA Points - Reactive Power Control

| Signal Type | Description | Address |
|-------------|-------------|---------|
| **Setpoint** | Reactive Power Setpoint | 31 |
| **Feedback** | Setpoint Feedback (IEEE 754) | 504 |
| **Status** | Command Accepted/Rejected | 104 |

### 8.5 Discrete Active Power Commands

| Command | Power Level |
|---------|-------------|
| Level 1 | **100%** of installed capacity |
| Level 2 | **60%** of installed capacity |
| Level 3 | **30%** of installed capacity |
| Level 4 | **0%** (Zero Export) |

### 8.6 Control Response Requirements

| Parameter | Requirement |
|-----------|-------------|
| Command Acknowledgment | **≤ 3 seconds** |
| Power Adjustment Time | **≤ 1 minute** |
| Setpoint Command Frequency | **≥ 20 seconds** between commands |
| Control Accuracy | **±2%** of setpoint |

### 8.7 Required Measurements

| Category | Measurements |
|----------|-------------|
| **Electrical** | P, Q, S, V, I, f, PF, cos φ |
| **BESS Specific** | SOC, SOH, Temperature, Charge/Discharge Status |
| **Protection** | Relay status, Trip indications |
| **Environmental** | Irradiance, Temperature (for hybrid systems) |

---

## 9. ZERO EXPORT OPERATION

### 9.1 Permanent Zero Export

| Parameter | Requirement |
|-----------|-------------|
| Charging Window | **08:00 - 18:00** daily |
| Discharging Window | **18:00 - 24:00** daily |
| Grid Export | **0 kW** at all times |
| Control Method | Local Export Limitation Scheme |

### 9.2 Occasional Zero Export

| Capacity | Control Method |
|----------|----------------|
| ≤ 120 kW | **Remote control receiver** (second receiver required) |
| > 120 kW | **SCADA control** |

---

## 10. CERTIFICATION REQUIREMENTS

### 10.1 Inverter/PCS Certification

| Standard | Description | Status for Kehua |
|----------|-------------|------------------|
| **EN 50549-2** | Grid connection for generating plants | ✅ Claimed |
| AS/NZS 4777.2:2020 | Alternative (Australian/NZ) | ✅ Alternative |
| IEC 62477-1 | Safety requirements for PCS | ✅ Claimed |
| IEC 61000-6-2 | EMC immunity | ✅ Claimed |
| IEC 62116 | Anti-islanding test | ✅ Claimed |
| IEC 61727 | PV system characteristics | ✅ Claimed |

### 10.2 Required Documentation for DSO Application

| Document | Description |
|----------|-------------|
| Single Line Diagram | Complete electrical SLD |
| Protection Settings | All relay settings and coordination |
| Inverter Datasheets | Per DSO Appendix I parameters |
| Certification Copies | EN 50549 or AS/NZS 4777.2 certificates |
| SCADA Point List | All IEC 104 addresses and data types |
| Site Layout | Equipment placement and dimensions |
| Foundation Design | Structural requirements |
| Cable Specifications | All power and control cables |

---

## 11. DSO APPLICATION PARAMETERS (APPENDIX I)

### 11.1 General Information

| # | Parameter | Greek | Required Value |
|---|-----------|-------|----------------|
| 1 | EAC File Number | Αριθμός Φακέλου ΑΗΚ | - |
| 2 | Installation Address | Διεύθυνση εγκατάστασης | - |
| 3 | Post Code | Ταχυδρομικός Τομέας | - |
| 4 | Town/Village | Πόλη/Χωριό | - |
| 5 | District | Επαρχία | - |
| 6 | System Coupling | Συνδεσμολογία | AC/DC |

### 11.2 Battery Parameters

| # | Parameter | Greek | Unit |
|---|-----------|-------|------|
| 7 | Battery Manufacturer | Κατασκευαστής Μπαταρίας | - |
| 8 | Battery Model | Μοντέλο Μπαταρίας | - |
| 9 | Battery Serial Number | Αριθμός Σειράς | - |
| 10 | Battery Base Material | Υλικό Βάσης | LFP |
| 11 | Battery Technology | Τεχνολογία | Lithium Iron Phosphate |
| 12 | Nominal Capacity | Χωρητικότητα | kWh |
| 13 | Max Output Power | Μεγίστη Ισχύς Εξόδου | kW |
| 14 | Battery Efficiency | Απόδοση Μπαταρίας | % |
| 15 | Cycle Life | Αριθμός Κύκλων | cycles |
| 16 | Calendar Life | Διάρκεια Ζωής | years |
| 17 | Depth of Discharge | Βάθος Αποφόρτισης | % |
| 18 | Max Charge/Discharge Current | Μέγιστο Ρεύμα | A |
| 19 | Batteries in Series | Μπαταρίες σε σειρά | - |
| 20 | Batteries in Parallel | Μπαταρίες παράλληλα | - |

### 11.3 Inverter/PCS Parameters

| # | Parameter | Greek | Unit |
|---|-----------|-------|------|
| 21 | Inverter Manufacturer | Κατασκευαστής Μετατροπέα | - |
| 22 | Inverter Model | Μοντέλο Μετατροπέα | - |
| 23 | Inverter Serial Number | Αριθμός Σειράς | - |
| 24 | Round Trip Efficiency | Συνολική Απόδοση | % |
| 25 | Number of Phases | Αριθμός Φάσεων | 3 |
| 26 | Short Circuit Current | Ρεύμα Βραχυκύκλωσης | A |
| 27 | Rated Power | Ονομαστική Ισχύς | kVA |
| 28 | Rated Output Current | Ονομαστικό Ρεύμα | A |
| 29 | THD | Αρμονική Παραμόρφωση | % |
| 30 | Power Factor Setting | Συντελεστής Ισχύος | - |
| 31 | Certification | Πιστοποίηση | EN 50549 |
| 32 | Compatible Batteries | Συμβατές Μπαταρίες | - |
| 33 | Number of Inverters | Αριθμός Μετατροπέων | - |

---

## 12. LINYANG/KEHUA COMPLIANCE STATUS

### 12.1 Protection Settings Compliance

| Requirement | Kehua BCS1250K | Status |
|-------------|----------------|--------|
| Undervoltage 0.9Un / 0.2s | Configurable | ✅ Verify settings |
| Overvoltage 1.1Un / 0.2s | Configurable | ✅ Verify settings |
| Underfrequency 47Hz / 0.2s | Configurable | ✅ Verify settings |
| Overfrequency 52Hz / 0.2s | Configurable | ✅ Verify settings |
| Active Anti-Islanding | Supported | ✅ Available |

### 12.2 Power Quality Compliance

| Requirement | Kehua BCS1250K | Status |
|-------------|----------------|--------|
| THDi < 5% | **< 3%** | ✅ Exceeds requirement |
| DC Injection < 1% | Per EN 50549 | ⚠️ Verify certificate |
| Power Factor > 0.99 | **> 0.99** | ✅ Compliant |
| PF Range ±0.9 | **-1 to +1** | ✅ Exceeds requirement |

### 12.3 Communication Compliance

| Requirement | Kehua BCS1250K | Status |
|-------------|----------------|--------|
| IEC 60870-5-104 | Modbus TCP/IEC 61850/IEC 104 | ✅ Supported |
| Setpoint Control | Supported | ✅ Available |
| Response < 3s | Millisecond response | ✅ Compliant |

### 12.4 Linyang BESS Certifications (Updated January 2026)

> **Source**: EAC Compliance Documents - RFI Response December 2025

#### Cell Level (EVE MB31 314Ah)

| Certification | Status | Certificate | DSO Relevance |
|---------------|--------|-------------|---------------|
| UL 1973 | ✅ **Certified** | MH63503 | Safety baseline |
| UL 9540A | ✅ **Complete** | 4791099276 | Fire safety |
| UN 38.3 | ✅ **Passed** | 01112300005127 | Transport |

#### Module/Rack Level (LBR Series)

| Certification | Status | Certificate | DSO Relevance |
|---------------|--------|-------------|---------------|
| IEC 62619:2022 | ✅ **CB Cert** | BE-51213 | Battery safety |
| IEC 63056:2020 | ✅ **CB Cert** | SG SGS-00632 | Battery safety |
| UL 9540A Unit | ✅ **PASSED** | 80239432 | Fire safety - NO propagation |
| EN IEC 61000-6-2/6-4 | ✅ **Verified** | KSEM250100002701BAC | EMC |

#### Container Level (LY-Ocean Series)

| Certification | Status | Certificate | DSO Relevance |
|---------------|--------|-------------|---------------|
| EN 62477-1 / IEC 62040 | ✅ **Attested** | N8A 130105 0006 | LVD |
| EN IEC 61000-6-2/6-4 | ✅ **Certified** | E6A 130105 0005 | EMC |
| IEC 62933-5-2 | 🔄 **In Progress** | 704082542702-00 | **Grid Integration** |

#### Thermal Management (Kelvin BTMS)

| Certification | Status | Certificate | DSO Relevance |
|---------------|--------|-------------|---------------|
| EN 60204-1 / EN ISO 12100 | ✅ **Attested** | M7 122013 0012 | Machinery safety |
| EN IEC 61000-6-2/6-4 | ✅ **Certified** | E6A 122013 0013 | EMC |

### 12.5 Still Missing for Cyprus DSO (CRITICAL)

> ⚠️ **These are MANDATORY for EAC grid connection approval**

| Document | Standard | Status | Who | Priority |
|----------|----------|--------|-----|----------|
| **Grid Connection Certificate** | **EN 50549-2** | ❌ **MISSING** | Kehua (PCS) | 🔴 Critical |
| Anti-Islanding Test Report | IEC 62116 | ❌ Missing | Kehua (PCS) | 🔴 Critical |
| LVRT/HVRT Test Report | EN 50549-2 | ❌ Missing | Kehua (PCS) | 🔴 Critical |
| Frequency Response Curves | EN 50549-2 | ❌ Missing | Kehua (PCS) | 🟡 High |
| Q(U) Capability Curves | EN 50549-2 | ⚠️ Partial | Kehua (PCS) | 🟡 High |
| P(U) Capability Curves | EN 50549-2 | ❌ Missing | Kehua (PCS) | 🟡 High |
| Protection Settings Guide | EN 50549-2 | ❌ Missing | Kehua (PCS) | 🟡 High |
| IEC 60870-5-104 Point List | IEC 60870-5-104 | ❌ Missing | Linyang/Kehua | 🟡 High |
| IEC 61850 Conformance | IEC 61850 | ❌ Missing | Linyang | 🟢 Medium |

### 12.6 Certification Gap Analysis

| Category | DSO Requirement | Available | Gap |
|----------|-----------------|-----------|-----|
| **Battery Safety** | IEC 62619 | ✅ Yes | None |
| **Fire Safety** | UL 9540A | ✅ Yes (Unit PASSED) | None |
| **EMC** | IEC 61000-6-2/6-4 | ✅ Yes | None |
| **LVD** | EN 62477-1 | ✅ Yes | None |
| **Grid Integration** | IEC 62933-5-2 | 🔄 In Progress | 2-3 weeks |
| **Grid Connection** | EN 50549-2 | ❌ **NO** | **CRITICAL** |
| **SCADA** | IEC 60870-5-104 | ⚠️ Supported, no point list | Point list needed |
| **Transport** | UN 38.3 | ✅ Yes | None |

### 12.7 Action Required

1. **Immediate**: Request EN 50549-2 certificate from Kehua for BCS1250K-C-HUD PCS
2. **High Priority**: Request anti-islanding and LVRT/HVRT test reports from Kehua
3. **Pending**: Receive IEC 62933-5-2 certificate (expected within 2-3 weeks)
4. **Documentation**: Compile IEC 60870-5-104 point list for SCADA integration

---

## 13. TSO BESS REQUIREMENTS (ANNEX-II-Appendix-2)

> **Source**: TSO BESS Technical Specification (ANNEX-II-Appendix-2)

### 13.1 Performance Requirements (at PoC)

| Requirement | Value | Notes |
|-------------|-------|-------|
| **Round-Trip Efficiency (BoL)** | ≥ **80%** | At commissioning |
| **Round-Trip Efficiency (10-year)** | ≥ **75%** | Linear degradation accepted |
| **Standby Consumption** | ≤ **15%** of capacity/day | Includes HVAC, BMS, ready state |
| **Power Availability (EAF)** | ≥ **92%** | 2-year rolling average, first 10 years |
| **Duration** | **1-4 hours** | Based on technology/scheme |
| **Temperature Range** | **-10°C to +45°C** | No derating; 1000 W/m² solar considered |
| **Sub-second Response** | Required | From standby to max power |

### 13.2 Capacity & Degradation

| Requirement | Value |
|-------------|-------|
| **Minimum Capacity Retention** | 100% of guaranteed capacity for 10 years |
| **Augmentation Space** | ≥ 20% additional capacity area required |
| **Cycle Life** | ≥ 7,300 cycles (1 CPD × 20 years) |
| **Capacity Degradation** | < 20% over chronological lifetime |
| **DoD for RTE Calculation** | 100% (SoC 0% → 100% → 0%) |

### 13.3 Safety Requirements (Li-ion Containers)

| Requirement | Value |
|-------------|-------|
| **Container Spacing** | ≥ **1m** (general), ≥ **3m** (at access doors) |
| **Distance to Control Room** | ≥ **6m** |
| **Distance to Occupied Buildings** | ≥ **30m** |
| **Fire Access Road Width** | ≥ **5m** |
| **Container Wall Fire Resistance** | **1-hour** (or 6m spacing) |
| **Seismic Rating (ZPA)** | **3.55 m/s²** horizontal, **1.78 m/s²** vertical |
| **Corrosion Protection** | **C3 (medium)**, durability H (per ISO 12944) |

### 13.4 Fire Protection Requirements

| Requirement | Specification |
|-------------|---------------|
| **Fire Alarm** | Off-gas detectors (H2, CO, CO2, HC) + BMS signals |
| **Fire Suppression** | Water sprinkler ≥ **12.2 L/min/m²** OR aerosol/gas flooding |
| **Water Supply** | Permanent supply OR ≥ **20 m³** tank |
| **External Beacon** | Required on each battery container |
| **Pressure Relief Vents** | Required, not facing walkways |
| **UL 9540A Testing** | Cell, Module, Unit, **Installation level** required |

### 13.5 BMS Requirements

| Requirement | Specification |
|-------------|---------------|
| **Monitoring** | Temperature, voltage, current per module |
| **Protection (Rack Level)** | Isolation on overheating alarm |
| **Protection (Container Level)** | Isolation on thermal runaway detection |
| **Communication** | IEC 61850 and/or Modbus TCP/IP |
| **Self-Test** | Required with fault isolation |

### 13.6 EMS Requirements

| Requirement | Specification |
|-------------|---------------|
| **Web Access** | Internet portal + standard browser |
| **Forecasting** | ≥ 1 day ahead, 30-min resolution |
| **Modes** | Self-consumption, tariff optimization, peak shaving, load levelling |
| **Data Export** | Excel compatible |
| **Data Resolution** | ≥ 1-minute |
| **Historical Storage** | Full operation period |
| **Protocols** | IEC 61850, Modbus TCP/IP |

### 13.7 Grid Services Capability

| Service | Required |
|---------|----------|
| **FCR (Primary Control)** | ✅ Yes |
| **aFRR (Secondary Control)** | ✅ Yes |
| **Instantaneous Reserve** | ✅ Yes |
| **Frequency Support** | ✅ Yes |

---

## 14. DOCUMENT SOURCES

| Document | Description | Status |
|----------|-------------|--------|
| DSO - Technical Guide for Storage - Edition 2025.1 | Main DSO requirements | ✅ Complete |
| Appendix I - Parameter Form | DSO application parameters | ✅ Complete |
| Appendix II - SCADA for RES+BESS ≥120kW | SCADA requirements (hybrid) | ✅ Complete |
| Appendix III - SCADA for Standalone BESS ≥120kW | SCADA requirements (standalone) | ✅ Complete |
| Appendix IV - Typical SLDs | Single line diagrams | 🔄 Pending |
| **TSO BESS - ANNEX-II-Appendix-2** | TSO technical specification | ✅ **Complete** |
| Τεχνικες Οδηγιες για λειτουργία ΣΑΗΕ | DSO Technical Guidelines (Greek) | ✅ **Complete** |
| Kανόνες Μεταφοράς και Διανομής 4.0.0 | Transmission & Distribution Rules | ⚠️ Reference only |

---

## 15. LINYANG COMPLIANCE WITH TSO REQUIREMENTS

| TSO Requirement | Linyang/Kehua | Status |
|-----------------|---------------|--------|
| RTE ≥ 80% | **86.32%** full system AC-AC RTE | ✅ Compliant |
| RTE ≥ 75% (10-year) | ~82% estimated | ✅ Compliant |
| Standby ≤ 15%/day | ~2% aux power | ✅ Compliant |
| Availability ≥ 92% | **97%** with LTSA | ✅ Exceeds |
| Duration 1-4 hours | **4-hour** systems | ✅ Compliant |
| Cycle Life ≥ 7,300 | **6,000-8,000** cycles | ✅ Compliant |
| Degradation < 20% | ~30% @ 20 years | ⚠️ Augmentation needed |
| Temperature -10 to +45°C | **-35 to +55°C** | ✅ Exceeds |
| Seismic 3.55 m/s² | Not verified | ⚠️ Request data |
| UL 9540A Installation | Unit level PASSED | ⚠️ Installation pending |
| IEC 62933-5-2 | Testing complete | 🔄 Certificate pending |
| FCR/aFRR Support | Millisecond response | ✅ Capable |
| IEC 61850 | Supported | ✅ Available |
| IEC 60870-5-104 | Supported | ⚠️ Point list needed |

---

## 16. RES CONNECTION REQUIREMENTS (Technical Guide 2023.2)

> **Source**: ΤΕΧΝΙΚΟΣ ΟΔΗΓΟΣ - ΣAAΗ ΕΚΔΟΣΗ 2023.2 (September 2023)
> **Scope**: RES systems up to 8MWp connected to distribution network

### 16.1 Applicable Standards

| System Size | Primary Standard | Additional Standards |
|-------------|-----------------|---------------------|
| **< 120kWp** (LV) | VDE-AR-N 4105:2018-11 | IEC 60364, EN 50160 |
| **120kWp - 8MWp** (MV) | VDE-AR-N 4110:2018-11 | BDEW 2008, IEC 60364, EN 50160 |

### 16.2 Protection Settings (Table 1 - MANDATORY)

| Protection | Setting | Trip Time |
|------------|---------|-----------|
| **Undervoltage U<** (< 10.4kWp) | 0.8 Un | 200ms |
| **Undervoltage U<** (≥ 10.4kWp) | 0.9 Un | Per LVFRT curve (1.5s) |
| **Overvoltage U>** (< 10.4kWp) | 1.10 Un (440V) | 200ms |
| **Overvoltage U>** (≥ 10.4kWp) | 1.15 Un (460V) | 200ms |
| **Underfrequency f<** | **47.0 Hz** | 200ms |
| **Overfrequency f>** | **51.5 Hz** | 200ms |
| **Anti-Islanding (LoM)** | DIN VDE 0126-1-1 | 200-1000ms |
| **DC Injection** | < 1% of In | < 200ms |
| **THDi** | < 5% | Per datasheet |

### 16.3 Reconnection Requirements

| Parameter | Value |
|-----------|-------|
| **Minimum Delay** | ≥ **180 seconds** (3 minutes) |
| **Ramp Rate** | ≤ **10% PAmax per minute** |
| **Full Recovery Time** | ~13 minutes (from 0% to 100%) |

### 16.4 Frequency Response (LFSM-O)

| Frequency Range | Action | Gradient |
|-----------------|--------|----------|
| **47.0 - 50.2 Hz** | Normal operation | - |
| **50.2 - 51.2 Hz** | Power reduction | **10% PM per 0.1 Hz** (100% PM/Hz) |
| **> 51.5 Hz** | Disconnect | 200ms |
| **< 47.0 Hz** | Disconnect | 200ms |

> PM = Active power at moment frequency exceeds 50.2Hz

### 16.5 Power Factor Requirements

| Mode | Requirement |
|------|-------------|
| **Range** | 0.90 capacitive to 0.90 inductive |
| **Reactive Power** | ±40% of Srated at rated power |
| **Control Method** | Q(U), P(cosφ), or fixed PF |

### 16.6 Voltage Response (Q(U) Mode)

| Voltage | Reactive Power |
|---------|----------------|
| < 0.92 pu (212V) | +40% Q (supplying) |
| 0.92 - 0.97 pu | Linear ramp |
| 0.97 - 1.03 pu | **Deadband** (0% Q) |
| 1.03 - 1.08 pu | Linear ramp |
| > 1.08 pu (246V) | -40% Q (absorbing) |

### 16.7 SCADA/Telemetry Requirements by Size

| System Size | SCADA | Ripple Control | Power Quality Recorder |
|-------------|-------|----------------|------------------------|
| **< 120kWp** | ❌ Not required | ✅ Required | ❌ Not required |
| **120kWp - 499kWp** | ✅ **Required** | ❌ N/A | ✅ Required |
| **500kWp - 8MWp** | ✅ **Required** | ❌ N/A | ✅ Required |

### 16.8 LVFRT Requirement (MV Connection via Transformer)

| Time | Voltage Must Withstand |
|------|------------------------|
| 0 - 150ms | **0% Un** (zero voltage) |
| 150ms - 700ms | Linear recovery to 0.85 Un |
| 700ms - 1.5s | 0.85 Un |
| > 1.5s | ≥ 0.9 Un |

> **Note**: Systems must provide reactive current support during fault period.

### 16.9 Harmonic Limits

| Parameter | MV Connection | LV Connection |
|-----------|---------------|---------------|
| **THDv** (Voltage) | < **2%** | < **2.5%** |
| **THDi** (Current) | < **5%** | < **5%** |

### 16.10 Short Circuit Levels

| Voltage Level | Max Short Circuit Current (kA rms) |
|---------------|-----------------------------------|
| LV 400V | 35.5 kA |
| MV 11kV | 20 kA |
| MV 22kV | 20 kA |

### 16.11 Insulation Levels

| Equipment | AC Withstand (kV) | Impulse (kV) |
|-----------|-------------------|--------------|
| LV | 0.6 | - |
| 11kV Outdoor | 28 | 95 |
| 11kV Indoor | 28 | 75 |
| 22kV | 50 | 125 |

---

## 17. LINYANG/KEHUA COMPLIANCE WITH RES REQUIREMENTS

| Requirement | DSO Spec | Linyang/Kehua | Status |
|-------------|----------|---------------|--------|
| **Undervoltage U<** | 0.9 Un | Configurable | ✅ |
| **Overvoltage U>** | 1.15 Un | Configurable | ✅ |
| **Underfrequency f<** | 47.0 Hz | Configurable | ✅ |
| **Overfrequency f>** | 51.5 Hz | Configurable | ✅ |
| **Anti-Islanding** | VDE 0126-1-1 | Active LoM | ✅ |
| **Power Factor Range** | 0.9 lead/lag | 0.85 - 1.0 | ✅ |
| **Q(U) Control** | Required | Supported | ✅ |
| **LFSM-O (50.2Hz)** | 10%/0.1Hz | Configurable | ✅ |
| **Reconnection Delay** | ≥ 180s | Configurable | ✅ |
| **Ramp Rate** | ≤ 10%/min | Configurable | ✅ |
| **LVFRT** | 0V for 150ms | VDE compliant | ✅ |
| **THDi** | < 5% | < 3% | ✅ |
| **DC Injection** | < 1% | < 0.5% | ✅ |
| **IEC 61850** | Required (>120kW) | Supported | ✅ |
| **IEC 60870-5-104** | Required (>120kW) | Supported | ⚠️ Point list needed |
| **EN 50549-2** | Grid code cert | **MISSING** | ❌ CRITICAL |

---

## 18. BUILDING & PLANNING PERMIT EXEMPTIONS (Κ.Δ.Π. 15 & 17/2026)

> **Source**: Κ.Δ.Π. 15/2026 and Κ.Δ.Π. 17/2026, Official Gazette No. 5992, January 16, 2026
> **Laws**: N. 180(I)/2025, N. 181(I)/2025, N. 227(I)/2025 (Road and Building Regulations)
> **Replaces**: Κ.Δ.Π. 215/2025 (revoked)

### 18.1 Scope of Exemption

BESS installations within licensed RES (solar) stations are **exempt from building and planning permits** provided all conditions are met. The exemption covers:

- Energy storage systems installed within existing RES power stations
- Data centers installed within RES power stations
- The building permit is **deemed issued** (θεωρείται εκδοθείσα) when conditions are met

### 18.2 General Conditions (Γενικοί Όροι)

| # | Requirement | Greek | Linyang Compliance |
|---|-------------|-------|-------------------|
| 1 | BESS installed on land with existing licensed RES project | Εντός τεμαχίου με αδειοδοτημένο έργο ΑΠΕ | ✅ Per project |
| 2 | **NO-GO ZONES** - Not within: Protected monuments, Controlled Areas, Archaeological Zones, Protected Trees, Airport Zone, Heliport areas, Military zones, Geological Zones 00/00Α | Απαγορευμένες ζώνες | ⚠️ Site verification |
| 3 | BESS is auxiliary/supplementary to main RES installation | Βοηθητική χρήση | ✅ By design |
| 4 | **BESS rated power ≤ RES rated power** | Ονομαστική ισχύς BESS ≤ ισχύς ΑΠΕ | ✅ Per project |

> ⚠️ **CRITICAL (Confirmed Jan 2026)**: PCS **nameplate capacity** must be ≤ RES licensed capacity. **Software limiting is NOT allowed** - physical installed PCS rating must match or be lower than the park's licensed MW capacity.
| 5 | Data center max power ≤ RES rated power | Μέγιστη ζήτηση ΚΔ ≤ ισχύς ΑΠΕ | N/A |
| 6 | **Max height 3m** (including supports, roof HVAC) | Μέγιστο ύψος 3μ | ✅ 2.896m container |
| 7 | Neutral/earth-tone colors (no bright colors or reflective materials) | Ουδέτερες γήινες αποχρώσεις | ⚠️ Specify in order |
| 8 | Minimal concrete paving | Περιορισμένη τσιμεντόστρωση | ✅ Per design |
| 9 | No impact on road planning/widening | Μη επηρεασμός οδικού δικτύου | ✅ Per design |
| 10 | No alteration of topography/ground levels | Μη αλλοίωση τοπογραφίας | ✅ Per design |
| 11 | Siting must not alter area character or cause visual disturbance | Μη οπτική όχληση | ✅ Per design |
| 12 | **Minimum 6m from all plot boundaries** | Ελάχιστη απόσταση 6μ | ✅ Per design |
| 13 | No substantial impact on neighboring properties | Μη επηρεασμός γειτονικών | ✅ Per design |
| 14 | No impact on water infrastructure | Μη επηρεασμός υδατικών έργων | ✅ Per design |
| 15 | No impact on third-party rights | Μη επηρεασμός δικαιωμάτων τρίτων | ✅ Per project |
| 16 | Co-owner consent if shared ownership | Συγκατάθεση συνιδιοκτητών | ✅ Per project |
| 17 | Compliance with all applicable laws and Development Plans | Τήρηση νομοθεσίας | ✅ Full compliance |

### 18.3 Fire Service Conditions (Όροι Πυροσβεστικής)

| # | Requirement | Greek | Linyang Compliance |
|---|-------------|-------|-------------------|
| 18 | **6m fire access perimeter** for fire vehicles | Πρόσβαση 6μ περιμετρικά | ✅ Per design |
| 19 | Construction, position, distances, fire suppression per **international standards** | Διεθνή αναγνωρισμένα πρότυπα | ✅ UL 9540A, IEC 62933-5-2 |
| 20 | Dry vegetation clearance inside installation | Αποψίλωση ξηρής βλάστησης | ✅ Per maintenance |
| 21 | Planting limited to 1m height/width from fence | Χαμηλή βλάστηση ≤1μ | ✅ Per landscaping |

> **Note**: Additional fire conditions in Κ.Δ.Π. 17/2026 Appendix I include:
> - Fire-break zone around site (width per vegetation height)
> - Fire hydrants if water network available
> - Water hose reels if previously required
> - Portable fire extinguishers (quantity/type per Fire Service)

### 18.4 Environment Department Conditions (Όροι Τμήματος Περιβάλλοντος)

| # | Requirement | Greek | Linyang Compliance |
|---|-------------|-------|-------------------|
| 22 | BESS within development limits, not in prohibited zones per environmental report | Εντός ορίων ανάπτυξης | ✅ Per design |
| 23 | No discharge of polluting substances without permit | Απαγόρευση ρύπανσης | ✅ Contained system |
| 24 | **Reinforced concrete foundation** required | Βάση οπλισμένου σκυροδέματος | ✅ Per design |
| 25 | **HVAC system required**; F-gas compliance (Law 46(I)/2017, Κ.Δ.Π. 335/2018) | Κλιματισμός + F-gas | ✅ Liquid cooling |
| 26 | Regular inspection/maintenance program (weekly/monthly) | Πρόγραμμα συντήρησης | ✅ LTSA includes |
| 27 | **Battery recycling** in licensed facilities (Cyprus or EU) | Ανακύκλωση μπαταριών | ✅ Lighthief EOL program |
| 28 | All exports need Environment Dept approval + permits | Άδεια εξαγωγής | ✅ EOL procedure |
| 29 | Site restoration after decommissioning | Αποκατάσταση χώρου | ✅ EPC includes |
| 30 | Waste handling per Waste Laws 2011-2022 | Διαχείριση αποβλήτων | ✅ Per regulations |
| 31 | Decommissioning works confined to project site | Εργασίες εντός χώρου | ✅ Per contract |

### 18.5 Labour Inspection Conditions (Όροι Τμήματος Εργασίας)

| # | Requirement | Greek | Linyang Compliance |
|---|-------------|-------|-------------------|
| 32 | **Written Risk Assessment** must include battery-related risks | Γραπτή Εκτίμηση Κινδύνου | ✅ Per project |
| 33 | Risk assessment based on **manufacturer specifications**, prepared by certified ΕΞΥΠΠ/ΕΣΥΠΠ engineer | Προδιαγραφές κατασκευαστή | ✅ Linyang manuals |

### 18.6 Required Documentation (Παράρτημα ΙΙ)

Before commencing works, the **Responsible Engineer Declaration** (Υπεύθυνη Δήλωση Μελετητή) must be submitted to the competent authority via email (transitional) or IPPODAMOS system.

| Document | Description |
|----------|-------------|
| 1 | Applicant details, authorized representative, licensed engineer (ETEK registration) |
| 2 | Property details (cadastral data, existing RES licenses) |
| 3 | Confirmation of compliance with all decree conditions |
| 4 | Responsible declaration with ETEK number and professional liability insurance |
| 5 | Certificate of immovable property registration |
| 6 | Informal cadastral plan showing BESS location |
| 7 | Co-owner consent form (if applicable) |
| 8 | Copy of Planning/Building Permit for existing RES installation |
| 9 | ETEK professional liability insurance certificate |
| 10 | **Site Layout Plan** showing: licensed installation, proposed BESS, distances from boundaries, ground levels |
| 11 | Photographs of site with existing RES and proposed BESS location |

### 18.7 Compliance Verification

| Aspect | Linyang Power Atlantic | Status |
|--------|----------------------|--------|
| **Height** (max 3m) | 2.896m (20HC container) | ✅ Compliant |
| **Boundary setback** (min 6m) | Per site design | ✅ Per project |
| **Fire access** (6m perimeter) | Per site design | ✅ Per project |
| **Concrete foundation** | Required by Linyang specs | ✅ Compliant |
| **HVAC/cooling** | 45kW liquid cooling included | ✅ Compliant |
| **Fire suppression** | Aerosol + backup (UL 9540A certified) | ✅ Compliant |
| **Recycling plan** | Lighthief EOL program 2026 | ✅ Available |
| **Color specification** | Specify neutral colors in PO | ⚠️ Order requirement |

### 18.8 Important Notes

1. **Permit Deemed Issued**: The building permit is automatically deemed issued when all conditions are met and the Responsible Engineer Declaration is submitted
2. **Violation**: If conditions are violated, the permit automatically ceases to be valid and the authority may take enforcement action
3. **Inspection**: The competent authority may inspect the installation at any time
4. **ETEK Professional Liability**: The responsible engineer must have valid professional liability insurance

---

## 19. NEW REQUIREMENTS — APRIL 2026 EDITION

> **Source**: EAC Technical Guide for Storage Systems, Edition 2026 (April 2026)
> These items were introduced or formally defined for the first time in the 2026 edition.

### 19.1 ΔΕΑΗ — Storage Installation Manager (New Legal Role)

The 2026 framework introduces a legally distinct **ΔΕΑΗ (Διαχειριστής Εγκατάστασης Αποθήκευσης Ηλεκτρισμού)** — the operator/manager of the storage installation — separate from the owner (**ΙΕΑΗ**).

| Aspect | Detail |
|--------|--------|
| Pre-connection obligations | Fall on **ΙΕΑΗ** (owner) |
| Post-connection grid compliance | Falls on **ΔΕΑΗ** (manager/operator) |
| Same entity allowed | Yes — ΙΕΑΗ and ΔΕΑΗ can be the same person/company |
| Hybrid systems | Owner of BESS and owner of RES **must** be the same entity (shared connection point) |
| Relevance to Lighthief | O&M operator (Lighthief) can be registered as ΔΕΑΗ, taking on grid compliance responsibility |

### 19.2 Island Mode Operation (New — Annex V)

Full new annex covering **Απομονωμένη Λειτουργία (Island Mode)** for grid-connected installations.

| Parameter | Requirement |
|-----------|-------------|
| Definition | Premises isolate from distribution network and operate solely on BESS/generator |
| Approval | Requires explicit EAC/DSO written permission per site |
| Anti-islanding | Special protection coordination required |
| Use case | Backup power, resilience — valuable feature to offer clients |

### 19.3 IT Grounding Retrofit (New — Annex IV)

New technical annex for **adding BESS to existing PV parks** where the storage system uses a different grounding scheme (I.T.) than the existing installation. Provides a formal technical pathway for BESS retrofits onto operating PV parks.

### 19.4 NBIoT Remote Control (New Technology)

Remote control receiver (mandatory on all systems regardless of size) now supports:
- Traditional **ripple control** (existing)
- **Narrow Band IoT (NBIoT)** — new option in 2026

DSO selects which technology to deploy; producer installs compatible receiver.

### 19.5 DSO Dispatch Rights — Charge/Discharge Mode (Clarified 2026)

Annex A-2, §21 explicitly states:

> The DSO/TSO has the right to **switch BESS operation from charging to discharging and vice versa** at any time for grid stability — not just curtail output.

This must be disclosed to clients. EAC can command a 5MW BESS to stop charging and start discharging (or vice versa) independently of the owner's market schedule.

### 19.6 Zero-Injection Modes (Formally Defined 2026)

| Mode | Greek | Behaviour |
|------|-------|-----------|
| **Permanent zero-injection** | Λειτουργία μόνιμης μηδενικής έγχυσης | Never exports to grid under any circumstances |
| **Occasional zero-injection** | Λειτουργία περιστασιακής μηδενικής έγχυσης | Zero export only during specific DSO-instructed periods |

### 19.7 DIgSILENT PowerFactory Modelling Requirement (New)

For connection applications above certain thresholds (triggered by DSO), the applicant must submit:

| Deliverable | Specification |
|-------------|---------------|
| Static model | Load flow analysis capable |
| Dynamic model | RMS analysis, protection system modelling |
| Format | DIgSILENT PowerFactory `.pfd` — latest version compatible |
| Deadline | Within 4 months (ΠΔ1.4) of DSO request |

**Impact on Dino-type 5MW applications**: EAC will almost certainly request this. Add to project cost/timeline.

### 19.8 Connection Process Fees (April 2024 Process Document)

| Category | Fee |
|----------|-----|
| Producers ≤ 50 kW | €150 application fee |
| Producers > 50 kW | €300 application fee |
| ΠΟΣ acceptance deposit | 5% of preliminary connection cost (non-refundable if final offer rejected) |

---

## 20. REVISION HISTORY

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-25 | 1.0 | Initial document from DSO Technical Guide 2025.1 analysis | AI Assistant |
| 2026-01-23 | 1.1 | Added comprehensive Linyang certification status from 18 EAC compliance documents. UL 9540A Unit PASSED, IEC 62619/63056 CB Certs, EMC/LVD complete. EN 50549-2 identified as CRITICAL gap. | AI Assistant |
| 2026-01-23 | 1.2 | Added TSO BESS Technical Specification (ANNEX-II-Appendix-2): RTE, availability, safety, fire protection, BMS/EMS requirements. Added Linyang TSO compliance matrix. | AI Assistant |
| 2026-01-23 | 1.3 | Added RES Connection Requirements from Technical Guide 2023.2 (ΣAAΗ): Protection settings, LFSM-O (10%/0.1Hz), Q(U) control, LVFRT, SCADA thresholds (≥120kWp), reconnection (180s + 10%/min ramp). Added Linyang compliance matrix. | AI Assistant |
| 2026-01-23 | 1.4 | **Added Κ.Δ.Π. 15/2026 and Κ.Δ.Π. 17/2026** (Official Gazette 5992, 16 Jan 2026): Building/Planning permit exemptions for BESS in RES stations. 33 conditions covering general, fire, environment, and labour requirements. Replaces Κ.Δ.Π. 215/2025. | AI Assistant |
| 2026-04-28 | 1.5 | **Updated to EAC Technical Guide Edition 2026 (April 2026).** Added: Category C formally open for standalone BESS (no RES required); ΔΕΑΗ (Storage Manager) legal role; Island Mode Operation (Annex V); IT Grounding retrofit (Annex IV); NBIoT remote control; explicit DSO charge/discharge dispatch rights; permanent vs. occasional zero-injection mode definitions; DIgSILENT PowerFactory modelling requirement; April 2024 connection process fees. | Lighthief |
| 2026-05-19 | 1.6 | Cross-link to new net-billing commercial terms README (EAC Supply Agreement V6, Mar 2026). | Lighthief |

---

## NEXT STEPS

### Completed ✅
- [x] Extract all available Linyang certifications from RFI response
- [x] Map certifications to Cyprus DSO requirements
- [x] Identify critical gaps (EN 50549-2)
- [x] Update compliance status in linyang.md

### Pending 🔄
1. **Request EN 50549-2 from Kehua** - Critical for EAC approval
2. **Receive IEC 62933-5-2 certificate** - Expected within 2-3 weeks
3. **Complete Appendix III & IV** extraction from DSO guide
4. **Compile IEC 60870-5-104 point list** for SCADA integration
5. **Prepare DSO application template** with pre-filled Linyang parameters
