# PRICING GAP ANALYSIS: Group Client vs Lighthief EPC Model

**Document Reference:** LCY-PRICING-GAP-001
**Date:** January 2026
**Source:** Group client itemized costing for 20MWh (5MW/4hr) system
**Purpose:** Identify missing cost items in Lighthief EPC pricing model

---

## COMPLETE PRICING CHAIN ANALYSIS

### Three-Tier Pricing Comparison (40MW/133MWh System)

| Source | Document | Total | €/MWh | Type |
|--------|----------|-------|-------|------|
| **Linyang CIF** | Commercial offer 198 (to State Operator) | €12,971,810 | **€96,997** | Distributor cost |
| **Lighthief Quote** | Esperia Energy 40-133 BESS Linyang.pdf | €14,572,810 | **€108,973** | Client equipment price |
| **Group EPC** | Itemized costing (20MWh scaled) | ~€14,950,000* | **€111,831** | Full EPC turnkey |

*Scaled from 20MWh breakdown: €111,831 × 133.73 MWh = €14,954,379

### Lighthief Margin Calculation

| Metric | Calculation | Result |
|--------|-------------|--------|
| **Lighthief Markup** | €14,572,810 - €12,971,810 | **€1,601,000** |
| **Markup per MWh** | €1,601,000 ÷ 133.73 MWh | **€11,976/MWh** |
| **Markup Percentage** | €1,601,000 ÷ €12,971,810 | **12.34%** |

> ✅ **This aligns with our 12% Non-Group pricing model!**

### EPC Adders Implied

| Metric | Calculation | Result |
|--------|-------------|--------|
| **Group EPC Total** | (scaled to 133.73 MWh) | ~€14,950,000 |
| **Lighthief Equipment** | (from quote) | €14,572,810 |
| **EPC Adders Difference** | €14,950,000 - €14,572,810 | **~€377,000** |
| **EPC Adders per MWh** | €377,000 ÷ 133.73 MWh | **~€2,858/MWh** |

> ⚠️ **Finding:** Group's full EPC is only ~€2,858/MWh MORE than Lighthief's equipment quote

---

## LINYANG COMMERCIAL OFFER ANALYSIS (40MW/133MWh)

> **Source:** Commercial offer 198/A/KT/2025 dated 17.11.2025
> **Configuration:** 40 MW / 133.73 MWh (32× ME 4.179 MWh + 32× PCS + 4× 10MW Transformers)
> **Total CIF Price:** €12,971,810
> **€/MWh CIF:** €96,997/MWh
> **Lighthief Price:** €14,572,810 (€108,973/MWh) - includes 12.34% margin

### What's INCLUDED in Linyang CIF Price

| Item | Status | Notes | Source |
|------|--------|-------|--------|
| BESS Containers (ME series) | ✅ Included | 32× ME 4.179 MWh | Offer |
| Kehua PCS (BCS1250K-**C**-HUD) | ✅ Included | 32 units, **C-series confirmed** | **Kamil (Jan 2026)** |
| MV Transformer | ✅ Included | 4× 10MW oil-immersed | Offer |
| **ABB MV Switchgear** | ✅ **INCLUDED** | In MV SKID | **Kamil (Jan 2026)** |
| **Training & Commissioning** | ✅ **INCLUDED** | "Training and launch included in price" | Offer |
| Communication Protocols | ✅ Included | Modbus/IEC104/IEC61850 | Offer |
| Fire Suppression | ✅ Included | Aerosol + gas detection | Offer |
| Liquid Cooling | ✅ Included | 45kW system | Offer |

> **Confirmed by Kamil @ Linyang (January 2026):**
> - ABB switchgear IS included in MV SKID
> - All Kehua PCS are C-series (BCS1250K-**C**-HUD)

### What's EXCLUDED from Linyang CIF Price (Explicit)

| Item | Status | Notes |
|------|--------|-------|
| **DC Cabling** | ❌ **EXCLUDED** | Customer/EPC scope |
| **AC Cabling** | ❌ **EXCLUDED** | Customer/EPC scope |
| **Earthworks** | ❌ **EXCLUDED** | Customer/EPC scope |
| **Assembly/Installation** | ❌ **EXCLUDED** | Customer/EPC scope |
| **EMS** | ❌ **EXCLUDED** | Customer/EPC scope |
| **SCADA** | ❌ **EXCLUDED** | Customer/EPC scope |

