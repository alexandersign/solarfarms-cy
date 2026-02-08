> ## ⚠️ PRICING NOTICE — SINGLE SOURCE OF TRUTH
> **All pricing in this document is SUPERSEDED by the master spreadsheet:**  
> **`docs/Bess - EPC System Cost v2.xlsx`** (Sheet: `Pricing_Model_All_Projects`)  
> If any price, cost, or margin figure in this document conflicts with the spreadsheet, **the spreadsheet prevails**.  
> Individual order pricing (non-group) = spreadsheet columns BL-BR (+15% on CIF & subcontractor adders).  
> *Last verified: 7 February 2026*

---

# Internal Documentation Index

> **CONFIDENTIAL - ADMIN ACCESS REQUIRED**
> **Last Updated**: 7 February 2026

---

## Document Naming Convention

All internal documents follow a consistent naming pattern:

```
[type]-[category]-[subject]-[date].[ext]
```

| Component | Description | Examples |
|-----------|-------------|----------|
| **type** | Document type prefix | `rfp`, `rfi`, `rfq` |
| **category** | Vendor name or topic area | `linyang`, `dehn`, `insurance`, `civil`, `electrical` |
| **subject** | Specific item or purpose | `spares`, `timeline`, `guarantees`, `final` |
| **date** | Month + Year | `jan2026`, `feb2026` |
| **ext** | File extension | `.md` (source), `.html` (PDF-ready) |

**Examples:**
- `rfp-insurance-car-timeline-feb2026.md` - RFP for CAR insurance timeline, February 2026
- `rfi-linyang-final-feb2026.html` - Final RFI to Linyang, February 2026
- `rfq-dehn-lightning-protection-jan2026.md` - RFQ to DEHN for lightning protection, January 2026

---

## Quick Links

| Document | Purpose | Status |
|----------|---------|--------|
| [**📊 MASTER PRICING SPREADSHEET**](../../docs/Bess%20-%20EPC%20System%20Cost%20v2.xlsx) | **Single source of truth - all park pricing, margins, individual order pricing** | 🔴 **MASTER** |
| [**👥 BESS SERVICE TEAM PROFILE**](./bess-service-team-profile.md) | **Cyprus O&M team - 6 engineers, training status, district assignments** | ✅ **NEW** |
| [**👥 BESS SERVICE TEAM PRESENTATION (HTML)**](./bess-service-team-presentation.html) | **Client-ready team & company presentation - PDF export** | ✅ **NEW** |
| [**🔴 ABIO MARGIN ANALYSIS**](./abio-margin-analysis-feb2026.md) | **Abio Power margin breakdown - 19 parks** | 🔴 **NEW** |
| [**🔴 ABIO CIF ADDERS BREAKDOWN (HTML)**](./abio-cif-adders-margin-breakdown.html) | **CIF + adders margin detail - PDF export** | 🔴 **NEW** |
| [**🔴 EPC SCOPE STATUS**](./epc-scope-status.md) | **Scope tracking across all EPC workstreams** | 🔴 **NEW** |
| [**🔴 VOLTUS EMS/SCADA ALLOCATION**](./voltus-ems-cost-allocation.md) | **Actual Voltus quote - €76,718/park** | 🔴 **VERIFIED** |
| [**🔴 COST vs MARKET COMPARISON**](./cost-market-comparison-feb2026.md) | **Updated with Voltus actual - Margin 9.7%** | 🔴 **UPDATED** |
| [**🔴 CIVIL WORKS VALIDATION**](./civil-works-validation.md) | **€4,000/platform validated** | ✅ **VERIFIED** |
| [**🔴 LINYANG RFI RESPONSES (Feb 2026)**](./rfi/rfi-linyang-responses-feb2026.md) | **CRITICAL - Conflicts identified** | 🔴 **REVIEW** |
| [**🎯 CONFIRMED CLIENT PRICING (Feb 2026)**](./confirmed-client-pricing-feb2026.md) | **Client prices, scope - UPDATED w/RFI notes** | ⚠️ **CONFLICTS** |
| [**🎯 EPC SCOPE & PRICING TRACKER (HTML)**](./epc-scope-pricing-tracker.html) | **Updated with confirmed data - PDF export** | ✅ **UPDATED** |
| [**🎯 FINAL RFI LINYANG v1.6**](./rfi/rfi-linyang-final-feb2026.md) | **41 items - RECEIVED RESPONSES** | ✅ **RESPONSES IN** |
| [**📋 RFI Master Tracker**](./rfi/rfi-master-tracker-jan2026.md) | **Track all RFI responses** | 🔴 **ACTIVE** |
| [**Linyang Quotation Jan 2026**](./linyang-quotation-jan2026.md) | **LY202601271 - CIF pricing** | ⚠️ **SEE CONFIRMED** |
| [**Client Pricing 13%**](./client-pricing-13-percent.md) | **Superseded by confirmed doc** | ⚠️ **SEE CONFIRMED** |
| [**Import Duty Model**](./import-duty-model.md) | **Included in package now** | ⚠️ **SEE CONFIRMED** |
| [**Logistics Quote**](./logistics-quote-interfreight-jan2026.md) | **Interfreight - transport & customs** | ✅ **VERIFIED** |

