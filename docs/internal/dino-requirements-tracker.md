# DINO REQUIREMENTS TRACKER

**Document Reference:** LCY-DINO-REQ-001
**Date:** January 2026
**Source:** Dino's consolidated response (Esperia Energy Group)
**Purpose:** Track coverage of all requirements for contract schedules and appendices

---

## EXECUTIVE SUMMARY

| Category | Total Items | ✅ Covered | ⚠️ Partial | 🔴 Outstanding |
|----------|-------------|------------|------------|----------------|
| Civil & Ground Works | 1 | 0 | 0 | 1 |
| Electrical & Auxiliary | 4 | 2 | 1 | 1 |
| EMS, SCADA & Software | 3 | 1 | 1 | 1 |
| Operations & Maintenance | 3 | 2 | 0 | 1 |
| Warranties & Bonds | 5 | 3 | 1 | 1 |
| Availability & Performance | 3 | 2 | 0 | 1 |
| Delay, Shipping & LDs | 3 | 1 | 0 | 2 |
| Legal & Jurisdiction | 3 | 3 | 0 | 0 |
| **TOTAL** | **25** | **14** | **3** | **8** |

---

## 1. CIVIL & GROUND WORKS 🔴 NOT COVERED

### Dino's Requirement:
> For the 49 m × 18 m site with SWM layout and a 20-foot container, the civil scope should explicitly include full ground preparation. This consists of geotextile/nylon layer, crusher run, compaction, secondary nylon separation, followed by metallic reinforcement where applicable. The formation level should be defined as 20 cm excavation below finished level and 20 cm build-up above, with compaction to engineering standard. The crusher run specification should be tightened to 5/10 aggregate compacted to a minimum of 130 kN/m² bearing capacity. Civil and ground works must be explicitly included in the EPC scope and priced, not assumed.

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Site dimensions (49m × 18m) | 🔴 **NOT SPECIFIED** | - | Define per project |
| Geotextile/nylon layer | 🔴 **NOT SPECIFIED** | - | Add to EPC scope |
| Crusher run (5/10 aggregate) | 🔴 **NOT SPECIFIED** | - | Add to EPC scope |
| 130 kN/m² bearing capacity | 🔴 **NOT SPECIFIED** | - | Add to EPC scope |
| Formation level (20cm excavation + 20cm build-up) | 🔴 **NOT SPECIFIED** | - | Add to EPC scope |
| Metallic reinforcement | 🔴 **NOT SPECIFIED** | - | Add to EPC scope |
| Civil works pricing | 🔴 **NOT PRICED** | Group quote excludes | Add to EPC pricing |

**Note:** Group quote explicitly **EXCLUDES** "Plot levelling, cable channels/sand and construction of concrete bases"

**Documentation Gap:** Need civil works specification and pricing in EPC scope

---

## 2. ELECTRICAL & AUXILIARY EQUIPMENT

### 2.1 Auxiliary Transformer 🔴 NOT COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Aux transformer model | 🔴 **NOT SPECIFIED** | - | Request from Linyang |
| Electrical specifications | 🔴 **NOT SPECIFIED** | - | Request from Linyang |
| Rating | 🔴 **NOT SPECIFIED** | linyang-rfi-tracker.md §5.1 | Pending RFI |
| RNU responsibility | 🔴 **NOT DEFINED** | - | Clarify in EPC |

**In RFI Tracker:** Yes - "Auxiliary power consumption table" is pending

### 2.2 SCADA Provider ⚠️ PARTIAL

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| SCADA responsibility | ⚠️ **PARTIAL** | linyang.md §10 | Confirm Honeywell |
| Interface boundaries (PCS/BESS/EMS) | 🔴 **NOT DEFINED** | - | Define in spec |
| Honeywell confirmation | 🔴 **NOT CONFIRMED** | - | Confirm or specify |

**Current Status:** 
- Linyang CIF explicitly excludes SCADA
- Partner EMS options (AXOS, Voltus) documented
- Honeywell not mentioned in our documentation

