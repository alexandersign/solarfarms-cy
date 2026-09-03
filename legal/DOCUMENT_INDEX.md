# LINYANG BESS DISTRIBUTION - LEGAL DOCUMENT INDEX
## Lighthief Cyprus Ltd

---

## Folder Structure

```
legal/
├── active/                              ← Signed / finalised contracts
│   ├── distribution.md                     Distribution Agreement (signed Feb 2026)
│   ├── Linyang-sales-contract-17Mar-CLEAN-FOR-SIGNATURE.docx  Sales Contract (clean, 17 Mar 2026)
│   ├── Linyang-sales-contract-17Mar-REDLINE-SUMMARY.docx      Redline summary (7 amendments)
│   ├── NDA Linyang PL.docx                 NDA (signed)
│   └── nda-linyang-reply.md                NDA response notes
│
├── in-negotiation/                      ← Contracts under development
│   ├── linyang-sales/                      Sales Contract + Guarantee Framework
│   │   ├── Linyang sales contract - Lighthief - 17.03.docx   Latest Linyang version (17 Mar 2026)
│   │   ├── Linyang-sales-contract-17.03-Lighthief-REDLINE.docx
│   │   │                                      ↑ LATEST — Lighthief redline (framework PO + FM fix + §5.7)
│   │   ├── rev260306-...V1 (1).docx           Previous version (6 Mar 2026)
│   │   ├── linyang-sales-contract-6mar-review-comments.html
│   │   ├── Linyang sales contract...26.02..docx   Previous version (26 Feb 2026)
│   │   ├── linyang-contract-26feb-review-comments.html
│   │   ├── sales_agrement.md                  Lighthief's amended draft
│   │   ├── linyang-sales-comments.html        Original negotiation comments
│   │   ├── linyang-blended-sales-ltsa.md/html Blended sales+LTSA framework
│   │   ├── RFI - Legal Guarantees...V3.pdf    Linyang RFI guarantee confirmations
│   │   └── RFI_Linyang_compliance.md          Linyang compliance RFI
│   │
│   └── linyang-distribution/               Distribution Agreement comments
│       ├── linyang-distribution-original-template
│       ├── linyang distribution - COMMENTS.md
│       └── linyang-distribution-comments.html
│
├── templates/                           ← Client-facing contract templates
│   ├── client_sales.md / .html             EPC Agreement template (v3.0 — superseded by v4.0)
│   ├── client_sales_v4.0.docx              EPC Agreement v4.0 BANKABILITY REVISION (17 Mar 2026)
│   ├── OEM-Direct-Warranty-Undertaking-Linyang.docx  OEM step-in letter v1.0
│   ├── ClientLTSA.md / .html               LTSA template (v3.0 — superseded by v4.0)
│   ├── ClientLTSA_v4.0.docx                LTSA v4.0 clean (17 Mar 2026)
│   └── client_compliance_memo.md           Compliance memo template
│
├── reference/                           ← Compliance, regulatory, operations
│   ├── requirements.md                     General requirements
│   ├── insurance_requirements.md           Insurance requirements
│   ├── regulatory_compliance_checklist.md  Gazette 5992/2026 checklist
│   ├── DSO_compliance.md                   Cyprus DSO compliance
│   ├── service_management.md               Service management procedures
│   ├── employee_service_manual.md          Employee manual
│   └── dino-legal-upadate-flexible-connection.docx
│
├── voltus-contracts/                    ← Voltus EMS/SCADA order agreements (upstream template)
│   ├── ORDER AGREEMENT PART I …docx
│   └── ORDER AGREEMENT PART II …docx
│
│   Client-facing DISPERON versions (Lighthief EU BESS Ltd):
│   → lighthief-eu-bess/legal/contracts/  (LEB-EMS-ORDER-I / II)
├── linyang_hardware_specs_docs/         ← OEM datasheets & SLDs
└── DOCUMENT_INDEX.md                    ← This file
```

---

## Negotiation Timeline — Linyang Sales Contract

