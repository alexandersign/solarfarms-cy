> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 7 February 2026*

---

# BESS Pricing & Data Verification Tracker

> **INTERNAL USE ONLY - ADMIN ACCESS REQUIRED**
> **Last Updated**: January 23, 2026
> **Status**: 🔴 VERIFICATION REQUIRED

---

## Pricing Structure Overview

### Four-Tier Pricing Model

```
┌─────────────────────────────────────────────────────────────────────┐
│  TIER 1: CIF (Linyang)                                              │
│  └── Equipment cost from Linyang (group order discount)             │
│                                                                     │
│  TIER 2: Installed Cost (Your Cost Basis)                           │
│  └── CIF + All EPC Turnkey Adders                                   │
│                                                                     │
│  TIER 3: Client Price (Group Order Members)                         │
│  └── Installed Cost + 17.4% Margin                                  │
│                                                                     │
│  TIER 4: Non-Group Price (Prospects / Public Facing)                │
│  └── Client Price + 12%                                             │
└─────────────────────────────────────────────────────────────────────┘
```

### Example Calculation (10 MWh Project)

| Tier | Calculation | Price | €/kWh |
|------|-------------|-------|-------|
| CIF (Linyang) | Base | €904,563 | €90.17 |
| Installed Cost | CIF + €112,280 adders | €1,041,267 | €104.13 |
| Client Price | Installed × 1.174 | €1,222,144 | €122.21 |
| Non-Group Price | Client × 1.12 | €1,368,801 | €136.88 |

---

## EPC Turnkey Adders - VERIFICATION STATUS

### 🔴 HIGH PRIORITY - Requires Quotation Verification

| Cost Item | Current Estimate | Verification Status | Source | Notes |
|-----------|------------------|---------------------|--------|-------|
| **Import Duty** | 2.7% of CIF | ⚠️ VERIFY | Estimate | Confirm actual duty rate for Cyprus |
| **Mechanical Installation** | €20k-€70k | ⚠️ VERIFY | Estimate | Need contractor quotes |
| **Commissioning** | €32k-€80k | ⚠️ VERIFY | Estimate | Linyang vs local commissioning costs |
| **Inland Transport** | **€2,360/container** | ✅ **VERIFIED** | A. Soulis | Limassol-Larnaca route |

### 🟡 MEDIUM PRIORITY - Review When Possible

| Cost Item | Current Estimate | Verification Status | Source | Notes |
|-----------|------------------|---------------------|--------|-------|
| Port & Customs | €4k-€24k | ⚠️ REVIEW | Estimate | Based on container count |
| LV Cabling | €1.4k-€35k | ⚠️ REVIEW | Estimate | Varies by MW rating |
| MV Cabling | €3.5k-€7k | ⚠️ REVIEW | Estimate | Per project |
| MV Terminations | €2.2k-€4.4k | ⚠️ REVIEW | Estimate | Based on MV Skid count |
| Protection Engineering | €5k-€6k | ⚠️ REVIEW | Estimate | DSO requirements impact |

### 🟢 LOW PRIORITY - Standard Costs

| Cost Item | Current Estimate | Verification Status | Source | Notes |
|-----------|------------------|---------------------|--------|-------|
| Remote Trip | €3,000 | ✅ Standard | Fixed | Per project |
| Export Logic | €2,000 | ✅ Standard | Fixed | Per project |
| UPS/Aux | €2,000 | ✅ Standard | Fixed | Per project |
| SCADA/RTU | €5,000 | ✅ Standard | Fixed | Per project |
| Docs & Compliance | €7,000 | ✅ Standard | Fixed | Per project |
| Insurance | 0.75% of CIF | ✅ **VERIFIED** | Agent confirmed | Scales with project CIF value |
| Fire & Lightning | €800 | ✅ Standard | Fixed | Per project |
| CERA License | €0.10/kWh | ✅ Standard | CERA | Regulatory fee |

---

## Cost Formula Reference

### Per-Project Adders Calculation

```
Import Duty         = CIF × 0.027
Port & Customs      = €4,000 base + (containers × €1,000)
Inland Transport    = containers × €2,360              ✅ VERIFIED (A. Soulis)
Mechanical Install  = €20,000 base + (MW × €2,500)
LV Cabling          = MW × €1,400
MV Cabling          = €3,500 per MV Skid
MV Terminations     = €2,200 per MV Skid
Protection Eng      = €5,000 base (€6,000 if >5MW)
Remote Trip         = €3,000 fixed
Export Logic        = €2,000 fixed
UPS/Aux             = €2,000 fixed
SCADA/RTU           = €5,000 fixed
CERA License        = MWh × €100
Commissioning       = €30,000 base + (MWh × €500)
Docs & Compliance   = €7,000 fixed
Insurance           = CIF × 0.75% (verified Feb 2026)
Fire & Lightning    = €800 fixed
PCC Bay Extension   = €0 (if not required)
```

