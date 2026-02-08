> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 7 February 2026*

---

# SOLAR PARK EPC PRICING MODEL

**Document Reference:** LCY-SOLAR-EPC-001
**Date:** January 2026
**Source:** solarfarms_epc_self_cost_model.xlsx
**Purpose:** PV + BESS EPC self-cost and client pricing reference

---

## EPC MARKUP STRUCTURE

| Component | Self-Cost | Markup | Client Price |
|-----------|-----------|--------|--------------|
| **PV EPC** | Base | **+€100,000/MW** | Self-Cost + (MW × €100k) |
| **BESS EPC** | Base | **+17.4%** | Self-Cost × 1.174 |

> **Standard PV EPC Markup: €100,000 per MW (flat)**

---

## 1. GENERAL PARAMETERS

| Parameter | Value | Notes |
|-----------|-------|-------|
| **RTB Acquisition Cost** | €350,000/MWp | Ready-to-build license cost |
| **BESS Duration** | 4 hours | Standard sizing |
| **BESS MWh per MWp** | 4 MWh/MWp | 4-hour BESS sizing |
| **Panel Wattage** | 590W | Current standard |
| **Panels per MWp** | 1,694 | Derived from 590W |

---

## 2. PV EPC SELF-COST INPUTS

### 2.1 Module & Mounting

| Item | Rate | Unit | Notes |
|------|------|------|-------|
| **Module price** | €0.078 | €/W | Landed cost assumption |
| **Mounting steel** | €20 | €/panel | Trikkis wholesale |
| **Mounting install + piling** | €7 | €/panel | Install/piling allowance |

### 2.2 Inverters

| Item | Rate | Unit | Notes |
|------|------|------|-------|
| **Inverter price** | €3,653 | €/unit | Huawei pallet price |
| **Inverters per MWp** | 9 | units | 100-115 kW string inverters |

### 2.3 Balance of System (BOS)

| Item | Rate | Unit | Notes |
|------|------|------|-------|
| **DC BOS** | €0.06 | €/W | Cables, combiner boxes, earthing, SPD |
| **AC BOS** | €0.03 | €/W | AC cabling, protections |
| **Install labor + machinery** | €0.06 | €/W | Site labor & machinery |

### 2.4 MV Infrastructure

| Item | Fixed (€/site) | Variable (€/MWp) | Notes |
|------|----------------|------------------|-------|
| **MV Station** | €140,000 | €10,000 | On-site MV station |

### 2.5 Civil Works

| Item | Fixed (€/site) | Variable (€/MWp) | Notes |
|------|----------------|------------------|-------|
| **Civils** | €50,000 | €40,000 | Grading, roads, fence |

### 2.6 Engineering & Commissioning

| Item | Fixed (€/site) | Variable (€/MWp) | Notes |
|------|----------------|------------------|-------|
| **Engineering** | €25,000 | €5,000 | Design, HSE, QA, commissioning |

### 2.7 Logistics

| Item | Fixed (€/site) | Variable (€/MWp) | Notes |
|------|----------------|------------------|-------|
| **Logistics** | €10,000 | €2,000 | Port handling, cranage |

### 2.8 EPC Overhead

| Item | Fixed (€/site) | Variable (€/MWp) | Notes |
|------|----------------|------------------|-------|
| **EPC Overhead** | €30,000 | €6,000 | Internal overhead |

---

## 3. PV COST FORMULA

### Per-MWp Calculation

```
PV Self-Cost (€/MWp) = 
  Modules:     1,000,000W × €0.078/W                    = €78,000
+ Mounting:    1,694 panels × €20/panel                 = €33,880
+ Install:     1,694 panels × €7/panel                  = €11,858
+ Inverters:   9 units × €3,653/unit                    = €32,877
+ DC BOS:      1,000,000W × €0.06/W                     = €60,000
+ AC BOS:      1,000,000W × €0.03/W                     = €30,000
+ Labor:       1,000,000W × €0.06/W                     = €60,000
                                                        ─────────
  Subtotal (equipment + labor):                         = €306,615/MWp
```

### Fixed Costs Per Site

```
Fixed Costs = 
  MV Station:     €140,000
+ Civils:         €50,000
+ Engineering:    €25,000
+ Logistics:      €10,000
+ EPC Overhead:   €30,000
                  ─────────
  Total Fixed:    €255,000/site
```

### Variable Costs Per MWp

```
Variable Costs = 
  MV:             €10,000/MWp
+ Civils:         €40,000/MWp
+ Engineering:    €5,000/MWp
+ Logistics:      €2,000/MWp
+ EPC Overhead:   €6,000/MWp
                  ─────────
  Total Variable: €63,000/MWp
```

