> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> *Last verified: 16 February 2026*

---

# VOLTUS EMS/SCADA COST ALLOCATION

**Document Reference:** LCY-VOLTUS-ALLOCATION-FEB2026-R3  
**Date:** 16 February 2026  
**Source:** `2026-02-16 Cyprus EMS Project List - Voltus Price - new update SCADA.xlsx`  
**Previous Version:** R2 (27 January 2026, 6 groups)  
**Status:** ✅ UPDATED — New Voltus quote received, 3 groups + 6 standalone

---

## ⚠️ CRITICAL CHANGE — SCADA LOCAL TIERED PRICING

> **NEW:** Voltus has introduced a two-tier SCADA Local pricing model effective Feb 2026:
>
> | Tier | Threshold | SCADA Local (capex) | Maintenance/yr |
> |------|-----------|---------------------|----------------|
> | **BASIC** | ≤8 MWh | €15,000 | €3,000 |
> | **ADVANCED** | ≥10 MWh | €30,000 | €6,000 |
>
> **Impact:** 34 of 51 parks are ADVANCED (≥10 MWh). SCADA Local capex increased from €765,000 to **€1,275,000 (+€510,000)**.

---

## 1. COST STRUCTURE (Updated Feb 2026)

### Per-Park Costs (EMS)
| Component | Description |
|-----------|-------------|
| System + Hardware | WAGO PFC200 PLC, I/O Modules, EMS software |
| Remote Configuration & Preparation | Software setup, grid integration |
| On-site Installation + Training | Labor for installation and training |

### Per-Park Costs (SCADA Local)
| Component | BASIC (≤8 MWh) | ADVANCED (≥10 MWh) |
|-----------|-----------------|---------------------|
| SCADA Local (one-time) | €15,000 | €30,000 |
| SCADA Local maintenance | €3,000/year | €6,000/year |

### Per-Group Costs (SCADA Global)
| Component | Cost |
|-----------|------|
| SCADA Global (on-premise) | €60,000 (one-time per group) |
| SCADA Global maintenance | €12,000/year |

### Volume Discounts (New)
| Discount | Detail |
|----------|--------|
| Portfolio discount | 5% on full 51-park order |
| Free SCADA Global | 2 free instances (1 installation + 1 service) |
| Maintenance discount | Available, pending final SCADA Global count |

### BoM Scope Clarification
| Included by Voltus | NOT included (Lighthief to procure) |
|--------------------|--------------------------------------|
| WAGO PFC200 PLC Controller | Energy Meters (grid-side, BESS-side) |
| WAGO I/O Modules (750 series) | Network Switch (managed) |
| EMS Software License | Industrial Router / VPN Firewall |
| SCADA Local Software | 4G/LTE SIM Router, SIM cards |
| | Control Cabinet / Enclosure |
| | UPS for Controls |
| | CT/VT transducers |
| | GPS antenna, Ethernet/fibre cabling |
| | SCADA Global server hardware |

---

## 2. GROUP STRUCTURE (3 Groups + 6 Standalone)

### G1: ABIO POWER — 25 parks — Aggregator: ABIO

SCADA Global Share: **€2,400 per park** (€60,000 ÷ 25 parks)

Parks: Greendorado (Agrivoltaic, Larnaca 1, Larnaca 2, 1), Agios Sozomenos, Dianary (1, 2, 3), 
ELESTORE (1-5), Easy Power (1, 2, 3, 4), Polemi, Potamia (p151, p208), 
Renergetic (1, 2), Solarity, Solartech 3 Extension, Waneron

| Metric | Value |
|--------|-------|
| Total MW | 125.0 |
| Total MWh | 430.3 |
| Containers | 125 (33 MV + 92 BESS) |
| EMS Total | €1,131,275 |
| SCADA Local | €675,000 (4 BASIC + 21 ADVANCED) |
| SCADA Global | €60,000 |
| **Group Total** | **€1,866,275** |

### G2: ESPERIA ENERGY — 11 parks — Aggregator: Synenergia

SCADA Global Share: **€5,455 per park** (€60,000 ÷ 11 parks)

Parks: Esperia Famagusta (1, 2), Esperia Frenaros, Esperia Limassol, 
Galascope (1, 2), Esperia Tseri (1, 2a, 2b, 2c, 3)

| Metric | Value |
|--------|-------|
| Total MW | 79.5 |
| Total MWh | 310.5 |
| Containers | 79 (16 MV + 63 BESS) |
| EMS Total | €666,726 |
| SCADA Local | €300,000 (2 BASIC + 9 ADVANCED) |
| SCADA Global | €60,000 |
| **Group Total** | **€1,026,726** |

### G3: TIMOTHEOS TIMOTHEOU — 9 parks

SCADA Global Share: **€6,667 per park** (€60,000 ÷ 9 parks)

Parks: L&T (Res Systems, Solar Power, Sun Energy, Energia, PV Tech), 
AGM (Lightpower, Sunfield 1, Sunfield 2, Sunfield 3)

| Metric | Value |
|--------|-------|
| Total MW | 25.5 |
| Total MWh | 81.0 |
| Containers | 27 (10 MV + 17 BESS) |
| EMS Total | €293,295 |
| SCADA Local | €180,000 (5 BASIC + 4 ADVANCED) |
| SCADA Global | €60,000 |
| **Group Total** | **€533,295** |

### Standalone — 6 parks (Individual SCADA Global each)