> **Note**: Inland Transport formula validated for Limassol-Larnaca route (~30km).
> For longer routes, add €50/km beyond 30km per container (estimate - verify).

---

## Quotation Tracking

### Pending Quotations Required

| Vendor/Service | Purpose | Priority | Status | Assigned |
|----------------|---------|----------|--------|----------|
| Freight Forwarder | CIF Limassol port rates | HIGH | 🔴 Pending | - |
| Customs Broker | Import duty confirmation | HIGH | 🔴 Pending | - |
| Local EPC | Installation labor rates | HIGH | 🔴 Pending | - |
| ~~Transport Company~~ | ~~Inland delivery rates~~ | ~~MEDIUM~~ | ✅ **Verified** | A. Soulis |
| ~~Insurance Broker~~ | ~~Project insurance rates~~ | ~~MEDIUM~~ | ✅ **Verified** | Agent — 0.75% of CIF |
| Linyang | Commissioning service fees | MEDIUM | 🔴 Pending | - |
| A. Soulis | Quotes for other routes (Nicosia, Paphos) | LOW | 🟡 Request | - |

### Received Quotations

| Date | Vendor | Service | Valid Until | Status |
|------|--------|---------|-------------|--------|
| 2024-11-07 | **A. Soulis Special Lifting** | Port offload + Inland transport | TBC | ✅ **Verified** |

---

## Verified: Port Offloading & Inland Transport (A. Soulis)

> **Source**: Stephanos Soulis email quote, 7 Nov 2024
> **Contact**: stephanos@souliscranes.com, +357 99522736
> **Vendor**: A. SOULIS Special Lifting / Heavy Haulage

### Quote Details

| Parameter | Value |
|-----------|-------|
| **Route** | Limassol Port → Ayios Kendeas |
| **Service** | Transport + Unload (2 days) |
| **Total Price** | **€23,600** |
| **Container Count** | 10 containers |
| **Cost per Container** | **€2,360** |

### Container Breakdown

| Type | Qty | Dimensions (m) | Weight | Contents (Likely) |
|------|-----|----------------|--------|-------------------|
| 20' High Cube | **6** | 6.06 × 2.44 × 2.89 | **43 tonnes** | Battery containers (ME 5.015 MWh) |
| 20' Standard | **4** | 6.06 × 2.44 × 2.59 | **15 tonnes** | PCS/MV Skid/Aux components |
| **TOTAL** | **10** | - | **318 tonnes** | - |

### Configuration Mapping

| Component | Containers | Unit Weight | Total Weight | Notes |
|-----------|------------|-------------|--------------|-------|
| Battery (ME 5.015 MWh) | 6 | ~41-43t | ~258t | Matches Linyang spec |
| MV Skid / PCS Units | 4 | ~15t | ~60t | Smaller MV Skid configs |
| **Total System** | 10 | - | **318t** | ~30 MWh / ~7.5MW |

### Validated System Configuration

| Parameter | Value |
|-----------|-------|
| **Energy Capacity** | 6 × 5.015 MWh = **30.09 MWh** |
| **Power Rating** | ~7.5 MW (estimated from MV Skid count) |
| **Duration** | ~4 hours |
| **Project** | Ayios Kendeas (likely Agios Theodoros) |

### Formula Validation

| Method | Calculation | Result | Variance |
|--------|-------------|--------|----------|
| **Current Formula** | €4,720 + (10 × €2,360) | €28,320 | +€4,720 |
| **Actual Quote** | 10 containers | €23,600 | - |
| **Per-Container Only** | 10 × €2,360 | €23,600 | ✅ **Exact Match** |

### Recommended Formula Update

```
# OLD FORMULA (Over-estimates by €4,720 for Limassol-Larnaca routes)
Inland Transport = €4,720 base + (containers × €2,360)

# VALIDATED FORMULA (A. Soulis quote)
Inland Transport = containers × €2,360

# Note: Base cost may apply for longer routes or special access requirements
```

### Route Distance Assumptions

| Route | Distance | Base Cost | Per-Container |
|-------|----------|-----------|---------------|
| Limassol → Ayios Kendeas | ~30 km | €0 | €2,360 |
| Limassol → Nicosia | ~70 km | TBC | TBC |
| Limassol → Paphos | ~70 km | TBC | TBC |
| Limassol → Famagusta area | ~100 km | TBC | TBC |

