# GROUP RFI TRACKER: Esperia Energy Group (Abio)

**Document Reference:** LCY-INTERNAL-RFI-001
**Version:** 1.0
**Date:** January 2026
**Purpose:** Track all RFI questions from the group and documentation status for final offering

---

## EXECUTIVE SUMMARY

| Category | Total Items | ✅ Complete | ⚠️ Partial | 🔴 Outstanding |
|----------|-------------|-------------|------------|----------------|
| **Guarantees & Risk** | 6 | 4 | 2 | 0 |
| **Technical Specs** | 5 | 5 | 0 | 0 |
| **Compliance & Regulatory** | 4 | 4 | 0 | 0 |
| **Commercial** | 3 | 3 | 0 | 0 |
| **TOTAL** | **18** | **16** | **2** | **0** |

---

## 1. GUARANTEES & RISK MITIGATION

### 1.1 Competitor Guarantee Comparison ✅ COMPLETE

**Question:** What guarantees does the competitor (Sunwoda) offer and can we match?

**Documentation:** `docs/internal/guarantee-comparison.md`

| Guarantee | Status | Document Reference |
|-----------|--------|-------------------|
| Advance Payment Guarantee (APG) | 🔴 GAP - Need to source | guarantee-comparison.md §2.1 |
| Step-in Rights | ⚠️ PARTIAL - Can enhance | guarantee-comparison.md §2.2 |
| Delay Liquidated Damages | ✅ MATCHED | legal/client_sales.md §8.4 |
| Performance Bond/Retention | ✅ MATCHED (5% vs 10%) | legal/client_sales.md §7.4 |
| Availability Warranty | ✅ MATCHED (97%, 98% available) | legal/ClientLTSA.md §9 |
| SOH Performance Warranty | ✅ MATCHED | legal/ClientLTSA.md §10 |

---

### 1.2 Step-In Rights for Key Suppliers (Eve, Kehua) ⚠️ PARTIAL

**Question:** Will you offer Step-in rights for warranties for key suppliers (Eve, Kehua) in case of EPC bankruptcy? Bank may require this.

**Status:** ⚠️ PARTIAL - Current structure provides indirect coverage; formal step-in can be offered for large projects

**Documentation:** `docs/internal/guarantee-comparison.md` §2.2, §4 Gap 2

**Current Position:**
| Supplier | Relationship | Current Coverage | Step-In Available |
|----------|--------------|------------------|-------------------|
| **Eve (Cells)** | Linyang shareholder in Eve | OEM warranty via Linyang | ⚠️ Indirect - strong alignment |
| **Kehua (PCS)** | Supplied via Linyang | OEM warranty via Linyang | ⚠️ Indirect |
| **Linyang** | Distributor agreement | €5M product liability, manufacturing defect indemnity | ✅ Direct |

**Enhanced Offering (For Bank Comfort):**
1. **Tripartite Agreement** - For projects >€2M
2. **Collateral Warranty** - Linyang warranty direct to end customer
3. **Documented Step-In Procedure** - In EPC Schedule

**Recommended Response:**
> *"We confirm the following step-in rights structure:*
> - *Linyang is a strategic shareholder in Eve (cell manufacturer), ensuring supply chain continuity*
> - *All OEM warranties pass through via LTSA with Lighthief facilitating claims*
> - *For bank-financed projects, we can provide tripartite agreement and collateral warranty from Linyang*
> - *€5M product liability insurance provides additional protection*"

**Action Required:** 
- [ ] Confirm with Linyang: Availability of collateral warranty for end customers
- [ ] Draft tripartite agreement template

---

### 1.3 Advance Payment Guarantee (APG) 🔴 GAP → ACTION REQUIRED

**Question:** (From competitor comparison) Can we offer APG for deposits?

**Status:** 🔴 NOT CURRENTLY OFFERED

**Documentation:** `docs/internal/guarantee-comparison.md` §2.1, §4 Gap 1

