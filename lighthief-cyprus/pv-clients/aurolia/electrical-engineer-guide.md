# ELECTRICAL ENGINEER GUIDE
## 60 kWp Zero-Export PV System — DSO-Compliant Configuration

**Ref:** LCY-PV-AUR-001 / EE Guide
**Project:** Aurolia Ltd — Greenland Family Park
**Date:** March 2026
**Classification:** INTERNAL — NOT FOR CLIENT DISTRIBUTION

---

## Document Objective

This document provides the electrical engineer with all technical requirements to configure the 60 kWp PV installation at Greenland Family Park to be **technically equivalent to a DSO-compliant zero-export system**, as defined by the EAC RES Technical Guide (Edition 2023.2) and the DSO Technical Guide for Storage (Edition 2025.1).

Although no EAC application has been submitted for this installation (per client decision), the system must be engineered to the same protection, safety, and zero-export standards as if formal DSO approval were in place. This ensures personnel safety, grid integrity, and the ability to regularize the installation retroactively if required.

---

## 1. System Specification

| Parameter | Value |
|-----------|-------|
| **PV Modules** | REC 400–430 Wp Pure R Alpha Series |
| **Total PV Capacity** | **60 kWp** |
| **Inverter 1** | **JKS-20H-EI** — Jinko 20 kW Hybrid (3-phase, 2 MPPTs) |
| **Inverter 2** | **JKS-20H-EI** — Jinko 20 kW Hybrid (3-phase, 2 MPPTs) |
| **Inverter 3** | **JKS-15H-EI** — Jinko 15 kW Hybrid (3-phase, 2 MPPTs) |
| **Total Inverter Capacity** | **55 kW** |
| **Export Limit** | **0 kW (zero export)** |
| **Battery Storage** | None at present (inverters are battery-ready) |
| **Diesel Generator** | **Stamford S1L2-Y1** — 62.5 kVA / 50 kW continuous, 400V, 90.2A, 3-phase, Star connection, IP23 |
| **Grid Connection** | LV 3-phase, 400V |
| **Applicable Standard** | VDE-AR-N 4105:2018-11 (systems < 120 kWp, LV) |

### Confirmed Inverter Capabilities (Datasheet JKS-6-20H-EI-A7)

| Capability | Value |
|-----------|-------|
| **Grid Certifications** | **EN 50549-1, VDE 4105**, VDE 0124, 2016/631 EU |
| **Five Native Ports** | PV, Battery, **Diesel Generator**, Smart Load, Grid |
| **Anti-Islanding** | Built-in |
| **Communication** | RS485 + CAN |
| **Power Factor Range** | 0.8 leading to 0.8 lagging (exceeds DSO 0.9 requirement) |
| **Built-in Surge Protection** | DC Type II / AC Type III |
| **Other Built-in Protection** | Insulation resistance detection, RCMU, overcurrent, short circuit, reverse polarity |
| **Efficiency (Max / Euro / MPPT)** | 97.6% / 97.0% / 99.9% |
| **Off-Grid Peak Power** | 1.5× rated for 10 seconds |
| **Max DC Input Voltage** | 1000V |
| **MPPT Range (20kW)** | 500–850V (2 MPPTs, max 26A each) |
| **MPPT Range (15kW)** | 420–850V (2 MPPTs) |
| **IP Rating** | IP65 |
| **Operating Temperature** | -40 to 60°C (derating above 45°C) |

**Key finding:** The inverter has a **native diesel generator input port**. This means the generator can connect directly to the inverter rather than requiring a separate ATS. The inverter manages the grid/generator/PV switching internally. Confirm with the installation manual whether the internal transfer logic meets the interlock requirements in Section 4, or whether an external ATS is still preferred for this site.

### PV String Configuration — REC Alpha Pure-R (Confirmed)

