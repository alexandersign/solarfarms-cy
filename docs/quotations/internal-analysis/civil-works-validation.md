> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 7 February 2026*

---

# CIVIL WORKS COST VALIDATION

**Document Reference:** LCY-CIVIL-VALIDATION-FEB2026  
**Date:** 5 February 2026  
**Assumption Under Review:** €4,000 per container platform  
**Status:** ⚠️ NEEDS FIELD VALIDATION

---

## 1. ASSUMPTION FROM GOOGLE SHEET

| Item | Value |
|------|-------|
| **Cost per platform** | €4,000 |
| **Containers (5MW/20MWh)** | 5 (4 BESS + 1 MV) |
| **Total Civil Works** | €20,000 |

---

## 2. MARKET BENCHMARK ANALYSIS

### 2.1 Reinforced Concrete Slab Costs (UK/EU 2025)

| Region | Ready-Mix Cost (m³) | Installed Slab Cost (m²) |
|--------|--------------------|-----------------------|
| UK Average | £190/m³ (~€220) | £80-120/m² (~€95-140) |
| Southern EU | €100-130/m³ | €70-100/m² |
| Cyprus (estimated) | €110-140/m³ | €80-110/m² |

### 2.2 Container Foundation Requirements

| Container Type | Dimensions (LxW) | Pad Size (with access) | Load |
|----------------|------------------|------------------------|------|
| BESS (20ft HC) | 6.1m × 2.44m | 8m × 4m = 32m² | ~30 tonnes |
| MV Skid (40ft) | 12.2m × 2.44m | 14m × 4m = 56m² | ~25 tonnes |

### 2.3 Foundation Specification (BESS Standard)

| Component | Specification | Cost Factor |
|-----------|---------------|-------------|
| Slab thickness | 200-300mm | Base |
| Reinforcement | 12mm rebar @ 200mm c/c | +30% |
| Cable trenches | 2-3 trenches per container | +€500 |
| Edge formwork | Perimeter shuttering | +€300 |

---

## 3. COST CALCULATION

### 3.1 Per BESS Container (20ft HC)

| Item | Calculation | Cost |
|------|-------------|------|
| Concrete pad | 32m² × 0.25m = 8m³ @ €120/m³ | €960 |
| Reinforcement (rebar mesh) | 32m² @ €15/m² | €480 |
| Formwork + finishing | Lump sum | €400 |
| Labor (Cyprus rates) | 8 hours @ €35/hr | €280 |
| Cable trench (20m) | 20m @ €30/m | €600 |
| **Subtotal** | - | **€2,720** |

### 3.2 Per MV Skid Container (40ft)

| Item | Calculation | Cost |
|------|-------------|------|
| Concrete pad | 56m² × 0.25m = 14m³ @ €120/m³ | €1,680 |
| Reinforcement | 56m² @ €15/m² | €840 |
| Formwork + finishing | Lump sum | €500 |
| Labor | 12 hours @ €35/hr | €420 |
| Cable trench (30m) | 30m @ €30/m | €900 |
| **Subtotal** | - | **€4,340** |

### 3.3 Common Works (Per Site)

| Item | Calculation | Cost |
|------|-------------|------|
| Site preparation/leveling | Lump sum | €3,000 |
| Drainage system | Perimeter drains + soak-away | €5,000 |
| Access road (gravel) | 50m @ €40/m | €2,000 |
| Perimeter fencing (100m) | 100m @ €50/m | €5,000 |
| **Common Works Total** | - | **€15,000** |

---

## 4. TOTAL CIVIL WORKS ESTIMATE (5MW/20MWh)

### 4.1 Itemized Calculation

| Item | Qty | Unit Cost | Total |
|------|-----|-----------|-------|
| BESS container pads | 4 | €2,720 | €10,880 |
| MV Skid pad | 1 | €4,340 | €4,340 |
| Common works | 1 | €15,000 | €15,000 |
| **Total Civil Works** | - | - | **€30,220** |

### 4.2 Per-Platform Average

| Calculation | Result |
|-------------|--------|
| Total Civil / 5 containers | €30,220 / 5 = **€6,044/platform** |

### 4.3 Comparison to Assumption

| Metric | Google Sheet | Market Estimate | Difference |
|--------|--------------|-----------------|------------|
| Per platform | €4,000 | €6,044 | **-€2,044 (34% low)** |
| 5 containers total | €20,000 | €30,220 | **-€10,220** |

---

## 5. SCENARIOS

### Scenario A: Minimal Scope (€4,000/platform justified)

If civil works EXCLUDES:
- Site preparation (done by landowner)
- Drainage system
- Fencing (existing or not required)
- Access road (existing)

**Then:**
| Item | Qty | Unit Cost | Total |
|------|-----|-----------|-------|
| BESS pads only | 4 | €2,720 | €10,880 |
| MV Skid pad only | 1 | €4,340 | €4,340 |
| **Total** | - | - | **€15,220** |
| **Per platform** | - | - | **€3,044** |

With 30% contingency: €3,044 × 1.3 = **€3,957** ≈ €4,000 ✅

**Conclusion:** €4,000/platform is justified IF scope is limited to concrete pads only.

### Scenario B: Full Scope (Including drainage from client doc)

If civil works INCLUDES per client document:
- Concrete bases
- Cable laying
- Drainage system

**Then:**
| Item | Qty | Unit Cost | Total |
|------|-----|-----------|-------|
| BESS pads | 4 | €2,720 | €10,880 |
| MV Skid pad | 1 | €4,340 | €4,340 |
| Drainage | 1 | €5,000 | €5,000 |
| Cable laying (extra) | 1 | €3,000 | €3,000 |
| **Total** | - | - | **€23,220** |
| **Per platform** | - | - | **€4,644** |

**Conclusion:** If drainage is included, cost is ~€4,600/platform, so €4,000 is ~15% low.

---

## 6. RECOMMENDATION

| Scenario | Per Platform | 5MW/20MWh Total | Status |
|----------|--------------|-----------------|--------|
| **Pads Only** | €4,000 | €20,000 | ✅ VALID |
| **Pads + Drainage** | €4,600 | €23,000 | ⚠️ 15% UNDERSTATED |
| **Full Scope** | €6,000 | €30,000 | ⚠️ 50% UNDERSTATED |

### Action Required

Clarify with operations team:
1. Is €4,000/platform for PADS ONLY or includes drainage?
2. Who provides site prep, fencing, access road?
3. Are cable trenches included in €4,000 or separate?

### For Cost Model - Use Conservative Estimate

| Assumption | Value | Rationale |
|------------|-------|-----------|
| **Recommended** | €4,500/platform | Pads + drainage, excl. fencing/access |
| **5MW/20MWh** | €22,500 | 5 platforms × €4,500 |

---

## 7. VALIDATION SOURCES

- UK concrete pricing (2025): £190/m³ ready-mix
- EU reinforced slab: €80-120/m² installed
- Cyprus labor rates: €30-40/hr construction
- Cable trench (earth + backfill): €25-35/m

---

*Document prepared by: Lighthief Cyprus Ltd*  
*Classification: INTERNAL - CONFIDENTIAL*