| Date | Event | Document | Status |
|------|-------|----------|--------|
| Jan 2026 | Lighthief drafted amended sales agreement | `sales_agrement.md` | Internal draft |
| Feb 2026 | Linyang RFI V1–V3 responses received | `RFI - Legal Guarantees...V3.pdf` | Key terms confirmed |
| 22 Feb 2026 | Lighthief prepared full markup comments | `linyang-sales-comments.html` | Internal (NOT sent to Linyang) |
| 26 Feb 2026 | Linyang sent revised contract V1 | `Linyang sales contract...26.02..docx` | Superseded |
| 26 Feb 2026 | Lighthief reviewed 26 Feb version | `linyang-contract-26feb-review-comments.html` | Internal (NOT sent to Linyang) |
| 6 Mar 2026 | Linyang sent revised contract V1 (6 Mar) | `rev260306-...V1 (1).docx` | **Current Linyang version** |
| 6 Mar 2026 | Lighthief prepared review comments | `linyang-sales-contract-6mar-review-comments.html` | **SENT to Linyang** |
| **6 Mar 2026** | **Email sent to Linyang** | See email log below | **Awaiting response** |

### Email Log — 6 March 2026

**Subject:** Sales Contract – Comments from Lighthief on March 6 rev260306

**From:** Alexander Papacosta (alexander.papacosta@lighthief.com)

**To:** Kamil, humphery.wen@linyang.com, Arkadius Sybaris, Tomasz Wieckowski, conoryang@linyang.com.cn

**Attachment:** Lighthief Review Comments (linyang-sales-contract-6mar-review-comments.html, exported as PDF, 228 KB)

**Summary:** Sent review comments on the rev260306 sales contract. Comments based on call discussion — covers payment terms (30/50/10/10 proposed), EU late payment framework, anti-circumvention (replacing affiliate binding), financial guarantees (APG, performance bond, AXA insurance), performance warranties (SOH/RTE/cycle life), delay LDs, liability cap, commissioning/PAC definitions, and credit check response. Requested finalisation ASAP as the EPC contract must go to insurer and clients for review. Noted most items were already RFI-confirmed.

---