### Key Implications for Pricing Model

1. **Commissioning IS INCLUDED** in Linyang CIF → Group quote €66,900 may be double-counted
2. **EMS + SCADA are NOT INCLUDED** → Must add to EPC adders
3. **All cabling is NOT INCLUDED** → Must add to EPC adders
4. **Installation is NOT INCLUDED** → Must add to EPC adders

### CRITICAL RECONCILIATION

**Why does the group's itemized breakdown (€111,831/MWh) show separate line items for PPC, Switchgear, RTU, etc. when these might be included in Linyang's bundled pricing?**

**Theory 1: Group is using non-bundled configuration**
- Group quote shows PCS separate from MV Skid
- Linyang bundled offer includes PCS in MV SKID
- Group may be sourcing components separately

**Theory 2: Group includes additional local scope**
- Items like RTU, Protection, Aux System may be locally-sourced additions
- Not part of Linyang's supply

**Theory 3: Group's markup structure differs**
- Group may have different margin allocation across line items
- Some items may include margin that's presented as cost

### Scaling Validation

| System | Group Quote | Linyang + Lighthief | Difference |
|--------|-------------|---------------------|------------|
| **20 MWh** | €2,236,612 (€111,831/MWh) | ~€2,179,460* (€108,973/MWh) | +€57,152 |
| **133.73 MWh** | ~€14,954,379 (scaled) | €14,572,810 (actual) | +€381,569 |

*20 MWh × €108,973/MWh = €2,179,460

**Gap Analysis:**
- At 20 MWh scale: Group EPC is €57,152 MORE than Lighthief equipment
- This is **~€2,858/MWh** for EPC-only adders
- Our model estimated ~€9,500/MWh in EPC adders → **OVER-ESTIMATED**

### Linyang Offer vs Group Quote Mapping

| Group Line Item | Likely Source | In Linyang CIF? |
|-----------------|---------------|-----------------|
| BESS Containers | Linyang | ✅ Yes |
| MV Skid | Linyang | ✅ Yes (with transformer) |
| PCS | Linyang | ✅ Yes |
| Power Plant Controller (PPC) | **Unclear** | ⚠️ May be in PCS |
| Grid Forming PPC | **Unclear** | ⚠️ Optional add-on |
| MV Switchgear & LV Control | **Unclear** | ⚠️ May be in MV Skid |
| Auxiliary System & Comms | **Unclear** | ⚠️ Partial? |
| RTU + Protection Relay | Linyang/EPC | ❌ Not explicit |
| Cables | EPC | ❌ No |
| Delivery DDP | Freight | ❌ No (CIF only) |
| Import duties | Customs | ❌ No |
| Installation | EPC | ❌ No |
| Commissioning | Linyang | ✅ **YES** (Training included) |
| EMS System | Partner | ❌ No |

---

## REVISED GAP ANALYSIS (Post-Linyang Review)

### Items to REMOVE from EPC Adders (Already in Linyang CIF)

| Item | Previous Estimate | New Status |
|------|-------------------|------------|
| Commissioning (Linyang portion) | €66,900 | ⚠️ Reduce - training included |

### Items to ADD to EPC Adders (Confirmed NOT in Linyang CIF)

| Item | Group Quote | Status |
|------|-------------|--------|
| EMS System | €5,600 | 🔴 Add (or use partner) |
| SCADA | Part of RTU | 🔴 Add |
| DC Cabling | Part of €14,900 | 🔴 Add |
| AC Cabling | Part of €14,900 | 🔴 Add |
| Installation/Assembly | €29,300 | 🔴 Add |
| Earthworks | Excluded by group | 🔴 Add if required |

---

## EXECUTIVE SUMMARY

| Category | Group Total | Our Estimate | Gap | Status |
|----------|-------------|--------------|-----|--------|
| Equipment (Linyang) | €1,942,700 | ⚠️ Check CIF | - | Compare to CIF quote |
| EPC Adders | €253,912 | ~€112,000 | **-€142,000** | 🔴 MAJOR GAP |
| **Total per MWh** | **€111,831** | ~€104-122 | - | Close but structure differs |

**Critical Finding:** Our EPC adders model is missing approximately **€140,000** in costs for a 20 MWh system.

---

## 1. GROUP CLIENT BREAKDOWN (20 MWh / 5MW System)