| Park | Owner | MW | MWh | EMS | SCADA Local | SCADA Global | Total |
|------|-------|---:|----:|----:|------------:|-------------:|------:|
| Classone Solar Breeze | L. Andreadis | 1.5 | 5 | €26,304 | €15,000 | €60,000 | €101,304 |
| Classone Solar Garden | L. Andreadis | 3.3 | 10 | €33,374 | €30,000 | **FREE** | €63,374 |
| Paphos 1 | A Kerasi | 2.5 | 7.5 | €33,374 | €15,000 | €60,000 | €108,374 |
| Paphos 2 | A Kerasi | 2.5 | 7.5 | €33,374 | €15,000 | €60,000 | €108,374 |
| Paphos 3 | A Kerasi | 1.5 | 5 | €26,304 | €15,000 | €60,000 | €101,304 |
| My Sun Park | I. Karis | 7.7 | 25 | €54,583 | €30,000 | **FREE** | €84,583 |
| **TOTAL** | | **19.0** | **60.0** | **€207,313** | **€120,000** | **€240,000** | **€567,313** |

*Note: 2 free SCADA Global instances allocated to largest standalone parks (My Sun Park, Classone Solar Garden)*

---

## 3. PORTFOLIO COST SUMMARY

| Component | Groups (3) | Standalone (6) | **TOTAL** |
|-----------|-----------|----------------|-----------|
| EMS (System+HW+Config+Install) | €2,091,296 | €207,313 | **€2,298,609** |
| SCADA Local | €1,155,000 | €120,000 | **€1,275,000** |
| SCADA Global | €180,000 | €240,000 | **€420,000** |
| **TOTAL** | **€3,426,296** | **€567,313** | **€3,993,617** |

### Before vs After Comparison

| Metric | Old (Jan 2026, 6 grp) | New (Feb 2026, 3+6) | Delta |
|--------|----------------------|---------------------|-------|
| EMS Quotes | €2,354,992 | €2,298,609 | **-€56,383** |
| SCADA Local | €765,000 (all @€15k) | €1,275,000 (tiered) | **+€510,000** |
| SCADA Global | €360,000 (6 groups) | €420,000 (3+4 SA) | **+€60,000** |
| **Total EMS/SCADA** | **€3,479,992** | **€3,993,609** | **+€513,617** |
| **With 5% discount** | - | **€3,793,929** | **+€313,937** |

---

## 4. MARGIN IMPACT ANALYSIS (Updated)

### Group-Level Margins

| Group | Parks | MWh | Installed Cost | Revenue | Old Margin | New Margin | Change |
|-------|------:|----:|---------------:|--------:|-----------:|-----------:|-------:|
| G1: ABIO | 25 | 430.3 | €47,401,603 | €52,609,992 | 8.0% | **9.9%** | +1.9pp |
| G2: ESP | 11 | 310.5 | €33,145,514 | €36,412,812 | 9.9% | **9.0%** | -0.9pp |
| G3: TIM | 9 | 81.0 | €10,780,781 | €11,818,919 | 10.9% | **8.8%** | -2.1pp |
| Standalone | 6 | 60.0 | €7,854,789 | €8,399,464 | 10.9% | **6.5%** | -4.4pp |
| **TOTAL** | **51** | **881.8** | **€97,599,747** | **€109,241,187** | — | **10.7%** | — |

### Problem Parks (Margin < 8%)

28 out of 51 parks now have margins below 8%. Key concerns:

| Category | Parks | Avg Margin | Root Cause |
|----------|------:|------------|------------|
| LOCKED price, <5% | 12 | 3.4% | Client prices already committed, SCADA increase erodes margin |
| LOCKED price, 5-8% | 8 | 6.4% | ELESTORE/ESP-LIM with thin pre-existing margins |
| 13% price, <8% | 8 | 5.3% | Standalone parks bearing full SCADA Global cost |

---

## 5. ANNUAL MAINTENANCE

| Component | Count | Unit Cost | Total/Year |
|-----------|------:|----------:|-----------:|
| SCADA Local BASIC (≤8 MWh) | 17 parks | €3,000 | €51,000 |
| SCADA Local ADVANCED (≥10 MWh) | 34 parks | €6,000 | €204,000 |
| SCADA Global (3 groups + 6 SA) | 9 instances | €12,000 | €108,000 |
| **TOTAL** | | | **€363,000/year** |

*Old maintenance total was €225,000/year. Increase: +€138,000/year.*

---

## 6. KEY FINDINGS & ACTIONS

### ❌ CRITICAL ISSUES

1. **SCADA Local price surge (+€510k):** The BASIC/ADVANCED split doubles cost for 34 parks. Negotiate with Voltus.
2. **Portfolio margin is 10.7%:** Per v4 spreadsheet (€97.6M installed / €109.2M revenue). Client-paid items (Protection Testing, External LPS, Electrical Drawings) removed from cost model.
3. **Review parks below 8% margin:** Some parks may still have thin margins — check v4 spreadsheet for current per-park data.
4. **Standalone parks severely impacted:** €60k SCADA Global per park makes small standalone parks uneconomic.

### 📋 ACTION ITEMS

1. **Negotiate SCADA Local:** Push for flat €15k or reduced ADVANCED rate for full portfolio
2. **Apply 5% discount:** Confirm discount applies to total including SCADA (saves ~€200k)
3. **Review LOCKED pricing:** Parks with <5% margin need client price renegotiation
4. **Standalone grouping:** Explore grouping Paphos (3 parks) + Classone (2 parks) under one SCADA Global
5. **Lighthief procurement:** Cost the BoM items NOT included by Voltus (meters, switches, routers, cabinets, UPS, CT/VTs)
6. **Send Voltus:** BMS Modbus register map (WRDF-0I002-103) + Kehua IEC-104 point list (WRWF-0I002-06)

---

*Document prepared by: Lighthief Cyprus Ltd*  
*Last updated: 16 February 2026*  
*Classification: INTERNAL - CONFIDENTIAL*  
*Source: Voltus Energy — 2026-02-16 Cyprus EMS Project List - Voltus Price - new update SCADA.xlsx*
