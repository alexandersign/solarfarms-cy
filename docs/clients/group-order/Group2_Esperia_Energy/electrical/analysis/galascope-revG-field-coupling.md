# Galascope Rev G — Field MV Coupling Options

> **Companion to Rev F** (SwS: JZ2 combined PV, JZ3 BESS).  
> **G1 (5 MW):** two adjacent pads (~**10 m**) — below.  
> **G2 (2.5 MW):** **three** perimeter pads, **~75–240 m** spacing — **[`galascope-revG-field-coupling-g2.md`](galascope-revG-field-coupling-g2.md)**.
---

## Site fact (confirmed May 2026)

| Item | Value |
|------|--------|
| Pads | **Two** oil transformers, side by side in central compound |
| Pad spacing | **~8–12 m** centre-to-centre (trench allowance **~10–12 m**) |
| Each pad MCTS | **Siemens 8DJH** — **R** (to SwS) + **T** (80 A fuse → trafo) per EL00.02.02 |
| Customer SwS | **ABB UniSec** 24 kV (not SM6) |
| LV | **800 V** per trafo — **do not** tie LV buses for parallel |

---

## Option G1a — Outdoor tee (preferred / lowest swap)

| Element | Specification |
|---------|----------------|
| **Add** | **22 kV screened tee** (e.g. **Raychem RSTI-58** — client datasheet) on **JZ2** outgoing feeder (before or after nearest 8DJH **R**) |
| **Add** | **~10–12 m** MV cable **3×1×50 mm²** Al XLPE (match as-built NA2XS) pad-to-pad |
| **Retire** | SwS **JZ3** → far-pad cable |
| **8DJH** | **No module swap** — each pad keeps **R+T**; far pad fed via tee branch |
| **Fuse** | Existing **80 A** per **T** (~65 A per trafo @ 2.5 MW AC each) |

**BOQ cable:** 10–12 m MV + tee kit + 4 terminations.

---

## Option G1b — Extend nearest 8DJH (add T-module)

| Element | Specification |
|---------|----------------|
| **Swap/add** | One **Siemens 8DJH T-unit** (transformer feeder, **80 A/24 kV** fuse-switch) on **nearest** MCTS |
| **Lineup** | **R + T₁ + T₂** on common bus (**200 A**, **20 kA/3 s**) |
| **Add** | **~10–12 m** MV cable **T₂** → far trafo HV |
| **Retire** | SwS cable to far MCTS; far MCTS **R** may isolate or remain for maintenance |
| **Procurement** | Matched **8DJH** extension — not Schneider SM6 / RM6 |

**When to use:** MCTS requires all branching inside metal-clad gear.

---

## Option G1c — Ring interconnect (often no module swap)

| Element | Specification |
|---------|----------------|
| **Add** | **~10–12 m** MV **ring bus** cable between **R₁** and **R₂** of adjacent MCTS |
| **SwS** | Single incomer on **JZ2** to near MCTS only |
| **Retire** | **JZ3** SwS → far MCTS feeder |
| **8DJH** | **No swap** if both lineups already have **R** modules |

**When to use:** Both pads already ring-main ready; EAC accepts closed-ring / open-ring operating mode.

---

## Comparison

| Criterion | G1a Tee | G1b 8DJH T+T | G1c Ring |
|-----------|---------|--------------|----------|
| 8DJH swap | None | **Add T-module** | Usually none |
| Outage complexity | Low | Medium (gas compartment) | Medium |
| MCTS familiarity | Cable civil | Siemens extension | Ring logic |
| Second feeder at one MCTS | Via tee | Native **T₁/T₂** | Via ring **R** |
| Typical lead time | Short | Weeks (module) | Short |

---

## Transformer swap (only if plates mismatch)

| Condition | Action |
|-----------|--------|
| Both **Lami** 1250 kVA Dyn11 Uk6% | No trafo swap — align taps |
| **Lami + GALA** or unknown mix | Replace mismatched unit with **GALA BkAo 1250 kVA** (`data sheet_1250kVA_11-22-0,8KV_GALA_rev.1.pdf`) |

This is **separate** from G1a/b/c switchgear choice.

---

## Rev F + Rev G drawing index

| Drawing | Content |
|---------|---------|
| **LC-G1-SLD-001-F** | SwS topology + compact option notes |
| **LC-G1-SLD-001-G** | Same + **expanded** G1a/b/c notes + pad spacing |
| **LC-G2-SLD-001-F/G** | Rev F/G SwS + **G2a/b/c** notes (3-pad site — confirm trafo count) |

Generate: `python electrical/scripts/galascope-sld-revF.py` and `galascope-sld-revG.py` (from `scripts/` folder)

---

*Lighthief internal — 19 May 2026*
