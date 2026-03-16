# Degradation-based park owner compensation (no PPA)

Park owner is **not** paid a PPA (€/MWh) for energy. Compensation reflects **use of assets** before connection: wear (PV degradation and, if applicable, BESS degradation).

---

## Roles

- **Park owner** invests: panels + “early” EPC (civil, grid-tie prep, LV for containers). Receives **degradation compensation** from the equipment venture.
- **Equipment venture** consumes MWh on-site and pays the park owner according to the formula below.

---

## Formula options

### Option A: Throughput-based (€/MWh consumed)

- **Payment per year** = `MWh_consumed × degradation_eur_per_mwh`
- **degradation_eur_per_mwh**: Set to reflect wear (PV + optional BESS). Example: PV only, 0.6%/year linear, replacement cost €800/kWp → over 5 years 3% degradation → 3% × €800 × kWp / (5 × MWh_per_year) → €/MWh. Can be simplified to a flat €/MWh (e.g. €5–15/MWh) for modelling.
- **Settlement**: Monthly or annually; paid by equipment venture to park owner.

### Option B: Capacity-based (degradation % × replacement cost)

- **Payment per year** = `degradation_pct_per_year × replacement_cost_capacity`
- **replacement_cost_capacity**: PV (€/kWp × kWp) and, if early BESS, BESS (€/MWh × MWh from SSOT).
- **degradation_pct_per_year**: PV e.g. 0.5–0.7%/year; BESS from warranty curve if applicable.
- **Settlement**: Annually; paid by equipment venture.

### Option C: Hybrid

- **PV**: Option A or B.  
- **BESS** (if deployed early): Use SOH/cycle from `lib/portfolio-data.ts` (WARRANTY.sohGuarantees, cycleLife 7,000) and ClientLTSA to derive €/MWh cycled or €/year so that compensation tracks actual wear.

---

## Inputs (for model)

| Input | Description | Source |
|-------|-------------|--------|
| MWh_consumed | MWh delivered to load per year (per park) | PV yield × MWp (see assumptions.md) |
| degradation_eur_per_mwh | €/MWh compensation (Option A) | solhash assumption (sensitivity: €5–20/MWh) |
| degradation_pct_per_year | Annual degradation % (Option B) | PV: ~0.5–0.7%; BESS: from warranty curve |
| replacement_cost_capacity | PV €/kWp × kWp (+ BESS if early) | PV market; BESS from FINANCIALS.installedCostAvgPerMWh |

---

## Split (timing)

- Compensation can be **monthly** or **annual**.
- Paid **by equipment venture** to **park owner**.
- No obligation to sell energy at market price; only degradation is compensated.