### RFIs - Linyang/Kehua

| Document | Scope | Status |
|----------|-------|--------|
| [**🔴 SPARES CLARIFICATION RFI**](./rfi/rfi-spares-clarification-feb2026.md) | **"3 pallets" - qty, dimensions, weight, contents** | 🔴 **NEW - SEND** |
| [**FINAL RFI LINYANG (Feb 2026) - HTML**](./rfi/rfi-linyang-final-feb2026.html) | **41 items - PDF Export** | 🔴 **SEND** |
| [**FINAL RFI LINYANG (Feb 2026) - MD**](./rfi/rfi-linyang-final-feb2026.md) | **Email body version** | 🔴 **SEND** |
| [**Spares List RFI**](./rfi/rfi-spares-list-jan2026.md) | **Spare parts & lead times** | 🔴 **SEND** |
| [**RFI Responses (Feb 2026)**](./rfi/rfi-linyang-responses-feb2026.md) | **Linyang answers - conflicts identified** | 🔴 **REVIEW** |
| [**EMS Provider RFI**](./rfi/rfi-ems-provider-feb2026.html) | **EMS/SCADA provider comparison** | ✅ Complete |
| [**Legal Guarantees RFI**](./rfi/rfi-legal-guarantees-linyang-feb2026.html) | **Warranty, LDs, bonds** | ✅ Complete |
| [**RFI Master Tracker**](./rfi/rfi-master-tracker-jan2026.md) | **Track all RFI responses** | 🔴 **ACTIVE** |

### RFPs - Request for Proposals

| Document | Scope | Vendor Target |
|----------|-------|---------------|
| [Concrete Base RFP](./rfp/rfp-civil-concrete-base-jan2026.html) | Civil works - 47 parks | TBD Cyprus contractor |
| [SCADA/EMS RFP](./rfp/rfp-scada-ems-jan2026.html) | SCADA integration | Axol |
| [Electrical Install RFP](./rfp/rfp-electrical-installation-jan2026.html) | MV/LV cabling & terminations | TBD |
| [Cybersecurity RFP](./rfp/rfp-cybersecurity-nis2-jan2026.html) | NIS2 compliance | TBD |
| [**🔴 COMPREHENSIVE INSURANCE RFP (HTML)**](./rfp/rfp-insurance-comprehensive-feb2026.html) | **All insurances: EL, PL, PI, D&O, CAR/EAR - PDF Export** | 🔴 **NEW** |
| [**🔴 COMPREHENSIVE INSURANCE RFP (MD)**](./rfp/rfp-insurance-comprehensive-feb2026.md) | **Source document** | 🔴 **NEW** |
| [**🔴 CAR INSURANCE TIMELINE**](./rfp/rfp-insurance-car-timeline-feb2026.md) | **Project values by delivery quarter** | 🔴 **NEW** |
| [Insurance RFP (CAR/EAR only)](./rfp/rfp-insurance-car-ear-jan2026.html) | Project CAR/EAR coverage | TBD broker |
| [Protection Testing RFP](./rfp/rfp-protection-testing-jan2026.html) | Relay testing & DSO witness | TBD |
| [Remote Trip & UPS RFP](./rfp/rfp-remote-trip-ups-jan2026.html) | Trip system & auxiliary power | TBD |
| [Earthing RFP](./rfp/rfp-earthing-grounding-jan2026.html) | Earth grid & grounding | TBD |

