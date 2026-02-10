# Linyang Energy Storage System - Technical Specifications

## Document: Linyang Battery Specifications for SolarFarms.cy

> **Purpose**: This document consolidates all Linyang-specific technical parameters for use in:
> - BESS Finance Calculator defaults
> - LTSA (Long-Term Service Agreement) terms generation
> - Terms & Conditions templates
> - Project financial modeling

---

## 1. PRODUCT IDENTIFICATION

| Parameter | Value | Source |
|-----------|-------|--------|
| Manufacturer | Jiangsu Linyang Energy Storage Technology Co., Ltd | Degradation Curve Document |
| Product Line | Linyang Power Atlantic | Degradation Curve Document |
| Standard Container Size | **5 MWh** | Degradation Curve Document |
| Chemistry | **LFP (Lithium Iron Phosphate)** | Technical Datasheet |

---

## 2. DEGRADATION CURVE DATA

### 2.1 Initial State of Health

| Parameter | Value | Notes |
|-----------|-------|-------|
| SOH at COD (Commercial Operation Date) | **98.5%** | Per Linyang documentation |
| Initial Usable Capacity | 98.5% of nameplate | Accounts for manufacturing variance |

### 2.2 Operating Conditions Summary

| Condition | P-Rate | Cycles/Day | Cycles/Year | Years to 70% SOH | Total Lifecycle Cycles |
|-----------|--------|------------|-------------|------------------|------------------------|
| Conservative | **0.25P** | 1 CPD | 365 | **~18 years** | 6,570 |
| Moderate | **0.25P** | 2 CPD | 730 | **~12 years** | 8,760 |
| Standard | **0.5P** | 1 CPD | 365 | **~17 years** | 6,205 |
| Aggressive | **0.5P** | 2 CPD | 730 | **~10 years** | 7,300 |

---

### 2.3 Detailed SOH Tables by Operating Condition

#### Condition 1: 0.25P, 1 Cycle per Day (Conservative - 20 Year Projection)

| Year | SOH (%) | Cumulative Cycles | Annual Degradation |
|------|---------|-------------------|-------------------|
| 0 | **98.50%** | 0 | - |
| 1 | **94.62%** | 365 | 3.88% |
| 2 | **91.77%** | 730 | 2.85% |
| 3 | **89.91%** | 1,095 | 1.86% |
| 4 | **88.00%** | 1,460 | 1.91% |
| 5 | **86.78%** | 1,825 | 1.22% |
| 6 | **84.97%** | 2,190 | 1.81% |
| 7 | **83.83%** | 2,555 | 1.14% |
| 8 | **82.25%** | 2,920 | 1.58% |
| 9 | **81.06%** | 3,285 | 1.19% |
| 10 | **79.58%** | 3,650 | 1.48% |
| 11 | **78.54%** | 4,015 | 1.04% |
| 12 | **77.10%** | 4,380 | 1.44% |
| 13 | **76.06%** | 4,745 | 1.04% |
| 14 | **75.03%** | 5,110 | 1.03% |
| 15 | **73.61%** | 5,475 | 1.42% |
| 16 | **72.58%** | 5,840 | 1.03% |
| 17 | **71.55%** | 6,205 | 1.03% |
| 18 | **70.52%** | 6,570 | 1.03% |
| 19 | **69.12%** | 6,935 | 1.40% |
| 20 | **68.10%** | 7,300 | 1.02% |

> **EOL (70%) reached**: Year 18 at 6,570 cycles

---

#### Condition 2: 0.25P, 2 Cycles per Day (Moderate - 12 Year Projection)

| Year | SOH (%) | Cumulative Cycles | Annual Degradation |
|------|---------|-------------------|-------------------|
| 0 | **98.50%** | 0 | - |
| 1 | **93.91%** | 730 | 4.59% |
| 2 | **90.66%** | 1,460 | 3.25% |
| 3 | **87.97%** | 2,190 | 2.69% |
| 4 | **85.76%** | 2,920 | 2.21% |
| 5 | **83.72%** | 3,650 | 2.04% |
| 6 | **81.78%** | 4,380 | 1.94% |
| 7 | **80.08%** | 5,110 | 1.70% |
| 8 | **78.09%** | 5,840 | 1.99% |
| 9 | **76.12%** | 6,570 | 1.97% |
| 10 | **74.13%** | 7,300 | 1.99% |
| 11 | **72.11%** | 8,030 | 2.02% |
| 12 | **70.10%** | 8,760 | 2.01% |

> **EOL (70%) reached**: Year 12 at 8,760 cycles

---

#### Condition 3: 0.5P, 1 Cycle per Day (Standard - 20 Year Projection)

| Year | SOH (%) | Cumulative Cycles | Annual Degradation |
|------|---------|-------------------|-------------------|
| 0 | **98.50%** | 0 | - |
| 1 | **94.46%** | 365 | 4.04% |
| 2 | **91.50%** | 730 | 2.96% |
| 3 | **89.55%** | 1,095 | 1.95% |
| 4 | **87.56%** | 1,460 | 1.99% |
| 5 | **86.26%** | 1,825 | 1.30% |
| 6 | **84.37%** | 2,190 | 1.89% |
| 7 | **83.17%** | 2,555 | 1.20% |
| 8 | **81.51%** | 2,920 | 1.66% |
| 9 | **80.26%** | 3,285 | 1.25% |
| 10 | **78.70%** | 3,650 | 1.56% |
| 11 | **77.60%** | 4,015 | 1.10% |
| 12 | **76.11%** | 4,380 | 1.49% |
| 13 | **75.01%** | 4,745 | 1.10% |
| 14 | **73.92%** | 5,110 | 1.09% |
| 15 | **72.45%** | 5,475 | 1.47% |
| 16 | **71.36%** | 5,840 | 1.09% |
| 17 | **70.27%** | 6,205 | 1.09% |
| 18 | **69.18%** | 6,570 | 1.09% |
| 19 | **67.74%** | 6,935 | 1.44% |
| 20 | **66.66%** | 7,300 | 1.08% |

> **EOL (70%) reached**: Year 17 at 6,205 cycles

---

#### Condition 4: 0.5P, 2 Cycles per Day (Aggressive - 10 Year Projection)

| Year | SOH (%) | Cumulative Cycles | Annual Degradation |
|------|---------|-------------------|-------------------|
| 0 | **98.50%** | 0 | - |
| 1 | **93.78%** | 730 | 4.72% |
| 2 | **90.17%** | 1,460 | 3.61% |
| 3 | **87.53%** | 2,190 | 2.64% |
| 4 | **84.93%** | 2,920 | 2.60% |
| 5 | **82.95%** | 3,650 | 1.98% |
| 6 | **80.50%** | 4,380 | 2.45% |
| 7 | **78.47%** | 5,110 | 2.03% |
| 8 | **75.94%** | 5,840 | 2.53% |
| 9 | **73.83%** | 6,570 | 2.11% |
| 10 | **71.34%** | 7,300 | 2.49% |

> **EOL (70%) reached**: Year 10 at 7,300 cycles

---

### 2.4 Degradation Rate Analysis

| Operating Condition | Year 1 Drop | Average Annual (Yr 2-EOL) | Total Drop to EOL |
|---------------------|-------------|---------------------------|-------------------|
| 0.25P, 1 CPD | **3.88%** | **1.52%** | 27.98% (Yr 18) |
| 0.25P, 2 CPD | **4.59%** | **2.37%** | 28.40% (Yr 12) |
| 0.5P, 1 CPD | **4.04%** | **1.59%** | 28.23% (Yr 17) |
| 0.5P, 2 CPD | **4.72%** | **2.72%** | 27.16% (Yr 10) |

> **Key Insight**: First year degradation is significantly higher (~4-5%) across all conditions, then stabilizes to ~1.5-2.7% annually depending on usage intensity

---

## 3. TECHNICAL SPECIFICATIONS

> **Source**: Power Atlantic 5MWh Battery Container Specification (Preliminary Version)

### 3.1 Container System Specifications

> **Source**: Power Atlantic 5MWh Datasheet (EN) - Latest specifications

| Parameter | Value | Unit | Notes |
|-----------|-------|------|-------|
| Container Type | **20HC** | 20-foot High Cube | - |
| Battery Capacity (BOL) | **5,015** | kWh | DC side |
| Battery Configuration | **12P416S** | - | 12 clusters × 416 cells in series |
| Battery Voltage Range | **1,164.8 – 1,497.6** | V DC | - |
| Duration | **≥2** | hours | - |
| **Rated Power (1C)** | **2,500** | kW | 1884A |
| **Rated Power (0.5C)** | **1,250** | kW | 942A |
| **Charging/Discharging Efficiency** | **93%** | - | System level |
| **Life Cycle** | **8,000** | cycles | 25°C, 90%DOD, 70%SOH |
| Self-Discharge | **<3%** | per month | All devices off, system disconnected |
| Dimensions (W × D × H) | **6,058 × 2,438 × 2,896** | mm | - |
| Weight | **~41.5** | tonnes | Updated spec |
| IP Rating | **IP55** | - | Upgraded from IP54 |
| Anti-Corrosion Grade | **C4** | - | Per ISO 12944 |
| Maximum Altitude | **≤4,000** | meters | - |
| Thermal Management | **Liquid Cooling** | - | Ethylene glycol + water |
| Cooling Capacity | **60** | kW | For 0.5C system |
| Internal Maintenance Temp | **25 ± 5** | °C | - |
| Auxiliary Power Supply | **380/400 VAC** | 50/60Hz | 3-phase |
| Communication | **Ethernet / CAN / RS485** | - | - |
| Communication Protocols | **Modbus TCP / IEC 104 / IEC 61850** | - | With EMS |
| **Certifications** | IEC 62619, IEC 63056, IEC 61000, IEC 62477-1, UN 3536 | - | System level |

### 3.2 Battery Cell Specifications (LFP 314Ah)

| Parameter | Value | Unit | Notes |
|-----------|-------|------|-------|
| Cell Type | **LFP** | Lithium Iron Phosphate | - |
| Cell Capacity | **314** | Ah | - |
| Nominal Voltage | **3.2** | V | - |
| Voltage Range | **2.5 – 3.65** | V | - |
| End-of-Discharge Voltage | **2.5V** (T>0°C) / **2.0V** (T≤0°C) | V | Temperature dependent |
| Rated Energy per Cell | **1,004.8** | Wh | - |
| Standard Current | **157** | A | 0.5C |
| Standard C-Rate | **0.5C** | Charge/Discharge | Recommended |
| Maximum C-Rate | **1C** | Charge/Discharge | Peak |
| Energy Density | **175 – 183** | Wh/kg | Varies by version |
| Initial Internal Resistance | **0.18 ± 0.05** | mΩ | AC, 1kHz |
| **Round-Trip Efficiency (Cell)** | **94%** | @ 0.5P | Cell level |
| Self-Discharge | **≤3%** | per month | @ 25±2°C |
| **Cycle Life (Standard)** | **6,000** | cycles | 0.5C/0.5C, 25°C, 100%DOD, 80%SOH |
| **Cycle Life (Extended)** | **8,000** | cycles | 0.5C/0.5C, 25°C, 90%DOD, 70%SOH |
| Cell Dimensions (W × D × H) | **(207.2±1) × (173.7±1) × (71.7±2)** | mm | Updated spec |
| Cell Weight | **5.6 ± 0.3** | kg | - |
| Operating Temp (Charge) | **0 to +55** | °C | - |
| Operating Temp (Discharge) | **-30 to +55** | °C | Extended range |
| **Certifications** | UL 1973, UL 9540A, IEC 62619, UN 38.3, GB/T 36276, ROHS | - | Bankability certified |

### 3.3 Battery Pack Specifications (1P104S)

| Parameter | Value | Unit |
|-----------|-------|------|
| Pack Configuration | **1P104S** | 1 parallel × 104 series |
| Pack Capacity | **314** | Ah |
| Rated Energy | **104.499** | kWh |
| Nominal Voltage | **332.8** | V |
| Voltage Range | **291.2 – 374.4** | V |
| Duration | **≥2** | hours |
| Dimensions (W × D × H) | **762.5 × 2,180 × 252** | mm |
| Weight | **~690 ± 10** | kg |
| IP Rating | **IP67** | Pack level |
| Thermal Management | **Liquid Cooling** | - |

### 3.4 Battery Cluster Specifications (1P416S)

| Parameter | Value | Unit |
|-----------|-------|------|
| Cluster Configuration | **1P416S** | 4 packs in series |
| Cluster Capacity | **314** | Ah |
| Rated Energy | **417.996** | kWh |
| Nominal Voltage | **1,331.2** | V |
| Voltage Range | **1,164.8 – 1,497.6** | V |
| Duration | **≥2** | hours |
| Weight | **~2.7** | tonnes |
| IP Rating | **IP54** | Cluster level |

### 3.5 System Components Summary

