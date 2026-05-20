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

## As-Built Electrical Plant (May 2026)

> **Electrical hub:** [`electrical/README.md`](electrical/README.md) · [`electrical/CHANGELOG.md`](electrical/CHANGELOG.md)  
> **Full register:** [`electrical/analysis/galascope-as-built-equipment.md`](electrical/analysis/galascope-as-built-equipment.md)  
> **Datasheet folder (Drive):** `Galascope Datasheets Existing PV Park`  
> **MCTS renders:** [`electrical/as-built-refs/`](electrical/as-built-refs/)

| Layer | As-built | Design docs (pre-May 2026) |
|-------|----------|----------------------------|
| Customer SwS | **ABB UniSec** 24 kV, 16 kA/1s, 200 A (photo `IMG_0664.jpg`) | Schneider SM6 (incorrect) |
| G2 MCTS | **1× 1250 kVA** 22/0.8 kV, JZ1→SwS, JZ2→80 A fuse (EL00.01.02) | SLD HTML showed “2×1250” — **corrected** |
| G1 MCTS | **Siemens 8DJH** + **Lami 1250 kVA** per EL00.02.02; MCTS 1–4 naming | Confirm two MCTS for Rev F |
| PV transformer spare spec | **GALA BkAo 1250 kVA** Dyn11 Uk6% (client PDF) | Use if paralleling requires matched unit |

### MV/LV Data Sheets (client pack — March 2026)

| Document | Role |
|----------|------|
| `data sheet_1250kVA_11-22-0,8KV_GALA_rev.1.pdf` | Spare/replacement 1250 kVA for parallel operation |
| `data sheet_MV power cable_NA2XSY.pdf` | Existing MV cable family |
| SM6 / RM6 / RSTI PDFs | **Evaluation only** — not as-built at SwS |
| ABB Emax2 / Tmax / LV panel PDFs | Matches 5 MW MCTS LVS |

---

## BESS MV Connection — SLD Revisions

| Rev | Topology | Status |
|-----|----------|--------|
| **D** | New indoor cubicle (JZ4/JZ5) + MV cable to skid | Conservative; SM6 label wrong vs UniSec |
| **E** | Repurpose spare SwS bay → skid RMU (no new cubicle) | Needs confirmed free bay |
| **F** | **JZ2:** merge two PV MV feeders (2×1250 kVA, **G1**); **JZ3:** BESS feeder | [`electrical/analysis/galascope-revF-parallel-feeder-analysis.md`](electrical/analysis/galascope-revF-parallel-feeder-analysis.md) |
| **G** | Same SwS as **F**; field **G1a / G1b / G1c** (~10 m); **G2a/b/c** (~75–95 m) | [`electrical/analysis/galascope-revG-field-coupling.md`](electrical/analysis/galascope-revG-field-coupling.md) |

**DXF:** [`electrical/sld/rev-F/`](electrical/sld/rev-F/) · [`electrical/sld/rev-G/`](electrical/sld/rev-G/)

**Rev F — SwS:** **JZ3** = BESS (**7SJ82**). **JZ2** = combined PV. **ABB UniSec** (not SM6).

**Rev G — field (G1):** **G1a** outdoor tee + ~10 m cable (no 8DJH swap) · **G1b** add **8DJH T-module** · **G1c** ring **R↔R** ~10 m.

**G2 (2.5 MW):** Same **UniSec full / Rev F** issue as G1. Satellite: **3 pads** — **~75–240 m** apart. Detail: [`electrical/analysis/galascope-revG-field-coupling-g2.md`](electrical/analysis/galascope-revG-field-coupling-g2.md).

**Legacy HTML SLD:** [`electrical/sld/html/`](electrical/sld/html/)

---

## Other Documents Received

| Document | Description |
|----------|-------------|
| Galascope_2.5MW_SLD_MCTS.PDF | Single Line Diagram for Galascope 2.5MW (MV connection) |
| new title deed 647.pdf | Land title deed for site |
| Kανόνες Μεταφοράς και Διανομής_4_0_0_Ενοποιημένοι.pdf | Cyprus T&D Rules v4.0.0 (Consolidated) — Greek language |

---

## ⚠️ EPC Budget Gap — BoP Protection Hardware (April 2026, updated May 2026)

> **Identified during SLD Rev. C engineering review.** Rev **F** may avoid **new cubicle** cost if MCTS approves parallel PV feeders + JZ3 repurposing.

| Item | Est. Cost | Rev F impact |
|------|-----------|--------------|
| New MV cubicle (Rev D) — **ABB UniSec extension**, not SM6 | €15,000 – €25,000 | **Avoided** if Rev F approved |
| Client civil: MV tee + dual MCTS feeds + cable upgrade | €8,000 – €15,000 (indicative) | **Client scope** |
| 7SJ82 + CT/VT at **JZ3** BESS bay | €10,000 – €16,000 | Still required |
| GALA 1250 kVA trafo swap (if Lami mismatch) | €25,000 – €40,000 | **Only if** parallel witness fails |
| NER 25 Ω in skid (confirm CIF) | €0 – €5,000 | Unchanged |

**Also note**: Linyang BCS1250K-C-HUD LV output is **690 V AC**. T2/T4 skid = **22 kV / 690 V**. Existing PV LVS = **800 V** — do not tie LV buses.

**Actions:**
- [ ] MCTS RFI: Rev F parallel trafos + JZ3 BESS (see Rev F analysis checklist)
- [ ] Site walk: map **JZ2/JZ3** cables to MCTS-A / MCTS-B
- [ ] Confirm with Linyang: NER, surge arresters in skid scope
- [ ] Update EPC cost model: Rev F client works vs Rev D new cubicle

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