### 2.3 Grid-Forming Mode ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| TRU in grid-forming mode | ✅ **DOCUMENTED** | linyang.md §6 | Include in tech schedule |
| PCS in grid-forming mode | ✅ **DOCUMENTED** | linyang.md §6 | Include in tech schedule |
| BESS in grid-forming mode | ✅ **DOCUMENTED** | linyang.md §6 | Include in tech schedule |

**Documentation:** linyang.md §6 confirms: "Grid-forming functions including VSG, Black-Start, VF and PQ modes"

### 2.4 C-Series PCS ✅ CONFIRMED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Kehua C-series PCS | ✅ **CONFIRMED** | pricing-gap-analysis.md | None |

**Confirmed by Kamil (Jan 2026):** All Kehua PCS are C-series (BCS1250K-**C**-HUD)

---

## 3. EMS, SCADA & SOFTWARE

### 3.1 EMS Cost Inclusion ⚠️ PARTIAL

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| EMS in LTSA or separate? | ⚠️ **UNCLEAR** | linyang.md §5.3 | Clarify pricing |
| EMS software licensing | 🔴 **NOT SPECIFIED** | - | Add to LTSA |
| Cybersecurity patches | ⚠️ **PARTIAL** | linyang.md §10 | AXOS is NIS2 compliant |
| Long-term support | 🔴 **NOT SPECIFIED** | - | Add to LTSA |

**Current Status:**
- EMS is explicitly **EXCLUDED** from Linyang CIF
- Group quote shows EMS System at €5,600 (€280/MWh)
- Partner EMS (AXOS) documented but not integrated into LTSA

### 3.2 SCADA Ownership 🔴 NOT COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| SCADA ownership | 🔴 **NOT DEFINED** | - | Define in contract |
| Hosting | 🔴 **NOT DEFINED** | - | Define in contract |
| Data access rights | 🔴 **NOT DEFINED** | - | Define in contract |
| Honeywell as provider | 🔴 **NOT CONFIRMED** | - | Confirm or specify |

---

## 4. OPERATIONS & MAINTENANCE

### 4.1 O&M Cost ✅ COVERED (BUT DIFFERENT FIGURE)

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| O&M fixed at €1,750/year | ⚠️ **DIFFERENT** | linyang.md §5.3 | Reconcile figures |
| Monitoring | ✅ **INCLUDED** | linyang.md §5.3 | - |
| Local servicing | ✅ **INCLUDED** | linyang.md §5.3 | - |
| Routine inspection | ✅ **INCLUDED** | linyang.md §5.3 | - |
| Cleaning/polishing | 🔴 **NOT SPECIFIED** | - | Add to O&M scope |

**Current LTSA Pricing (per MWh/year):**
| Service | Linyang Price | Dino Request |
|---------|---------------|--------------|
| BESS O&M | €1,157.62 | - |
| PCS + MVS O&M | €1,311.97 | - |
| **Total Core O&M** | **€2,469.59** | **€1,750** |

**Gap:** Dino requests €1,750/year, our LTSA shows €2,469.59/MWh/year

### 4.2 Recycling Fees ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Recycling in O&M cost | ✅ **COVERED** | linyang.md §10.2 | Confirm in contract |

**Documentation:** Lighthief Second Life & Recycling Program (Q1 2026)
- Cyprus Law (Κ.Δ.Π. 15/2026) requires battery recycling in licensed facilities
- CyprusDSO.md §18: "Battery recycling in licensed facilities (Cyprus or EU)"

### 4.3 O&M Scope Alignment 🔴 NOT ALIGNED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Align O&M to €1,750 | 🔴 **GAP** | - | Negotiate or clarify |

---

## 5. WARRANTIES & BONDS

### 5.1 Warranty Bond ⚠️ PARTIAL

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Warranty Bond by Linyang | ⚠️ **PARTIAL** | guarantee-comparison.md | Confirm with Linyang |

**Current Status:** 
- 5% retention in client EPC (§7.4)
- Competitor offers 10% bank guarantee
- APG not currently offered (identified as GAP)

### 5.2 Performance Bond ⚠️ PARTIAL

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Performance Bond by Linyang | ⚠️ **PARTIAL** | guarantee-comparison.md §2.4 | Confirm structure |

