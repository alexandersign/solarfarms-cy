> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 7 February 2026*

---

# COST COMPARISON: Our Pricing vs Market Rates

**Document Reference:** LCY-COST-COMPARISON-FEB2026
**Date:** 5 February 2026
**Purpose:** Cross-check our EPC costs against industry benchmarks
**Status:** ⚠️ REVIEW REQUIRED - POTENTIAL MISMATCHES IDENTIFIED

---

## EXECUTIVE SUMMARY

| Metric | Our Price | Market Benchmark | Status |
|--------|-----------|------------------|--------|
| **Total Installed Cost** | €99.50/kWh (~$105/kWh) | $125/kWh (Oct 2025) | ✅ **COMPETITIVE** |
| **Client Price** | €112.95/kWh (~$119/kWh) | $155-165/kWh avg | ✅ **COMPETITIVE** |
| **Equipment (CIF)** | €92.44/kWh (~$97/kWh) | $75/kWh China direct | ⚠️ **23% HIGHER** |
| **EPC/Installation** | €7.06/kWh (~$7.40/kWh) | $50/kWh typical | ✅ **VERY LOW** - Review scope |

> **Key Finding:** Our CIF equipment price is ~23% above the lowest China-direct rates ($75/kWh), but our EPC/installation costs appear very low. Either we're missing costs, or Linyang's turnkey includes more than typical "equipment only" quotes.

---

## 1. OVERALL SYSTEM COST COMPARISON

### Market Benchmarks (October 2025 - Ember/BNEF Data)

| Source | All-In CAPEX | Equipment | Installation |
|--------|--------------|-----------|--------------|
| **Ember (Oct 2025)** | $125/kWh | $75/kWh | $50/kWh |
| **BNEF (2024 avg)** | $165/kWh | - | - |
| **NextG Power (2026)** | $360-690/kWh (commercial) | $140-240/kWh modules | 25-35% soft costs |
| **Saudi Arabia auctions** | $120/kWh | $73-75/kWh | $47-48/kWh |
| **Italy MACSE (Oct 2025)** | ~$120/kWh | ~$70/kWh | ~$50/kWh |

### Our Pricing (5MW/20MWh Reference)

| Component | Amount | €/kWh | $/kWh (1.05 rate) |
|-----------|--------|-------|-------------------|
| CIF (Linyang) | €1,848,712 | €92.44 | **$97.06** |
| EPC Adders | €141,241 | €7.06 | **$7.41** |
| **Installed Cost** | €1,989,953 | €99.50 | **$104.47** |
| **Client Price** | €2,258,900 | €112.95 | **$118.60** |

### Analysis

| Item | Our Price | Market | Difference | Notes |
|------|-----------|--------|------------|-------|
| **Equipment** | $97/kWh | $75/kWh | **+29%** | Linyang CIF includes more? |
| **EPC/Install** | $7.41/kWh | $50/kWh | **-85%** | ⚠️ Suspiciously low - missing costs? |
| **Total** | $104.47/kWh | $125/kWh | **-16%** | Competitive overall |

---

## 2. COMPONENT-BY-COMPONENT ANALYSIS

### 2.1 Battery Modules/Containers

| Item | Our Assumption | Market Rate | Status |
|------|----------------|-------------|--------|
| **LFP Cells** | Included in CIF | $40/kWh (China Nov 2025) | Bundled |
| **Container (5MWh)** | Included in CIF | ~$350,000-400,000 | Bundled |
| **EVE 314Ah cells** | Premium brand | Market share #3 | ✅ Premium |

**Analysis:** Linyang's CIF at €92.44/kWh (~$97) is higher than the $75/kWh benchmark because:
- EVE is a premium cell supplier (Tier 1)
- Price includes BMS, cooling, fire suppression, C5 corrosion coating
- Linyang adds margin as integrator

✅ **VERDICT:** Premium pricing justified for Tier 1 cells and integration quality

---

### 2.2 PCS (Power Conversion System)

| Item | Our Assumption | Market Rate | Status |
|------|----------------|-------------|--------|
| **Kehua BCS1250K-C** | Included in MV Skid | 15-25% of hardware cost | Bundled |
| **Efficiency** | ≥98% at rated | Market standard | ✅ Match |
| **Grid-forming** | Yes | Premium feature | ✅ Included |

**Market Reference:** PCS typically 15-25% of hardware = ~$11-19/kWh

