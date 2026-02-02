# Logistics Cost Comparison
## Interfreight Quote vs Current EPC Model - January 2026

---

| Field | Value |
|-------|-------|
| **Document Reference** | LCY-LOGISTICS-COMPARE-2026 |
| **Date** | 31 January 2026 |
| **Status** | 🔴 **ACTION REQUIRED** |

---

## 1. CRITICAL FINDING: IMPORT DUTY DISCREPANCY

### Our Current Model (import-duty-model.md)

| Component | HS Code | Our Assumed Rate | Weighted Contribution |
|-----------|---------|------------------|----------------------|
| Battery Containers | 8507 60 00 90 | **0%** | 0% |
| PCS | 8504 40 | 0% | 0% |
| MV Transformer | 8504 21/23 | 3.7% | 0.91% |
| Switchgear | 8537 | 2.1% | ~0% |
| **TOTAL WEIGHTED** | - | - | **0.9%** |

### Interfreight Confirmation

| Component | HS Code | Confirmed Rate | Issue |
|-----------|---------|----------------|-------|
| Battery Containers | 8507 60 00 90 | **2.7%** | 🔴 **DIFFERENT** |
| PCS | 8504 40 | 0% | ✅ Matches |
| MV Transformer | 8504 21/23 | 3.7% | ✅ Matches |
| Switchgear | 8537 | 2.1% | ✅ Matches |

### ⚠️ IMPACT ANALYSIS

If batteries are 2.7% (not 0%), recalculating weighted duty:

| Component | % of CIF | Duty Rate | Weighted |
|-----------|----------|-----------|----------|
| Battery Containers | 65% | **2.7%** | **1.755%** |
| PCS | 10.5% | 0% | 0% |
| MV Transformer | 24.5% | 3.7% | 0.907% |
| **NEW WEIGHTED TOTAL** | 100% | - | **~2.66%** |

### Financial Impact on Portfolio (€84.7M CIF)

| Scenario | Duty Rate | Total Duty | Difference |
|----------|-----------|------------|------------|
| Our Model (0.9%) | 0.9% | €762,315 | - |
| **Corrected Model (2.66%)** | 2.66% | **€2,253,020** | **+€1,490,705** |

> 🔴 **CRITICAL:** If battery duty is 2.7%, we're underestimating by ~€1.5M across portfolio!

---

## 2. INLAND TRANSPORT COMPARISON

### Our Current Model (A. Soulis Quote)

| Service | Rate |
|---------|------|
| Port Offload + Inland Transport | **€2,360/container** |
| Route | Limassol → Larnaca |

### Interfreight Quote (Breakdown)

| Component | 20' Container | 40' HC Container |
|-----------|---------------|------------------|
| Landing Charges | €450-550 | €550-650 |
| Customs Clearance | €85 | €85 |
| **Subtotal (Port)** | **€535-635** | **€635-735** |

| Destination | Per Container |
|-------------|---------------|
| Limassol | €110-120 |
| **Larnaca** | **€210** |
| Nicosia | €220 |
| Paphos | €210 |
| Famagusta | €250 |

### Comparison: A. Soulis vs Interfreight (Larnaca Route)

| Item | A. Soulis | Interfreight | Difference |
|------|-----------|--------------|------------|
| Port Offload | Included | €500-600 | - |
| Customs | Included | €85 | - |
| Transport (Larnaca) | Included | €210 | - |
| **TOTAL** | **€2,360** | **€795-895** | **€1,465-1,565** |

> 🔴 **A. Soulis is significantly more expensive!**
> Possible reasons: Special handling, heavy lift equipment, different service scope?

### Verify with A. Soulis

Need to clarify what's included in €2,360:
- [ ] Heavy crane/lifting equipment?
- [ ] Two-day service?
- [ ] Special handling for BESS containers?
- [ ] Route-specific pricing (different from standard FCL)?

---

## 3. PER-REGION COST ESTIMATES (Interfreight)