| Parameter | 410 Wp | 430 Wp |
|-----------|--------|--------|
| Voc | 59.2V | 59.7V |
| Vmpp | 49.4V | 50.5V |
| Isc | 8.84A | 8.91A |
| Impp | 8.30A | 8.52A |
| Voc at -10°C (worst case) | ~64.2V | ~64.7V |
| Panel count for 60 kWp | 147 panels | 140 panels |

| String Sizing | JKS-20H-EI (500–850V) | JKS-15H-EI (420–850V) |
|--------------|----------------------|----------------------|
| Min panels per string | 10–11 panels | 9 panels |
| Max panels per string (Voc at -10°C ≤ 1000V) | 15 panels | 15 panels |
| Recommended string length | 12–14 panels | 10–14 panels |
| Max input current per MPPT | 26A (allows 2 strings of ~8.9A) | 22.8A (allows 2 strings of ~8.9A) |

---

## 2. Mandatory Protection Settings

Per the EAC RES Technical Guide Table 1 (systems ≥ 10.4 kWp), all three inverters must have the following protection parameters configured. Since the total system is ≥ 20 kWp, an **external grid protection relay** is also required.

### 2.1 Inverter Internal Protection (All 3 Units)

| Protection | Parameter | Setting | Trip Time |
|------------|-----------|---------|-----------|
| Undervoltage U< | Phase voltage | **0.9 Un (207V)** | **200 ms** |
| Overvoltage U> | Phase voltage | **1.15 Un (264.5V)** | **200 ms** |
| Underfrequency f< | Grid frequency | **47.0 Hz** | **200 ms** |
| Overfrequency f> | Grid frequency | **51.5 Hz** | **200 ms** |
| Anti-Islanding (LoM) | Loss of Mains | **Active** (DIN VDE 0126-1-1) | **200–1000 ms** |
| DC Injection | DC component | **< 1% of In** | **< 200 ms** |
| THDi | Current harmonics | **< 5%** | Per datasheet |

### 2.2 External Grid Protection Relay (Mandatory for ≥ 20 kWp)

A dedicated external grid protection relay must be installed between the inverter AC output and the point of connection. This relay must mirror the inverter protection settings and provide a **hardwired trip path** independent of inverter software.

| Relay Function | Setting | Trip Time | Action |
|---------------|---------|-----------|--------|
| Undervoltage U< | 0.9 Un (207V) | 200 ms | Trip AC contactor |
| Overvoltage U> | 1.15 Un (264.5V) | 200 ms | Trip AC contactor |
| Underfrequency f< | 47.0 Hz | 200 ms | Trip AC contactor |
| Overfrequency f> | 51.5 Hz | 200 ms | Trip AC contactor |
| ROCOF (Rate of Change of Frequency) | 2.5 Hz/s | 200 ms | Trip AC contactor |
| Reverse Power (export detection) | >0.2 kW export | 2 seconds | Trip AC contactor |

### 2.3 Reconnection After Trip

| Parameter | Value |
|-----------|-------|
| Minimum reconnection delay | **≥ 180 seconds** (3 minutes) |
| Power ramp rate | **≤ 10% PAmax per minute** |
| Full recovery time | ~13 minutes (0% to 100%) |

### 2.4 Frequency Response (LFSM-O)

| Frequency Range | Action | Gradient |
|-----------------|--------|----------|
| 47.0 – 50.2 Hz | Normal operation | — |
| 50.2 – 51.2 Hz | Active power reduction | **10% PM per 0.1 Hz** |
| > 51.5 Hz | Disconnect | 200 ms |
| < 47.0 Hz | Disconnect | 200 ms |

PM = Active power at the moment frequency exceeds 50.2 Hz.

---

## 3. Zero Export Configuration

### 3.1 Architecture — Three Independent Layers

The zero-export system requires three independent layers to be failsafe:

```
 LAYER 1: SOFTWARE                LAYER 2: HARDWARE              LAYER 3: PHYSICAL
 ┌──────────────────┐            ┌──────────────────┐           ┌──────────────────┐
 │  CT Meter at PCC │            │  Reverse Power   │           │  Lockable AC     │
 │        ↓         │            │  Relay at PCC    │           │  Isolator on     │
 │  RS485 → Master  │            │        ↓         │           │  each inverter   │
 │  Inverter        │            │  Trip Signal →   │           │        +         │
 │        ↓         │            │  AC Contactor    │           │  Lockable DC     │
 │  Master limits   │            │  (shunt trip)    │           │  Isolator on     │
 │  all 3 inverters │            │        +         │           │  each string     │
 │  dynamically     │            │  Heartbeat       │           │        +         │
 │                  │            │  Watchdog        │           │  Emergency Stop  │
 └──────────────────┘            └──────────────────┘           └──────────────────┘
    Response: <2s                 Response: 2s trip              Manual isolation
    Accuracy: ±2%                  Fail-safe on loss              For maintenance
```

### 3.2 Layer 1 — CT Measurement & Software Limiting

**CT Placement Is Critical.** CTs must be installed at the Point of Common Coupling (PCC) — on the main incomer cables, immediately after the EAC revenue meter and before any load distribution. Incorrect CT placement will result in uncontrolled export.

| Parameter | Requirement |
|-----------|-------------|
| **CT location** | PCC — main incomer, after EAC meter |
| **CT type** | Split-core or solid-core, ratio appropriate to main incomer rating |
| **CT polarity** | **Must be correct on all 3 phases** — reversed CT = uncontrolled export |
| **Meter type** | Jinko-compatible Smart Meter or CT clamp (confirm with inverter datasheet) |
| **Communication** | RS485 (shielded twisted pair) from meter to master inverter |
| **Export limit setting** | **0 kW** (zero feed-in / zero export mode) |
| **Response time** | < 2 seconds |

### 3.3 Inverter Communication Chain

```
  ┌──────────────┐        RS485         ┌──────────────┐        RS485         ┌──────────────┐
  │   CT METER   │ ────────────────────→ │  INVERTER 1  │ ────────────────────→ │  INVERTER 2  │
  │   at PCC     │   Shielded pair      │  20kW MASTER │   Shielded pair      │  20kW SLAVE  │
  └──────────────┘                       └──────────────┘                       └──────┬───────┘
                                                                                       │ RS485
                                                                                       ↓
                                                                               ┌──────────────┐
                                                                               │  INVERTER 3  │
                                                                               │  15kW SLAVE  │
                                                                               └──────────────┘
```

| Connection | From | To | Cable |
|-----------|------|-----|-------|
| CT meter → Master | Smart Meter RS485 port | Inverter 1 RS485-IN | Shielded twisted pair, <100m |
| Master → Slave 1 | Inverter 1 RS485-OUT | Inverter 2 RS485-IN | Shielded twisted pair |
| Slave 1 → Slave 2 | Inverter 2 RS485-OUT | Inverter 3 RS485-IN | Shielded twisted pair |

**RS485 Wiring Rules:**
- Daisy-chain topology only — no star or tee connections
- 120Ω termination resistor at each end of the bus
- Shield grounded at one end only to prevent ground loops
- Maximum cable length 100m (total run)
- Do not run alongside power cables — maintain ≥300mm separation

### 3.4 Layer 2 — Hardware Fail-Safe

| Component | Specification | Wiring |
|-----------|--------------|--------|
| **Reverse power relay** | Directional power relay at PCC; trip threshold >0.2 kW export for >2 seconds | CT fed from PCC CTs; relay output → shunt-trip coil on AC contactor |
| **AC contactor** | 3-pole + N contactor with shunt-trip coil, rated ≥ 80A | Installed on combined AC output of all 3 inverters, upstream of connection to DB |
| **CT heartbeat watchdog** | If RS485 communication from CT meter is lost for >5 seconds → trip | Implemented via inverter firmware or external timer relay monitoring meter heartbeat |
| **Inverter enable signal** | All inverter "Enable" / "Remote Shutdown" DI terminals wired in parallel | Reverse power relay NO contact → all inverter Enable DI (removes enable on trip) |