### RFQs - Request for Quotes

| Document | Scope | Vendor Target |
|----------|-------|---------------|
| [LPS/SPD RFQ](./rfq/rfq-dehn-lightning-protection-jan2026.md) | Lightning protection | DEHN (Artur Łasak) |
| [Transport RFQ](./rfq/rfq-transport-asoulis-jan2026.html) | Heavy haulage - 246 containers | A. Soulis |

### Commercial Terms & Clarifications

| Document | Purpose | Status |
|----------|---------|--------|
| [**Commercial Terms Clarification**](./commercial-terms-clarification-jan2026.md) | **Payment, VAT, Timeline, LDs, EOL** | 🔴 **NEW** |

### Client-Facing Documents

| Document | Purpose | Status |
|----------|---------|--------|
| [**GROUP EPC Proposal (PDF)**](./client-proposal-group-epc-jan2026.html) | **Full turnkey pricing - 47 parks** | ✅ **FINAL** |
| [**ABIO POWER PROPOSAL (HTML)**](../clients/abio-power-proposal-feb2026.html) | **Abio Power - 19 parks, €27.5M** | ✅ **NEW** |
| [**ABIO POWER PROPOSAL (MD)**](../clients/abio-power-proposal-feb2026.md) | **Source document** | ✅ **NEW** |
| [**Spanercom Offer (Anarita)**](./offer-anarita-10mw-jan2026.html) | **10MW/40MWh - Paphos** | ✅ **NEW** |
| [BESS Portfolio Proposal](./client-proposal-cyprus-bess-jan2026.html) | Interactive web proposal | ⚠️ Review Pricing |
| [Client FAQ - Guarantees & Bonds](./client-faq-guarantees-bonds-jan2026.html) | LDs, availability, warranty FAQ | ✅ Ready |

### Team & Company Presentations

| Document | Purpose | Status |
|----------|---------|--------|
| [**BESS Service Team Profile (MD)**](./bess-service-team-profile.md) | **Full team reference - 6 engineers, credentials, training, DSO compliance** | ✅ **NEW** |
| [**BESS Service Team Presentation (HTML)**](./bess-service-team-presentation.html) | **Client-ready branded presentation - print to PDF** | ✅ **NEW** |
| [**Company Presentation (HTML)**](../../public/company-presentation.html) | **Lighthief group overview** | ✅ **UPDATED** |

### Commercial & Pricing

| Document | Purpose | Status |
|----------|---------|--------|
| [**LTSA Updated Rates**](./ltsa-updated-rates-jan2026.md) | **Group €1,740 / Non-Group €2,469** | ✅ **FINAL** |
| [**Commercial Terms Clarification**](./commercial-terms-clarification-jan2026.md) | **Payment, VAT, Timeline, LDs, EOL** | ✅ **CURRENT** |
| [Dino Requirements Tracker](./dino-requirements-tracker.md) | Contract requirements from Dino | 🔴 Action |
| [Pricing Gap Analysis](./pricing-gap-analysis.md) | Group pricing vs our model | ⚠️ Review |
| [Guarantee Comparison](./guarantee-comparison.md) | Competitor vs Lighthief guarantees | ✅ Complete |
| [Pricing Verification](./pricing-verification.md) | EPC cost verification & tracking | ⚠️ Update |
| [**Logistics Cost Comparison**](./logistics-cost-comparison-jan2026.md) | **Interfreight vs A. Soulis** | ✅ **NEW** |

