# Technical Notes — AE Solar / DMSH Geelvloer BESS (South Africa)

> **INTERNAL USE ONLY — NOT FOR CLIENT**
> **Date:** 5 March 2026
> **Project:** DMSH Geelvloer Facility — Utility-Scale Solar + BESS Hybrid
> **Location:** Northern Cape, South Africa

---

## 1. Client Details

| Field | Value |
|-------|-------|
| **Company** | AE Alternative Energy GmbH |
| **Contact** | Natalia Iniotaki — Business Development Manager |
| **Email** | natalia@ae-solar.com |
| **Phone** | +49 8231 97 82 68-0 |
| **Mobile** | +90 541 575 49 16 |
| **Address** | Messerschmittring 54, D-86343 Königsbrunn, Germany |
| **Website** | www.ae-solar.com |
| **Origin** | Met in person (Greece expansion discussion) |

---

## 2. Project Overview

| Parameter | Value |
|-----------|-------|
| **Project Name** | DMSH Geelvloer Facility |
| **Location** | Kenhardt area, Northern Cape, South Africa |
| **Grid Operator** | **Eskom** |
| **Solar Capacity** | 75 MWp |
| **BESS Power** | **12 MW** (Eskom final — March 2026) |
| **BESS Energy** | **48 MWh** (4-hour duration) |
| **C-Rate** | 0.25C |
| **Grid Connection** | **132 kV** (transmission level) |
| **System Fault Level** | **4.55 kA** at 132 kV (~1,040 MVA) |
| **Maximum Export Capacity (MEC)** | 65 MW |
| **Application** | Utility-scale solar + BESS hybrid plant |
| **BESS Purpose** | Grid stability, operational flexibility, partial energy shifting |
| **PPA** | With **Eskom** — expected signed end of March 2026 |
| **Project Type** | **Private IPP** (not REIPPPP) |
| **Storage Configuration** | AC-coupled |
| **Scope** | **Full EPC turnkey** (confirmed) |
| **Delivery Port** | **Cape Town** |
| **Target Delivery** | **August 2026 (Q3)** |
| **Local Content** | TBC during next development phase |
| **Development Stage** | **Grid connection secured** — Eskom Planning Report received March 2026 |

### Site & Environmental Conditions (Eskom Final)

| Parameter | Value |
|-----------|-------|
| **Altitude** | 916 m (consider air density for cooling/derating) |
| **Ambient Temperature Max** | **45°C** |
| **Ambient Temperature Min** | **-5°C** |
| **Pollution Level** | **Heavy** (Northern Cape semi-desert) |
| **Terrain Slope (max)** | **9.2% N-S** |

> **⚠️ ESKOM FINAL UPDATE (March 2026):** Eskom Planning Report received — grid connection and capacity allocation officially guaranteed. Project resized from 48 MW to **12 MW / 48 MWh (4h)**. All previous preliminary figures (36.5 MW, 48 MW) are superseded. System fault level 4.55 kA — all switchgear and protection must be rated accordingly. RatedPower drawings remain valid for topography, civil specs, container spacing, and internal MV/LV architecture only.
>
> **Previous updates (superseded):** 16 Mar — client confirmed 48 MW / 132 kV / MEC 65 MW / Eskom / EPC turnkey / Cape Town / August Q3. Natalia reply — PPA with Eskom, AC-coupled, private IPP.

---

## 3. RatedPower Preliminary Design (Client-Provided)

Extracted from RatedPower drawings (dated 2025-08-06, FOR INFORMATION ONLY):

### 3.1 BESS Specifications

| Parameter | Value |
|-----------|-------|
| **Rated Power** | 36.5 MW |
| **Rated Storage Capacity** | 50.0 MWh |
| **Hours of Discharge** | 1.37 h |
| **Number of Battery Containers** | 10 (AC BESS) |
| **Single Container Capacity** | 5.0 MWh |
| **Storage Inverter** | SINACON PV4560, 4560.0 kVA |
| **DC Input** | 919 V – 1500 Vdc |
| **Max DC-AC Efficiency** | 98.74% |
| **AC Output** | 4560.0 kVA / 4560.0 kWac, 630 V |
| **Number of Inverters** | 8 |
| **Power Conversion System** | 36.5 MVA, 0.63/33.0 kV |
| **Number of PCS** | 1 |
| **Apparent Power** | 36.5 MVA |
| **Power Factor (Storage Inverter)** | 1.000 |

