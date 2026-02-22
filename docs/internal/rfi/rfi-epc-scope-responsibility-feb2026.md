# RFI — EPC Scope of Work & Responsibility Matrix
## Linyang Energy × Lighthief Group

> **Reference:** LCY-RFI-EPC-SCOPE-2026-001  
> **Date:** 13 February 2026 (Updated 15 February 2026)  
> **Version:** 2.0  
> **Status:** UPDATED — Post Kamil/Voltus scope meeting 15 Feb 2026  
> **Classification:** CONFIDENTIAL — COMMERCIAL IN CONFIDENCE

---

## 1. Purpose

This RFI establishes the **EPC scope of work boundaries** between **Linyang Energy** (OEM & EPC lead) and **Lighthief Group** (local EPC partner & project developer) for the Cyprus BESS portfolio.

For each EPC work item, both parties must agree on:
- **Responsibility** — who performs the work (Linyang, Lighthief, or shared)
- **Pricing** — whether included in CIF, additional, or on Lighthief's account
- **Scope definition** — what exactly is included and excluded

> ⚠️ **CRITICAL:** All items marked with a price field require either confirmation that they are included in CIF, or a separate price quotation. Items left blank = NOT included in CIF.

---

## 2. Project Reference

| Parameter | Value |
|-----------|-------|
| Portfolio | Cyprus BESS — 51 parks, 6 client groups |
| Total Capacity | ~249 MW / ~863.5 MWh |
| Equipment Supplier | Linyang Energy + Kehua Tech (PCS) |
| CIF Quote | LY202601271 (27 Jan 2026) |
| Container Types | BESS: 20' HC (43t) · MV SKID T1/T2: 20' Std (15-20t) · MV SKID T4/T8: 40' HC (35-38t) |

---

## 3. Scope of Work — Responsibility Matrix

### A. Equipment Supply & CIF Delivery

| # | Work Item | Linyang | Lighthief | Price | Status |
|---|-----------|:-------:|:---------:|-------|--------|
| A1 | Battery Containers (ME 5.015 MWh) | ✅ | | Incl. CIF | ✅ Confirmed |
| A2 | PCS (Kehua BCS C-series) | ✅ | | Incl. CIF | ✅ Confirmed |
| A3 | MV SKID (Transformer + RMU + Switchgear) | ✅ | | Incl. CIF | ✅ Confirmed |
| A4 | BMS | ✅ | | Incl. CIF | ✅ Confirmed |
| A5 | Liquid Cooling System | ✅ | | Incl. CIF | ✅ Confirmed |
| A6 | Fire Suppression System | ✅ | | Incl. CIF | ✅ Brand? |
| A7 | Auxiliary Systems Cabinet | ✅ | | Incl. CIF | ❓ Exact contents? |
| A8 | CIF Shipping to Limassol | ✅ | | Incl. CIF | ✅ Confirmed |

### B. Mechanical Installation & Commissioning

> **Updated: 15 Feb 2026 — Kamil/Voltus scope meeting**

| # | Work Item | Linyang | Lighthief | Price if Extra | Status |
|---|-----------|:-------:|:---------:|---------------|--------|
| B1 | **Mechanical Installation** — container positioning, crane, loading/offloading, connecting cables, foundations | ✅ | support | Incl. CIF | ✅ **LINYANG** — 4 Polish + 8 Chinese = 12 on-site. Lighthief: 5 teams × 6 persons = 30 support staff. Foundations by Polish subcontractor (60–80cm concrete blocks). |
| B2 | **Electrical Installation (DC/AC)** — DC/AC cabling between BESS and PCS | ✅ | | Incl. CIF | ✅ **LINYANG** — Training during Poland visit. Thermal camera check before commissioning. |
| B3 | **LV Cabling** — aux power, comms, Ethernet, 24V UPS between containers | | ✅ | Lighthief cost | ✅ **LIGHTHIEF** — Needs Ethernet cable to EMS + two LV cables with 24V UPS. Internet connection separate. |
| B4 | **MV Cabling** — SKID to PCC | | ✅ | Lighthief cost | ✅ **LIGHTHIEF** — Cost and installation. Procedure trained in Poland. |
| B5 | **MV Terminations** — cable termination at SKID & PCC | ✅ | ✅ | Shared | ✅ **SHARED** |
| B6 | **Commissioning (System Level)** — Cold: pre-comm, visual. Hot: energisation, charge/discharge. System: EMS integration | | ✅ | See breakdown | ✅ **Cold: LIGHTHIEF** · **Hot: SHARED (Linyang+Lighthief)** · **System: SHARED + VOLTUS** |
| B7 | **Commissioning (DSO Witness)** — EAC grid connection, protection relay testing under DSO | ✅ | ✅ | Shared | ✅ **SHARED** |
| B8 | **FAT (Factory Acceptance Test)** | | ✅ | Lighthief cost | ✅ **LIGHTHIEF** — One-time Polish FAT engineer can attend. |
| B9 | **SAT (Site Acceptance Test)** — SAT report and procedures | ✅ | | Incl. CIF | ✅ **LINYANG** — SAT report contains all procedures for BESS commissioning. |
| B10 | **On-Site Personnel** — Linyang + Lighthief combined | ✅ | ✅ | See breakdown | ✅ **LINYANG:** 4 Polish + 8 Chinese (12 total). **LIGHTHIEF:** 5 teams × 6 = 30 staff. |

