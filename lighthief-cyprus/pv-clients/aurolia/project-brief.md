# Aurolia – Greenland Family Park
## 60kWp Commercial PV Self-Consumption System

**Client:** Aurolia
**Location:** Greenland Family Park, Cyprus
**Document Reference:** LCY-PV-AUR-001
**Version:** 1.0
**Date:** March 2026
**Classification:** INTERNAL – CONFIDENTIAL

---

## 1. PROJECT OVERVIEW

### 1.1 System Specification

| Parameter | Value |
|-----------|-------|
| **PV Capacity** | 60 kWp |
| **PV Panels** | REC 400–430 Wp Pure R Alpha Series |
| **Inverter 1** | JKS-20H-EI — Jinko 20 kW Hybrid |
| **Inverter 2** | JKS-20H-EI — Jinko 20 kW Hybrid |
| **Inverter 3** | JKS-15H-EI — Jinko 15 kW Hybrid |
| **Total Inverter Capacity** | 55 kW |
| **Export Setting** | Zero export (0 kW feed-in) |
| **Battery Storage** | TBC (hybrid inverters are battery-ready) |
| **Diesel Generator** | Stamford S1L2-Y1 — 62.5 kVA / 50 kW continuous (400V, 3-phase, 50Hz) |
| **EAC/DSO Application** | **NOT FILED** – client decision |
| **Net Billing Scheme** | **NOT APPLIED** |

### 1.2 Client Decision

The client has opted to install the system as a **pure self-consumption installation with zero export** and has explicitly declined to submit an EAC/DSO application. The system is intended to operate entirely behind the meter with no energy exchange with the distribution network.

### 1.3 Risk Classification

| Risk Area | Level | Notes |
|-----------|-------|-------|
| **DSO Discovery** | Medium-High | Meter data analysis or physical inspection |
| **Installer Liability** | Medium | Licensed electrician signs compliance forms |
| **Client Liability** | Medium | Unauthorized modification of supply installation |
| **Safety** | Must be LOW | Engineering controls must compensate for regulatory gap |

---

## 2. REGULATORY ANALYSIS

### 2.1 What Cyprus Law Actually Says

Under the EAC Distribution Rules and the RES Technical Guide (2023.2 / 2025 edition), **any generating installation operating in parallel with the grid requires prior DSO approval**, regardless of whether it exports energy.

Key regulatory facts:

1. **Zero export does NOT exempt from authorization.** The system is still classified as a generating installation connected in parallel with the distribution network.

2. **For systems ≥ 20 kWp**, an external protection relay is mandatory (per RES Technical Guide Table 1).

3. **For systems < 120 kWp**, SCADA is not required but a ripple control receiver IS required.

4. **Anti-islanding (Loss of Mains)** detection must be active on all grid-connected inverters.

5. The licensed electrical contractor who signs Form **E-ΔΔ-514** (installation ready for inspection) and the designer who signs **E-ΔΔ-516** are legally declaring compliance. If the system is operating without DSO approval, those declarations become false.

### 2.2 What the DSO Can Do If Discovered

| Action | Likelihood | Consequence |
|--------|-----------|-------------|
| **Formal non-compliance notice** | High | Immediate disconnection required |
| **Meter supply disconnection** | Medium | DSO can seal/disconnect at meter |
| **Refuse future Net Billing applications** | High | For this installation until compliant |
| **Report licensed contractor** | Medium | Installation certificate rejected |
| **Administrative penalties** | Medium | Under Cyprus electricity law |
| **Unauthorized injection prosecution** | Low | Only if export detected (even momentary) |

### 2.3 How Discovery Typically Happens

| Detection Method | Risk Level | Notes |
|------------------|-----------|-------|
| **Routine meter inspection** | Medium | EAC smart meters can detect generation signatures |
| **Load profile anomaly** | Medium | Daytime consumption dropping to near-zero is flagged |
| **Neighbor/competitor report** | Low-Medium | Visible panels on commercial roof |
| **Insurance claim investigation** | High (if triggered) | Insurer will check compliance |
| **Electrical fault/fire investigation** | Very High (if triggered) | Full regulatory review follows |