### 3.2 Transformer & MV

| Parameter | Value |
|-----------|-------|
| **Transformer Rating** | 36.48 MVA |
| **Voltage** | 33.0 kV / 0.63 kV |
| **Vector Group** | Dyn11 |
| **Cooling** | ONAN |
| **Tap Changer** | 2.5%, 5%, 7.5%, 10% |
| **Short Circuit (Xcc)** | 0.08 |
| **MV Busbar** | 800 A, 25 kA, 36 kV, 50 Hz |
| **MV Cable (BA-1)** | 6×(1×300 mm²) Al XLPE, 20/35 kV, 64.23 m |

### 3.3 Container Dimensions

| Parameter | Value |
|-----------|-------|
| **Length** | 12.0 m |
| **Width** | 2.44 m |
| **Height** | 2.59 m |
| **Face-to-Face Spacing** | 4.0 m |
| **Side-to-Side Spacing** | 3.0 m |

### 3.4 Civil Works

| Parameter | Value |
|-----------|-------|
| **Earthworks Fill** | 1,917.15 m³ |
| **Earthworks Cut** | 1,204.77 m³ |
| **Fence Perimeter** | 164.96 m (2.0 m height, 3.0 m post spacing) |
| **MV Trench** | 800 × 1,000 mm, 64.23 m length, 51.39 m³ volume |
| **Cable** | 300 mm² Al XLPE, buried in trench (IEC 60502-2) |
| **Max Voltage Drop (MV)** | 0.50% |

### 3.5 Site

| Parameter | Value |
|-----------|-------|
| **City / Town** | Kaimoepslaagte |
| **Region** | Northern Cape |
| **Country** | South Africa |
| **Latitude** | -29.43° |
| **Longitude** | +20.13° |
| **Suitable Area** | 2.88 ha |
| **Altitude** | 916.27 m a.m.s.l. |
| **Timezone** | UTC +2 |
| **Coordinate System** | EPSG:32734 |
| **Elevation Data** | SRTM-30 (30 m resolution) |

---

## 4. Documents Received

| Document | Filename | Status |
|----------|----------|--------|
| BESS Layout | `RatedPower-DMSH Geelvloer Facility-517-BESS_LAYOUT.pdf` | ✅ Received |
| MV/LV Single Line Diagram | `RatedPower-DMSH Geelvloer Facility-517-BESS_MV_LV_SLD.pdf` | ✅ Received |
| Preliminary Technical Report | `RatedPower-DMSH Geelvloer Facility-517-BESS_REPORT.pdf` | ✅ Received |
| BESF Code v5.3 | `BESF_Code_Version_5.3.pdf` | ✅ Received — SA BESS grid code |
| SA Grid Code Network v10 | `SAGC-Network-Version-10.pdf` | ✅ Received — general network code |
| SA Grid Code RPP Rev 3.1 | `SAGC-Requirements-for-Renewable-Power-Plants-Rev-3.1.pdf` | ✅ Received — renewable plant code |

All documents in `client-docs/`. RatedPower report dated 2025-08-06 (13 pages). Grid codes researched 16 March 2026.

---

## 5. South African Grid Code Requirements

Based on three regulatory documents provided by client (all in `client-docs/`):
- **BESF Code v5.3** — Battery Energy Storage Facility Code
- **SAGC Network Code v10** — General network connection requirements
- **SAGC RPP Rev 3.1** — Requirements for Renewable Power Plants

### 5.1 Classification

| Code | Category | Basis |
|------|----------|-------|
| BESF Code | **Category B** (1–20 MW) | 12 MW BESS rated power (Eskom final) |
| RPP Code | **Category C** (≥ 20 MVA) | 75 MW solar at POC |

> **⚠️ NOTE:** At 12 MW, the BESS falls under BESF **Category B** (1–20 MW), not Category C (≥20 MW). However, the client states Eskom mandates "Full alignment with SA Grid Code Category C." This may be because the combined plant at the shared POC is Category C under the RPP code, or Eskom has imposed Category C requirements in the grid connection agreement. **We will design to Category C as instructed by client/Eskom.**

