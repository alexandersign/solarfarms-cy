# Solhash Operations Knowledge Base

Internal reference for daytime solar mining operations in Cyprus. Covers S21+ thermal behaviour, Starlink connectivity, automation, battery sizing, and container cooling.

---

## 1. Antminer S21/S21+ Thermal Performance in Cyprus

### Operating Ranges

| Parameter | Value | Source |
|-----------|-------|--------|
| Operating temperature | −5°C to +45°C | Bitmain spec sheet |
| Internal chip temperature (hashing) | 75–80°C | Binance review, Bitmain support |
| Thermal throttle trigger | ~40°C ambient → drops to ~180 TH/s | Binance performance review |
| Protection mode | >45°C ambient → shutdown | Bitmain support |
| Low Power Mode | 160 TH/s at 2,600W (16.25 J/TH) | Bitmain spec |

### Cyprus Seasonal Impact

| Season | Ambient | Impact on S21+ | Mitigation |
|--------|---------|---------------|------------|
| Winter (Dec–Feb) | 5–18°C | Full performance, no cooling issues | None needed |
| Spring/Autumn | 12–28°C | Full performance | Standard ventilation |
| Summer (Jun–Aug) | 30–40°C | Auto-throttle 12:00–15:00 (~180 TH/s at 40°C) | Evaporative cooling pads |
| Peak summer | 40–45°C | Protection mode risk | Evaporative/swamp cooling drops intake 10–15°C |

**Summer throttling**: In July/August, S21+ will likely auto-throttle between 12:00 and 15:00 when container intake air reaches 40°C+. Evaporative cooling pads (effective in Cyprus dry heat) can drop intake by 10–15°C, maintaining full 200+ TH/s.

### Thermal Cycling (Daily Power Cycles)

- **Risk**: Frequent daily power cycles (off at sunset, on at sunrise) cause expansion/contraction of solder joints. Can lead to premature solder joint failures over several years vs 24/7 operation.
- **Mitigation**: Use Braiins OS "Sleep Mode" (~30W draw) instead of hard power cut. Alternatively, accept slightly shorter hardware life as a tradeoff for zero overnight power cost.
- **Cold start**: S21+ has low-temperature protection at −10°C/0°C. Cyprus minimum (5°C) is safe for cold starts. Boot + pool sync takes 5–10 minutes.

### Dust and Humidity

- Cyprus dust + morning dew can create a conductive "paste" on hashboards if units sit cold and open to ambient air.
- **Mitigation**: Clean container air filters frequently. Seal container overnight. Use intake filters rated for dusty/coastal environments.

---

## 2. Battery and Overnight Power Strategy

### Off-Grid Electrical Architecture

**Critical: Off-grid parks cannot use standard grid-tied inverters.** Without grid connection, PV string inverters have no voltage/frequency reference. A **grid-forming BESS** creates a "virtual grid" (stable 400V/50Hz AC bus) that string inverters sync to.

**Architecture:**
1. **Grid-forming BESS (master)**: Creates voltage/frequency reference. Battery-backed PCS.
2. **PV string inverters (slaves)**: Standard inverters operating in grid-following mode, syncing to BESS frequency.
3. **Mining containers**: Connect to AC bus as loads.
4. **Auxiliary loads**: CCTV, Starlink, fire systems, lighting — powered 24/7 from same bus (BESS overnight).

### Inverter Requirements

| Component | Specification | Cost (5 MW) | Paid By |
|-----------|--------------|-------------|---------|
| PV string inverters | 50 × 100 kW (Huawei SUN2000 or equiv.) | €185,000 | Park Owner |
| DC cabling + combiner boxes | PV array to inverters | €60,000 | Park Owner |
| AC switchgear + distribution | 400V bus, protection | €40,000 | Park Owner |
| **PV electrical total** | | **€285,000** | **Park Owner** |

PV inverters are the park owner's capex — they would need these for grid connection anyway. The mining JV pays only for the grid-forming BESS and microgrid controller.

### BESS Sizing (250 kWh for 5 MW)

The BESS serves FOUR functions: grid-forming reference, PV transient buffering, overnight auxiliary, and post-run cooling.

