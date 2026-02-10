# EPC READINESS ASSESSMENT
## Cyprus BESS Portfolio — 51 Parks / 249 MW / 882 MWh
### Date: 10 February 2026 | Lighthief Cyprus Ltd

---

## EXECUTIVE SUMMARY

| Category | Ready | Partial | Not Ready | Score |
|---|---|---|---|---|
| Equipment Procurement | 3 | 2 | 1 | 🟡 55% |
| Legal & Contractual | 2 | 3 | 3 | 🔴 35% |
| Technical & Engineering | 7 | 2 | 3 | 🟡 55% |
| Financial & Commercial | 4 | 3 | 2 | 🟡 50% |
| Operational (O&M/Spares) | 3 | 2 | 1 | 🟡 55% |
| Project Management | 0 | 1 | 4 | 🔴 10% |
| **OVERALL EPC READINESS** | | | | **🟡 ~43%** |

**Bottom line:** You have strong commercial positioning (exclusive distributor, 51-park portfolio, OEM relationship) and confirmed equipment specs. **Major progress:** EN 50549-2 grid code certification now confirmed (TÜV cert + full test report), along with anti-islanding, LVRT/HVRT, and IEC 61850. Grid connection applications can now proceed. Remaining critical blockers: unsigned OEM contract, unresolved warranty pricing conflict, local subcontractor quotes not started, and some MV datasheets still incomplete for smaller site configs.

---

## 1. EQUIPMENT PROCUREMENT

### 🟢 READY
| Item | Status | Evidence |
|---|---|---|
| BESS Containers (Linyang) | Quoted, specs confirmed | 251 containers, 5.015 MWh each, LFP EVE MB31 cells |
| PCS (Kehua BCS-C-HUD) | Quoted, specs confirmed | 1,250 kW units, IP65, C5, ≥99% max efficiency |
| OEM Spares Stock | Confirmed (Feb 2026) | 3 pallets PCS spares/config, ~8 Li-ion racks, ~40 pallets total |

### 🟡 PARTIAL
| Item | Status | Gap |
|---|---|---|
| EMS/SCADA (Voltus) | Jan 2026 quote received | New RFI sent (Feb 2026) for 3-group structure. BoM not confirmed. WAGO hardware scope unclear |
| MV Skids (Linyang) | Included in CIF price | **14 of 15 MV Skid datasheets MISSING** — only 10MW config available |

### 🔴 NOT READY
| Item | Status | Action Required |
|---|---|---|
| Transformers | Part of MV Skid scope | **14 of 15 transformer datasheets MISSING**. Only 10MVA partial data available. Cannot do protection studies without these |
| MV Interface Equipment | Not scoped | PCC bay extensions, MV cabling from skid to PCC — no design, no quotes |
| Civil/Structural Materials | Not scoped | Concrete platforms, drainage, fencing, access roads — internal estimates only, no vendor quotes |
| LPS / Earthing Materials | Not scoped | Lightning protection, earthing grid — listed as TBD in spreadsheet (columns AL, AO = all zeros) |

---

## 2. LEGAL & CONTRACTUAL

### 🟢 READY
| Item | Status | Evidence |
|---|---|---|
| Distribution Agreement | Executed | Lighthief = exclusive Cyprus BESS distributor for Linyang. Strong anti-circumvention (liquidated damages) |
| Legal Framework | Defined | DOCUMENT_INDEX.md maps upstream (Lighthief↔Linyang) and downstream (Lighthief↔Clients) structure |

### 🟡 PARTIAL
| Item | Status | Gap |
|---|---|---|
| Sales Agreement (OEM) | Template exists, **NOT signed** | **18+ amendments** required: CIF destination (Gdansk→Limassol), payment terms (50/50→30/60/10), governing law (Polish→Singapore), warranty start (30d→6mo), etc. |
| Client EPC Contracts | Pricing model exists | No evidence of signed EPC contracts with any of the 51 park owners. Client pricing calculated but contracts not drafted |
| LTSA Framework | Pricing confirmed by Linyang | No signed LTSA. Rates confirmed but format/terms not finalized |

