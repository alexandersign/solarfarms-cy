# Linyang Power Atlantic 3 MWh — Technical Specification Summary

**Source:** `Specification_3,34MWh.pdf` (Linyang OEM Datasheet)
**Model:** Power Atlantic ATLANTIC 3.34 MWh
**Manufacturer:** Jiangsu Linyang Energy Co., Ltd.

---

## System Overview

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Model** | Power Atlantic 3 MWh (ATLANTIC 3.34 MWh) | |
| **Container Type** | Standard 20-ft (20HC) | |
| **Rated Capacity** | 3,344 kWh (3.34 MWh) | 0.5P ±3°C |
| **Configuration** | 1P416S × 8 | 8 battery modules connected |
| **Power Rating** | Configurable: 1 MW or 2 MW | |
| **Rated Power / Current** | 1,672 kW / 1,256 A | Standard charging current |
| **DC Voltage Range** | 1,164.8 – 1,497.6 V | Cell voltage: 2.5V – 3.65V |
| **Dimensions (W×D×H)** | 6,058 × 2,438 × 2,896 mm | |
| **Weight** | ~31 t (with battery) / ~9 t (empty) | |
| **IP Rating** | IP54 | |
| **Anti-corrosion Level** | C3 | |
| **Operating Temperature** | -30°C to +50°C | |
| **Humidity** | 0–95% | |
| **Max Altitude** | 2,000 m | |
| **Work Habitat** | Outdoor | |

## Performance

| Parameter | Value | Conditions |
|-----------|-------|------------|
| **Charging/Discharging Efficiency** | 93% | 0.5P, 25±3°C, 90% DOD, 80% EOL |
| **Cycle Life (System)** | 8,000 cycles | 0.5C, 25±3°C, 90% DOD, 80% EOL |
| **Self-discharge** | <3.5% per month | All devices off, system disconnected |
| **Internal Temperature** | 25±5°C | Maintained by liquid cooling |

## Cooling & Safety

| Parameter | Value |
|-----------|-------|
| **Cooling Type** | Liquid cooling |
| **HVAC** | Integrated in container |
| **Fire Suppression** | Aerosol + combustible gas detection + ventilation + aqueous solution |
| **Alarm Systems** | Integrated |
| **UPS** | Integrated in container switchboard |

## Communication

| Protocol | Interface |
|----------|-----------|
| Modbus TCP | Ethernet (EMS) |
| IEC 104 | Ethernet |
| IEC 61850 | Ethernet |
| CAN 2.0 | Control unit |

---

## Cell Specifications (EVE LF314 LFP)

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Type** | LFP (LiFePO₄) prismatic | Class A cells |
| **Rated Capacity** | 314 Ah | 0.5P/0.5P, 25±2°C, 2.5–3.65V |
| **Rated Voltage** | 3.2 V | |
| **Rated Energy** | 1,004.8 Wh | |
| **Charging Voltage** | 3.65 V | |
| **Discharging Voltage** | 2.5 V (T>0°C) / 2.0 V (T<0°C) | |
| **Max Charge/Discharge** | 0.5P | 25±2°C |
| **Internal Resistance** | 0.18 mΩ ± 0.05 mΩ | AC, 1kHz |
| **Round Trip Efficiency** | 94% | 25±2°C, 0.5P |
| **Cycle Life** | 8,000 cycles | 25±2°C, 0.5P, 70% EOL |
| **Weight** | 5.6 ± 0.3 kg | |
| **Dimensions (W×D×H)** | 207 × 174 × 71.7 mm | |
| **Charging Temperature** | 0 – 60°C | |
| **Discharging Temperature** | -30 – 60°C | |
| **Self-discharge** | ≤3.0% per month | Storage at 25±2°C |

---

## Battery Module (1P104S)

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Configuration** | 1P104S | 104 cells in series |
| **Rated Energy** | 104.49 kWh | 0.5P @ 25±3°C |
| **Rated Voltage** | 332.8 V | |
| **Voltage Range** | 260 – 379.6 V | Cell voltage: 2.5–3.65V |
| **IP Rating** | IP67 | |
| **Charge/Discharge Power** | 50.92 kW / 157 A | 0.5P, 25±2°C |
| **Operating Temp** | Charging: 0–55°C / Discharging: -20–55°C | |
| **Efficiency** | ≥93% | 0.5P @ 25±3°C |
| **Cooling** | Liquid cooling | |
| **Communication** | CAN 2.0 | |
| **Balancing** | Active / Passive | |
| **Dimensions (W×D×H)** | 790 × 2,180 × 250.5 mm | ±3 mm tolerance |
| **Weight** | ~690 ± 10 kg | |
| **NTC Sensors** | 30 per module | |

---

## Battery Cabinet (HV Box — 1P416S)

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Configuration** | 1P416S | 4 modules in series |
| **Rated Energy** | 417.996 kWh | 0.5P @ 25±3°C |
| **Rated Voltage** | 1,331.2 V | |
| **Voltage Range** | 1,164.8 – 1,497.6 V | |
| **IP Rating** | IP67 | |
| **Charge/Discharge Power** | 208.998 kW / 157 A | 0.5P, 25±2°C |
| **Communication** | CAN 3.0 | |
| **Dimensions (W×D×H)** | 790 × 1,140 × 2,333 mm | ±3 mm tolerance |
| **Weight** | 3.2 t | |
| **Components** | 8 battery modules, 1 HV Box module (contactors, fuses, main switch, BMS) | |

**Container total:** 8 HV Boxes × 417.996 kWh = 3,343.97 kWh ≈ **3.34 MWh**

---

## BMS Architecture

- **3-level management structure:**
  - Level 1: BMU — per module (cell voltage, temperature, balancing)
  - Level 2: BCMU — per HV Box (cabinet management, contactor control)
  - Level 3: BAMS — master BMS collecting data from all HV Boxes
- Master BMS collects data from HV Boxes
- Individual extinguishing per module (activates on temperature anomaly)

---

## Comparison with Other Container Models

| Parameter | **ME 3.343 MWh** | ME 4.179 MWh | ME 5.015 MWh |
|-----------|:-----------------:|:-------------:|:-------------:|
| Container | 20HC | 20HC | 20HC |
| Capacity | 3,344 kWh | 4,179 kWh | 5,015 kWh |
| Modules | 8 | 10 | 12 |
| HV Boxes | 8 | 10 | 12 |
| Power | 1–2 MW | 1–2.5 MW | 1–2.5 MW |
| Cells | EVE LF314 | EVE LF314 | EVE LF314 |
| Cooling | Liquid | Liquid | Liquid |
| Weight | ~31 t | ~37 t | ~43 t |
| Cycle Life | 8,000 | 8,000 | 8,000 |

---

## Usage in Lighthief Portfolio

| Park | Client Group | Config | Notes |
|------|-------------|--------|-------|
| Greendorado Agrivoltaic | ABIO Power | 1× 3.343 MWh + 0.75 MW MV Skid | Smallest park in portfolio |

---

*Document generated from Linyang OEM datasheet — February 2026*