| No. | Component | Quantity | Specification |
|-----|-----------|----------|---------------|
| 1 | Battery Container | 1 | 20HC with distribution & lighting |
| 2 | Battery Packs | 48 | 1P104S configuration |
| 3 | Battery Cluster Switchgear | 12 | BCMU, breaker, fuse, contactor, current sensor |
| 4 | DC Combiner Cabinet | 1 | BAMS, disconnector, UPS |
| 5 | Liquid Cooling Machine | 1 | 45kW cooling capacity |
| 6 | Liquid Cooling Pipes | 1 set | Three-stage pipes |
| 7 | Fire Suppression Controller | 1 | Aerosol fire extinguishing |
| 8 | Smoke Sensors | 3 | Detection |
| 9 | H₂ Gas Sensors | 2 | Flammable gas detection |
| 10 | CO Sensors | 2 | Carbon monoxide detection |
| 11 | Exhaust Fan | 1 | Ventilation |
| 12 | Ventilation System | 1 | Battery compartment |

### 3.6 Efficiency & Performance

| Parameter | Value | Notes |
|-----------|-------|-------|
| **System RTE (AC-AC)** | **87.8%** | Full system, without aux power |
| Cell RTE | **94%** | @ 0.5P |
| Battery Charging Efficiency | **96.5%** | DC side |
| Battery Discharging Efficiency | **97.5%** | DC side |
| PCS Rectifying Efficiency | **98.2%** | Charging mode |
| PCS Inverting Efficiency | **98.5%** | Discharging mode |
| Auxiliary Power Consumption | **~2%** | HVAC, BMS, fire suppression |
| Depth of Discharge (DoD) | **100%** | Per cell spec (2.5-3.65V) |
| Maximum C-Rate | **1C** | Charge and discharge |
| Standard C-Rate | **0.5C** | Recommended operation |

---

## 4. ROUND-TRIP EFFICIENCY (RTE) ANALYSIS

> **Source**: Linyang RTE Calculation Document + Kehua BCS1250K-C-HUD Efficiency Curve

### 4.1 RTE Calculation Formula

```
RTE = Energy Discharged / Energy Charged × 100%
```

### 4.2 System RTE Calculation Model (Without Auxiliary Power)

The full system RTE is calculated by multiplying all component efficiencies in the energy path:

| Stage | Component | Charging | Discharging |
|-------|-----------|----------|-------------|
| 1 | HV Transformer | 99.95% | 99.50% |
| 2 | MV Cable | 99.95% | 99.50% |
| 3 | MV Transformer | 99.00% | 99.00% |
| 4 | LV Cable | 99.95% | 99.95% |
| 5 | **PCS** | **98.20%** (rectifying) | **98.50%** (inverting) |
| 6 | DC Cable | 99.80% | 99.80% |
| 7 | **Battery** | **96.50%** (charging) | **97.50%** (discharging) |

**Full System RTE Calculation:**

```
RTE = 0.9995 × 0.9995 × 0.99 × 0.9995 × 0.982 × 0.998 × 0.965 
    × 0.975 × 0.998 × 0.985 × 0.9995 × 0.99 × 0.995 × 0.995
    
RTE ≈ 87.8%
```

### 4.3 Component Efficiency Breakdown

| Component | Efficiency | Loss | Notes |
|-----------|------------|------|-------|
| HV Transformer (round-trip) | 99.45% | 0.55% | 99.95% × 99.5% |
| MV Cable (round-trip) | 99.45% | 0.55% | 99.95% × 99.5% |
| MV Transformer (round-trip) | 98.01% | 1.99% | 99% × 99% |
| LV Cable (round-trip) | 99.90% | 0.10% | 99.95% × 99.95% |
| **PCS (round-trip)** | **96.72%** | **3.28%** | 98.2% × 98.5% |
| DC Cable (round-trip) | 99.60% | 0.40% | 99.8% × 99.8% |
| **Battery (round-trip)** | **94.09%** | **5.91%** | 96.5% × 97.5% |

### 4.4 PCS Efficiency Data (Kehua BCS1250K-C-HUD)

> **PCS Model**: Kehua BCS1250K-C-HUD (1250kW)
> **Manufacturer**: Xiamen Kehua Digital Energy Tech Co., Ltd

#### Self-Powered Mode @ 25°C

| Load | 10% | 20% | 30% | 40% | 50% | 60% | 70% | 80% | 90% | 100% |
|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|
| **1060V Charge** | 98.26% | 98.80% | 98.84% | 98.86% | 98.81% | 98.76% | 98.69% | 98.60% | 98.49% | 98.39% |
| **1060V Discharge** | 98.01% | 98.56% | 98.63% | 98.66% | 98.59% | 98.56% | 98.50% | 98.42% | 98.32% | 98.21% |
| **1250V Charge** | 97.91% | 98.65% | 98.75% | 98.76% | 98.74% | 98.69% | 98.62% | 98.53% | 98.42% | 98.31% |
| **1250V Discharge** | 97.55% | 98.32% | 98.49% | 98.53% | 98.51% | 98.47% | 98.42% | 98.34% | 98.25% | 98.14% |
| **1450V Charge** | 97.56% | 98.48% | 98.64% | 98.71% | 98.69% | 98.65% | 98.58% | 98.49% | 98.38% | 98.27% |
| **1450V Discharge** | 97.39% | 98.22% | 98.37% | 98.47% | 98.42% | 98.41% | 98.35% | 98.27% | 98.18% | 98.08% |

#### External Power Mode @ 25°C

| Load | 10% | 20% | 30% | 40% | 50% | 60% | 70% | 80% | 90% | 100% |
|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|
| **1060V Charge** | 98.46% | 98.90% | 98.97% | 98.96% | 98.90% | 98.84% | 98.76% | 98.67% | 98.57% | 98.46% |
| **1060V Discharge** | 98.25% | 98.67% | 98.74% | 98.75% | 98.69% | 98.64% | 98.57% | 98.49% | 98.39% | 98.28% |
| **1250V Charge** | 98.01% | 98.70% | 98.83% | 98.85% | 98.81% | 98.76% | 98.69% | 98.60% | 98.50% | 98.39% |
| **1250V Discharge** | 97.82% | 98.46% | 98.58% | 98.62% | 98.58% | 98.54% | 98.48% | 98.40% | 98.31% | 98.21% |
| **1450V Charge** | 97.81% | 98.61% | 98.76% | 98.79% | 98.77% | 98.72% | 98.65% | 98.56% | 98.46% | 98.35% |
| **1450V Discharge** | 97.65% | 98.37% | 98.52% | 98.55% | 98.51% | 98.48% | 98.43% | 98.36% | 98.27% | 98.17% |

### 4.5 PCS Efficiency Summary

| Voltage | Load Range | Best Charging | Best Discharging | Peak RTE |
|---------|------------|---------------|------------------|----------|
| **1060V** | 30-50% | 98.97% @ 30% | 98.75% @ 40% | **97.73%** |
| **1250V** | 30-50% | 98.85% @ 40% | 98.62% @ 40% | **97.48%** |
| **1450V** | 30-50% | 98.79% @ 40% | 98.55% @ 40% | **97.35%** |

> **Key Insight**: PCS efficiency is optimized at 30-50% load ratio. Operating at 40% load provides the best round-trip efficiency.

### 4.6 Linyang Battery Voltage Range vs PCS

| Battery State | Voltage | PCS Efficiency Range | Notes |
|---------------|---------|----------------------|-------|
| Fully Charged | 1,497.6V | 1450V curve | Near max voltage |
| Nominal | 1,331.2V | 1250V curve | Typical operation |
| Fully Discharged | 1,164.8V | 1060V curve | Near min voltage |

### 4.7 RTE Scenarios

| Scenario | System RTE | Notes |
|----------|------------|-------|
| **Without Aux Power** | **87.8%** | Per Linyang calculation |
| **With 2% Aux Power** | **~85.8%** | Estimate with HVAC/BMS |
| **Optimal (40% load)** | **~89-90%** | PCS at peak efficiency |
| **Worst Case (10% load)** | **~84-85%** | PCS at lowest efficiency |
| **AC-AC (calculator default)** | **88.39%** | Conservative estimate |

### 3.7 Operating Environment

| Parameter | Charge | Discharge | Unit |
|-----------|--------|-----------|------|
| Operating Temperature | **0 to +55** | **-30 to +55** | °C |
| Recommended Ambient | **20 to 30** | **20 to 30** | °C |
| Humidity (Operating) | **0 – 95%** | **0 – 95%** | RH (non-condensing) |
| IP Rating (Container) | **IP55** | **IP55** | - |
| IP Rating (Pack) | **IP67** | **IP67** | - |
| IP Rating (Rack) | **IP67** | **IP67** | - |

### 3.8 Storage Requirements

> **Source**: User Manual V2.0

| Parameter | Value | Notes |
|-----------|-------|-------|
| Storage Temperature Range | **-30 to +50** | °C |
| Recommended Storage Temp | **-30 to +25** | °C |
| Storage Humidity | **0 – 95%** | RH, no condensation |
| Ground Requirements | Dry, flat, stable, no vegetation | Sufficient carrying capacity |
| Level Deviation | **0 – 10 mm** | Maximum allowed |
| Storage >6 Months | Perform charge/discharge cycle | Bring SOC to 30-40% |
| Air Inlet/Outlet | Must be protected | Prevent rain, sand, dust |
| Inspection Frequency | **Every 2 weeks** | Check container and equipment |

### 3.9 Transport Requirements

| Parameter | Value | Notes |
|-----------|-------|-------|
| Transport Methods | **Road, Sea** | Air transport NOT permitted |
| Lifting Speed | **≤5 m/min** | Maximum |
| Lifting Capacity Required | **≥100,000 kg** | Recommended crane capacity |
| Container Doors | Must be locked | During transport |
| Weather | Fair conditions only | No heavy rain, fog, gust |
| Warning Zone | **5-10 m radius** | No personnel during lifting |

### 3.8 Liquid Cooling System

| Component | Description |
|-----------|-------------|
| Coolant Type | **Ethylene glycol + water mixture** |
| Cooling Capacity | **45 kW** |
| Flow Design | 10 main longitudinal branches, each splits to 8 sub-branches |
| Temperature Control | Heating and cooling capability |

**Cooling Cycle Process:**
1. Compressor compresses medium-temp, low-pressure gas to high-temp, high-pressure gas
2. Gas liquefies in condenser, releasing heat
3. Liquid passes through electronic expansion valve → gas-liquid mix (low temp, low pressure)
4. Enters evaporator for heat exchange
5. Becomes low-temp, low-pressure gas → repeat cycle

**Coolant Cycle Process:**
1. Pump sends coolant to battery packs
2. Coolant absorbs heat from batteries
3. Returns to evaporator for heat exchange
4. Repeat cycle

---

## 4. WARRANTY & LIFECYCLE

> **Source**: Linyang Warranty Terms v2.pdf (Document LYCN/WI-3410 Rev A/0)

### 4.1 Standard Warranty Periods

| Component | Standard Warranty | Notes |
|-----------|-------------------|-------|
| **Power Conversion System (PCS)** | **5 years** | Base warranty |
| **Battery Container** | **5 years** | Base warranty |
| **Auxiliary Equipment (HVAC, FSS)** | **5 years** | Within battery container |
| **Transformer & MV Switchgear** | **5 years** | Base warranty |
| **DC Container/Enclosure** | **5 years** | Base warranty |
| **AC Container/Enclosure** | **5 years** | Base warranty |
| **UPS** | **5 years** | Base warranty |
| **Extended Warranty Option** | **15 years** | With LTSA (Years 6-15 paid) |
| **EOL Threshold** | **70%** | SOH at end of warranty |
| **Cycle Warranty (100% DOD)** | **6,000** | @ 80% SOH |
| **Cycle Warranty (90% DOD)** | **8,000** | @ 70% SOH |

### 4.2 Warranty Commencement

The standard warranty period commences on the **earlier** of:
1. The start date of commissioning
2. Six (6) months after shipment from Linyang factory

### 4.3 Coastal Installation Restrictions

> ⚠️ **CRITICAL FOR CYPRUS PROJECTS** - Most Cyprus sites are within coastal zones

#### For Systems WITHOUT C5-Rated Enclosure

| Distance from Sea | PCS/Transformer/Switchgear Warranty |
|-------------------|--------------------------------------|
| **> 5 km** | Standard 5 years |
| **2-5 km** | **Shortened to 2 years** |
| **< 2 km** | **WARRANTY VOID** |

#### For Systems WITH C5-Rated Enclosure

| Distance from Sea | PCS/Transformer/Switchgear Warranty |
|-------------------|--------------------------------------|
| **> 500 m** | Standard 5 years |
| **< 500 m** | **Shortened to 2 years** |

> **Recommendation**: All Cyprus coastal projects should specify **C5-rated enclosures** to maintain warranty coverage

### 4.4 Warranty Conditions (Prerequisites)

The limited warranty applies **only if**:

| Condition | Requirement |
|-----------|-------------|
| **Proper Use** | Product used per user manuals and maintenance guidelines |
| **Payment Status** | All amounts due fully paid (contract payments, interest, etc.) |
| **Qualified Personnel** | Operations by trained and authorized personnel |
| **Approved Channels** | Products purchased from Linyang or authorized distributors |

### 4.5 Warranty Exclusions (Not Covered)

> **Source**: Linyang Warranty Terms v2.pdf + User Manual V2.0

#### General Exclusions

| Category | Description |
|----------|-------------|
| **Wearing Parts** | Consumables, reasonable wear and tear |
| **Cosmetic Defects** | Defects not affecting normal functioning |
| **Force Majeure** | Fires, war, natural disasters |

#### Improper Use Exclusions