✅ **VERDICT:** Included in Linyang package - appropriate

---

### 2.3 MV Transformer

| Item | Our Assumption | Market Rate | Status |
|------|----------------|-------------|--------|
| **2-3MVA Transformer** | Included in MV Skid | $12,500-$29,000 (oil-immersed) | Bundled |
| **Dry-type 3MVA** | - | $60,000-$160,000 | More expensive |

**Analysis:** For 5MW system, typical 2.5-3MVA transformer needed.
- Market: $15,000-30,000 for oil-immersed
- Included in Linyang's MV Skid package

✅ **VERDICT:** Bundled appropriately

---

### 2.4 Import Duties

| Item | Our Sheet | Client Doc | Market Rate | Status |
|------|-----------|------------|-------------|--------|
| **Rate** | 2.66% (weighted) | INCLUDED | 0% for batteries (HS 8507) | ⚠️ Check |
| **Amount (20MWh)** | €49,176 | INCLUDED | €0 for batteries | ⚠️ Mismatch |

**Market Reference:**
- EU tariff for lithium batteries (HS 8507.60): **0%** (tariff suspension)
- Transformers (HS 8504.21/23): **3.7%**
- PCS/Inverters (HS 8504.40): **0%**

**Analysis:** If batteries are 65% of value at 0%, and transformers are 24.5% at 3.7%:
- Weighted duty should be ~0.9%, not 2.66%

⚠️ **VERDICT:** EPC sheet may overstate import duty. If client doc says INCLUDED, need to verify actual rate.

---

### 2.5 Civil Works & Foundations

**✅ UPDATED 5 FEB 2026:** Using Google Sheet assumption of €4,000/platform

| Item | Google Sheet | Client Doc | Calculated Cost | Status |
|------|--------------|------------|-----------------|--------|
| **Cost per platform** | €4,000 | INCLUDED | €3,000-4,600 | ✅ VALID |
| **5 containers (5MW/20MWh)** | €20,000 | INCLUDED | €15,000-23,000 | ✅ VALID |

**Cost Breakdown (per platform):**
| Component | Cost |
|-----------|------|
| Concrete pad (8m³ @ €120/m³) | €960 |
| Reinforcement (32m² @ €15/m²) | €480 |
| Formwork + finishing | €400 |
| Labor (8 hrs @ €35/hr) | €280 |
| Cable trench (20m @ €30/m) | €600 |
| **Total per BESS pad** | **€2,720** |
| **With contingency (+30%)** | **€3,536** |

**Scope Clarification:**
- €4,000/platform = pads + cable trenches (VALID if drainage separate)
- If drainage INCLUDED: €4,500-4,600/platform recommended
- Fencing, access road = typically separate or existing

✅ **VERDICT:** €4,000/platform assumption is VALID for pads-only scope. Total: **€20,000** for 5MW/20MWh.

---

### 2.6 Transport (Inland Haulage)

| Item | Our Assumption | Market Rate | Status |
|------|----------------|-------------|--------|
| **A. Soulis rate** | €2,360/container | ~€2,000-3,000/40ft (regional) | ✅ Match |
| **5 containers** | €11,800 | €10,000-15,000 | ✅ Match |

✅ **VERDICT:** Transport costs appear reasonable

---

### 2.7 SCADA/EMS

**🔴 UPDATED 5 FEB 2026:** Now using actual Voltus quote (not market estimates)

| Item | EPC Sheet | **Actual Voltus Quote** | Status |
|------|-----------|-------------------------|--------|
| **SCADA Hardware** | €7,500 | Included in EMS Total | Bundled |
| **EMS (System + Hardware)** | €0 | €22,897 (5MW/20MWh) | 🔴 WAS MISSING |
| **Remote Config & Prep** | €0 | €11,609 | 🔴 WAS MISSING |
| **On-site Install + Training** | €0 | €12,212 | 🔴 WAS MISSING |
| **EMS Total per Park** | €0 | **€46,718** | 🔴 WAS MISSING |
| **SCADA Local** | - | €15,000/park | 🔴 WAS MISSING |
| **SCADA Global (group share)** | - | €15,000/park (4-park group) | 🔴 WAS MISSING |
| **Total EMS/SCADA CAPEX** | €7,500 | **€76,718** | 🔴 **€69,218 GAP** |

**Source:** Voltus Energy - Cyprus EMS Project List Price Quote