Both codes apply simultaneously — the BESS must independently comply with BESF v5.3, the solar must comply with RPP Rev 3.1, and a combined report is required at the shared POC.

### 5.2 Frequency Requirements

| Parameter | Value | Source |
|-----------|-------|--------|
| Nominal | 50 Hz | All codes |
| Continuous range | 49.0 – 51.0 Hz | BESF §5.1 |
| Over-freq curtailment starts | 50.5 Hz | RPP §6.1 |
| Trip threshold (high) | >51.5 Hz for >4 s | BESF §5.1 |
| Trip threshold (low) | <47.0 Hz for >200 ms | BESF §5.1 |
| Deadband | 49.85 – 50.15 Hz | BESF §6.3 |
| Droop (low/high freq mandatory) | 10% | BESF Table 5 |
| Droop (normal FSM) | 4% | BESF Table 5 |
| RoCoF withstand (BESF) | ±2.5 Hz/s (200 ms window) | BESF §5.1(6) |
| RoCoF withstand (Network) | 1.5 Hz/s | SAGC §3.1.1(12) |
| Frequency metering accuracy | ±10 mHz | BESF §6(3) |
| Setpoint response | 2 s commence, 10 s complete | BESF §6.3(6) |

All three frequency response modes (LFSM-U, LFSM-O, FSM) are **mandatory** for Category C.

### 5.3 Voltage & Reactive Power

| Parameter | Value | Source |
|-----------|-------|--------|
| Continuous voltage range (33 kV MV bus) | 0.90 – 1.08 pu (29.7 – 35.64 kV) | BESF Table 2 |
| POC voltage | **132 kV** (transmission level — Eskom) | Client confirmed |
| BESS Q capability | ±0.33 × Pn = **±3.96 MVAr** (PF 0.95, based on 12 MW) | BESF §8.2 |
| RPP Q capability at Pn | ±0.410 × Pn = **±30.75 MVAr** (PF 0.925) | RPP Fig 10b |
| Control modes (all mandatory Cat C) | Q control, PF control, V control | BESF §8.3 |
| Settling time | 10 – 30 seconds | BESF §8.3 |
| Voltage control accuracy | ±0.2% of rated voltage | BESF §8.3.4 |

### 5.4 Fault Ride-Through (FRT)

**LVRT (Category C, non-synchronous machines):**

| Time | Voltage at POC | Requirement |
|------|---------------|-------------|
| 0 – 150 ms | **0 pu (zero voltage)** | Must stay connected |
| 150 ms – 2.0 s | 0% → 85% (linear recovery) | Must stay connected + inject reactive current |
| 2.0 s → continuous | ≥ 85% → normal | Area A — normal operation |

**HVRT:** Must withstand **120% voltage for 2 seconds** (Category C only).

**During faults:**
- Reactive current injection within **±20% tolerance after 60 ms**
- Reactive power has **first priority** over active power
- Post-fault: active power recovery to **≥90% within 1 second**
- Phase jump tolerance: **20°** without disconnection

### 5.5 Active Power Control

| Parameter | Value | Source |
|-----------|-------|--------|
| Ramp rate range | 1% – 20% of Pn per minute | BESF §7.2 |
| Max ramp rate | 60 MW/min (unless agreed) | BESF §7.2 |
| Setpoint response | 2 s commence, 30 s complete | BESF §7.1 |
| Accuracy | ±2% of setpoint or ±0.5% Pn | BESF §7.1 |
| P_Delta reserve (PV exempted) | ≥3% of P_available | RPP §6.2(8) |

Note: PV is exempted from P_Delta, but BESS can offer it — competitive advantage for ancillary services.

### 5.6 Protection

| Requirement | Value | Source |
|-------------|-------|--------|
| Loss of Mains detection | < 2 seconds | BESF §10(5) |
| Vector shift relay | **Prohibited** | BESF §10(5) |
| Islanded operation | Not permitted (unless agreed with NSP) | BESF §10(5) |
| Fault clearance time (132 kV POC) | ≤ 100 ms | SAGC §4.12 |
| Protection dependability | ≥ 99% | SAGC §3.2.1(4) |
| Protection review cycle | Every 6 years | BESF A2.2.1 |