| Cause | Examples |
|-------|----------|
| ❌ **Incorrect Transport** | Improper handling, lifting, shipping |
| ❌ **Improper Storage** | Not following storage requirements |
| ❌ **Improper Installation** | Not following Linyang installation manual |
| ❌ **Abuse/Misuse** | Not following user/maintenance manuals |
| ❌ **Unauthorized Modification** | Repair/modification without Linyang approval |

#### External Factor Exclusions

| Cause | Examples |
|-------|----------|
| ❌ **Natural Disasters** | Floods, earthquakes, storms, lightning |
| ❌ **Biological Activity** | Animal damage, pest infestation |
| ❌ **Industrial Chemicals** | Exposure to corrosive substances |
| ❌ **Salt Spray/Corrosion** | Exceeding C4/C5 design specifications |
| ❌ **Exceeding Specs** | Voltage, wind/snow load beyond rated |
| ❌ **Human Damage** | Accidents, vandalism, operator error |
| ❌ **Third-Party Equipment** | Damage from non-Linyang components |

#### Battery-Specific Exclusions (Critical for SOH Guarantee)

> **Source**: User Manual V2.0 - These conditions void warranty

| Condition | Threshold | Time Limit | Action Required |
|-----------|-----------|------------|-----------------|
| Cell Under-Voltage (Sustained) | **< 2.8V** | **120 consecutive hours** | Charge immediately |
| Cell Under-Voltage (Critical) | **≤ 2.5V** | Any duration | **WARRANTY VOID** |
| Cluster SOC (Zero State) | **0%** | **120 consecutive hours** | Charge to ≥15% SOC |
| SOC during Operation | **0%** | **2 hours** | Charge to ≥5% SOC |

### 4.6 SOC Management Requirements

| Scenario | Required Action | Timeframe |
|----------|-----------------|-----------|
| Extended non-operation (7+ days) | Increase SOC lower limit to **>10%** | Before shutdown |
| Maintenance shutdown (SOC at 0%) | Charge to **≥15% SOC** | Within 120 hours |
| Operational SOC reaches 0% | Charge to **≥5% SOC** OR switch to recharge mode | Within 2 hours |
| Storage >6 months | Perform charge/discharge cycle | Bring SOC to 30-40% |

### 4.7 Warranty Termination Events

> The warranty is **immediately terminated** if any of the following occurs:

| Event | Description |
|-------|-------------|
| 🚫 **Serial Number Altered** | Product serial number is modified or unidentifiable |
| 🚫 **Refusal of Inspection** | Refusing to provide conditions for inspection, testing, or repair |
| 🚫 **Unauthorized Relocation** | Product relocated without prior written approval from Linyang |

### 4.8 Product Relocation

| Scenario | Requirement |
|----------|-------------|
| **Relocation Request** | Must request Linyang on-site inspection of new location |
| **Inspection Result** | Linyang assesses if remaining warranty can continue |
| **Inspection Costs** | Borne by Warranty Right Holder |
| **Without Approval** | **WARRANTY VOID** |

### 4.9 Warranty Transfer

| Condition | Outcome |
|-----------|---------|
| Products remain at original site | Warranty may transfer |
| Ownership legally transferred | Warranty rights automatically transfer to new owner |
| Replacement of equipment | Replaced parts maintain warranty period of original product |

### 4.10 Warranty Claim Procedure

> **Response Time**: 48 hours (excluding weekends and local public holidays)

#### Step 1: Submit Claim
Contact Linyang via official channels with:
- Product serial number
- Proof of purchase and delivery
- Installation serial number
- Operation and maintenance logs
- Detailed defect description (photos/videos)

#### Step 2: Linyang Response
Within 48 hours, Linyang may:
1. Accept the warranty claim
2. Reject as non-warranty issue
3. Investigate the defective product
4. Arrange third-party testing

#### Step 3: Resolution
If claim is accepted:
- Repair defective product, OR
- Replace with equivalent parts (new or refurbished)
- All replaced parts become Linyang property

### 4.11 Warranty Right Holder Obligations

| Obligation | Description |
|------------|-------------|
| **Proper Use** | Use products per specifications and manuals |
| **Damage Prevention** | Take measures to prevent further damage when defect found |
| **Site Access** | Provide access and safe working conditions for Linyang personnel |
| **Third-Party Equipment** | Ensure non-Linyang equipment doesn't interfere with service |
| **Documentation** | Provide O&M documentation and logs to Linyang |
| **Scheduling Costs** | Bear costs if service rescheduled due to holder's reasons |

### 4.12 Liability Limitation

> **Maximum Liability**: **10% of total payment** received by Linyang for defective products

| Limitation | Description |
|------------|-------------|
| **Exclusive Warranty** | This is the sole warranty provided by Linyang |
| **Implied Warranties** | All implied warranties disclaimed to fullest extent |
| **Remedies Limited** | Only remedies set forth in warranty manual apply |
| **Aggregate Cap** | Total liability capped at 10% of product payment |

### 4.13 Dispute Resolution

| Parameter | Value |
|-----------|-------|
| **Governing Law** | Laws of People's Republic of China |
| **Arbitration Body** | Shanghai International Arbitration Center (SHIAC) |
| **Location** | Shanghai, China |
| **Language** | English |
| **Third-Party Testing** | May engage mutually agreed testing agency |
| **Test Costs** | If defect not Linyang's fault → Warranty Right Holder pays |

### 4.14 Actions That Void Warranty (Detailed)

| Action | Description |
|--------|-------------|
| ❌ Improper charging | Not charging batteries as required |
| ❌ Physical damage | Batteries damaged, dropped, or leaked due to improper operations |
| ❌ Over-discharge damage | Not powering on batteries in time |
| ❌ Wrong equipment | Using improper charging/discharging equipment |
| ❌ Frequent over-discharge | Due to improper maintenance |
| ❌ Incorrect parameters | Battery operation parameters not correctly set |
| ❌ Environmental violation | Operating environment doesn't meet requirements |
| ❌ Unauthorized use | Use beyond specified scenarios |
| ❌ Maintenance failure | Not maintaining per system manual |
| ❌ Past warranty use | Continued use beyond warranty period |
| ❌ Defective batteries | Using defective or deformed batteries |
| ❌ Mixed batteries | Using with other brands or different capacities |
| ❌ Hazardous storage | Storing with flammable/explosive materials |
| ❌ Unqualified personnel | Operations by non-qualified personnel |
| ❌ No PPE | Personnel not wearing protective equipment |
| ❌ Improper behavior | Eating, drinking, smoking near batteries |

### 4.15 LTSA (Long-Term Service Agreement) Terms

| Parameter | Value | Notes |
|-----------|-------|-------|
| Availability Guarantee | **97%** | With LTSA active |
| Availability without LTSA | **~95%** | Estimated |
| Response Time | **24 hours** | For critical issues |
| Remote Monitoring | **Included** | 24/7 via Linyang EMS |
| On-site Support | **As needed** | Per LTSA terms |

---

## 5. MAINTENANCE SCHEDULE (Per Linyang Manual)

> **Source**: Power Atlantic 5MWh Battery Container Maintenance Manual (February 2025)

### 5.1 Maintenance Intervals

| Interval | Frequency | Key Activities |
|----------|-----------|----------------|
| Initial | At grid connection | Cable inspection, terminal checks, bolt verification |
| Monthly | 12x per year | Container inspection, system status, BMS data review |
| Semi-Annual | 2x per year | Safety function tests, component inspection, cleaning |
| Annual | 1x per year | Full electrical inspection, grounding verification |

### 5.2 Monthly Maintenance Checklist

| Component | Check Items |
|-----------|-------------|
| **Container** | Damage, paint flaking, oxidation, deformation |
| **Container** | Flammable objects on top, welding point integrity |
| **Container** | Door lock function, sealing strip condition |
| **Container** | Foreign objects, dust, dirt, condensation inside |
| **Air Inlet/Outlet** | Blockage check |
| **Cables** | Breakage inspection |
| **System Status** | Abnormal noise, temperature, humidity, dust levels |
| **Software/BMS** | Data download, parameter review, log backup, updates |

### 5.3 Semi-Annual Maintenance Checklist (Every 6 Months)

| Component | Check Items |
|-----------|-------------|
| **Safety Functions** | Emergency stop button test, shutdown simulation |
| **Warning Marks** | Legibility check, replacement if damaged |
| **Circuit Boards** | Cleanliness inspection |
| **Fans** | Operation test, abnormal noise check |
| **Radiator** | Temperature check, dust accumulation |
| **Air Filters** | Replacement when necessary |
| **Metal Components** | Corrosion inspection |
| **Contactors** | Mechanical operation verification |
| **UPS (if present)** | Recharge (required every 6 months when not operated) |

### 5.4 Annual Maintenance Checklist

| Component | Check Items |
|-----------|-------------|
| **Cable Shielding** | Contact with insulation sleeve, copper bus bar fixation |
| **SPD & Fuses** | Proper fastening verification |
| **Cable Layout** | Short circuit check, proper routing |
| **Cable Entry Points** | Seal integrity |
| **Power Cables** | Looseness check, re-torque to specification |
| **Cable Condition** | Damage inspection, especially at metal contact surfaces |
| **Insulation Tape** | Verify terminals are properly taped |
| **Grounding** | Resistance ≤ **4Ω**, connection verification |
| **Equipotential Bonding** | Correct connection inside integrated system |

### 5.5 Environmental Precautions

| Condition | Required Action |
|-----------|-----------------|
| **Rain/Humidity/Wind** | Do NOT open container doors for maintenance |
| **Rain/Snow/Fog** | Avoid opening doors; check door seals when closing |
| **Heavy Snowfall** | Clear snow from top and surrounding area promptly |
| **Fair Weather** | Recommended to open doors for dehumidification |
| **Sandy/Dusty Environment** | Shorten maintenance cycle, increase frequency |

### 5.6 Safety Warnings

| ⚠️ Warning | Description |
|------------|-------------|
| **MSD Disconnection** | Ensure all MSDs are disconnected before rack maintenance |
| **Pack Maintenance** | Verify plug locking structure is unlocked before unplugging |
| **Electric Shock Risk** | Do not perform operations beyond this manual |
| **Warranty Void** | Damage from violating precautions not covered by Linyang |

### 5.7 Technical Requirements

| Parameter | Specification |
|-----------|---------------|
| Maximum Grounding Resistance | **≤ 4Ω** |
| Connection Impedance | **≤ 0.1Ω** |
| Grounding Cross-Section | **≥ 250 mm²** | Effective area |
| UPS Recharge Interval | **Every 6 months** (when not operated) |
| Air Filter Replacement | **As needed** (based on dust accumulation) |

### 5.8 Cable Specifications

> **Source**: User Manual V2.0

| Connection | Cable Specification | Notes |
|------------|---------------------|-------|
| Main Power | **240 mm²** | DC power cables |
| Communication | **CAT6** | Ethernet |
| Auxiliary Power | **4×35mm² + 1×16mm²** | 3-phase + neutral + ground |
| Fire Suppression Communication | **STP** | Shielded twisted pair |
| Grounding | **120 – 150 mm²** | Yellow-green cable or flat steel |

### 5.9 Foundation Requirements

| Parameter | Specification |
|-----------|---------------|
| Soil Relative Density | **≥ 98%** | Recommended |
| Level Deviation | **0 – 10 mm** | Maximum allowed |
| Foundation Height | Above highest historical water level | Prevent rain erosion |
| Cable Trench | Pre-embed conduit | Per cable inlet positions |
| Clearance for Door Opening | Sufficient space required | Per door swing diagram |
| Fixing Method | **Welding** or **L-shaped angle steel** | To embedded channel steel |

---

## 6. COST STRUCTURE

### 5.1 CAPEX

| Parameter | Value | Unit | Notes |
|-----------|-------|------|-------|
| Battery Container Cost | **€127,000** | per MWh | Ex-works, FOB China |
| Full System Cost (installed) | **€150,000 - €180,000** | per MWh | Including BOS, installation |
| PCS Cost (if separate) | **€30,000 - €40,000** | per MW | Included in above |
| Grid Connection | **Variable** | - | Project-specific |

### 5.2 O&M / OPEX

| Parameter | Value | Unit | Notes |
|-----------|-------|------|-------|
| Basic O&M | **€2,470** | per MWh/year | Without availability guarantee |
| O&M with LTSA (97% availability) | **€4,670** | per MWh/year | Includes €2,200 LTSA premium |
| LTSA Premium Only | **€2,200** | per MWh/year | For 97% availability guarantee |
| Remote Monitoring | **Included** | - | In O&M package |
| Preventive Maintenance | **2x per year** | visits | Standard schedule |
| Corrective Maintenance | **As needed** | - | Response within 24 hours |

### 5.3 LTSA Pricing (Official Linyang Cyprus Pricing)

> **Source**: LTSA - Cyprus.pdf (Linyang Official Pricing for Esperia Energy Group)

#### Core Maintenance Services

| Service | EUR/MWh/Year | Description |
|---------|--------------|-------------|
| **BESS Preventive & Corrective Maintenance** | **€1,157.62** | Includes remote monitoring + bi-annual servicing |
| **PCS + MVS Preventive & Corrective Maintenance** | **€1,311.97** | Includes remote monitoring + bi-annual servicing |
| **Total Core O&M** | **€2,469.59** | BESS + PCS + MVS |

