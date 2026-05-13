# SIA Solar Park (SHIA) — Project Analysis
**CONFIDENTIAL — INTERNAL USE ONLY**

> Seller: Vladimir Novikov · SPV: Arnal Verde Ltd (Elestore 4 Ltd as lessee) · Ref: PARK-RTB-SIA-2026  
> DD package received: May 9, 2026 · Last updated: 2026-05-11

---

## Quick Reference

| Field | Value |
|---|---|
| **Location** | Plot 316, Sheet 39/47, Sia (SIA), **Larnaca District** (near Nicosia border) |
| **PV capacity** | 3.2 MWp (inverter limited to 2.7 MW AC) |
| **BESS (planned)** | 2.5 MW / 10 MWh (4h) — recommended sizing for 50% curtailment |
| **Panel spec** | Jinko 645W bifacial, fixed tilt 15°, 0.5m pile height |
| **Inverters** | Huawei SUN2000-150K (3 × 330kW) → 2.7 MW AC |
| **RTB status** | Permit-Ready — CERA + Town Planning issued; EAC preliminary accepted + deposit paid |
| **COD (realistic)** | Q3 2027 (upon EAC final terms + PPA + EPC) |
| **Asking price** | Not stated — for sale / seeking EPC partner |

---

## Permits & Licensing Status

| Permit | Status | Reference | Date |
|---|---|---|---|
| CERA generation licence | ✅ **Issued** | E3511 | Apr 2025 |
| Town planning permit (3.32 MW) | ✅ **Issued** | — | May 5, 2025 |
| EIA / Ecology report | ✅ **Complete** | — | Apr 2025 |
| Environmental form | ✅ **Filed** | ΛΕΥ-542-2023 | Feb 2025 |
| Land lease | ✅ **Executed** | Plot 316, XXXIX/47 | May 2025 |
| Geological reports | ✅ **Complete** | ETEK report + PV report | Nov 2025 |
| Town planning drawings | ✅ **Complete** | — | Dec 2024 |
| Building permit (substation) | ❌ **Not in DD** | Required by EAC for final terms | Pending |

---

## EAC Grid Connection — Detailed Findings (OCR from source documents)

> Source: `EAC connection/498000141_Grid_Connection_Terms_SIA.pdf` + `Scan_Grid_Connection_Terms_5__SIA.pdf`

### Timeline of events
| Date | Event |
|---|---|
| 27/10/2022 | Arnal Verde submitted grid connection application to EAC DSO |
| 07/02/2023 | EAC issued **Preliminary Connection Terms** (Προκαταρκτική Προσφορά) |
| 22/02/2023 | Arnal Verde **accepted** preliminary terms + **paid 5% deposit** (within 30-day deadline) |
| Jun 2025 | **Amendment 5** to connection terms issued (Scan_Grid_Connection_Terms_5) |
| 24/02/2026 | EAC letter requesting consent for pole installation |
| 06/02/2026 | EAC letter FL4145 requesting documents for substation sublease |

### Connection technical specifications
| Parameter | Value |
|---|---|
| Grid connection ref | **498000141** |
| Connection voltage | **22 kV** |
| Connection method | Ground substation (YLAM) + MV network + aerial/underground cable |
| Licensed capacity | **3 MWp** (per preliminary terms) |
| Annual EAC telecom/metering fee | **€180/year** (for SCADA/metering data link) |
| Annual substation sublease | **€10/year** |

### Connection cost (from OCR)
| Item | Amount |
|---|---|
| EAC preliminary grid infrastructure cost estimate | **€83,842.14 ex VAT** ⚠ PRELIMINARY — NOT BINDING. Subject to change after EAC final Techno-Economic Study |
| 5% acceptance deposit (paid Feb 2023) | €4,192.11 ex VAT / **€4,988.61 incl. 19% VAT** |
| Payment by | Xenophon Xenophontos (Arnal Verde representative) via Astrobank ref 13979010 |

> **Key insight:** The 5% deposit payment confirms Arnal Verde formally accepted the preliminary offer. EAC is committed to connecting the park. This is significantly more advanced than "preliminary terms filed" — the acceptance has been on record since February 2023.

### What is still needed for FINAL binding connection terms
Per EAC letter FL4145 (Feb 2026), the following must be submitted before final terms can be issued:
1. ❌ **Substation building permit** (certified copy) — most likely critical path item
2. ❌ **Company registration certificate** (Registrar of Companies)
3. ❌ **Directors certificate** (Registrar of Companies)
4. ❌ **Land lease registration** (District Land Registry)
5. ❌ **Owner special authorization** (authorising Elestore 4 Ltd to sublet part of plot to EAC)
6. ❌ **IBAN bank details / authorization** (for automatic sublease payment)
7. ❌ **Signed substation sublease agreement** (EAC ↔ Arnal Verde/Elestore 4)

