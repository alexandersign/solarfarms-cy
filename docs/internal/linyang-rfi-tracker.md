# LINYANG RFI RESPONSE TRACKER

**Document Reference:** LCY-RFI-LINYANG-001
**Date Sent:** January 2026
**Recipient:** Linyang Energy / Kehua
**Purpose:** Track responses to DSO/TSO grid-connection documentation request

---

## EXECUTIVE SUMMARY

| Category | Items | ✅ Answered | ⚠️ Partial | 🔴 Pending |
|----------|-------|-------------|------------|------------|
| 1. Grid Compliance & Dynamic Performance | 3 | 0 | 1 | 2 |
| 2. SCADA, Control & Communication | 4 | 1 | 2 | 1 |
| 3. Protection & MV Integration | 4 | 0 | 1 | 3 |
| 4. Metering & DSO Submission | 3 | 0 | 1 | 2 |
| 5. Mechanical, Civil & Auxiliary | 4 | 1 | 2 | 1 |
| 6. Warranty & Certification | 3 | 2 | 1 | 0 |
| **TOTAL** | **21** | **4** | **8** | **9** |

**Overall Status:** 🟡 **43% Complete** - 9 critical items pending from Linyang

---

## 1. GRID COMPLIANCE & DYNAMIC PERFORMANCE

### 1.1 Full FRT/LVRT/HVRT Curves 🔴 PENDING

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| LVRT curves (voltage dip ride-through) | 🔴 **PENDING** | Kehua | Required for EN 50549-2 |
| HVRT curves (overvoltage ride-through) | 🔴 **PENDING** | Kehua | Required for EN 50549-2 |
| FRT test reports/certification | 🔴 **PENDING** | Kehua | Need TÜV/third-party report |

**Current Documentation:**
- CyprusDSO.md §16.8: LVFRT requirement defined (0V for 150ms)
- Kehua BCS1250K stated as "VDE compliant" but no curves provided

**Required from Linyang/Kehua:**
```
□ LVRT voltage vs time curve (EN 50549-2 format)
□ HVRT voltage vs time curve (EN 50549-2 format)
□ Third-party FRT test report (TÜV, DNV, etc.)
```

---

### 1.2 FRT Certification/Test Reports 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| EN 50549-2 FRT test report | 🔴 **PENDING** | Critical for grid connection |
| IEC 62116 anti-islanding | 🔴 **PENDING** | Required for DSO |

**Current Documentation:**
- CyprusDSO.md §12: Listed as ❌ Missing

**Required from Linyang/Kehua:**
```
□ EN 50549-2 Type Test Certificate (PCS)
□ IEC 62116 Anti-Islanding Test Report
```

---

### 1.3 Dynamic Grid Support Capability ⚠️ PARTIAL

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| Frequency response capability | ⚠️ **PARTIAL** | linyang.md | VSG mode stated, no curves |
| Droop settings documentation | 🔴 **PENDING** | - | Need configurable ranges |
| Inertia/VSG parameters | ⚠️ **PARTIAL** | linyang.md §6 | Operating modes listed |

**Current Documentation:**
- linyang.md: VSG, Black-Start, VF, PQ modes confirmed
- CyprusDSO.md §5: Droop requirement = 100% PM per Hz (10% per 0.1 Hz)
- No detailed parameter curves or configuration guide

**Required from Linyang/Kehua:**
```
□ Frequency response curves (P vs f)
□ Droop setting ranges (adjustable %)
□ VSG inertia parameters (H constant, damping)
□ PQ capability curves (P-Q diagram)
```

---

## 2. SCADA, CONTROL & COMMUNICATION

### 2.1 Complete SCADA Points List 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| IEC 60870-5-104 point list | 🔴 **PENDING** | Critical for DSO |
| All tags, parameters, alarms | 🔴 **PENDING** | Required for EMS integration |
| SOC, PQ setpoints, status signals | 🔴 **PENDING** | Operational parameters |

**Current Documentation:**
- CyprusDSO.md §8: Requirements defined (Active/Reactive power points)
- linyang.md: IEC 104/61850/Modbus supported but NO point list

**Required from Linyang:**
```
□ Complete IEC 60870-5-104 point list (Excel format)
  - Address map (IOA)
  - Data types (single point, double point, measured value)
  - Scaling factors
  - Alarm thresholds
□ Modbus register map (alternative)
□ IEC 61850 data model (optional)
```