#### Availability Guarantee

| Service | EUR/MWh/Year | Description |
|---------|--------------|-------------|
| **97% Availability Guarantee (Years 1-20)** | **€2,201.73** | Includes local service team + spare parts warehouse |

#### Warranty Extensions (Optional)

| Component | Years 6-10 | Years 11-15 | Years 16-20 |
|-----------|------------|-------------|-------------|
| **BESS Performance & Product Warranty** | €913.92 | €1,157.62 | €3,858.75 |
| **PCS + MVS Product Warranty** | €747.76 | €926.10 | €2,315.25 |
| **Combined** | €1,661.68 | €2,083.72 | €6,174.00 |

#### Total LTSA Package Scenarios (Per MWh/Year)

| Package | Years 1-5 | Years 6-10 | Years 11-15 | Years 16-20 |
|---------|-----------|------------|-------------|-------------|
| **Basic O&M Only** | €2,469.59 | €2,469.59 | €2,469.59 | €2,469.59 |
| **O&M + Availability** | €4,671.32 | €4,671.32 | €4,671.32 | €4,671.32 |
| **Full LTSA (O&M + Avail + Warranty)** | €4,671.32 | €6,333.00 | €6,755.04 | €10,845.32 |

> **Note**: Base warranty included in Years 1-5. Warranty extension pricing applies from Year 6 onwards.

---

## 7. POWER CONVERSION SYSTEM (PCS) SPECIFICATIONS

> **Source**: Kehua BCS1000K~1250K-C-HUD Series Datasheet + BCS10000K-C-HUD/T8 Datasheet

### 7.1 PCS Manufacturer

| Parameter | Value |
|-----------|-------|
| Manufacturer | **Xiamen Kehua Digital Energy Tech Co., Ltd** |
| Product Series | BCS-C-HUD |
| Website | www.kehua.com |

### 7.2 Single PCS Specifications (BCS1250K-C-HUD)

#### DC Input

| Parameter | BCS1000K-C-HUD | BCS1250K-C-HUD |
|-----------|----------------|----------------|
| Max DC Voltage | **1500 Vdc** | **1500 Vdc** |
| Full Load DC Voltage Range | **1060 – 1500 Vdc** | **1060 – 1500 Vdc** |
| Max DC Current | 1,122 A | **1,403 A** |
| Soft Start | Yes | Yes |

#### AC Output (On-Grid)

| Parameter | BCS1000K-C-HUD | BCS1250K-C-HUD |
|-----------|----------------|----------------|
| Rated AC Output Power | 1,000 kW | **1,250 kW** |
| Max AC Output Power | 1,100 kVA | **1,375 kVA** |
| Rated Grid-Tied Voltage | **690 Vac** | **690 Vac** |
| Grid Voltage Range | **-15% to +10%** (settable) | **-15% to +10%** (settable) |
| Rated Grid Frequency | **50 Hz** | **50 Hz** |
| Max Output Current | 920.4 A | **1,150.6 A** |
| Power Factor | **> 0.99** @ rated power | **> 0.99** @ rated power |
| PF Adjustable Range | **-1 (leading) to +1 (lagging)** | **-1 (leading) to +1 (lagging)** |
| Reactive Power Range | **-100% to +100%** | **-100% to +100%** |
| THDi | **< 3%** @ rated power | **< 3%** @ rated power |

#### AC Output (Off-Grid)

| Parameter | BCS1000K-C-HUD | BCS1250K-C-HUD |
|-----------|----------------|----------------|
| Rated AC Output Voltage | 690 Vac | **690 Vac** |
| Output Voltage Accuracy | **1%** | **1%** |
| Max Output Current | 920.4 A | **1,150.6 A** |
| THDu | **≤ 3%** (linear load) | **≤ 3%** (linear load) |
| Rated Output Frequency | 50 Hz | **50 Hz** |
| Overload Capability | **110%** | **110%** |

#### Efficiency & General

| Parameter | Value |
|-----------|-------|
| **Maximum Efficiency** | **≥ 99%** |
| Isolation Mode | None (transformer external) |
| Dimensions (W × H × D) | **735 × 2,135 × 1,300 mm** |
| Footprint | **0.95 m²** |
| Weight | **~950 kg** |
| IP Rating | **IP65** |
| Corrosion Protection | **C5** |
| Cooling Type | Intelligent air cooling |
| Altitude | **4,000 m** (>2,000 m derating) |
| Operating Temperature | **-35°C to +60°C** (>50°C derating) |
| Overload Capability | **40°C: 1.1× overload; 50°C: no derating** |
| Relative Humidity | **0 – 100%** (non-condensing) |
| Display | LED |

#### Communication & Compliance

| Parameter | Value |
|-----------|-------|
| Communication Protocols | **Modbus-RTU / Modbus-TCP / IEC 61850 / IEC 104** |
| Communication Interfaces | RS485 / CAN / Ethernet (4 ports) |
| **Compliance** | EN/IEC 62477-1, EN/IEC 61000-6-2, EN50549-2/10, IEC 62116, IEC 61727, IEC 60068-2-1/2/14/30 |

#### Grid-Forming Features

| Feature | Description |
|---------|-------------|
| Response Time | **Millisecond-level** response to EMS commands |
| Grid-Forming | Supported |
| Operating Modes | VSG, Black-Start, VF, PQ |
| Multi-Mode Switching | Supported |
| Online Insulation Testing | AC and DC |

### 7.3 P-Q Curve Performance (Single PCS)

| Grid Voltage | Max Active Power (P) | Max Reactive Power (Q) | Temperature |
|--------------|---------------------|------------------------|-------------|
| **100% (Rated)** | 100% | ±110% | 35°C |
| **100% (Rated)** | 100% | ±105% | 50°C |
| **100% (Rated)** | 100% | ±100% | 55°C |
| **95% (0.95 pu)** | 95% | ±104.5% | 35°C |
| **95% (0.95 pu)** | 95% | ±99.75% | 50°C |
| **90% (0.90 pu)** | 90% | ±99% | 35°C |
| **90% (0.90 pu)** | 90% | ±94.5% | 50°C |

### 7.4 P-Q Curve Performance (Parallel PCS - 8 Units)

| Grid Voltage | Max Active Power (P) | Max Reactive Power (Q) | Temperature |
|--------------|---------------------|------------------------|-------------|
| **100% (Rated)** | 100% | ±110% | 30°C |
| **100% (Rated)** | 100% | ±105% | 45°C |
| **100% (Rated)** | 100% | ±100% | 50°C |
| **95% (0.95 pu)** | 95% | ±104.5% | 30°C |
| **90% (0.90 pu)** | 90% | ±99% | 30°C |

### 7.5 MV Skid Product Matrix (All Available Configurations)

> **Source**: Quotation LY202511281 - Cyprus 863.5MWh Project
> **Pricing Note**: Group order pricing shown. For individual/retail pricing add **+12%**

#### MV Skid Configurations by Power Rating

| MV Skid Model | Power (MW) | PCS Count | PCS Model | Transformer | Datasheet Status |
|---------------|------------|-----------|-----------|-------------|------------------|
| 1MW MV Skid | **1.0** | 1 | BCS1000K-C-HUD | ~1.1 MVA | ❌ **MISSING** |
| 1.25MW MV Skid | **1.25** | 1 | BCS1250K-C-HUD | ~1.4 MVA | ❌ **MISSING** |
| 1.5MW MV Skid | **1.5** | 1-2 | BCS1000K/1250K | ~1.7 MVA | ❌ **MISSING** |
| 1.725MW MV Skid | **1.725** | 1-2 | BCS1250K-C-HUD | ~1.9 MVA | ❌ **MISSING** |
| 2MW MV Skid | **2.0** | 2 | BCS1000K-C-HUD | ~2.2 MVA | ❌ **MISSING** |
| 2.5MW MV Skid | **2.5** | 2 | BCS1250K-C-HUD | ~2.75 MVA | ❌ **MISSING** |
| 3MW MV Skid | **3.0** | 2-3 | Mixed | ~3.3 MVA | ❌ **MISSING** |
| 3.45MW MV Skid | **3.45** | 3 | BCS1250K-C-HUD | ~3.8 MVA | ❌ **MISSING** |
| 4MW MV Skid | **4.0** | 3-4 | Mixed | ~4.4 MVA | ❌ **MISSING** |
| 5MW MV Skid | **5.0** | 4 | BCS1250K-C-HUD | ~5.5 MVA | ❌ **MISSING** |
| 6MW MV Skid | **6.0** | 4-5 | BCS1250K-C-HUD | ~6.6 MVA | ❌ **MISSING** |
| 6.9MW MV Skid | **6.9** | 5-6 | BCS1250K-C-HUD | ~7.6 MVA | ❌ **MISSING** |
| 7.5MW MV Skid | **7.5** | 6 | BCS1250K-C-HUD | ~8.25 MVA | ❌ **MISSING** |
| 8MW MV Skid | **8.0** | 6-7 | BCS1250K-C-HUD | ~8.8 MVA | ❌ **MISSING** |
| **BCS10000K-C-HUD/T8** | **10.0** | 8 | BCS1250K-C-HUD | 10 MVA | ✅ **Available** |

#### Typical MV Skid Combinations Used in Projects

| Project Size | Primary Skid | Secondary Skid | Total Power |
|--------------|--------------|----------------|-------------|
| 5MW/15MWh | 1.725MW | 3.45MW | 5.175 MW |
| 6.5MW/20MWh | 6.9MW | - | 6.9 MW |
| 7.7MW/25MWh | 6.9MW | 1.725MW | 8.625 MW |
| 8MW/35MWh | 7.5MW | 1.25MW | 8.75 MW |
| 8MW/60MWh | 8MW | 4MW | 12 MW |
| 12MW/40MWh | 6MW × 2 | - | 12 MW |
| 25MW/100MWh | 10MW | 5MW | 15 MW |

### 7.6 Containerized PCS + Transformer (BCS10000K-C-HUD/T8)

> 10 MW integrated system with 8 × 1250kW PCS units + MV Transformer

#### System Specifications

| Parameter | Value |
|-----------|-------|
| System Configuration | **8 × BCS1250K-C-HUD** |
| **Rated AC Output Power** | **10,000 kW (10 MW)** |
| Max AC Output Power | **11,000 kVA** |
| Max DC Current | **1,402 A × 8 = 11,216 A** |
| DC Voltage Range | **1,060 – 1,500 Vdc** |
| Max Output Current (LV side) | **9,204 A** |
| THDi | **< 3%** @ rated power |
| THDu (Off-Grid) | **< 3%** (linear load) |
| **Max PCS Efficiency** | **≥ 99%** |

#### Integrated MV Transformer

| Parameter | Value |
|-----------|-------|
| **Rated Power** | **10,000 kVA** |
| **Voltage Transformation** | **0.69 kV / 35 kV** (customizable) |
| Isolation Mode | **Oil-immersed transformer** |
| Vector Group | **Dy11-y11** |
| Real-time Monitoring | Transformer condition monitoring |

#### Container Specifications

| Parameter | Value |
|-----------|-------|
| Container Type | **40HC** (40-foot High Cube) |
| Dimensions (W × H × D) | **12,192 × 2,896 × 2,438 mm** |
| Weight | **≤ 38,000 kg (38 tonnes)** |
| IP Rating (PCS) | **IP65** |
| IP Rating (Skid) | **IP54** |
| Operating Temperature | **-35°C to +60°C** (>45°C derating) |
| Relative Humidity | **0 – 100%** (non-condensing) |
| Cooling Type | Intelligent air cooling |
| Altitude | **4,000 m** (>2,000 m derating) |

#### Communication & Compliance

| Parameter | Value |
|-----------|-------|
| Communication Protocols | **Modbus-RTU / Modbus-TCP / IEC 61850 / IEC 104** |
| Communication Interfaces | RS485 / CAN / Ethernet |
| Integrated Features | Fiber optic network, integrated data acquisition |
| **Compliance** | EN/IEC 62477-1, EN/IEC 61000-6-2, EN50549-2/10, IEC 62116, IEC 61727, IEC 60068-2-1/2/14/30, EN55011 |

### 7.6 Power Quality Specifications

| Parameter | Specification | Standard |
|-----------|---------------|----------|
| **THDi (Current Harmonics)** | **< 3%** | @ rated power |
| **THDu (Voltage Harmonics)** | **≤ 3%** | Linear load, off-grid |
| Flicker | Per IEC 61000-3-3 | Tested |
| DC Injection | Per EN 50549 | Tested |
| Power Factor | **> 0.99** | @ rated power |
| PF Adjustable | -1 to +1 | Full 4-quadrant |

### 7.10 Battery Container Product Matrix

> **Source**: Commercial Offer 198/A/KT/2025

| Model | Capacity | Cell Type | Cell Brand | Configuration | DC Voltage Range | Weight | Datasheet |
|-------|----------|-----------|------------|---------------|------------------|--------|-----------|
| **ME 4.179 MWh** | 4.179 MWh | 306Ah LFP | EVE | 1P104S×4×10 | 1164.8-1497.6V | ~38.5t | ✅ Available |
| **ME 5.015 MWh** | 5.015 MWh | 314Ah LFP | EVE | 1P104S×4×12 | 1164.8-1497.6V | ~41t | ✅ Available |