## Document Structure Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           UPSTREAM AGREEMENTS                                │
│                    (Lighthief ↔ Linyang/Solarfun)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  DISTRIBUTION AGREEMENT — active/distribution.md                     │   │
│   │  ─────────────────────────────────────────                           │   │
│   │  • Exclusivity for Cyprus territory                                  │   │
│   │  • Anti-circumvention protections                                    │   │
│   │  • Client introduction registry                                      │   │
│   │  • Penalty fee structure                                             │   │
│   │  • Governing Law: Singapore (SIAC) + Cyprus for Sec 7-9              │   │
│   │  • STATUS: ✅ SIGNED (Feb 2026)                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  SALES AGREEMENT — in-negotiation/linyang-sales/                     │   │
│   │  ─────────────────────────────────────                               │   │
│   │  • Project-by-project quotations                                     │   │
│   │  • Product supply terms + guarantee framework                        │   │
│   │  • Warranty provisions (5 years)                                     │   │
│   │  • Pre-shipment inspection rights                                    │   │
│   │  • Governing Law: Singapore (SIAC) + Cyprus interim relief           │   │
│   │  • STATUS: ⚠️ IN NEGOTIATION — comments sent 6 Mar 2026             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                               │
                               │ Terms Flow Down
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DOWNSTREAM AGREEMENTS                               │
│                      (Lighthief ↔ End Customers)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  EPC AGREEMENT (client_sales.md)                                     │   │
│   │  ─────────────────────────────────                                   │   │
│   │  • Turnkey BESS delivery                                             │   │
│   │  • Payment milestones (30/55/10/5 retention)                         │   │
│   │  • Delay liquidated damages                                          │   │
│   │  • Warranty provisions (5 years)                                     │   │
│   │  • Governing Law: Cyprus (Cyprus Courts)                             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  LTSA (ClientLTSA.md)                                                │   │
│   │  ─────────────────────                                               │   │
│   │  • Tier A: Basic Monitoring + Bi-Annual Maintenance                  │   │
│   │  • Tier B: + Corrective Maintenance (PCS/MVS)                        │   │
│   │  • Tier C: + 97% Availability Guarantee + Local Spares               │   │
│   │  • Tier D: Not offered — Tier C is the highest tier                    │   │
│   │  • Governing Law: Cyprus (Cyprus Courts)                             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OPERATIONS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  SERVICE MANAGEMENT (service_management.md)                          │   │
│   │  ─────────────────────────────────────────                           │   │
│   │  • Equipment registry                                                │   │
│   │  • Maintenance scheduling                                            │   │
│   │  • Service visit checklists                                          │   │
│   │  • Alert protocols                                                   │   │
│   │  • Spare parts inventory                                             │   │
│   │  • Client communication logs                                         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  EMPLOYEE SERVICE MANUAL (employee_service_manual.md)               │   │
│   │  ─────────────────────────────────────────────────                  │   │
│   │  • OEM warranty requirements                                        │   │
│   │  • Safety precautions (electrical/battery)                          │   │
│   │  • Maintenance procedures                                           │   │
│   │  • Warranty claim workflows                                         │   │
│   │  • Documentation requirements                                       │   │
│   │  • Emergency response                                               │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              REGULATORY                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  DSO COMPLIANCE (DSO_compliance.md)                                 │   │
│   │  ───────────────────────────────────                                │   │
│   │  • Cyprus EAC/DSO grid connection requirements                      │   │
│   │  • Protection settings and trip times                               │   │
│   │  • Communication/SCADA requirements                                 │   │
│   │  • Metering requirements                                            │   │
│   │  • Testing and commissioning procedures                             │   │
│   │  • Ongoing compliance reporting                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  REGULATORY COMPLIANCE CHECKLIST (regulatory_compliance_checklist.md)│   │
│   │  ─────────────────────────────────────────────────────────────────  │   │
│   │  • Gazette 5992/2026 requirements                                   │   │
│   │  • Linyang certifications (UN38.3, UL9540A, IEC 62619, etc.)        │   │
│   │  • Compliance status matrix                                         │   │
│   │  • Engineer drawings responsibilities                               │   │
│   │  • Missing items (RFI)                                              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  RFI - LINYANG (RFI_Linyang_compliance.md)                          │   │
│   │  ─────────────────────────────────────                              │   │
│   │  • Final UL9540A request                                            │   │
│   │  • SCADA signal confirmation matrix                                 │   │
│   │  • Grid-forming capability declaration                              │   │
│   │  • Environmental operating envelope                                 │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  CLIENT COMPLIANCE MEMO (client_compliance_memo.md)                 │   │
│   │  ─────────────────────────────────────────────                      │   │
│   │  • Executive summary for client                                     │   │
│   │  • Compliance status confirmation                                   │   │
│   │  • Planning exemption explanation                                   │   │
│   │  • Responsibilities clarification                                   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Synchronized Terms Across Documents

### Warranty Period
| Document | Warranty Term | Start Date |
|----------|---------------|------------|
| distribution.md | 5 years | PAC |
| sales_agrement.md | 5 years | PAC |
| client_sales.md | 5 years | PAC |
| ClientLTSA.md | References EPC warranty | PAC |

### Payment Milestones

**Upstream (Lighthief → Linyang):**
| Milestone | Percentage | Trigger |
|-----------|------------|---------|
| Advance | 30% | Contract signing |
| Pre-Shipment | 60% | Before shipment |
| Final | 10% | PAC issued |

**Downstream (Client → Lighthief):**
| Milestone | Percentage | Trigger |
|-----------|------------|---------|
| Advance | 30% | Contract signing |
| Pre-Shipment | 55% | Before shipment |
| Final | 10% | PAC issued |
| Retention | 5% | FAC issued |

### Incoterms
| Document | Term | Location |
|----------|------|----------|
| distribution.md | CIF | Limassol, Cyprus |
| sales_agrement.md | CIF | Limassol, Cyprus |
| client_sales.md | CIF | Limassol, Cyprus |

### Force Majeure Definition
All documents include consistent Force Majeure provisions covering:
- War, terrorism, riots, civil commotion
- Natural disasters (earthquakes, floods, fires)
- Pandemics and epidemics
- Governmental actions and regulatory changes
- Grid connection delays
- Transportation disruptions
- Financing delays beyond control

### Governing Law Summary (Split Jurisdiction Model)

