> ## PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> *Last verified: 26 February 2026*

---

# VOLTUS EMS/SCADA COST ALLOCATION

**Document Reference:** LCY-VOLTUS-ALLOCATION-FEB2026-R4  
**Date:** 26 February 2026  
**Source:** `2026-02-24 Cyprus EMS Project List - Voltus Price - new update SCADA.xlsx`  
**Previous Version:** R3 (16 February 2026, 2-tier SCADA)  
**Status:** UPDATED — New 5-tier SCADA Local, EMS subscription pricing, Order Agreement received

---

## COST ALLOCATION RULES

> **Client pays:** EMS capex + SCADA Local capex + EMS subscription (annual) + SCADA Local maintenance (annual)  
> **Lighthief (EPC/OM) pays:** SCADA Global capex + SCADA Global maintenance (annual)  
> **No portfolio discount** — removed from pricing model

---

## 1. COST STRUCTURE (Updated 24 Feb 2026)

### Per-Park Costs (EMS) — Client-Facing

| Component | Description |
|-----------|-------------|
| System + Hardware | WAGO PFC200 PLC, I/O Modules, EMS software |
| Remote Configuration & Preparation | Software setup, grid integration |
| On-site Installation + Training | Labor for installation and training |
| EMS Subscription | ~10% of EMS hardware cost per year (mandatory for advanced features) |

### Per-Park Costs (SCADA Local) — Client-Facing — 5-Tier Model

| Tier | MWh Range | Capex (one-time) | Maintenance/yr (20%) | Parks |
|------|-----------|------------------:|---------------------:|------:|
| MINI | ≤4 MWh | €12,000 | €2,400 | 6 |
| BASIC | 5 MWh | €15,000 | €3,000 | 5 |
| STANDARD | 7.5–8 MWh | €20,000 | €4,000 | 5 |
| ADVANCED | ≥10 MWh | €30,000 | €6,000 | 33 |
| MEGA | ≥60 MWh | €80,000 | €16,000 | 2 |

### Per-Group Costs (SCADA Global) — Lighthief EPC/OM Cost

| Group | Capex (one-time) | Maintenance/yr |
|-------|------------------:|---------------:|
| G1: ABIO | €60,000 | €12,000 |
| G2: Esperia | €60,000 | €12,000 |
| G3: Timotheos | €50,000 | €10,000 |
| Standalone | €0 | €0 |
| **Lighthief Total** | **€170,000** | **€34,000** |

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

Parks: Greendorado (Agrivoltaic, Larnaca 1, Larnaca 2, 1), Agios Sozomenos, Dianary (1, 2, 3),
ELESTORE (1-5), Easy Power (1, 2, 3, 4), Polemi, Potamia (p151, p208),
Renergetic (1, 2), Solarity, Solartech 3 Extension, Waneron

| Metric | Value |
|--------|-------|
| Total MW | 125.0 |
| Total MWh | 430.3 |
| Containers | 125 (33 MV + 92 BESS) |
| EMS Capex | €1,131,275 |
| SCADA Local Capex | €677,000 |
| **Client Capex Total** | **€1,808,275** |
| Client Annual (EMS sub + SCADA Local maint) | **€190,334/yr** |
| **Client Annual per MWh** | **€442/MWh** |

### G2: ESPERIA ENERGY — 11 parks — Aggregator: Synenergia

Parks: Esperia Famagusta (1, 2), Esperia Frenaros, Esperia Limassol,
Galascope (1, 2), Esperia Tseri (1, 2a, 2b, 2c, 3)

| Metric | Value |
|--------|-------|
| Total MW | 79.5 |
| Total MWh | 310.5 |
| Containers | 79 (16 MV + 63 BESS) |
| EMS Capex | €666,726 |
| SCADA Local Capex | €410,000 |
| **Client Capex Total** | **€1,076,726** |
| Client Annual (EMS sub + SCADA Local maint) | **€114,776/yr** |
| **Client Annual per MWh** | **€370/MWh** |

### G3: TIMOTHEOS TIMOTHEOU — 9 parks

Parks: L&T (Res Systems, Solar Power, Sun Energy, Energia, PV Tech),
AGM (Lightpower, Sunfield 1, Sunfield 2, Sunfield 3)

