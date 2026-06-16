# Linyang Power Atlantic — ME 5.015 MWh Container Specification

**Sources (Jun 2026, authoritative):**
- `Power Atlantic_5MWh_EN.pdf` — official 5 MWh datasheet
- `5MWhSpecification.pdf` — full specification (preliminary release)
- `User_Manual_V2.0.pdf` — installation & operation manual
- `5MWhMaintenanceManual.pdf` — maintenance manual
- `Degradation Curve_5MWh.pdf` — degradation curves

**Used in:** HESS Psevdas 120 MWh (24 × ME 5.015 MWh containers)

---

## System Specification

| Parameter | Value | Source |
|-----------|-------|--------|
| **Model** | Power Atlantic ME 5.015 MWh | EN datasheet |
| **Container type** | 20HC (high-cube) | EN datasheet |
| **Battery type** | LFP (LiFePO₄) | EN datasheet |
| **Cell** | EVE LF314, 314 Ah | EN datasheet |
| **Configuration** | 12P416S — 12 racks in parallel, each 1P416S | EN datasheet |
| **Racks (clusters)** | 12 | EN datasheet |
| **Packs per container** | 48 (4 packs per rack × 12 racks) | Derived |
| **Rated energy** | 5,015 kWh (BOL, DC side) | EN datasheet |
| **Rated power — 1C / 0.5C** | 2,500 kW / 1,250 kW | EN datasheet |
| **Rated current — 1C / 0.5C** | 1,884 A / 942 A | EN datasheet |
| **Battery voltage range** | 1,164.8 – 1,497.6 V | EN datasheet |
| **Nominal DC voltage** | 1,331.2 V | Derived (416×3.2V) |
| **Duration** | ≥ 2 h | EN datasheet |
| **DC charging/discharging efficiency** | 93% | EN datasheet |
| **Cycle life** | 8,000 cycles @ 25°C, 90%DOD, 70%SOH | EN datasheet |
| **Self-discharge** | < 3% per month | EN datasheet |
| **Internal temperature maintained** | 25 ± 5°C | EN datasheet |
| **Operating temp — charge** | 0 to +55°C | EN datasheet |
| **Operating temp — discharge** | −30 to +55°C | EN datasheet |
| **Humidity** | < 95% RH, non-condensing | EN datasheet |
| **Auxiliary power supply** | 380/400 V AC, 50/60 Hz | EN datasheet |
| **Dimensions (W×D×H)** | 6,058 × 2,438 × 2,896 mm | EN datasheet |
| **Weight** | ~43 t (Spec doc) / ~41.5 t (EN datasheet) | Both docs |
| **IP rating** | **IP55** | EN datasheet (updated from IP54 in older spec) |
| **Anti-corrosion grade** | **C4** | EN datasheet — **confirm C5 option for Cyprus with Kamil** |
| **Max working altitude** | ≤ 4,000 m | EN datasheet (older spec: 2,000 m) |
| **Communication** | Ethernet / CAN / RS485 | EN datasheet |
| **Protocols** | Modbus TCP / IEC 104 / IEC 61850 | EN datasheet |
| **Certificates** | IEC 62619, IEC 63056, IEC 61000, IEC 62477-1, UN 3536 | EN datasheet |

---

## Thermal Management — Liquid Cooling

| Parameter | Value |
|-----------|-------|
| Type | Liquid cooling (closed refrigerant + coolant cycle) |
| Cooling capacity | **60 kW** (for 0.5C system) |
| Coolant | Ethylene glycol–water mix (factory pre-filled) |
| Distribution | 10 main longitudinal branches; 8 sub-branches per main → pack |
| Refrigerant | Compressor → condenser → expansion valve → evaporator |
| Maintenance access | External only; internal coolant lines require Linyang-authorised personnel |

---

## Fire Suppression System

### Architecture — dual-layer (confirmed from OEM PDFs)

| Layer | Agent | Activation |
|-------|-------|------------|
| **Primary (gas)** | **FK5112 Perfluoroketone (PFK)** | Smoke + heat simultaneous (secondary alarm) → 30 s countdown → FK5112 discharge |
| **Backup** | **Water-based fire protection system** | Backup / extreme conditions |

### Component BOM (from EN datasheet)

| Component | Qty |
|-----------|-----|
| Aerosol suppression canisters (container level) | 6 |
| Aerosol suppression canisters (pack level) | 96 |
| Fire control panel | 1 |
| Smoke detector (photoelectric spot) | 2–3 |
| Heat detector (spot) | 2 |
| Combustible gas sensor (H₂) | 2 |
| CO sensor | 2 |
| Air intake fan | 1 |
| Explosion-proof exhaust fan | 1 |
| **Water firefighting system** | **1** |