| # | BESS Component | Cost per Item | Qty | Total | €/MWh |
|---|----------------|---------------|-----|-------|-------|
| 1 | BESS Containers (5.015MWh) | €297,300 | 4 | €1,189,200 | €59,460 |
| 2 | MV Skid | €237,800 | 1 | €237,800 | €11,890 |
| 3 | PCS | €317,100 | 1 | €317,100 | €15,855 |
| 4 | Power Plant Controller (PPC) | €79,300 | 1 | €79,300 | €3,965 |
| 5 | Optional PPC - Grid Forming | €40,000 | 1 | €40,000 | €2,000 |
| 6 | MV Switchgear & LV Control Cabinet | €79,300 | 1 | €79,300 | €3,965 |
| 7 | Auxiliary System & Communication | €39,600 | 1 | €39,600 | €1,980 |
| 8 | RTU + Protection Relay | €39,600 | 1 | €39,600 | €1,980 |
| 9 | Cables (min losses <0.5%) | €14,900 | 1 | €14,900 | €745 |
| 10 | Delivery DDP | €47,700 | 1 | €47,700 | €2,385 |
| 11 | Import duties (2.7%) | €50,312 | 1 | €50,312 | €2,516 |
| 12 | Installation incl. unloading | €29,300 | 1 | €29,300 | €1,465 |
| 13 | Commissioning | €66,900 | 1 | €66,900 | €3,345 |
| 14 | EMS System | €5,600 | 1 | €5,600 | €280 |
| | **TOTAL** | | | **€2,236,612** | **€111,831** |

**Included in Proposal:**
- EU Battery Passport compliance
- Recycling solution

**Excluded from Proposal:**
- Plot levelling
- Cable channels/sand
- Construction of concrete bases

---

## 2. COST COMPARISON: GROUP vs LIGHTHIEF

### 2.1 Equipment Costs (Linyang CIF)

| Component | Group Price | Our Model | Variance | Notes |
|-----------|-------------|-----------|----------|-------|
| BESS Container (5.015MWh) | **€297,300** | ⚠️ Check | - | Need to verify vs CIF quote |
| MV Skid | **€237,800** | ⚠️ Check | - | Our model uses bundled pricing |
| PCS | **€317,100** | ⚠️ Check | - | Kehua BCS1250K |
| **Equipment Subtotal** | **€1,744,100** | - | - | 4 containers + 1 MV + 1 PCS |

> **Action:** Compare these prices against Linyang CIF quotation to verify markup.

---

### 2.2 Control & Protection Systems 🔴 MAJOR GAP

| Item | Group Price | Our Price | Gap | Status |
|------|-------------|-----------|-----|--------|
| **Power Plant Controller (PPC)** | €79,300 | ❌ €0 | **-€79,300** | 🔴 **NOT IN OUR MODEL** |
| **Grid Forming PPC (Optional)** | €40,000 | ❌ €0 | **-€40,000** | 🔴 **NOT IN OUR MODEL** |
| **MV Switchgear & LV Control** | €79,300 | ❌ €0 | **-€79,300** | 🔴 **NOT SEPARATE** |
| **Auxiliary System & Comms** | €39,600 | €2,000 | **-€37,600** | 🔴 **UNDERESTIMATED** |
| **RTU + Protection Relay** | €39,600 | €5,000 | **-€34,600** | 🔴 **UNDERESTIMATED** |
| **SUBTOTAL** | **€277,800** | €7,000 | **-€270,800** | 🔴 **CRITICAL** |

**Analysis:**
- Our model assumed PPC, Switchgear, and Protection are included in MV Skid price
- Group quote shows these as **separate line items**
- Need to clarify with Linyang what's included in MV Skid

---

### 2.3 Delivery & Import

| Item | Group Price | Our Price | Gap | Status |
|------|-------------|-----------|-----|--------|
| Delivery DDP | €47,700 | €14,160* | **-€33,540** | ⚠️ Check |
| Import Duties (2.7%) | €50,312 | €47,000** | -€3,312 | ✅ Close |
| **SUBTOTAL** | **€98,012** | €61,160 | **-€36,852** | ⚠️ **UNDERESTIMATED** |

*Our transport: 6 containers × €2,360 = €14,160 (Limassol inland only)
**Our duty: €1,744,100 × 2.7% = €47,091

**Analysis:**
- Group "Delivery DDP" likely includes:
  - Sea freight
  - Port handling
  - Customs clearance
  - Inland transport