### 🔴 NOT READY
| Item | Status | Action Required |
|---|---|---|
| Performance Bond | Linyang offers 5% only | Lighthief requested 10% with parent company backing — **rejected**. Only 5%, no Linyang Energy guarantee |
| SOH Remedy Agreement | CRITICAL CONFLICT | Linyang SOH remedy = parts only, **no labor/service included**. Client docs imply full remedy. Gap must be closed before client contracts |
| Delay LD Terms | Reduced scope | LDs apply to delayed goods value only (not full contract). Total cap 10% (not 15%). Less protection than planned |

---

## 3. TECHNICAL & ENGINEERING

### 🟢 READY
| Item | Status | Evidence |
|---|---|---|
| BESS Technical Specs | Fully documented | linyang.md — complete degradation curves, BMS architecture, safety systems, thermal specs |
| System Architecture | Confirmed | WAGO PFC200 as integrated PPC+RTU, Modbus TCP to Kehua PCS + Linyang BMS, Voltus EMS/SCADA |
| **EN 50549-2 (Grid Code)** | **✅ CONFIRMED** | TÜV compliance doc (D 115067 0077 Rev.00, 2025-07-31) + full 447-page TÜV test report (64.290.25.30339.02, 2025-08-26). Models: BCS1000K/BCS1250K-C-HUD. Tested to EN 50549-2:2019/A1:2023 + EN 50549-10:2022. **Note:** External interface protection required at plant level (EPC scope). |
| Anti-Islanding (IEC 62116) | ✅ Available | Certificate in repo: BCS1000~1250K-C-HUD IEC62116 61727.pdf |
| LVRT/HVRT Test Reports | ✅ Available | FRT characteristics document: Charakterystyka FRT 1000K-C-HUD & 1250K-C-HUD_ang.pdf |
| IEC 61850 Conformance | ✅ Available | BMS IEC 61850 ICD file in repo (bms61850.icd) |
| Communication Protocol Docs | ✅ Available | Modbus register map (WRDF-0I002-103) + IEC-104 point list (WRWF-0I002-06) — both in repo. **Not yet shared with Voltus.** |
| MV Single-Line Diagrams | Improved | 40MW SLD drawings now available (Anatoliko SS, Athalassa SS, FIZ SS). 10MW PCS SLD also in repo |

### 🟡 PARTIAL
| Item | Status | Gap |
|---|---|---|
| Certifications | 21+ complete | IEC 62933-5-2 notification received. UL 9540A Installation Level pending (site-specific). CE-LVD, CE-EMC, CB scheme, IEC 62477-1 all certified |
| MV Skid Datasheets | Improved but incomplete | Additional PCS/transformer docs available. Still need site-specific MV skid configs for smaller sites |

### 🔴 NOT READY
| Item | Status | Action Required |
|---|---|---|
| Frequency Response Curves | MISSING | LFSM-O droop curves needed for TSO/DSO approval (FRT available but freq response settings separate) |
| Protection Settings Guide | MISSING | Cannot design protection scheme without OEM protection settings. **EN 50549-2 cert notes: external interface protection is EPC scope** |
| Protection Coordination Study | Not started | Requires remaining MV datasheets + transformer data + DSO settings. Can now proceed for 10MW/40MW configs |
| Grid Connection Applications | No evidence | Can now be submitted — EN 50549-2 cert is available. Must be filed per park to EAC |
| Black Start / Sync Procedures | MISSING | Required for commissioning |

---

## 4. FINANCIAL & COMMERCIAL

### 🟢 READY
| Item | Status | Evidence |
|---|---|---|
| CIF Pricing (Linyang) | Jan 2026 quote | Total CIF price confirmed. Average CIF/kWh calculated |
| EPC Adders Model | Spreadsheet v2 | Import duty (2.66% weighted avg), port/customs, crane/transport, cabling, terminations calculated |
| EMS/SCADA Cost Model | Verified | Voltus quotes per-park: EMS system + SCADA Local (€15K) + SCADA Global (€60K/group) |
| Margin Tracking | Active | Per-park margins calculated (target ≥11.5%). Individual pricing adds +15% premium |