| Document | Governing Law | General Disputes | Client Protection / Penalties |
|----------|---------------|------------------|-------------------------------|
| distribution.md | Singapore | SIAC Arbitration (3 arb.) | **Cyprus Courts** (Distributor option) |
| sales_agrement.md | Singapore | SIAC Arbitration (3 arb.) | Cyprus Courts (via Distribution) |
| client_sales.md | Cyprus | Cyprus Courts | Cyprus Courts |
| ClientLTSA.md | Cyprus | Cyprus Courts | Cyprus Courts |

**Key Feature:** Sections 7-9 of Distribution Agreement (Client Protection, Anti-Circumvention, Penalty Fees) can be enforced in Cyprus at Distributor's discretion, providing faster local enforcement.

### Key Definitions Alignment

| Term | Definition (Consistent Across All) |
|------|-----------------------------------|
| BESS | Battery energy storage system including containers, PCS, control equipment |
| EMS | Third-party Energy Management System (not OEM supplied unless separate agreement) |
| PAC | Provisional Acceptance Certificate (triggers warranty start, final payment) |
| FAC | Final Acceptance Certificate (triggers retention release) |
| LTSA | Long-Term Service Agreement governing monitoring and maintenance |
| Products | Battery systems, PCS, containers, control equipment supplied by Linyang |
| Business Day | Day other than Saturday, Sunday, or Cyprus public holiday |

---

## Document Checklist

### Before Signing Distribution Agreement
- [ ] Verify all party details correct
- [ ] Confirm territory scope (Cyprus)
- [ ] Review exclusivity provisions
- [ ] Confirm anti-circumvention penalty structure
- [ ] Review training and support commitments
- [ ] Verify insurance requirements
- [ ] Confirm governing law and arbitration

### Before Signing Sales Agreement (Per Project)
- [ ] Quotation received and reviewed
- [ ] Technical specifications confirmed
- [ ] Delivery schedule agreed
- [ ] Payment milestones aligned with end customer
- [ ] Pre-shipment inspection scheduled
- [ ] Factory Acceptance Test witnessed

### Before Signing EPC Agreement (Per Client)
- [ ] Client due diligence completed
- [ ] Site survey conducted
- [ ] Technical design finalized
- [ ] Contract price calculated with margin
- [ ] Target PAC Date realistic
- [ ] LTSA proposal prepared
- [ ] Insurance coverage confirmed

### Before Signing LTSA (Per Client)
- [ ] Service fee calculated
- [ ] Monitoring platform access confirmed
- [ ] Maintenance schedule agreed
- [ ] Emergency contacts exchanged
- [ ] Site access procedures confirmed
- [ ] Equipment details captured in Schedule 1

---

## Compliance Status Summary (Gazette 5992/2026)

| Area | Status | Notes |
|------|--------|-------|
| **Legal Compliance** | ✅ YES | 2026 Order requirements met |
| **DSO Technical Compliance** | ✅ YES | EAC guides satisfied |
| **Safety Compliance** | ✅ YES | All certificates available |
| **Planning Exemption Eligibility** | ✅ YES | Conditions met |
| **Missing Items** | ⚠️ Minor | SCADA matrix + final UL9540A (RFI sent) |

---

## Version Control