**Action Required:**
- [ ] Contact APG insurance providers (Trygg Hansa, Atradius, Euler Hermes)
- [ ] Obtain quote for 0.5-1.5% annual premium
- [ ] Add APG as optional line item in quotations

---

## 2. TECHNICAL SPECIFICATIONS

### 2.1 DC Efficiency Degradation over 20 Years ✅ COMPLETE

**Question:** What is the DC efficiency degradation over 20 years?

**Documentation:** `docs/linyang.md` §2 (Degradation Curve Data)

**Summary Data (0.5P, 1 CPD - Standard Operation):**

| Year | SOH (%) | Cumulative Cycles | Annual Degradation |
|------|---------|-------------------|-------------------|
| 0 | 98.50% | 0 | - |
| 1 | 94.46% | 365 | 4.04% |
| 2 | 91.58% | 730 | 2.88% |
| 3 | 89.69% | 1,095 | 1.89% |
| 5 | 86.50% | 1,825 | ~1.5% avg |
| 10 | **79.16%** | 3,650 | ~1.5% avg |
| 15 | **74.14%** | 5,475 | ~1.0% avg |
| 17 | **70.27%** (EOL) | 6,205 | - |
| 20 | ~66-68% | 7,300 | extrapolated |

**Key Metrics:**
- **First year degradation:** 4.04% (initial settling, higher than subsequent years)
- **Average annual (Yr 2-17):** 1.59%
- **10-year capacity retention:** ~79%
- **15-year capacity retention:** ~74%
- **EOL (70% SOH):** ~Year 17

**Operating Condition Comparison:**

| Condition | P-Rate | Cycles/Day | Years to 70% EOL | Total Cycles |
|-----------|--------|------------|------------------|--------------|
| Conservative | 0.25P | 1 | ~18 years | 6,570 |
| Moderate | 0.25P | 2 | ~12 years | 8,760 |
| **Standard** | 0.5P | 1 | **~17 years** | 6,205 |
| Aggressive | 0.5P | 2 | ~10 years | 7,300 |

**Cell-level vs System-level Efficiency:**
- **Cell RTE:** 94% @ 0.5P
- **System RTE (DC):** 93%
- **AC-to-AC RTE:** 87.8% (including PCS losses)

> **Note:** AC-to-AC RTE remains relatively stable over lifecycle with proper maintenance. The degradation figures above relate to energy capacity (SOH), not conversion efficiency.

---

### 2.2 TSO BESS Compliance ✅ COMPLETE

**Question:** Does Linyang meet TSO BESS requirements (ANNEX-II-Appendix-2)?

**Documentation:** 
- `docs/CyprusDSO.md` §13-15 (TSO Requirements)
- `docs/linyang.md` §11 (TSO Compliance Verification)

**Summary:**
| Requirement | Linyang/Kehua Value | Status |
|-------------|---------------------|--------|
| RTE ≥ 80% (BoL) | 87.8% | ✅ Compliant |
| RTE ≥ 75% (10-year) | ~82% estimated | ✅ Compliant |
| Availability ≥ 92% | 97% with LTSA | ✅ Exceeds |
| Cycle Life ≥ 7,300 | 6,000-8,000 | ✅ Compliant |
| Temp Range -10°C to +45°C | -35°C to +55°C | ✅ Exceeds |
| Sub-second Response | Millisecond-level | ✅ Compliant |
| UL 9540A (All Levels) | Cell/Module/Unit PASSED | ✅ Compliant |

---

### 2.3 EMS Partner Options ✅ COMPLETE

**Question:** What EMS options are available?

**Documentation:** `docs/linyang.md` §10 (Partner EMS Options)

**Options:**
| Provider | Region | Key Features |
|----------|--------|--------------|
| **AXOS by AXSOL** | Germany | ISO 27001, NIS2, multi-use optimization |
| **Voltus** | US/Canada | Distributed energy, demand response |

---

### 2.4 PCS Specifications (Kehua) ✅ COMPLETE

**Question:** What are the PCS specifications and efficiency curves?

**Documentation:** `docs/linyang.md` §6 (PCS Specifications)

