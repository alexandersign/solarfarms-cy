# IMPORT DUTY MODEL - CYPRUS BESS

**Document Reference:** LCY-DUTY-MODEL-001
**Date:** 27 January 2026
**Status:** ✅ VALIDATED
**Replaces:** Previous 2.7% flat rate model

---

## EXECUTIVE SUMMARY

| Metric | Old Model | New Model | Impact |
|--------|-----------|-----------|--------|
| **Effective Duty Rate** | 2.7% | **0.9%** | -1.8% |
| **Duty on €1M CIF** | €27,000 | **€9,000** | -€18,000 |
| **Portfolio Savings (€84.7M CIF)** | €2.29M | **€0.76M** | **-€1.53M** |

---

## 1. LEGAL BASIS

### EU TARIC Classifications

| Component | CN/TARIC Code | Description | MFN Duty |
|-----------|---------------|-------------|----------|
| **LFP Battery Containers** | 8507 60 00 90 | Lithium-ion accumulators | **0%** |
| **PCS (Static Converters)** | 8504 40 | Static converters | **0%** |
| **MV Transformer (Liquid)** | 8504 21 00 | Liquid dielectric ≤650kVA | **3.7%** |
| **MV Transformer (Liquid)** | 8504 22 | Liquid dielectric 650kVA-10MVA | **3.7%** |
| **MV Transformer (Dry)** | 8504 31/32/33 | Other transformers | **2.0-3.7%** |
| **MV Switchgear** | 8537 20 | HV switchgear >1kV | **2.1%** |

> **Source:** EU TARIC Database, January 2026
> **Note:** China has MFN status with EU; no preferential trade agreement applies.

---

## 2. CIF VALUE BREAKDOWN

### Standard Linyang BESS Shipment

| Component | % of CIF | Duty Rate | Weighted Contribution |
|-----------|----------|-----------|----------------------|
| **Battery Containers (ME series)** | 65% | 0% | 0.00% |
| **MV SKID - PCS portion** | 10.5% | 0% | 0.00% |
| **MV SKID - Switchgear portion** | 0% | 2.1% | 0.00% |
| **MV SKID - Transformer portion** | 24.5% | 3.7% | **0.91%** |
| **TOTAL** | 100% | - | **~0.9%** |

### MV SKID Internal Value Split

| Sub-component | % of MV SKID | % of Total CIF | Duty |
|---------------|--------------|----------------|------|
| MV Transformer | 70% | 24.5% | 3.7% |
| PCS Units | 20% | 7.0% | 0% |
| Switchgear + Enclosure | 10% | 3.5% | 0-2.1% |

> **Conservative assumption:** Using 3.7% for transformer (liquid dielectric worst case)
> **Note:** ABB/Schneider switchgear is EU-origin or 0% duty under ITA

---

## 3. CALCULATION FORMULA

### Per-Line Item Method (Recommended)

```
DUTY_BATTERIES    = CIF_BATTERIES × 0.00
DUTY_PCS          = CIF_PCS × 0.00
DUTY_TRANSFORMER  = CIF_TRANSFORMER × 0.037
DUTY_SWITCHGEAR   = CIF_SWITCHGEAR × 0.021 (if applicable)

TOTAL_DUTY = DUTY_BATTERIES + DUTY_PCS + DUTY_TRANSFORMER + DUTY_SWITCHGEAR
```

### Blended Rate Method (For Quick Estimates)

```
TOTAL_DUTY = TOTAL_CIF × 0.009

Where:
- 0.009 = 0.9% effective weighted rate
- Only valid for standard 65/35 battery/MV-skid split
```

---

## 4. EXAMPLE CALCULATIONS

### Example 1: 5MW/20MWh System (CIF €1,848,712)

| Component | Value | Duty Rate | Duty Amount |
|-----------|-------|-----------|-------------|
| Battery Containers (65%) | €1,201,663 | 0% | €0 |
| MV SKID - PCS (10.5%) | €194,115 | 0% | €0 |
| MV SKID - Transformer (24.5%) | €452,934 | 3.7% | **€16,759** |
| **TOTAL** | €1,848,712 | **0.91%** | **€16,759** |

### Example 2: Full Portfolio (CIF €84,685,405)