---

### 2.2 Command/Control Interface Guide ⚠️ PARTIAL

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| PQ mode control | ⚠️ **PARTIAL** | linyang.md | Mode listed, no guide |
| VF mode control | ⚠️ **PARTIAL** | linyang.md | Mode listed, no guide |
| VSG mode control | ⚠️ **PARTIAL** | linyang.md | Mode listed, no guide |
| Operating procedures | 🔴 **PENDING** | - | Detailed command sequences |

**Current Documentation:**
- linyang.md §6: Operating modes confirmed (VSG, Black-Start, VF, PQ)
- No detailed control interface guide or command sequences

**Required from Linyang:**
```
□ Control interface guide (PCS operating manual section)
□ Mode switching procedures
□ Setpoint ranges for P, Q, V, f
□ Response times for mode changes
```

---

### 2.3 Cybersecurity Specification ⚠️ PARTIAL

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| User roles/access control | ⚠️ **PARTIAL** | Via AXOS EMS | Partner EMS covers |
| Encryption (IEC 62351) | ⚠️ **PARTIAL** | Via AXOS EMS | TLS/AES confirmed |
| Firewall/network security | 🔴 **PENDING** | Linyang BMS/EMS | Native system security |
| Compliance statement | ⚠️ **PARTIAL** | Via AXOS EMS | NIS2/ISO 27001 |

**Current Documentation:**
- linyang.md §10: AXOS EMS is NIS2/KRITIS compliant, ISO 27001
- Native Linyang EMS/BMS cybersecurity not documented

**Required from Linyang:**
```
□ BMS/EMS cybersecurity specification
□ Network architecture diagram
□ User role definitions (Admin, Operator, Viewer)
□ IEC 62351 compliance statement (if applicable)
```

---

### 2.4 Time Synchronisation Method ✅ ANSWERED

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| NTP support | ✅ **ANSWERED** | Standard in EMS | Industry standard |
| GPS synchronisation | ⚠️ **CHECK** | Optional | For precise timestamps |

**Current Documentation:**
- Standard for IEC 61850 systems
- AXOS EMS includes time sync

**Note:** Confirm if GPS-PPS is available for high-precision applications.

---

## 3. PROTECTION & MV INTEGRATION

### 3.1 MV Protection Coordination Study 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| Protection coordination study | 🔴 **PENDING** | Site-specific required |
| Relay types specification | 🔴 **PENDING** | Need relay datasheets |
| CT/VT specifications | 🔴 **PENDING** | Class, ratios |
| Protection settings | 🔴 **PENDING** | Time-current curves |

**Current Documentation:**
- CyprusDSO.md §3: Protection settings requirements defined
- No MV skid protection documentation from Linyang

**Required from Linyang:**
```
□ MV protection relay specification
□ CT/VT specifications (class, burden, ratio)
□ Protection coordination philosophy
□ Recommended settings for Cyprus grid
```

---

### 3.2 Trip Matrix 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| Protection logic diagram | 🔴 **PENDING** | PCS ↔ Transformer ↔ Battery |
| Interlocking scheme | 🔴 **PENDING** | Trip propagation logic |
| Emergency stop sequence | 🔴 **PENDING** | Safety shutdown procedure |

**Required from Linyang:**
```
□ Protection trip matrix (Excel/PDF)
□ Interlock logic diagram
□ Emergency shutdown procedure
```

---

### 3.3 System Single-Line Diagram (SLD) ⚠️ PARTIAL

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| Overall system SLD | ⚠️ **PARTIAL** | Various docs | Conceptual only |
| SLD with protection devices | 🔴 **PENDING** | - | All relays/breakers identified |
| MV skid SLDs | 🔴 **PENDING** | linyang.md | Listed as missing |

**Current Documentation:**
- linyang.md: MV Skid SLDs listed as ❌ Missing for all sizes (1MW-8MW)

**Required from Linyang:**
```
□ Complete system SLD (Battery + PCS + MV Skid + Transformer)
□ SLD with all protection devices identified
□ MV Skid internal SLD (for each size)
```

---