### 3.5 Layer 3 — Physical Isolation

| Component | Location | Specification |
|-----------|----------|--------------|
| **AC isolator (per inverter)** | Adjacent to each inverter | Lockable rotary isolator, IP65 if outdoor |
| **DC isolator (per string)** | Adjacent to each inverter DC input | Lockable DC isolator, rated ≥ string Voc × 1.2 |
| **Emergency stop** | At main DB and at inverter location | Red mushroom-head, latching, wired to AC contactor shunt-trip |
| **Main PV isolator** | At main distribution board | 4-pole isolator (3P+N), lockable |

---

## 4. Diesel Generator Interlock

**Generator & PV must never both backfeed the grid.** The ATS, inverter mode switching, and reverse power protection must work together to prevent any scenario where PV or generator power reaches the EAC meter in the export direction.

### 4.1 Control Logic

| ATS Position | Grid | Generator | PV Inverter Mode | Export Limit |
|-------------|------|-----------|-----------------|-------------|
| **Grid** | ON | OFF | Grid-tied | 0 kW (zero export via CT at PCC) |
| **Generator** | OFF | ON | Off-grid / Island | Limited to **≤25 kW** (50% of 50 kW generator continuous) |
| **Transition (grid lost)** | Failing | Starting | Shutdown (or island if battery available) | 0 kW until mode confirmed |
| **Transition (grid restored)** | Returning | Cooling down | Wait 180s → ramp at 10%/min | 0 kW (zero export) |

### 4.2 Interlock Wiring

| Signal | From | To | Function |
|--------|------|-----|----------|
| **ATS position contact** | ATS auxiliary contact (dry contact, NO) | All inverter "Grid/Off-Grid" DI terminal | Grid position = grid-tied mode; Generator position = off-grid mode |
| **Generator running signal** | Generator controller (dry contact) | Inverter DI or external PLC | Limits PV output to ≤25 kW (50% of 50 kW generator continuous) |
| **Generator reverse power** | Generator controller RPP function | AC contactor shunt-trip (backup) | Trips PV if power flows into generator |

### 4.3 Site Survey — Items to Confirm Before SLD

| Item | Check |
|------|-------|
| Generator kVA rating | **62.5 kVA / 50 kW continuous** (Stamford S1L2-Y1) |
| ATS type (manual / automatic) | ☐ Manual / ☐ Automatic |
| ATS pole count | ☐ 3-pole / ☐ 4-pole (switches neutral) |
| ATS auxiliary contacts available | ☐ Yes (dry contact) / ☐ No (need to add) |
| Generator N-E bond | ☐ Bonded at generator / ☐ Floating neutral |
| Generator has reverse power protection | ☐ Built-in / ☐ External required |
| Existing earthing arrangement | ☐ TN-C-S / ☐ TN-S / ☐ TT |
| RCD on main incomer | ☐ Yes (rating: ___) / ☐ No |

---

## 5. Earthing & Neutral Coordination

| Consideration | Requirement |
|--------------|-------------|
| **Generator N-E bond** | If bonded at generator: ATS must be 4-pole (switch neutral) to avoid parallel N-E paths during grid operation |
| **PV neutral reference** | Hybrid inverters require stable neutral reference in island mode; confirm inverter creates its own neutral or needs external bond |
| **RCD coordination** | Multiple sources (grid + PV + generator) can cause nuisance RCD trips; verify RCD compatibility with inverter leakage current (Type B RCD may be required) |
| **Inverter earth fault monitoring** | Enable inverter internal insulation monitoring on DC side |
| **PV frame earthing** | All PV frames and mounting rails bonded to main earth bar via 6mm² (min) green/yellow conductor |

---

## 6. Surge Protection

