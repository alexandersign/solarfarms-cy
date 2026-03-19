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

Current model: **€120,000/year** fixed opex. For 45.4 MWh/year and ~€5.2k revenue (S21+, 6 units × €9.50/day × 91.25 daytime-days), opex is **23× revenue**.

| Opex item | Typical range | For 6 S21+s (21 kW) | For 1 MW |
|-----------|---------------|----------------------|----------|
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

**Best option for solhash (45 MWh/year, 6 S21+s):**
- **Small 20 ft air-cooled** or **reefer conversion** — €30–50k container
- **Bitdeer A40** ($27k) is for 336 units; overkill. Use a smaller unit or partial fill.
- **Cubner** — reefer + solar kit suits off-grid; we already have PV at park, so container is load-only.

---

## Sensitivity: opex and scale

| Scenario | Opex/year | Revenue (S21+) | Net/year | NPV (5y, 10%) |
|----------|-----------|----------------|----------|---------------|
| Current (€120k) | €120,000 | €5,203 | -€115k | -€490k |
| Reduced (€25k) | €25,000 | €5,203 | -€20k | -€130k |
| Minimal (€15k) | €15,000 | €5,203 | -€10k | -€92k |

**Break-even opex:** Revenue €5,203 − degradation €454 = €4,749 net before opex. **Opex must be < €4.7k/year** for positive annual cash flow at current scale (45 MWh, 6 S21+s). That implies shared/remote ops, no dedicated site staff. At €25k opex, NPV improves from −€490k to −€130k (see roi-comparison.html).

**Scale up:** To make €120k opex work, need **~23× more MWh** (45 × 23 ≈ 1,035 MWh/year) or **~23× more parks**. One park at 45 MWh cannot support full opex.

---

## Best option: behind-the-meter strategy

1. **Deploy smallest viable unit** — 6 S21+s, 20 ft container, air-cooled. Capex ~€34k (miners) + ~€22k (container) = ~€56k.
2. **Minimize opex** — Remote monitoring, shared maintenance, no dedicated staff. Target €15–25k/year.
3. **Multi-park rotation** — One equipment fleet moves across ESP_2028 parks; opex shared across 5 parks. Revenue scales with total MWh; opex stays relatively fixed.
4. **Container choice** — Reefer conversion or Bitdeer-style small unit. Avoid 1 MW turnkey until scale justifies it.
5. **Electricity cost = 0** — Emphasize in business case: no grid tariff; only degradation. Improves vs grid miners paying €0.05+/kWh.

---

## Curtailment value (conceptual)