| Metric | Value |
|--------|-------|
| Total MW | 25.5 |
| Total MWh | 81.0 |
| Containers | 27 (10 MV + 17 BESS) |
| EMS Capex | €293,295 |
| SCADA Local Capex | €171,000 |
| **Client Capex Total** | **€464,295** |
| Client Annual (EMS sub + SCADA Local maint) | **€48,206/yr** |
| **Client Annual per MWh** | **€595/MWh** |

### Standalone — 6 parks (No SCADA Global)

| Park | Owner | MW | MWh | EMS Capex | SCADA Local | Client Capex | Annual/yr | EUR/MWh |
|------|-------|---:|----:|----------:|------------:|-------------:|----------:|--------:|
| Classone Solar Breeze | L. Andreadis | 1.5 | 5 | €26,304 | €12,000 | €38,304 | €3,638 | €728 |
| Classone Solar Garden | L. Andreadis | 3.3 | 10 | €33,374 | €20,000 | €53,374 | €5,596 | €560 |
| Paphos 1 | A Kerasi | 2.5 | 7.5 | €33,374 | €15,000 | €48,374 | €4,596 | €613 |
| Paphos 2 | A Kerasi | 2.5 | 7.5 | €33,374 | €20,000 | €53,374 | €5,596 | €746 |
| Paphos 3 | A Kerasi | 1.5 | 5 | €26,304 | €12,000 | €38,304 | €3,638 | €728 |
| My Sun Park | I. Karis | 7.7 | 25 | €54,583 | €30,000 | €84,583 | €8,670 | €347 |
| **TOTAL** | | **19.0** | **60.0** | **€207,313** | **€109,000** | **€316,313** | **€31,734** | **€529** |

#### Standalone Per-Client Summary

| Client | Parks | MWh | Annual/yr | EUR/MWh |
|--------|------:|----:|----------:|--------:|
| L. Andreadis | 2 | 15.0 | €9,234 | €616 |
| A Kerasi | 3 | 20.0 | €13,830 | €692 |
| I. Karis | 1 | 25.0 | €8,670 | €347 |

---

## 3. PORTFOLIO COST SUMMARY

### Client-Facing Capex

| Component | Groups (3) | Standalone (6) | **TOTAL** |
|-----------|----------:|---------------:|----------:|
| EMS (System+HW+Config+Install) | €2,091,296 | €207,313 | **€2,298,609** |
| SCADA Local | €1,258,000 | €109,000 | **€1,367,000** |
| **Client Capex Total** | **€3,349,296** | **€316,313** | **€3,665,609** |

### Lighthief EPC/OM Capex

| Component | Cost |
|-----------|-----:|
| SCADA Global (3 groups) | €170,000 |

### Grand Total Capex (All Parties)

| | Amount |
|--|-------:|
| Client-facing | €3,665,609 |
| Lighthief SCADA Global | €170,000 |
| **Total** | **€3,835,609** |

### Capex Comparison (R3 → R4)

| Component | R3 (16 Feb) | R4 (24 Feb) | Delta |
|-----------|----------:|----------:|------:|
| EMS | €2,298,609 | €2,298,609 | €0 |
| SCADA Local | €1,275,000 | €1,367,000 | **+€92,000** |
| SCADA Global | €420,000 | €170,000 | **-€250,000** |
| **Total** | **€3,993,609** | **€3,835,609** | **-€158,000** |

Key changes: Standalone parks no longer carry SCADA Global. G3 SCADA Global reduced €60k→€50k. New €80k MEGA tier hits Esperia Frenaros and Limassol (+€100k on G2 SCADA Local).

---

## 4. CLIENT-FACING ANNUAL SUBSCRIPTION & MAINTENANCE

### Per-Group Summary

| Group | MWh | EMS Sub/yr | SCADA Local Maint/yr | **Client Total/yr** | **EUR/MWh** |
|-------|----:|-----------:|---------------------:|--------------------:|------------:|
| G1: ABIO | 430.3 | €54,935 | €135,400 | **€190,334** | **€442** |
| G2: Esperia | 310.5 | €32,776 | €82,000 | **€114,776** | **€370** |
| G3: Timotheos | 81.0 | €14,006 | €34,200 | **€48,206** | **€595** |
| Standalone | 60.0 | €9,934 | €21,800 | €31,734 | €529 |
| **TOTAL** | **881.8** | **€111,651** | **€273,400** | **€385,050** | **€437** |