| Document | Location | Version | Last Updated | Status |
|----------|----------|---------|--------------|--------|
| distribution.md | `active/` | 2.1 | Feb 2026 | **Signed Feb 2026** |
| NDA Linyang PL.docx | `active/` | 1.0 | 2025 | **Signed** |
| Linyang Sales Contract V1 | `in-negotiation/linyang-sales/` | V1 | 6 Mar 2026 | **In Negotiation — comments sent 6 Mar** |
| sales_agrement.md (Lighthief draft) | `in-negotiation/linyang-sales/` | 2.0 | Jan 2026 | Internal draft (not sent) |
| client_sales.md | `templates/` | 3.0 | Feb 2026 | Template v3.0 — Superseded by v4.0 |
| client_sales_v4.0.docx | `templates/` | 4.0 | 17 Mar 2026 | Bankability revision (superseded by v5.0) |
| client_sales_v5.0.docx | `templates/` | **5.0** | **6 May 2026** | **FINAL \u2014 two-component price split, APG on equipment only, 3-month DLP, tiered liability 10%/50%/uncapped, all Anastasis v4.0 comments resolved** |
| OEM-Direct-Warranty-Undertaking-Linyang.docx | `templates/` | **1.0** | **17 Mar 2026** | **OEM step-in letter for Linyang signature** |
| ClientLTSA.md | `templates/` | 3.0 | Feb 2026 | Template v3.0 — Superseded by v4.0 |
| ClientLTSA_v4.0.docx | `templates/` | **4.0** | **17 Mar 2026** | **Tier D removed, section numbers fixed, SOH table corrected, lender assignment** |
| service_management.md | `reference/` | 1.1 | Jan 2025 | Active |
| employee_service_manual.md | `reference/` | 2.0 | Jan 2026 | Active |
| DSO_compliance.md | `reference/` | 3.0 | Jan 2026 | Active |
| regulatory_compliance_checklist.md | `reference/` | 3.1 | Jan 2026 | Active |
| RFI_Linyang_compliance.md | `in-negotiation/linyang-sales/` | 1.0 | Jan 2026 | Active |
| client_compliance_memo.md | `templates/` | 1.0 | Jan 2026 | Template |
| DOCUMENT_INDEX.md | `legal/` | 6.0 | **6 Mar 2026** | **Updated — folder restructure + email log** |

---

## Quick Reference - Key Provisions

### Anti-Circumvention Penalty Fees (distribution.md)
| Contract Value | Penalty Fee |
|----------------|-------------|
| Up to EUR 500,000 | EUR 75,000 |
| EUR 500,001 - EUR 2,000,000 | 15% of value |
| Above EUR 2,000,000 | 20% of value (max EUR 500,000) |
| Minimum per violation | EUR 50,000 |

### Delay Liquidated Damages (client_sales.md)
| Delay Period | Rate |
|--------------|------|
| Days 1-30 | 0.1% per day |
| Days 31-60 | 0.15% per day |
| Day 61+ | 0.2% per day |
| Maximum | 10% of Contract Price |

### Response Times (LTSA)
| Alert Level | Initial Response | On-Site (if required) |
|-------------|------------------|----------------------|
| Critical | 4 hours | 24 hours |
| Major | 24 hours | 72 hours |
| Minor | 72 hours | Next scheduled visit |

### LTSA Pricing (Linyang Confirmed – EUR/MWh/Year)

**OEM Maintenance Costs (Linyang to Lighthief):**
| Service | OEM Cost | Notes |
|---------|----------|-------|
| BESS Maintenance | €815.72 | Confirmed Feb 2026 RFI |
| PCS + MVS Maintenance | €924.28 | Confirmed Feb 2026 RFI |
| **TOTAL Tier C OEM Cost** | **€1,740.00** | **Confirmed** |

**Lighthief Client-Facing Rates:**
| Service | Client Rate | Notes |
|---------|-------------|-------|
| BESS Preventive + Corrective Maintenance | €1,157.62 | Includes monitoring + bi-annual servicing |
| PCS + MVS Maintenance | €1,311.97 | Includes monitoring + bi-annual servicing |
| 97% Availability Guarantee | €2,201.73 | Requires local team + spare parts warehouse |

**Warranty Extension (OEM Confirmed Costs):**
| Extension | OEM Cost | Status |
|-----------|----------|--------|
| BESS Warranty Extension (Yr 6-10) | €913.92 | ✅ Confirmed (V1 & V3) |
| BESS Warranty Extension (Yr 11-15) | €1,157.62 | ✅ Confirmed (V3 — previous V1 conflict €4,182.25 resolved) |
| BESS Warranty Extension (Yr 16-20) | N/A | ❌ Not available (15-year max) |
| PCS+MVS Warranty Extension (Yr 6-10) | €747.76 | ✅ Confirmed (V1 & V3) |
| PCS+MVS Warranty Extension (Yr 11-15) | €926.10 | ✅ Confirmed (V3 — previous V1 rate €1,086.20 revised down) |
| PCS Warranty Extension (Yr 16-20) | N/A | ❌ Not available (15-year max) |

**Alternative:** Upfront spares package at €1,000–1,250/MWh (confirmed)

*Pricing last verified: February 2026 (Linyang RFI V1 Answers)*

