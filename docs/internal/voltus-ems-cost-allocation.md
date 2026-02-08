> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 27 January 2026*

---

# VOLTUS EMS/SCADA COST ALLOCATION

**Document Reference:** LCY-VOLTUS-ALLOCATION-JAN2026-R2  
**Date:** 27 January 2026  
**Source:** Cyprus EMS Project List - Voltus Price.xlsx  
**Status:** ✅ VERIFIED & REGROUPED BY CLIENT OWNERSHIP

---

## 📊 REGROUPING IMPACT SUMMARY

> **IMPORTANT:** The original Voltus quote split parks into 15 separate groups based on park names.  
> After reviewing the "Hybrid Storage - List of PV plants & owners.pdf", we identified that many parks  
> belong to the same parent client. By consolidating to TRUE client ownership (6 groups),  
> we achieve significant SCADA global cost savings.

| Metric | Original (15 groups) | Revised (6 groups) | Savings |
|--------|---------------------|-------------------|---------|
| SCADA Global Cost | €900,000 | €360,000 | **€540,000** |
| Groups | 15 | 6 | 9 fewer |

---

## 1. COST STRUCTURE

Voltus charges three categories:

### Per-Park Costs (EMS)
| Component | Description |
|-----------|-------------|
| System + Hardware | EMS hardware, meters, controllers |
| Remote Configuration & Preparation | Software setup, grid integration |
| On-site Installation + Training | Labor for installation and training |

### Per-Park Costs (SCADA)
| Component | Cost |
|-----------|------|
| SCADA local | €15,000 (one-time) |
| SCADA maintenance | €3,000/year |

### Per-Group Costs (SCADA)
| Component | Cost |
|-----------|------|
| SCADA global (on-premise) | €60,000 (one-time per TRUE client group) |
| SCADA global maintenance | €12,000/year |

---

## 2. TRUE CLIENT GROUPS (from PDF: Hybrid Storage - List of PV plants & owners)

### Group 1: ABIO POWER (25 parks) — Owner: Iacovos Charalambous

SCADA Global Share: **€2,400 per park** (€60,000 ÷ 25 parks)

Parks: Greendorado (Agrivoltaic, Larnaca 1, Larnaca 2, 1), Agios Sozomenos, Dianary (1, 2, 3), 
Easy Power (1, 2, 3, 4), Polemi, Potamia (p151, p208), Renergetic (1, 2), Solarity, 
Solartech 3 Extension, Waneron, ELESTORE (1-5)

### Group 2: ESPERIA ENERGY GROUP (11 parks) — Owner: Dino Constantinou

SCADA Global Share: **€5,455 per park** (€60,000 ÷ 11 parks)

Parks: Galascope (1, 2), Esperia Famagusta (1, 2), Esperia Frenaros, Esperia Limassol, 
Esperia Tseri (1, 2a, 2b, 2c, 3)

### Group 3: LAMPROS ANDREADIS (2 parks) — Owner: Lampros Andreadis

SCADA Global Share: **€30,000 per park** (€60,000 ÷ 2 parks)

Parks: Classone Solar Breeze, Classone Solar Garden

### Group 4: A KERASI PHOTOVOLTAICA LTD (3 parks)

SCADA Global Share: **€20,000 per park** (€60,000 ÷ 3 parks)

Parks: Paphos 1, Paphos 2, Paphos 3

### Group 5: IOANNIS KARIS (1 park)

SCADA Global Share: **€60,000 per park** (€60,000 ÷ 1 park)

Parks: My Sun Park

### Group 6: TIMOTHEOS TIMOTHEOU (9 parks)

SCADA Global Share: **€6,667 per park** (€60,000 ÷ 9 parks)

Parks: L&T (Res Systems, Solar Power, Sun Energy, Energia, PV Tech), 
AGM (Lightpower, Sunfield 1, Sunfield 2, Sunfield 3)

---

## 3. PORTFOLIO SUMMARY