| Component | Value | Duty Rate | Duty Amount |
|-----------|-------|-----------|-------------|
| Battery Containers (65%) | €55,045,513 | 0% | €0 |
| MV SKID - PCS (10.5%) | €8,891,968 | 0% | €0 |
| MV SKID - Transformer (24.5%) | €20,747,924 | 3.7% | **€767,673** |
| **TOTAL** | €84,685,405 | **0.91%** | **€767,673** |

---

## 5. COMPARISON: OLD VS NEW MODEL

### Per Project Impact (20 MWh Example)

| Metric | Old (2.7%) | New (0.9%) | Savings |
|--------|------------|------------|---------|
| Duty Amount | €49,915 | €16,759 | **€33,156** |
| As % of CIF | 2.7% | 0.91% | -1.79% |

### Full Portfolio Impact (863.5 MWh)

| Metric | Old (2.7%) | New (0.9%) | Savings |
|--------|------------|------------|---------|
| Total Duty | €2,286,506 | €767,673 | **€1,518,833** |
| Per MWh | €2,648 | €889 | **€1,759** |

---

## 6. DOCUMENTATION FOR CUSTOMS

### Required for Customs Clearance

| Document | Purpose | Status |
|----------|---------|--------|
| Commercial Invoice | Value per component | Linyang to provide |
| Packing List | Container contents | Linyang to provide |
| Bill of Lading | Shipment details | Shipping line |
| Certificate of Origin | China origin | Linyang to provide |
| TARIC Classification | Duty rate basis | See above |

### Recommended Invoice Structure

Request Linyang to itemize invoices showing:

```
Line 1: Battery Energy Storage Containers (ME 5.015 MWh)
        Qty: X units
        HS Code: 8507 60 00 90
        Value: €XXX,XXX
        
Line 2: Power Conversion Systems (BCS1250K-C-HUD)
        Qty: X units
        HS Code: 8504 40
        Value: €XXX,XXX
        
Line 3: MV Transformers (10MVA, oil-immersed)
        Qty: X units
        HS Code: 8504 22
        Value: €XXX,XXX
        
Line 4: MV Switchgear (ABB/Schneider)
        Qty: X sets
        HS Code: 8537 20
        Value: €XXX,XXX
```

---

## 7. VAT TREATMENT

| Item | Rate | Treatment |
|------|------|-----------|
| **Import VAT** | 19% | Payable on (CIF + Duty) |
| **Recovery** | 100% | Recoverable as input VAT |
| **Cash Flow Impact** | ~2-3 months | Until VAT return filed |

### VAT Calculation

```
IMPORT_VAT = (CIF + DUTY) × 0.19
           = (€84,685,405 + €767,673) × 0.19
           = €85,453,078 × 0.19
           = €16,236,085 (fully recoverable)
```

---

## 8. RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|------|--------|------------|
| Customs reclassification | Higher duty | Pre-ruling from Cyprus Customs |
| Invoice not itemized | Flat rate applied | Request itemized invoice from Linyang |
| Transformer type unclear | Wrong rate | Confirm liquid vs dry type |
| Switchgear origin | Duty may apply | Verify EU origin certificates |

---

## 9. ACTION ITEMS

- [ ] Request itemized commercial invoices from Linyang (per component line)
- [ ] Confirm transformer type (liquid dielectric vs dry)
- [ ] Confirm switchgear origin (EU vs China)
- [ ] Consider Binding Tariff Information (BTI) from Cyprus Customs
- [ ] Update EPC model to use 0.9% weighted rate
- [ ] Brief customs agent on correct classifications

---

## 10. REVISION HISTORY

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-27 | 1.0 | Initial weighted duty model replacing 2.7% flat rate | Lighthief |

---

## 11. SUMMARY

**For Internal Costing:**
```
Import Duty = CIF × 0.009 (0.9% weighted blended rate)
```

**For Client/Investor Facing:**
> "Customs duty applies only to MV transformers (3.7%); 
> LFP batteries and PCS are duty-free under EU TARIC classifications 
> 8507 60 00 90 and 8504 40 respectively."

**Portfolio Impact:**
> Correcting from 2.7% to 0.9% saves approximately **€1.52M** across the 863.5 MWh portfolio.
