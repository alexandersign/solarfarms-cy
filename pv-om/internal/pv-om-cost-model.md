# PV O&M Cost Model — Lighthief Cyprus Ltd
## Internal Calculations & Margin Analysis
**Last updated:** May 2026  
**Document type:** Internal — do NOT share with clients

---

## Assumptions

| Input | Value | Notes |
|---|---|---|
| Field staff daily cost | **€70/person/day** | Local labour rate |
| Supervisor daily cost | **€140/person/day** | Senior technician / engineer |
| Van / fuel (return trip Anarita) | **€120/trip** | Paphos–Anarita round trip |
| Water bowser hire | **€180/day** | If site mains water unavailable |
| Equipment depreciation (brushes, pump) | **€100/visit** | Spread across all visits |
| LESA sub-contractor (Dimos) — retainer | **€1,600/park/year** | See lesa-dimos-rates.md |
| LESA emergency call-out | **€250–500/visit** | Depends on timing |
| SCADA platform fee (if external) | **TBD** | Confirm monthly cost |

---

## Service Cost Models

### 1. Panel Cleaning (per visit, per park — 5 MW)

**Panel count estimate:** 5.01 MWp ÷ 500W = ~10,000 panels  
**Cleaning productivity:** ~3,500 panels/person/day (soft brush + pump system)  
**Person-days required:** ~3 person-days per park

| Cost Item | Qty | Rate | Total |
|---|---|---|---|
| Cleaning crew | 3 person-days | €70 | €210 |
| Supervisor (half day) | 0.5 days | €140 | €70 |
| Van / fuel | 1 trip | €120 | €120 |
| Water / consumables | — | — | €150 |
| Equipment use | — | — | €80 |
| **Total per park** | | | **€630** |
| **Total both parks (same visit)** | | | **€950** |

**Revenue from 2 included cleaning rounds (both parks):**  
Embedded in annual fee — indicative value: **€5,500–€6,000/yr**  
**Gross margin on cleaning: ~83–85%**

---

### 2. Vegetation / Grass Cutting (per visit, per park — 5 MW)

| Cost Item | Qty | Rate | Total |
|---|---|---|---|
| Cutting crew | 2 person-days | €70 | €140 |
| Supervisor (half day) | 0.5 days | €140 | €70 |
| Van / fuel | 1 trip | €120 | €120 |
| Equipment (mower, strimmer depreciation) | — | — | €60 |
| **Total per park** | | | **€390** |
| **Total both parks (same visit)** | | | **€560** |

**Revenue from 4 included cutting rounds (both parks):**  
Embedded in annual fee — indicative value: **€2,800–€3,200/yr**  
**Gross margin on cutting: ~82–84%**

---

### 3. Preventive Maintenance Visit (per visit, per park — 5 MW)

Includes: visual inspection, IR thermography, IV-curve sample, electrical checks, report.

| Cost Item | Qty | Rate | Total |
|---|---|---|---|
| Engineer (ETEK) | 1 day | €200 | €200 |
| Technician | 1 day | €100 | €100 |
| IR camera hire | 1 day | €80 | €80 |
| IV curve tracer hire | 1 day | €60 | €60 |
| Van / fuel | 1 trip | €120 | €120 |
| Report preparation | 2 hrs | €50 | €100 |
| **Total per park** | | | **€660** |
| **Total both parks (same day)** | | | **€950** |

**2 visits/year both parks cost: ~€1,900**  
Embedded in annual fee — margin remains strong.

---

### 4. Corrective Call-Out (on-site visit, per park)

| Scenario | Dimos (if MV) | Own labour | Total cost | We charge | Net |
|---|---|---|---|---|---|
| Weekday minor (own staff) | — | €200 | €200 | Incl. in 6 cap | Embedded |
| Weekday urgent (MV fault) | €250 | €200 | €450 | Incl. in 6 cap | Embedded |
| Evening/Saturday (MV) | €375 | €200 | €575 | Incl. in 6 cap | Embedded |
| Sunday/holiday (MV) | €500 | €200 | €700 | Incl. in 6 cap | Embedded |
| **Extra call-out, weekday** | up to €250 | €200 | **€450** | **€400** | **-€50 risk** |
| **Extra call-out, weekend** | up to €500 | €200 | **€700** | **€400** | **-€300 loss** |

> **Action:** Update extra call-out fees to tiered pricing (see lesa-dimos-rates.md).

---

### 5. Annual Cost Summary — Spanercom 2 × 5 MW

| Cost Line | Annual Cost |
|---|---|
| LESA retainer (Dimos) — 2 parks | €3,200 |
| Preventive maintenance visits (2x, both parks) | €1,900 |
| Panel cleaning (2x, both parks) | €1,900 |
| Vegetation cutting (4x, both parks) | €2,240 |
| Electrical safety inspections (annual) | €800 |
| SCADA platform / monitoring | TBD |
| Misc consumables, small repairs | €400 |
| Management / admin overhead (~8%) | €840 |
| **Estimated total cost** | **~€11,280 + SCADA** |
| **Revenue (annual fee)** | **€56,400** |
| **Gross margin** | **~80%** |
| **Gross margin (incl. 6 call-outs each park)** | **~75–78%** |

---

## Add-On Service Pricing (recommended)

| Service | Our cost | Recommended charge | Margin |
|---|---|---|---|
| Extra cleaning (both parks) | €950 | €5,500 | 83% |
| Extra cleaning (single park) | €630 | €3,200 | 80% |
| Extra grass cutting (both parks) | €560 | €2,800 | 80% |
| Extra grass cutting (single park) | €390 | €1,700 | 77% |
| Combined cleaning + cutting same day | €1,200 | €7,500 | 84% |
| Transformer audit (per substation) | €300–500 | €1,200–1,800 | 70%+ |
| Extra corrective call-out — weekday | €450 | €600 | 25% |
| Extra corrective call-out — evening/Sat | €575 | €750 | 23% |
| Extra corrective call-out — Sun/holiday | €700 | €900 | 22% |

---

## Notes

- All costs are estimates based on current staff rates and known sub-contractor fees.
- SCADA platform cost not yet confirmed — this is a key unknown that could reduce margin.
- Dimos retainer is fixed regardless of call volume — good value if MV issues are infrequent.
- Revisit cost model annually before contract renewals or new client proposals.