### LTSA Tier Comparison
| Feature | Tier A | Tier B | Tier C |
|---------|--------|--------|--------|--------|
| 24/7 Remote Monitoring | ✓ | ✓ | ✓ | ✓ |
| Bi-Annual On-Site Maintenance | ✓ | ✓ | ✓ | ✓ |
| Quarterly Health Checks | ✓ | ✓ | ✓ | ✓ |
| Corrective Maintenance | - | ✓ | ✓ | ✓ |
| PCS/MVS Maintenance | - | ✓ | ✓ | ✓ |
| 97% Availability Guarantee | - | - | ✓ | ✓ |
| Local Spare Parts Warehouse | - | - | ✓ | ✓ |
| Availability Liquidated Damages | - | - | ✓ | ✓ |
| SOH Guarantee | - | - | - | ✓ |
| Performance Warranty | - | - | - | ✓ |
| Cell Augmentation Provision | - | - | - | ✓ |

### Availability Liquidated Damages (Tier C/D)
| Availability | Fee Reduction |
|--------------|---------------|
| 95% - <97% | 5% |
| 93% - <95% | 10% |
| 90% - <93% | 15% |
| Below 90% | 20% (max) |

### OEM Degradation Curves (Linyang Power Atlantic 5MWh)

**Initial SOH at COD: 98.5%**

| Year | 0.25P 2CPD | 0.5P 2CPD |
|------|------------|-----------|
| 0 | 98.50% | 98.50% |
| 1 | 93.91% | 93.78% |
| 2 | 90.66% | 90.17% |
| 3 | 87.97% | 87.53% |
| 4 | 85.76% | 84.93% |
| 5 | 83.72% | 82.95% |
| 6 | 81.78% | 80.50% |
| 7 | 80.08% | 78.47% |
| 8 | 78.09% | 75.94% |
| 9 | 76.12% | 73.83% |
| 10 | 74.13% | 71.34% |
| 11 | 72.11% | - |
| 12 | 70.10% | - |

*Note: CPD = Cycles per Day, P = Power rating*

### SOH Guarantee Milestones — OEM Confirmed (Not Currently Offered)
| Year | OEM Guaranteed SOH | Client LTSA Guarantee | Status |
|------|--------------------|-----------------------|--------|
| 5 | ≥85% | 85% | ✅ Confirmed |
| 10 | ≥79.58% | 79.58% | ✅ Confirmed |
| 15 | ≥70% | 70% | ✅ Confirmed |
| 20 | N/A | N/A | ❌ Not available (15-year max) |

*SOH based on 1 cycle per day operation. Linyang confirmed Feb 2026.*

### Insurance Requirements
| Party | Coverage | Minimum |
|-------|----------|---------|
| Linyang | Product Liability | EUR 5,000,000 |
| Linyang | Professional Indemnity | EUR 2,000,000 |
| Lighthief | Commercial Liability | EUR 1,000,000 |
| Lighthief | Professional Indemnity | EUR 1,000,000 |

---

## Contact Information

**Lighthief Cyprus Ltd**
- Registered: Agiou Andreou 241, AG TRIAS COURT, Flat/Office 31, 3036 Limassol, Cyprus
- Operational: 15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol, Cyprus
- Company No: HE 477423
- TIN: 60187188Q

**Jiangsu Linyang Energy Storage Technology Co., Ltd**
- F17, Building D1, No. 2 Mudanjiang Street, Jianye District, Nanjing, Jiangsu 210004, China

**Solarfun Renewable Energy Poland sp. z o.o.**
- ul. Towarowa 7, 00-839 Warsaw, Poland
- KRS: 0001164462

---

## OEM Warranty Reference (Linyang LYCN/WI-3410)

### Key Warranty Requirements

| Requirement | Detail |
|-------------|--------|
| Standard Period | 5 years (all components) |
| Warranty Start | Earlier of: Commissioning OR 6 months after shipment |
| Payment Requirement | Full payment required for warranty |
| Linyang Liability Cap | 10% of defective product value |
| Claim Response Time | 48 hours (excluding weekends/holidays) |
| Replaced Parts | Remain Linyang property |

### Coastal Installation Restrictions