### Using 40' HC Containers (BESS/MV SKID)

| Region | Landing | Customs | Transport | **Total/Container** |
|--------|---------|---------|-----------|---------------------|
| Limassol | €600 | €85 | €115 | **€800** |
| Nicosia | €600 | €85 | €220 | **€905** |
| Larnaca | €600 | €85 | €210 | **€895** |
| Paphos | €600 | €85 | €210 | **€895** |
| Famagusta | €600 | €85 | €250 | **€935** |

> Note: Add potential customs examination (€120-140) and DG handling for lithium batteries.

---

## 4. IMO/DANGEROUS GOODS CONSIDERATION

BESS containers may be classified as IMO Class 9 (Lithium Batteries).

**Impact on Storage Fees:**

| Period | Standard | IMO Class 9 |
|--------|----------|-------------|
| First 4 days | FREE | €44.86/day |
| Day 5+ | €17.94/day | €89.72/day |

> **Recommendation:** Clear containers within 4 days to avoid storage charges. IMO classification adds ~€180-360 in storage if delayed.

---

## 5. UPDATED DUTY CALCULATION ACTION

### Immediate Actions Required

1. **Verify HS Code for Batteries**
   - HS 8507 60 00 90 = Lithium-ion accumulators
   - Check if EU origin cells change classification
   - Get BTI (Binding Tariff Information) from Cyprus Customs

2. **Update Pricing Model**
   - If 2.7% confirmed: Update all proposals and EPC pricing
   - Impact: ~€1.5M additional cost across portfolio

3. **Review with Customs Broker**
   - Interfreight can provide official ruling
   - Consider pre-clearance consultation

---

## 6. RECOMMENDED LOGISTICS COSTS FOR EPC MODEL

### Conservative Estimate (Using Interfreight + Buffer)

| Item | Per Container | Notes |
|------|---------------|-------|
| Landing Charges | €650 | Using higher end for 40' HC |
| Customs Clearance | €100 | Including small buffer |
| Transport (Average) | €250 | Weighted by project locations |
| Customs Exam (Contingency) | €50 | 30% probability × €150 |
| DG Handling (If Applicable) | €100 | To be confirmed |
| **TOTAL** | **€1,150/container** | - |

### Compared to Current Model

| Model | Per Container | For 6 Containers |
|-------|---------------|------------------|
| Current (A. Soulis) | €2,360 | €14,160 |
| Interfreight Based | €1,150 | €6,900 |
| **Savings** | **€1,210** | **€7,260** |

---

## 7. CONTACTS SAVED

### Interfreight Logistics

| Field | Value |
|-------|-------|
| **Name** | Vasilis N Markides |
| **Phone** | +357 25 877 587 |
| **Mobile** | +357 99 464 613 |
| **Email** | markides@interfreightlogistics.com |

### Voltus Energy (EMS)

| Field | Value |
|-------|-------|
| **Name** | Dr. Andrzej Lechowicz (PhD) |
| **Phone** | +48 696 043 508 |
| **Email** | a.lechowicz@voltusenergy.pl |
| **Address** | ul. Zielona 15, 47-320 Gogolin, Poland |

---

## 8. ACTION ITEMS

| # | Action | Owner | Priority | Status |
|---|--------|-------|----------|--------|
| 1 | Verify HS 8507 60 00 90 duty rate for BESS | Interfreight/Customs | 🔴 CRITICAL | Pending |
| 2 | Clarify A. Soulis scope vs Interfreight | Costas | 🟡 HIGH | Pending |
| 3 | Update EPC pricing model if duty 2.7% confirmed | Alex | 🔴 CRITICAL | Pending |
| 4 | Get DG/IMO handling requirements | Interfreight | 🟡 HIGH | Pending |
| 5 | Request Interfreight quote per region with container counts | Costas | 🟡 HIGH | Pending |

---

*Document prepared: 31 January 2026*
*Status: REVIEW REQUIRED - Potential €1.5M impact on portfolio*
