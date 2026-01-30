# FINAL REQUEST FOR INFORMATION (RFI)
## Linyang Energy Storage Technology Co., Ltd

---

**Document Reference:** LCY-RFI-LINYANG-FINAL-2026
**Date:** January 26, 2026
**From:** Lighthief Cyprus Ltd
**To:** Jiangsu Linyang Energy Storage Technology Co., Ltd / Solarfun Renewable Energy Poland Sp. z o.o.
**Contact:** Kamil Tyburski, Conor Yang, Magdalena
**Subject:** Outstanding Documentation for Cyprus BESS Portfolio - Final Consolidated RFI

---

## EXECUTIVE SUMMARY

This Final RFI consolidates all outstanding documentation requests identified across multiple tracker documents for the Cyprus BESS portfolio deployment. Items are prioritized by impact on DSO submission and client delivery.

| Priority | Total Items | Critical for DSO | High Priority | Medium Priority |
|----------|-------------|------------------|---------------|-----------------|
| **PART A** | 4 | ✅ 2 resolved, 🔴 2 | - | - |
| **PART B** | 9 | - | 🟡 9 | - |
| **PART C** | 14 | - | - | 🟢 14 |
| **PART D** | 8 | - | 🟡 8 | - |
| **TOTAL** | **35** | **2 resolved** | **17** | **14** |

### 📋 Updates (30 Jan 2026) - Kehua PCS Documentation Received
- **A1. EN 50549-2** ✅ CONFIRMED - Kehua catalogue shows compliance
- **A4. System SLD** ⚠️ PARTIAL - 5MW @ 33kV SLD received (DWG)
- **Foundation Drawings** ✅ RECEIVED - 2.5MW and 5MW specs

---

## PART A: CRITICAL FOR DSO SUBMISSION (🔴 BLOCKING)

> These items are **MANDATORY** for Cyprus DSO (EAC) grid connection application. Without these documents, we cannot proceed with any project.

### A1. EN 50549-2 Type Test Certificate (PCS) ✅ RESOLVED

| Field | Details |
|-------|---------|
| **Component** | Kehua BCS1250K-C-HUD Power Conversion System |
| **Standard** | EN 50549-2:2019 - Requirements for generating plants to be connected in parallel with distribution networks |
| **Status** | ✅ **CONFIRMED - 30 Jan 2026** |
| **Source** | Kehua BCS4000K~5000K-C-HUD/T4 Catalogue - Compliance section |
| **Compliance List** | EN/IEC 62477-1, EN/IEC 61000-6-2, **EN50549-2/10**, IEC62116, IEC61727, IEC60068-2-1/2/14/30, EN55011 |

**Resolution:**
- ✅ EN 50549-2 compliance confirmed in Kehua catalogue (received 30 Jan 2026)
- ⏳ Request formal Type Test Certificate copy for DSO submission file

---

### A2. LVRT/HVRT Voltage Ride-Through Curves

| Field | Details |
|-------|---------|
| **Component** | Kehua BCS1250K-C-HUD PCS |
| **Standard** | EN 50549-2 Figure 8/9 format |
| **Status** | ❌ **MISSING - CRITICAL** |
| **Why Required** | DSO requires Low Voltage Ride-Through and High Voltage Ride-Through curves for protection coordination study |

**Requested Documents:**
1. LVRT curve (voltage vs time, voltage dip ride-through capability)
2. HVRT curve (overvoltage ride-through capability)
3. Third-party FRT test report (if available)

**DSO Requirement (CyprusDSO.md §16.8):**
- LVFRT: 0V for 150ms minimum

---

### A3. IEC 60870-5-104 Complete SCADA Point List

| Field | Details |
|-------|---------|
| **Component** | Linyang EMS/BMS and Kehua PCS |
| **Protocol** | IEC 60870-5-104 (TCP/IP) |
| **Status** | ❌ **MISSING - CRITICAL** |
| **Why Required** | Cyprus DSO requires all BESS systems ≥120kW to connect to EAC SCADA using IEC 104 protocol. Integration cannot proceed without full address mapping. |