### Alarm process (4 levels)
1. Single detector triggered → primary alarm → audible/visual on container
2. Smoke + heat simultaneously → secondary alarm → outdoor alarm + **FK5112 discharge**
3. Pack device level-3 alarm → primary external alarm
4. Pack device level-4 alarm → secondary external alarm + 30 s countdown → **aerosol discharge**

### External water connection
> The EN datasheet and specification confirm a **water firefighting system (qty: 1)** is factory-installed. Kamil Talar (Linyang EU) verbally confirmed (Jun 2026) that the container has an external water connection for integration with a central fire water supply. **Written confirmation + drawing with pipe diameter still required** to verify it matches the HESS MEP spec (Φ50 mm per cabin, §3.4.3).

### PFAS Risk
FK5112 is a PFAS-family compound. AXA Tianping CGL policy includes a PFAS exclusion. **Confirm PFAS carve-in with Marsh before contract.** See `linyang-technical-scope-analysis-may2026.html §T2`.

---

## BMS Architecture (3-level)

| Level | Unit | Count | Function |
|-------|------|-------|---------|
| L1 | BMU | 96 (2 per pack) | Cell voltage (52 ch), temperature (12 ch), passive balancing ≥80 mA; CAN 2.0 |
| L2 | BCMU | 12 (1 per rack) | Voltage 0–1500 V; current ±400 A; SOC accuracy ≤5%; CAN/RS485/Modbus |
| L3 | BAMS | 2 (hot standby) | System master; Modbus TCP/RTU + Ethernet; interfaces EMS |

---

## Cell — EVE LF314

| Parameter | Value |
|-----------|-------|
| Chemistry | LFP (LiFePO₄) prismatic |
| Capacity | 314 Ah |
| Nominal voltage | 3.2 V |
| Voltage range | 2.5–3.65 V (T>0°C); min 2.0 V (T≤0°C) |
| Rated energy | 1,004.8 Wh |
| Energy density | 175–183 Wh/kg |
| Weight | 5.5–5.6 kg |
| Dimensions (W×D×H) | 207×174×71.7 mm |
| Cell RTE | 94% @ 0.5P |
| Cycle life (cell basis) | 6,000 @ 100%DOD, 80%SOH, 0.5C, 25°C |
| System cycle life | 8,000 @ 90%DOD, 70%SOH *(different basis — not contradictory)* |
| Cell certs | UL 1973, UL 9540A, IEC 62619, UN 38.3, GB/T 36276, RoHS |

---

## Battery Pack — 1P104S

| Parameter | Value |
|-----------|-------|
| Config | 1P104S (104 cells series) |
| Rated energy | 104.499 kWh |
| Nominal voltage | 332.8 V |
| Voltage range | 260–379.6 V |
| Operating temp — charge | 0–55°C |
| Operating temp — discharge | −20–55°C |
| Dimensions (W×D×H) | 790×2,180×252 mm (±5 mm) |
| Weight | ~690 ± 10 kg |
| IP rating | IP67 |
| Communication | Daisy chain CAN |
| Balancing | Passive |
| Per-pack fire | Integrated CO + temperature nozzle device |

---

## Battery Rack (Cluster) — 1P416S

| Parameter | Value |
|-----------|-------|
| Config | 1P416S (4 packs in series) |
| Rated energy | 417.996 kWh |
| Nominal voltage | 1,331.2 V |
| Voltage range | 1,164.8–1,497.6 V |
| Weight | ~2.7–3.2 t |
| Dimensions (W×D×H) | 790×1,140×2,333 mm (±3 mm) |
| IP rating | IP54 |
| Components | 4× Pack + BCMU + breaker + fuse + current sensor + contactor |

12 racks × 417.996 kWh = **5,015.95 kWh** ≈ 5,015 kWh ✓

---

## Degradation Curves (`Degradation Curve_5MWh.pdf` — OCR extracted Jun 2026)

Starting SOH at COD: **98.5%** (COD = 2 months shipment + max 6 months install/commissioning after factory)

### 0.25P — 1 cycle/day