- Our model only has inland transport verified

---

### 2.4 Installation & Commissioning

| Item | Group Price | Our Price | Gap | Status |
|------|-------------|-----------|-----|--------|
| Installation incl. unloading | €29,300 | €32,500* | +€3,200 | ✅ Close |
| Commissioning | €66,900 | €40,000** | **-€26,900** | ⚠️ Under |
| **SUBTOTAL** | **€96,200** | €72,500 | **-€23,700** | ⚠️ CHECK |

*Our install: €20,000 base + (5MW × €2,500) = €32,500
**Our commissioning: €30,000 + (20MWh × €500) = €40,000

**Analysis:**
- Commissioning is €26,900 lower than group quote
- May need to increase commissioning formula

---

### 2.5 Other Items

| Item | Group Price | Our Price | Gap | Status |
|------|-------------|-----------|-----|--------|
| Cables (min losses) | €14,900 | €10,500* | **-€4,400** | ⚠️ Under |
| EMS System | €5,600 | €0 | **-€5,600** | ⚠️ Partner |
| EU Battery Passport | Included | ❌ Not listed | ⚠️ CHECK | New requirement |
| Recycling Solution | Included | ❌ Not listed | ⚠️ CHECK | Via Lighthief EOL |

*Our cables: (5MW × €1,400) + €3,500 = €10,500

---

### 2.6 Items IN OUR MODEL but NOT in Group Quote

| Item | Our Price | Notes |
|------|-----------|-------|
| Remote Trip | €3,000 | May be in Protection Relay |
| Export Logic | €2,000 | May be in PPC |
| Protection Engineering | €6,000 | May be in RTU + Protection |
| Docs & Compliance | €7,000 | May be in EMS/PPC |
| Insurance | €7,000 | **NOT IN GROUP QUOTE** |
| Fire & Lightning | €800 | May be in Aux System |
| CERA License | €2,000 | **NOT IN GROUP QUOTE** |
| **SUBTOTAL** | **€27,800** | - |

---

## 3. SUMMARY OF GAPS

### 🔴 CRITICAL - Missing from Our Model

| Item | Estimated Gap | Priority |
|------|---------------|----------|
| Power Plant Controller (PPC) | **€79,300** | 🔴 Critical |
| Grid Forming PPC | **€40,000** | 🟡 Optional |
| MV Switchgear & LV Control | **€79,300** | 🔴 Critical |
| Auxiliary System & Comms (underestimate) | **€37,600** | 🔴 Critical |
| RTU + Protection (underestimate) | **€34,600** | 🔴 Critical |
| **TOTAL CRITICAL GAP** | **€270,800** | - |

### ⚠️ HIGH - Underestimated in Our Model

| Item | Estimated Gap | Priority |
|------|---------------|----------|
| Delivery/Freight (sea + port) | ~€33,000 | 🟡 High |
| Commissioning | ~€27,000 | 🟡 High |
| EMS System | ~€5,600 | 🟡 High |
| Cables | ~€4,400 | 🟡 Medium |
| **TOTAL HIGH GAP** | **~€70,000** | - |

### ✅ Items We Include but Group Doesn't Show

| Item | Our Price | Notes |
|------|-----------|-------|
| Insurance | €7,000 | Should be included |
| CERA License | €2,000 | Regulatory requirement |
| Docs & Compliance | €7,000 | Should be included |
| **TOTAL** | **€16,000** | May offset some gap |

---

## 4. LINYANG CIF vs GROUP QUOTE - €/MWh COMPARISON

### Price per MWh Analysis

| Source | System | Total | €/MWh | Notes |
|--------|--------|-------|-------|-------|
| **Linyang CIF** (Offer 198) | 40MW/133.73MWh | €12,971,810 | **€96,997** | Equipment + commissioning |
| **Group Quote** (Equipment only) | 5MW/20MWh | €1,902,700* | **€95,135** | Lines 1-8 only |
| **Group Quote** (Full EPC) | 5MW/20MWh | €2,236,612 | **€111,831** | All lines |

*Equipment subtotal: Containers + MV Skid + PCS + PPC + Grid Forming + Switchgear + Aux + RTU

### €/MWh Breakdown Comparison