**Requested Documents:**
Complete point list in Excel format including:
- [ ] IOA (Information Object Address) for each signal
- [ ] Data type (single point, double point, measured value, etc.)
- [ ] Scaling factors for analog values
- [ ] Alarm thresholds
- [ ] Command addresses (P/Q setpoints, start/stop, etc.)

**Minimum Required Points per DSO:**
| Signal | Type | Address |
|--------|------|---------|
| Active Power Setpoint | Command | 30 |
| Reactive Power Setpoint | Command | 31 |
| Active Power Feedback | Measured | 503 |
| Reactive Power Feedback | Measured | 504 |
| SOC | Measured | TBD |
| SOH | Measured | TBD |
| System Status | Status | TBD |

---

### A4. System Single-Line Diagram with Protection Devices ⚠️ PARTIAL

| Field | Details |
|-------|---------|
| **Component** | Complete BESS System (Battery + PCS + MV Skid + Transformer) |
| **Status** | ⚠️ **PARTIAL - 30 Jan 2026** |
| **Received** | 5MW @ 33kV SLD, 2.5MW drawings, foundation specs |
| **Why Required** | Required for DSO grid connection application and protection coordination study |

**Documents Received (30 Jan 2026):**
- ✅ `5MW PCS Single Line Diagram(33kV).dwg`
- ✅ `5MW PCS Container Layout&Recommended Foundation(33kV).dwg`
- ✅ `BCS2500K-C-HUD-T2 Drawings.dwg`
- ✅ `BCS5000K-C-HUD-T4 Drawings.dwg`
- ✅ `2.5MW ESS Appearance&Recommended foundation.dwg`
- ✅ `BCS2500K-C-HUD-T2 Drawings-Recommended Foundation.pdf`

**Still Required:**
1. SLDs for other sizes (1MW, 1.25MW, 1.5MW, 8MW)
2. Protection relay specifications (brand, model, settings)
3. SLD for 11kV and 22kV configurations (received is 33kV)

---

## PART B: HIGH PRIORITY (🟡 Required for Design & Proposals)

### B1. Frequency Response Curves

| Field | Details |
|-------|---------|
| **Component** | Kehua BCS1250K-C-HUD PCS |
| **Status** | ⚠️ **PARTIAL** - VSG mode stated but no curves |
| **Why Required** | Cyprus DSO requires LFSM-O droop at 50.2Hz with 100% PM per Hz |

**Requested Documents:**
- P vs f (Active Power vs Frequency) response curve
- Droop setting ranges (configurable %)
- VSG inertia parameters (H constant, damping coefficient)
- P-Q capability diagram

---

### B2. MV Protection Coordination Study / Relay Specifications

| Field | Details |
|-------|---------|
| **Component** | MV Skid Protection System |
| **Status** | ❌ **MISSING** |
| **Why Required** | Required for DSO protection coordination study and EPC design |

**Requested Documents:**
1. MV protection relay specification (manufacturer, model)
2. CT/VT specifications (class, burden, ratio)
3. Protection coordination philosophy
4. Recommended settings for Cyprus grid (50Hz, 11kV/22kV)

---

### B3. Trip Matrix / Protection Logic

| Field | Details |
|-------|---------|
| **Status** | ❌ **MISSING** |
| **Why Required** | Safety system design and commissioning |

**Requested Documents:**
- Protection trip matrix (Excel/PDF)
- Interlock logic diagram (PCS ↔ Transformer ↔ Battery)
- Emergency shutdown procedure
- E-Stop sequence

---

### B4. Auxiliary Power Consumption Breakdown

| Field | Details |
|-------|---------|
| **Status** | ⚠️ **PARTIAL** - ~2% stated, 45kW cooling mentioned |
| **Why Required** | Auxiliary transformer sizing, OPEX calculations |

**Requested Document:**
Itemized table format:

| Subsystem | Standby (kW) | Operating (kW) | Peak (kW) |
|-----------|--------------|----------------|-----------|
| HVAC/Cooling | | | |
| BMS/Control | | | |
| Fire Suppression | | | |
| PCS Auxiliary | | | |
| Pumps | | | |
| Lighting/Safety | | | |
| **TOTAL** | | | |

---

### B5. FAT/SAT Procedures

| Field | Details |
|-------|---------|
| **Status** | ❌ **MISSING** |
| **Why Required** | Factory acceptance and site commissioning planning |

**Requested Documents:**
1. Factory Acceptance Test (FAT) procedure
2. FAT checklist with acceptance criteria
3. Site Acceptance Test (SAT) procedure
4. SAT checklist with acceptance criteria
5. Integrated system commissioning procedure (BESS + PCS + Transformer)

---

### B6. SOH Guarantee / Cell Augmentation Commitment Letter

| Field | Details |
|-------|---------|
| **Status** | ❌ **MISSING - CRITICAL FOR LTSA** |
| **Why Required** | Lighthief offers Tier D LTSA with SOH guarantee backed by OEM warranty reserve |

**Requested Document:**
Signed letter on Linyang letterhead confirming:

| Commitment | Required Response |
|------------|-------------------|
| Cell augmentation for manufacturing-related SOH shortfall | ☐ Confirmed |
| Replacement cell shipping timeframe | ___ days |
| Warranty reserve maintained for Cyprus systems | ☐ Confirmed |
| Capacity restoration coverage | ___% |

**Degradation Curve Confirmation:**
| Year | Guaranteed SOH | Linyang Confirmation |
|------|----------------|----------------------|
| Year 1 | 98% | ☐ |
| Year 5 | 90% | ☐ |
| Year 10 | 80% | ☐ |
| Year 15 | 70% | ☐ |
| Year 20 | 60% | ☐ |

---

### B7. Anti-Islanding Test Report

| Field | Details |
|-------|---------|
| **Standard** | IEC 62116 |
| **Status** | ❌ **MISSING** |
| **Why Required** | Loss of Mains protection verification for DSO |

---

### B8. Cybersecurity Specification (BMS/EMS)

| Field | Details |
|-------|---------|
| **Status** | ⚠️ **PARTIAL** - Via partner AXOS EMS |
| **Why Required** | NIS2 compliance for EU critical infrastructure |

**Requested Documents:**
1. Native Linyang BMS/EMS cybersecurity specification
2. Network architecture diagram
3. User role definitions (Admin, Operator, Viewer)
4. IEC 62351 compliance statement (if applicable)

---

### B9. Data Retention Capability

| Field | Details |
|-------|---------|
| **Status** | ❌ **MISSING** |
| **Why Required** | Regulatory requirements for operational logs (minimum 2 years) |

**Requested Information:**
- Operational log retention period
- Metering data storage capacity
- Event log capacity
- Data export formats

---

## PART C: MEDIUM PRIORITY (🟢 Design Documentation)

### C1. MV Skid Datasheets (14 configurations)

| MV Skid Model | Power | Status | Documents Needed |
|---------------|-------|--------|------------------|
| 1MW MV Skid | 1.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 1.25MW MV Skid | 1.25 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 1.5MW MV Skid | 1.5 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 1.725MW MV Skid | 1.725 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 2MW MV Skid | 2.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 2.5MW MV Skid | 2.5 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 3MW MV Skid | 3.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 3.45MW MV Skid | 3.45 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 4MW MV Skid | 4.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 5MW MV Skid | 5.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 6MW MV Skid | 6.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 6.9MW MV Skid | 6.9 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 7.5MW MV Skid | 7.5 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 8MW MV Skid | 8.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |

**Note:** BCS10000K-C-HUD/T8 (10MW) datasheet is ✅ available.

---

### C2. MV Transformer Datasheets

All transformers matching the MV Skid sizes above (1.1MVA to 10MVA) with:
- Full electrical specifications
- Vector group (Dyn11 expected)
- Impedance values
- Oil/dry type confirmation
- Dimensions and weight

