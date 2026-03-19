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
- **Cyprus solar yield**: **2,500 kWh/kWp/year** (tracker + bifacial + albedo, used in `modular-parks.ts`). This is the standard for all new Solhash deployments. Previous fixed-tilt south-facing baseline was 1,800. E-W layouts use 1,440 (×0.80 of fixed-tilt). See "Tracker + Bifacial + Albedo" section below.
- **PV capacity**: Assume PV MWp aligned with or exceeding BESS MW for the park.
- **PV capex**: €750/kWp (tracker + bifacial system). Previous fixed-tilt was €600/kWp. Tracker adds ~€150/kWp.
- **MWh available to load per year** (per park):  
  `MWh/year = MWp × 2,500`  
  Example: 5 MWp → 5 × 2,500 = 12,500 MWh/year.
- **Capacity factor**: For PV-only, production is diurnal; mining/datacenter can run 24/7 only if there is storage or we use “available MWh” as the cap (e.g. 11,550 MWh/year max consumption from PV).

### Daytime-only mining (baseline)

- **No BESS** → no storage for night. Load runs only when PV is producing. With trackers, effective daytime is **~8 equivalent full-sun hours per day** in Cyprus (trackers extend usable hours into earlier morning and later evening vs 6 hours for fixed-tilt).

---

## Tracker + Bifacial + Albedo Configuration

All new Solhash deployments use tracker + bifacial panels for maximum energy yield.

### Yield Breakdown

| Component | Yield Contribution | Notes |
|-----------|-------------------|-------|
| Fixed-tilt south-facing baseline | 1,800 kWh/kWp/yr | Standard Cyprus reference |
| Single-axis tracker gain | +25–30% | Follows sun east→west. Extends productive hours. |
| Bifacial gain | +10–15% | Rear-side capture from reflected ground light |
| Albedo enhancement (white gravel/membrane) | +3–5% | Increases ground reflectance from ~25% to ~50%+ |
| **Combined yield** | **~2,500 kWh/kWp/yr** | 1,800 × 1.27 × 1.10 × 1.03 ≈ 2,500 |

### Additional Costs

| Item | Cost | Notes |
|------|------|-------|
| Tracker system capex | +€150/kWp (included in €750/kWp total) | Single-axis tracker structure + motors |
| Tracker O&M | €20,000/year per site | Motor maintenance, alignment, lubrication, cleaning |
| Bifacial panels | ~€0.01–0.02/Wp premium over monofacial | Marginal cost increase, already standard for new installs |
| Albedo surface | ~€2–5/m² (white gravel or membrane) | One-time, minimal cost at park scale |

### Impact on Mining Economics

Higher yield means more MWh to mine with:
- **More S21+ units** deployed (proportional to MWh)
- **Longer daily mining window** (8 hrs vs 6 hrs with trackers)
- **Higher annual revenue** per MW of PV installed
- **Better unit economics** — fixed costs (BESS, internet, controller) spread over more MWh
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

**BTC mining**: Modelled with **Antminer S21+** (216 TH/s, 3.56 kW) in containerized setup. See [data/antminer-s21.ts](../data/antminer-s21.ts). Revenue derived from hash price (€44/PH/s/day), daytime-only factor (6 hrs/day). Capex = S21+ units × **€2,040** (Mineshop sale + 15% qty discount) + container shell (€21,500/unit). S21+ count sized to consume available MWh/year.

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

---

## Land lease and tied-up equity

- **Land lease**: €2,500/ha/year (typical Cyprus agricultural solar). At 1.5 ha/MW, a 5 MW park pays €18,750/year. Deducted from JV net before split.
- **PV capex tied up early**: Park owner deploys ~€600/kWp (€3M for 5 MW) 3–5 years before grid revenue begins. At 10% WACC, the opportunity cost is ~€300K/year. The 30% revenue share partially compensates for this.
- **ASIC depreciation**: S21+ miners depreciate to ~10% residual over 5 years (technology obsolescence). This consumable-asset risk justifies the Mining Partner's 70% share.

