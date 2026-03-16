# solhash — Pre-connection utilization (mining / datacenter)

Use the **3–5 year window** before parks receive grid connection terms to generate ROI by deploying **containerized, mobile** loads (BTC mining, GPU mining, or datacenter GPU) that consume on-site PV generation.

## Scope

- **Target parks**: Parks with pending connection (e.g. Esperia Tseri 2028 — 5 parks, 27.5 MW, 87.5 MWh). See [data/pending-connection-parks.ts](data/pending-connection-parks.ts).
- **Horizon**: 3–5 years until connection (configurable).
- **Constraint**: Parks **cannot sell electricity** to the grid during this period. ROI is based on:
  1. Earlier EPC/generation investment payoff.
  2. **Degradation-based** compensation to the park owner (not PPA).

## Split venture

- **Equipment venture**: Invests in mining/datacenter equipment (containers, ASICs/GPUs); equipment is mobile and can move park-to-park. Pays park owner degradation-based compensation. Keeps revenue from mining or datacenter services.
- **Park owner**: Invests in panels and “early” EPC (civil, grid-tie prep, LV for containers). Receives degradation compensation. Benefits from site readiness when connection is granted.

## Single source of truth (SSOT)

Portfolio data (parks, MW, MWh, EPC rates) is **not** duplicated here. solhash imports from:

- **`lib/portfolio-data.ts`** — `ESP_2028`, `ADDERS.civilWorks`, `FINANCIALS.installedCostAvgPerMWh`, `WARRANTY.sohGuarantees`, etc.

solhash-specific inputs (mining hashrate, GPU revenue, degradation €/MWh for pre-connection use) live in [model/assumptions.md](model/assumptions.md) and optionally [data/assumptions.ts](data/assumptions.ts).

## Structure

| Path | Purpose |
|------|--------|
| [data/pending-connection-parks.ts](data/pending-connection-parks.ts) | Park list + connection year (from SSOT) |
| [model/assumptions.md](model/assumptions.md) | Inputs: horizon, degradation, EPC “early start” scope |
| [model/degradation-park-owner.md](model/degradation-park-owner.md) | Degradation-based compensation formula |
| [model/roi-btc-mining.ts](model/roi-btc-mining.ts) | BTC mining ROI (NPV/IRR) |
| [model/roi-gpu-mining.ts](model/roi-gpu-mining.ts) | GPU mining ROI |
| [model/roi-datacenter-gpu.ts](model/roi-datacenter-gpu.ts) | Datacenter GPU ROI |
| [model/split-venture.md](model/split-venture.md) | Who invests what; revenue/degradation split |
| [docs/roi-comparison.html](docs/roi-comparison.html) | Side-by-side NPV/IRR and sensitivity |
| [docs/behind-the-meter-financials.md](docs/behind-the-meter-financials.md) | Deep dive: electricity cost = 0, opex scaling, best container options |
| [scripts/run-roi-comparison.ts](scripts/run-roi-comparison.ts) | Run models, output comparison |

## Quick start

```bash
# From project root
npm run solhash:roi
# or: npx tsx solhash/scripts/run-roi-comparison.ts
# Updates solhash/docs/roi-comparison.html and prints CSV to stdout
```
