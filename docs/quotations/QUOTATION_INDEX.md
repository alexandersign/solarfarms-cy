# QUOTATION & PROCUREMENT INDEX
## Cyprus BESS Portfolio — 51 Parks / 881.78 MWh

**Last Updated:** 13 February 2026  
**Status:** 🔴 CRITICAL GAPS REMAIN  

---

## FOLDER STRUCTURE

```
docs/quotations/
├── linyang/               # OEM equipment quotations (Linyang Energy)
├── interfreight/          # Customs & logistics quotation (Interfreight Logistics)
├── asoulis/               # Heavy transport & crane RFQ (A. Soulis)
├── dehn/                  # Lightning protection RFQ (DEHN)
├── abio-request/          # Client BESS request (Abio Power)
├── rfq/                   # Issued Requests for Quotation
├── rfp/                   # Issued Requests for Proposal (12 docs)
├── rfi/                   # Requests for Information to Linyang/Kehua (9 docs)
└── internal-analysis/     # Pricing models, gap analysis, margin breakdowns
```

---

## 1. RECEIVED QUOTATIONS

| # | Vendor | Document | Date | Scope | Status | Key Data |
|---|--------|----------|------|-------|--------|----------|
| 1 | **Linyang Energy** | `Quotation - Linyang ESS 202602111.xlsx` | 11 Feb 2026 | CIF equipment (51 parks) | ✅ RECEIVED | €86.0M total, €82–129/kWh CIF, Incoterms CIF Limassol |
| 2 | **Interfreight Logistics** | `logistics-quote-interfreight-jan2026.md` | 31 Jan 2026 | Customs clearance & inland transport | ✅ RECEIVED | €700–935/container (excl. heavy lift), duty rates confirmed |
| 3 | **A. Soulis** | `Stephanos Soulis- Haulage.pdf` | Nov 2025 | Heavy transport + crane unloading | 🟡 AMBER — Assumptions derived | €2,625–3,525/container (type + district model from Limassol 20ft quote). Portfolio est: €819K |
| 4 | **Strike RA Consultants** | `TP5167` | 6 Feb 2026 | Soil resistivity testing (50 sites) | ✅ RECEIVED | £104,000 total (£1,700/site + £19K travel). Reports TBC |
| 5 | **Strike RA Consultants** | `TP5172` | 6 Feb 2026 | HVI installation (per site) | ✅ RECEIVED | £1,875/installation (labor only, excl. materials/travel/excavation) |
| 6 | **Voltus Energy** | Via RFI response (Jan 2026) | Jan 2026 | EMS/SCADA/PPC pricing | ⚠️ PARTIAL | Initial pricing received, update requested for expanded scope |
| 7 | **Linyang** (RFI responses) | `rfi-linyang-responses-feb2026.md` | Feb 2026 | Commercial terms, LTSA, warranties | ⚠️ PARTIAL | LTSA €1,740/MWh/yr confirmed; warranty extensions priced |

---

## 2. ISSUED RFQs (Awaiting Response)

| # | Vendor | Document | Issued | Due | Scope | Response |
|---|--------|----------|--------|-----|-------|----------|
| 1 | **DEHN / Strike RA** | `dehn-spd-lps-pricing-feb2026.xlsx` + `BESS LPS Proposal.docx` | Feb 2026 | 30 days | LPS + SPD + Earthing (5MW ref park = €9,210) | ✅ **RECEIVED** |
| 2 | **A. Soulis** | `rfq-transport-asoulis-jan2026.html` | 27 Jan 2026 | 7 Feb 2026 | Heavy haulage + crane for 246 containers | 🔴 **OVERDUE** |

---

## 3. ISSUED RFPs (All Pending)