| Function | Power | Duration | kWh |
|---------|-------|----------|-----|
| Grid-forming reference | 250 kW PCS | Continuous (buffer) | ~5 |
| PV transient buffering | Cloud ramps | 30–60s per event | ~10 reserve |
| Post-run cooling (7 containers) | 7 × 1 kW | 30 min | 3.5 |
| Starlink + network 24/7 | 50–80W | 14–16 hrs | 1.2 |
| Security cameras (CCTV) | 100–200W | 24/7 | 2.8/night |
| Perimeter lighting | 200–500W | 10–12 hrs | 5.0 |
| Fire/safety systems | 50–100W | 24/7 | 1.4 |
| Container controllers | 7 × 50W | 24/7 | 5.0/night |
| Morning boot buffer | Startup before PV | 30 min | 5.0 |
| **Total overnight** | | | **~40 kWh** |
| Safety margin (2×) + degradation | | | ~80 kWh |
| Grid-forming PCS headroom | | | ~170 kWh |
| **Recommended** | | | **250 kWh** |

### BESS Cost Stack (5 MW)

| Component | Cost |
|-----------|------|
| Grid-forming PCS (250 kW) | €35,000 |
| LiFePO4 battery rack (250 kWh) | €40,000 |
| Microgrid controller | €12,000 |
| Enclosure + installation | €18,000 |
| **Total** | **€105,000** |

Market pricing: ~€150–170/kWh at 250 kWh scale (Sungrow PowerStack, CATL EnerC). PCS: ~€100–140/kW.

### BESS by Park Size

| Park | Containers | BESS | PCS | Cost |
|------|-----------|------|-----|------|
| 1 MW | 2 | 50 kWh | 50 kW | €35,000 |
| 2.6 MW | 4 | 100 kWh | 100 kW | €55,000 |
| **5 MW** | **7** | **250 kWh** | **250 kW** | **€105,000** |
| 10 MW | 14 | 500 kWh | 500 kW | €185,000 |

### Post-Run Cooling (Critical)

When hashing stops, S21+ heatsinks are still at 75–80°C internally. If power is cut instantly, residual heat "soaks" into control boards and solder joints.

**Protocol**:
1. Braiins OS triggers "Soft Shutdown" — stops hashing.
2. Container fans continue at full speed for 20–30 minutes.
3. Once chip temps drop to ambient (~30 min), fans shut off.
4. Battery powers only Starlink + controller overnight.

Fan power during cool-down: ~500W–1.5 kW total (container exhaust fans + S21 internal fans).

### Why NOT a Full BESS

24/7 mining would require ~600 kWh battery per MW of mining load — at €200/kWh that's €120K/MW. This exceeds the miner capex itself and destroys the zero-electricity-cost advantage.

---

## 3. Starlink for Mining — Technical Details

### Dish Options and Power Draw

| Model | Power Draw (active) | Power Draw (idle) | Daily kWh | Best For |
|-------|-------------------|-------------------|-----------|----------|
| **Starlink Mini** | 20–40W | 15W | 0.5–1.0 | Off-grid, battery-limited sites |
| **Standard Gen 3** | 75–110W | ~50W | 1.5–2.0 | Standard deployment |
| **High Performance** | 110–150W | ~80W | 2.6–3.6 | Not needed for mining |

**Recommendation**: Starlink Mini (20–40W) is the best choice for solar mining. Lowest power draw, sufficient bandwidth and latency for mining. Can run 24/7 on a 15 kWh battery with plenty of margin.

### Mining-Specific Performance

- **Latency**: Median 25.7ms peak-hour (US), 20–50ms typical. Mining needs <100ms for low stale shares.
- **Stale share rate**: At 25–50ms, stale shares ~0.1–0.3% — comparable to terrestrial 4G/LTE.
- **Bandwidth**: Mining uses a few MB per day. Starlink's 100–200+ Mbps is orders of magnitude more than needed.
- **Uptime**: >99.9%. Physical obstructions (trees) can cause brief dropouts — ensure dish has clear sky view at solar park.
- **Pool sync**: On power-up, miners take 5–10 minutes to boot and sync with pool via Starlink. This daily handshake is normal.

### Failover Strategy

- **Peplink SD-WAN router**: Bonds Starlink + 4G SIM for automatic failover in milliseconds.
- **Why failover matters**: Any internet outage = 0 hashrate = 0 revenue. Even 1 hour downtime on a 5 MW site costs ~€19 in lost revenue at base hash price.
- **4G backup**: Cyprus has good 4G coverage even in rural areas. ~€30/month for data SIM.

---

## 4. Automation — Startup, Shutdown, Solar Following

### Software Stack