### C. Protection, Earthing & Safety

> **Updated: 15 Feb 2026 — Kamil/Voltus scope meeting**

| # | Work Item | Linyang | Lighthief | Price if Extra | Status |
|---|-----------|:-------:|:---------:|---------------|--------|
| C1 | **Protection Relay Configuration** — CT class, settings, upload, testing | | ✅ | Lighthief cost | ✅ **LIGHTHIEF** — ⚠️ CT class MUST be agreed with DSO before Kehua order. CT on MV preferred; LV busbar too tight. **PRODUCTION-BLOCKING.** |
| C2 | **SPD (Surge Protection)** — DC 1500V, LV 400V, MV 22kV, Aux, Comms | | ✅ | DEHN quoted €148,617 | ✅ **LIGHTHIEF via DEHN** — Full SPD suite quoted. |
| C3 | **Lightning Protection (LPS)** — air terminals, HVI light plus, LPS III/IV | | ✅ | DEHN quoted €148,538 | ✅ **LIGHTHIEF via DEHN** → charged to client. |
| C4 | **Earthing / Grounding** — earth grid, electrodes, bonding | | ✅ | DEHN quoted €251,568 | ✅ **LIGHTHIEF via DEHN** — €793.59/structure. ⚠️ Welding bolts may damage rooftop. 1 week notice, 1 day execution. DEHN team 1–2 weeks after container placement. |
| C5 | **Remote Trip System** — DSO relay, interlock with PCS | ☐ | ☐ | €_________ | ❓ Still unclear |
| C6 | **UPS / Auxiliary Power** — for BMS, SCADA during outage | ☐ | ☐ | €_________ | ❓ Needs 24V UPS cable to each container (per meeting). Supply source TBD. |

### D. SCADA, EMS & Controls

> **Updated: 15 Feb 2026 — Kamil/Voltus scope meeting**

| # | Work Item | Linyang | Lighthief | Price if Extra | Status |
|---|-----------|:-------:|:---------:|---------------|--------|
| D1 | **EMS/SCADA** | | ✅ | Voltus quoted | ✅ Lighthief via Voltus |
| D2 | **PPC (Power Plant Controller)** | | ✅ | In Voltus EMS | ✅ **NOT NEEDED as separate item** — PPC = WAGU, integrated in Voltus EMS quote. **RESOLVED.** |
| D3 | **ITC Gateway / DSO IEC 60870-5-104** | | ✅ | In Voltus EMS | ✅ **VOLTUS** — ITC gateway from EMS. Modbus PCT integration included in Voltus quote. |
| D4 | **Modbus TCP Integration** — EMS ↔ PCS ↔ BMS communication addresses | ✅ data | ✅ integration | In Voltus EMS | ✅ **Linyang provides data → Voltus provides integration.** Addresses in Technical Agreement. |
| D5 | **Cybersecurity / NIS2** — hardening, compliance | ☐ | ☐ | €_________ | ❓ **UNASSIGNED** — NIS2 hardening required. No ownership agreed. Action item from 15 Feb meeting. |
| D6 | **WAGU Spare Controllers** | | ✅ | TBD | 🟡 **NEW** — Need spare memory card + 5–10 extra controllers (10% spares rule). Quote from Voltus pending. |

### E. Civil Works & Site Preparation

> **Updated: 15 Feb 2026 — Civil works confirmed by Kamil**

| # | Work Item | Linyang | Lighthief | Price | Status |
|---|-----------|:-------:|:---------:|-------|--------|
| E1 | **Civil Works (all-in)** — platforms, trenches, cabling labour, water trenches | ✅ subcontract | ✅ pays | ✅ €2,000/MWh confirmed | ✅ **Kamil confirmed.** Polish subcontractor, 60–80cm concrete blocks. DQG files show positions. Portfolio: €1,763,560. |
| E2 | ~~Drainage & Water Management~~ | | | Incl. in E1 | ✅ **Included in civil works rate** |
| E3 | Access Roads / Hardstanding | | ✅ | Site-dependent | Lighthief scope |
| E4 | **Fencing & Entrance Control** | | ✅ | €_________ | 🟡 **NEW** — Meeting flagged need for entrance control. Not currently priced. Needs assessment per park. |

### F. Logistics & Import

> **Updated: 15 Feb 2026 — Marine insurance and ADR confirmed**

| # | Work Item | Linyang | Lighthief | Price | Status |
|---|-----------|:-------:|:---------:|-------|--------|
| F1 | Port Handling & Customs | | ✅ | Interfreight quoted | ✅ Lighthief |
| F2 | Import Duty (3.0% of CIF) | | ✅ | 3.0% confirmed | ✅ Lighthief |
| F3 | Heavy Transport & Crane | | ✅ | 🟡 A. Soulis | ✅ Lighthief — ⚠️ **ADR-compliant trucks required** with safety equipment. Check capacity for 43t containers. RFI to A. Soulis & Interfreight. |
| F4 | **Marine Insurance** | ✅ | | Incl. CIF | ✅ **LINYANG** — CIF Incoterms include marine insurance. Confirmed 15 Feb. |