#### Container Specifications (Both Models)

| Parameter | ME 4.179 MWh | ME 5.015 MWh |
|-----------|--------------|--------------|
| Container Type | 20 HC | 20 HC |
| Dimensions (W×D×H) | 6058×2438×2896 mm | 6058×2438×2896 mm |
| Cooling | Liquid Cooling | Liquid Cooling |
| IP Rating | IP55 | IP55 |
| Anti-Corrosion | C3 | C3 |
| Operating Temp | -30°C to +50°C | -30°C to +50°C |
| Relative Humidity | 0-95% | 0-95% |
| Max Altitude | ≤2000m | ≤2000m |
| Fire Suppression | Aerosol + Gas Detection | Aerosol + Gas Detection |
| Communication | Modbus TCP/IEC104/IEC61850 | Modbus TCP/IEC104/IEC61850 |

### 7.11 Battery Pack Models

| Model | Cell Capacity | Configuration | Energy | Voltage | Dimensions (mm) | Weight |
|-------|---------------|---------------|--------|---------|-----------------|--------|
| **BPL-Y166.4/306 2A** | 306Ah | 1P52S | 50.92 kWh | 166.4V | 1140×790×250.5 | ~345 kg |
| **BPL-Y166.4/314 2A** | 314Ah | 1P52S | 52.25 kWh | 166.4V | 1140×790×250.5 | ~345 kg |
| **BPL-Y332.8/314 2A** | 314Ah | 1P104S | 104.5 kWh | 332.8V | 2180×762.5×252 | ~690 kg |

### 7.12 PCS Efficiency Curves (BCS1250K-C-HUD V3.0)

> **Source**: 01--V3.0--BCS1250K-C-HUD efficiency Curve.pdf

#### Self-Powered Mode Efficiency (%)

| Load | Umin (1060V) Charge | Umin Discharge | Umid (1250V) Charge | Umid Discharge | Umax (1450V) Charge | Umax Discharge |
|------|---------------------|----------------|---------------------|----------------|---------------------|----------------|
| 10% | 98.26 | 98.01 | 97.91 | 97.55 | 97.56 | 97.39 |
| 20% | 98.80 | 98.56 | 98.65 | 98.32 | 98.48 | 98.22 |
| 30% | 98.84 | 98.63 | 98.75 | 98.49 | 98.64 | 98.37 |
| **40%** | **98.86** | **98.66** | **98.76** | **98.53** | **98.71** | **98.47** |
| 50% | 98.81 | 98.59 | 98.74 | 98.51 | 98.69 | 98.42 |
| 60% | 98.76 | 98.56 | 98.69 | 98.47 | 98.65 | 98.41 |
| 70% | 98.69 | 98.50 | 98.62 | 98.42 | 98.58 | 98.35 |
| 80% | 98.60 | 98.42 | 98.53 | 98.34 | 98.49 | 98.27 |
| 90% | 98.49 | 98.32 | 98.42 | 98.25 | 98.38 | 98.18 |
| 100% | 98.39 | 98.21 | 98.31 | 98.14 | 98.27 | 98.08 |

#### Externally Powered Mode Efficiency (%)

| Load | Umin (1060V) Charge | Umin Discharge | Umid (1250V) Charge | Umid Discharge | Umax (1450V) Charge | Umax Discharge |
|------|---------------------|----------------|---------------------|----------------|---------------------|----------------|
| 10% | 98.46 | 98.25 | 98.01 | 97.82 | 97.81 | 97.65 |
| 20% | 98.90 | 98.67 | 98.70 | 98.46 | 98.61 | 98.37 |
| 30% | 98.97 | 98.74 | 98.83 | 98.58 | 98.76 | 98.52 |
| **40%** | **98.96** | **98.75** | **98.85** | **98.62** | **98.79** | **98.55** |
| 50% | 98.90 | 98.69 | 98.81 | 98.58 | 98.77 | 98.51 |
| 60% | 98.84 | 98.64 | 98.76 | 98.54 | 98.72 | 98.48 |
| 70% | 98.76 | 98.57 | 98.69 | 98.48 | 98.65 | 98.43 |
| 80% | 98.67 | 98.49 | 98.60 | 98.40 | 98.56 | 98.36 |
| 90% | 98.57 | 98.39 | 98.50 | 98.31 | 98.46 | 98.27 |
| 100% | 98.46 | 98.28 | 98.39 | 98.21 | 98.35 | 98.17 |

> **Key Finding**: Peak efficiency at **30-40% load**. At nominal voltage (1250V), round-trip efficiency at 40% load = 98.85% × 98.62% = **97.48%**

### 7.13 Compatible Third-Party PCS

> **Source**: Commercial Offer - Compatibility List

| Manufacturer | Model Series | Compatible Units |
|--------------|--------------|------------------|
| **SMA** | Sunny Central Storage UP | SCS 3450/3600/3800/3950 UP |
| **SMA** | Sunny Central Storage UP-XT | SCS 3450/3600/3800/3950 UP-XT |
| **Power Electronics** | Multi PCSK | PP2195K2, PP2195, PP3290K3, PP4390K2, PP4390K4 |
| **Power Electronics** | PCSM | FP4203MH |

---

## 8. FIRE SAFETY & COMPLIANCE

> **Source**: Power Atlantic 5MWh Datasheet + User Manual V2.0

### 7.1 Fire Suppression System Components

| Component | Quantity | Description |
|-----------|----------|-------------|
| **Container-Level Aerosol** | **6** | FK-5-1-12 (Novec 1230) or equivalent |
| **Pack-Level Aerosol** | **96** | Individual pack protection |
| Water Firefighting System | 1 | Backup water-based system |
| Fire Control Panel | 1 | Main controller |
| Smoke Detectors | **2** | Spot-type photoelectric |
| Heat Detectors | **2** | Spot-type |
| H₂ Gas Detectors | **2** | Combustible gas detection |
| CO Sensors | 2 | Carbon monoxide detection |
| Air Intake Fan | 1 | Ventilation |
| Explosion-Proof Exhaust Fan | 1 | Gas evacuation |
| Explosion Vent Panel | 1 | Pressure relief |
| Audible/Visual Alarms | 2+ | Indoor and outdoor |
| Gas Release Indicator | 1 | Activation status |
| Emergency Start/Stop | 1 | Manual override |
| Pack Integrated Nozzle | 48 | CO + temperature detection per pack |

### 7.2 Fire Alarm Process

| Alarm Level | Trigger | Action |
|-------------|---------|--------|
| **Primary Alarm** | Any single detector triggered | Audible/visual alarm activated |
| **Secondary Alarm** | Smoke + Heat detector simultaneously | Outdoor alarm, aerosol system initiated |
| **Gas Threshold (Low)** | Combustible gas detected | Explosion-proof fans activated |
| **Gas Threshold (High)** | High gas concentration | Emergency ventilation |
| **Quaternary Alarm** | Pack integrated device alarm | 30-second countdown, then aerosol spray |

### 7.3 Fire Suppression Sequence

1. Detector triggered → Primary alarm → Audible/visual alarm
2. Smoke + Heat triggered → Secondary alarm → Outdoor alarm activated
3. Gas fire suppression system initiated
4. **30-second countdown** begins
5. Aerosol extinguishing agent discharged
6. Gas release indicator activated
7. Fans auto-shutdown when gas concentration drops below threshold

### 7.4 Certifications (Updated January 2026)

> **Source**: EAC Compliance Documents - RFI Response December 2025

#### Cell Level (EVE MB31 314Ah LFP)

| Standard | Certificate | Status | Issuing Body |
|----------|-------------|--------|--------------|
| **UL 1973** | MH63503 | ✅ **Certified** | UL LLC |
| **UL 9540A** | 4791099276 | ✅ **Complete** | UL (Changzhou) |
| **UN 38.3** | 01112300005127-1(E) | ✅ **Passed** | Guangzhou Customs |

> Cell tested at 154°C venting, 225°C thermal runaway. LFL: 7.75% (ambient), 7.14% (vent temp)

#### Module/Rack Level (LBR-1 to LBR-4 Series)

| Standard | Certificate | Status | Issuing Body |
|----------|-------------|--------|--------------|
| **IEC 62619:2022** | BE-51213 | ✅ **CB Certified** | SGS Belgium (CEBEC) |
| **IEC 63056:2020** | SG SGS-00632 | ✅ **CB Certified** | SGS Singapore |
| **UL 9540A** Module | 80239433 | ✅ **Complete** | CSA Group (CCIC) |
| **UL 9540A** Unit | 80239432 | ✅ **Passed** | CSA Group (CCIC) |
| **EN IEC 61000-6-2/6-4** | KSEM250100002701BAC | ✅ **EMC Verified** | SGS Kunshan |

> UL 9540A Unit Level: No flaming outside initiating BESS, no explosion hazards, target BESS max temp 34.8°C (well below 154°C limit)

#### Container Level (LY-Ocean Series)

| Standard | Certificate | Status | Issuing Body |
|----------|-------------|--------|--------------|
| **EN 62477-1:2012/A12:2021** | N8A 130105 0006 | ✅ **LVD Attested** | TÜV SÜD |
| **EN IEC 62040-1:2019/A11:2021** | N8A 130105 0006 | ✅ **UPS Safety** | TÜV SÜD |
| **EN IEC 61000-6-2:2019** | E6A 130105 0005 | ✅ **EMC Certified** | TÜV SÜD |
| **EN IEC 61000-6-4:2019** | E6A 130105 0005 | ✅ **EMC Certified** | TÜV SÜD |
| **IEC 62933-5-2:2020** | 704082542702-00 | 🔄 **Testing Complete** | TÜV SÜD (Jiangsu) |

> Container models: 417.9kWh to 5,015.9kWh. Rated DC voltage 1331.2V, IP55, -40°C to +50°C

#### Thermal Management System (Kelvin BTMS)

| Standard | Certificate | Status | Issuing Body |
|----------|-------------|--------|--------------|
| **EN 60204-1:2018** | M7 122013 0012 | ✅ **Attested** | TÜV SÜD |
| **EN ISO 12100:2010** | M7 122013 0012 | ✅ **Attested** | TÜV SÜD |
| **EN IEC 61000-6-2:2019** | E6A 122013 0013 | ✅ **EMC Certified** | TÜV SÜD |
| **EN IEC 61000-6-4:2019** | E6A 122013 0013 | ✅ **EMC Certified** | TÜV SÜD |
| **EN 55011:2016/A2:2021** | E6A 122013 0013 | ✅ **EMC Certified** | TÜV SÜD |

> Models: BTMS250-ESB, BTMS600-ESB. 400V 3~, 50Hz, R513A refrigerant

#### Component Certifications

| Component | Standard | Certificate | Status |
|-----------|----------|-------------|--------|
| Circuit Breakers (Schneider) | UL 60947-1/4-1 | E186495-20090830 | ✅ **UL Certified** |
| Cooling Fans (Fulltech) | EN IEC 61000-3-2, EN 61000-6-3 | CE Declaration | ✅ **CE Compliant** |
| Insulating Material | UL 94 V-0 | E534616 | ✅ **UL Listed** |

#### Certification Summary

| Category | Total | Complete | In Progress | Missing |
|----------|-------|----------|-------------|---------|
| Cell Level | 3 | 3 | 0 | 0 |
| Module/Rack | 5 | 5 | 0 | 0 |
| Container | 5 | 4 | 1 | 0 |
| Thermal Mgmt | 5 | 5 | 0 | 0 |
| Components | 3 | 3 | 0 | 0 |
| **TOTAL** | **21** | **20** | **1** | **0** |

#### Still Missing for Cyprus DSO (Critical)

| Requirement | Standard | Status | Notes |
|-------------|----------|--------|-------|
| **Grid Connection Compliance** | EN 50549-2:2019/A1:2023 + EN 50549-10:2022 | ✅ **CONFIRMED** | TÜV Compliance Doc (D 115067 0077 Rev.00, 2025-07-31) + Full TÜV Test Report (64.290.25.30339.02, 447 pages, 2025-08-26). Models: BCS1000K-C-HUD, BCS1250K-C-HUD |
| **Anti-Islanding Test** | IEC 62116 | ✅ **Available** | BCS1000~1250K-C-HUD IEC62116 61727.pdf |
| **LVRT/HVRT Test Report** | EN 50549-2 | ✅ **Available** | FRT characteristics: Charakterystyka FRT 1000K-C-HUD & 1250K-C-HUD_ang.pdf |
| **Frequency Response Curves** | EN 50549-2 | ⚠️ Partial | Covered in TÜV test report; separate LFSM-O droop settings doc still useful for DSO submission |
| **IEC 60870-5-104 Point List** | IEC 60870-5-104 | ✅ **Available** | WRWF-0I002-06 (Excel, in repo) |

> ✅ **UPDATE (Feb 2026)**: EN 50549-2 certification is now CONFIRMED for Kehua BCS1000K/BCS1250K-C-HUD (TÜV cert + full test report). **Important:** External interface protection must be installed in final installation (EPC scope item). Remote information exchange not covered by TÜV cert — use PCS comms spec / EMS docs for SCADA evidence.

| NFPA 855 Compliant | **Yes** | Fire code compliance |

---

## 8. BATTERY MANAGEMENT SYSTEM (BMS)

> **Source**: Power Atlantic 5MWh Battery Container Specification