### Per-Park Detail — G1: ABIO POWER (€442/MWh group average)

| Park | MWh | EMS Sub | SCADA Maint | Total/yr | EUR/MWh |
|------|----:|--------:|------------:|---------:|--------:|
| Greendorado Agrivoltaic | 3.0 | €1,238 | €2,400 | €3,638 | €1,213 |
| Greendorado Larnaca 1 | 5.0 | €1,238 | €3,000 | €4,238 | €848 |
| Greendorado Larnaca 2 | 5.0 | €1,238 | €3,000 | €4,238 | €848 |
| Greendorado 1 | 8.0 | €1,596 | €4,000 | €5,596 | €700 |
| Agios Sozomenos | 25.0 | €2,670 | €6,000 | €8,670 | €347 |
| Dianary 1 | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Dianary 2 | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Dianary 3 | 35.0 | €3,386 | €6,000 | €9,386 | €268 |
| ELESTORE 1 | 40.0 | €3,744 | €6,000 | €9,744 | €244 |
| ELESTORE 2 | 40.0 | €3,744 | €6,000 | €9,744 | €244 |
| ELESTORE 3 | 40.0 | €3,744 | €6,000 | €9,744 | €244 |
| ELESTORE 4 | 40.0 | €3,744 | €6,000 | €9,744 | €244 |
| ELESTORE 5 | 40.0 | €3,744 | €6,000 | €9,744 | €244 |
| Easy Power 1 | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Easy Power 2 | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Easy Power 3 | 10.0 | €1,954 | €6,000 | €7,954 | €795 |
| Easy Power 4 | 8.0 | €1,596 | €3,000 | €4,596 | €575 |
| Polemi | 10.0 | €1,954 | €6,000 | €7,954 | €795 |
| Potamia p151 | 10.0 | €1,954 | €6,000 | €7,954 | €795 |
| Potamia p208 | 20.0 | €3,028 | €6,000 | €9,028 | €451 |
| Renergetic 1 | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Renergetic 2 | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Solarity | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Solartech 3 Ext. | 10.0 | €1,596 | €6,000 | €7,596 | €760 |
| Waneron | 11.3 | €1,596 | €6,000 | €7,596 | €673 |

### Per-Park Detail — G2: ESPERIA ENERGY (€370/MWh group average)

| Park | MWh | EMS Sub | SCADA Maint | Total/yr | EUR/MWh |
|------|----:|--------:|------------:|---------:|--------:|
| Esperia Famagusta | 20.0 | €2,312 | €6,000 | €8,312 | €416 |
| Esperia Famagusta 2 | 20.0 | €2,312 | €6,000 | €8,312 | €416 |
| Esperia Frenaros | 100.0 | €8,402 | €16,000 | €24,402 | €244 |
| Esperia Limassol | 60.0 | €5,357 | €16,000 | €21,357 | €356 |
| Galascope 1 | 15.0 | €1,954 | €6,000 | €7,954 | €530 |
| Galascope 2 | 8.0 | €1,596 | €4,000 | €5,596 | €700 |
| Esperia Tseri | 20.0 | €2,312 | €6,000 | €8,312 | €416 |
| Esperia Tseri 2a | 7.5 | €1,596 | €4,000 | €5,596 | €746 |
| Esperia Tseri 2b | 25.0 | €2,670 | €6,000 | €8,670 | €347 |
| Esperia Tseri 2c | 20.0 | €2,312 | €6,000 | €8,312 | €416 |
| Esperia Tseri 3 | 15.0 | €1,954 | €6,000 | €7,954 | €530 |

### Per-Park Detail — G3: TIMOTHEOS (€595/MWh group average)

| Park | MWh | EMS Sub | SCADA Maint | Total/yr | EUR/MWh |
|------|----:|--------:|------------:|---------:|--------:|
| L&T Res Systems | 4.0 | €1,238 | €2,400 | €3,638 | €910 |
| L&T Solar Power | 5.0 | €1,238 | €3,000 | €4,238 | €848 |
| L&T Sun Energy | 15.0 | €1,954 | €6,000 | €7,954 | €530 |
| L&T Energia | 5.0 | €1,238 | €3,000 | €4,238 | €848 |
| L&T PV Tech | 4.0 | €1,238 | €2,400 | €3,638 | €910 |
| AGM Lightpower | 24.0 | €2,670 | €6,000 | €8,670 | €361 |
| AGM Sunfield 1 | 15.0 | €1,954 | €6,000 | €7,954 | €530 |
| AGM Sunfield 2 | 5.0 | €1,238 | €3,000 | €4,238 | €848 |
| AGM Sunfield 3 | 4.0 | €1,238 | €2,400 | €3,638 | €910 |