### 🟡 PARTIAL
| Item | Status | Gap |
|---|---|---|
| Payment Terms (OEM) | Linyang confirmed 25/50/20/5 | Lighthief wants 30/60/10 — **not aligned**. Also, original quote was 30/70 (100% pre-delivery) |
| Client Revenue Pricing | Calculated in spreadsheet | Dino Price/MWh and Target Price/MWh exist but no signed client agreements |
| Insurance | Estimated at 0.75% | No insurance quote obtained. Product liability (Linyang: €5M AXA) confirmed but EPC/CAR insurance not sourced |

### 🔴 NOT READY
| Item | Status | Action Required |
|---|---|---|
| **Extended Warranty Yr 11-15** | **CRITICAL PRICING GAP** | Linyang: €4,182/MWh/yr vs Client model: €1,158/MWh/yr — **261% more expensive**. Either renegotiate with Linyang or update client pricing |
| Local EPC Cost Quotes | **No RFPs sent** | Mechanical install, electrical install, civil works, MV cabling, earthing — all internal estimates. No Cyprus subcontractor quotes |

---

## 5. SPREADSHEET COST STATUS (Bess - EPC System Cost v2.xlsx)

### Populated Cost Columns (have values across parks)
| Column | Category | Status |
|---|---|---|
| N | CIF Unit Price | ✅ Values for all parks |
| U-V | Import Duty, Port/Customs | ✅ Calculated |
| X-Y | Crane/Inland Transport | ✅ Values present |
| Z-AC | LV/MV Cabling, Terminations, Protection Eng, Remote Trip | ✅ Values present |
| AI | Voltus EMS | ✅ Verified quotes |
| AV-AZ | SCADA allocation | ✅ Calculated |

### Empty / Zero Cost Columns (TBD — NO DATA)
| Column | Category | Status | Risk |
|---|---|---|---|
| O-P | (Unknown — no header) | ❌ Empty, formulas return null | Unknown scope gap |
| R-S | (Unknown — no header) | ❌ Empty | Unknown scope gap |
| T | (Unknown — no header) | ❌ Empty | Unknown scope gap |
| W | (Unknown — no header) | ❌ Empty, no formula | Not even modeled |
| AD | UPS/Aux | ❌ Empty | Not costed |
| AE | LPS (Lightning Protection) | ❌ Empty | **Not costed — required for all sites** |
| AF-AH | SPDs, Earthing, Protection Testing | ❌ Empty | **Not costed — required for all sites** |
| AJ-AK | Cement Platforms, Drainage | ❌ Empty | **Not costed — civil works gap** |
| AL | Commissioning | ❌ All zeros (47 rows) | **Not costed — critical EPC deliverable** |
| AM | Docs & Compliance | ❌ Empty | **Not costed** |
| AN | Insurance | ❌ Empty | **Not costed** |
| AO | PCC Bay Extension | ❌ All zeros (47 rows) | **Not costed — required for grid connection** |

### Verify Sheet (23-item Checklist)
**Status: 0 of 23 items checked.** Covers:
- MV interface works
- Protection engineering
- Metering rework
- EMS integration
- Earthing system
- Testing & commissioning procedures

---

## 6. OPERATIONAL READINESS (O&M)

### 🟢 READY
| Item | Status |
|---|---|
| Lighthief = BESS service partner | Confirmed by Distribution Agreement |
| Spares stock | 40 pallets confirmed by Linyang (PCS spares, Li-ion racks) |
| LTSA pricing | Confirmed: Core O&M €2,470/MWh/yr, with Availability Guarantee €4,671/MWh/yr |

### 🟡 PARTIAL
| Item | Gap |
|---|---|
| LTSA contract | Pricing confirmed but no signed LTSA document |
| Availability formula | 97% target confirmed, but calculation methodology not defined for 863.5 MWh system |

### 🔴 NOT READY
| Item | Action Required |
|---|---|
| Local service team | No evidence of Lighthief Cyprus O&M staff hiring, training plan, or service partner agreements |

---

## 7. PROJECT MANAGEMENT

### 🔴 NOT READY
| Item | Status | Action Required |
|---|---|---|
| **Master Project Schedule** | **DOES NOT EXIST** | No Gantt chart, no timeline, no phasing plan. Production ~90d + shipping ~50d + install ~30d = minimum 6 months per batch. 51 parks need phased rollout plan |
| **Construction Permits** | No evidence | Building permits, electrical permits, environmental clearances — not found in any document |
| **Grid Connection Permits** | No evidence | EAC grid connection applications not submitted. Requires EN 50549-2 cert (missing) |
| **Land/Site Access** | No evidence | No site surveys, geotechnical studies, or access agreements found |
| **Subcontractor Pre-qualification** | No evidence | No RFPs to local contractors for civil, mechanical, electrical works |