### 2.4 Practical Enforcement Assessment (March 2026)

Based on publicly available evidence, industry intelligence, and regulatory research:

**EAC Enforcement Posture:**
In March 2024, EAC spokeswoman Christina Papadopoulou publicly acknowledged that illegal PV installations "plague" EAC, affecting both commercial/industrial units and private individuals (source: Cyprus Mail, 26 March 2024). She confirmed that EAC currently acts **"mainly on tip-offs"** because *"there are a lot of rooftops and it is difficult to inspect each one."* There is no active inspection program for unauthorized PV installations.

**Published Penalties:**
No specific fine amounts have been published by EAC for unauthorized PV installations. The stated enforcement measures are:
1. Disconnection of the illegal system from the grid
2. Cancellation of approval certificates
3. Fines (amount unspecified)

No criminal prosecution precedents exist for PV-specific violations in Cyprus. Under the Electricity Regulations (Cap. 82), connecting an installation without prior inspection/Certificate of Suitability is classified as "an offence," but no penalty schedule is publicly documented for this category.

**Industry Intelligence:**
Leading commercial PV installers in Cyprus (including Trikkis, one of the largest established firms) report that they have multiple installations operating in this configuration. The typical outcome when discovered is a warning letter and a requirement to regularize the installation — not prosecution, significant fines, or permanent disconnection.

**Smart Meter Risk — Critical Timeline:**
The EAC smart meter rollout is ahead of schedule:
- 220,000 of 400,000 meters installed as of January 2026
- Full rollout expected to complete within 2026 (ahead of January 2027 deadline)
- Installations are actively underway in Limassol
- Smart meters enable automated load profile analysis, anomalous pattern detection, and remote disconnection

Once a smart meter is installed at Greenland Family Park, the daytime consumption profile could theoretically show PV generation signatures (reduced grid import during sunlight hours).

**Generator Load Profile Masking:**
The existing diesel generator at the site provides a natural mitigation factor for smart meter detection:
- The generator already creates an irregular load profile with periods of reduced or zero grid import when running
- Smart meter analytics would see variable grid consumption patterns as normal baseline behavior for this site
- PV generation during daytime hours blends with existing generator-driven consumption variability
- The 60 kWp PV system is modestly sized relative to a family park's total demand, limiting the magnitude of the load profile shift
- Combined, the generator history and conservative PV sizing make it harder to isolate PV-specific signatures from general load variability

**Practical Risk Summary:**

| Risk | Likelihood | Severity | Evidence |
|------|-----------|----------|----------|
| Detection (pre-smart meter) | Low | N/A | Tip-off only, no active inspections |
| Detection (post-smart meter) | Low-Medium | N/A | Generator masks load profile anomaly |
| Warning letter | Medium | Low | Standard first response per industry |
| Forced disconnection | Low-Medium | Medium | Only if formally investigated |
| Significant fine | Very Low | Unknown | No published precedent or amount |
| Criminal prosecution | Negligible | High | No known cases for PV in Cyprus |
| ETEK action against electrician | Very Low | Medium | No published disciplinary cases |
| Insurance complication | Low (unless claim) | High | Triggered only by separate incident |

---

## 3. STRATEGY: SELF-CONTAINED INSTALLATION ARCHITECTURE

### 3.1 Design Philosophy

The objective is to structure this installation so that the PV system is **electrically isolated from the grid connection** and operates as a **private, self-contained power source** feeding internal loads only. The grid and the PV system must never operate in parallel in a way that could be characterized as an unauthorized generating installation connected to the distribution network.

This requires a **transfer switch architecture** — not simple parallel operation.

### 3.2 Recommended Topology

