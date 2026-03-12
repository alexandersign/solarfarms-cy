# Technical RFI — TP Aeolian Dynamics Wind Farm BESS Integration

> **INTERNAL USE ONLY — NOT FOR CLIENT**
> **Date:** 4 March 2026
> **Project:** 5.4 MW / 16.2+ MWh BESS, Agia Anna, Larnaca
> **Based on:** Client-provided technical documentation review

---

## 1. MV Cubicle — ABB ZX1.2 Integration (CRITICAL)

### Findings
- Existing switchgear: **ABB ZX1.2 GIS, 24kV, SF6 insulated**
- 3 panels: J01 (feeder WTG1-3), J02 (feeder WTG4-6), J03 (incomer from EAC)
- Each panel 600mm wide, total 2400mm
- Design is **extensible** — a 4th bay (J04) can be added for the BESS feeder
- An **Ormazabal** MV unit is visible on a pallet in the MV room (still packaged)

### Questions for Client
1. Is the Ormazabal unit intended for the BESS MV connection? If yes, what model/spec?
2. Has bus-coupling compatibility between Ormazabal and ABB ZX1.2 been verified?
3. If not compatible, is the client open to procuring a native ABB ZX1.2 extension bay?
4. Who procured the Ormazabal unit and what was the intended purpose?

### Budget Impact
- If we supply an ABB ZX1.2-compatible bay: **€25,000–€40,000**
- If client provides the cubicle and we only integrate: **€5,000–€10,000** (integration labour + bus coupling verification)
- Current proposal budget: **€0** (not budgeted)

---

## 2. Protection Engineering Scope (CRITICAL)

### Findings
- Existing protection: ABB **REF630** relays on all 3 bays
- IEC 61850 **GOOSE** inter-bay communication for blocking/intertripping
- Overcurrent (inverse time + definite time), earth fault, sensitive earth fault, CB fail, under-frequency, auto-recloser (J03)
- Existing selectivity study: 3VGR111416E0002 (ABB, 2015)
- Existing relay settings: 3VGR111416E0005 (ABB, 2015)

### Questions for Client
1. Does TP Aeolian Dynamics have an appointed **electrical engineer/consultant** who will provide protection parameters and relay settings for the BESS feeder?
2. Or is the full protection engineering scope (selectivity restudy, relay procurement, GOOSE configuration, onsite testing) expected from Lighthief?
3. Can we obtain copies of: earthing study (3VGR111416E0001), selectivity study (3VGR111416E0002), and relay settings (3VGR111416E0005)?

### Budget Impact
- If client's engineer provides protection parameters and we only implement: **€8,000–€12,000**
- If full protection scope is ours (study + relay + GOOSE + testing): **€15,000–€20,000**
- Current proposal budget: **€5,000–€6,000** (standard adder — significantly underbudgeted)

---

## 3. Updated Engineering Studies (REQUIRED)

### Load Flow & Short Circuit Study
- Existing: PowerFactory 15.1.6 model (DIgSILENT, June 2014)
- Current SC: 165 MVA / 4.4 kA at 22kV
- Export line loading: 83.24% at full 10.8 MW output
- BESS fault current contribution must be assessed — verify ZX1.2 rated capacity is not exceeded
- New load flow required to confirm export line remains within thermal limits during combined wind+BESS operation

### Earthing Study
- Existing: 3VGR111416E0001 (ABB, 2014)
- BESS containers + MV skid must integrate into existing earthing grid
- Additional earthing electrodes may be needed for BESS footprint

### Selectivity Study
- Existing: 3VGR111416E0002 (ABB, 2015)
- Must be re-run with BESS bay J04 added
- All relay settings on J01, J02, J03 may need adjustment

### Budget for Studies
| Study | Estimated Cost | Notes |
|-------|---------------|-------|
| Load flow + SC update | €8,000–€12,000 | PowerFactory model update, SC verification |
| Earthing study update | €5,000–€8,000 | Integration of BESS into existing grid |
| Selectivity restudy | Included in protection scope (item 2) | |
| **Total** | **€13,000–€20,000** | |

### Current proposal budget: **€0** (not budgeted)

---

## 4. SCADA / IEC 104 Gateway Integration