| Component | Linyang CIF | Group Quote | Variance |
|-----------|-------------|-------------|----------|
| Battery containers | ~€60,000* | €59,460 | ✅ Match |
| PCS + Transformer | ~€37,000* | €27,745** | ⚠️ Bundled differently |
| Control & Protection | Included? | €13,910*** | ⚠️ Unclear |
| **Equipment Subtotal** | **€97,000** | **€101,115** | ~4% higher |
| EPC Adders | Not included | €10,716 | EPC scope |
| **Total** | €97,000 | €111,831 | - |

*Estimated split from Linyang bundled price
**PCS €15,855 + MV Skid €11,890 = €27,745/MWh
***PPC €3,965 + Switchgear €3,965 + Aux €1,980 + RTU €1,980 = €13,910/MWh (but Aux €1,980 may be elsewhere)

### Key Finding: Component Bundling Difference

**Linyang Offer (Bundled):**
```
MV SKID Package = 8× PCS + 1× 10MW Transformer + MV Switchgear + Controls
                  All in one 40ft container
                  Single line item pricing
```

**Group Quote (Itemized):**
```
MV Skid         = MV Skid structure only (€237,800)
PCS             = Separate PCS units (€317,100)
PPC             = Separate controller (€79,300)
MV Switchgear   = Separate item (€79,300)
Aux System      = Separate item (€39,600)
RTU + Protection = Separate item (€39,600)
```

### MV SKID COMPONENT STATUS (Updated with Kamil Confirmation)

> In the integrated MV SKID (e.g., BCS10000K-C-HUD/T8):
> 
> | Component | Status | Source |
> |-----------|--------|--------|
> | 8× PCS units (BCS1250K-**C**-HUD) | ✅ **INCLUDED** | Kamil confirmed C-series |
> | 10MW Oil Transformer | ✅ **INCLUDED** | Offer |
> | **ABB MV Switchgear** | ✅ **INCLUDED** | **Kamil confirmed** |
> | Power Plant Controller (PPC) | ❓ **Pending RFI** | - |
> | Grid Forming Controller | ❓ **Pending RFI** | - |
> | LV Control Cabinet | ❓ **Pending RFI** | - |
> | Protection Relays | ❓ **Pending RFI** | - |
> | RTU | ❓ **Pending RFI** | - |
> | Auxiliary Power Distribution | ❓ **Pending RFI** | - |

### REMAINING RFI ITEMS (To be included in next Linyang RFI)

| # | Item | Question | Impact if NOT Included |
|---|------|----------|------------------------|
| 1 | **Power Plant Controller (PPC)** | Is PPC included in PCS or separate? | +€79,300 (€3,965/MWh) |
| 2 | **Grid Forming Controller** | Is grid forming built-in or add-on? | +€40,000 (€2,000/MWh) |
| 3 | **LV Control Cabinet** | Included in MV SKID or separate? | Part of €79,300 |
| 4 | **Protection Relays** | In SKID or customer scope? | Part of RTU line |
| 5 | **RTU** | Linyang supply or customer? | +€39,600 (€1,980/MWh) |
| 6 | **Auxiliary System & Comms** | What exactly is included? | +€39,600 (€1,980/MWh) |
| 7 | **Commissioning scope** | What does "training & launch" cover? | May reduce EPC scope |

**Worst Case if ALL items NOT included:** +€277,800 for 20 MWh (+€13,890/MWh)

---

## 5. QUESTIONS FOR LINYANG

### Equipment Scope Clarification

1. **What's included in MV Skid price?**
   - Does it include MV Switchgear?
   - Does it include LV Control Cabinet?
   - Are protection relays included?
   - Is Power Plant Controller (PPC) included?

2. **Is PPC included in PCS or separate?**
   - Kehua BCS1250K - does it have built-in PPC?
   - Or is PPC a separate controller unit?
   - Is Grid Forming capability built-in or add-on?

3. **What's in "Auxiliary System & Communication"?**
   - AC distribution?
   - Communication cabinets?
   - UPS/aux transformer?

4. **Is RTU included or separate?**
   - Does Linyang supply RTU?
   - Or is this customer-supplied?

5. **Delivery DDP - What's included?**
   - Sea freight?
   - Port handling?
   - Insurance during transit?
   - Customs clearance?

6. **Commissioning scope:**
   - What exactly is included in "Training and launch"?
   - Does it cover full grid connection commissioning?
   - Or just equipment start-up?

---

## 5. REVISED COST MODEL (Proposed)

Based on group analysis, propose updating our EPC adders:

### Current vs Proposed Adders (20 MWh Example)