```
                    EAC UTILITY SUPPLY
                         │
                    ┌────┴────┐
                    │  MAIN   │
                    │  METER  │ ← EAC revenue meter
                    └────┬────┘
                         │
                    ┌────┴────┐
                    │  MAIN   │
                    │ INCOMER │ ← Main breaker / isolator
                    │   CB    │
                    └────┬────┘
                         │
               ┌─────────┴─────────┐
               │                   │
          SOURCE 1            SOURCE 2 (via ATS)
          (Grid Direct)            │
               │              ┌────┴────┐
               │              │   ATS   │ ← Automatic Transfer Switch
               │              │ 4-POLE  │    (Grid ←→ PV/Generator)
               │              └────┬────┘
               │                   │
               │         ┌────────┴────────┐
               │         │                 │
               │    ┌────┴────┐      ┌─────┴─────┐
               │    │  JINKO  │      │  DIESEL   │
               │    │ HYBRID  │      │ GENERATOR │
               │    │ SYSTEM  │      └───────────┘
               │    │(3x INV) │
               │    └────┬────┘
               │         │
               │    ┌────┴────┐
               │    │   PV    │
               │    │ ARRAY   │
               │    │ 60 kWp  │
               │    │  (REC)  │
               │    └─────────┘
               │
          ┌────┴────────────┐
          │   MAIN LV       │
          │  DISTRIBUTION   │
          │    BOARD         │
          │                  │
          │  ┌──────────┐   │
          │  │ Essential │   │
          │  │  Loads    │   │
          │  │  Board    │   │ ← PV/Generator serves these via ATS
          │  └──────────┘   │
          │                  │
          │  ┌──────────┐   │
          │  │  General  │   │
          │  │  Loads    │   │ ← Grid serves these directly
          │  └──────────┘   │
          └─────────────────┘
```

### 3.3 Architecture Explanation

**The critical design principle:** The PV/hybrid system and the grid NEVER operate in parallel.

| Operating Mode | Grid | PV/Hybrid | Generator | Loads Fed By |
|---------------|------|-----------|-----------|-------------|
| **Normal Day** | ON | ON (via ATS to essential loads) | OFF | Grid feeds general loads; PV feeds essential loads |
| **Normal Night** | ON | Battery discharge (if equipped) | OFF | Grid + battery |
| **Grid Failure** | OFF | ON (island mode) | Standby | PV/battery feeds essential loads |
| **Grid Failure + High Load** | OFF | ON | ON (parallel with PV) | Generator + PV feed essential loads |
| **Maintenance** | ON | OFF (isolated) | OFF | Grid feeds everything |

**Key characteristic:** At no point does the PV system feed power in parallel with the grid to the same bus. The ATS ensures mutual exclusivity between grid supply and PV/generator supply for the essential loads section.

### 3.4 Why This Architecture Provides Legal Cover

| Argument | Basis |
|----------|-------|
| PV is not connected to the grid | ATS provides galvanic separation — PV feeds a separate load section |
| No parallel operation | Transfer switch prevents simultaneous grid + PV on same bus |
| No export is physically possible | PV circuit is downstream of ATS, cannot reach grid meter |
| Similar to UPS architecture | Hybrid inverters in this configuration behave like a UPS — accepted practice |
| Generator already operates this way | The diesel generator uses the same transfer scheme — established pattern |

### 3.5 Alternative Topology: Full Behind-Meter with Zero Export Controller

If the client cannot or will not accept load splitting (essential vs general), a simpler but riskier approach:

```
                    EAC UTILITY SUPPLY
                         │
                    ┌────┴────┐
                    │  MAIN   │
                    │  METER  │
                    └────┬────┘
                         │
                    ┌────┴────┐
                    │  CT SET │ ← Zero-export CTs (3-phase)
                    │ AT PCC  │    Wired to Jinko meter input
                    └────┬────┘
                         │
               ┌─────────┴─────────┐
               │    MAIN LV        │
               │  DISTRIBUTION     │
               │     BOARD         │
               │                   │
               │  ┌──────────┐     │
               │  │  JINKO   │     │
               │  │  HYBRID  │     │
               │  │ INVERTERS│     │
               │  │ (3 units)│     │
               │  └────┬─────┘     │
               │       │           │
               │  ┌────┴────┐     │
               │  │   PV    │     │
               │  │  ARRAY  │     │
               │  └─────────┘     │
               │                   │
               │  ┌──────────┐     │
               │  │  DIESEL  │     │
               │  │   GEN    │     │
               │  │ (via ATS)│     │
               │  └──────────┘     │
               │                   │
               │  ┌──────────┐     │
               │  │  ALL     │     │
               │  │  LOADS   │     │
               │  └──────────┘     │
               └───────────────────┘
```