---

## PART D: SCOPE CLARIFICATION (🟡 For EPC Pricing)

> Items from the group's itemized breakdown requiring confirmation whether included in Linyang CIF price or separate:

| # | Item | Group Shows | Question | Impact if NOT in CIF |
|---|------|-------------|----------|----------------------|
| D1 | **Power Plant Controller (PPC)** | €79,300 | Built into PCS or separate? If separate, can third-party EMS (e.g., AXOS) provide PPC function? | +€3,965/MWh |
| D2 | **Grid Forming Controller** | €40,000 | Built-in to C-series or add-on? | +€2,000/MWh |
| D3 | **LV Control Cabinet** | Part of Switchgear | In MV SKID or separate? | Included in above? |
| D4 | **Protection Relays** | Part of RTU | In SKID or customer scope? What brand (Schneider/ABB)? | Part of RTU |
| D5 | **RTU (Remote Terminal Unit)** | €39,600 | ✅ **CONFIRMED INCLUDED** - What brand - Schneider or ABB? | ✅ Included |
| D6 | **Auxiliary System & Comms** | €39,600 | What exactly is included? | +€1,980/MWh |
| D7 | **Commissioning scope** | €66,900 | What does "training & launch" cover vs full DSO commissioning? | Overlapping scope |
| D8 | **Lightning Protection / SPD** | Not specified | Is lightning protection / surge protection (SPD) included in container or MV SKID? Specs? | Site safety |

---

## DOCUMENTS ALREADY RECEIVED (Confirmation) ✅

The following documents have been received and are on file:

### Battery Certifications
| Document | Standard | Status |
|----------|----------|--------|
| UL 9540A (Cell) | Report 4791099276 | ✅ Complete |
| UL 9540A (Module) | Report 80239433 | ✅ Complete |
| UL 9540A (Unit) | Report 80239432 | ✅ Complete - PASSED |
| IEC 62619 (Pack) | CB Certificate BE-51213 | ✅ Complete |
| IEC 63056 (Pack) | CB Certificate SG SGS-00632 | ✅ Complete |
| UN38.3 (Cell) | Transport | ✅ Complete |
| UN38.3 (Pack) | Transport | ✅ Complete |

### Container & System
| Document | Status |
|----------|--------|
| EN 62477-1 (Container LVD) | ✅ Complete |
| EN IEC 61000-6-2/6-4 (EMC) | ✅ Complete |
| IEC 62933-5-2 Notification | 🔄 Testing complete, cert 2-3 weeks |

### PCS Documentation
| Document | Status |
|----------|--------|
| BCS1250K-C-HUD Datasheet | ✅ Complete |
| BCS1250K-C-HUD Efficiency Curves | ✅ Complete |
| Harmonic Test Report | ✅ Complete |
| Flicker/DC Injection Report | ✅ Complete |
| P-Q Curves (Single & Parallel) | ✅ Complete |

### Operating Documentation
| Document | Status |
|----------|--------|
| User Manual V2.0 | ✅ Complete |
| Maintenance Manual | ✅ Complete |
| Degradation Curve (4 conditions) | ✅ Complete |
| Warranty Terms V2 | ✅ Complete |
| IEC 61850 ICD File | ✅ Complete |
| LTSA Pricing Cyprus | ✅ Complete |

---

## CONFIRMED BY KAMIL (January 2026)

| Item | Status | Brand | Notes |
|------|--------|-------|-------|
| **MV Switchgear** | ✅ **INCLUDED** | **ABB or Schneider** | Same cost, in MV SKID supply |
| **Kehua PCS C-series** | ✅ **CONFIRMED** | Kehua | All PCS are BCS1250K-**C**-HUD (grid-forming capable) |
| **RTU (Remote Terminal Unit)** | ✅ **INCLUDED** | TBD | Confirmed 27 Jan 2026 |
| **Auxiliary Transformer** | ✅ **INCLUDED** | **Schneider** | Confirmed 27 Jan 2026 |
| **RMU (Ring Main Unit)** | ✅ **INCLUDED** | **Schneider** | Confirmed 27 Jan 2026 |

