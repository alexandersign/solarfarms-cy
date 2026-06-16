# Uganda — 2×20 MW Solar PV (AGOGA & MISOZI)

**Client folder:** `Individual_Africa_20MW_Uganda`  
**Date opened:** 10 June 2026  
**Status:** Initial review — spec received, developer unidentified  
**Contact:** TBC

---

## Project Summary

| Field | Value |
|---|---|
| **Project** | 2×20 MW grid-connected solar PV |
| **Sites** | AGOGA and MISOZI, Uganda |
| **Evacuation** | 33 kV AC, metering at plant boundary |
| **Scope requested** | Full EPC + commissioning + performance guarantee + comprehensive O&M |
| **Source document** | `solar-plant-20mw-technical-spec-uganda.pdf` (18 pp, no letterhead, no developer name) |

### Site Data (from PDF)

| Site | Area | Coordinates | Tilt in PDF |
|---|---|---|---|
| **AGOGA** | 24.28 ha (60 ac) | UTM 36N, Arc 1960 — ~2.85°N, 33.11°E | 45° (all points) |
| **MISOZI** | Not stated | UTM points only (polygon incomplete — duplicate vertices) | 28° (spec text) |

Approximate location: northern Uganda / West Nile region (longitude ~33°E).

---

## Seriousness Assessment

| Signal | Assessment |
|---|---|
| **Technical depth** | Moderate — long equipment spec (modules, inverters, 33 kV switchgear, SCADA, CCTV, O&M) |
| **Site specificity** | Partial — AGOGA has usable coordinates and area; MISOZI polygon is incomplete |
| **Commercial maturity** | **Low** — no developer name, contact, budget, timeline, PPA, or grid agreement |
| **Regulatory fit** | **Poor** — spec is largely recycled from **Indian** tenders (IS/BIS/DISCOM/ABT terminology) |
| **Technical coherence** | **Mixed** — ground-mount project references rooftop loading; single central inverter for 20 MW is outdated; "south-facing" tilt guidance wrong for equatorial Uganda |
| **Document quality** | Template-grade — blank pages, typos (MISSOZI/MISOZI), no revision date or author |

**Overall:** Treat as an **early-stage enquiry**, not a bankable tender. Worth engaging only after identity, land tenure, grid path, and funding are confirmed. Do **not** issue a binding EPC price on this document alone.

---

## What's Missing (Critical Gaps)

### Commercial & Legal
- Developer / SPV name, registration, beneficial owners
- Funding source (equity, DFI, bilateral PPA buyer)
- Land title or lease (AGOGA 60 ac, MISOZI area unknown)
- PPA or off-take agreement (counterparty, tariff, tenor)
- EPC contract form (FIDIC? local?) — payment terms, LDs, retention, warranties
- Whether quote is per site, both sites, or phased

### Grid & Permits
- Uganda grid code (ERA / UETCL / Umeme) — not Indian DISCOM/ABT
- Grid connection approval / offer letter (export capacity, POC distance)
- Environmental & social impact assessment status
- Import duty / VAT / local content requirements

### Engineering
- Geotechnical survey, topo survey, hydrology
- Single-line diagram, layout, DC/AC capacity (MWp vs MWac)
- Module/inverter technology choice (string vs central — spec contradicts modern practice)
- Performance guarantee: PR %, availability %, degradation, liquidated damages
- O&M duration beyond 11 months — LTSA terms, SLA, spares

### Logistics
- Nearest port (Mombasa vs Dar es Salaam), inland transport route
- Site access roads, security, labour availability

---

## EPC Cost Reference (Lighthief Internal)

> Cyprus utility PV EPC reference from `lib/constants.ts` — **not a Uganda quote**.

| Basis | €/MW | 20 MW site | 2×20 MW |
|---|---|---|---|
| **Client PV EPC** (Cyprus, fixed-tilt) | €640,000 | **€12.8M** | **€25.6M** |
| **Self-cost reference** | €540,000 | €10.8M | €21.6M |
| **Turnkey + RTB** (if greenfield licence) | €1,090,000 | €21.8M | €43.6M |

### Uganda Adjustment (Indicative Only)

This spec includes **33 kV switchyard, transformer, SCADA, CCTV, weather station, and 11 months comprehensive O&M** — above a standard Cyprus PV-only EPC envelope.

| Scenario | Indicative range | Notes |
|---|---|---|
| **EPC only** (no long O&M) | €500k–€620k/MW | Lower labour; higher logistics & risk premium vs Cyprus |
| **EPC + 1-yr O&M** (as spec) | €550k–€680k/MW | On-site engineers + weekly cleaning adds €30–80k/MW/yr |
| **Per 20 MW site** | **€10M–€13.6M** | Pending grid distance, substation scope, port logistics |
| **Both sites (40 MW)** | **€20M–€27M** | Volume discount possible if single contractor / batch procurement |

**Not included in above:** grid extension beyond plant boundary, land acquisition, development/RTB (€350k/MW in Cyprus model), BESS, transmission-level connection.

---

## Recommended Next Steps

1. **Send RFI** — `rfi-uganda-africa-20mw-jun2026.md` (developer identity, grid, land, commercial)
2. **Request LOI** or mandate letter before detailed engineering or binding price
3. **Clarify scope split** — EPC vs EPC+O&M vs separate LTSA
4. **Rewrite spec** for Uganda (ERA grid code, equatorial tilt ~5–15°, string inverters)
5. **Site visit** only after grid offer + land docs received

---

## Files

| File | Description |
|---|---|
| `solar-plant-20mw-technical-spec-uganda.pdf` | Incoming technical specification (source) |
| `technical-notes-uganda-africa-20mw-jun2026.md` | Internal analysis (not for client) |
| `rfi-uganda-africa-20mw-jun2026.html` | **Branded client-facing RFI** (send this) |
| `rfi-uganda-africa-20mw-jun2026.md` | RFI source (markdown) |
