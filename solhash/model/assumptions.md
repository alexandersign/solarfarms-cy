# solhash model assumptions

Inputs for pre-connection utilization ROI (BTC mining, GPU mining, datacenter GPU). SSOT for portfolio figures: `lib/portfolio-data.ts`. solhash-specific values below.

---

## Horizon

- **Default**: 5 years until connection (e.g. ESP_2028 → 2028).
- **Configurable**: 3–5 years; model is parameterised by `connectionYear` and evaluation date.

---

## “Early start” EPC scope

Only the works needed to generate and feed containerized load:

- **PV**: Existing or new panels to generate on-site.
- **Civil**: Container pads, trenches (rate from SSOT: €2,000/MWh BESS-equivalent or per-site quote; for PV-only, use site-specific civil for container tie-in).
- **LV/MV tie-in**: Connection from PV/inverter to container(s); no full BESS in baseline (BESS comes with grid connection).
- **No grid export**: No meter, no PPA; all generation consumed on-site by mining/datacenter load.

If BESS-is-early is considered later, degradation model extends to BESS SOH/cycle cost (see `lib/portfolio-data.ts` WARRANTY.sohGuarantees, ClientLTSA).

---

## Power to load (MWh per year)

- **Source**: PV only in baseline (no BESS).
- **Cyprus solar yield**: ~1,650 kWh/kWp/year (reference: `lib/market-data.ts`).
- **PV capacity**: Assume PV MWp aligned with or exceeding BESS MW for the park (e.g. same MW as park BESS MW for simplicity, or from park-specific data).
- **MWh available to load per year** (per park):  
  `MWh/year = MWp × 1800` (1800 kWh/kWp/year)  
  Example: 7 MWp → 7 × 1.65 = 11.55 GWh/year = 11,550 MWh/year.  
  (If PV is sized differently, use park-specific MWp.)
- **Capacity factor**: For PV-only, production is diurnal; mining/datacenter can run 24/7 only if there is storage or we use “available MWh” as the cap (e.g. 11,550 MWh/year max consumption from PV).

### Daytime-only mining (baseline)

- **No BESS** → no storage for night. Load runs only when PV is producing (typically 6–8 equivalent full-sun hours per day in Cyprus).
- **Total MWh consumed** = PV annual yield (unchanged). Equipment is sized to absorb daytime output; when the sun is down, rigs are idle.
- **Implications**:
  - **BTC / GPU mining**: Can run daytime-only; revenue scales with MWh consumed (same total as 24/7 if we had storage). Equipment utilization ~25–35% (hours running / 24).
  - **Datacenter GPU**: Cloud/AI contracts often expect 24/7 availability. Daytime-only may require different commercial model (e.g. batch jobs, spot capacity) or lower €/MWh.
- **Utilization factor** (optional): Ramp-up/down and partial-load operation can reduce effective revenue. Use e.g. 0.85–0.95 × nominal MWh if needed.

---

## Degradation (park owner compensation)

- **PV**: Linear degradation (e.g. 0.5–0.7%/year); replacement cost per kWp or per park.
- **Optional BESS**: If BESS is deployed early, use SOH/cycle life from SSOT (e.g. 7,000 cycles to 70% EOL) to derive €/MWh or €/year “degradation cost”.
- **Payment**: Equipment venture pays park owner a **degradation-based** amount (see [degradation-park-owner.md](degradation-park-owner.md)), not a PPA €/MWh.

---

## Mining / datacenter inputs (solhash-specific)

**BTC mining**: Modelled with **Antminer S21** (200 TH/s, 3.5 kW) in containerized setup. See [data/antminer-s21.ts](../data/antminer-s21.ts). Revenue derived from hash price (€44/PH/s/day), daytime-only factor (6 hrs/day). Capex = S21 units × €3,400 + container shell. S21 count sized to consume available MWh/year.

To be set in code or `data/assumptions.ts`; ranges for sensitivity:

| Parameter | BTC mining | GPU mining | Datacenter GPU |
|-----------|------------|------------|----------------|
| Revenue | $/kWh or hash price | $/GPU/day or $/kW | $/GPU-hour or $/kWh |
| Capex | €/container, €/TH, ASIC cost | €/GPU, €/container | €/GPU, €/server, €/container |
| Opex | Cooling, maintenance, labour, moves | Same | Same + colo overhead |
| Power draw | MW per container | MW per container | MW per rack/container |

- **Cyprus**: No grid export; ambient temperature (cooling cost); regulatory (mining/datacenter on solar sites).
- **Mobility**: Equipment moves park-to-park; capex shared across parks; revenue and “power cost” (degradation payment) per park and time.

---

## Currency and discount

- **Reporting**: EUR (portfolio standard); mining/datacenter revenue often in USD — apply fixed or scenario FX.
- **Discount rate**: WACC or target IRR (e.g. 8–12%) for NPV/IRR.