| # | Subject | Document | Due Date | Vendor | Response |
|---|---------|----------|----------|--------|----------|
| 1 | Civil/Concrete Foundations | `rfp-civil-concrete-base-jan2026.html` | 10 Feb 2026 | Civil contractors | 🔴 OVERDUE |
| 2 | Electrical Installation (MV/LV) | `rfp-electrical-installation-jan2026.html` | 10 Feb 2026 | Electrical contractors | 🔴 OVERDUE |
| 3 | Earthing & Grounding | `rfp-earthing-grounding-jan2026.html` | 10 Feb 2026 | Electrical contractors | 🔴 OVERDUE |
| 4 | Protection Relay Testing | `rfp-protection-testing-jan2026.html` | 10 Feb 2026 | Testing contractors | 🔴 OVERDUE |
| 5 | Remote Trip & UPS | `rfp-remote-trip-ups-jan2026.html` | 10 Feb 2026 | Electrical vendors | 🔴 OVERDUE |
| 6 | SCADA/EMS Integration | `rfp-scada-ems-jan2026.html` | — | EMS providers | 🔴 PENDING |
| 7 | Cybersecurity (NIS2) | `rfp-cybersecurity-nis2-jan2026.html` | 14 Feb 2026 | Cybersecurity vendors | 🟡 DUE TOMORROW |
| 8 | Insurance CAR/EAR | `rfp-insurance-car-ear-jan2026.html` | 14 Feb 2026 | Insurance brokers | 🟡 DUE TOMORROW |
| 9 | Insurance Comprehensive | `rfp-insurance-comprehensive-feb2026.html` | 21 Feb 2026 | Insurance brokers | 🟡 UPCOMING |
| 10 | Insurance CAR Timeline | `rfp-insurance-car-timeline-feb2026.html` | — | Internal reference | ℹ️ INTERNAL |

---

## 4. ISSUED RFIs (Linyang/Kehua)

| # | Subject | Document | Status | Completion |
|---|---------|----------|--------|------------|
| 1 | Master Tracker (41 items) | `rfi-master-tracker-jan2026.md` | 🟡 PARTIAL | 39% (16/41 confirmed) |
| 2 | Linyang Final Consolidated | `rfi-linyang-final-feb2026.md` | 🟡 PARTIAL | Some docs received |
| 3 | Linyang Responses | `rfi-linyang-responses-feb2026.md` | ✅ RECEIVED | Key commercial terms confirmed |
| 4 | Legal Guarantees | `rfi-legal-guarantees-linyang-feb2026.html` | 🔴 PENDING | Warranty, APG, bonds, LDs |
| 5 | Spare Parts List | `rfi-spares-list-jan2026.md` | 🔴 PENDING | Due 14 Feb 2026 |
| 6 | Spares Clarification | `rfi-spares-clarification-feb2026.md` | 🔴 PENDING | "3 pallets" scope unclear |
| 7 | Voltus EMS Update | `rfi-voltus-ems-update-feb2026.html` | 🔴 PENDING | Due 21 Feb 2026 |
| 8 | EMS Provider General | `rfi-ems-provider-feb2026.html` | 🔴 PENDING | Due 14 Feb 2026 |

---

## 5. DOCUMENTS NOT YET IN REPO

The following documents were referenced but are **not in the repository**. They need to be added:

| # | Document | Source | Expected Content |
|---|----------|--------|-----------------|
| ~~1~~ | ~~Dhen SPD LPD.pdf~~ | ~~DEHN~~ | ✅ FOUND — Our RFQ reference layout (not DEHN pricing response) |
| ~~2~~ | ~~TP5167 - Soil resistivity testing~~ | ~~Strike RA~~ | ✅ FOUND — £104K for 50 sites (excl. reports) |
| ~~3~~ | ~~TP5172 - HVI Installation~~ | ~~Strike RA~~ | ✅ FOUND — £1,875/installation (labor only, excl. materials/travel) |
| 4 | **DEHN SPD/LPS quotation response** | DEHN | Actual pricing for SPD kits + LPS materials — NOT RECEIVED |
| 5 | A. Soulis formal quotation response | A. Soulis | Heavy transport pricing per district |
| 5 | Civil contractor quotation(s) | TBD | Concrete foundation pricing |
| 6 | Electrical installation quotation(s) | TBD | MV/LV cabling & termination pricing |
| 7 | Earthing contractor quotation(s) | TBD | Earthing grid per park pricing |
| 8 | Protection testing quotation | TBD | Relay testing & DSO witness pricing |
| 9 | Insurance broker proposals | TBD | CAR/EAR/comprehensive premiums |
| 10 | EMS/SCADA vendor proposals | Voltus / others | Full EMS pricing per park |

---

## 6. CRITICAL MISSING DATA SUMMARY

### 🔴 CRITICAL (Blocking EPC cost finalization)