**Key Specs - BCS1250K-C-HUD:**
| Parameter | Value |
|-----------|-------|
| Rated Power | 1,250 kW AC |
| Max Efficiency | 98.8% |
| Euro Efficiency | 98.5% |
| Power Factor | 0.9 leading to 0.9 lagging |
| THD (Current) | <3% |
| Response Time | <30ms (100% step) |

---

### 2.5 Container Specifications ✅ COMPLETE

**Question:** Full technical specifications for 5MWh container?

**Documentation:** `docs/linyang.md` §3 (Container Specifications)

**Key Specs - ME 5.015:**
| Parameter | Value |
|-----------|-------|
| Rated Energy | 5,015 kWh |
| Rated Power | 1,250 kW @ 0.5C |
| Dimensions | 6,058 × 2,438 × 2,896 mm |
| Weight | ~41.5 tonnes |
| Cells | 104S × 48P × 8 clusters |
| Cooling | 45kW liquid cooling |
| Fire Suppression | Aerosol + backup |

---

## 3. COMPLIANCE & REGULATORY

### 3.1 DSO/TSO Grid Connection Requirements ✅ COMPLETE

**Question:** What are Cyprus DSO/TSO requirements for BESS?

**Documentation:** `docs/CyprusDSO.md` (Full document)

**Key Sections:**
- §2: BESS System Categories (A, B, C)
- §3: Protection Settings
- §4: SCADA Requirements
- §13-15: TSO BESS Specifications
- §16-17: RES Connection Requirements

---

### 3.2 Building Permit Exemptions (New Law 2026) ✅ COMPLETE

**Question:** What are the new 2026 building permit requirements?

**Documentation:** `docs/CyprusDSO.md` §18 (Building & Planning Permit Exemptions)

**Source:** Κ.Δ.Π. 15/2026 and Κ.Δ.Π. 17/2026, Official Gazette No. 5992, January 16, 2026

**Key Points:**
- Building/Planning permits **deemed issued** when conditions met
- 33 conditions covering general, fire, environment, labour requirements
- **Min 6m setback** from boundaries
- **Max 3m height** (including HVAC)
- **6m fire access perimeter**
- **Reinforced concrete foundation** required

---

### 3.3 Linyang Certification Status ✅ COMPLETE

**Question:** What certifications does Linyang have for EAC compliance?

**Documentation:** `docs/CyprusDSO.md` §12 (Certification Status Matrix)

**Summary:**
| Certification | Status | Notes |
|---------------|--------|-------|
| UL 9540A (Cell) | ✅ PASSED | Report 4791099276 |
| UL 9540A (Module) | ✅ PASSED | Report 80239433 |
| UL 9540A (Unit) | ✅ PASSED | Report 80239432 |
| IEC 62619 | ✅ CB Certificate | LFP Battery Safety |
| IEC 63056 | ✅ CB Certificate | Battery Systems Safety |
| UN38.3 | ✅ PASSED | Transport compliance |
| EN 50549-2 | 🔴 CRITICAL GAP | Request from Kehua |

---

### 3.4 RES Connection Requirements ✅ COMPLETE

**Question:** What are the DSO RES connection technical requirements?

**Documentation:** `docs/CyprusDSO.md` §16-17 (RES Connection Requirements)

**Key Standards:**
- VDE-AR-N 4105:2018-11 (< 120kWp LV)
- VDE-AR-N 4110:2018-11 (120kWp - 8MWp MV)
- BDEW 2008 guidelines

---

## 4. COMMERCIAL

### 4.1 Pricing Structure ✅ COMPLETE

**Question:** What is the pricing structure for BESS?

**Documentation:** `docs/internal/_index.md`, `docs/internal/pricing-verification.md`

**Four-Tier Structure:**
| Tier | Description | Markup |
|------|-------------|--------|
| CIF | Linyang equipment | Base |
| Installed | CIF + EPC adders | +€100-170k |
| Client | Group order price | +17.4% |
| Non-Group | Public price | +12% additional |

---

### 4.2 EPC Cost Verification ✅ COMPLETE