### G. Documentation & Compliance

> **Updated: 15 Feb 2026 — Kamil/Voltus scope meeting**

| # | Work Item | Linyang | Lighthief | Price if Extra | Status |
|---|-----------|:-------:|:---------:|---------------|--------|
| G1 | **Documentation & Compliance** | ✅ | ✅ | Shared | ✅ **SHARED** |
| G2 | **O&M Manuals** | ✅ | | Incl. CIF | ✅ **LINYANG** — Michael will prepare disks with O&M documentation. |
| G3 | **DSO Application Support** | ✅ | | Incl. CIF | ✅ **LINYANG** — Michael from Linyang. |
| G4 | CE Marking & Certificates | ✅ | | Incl. CIF | ✅ **LINYANG** — Should be in supporting documents. Verify completeness. |
| G5 | **Training** | ✅ | | Incl. CIF | ✅ **LINYANG** — Training in Poland. Apr–Jun: 40 sites in Poland. Schedule Lighthief visit. |

### H. Warranty & Support

> **Updated: 15 Feb 2026 — Per contract terms**

| # | Work Item | Linyang | Lighthief | Price if Extra | Status |
|---|-----------|:-------:|:---------:|---------------|--------|
| H1 | **Defects Liability Period** | ✅ | ✅ | Per contract | ✅ **SHARED** — As per EPC contract terms. |
| H2 | **Warranty Service Responsibility** | ✅ | ✅ | Per contract | 🟡 **SHARED** — Draft in progress. |

---

## 4. Summary — Resolved vs Remaining Open Items

> **Updated: 15 Feb 2026 — After Kamil/Voltus scope meeting**

### ✅ RESOLVED (15 Feb 2026 meeting)

| # | Item | Resolution | Impact |
|---|------|-----------|--------|
| B1 | **Mechanical Installation** | ✅ LINYANG (4PL + 8CN) | Incl. CIF — saves €1.84M |
| B2 | **DC/AC Electrical Install** | ✅ LINYANG | Incl. CIF — saves €762K |
| B6 | **Commissioning** | ✅ Cold: Lighthief · Hot: Shared · System: Shared+Voltus | Partially CIF |
| B7 | **DSO Witness** | ✅ SHARED | Shared cost |
| B8 | **FAT** | ✅ LIGHTHIEF (1× PL engineer) | Lighthief cost |
| B9 | **SAT Report** | ✅ LINYANG | Incl. CIF |
| C2 | **SPD** | ✅ LIGHTHIEF via DEHN | €148,617 quoted |
| C4 | **Earthing** | ✅ LIGHTHIEF via DEHN | €251,568 quoted |
| D2 | **PPC** | ✅ NOT NEEDED (= WAGU in Voltus EMS) | Scope gap eliminated |
| D3 | **ITC Gateway** | ✅ VOLTUS (in EMS quote) | Scope gap eliminated |
| F4 | **Marine Insurance** | ✅ LINYANG (in CIF Incoterms) | Confirmed |

### ❓ STILL OPEN

| # | Item | Current Assumption | Impact if NOT in CIF |
|---|------|--------------------|---------------------|
| C1 | **CT Class + Protection Relay Config** | Lighthief, but CT class TBD | 🔴 **PRODUCTION-BLOCKING** — must agree with DSO |
| C5 | **Remote Trip System** | Unclear | 🟡 €153K |
| C6 | **UPS / Aux Power** | Needs 24V UPS per container | 🟡 €102K |
| D5 | **NIS2 Cybersecurity** | Unassigned | 🟡 Unknown — no estimate |
| D6 | **WAGU Spares** | 5–10 controllers + memory | 🟡 TBD from Voltus |
| E4 | **Fencing / Entrance Control** | Not priced | 🟡 NEW — needs assessment |
| | **TOTAL STILL OPEN** | | **~€255K + unknowns** |

> **KEY OUTCOME:** The 15 Feb meeting resolved ~€5.6M of previously unclear scope (B1+B2+B6+D2). Remaining open items total ~€255K plus NIS2/fencing unknowns. **Critical blocker: CT class decision before production order.**

---

## 5. Sign-Off

### LINYANG ENERGY

**Name:** Kamil Talar  
**Title:** Regional Sales Director — Central Europe  

Signature: ___________________________  
Date: ___________________________

### LIGHTHIEF GROUP

**Name:** Alexander Papacosta  
**Title:** Cyprus Director, Lighthief Cyprus Ltd  

Signature: ___________________________  
Date: ___________________________

---

### Next Steps

1. Linyang to complete all ❓ items with checkbox + price within **5 business days**
2. Both parties to schedule a call to review completed matrix
3. Final signed version to be appended to the EPC Framework Agreement

---

*LCY-RFI-EPC-SCOPE-2026-001 v1.0 | 13 February 2026 | Lighthief Cyprus Ltd | CONFIDENTIAL*