---

## Recommended JV split

**30% Park / 70% Mining** at BTC €100K yields ~4.8¢/kWh for the park owner (48% of normal 10¢ PPA) and ~24% IRR for the mining partner. This balances:
- Park owner's tied-up equity (€3M, retains 95% value)
- Mining partner's consumable equipment (€2.8M, depreciates to 10%)
- Park owner's opportunity cost vs Mining partner's operational/market risk

---

## Auxiliary power & cooling

- **No overnight battery**: Miners run daytime-only. When PV drops at sunset, miners and cooling shut down. Cyprus night temps (15–25°C) within S21+ idle tolerance (−5°C to +45°C).
- **UPS**: €3,000/container (5–10 kWh). Graceful shutdown during cloud transients. Prevents hard power cuts that damage hash boards. See `data/epc-costs.ts` → `UPS_EUR_PER_CONTAINER`.
- **Cooling**: Container fans/pumps draw ~3–5% of miner power (~25 kW max). Included in total power budget — PV sized to total load including cooling. Air-cooled 20ft containers handle Cyprus summer (up to 40°C).

---

## Internet connectivity

- **Primary: Starlink** — Available in Cyprus (Q3 2023+). 20–50ms latency, 100–400 Mbps, >99.9% uptime. Mining requires <200ms and <1 Mbps — Starlink is vastly overspec'd.
- **Failover: 4G/LTE SIM** — 30–80ms latency, ~99% uptime. Peplink SD-WAN router bonds both for automatic failover in milliseconds.
- **Stale shares**: At 25–50ms latency, stale rate ~0.1–0.3% (negligible). Stratum V2 (Braiins) reduces further.
- **Cost**: Starlink ~€100/mo + 4G ~€30/mo + Peplink hardware €500 one-time = ~€1,560/yr per site. One dish per site (not per container). See `data/epc-costs.ts` → `INTERNET_STARLINK_EUR_PER_YEAR`, `INTERNET_HARDWARE_EUR`.

---

## Mining pool

- **Recommended: Braiins Pool** at 2% FPPS. Stratum V2 (lower latency/stale shares), Lightning payouts (lower on-chain fees). Handles variable hashrate well (critical for solar: ramp up/down with PV output).
- **FPPS preferred over PPLNS**: FPPS pays fixed amount per valid share regardless of pool luck. Essential for predictable JV revenue split accounting.
- **Alternative: Luxor** (0.7% FPPS) for corporate/institutional Mining Partners needing SOC 2 compliance.
- **Pool fee**: 2% already implicit in hash price assumption (€44/PH/s/day is post-fee).

---

## Taxation (Cyprus 2026)

References SSOT: `lib/portfolio-data.ts` → `CYPRUS_TAX` (corporate 15%, VAT 19%, SDC 5%, stamp duty abolished).

### Mining income
- **15% CIT** on mining operating profit. Mining = "active business income" per 2026 reform. Explicitly excluded from the 8% crypto disposal regime.

### BTC disposal
- **8% flat tax** when mined BTC is sold/exchanged for EUR. Applies to gain above mining cost basis (cost basis = degradation + opex + depreciation).

### VAT
- **0% on mining** — EU CJEU (C-264/14): mining has no identifiable recipient, not a taxable supply.
- **Input VAT recoverable** on EU-sourced equipment purchases.
- **No VAT on self-consumed electricity** — behind-the-meter, no supply occurs.

### Distributions
- **SDC 5%** on dividends to CY-resident individuals (reduced from 17% in 2026 reform).
- **0% WHT** on dividends to EU/treaty recipients.
- **No DDD** — deemed dividend distribution abolished for 2026+ profits.

### Other
- **Stamp duty**: €0 (abolished 1 Jan 2026).
- **Loss carry-forward**: 7 years (extended from 5).
- **No electricity excise**: Self-generated PV, behind-the-meter.