| Year | SOH | Cycles | | Year | SOH | Cycles |
|------|-----|--------|-|------|-----|--------|
| 0 | 98.50% | 0 | | 11 | 78.54% | 4,015 |
| 1 | 94.62% | 365 | | 12 | 77.10% | 4,380 |
| 2 | 91.77% | 730 | | 13 | 76.06% | 4,745 |
| 3 | 89.91% | 1,095 | | 14 | 75.03% | 5,110 |
| 4 | 88.00% | 1,460 | | 15 | **73.61%** | 5,475 |
| 5 | 86.78% | 1,825 | | 16 | 72.58% | 5,840 |
| 6 | 84.97% | 2,190 | | 17 | 71.55% | 6,205 |
| 7 | 83.83% | 2,555 | | 18 | 70.52% | 6,570 |
| 8 | 82.25% | 2,920 | | 19 | 69.12% | 6,935 |
| 9 | 81.06% | 3,285 | | 20 | 68.10% | 7,300 |
| 10 | 79.58% | 3,650 | | | | |

### 0.25P — 2 cycles/day

| Year | SOH | Cycles | | Year | SOH | Cycles |
|------|-----|--------|-|------|-----|--------|
| 0 | 98.50% | 0 | | 7 | 80.08% | 5,110 |
| 1 | 93.91% | 730 | | 8 | 78.09% | 5,840 |
| 2 | 90.66% | 1,460 | | 9 | 76.12% | 6,570 |
| 3 | 87.97% | 2,190 | | 10 | 74.13% | 7,300 |
| 4 | 85.76% | 2,920 | | 11 | 72.11% | 8,030 |
| 5 | 83.72% | 3,650 | | 12 | **70.10%** | 8,760 |
| 6 | 81.78% | 4,380 | | | | |

### 0.5P — 1 cycle/day

| Year | SOH | Cycles |
|------|-----|--------|
| 0 | 98.50% | 0 |
| 1 | 94.46% | 365 |
| 5 | 86.26% | 1,825 |
| 10 | 78.70% | 3,650 |
| 15 | **72.45%** | 5,475 |
| 17 | 70.27% | 6,205 |
| 18 | 69.18% | 6,570 |
| 20 | 66.66% | 7,300 |

### 0.5P — 2 cycles/day

| Year | SOH | Cycles |
|------|-----|--------|
| 0 | 98.50% | 0 |
| 1 | 93.78% | 730 |
| 3 | 87.53% | 2,190 |
| 5 | 82.95% | 3,650 |
| 7 | 78.47% | 5,110 |
| 9 | 73.83% | 6,570 |
| 10 | **71.34%** | 7,300 |

### Summary

| Condition | SOH @ yr 15 | Hits 70% EOL | Binding constraint |
|-----------|-------------|--------------|-------------------|
| 0.25P, 1 CPD | 73.61% | yr 18–19 | Calendar / warranty expires yr 15 |
| 0.25P, 2 CPD | — (yr 12) | yr 12 | Cycle count (~8,760 cycles) |
| 0.5P, 1 CPD | **72.45%** | yr 17 | **Warranty expires yr 15 before EOL** |
| 0.5P, 2 CPD | — (yr 10) | yr 10 | Cycle count (~7,300 cycles) |

**For Cyprus (1 cycle/day, 0.5P):** SOH = **72.45% at end of warranty (year 15)** — still above 70% EOL. The warranty expires before physical degradation end-of-life. Strong selling point for clients.

---

## External Connections

| Port | Specification |
|------|--------------|
| Main DC power | 240 mm² cable |
| Auxiliary power | 4×35 mm² + 1×16 mm² |
| Communication | CAT6 Ethernet |
| FSS (fire system) communication | STP cable |
| Grounding | 120–150 mm² yellow/green or flat steel; ≥2 points; ≤4 Ω; ≤0.1 Ω contact |

---

## Maintenance Schedule

| Frequency | Key items |
|-----------|-----------|
| Monthly | Enclosure, paint, corrosion; air inlet/outlet clear; cables; BMS data log; container door seals |
| Every 6 months | Emergency stop test; circuit board cleanliness; fan noise; filter; corrosion on metal |
| Annually | Cable shielding; SPD/fuse tightness; torque check on power cables; grounding ≤4 Ω |

> Monthly physical check = minimum for warranty protection. Log in CMMS.

---

## Open Items (Jun 2026)

| # | Item | Status |
|---|------|--------|
| 1 | External water connection — written confirmation + drawing (Kamil, Linyang EU) | **OUTSTANDING** |
| 2 | Anti-corrosion C4 vs C5 for Cyprus — confirm option | Pending |
| 3 | FK5112 PFAS insurance carve-in (Marsh) | Pending |
| 4 | Water stub Φ50 mm match with HESS MEP spec | Pending item 1 |