### Technical Reference

| Document | Purpose | Status |
|----------|---------|--------|
| [Solar Park EPC](./solarpark-epc.md) | PV + BESS self-cost model | ✅ Complete |
| [Solar Park Validation](./solarpark-epc-validation.md) | Cost assumption validation | ✅ Complete |
| [Civil Works Estimate](./civil-works-estimate.md) | Ground prep cost estimates | ✅ Complete |
| [Clients Index](../clients/_index.md) | Client portfolio overview | ✅ Updated |
| [Linyang Specs](../linyang.md) | Equipment specifications | ✅ Complete |
| [Cyprus DSO](../CyprusDSO.md) | Grid connection requirements | ✅ Complete |
| [Public FAQ](../public-faq.md) | Chat agent knowledge base | ✅ Complete |

---

## Pricing Model Summary (CONFIRMED Feb 2026)

### CONFIRMED COMPLETE PACKAGE PRICES

| System Configuration | Price per MWh | Status |
|---------------------|---------------|--------|
| **5.0MW / 20MWh** | **€112,945** | ✅ Confirmed |
| **5.0MW / 15MWh** | €130,792 | ✅ Confirmed |
| **5.0MW / 10MWh** | €135,319 | ✅ Confirmed |
| **3.0MW / 10MWh** | €122,031 | ✅ **NEW - Confirmed** |
| **2.5MW / 10MWh** | €119,769 | ✅ Confirmed |
| **2.5MW / 8.36MWh** | €135,560 | ✅ Confirmed |
| **8.0MW / 60MWh** | €100,052 | ✅ Confirmed |
| **12MW / 40MWh** | €114,990 | ✅ Confirmed |
| **25MW / 100MWh** | €106,279 | ✅ Confirmed |

### Payment Terms (CONFIRMED)

| Stage | Percentage |
|-------|------------|
| Advance | 25% |
| Ready to Ship | 50% |
| On Site | 20% |
| Pass SAT | 5% |

### What's INCLUDED in Package Price

- ✅ Import & Customs Duties
- ✅ Civil works, concrete bases & cable laying
- ✅ Drainage system
- ✅ Surge Protection (SPDs)
- ✅ Internal Earthing Grid + soil test
- ✅ Installation & Commissioning (4-6 weeks)
- ✅ Basic EMS annual license fee (in O&M)
- ✅ ETEK engineer certification
- ✅ EU Battery Passport

### What's EXCLUDED (Client Pays)

- ❌ EAC testing & connection fees
- ❌ External Lightning Protection (LPS) - DEHN
- ❌ Site Earthing enhancement (if needed)
- ❌ Communication equipment to TSO/EDC
- ❌ VAT (19%)

### O&M & Warranty

| Item | Terms |
|------|-------|
| **O&M Cost** | €1,740/MWh per year (15 years) |
| **O&M Provider** | Lighthief Cyprus Limited |
| **Standard Warranty** | 5 years |
| **Extended BESS (Yr 6-10)** | €913/MWh/year |
| **Extended BESS (Yr 11-15)** | ⚠️ €1,157/MWh/year (client doc) vs **€4,182/MWh/year** (Linyang actual) |
| **RTE** | 86.32% (94.8% DC) |
| **SOH Guarantee** | 15 years |
| **Availability** | ≥97% |

### EMS/SCADA Provider

**VOLTUS Energy** (confirmed) - €76,718 per 5MW/20MWh park (verified from quote)

---

## LINYANG RFI RESPONSES (Feb 2026) - KEY DATA

> **Source:** RFI - Legal Guarantees Confirmation - Linyang V1 Answers.pdf

### ✅ CONFIRMED TERMS