**This topology is simpler but weaker legally** — the PV is connected in parallel with the grid, and the only protection is the zero-export software/CT logic. This IS the configuration that requires DSO approval.

---

## 4. ZERO EXPORT SAFETY ENGINEERING

Regardless of which topology is chosen, zero-export must be failsafe. For the Jinko hybrid inverters:

### 4.1 Layer 1: Inverter-Level Zero Export (Software)

| Setting | Configuration |
|---------|--------------|
| **Export Limit** | 0 kW (zero feed-in mode) |
| **CT/Meter Location** | At PCC (main incomer, after EAC meter) |
| **CT Polarity** | Must be correct on all 3 phases — reversed CT = uncontrolled export |
| **Response Time** | < 2 seconds (Jinko hybrid typical) |
| **Comms Protocol** | RS485 from CT meter to inverter (or direct CT clamp) |

**For 3 inverters:** All three Jinko units must share the same CT meter reading. This typically requires:
- A single CT meter at PCC connected to the **master inverter** via RS485
- Master-slave communication between the 3 inverters (RS485 daisy chain)
- Or a Jinko Smart Meter shared across all units

### 4.2 Layer 2: Hardware Fail-Safe (Contactor/Relay)

The inverter's software zero-export is necessary but not sufficient. Add a hardware trip path:

| Component | Function |
|-----------|----------|
| **Reverse power relay** | Monitors power direction at PCC; trips if export detected (>0.2 kW for >2 seconds) |
| **Dry contact output** | Relay output wired to inverter "remote shutdown" or "enable" DI terminal |
| **AC contactor** | Shunt-trip contactor on PV AC output as backup — physically disconnects inverters if relay trips |
| **CT heartbeat watchdog** | If CT communication is lost, inverters must shut down within 5 seconds |

### 4.3 Layer 3: Generator Interlock

| Scenario | Required Behavior |
|----------|-------------------|
| **ATS switches to generator** | PV must either: (a) shut down, OR (b) operate in generator-parallel mode with power limiting |
| **Generator reverse power** | Generator controller must have reverse power protection enabled |
| **PV output limiting on generator** | PV output must not exceed **25 kW** (50% of Stamford 50 kW continuous rating) when paralleled |
| **Generator failure** | PV continues in island mode (hybrid inverter capability) |

**Interlock wiring:**
- ATS position contact (dry contact) → wired to inverter "grid/off-grid" mode input
- When ATS = generator position → inverters switch to off-grid/island mode
- When ATS = grid position → inverters switch to grid-tied mode (with zero export)

### 4.4 Layer 4: Physical Isolation Provisions

| Provision | Purpose |
|-----------|---------|
| **Lockable AC isolator** on each inverter output | Allows complete physical isolation |
| **Lockable DC isolator** on PV string inputs | Standard requirement regardless |
| **Clearly labeled changeover** | "PV SYSTEM — ISOLATE BEFORE GRID WORK" |
| **Emergency stop button** | Kills all inverter output immediately |

---

## 5. JINKO HYBRID INVERTER SPECIFICS

### 5.1 Confirmed Models (per datasheet JKS-6-20H-EI-A7)

| Inverter | Model | Key Specs |
|----------|-------|-----------|
| 2x 20 kW | **JKS-20H-EI** | 3-phase hybrid, 2 MPPTs, MPPT range 500–850V, max DC 1000V |
| 1x 15 kW | **JKS-15H-EI** | 3-phase hybrid, 2 MPPTs, MPPT range 420–850V, max DC 1000V |

**Confirmed capabilities (from datasheet):**
- **Five ports:** PV, battery, diesel generator, smart load, grid — native generator integration
- **Grid certifications:** EN 50549-1, VDE 4105, VDE 0124, 2016/631 EU
- **Anti-islanding:** Built-in
- **Communication:** RS485 + CAN (for BMS and meter)
- **Power factor:** 0.8 leading to 0.8 lagging (exceeds DSO requirement of 0.9)
- **Built-in protection:** Insulation resistance detection, RCMU, overcurrent, short circuit, surge (DC Type II / AC Type III)
- **IP65** rated, operating temp -40 to 60°C (derating above 45°C)
- **Efficiency:** Max 97.6%, Euro 97.0%, MPPT 99.9%
- **Off-grid peak power:** 1.5× rated for 10 seconds