**Current Status:**
- 5% retention until Final Acceptance (EPC §7.4)
- Can offer 10% or bank guarantee at additional cost

### 5.3 Extended Warranty Structure ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Extended BESS warranty | ✅ **AVAILABLE** | linyang.md §5.3 | Include in contract |
| PCS warranty excluded | ✅ **UNDERSTOOD** | - | Confirm in contract |

**LTSA Warranty Extensions (per MWh/year):**
| Component | Years 6-10 | Years 11-15 | Years 16-20 |
|-----------|------------|-------------|-------------|
| BESS Performance & Product | €913.92 | €1,157.62 | €3,858.75 |
| PCS + MVS Product | €747.76 | €926.10 | €2,315.25 |

### 5.4 SOH Guarantee Definition 🔴 NOT SPECIFIC ENOUGH

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| SOH = 10% of contract value | 🔴 **NOT SPECIFIED** | - | Draft specific clause |
| 20-year term | ✅ **AVAILABLE** | linyang.md §2 | - |
| Measurement methodology | ⚠️ **PARTIAL** | linyang.md §4 | Specify in contract |
| Reference conditions | ⚠️ **PARTIAL** | linyang.md §2 | Specify in contract |
| Testing intervals | 🔴 **NOT SPECIFIED** | - | Define in LTSA |
| Financial remedy | ⚠️ **PARTIAL** | ClientLTSA.md §10 | Define specific cap |

**Current SOH Coverage:**
- Full degradation curves available (linyang.md §2)
- LTSA §10 (Tier C): SOH guarantee, module replacement, augmentation
- OEM warranty reserve: ~1.9%
- But: **No specific "10% of contract value" cap defined**

### 5.5 Warranty Differentiation ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Standard warranty | ✅ **5 years** | linyang.md §4.1 | - |
| Extended BESS warranty | ✅ **Available** | linyang.md §5.3 | - |
| PCS exclusion | ✅ **Can specify** | - | Note in contract |

---

## 6. AVAILABILITY & PERFORMANCE

### 6.1 Target Availability ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| 98% annual availability | ✅ **AVAILABLE** | ClientLTSA.md §9.7 | Select tier |
| 2 days maintenance allowance | ⚠️ **NOT EXPLICIT** | - | Define in contract |

**Current Options:**
| Tier | Availability | Source |
|------|--------------|--------|
| Standard | 97% | LTSA §9.1 |
| Enhanced | **98%** | LTSA §9.7 (on request) |

### 6.2 Zero-Day Loss Position 🔴 NOT DEFINED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| 0-day loss commitment | 🔴 **NOT DEFINED** | - | Choose position |
| Maintenance exclusions | 🔴 **NOT DEFINED** | - | Define if 0-day chosen |
| Force majeure carve-outs | ⚠️ **GENERAL** | client_sales.md §15 | Tighten if needed |

**Position Required:** Either:
- 98% availability with defined 2-day maintenance allowance
- OR zero unplanned downtime with tight exclusions

### 6.3 Underperformance Compensation ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Compensation mechanism | ✅ **DEFINED** | ClientLTSA.md §9.4 | - |
| Caps | ✅ **20% fee reduction** | ClientLTSA.md §9.4 | - |
| Calculation method | ✅ **Per quarter** | ClientLTSA.md §9.4 | - |

**Availability LD Calculation (from guarantee-comparison.md):**
```
<97% Annual Availability → Up to 20% O&M fee reduction
Calculated per quarter
```

---

## 7. DELAY, SHIPPING & LIQUIDATED DAMAGES

### 7.1 Delay LDs ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| 0.5% per week | ✅ **MATCHED** | client_sales.md §8.4 | - |
| 10% cap | ✅ **MATCHED** | client_sales.md §8.4 | - |

**Documentation:** Client EPC Agreement §8.4 - Delay Liquidated Damages

### 7.2 Shipping Grace Period 🔴 NOT DEFINED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Grace period (X days) | 🔴 **NOT DEFINED** | - | Agree with client |
| Payment adjustment | 🔴 **NOT DEFINED** | - | Define mechanism |

### 7.3 Delay Payment Fees 🔴 NOT DEFINED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Delay payment calculation | 🔴 **NOT DEFINED** | - | Align with grace period |

