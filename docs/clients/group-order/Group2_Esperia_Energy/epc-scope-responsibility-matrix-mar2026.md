# Galascope 1 & 2 — EPC Scope & Responsibility Matrix

> **CONFIDENTIAL — INTERNAL USE ONLY**  
> **Scope:** Galascope Ltd — **two sites only** (Famagusta). Wider Esperia portfolio (Famagusta main, Limassol, Frenaros, Tseri, etc.) is **out of scope** for this document.  
> Commercial figures: `lib/portfolio-data.ts` → `BATCH1_PARKS_CONFIRMED`, `BATCHES[0]`.

| Field | Value |
|-------|-------|
| **Document** | LCY-GALASCOPE-G1G2-SCOPE-MATRIX-2026 |
| **Version** | 1.2 |
| **Date** | 15 May 2026 |
| **Owner** | Lighthief Cyprus Ltd |

---

## 1. Purpose

Align **Galascope 1 & 2** (confirmed Batch 1) on: client proposal/presentation scope, detailed **group EPC** narrative (`client-proposal-group-epc-jan2026.html`), **Linyang / CIF** boundary, **SSOT** cost & client-paid flags, and **binding EPC** schedules when signed.

Use this matrix for **SoV**, **RACI**, and **margin defence** on the **30 MWh / 8 containers** package only.

---

## 2. Sites & economics (SSOT — internal)

| Park | MW | MWh | Containers | Installed cost (model) | Revenue (model) | Margin (model) | Margin % |
|------|-----|-----|------------|------------------------|-----------------|------------------|------------|
| **Galascope 1** | 5.0 | 20 | 5 (4 BESS + T4 MV) | €2,073,869 | €2,238,000 | €164,131 | ~7.3% |
| **Galascope 2** | 2.5 | 10 | 3 (2 BESS + T2 MV) | €1,119,838 | €1,206,300 | €86,462 | ~7.2% |
| **Combined (Batch 1)** | 7.5 | 30 | 8 | **€3,193,707** | **€3,444,300** | **€250,593** | **~7.3%** |

Sources: `BATCH1_PARKS_CONFIRMED`, `BATCHES[0]` in `lib/portfolio-data.ts` (May 2026 Galascope 1 negotiated €/MWh; G1/G2 CIF per LY202601271-class configs).

**Margin sensitivity (order of magnitude):** combined margin is **~€251k**. Roughly **€8.4k per +0.1%** cost overrun on installed (~€3.19M), or **~€32k per +1%** slip on that installed base — i.e. **~€250k total overrun ≈ wipes Batch 1 margin** if revenue is fixed.

### 2.1 Execution assumption — **parallel installs** (G1 & G2)

Work is **not** sequenced one site after the other: **both Famagusta sites can be active in the same window** (civils, cabling, lifts, OEM attendance, witness tests).

**Implications**

- **Supervision:** one person cannot be in two places for simultaneous crane windows, pull-through, or first energise. Plan for **overlapping site cover** (second supervisor / coordinator, or extended hours with overtime cost).
- **Discipline leads:** civil and electrical engineers face **context-switching** or **split days**; if both sites peak together, budget either **+0.3–0.7 FTE equivalent** for the overlap months (junior site engineer, coordinator, or subcontracted **clerk of works**), or accept **schedule / quality risk**.
- **Linyang / Soulis / DSO:** parallel tracks mean **two comms threads** — PM load rises unless a **logistics / site admin** fraction is added.
- **Internal staff cost (order of magnitude vs sequential):** incremental loaded payroll for parallel peak is often **~€15k–€45k** over the programme (rule of thumb for two small BESS sites in same district), **in addition to** your baseline in-house trio; exact number depends on overlap length and whether hires are **fixed-term** vs **overtime only**.

Document this assumption in the **programme** and **SoV** so subcontractors and OEM know delivery windows may **overlap**.

---

## 3. Galascope-specific technical references (repo)

| Topic | Location |
|-------|----------|
| Cable routing / 50 m assumptions | `galascope-cable-runs.html`, `galascope.md` |
| SLD / protection notes (confirm vs Linyang) | `SLD-galascope-2.5MW-BESS.html`, `galascope.md` |
| Client notes (MV selection, DSO, civil) | `esperia-energy.md` |

---

## 4. Source documents (cross-reference)

| Layer | Path / artefact | Role |
|--------|-----------------|------|
| Esperia group proposal (includes Galascope rows) | `Group2_Esperia_Energy/group-proposal.template.html` | Included / excluded wording |
| Esperia Mar 2026 presentation | `Group2_Esperia_Energy/client-presentation-mar2026.html` | Same + bankability |
| Detailed group EPC (Jan 2026) | `docs/clients/group-order/client-proposal-group-epc-jan2026.html` | Cable caps, telecoms, DSO fee split, fencing |
| EPC scope tracker | `docs/internal/epc-scope-status.md` | OEM RFI / subcontract gaps (filter mentally to **two Famagusta sites**) |
| Linyang install in CIF (internal) | `docs/internal/final-pricing-margins-feb2026.html` | OEM vs local EPC envelope |
| SSOT | `lib/portfolio-data.ts` | `BATCH1_PARKS_CONFIRMED`, `CLIENT_PAID`, `ADDERS` |
| Binding EPC | **LCY-EPC-001 v3.0** + site schedule (when attached) | Definitions prevail over this matrix |