| # | Missing Item | Impact | Action Required |
|---|-------------|--------|-----------------|
| 1 | **Import duty rate confirmation** | ±€1.5M on portfolio (0.9% vs 2.7% vs 3.0% on batteries) | Get BTI ruling from Cyprus Customs via Interfreight |
| 2 | **Heavy transport & crane pricing** (A. Soulis formal) | 🟡 Est. €819K (251 containers, type+district model) | Follow up — formal quote overdue since 7 Feb. Current model = AMBER assumptions |
| 3 | **Civil works quotation** | ✅ €2,000/MWh confirmed (Kamil, Feb 2026). Portfolio: €1,763,560. Platforms, trenches, cabling labour, water trenches. | ✅ CONFIRMED |
| 4 | **Electrical installation quotation** | MV/LV cabling for 51 parks | No contractor quotes received |
| ~~5~~ | ~~DEHN SPD/LPS equipment pricing~~ | ~~SPD+LPS for 251 containers + 51 parks~~ | ✅ RECEIVED — €9,210 per 5MW park (DEHN + Strike RA) |
| 6 | **Earthing & grounding quotation** | Per park; required by Linyang spec (≤1Ω) | No contractor quotes received |
| 7 | **Strike RA report cost** | Soil resistivity reports for 50 sites | Quoted testing (£104K) but report cost TBC |
| 8 | **HVI materials quote** | Lightning rod materials for 246 structures | Strike RA labor only (£1,875/site); materials excluded |

### 🟡 HIGH (Affecting margin/commercial terms)

| # | Missing Item | Impact | Action Required |
|---|-------------|--------|-----------------|
| 7 | **Extended warranty pricing conflict** | Yr 11–15: Linyang quotes €5,268/MWh vs our proposed €2,083 | Negotiate with Linyang |
| 8 | **SOH guarantee remedy costs** | Unclear who pays for module replacement | Clarify in contract |
| 9 | **Performance bond terms** | Linyang requests 5% — needs negotiation | Legal review |
| 10 | **Delay liquidated damages** | Rate and cap undefined | Define in contract |
| 11 | **Spare parts pricing & scope** | "3 pallets" unclear; €1,000–1,250/MWh estimated | Awaiting Linyang response (due 14 Feb) |
| 12 | **EMS/SCADA final pricing** | Voltus update requested for expanded 51 parks | Due 21 Feb |
| 13 | **Insurance premiums** | Est. €240K–490K total | RFPs due 14 Feb / 21 Feb |

### 🟢 CONFIRMED / IN HAND

| # | Item | Source | Value |
|---|------|--------|-------|
| 1 | CIF equipment pricing | Linyang quotation 202602111 | €86.0M (51 parks) |
| 2 | Customs clearance rates | Interfreight | €85/declaration + landing €450–650 |
| 3 | Inland transport rates | Interfreight | €110–250/container by region |
| 4 | LTSA pricing | Linyang RFI response | €1,740/MWh/year |
| 5 | Extended warranty Yr 6–10 | Linyang RFI response | €1,661.68/MWh/year |
| 6 | Payment terms (Linyang) | Linyang RFI response | 30% advance / 70% pre-shipment |
| 7 | Safety certifications | Linyang docs | UL 9540A (cell/module/unit), IEC 62619, IEC 63056, UN38.3 ✅ |
| 8 | Grid compliance (PCS) | Kehua catalogue | EN 50549-2, IEC 62116, IEC 61727 ✅ |

---

## 7. KNOWN DISCREPANCIES TO RESOLVE

| # | Issue | Our Model | External Source | Gap |
|---|-------|-----------|-----------------|-----|
| 1 | **Import duty on batteries** | 3.0% (user confirmed) | Interfreight says 2.7%, original model 0% | Need BTI ruling |
| 2 | **Transport per container** | 🟡 €2,625–3,525 (A. Soulis derived) | €700–935 (Interfreight, standard FCL) | Type + district model. 40HC rates fully estimated. Formal quote overdue |
| 3 | **Civil works per platform** | €4,000 estimate | No contractor quote | Needs field validation |
| 4 | **MV Skid container sizes** | T1/T2 = 20ft, T4/T8 = 40ft | Linyang datasheets | ✅ Confirmed |

---

*Document prepared: 13 February 2026*  
*Classification: INTERNAL — CONFIDENTIAL*