| Item | Current | Proposed | Change |
|------|---------|----------|--------|
| Import Duty (2.7%) | €47,000 | €47,000 | - |
| Port & Customs | €8,000 | €15,000 | +€7,000 |
| Inland Transport | €14,160 | €14,160 | - |
| Mechanical Install | €32,500 | €29,300 | -€3,200 |
| LV Cabling | €7,000 | €14,900 | +€7,900 |
| MV Cabling | €3,500 | - | Combined above |
| MV Terminations | €2,200 | - | Combined above |
| Protection Eng | €6,000 | - | See below |
| Remote Trip | €3,000 | - | See below |
| Export Logic | €2,000 | - | See below |
| UPS/Aux | €2,000 | - | See below |
| SCADA/RTU | €5,000 | - | See below |
| **NEW: PPC** | - | **€79,300** | +€79,300 |
| **NEW: MV Switchgear/LV Cabinet** | - | **€79,300** | +€79,300 |
| **NEW: Aux System & Comms** | - | **€39,600** | +€39,600 |
| **NEW: RTU + Protection** | - | **€39,600** | +€39,600 |
| CERA License | €2,000 | €2,000 | - |
| Commissioning | €40,000 | €66,900 | +€26,900 |
| Docs & Compliance | €7,000 | €7,000 | - |
| Insurance | €7,000 | €7,000 | - |
| Fire & Lightning | €800 | - | In Aux |
| **NEW: EMS System** | - | **€5,600** | +€5,600 |
| **ADDERS TOTAL** | ~€190,000 | ~€450,000 | +€260,000 |

> ⚠️ **Warning:** This dramatically increases our cost base. Need to verify with Linyang what's included in their equipment pricing vs what needs to be added.

---

## 6. ACTION ITEMS

### Immediate

- [ ] **Send clarification to Linyang:**
  - What's included in MV Skid price?
  - Is PPC included in PCS?
  - Confirm RTU/Protection scope
  - Confirm Aux System scope

- [ ] **Get itemized CIF quote from Linyang** matching group format

- [ ] **Verify Delivery DDP scope:**
  - Is this CIF or just inland?
  - What does "DDP" mean in Linyang context?

### Before Next Quote

- [ ] Update pricing model with verified components
- [ ] Recalculate margin to maintain competitiveness
- [ ] Consider whether some items are already in Linyang CIF

---

## 7. REVISED UNDERSTANDING: THREE PRICING LAYERS

### Layer 1: Linyang CIF (Distributor Cost)
| Metric | 40MW/133MWh | 20MWh (scaled) |
|--------|-------------|----------------|
| **Total** | €12,971,810 | €1,939,940 |
| **€/MWh** | **€96,997** | €96,997 |
| **Includes** | Containers + PCS + Transformers + Training | |
| **Excludes** | Cabling, Assembly, EMS, SCADA, Earthworks | |

### Layer 2: Lighthief Equipment Quote (Client Price)
| Metric | 40MW/133MWh | 20MWh (scaled) |
|--------|-------------|----------------|
| **Total** | €14,572,810 | €2,179,460 |
| **€/MWh** | **€108,973** | €108,973 |
| **Markup** | 12.34% above Linyang CIF | |
| **Includes** | Same as Linyang + Lighthief margin | |
| **Excludes** | Same as Linyang | |

### Layer 3: Group EPC Turnkey (Full Project Cost)
| Metric | 20MWh (actual) | 133MWh (scaled) |
|--------|----------------|-----------------|
| **Total** | €2,236,612 | ~€14,954,000 |
| **€/MWh** | **€111,831** | ~€111,831 |
| **Includes** | Everything for grid-connected system | |
| **Excludes** | Earthworks, Cable channels, Concrete bases | |

### Price Waterfall Analysis

```
Linyang CIF                    €96,997/MWh  (Base)
  + Lighthief Margin (12.34%)  €11,976/MWh
= Lighthief Equipment Quote    €108,973/MWh
  + EPC Adders                  €2,858/MWh   ← MUCH LOWER than our €9,500 estimate
= Group Full EPC               €111,831/MWh
```

### KEY FINDING: EPC Adders Are Lower Than Modeled

| EPC Adders | Our Model | Group Actual | Variance |
|------------|-----------|--------------|----------|
| **Per 20 MWh** | ~€190,000 | ~€57,000 | **-€133,000** |
| **Per MWh** | ~€9,500 | ~€2,858 | **-€6,642** |