---

## 5. RACI — work packages (Galascope 1 & 2)

Legend: **R** = responsible, **A** = accountable, **C** = consulted, **I** = informed.

Same split as full Esperia programme; applies **per site** unless noted.

| Work package | Lighthief (EPC) | Linyang (OEM / CIF) | Client / Galascope Ltd + engineer | DSO (EAC) |
|--------------|-----------------|----------------------|-------------------------------------|-----------|
| Equipment to CIF Limassol | C | R / A | I | I |
| Import, duties, haul, crane to pad | R / A | C | I | I |
| OEM install **inside OEM manual / CIF envelope** | A | R | C | I |
| Civil within **agreed BESS compound** (platforms, trenches, drainage) | R / A | I | C | I |
| Cabling **skid ↔ existing PV PCC** (respect length / overrun rules in contract) | R / A | C | C (outages, PCC access) | C |
| Protection / settings **new + interface** with existing plant | R / A | C | C / R (licensed drawings) | C |
| Licensed permit / **as-built drawings** | I | I | **R / A** | C |
| Internal SPD + bonding + earthing **as priced** | R / A | C | I | C |
| External LPS | C | I | **R / A** | I |
| EMS / SCADA (Voltus / Disperon) | R / A | I | C | C |
| Remote trip + path to dispatch | R / A | C | C (SIM/fibre **OPEX**) | C |
| Commissioning (cold/hot per OEM contract) | R / A | R (OEM) | C | C |
| DSO witness — **coordination vs fees** | R (coord.) | I | **R** (fees if excluded) | A |
| Grid connection / PCC extension | C | I | **R / A** | C |
| Fencing, clearing, planning outside compound | I | I | **R / A** | I |
| CERA fees / VAT | I | I | **R / A** | I |

---

## 6. Gaps to close (Galascope 1 & 2 only)

| Topic | Group proposal / deck | `client-proposal-group-epc-jan2026.html` | Action |
|-------|-------------------------|------------------------------------------|--------|
| Cable length caps | Not on Esperia scope list | 50 m DC / 30 m LV / 50 m MV + overruns | **Schedule A** per site or cite Jan doc in contract pack |
| Internal cable proof | `galascope-cable-runs.html` asserts within 50 m | Same assumptions | Lock in **as-built vs model** at FAT |
| Telecoms | Not explicit on Esperia pages | Client backhaul; hardware EPC | Confirm **who pays SIM/fibre** for Galascope RTU path |
| DSO testing vs fees | “Excluded” lump | Coordination in; **attendance fees** client | One sentence in SoV |
| Rock / road crossings / geotech | Not on Esperia pages | Variation / excluded | Important for **Famagusta** trenching — site walk |

---

## 7. SSOT vs client wording (Galascope-relevant)

| Item | Client docs | SSOT |
|------|-------------|------|
| Licensed drawings | Client | `CLIENT_PAID.electricalDrawings` |
| Protection / DSO testing fees | Client | `CLIENT_PAID.protectionTesting` (per-container rate in SSOT) |
| External LPS | Client | `CLIENT_PAID.externalLps` vs DEHN in `ADDERS` — **one rule** in contract |

---

## 8. Linyang boundary (Galascope)

- **In CIF / OEM scope (typical):** containers, PCS/MV skid as quoted, OEM team tasks per manual **inside skid/container**, SAT where agreed, sea leg to CIF.
- **EPC / local (typical):** skid ↔ **existing** PCC at each Galascope site, civil in footprint, integration with **existing PV**, CAR/EAR, coordination.

Anything not in **Linyang agreement** + **LCY-EPC-001** schedules is **not** OEM-covered.

---

## 9. Next steps (Galascope 1 & 2)

- [ ] Contract pack: **LCY-EPC-001 v3.0** + **schedule naming Galascope 1 & 2** + SoV matching **€3,444,300** ex VAT (or split per SPV if two contracts).
- [ ] Legal: align **cable / telecoms / DSO fee** bullets with Jan 2026 group EPC or explicit **Schedule A (Galascope)**.
- [ ] Technical: Voltus **IEC 104 ASDU** vs existing 114/115 (see `esperia-energy.md` action list).
- [ ] Finance: after any further G1 price or CIF change, update `BATCH1_PARKS_CONFIRMED` + `BATCHES[0]` only, then `npm run docs:generate` + `npm run docs:validate`.

---

*Galascope 1 & 2 only. Classification: INTERNAL — CONFIDENTIAL.*