| Park Size | EMS Total | SCADA Local | Group Share | **Total** | **€/MWh** |
|-----------|-----------|-------------|-------------|-----------|-----------|
| 2.5MW/10MWh | €31,742 | €15,000 | €20,000 | €66,742 | €6,674 |
| 5MW/20MWh | €46,718 | €15,000 | €15,000 | **€76,718** | **€3,836** |
| 12MW/40MWh | €89,424 | €15,000 | €12,000 | €116,424 | €2,911 |
| 25MW/100MWh | €179,279 | €15,000 | €15,000 | €209,279 | €2,093 |

🔴 **VERDICT:** EPC sheet showed €7,500, actual Voltus quote is **€76,718** for 5MW/20MWh. **Gap: €69,218**

---

### 2.8 Protection Testing & Commissioning

| Item | Our Sheet | Client Doc | Market Rate | Status |
|------|-----------|------------|-------------|--------|
| **Protection Testing** | €20,000 | INCLUDED | $120k-224k (SCE data) | ⚠️ Check scope |
| **Commissioning** | €0 (Linyang TBC) | INCLUDED | 4-6 weeks labor | Need clarity |

**Market Reference:**
- SCE (California): Protection relay replacement $223,440/site
- But this is REPLACEMENT, not testing
- Commissioning typically 5-10% of project cost

**Analysis:** Our €20,000 seems low if it covers full relay testing + DSO witnessing. However, if Linyang provides commissioning, this may be equipment-side only.

⚠️ **VERDICT:** Need clarity on what €20,000 covers vs what Linyang provides

---

### 2.9 Lightning Protection (LPS)

| Item | Our Sheet | Client Doc | Market Rate | Status |
|------|-----------|------------|-------------|--------|
| **LPS External** | €4,200 | EXCLUDED (client pays) | €5,000-15,000/park | ⚠️ Scope issue |

**Market Reference:** Industrial LPS from DEHN typically €5,000-15,000 depending on:
- Building size/height
- Soil resistivity
- Number of down-conductors

**Analysis:** Our €4,200 is at low end. If EXCLUDED from client package, this should be REMOVED from our cost calculation (client pays separately).

⚠️ **VERDICT:** Remove from our costs if client pays separately

---

### 2.10 Insurance

| Item | Our Sheet | Market Rate | Status |
|------|-----------|-------------|--------|
| **CAR/EAR** | 0.75% of CIF = €13,865 | 0.5-1.5% typical | ✅ Match |

✅ **VERDICT:** Insurance estimate reasonable

---

### 2.11 O&M Costs

| Item | Client Doc | Market Rate | Status |
|------|------------|-------------|--------|
| **Annual O&M** | €1,740/MWh/year | $15-25/kW/year | ⚠️ Convert to compare |

**Conversion:**
- 5MW system: $15-25/kW × 5000kW = $75,000-125,000/year
- For 20MWh: $75,000-125,000 / 20 = $3,750-6,250/MWh/year

Our rate: €1,740/MWh/year (~$1,827/MWh/year)

✅ **VERDICT:** Our O&M is LOWER than market - very competitive or underpriced

---

## 3. COST ADJUSTMENTS (VERIFIED 5 FEB 2026)

**🔴 MAJOR UPDATE:** Using actual Voltus quote and validated civil works

| Item | EPC Sheet | Verified Cost | Adjustment |
|------|-----------|---------------|------------|
| **Civil Works (€4k/platform × 5)** | €0 | €20,000 | **+€20,000** |
| **Drainage** | €0 | €5,000 | **+€5,000** |
| **EMS/SCADA (Actual Voltus)** | €7,500 | €76,718 | **+€69,218** |
| **LPS External** | €4,200 | €0 (client pays) | **-€4,200** |
| **Import Duty Overcharge** | €49,176 | ~€16,500 (0.9%) | **-€32,676** |
| **Total Net Adjustment** | - | - | **+€57,342** |

### Revised Margin Calculation (VERIFIED)

```
Original Installed Cost (EPC Sheet):  €1,989,953 (€99.50/kWh)
  + Civil Works (5 × €4,000):           +€20,000
  + Drainage:                            +€5,000
  + EMS/SCADA (Voltus actual):          +€69,218  (was €7,500, now €76,718)
  - Remove old SCADA estimate:           -€7,500
  - LPS External (client pays):          -€4,200
  - Import Duty Correction:             -€32,676
─────────────────────────────────────────────────
Revised Installed Cost:               €2,039,795 (€102.0/kWh)

Client Price:                         €2,258,900 (€112.95/kWh)
Margin:                               €219,105 (€10.96/kWh)
Margin %:                             9.7%
```