### 3.4 AC/DC Insulation Monitoring 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| Insulation monitoring method | 🔴 **PENDING** | DC side isolation |
| Test methodology | 🔴 **PENDING** | Periodic testing procedure |
| Alarm thresholds | 🔴 **PENDING** | Trip/alarm levels |

**Required from Linyang:**
```
□ DC insulation monitoring system specification
□ Insulation resistance test procedure
□ Alarm and trip thresholds
```

---

## 4. METERING & DSO SUBMISSION REQUIREMENTS

### 4.1 MV Metering Interface Diagram ⚠️ PARTIAL

| Item | Status | Notes |
|------|--------|-------|
| Metering CT/VT location | ⚠️ **PARTIAL** | Shown in conceptual SLD |
| CT/VT class and ratios | 🔴 **PENDING** | Class 0.2S/0.5 required |
| Wiring diagram | 🔴 **PENDING** | Terminal connections |

**Current Documentation:**
- CyprusDSO.md: Metering requirements defined per DSO

**Required from Linyang:**
```
□ Metering CT/VT specification (Class 0.2S minimum)
□ Metering wiring diagram
□ Meter integration guide
```

---

### 4.2 Metering Compliance Confirmation 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| EN/IEC metering standards | 🔴 **PENDING** | EN 62053-22, etc. |
| DSO-compliant meter | 🔴 **PENDING** | Pre-approved meter model |
| MID certification | 🔴 **PENDING** | Measuring Instruments Directive |

**Required from Linyang:**
```
□ Recommended meter model (DSO pre-approved)
□ Metering compliance statement
□ MID certificate (if integrated meter)
```

---

### 4.3 Data Retention Capability 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| Operational log retention | 🔴 **PENDING** | Minimum 2 years required |
| Metering data storage | 🔴 **PENDING** | Historical energy data |
| Event log capacity | 🔴 **PENDING** | Alarms, trips, events |

**Required from Linyang:**
```
□ Data retention specification
□ Storage capacity (local vs cloud)
□ Data export formats
```

---

## 5. MECHANICAL, CIVIL & AUXILIARY SYSTEMS

### 5.1 Auxiliary Power Consumption Table ⚠️ PARTIAL

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| Total auxiliary consumption | ⚠️ **PARTIAL** | linyang.md | ~2% stated |
| HVAC power | ⚠️ **PARTIAL** | linyang.md | 45kW cooling system |
| BMS/control power | 🔴 **PENDING** | - | Itemized breakdown needed |
| Fire suppression power | 🔴 **PENDING** | - | Standby + active |
| PCS auxiliary power | 🔴 **PENDING** | Kehua | Fans, control, standby |

**Current Documentation:**
- linyang.md §3: ~2% auxiliary consumption stated
- linyang.md §3.9: 45kW liquid cooling system
- No detailed breakdown per subsystem

**Required from Linyang:**
```
□ Auxiliary power consumption table:
  | Subsystem | Standby (kW) | Operating (kW) | Peak (kW) |
  |-----------|--------------|----------------|-----------|
  | HVAC      |              |                |           |
  | BMS       |              |                |           |
  | Fire System|             |                |           |
  | PCS Aux   |              |                |           |
  | Pumps     |              |                |           |
  | Lighting  |              |                |           |
  | TOTAL     |              |                |           |
```

---

### 5.2 Transformer Installation Requirements ✅ ANSWERED

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| Oil containment | ✅ **KNOWN** | Standard practice | 110% bund required |
| Clearances | ✅ **KNOWN** | Transformer datasheet | Per manufacturer |
| Earthing scheme | ⚠️ **PARTIAL** | - | General requirements known |

**Current Documentation:**
- Standard transformer installation requirements per EN/IEC
- CyprusDSO.md §18: Reinforced concrete foundation required

**Required from Linyang:**
```
□ Transformer foundation drawing (if integrated)
□ Oil containment requirements
□ Minimum clearances diagram
```

---

### 5.3 Grounding/Earthing Design 🔴 PENDING

| Item | Status | Notes |
|------|--------|-------|
| Grounding system design | 🔴 **PENDING** | Site-specific calculation |
| Step/touch voltage calculations | 🔴 **PENDING** | Safety analysis |
| Earth electrode requirements | 🔴 **PENDING** | Resistance targets |

**Note:** This is typically site-specific and may require local engineering.

