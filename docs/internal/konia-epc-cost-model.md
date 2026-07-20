# Konia 1 MW PV EPC — Internal Cost Model

**Document Reference:** LCY-INT-KONIA-COST-2026-07
**Date:** July 2026 (Rev D)
**Status:** INTERNAL ONLY — not to be shared with client
**Applies to:** `docs/clients/TOTALCON/` deliverables (two one-page proposals + contract, HTML + Word), Rev D, July 2026

---

## Pricing Basis (Rev D — flat fixed price per option)

Client pricing is now a **flat fixed lump sum per option** (management decision, 14 Jul 2026), replacing the Rev C €/MW basis. Presented to the client as two separate one-page fixed-price offers. Self-cost below is retained only to track margin.

| Item | Fixed Price | Notes |
|------|------------:|-------|
| **Option A — PV EPC (fixed-tilt)** | **€550,000** | Flat lump sum; 825 kWp; €0.67/Wp |
| **Option B — PV EPC (single-axis trackers)** | **€615,000** | Flat lump sum; 809.2 kWp; €0.76/Wp |
| **BESS EPC (install-only)** | **€70,000 flat** | Optional add-on; 4 MWh container (1 MW / 4 MWh), client-supplied batteries |
| VAT | 19% — reclaimable | All figures ex-VAT |

> Tracker premium over fixed-tilt: €65,000 (€615k − €550k).

---

## Client Price Summary

### Option A — Fixed-Tilt 825 kWp

| Package | EUR (ex VAT) | Notes |
|---------|-------------:|-------|
| PV EPC (equipment + works) | **€550,000** | Fixed lump sum — €0.67/Wp |
| BESS EPC (install-only, optional) | €70,000 | 4 MWh container |
| **PV + BESS** | **€620,000** | |

### Option B — Single-Axis Trackers 809.2 kWp

| Package | EUR (ex VAT) | Notes |
|---------|-------------:|-------|
| PV EPC (equipment + works, incl. trackers) | **€615,000** | Fixed lump sum — €0.76/Wp |
| BESS EPC (install-only, optional) | €70,000 | 4 MWh container |
| **PV + BESS** | **€685,000** | |

---

## Self-Cost Reference (Dino-aligned, ~€400k/MW)

Rebuilt July 2026 following the Dino benchmark (€400k/MW self-cost for solar-only). Our China FOB module sourcing and 3× Huawei SUN2000-330KTL inverter architecture are cheaper than Dino's stated equipment; works/civils/overhead aligned down to realistic Cyprus subcontractor levels.

### Fixed-Tilt Self-Cost (per MW)

| Line | €/MW | Notes |
|------|-----:|-------|
| Modules (China FOB, landed €0.109/W) | 109,000 | $0.11/W × 0.92 FX + freight/insurance/clearance |
| Fixed-tilt mounting steel | 27,000 | ~€20/panel |
| Inverters (3 × Huawei SUN2000-330KTL @ €7,500) | 22,500 | 990 kW AC — near-1:1 DC/AC (Dino spec) |
| DC BOS | 40,000 | €0.04/W — cables, combiner, earthing, SPD |
| AC BOS | 20,000 | €0.02/W — LV cabling, switchgear, protection |
| Monitoring | 4,000 | Logger, sensors, comms |
| Site civils | 30,000 | Grading, roads, drainage (benign-site assumption) |
| Piling & foundations | 18,000 | Driven piles |
| Perimeter fencing | 12,000 | Fence + gates |
| Security system | 12,000 | CCTV, perimeter intrusion, monitoring |
| Install labour (incl. 12.5% employer burden) | 45,000 | Local crew |
| Engineering / ETEK / EAC | 20,000 | Design, permit, DSO file |
| Commissioning / SCADA | 16,000 | Tests, witness, config |
| Logistics / PM / HSE | 25,000 | Local, low mobilisation |
| **Fixed-tilt self-cost** | **€400,500 / MW** | |

### Tracker Self-Cost (per MW)