| Enclosure Type | Distance from Sea | Warranty Impact |
|----------------|-------------------|-----------------|
| Non-C5 | > 5 km | Full 5-year warranty |
| Non-C5 | 2-5 km | **Reduced to 2 years** |
| Non-C5 | < 2 km | **WARRANTY VOID** |
| C5-Rated | > 500 m | Full 5-year warranty |
| C5-Rated | < 500 m | **Reduced to 2 years** |

### Warranty Voidance Triggers

- Serial number altered or unidentifiable
- Access refused for inspection/testing
- Product relocated without Linyang written approval
- Unauthorised commissioning, repair, or modification
- Overdue payments (Linyang may require deposit)

### ⚠️ WARRANTY-VOIDING BATTERY CONDITIONS (Per User Manual V2.0)

| Condition | Threshold | Duration |
|-----------|-----------|----------|
| Low Cell Voltage | < 2.8V | 120 consecutive hours |
| Zero SOC | 0% | 120 consecutive hours |
| Under-Voltage | ≤ 2.5V | Any occurrence |

**Prevention:** Never leave BESS in low SOC/voltage for extended periods

### Warranty Exclusions Summary

- Consumables and wear parts
- Cosmetic defects
- Improper transport/handling/storage/installation
- Unauthorised modifications
- Natural disasters and Force Majeure
- Salt spray/corrosion exceeding design specs
- Operation exceeding specifications
- Third-party equipment damage

---

## OEM Maintenance Reference (Linyang 5MWh Manual)

### Maintenance Schedule Summary

| Frequency | Key Items |
|-----------|-----------|
| **Initial Grid Connection** | Cable specs, terminal materials, bolt sizes, gasket direction |
| **Monthly** | Container condition, BMS data backup, air flow, system status |
| **Every 6 Months** | Cable shielding, SPD, fuses, copper bus bar |
| **Annually** | Ground resistance (≤4Ω), equipotential bonding, cable layout/torque |

### Critical Safety Precautions

| Precaution | Requirement |
|------------|-------------|
| Weather | Do NOT open door in rain, humidity, snow, fog, or wind |
| MSD Disconnection | Disconnect ALL MSDs before rack maintenance |
| Pack Unplugging | Unlock locking structure BEFORE unplugging |
| Scope Limit | Do NOT perform maintenance beyond OEM manual |
| Snow Clearance | Clear snow from equipment promptly |
| Dehumidification | Open door in fair weather to dehumidify |

### Key Measurements

| Item | Requirement |
|------|-------------|
| Ground Resistance | Must not exceed 4Ω |
| Humidity | Within normal range (<95% RH) |
| Cable Torque | Per OEM specification |

---

## Technical Specifications Reference (Linyang Power Atlantic 5MWh)

### System Specifications

| Parameter | Specification |
|-----------|---------------|
| Battery Chemistry | Lithium Iron Phosphate (LFP) |
| Configuration | 12P416S |
| Rated Energy | 5,015 kWh |
| Voltage Range | 1,164.8V – 1,497.6V |
| Duration | ≥2 hours |
| Container Dimensions | 6,058 x 2,438 x 2,896 mm |
| Weight | ~43 tonnes |
| IP Rating | IP54 (container), IP67 (pack) |

### Operating Limits (CRITICAL)

| Parameter | Limit | Note |
|-----------|-------|------|
| Charging Temperature | 0°C to +55°C | **Below 0°C voids warranty** |
| Discharging Temperature | -20°C to +55°C | |
| Humidity | <95% RH | Non-condensing |
| Cell Voltage | 2.5V – 3.65V | |
| System Voltage | 1,164.8V – 1,497.6V | |

### Cell Specifications

| Parameter | Specification |
|-----------|---------------|
| Cell Capacity | 314 Ah |
| Nominal Voltage | 3.2V |
| Cycle Life | 7,000 cycles (to 70% EOL, 90% DOD) |
| C-Rate (Standard) | 0.5C |
| C-Rate (Maximum) | 1C |

### BMS Accuracy

| Parameter | Accuracy |
|-----------|----------|
| Cell Voltage | ±5 mV |
| Cell Temperature | ±1°C |
| SOC | ≤5% |

### Employee Reference