> The substation building permit (#1) is almost certainly the longest-lead item and may not yet have been applied for. If not applied for, this adds 4–6 months before final terms can issue.

---

## Commercial / Revenue

### PPA
- **Status:** Draft v2 (January 2026) — Synenergia, not yet executed
- **Rate:** $0.16/kWh Year 1, indexed from Year 6
- **Tenor:** 30 years

### EPC Contract
- **Status:** Draft extract only — no contractor named
- **Specs:** To be provided 30 days post-signature

### Financial model (from Novikov's FM_3,2MW_250126_BESS.xlsx)
| Metric | Value |
|---|---|
| Total CAPEX (model) | €4.78M (incl. €1.6M development cost) |
| CAPEX/Wp | €1.50/Wp |
| Model PPA | $0.16/kWh Y1 (Synenergia) |
| Annual output Y1 | 4,948 MWh (net with original 1MW/4MWh BESS) |
| Project IRR (30yr) | 12.4% |
| Equity IRR (30yr) | 29.7% (levered, 57.9% LTV, 4%, 15yr) |
| Equity payback | 4.2 years |
| DSCR average | 2.58× |
| Modelled COD | January 2027 — **ALREADY MISSED** |
| Modelled funding start | March 2026 — **ALREADY MISSED** |

---

## Lighthief BESS Sizing (Recommended: 2.5 MW / 10 MWh)

Recommended upgrade based on actual 50% curtailment profile (EAC signals: 30/60/90/100% reduction blocks of 2–5 hours/day):

| Parameter | Value |
|---|---|
| BESS power | 2.5 MW |
| BESS energy | 10 MWh (4h duration) |
| Daily curtailment (avg) | 2.7MW AC × ~3.7h = ~10 MWh → fully capturable |
| Annual curtailed energy | ~2,507 MWh (50% of 5,014 MWh gross potential) |
| BESS capture (87.4%) | 2,191 MWh charged |
| Discharged (86.32% RTE) | 1,891 MWh |
| Revenue at €195/MWh | ~€369K/yr (BESS) |
| Solar revenue (uncurtailed 50%) | ~€354K/yr |
| **Gross Y1 revenue (model)** | **~€723K/yr** |

> Original 1MW/4MWh BESS in Novikov's model would only capture ~4 MWh/day vs ~10 MWh available — leaving ~60% of curtailed energy on the table. 2.5MW/10MWh captures effectively all of it.

---

## CAPEX Stack (Lighthief Proposal Basis)

| Item | Amount | Notes |
|---|---|---|
| RTB acquisition | **€600,000** | Incl. EAC connection terms (deposit paid) |
| EAC grid infrastructure works | **€83,842** | Per preliminary connection cost estimate (OCR) |
| PV EPC (3.2 MWp, Lighthief) | **€2,304,000** | €720k/MWp |
| BESS EPC (10 MWh, Lighthief) | **€1,270,000** | €127k/MWh |
| **Total project CAPEX** | **€4,257,842** | Ex VAT |

> Note: Novikov's model shows €4.78M total including €1.6M development cost. Lighthief EPC pricing is €200–500k lower on EPC scope than his modelled costs.

---

## Elestore / ABIO Connection

The SPV structure (`Elestore 4 Ltd` as land lessee) shares naming with the ABIO Power portfolio (Elestore 1–5, standalone 12MW/40MWh BESS, Nicosia, filed under ABIO Power Ltd / Iacovos Charalambous). Possible that Novikov and Charalambous are co-owners operating different aspects of the same entity family.

The standalone Elestore BESS projects (12MW/40MWh each) may be intended to sit alongside or be related to the SIA PV park rather than being completely separate assets. **Clarify with Novikov.**

---

## Realistic Timeline

| Milestone | Status | Realistic Date |
|---|---|---|
| CERA + Town Planning | ✅ Done | Apr–May 2025 |
| EAC prelim terms accepted + deposit paid | ✅ Done | Feb 2023 |
| EAC poles consent | Received letter Feb 2026 | In progress |
| Substation building permit (application) | ❌ Unknown | 4–6 months from application |
| EAC substation sublease + final connection terms | ❌ Pending | Sep–Nov 2026 (optimistic) |
| PPA execution (Synenergia) | ❌ Draft v2 | Jul–Sep 2026 |
| EPC contract signed (Lighthief) | ❌ Not started | Aug–Oct 2026 |
| Financial close | ❌ Not started | Nov 2026–Q1 2027 |
| Construction (6–9 months) | — | Q1–Q3 2027 |
| **Target COD** | — | **Q3–Q4 2027** |

---

## Outstanding Questions for Novikov

1. Has the **substation building permit** been applied for? What is the current status?
2. Is the **PPA with Synenergia** close to execution? Any competing offtake options?
3. What is the current status of the **EAC FL4145 document submission**?
4. Is he open to **resizing the BESS to 2.5MW/10MWh** given 50% curtailment?
5. What is the relationship between **Elestore 4 Ltd and ABIO Power** (Iacovos Charalambous)?
6. Does he have the **standalone wind farm** available for BESS integration as well?

---

## Key Risks

| Risk | Level | Detail |
|---|---|---|
| Substation building permit | 🔴 High | Unknown status — critical path to final EAC terms |
| PPA execution | 🟡 Medium | Draft v2 only — Synenergia negotiation ongoing |
| EPC contractor | 🟡 Medium | No contractor named in draft contract |
| Timeline vs model | 🔴 High | COD Jan 2027 impossible; realistic Q3–Q4 2027 |
| Connection cost | 🟢 Low | Preliminary estimate confirmed: ~€84k ex VAT |
| Grid capacity | 🟢 Low | EAC accepted and committed (deposit paid Feb 2023) |
| Curtailment revenue | 🟡 Medium | 50% curtailment confirmed by operator; BESS size matters |

---

*EAC OCR source: `498000141_Grid_Connection_Terms_SIA.pdf` + `Scan_Grid_Connection_Terms_5__SIA.pdf` · Extracted May 2026 using Tesseract 5.5.2*
