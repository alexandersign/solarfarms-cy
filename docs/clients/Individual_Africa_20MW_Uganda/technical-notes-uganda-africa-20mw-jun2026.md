# Technical Notes — Uganda 2×20 MW Solar (AGOGA & MISOZI)

> **INTERNAL USE ONLY — NOT FOR CLIENT**  
> **Date:** 10 June 2026  
> **Source:** `solar-plant-20mw-technical-spec-uganda.pdf`

---

## 1. Document Forensics

### Origin Signals (Indian Template)

The specification reads as a **copy-paste from Indian state DISCOM / SECI-era tenders**, not Uganda:

| Clause | Issue |
|---|---|
| IS 2061, IS 4759, BIS standards | Indian Standards — not applicable in Uganda |
| "Indigenous manufactured" modules | Indian domestic-content language |
| ABT meters, DISCOM, GM certification | Indian Availability-Based Tariff regime |
| "South facing" at 28° | Northern-hemisphere convention; Uganda ~2.85°N — optimal fixed tilt typically **5–15°**, not 28–45° |
| Roof load &lt;60 kg/m² | Ground-mount utility project |
| Single **central** inverter per 20 MW | Obsolete; modern plants use string inverters or multiple central units |
| Remote monitoring via **satellite link** | Unusual; fibre/4G standard |
| Telephone **modem** remote control | Legacy technology |
| IEEE 929-2000 | Superseded interconnection standard |

### Internal Inconsistencies

- Title: **2×20 MW** at AGOGA and MISOZI; body text describes a single **20 MW** plant repeatedly.
- AGOGA layout: all boundary points at **45° tilt**; general spec says **28°**.
- MISOZI polygon: points 6–10 are duplicates of point 5; **no area** calculated.
- Pages 15, 17, 18 are blank — unfinished deliverable.
- "MISSOZI" vs "MISOZI" spelling inconsistency.

---

## 2. Scope Extract (What They Are Asking For)

| Section | Scope |
|---|---|
| §1 | EPC + commissioning + **guaranteed performance** + **comprehensive O&M** |
| §2 Civil | Grading, foundations, cable trenches, drainage, inverter building, module washing pipeline |
| §3–5 | Fixed-tilt MS structures, crystalline modules (IEC 61215/61730), RFID traceability |
| §9.4 | Central inverter / PCU, isolating transformer, LVRT, reactive power |
| §9.5–9.8 | ABT-class metering, SCADA, LT/HT panels, 33 kV VCB switchyard, RAP |
| §9.13–9.14 | CCTV (15-day HD storage), weather monitoring station |
| §9.17 | 33 kV evacuation to boundary metering point |
| §9.18 | O&M: qualified engineers on site, **weekly module cleaning**, 11 months post-COD |
| §9.19 | 5-year workmanship warranty; modules 90%/80% at 10/25 yr |

**Not specified:** MWp (DC) vs MWac, performance ratio target, availability %, energy yield guarantee, LDs, spares inventory, insurance.

---

## 3. Site Intelligence

### AGOGA (Page 16–17)

- **Area:** 24.283 ha (60 ac)
- **Datum:** Arc 1960, UTM Zone 36N, Clarke 1880
- **Centroid approx:** 2.85°N, 33.11°E
- **At 45° tilt, ~1,200–1,400 kWh/kWp/yr** possible in this latitude (rough); layout may be sub-optimal vs 10–15°

### MISOZI (Page 14)

- Eastings ~343,500–344,600; Northings ~39,850–41,200 (UTM zone unclear — likely 36N)
- Polygon unreliable — **cannot compute area** from provided coordinates

### Land Sufficiency (Rule of Thumb)

- 20 MW fixed-tilt utility: typically **30–45 ha** depending on pitch and DC oversizing
- AGOGA 60 ac (24 ha) may be **tight** for 20 MW unless high-efficiency modules and aggressive layout

---

## 4. Pricing Model (Internal)

### Cyprus SSOT (`lib/constants.ts`)

```
PV EPC client price:  €640,000 / MW
PV EPC self-cost:     €540,000 / MW
EPC markup:           €100,000 / MW (flat)
```

**20 MW single site (Cyprus reference):** €12.8M client / €10.8M self-cost  
**40 MW both sites:** €25.6M client / €21.6M self-cost

### Uganda Cost Drivers (vs Cyprus)

| Factor | Direction | Comment |
|---|---|---|
| Local labour & civil | ↓ cost | East Africa rates below EU |
| Logistics (Mombasa → Uganda) | ↑ cost | 1,000–1,500 km inland |
| 33 kV switchyard (full HT spec in PDF) | ↑ cost | May exceed Cyprus MV station allowance (€140k + €10k/MW) |
| Currency / payment risk | ↑ contingency | USD or EUR quote with FX clause |
| Comprehensive O&M (11 mo, weekly clean) | ↑ cost | €40–80k/MW for year 1 if Lighthief scope |
| Developer / grid risk | ↑ contingency | No connection offer = unpriceable grid extension |
| Scale (40 MW total) | ↓ cost | Batch module/inverter procurement |

### Indicative Uganda Range (Internal — Do Not Quote Externally)

| Item | Low | High |
|---|---|---|
| EPC per MW (excl. grid extension) | €500k | €620k |
| 20 MW site total | €10.0M | €12.4M |
| 40 MW (both sites) | €19.0M | €24.0M |
| O&M year 1 (if bundled) | +€30k/MW | +€80k/MW |

Validate against `docs/internal/solarpark-epc.md` formula before any formal offer:
`PV Self-Cost = €255,000 + (MWp × €369,615)` plus Uganda logistics adder and HT switchyard delta.

---

## 5. Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| Unknown developer | **High** | LOI + KYC before engineering spend |
| No grid offer | **High** | UETCL/Umeme connection letter mandatory |
| Indian spec → wrong equipment standards | **Medium** | Issue Uganda-compliant spec rewrite as part of proposal |
| Land title unclear | **High** | Certified lease/title before site visit |
| 24 ha for 20 MW | **Medium** | Layout study — may need DC oversizing reduction |
| O&M scope creep (weekly cleaning, on-site engineers) | **Medium** | Price O&M separately with SLA |
| Payment / country risk | **High** | Advance payment, LC, or DFI-backed structure |

---

## 6. Competitive Positioning

Lighthief strengths for this enquiry:
- EPC structuring and subcontractor management (Cyprus/Africa pipeline via AE Solar relationship)
- Technical credibility with utility-scale specs (see `Individual_AE_Solar_South_Africa`, `Individual_Zambia`)

Gaps to address:
- No established Uganda grid-code library in repo — need ERA/UETCL docs from client
- No local civil partner identified — would need Kampala/East Africa subcontractor
- PV-only EPC is secondary to core BESS business — qualify opportunity size vs effort

---

## 7. Decision Gate

| Gate | Requirement |
|---|---|
| **G0 — Respond with RFI** | Immediately (low cost) |
| **G1 — Indicative budgetary offer** | LOI signed + grid offer + land lease + developer KYC |
| **G2 — Binding EPC price** | Geotech, topo, approved layout, Uganda legal review, confirmed port logistics |
| **G3 — Contract signature** | PPA or anchor off-take, financial close or acceptable payment security |

**Recommendation:** Stay at **G0** until client responds to RFI.
