> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 7 February 2026*

---

# Galascope Limited - BESS Portfolio

> **CONFIDENTIAL - INTERNAL USE ONLY**

---

## Client Information

| Field | Value |
|-------|-------|
| **Client Name** | Galascope Limited |
| **Project Type** | Hybrid (RES + BESS) - Category B |
| **District** | Famagusta |
| **Status** | ✅ Ordered (Q4 2025) |

---

## Projects Overview

| Project | PV Power | BESS Power | BESS Energy | Duration | Timeline |
|---------|----------|------------|-------------|----------|----------|
| Galascope 1 | 5.00 MW | 5.0 MW | 20 MWh | 4 hr | Q4 2025 |
| Galascope 2 | 2.50 MW | 2.5 MW | 10 MWh | 4 hr | Q4 2025 |
| **TOTAL** | 7.50 MW | **7.5 MW** | **30 MWh** | - | - |

---

## Pricing (Quotation LY202511281)

### Four-Tier Pricing (All prices ex VAT)

| Project | CIF (Linyang) | Installed Cost | Client Price | Non-Group | €/kWh (CIF) |
|---------|---------------|----------------|--------------|-----------|-------------|
| Galascope 1 (5MW/20MWh) | TBC | TBC | €2,258,900 | TBC | TBC |
| Galascope 2 (2.5MW/10MWh) | €791,740 | €923,697 | €1,206,300 | TBC | €94.71 |
| **TOTALS** | **TBC** | **TBC** | **€3,465,200** | **TBC** | - |

### EPC Adders Summary ⚠️ VERIFY

| Project | Containers | Adders Total | Status |
|---------|------------|--------------|--------|
| Galascope 1 | 5 | TBC | ⚠️ VERIFY |
| Galascope 2 | 3 | €110,580 | ⚠️ VERIFY |

> 📋 **See**: [Pricing Verification Tracker](../internal/pricing-verification.md)

### System Configuration (Confirmed by Dino Constantinou — 28 April 2026)

| Project | Battery | MV Skid | PCS Count |
|---------|---------|---------|-----------|
| Galascope 1 | 4× 5.015MWh (20HC) | T4 single skid (5MW, 40ft) | 4 × BCS1250K |
| Galascope 2 | 2× 5.015MWh (20HC) | T2 single skid (2.5MW, 20ft) | 2 × BCS1250K |

---

## System Configuration

### Project 1: 5MW/20MWh

| Component | Specification | Quantity |
|-----------|--------------|----------|
| Battery Container | 20HC 5.015MWh LFP (EVE 314Ah) | 4 sets |
| MV Skid | T4 (40ft HC) — 4× BCS1250K + SL-5000 transformer + RMU | 1 set |
| **Total containers** | **5 (4 BESS + 1 T4 MV skid)** | — |

### Project 2: 2.5MW/10MWh

| Component | Specification | Quantity |
|-----------|--------------|----------|
| Battery Container | 20HC 5.015MWh LFP (EVE 314Ah) | 2 sets |
| MV Skid | T2 (20ft) — 2× BCS1250K + SL-2500/3000 transformer + RMU | 1 set |
| **Total containers** | **3 (2 BESS + 1 T2 MV skid)** | — |

---

## Timeline

| Milestone | Target Date |
|-----------|-------------|
| Order Confirmed | Q4 2025 |
| Production | In Progress |
| Shipment | Q3 2026 |
| Installation | Q3–Q4 2026 |
| Commissioning (PAC) | December 2026 |

---

## DSO Requirements

| Requirement | Status |
|-------------|--------|
| Category | B (Hybrid) |
| SCADA Connection | Required |
| Grid Export | Per dispatch schedule |
| Grid Charging | Not allowed |

---

## Existing Solar Plant SCADA Infrastructure

> **Source**: CYRI04.E19.00.001_1.pdf (5MW) and CYRI04.E19.00.002_1.pdf (2.5MW) — received March 2026

Both Galascope solar plants are already operational with full SCADA/IEC 104 infrastructure. This is critical context for BESS integration planning.

### Galascope 1 (5MW PV)

| Parameter | Value |
|-----------|-------|
| **ASDU Address** | 114 |
| **Network Subnet** | 10.2.1.x |
| **PLC** | Yaskawa (Simatic) @ 10.2.1.1 |
| **IEC 104 Gateway** | IXXAT @ 10.2.1.2 |
| **GPRS Router** | Teltonika @ 10.2.1.3 |
| **Smart Logger** | Huawei @ 10.2.1.10 |
| **PQM** | Siemens @ 10.2.1.11 |
| **Protection Relay** | Siemens @ 10.2.1.12 |
| **Modbus Gateway** | ICP/DAs @ 10.2.1.30 |
| **Frequency Relay** | ABB CM-UFD (RS485 RTU) |
| **Router** | Mikrotik @ 10.2.1.254 |
| **Inverters** | 44× Huawei (4 groups × 11) |
| **EAC GPRS User** | Galascope1_PV |

### Galascope 2 (2.5MW PV)

| Parameter | Value |
|-----------|-------|
| **ASDU Address** | 115 |
| **Network Subnet** | 10.2.2.x |
| **PLC** | Yaskawa (Simatic) @ 10.2.2.1 |
| **IEC 104 Gateway** | IXXAT @ 10.2.2.2 |
| **GPRS Router** | Teltonika @ 10.2.2.3 |
| **Smart Logger** | Huawei @ 10.2.2.10 |
| **PQM** | Siemens @ 10.2.2.11 |
| **Protection Relay** | Siemens @ 10.2.2.12 |
| **Modbus Gateway** | ICP/DAs @ 10.2.2.30 |
| **Frequency Relay** | ABB CM-UFD (RS485 RTU) |
| **Router** | Mikrotik @ 10.2.2.254 |
| **Inverters** | 22× Huawei (2 groups × 11) |
| **EAC GPRS User** | Galascope2_PV |

