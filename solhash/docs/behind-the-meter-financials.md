# Behind-the-meter mining — financial deep dive

Containers filled with ASIC miners and cooling systems monetize excess solar energy, preventing curtailment. Deployed "behind-the-meter" while waiting for grid connection, they convert stranded energy into crypto assets — a green energy solution for high-sunshine regions like Cyprus.

---

## Key advantages (solhash use case)

| Advantage | How it applies |
|-----------|----------------|
| **Preventing curtailment** | PV output that would be wasted (no grid export) is consumed by mining; stranded energy → revenue |
| **Overcoming interconnection delays** | 3–5 year window until ESP_2028 parks get connection; containers start revenue immediately |
| **Electricity cost ≈ 0** | Behind-the-meter: no grid tariff. "Cost" = degradation payment to park owner (€/MWh), not market electricity price |
| **Operational flexibility** | Mining load scales up/down or halts; ideal match for fluctuating solar (daytime-only) |
| **Sustainability** | Renewable-powered mining; reduces carbon footprint vs grid-powered operations |

---

## Cost structure (behind-the-meter)

| Cost | Typical grid mining | Behind-the-meter (solhash) |
|------|---------------------|----------------------------|
| **Electricity** | €0.03–0.08/kWh (or higher) | **€0** — we consume our own PV |
| **Power cost to equipment venture** | Grid tariff × MWh | **Degradation only** — €10/MWh (park owner compensation) |
| **Capex** | ASICs + container + grid tie-in | ASICs + container + LV tie-in to PV (no grid) |
| **Opex** | Cooling, maintenance, labour, insurance | Same — **this is the bottleneck** at small scale |

**Insight:** Electricity is effectively free. Profitability depends on **capex efficiency** (€/TH or €/kW) and **opex scaling** (fixed vs variable).

---

## Opex breakdown and scaling

Current model: **€120,000/year** fixed opex. For 45.4 MWh/year and ~€4.8k revenue (S21), opex is **25× revenue**.

| Opex item | Typical range | For 6 S21s (21 kW) | For 1 MW |
|-----------|---------------|--------------------|----------|
| Cooling (air) | €5–15/kW/year | €1–3k | €5–15k |
| Maintenance | €2–5k/site | €2–5k | €5–10k |
| Labour (remote) | €20–50k/site | Shared across parks | €20–50k |
| Insurance | €2–5k | €2–5k | €5–10k |
| Container moves | Per move | Minimal (mobile) | Minimal |
| **Total (realistic for small)** | | **€15–30k/year** | **€50–100k/year** |

**Recommendation:** For behind-the-meter at 45 MWh/year scale, model **€20–30k opex** (not €120k). €120k assumes a full 1 MW+ site with dedicated staff.

---

## Container options (best for behind-the-meter)

| Option | Cooling | Capacity | Est. capex (container only) | Best for |
|--------|---------|----------|-----------------------------|----------|
| **Reefer conversion** | Built-in refrigeration | 10–40 ft | €15–40k | Low capex, moderate climates |
| **Bitmain ANTSPACE** | Air / Hydro | 1 MW | €80–150k | Standard deployment |
| **Bitdeer Minerbase A40** | Air | 336 units | $27–48k | Turnkey, low cost |
| **Cubner reefer + NR' Kit** | Reefer + solar kit | GPU-focused | Custom | Solar-integrated |
| **Custom 20 ft** | Air | 20–50 S21s | €30–50k | Small, mobile |

**Best option for solhash (45 MWh/year, 6 S21s):**
- **Small 20 ft air-cooled** or **reefer conversion** — €30–50k container
- **Bitdeer A40** ($27k) is for 336 units; overkill. Use a smaller unit or partial fill.
- **Cubner** — reefer + solar kit suits off-grid; we already have PV at park, so container is load-only.

---

## Sensitivity: opex and scale

| Scenario | Opex/year | Revenue (S21) | Net/year | NPV (5y, 10%) |
|----------|-----------|---------------|----------|---------------|
| Current (€120k) | €120,000 | €4,818 | -€115k | -€499k |
| Reduced (€25k) | €25,000 | €4,818 | -€20k | -€132k |
| Minimal (€15k) | €15,000 | €4,818 | -€10k | -€95k |

**Break-even opex:** Revenue €4,818 − degradation €454 = €4,364 net before opex. **Opex must be < €4.4k/year** for positive annual cash flow at current scale (45 MWh, 6 S21s). That implies shared/remote ops, no dedicated site staff. At €25k opex, NPV improves from −€499k to −€139k (see roi-comparison.html).

**Scale up:** To make €120k opex work, need **~28× more MWh** (45 × 28 ≈ 1,260 MWh/year) or **~28× more parks**. One park at 45 MWh cannot support full opex.

---

## Best option: behind-the-meter strategy

1. **Deploy smallest viable unit** — 6 S21s, 20 ft container, air-cooled. Capex ~€60k.
2. **Minimize opex** — Remote monitoring, shared maintenance, no dedicated staff. Target €15–25k/year.
3. **Multi-park rotation** — One equipment fleet moves across ESP_2028 parks; opex shared across 5 parks. Revenue scales with total MWh; opex stays relatively fixed.
4. **Container choice** — Reefer conversion or Bitdeer-style small unit. Avoid 1 MW turnkey until scale justifies it.
5. **Electricity cost = 0** — Emphasize in business case: no grid tariff; only degradation. Improves vs grid miners paying €0.05+/kWh.

---

## Curtailment value (conceptual)

Without mining, 45.4 MWh/year is **stranded** (no export). Value of curtailment prevention:
- **Avoided loss** = 45.4 MWh × €0 (we don't sell it anyway) = €0 direct
- **Opportunity value** = Revenue from mining that energy = €4,818/year
- **Green premium** — Optional: some buyers pay premium for renewable-attributed BTC. Not modelled.

---

## Summary

| Factor | Impact |
|--------|--------|
| Electricity cost | **0** — behind-the-meter advantage |
| Opex | **Critical** — must be <€5k/year for positive cash flow at 45 MWh |
| Best container | Small 20 ft air or reefer; avoid 1 MW until scale |
| Best strategy | Multi-park rotation, shared opex, minimal staffing |