### 5.2 Critical Connections for Zero Export

| Connection | From | To | Cable |
|-----------|------|-----|-------|
| **CT meter → Master inverter** | Smart Meter / CT at PCC | Inverter 1 RS485 port | Shielded twisted pair |
| **Master → Slave 1** | Inverter 1 RS485-OUT | Inverter 2 RS485-IN | Shielded twisted pair |
| **Slave 1 → Slave 2** | Inverter 2 RS485-OUT | Inverter 3 RS485-IN | Shielded twisted pair |
| **Reverse power relay → Inverters** | Relay NO contact | All inverter "Enable" DI (parallel wired) | Control cable |
| **ATS position → Inverters** | ATS auxiliary contact | All inverter "Grid/Off-Grid" DI | Control cable |
| **Emergency stop → AC contactor** | E-stop button | Shunt trip coil on AC contactor | Control cable |

### 5.3 PV String Configuration (60 kWp — REC Alpha Pure-R)

Based on confirmed datasheets (REC Alpha Pure-R + JKS-20H-EI / JKS-15H-EI):

| Parameter | 410 Wp Panel | 430 Wp Panel |
|-----------|-------------|-------------|
| **Panel count for 60 kWp** | 147 panels | 140 panels |
| **Voc per panel** | 59.2V | 59.7V |
| **Vmpp per panel** | 49.4V | 50.5V |
| **Isc per panel** | 8.84A | 8.91A |
| **Impp per panel** | 8.30A | 8.52A |
| **Voc at -10°C** | ~64.2V | ~64.7V |

**String sizing for JKS-20H-EI (MPPT range 500–850V, max 1000V):**

| Parameter | Value |
|-----------|-------|
| Min panels per string (Vmpp ≥ 500V) | 10 panels (430Wp) / 11 panels (410Wp) |
| Max panels per string (Voc at -10°C ≤ 1000V) | 15 panels |
| Recommended string length | 12–14 panels |
| Strings per MPPT | 1–2 (max input current per MPPT: 26A) |
| Total MPPTs (20kW model) | 2 |

**String sizing for JKS-15H-EI (MPPT range 420–850V, max 1000V):**

| Parameter | Value |
|-----------|-------|
| Min panels per string (Vmpp ≥ 420V) | 9 panels |
| Max panels per string (Voc at -10°C ≤ 1000V) | 15 panels |
| Recommended string length | 10–14 panels |
| Total MPPTs (15kW model) | 2 |

**String current:** ~8.9A per string (Isc). This is well within the 26A per-MPPT input limit — allows 2 strings per MPPT if needed.

---

## 6. DIESEL GENERATOR INTEGRATION

### 6.1 Operating Modes with Generator

| Mode | Grid | Generator | PV/Hybrid | Notes |
|------|------|-----------|-----------|-------|
| **Grid Normal** | ON | OFF | ON (zero export) | Standard daytime operation |
| **Grid Failure** | OFF | Starting | ON (island via hybrid) | Hybrid inverters bridge the gap |
| **Generator Running** | OFF | ON | ON (limited output) | PV supplements generator, never exceeds load |
| **Generator + Grid Return** | ON | Cooling down | Transfer back to grid mode | ATS returns to grid, PV stays on zero export |

### 6.2 Confirmed Generator Specification

| Parameter | Value |
|-----------|-------|
| **Alternator** | Stamford S1L2-Y1 |
| **S/N** | G22L493879 |
| **Continuous Rating (S1)** | 62.5 kVA / 50 kW |
| **Standby Rating (S10)** | 66.6 kVA / 53.28 kW |
| **Voltage** | 400V |
| **Current (continuous)** | 90.2A |
| **Frequency** | 50 Hz / 1500 RPM |
| **Power Factor** | 0.8 |
| **Connection** | Star (S.STAR), 3-phase |
| **Insulation Class** | H |
| **IP Rating** | IP23 |