**Explanation:** Many items we listed as "EPC adders" (PPC, Switchgear, RTU, Aux, etc.) may already be included in Linyang's bundled MV SKID pricing, or the group has access to significantly lower costs for these items.

---

## 8. CONCLUSION

### After Linyang Offer Analysis

The Linyang commercial offer (198/A/KT/2025) clarifies several key points:

**✅ CONFIRMED INCLUDED in Linyang CIF:**
- Battery containers
- PCS units  
- MV Transformers
- **Commissioning/Training** (important - was listed as EPC adder)
- Fire suppression
- Liquid cooling

**❌ CONFIRMED EXCLUDED from Linyang CIF:**
- DC/AC Cabling
- EMS/SCADA
- Installation/Assembly
- Earthworks

**⚠️ STILL UNCLEAR - Need Linyang Clarification:**

| Item | Group Quote | Impact if NOT in CIF |
|------|-------------|----------------------|
| Power Plant Controller (PPC) | €79,300 | +€3,965/MWh |
| Grid Forming PPC | €40,000 | +€2,000/MWh (optional) |
| MV Switchgear & LV Cabinet | €79,300 | +€3,965/MWh |
| Auxiliary System & Comms | €39,600 | +€1,980/MWh |
| RTU + Protection Relay | €39,600 | +€1,980/MWh |
| **TOTAL UNCLEAR** | **€277,800** | **+€13,890/MWh** |

### Revised Gap Assessment

| Scenario | Gap (20 MWh) | Impact |
|----------|--------------|--------|
| **Best Case** (all in CIF) | ~€70,000 | EMS + Cabling + Install |
| **Worst Case** (all separate) | ~€340,000 | Full control suite separate |
| **Most Likely** | ~€150,000 | Some included, some separate |

### Key Insight: Commissioning

Linyang includes "Training and launch" in CIF price. This means:
- Our commissioning estimate of €40,000-€66,900 may be **double-counting**
- Need to clarify what "training and launch" covers vs. full DSO commissioning

---

## 9. UPDATED ACTION ITEMS

### Immediate (Before Next Quote)

- [ ] **Request itemized scope from Linyang:**
  - What's in MV SKID vs. separate items?
  - Is PPC built into PCS or separate?
  - What does "training and launch" cover?

- [ ] **Get comparable CIF quote for 20 MWh** to compare directly with group breakdown

- [ ] **Clarify RTU/SCADA scope:**
  - Is RTU supplied by Linyang or customer?
  - What SCADA integration is needed?

### Model Updates Required

| Current Estimate | Status | Action |
|------------------|--------|--------|
| Commissioning €40k+ | ⚠️ Review | May be included in CIF |
| UPS/Aux €2,000 | 🔴 Low | Increase if not in CIF |
| SCADA/RTU €5,000 | 🔴 Low | Increase to ~€40,000 |
| EMS €0 | 🔴 Missing | Add €5,600 or partner |

### Pricing Model Revision

Based on this analysis, our pricing model should be:

```
Linyang CIF (from quote)           = Base equipment cost
+ Lighthief Margin (12%)           = Client equipment price
+ Verified EPC Adders (~€2,858/MWh) = Full EPC turnkey
```

**NOT:**
```
Linyang CIF                        = Base
+ Massive EPC Adders (~€9,500/MWh) = WRONG - Over-estimated
+ Lighthief Margin                 = WRONG
```

---

## 9. REFERENCE: LINYANG COMPATIBILITY CERTIFICATIONS

From Commercial Offer 198:

| Standard | PCS Status | Notes |
|----------|------------|-------|
| IEC/EN 62477-1 | ✅ Listed | LVD Safety |
| EN IEC 61000-6-2/4 | ✅ Listed | EMC |
| **EN 50549-2** | ✅ Listed | Grid Connection |
| NC RfG | ✅ Listed | EU Grid Code |
| IEC 62116 | ✅ Listed | Anti-Islanding |
| IEC 61727 | ✅ Listed | PV Requirements |

> **Note:** EN 50549-2 is listed in commercial offer but we still need the actual certificate for DSO submission.

---

*Document prepared by: Lighthief Cyprus Ltd*
*Classification: INTERNAL - CONFIDENTIAL*
*Last Updated: January 2026*
*Linyang Offer 198/A/KT/2025 analyzed*
