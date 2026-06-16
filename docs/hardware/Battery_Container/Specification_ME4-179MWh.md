# Linyang Power Atlantic — ME 4.179 MWh Container Specification

**Sources (Jun 2026):**
- Comparison table in `Power Atlantic_5MWh_EN.pdf` and `5MWhSpecification.pdf`
- `Degradation Curve_4MWh.pdf` — image-only, text not extractable
- Architecture and component details extrapolated from 5 MWh documents (same platform, fewer racks)

> **Note:** No standalone 4 MWh specification PDF was received. Parameters marked *(interpolated)* are derived from the 5 MWh spec assuming a linear scaling of racks. Confirm with Kamil/Linyang if precision is required for a project using this variant.

---

## System Specification

| Parameter | Value | Source |
|-----------|-------|--------|
| **Model** | Power Atlantic ME 4.179 MWh | Comparison table |
| **Container type** | 20HC (high-cube) | Comparison table |
| **Battery type** | LFP (LiFePO₄) | Comparison table |
| **Cell** | EVE LF314, 314 Ah | Comparison table |
| **Configuration** | 10P416S — 10 racks in parallel, each 1P416S | Derived |
| **Racks (clusters)** | 10 | Comparison table |
| **Packs per container** | 40 (4 packs per rack × 10 racks) | Derived |
| **Rated energy** | 4,179 kWh (BOL, DC side) | Comparison table |
| **Rated power** | 1–2.5 MW | Comparison table |
| **Battery voltage range** | 1,164.8 – 1,497.6 V | Same cell/rack — same range |
| **Nominal DC voltage** | 1,331.2 V | Same rack spec |
| **Duration** | ≥ 2 h | Same spec |
| **DC charging/discharging efficiency** | 93% | Same cell/system |
| **Cycle life** | 8,000 cycles @ 25°C, 90%DOD, 70%SOH | Comparison table |
| **Self-discharge** | < 3% per month | Same spec |
| **Operating temp — charge** | 0 to +55°C | Same spec |
| **Operating temp — discharge** | −20 to +55°C | Same spec |
| **Humidity** | < 95% RH, non-condensing | Same spec |
| **Auxiliary power supply** | 380/400 V AC, 50/60 Hz | Same spec |
| **Dimensions (W×D×H)** | 6,058 × 2,438 × 2,896 mm | Same 20HC container |
| **Weight** | ~37 t | Comparison table |
| **IP rating** | IP55 *(interpolated from 5 MWh EN datasheet)* | |
| **Anti-corrosion grade** | C4 *(interpolated)* — confirm C5 option for Cyprus | |
| **Max working altitude** | ≤ 4,000 m *(interpolated from 5 MWh EN)* | |
| **Communication** | Ethernet / CAN / RS485 | Same spec |
| **Protocols** | Modbus TCP / IEC 104 / IEC 61850 | Same spec |

10 racks × 417.996 kWh = **4,179.96 kWh** ≈ 4,179 kWh ✓

---

## Thermal Management — Liquid Cooling

| Parameter | Value |
|-----------|-------|
| Type | Liquid cooling (same platform as 5 MWh) |
| Cooling capacity | **45 kW** *(from 5MWhSpecification.pdf component table — 45 kW is listed for this model class; 5 MWh EN upgraded to 60 kW)* |
| Coolant | Ethylene glycol–water mix (factory pre-filled) |
| Architecture | Same 3-stage pipe layout as 5 MWh |

> Confirm 45 kW vs 60 kW with Linyang — the 5 MWh Specification doc (preliminary) lists 45 kW; the EN datasheet lists 60 kW for the 5 MWh. The 4 MWh may use the 45 kW unit.

---

## Fire Suppression System

Same dual-layer platform as ME 5.015 MWh:
- **Primary:** FK5112 Perfluoroketone (PFK) gas suppression
- **Backup:** Water-based fire protection system
- Detection: smoke, heat, H₂, CO sensors
- 4-level alarm process; 30-second countdown before gas discharge

Component counts scaled to 10 racks vs 12:
- Aerosol canisters (pack level): ~80 (10 racks × 4 packs × 2 per pack = 80) *(interpolated)*
- Container-level aerosol canisters: 6 *(same)*
- All other detection components: same as 5 MWh

> External water connection: same as 5 MWh — pending written confirmation from Kamil (Linyang EU). PFAS insurance risk (FK5112) applies identically.

---

## BMS Architecture (3-level)

Same hierarchy as 5 MWh, scaled to 10 racks:

| Level | Unit | Count | Function |
|-------|------|-------|---------|
| L1 | BMU | 80 (2 per pack, 40 packs) | Per-cell voltage/temp; passive balancing; CAN 2.0 |
| L2 | BCMU | 10 (1 per rack) | Rack-level management; CAN/RS485/Modbus |
| L3 | BAMS | 2 (hot standby) | System master; Modbus TCP + Ethernet; EMS interface |