Replace fixed steel (−€27,000) with tracker hardware (+€55,000, €0.055/W) and tracker install premium (+€20,000).

| | €/MW |
|---|-----:|
| Fixed-tilt base | 400,500 |
| Less fixed steel | −27,000 |
| Plus tracker hardware | +55,000 |
| Plus tracker install premium | +20,000 |
| **Tracker self-cost** | **€448,500 / MW** |

---

## Margin Summary

### Option A — Fixed-Tilt 825 kWp

| | EUR |
|---|----:|
| Client price (PV) | €550,000 |
| Self-cost (0.825 × €400,500) | €330,413 |
| **PV margin** | **€219,587** |
| **Markup / net margin** | **66.5% markup / 39.9% net** |
| BESS margin (€70k − €58,333) | €11,667 |
| **Total margin (PV + BESS)** | **€231,254** |

### Option B — Trackers 809.2 kWp

| | EUR |
|---|----:|
| Client price (PV) | €615,000 |
| Self-cost (0.8092 × €448,500) | €362,926 |
| **PV margin** | **€252,074** |
| **Markup / net margin** | **69.5% markup / 41.0% net** |
| BESS margin (€70k − €58,333) | €11,667 |
| **Total margin (PV + BESS)** | **€263,741** |

> Flat fixed pricing (Rev D) yields ~40% net margin on both options against the ~€400k/MW Dino-aligned self-cost. Healthy, but well above the earlier ~27–30% — margins are strong because the flat €550k/€615k prices sit far above the scaled self-cost of an 0.8 MW array. Hold firm only if the market/competition supports it; there is room to negotiate down toward the Rev C levels (€454k/€518k) if needed to win.

---

## Package 3 — BESS Install-Only (Both Options, unchanged)

| Line | Self-Cost |
|------|----------:|
| Foundations, crane offload | €15,000 |
| LV cabling & terminations to PV POI | €18,000 |
| Earthing, protection integration | €10,000 |
| Commissioning support & EAC coordination | €10,000 |
| Civils & PM | €5,333 |
| **Total self-cost** | **€58,333** |
| **Client price** | **€70,000** |
| **Margin** | **€11,667 (20.0%)** |

Quoted for the client's 4 MWh battery container (1 MW / 4 MWh, per CERA). Install-only effort is one container, comparable to the earlier 3.2 MWh basis, so the price is unchanged. Adjusts pro-rata if client equipment materially differs.

---

## Notes & Assumptions

1. **Flat fixed pricing (Rev D):** €550,000 PV (fixed-tilt) / €615,000 PV (trackers), each a flat lump sum, + €70k optional BESS. Set by management 14 Jul 2026; supersedes the Rev C €/MW method (which produced €454k/€518k). Presented to client as two separate one-page fixed-price offers.
2. **Self-cost realism:** Rebuilt to ~€400k/MW per Dino benchmark (13 Jul 2026). Earlier Rev A/B self-cost (~€660k/MW) was heavily padded on civils, labour, and overhead for an arms-length Limassol-based build; the €400k/MW basis assumes a local Paphos-area subcontractor with own plant and low mobilisation.
3. **Inverters:** Switched to 3 × Huawei SUN2000-330KTL @ €7,500 (Dino spec) — ~990 kW AC for ~1 MWp DC, cheaper and simpler than 9× small string inverters.
4. **Module price:** $0.11/W FOB China × 0.92 EUR/USD + freight/insurance/clearance ≈ €0.109/W landed. Re-verify and lock FX at procurement order.
5. **Crew social burden** (12.5%: social insurance 8.8% + cohesion 2% + redundancy 1.2% + training 0.5%) embedded in labour lines.
6. **No MV transformer substation:** LV connection confirmed. No TS civils/switchgear/cabling in scope.
7. **Rounding:** Client prices rounded to nearest €1,000.

---

*All costs ex-VAT. INTERNAL ONLY — not to be disclosed to client or third parties.*
*Lighthief Cyprus Ltd — HE 477423*