> ⚠️ **Note**: Request quotes for other routes to validate distance-based pricing.

### Quick Reference: Transport Costs by Project Size

| Project Size | Battery Containers | PCS/MV Containers | Total | Transport Cost |
|--------------|-------------------|-------------------|-------|----------------|
| **5 MWh** | 1 (ME 5.015) | 1 | 2 | €4,720 |
| **10 MWh** | 2 (ME 5.015) | 1-2 | 3-4 | €7,080-€9,440 |
| **20 MWh** | 4 (ME 5.015) | 2 | 6 | €14,160 |
| **30 MWh** | 6 (ME 5.015) | 4 | 10 | **€23,600** ✅ |
| **40 MWh** | 8 (ME 5.015) | 4-5 | 12-13 | €28,320-€30,680 |
| **100 MWh** | 20 (ME 5.015) | 8-10 | 28-30 | €66,080-€70,800 |
| **133 MWh** | 27 (ME 5.015) | 10-12 | 37-39 | €87,320-€92,040 |

> **Formula**: Total Containers × €2,360 = Inland Transport Cost (Limassol-Larnaca route)

---

## Margin Verification

### Current Assumptions

| Parameter | Value | Status | Notes |
|-----------|-------|--------|-------|
| Group Order Margin | 17.4% | ⚠️ VERIFY | On installed cost |
| Non-Group Markup | 12.0% | ✅ Confirmed | On client price |
| LTSA Margin | TBD | 🔴 Pending | Need LTSA cost structure |

### Margin Analysis (Sample 40 MWh Project)

| Line Item | Amount |
|-----------|--------|
| CIF (Linyang) | €3,457,027 |
| Adders Total | €190,600 |
| **Installed Cost** | **€3,647,627** |
| Margin (17.4%) | €634,687 |
| **Client Price** | **€4,282,314** |
| Non-Group Markup (12%) | €513,878 |
| **Non-Group Price** | **€4,796,192** |

---

## RFI Tracking

### Linyang RFI Status

See: [linyang.md - Section 11: Request for Information](../linyang.md#11-request-for-information-rfi)

| Document | Priority | Status | Date Requested | Response |
|----------|----------|--------|----------------|----------|
| MV Skid Datasheets (1-8MW) | HIGH | 🔴 Pending | - | - |
| MV Transformer Datasheets | HIGH | 🔴 Pending | - | - |
| LVRT/HVRT Curves | HIGH | 🔴 Pending | - | - |
| EN 50549-2 Certificate | HIGH | 🔴 Pending | - | - |
| IEC 104 Point List | MEDIUM | 🔴 Pending | - | - |

---

## Compliance Documentation Status

### Per-Project Requirements

| Requirement | Template | Status | Notes |
|-------------|----------|--------|-------|
| DSO Application (Appendix I) | ⚠️ Draft | Need Linyang specs | |
| Grid Code Compliance | ⚠️ Draft | Need certificates | |
| Fire Safety | 🔴 Pending | - | |
| Environmental Permit | 🔴 Pending | Project-specific | |
| CERA License | ✅ Template | Standard process | |

---

## Future Admin System Requirements

### Phase 2: Admin Dashboard Features

1. **Quotation Generator**
   - Input: Project size (MW/MWh)
   - Auto-calculate: All 4 pricing tiers
   - Export: PDF quotation with branding

2. **RFI Tracker**
   - Linyang documentation requests
   - Response tracking
   - Document repository

3. **Compliance Tracker**
   - Per-project checklist
   - DSO submission status
   - Certificate management

4. **Knowledge Base**
   - Technical specifications
   - Installation guides
   - Troubleshooting docs

5. **Client Portal**
   - Project status
   - Document downloads
   - Communication log

---

## Action Items

### Immediate (This Week)

- [ ] Request freight quotation for CIF Limassol
- [ ] Confirm import duty rate with customs broker
- [ ] Get mechanical installation quotes from 2-3 contractors
- [ ] Send RFI to Linyang for missing datasheets

### Short-term (This Month)

- [ ] Verify all adder estimates with actual quotes
- [ ] Update client files with verified pricing
- [ ] Prepare DSO application template
- [ ] Complete compliance documentation checklist

### Medium-term (Q1 2026)

- [ ] Build admin dashboard MVP
- [ ] Implement quotation generator
- [ ] Create RFI tracking system
- [ ] Establish document repository

---

## Change Log

| Date | Change | By |
|------|--------|-----|
| 2026-01-23 | Initial document creation | System |
| 2026-01-23 | Added A. Soulis haulage quote: €2,360/container verified for Limassol-Larnaca route. Updated inland transport formula. | AI Assistant |
