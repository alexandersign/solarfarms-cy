# Christos Nicosia 3.3 MW — Park Study

**Project:** Christos Nicosia 3.3 MW  
**Site:** Nicosia district, Cyprus  
**Date:** March 2026

---

## 1. Park Configuration

| Parameter | Value |
|-----------|-------|
| **Total park** | 3.3 MWp |
| **Pre-connection PV** | 1.7 MWp (space without connection terms) |
| **Yield** | 1900 kWh/kWp/year (bifacial) |
| **District** | Nicosia |

### Source Data

From `docs/clients/Individual_Christos_Nicosia`:
- BESS proposal: 3.3 MWp solar park, Nicosia
- Client-reported yield: 2,100 kWh/kWp (monofacial)
- **Study assumption:** 1900 kWh/kWp for bifacial (conservative)

---

## 2. Production

| Parameter | Value |
|-----------|-------|
| **PV capacity (pre-connection)** | 1.7 MWp |
| **Yield** | 1900 kWh/kWp/year |
| **MWh/year** | **3,230** |

---

## 3. Mining Sizing (Daytime-Only)

Using Antminer S21+ (216 TH/s, 3.56 kW), 6 hrs/day equivalent:

| Parameter | Value |
|-----------|-------|
| **MWh/year** | 3,230 |
| **S21+ count** | **415** |
| **20ft containers** | **3** (168 slots each; 415/168 ≈ 2.5 → 3) |

---

## 4. JV Economics — 5 c/kWh PPA Model

Park Partner receives **5 c/kWh** (€0.05/kWh) for energy supplied. Mining Partner gets the remainder after PPA, opex, degradation, and park O&M.

| Metric | Value |
|--------|-------|
| **PPA rate** | 5 c/kWh |
| **Park PPA revenue/year** | €161,500 |
| **Park net/year** | €112,200 (after degradation €32.3k, O&M €17k) |
| **Mining net/year** | €178,000 |
| **Equipment capex** | €911k (415 S21+ + 3 containers) |
| **EPC** | €117.5k (platforms, civil, transport) |
| **Total capex** | €1.03M |

### Mining Partner (5-year horizon)

| Metric | Value |
|--------|-------|
| Total capex | €1.03M |
| Mining net/year | €178k |
| NPV (10%) | **−€354k** |
| IRR | −4.6% |
| Payback | 5.8 years |

**Note:** At 5 c/kWh PPA and 5-year horizon, Mining Partner has **negative NPV**. Payback exceeds horizon. Options: lower PPA (e.g. 3–4 c/kWh), extend horizon, or reduce capex.

### Park Partner (5-year horizon)

| Metric | Value |
|--------|-------|
| Capex | €0 |
| Park net/year | €112,200 |
| NPV (10%) | **€425k** |

*Exact figures from `park-economics.ts`.*

---

## 5. JV Economics — 25% Revenue Share Model

Park Partner receives **25% of gross mining revenue**. Park shares in BTC upside/downside. Equivalent to ~2.8 c/kWh at €60K BTC, ~4.6 c/kWh at €100K BTC.

### Base Case (€60K BTC hash price)

| Metric | Value |
|--------|-------|
| **Park share** | 25% |
| **Gross revenue/year** | €360k |
| **Park revenue/year** | €90k |
| **Park net/year** | €40.7k (after degradation €32.3k, O&M €17k) |
| **Park €/kWh** | 2.79 c/kWh |
| **Mining net/year** | €249.5k |
| **Total capex** | €1.03M |
| **Mining payback** | 4.1 years |
| **Mining NPV (10%)** | −€83k |
| **Park NPV (10%)** | €154k |

### BTC Scenario Scaling (25% park share)

| BTC | Park rev/yr | Park c/kWh | Mining net/yr | Payback |
|-----|-------------|------------|---------------|---------|
| €60K | €90k | 2.79 | €249k | 4.1 yr |
| €100K | €150k | 4.64 | €430k | 2.4 yr |
| €200K | €300k | 9.29 | €879k | 1.2 yr |

*Note: 5-year horizon with 2028 halving reduces effective revenue ~29%. Mining NPV positive at €100K+ BTC.*

---

## 6. References

- `docs/clients/Individual_Christos_Nicosia/bess-christos-3.3mw-nicosia-proposal-feb2026.html`
- `docs/clients/Individual_Christos_Nicosia/client-presentation-mar2026.html`
- Base solhash model: `solhash/model/`, `solhash/data/`