---

## 5. LIGHTHIEF EPC/OM ANNUAL COSTS

| Component | Count | Annual/yr |
|-----------|------:|----------:|
| SCADA Global G1 | 1 | €12,000 |
| SCADA Global G2 | 1 | €12,000 |
| SCADA Global G3 | 1 | €10,000 |
| **Lighthief Total** | **3** | **€34,000/yr** |

---

## 6. ORDER AGREEMENT TERMS (New — Feb 2026)

Source: `ORDER AGREEMENT PART I & II - EMS SCADA`

### Payment Terms

| Milestone | Percentage |
|-----------|:----------:|
| Advance (within 7 days of signing) | 50% |
| Before delivery | 20% |
| After acceptance | 30% |

### Subscription Model

| Term | Detail |
|------|--------|
| Available periods | 1, 3, 5, or 10 years |
| Billing options | Monthly, annual upfront, or lump-sum for entire period |
| Includes | Updates, cybersecurity, database admin, protocol maintenance, advanced EMS modes, external data |
| Support included | 1 hour/month basic (unused time does not carry over) |
| Additional support | €80/hour or €1,000/day (8h) |

### If Subscription Expires

System reverts to **local-only EMS** — no access to:
- SCADA (local or global)
- Cloud and synchronization
- Historical data stored by Voltus
- External data sources (energy prices, weather forecasts, operator signals)
- Advanced modes (arbitrage, Peak Shaving, Zero/Set import/export)

### Implementation Timeline

| Phase | Duration |
|-------|----------|
| Project start | 6–8 weeks from signing + advance payment |
| System delivery | 28 days from customer readiness |
| Commissioning & acceptance | 14 days from installation readiness |
| Warranty response | 36 working hours |

### Warranty

- Covers software and hardware defects
- Extendable to 1, 3, 5, or 10 years (requires active subscription + latest software version)
- Does NOT cover: third-party interference, customer infrastructure issues, external device failures

---

## 7. KEY FINDINGS & ACTIONS

### Critical Issues

1. **G3 highest cost per MWh (€595/MWh):** 9 small parks with only 81 MWh — many below 10 MWh hit the expensive MINI/BASIC SCADA tiers.
2. **New €80k MEGA tier:** Esperia Frenaros (100 MWh) and Limassol (60 MWh) now €80k SCADA Local each instead of €30k — adds €100k to G2.
3. **EMS subscription is mandatory:** Without it, system loses all advanced functionality. €111,651/yr across portfolio.
4. **Subscription lock-in:** If client stops paying, system becomes a basic local controller with no SCADA visibility.
5. **Small parks disproportionately expensive:** Any park below 10 MWh pays €700-€1,213/MWh annually vs €244/MWh for 40 MWh parks.

### Action Items

1. **Negotiate MEGA tier:** Push back on €80k for Frenaros/Limassol — these are within the same group, should not be penalized for size
2. **Negotiate subscription rates:** 10% of hardware cost annually is steep — push for volume reduction on 51-park portfolio
3. **Review LOCKED pricing:** Parks with thin margins need to factor in annual subscription as client cost
4. **Subscription term decision:** Evaluate lump-sum vs annual — longer term may offer discount
5. **Lighthief procurement:** Cost the BoM items NOT included by Voltus (meters, switches, routers, cabinets, UPS, CT/VTs)
6. **Send Voltus:** BMS Modbus register map (WRDF-0I002-103) + Kehua IEC-104 point list (WRWF-0I002-06)

---

*Document prepared by: Lighthief Cyprus Ltd*  
*Last updated: 26 February 2026*  
*Classification: INTERNAL - CONFIDENTIAL*  
*Source: Voltus Energy — 2026-02-24 Cyprus EMS Project List - Voltus Price - new update SCADA.xlsx*