**Question:** What are verified EPC costs?

**Documentation:** `docs/internal/pricing-verification.md`

**Verified Items:**
- ✅ Port offloading + Inland transport: €2,360/container (A. Soulis quote)
- ✅ Formula validated for 10 containers @ €23,600

---

### 4.3 End-of-Life Management ✅ COMPLETE

**Question:** What happens at end of battery life?

**Documentation:** `docs/linyang.md` §10.2 (End-of-Life Management)

**Lighthief Second Life & Recycling Program:**
- **Launch:** Q1 2026
- **Second Life:** Repurposing 70-80% SOH batteries
- **Recycling:** EU-certified recycler (TBD)
- **Decommissioning:** Full service included

---

## 5. OUTSTANDING ACTIONS

### High Priority 🔴

| # | Item | Owner | Due | Status |
|---|------|-------|-----|--------|
| 1 | Source APG insurance quotes | TBD | ASAP | 🔴 Not started |
| 2 | Request EN 50549-2 certificate from Kehua | TBD | ASAP | 🔴 Not started |

### Medium Priority 🟡

| # | Item | Owner | Due | Status |
|---|------|-------|-----|--------|
| 3 | Confirm step-in/collateral warranty with Linyang | TBD | Before contract | 🟡 Pending |
| 4 | Draft tripartite agreement template | Legal | Before large project | 🟡 Pending |
| 5 | Confirm 98% availability pricing with Linyang | TBD | Before competitive bid | 🟡 Pending |

### Completed ✅

| # | Item | Completed | Documentation |
|---|------|-----------|---------------|
| 1 | Competitor guarantee comparison | Jan 2026 | guarantee-comparison.md |
| 2 | 20-year degradation data | Jan 2026 | linyang.md §2 |
| 3 | TSO compliance verification | Jan 2026 | CyprusDSO.md §13-15, linyang.md §11 |
| 4 | New building permit law (Κ.Δ.Π. 15/17/2026) | Jan 2026 | CyprusDSO.md §18 |
| 5 | Haulage cost verification | Jan 2026 | pricing-verification.md |
| 6 | EMS partner options | Jan 2026 | linyang.md §10 |
| 7 | End-of-life program | Jan 2026 | linyang.md §10.2 |

---

## 6. FINAL OFFERING CHECKLIST

Before submitting final offering to group, ensure:

### Technical Documents ✅
- [x] Full degradation curves (20-year projection)
- [x] Container specifications (ME 5.015)
- [x] PCS specifications (BCS1250K-C-HUD)
- [x] System RTE data (87.8% AC-to-AC)
- [x] Certification summary

### Commercial Documents ✅
- [x] Pricing breakdown
- [x] EPC cost verification
- [x] LTSA pricing (O&M + availability + SOH)

### Legal Documents ⚠️
- [x] EPC Agreement template
- [x] LTSA template
- [ ] Step-in rights documentation (if requested)
- [ ] APG offering (if requested)

### Compliance Documents ✅
- [x] DSO/TSO requirements summary
- [x] Building permit requirements (new 2026 law)
- [x] Certification status matrix
- [x] Linyang compliance verification

---

## 7. DOCUMENT CROSS-REFERENCE

| Topic | Primary Document | Secondary |
|-------|-----------------|-----------|
| Degradation/SOH | linyang.md §2 | ClientLTSA.md §10 |
| Guarantees | guarantee-comparison.md | client_sales.md, ClientLTSA.md |
| Step-in Rights | guarantee-comparison.md §2.2, §4.2 | distribution.md, sales_agrement.md |
| TSO Compliance | CyprusDSO.md §13-15 | linyang.md §11 |
| Building Permits | CyprusDSO.md §18 | - |
| Pricing | pricing-verification.md | _index.md |
| EMS Options | linyang.md §10 | - |
| End-of-Life | linyang.md §10.2 | ClientLTSA.md |

---

*Document prepared by: Lighthief Cyprus Ltd*
*Classification: INTERNAL - CONFIDENTIAL*
*Last Updated: January 2026*