### Total PV Self-Cost Formula

```
PV Self-Cost = €255,000 + (MWp × €369,615)

Where:
- €255,000 = Fixed costs per site
- €369,615 = €306,615 (equipment) + €63,000 (variable)
```

---

## 4. PV SIZE ADDERS (Calibration)

These adders calibrate unit-based costing to agreed PV totals:

| Park Size (MWp) | PV Adder | Notes |
|-----------------|----------|-------|
| 1.00 | €5,462 | Small park premium |
| 2.00 | €92,962 | - |
| 2.50 | €98,462 | - |
| 3.00 | €105,462 | - |
| 4.00 | €116,712 | - |
| 5.00 | €119,462 | - |
| 10.00 | €114,962 | Economies of scale |

> Set to €0 to use pure unit-based PV costing

---

## 5. BESS INSTALLED EPC PRICING

Model interpolates between nearest points:

| BESS Size (MWh) | Installed Cost (€/MWh) | Total Cost |
|-----------------|------------------------|------------|
| 4 | €143,598 | €574,392 |
| 8 | €115,462 | €923,696 |
| 10 | €105,726 | €1,057,260 |
| 12 | €116,627 | €1,399,524 |
| 20 | €95,959 | €1,919,180 |
| 40 | €93,524 | €3,740,960 |
| 60 | €80,126 | €4,807,560 |

> Source: InstalledCost_EUR / MWh (median) from BESS pricing model

---

## 6. COMPLETE PARK OPTIONS - SELF-COST & CLIENT PRICING

### PV + BESS Self-Cost (Excluding RTB)

| MWp | MWh | PV Self-Cost | BESS Self-Cost | **Combined Self-Cost** | **€/MWp** |
|-----|-----|--------------|----------------|------------------------|-----------|
| 1.00 | 4 | €630,077 | €574,393 | **€1,204,470** | €1,204,470 |
| 2.00 | 8 | €1,180,154 | €923,697 | **€2,103,851** | €1,051,926 |
| 2.50 | 10 | €1,425,192 | €1,057,264 | **€2,482,457** | €992,983 |
| 3.00 | 12 | €1,680,231 | €1,399,524 | **€3,079,755** | €1,026,585 |
| 4.00 | 16 | €2,200,308 | €1,700,687 | **€3,900,995** | €975,249 |
| 5.00 | 20 | €2,700,385 | €1,919,179 | **€4,619,564** | €923,913 |
| 10.00 | 40 | €5,100,770 | €3,740,967 | **€8,841,737** | €884,174 |

### PV + BESS Client Pricing (PV +€100k/MW, BESS +17.4%)

| MWp | MWh | PV Client (+€100k/MW) | BESS Client (+17.4%) | **Combined Client** | **€/MWp** |
|-----|-----|----------------------|----------------------|---------------------|-----------|
| 1.00 | 4 | €730,077 | €674,337 | **€1,404,414** | €1,404,414 |
| 2.00 | 8 | €1,380,154 | €1,084,416 | **€2,464,570** | €1,232,285 |
| 2.50 | 10 | €1,675,192 | €1,241,224 | **€2,916,416** | €1,166,566 |
| 3.00 | 12 | €1,980,231 | €1,643,041 | **€3,623,272** | €1,207,757 |
| 4.00 | 16 | €2,600,308 | €1,996,606 | **€4,596,914** | €1,149,229 |
| 5.00 | 20 | €3,200,385 | €2,253,116 | **€5,453,501** | €1,090,700 |
| 10.00 | 40 | €6,100,770 | €4,391,895 | **€10,492,665** | €1,049,267 |

### All-In Client Price (Including RTB)

| MWp | MWh | Client EPC | RTB Cost | **All-In Client** | **€/MWp** |
|-----|-----|------------|----------|-------------------|-----------|
| 1.00 | 4 | €1,404,414 | €350,000 | **€1,754,414** | €1,754,414 |
| 2.00 | 8 | €2,464,570 | €700,000 | **€3,164,570** | €1,582,285 |
| 2.50 | 10 | €2,916,416 | €875,000 | **€3,791,416** | €1,516,566 |
| 3.00 | 12 | €3,623,272 | €1,050,000 | **€4,673,272** | €1,557,757 |
| 4.00 | 16 | €4,596,914 | €1,400,000 | **€5,996,914** | €1,499,229 |
| 5.00 | 20 | €5,453,501 | €1,750,000 | **€7,203,501** | €1,440,700 |
| 10.00 | 40 | €10,492,665 | €3,500,000 | **€13,992,665** | €1,399,267 |