**PV/Generator sizing relationship:** The generator continuous rating (50 kW) is close to the total inverter capacity (55 kW). When the site is running on generator, PV must be limited to ≤25 kW (50% of generator) to prevent reverse power and frequency instability.

**Note:** The JKS-20H-EI inverter has a **native diesel generator port**. This may simplify the integration — the inverter can manage grid/generator/PV switching internally without a separate ATS. Confirm with the Jinko installation manual whether the internal transfer logic is suitable, or whether the existing external ATS arrangement is preferred.

### 6.3 Generator Connection Point

Both sources should feed the site bus through properly rated switchgear:

- **Generator** → via ATS or via Jinko inverter's native generator port
- **PV/Hybrid** → via dedicated breaker on the load side of the main distribution board

### 6.4 Neutral and Earthing Considerations

| Issue | Status / Check Required |
|-------|------------------------|
| **Generator connection** | Star (S.STAR) — confirmed from nameplate |
| **Generator N-E bond** | To be confirmed at site — Star connection likely has N-E bond at alternator |
| **ATS neutral switching** | Is the ATS 3-pole or 4-pole? (4-pole required if generator has N-E bond) |
| **PV neutral reference** | Hybrid inverters need a stable neutral reference in island mode |
| **RCD coordination** | Multiple sources can cause nuisance RCD trips if earthing is wrong |

> **REMAINING ACTION:** Site survey must document the existing ATS type (manual/auto, pole count) and earthing arrangement before finalizing the SLD. Generator kVA and connection type are now confirmed.

---

## 7. LEGAL RISK MITIGATION

### 7.1 Contractual Protections

| Document | Content | Purpose |
|----------|---------|---------|
| **Client Acknowledgment Letter** | Client confirms they have been advised of DSO requirements and have chosen to proceed without EAC application | Transfers decision liability to client |
| **Scope of Works** | Clearly states "self-consumption system, not connected to distribution network for export purposes" | Defines installation intent |
| **Warranty Disclaimer** | States warranty does not cover regulatory penalties or forced disconnection | Limits Lighthief exposure |
| **System Handover Certificate** | Documents zero-export settings and safety features at commissioning | Proves competent installation |

### 7.2 Installation Documentation (What to Prepare)

Even without an EAC application, maintain full documentation as if one were submitted:

| Document | Status |
|----------|--------|
| ☐ Single Line Diagram (complete) | Required |
| ☐ Protection settings record | Required |
| ☐ Zero export commissioning test report | Required |
| ☐ CT polarity verification record | Required |
| ☐ Inverter serial numbers and firmware versions | Required |
| ☐ Generator interlock test record | Required |
| ☐ Earthing continuity test | Required |
| ☐ Insulation resistance test | Required |
| ☐ Photos of all critical connections | Required |

**Rationale:** If the system is ever discovered and needs to be regularized, having complete documentation allows a retroactive EAC application to be submitted quickly. Without documentation, regularization becomes much harder and more expensive.

### 7.3 Future Regularization Path

If the client later decides to apply to EAC (or is forced to):

1. Submit a Net Billing application declaring zero export
2. Provide the SLD and protection settings
3. Inverters must have EN 50549 or VDE-AR-N 4105 certification
4. EAC inspection required before official energization
5. May need to add a ripple control receiver (< 120 kWp requirement)
6. Timeline: 2–6 months depending on EAC backlog

---

## 8. SAFETY PRIORITIES (NON-NEGOTIABLE)

Regardless of the regulatory status, these safety measures are mandatory from an engineering ethics and liability perspective:

| # | Safety Measure | Reason |
|---|---------------|--------|
| 1 | **Anti-islanding protection active** | Prevents energizing the grid during outage — protects EAC lineworkers |
| 2 | **DC isolators on all strings** | Fire safety and maintenance isolation |
| 3 | **AC isolators on all inverters** | Maintenance isolation |
| 4 | **Proper earthing** | Fault current path, touch voltage protection |
| 5 | **RCD protection** on inverter output circuits | Earth leakage protection |
| 6 | **Surge protection** (Type 1+2 on DC, Type 2 on AC) | Lightning and switching surge protection |
| 7 | **Cable sizing per BS 7671 / IEC 60364** | Fire prevention, voltage drop |
| 8 | **Labeling per EN 60204-1** | "DUAL SUPPLY — ISOLATE PV BEFORE WORK" |
| 9 | **Emergency shutdown procedure** posted | At main DB and at inverter location |
| 10 | **Fire-rated DC cabling** where required | Particularly within building structures |