| Category | Item | Value | Status |
|----------|------|-------|--------|
| **Payment** | Advance Payment | 25% | ✅ Confirmed |
| **Payment** | Ready to Ship | 50% | ✅ Confirmed |
| **Payment** | On Site | 20% | ✅ Confirmed |
| **Payment** | SAT Completion | 5% | ✅ Confirmed |
| **LTSA** | Annual O&M (Tier C) | €1,740/MWh/year | ✅ Confirmed |
| **LTSA** | BESS Maintenance | €815.72/MWh/year | ✅ Confirmed |
| **LTSA** | PCS + MVS Maintenance | €924.28/MWh/year | ✅ Confirmed |
| **Warranty** | Standard Warranty | 5 years from COD | ✅ Confirmed |
| **SOH** | Year 5 | ≥85% | ✅ Confirmed |
| **SOH** | Year 10 | ≥79.58% | ✅ Confirmed |
| **SOH** | Year 15 | ≥70% | ✅ Confirmed |
| **Performance** | PCS Efficiency | ≥98% at rated power | ✅ Confirmed |
| **Performance** | System RTE | ≥87% at POC (MV side) | ✅ Confirmed |
| **Insurance** | Product Liability | €5M (AXA) | ✅ Confirmed |
| **Insurance** | OEM Warranty Reserve | 1.9% on Linyang books | ✅ Confirmed |
| **Extended Warranty** | Years 6-10 BESS | €913.92/MWh/year | ✅ Confirmed |
| **Extended Warranty** | Years 6-10 PCS+MVS | €747.76/MWh/year | ✅ Confirmed |
| **LDs** | Availability Rate | €30/day/MWh | ✅ Confirmed |
| **APG** | Coverage | 100% of advance | ✅ Confirmed |
| **APG** | Form | Bank Guarantee | ✅ Confirmed |

### ⚠️ MODIFIED/DIFFERENT FROM CLIENT DOC

| Category | Item | Client Doc | Linyang RFI | Difference |
|----------|------|------------|-------------|------------|
| **Performance Bond** | Coverage | 10% TCV | **5% TCV** | 🔴 50% lower |
| **Performance Bond** | Parent Backing | Assumed yes | **NO** | 🔴 No backing |
| **Delay LDs** | Basis | % of contract value | **% of delayed goods** | 🔴 Reduced scope |
| **Delay LDs** | Days 1-30 | 0.1%/day | 0.1%/day (of delayed goods) | ⚠️ Scope change |
| **Delay LDs** | Days 31+ | 0.15%/day | 0.15%/day (of delayed goods) | ⚠️ Scope change |
| **Total LD Cap** | Maximum | 15% of contract | **10% of contract** | 🔴 Reduced cap |
| **Cycle Life** | Cycles | Not specified | **7,000 cycles** (not 8,000) | ⚠️ Lower |
| **Extended Warranty** | Max Years | 20 years | **15 years max** | ⚠️ Shorter |
| **Maintenance Days** | Allowance | 8 days/year | **10 days/year** | ⚠️ More downtime |

### 🔴 CRITICAL CONFLICTS - MUST RESOLVE

| # | Issue | Client Doc Says | Linyang Says | Impact |
|---|-------|----------------|--------------|--------|
| 1 | **Extended Warranty Yr 11-15 BESS** | €1,157/MWh/yr | **€4,182.25/MWh/yr** | **+261% cost** |
| 2 | **Extended Warranty Yr 11-15 Total** | €2,084/MWh/yr | **€5,268.45/MWh/yr** | **+153% cost** |
| 3 | **SOH Remedy Costs** | Parts + labor included | **Parts ONLY** (no labor/service) | Hidden costs |
| 4 | **Performance Bond** | 5% TCV | 5% TCV but **NO parent company backing** | Credit risk |
| 5 | **Delay LDs Basis** | % of full contract value | % of **delayed goods only** | Reduced protection |
| 6 | **Total LD Cap** | 15% of contract | **10% of contract** | Reduced protection |

### Extended Warranty Pricing (From Linyang RFI)