### 5.7 SCADA & Communication

| Requirement | Value | Source |
|-------------|-------|--------|
| Protocol (BESF) | IEC 60870-5-101/104, DNP3, or IEC 61850 | BESF §12.2.1 |
| Protocol (RPP at transmission) | **IEC 60870-5-101** | RPP §13.4.2.1 (TS connection) |
| Gateway availability | 99.99% | BESF §12.1(4) |
| Telecom interface | Single-mode fibre optic | BESF §12.3(2) |
| Signal timestamping | UTC+2, ±1 ms accuracy (GPS) | BESF §12.2.2 |
| Analogue report latency | < 1 second | BESF §11.1(7) |
| PQ monitoring | IEC 61000-4-30 Class A | BESF §9.2(4) |
| Email response time | 5 minutes | BESF §12.4 |

Full SCADA signal list: ~24 mandatory signals from BESF + meteorological + frequency/power/Q control signals from RPP code.

### 5.8 Testing & Compliance

| Test | When | Cycle |
|------|------|-------|
| Frequency response simulation + test | Commissioning | — |
| Active power constraint test | Commissioning | 6 years |
| Reactive power control test | Commissioning | 6 years |
| Power quality simulation + test | Commissioning | 6 years |
| Protection function study + test | Commissioning | 6 years |
| FRT simulation | Commissioning | Initial only |
| Protection integrity | Commissioning | 12 years |
| Gateway FAT | ≥ 2 months before connection | — |
| Gateway SAT | Pre-commissioning | — |
| PQ measurement | ≥ 7 consecutive days at POC | Within 6 months of connection |
| EMT model validation | Within 6 months of COD | — |

### 5.9 Reporting (Monthly to NERSA)

Due by 15th of following month to IPSreports@nersa.org.za:
- Day-ahead forecast vs actual hourly output/input
- Actual hourly reactive energy
- Control setpoint/mode change log
- Curtailed energy log
- Network unavailability incidents
- Direct emissions (tCO₂/kWh)

### 5.10 Hybrid Plant Implications

Per BESF §16(1)(i), when BESS operates in tandem with a renewable generator behind the same POC:
1. **Separate compliance** — BESS under BESF v5.3, solar under RPP Rev 3.1
2. **Combined reporting** — additional combined report for joint impact at shared POC
3. **BESF category based on BESS rating alone** (12 MW = Cat B, but Eskom mandates Cat C), not combined plant
4. **BESS enables full frequency response** that pure PV cannot provide (upward AND downward)
5. **BESS can offer P_Delta reserve** that PV is exempted from — ancillary services revenue opportunity

---

## 6. Key Observations

### Eskom Final Sizing (March 2026)
- **12 MW / 48 MWh (4-hour)** — officially confirmed by Eskom Planning Report
- Significant downsize from all previous figures (36.5 MW RatedPower → 48 MW client → 12 MW Eskom final)
- At 12 MW with 65 MW MEC on 75 MWp solar, the BESS is a small fraction of plant capacity
- 0.25C rate — very gentle cycling, good for battery longevity
- System fault level: **4.55 kA** — all switchgear/protection must be rated accordingly
- 12 MW system will occupy a smaller footprint than the RatedPower 2.88 ha layout

### Architecture
- AC-coupled BESS (confirmed)
- RatedPower drawings remain valid for: topography, civil specs, container spacing, internal MV/LV SLD
- RatedPower electrical ratings (36.5 MW) are **superseded** — must redesign for 12 MW
- At 12 MW / 48 MWh: likely ~10 containers × 5 MWh, or fewer larger containers (Linyang to propose)