---

## 9. PRICING INVESTIGATION

### 9.1 Cost Components (To Be Developed)

| Component | Quantity | Unit Cost | Total |
|-----------|----------|-----------|-------|
| REC PV panels (~420Wp) | ~143 | TBC | TBC |
| Jinko 20kW hybrid inverter | 2 | TBC | TBC |
| Jinko 15kW hybrid inverter | 1 | TBC | TBC |
| Mounting structure (roof/ground TBC) | 1 lot | TBC | TBC |
| DC cabling + connectors | 1 lot | TBC | TBC |
| AC cabling (inverter to DB) | 1 lot | TBC | TBC |
| Distribution board modifications | 1 lot | TBC | TBC |
| ATS / Transfer switch | 1 | TBC | TBC |
| Zero export CT meter + relay | 1 lot | TBC | TBC |
| Installation labor | 1 lot | TBC | TBC |
| Commissioning + testing | 1 lot | TBC | TBC |
| Documentation package | 1 lot | TBC | TBC |

### 9.2 Margin Targets

| Scenario | Target Margin |
|----------|--------------|
| **Standard commercial PV** | 15–20% |
| **With legal risk premium** | 20–25% |
| **If including regularization service later** | Bundle as add-on |

---

## 10. OPEN ACTIONS

| # | Action | Owner | Priority | Status |
|---|--------|-------|----------|--------|
| 1 | Confirm exact Jinko hybrid inverter model numbers | Lighthief / Supplier | 🔴 High | ☐ Pending |
| 2 | Confirm REC panel model and wattage | Lighthief / Supplier | 🔴 High | ☐ Pending |
| 3 | Site survey: existing DB, generator, ATS, earthing | Lighthief Field | 🔴 High | ☐ Pending |
| 4 | Confirm generator kVA rating and connection type | Client / Field | 🔴 High | ☐ Pending |
| 5 | Prepare draft SLD | Lighthief Electrical | 🔴 High | ☐ Pending |
| 6 | Draft client acknowledgment letter | Lighthief Legal | 🟡 Medium | ☐ Pending |
| 7 | Source zero-export CT meter compatible with Jinko | Lighthief Procurement | 🟡 Medium | ☐ Pending |
| 8 | Source reverse power relay for hardware fail-safe | Lighthief Procurement | 🟡 Medium | ☐ Pending |
| 9 | Pricing: obtain quotes for all components | Lighthief Procurement | 🟡 Medium | ☐ Pending |
| 10 | Confirm roof structural capacity (if roof-mount) | Structural Engineer | 🟡 Medium | ☐ Pending |
| 11 | Check Jinko EN 50549 / VDE certification status | Lighthief Technical | 🟢 Low | ☐ Pending |
| 12 | Prepare regularization package (for future use) | Lighthief Technical | 🟢 Low | ☐ Pending |

---

## 11. APPLICABLE REGULATIONS REFERENCE

| Regulation | Relevance |
|-----------|-----------|
| EAC Distribution Rules (Κανόνες Διανομής) | Grid connection requirements |
| RES Technical Guide 2023.2 (ΣAAΗ) | Protection settings, LFSM-O, reconnection |
| Technical Guide for Storage 2025.1 | If battery added later |
| VDE-AR-N 4105:2018-11 | LV systems < 120 kWp — protection standard |
| EN 50549-1 | Grid connection for LV generating plants |
| IEC 60364 | Electrical installation safety |
| BS 7671 (IEE Wiring Regulations) | Cable sizing and installation practice |
| EN 60204-1 | Safety of machinery — electrical equipment |
| Cyprus Electricity Law | Unauthorized generation provisions |

---

*Document Version: 1.0*
*Created: March 2026*
*Lighthief Cyprus Ltd — PV Commercial Division*
*INTERNAL USE ONLY — NOT FOR CLIENT DISTRIBUTION*