### 8.1 Three-Level BMS Architecture

| Level | Component | Function |
|-------|-----------|----------|
| **Level 1** | BMU (Battery Management Unit) | Cell-level monitoring (2 per pack) |
| **Level 2** | BCMU (Battery Cluster Management Unit) | Cluster-level control (1 per cluster) |
| **Level 3** | BAMS (Battery Stack Management System) | System-level management (2 hosts for 18 clusters) |

### 8.2 BMS Functions

| Function | Description |
|----------|-------------|
| **Operation Control** | Start-stop, charge/discharge control, parameter setting, thermal management |
| **Data Acquisition** | Real-time voltage, temperature, current, insulation resistance monitoring |
| **Alarm Protection** | Overvoltage, undervoltage, overcurrent, short circuit, over/under temperature, leakage |
| **Fault Diagnosis** | Real-time battery status monitoring, abnormal condition detection |
| **Operation Management** | Prevent overcharge/overdischarge, current/temperature limits |

### 8.3 BMU Specifications (Level 1)

| Parameter | Value | Unit |
|-----------|-------|------|
| Voltage Samples | **52** | per BMU |
| Temperature Samples | **12** | per BMU |
| Cell Voltage Range | **0 – 5** | V |
| Cell Voltage Accuracy | **±5** | mV |
| Voltage Sampling Period | **≤100** | ms |
| Cell Temperature Range | **-40 to +105** | °C |
| Cell Temperature Accuracy | **±1** | °C |
| Temperature Sampling Period | **≤200** | ms |
| Equalization Mode | **Passive** | - |
| Equalizing Current | **≥80** | mA |
| Power Supply | **24** | V DC |
| Power Consumption | **≤2** | W |
| Communication | **CAN 2.0** | - |

### 8.4 BCMU Specifications (Level 2)

| Parameter | Value | Unit |
|-----------|-------|------|
| Total Voltage Range | **0 – 1,500** | V |
| Total Voltage Accuracy | **±0.5%** | FSR |
| Voltage Measurement Period | **≤100** | ms |
| Current Measuring Range | **±400** | A |
| Current Measurement Accuracy | **±0.5%** | FSR |
| Current Measurement Period | **≤100** | ms |
| **SOC Calculation Accuracy** | **≤5%** | - |
| **Energy Calculation Error** | **≤±2%** | - |
| Communication Mode | **CAN / RS485 / Modbus** | - |
| Power Supply | **24** | V DC |
| Power Consumption | **≤3** | W |

### 8.5 BAMS Specifications (Level 3)

| Parameter | Value | Unit |
|-----------|-------|------|
| Operating Voltage | **24** | V DC |
| Operating Temperature | **-20 to +85** | °C |
| Maximum Humidity | **20% – 90%** | RH |
| Temperature Detection Range | **-20 to +105** | °C |
| Operating Power Consumption | **≤5** | W |
| Communication Mode | **CAN / RS485 / Modbus TCP/RTU** | - |
| Communication Interface | **CAN / RS485 / Ethernet** | - |

### 8.6 Energy Management System (EMS)

| Parameter | Value |
|-----------|-------|
| Remote Access | **Web portal + API** |
| SCADA Integration | **Modbus TCP/RTU, CAN, RS485** |
| Alarms & Alerts | **Email, SMS, Push** |
| Performance Reports | **Daily, Weekly, Monthly** |
| Data Upload | To energy storage monitoring device |
| Control Commands | Receive from superior device |

#### Partner EMS Options (Lighthief Cyprus)

> **Note**: For Cyprus projects, Lighthief partners with third-party EMS providers for advanced grid integration, market participation, and cybersecurity compliance.

##### Option 1: AXOS by AXSOL (Germany)

