# Galascope — As-Built Equipment Register (Existing PV)

> **Source folder:** `Galascope Datasheets Existing PV Park` (Drive, March 2026)  
> **MCTS SLDs:** `Galascope_2.5MW_SLD_MCTS.PDF` (EL00.01.02), `Galascope_5MW_SLD_MCTS.PDF` (EL00.02.02)  
> **Site photo:** `IMG_0664.jpg` — customer MV switching substation (SwS)

---

## Customer MV switching substation (as-built)

| Parameter | Confirmed value | Source |
|-----------|-----------------|--------|
| Manufacturer | **ABB** | Site photo |
| Type | **UniSec** air-insulated MV switchgear | Site photo |
| Voltage class | **24 kV** (22 kV system) | Photo label / project |
| Short-circuit rating | **16 kA / 1 s** (aligns with MCTS 2.5 MW sheet) | MCTS + photo |
| Continuous current | **200 A** panel class | MCTS EL00.01.02 |
| Cubicles visible | **≥ 4** functional bays | Photo |
| Protection relay | **ABB Relion** (REF615-class form factor) | Photo |
| Panel ID example | **EL 30004-BV** | Photo nameplate |

**Design correction:** Internal Rev D/E and `galascope.md` previously referenced **Schneider SM6**. SM6/RM6 PDFs in the datasheet pack are **client evaluation documents**, not as-built. All new SLD revisions must label the SwS as **ABB UniSec**.

---

## Field MCTS — Galascope 2.5 MW (EL00.01.02)

| Item | Specification |
|------|----------------|
| Drawing | EL00.01.02 — Main DB, MCTS 1,2 |
| MV switchgear | **JZ1** incomer (to customer SwS), **JZ2** fuse-switch to transformer |
| MV rating | **16 kA / 1 s**, **200 A**, **22 kV** |
| HV fuse | **80 A, 24 kV** (in JZ2) |
| Transformer | **1250 kVA**, **22 / 0.8 kV**, **Dyn11**, **Uk 6%**, ONAN |
| Transformer OEM (MCTS sheet) | Not named on 2.5 MW sheet (GALA BkAo in client datasheet pack) |
| LV bus | **800 V** L1–L3 |
| Main LV breaker | **1250 A** R900 3P+N, L.S.I. |
| Inverter feeders | **11 × 250 A** (to inverter isolators 1–11) |
| LV cable (trafo → LVS) | **3×(4×185) + 1×185** FG16 mm² Cu |
| Neutral earthing | **R = 1 Ω** resistor on transformer neutral (MCTS) |
| Earth bar | **50×10 mm Cu** PEN |

**Count:** **One** 1250 kVA transformer per MCTS building on the approved MCTS drawing. Do not assume **2×1250 kVA** on the 2.5 MW site without a separate second MCTS feeder drawing.

---

## Field MCTS — Galascope 5 MW (EL00.02.02)

| Item | Specification |
|------|----------------|
| Drawing | EL00.02.02 — Main DB, MCTS 1,2,3,4 |
| MV switchgear | **Siemens 8DJH RT** — ring unit (to SwS) + **T-unit** (fuse-switch to trafo) |
| MV rating | **20 kA / 3 s**, **200 A**, **22 kV** |
| HV fuse | **80 A, 24 kV** |
| MV cable (switchgear → trafo) | **3×NA2XS(F)2Y 1×50 mm²** Al XLPE |
| Transformer | **Lami Trafo** **1250 kVA**, **22–11 / 0.8 kV**, **Dyn11**, **Uk 6%**, ONAN |
| LV bus | **800 V** |
| Main LV breaker | **ABB Emax 2 E2.2S** **1250 A** Ekip Dip LSI |
| Inverter feeders | **11 × ABB T4V-HA 250 A** @ 800 V |

**Interpretation:** Title block **MCTS 1,2,3,4** indicates **four MCTS positions** in the park design (typically **two** operational 1250 kVA stations for 5 MWp, each with one 8DJH + one trafo). Confirm bay-to-MCTS mapping on overall park SLD before Rev F construction.

---

## Transformer datasheet (client pack — GALA BkAo)

| Parameter | Value |
|-----------|-------|
| File | `data sheet_1250kVA_11-22-0,8KV_GALA_rev.1.pdf` |
| Series | **BkAo** oil-immersed |
| Rating | **1250 kVA**, 50 Hz |
| Voltages | **11 000 / 22 000 V** → **800 V** |
| Vector group | **Dyn11** |
| Uk | **6%** (±10% taps, ±2×2.5%) |
| Cooling | ONAN |
| LV | **800 V** star (Al windings) |

Use for **replacement/spare** transformer if paralleling requires matched units (see Rev F analysis).

---

## Cables (existing plant — from datasheets + MCTS)

| Application | Document / as-built | Notes |
|-------------|---------------------|-------|
| MV plant cable | `data sheet_MV power cable_NA2XSY.pdf` | Al XLPE screened — typical Cyprus MV |
| MCTS MV (5 MW) | **3×1×50 mm²** NA2XS(F)2Y | As-built on EL00.02.02 |
| LV power | NAYY / NAY2Y datasheets | 0.6/1 kV distribution |
| LV trafo–panel (2.5 MW) | **FG16 185 mm²** multi-core | High ampacity vs 800 V inverter plant |
| DC solar | H1Z2Z2-K (several OEM certs) | String DC only |

---

## LV switchgear (existing)

| Equipment | Datasheet | As-built use |
|-----------|-----------|--------------|
| ABB Emax2 E2.2S 1250 A | `LV data sheet_ABB_ACB_4P_1000VAC.pdf` | 5 MW main ACB |
| ABB Tmax T4 250 A | `LV data sheet_ABB_MCCB_4P_1000VAC.pdf` | Inverter branches |
| Telergon disconnector | `LV data sheet_Telergon_switch disconnector.pdf` | Isolators |
| 11-way panel | `LV panel_11_MCCB_4P_800VAC.pdf` | 2000×1750×700 mm reference |

---

## MV switchgear datasheets (evaluation only — not as-built)

| File | Product |
|------|---------|
| MV data sheet_SM6_IM_DMVLA.pdf | Schneider SM6 indoor |
| MV data sheet_RM6_DI.pdf | Schneider RM6 GIS |
| MV data sheet MV terminal kits_RSTI_Tyco.pdf | Raychem RSTI-58 terminations |

---

## SLD revision index (internal)

| Rev | Scope |
|-----|--------|
| D | New cubicle (superseded for SwS — wrong SM6 assumption) |
| E | Repurpose spare bay → skid |
| F | JZ2 PV merge + JZ3 BESS (UniSec) |
| G | Field coupling **G1a / G1b / G1c** between two pads (~10 m) |

---

## BESS interface reminders (unchanged by Rev F/G)

| Topic | Existing PV | BESS (Linyang skid) |
|-------|-------------|---------------------|
| LV voltage | **800 V** | **690 V** (BCS1250K) |
| MV connection | Customer SwS + MCTS | Skid RMU @ 22 kV |
| NER | 1 Ω (MCTS) / plant design | 25 Ω (DSO Annex IV — skid) |

---

*Last updated: 19 May 2026 — Lighthief internal*