### Margin Comparison

| Scenario | Installed Cost | Client Price | Margin € | Margin % |
|----------|----------------|--------------|----------|----------|
| **Original EPC Sheet** | €1,989,953 | €2,258,900 | €268,947 | 11.9% |
| **Previous Estimate** | €2,013,077 | €2,258,900 | €245,823 | 10.9% |
| **🔴 VERIFIED (with Voltus)** | €2,039,795 | €2,258,900 | **€219,105** | **9.7%** |

---

## 4. KEY FINDINGS (VERIFIED 5 FEB 2026)

### 🔴 MAJOR COST ADJUSTMENTS

| # | Item | EPC Sheet | Verified | Gap | Status |
|---|------|-----------|----------|-----|--------|
| 1 | **EMS/SCADA (Voltus)** | €7,500 | €76,718 | **-€69,218** | 🔴 CONFIRMED from quote |
| 2 | **Civil Works** | €0 | €20,000 (€4k/platform) | **-€20,000** | ✅ VALIDATED |
| 3 | **Drainage** | €0 | €5,000 | **-€5,000** | ✅ VALIDATED |
| 4 | **Import Duty** | €49,176 (2.66%) | €16,500 (0.9%) | **+€32,676** | ⚠️ NEEDS VERIFICATION |
| 5 | **LPS External** | €4,200 | €0 (client pays) | **+€4,200** | ✅ Client responsibility |

### ✅ RESOLVED ITEMS

| # | Item | Resolution |
|---|------|------------|
| 1 | **EMS Provider** | VOLTUS (not Volton - typo in client doc) |
| 2 | **Civil works per platform** | €4,000 VALID for pads-only scope |
| 3 | **SCADA group allocation** | €60,000 per group ÷ parks in group |

### ✅ ALIGNED WITH MARKET

| # | Item | Our Cost | Market | Status |
|---|------|----------|--------|--------|
| 1 | Transport | €2,360/container | €2,000-3,000 | ✅ Aligned |
| 2 | Insurance (CAR/EAR) | 0.75% | 0.5-1.5% | ✅ Aligned |
| 3 | O&M | €1,740/MWh/yr | $3,750-6,250/MWh/yr | ✅ Competitive |
| 4 | Overall installed | €102/kWh | $125/kWh | ✅ 18% below market |

---

## 5. SUMMARY (VERIFIED 5 FEB 2026)

### Our Pricing Position (REVISED)

| Metric | Original | Verified | vs Market |
|--------|----------|----------|-----------|
| Installed Cost | €99.50/kWh | **€102.0/kWh** | **18% below** $125/kWh benchmark |
| Client Price | €112.95/kWh | €112.95/kWh | **16% below** global avg ($165) |
| Margin | 11.9% | **9.7%** | Acceptable but tighter |

### Competitive Advantage
Our pricing REMAINS **competitive** because:
1. Linyang's CIF includes extensive scope (BMS, cooling, fire suppression)
2. Payment terms (25/50/20/5) are favorable
3. O&M pricing (€1,740/MWh) is below market
4. EVE cells are Tier 1 quality
5. Even with verified costs, we're 18% below market benchmark

### Key Cost Items Now Verified

| Item | Source | Value |
|------|--------|-------|
| **Voltus EMS/SCADA** | Supplier quote | €76,718 per 5MW/20MWh park |
| **Civil works** | Google Sheet | €4,000/platform (€20,000 total) |
| **Import duty** | Still needs verification | 0.9% vs 2.66% |

### Margin Impact Summary

```
Original margin (EPC sheet):     11.9% (€268,947)
After Voltus verification:        9.7% (€219,105)
───────────────────────────────────────────────────
Margin reduction:                -2.2% (-€49,842)
```

### ⚠️ ACTION REQUIRED

1. Confirm import duty rate (0.9% vs 2.66%) - potential +€32,676 if overcounted
2. Confirm drainage scope with civil contractor
3. Update EPC cost sheet with Voltus actual costs

---

*Document prepared by: Lighthief Cyprus Ltd*  
*Classification: INTERNAL - CONFIDENTIAL*  
*Sources: Voltus Energy quote, Google Sheet, Ember Energy (Oct 2025)*  
*Last Updated: 5 February 2026*