| Location | Type | Specification |
|----------|------|--------------|
| PV DC side (each inverter input) | Type 1+2 (combined) | Vdc ≥ 1.2 × Voc(STC); Isc ≥ 12.5 kA |
| Inverter AC output | Type 2 (external) | Uc ≥ 275V (L-N), In ≥ 20 kA. Inverter has built-in AC Type III only — external Type 2 SPD still required |
| Main distribution board | Type 1+2 | Per existing installation (verify presence) |

---

## 7. Cable Sizing Reference

All cabling per IEC 60364 / BS 7671. Voltage drop from PV array to inverter ≤ 2%. Voltage drop from inverter to DB ≤ 1%. All DC cables to be rated for PV use (EN 50618 / H1Z2Z2-K).

| Circuit | Current (approx) | Min Cable Size | Notes |
|---------|-----------------|---------------|-------|
| PV string DC (to inverter) | ~8.9A per string (Isc) | 4mm² solar cable | H1Z2Z2-K, UV resistant |
| Inverter AC output (20kW) | ~29A per phase | 6mm² (verify with derating) | 3P+N+E |
| Inverter AC output (15kW) | ~22A per phase | 4mm² (verify with derating) | 3P+N+E |
| Combined AC to DB | ~80A total | 16mm² (verify with derating) | 3P+N+E, via AC contactor |
| RS485 communication | Signal | Shielded twisted pair (0.5mm²) | Separate from power cables |
| Control signals (DI/DO) | Signal | 1.0mm² multi-core control cable | For relay, ATS, E-stop |

---

## 8. Single Line Diagram — Required Elements

The SLD must explicitly show all of the following. This documentation supports future regularization if needed.

| # | Element | Detail Required |
|---|---------|----------------|
| 1 | EAC meter location | Revenue meter position clearly marked |
| 2 | PCC identification | Point of Common Coupling marked with CT location |
| 3 | Zero-export CT set | 3-phase CTs at PCC, polarity arrows shown |
| 4 | Smart Meter / CT meter | Model, RS485 connection to master inverter |
| 5 | All 3 inverters | Model, kW rating, master/slave designation |
| 6 | PV array configuration | String count, panels per string, Voc/Isc per string |
| 7 | AC contactor (shunt-trip) | Between inverters and DB, rated current |
| 8 | External protection relay | Settings table on SLD |
| 9 | Reverse power relay | Trip threshold and delay |
| 10 | DC isolators | Per string, per inverter |
| 11 | AC isolators | Per inverter + main PV isolator at DB |
| 12 | Surge protection | DC (Type 1+2) and AC (Type 2) locations |
| 13 | ATS / changeover | Position, pole count, auxiliary contacts |
| 14 | Diesel generator | kVA rating, connection point |
| 15 | Generator interlock signals | ATS contact → inverter DI, RPP → contactor |
| 16 | Emergency stop | Location(s), wiring to contactor shunt-trip |
| 17 | Earthing | Main earth bar, PV frame bonding, N-E bond locations |
| 18 | Note on SLD | "Export limit = 0 kW. Fail-safe trip on export or loss of measurement." |

---

## 9. Labeling Requirements

Per EN 60204-1 and IEC 60364. All labels to be engraved or UV-stable printed, permanently fixed.

| Location | Label Text |
|----------|-----------|
| Main distribution board | **WARNING — DUAL SUPPLY. This installation is supplied by PV generation and mains supply. ISOLATE PV SYSTEM BEFORE WORK.** |
| Each inverter | **PV INVERTER — [20kW / 15kW]. DC DANGER — Isolate all DC sources before opening.** |
| AC contactor | **PV SYSTEM AC CONTACTOR. Emergency trip via E-Stop / Reverse Power Relay** |
| DC isolators | **DC ISOLATOR — PV STRING [X]. DANGER: DC voltage present when PV panels are exposed to light.** |
| AC isolators | **AC ISOLATOR — PV INVERTER [X]** |
| Emergency stop button(s) | **EMERGENCY STOP — PV SYSTEM** |
| CT location at PCC | **ZERO EXPORT CTs — DO NOT REMOVE OR MODIFY** |
| ATS / changeover | **AUTOMATIC TRANSFER SWITCH — Grid / Generator** |