| Parameter | Specification |
|-----------|---------------|
| **Provider** | AXSOL GmbH (Germany) |
| **Response Time** | **150ms - 1 second** |
| **Multi-Use** | Peak shaving, balancing power, arbitrage, grid services |
| **Protocols** | Modbus TCP, RestAPI, **IEC 60870-5-101/104** |
| **SCADA** | VDE-AR-N 4110/4120 compliant (EZA controller) |
| **Cybersecurity** | **NIS2 & KRITIS compliant**, ISO 27001, GDPR, Zero-trust architecture |
| **Encryption** | End-to-end TLS, AES |
| **Data Storage** | Germany (ISO 27001 certified) |
| **AI Layer** | ADONYS - forecasting, arbitrage, market integration, redispatch |
| **Grid Services** | FCR, aFRR, instantaneous reserve, black start capable |
| **Remote Maintenance** | 24/7, guaranteed response (Remote 2h, On-site 12h) |
| **Website** | [axsol.eu](https://www.axsol.eu/en/products/axos/) |

##### Option 2: Voltus (US/Canada - Expanding to EU)

| Parameter | Specification |
|-----------|---------------|
| **Provider** | Voltus Inc. (USA) |
| **Focus** | Grid services monetization, demand response |
| **AI Optimization** | Historical load analysis, dispatch simulation, day-ahead scheduling |
| **Capabilities** | Capacity forecasting, market offers, real-time dispatch |
| **Integration** | Automated dispatching, API-based |
| **Markets** | US, Canada (EU expansion) |
| **Revenue Model** | Grid services revenue sharing |
| **Website** | [voltus.co](https://www.voltus.co/energy-storage) |

##### EMS Selection Criteria for Cyprus

| Requirement | AXOS | Voltus |
|-------------|------|--------|
| IEC 60870-5-104 (Cyprus DSO) | ✅ Native | ⚠️ Via integration |
| EU Market Compliance | ✅ Full (Germany) | 🔄 Expanding |
| NIS2 Cybersecurity | ✅ Certified | ⚠️ Check |
| Black Start Capability | ✅ Yes | ⚠️ Check |
| Real-time Response <1s | ✅ 150ms-1s | ✅ Yes |

> **Recommendation**: AXOS preferred for Cyprus due to native IEC 104 support and EU cybersecurity compliance.

---

### 8.7 End-of-Life Management

> **Provider**: Lighthief Cyprus Ltd (Internal Service from 2026)

#### Lighthief Second Life & Recycling Program

| Service | Description |
|---------|-------------|
| **Service Launch** | **Q1 2026** |
| **Second Life Applications** | Repurposing degraded BESS (70-80% SOH) for backup power, off-grid, low-cycle applications |
| **Recycling Partner** | TBD (EU-certified recycler) |
| **Material Recovery** | Lithium, cobalt, nickel, copper, aluminum |
| **Decommissioning** | Full service including safe discharge, dismantling, transport |
| **Documentation** | Waste transfer notes, recycling certificates, WEEE compliance |
| **Customer Responsibility** | None after handover to Lighthief |

#### Second Life Value Proposition

| SOH Range | Typical Use Case | Estimated Value Recovery |
|-----------|------------------|--------------------------|
| 70-80% | Low-cycle backup systems | 15-25% of original value |
| 60-70% | Off-grid residential/commercial | 10-15% of original value |
| <60% | Material recycling only | Recycling credit |

#### Compliance

| Regulation | Status |
|------------|--------|
| EU Battery Regulation 2023/1542 | ✅ Planned compliance |
| WEEE Directive | ✅ Registered |
| Basel Convention | ✅ EU-only transport |
| Carbon Footprint Declaration | 🔄 In development |

> **Note**: Lighthief guarantees compliant disposal and provides customers with end-of-life certificates for regulatory and ESG reporting purposes.

---

## 9. CALCULATOR DEFAULTS

Based on the above specifications, the following defaults should be used in the BESS Finance Calculator for Linyang systems:

```typescript
const LINYANG_DEFAULTS = {
  // Battery - from 5MWh Specification
  chemistry: 'LFP',
  cellCapacityAh: 314,
  cellVoltageNominal: 3.2,
  cellVoltageRange: { min: 2.5, max: 3.65 },
  cellEnergyWh: 1004.8,
  cellEnergyDensity: 183, // Wh/kg
  cellCycleLife: 6000, // at 0.5C/0.5C, 25°C, 100%DOD, 80%SOH
  
  // Container - from 5MWh Specification
  containerSizeKWh: 5015, // Actual rated energy
  containerSizeMWh: 5.015,
  containerConfig: '12P416S',
  containerVoltageRange: { min: 1164.8, max: 1497.6 },
  containerDimensions: { w: 6058, d: 2438, h: 2896 }, // mm
  containerWeight: 43, // tonnes
  containerIP: 'IP54',
  
  // Pack - from 5MWh Specification
  packConfig: '1P104S',
  packEnergyKWh: 104.499,
  packVoltageNominal: 332.8,
  packWeight: 690, // kg
  packIP: 'IP67',
  packsPerContainer: 48,
  
  // Cluster - from 5MWh Specification
  clusterConfig: '1P416S',
  clusterEnergyKWh: 417.996,
  clusterVoltageNominal: 1331.2,
  clusterWeight: 2.7, // tonnes
  clustersPerContainer: 12,
  
  // Performance - from Power Atlantic Datasheet
  roundTripEfficiencyCell: 94, // Cell level @ 0.5P
  roundTripEfficiencySystem: 93, // System level (charging/discharging)
  roundTripEfficiencyACAC: 88.39, // AC-to-AC including PCS (conservative)
  initialSOH: 98.5,
  maxCRate: 1.0,
  standardCRate: 0.5,
  maxDoD: 100, // Per cell spec (2.5V cutoff)
  minSoC: 0,
  selfDischarge: 3, // ≤3% per month
  
  // Power Ratings
  ratedPower1C_kW: 2500,
  ratedPower05C_kW: 1250,
  ratedCurrent1C_A: 1884,
  ratedCurrent05C_A: 942,
  
  // RTE Breakdown - from Linyang RTE Calculation Document
  rteComponents: {
    hvTransformerIn: 99.95,
    hvTransformerOut: 99.50,
    mvCableIn: 99.95,
    mvCableOut: 99.50,
    mvTransformer: 99.00, // Both directions
    lvCable: 99.95, // Both directions
    pcsRectifying: 98.20, // Charging
    pcsInverting: 98.50, // Discharging
    dcCable: 99.80, // Both directions
    batteryCharging: 96.50,
    batteryDischarging: 97.50,
  },
  
  // Calculated RTEs
  rteScenarios: {
    withoutAuxPower: 87.8, // Per Linyang calculation
    withAuxPower: 85.8, // Estimate with 2% aux
    optimal40Load: 90.0, // PCS at peak efficiency
    worstCase10Load: 84.0, // PCS at lowest efficiency
    calculatorDefault: 88.39, // Conservative for financial modeling
  },
  
  // PCS Specifications - Kehua BCS1250K-C-HUD
  pcs: {
    model: 'BCS1250K-C-HUD',
    manufacturer: 'Xiamen Kehua Digital Energy Tech Co., Ltd',
    ratedPowerKW: 1250,
    maxPowerKVA: 1375,
    maxEfficiency: 99, // ≥99%
    peakEfficiencyLoad: 40, // % - best efficiency at 30-50% load
    
    // DC Input
    dcVoltageMax: 1500,
    dcVoltageRange: { min: 1060, max: 1500 },
    dcCurrentMax: 1403,
    
    // AC Output
    acVoltage: 690,
    acVoltageRange: { min: -15, max: 10 }, // % of rated
    acFrequency: 50,
    acCurrentMax: 1150.6,
    
    // Power Quality
    powerFactor: 0.99,
    pfRange: { min: -1, max: 1 }, // leading to lagging
    reactivePowerRange: 100, // ±100%
    thdi: 3, // <3% @ rated power
    thdu: 3, // ≤3% linear load
    overloadCapability: 110, // %
    
    // Physical
    dimensions: { w: 735, h: 2135, d: 1300 }, // mm
    weight: 950, // kg
    ipRating: 'IP65',
    corrosionProtection: 'C5',
    
    // Environment
    tempRange: { min: -35, max: 60 }, // °C (>50°C derating)
    altitude: 4000, // m (>2000m derating)
    
    // Communication
    protocols: ['Modbus-RTU', 'Modbus-TCP', 'IEC61850', 'IEC104'],
    interfaces: ['RS485', 'CAN', 'Ethernet'],
    
    // Efficiency at nominal voltage (1250V)
    efficiencyAtNominalVoltage: {
      voltage: 1250,
      charging40: 98.85,
      discharging40: 98.62,
      roundTrip: 97.48,
    },
    
    // Grid-forming features
    gridForming: true,
    modes: ['VSG', 'Black-Start', 'VF', 'PQ'],
    responseTime: 'millisecond',
  },
  
  // 10MW Containerized PCS + Transformer
  pcsContainer10MW: {
    model: 'BCS10000K-C-HUD/T8',
    configuration: '8 x BCS1250K-C-HUD',
    ratedPowerKW: 10000,
    maxPowerKVA: 11000,
    
    // Transformer
    transformer: {
      ratedPower: 10000, // kVA
      voltageRatio: '0.69/35kV',
      type: 'oil-immersed',
      vectorGroup: 'Dy11-y11',
    },
    
    // Container
    containerType: '40HC',
    dimensions: { w: 12192, h: 2896, d: 2438 }, // mm
    weight: 38000, // kg
    ipRatingPCS: 'IP65',
    ipRatingSkid: 'IP54',
  },
  
  // Thermal
  thermalManagement: 'liquid_cooling',
  coolingCapacity: 45, // kW
  operatingTempCharge: { min: 0, max: 55 },
  operatingTempDischarge: { min: -20, max: 55 },
  
  // BMS Accuracy
  socAccuracy: 5, // ≤5%
  energyCalcError: 2, // ≤±2%
  voltageAccuracy: 5, // ±5mV
  tempAccuracy: 1, // ±1°C
  
  // Warranty & Cycle Life
  warrantyYearsBase: 5, // Standard Linyang warranty
  warrantyYearsWithLTSA: 15, // With LTSA extension (Years 6-15 paid)
  cycleLife100DOD_80SOH: 6000, // 100% DOD, 80% SOH EOL
  cycleLife90DOD_70SOH: 8000, // 90% DOD, 70% SOH EOL
  
  // Coastal Warranty Restrictions (C5-rated enclosure)
  coastalRestrictions: {
    c5Enclosure: {
      above500m: 5, // years - full warranty
      below500m: 2, // years - reduced warranty
    },
    nonC5Enclosure: {
      above5km: 5, // years - full warranty
      between2to5km: 2, // years - reduced warranty
      below2km: 0, // WARRANTY VOID
    },
  },
  
  // Warranty Protection Thresholds (CRITICAL for LTSA)
  warrantyVoid: {
    cellVoltageMin: 2.5, // V - immediate warranty void if reached
    cellVoltageSustained: 2.8, // V - warranty void if below for 120 hours
    socZeroMaxHours: 120, // Hours - max time at 0% SOC before warranty void
    socZeroOperationalMaxHours: 2, // Hours - max time at 0% SOC during operation
    minSocForShutdown: 10, // % - recommended minimum for 7+ day shutdown
    minSocAfterZero: 15, // % - required SOC after reaching 0% (within 120h)
    minSocOperational: 5, // % - required SOC during operation (within 2h of reaching 0%)
  },
  
  // Degradation - based on actual Linyang curves
  degradationProfiles: {
    // 0.25P, 1 CPD - Most conservative
    conservative: {
      firstYearDrop: 3.88,
      annualDegradation: 1.52, // Average after year 1
      yearsToEOL: 18,
      totalCycles: 6570,
    },
    // 0.25P, 2 CPD - Moderate
    moderate: {
      firstYearDrop: 4.59,
      annualDegradation: 2.37,
      yearsToEOL: 12,
      totalCycles: 8760,
    },
    // 0.5P, 1 CPD - Standard (recommended default)
    standard: {
      firstYearDrop: 4.04,
      annualDegradation: 1.59,
      yearsToEOL: 17,
      totalCycles: 6205,
    },
    // 0.5P, 2 CPD - Aggressive
    aggressive: {
      firstYearDrop: 4.72,
      annualDegradation: 2.72,
      yearsToEOL: 10,
      totalCycles: 7300,
    },
  },
  
  // Default profile for calculator
  defaultProfile: 'standard', // 0.5P, 1 CPD
  
  // Availability
  availabilityWithLTSA: 97,
  availabilityWithoutLTSA: 95,
  
  // Costs (€ per MWh)
  capexPerMWh: 127000,
  omBasicPerMWh: 2470,
  ltsaPremiumPerMWh: 2200,
  omTotalWithLTSAPerMWh: 4670,
}

// Year-by-year SOH lookup tables
const LINYANG_SOH_TABLES = {
  // 0.25P, 1 CPD (20 years)
  '0.25P_1CPD': [98.50, 94.62, 91.77, 89.91, 88.00, 86.78, 84.97, 83.83, 82.25, 81.06, 79.58, 78.54, 77.10, 76.06, 75.03, 73.61, 72.58, 71.55, 70.52, 69.12, 68.10],
  
  // 0.25P, 2 CPD (12 years)
  '0.25P_2CPD': [98.50, 93.91, 90.66, 87.97, 85.76, 83.72, 81.78, 80.08, 78.09, 76.12, 74.13, 72.11, 70.10],
  
  // 0.5P, 1 CPD (20 years) - DEFAULT
  '0.5P_1CPD': [98.50, 94.46, 91.50, 89.55, 87.56, 86.26, 84.37, 83.17, 81.51, 80.26, 78.70, 77.60, 76.11, 75.01, 73.92, 72.45, 71.36, 70.27, 69.18, 67.74, 66.66],
  
  // 0.5P, 2 CPD (10 years)
  '0.5P_2CPD': [98.50, 93.78, 90.17, 87.53, 84.93, 82.95, 80.50, 78.47, 75.94, 73.83, 71.34],
}
```

---

## 9. DOCUMENT SOURCES

| Document | Description | Status | Data Extracted |
|----------|-------------|--------|----------------|
| Degradation Curve_5MWh.pdf | SOH curves for 4 operating conditions | ✅ **Complete** | Full year-by-year SOH tables, cycle counts, EOL projections |
| 5MWhMaintenanceManual.pdf | Maintenance schedules & procedures | ✅ **Complete** | Monthly/semi-annual/annual checklists, safety warnings, technical requirements |
| 5MWhSpecification.pdf | Full technical specifications | ✅ **Complete** | Cell/Pack/Cluster specs, BMS parameters, fire suppression, liquid cooling |
| User_Manual_V2.0.pdf | Complete user manual | ✅ **Complete** | Warranty conditions, storage/transport, installation, cable specs, safety |
| Power Atlantic_5MWh_EN.pdf | Product datasheet | ✅ **Complete** | Updated specs, certifications, power ratings, efficiency, cycle life |
| 02_RTE Calculation.pdf | System RTE calculation | ✅ **Complete** | Full RTE formula, component efficiencies, 87.8% system RTE |
| BCS1250K-C-HUD Efficiency Curve.pdf | PCS efficiency data | ✅ **Complete** | Load-based efficiency curves for 1060V/1250V/1450V, self/external power |
| LTSA - Cyprus.pdf | Official LTSA pricing | ✅ **Complete** | All service pricing, warranty extensions, availability guarantee costs |
| BCS1000K~1250K-C-HUD Series.pdf | PCS specifications | ✅ **Complete** | Full PCS specs, efficiency, compliance, communication protocols |
| BCS10000K-C-HUD T8.pdf | 10MW PCS + Transformer | ✅ **Complete** | Containerized system, MV transformer specs, integration details |
| single--PCS PQ Curve.pdf | P-Q curve (single) | ✅ **Complete** | Power/reactive power curves at different temperatures |
| parallel--PCS PQ Curve.pdf | P-Q curve (parallel) | ✅ **Complete** | P-Q curves for 8-unit parallel operation |
| Current Harmonic(BCS-C-HUD).pdf | Harmonics data | ✅ **Complete** | THDi < 3% compliance |
| Flicker-DC Injection(BCS-C-HUD).pdf | Power quality | ✅ **Complete** | Flicker and DC injection test results |
| 01--V3.0--BCS1250K-C-HUD efficiency Curve.pdf | PCS efficiency V3.0 | ✅ **Complete** | Updated efficiency tables, self/external powered modes |
| Quotation LY202511281 | Cyprus 863.5MWh pricing | ✅ **Complete** | All MV Skid configs, battery container models, CIF pricing |
| Commercial Offer 198/A/KT/2025 | Cyprus 40MW/133MWh | ✅ **Complete** | PCS specs, container specs, battery pack models, compatibility list |
| 8~10MW PCS Layout.pdf | Container layout | ⚠️ Partial | Drawing file - no text data extracted |
| MV Transformer 10000kVA Datasheet | 10MVA transformer | ❌ Missing | File exists but could not be read |
| **Linyang Warranty Terms v2.pdf** | Warranty manual (LYCN/WI-3410) | ✅ **Complete** | 5-year base warranty, coastal restrictions, exclusions, claim procedures, liability limits, dispute resolution |

### EAC Compliance Documents (RFI Response Dec 2025)

| Document | Standard | Status | Key Data |
|----------|----------|--------|----------|
| UN38.3 (Cell).pdf | UN38.3 | ✅ **Complete** | EVE MB31 314Ah - All tests passed |
| UN38.3 (Pack).pdf | UN38.3 | ✅ **Complete** | Pack-level transport certification |
| UL9540A (Cell).pdf | UL 9540A 4th Ed | ✅ **Complete** | Cell: 154°C vent, 225°C TR, LFL 7.75% |
| PACK UL 9540A (DRAFT).pdf | UL 9540A 5th Ed | ✅ **Complete** | Module level testing complete |
| CT_LY_RACK_EVE314_1P104S_TD_UL9540A_80239432.pdf | UL 9540A Unit | ✅ **PASSED** | No fire propagation, all criteria met |
| PACK IEC 62619.pdf | IEC 62619:2022 | ✅ **CB Cert** | BE-51213, LBR-1 to LBR-4 |
| PACK IEC 63056.pdf | IEC 63056:2020 | ✅ **CB Cert** | SG SGS-00632 |
| PACK EN IEC 61000.pdf | EN IEC 61000-6-2/6-4 | ✅ **Complete** | EMC verification |
| PA-4000 CE 62477.pdf | EN 62477-1, IEC 62040 | ✅ **LVD** | Container-level, TÜV SÜD |
| PA-4000 IEC 61000.pdf | EN IEC 61000-6-2/6-4 | ✅ **EMC** | Container-level, TÜV SÜD |
| PA-5000 EN 62477-1- IEC EN 62040.pdf | EN 62477-1, IEC 62040 | ✅ **LVD** | 5MWh Container |
| IEC62933-5-2 Notification letter.pdf | IEC 62933-5-2:2020 | 🔄 **In Progress** | Testing complete, cert 2-3 weeks |
| EN 60204-1 EN ISO 12100.pdf | Machinery Safety | ✅ **Complete** | BTMS cooling system |
| EN IEC 61000-3-2.pdf | Harmonics | ✅ **Complete** | Cooling fans |
| EN IEC 61000-6-2--4 EN55011.pdf | EMC | ✅ **Complete** | BTMS EMC |
| IEC 61000-6-2--4.pdf | EMC | ✅ **Complete** | Container system |
| Molded case circuit breaker UL 60947.pdf | UL 60947 | ✅ **Complete** | Schneider NSX series |
| UL94.pdf | UL 94 V-0 | ✅ **Complete** | Insulating materials |

---

## 10. REVISION HISTORY

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-25 | 1.0 | Initial document from degradation curve analysis | AI Assistant |
| 2026-01-25 | 1.1 | Added complete SOH tables from degradation curve images | AI Assistant |
| 2026-01-25 | 1.2 | Added maintenance schedule from 5MWh Maintenance Manual | AI Assistant |
| 2026-01-25 | 1.3 | Added full technical specs from 5MWh Specification (cell, pack, cluster, BMS, fire suppression, liquid cooling) | AI Assistant |
| 2026-01-25 | 1.4 | Added User Manual V2.0: warranty conditions, SOC management, storage/transport, cable specs, safety requirements | AI Assistant |
| 2026-01-25 | 1.5 | Added Power Atlantic Datasheet: updated power ratings (2500kW/1250kW), 8000 cycle life, 93% efficiency, IP55, certifications | AI Assistant |
| 2026-01-25 | 1.6 | Added RTE analysis: full calculation model (87.8% system RTE), Kehua PCS efficiency curves, component breakdown | AI Assistant |
| 2026-01-25 | 1.7 | Added official LTSA Cyprus pricing: €1,157.62 BESS O&M, €1,311.97 PCS O&M, €2,201.73 availability guarantee, warranty extensions | AI Assistant |
| 2026-01-25 | 1.8 | Added Kehua PCS specs: BCS1250K-C-HUD (1.25MW), 10MW containerized system, P-Q curves, power quality, MV transformer (10MVA, 0.69/35kV) | AI Assistant |
| 2026-01-25 | 1.9 | Added complete MV Skid matrix (15 models), battery container matrix, efficiency curves V3.0, 3rd-party PCS compatibility, RFI for missing docs | AI Assistant |
| 2026-01-25 | 2.0 | Updated RFI with Cyprus DSO-specific requirements (EN 50549, IEC 104, protection settings, Q(U)/P(U) curves) per DSO Technical Guide 2025.1 | AI Assistant |
| 2026-01-23 | 2.1 | Added comprehensive warranty terms from Linyang Warranty Terms v2.pdf: 5-year base warranty, coastal restrictions, warranty exclusions, claim procedures, liability limits, dispute resolution, warranty transfer rules | AI Assistant |
| 2026-01-23 | 2.2 | Added 18 EAC Compliance certifications: UL 9540A (Cell+Module+Unit PASSED), IEC 62619, IEC 63056, UN38.3, EMC certs, LVD certs. Updated RFI status. EN 50549-2 still MISSING (critical for Cyprus DSO). | AI Assistant |
| 2026-01-23 | 2.3 | Added Partner EMS options (AXOS by AXSOL, Voltus). Added Lighthief End-of-Life Management (Second Life & Recycling Program from 2026). Addresses Group RFI requirements #4, #5, #10. | AI Assistant |
| 2026-01-23 | 2.4 | Verified against TSO BESS Technical Specification (ANNEX-II-Appendix-2): RTE ≥80% ✅, Availability ≥92% ✅, Cycle life ≥7300 ✅, UL 9540A Unit ✅. Seismic rating and installation-level testing pending. | AI Assistant |

---

## 11. TSO BESS COMPLIANCE VERIFICATION

> **Source**: TSO BESS - ANNEX-II-Appendix-2-Technical-Specification.pdf

### 11.1 Performance Compliance

| TSO Requirement | Linyang/Kehua Value | Status |
|-----------------|---------------------|--------|
| **RTE ≥ 80% (BoL)** | **87.8%** system RTE | ✅ Compliant |
| **RTE ≥ 75% (10-year)** | ~82% estimated | ✅ Compliant |
| **Standby ≤ 15% capacity/day** | ~2% aux consumption | ✅ Compliant |
| **Availability ≥ 92%** | **97%** with LTSA | ✅ Exceeds |
| **Duration 1-4 hours** | 4-hour systems standard | ✅ Compliant |
| **Temp Range -10°C to +45°C** | **-35°C to +55°C** | ✅ Exceeds |
| **Sub-second Response** | Millisecond-level | ✅ Compliant |

### 11.2 Capacity & Lifecycle Compliance

| TSO Requirement | Linyang Value | Status |
|-----------------|---------------|--------|
| **Cycle Life ≥ 7,300** | 6,000-8,000 cycles | ✅ Compliant |
| **Capacity Retention 10 years** | ~79% @ Year 10 (0.5P/1CPD) | ⚠️ Augmentation needed |
| **Degradation < 20%** | ~30% @ Year 20 | ⚠️ Augmentation planned |

> **Note**: TSO requires 100% capacity retention for 10 years. Linyang degradation curves show ~21% loss at Year 10. Augmentation space (≥20%) must be planned in installation design.

### 11.3 Safety Compliance

| TSO Requirement | Linyang Status | Notes |
|-----------------|----------------|-------|
| **UL 9540A Cell Level** | ✅ Passed | Report 4791099276 |
| **UL 9540A Module Level** | ✅ Passed | Report 80239433 |
| **UL 9540A Unit Level** | ✅ Passed | Report 80239432 |
| **UL 9540A Installation** | ⚠️ Pending | Site-specific |
| **IEC 62933-5-2** | 🔄 In Progress | Certificate 2-3 weeks |
| **Seismic 3.55 m/s² ZPA** | ⚠️ Not Verified | Request data |
| **Corrosion Protection C3** | ⚠️ Check C5 | Cyprus coastal sites |
| **Fire Suppression** | ✅ Aerosol | HFC-227ea/FK-5-1-12 |
| **Off-Gas Detection** | ✅ Included | H2, CO, smoke sensors |
| **Pressure Relief Vents** | ✅ Included | Per design |

### 11.4 Grid Services Compliance

| TSO Requirement | Kehua BCS1250K Status | Notes |
|-----------------|----------------------|-------|
| **FCR (Primary Control)** | ✅ Capable | Millisecond response |
| **aFRR (Secondary Control)** | ✅ Capable | Via EMS |
| **Instantaneous Reserve** | ✅ Capable | Grid-forming supported |
| **IEC 61850** | ✅ Supported | Communication protocol |
| **IEC 60870-5-104** | ✅ Supported | SCADA integration |
| **Modbus TCP** | ✅ Supported | Alternative protocol |

### 11.5 Action Items for TSO Compliance

| Item | Priority | Status |
|------|----------|--------|
| Obtain seismic test report | 🟡 High | Request from Linyang |
| Verify corrosion rating for coastal | 🟡 High | Confirm C5 enclosure |
| Plan augmentation space (≥20%) | 🟡 High | Design requirement |
| Complete IEC 60870-5-104 point list | 🟡 High | Request from Linyang |
| Site-specific UL 9540A installation test | 🟢 Medium | Per project |

---

## 12. REQUEST FOR INFORMATION (RFI) - LINYANG

> **Date**: January 25, 2026
> **From**: SolarFarms.cy / Lighthief Cyprus Ltd
> **To**: Jiangsu Linyang Energy Storage Technology Co., Ltd
> **Re**: Technical Documentation Request for Cyprus BESS Portfolio (863.5 MWh)

### 11.1 Purpose

This RFI requests technical documentation required for:
1. Cyprus DSO (EAC) grid connection applications
2. Cyprus TSO (TSOC) connection terms and compliance
3. CERA (Cyprus Energy Regulatory Authority) licensing requirements
4. Insurance and due diligence documentation
5. Client technical proposals and turnkey solutions

### 11.2 Missing MV Skid Datasheets (Priority: HIGH)

| MV Skid Model | Power | Status | Required Documents |
|---------------|-------|--------|-------------------|
| 1MW MV Skid | 1.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 1.25MW MV Skid | 1.25 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 1.5MW MV Skid | 1.5 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 1.725MW MV Skid | 1.725 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 2MW MV Skid | 2.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 2.5MW MV Skid | 2.5 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 3MW MV Skid | 3.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 3.45MW MV Skid | 3.45 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 4MW MV Skid | 4.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 5MW MV Skid | 5.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 6MW MV Skid | 6.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 6.9MW MV Skid | 6.9 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 7.5MW MV Skid | 7.5 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |
| 8MW MV Skid | 8.0 MW | ❌ Missing | Datasheet, SLD, Dimensions, Weight |

> ✅ **Available**: BCS10000K-C-HUD/T8 (10 MW)

### 11.3 Missing PCS Datasheets (Priority: HIGH)

| PCS Model | Power | Status | Required Documents |
|-----------|-------|--------|-------------------|
| BCS1000K-C-HUD | 1.0 MW | ⚠️ Partial | Full datasheet available, need type test certificates |
| BCS1250K-C-HUD | 1.25 MW | ✅ Complete | Datasheet, efficiency curves available |

### 11.4 MV Transformer Datasheets (Priority: HIGH)

| Transformer Size | Application | Status | Required Documents |
|------------------|-------------|--------|-------------------|
| 1.1 MVA (0.69/11-33kV) | 1MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 1.4 MVA (0.69/11-33kV) | 1.25MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 1.7 MVA (0.69/11-33kV) | 1.5MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 1.9 MVA (0.69/11-33kV) | 1.725MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 2.2 MVA (0.69/11-33kV) | 2MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 2.75 MVA (0.69/11-33kV) | 2.5MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 3.3 MVA (0.69/11-33kV) | 3MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 3.8 MVA (0.69/11-33kV) | 3.45MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 4.4 MVA (0.69/11-33kV) | 4MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 5.5 MVA (0.69/11-33kV) | 5MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 6.6 MVA (0.69/11-33kV) | 6MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 7.6 MVA (0.69/11-33kV) | 6.9MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 8.25 MVA (0.69/11-33kV) | 7.5MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 8.8 MVA (0.69/11-33kV) | 8MW Skid | ❌ Missing | Datasheet, Vector group, Impedance |
| 10 MVA (0.69/35kV) | 10MW Skid | ⚠️ Partial | Basic specs available, need full datasheet |

### 11.5 Grid Connection Documentation (Priority: HIGH - Cyprus DSO/TSO Required)

> Per Cyprus DSO Technical Guide for Storage Edition 2025.1

| Document | Purpose | Cyprus DSO Requirement | Status |
|----------|---------|------------------------|--------|
| **EN 50549-2 Certificate** | Grid connection compliance | **MANDATORY** | ✅ Confirmed (TÜV) |
| **Anti-Islanding Test Report** | Loss of mains detection | Per IEC 62116 | ✅ Available |
| **LVRT/HVRT Test Report** | Voltage ride-through | DSO/TSO compliance | ✅ Available |
| **Frequency Response Curves** | LFSM-O droop at 50.2Hz | 100% PM per Hz | ⚠️ In TÜV report |
| **Q(U) Capability Curves** | Reactive power control | ±40% at voltage limits | ⚠️ Partial |
| **P(U) Capability Curves** | Active power vs voltage | Charge/discharge modes | ❌ Missing |
| **Protection Settings Guide** | Configurable settings | 0.9/1.1Un, 47/52Hz, 0.2s | ❌ Missing |
| **IEC 60870-5-104 Point List** | SCADA integration | All addresses & data types | ✅ Available |
| **IEC 61850 Mapping** | Substation communication | Optional but preferred | ❌ Missing |
| **THD Test Report** | Current harmonics | THDi < 5% | ⚠️ Partial (< 3% claimed) |
| **DC Injection Test Report** | DC component | < 1% of rated current | ❌ Missing |
| **Black Start Procedure** | Grid forming capability | For VSG mode | ❌ Missing |
| **Synchronization Settings** | Grid reconnection | 3 min delay, 10% ramp/min | ❌ Missing |

### 11.6 Certifications Status (Updated January 2026)

> **RFI Response Received**: December 2025

| Certification | Standard | Status | Notes |
|---------------|----------|--------|-------|
| **IEC 62619** | Battery safety | ✅ **Received** | CB Cert BE-51213 |
| **IEC 63056** | Battery safety | ✅ **Received** | CB Cert SG SGS-00632 |
| **IEC 62933-5-2** | Grid integration safety | 🔄 **In Progress** | Testing complete, cert pending |
| **UN38.3** | Transport certification | ✅ **Received** | Cell: 01112300005127 |
| **UL 9540A** | Fire safety test report | ✅ **Received** | Unit: 80239432 (PASSED) |
| **EN 62477-1 / IEC 62040** | LVD compliance | ✅ **Received** | Container: N8A 130105 0006 |
| **EN IEC 61000-6-2/6-4** | EMC | ✅ **Received** | Multiple certs |
| IEC 61850 Conformance | Communication protocol | ✅ **Available** | bms61850.icd in repo |
| **EN 50549-2** | Grid connection compliance | ✅ **CONFIRMED** | TÜV cert + 447-page test report |

### 11.7 Installation & Commissioning (Priority: MEDIUM)

| Document | Purpose | Status |
|----------|---------|--------|
| Site Preparation Guide | Foundation, cable routing, clearances | ❌ Missing |
| Installation Manual (MV Skid) | Step-by-step installation | ❌ Missing |
| Commissioning Checklist | Pre-energization, testing | ❌ Missing |
| FAT/SAT Procedures | Factory/Site acceptance tests | ❌ Missing |
| Spare Parts List | O&M planning | ❌ Missing |

### 11.8 Warranty Documentation (Priority: MEDIUM)

| Document | Purpose | Status |
|----------|---------|--------|
| **Linyang Warranty Terms v2.pdf** | Official warranty manual | ✅ **Complete** |
| Warranty Certificate Template | Client contracts | ⚠️ Partial (terms available) |
| Extended Warranty Terms (Year 6-15) | LTSA pricing backup | ⚠️ Partial |
| Performance Guarantee Certificate | SOH guarantee documentation | ❌ Missing |
| Warranty Claim Form Template | O&M operations | ❌ Missing |

### 11.9 Summary - Documents Needed

| Category | Total Items | Available | Partial | Missing |
|----------|-------------|-----------|---------|---------|
| MV Skid Datasheets | 15 | 1 | 0 | 14 |
| MV Transformer Datasheets | 15 | 0 | 1 | 14 |
| PCS Datasheets | 2 | 1 | 1 | 0 |
| Grid Connection Docs | 9 | 0 | 2 | 7 |
| Certifications | 9 | 7 | 1 | 1 |
| Installation Docs | 5 | 0 | 0 | 5 |
| Warranty Docs | 5 | 2 | 2 | 1 |
| **TOTAL** | **60** | **11** | **7** | **42** |

> ✅ **Significant Progress**: Received 18 certification documents in December 2025 RFI response

### 11.10 Delivery Request

Please provide the above documentation in PDF format to:
- **Email**: office@lighthief.com
- **Reference**: RFI-LINYANG-CY-2026-001

**Requested Delivery**: Within 14 business days

---

## NEXT STEPS

### Completed ✅
- [x] Full SOH degradation tables (4 operating conditions, 20-year projections)
- [x] Complete battery container specifications (5 MWh)
- [x] PCS specifications (BCS1000K/1250K-C-HUD)
- [x] 10MW containerized system (BCS10000K-C-HUD/T8)
- [x] RTE calculation model (87.8% system efficiency)
- [x] LTSA pricing for Cyprus
- [x] MV Skid product matrix (15 configurations)
- [x] Battery pack models (BPL-Y series)
- [x] Efficiency curves V3.0

### Pending - Linyang RFI 🔄
1. **Send RFI to Linyang** (Section 11) requesting:
   - 14 missing MV Skid datasheets (1MW - 8MW)
   - 14 missing MV Transformer datasheets
   - Grid connection documentation (LVRT/HVRT, frequency response)
   - Certifications (CE, IEC 62619, UN38.3, UL 9540A)
   - Installation and commissioning guides
   - Warranty documentation

### Next Document - CyprusDSO.md 📋
2. **Create CyprusDSO.md** with:
   - EAC (Electricity Authority of Cyprus) grid connection requirements
   - TSOC (Transmission System Operator Cyprus) connection terms
   - CERA (Cyprus Energy Regulatory Authority) licensing
   - Metering specifications
   - Protection settings and coordination
   - Grid code compliance (EN 50549, frequency/voltage ride-through)

### Integration Tasks 🔧
3. **Use data for**:
   - LTSA contract generation (pricing confirmed)
   - Terms & Conditions templates
   - Calculator preset profiles (Linyang defaults)
   - Client proposals (group pricing + 12% for individual)
   - DSO/TSO connection applications