**Required from Linyang:**
```
□ Recommended earthing philosophy
□ Grounding connection points
□ Earth resistance requirements
□ Equipotential bonding diagram
```

---

### 5.4 Floor Loading & Foundation Requirements ⚠️ PARTIAL

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| Container weight | ✅ **ANSWERED** | linyang.md | ~41.5 tonnes |
| Container dimensions | ✅ **ANSWERED** | linyang.md | 6,058 × 2,438 × 2,896 mm |
| Point loading | 🔴 **PENDING** | - | Per corner/twist lock |
| Foundation design | ⚠️ **PARTIAL** | CyprusDSO.md | Reinforced concrete required |

**Current Documentation:**
- linyang.md §3: 41.5 tonnes, 20HC container dimensions
- CyprusDSO.md §18: Reinforced concrete base required (law)

**Required from Linyang:**
```
□ Point loading diagram (ISO corner locations)
□ Load per corner/support point
□ Foundation recommendation
□ Anchor bolt pattern
```

---

## 6. WARRANTY & CERTIFICATION

### 6.1 Complete Warranty Terms ✅ ANSWERED

| Item | Status | Source | Notes |
|------|--------|--------|-------|
| Product warranty | ✅ **ANSWERED** | linyang.md §4 | 5 years base |
| Performance warranty | ✅ **ANSWERED** | linyang.md §4 | 80% @ 10 years |
| Degradation guarantee | ✅ **ANSWERED** | linyang.md §2 | Full SOH curves |
| Throughput warranty | ✅ **ANSWERED** | linyang.md §4 | 6,000-8,000 cycles |

**Current Documentation:**
- linyang.md §4: Complete warranty section
- linyang.md §2: 20-year degradation curves (4 operating conditions)
- legal/ClientLTSA.md: Client-facing warranty structure

---

### 6.2 Certification Dossier ⚠️ PARTIAL

| Certificate | Status | Source | Gap |
|-------------|--------|--------|-----|
| UL 9540A (Cell) | ✅ | Report 4791099276 | Complete |
| UL 9540A (Module) | ✅ | Report 80239433 | Complete |
| UL 9540A (Unit) | ✅ | Report 80239432 | Complete |
| IEC 62619 | ✅ | CB Certificate | Complete |
| IEC 63056 | ✅ | CB Certificate | Complete |
| UN38.3 | ✅ | Transport | Complete |
| **EN 50549-2** | 🔴 | **MISSING** | **CRITICAL - PCS** |
| IEC 62116 | 🔴 | MISSING | Anti-islanding (PCS) |
| IEC 61727 | 🔴 | MISSING | PV inverter requirements |

**Current Documentation:**
- CyprusDSO.md §12: Full certification matrix

**Required from Kehua:**
```
□ EN 50549-2 Type Test Certificate (CRITICAL)
□ IEC 62116 Anti-Islanding Test Report
□ IEC 61727 Compliance (if applicable)
□ CE Declaration of Conformity (PCS)
```

---

### 6.3 FAT/SAT Procedures ⚠️ PARTIAL

| Item | Status | Notes |
|------|--------|-------|
| FAT procedure | ⚠️ **PARTIAL** | General process known |
| SAT procedure | ⚠️ **PARTIAL** | Commissioning checklist exists |
| Integrated system test | 🔴 **PENDING** | BESS + PCS + Transformer |

**Current Documentation:**
- linyang.md: FAT/SAT procedures listed as ❌ Missing

**Required from Linyang:**
```
□ Factory Acceptance Test (FAT) procedure
□ FAT checklist and acceptance criteria
□ Site Acceptance Test (SAT) procedure
□ SAT checklist and acceptance criteria
□ Integrated system commissioning procedure
```

---

## PRIORITY ACTION MATRIX

### 🔴 CRITICAL (Blocking DSO Submission)

| # | Item | Owner | Impact |
|---|------|-------|--------|
| 1 | **EN 50549-2 Certificate** | Kehua | Cannot submit grid application |
| 2 | **LVRT/HVRT Curves** | Kehua | DSO protection study |
| 3 | **IEC 60870-5-104 Point List** | Linyang | SCADA integration |
| 4 | **System SLD with Protections** | Linyang | DSO submission |

### 🟡 HIGH (Required for Design)