---

## 10. Commissioning Checklist

### Pre-Energization Checks

| # | Test / Check | Result | Pass |
|---|-------------|--------|------|
| 1 | Insulation resistance — all DC strings (≥1MΩ at 500V) | _______ MΩ | ☐ |
| 2 | Insulation resistance — AC circuits (≥1MΩ at 500V) | _______ MΩ | ☐ |
| 3 | Earth continuity — PV frames to main earth bar (<0.5Ω) | _______ Ω | ☐ |
| 4 | String Voc measured (all strings, both polarities correct) | _______ V | ☐ |
| 5 | String Isc measured (all strings, within ±5% of expected) | _______ A | ☐ |
| 6 | CT polarity verified — all 3 phases correct at PCC | Tested | ☐ |
| 7 | RS485 communication — meter to master — master to slaves | Online | ☐ |
| 8 | Inverter protection settings programmed per Section 2.1 | Verified | ☐ |
| 9 | External grid protection relay settings per Section 2.2 | Verified | ☐ |
| 10 | Export limit set to 0 kW on master inverter | Set | ☐ |
| 11 | Reverse power relay commissioned — threshold & delay correct | Tested | ☐ |
| 12 | AC contactor shunt-trip tested (trips on relay, E-stop) | Trips OK | ☐ |
| 13 | Emergency stop button tested — all inverters stop | Tested | ☐ |
| 14 | ATS interlock tested — inverters switch mode correctly | Tested | ☐ |
| 15 | Generator interlock tested — PV limits output on genset | Tested | ☐ |
| 16 | Surge protection installed — DC Type 1+2, AC Type 2 | Installed | ☐ |
| 17 | All labeling installed per Section 9 | Installed | ☐ |

### Energization & Functional Tests

| # | Test | Result | Pass |
|---|------|--------|------|
| 18 | Energize inverters — all 3 connect and sync | Online | ☐ |
| 19 | **Zero export test:** reduce site load to minimum, verify inverters throttle to 0 kW export | Export: ___W | ☐ |
| 20 | **Reverse power relay test:** simulate export or inject test signal, verify contactor trips | Trips OK | ☐ |
| 21 | **CT loss test:** disconnect RS485 from meter, verify inverters shut down within 5s | Shuts down | ☐ |
| 22 | **Anti-islanding test:** open main incomer CB, verify inverters disconnect within 1s | Disconnects | ☐ |
| 23 | **Generator transfer test:** simulate grid loss, verify ATS transfers and inverters enter off-grid mode | Mode change OK | ☐ |
| 24 | **Grid return test:** restore grid, verify 180s wait then ramp at ≤10%/min | Wait: ___s | ☐ |
| 25 | Record all inverter serial numbers and firmware versions | Recorded | ☐ |
| 26 | Photograph all critical connections, labels, CT positions | Photos taken | ☐ |

---

## 11. Documentation to Prepare

Even without a formal EAC submission, the following documents must be prepared and retained to enable future regularization:

| # | Document | Status |
|---|----------|--------|
| 1 | Single Line Diagram (complete, per Section 8) | ☐ |
| 2 | Protection settings record (inverter + external relay) | ☐ |
| 3 | Zero export commissioning test report | ☐ |
| 4 | CT polarity verification record | ☐ |
| 5 | Inverter serial numbers and firmware versions | ☐ |
| 6 | Generator interlock test record | ☐ |
| 7 | Earthing continuity test results | ☐ |
| 8 | Insulation resistance test results | ☐ |
| 9 | String Voc / Isc measurements | ☐ |
| 10 | Photographs of all critical connections | ☐ |
| 11 | Inverter datasheets and EN 50549 / VDE certificates | ☐ |
| 12 | As-built cable schedule | ☐ |

---

*Lighthief Cyprus Ltd | Ref: LCY-PV-AUR-001 / EE Guide | March 2026*
*Internal technical document — not for client distribution.*