| Years | BESS (€/MWh/yr) | PCS+MVS (€/MWh/yr) | **Total (€/MWh/yr)** | Status |
|-------|-----------------|--------------------|--------------------|--------|
| **6-10** | €913.92 | €747.76 | **€1,661.68** | ✅ Confirmed |
| **11-15** | €4,182.25 | €1,086.20 | **€5,268.45** | 🔴 2.5x higher than client doc |
| **16-20** | €3,858.75 | €2,315.25 | **€6,174.00** | New data (not quoted to clients) |

### Financial Guarantees Summary

| Guarantee | Amount/Terms | Status |
|-----------|--------------|--------|
| **APG (Advance Payment)** | 100% of advance, Bank Guarantee | ✅ Confirmed |
| **Performance Bond** | 5% of TCV (not 10%) | ⚠️ Modified |
| **Parent Company Backing** | **NOT AVAILABLE** | 🔴 Rejected |
| **Warranty Reserve Fund** | **NOT AVAILABLE** | 🔴 Rejected |
| **Product Liability Insurance** | €5M (AXA) | ✅ Confirmed |
| **Performance Retention** | 5% held PAC→FAC | ✅ Confirmed |
| **Claim Response Time** | 48 hours (excl weekends) | ✅ Confirmed |

---

## System Access Levels (Future)

| Role | Access | Features |
|------|--------|----------|
| **Public** | Calculator, info pages | View only |
| **Client** | Project portal | View project status |
| **Sales** | Quotation tool | Generate quotes |
| **Admin** | Full access | All internal docs, RFI, compliance |

---

## Document Categories

### Technical Specifications
- `linyang.md` - Battery, PCS, MV Skid specs
- `CyprusDSO.md` - Grid connection requirements
- `kehua-pcs/` - **Kehua PCS catalogues & drawings (NEW)**
  - BCS2000K~2500K (2-2.5MW PCS)
  - BCS4000K~5000K (4-5MW PCS)
  - Single line diagrams, foundation specs, DWG files

### Client Management
- `clients/_index.md` - Portfolio overview
- `clients/*.md` - Individual client files

### Internal Operations
- `internal/pricing-verification.md` - Cost tracking
- `internal/rfi-tracker.md` - (Future) RFI management
- `internal/compliance-tracker.md` - (Future) Compliance status

### Legal & Commercial
- `legal/ClientLTSA.md` - LTSA templates
- (Future) Contract templates

---

## Data Flow (Confirmed Model)

```
COMPLETE PACKAGE PRICE (per €/MWh by system size)
       ↓
INCLUDES: CIF + Import Duties + Civil + Drainage + SPD + Commissioning
       ↓
CLIENT PAYS SEPARATELY: LPS (DEHN) + EAC fees + TSO comms + VAT
       ↓
O&M: €1,740/MWh/year via Lighthief Cyprus
```

> **Note:** Previous tiered pricing model (CIF → Installed → Client → Non-Group) 
> has been replaced by fixed complete package prices per system size.

---

## Verification Workflow

1. **Receive Quotation** → Log in pricing-verification.md
2. **Verify Data** → Update status from 🔴 to 🟢
3. **Update Client Files** → Apply verified costs
4. **Update Calculator** → Refresh default values

---

## Contact & Responsibility

| Area | Responsible | Email | Status |
|------|-------------|-------|--------|
| **Cyprus Director** | Alexander Papacosta | alexander.papacosta@lighthief.com | ✅ Active |
| **ETEK Engineer / Site Lead** | Costas Hadjikyriacou | costas@lighthief.com | ✅ Active |
| **Energy & BESS Consultant** | Andreas Christoforou | xristoforou.andreass@gmail.com | ✅ Joining |
| **BESS Field Specialist** | Dawid Lesnikowski | — | Training (PL) |
| **BESS Field Specialist** | Szymon Drozdz | — | Training (PL) |
| **BESS Field Specialist** | Kacper Goral | — | Training (PL) |

> **Full team details:** See [BESS Service Team Profile](./bess-service-team-profile.md)
