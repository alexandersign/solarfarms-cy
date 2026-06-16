# Linyang Power Atlantic — ME 3.343 MWh Container Specification

**Sources (Jun 2026):**
- Comparison table in `Power Atlantic_5MWh_EN.pdf` and `5MWhSpecification.pdf`
- Original `Specification_3,34MWh.pdf` (referenced in earlier internal doc — Feb 2026)
- Architecture and component details extrapolated from 5 MWh documents (same platform, fewer racks)

**Used in:** Lighthief portfolio standard small-park config (e.g. Greendorado Agrivoltaic / ABIO Power)

---

## System Specification

| Parameter | Value | Source |
|-----------|-------|--------|
| **Model** | Power Atlantic ME 3.343 MWh | Comparison table |
| **Container type** | 20HC (high-cube) | Comparison table |
| **Battery type** | LFP (LiFePO₄) | Comparison table |
| **Cell** | EVE LF314, 314 Ah | Comparison table |
| **Configuration** | 8P416S — 8 racks in parallel, each 1P416S | Derived |
| **Racks (clusters)** | 8 | Comparison table |
| **Packs per container** | 32 (4 packs per rack × 8 racks) | Derived |
| **Rated energy** | 3,343 kWh (BOL, DC side) | Comparison table |
| **Rated power** | 1–2 MW | Comparison table |
| **Battery voltage range** | 1,164.8 – 1,497.6 V | Same cell/rack |
| **Nominal DC voltage** | 1,331.2 V | Same rack spec |
| **Duration** | ≥ 2 h | |
| **DC charging/discharging efficiency** | 93% | Same cell/system |
| **Cycle life** | 8,000 cycles @ 25°C, 90%DOD, 70%SOH | Comparison table |
| **Self-discharge** | < 3% per month | |
| **Operating temp — charge** | 0 to +55°C | Same spec |
| **Operating temp — discharge** | −20 to +55°C | Same spec |
| **Humidity** | < 95% RH, non-condensing | |
| **Auxiliary power supply** | 380/400 V AC, 50/60 Hz | |
| **Dimensions (W×D×H)** | 6,058 × 2,438 × 2,896 mm | Same 20HC |
| **Weight** | ~31 t | Comparison table |
| **IP rating** | IP54 *(from original 3 MWh spec; 5 MWh EN updated to IP55 — verify)* | |
| **Anti-corrosion grade** | C3 *(from original spec)* — confirm C5 option for Cyprus | |
| **Max working altitude** | ≤ 2,000 m *(original spec)* — 5 MWh EN revised to 4,000 m; confirm | |
| **Communication** | Ethernet / CAN / RS485 | |
| **Protocols** | Modbus TCP / IEC 104 / IEC 61850 | |

8 racks × 417.996 kWh = **3,343.97 kWh** ≈ 3,343 kWh ✓

---

## Thermal Management — Liquid Cooling

| Parameter | Value |
|-----------|-------|
| Type | Liquid cooling (same platform) |
| Cooling capacity | **45 kW** *(from original 3 MWh spec + 5MWhSpecification.pdf component table)* |
| Coolant | Ethylene glycol–water mix (factory pre-filled) |

---

## Fire Suppression System

Same dual-layer platform as ME 5.015 MWh:
- **Primary:** FK5112 Perfluoroketone (PFK) gas suppression
- **Backup:** Water-based fire protection system
- Detection: smoke, heat, H₂, CO sensors
- 4-level alarm process; 30-second countdown before gas discharge

Component counts scaled to 8 racks:
- Aerosol canisters (pack level): ~64 (8 racks × 4 packs × 2 per pack = 64) *(interpolated)*
- Container-level aerosol canisters: 6 *(same)*
- All other detection components: same as 5 MWh

> External water connection: same platform as 5 MWh — pending written confirmation from Kamil. PFAS risk (FK5112) applies identically.

---

## BMS Architecture (3-level)

Scaled to 8 racks:

| Level | Unit | Count | Function |
|-------|------|-------|---------|
| L1 | BMU | 64 (2 per pack, 32 packs) | Per-cell voltage/temp; passive balancing; CAN 2.0 |
| L2 | BCMU | 8 (1 per rack) | Rack-level management; CAN/RS485/Modbus |
| L3 | BAMS | 2 (hot standby) | System master; Modbus TCP + Ethernet; EMS interface |

---

## Battery Pack and Rack — same as 5 MWh

Both the 1P104S pack and 1P416S rack specifications are **identical** across all three variants. See `Specification_ME5-015MWh.md` for full tables.

---

## Degradation Curves

No dedicated 3 MWh degradation curve PDF received. Curves expected to follow the same pattern as 5 MWh:
- SOH at COD: ~98.5%
- End-of-life at 70% SOH
- For 1 cycle/day: calendar life (~15 yrs) likely binding over cycle count

---

## Key Differences vs ME 5.015 MWh

| Parameter | ME 3.343 MWh | ME 5.015 MWh |
|-----------|:-----------:|:-----------:|
| Racks | 8 | 12 |
| Packs | 32 | 48 |
| Energy (kWh) | 3,343 | 5,015 |
| Max power | 1–2 MW | 1–2.5 MW |
| Cooling | 45 kW | 60 kW |
| Weight | ~31 t | ~43 t |
| IP (original spec) | IP54 | IP55 |
| Anti-corrosion (orig) | C3 | C4 |
| Max altitude (orig) | 2,000 m | 4,000 m |

> The IP, anti-corrosion, and altitude values for the 3 MWh are from the original early spec and may have been revised in line with the 5 MWh EN datasheet update. **Confirm current values with Kamil before specifying for a Cyprus project** (IP55 + C5 likely required near coast).

---

## Open Items (Jun 2026)

| # | Item | Status |
|---|------|--------|
| 1 | No current standalone 3 MWh spec PDF — request updated sheet from Kamil | Pending |
| 2 | IP54 → IP55 update — confirm applies to this variant | Pending |
| 3 | C3 → C4/C5 — confirm current anti-corrosion grade | Pending |
| 4 | Max altitude 2,000 m → 4,000 m — confirm applies to this variant | Pending |
| 5 | External water connection confirmation | **OUTSTANDING** |