Without mining, 45.4 MWh/year is **stranded** (no export). Value of curtailment prevention:
- **Avoided loss** = 45.4 MWh × €0 (we don't sell it anyway) = €0 direct
- **Opportunity value** = Revenue from mining that energy = €5,203/year
- **Green premium** — Optional: some buyers pay premium for renewable-attributed BTC. Not modelled.

---

## Summary

| Factor | Impact |
|--------|--------|
| Electricity cost | **0** — behind-the-meter advantage |
| Opex | **Critical** — must be <€4.7k/year for positive cash flow at 45 MWh |
| Best container | Small 20 ft air or reefer; avoid 1 MW until scale |
| Best strategy | Multi-park rotation, shared opex, minimal staffing |

---

## Auxiliary power & overnight battery

**No large BESS needed. A 15 kWh LiFePO4 battery per site covers all overnight needs.**

### What the battery powers overnight

| Purpose | Power draw | Duration | kWh |
|---------|-----------|----------|-----|
| Post-run cooling (fans at full speed) | 500W–1.5 kW | 20–30 min | 0.25–0.75 |
| Starlink Mini dish (24/7) | 20–40W active, 15W idle | 14–16 hrs | 0.3–1.0 |
| Network switch + container controller | 20–50W | 14–16 hrs | 0.3–0.8 |
| Morning boot buffer | Controller + startup | 15–30 min | 0.5–1.0 |
| **Total overnight** | | | **~2–4 kWh** |

15 kWh provides ~4× margin. Cost: €3,000–5,000 per site.

### Post-run cooling protocol (critical)

When hashing stops, S21+ chips are at 75–80°C internally. Cutting power instantly causes heat "soak" damage to control boards and solder joints.

1. Braiins OS triggers Soft Shutdown — stops hashing, fans continue.
2. Container fans run at full speed for 20–30 minutes (battery-powered).
3. Once chip temps drop to ambient, fans off.
4. Battery powers only Starlink + controller overnight.

### Why NOT idle overnight

S21+ has no true standby mode. "Idle" (powered on, not mining) draws ~150–300W per unit — far too much for battery. Full shutdown with post-run cooling is the correct approach. Cyprus 5°C winter minimum is safe for daily cold starts.

---

## Thermal management in Cyprus

### Summer throttling

S21+ auto-throttles at ~40°C ambient (drops from 216 to ~180 TH/s). At 45°C+, enters protection mode (shutdown). In Cyprus July/August, expect throttling between 12:00–15:00.

**Solution**: Evaporative cooling pads ("swamp coolers") drop container intake air by 10–15°C in dry Cyprus heat. Cost ~€2,000–3,000 per container. Keeps S21+ at full performance even at 40°C+ ambient.

### Thermal cycling risk

Daily power cycles (off at sunset, on at sunrise) cause solder joint stress from thermal expansion/contraction. This can reduce hashboard lifespan vs 24/7 operation.

**Mitigations**:
- Use Braiins OS Sleep Mode (~30W) instead of hard power cut when possible.
- Accept slightly shorter hardware life as tradeoff for zero overnight power cost.
- S21+ are designed for 3–5 year useful life anyway — thermal cycling is a secondary concern.

### Dust and humidity

Cyprus dust + morning dew can create conductive "paste" on hashboards. Seal containers overnight, use rated intake filters, and clean frequently.

---

## Automation stack

### Software components

| Component | Role |
|-----------|------|
| **Braiins OS** | Miner firmware. Dynamic Performance Scaling (DPS), Soft Shutdown, Sleep Mode (~30W), API control |
| **DEIF ASC-4 Solar** (or PLC) | Container controller. Monitors solar inverter output, triggers PDU on/off |
| **Smart PDU** | Power distribution. Scheduled outlets, remote reboot. S21+ auto-mines on power-up |
| **Home Assistant** (optional) | Links solar inverter data to miner start/stop commands |

### Automated daily cycle

1. **06:00–07:00** — Solar voltage rises above threshold.
2. **~07:00** — Smart PDU energises S21+. Boot + pool sync via Starlink (5–10 min).
3. **07:10+** — Hashing begins. Braiins OS DPS adjusts hashrate to PV output.
4. **Cloud event** — PV dips → DPS reduces hashrate instantly. UPS bridges 30–60s.
5. **12:00–15:00 (summer)** — If >40°C, S21+ auto-throttles to ~180 TH/s.
6. **17:00–18:00** — Solar drops → Braiins OS Soft Shutdown.
7. **18:00–18:30** — Post-run cooling (battery-powered fans).
8. **18:30–06:00** — Overnight: Starlink + controller only (~2–4 kWh).

### Key: Braiins OS Power Targeting

DPS (Dynamic Performance Scaling) adjusts S21+ wattage to match available PV:
- Morning ramp-up: as PV rises, hashrate scales up.
- Cloud transients: instant hashrate reduction, UPS bridges.
- Evening ramp-down: DPS reduces to Low Power Mode (2,600W) before Soft Shutdown.

This prevents drawing more than available PV — critical behind-the-meter where no grid backup exists.

---

---

## PV Configuration: Tracker + Bifacial + Albedo

All Solhash deployments use **single-axis trackers + bifacial panels + albedo enhancement** for maximum yield.

| Component | Yield Contribution |
|-----------|-------------------|
| Fixed-tilt baseline | 1,800 kWh/kWp/yr |
| Single-axis tracker | +25–30% (follows sun east→west) |
| Bifacial gain | +10–15% (rear-side ground reflection) |
| Albedo (white gravel) | +3–5% (enhanced ground reflectance) |
| **Combined** | **~2,500 kWh/kWp/yr** |

Trackers extend the effective daytime window from ~6 to ~8 equivalent full-sun hours, allowing more hashrate to be deployed per MW of PV. Additional cost: +€150/kWp capex (included in €750/kWp total) and €20,000/yr tracker O&M per site.

---

## Starlink for mining

### Recommended: Starlink Mini

| Model | Active | Idle | Daily kWh |
|-------|--------|------|-----------|
| **Starlink Mini** | 20–40W | 15W | 0.5–1.0 |
| Standard Gen 3 | 75–110W | ~50W | 1.5–2.0 |
| High Performance | 110–150W | ~80W | 2.6–3.6 |

Starlink Mini is the best choice: lowest power draw, runs 24/7 on the 15 kWh battery, provides sufficient bandwidth (mining uses <1 Mbps).

### Performance

- Median latency: 25.7ms (US peak-hour). Mining needs <100ms.
- Stale share rate at 25–50ms: ~0.1–0.3% (negligible).
- Bandwidth: mining uses few MB/day. Starlink is ~100,000× overspec'd.
- Uptime: >99.9%. Ensure clear sky view (easy at solar parks).

### 4G failover

Peplink SD-WAN bonds Starlink + 4G SIM for automatic failover in milliseconds. Any internet outage = 0 hashrate = 0 revenue. 4G backup: ~€30/month.

---

## Mining pool recommendation

**Braiins Pool at 2% FPPS** — predictable daily income for JV accounting. Stratum V2 reduces stale shares on Starlink. Lightning payouts for instant, low-fee BTC distribution.

FPPS (not PPLNS) is essential for the JV: pays fixed amount per share regardless of pool luck. Makes 30/70 split accounting predictable and verifiable.

Pool mining (not solo): at small scale, solo mining = one block every ~years. Any Starlink downtime during a solo block discovery = lost entire reward (~3.125 BTC = €312K at €100K).