---

## Battery Pack and Rack — same as 5 MWh

Both the 1P104S pack and 1P416S rack specifications are **identical** across all three variants — only the number of racks changes.

See `Specification_ME5-015MWh.md` for full pack and rack tables.

---

## Degradation Curves (`Degradation Curve_4MWh.pdf` — OCR extracted Jun 2026)

Starting SOH at COD: **98.5%** (assumes 2 months shipment + max 6 months installation/commissioning before COD)

### 0.25P — 1 cycle/day

| Year | SOH | Cycles | | Year | SOH | Cycles |
|------|-----|--------|-|------|-----|--------|
| 0 | 98.50% | 0 | | 11 | 81.16% | 4,015 |
| 1 | 95.39% | 365 | | 12 | 80.10% | 4,380 |
| 2 | 92.89% | 730 | | 13 | 79.04% | 4,745 |
| 3 | 90.82% | 1,095 | | 14 | 77.98% | 5,110 |
| 4 | 89.36% | 1,460 | | 15 | 76.91% | 5,475 |
| 5 | 88.12% | 1,825 | | 16 | 75.85% | 5,840 |
| 6 | 86.72% | 2,190 | | 17 | 74.79% | 6,205 |
| 7 | 85.56% | 2,555 | | 18 | 73.73% | 6,570 |
| 8 | 84.38% | 2,920 | | 19 | 72.67% | 6,935 |
| 9 | 83.16% | 3,285 | | 20 | 71.60% | 7,300 |
| 10 | 82.22% | 3,650 | | | | |

→ At 1 CPD/0.25P: SOH = **76.91% at year 15** (5,475 cycles) — above 70% EOL. Calendar life is **not binding** at 15 years.

### 0.25P — 2 cycles/day

| Year | SOH | Cycles |
|------|-----|--------|
| 0 | 98.50% | 0 |
| 1 | 93.91% | 730 |
| 2 | 90.66% | 1,460 |
| 3 | 87.97% | 2,190 |
| 4 | 85.76% | 2,920 |
| 5 | 83.72% | 3,650 |
| 6 | 81.78% | 4,380 |
| 7 | 80.08% | 5,110 |
| 8 | 78.09% | 5,840 |
| 9 | 76.12% | 6,570 |
| 10 | 74.13% | 7,300 |

→ At 2 CPD/0.25P: SOH = **74.13% at year 10** (7,300 cycles) — hits 70% EOL around year 10–11.

### 0.5P — 1 cycle/day

| Year | SOH | Cycles |
|------|-----|--------|
| 0 | 98.50% | 0 |
| 1 | 95.22% | 365 |
| 5 | 87.59% | 1,825 |
| 10 | 81.32% | 3,650 |
| 15 | 75.72% | 5,475 |
| 20 | 70.13% | 7,300 |

→ At 1 CPD/0.5P: SOH = **75.72% at year 15** — above 70% EOL. Reaches ~70% just before year 20 (7,300 cycles). **Calendar (15 yrs) or cycle (7,000) limit is the binding constraint for typical Cyprus operation.**

### 0.5P — 2 cycles/day

| Year | SOH | Cycles |
|------|-----|--------|
| 0 | 98.50% | 0 |
| 1 | 93.51% | 730 |
| 3 | 87.12% | 2,190 |
| 5 | 82.50% | 3,650 |
| 7 | 78.54% | 5,110 |
| 9 | 74.27% | 6,570 |
| 10 | 72.14% | 7,300 |

→ At 2 CPD/0.5P: SOH = **72.14% at year 10** (7,300 cycles) — hits 70% EOL around year 10.

### Summary

| Condition | EOL at 70% SOH |
|-----------|----------------|
| 0.25P, 1 CPD | > 20 years |
| 0.25P, 2 CPD | ~10–11 years |
| 0.5P, 1 CPD | ~20 years *(calendar/cycle limit at 15 yrs)* |
| 0.5P, 2 CPD | ~10 years |

For Cyprus operation (typically 1 cycle/day): **15-year contract warranty covers expected SOH trajectory** at both 0.25P and 0.5P.

---

## External Connections

Same as ME 5.015 MWh — see `Specification_ME5-015MWh.md`.

---

## Maintenance Schedule

Same intervals as 5 MWh — see `Specification_ME5-015MWh.md`.

---

## Open Items (Jun 2026)

| # | Item | Status |
|---|------|--------|
| 1 | No standalone 4 MWh specification PDF — request from Kamil/Linyang | Pending |
| 2 | Cooling capacity 45 kW vs 60 kW — confirm for this variant | Pending |
| 3 | Degradation curve digital data | Pending |
| 4 | External water connection confirmation (same as 5 MWh) | **OUTSTANDING** |
| 5 | Anti-corrosion C4 vs C5 for Cyprus | Pending |