### Grid Code (Researched — see Section 5)
- BESS is technically **Category B** under BESF (12 MW < 20 MW threshold), but Eskom mandates **Category C** compliance
- RPP is **Category C** (75 MW solar ≥ 20 MVA)
- POC at **132 kV** (transmission level) — grid operator is **Eskom**
- System fault level: **4.55 kA** — protection coordination required
- LVRT: must ride through **zero voltage for 150 ms** — verify Linyang/Kehua compliance
- RoCoF: BESF requires **±2.5 Hz/s** (more stringent than Network Code's 1.5 Hz/s)
- SCADA: **IEC 60870-5-101** required for transmission-connected plants — confirm Voltus EMS support
- Fault clearance at 132 kV: **≤ 100 ms**
- Dual compliance: BESS under BESF v5.3 + solar under RPP Rev 3.1, combined reporting at shared POC
- Monthly NERSA reporting mandatory — operational overhead to factor into O&M pricing

### Environmental Design Considerations
- **45°C max ambient** — requires robust HVAC sizing on containers, possible inverter derating
- **Heavy pollution** — sealed/IP-rated switchgear, dust protection during transit and storage
- **916 m altitude** — air density reduction affects cooling capacity (~10% derating check)
- **9.2% terrain slopes** — affects civil works, crane positioning, internal road planning

### Commercial
- This is a **non-Cyprus** project — different pricing, logistics, and regulatory framework
- CIF **Cape Town**, target **August 2026 (Q3)**
- 12 MW / 48 MWh is a mid-size project — competitive Linyang pricing expected
- Need to assess local installation partner requirements
- Currency: likely USD or ZAR pricing, not EUR

---

## 6. Client Request

The client has requested:
1. Technical proposal for BESS solution
2. Indicative quotation
3. Proposed system architecture
4. Integration approach

---

## 7. Action Items

- [x] Obtain the preliminary technical report — ✅ received (BESS_REPORT.pdf)
- [x] Assess South African grid code requirements — ✅ researched (BESF v5.3, SAGC Network v10, RPP Rev 3.1)
- [x] Clarify grid operator — ✅ Eskom (confirmed 16 Mar 2026)
- [x] Clarify grid connection voltage — ✅ 132 kV transmission (confirmed 16 Mar 2026)
- [x] Clarify BESS MW — ✅ **12 MW** (Eskom final, March 2026) — supersedes previous 48 MW / 36.5 MW
- [x] Clarify BESS MWh / duration — ✅ **48 MWh (4-hour)** (Eskom final)
- [x] Clarify MEC — ✅ 65 MW (confirmed)
- [x] Clarify PPA counterparty — ✅ PPA with **Eskom** (confirmed)
- [x] Confirm scope of supply — ✅ **Full EPC turnkey** (confirmed)
- [x] Assess local content requirements — ✅ **Private IPP** (not REIPPPP), local content TBC
- [x] Determine CIF logistics — ✅ **Cape Town port**, target **August 2026 (Q3)**
- [x] Confirm architecture — ✅ **AC-coupled** (confirmed)
- [x] Confirm site conditions — ✅ 45°C max / -5°C min, heavy pollution, 916 m altitude, 9.2% slopes
- [x] System fault level — ✅ **4.55 kA** at 132 kV
- [x] **Request Linyang quotation for 12 MW / 50 MWh** — ✅ Received: Quote 274/A/KT/2026 (27 Mar 2026). FOB Shanghai **€4,976,886**. 10 containers + T8+T2 skids (10+2 PCS). Valid 14 days. Production 90-120 days + 10 days transport.
- [x] **Prepare indicative pricing and technical proposal** — ✅ Sent to client 30 Mar 2026. Turnkey EPC offer: **€7,900,000** (€158/kWh). Based on Linyang FOB + 10% equipment margin + EPC costs with 15% margin + 5% contingency. Payment: 30% advance / 70% FAT.
- [ ] Confirm who provides 33/132 kV step-up transformer and HV interconnection (EPC scope detail)
- [ ] Verify Linyang/Kehua inverter compliance with SA grid code (LVRT 0pu/150ms, RoCoF ±2.5 Hz/s, Q ±0.33Pn)
- [ ] Confirm Voltus EMS can support IEC 60870-5-101 protocol (required for TS-connected RPP)
- [ ] Assess inverter/container derating at 45°C and 916 m altitude
- [ ] Specify IP rating / dust protection for heavy pollution environment
- [ ] Evaluate local installation/EPC partner requirement for SA
- [ ] Awaiting client response to turnkey offer
- [ ] Determine pricing approach — currency (EUR/USD/ZAR) — offer currently in EUR