## DSO CAPACITY REQUIREMENTS (Confirmed Jan 2026)

| Requirement | Status | Notes |
|-------------|--------|-------|
| **PCS Nameplate ≤ PV Capacity** | ⚠️ **CRITICAL** | Total PCS nameplate must be ≤ RES licensed MW |
| **Software Limiting** | ❌ **NOT ALLOWED** | Cannot use higher capacity PCS and software limit |
| **Implication** | 🔴 **ACTION REQUIRED** | Each park must have correctly sized MV SKID |

> **Example**: A 5 MW licensed park cannot use 5× 1.25MW PCS (6.25MW total). Must use 4× 1.25MW (5MW) or 5× 1.0MW (5MW).

---

## URGENT ACTION ITEMS - 28 JAN 2026

### 🔴 CONFIRM WITH LINYANG (Kamil/Conor)

| # | Question | Contact | Status |
|---|----------|---------|--------|
| 1 | **RTU included?** Is RTU supplied by Linyang in MV SKID or customer scope? | Kamil | ✅ **CONFIRMED - INCLUDED** |
| 2 | **RTU Brand?** If included, is it Schneider or ABB? | Kamil | ⏳ PENDING |
| 3 | **Lightning/SPD?** Is surge protection included in container or MV SKID? Specifications? | Kamil | ⏳ PENDING |
| 4 | **Protection Relay Brand?** Schneider or ABB relays in MV SKID? | Kamil | ⏳ PENDING |

### 🟡 CONFIRM WITH EMS PROVIDER (AXOS)

| # | Question | Contact | Status |
|---|----------|---------|--------|
| 1 | **Does AXOS EMS provide PPC function?** Can AXOS replace standalone PPC controller? | AXOS Sales | ⏳ PENDING |
| 2 | **AXOS IEC 104 integration** - Confirm native support for Cyprus DSO connection | AXOS Sales | ⏳ PENDING |
| 3 | **AXOS pricing for Cyprus** - Get indicative pricing per MWh/year | AXOS Sales | ⏳ PENDING |
| 4 | **AXOS black start / grid forming** - Confirm capability statement | AXOS Sales | ⏳ PENDING |

### 📋 INTERNAL TASKS

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Update pricing model with confirmed scope items | Alex | ⏳ PENDING |
| 2 | Finalize EMS partner selection (AXOS vs alternatives) | Alex | ⏳ PENDING |
| 3 | Draft EMS section for client EPC agreement | Alex | ⏳ PENDING |

---

## RESPONSE TIMELINE

| Priority | Item Category | Requested Response Date |
|----------|---------------|-------------------------|
| 🔴 **CRITICAL** | Part A (DSO Blocking) | **Within 5 working days** |
| 🟡 **HIGH** | Part B (Design Required) | Within 10 working days |
| 🟢 **MEDIUM** | Part C (Design Documentation) | Within 20 working days |
| 🟡 **HIGH** | Part D (Scope Clarification) | Within 10 working days |
| 🔴 **CRITICAL** | SOH Guarantee Letter | **Within 10 working days** |

---

## DELIVERY INSTRUCTIONS

Please provide all documents to:

**Email:** office@lighthief.com / alexander.papacosta@lighthief.com
**Reference:** RFI-LINYANG-FINAL-JAN2026
**Format:** PDF (technical documents), Excel (SCADA point list, pricing confirmations)

---

## CONTACT

**Lighthief Cyprus Ltd**
28 October Avenue 249, Lophitis Business Center 1, Office 201
3035 Limassol, Cyprus

Company No. HE 477423
TIN: 60187188Q

Alexander Papacosta
Cyprus Director
alexander.papacosta@lighthief.com

---

*Document prepared by: Lighthief Cyprus Ltd*
*Classification: COMMERCIAL - CONFIDENTIAL*
*Version: 1.0*
*Date: January 26, 2026*