---

## 8. LEGAL & JURISDICTION ✅ ALL COVERED

### 8.1 Jurisdiction ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Cyprus jurisdiction | ✅ **DEFINED** | client_sales.md §21 | - |

### 8.2 Governing Law ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Cyprus law | ✅ **DEFINED** | client_sales.md §21 | - |

### 8.3 Dispute Resolution ✅ COVERED

| Requirement | Current Status | Documentation | Action Required |
|-------------|----------------|---------------|-----------------|
| Courts vs arbitration | ✅ **DEFINED** | client_sales.md §21 | - |

---

## 9. NEXT ACTIONS (DINO'S LIST)

| # | Action Item | Current Status | Documentation | Priority |
|---|-------------|----------------|---------------|----------|
| 1 | Confirm aux transformer model, specs, responsibility | 🔴 **PENDING** | In Linyang RFI | HIGH |
| 2 | Confirm EMS inclusion within LTSA | 🔴 **NOT INCLUDED** | EMS is excluded from CIF | HIGH |
| 3 | Confirm grid-forming operation for TRU, PCS, BESS | ✅ **DOCUMENTED** | linyang.md §6 | DONE |
| 4 | Draft exact SOH guarantee and compensation wording | 🔴 **PENDING** | Need specific clause | HIGH |
| 5 | Agree availability position (98% with 2 days vs 0-day) | 🔴 **DECISION NEEDED** | Options available | HIGH |
| 6 | Define shipping grace period (X days) | 🔴 **PENDING** | Not in current docs | MEDIUM |

---

## 10. GAPS REQUIRING IMMEDIATE ACTION

### 🔴 CRITICAL (Contract Blockers)

| # | Gap | Impact | Action |
|---|-----|--------|--------|
| 1 | **Civil works scope not defined** | EPC scope incomplete | Draft civil spec + pricing |
| 2 | **Aux transformer not specified** | Technical spec incomplete | Request from Linyang |
| 3 | **EMS not in LTSA** | Commercial misalignment | Define EMS inclusion/pricing |
| 4 | **SOH guarantee cap not defined** | Financial risk undefined | Draft 10% cap clause |
| 5 | **O&M cost mismatch** | €2,470 vs €1,750 | Reconcile or negotiate |

### 🟡 HIGH (Required Before Signing)

| # | Gap | Impact | Action |
|---|-----|--------|--------|
| 6 | **Availability position** | SLA undefined | Choose 98%+2 days OR 0-day |
| 7 | **Shipping grace period** | Payment terms unclear | Define X days |
| 8 | **SCADA ownership** | Asset ownership unclear | Define in contract |

### 🟢 MEDIUM (Can Be Added Later)

| # | Gap | Impact | Action |
|---|-----|--------|--------|
| 9 | **Performance Bond structure** | Can use retention instead | Offer bank guarantee option |
| 10 | **Testing intervals for SOH** | O&M detail | Add to LTSA schedule |

---

## 11. DOCUMENT CROSS-REFERENCES

| Topic | Primary Document | Section | Status |
|-------|------------------|---------|--------|
| Grid-forming mode | linyang.md | §6 | ✅ Covered |
| SOH degradation | linyang.md | §2 | ✅ Covered |
| Warranty terms | linyang.md | §4 | ✅ Covered |
| LTSA pricing | linyang.md | §5.3 | ✅ Covered |
| Availability guarantee | ClientLTSA.md | §9 | ✅ Covered |
| SOH guarantee | ClientLTSA.md | §10 | ⚠️ Partial |
| Delay LDs | client_sales.md | §8.4 | ✅ Covered |
| Jurisdiction | client_sales.md | §21 | ✅ Covered |
| Civil works | - | - | 🔴 Not covered |
| Aux transformer | linyang-rfi-tracker.md | §5.1 | 🔴 Pending RFI |
| EMS/SCADA | pricing-gap-analysis.md | - | 🔴 Excluded from CIF |

---

*Document prepared by: Lighthief Cyprus Ltd*
*Classification: INTERNAL - CONFIDENTIAL*
*Last Updated: January 2026*