| Component | Role | Details |
|-----------|------|---------|
| **Braiins OS** | Miner firmware | Dynamic Performance Scaling (DPS), API control, Sleep Mode (~30W), Soft Shutdown |
| **DEIF ASC-4 Solar** | Container controller | Interfaces with solar inverters. Triggers PDU on/off based on PV production threshold |
| **Smart PDU** | Power distribution | Scheduled outlets, remote reboot. S21 auto-mines on power-up (no manual start needed) |
| **Home Assistant** (optional) | Integration hub | Links solar inverter data to miner start/stop commands. Hobbyist-grade but functional |

### Automated Daily Cycle

1. **06:00–07:00** — Solar voltage rises. Container controller detects PV production above threshold (e.g., >3.5 kW per miner).
2. **07:00** — Smart PDU energises S21+ units. Miners boot, sync with Braiins Pool via Starlink (5–10 min).
3. **07:10** — Hashing begins. Braiins OS DPS adjusts hashrate to match available solar power.
4. **12:00–15:00 (summer)** — If ambient >40°C, S21+ auto-throttles to ~180 TH/s. Evaporative cooling mitigates.
5. **17:00–18:00** — Solar voltage drops. Braiins OS triggers "Soft Shutdown" — stops hashing.
6. **18:00–18:30** — Container fans run at full speed for post-run cooling (powered by battery).
7. **18:30** — Fans off. Battery powers only Starlink + controller overnight.
8. **Next morning** — Cycle repeats.

### Power Targeting with Braiins OS

Braiins OS DPS can set specific wattage targets. For solar following:
- **Ramp-up**: As PV output increases in the morning, DPS ramps hashrate proportionally.
- **Cloud transients**: When a cloud passes, DPS reduces hashrate instantly. UPS provides bridge power for 30–60 seconds.
- **Ramp-down**: As PV drops at sunset, DPS reduces to Low Power Mode (2,600W) before triggering Soft Shutdown.

This prevents the miner from drawing more than available PV, avoiding grid import (which doesn't exist behind-the-meter).

---

## 5. Pool Mining Best Practices (Solar/Variable Hashrate)

### Why Pool Mining (Not Solo)

- Pool mining provides consistent daily payouts. Solo mining = all-or-nothing (one block every ~years at small scale).
- Starlink downtime during a solo block discovery = lost entire block reward (~3.125 BTC = €312K at €100K).
- Pool mining "accepted shares" dashboard confirms connection is active — critical for remote monitoring.

### FPPS for JV Revenue Accounting

- **FPPS (Full Pay Per Share)**: Fixed payout per share regardless of pool luck. Predictable daily revenue.
- **PPLNS (Pay Per Last N Shares)**: Higher average payout but high variance. Lucky/unlucky streaks make monthly JV splits unpredictable.
- **Recommendation**: FPPS for the JV. Simplifies 30/70 split accounting. Both parties can verify daily earnings.

### Braiins Pool + Stratum V2

- Stratum V2 reduces data transfer and latency — critical on Starlink.
- Stale share reduction: ~0.3% (V1) → ~0.1% (V2) = ~0.2% revenue recovery.
- Lightning payouts: Instant BTC distribution, lower on-chain fees, easier for frequent JV settlements.

---

## 6. Key Specifications Reference

### Antminer S21+

| Spec | Value |
|------|-------|
| Hashrate | 216 TH/s |
| Power | 3,560W |
| Efficiency | 16.5 J/TH |
| Operating temp | −5°C to +45°C |
| Low Power Mode | 160 TH/s at 2,600W |
| Sleep Mode (Braiins OS) | ~30W |
| Fan power (4 fans) | 50–100W total |
| Boot + pool sync | 5–10 minutes |
| Price (Mineshop, −15% qty) | €2,040 |

### 20ft Container (Mineshop, 168 slots)

| Spec | Value |
|------|-------|
| Capacity | 168 S21+ units |
| Max power | ~600 kW (168 × 3.56 kW) |
| Cooling | Forced-air ventilation |
| Cooling power | ~25 kW max (3–5% of load) |
| Price | €21,500 |
| Cooling enhancement | Evaporative pads (recommended for Cyprus summer) |

### Battery (recommended per site)

| Spec | Value |
|------|-------|
| Chemistry | LiFePO4 |
| Capacity | 15 kWh |
| Purpose | Post-run cooling + Starlink 24/7 + controller |
| Overnight draw | ~2–4 kWh |
| Estimated cost | €3,000–5,000 |

---

*Internal document — Solhash knowledge base. Updated March 2026.*
*Sources: Bitmain specs, Binance S21 review, Braiins OS documentation, Starlink network updates, Reddit mining communities, DEIF controller specs.*