See: `employee_service_manual.md` for detailed procedures on:
- Warranty claim process
- Required documentation
- Maintenance protocols
- Compliance checklists

---

## DSO/Grid Compliance Reference (Cyprus)

### Regulatory Authorities

| Authority | Role | Contact |
|-----------|------|---------|
| **CERA** | Cyprus Energy Regulatory Authority | Licensing, market rules |
| **TSOC** | Transmission System Operator | Grid connection >8MW |
| **EAC/DSO** | Electricity Authority of Cyprus | Grid connection ≤8MW |
| **MECIT** | Ministry of Energy | Policy, permits |

### Applicable Standards

| Standard | Description |
|----------|-------------|
| EN 50549-1 | LV distribution network requirements |
| EN 50549-2 | MV distribution network requirements |
| IEC 62933 | Electrical energy storage systems |
| IEC 61850 | Power utility communication |

### Key Grid Connection Requirements

- See: `DSO_compliance.md` for full checklist
- Protection settings per DSO requirements
- Communication/SCADA integration
- Metering per DSO specifications
- Testing and commissioning procedures
- Ongoing compliance reporting

### Linyang BMS Communication Capability

| Interface | Protocol | Use |
|-----------|----------|-----|
| BAMS | CAN/RS485/Modbus | System-level |
| BCMU | CAN/RS485/Modbus | Cluster-level |
| Ethernet | Modbus TCP | Remote/DSO |

### BMS Metering Accuracy

| Parameter | Accuracy |
|-----------|----------|
| Voltage | ±0.5% FSR |
| Current | ±0.5% FSR |
| Energy | ≤±2% |

**Note:** DSO_compliance.md requires completion with specific Cyprus DSO requirements from PARARTIMA 3o MEROS I document.

---

---

## Downstream — Esperia / Galascope Ltd (May 2026)

| Date | Event | Location | Status |
|------|-------|----------|--------|
| **10 May 2026** | **Full contract package emailed to Dino (Esperia)** — EPC v5.1, LTSA v4.0, EMS subscription addendum, OEM Direct Warranty Undertaking (Linyang), updated pipeline LOI; supporting Linyang technical agreement drafts (2.5/10 and 5/20) | `docs/clients/group-order/Group2_Esperia_Energy/contracts/` | **Awaiting client legal review** |

**Note:** Internal SSOT (`lib/portfolio-data.ts`) and Batch 1 metadata updated to reflect “sent — awaiting review,” not “ready to send.” Spanercom package remains prepared separately until instructed to transmit.

---

## Full Contract Risk Review (May 2026)

**Document:** `docs/internal/full-contract-risk-review-may2026.html`
**Reference:** LCY-RISK-001 v1.0
**Date:** 6 May 2026
**Scope:** Full upstream + downstream legal alignment matrix, Batch 1 cashflow waterfall, 5 stress scenarios (S1–S5), 6 partner-level risk assessments, Go/No-Go signing checklist, 9-item clause gap register.

**Key findings:**
- 3 Critical gates before B1 advance: Sales Contract signed, APG received, CAR insurance placed
- August/September 2026 cash pinch: balance drops to ~€190K after Linyang DAP payment — €500K–€1M working capital facility required
- PI policy (Grawe) is wrong class (architect/engineer vs EPC contractor) — must rebroker
- AXA Absolute Pollution Exclusion + no declarations page = critical insurance evidence gap
- 9 clause amendments identified (G1–G9); G1 critical (DA payment term vs Sales Contract discrepancy)

---

*Document Index Version: 10.1*
*Updated: 10 May 2026*
*Legal Basis: Gazette No. 5992 (16/01/2026)*
*Lighthief Cyprus Ltd - Legal Framework*

---

## COMPLIANCE STATUS

| Area | Status |
|------|--------|
| Legal Compliance | ✅ YES |
| DSO Technical | ✅ YES |
| Safety Compliance | ✅ YES |
| Planning Exemption | ✅ ELIGIBLE |
| Missing Items | ⚠️ Minor (RFI sent) |

---

## ONE-LINE TAKEAWAY

> **Your BESS qualifies for planning permit exemption under the 2026 Special Development Order. All safety certifications are in place. You are well ahead of typical Cyprus BESS projects.**