### BESS Integration Implications

1. **IEC 104 already deployed** — Both plants use IXXAT gateways for DSO communication. Voltus EMS must coordinate a separate ASDU address (e.g. 116/117) to avoid conflicts.
2. **Curtailment setpoints active** — Active Power setpoints at 100%/60%/30%/0% are already handled by DSO. BESS will intercept curtailed energy.
3. **Modbus register maps available** — Full PLC-to-Gateway data exchange tables documented, enabling precise PCS integration points.
4. **Network is segregated** — Each plant on separate /24 subnet. BESS will likely need its own subnet or VLAN.

---

## MV/LV Equipment Data Sheets Received

> The following equipment data sheets were provided by the client (March 2026):

| Document | Equipment | Key Specs |
|----------|-----------|-----------|
| MV data sheet_SM6_IM_DMVLA.pdf | Schneider SM6 indoor MV switchgear | 7.2-36 kV, up to 25 kA/1s, vacuum CB (DMVL-A) |
| MV data sheet_RM6_DI.pdf | Schneider RM6 gas-insulated switchgear | Up to 24 kV, SF6 sealed-for-life, 20 kA/1s, IP67 tank |
| MV data sheet MV terminal kits_RSTI_Tyco.pdf | Raychem RSTI-58 screened connectors | 800A, up to 24 kV, CENELEC type "C" bushings |
| LV data sheet_ABB_ACB_4P_1000VAC.pdf | ABB Emax2 E2.2S ACB | 1250A, 4-pole, 900V, 50 kA Icu |
| LV data sheet_ABB_MCCB_4P_1000VAC.pdf | ABB Tmax T4L250 MCCB | 250A, 4-pole, 1000V AC, 12 kA at 1kV |
| LV panel_11_MCCB_4P_800VAC.pdf | LV panel assembly drawing | 2000×1750×700mm panel |

### Equipment Analysis

- **SM6 / RM6**: Client is evaluating MV switchgear options for either BESS MV room or grid connection point. SM6 (indoor, modular) is typical for BESS installations. RM6 (compact, SF6) is more common for secondary distribution.
- **ABB ACB 1250A**: Suitable as BESS LV main breaker on PCS output side (690V AC). Ekip Dip LSI protection trip unit provides full overcurrent protection.
- **ABB MCCB 250A**: Likely for auxiliary/distribution circuits within the BESS compound.
- **RSTI-58 connectors**: MV cable terminations for connecting to SM6/RM6 switchgear — standard for BESS MV interconnection.

---

## Other Documents Received

| Document | Description |
|----------|-------------|
| Galascope_2.5MW_SLD_MCTS.PDF | Single Line Diagram for Galascope 2.5MW (MV connection) |
| new title deed 647.pdf | Land title deed for site |
| Kανόνες Μεταφοράς και Διανομής_4_0_0_Ενοποιημένοι.pdf | Cyprus T&D Rules v4.0.0 (Consolidated) — Greek language |

---

## ⚠️ EPC Budget Gap — BoP Protection Hardware (April 2026)

> **Identified during SLD Rev. C engineering review.**  
> The current EPC adder model for Galascope 2 (€110,580) **does not include** the following hardware required for DSO Category B grid connection compliance:

| Item | Est. Cost |
|------|-----------|
| New MV feeder panel (JZ4) in existing SwS — Schneider SM6 or matching | €15,000 – €25,000 |
| Protection relay — Siemens SIPROTEC 7SJ82 (50/51, 50N/51N, 67N, 27/59, 81, 78) | €5,000 – €8,000 |
| MV CTs × 3 phases (dual-core 5P20 + 0.5) | €3,000 – €5,000 |
| MV VTs (22/0.1 kV, Class 0.5/3P) | €2,000 – €3,000 |
| NER 25 Ω / 100 kJ (if not included in Linyang T2 skid — confirm) | €3,000 – €5,000 |
| **Total unbudgeted** | **€28,000 – €46,000** |

**Also note**: Linyang BCS1250K-C-HUD LV output is confirmed **690 V AC** (per offer ref. 198/A/KT/2025).  
T2 skid transformer ratio must be **22 kV / 690 V** (not 800 V as previously assumed in some internal documents).  
SLD drawing `SLD-galascope-2.5MW-BESS.html` corrected to Rev. D — use that as reference.

**Actions:**
- [ ] Confirm with Linyang: NER, MV surge arresters, LV surge arresters — in or out of T2 skid scope?
- [ ] Get local contractor quotation for JZ4 panel + protection relay integration
- [ ] Update `docs/Bess - EPC System Cost v2.xlsx` with new BoP Protection HW line (~€28k base)
- [ ] Check all other Esperia Phase 1 projects for same gap (Famagusta 6.5MW/20MWh and Frenaros 25MW/100MWh)

---

## Notes

- First confirmed orders from client list
- Both projects in Famagusta district — Avgorou site
- Combined delivery recommended for logistics efficiency
- Full SCADA documentation now available for both existing PV plants
- Client is actively evaluating MV/LV equipment for BESS BoP
- EOA (Environmental/Planning) submitted 28 April 2026 — awaiting application number
- Dino Constantinou confirmed civil/earthworks are client scope (30 April 2026)
- **Configuration confirmed by Dino Constantinou 30 April 2026**: G1 = 5MW/20MWh (T4 + 4×BESS), G2 = 2.5MW/10MWh (T2 + 2×BESS)