### Findings
- Existing SCADA protocol: **IEC 60870-5-104 / IEC 60870-5-101** to EAC NCC
- RTU: ABB TH3/TH4 series in dedicated RTU panel
- Signal list: 3VGR111416F0002 (detailed BI/BO/AI mapping for all 3 bays + wind farm signals)
- Wind farm controller provides: active power setpoint, reactive power setpoint, PF control, curtailment signals

### Question for Voltus
- Does the standard Voltus EMS package (€47K) include an **IEC 60870-5-104 gateway** for integration with existing ABB SCADA/RTU?
- Or is a separate IEC 104 protocol converter needed?
- Can the Voltus EMS receive/send commands from the existing wind farm controller (3rd-party interface)?

### Question for Client
- Does the client expect the BESS EMS to integrate directly into the existing ABB RTU panel (via IEC 104), or will the BESS have its own separate SCADA link to EAC NCC?
- The signal list (3VGR111416F0002) will need extension for BESS bay J04 signals — who coordinates this with EAC?

### Budget Impact
- If Voltus EMS includes IEC 104: **€0 additional**
- If separate IEC 104 gateway hardware + integration needed: **€5,000–€10,000**
- Current proposal: **assumed included in Voltus €47K** (needs verification)

---

## 5. Export Limit & Grid Capacity

### Findings
- Export line: 5.17 km 22kV overhead line to PSEUDAS S/S (EAC 132kV)
- Loading at full wind output (10.8 MW): **83.24%**
- Remaining thermal headroom: approximately **2.1 MW** (assuming cable rated ~13 MW)
- If BESS discharges simultaneously with full wind generation, combined output could exceed cable rating

### Questions for Client
1. What is the **EAC-approved maximum export capacity** for this site? Is it capped at 10.8 MW?
2. Does the BESS grant approval include additional export capacity, or must BESS discharge only when wind generation is curtailed/reduced?
3. Is the BESS expected to operate strictly as "behind the meter" with export limited to the existing grid connection capacity?

### Impact on EMS Configuration
- The Voltus EMS **must enforce a combined export limit** to prevent overloading the 22kV export line
- EMS must coordinate with wind farm controller: BESS can only discharge the difference between current wind output and the export limit
- This is a critical EMS configuration parameter — not a hardware cost, but requires engineering

---

## 6. Summary — Total Additional Budget Required

| Item | Low Estimate | High Estimate | Midpoint |
|------|-------------|--------------|----------|
| MV cubicle (ABB ZX1.2 bay) | €25,000 | €40,000 | €32,500 |
| Protection engineering (full scope) | €15,000 | €20,000 | €17,500 |
| Load flow + SC study | €8,000 | €12,000 | €10,000 |
| Earthing study | €5,000 | €8,000 | €6,500 |
| SCADA/IEC 104 gateway | €5,000 | €10,000 | €7,500 |
| MV room civil modifications | €5,000 | €10,000 | €7,500 |
| Design drawings (gap over €7K) | €10,000 | €18,000 | €12,500 |
| Project engineering/management | €15,000 | €25,000 | €20,000 |
| **Total** | **€88,000** | **€143,000** | **€114,000** |

### Revised Client Pricing (with €114K midpoint additional scope, +20% markup)

| Option | Previous Price | Revised Price | Increase |
|--------|---------------|--------------|----------|
| A (5/15) | €2,235,600 | €2,372,400 | +€136,800 |
| B (5/20) | €2,575,400 | €2,712,200 | +€136,800 |
| C (6/20) | €2,648,100 | €2,784,900 | +€136,800 |
| D (6.5/20) | €2,703,200 | €2,840,000 | +€136,800 |
| E (6/25) | €3,169,100 | €3,305,900 | +€136,800 |

> The €136,800 increase (€114K × 1.20 markup) is constant across all options because the additional scope is project-level (MV integration, protection, studies, design) rather than equipment-dependent.

---

## 7. Action Items

- [ ] Send technical clarification questions to Sotiris Shiacallis (items 1, 2, 3, 5)
- [ ] Internal: verify Voltus IEC 104 capability (item 4)
- [ ] Request copies of ABB earthing and selectivity studies from client
- [ ] Site visit to assess MV room space, cable routing, BESS footprint options
- [ ] Update proposal pricing once clarifications received