| # | Item | Owner | Impact |
|---|------|-------|--------|
| 5 | Frequency response curves | Kehua | Grid code compliance |
| 6 | Protection coordination study | Linyang/EPC | MV design |
| 7 | Trip matrix | Linyang | Protection logic |
| 8 | Auxiliary power breakdown | Linyang | Aux transformer sizing |
| 9 | FAT/SAT procedures | Linyang | Commissioning planning |

### 🟢 MEDIUM (Can proceed without)

| # | Item | Owner | Impact |
|---|------|-------|--------|
| 10 | Cybersecurity specification | Linyang | Via partner EMS |
| 11 | Metering compliance | Linyang/EPC | Use DSO-approved meter |
| 12 | Grounding design | EPC | Site-specific |
| 13 | Foundation loading | Linyang | Engineering can estimate |

---

## CONFIRMED BY KAMIL (January 2026)

| Item | Status | Notes |
|------|--------|-------|
| **ABB MV Switchgear** | ✅ **INCLUDED** | In MV SKID |
| **Kehua PCS C-series** | ✅ **CONFIRMED** | All PCS are BCS1250K-**C**-HUD |

---

## PRICING SCOPE CLARIFICATIONS (Next RFI)

These items from the group's itemized breakdown need confirmation whether included in Linyang CIF or separate:

| # | Item | Group Shows | Question | Impact if NOT in CIF |
|---|------|-------------|----------|----------------------|
| 1 | **Power Plant Controller (PPC)** | €79,300 | Built into PCS or separate? | +€3,965/MWh |
| 2 | **Grid Forming Controller** | €40,000 | Built-in or add-on? | +€2,000/MWh |
| 3 | **LV Control Cabinet** | Part of Switchgear | In MV SKID or separate? | Included in above? |
| 4 | **Protection Relays** | Part of RTU | In SKID or customer scope? | Part of RTU |
| 5 | **RTU** | €39,600 | Linyang supply or customer? | +€1,980/MWh |
| 6 | **Auxiliary System & Comms** | €39,600 | What exactly is included? | +€1,980/MWh |
| 7 | **Commissioning scope** | €66,900 | What does "training & launch" cover vs full DSO commissioning? | Overlapping scope |

---

## RECOMMENDED FOLLOW-UP EMAIL

```
Subject: RFI Follow-Up - Critical Items for DSO Grid Connection + Scope Clarification

Dear Kamil / Linyang Team,

Thank you for confirming that ABB switchgear is included in the MV SKID and that all
Kehua PCS units are C-series.

Following our RFI dated [DATE], we kindly request urgent response on the following:

PART A - CRITICAL FOR DSO SUBMISSION:
1. EN 50549-2 Type Test Certificate for Kehua BCS1250K-C-HUD PCS
2. LVRT/HVRT curves (voltage dip ride-through)
3. Complete IEC 60870-5-104 SCADA point list
4. System Single-Line Diagram with all protection devices

PART B - HIGH PRIORITY:
5. Frequency response curves (P vs f) with droop settings
6. Auxiliary power consumption breakdown table
7. FAT/SAT procedures for integrated system

PART C - SCOPE CLARIFICATION (for EPC pricing):
We need to confirm which items are included in the MV SKID supply:

8. Power Plant Controller (PPC) - included in PCS or separate?
9. Grid Forming capability - built-in to C-series or add-on?
10. LV Control Cabinet - included or separate?
11. Protection Relays - in SKID or customer scope?
12. RTU - Linyang supply or customer scope?
13. Auxiliary System & Communication cabinet - included or separate?
14. "Training and launch" commissioning - what exactly does this cover?

Please provide documents in PDF format and written confirmation of scope items.

Best regards,
Lighthief Cyprus Ltd
```

---

## DOCUMENT CROSS-REFERENCES

| Topic | Documentation Location |
|-------|----------------------|
| DSO Requirements | docs/CyprusDSO.md |
| TSO Requirements | docs/CyprusDSO.md §13-15 |
| Linyang Specifications | docs/linyang.md |
| Certification Status | docs/CyprusDSO.md §12 |
| Missing Documents | docs/linyang.md §12 |
| Group RFI Tracker | docs/internal/group-rfi-tracker.md |

---

*Document prepared by: Lighthief Cyprus Ltd*
*Classification: INTERNAL*
*Last Updated: January 2026*