---

## TOP 10 ACTIONS TO REACH EPC READINESS

| # | Action | Priority | Blocking |
|---|---|---|---|
| 1 | ~~Get EN 50549-2 certification~~ | ✅ DONE | TÜV cert + 447-page test report confirmed (BCS1000K/1250K-C-HUD). Anti-islanding, LVRT/HVRT, IEC 61850 also available |
| 2 | **Sign OEM Sales Agreement** (resolve 18 amendments) | 🔴 CRITICAL | Cannot order equipment. Cannot finalize client contracts |
| 3 | **Resolve Extended Warranty Yr 11-15 pricing** (261% gap) | 🔴 CRITICAL | Client financial models are wrong. Either renegotiate or re-price |
| 4 | **Obtain remaining MV Skid datasheets** (small/medium configs) | 🔴 HIGH | 40MW SLDs now available. Still need site-specific MV configs for 1-8 MW sites |
| 5 | **Create Master Project Schedule** with phased rollout | 🟢 DONE | Gantt chart live at solarfarms.cy/bess-project. 6 phases, 3 batches, ~65 tasks |
| 6 | **Submit grid connection applications to EAC** (per park) | 🔴 HIGH | **Can now proceed** — EN 50549-2 cert available. Long lead time, start immediately |
| 7 | **Issue RFPs to local Cyprus contractors** (civil, mech, elec) | 🔴 HIGH | 12+ cost columns in spreadsheet are empty — all local EPC works uncosted |
| 8 | **Confirm Voltus BoM and scope boundary** (new RFI sent) | 🟡 HIGH | WAGO hardware scope unclear. What does Lighthief procure? Response due 21 Feb |
| 9 | **Obtain insurance quotes** (CAR, product liability, EPC PI) | 🟡 MEDIUM | Not costed in spreadsheet. Required for EPC contracts |
| 10 | **Draft and issue client EPC contracts** | 🟡 MEDIUM | Pricing exists but no contract templates. Needs OEM terms resolved first |

---

## READINESS BY PHASE

```
PHASE 1: PRE-ORDER (Current Phase)     ████████░░░░░░░░ ~45%
  ✅ OEM specs confirmed
  ✅ CIF pricing quoted
  ✅ EMS provider selected (Voltus)
  ✅ Distribution agreement signed
  ❌ OEM contract unsigned
  ❌ Client contracts unsigned
  ❌ MV datasheets missing

PHASE 2: ENGINEERING & DESIGN           ██░░░░░░░░░░░░░░ ~15%
  ✅ System architecture confirmed
  ✅ BMS/PCS comm protocols known
  ❌ Single-line diagrams (14/15 missing)
  ❌ Protection coordination study
  ❌ Grid code compliance (EN 50549-2)
  ❌ Civil/structural design

PHASE 3: PROCUREMENT                    ██░░░░░░░░░░░░░░ ~10%
  ✅ OEM equipment identified
  ✅ EMS/SCADA provider identified
  ❌ No POs issued
  ❌ No local subcontractor quotes
  ❌ No material procurement

PHASE 4: CONSTRUCTION                   ░░░░░░░░░░░░░░░░ ~0%
  ❌ No permits
  ❌ No site prep
  ❌ No schedule
  ❌ No construction team

PHASE 5: COMMISSIONING                  █░░░░░░░░░░░░░░░ ~5%
  ✅ OEM commissioning included in scope
  ❌ No commissioning procedures documented
  ❌ No FAT/SAT procedures
  ❌ Grid code tests not planned
```

---

*Assessment prepared by Lighthief internal review, 10 Feb 2026*
*Source documents: Bess - EPC System Cost v2.xlsx, linyang.md, sales_agrement.md, distribution.md, DOCUMENT_INDEX.md, rfi-linyang-responses-feb2026.md, voltus-ems-cost-allocation.md, linyang sales - COMMENTS.md*