---

## 7. CLIENT PRICING (€100k/MW PV MARKUP)

### PV-Only Pricing by Size

| MWp | Self-Cost | Markup (€100k/MW) | **Client Price** | €/MWp | €/Wp |
|-----|-----------|-------------------|------------------|-------|------|
| 1 | €630,077 | €100,000 | **€730,077** | €730,077 | €0.73 |
| 2 | €1,180,154 | €200,000 | **€1,380,154** | €690,077 | €0.69 |
| 3 | €1,680,231 | €300,000 | **€1,980,231** | €660,077 | €0.66 |
| 5 | €2,700,385 | €500,000 | **€3,200,385** | €640,077 | €0.64 |
| 10 | €5,100,770 | €1,000,000 | **€6,100,770** | €610,077 | €0.61 |

### BESS Pricing by Size (17.4% Markup)

| MWh | Self-Cost | **Client Price (+17.4%)** | €/MWh | €/kWh |
|-----|-----------|---------------------------|-------|-------|
| 4 | €574,393 | **€674,337** | €168,584 | €168.58 |
| 8 | €923,697 | **€1,084,416** | €135,552 | €135.55 |
| 10 | €1,057,264 | **€1,241,224** | €124,122 | €124.12 |
| 20 | €1,919,179 | **€2,253,116** | €112,656 | €112.66 |
| 40 | €3,740,967 | **€4,391,895** | €109,797 | €109.80 |

---

## 8. NOTES & EXCLUSIONS

### Included in Self-Cost:
- All equipment (modules, inverters, mounting, BOS)
- Installation labor and machinery
- MV station and infrastructure
- Civil works (grading, roads, fencing)
- Engineering, HSE, QA, commissioning
- Logistics (port handling, cranage)
- EPC overhead

### Excluded from Self-Cost:
- RTB acquisition (€350,000/MWp)
- Off-site grid reinforcement
- Financing costs
- VAT
- Land purchase/lease (if separate from RTB)

---

## 9. EXAMPLE CALCULATION

### 5 MWp PV + 20 MWh BESS Park

**PV Self-Cost:**
```
Fixed:    €255,000
Variable: 5 MWp × €369,615 = €1,848,075
Adder:    €119,462
                           ─────────────
PV Self-Cost: €2,700,385 (€540,077/MWp)
```

**PV Client Price (+€100k/MW):**
```
€2,700,385 + (5 × €100,000) = €3,200,385 (€640,077/MWp = €0.64/Wp)
```

**BESS Self-Cost:**
```
20 MWh × €95,959/MWh = €1,919,179
```

**BESS Client Price (+17.4%):**
```
€1,919,179 × 1.174 = €2,253,116 (€112,656/MWh)
```

**Combined Client Price:**
```
PV Client:    €3,200,385
BESS Client:  €2,253,116
                        ───────────
EPC Client:   €5,453,501 (€1,090,700/MWp)
RTB:          €1,750,000
                        ───────────
All-In:       €7,203,501 (€1,440,700/MWp)
```

---

## 10. PRICING SUMMARY

| Component | Self-Cost | Markup | Client Price |
|-----------|-----------|--------|--------------|
| **PV EPC** | €/Wp | **+€100,000/MW** | Self-Cost + (MW × €100k) |
| **BESS EPC** | €/kWh | **+17.4%** | €/kWh × 1.174 |
| **RTB** | €350k/MWp | Pass-through | €350k/MWp |

### Quick Reference: Client €/Wp by Size

| MWp | Self-Cost €/Wp | Markup | **Client €/Wp** |
|-----|----------------|--------|-----------------|
| 1 | €0.63 | +€0.10 | **€0.73** |
| 2 | €0.59 | +€0.10 | **€0.69** |
| 3 | €0.56 | +€0.10 | **€0.66** |
| 5 | €0.54 | +€0.10 | **€0.64** |
| 10 | €0.51 | +€0.10 | **€0.61** |

### PV EPC Margin Formula

```
PV Client Price = PV Self-Cost + (Capacity MW × €100,000)

Example:
5 MWp park: €2,700,385 + €500,000 = €3,200,385
```

---

*All costs ex-VAT*
*Excluding off-site grid reinforcement and financing*
*PV EPC Markup: €100,000/MW (flat) | BESS EPC Markup: 17.4%*
*Document prepared by: Lighthief Cyprus Ltd*