| Group | Parks | Total MWh | SCADA Share/Park | Group SCADA Total |
|-------|-------|-----------|------------------|-------------------|
| ABIO Power | 25 | 461.0 | €2,400 | €60,000 |
| Esperia Energy | 11 | 310.5 | €5,455 | €60,000 |
| Lampros Andreadis | 2 | 15.0 | €30,000 | €60,000 |
| A Kerasi | 3 | 20.0 | €20,000 | €60,000 |
| Ioannis Karis | 1 | 25.0 | €60,000 | €60,000 |
| Timotheos Timotheou | 9 | 81.0 | €6,667 | €60,000 |
| **TOTAL** | **51** | **912.5** | - | **€360,000** |

---

## 4. COST COMPARISON: ORIGINAL vs CONSOLIDATED

### Before (15 Groups — Original Voltus Segmentation)

| Metric | Value |
|--------|-------|
| Total EMS Quotes | €2,354,992 |
| Total SCADA Local (51 × €15,000) | €765,000 |
| Total SCADA Global (15 × €60,000) | €900,000 |
| **Total EMS/SCADA** | **€4,019,992** |
| **Average €/MWh** | **€4,405** |

### After (5 Groups — TRUE Client Ownership)

| Metric | Value |
|--------|-------|
| Total EMS Quotes | €2,354,992 |
| Total SCADA Local (51 × €15,000) | €765,000 |
| Total SCADA Global (5 × €60,000) | €300,000 |
| **Total EMS/SCADA** | **€3,419,992** |
| **Average €/MWh** | **€3,748** |

### Savings Summary

| Line Item | Original | Consolidated | **Savings** |
|-----------|----------|--------------|-------------|
| SCADA Global | €900,000 | €300,000 | **€600,000** |
| Total EMS/SCADA | €4,019,992 | €3,419,992 | **€600,000** |
| Per Park Average | €78,823 | €67,059 | **€11,765** |

---

## 5. MARGIN IMPACT ANALYSIS

### Reference: 5MW/20MWh Park (ABIO Group)

| Scenario | SCADA Global Share | Total EMS/SCADA | EPC Cost | Margin |
|----------|-------------------|-----------------|----------|--------|
| Old (2-park group) | €30,000 | €91,718 | €2,089,171 | 7.5% |
| New (28-park group) | €2,143 | €63,861 | €2,061,314 | 9.6% |
| **Improvement** | **-€27,857** | **-€27,857** | **-€27,857** | **+2.1%** |

### Portfolio-Wide Margin Improvement

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Total EPC Cost | €95,854,217 | €95,260,882 | -€593,335 |
| Total Client Revenue | ~€108M | ~€108M | - |
| Average Margin | ~11.5% | ~12.6% | **+1.1%** |

---

## 6. KEY FINDINGS & ACTIONS

### ✅ COMPLETED

1. **Regrouped parks by TRUE client ownership** (from 15 groups to 5)
2. **Updated master spreadsheet** with new EMS/SCADA allocations
3. **Recalculated all EPC costs** with verified Voltus quotes
4. **All parks now have margins ≥ 11.5%** (no problem parks)

### 📋 RECOMMENDATIONS

1. **Communicate to Voltus:** Request formal quote revision with 5 client groups
2. **Contract structure:** Ensure SCADA global contracts are per-client, not per-brand
3. **Future parks:** Assign to existing client groups when possible to share SCADA costs

### ⚠️ ANNUAL MAINTENANCE (NOT IN CAPEX)

| Component | Cost |
|-----------|------|
| SCADA Local (per park) | €3,000/year |
| SCADA Global (per group) | €12,000/year |
| **Total for 51 parks, 5 groups** | **€213,000/year** |

---

## 7. CLIENT GROUP REFERENCE

| Client Group | Owner/Contact | Parks | Districts |
|--------------|---------------|-------|-----------|
| ABIO Power | Iacovos Charalambous | 28 | Famagusta, Larnaca, Limassol, Nicosia, Paphos |
| Esperia Energy Group | Dino Constantinou | 9 | Famagusta, Limassol, Nicosia |
| ELESTORE | (Standalone BESS) | 5 | Nicosia |
| AGM Group | AGM Ltd | 4 | Nicosia |
| L&T Group | Lampros Andreadis | 5 | Famagusta, Limassol, Nicosia |

---

*Document prepared by: Lighthief Cyprus Ltd*  
*Last updated: 27 January 2026*  
*Classification: INTERNAL - CONFIDENTIAL*  
*Source: Voltus Energy - Cyprus EMS Project List Price Quote + Hybrid Storage Client List*
