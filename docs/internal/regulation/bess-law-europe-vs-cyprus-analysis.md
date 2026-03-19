# BESS Law in Europe vs Cyprus: PV-to-BESS Legal Distinction & Grid Import Rights

> **Date:** February 2026
> **Purpose:** Analysis of the legal distinction across European jurisdictions defining when a PV plant with co-located storage is classified as a BESS park with grid import rights, versus a hybrid RES facility restricted to self-charging only.

---

## Executive Summary

The core legal question: **At what point does a PV+BESS installation become a "storage facility" that can import (charge from) the grid, rather than a "hybrid RES plant" restricted to charging from its own solar generation only?**

Every EU member state must implement EU Directive 2019/944 (Article 2(59)), which defines "energy storage" as *"deferring the final use of electricity to a moment later than when it was generated, or the conversion of electrical energy into a form of energy which can be stored, the storing of such energy, and the subsequent reconversion of such energy into electrical energy or use as another energy carrier."* The Directive is technology-neutral and grants storage the right to participate in all electricity markets. However, **national implementations differ dramatically** in how they classify co-located PV+BESS versus standalone BESS, and whether hybrid systems can charge from the grid.

---

## CYPRUS — The Benchmark (Current Framework)

### Legal Basis
- **Law N.130(I)/2021** — Electricity Market Regulation Act
- **Law Ν.180(I)/2025** and **Ν.181(I)/2025** — Updated energy/storage provisions
- **DSO Technical Guide for Storage - Edition 2025.1** (EAC)
- **CERA licensing** under Article 26(m) of Law N.130(I)/2021

### The Three-Category System

Cyprus has the clearest classification system in Europe, with explicit rules on grid charging:

| Category | Description | Grid Charging | Grid Discharge | Key Threshold |
|----------|-------------|:-------------:|:--------------:|---------------|
| **A** | Self-consumption RES + BESS (net billing/metering) | **NO** | **NO** | BESS ≤ RES capacity; max 5.5 kVA (1φ) / 11 kVA (3φ) |
| **B** | Hybrid RES + integrated storage | **NO** | **YES** (per market dispatch) | BESS capacity ≤ RES capacity; max discharge ≤ 50% of RES installed capacity |
| **C** | Standalone storage facility (EAH) | **YES** | **YES** (per market dispatch) | Discharge capacity > RES capacity, OR no RES component |

### The Critical Legal Distinction

**Category B → Category C transition:**
A PV+BESS installation becomes a **standalone storage facility (Category C)** — with full grid import rights — when:

> **The discharge capacity of the BESS exceeds the installed capacity of the co-located RES.**

In other words:
- **BESS discharge ≤ RES installed capacity** = Category B (hybrid) = **cannot charge from grid**
- **BESS discharge > RES installed capacity** = Category C (standalone) = **can charge from grid**

### Additional Cyprus Rules
- **PCS nameplate** must physically be ≤ RES licensed capacity for Category B (software limiting is NOT allowed — Κ.Δ.Π. 15/2026)
- Category B combined output: RES + BESS ≤ RES installed capacity
- Category C connection capacity is based on max charge/discharge capability; the RES component is optional and does NOT count toward connection capacity
- **As of February 2026:** BESS cannot yet buy from the Day-Ahead Market (DAM). Grid arbitrage legislation has NOT been passed. Revenue is limited to curtailment recovery.

---

## COUNTRY-BY-COUNTRY ANALYSIS

### 1. ITALY

**Legal Basis:** Legislative Decree 190/2024 (Testo Unico FER), corrected by D.Lgs. 178/2025

**Classification:**
- **Impianto di produzione con accumulo** (generation plant with storage): Storage is auxiliary to the generation plant. The BESS charges exclusively from the co-located RES. The system retains its RES classification.
- **Impianto di accumulo autonomo** (standalone storage): Independent storage facility connected directly to the grid. Full grid import/export rights.
- **Sistemi di accumulo integrati** (integrated storage): Co-located with generation but can operate independently.

**The Legal Distinction:**
Under the Testo Unico FER:
- A PV+BESS is classified as a **generation plant** when the storage is *functionally subordinate* to the generation facility and charges only from RES production.
- It becomes **standalone storage** when:
  - The BESS has an **independent grid connection point** (separate metering), OR
  - The BESS capacity exceeds the generation capacity and operates as the **primary asset**
  - The facility applies for an **Autorizzazione Unica** for storage (>200 MW standalone, or connected systems up to 300 MW)

**Grid Import Rule:**
- Integrated storage within a PV plant perimeter using **PAS** (Simplified Authorization): **Cannot charge from grid** — treated as generation auxiliary
- Standalone BESS or BESS with separate metering: **Can charge from grid**
- MACSE auction participants (standalone BESS): Full grid import rights, long-term CfD contracts

**Capacity Threshold:**
- ≤10 MW: Edilizia libera (free building) — but grid import rights depend on classification, not size
- PAS applies to PV plants up to **12 MW** in suitable areas
- The classification hinges on **metering configuration** and **authorization type**, not a fixed MW threshold

---

### 2. GERMANY

**Legal Basis:** EnWG (Energy Industry Act), EEG (Renewable Energy Act), BauGB

**Classification:**
Germany takes a **dual-role approach**: BESS is simultaneously treated as a consumer (when charging) and a generator (when discharging), regardless of whether it is standalone or co-located.

**The Legal Distinction:**
- There is **no formal hybrid vs. standalone classification** in the sense of restricting grid charging. All BESS can technically charge from the grid.
- The distinction instead affects **taxation, grid fees, and levies**:
  - **Behind a common metering point** with PV: No network charges or levies on electricity flowing between PV and BESS (never touches public grid)
  - **Grid-charged BESS**: Subject to grid fees (exempt until August 3, 2029 per §118(6) EnWG) and the **2025 Electricity Tax Amendment** eliminated double taxation on stored electricity
  - **§8a EEG**: Flexible grid connections — BESS can be co-located with RES under a shared connection

**Grid Import Rule:**
- **All BESS can charge from the grid** in Germany — there is no legal prohibition
- The economic distinction is in **grid fees and levies**:
  - Grid fee exemption (§118(6) EnWG) applies until **August 3, 2029**
  - After 2029, BESS will pay grid fees on consumed electricity
- **BKZ (Baukostenzuschuss):** Construction cost subsidies can reach tens of millions EUR for >100 MW projects
- Federal Court ruling (July 15, 2025) confirmed BESS = consumers for grid fee purposes

**Key Wording:**
> *EnWG §118(6): "Speicheranlagen" (storage facilities) are exempt from Netzentgelte (grid fees) for electricity drawn from the grid and subsequently re-fed, until August 3, 2029.*

**Practical Implication:** Germany is the **most permissive** jurisdiction — any BESS can charge from the grid. The legal framework manages this through fiscal treatment rather than outright prohibition.

---

### 3. SPAIN

**Legal Basis:** Royal Decree 1183/2020, RD 647/2020, RDL 7/2025, **RD 997/2025**

**Classification:**
- **Almacenamiento autónomo** (standalone storage): Independent grid-connected BESS
- **Hibridación con almacenamiento** (hybrid with storage): RES plant combined with BESS

**The Legal Distinction (Post-RD 997/2025):**
This is a **recent and significant change**. Royal Decree 997/2025 (November 5, 2025):
- **Removed the barrier** that classified hybrid PV+BESS facilities consuming energy from the grid as "consumers"
- Hybrid renewables + BESS now have the **same redispatch priority** as standalone RES (per RD 917/2025)
- New definition of "installed capacity" for facilities with power park modules and electrochemical storage

**Pre-November 2025:** A PV+BESS that charged from the grid was reclassified as a consumer, losing RES priority and subsidies.
**Post-November 2025:** Hybrid PV+BESS **can charge from the grid** without losing RES classification.

**Grid Import Rule:**
- **All BESS (standalone and hybrid) can now charge from the grid** following RD 997/2025
- Grid fee exemption applies to BESS
- PICASSO/MARI platforms (2025) enable ancillary service participation
- €700 million BESS support program (40-65% of project costs, max €250/kWh)

**Key Wording:**
> *RD 997/2025: Eliminates barriers for "instalaciones híbridas con almacenamiento que consuman energía de la red" (hybrid facilities with storage that consume energy from the grid) — these will no longer be classified as pure consumers.*

---

### 4. GREECE

**Legal Basis:** Law 4951/2022, Law 5151/2024, MD 28255/1143/2025

**Classification:**
- **Αυτόνομη αποθήκευση** (standalone storage): Independent BESS, merchant operation
- **Υβριδική εγκατάσταση** (hybrid installation): RES combined with storage

**The Legal Distinction:**
- **Standalone BESS** must apply through the **Special BESS Grid Connection Scheme** (MD March 2025) — full grid import/export rights
- **Hybrid installations** were historically restricted to self-charging
- Law 5151/2024 introduced clearer rules for the transition

**Capacity Allocation (March 2025):**

| Connection | Capacity | Financial Guarantee |
|------------|----------|-------------------|
| Transmission (ESMIE) | 3,800 MW (>10 MW projects) | €200,000/MW |
| Distribution (EDDIE) | 900 MW (≤10 MW projects) | €50,000/MW |

**Grid Import Rule:**
- **Standalone BESS (Category: autonomous):** Full grid import rights
- **Hybrid RES+BESS:** Can charge from grid only if the storage component has a **separate licensing and metering arrangement** or if the BESS capacity constitutes the primary asset
- Ownership cap: 250 MW per entity; 500 MW total (standalone + RES-combined) until 2029
- Operating aid: 10-year CfD contracts via DAPEEP

---

### 5. POLAND

**Legal Basis:** Energy Law Act (1997), 2021 Amendment

**Classification:**
Poland has **no dedicated BESS legislation** — the framework is fragmented.

**The Legal Distinction:**
- **>10 MW storage:** Requires a license from the URE President — treated as an independent energy activity
- **≤10 MW co-located with RES:** Registration in storage facility register — but grid charging rules are **unclear**
- **<1 MW:** Registration only

**Grid Import Rule:**
- **No explicit prohibition** on grid charging for licensed storage facilities
- **Practical barrier:** Regulatory uncertainty means most developers treat co-located BESS as RES-auxiliary (self-charging only) to avoid licensing complications
- 50% discount on grid connection fees
- Capacity market: 20-year contracts available (2023 auction: 1.7 GW)
- Balancing markets (FCR, aFRR) open since June 2024

**Key Gap:** Poland lacks clear legal wording on when a PV+BESS transitions to a grid-importing storage facility. The 2021 amendment introduced licensing for >10 MW storage but did not define hybrid vs. standalone classification.

---

### 6. CZECH REPUBLIC

**Legal Basis:** Lex OZE 3 Amendment (approved 2024, effective mid-2025)

**Classification:**
- **Standalone storage:** Formally recognized as independent energy source (December 2024)
- **Co-located storage ≤20% of PV capacity:** No separate license required

**The Legal Distinction:**
The **20% threshold** is the key marker:
- **BESS ≤ 20% of PV nameplate capacity:** Treated as auxiliary to the PV plant — **no separate license needed**, cannot independently charge from grid
- **BESS > 20% of PV nameplate capacity:** Requires **separate generation license** (raised to 100 kW threshold) — classified as independent storage — **can charge from grid**
- **Standalone BESS:** Full grid import rights, recognized as independent electricity market participant

**Grid Import Rule:**
- Co-located BESS ≤20% of PV: Self-charging only (RES auxiliary)
- Co-located BESS >20% of PV or standalone: Grid import permitted with appropriate license
- ≤10 MW: Simplified grid connection filing (2 months vs. 6 months)
- FCR, aFRR, mFRR market participation enabled

---

### 7. PORTUGAL

**Legal Basis:** Decree-Law 15/2022, DL 99/2024, Despacho 1859/2025

**Classification:**
- **Armazenamento autónomo** (autonomous storage): Direct connection to RESP (public grid)
- **Armazenamento co-localizado** (co-located storage): Combined with RES or UPAC

**The Legal Distinction:**
- **Autonomous storage:** Full grid import/export, requires production license (>1 MW) or prior registration (30 kW - 1 MW)
- **Co-located storage within UPAC (self-consumption):** Charges from co-located RES; grid export limited
- **Co-located storage with RES generation center:** Classification depends on whether the **maximum injection capacity** is attributed to the storage or the combined plant

**Grid Import Rule:**
- **Autonomous BESS:** Full grid charging rights
- **Co-located BESS:** Can charge from grid only if licensed separately from the RES plant, with its own metering and grid connection agreement
- Proximity rules: <2 km, or same substation, or voltage-dependent distances (4-20 km)
- ERSE Directive 3/2025: Restricted access agreements for constrained areas

---

### 8. AUSTRIA

**Legal Basis:** ElWG "Cheaper Electricity Act" (December 11, 2025) — first formal storage regulation

**Classification:**
Austria's brand-new ElWG (effective 2026) introduces:
- **Speicheranlage** (storage facility): Formally defined for the first time
- **System-friendly operation:** Grid fee exemption for storage that supports system balancing

**The Legal Distinction:**
- The ElWG implements EU Directive 2019/944 and for the first time formally regulates storage
- **Grid fee exemption** applies to BESS operating in a "system-friendly" manner (flexible grid access, peak shaving)
- Prior to ElWG: No formal distinction — storage was often classified under generation or consumption depending on activity

**Grid Import Rule:**
- **All storage facilities** recognized under ElWG can charge from the grid
- Grid fees exempted for system-friendly operation
- Environmental permits required for >10,000 kg hazardous substances
- 10-year operational requirement for subsidized installations

---

### 9. BELGIUM

**Legal Basis:** Federal Electricity Law, CREG Code of Conduct (April 2025 amendment)

**Classification:**
- **>25 MW:** Federal storage license required (Energy Minister + CREG opinion) — treated as standalone
- **≤25 MW:** Notification to DG Energy + CREG — can be standalone or co-located

**The Legal Distinction:**
The **25 MW threshold** determines the licensing regime, but not necessarily grid charging rights:
- **Flexible Grid Connection** (introduced April 2025): Enables "second-wave" BESS projects with grid import
- Energy ceiling parameters define curtailment limitations
- **No double tariffs** for active consumers (storage that both imports and exports)

**Grid Import Rule:**
- **All licensed BESS** (whether standalone or co-located) can charge from the grid
- Vlarem environmental regulations apply in Flanders: ≥10 kWh or >10 kW requires notification
- CRM (Capacity Remuneration Mechanism) provides additional revenue
- Vilvoorde: 200 MW/800 MWh (ENGIE) as reference project

---

### 10. NETHERLANDS

**Legal Basis:** Electricity Act 1998

**Classification:**
The Netherlands has **no specific storage definition** in law:
- Storage = consumption + generation (dual classification)
- Grid operators **prohibited** from owning/operating BESS (with exemptions)

**The Legal Distinction:**
- There is **no formal hybrid vs. standalone distinction** in Dutch law
- All BESS is treated as both consumer and generator
- The primary barrier is **economic (grid fees)**, not legal

**Grid Import Rule:**
- **All BESS can charge from the grid** — no legal prohibition
- **Major barrier:** Grid fees can be up to **80% of OPEX**
- **Non-Firm Agreements (NFA):** Up to **65% grid fee discount** (2024-2025 reform)
- 15% restricted charging periods under NFA
- PGS 37 safety guideline for lithium-ion under development

---

### 11. SLOVAKIA

**Legal Basis:** Energy Act (updated)

**Classification:**
- **Physical battery storage:** Independent electricity market participant
- **Virtual battery storage:** Accounting mechanism
- **Behind-the-meter:** Self-consumption only
- **Grid-connected:** Independent units with market access

**The Legal Distinction:**
- **Co-located ≤20% of generation capacity:** No separate license needed — treated as auxiliary
- **Co-located >20% or standalone:** Separate licensing — full grid access
- BESS formally reclassified from "consumer appliance" to "independent electricity market participant"

**Grid Import Rule:**
- **Behind-the-meter:** No grid charging; no distribution fees/tariffs
- **Grid-connected BESS:** Full grid import rights
- Grid connection fee refund available if regulatory conditions met

---

### 12. SLOVENIA

**Legal Basis:** Electricity Supply Act (ESA), Official Gazette 172/21

**Classification:**
- Storage defined as: *"deferring final electricity use to later time, conversion to storable energy form, subsequent reconversion"*
- TSO/DSO generally **cannot own/operate** storage (exceptions with Agency permission)

**The Legal Distinction:**
- **>1 MW:** Permission from Minister for Infrastructure — classified as independent storage
- **<1 MW:** General grid connection — classification less clear
- Historical legal gap: storage was often classified as generation
- Charging status uncertain — BESS may be treated as end users

**Grid Import Rule:**
- **Standalone BESS (>1 MW with ministerial permission):** Grid import assumed but legal clarity is limited
- Existing projects (12.8 MW Jesenice, 15 MW Kidričevo) operate on transmission network with full grid access
- No specific subsidies currently; future framework planned

---

### 13. LUXEMBOURG

**Legal Basis:** Electricity Law (following EU directives), Tariff Regulation ILR/E24/18

**Classification:**
- Follows **EU-level regulations** with limited country-specific framework
- No dedicated standalone vs. hybrid distinction in national law

**Grid Import Rule:**
- Grid access on non-discriminatory principles
- Storage follows EU Battery Regulation (2023/1542)
- Integrated with German electricity bloc
- National implementation for detailed storage provisions **still pending**

---

## COMPARATIVE MATRIX: Grid Import Rights Trigger

| Country | Legal Test for Grid Import Rights | Key Threshold | Wording / Mechanism |
|---------|-----------------------------------|---------------|---------------------|
| **Cyprus** | BESS discharge > RES installed capacity | **Capacity ratio** | Category C: "discharge capacity > RES capacity" |
| **Italy** | Separate metering / independent authorization | **Metering & authorization type** | Standalone = "impianto di accumulo autonomo" with own grid connection |
| **Germany** | No restriction — all BESS can grid-charge | **None (fiscal treatment only)** | §118(6) EnWG: grid fee exemption until 2029 |
| **Spain** | Post-RD 997/2025: no restriction | **None (since Nov 2025)** | Hybrid+storage no longer classified as consumers |
| **Greece** | Separate licensing + capacity allocation | **Licensing category** | Standalone = merchant BESS under Special Grid Connection Scheme |
| **Poland** | >10 MW license = independent storage | **10 MW** | URE license for >10 MW; below unclear |
| **Czech Rep.** | BESS > 20% of PV capacity | **20% of PV nameplate** | Co-located >20% needs separate license = grid import |
| **Portugal** | Separate license + metering | **Licensing & metering** | "Armazenamento autónomo" vs "co-localizado" |
| **Austria** | ElWG recognition as storage facility | **Registration under ElWG** | System-friendly = grid fee exempt |
| **Belgium** | Licensed storage (any size) | **License/notification** | No double tariffs for active consumers |
| **Netherlands** | No restriction — all BESS can grid-charge | **None (economic barrier: grid fees)** | NFA: up to 65% grid fee discount |
| **Slovakia** | Grid-connected + >20% of generation | **20% of generation capacity** | Behind-the-meter = no grid; grid-connected = yes |
| **Slovenia** | >1 MW ministerial permission | **1 MW** | Permission from Minister for Infrastructure |
| **Luxembourg** | EU standards (pending national framework) | **Pending** | Follows EU-level regulation |

---

## KEY LEGAL PATTERNS ACROSS EUROPE

### Pattern 1: Capacity Ratio Test (Cyprus, Czech Republic, Slovakia)
The legal distinction is based on the **ratio of BESS capacity to RES capacity**:
- **Cyprus:** BESS discharge > RES capacity → standalone (grid import)
- **Czech Republic:** BESS > 20% of PV nameplate → separate license → grid import
- **Slovakia:** BESS > 20% of generation capacity → separate license → grid import

### Pattern 2: Metering & Authorization Test (Italy, Portugal, Greece)
The distinction is based on **how the facility is metered and authorized**:
- **Italy:** Separate metering point + standalone authorization = grid import
- **Portugal:** Autonomous storage license + own grid connection = grid import
- **Greece:** Merchant BESS under Special Grid Connection Scheme = grid import

### Pattern 3: No Restriction / Fiscal Treatment Only (Germany, Spain, Netherlands, Belgium, Austria)
Grid charging is **legally unrestricted**; the framework manages it through economics:
- **Germany:** All BESS can grid-charge; managed through grid fees (exempt until 2029)
- **Spain:** Since RD 997/2025, hybrid PV+BESS can grid-charge without losing RES status
- **Netherlands:** All BESS can grid-charge; high grid fees are the practical barrier
- **Belgium:** All licensed BESS can grid-charge; no double tariffs
- **Austria:** ElWG recognizes all storage; grid fee exemption for system-friendly operation

### Pattern 4: Unclear / Fragmented (Poland, Slovenia, Luxembourg)
No clear legal threshold:
- **Poland:** >10 MW licensing implies standalone status but no explicit hybrid distinction
- **Slovenia:** >1 MW ministerial permission but charging status uncertain
- **Luxembourg:** Pending national implementation

---

## CYPRUS vs. EUROPE: STRATEGIC IMPLICATIONS

### Cyprus is More Restrictive Than Most EU Markets

| Factor | Cyprus | EU Average |
|--------|--------|------------|
| Grid charging for co-located BESS | **Prohibited** (Category B) | Permitted in most markets |
| Grid arbitrage (DAM participation) | **Not yet legislated** (Feb 2026) | Available in most markets |
| Standalone BESS grid import | Allowed (Category C) but no DAM access | Allowed with full market access |
| Classification trigger | Capacity ratio (BESS > RES) | Varies (metering, licensing, or none) |

### Key Disadvantages of Cyprus Framework
1. **No DAM arbitrage yet** — BESS revenue limited to curtailment recovery
2. **Category B restriction** — Most commercial PV parks with BESS are Category B (BESS ≤ RES) and **cannot charge from grid**
3. **Software limiting prohibited** — PCS nameplate must physically match, adding hardware cost
4. **50% discharge cap** — Category B BESS max discharge limited to 50% of RES installed capacity
5. **Isolated grid** — No interconnection means no cross-border arbitrage opportunity

### Key Advantages of Cyprus Framework
1. **Clear classification** — Three categories are unambiguous (unlike Poland, Slovenia)
2. **Building permit exemptions** — Κ.Δ.Π. 15/2026 and 17/2026 streamline co-located BESS deployment
3. **High curtailment = free charging** — 12.2% RES curtailment means Category B BESS has abundant zero-cost energy
4. **High evening peak prices** — €182.99/MWh average peak creates strong discharge revenue

### Expected Legislative Changes
- **Grid arbitrage legislation** is anticipated but not yet enacted (as of February 2026)
- CERA has approved 120 MW/400 MWh TSO-owned BESS (operational by June 2026)
- 7 private applicants with 151 MW/410 MWh preliminary connection terms
- EU Directive 2024/1711 grants Cyprus derogation from certain market requirements due to grid isolation

---

## RECOMMENDATIONS FOR SOLINVEST

1. **Current Cyprus projects:** Design as Category B (BESS ≤ RES capacity) for fastest deployment; revenue from curtailment recovery alone is profitable (€146,608-€222,844/yr per 20 MWh unit)

2. **Future-proof designs:** Ensure BESS can be reclassified to Category C when DAM legislation passes — this means designing connection infrastructure to support independent grid charging

3. **European expansion priorities** (by regulatory favorability for grid-charging BESS):
   - **Tier 1 (unrestricted):** Germany, Spain, Netherlands, Belgium, Austria
   - **Tier 2 (clear pathway):** Italy, Greece, Portugal, Czech Republic
   - **Tier 3 (developing):** Poland, Slovakia, Slovenia, Luxembourg

4. **Monitor Cyprus legislative timeline:** CERA has signaled intent to enable BESS market participation — when enacted, existing Category B installations could potentially be reclassified or supplemented with grid-charging capability

---

## THE EXACT CAPACITY RATIO QUESTION: When Does "PV Park" Become "BESS Park"?

### The Direct Answer

**Does the classification switch when BESS capacity exceeds PV capacity?** In most countries, **yes** — but the mechanism differs and the ratio is not always 1:1. Here is the precise answer per country:

| Country | Does BESS > PV = Reclassification? | Exact Ratio / Mechanism | Legal Citation |
|---------|:-----------------------------------:|--------------------------|----------------|
| **Cyprus** | **YES — at 1:1** | BESS discharge capacity > RES installed capacity → Category C | DSO Technical Guide 2025.1, Section 2.2-2.3 |
| **Czech Republic** | **YES — at 0.2:1 (20%)** | BESS > 20% of PV nameplate → separate license required | Lex OZE 3 Amendment (2024) |
| **Slovakia** | **YES — at 0.2:1 (20%)** | BESS > 20% of generation capacity → separate license | Energy Act (updated) |
| **Italy** | **Not ratio-based** | Reclassification based on metering point and authorization type, not capacity ratio | D.Lgs. 190/2024, Annex A/B/C |
| **Germany** | **No reclassification needed** | All BESS can grid-charge regardless of ratio. Dual-role treatment (consumer+generator) | EnWG §118(6), Solar Peak Act (Jan 2025) |
| **Spain** | **No reclassification needed** (post-Nov 2025) | Since RD 997/2025, hybrid PV+BESS can grid-charge at ANY ratio | RD 997/2025 (Nov 5, 2025) |
| **Greece** | **Not ratio-based** | Reclassification requires separate licensing under Special BESS Grid Connection Scheme | Law 5151/2024, MD March 2025 |
| **Portugal** | **Not ratio-based** | Reclassification requires separate "armazenamento autónomo" license and metering | DL 15/2022, Despacho 1859/2025 |
| **Austria** | **No reclassification needed** | All storage recognized under ElWG; no ratio test | ElWG (Dec 2025) |
| **Belgium** | **No reclassification needed** | All licensed BESS can grid-charge; no ratio test | Federal Electricity Law |
| **Netherlands** | **No reclassification needed** | All BESS can grid-charge; no ratio test | Electricity Act 1998 |
| **Poland** | **Unclear** | >10 MW licensing implies standalone; no explicit ratio | Energy Law Act, 2021 Amendment |
| **Slovenia** | **Unclear** | >1 MW ministerial permission; no ratio defined | ESA, OG 172/21 |
| **Luxembourg** | **Pending** | No national framework yet | — |

### Analysis: Cyprus Is an Outlier

Only **three countries** use a capacity ratio test: Cyprus, Czech Republic, and Slovakia. But there are critical differences:

**Czech Republic & Slovakia use a 20% threshold** — the BESS only needs to exceed 20% of PV capacity to be classified as independent storage with grid import rights. This is a low, developer-friendly bar. A 10 MW PV park only needs a 2 MW BESS to qualify.

**Cyprus uses a 100%+ threshold** — the BESS discharge capacity must *exceed* the entire RES installed capacity. A 10 MW PV park needs a BESS with discharge capacity >10 MW to qualify as Category C. This is the **most restrictive ratio in Europe**.

**Five countries (Germany, Spain, Netherlands, Belgium, Austria)** have **no ratio test at all** — any BESS, regardless of its size relative to PV, can charge from the grid. The question "when does PV become BESS" is simply not relevant in these markets.

**Four countries (Italy, Greece, Portugal + partially Poland)** use a **licensing/metering test** — it's not about the capacity ratio, it's about whether you apply for a separate storage license and install separate metering. You can have a 1 MW BESS on a 100 MW PV park and still get grid import rights if you license it separately.

### The Cyprus "50% Discharge Cap" — Unique in Europe

Beyond the 1:1 ratio requirement, Cyprus imposes a further restriction found **nowhere else in the EU**:

> **Category B: Max Discharge Capacity ≤ 50% of RES installed capacity**

This means even within the allowed Category B framework:
- A **10 MW PV park** can only install BESS with max discharge of **5 MW**
- The BESS power rating can be up to 10 MW (≤ RES capacity), but it can only **discharge at half**
- This halves the revenue potential compared to what the same hardware could earn

**No other European country has this restriction.** In Germany, Spain, Italy, Greece, etc., a co-located BESS can discharge at its full rated power regardless of the PV capacity.

### Exact Legal Wording of the 50% Rule — Source & Legislative Hierarchy

#### Where It Comes From

The 50% discharge cap originates from the **EAC DSO Technical Guide for Storage — Edition 2025.1** (Τεχνικές Οδηγίες για τη σύνδεση και την παράλληλη λειτουργία ΣΑΗΕ με το Σύστημα Διανομής). This is **not a law passed by Parliament**. It is a technical guide authored by EAC (the DSO), which derives its authority from the Distribution Rules (Κανόνες Διανομής).

#### Verbatim Greek Text (Category B, Section "Μέγιστη ονομαστική ισχύς", page 12-13):

> **«Η Μέγιστη Ικανότητα Αποφόρτισης Εγκατάστασης Αποθήκευσης Ηλεκτρισμού δεν επιτρέπεται να είναι μεγαλύτερη από το 50% της εγκατεστημένης ισχύς του Συστήματος ΑΠΕ»**
>
> *Translation: "The Maximum Discharge Capacity of the Electricity Storage Facility is not permitted to be greater than 50% of the installed capacity of the RES System"*

#### The Full Category B Definition (verbatim Greek):

> **«Μονάδα ΑΠΕ με ενσωματωμένη αποθήκευση ηλεκτρισμού είναι μία Μονάδα ΑΠΕ που περιλαμβάνει σύστημα αποθήκευσης ηλεκτρισμού και η μέγιστη ικανότητα αποφόρτισης του συστήματος αποθήκευσης, είναι μικρότερη ή ίση της Ικανότητας Παραγωγής της Μονάδας ΑΠΕ. Η Μονάδα ΑΠΕ με Ενσωματωμένη Αποθήκευση Ηλεκτρισμού δεν δύναται να απορροφά Ενέργεια από το δίκτυο για σκοπούς φόρτισης του συστήματος αποθήκευσης.»**
>
> *Translation: "A RES Unit with integrated electricity storage is a RES Unit that includes an electricity storage system and the maximum discharge capacity of the storage system is less than or equal to the Generation Capacity of the RES Unit. The RES Unit with Integrated Electricity Storage is not permitted to absorb Energy from the grid for purposes of charging the storage system."*

#### The Four Category B Rules (verbatim):

| # | Greek Original | English Translation |
|---|---|---|
| 1 | «Η μέγιστη ονομαστική ισχύς του ΣΑΗΕ δεν επιτρέπεται να είναι μεγαλύτερη από την εγκατεστημένη ισχύ του Συστήματος ΑΠΕ» | Max BESS rated power must not exceed RES installed capacity |
| 2 | **«Η Μέγιστη Ικανότητα Αποφόρτισης δεν επιτρέπεται να είναι μεγαλύτερη από το 50% της εγκατεστημένης ισχύς του Συστήματος ΑΠΕ»** | **Max Discharge Capacity must not exceed 50% of RES installed capacity** |
| 3 | «Το άθροισμα της παραγόμενης ενεργού ισχύος από την μονάδα από ΑΠΕ και αυτής του ενσωματωμένου ΣΑΗΕ, δεν επιτρέπεται σε καμία περίπτωση, να υπερβαίνει τη συνολική εγκατεστημένη ισχύ του Συστήματος ΑΠΕ» | Combined output of RES + BESS must not, under any circumstance, exceed the total RES installed capacity |
| 4 | «Δεν υπάρχει περιορισμός στη χωρητικότητα του ΣΑΗΕ» | There is no restriction on the storage capacity (MWh) of the BESS |

#### The Charging Restriction (verbatim):

> **«Κατά την κανονική λειτουργία του Συστήματος ΑΠΕ και του ΣΑΗΕ, όπως ορίζεται από τους Κανόνες Διανομής, το ΣΑΗΕ πρέπει να φορτίζει από ενέργεια η οποία προέρχεται αποκλειστικά από το Σύστημα ΑΠΕ.»**
>
> *Translation: "During normal operation of the RES System and the BESS, as defined by the Distribution Rules, the BESS must charge from energy which originates exclusively from the RES System."*

### Is This Overridden by Newer Laws?

**No.** Here is the legislative hierarchy and what each newer law addresses:

| Law / Regulation | Date | What It Covers | Does It Address the 50% Cap? |
|---|---|---|---|
| **Law N.130(I)/2021** | 2021 | Electricity Market Regulation Act — establishes CERA licensing, market structure | **No.** Enables storage licensing but does not define technical capacity limits |
| **Law N.180(I)/2025** | 2025 | Road and Building Regulations — enables planning permit exemptions | **No.** Covers building/planning permits only, not grid connection technical rules |
| **Law N.181(I)/2025** | 2025 | Amendment to Road and Building Regulations | **No.** Same scope — permits and construction, not grid rules |
| **Κ.Δ.Π. 15/2026** | January 16, 2026 | Special Development Order — BESS within RES stations exempt from building permits | **No.** Repeats «Ονομαστική ισχύς BESS ≤ ισχύς ΑΠΕ» (Condition 4) but does not address the 50% discharge cap at all |
| **Κ.Δ.Π. 17/2026** | January 16, 2026 | Fire and environmental conditions for exempt BESS | **No.** Safety requirements only |
| **DSO Technical Guide 2025.1** | July 2025 (DRAFT) | Grid connection technical requirements — **this is the source** | **YES — this IS the document containing the 50% rule** |

#### Critical Observation: The 50% Rule Sits in a Technical Guide, Not in Law

The legislative hierarchy is:

```
LAW (Parliament)
  └── N.130(I)/2021 — Electricity Market Act
       └── Κανόνες Διανομής (Distribution Rules) — approved by CERA
            └── DSO Technical Guide for Storage 2025.1 — authored by EAC ← HERE
                 └── "50% discharge cap" rule
```

The 50% cap is NOT in any law passed by the Cyprus Parliament. It is NOT in the Distribution Rules approved by CERA. It is in a **Technical Guide authored by EAC (the DSO)** — the same entity that owns TSOC and operates the conventional generation fleet that competes with private BESS during peak hours.

This is significant because:
1. **Κ.Δ.Π. 15/2026** (the newest regulation) does not reference or override the 50% cap — it only deals with building permits
2. The 50% rule lives in a DSO technical document that **can be amended by EAC without parliamentary approval**
3. CERA could direct EAC to remove it, but has not done so
4. No EU directive, regulation, or network code mandates or suggests a 50% discharge cap
5. The rule could theoretically be challenged under EU Directive 2019/944 as an "undue barrier" (Recital 62) that restricts market participation for storage

#### Contrast with Category C (verbatim Greek):

> **«Εγκατάσταση Αποθήκευσης Ηλεκτρισμού είναι η Εγκατάσταση Αποθήκευσης Ηλεκτρισμού που δύναται να περιλαμβάνει μονάδα παραγωγής από ΑΠΕ και η Μέγιστη Ικανότητα Αποφόρτισης της Εγκατάστασης Αποθήκευσης Ηλεκτρισμού είναι μεγαλύτερη της Ικανότητας Παραγωγής της μονάδας παραγωγής από ΑΠΕ.»**
>
> *Translation: "An Electricity Storage Facility is a Storage Facility that may include a RES generation unit and the Maximum Discharge Capacity of the Storage Facility is greater than the Generation Capacity of the RES unit."*

> **«Κατά την κανονική λειτουργία του ΣΑΗΕ, όπως ορίζεται από τους Κανόνες Διανομής, το ΣΑΗΕ πρέπει να φορτίζει από ενέργεια η από το δίκτυο ή/και ενέργεια από το Σύστημα ΑΠΕ»**
>
> *Translation: "During normal operation of the BESS, as defined by the Distribution Rules, the BESS must charge from energy from the grid and/or energy from the RES System"*

Notice: Category C has **no 50% discharge cap**, **no combined output cap**, and **can charge from the grid**. All the restrictions exist only in Category B — the category where most private PV+BESS installations fall.

### Market Impact: How the 50% Cap Kills Peak Revenue on a 4-Hour System

The 50% discharge cap is not just a technical constraint — it directly prevents a Category B BESS from participating in the most profitable hours of the Cyprus electricity market. Here is the proof, using actual TSOC DAM data.

#### Cyprus Wholesale Market Pricing (Actual — TSOC DAM, Oct 2025 – Feb 2026)

*Source: 134 TSOC DAM files, 6,432 half-hourly records — complete dataset since market launch*

| Time Window | Average MCP (€/MWh) | Character |
|---|---:|---|
| **Midday Solar (10:00-14:00)** | **€101.13** | Deep solar trough — charging window |
| **Solar Hours (06:00-17:00)** | **€140.88** | Below average |
| **Overall Average** | **€158.19** | Baseline |
| **Morning (06:00-09:00)** | **€165.35** | Above average |
| **Off-Peak Night (22:00-05:00)** | **€171.49** | Demand-driven floor |
| **Evening Peak (17:00-21:00)** | **€182.99** | Highest sustained band |
| **Evening Core (17:00-20:00)** | **€183.94** | Premium peak |

#### Hourly Price Profile — Where the Money Is

| Hour | €/MWh | | Hour | €/MWh | | Hour | €/MWh | | Hour | €/MWh |
|:----:|------:|-|:----:|------:|-|:----:|------:|-|:----:|------:|
| 00:00 | €173 | | 06:00 | €174 | | 12:00 | **€77** | | 18:00 | **€185** |
| 01:00 | €170 | | 07:00 | €174 | | 13:00 | €105 | | 19:00 | **€186** |
| 02:00 | €169 | | 08:00 | €167 | | 14:00 | €142 | | 20:00 | **€183** |
| 03:00 | €169 | | 09:00 | €146 | | 15:00 | €167 | | 21:00 | €179 |
| 04:00 | €169 | | 10:00 | €102 | | 16:00 | €175 | | 22:00 | €176 |
| 05:00 | €171 | | 11:00 | €80 | | 17:00 | €181 | | 23:00 | €174 |

**Daily low:** 12:00 at €77/MWh | **Daily high:** 19:00 at €186/MWh | **Spread: €109/MWh**

#### The 50% Cap on a 4-Hour System — Worked Example

Take a typical **10 MW PV + 10 MW / 40 MWh BESS** (4-hour duration, Category B):

**Without the 50% cap** (how it works in Germany, Spain, Italy, Greece, etc.):

| Parameter | Value |
|---|---|
| BESS Rated Power | 10 MW |
| Discharge Power (no cap) | **10 MW** |
| Duration at full power | 4 hours |
| Optimal discharge window | **17:00 → 21:00** (the 4 peak hours) |
| Average MCP during 17:00-21:00 | **€182.99/MWh** |
| Energy sold (10 MW × 4h) | **40 MWh** |
| **Gross revenue per cycle** | **€7,320** |

**With the Cyprus 50% cap** (Category B reality):

| Parameter | Value |
|---|---|
| BESS Rated Power | 10 MW |
| Max Discharge Power (50% of RES) | **5 MW** |
| Duration at 5 MW to empty 40 MWh | **8 hours** |
| Forced discharge window | **13:00 → 21:00** (must start 4 hours early) |
| Average MCP during 13:00-21:00 | **€158.25/MWh** |
| Energy sold (5 MW × 8h) | 40 MWh |
| **Gross revenue per cycle** | **€6,330** |

#### Revenue Lost Per Cycle: €990 (13.5%)

But the real damage is **worse than the headline number** because of *when* the energy is forced to sell:

| Discharge Hour | MCP (€/MWh) | Without Cap (10 MW) | With 50% Cap (5 MW) |
|:-:|--:|--:|--:|
| 13:00 | €105 | — | 5 MWh × €105 = **€525** |
| 14:00 | €142 | — | 5 MWh × €142 = **€710** |
| 15:00 | €167 | — | 5 MWh × €167 = **€835** |
| 16:00 | €175 | — | 5 MWh × €175 = **€875** |
| 17:00 | €181 | 10 MWh × €181 = **€1,810** | 5 MWh × €181 = **€905** |
| 18:00 | €185 | 10 MWh × €185 = **€1,850** | 5 MWh × €185 = **€925** |
| 19:00 | €186 | 10 MWh × €186 = **€1,860** | 5 MWh × €186 = **€930** |
| 20:00 | €183 | 10 MWh × €183 = **€1,830** | 5 MWh × €183 = **€915** |
| | | **€7,350** | **€6,620** |

*Note: Slight variance from average-based calculation due to rounding in hourly MCPs*

#### What This Means in Practice

1. **The cap forces early discharge into low-price hours.** A 4-hour system that could concentrate all output into 17:00-21:00 (average €183/MWh) is instead forced to start discharging at 13:00 (€105/MWh) — selling into the solar trough when prices are 43% lower.

2. **The cap destroys the time-shift value proposition.** The entire point of BESS is to store cheap midday solar and sell into expensive evening peak. The 50% cap forces half the discharge into the very hours the BESS is supposed to be storing.

3. **Annual revenue impact is substantial.** At ~€730-990 lost per cycle over ~330 cycles/year, the 50% cap costs roughly **€240,000–330,000/year** on a 10 MW system. Over a 15-year asset life, this is **€3.6–5.0 million** in foregone revenue — on a single installation.

4. **The cap disproportionately hurts 4-hour systems.** A 2-hour system (20 MWh) at 5 MW would discharge in 4 hours and could still target 17:00-21:00. A 4-hour system (40 MWh) at 5 MW needs 8 hours — impossible to fit within the peak window. The most economically efficient duration class (4h) is penalised the most.

5. **No grid stability justification exists.** The combined output cap (Rule 3: RES + BESS ≤ RES capacity) already prevents grid overload at the point of connection. The 50% discharge cap is an *additional* restriction on top of an already-sufficient protection. No EU grid code or ENTSO-E guideline requires or recommends it.

6. **Who benefits?** EAC's conventional thermal plants sell into the 17:00-21:00 peak window at €183/MWh. Every MWh of BESS discharge pushed from this window into cheaper hours is a MWh that conventional generation retains at peak pricing.

---

## THE MUST-RUN PROBLEM: 210-250 MW Inertia Floor, CO₂, and Curtailment

### The Core Issue

Cyprus's Transmission System Operator (TSOC) mandates a **Minimum Stable Generation Level (MSGL) of 210 MW** of conventional thermal generation running at all times — but this is the regulatory floor only. In practice, TSOC **frequently raises the must-run level to ~250 MW or higher** in anticipation of evening peak demand, keeping additional units online and spinning. The justification is that the grid needs **synchronous inertia** from spinning turbines for frequency stability.

This ~250 MW operational floor of constantly-running fossil fuel generation:
- **Forces solar curtailment** — when demand is low and solar is high, the ~250 MW must-run displaces solar that could otherwise serve load
- **Emits CO₂ continuously** — even when zero-carbon alternatives exist
- **Increases electricity costs** — must-run units sell through the Forward Market at ~€190/MWh (socialized across all consumers)
- **Blocks BESS from providing the same service** — despite BESS with grid-forming inverters being technically capable

### The Numbers: Curtailment Crisis Caused by Must-Run

*Sources: CyprusGrid, PV Magazine (Jan 2026), TSOC published data*

| Year | Curtailed RES Energy | Curtailment Rate | CO₂ from Curtailment (wasted solar replaced by fossil) | ETS Cost of Curtailment |
|:----:|---------------------:|:----------------:|:------------------------------------------------------:|------------------------:|
| 2023 | ~90 GWh | ~15% | ~60,000 tonnes | ~€5M |
| 2024 | **167 GWh** | **29%** | ~112,000 tonnes | ~€9M |
| 2025 | **306 GWh** | **47%** | **>200,000 tonnes** | **~€15M** |

**But curtailment is only a fraction of the total CO₂ problem.** The full picture:

| Metric | 2024 | 2025 (est.) |
|---|---:|---:|
| **Total electricity sector CO₂** | 3.28 million tonnes | ~3.55 million tonnes (+8.3% Q1 YoY) |
| **Total ETS allowance cost** | **~€230 million** | **€250-350 million** |
| **Of which, attributable to curtailment** | ~€9M | ~€15M |
| **Cumulative ETS costs (2018-2025)** | | **~€1.28 billion** |

*Sources: Kathimerini Cyprus (Oct 2025): €203.8M through Oct 18, 2025; 2024 full-year: 3.28M tonnes, ~€230M; ETS prices: €61-84/tonne in 2025*

The €15M from curtailment alone is significant, but the real scandal is the **€250-350 million total annual ETS bill** — driven overwhelmingly by the must-run thermal fleet. This entire cost is passed directly to consumers through electricity bills, contributing to Cyprus having among the **highest electricity prices in Europe**.

The trend is **accelerating catastrophically**: curtailment nearly doubled from 2024 to 2025 (+83%), wasting energy equivalent to the annual needs of **51,000 households**. Meanwhile, total emissions actually **increased** 8.3% in Q1 2025 — the third-largest jump in the entire EU.

> *"Unless Cyprus invests seriously in flexibility and network capability, the country's energy transition cannot work."*
> — Andreas Procopiou, founder of CyprusGrid (PV Magazine, Jan 2026)

### CO₂ Intensity: CyprusGrid Data

From the CyprusGrid CO₂ intensity profiles (2018-2026 data):

| Time of Day | Approx. CO₂ Intensity | Explanation |
|---|---:|---|
| **Night (00:00-06:00)** | ~700 gCO₂/kWh | 100% conventional generation |
| **Morning (06:00-09:00)** | 600-700 gCO₂/kWh | Conventional + early solar ramp |
| **Midday Solar (10:00-14:00)** | 300-400 gCO₂/kWh | Solar displaces some conventional, but **must-run floor prevents full displacement** |
| **Evening Peak (17:00-21:00)** | 650-700 gCO₂/kWh | Solar gone, back to near-100% conventional |

**Key observation from the CyprusGrid charts:** Even at midday peak solar, CO₂ intensity never drops below ~300 gCO₂/kWh because the **210-250 MW must-run floor prevents conventional generation from ramping down further**. In a system without the must-run constraint, midday CO₂ intensity could fall to near-zero during high-solar periods.

**Year-over-year trend (visible in chart):** The 2025-2026 line (green) shows a deeper midday trough than earlier years, confirming rising solar penetration — but the trough is **flattening at the ~300 gCO₂/kWh floor** because the must-run constraint acts as an emissions floor.

### Cyprus vs EU Average

| Metric | Cyprus | EU Average | Worst in EU? |
|---|---:|---:|---|
| Grid carbon intensity | **493 gCO₂/kWh** | ~230 gCO₂/kWh | Among the **highest** in EU |
| Fossil fuel share | **76%** | ~33% | Yes — highest reliance on oil |
| Solar curtailment rate | **47%** (2025) | <5% typical | **By far the worst** |
| Grid-scale BESS deployed | **0 MW** | Thousands of MW | Yes — **only EU country with zero** |
| RES contribution per MW installed | Declining annually | Growing | **Inverted trend** |

### The Inertia Argument: Valid Problem, Wrong Solution

The grid stability concern is real — Cyprus is an **isolated island system** with no interconnections and therefore no external frequency support. When a large generator trips, the system frequency drops and must be caught by spinning reserves. Synchronous inertia from heavy rotating turbines naturally resists frequency change.

**However:** The solution to this problem is not to permanently burn fossil fuels. Multiple EU countries — including island and isolated systems — have solved this with BESS.

### How Other EU Countries Provide Grid Inertia With BESS

#### Germany — Dedicated Inertia Service Market (Launched January 2026)

Germany's four TSOs (50Hertz, Amprion, TenneT, TransnetBW) launched a **dedicated inertia services market** in January 2026:

| Feature | Detail |
|---|---|
| **Regulatory basis** | BNetzA ruling BK6-23-010 (April 2025) |
| **Market launch** | January 22, 2026 |
| **Contract period** | 2-10 years |
| **Product types** | 4 tiers: 30% to 90% asset availability |
| **Eligible assets** | Grid-forming BESS, synchronous condensers, flywheels |
| **Revenue for BESS** | **€8,000-17,000/MW/year** additional revenue |
| **CapEx premium** | Grid-forming inverters cost only **~5% more** than standard |
| **Projected need** | ~30 GW of inertia-capable capacity by 2027, ~72 GW by 2037 |

Germany's TSOs **pay BESS operators** to provide the exact service that Cyprus forces thermal plants to provide for free (at consumer expense).

#### Ireland — DS3 System Services (Operational Since 2016)

Ireland is the **most directly comparable** system to Cyprus: an island with limited interconnection and high renewable penetration.

| Feature | Detail |
|---|---|
| **Programme** | DS3 (Delivering a Secure, Sustainable Electricity System) |
| **Operator** | EirGrid / SONI |
| **Services procured** | Synchronous inertial response, fast frequency response (FFR), dynamic reactive power |
| **BESS participation** | Yes — batteries compete directly with thermal units for stability contracts |
| **Contract mechanism** | Volume-capped and uncapped procurement gates with competitive bidding |
| **Result** | Ireland reduced must-run thermal from ~50% to ~20% of system capacity |
| **SNSP limit** | System Non-Synchronous Penetration increased from 50% → 75% (targeting higher) |

Ireland proved that an **isolated island grid can safely reduce must-run thermal by 60%** by allowing BESS and other non-synchronous sources to provide inertia.

#### UK — Enhanced Frequency Response & Stability Pathfinder

| Feature | Detail |
|---|---|
| **Programme** | National Grid ESO Stability Pathfinder |
| **BESS role** | Grid-forming BESS provides inertia, short-circuit level, and voltage support |
| **Contracts** | Long-term (up to 15 years) stability contracts |
| **Result** | 12.5 GW+ of BESS deployed, significantly reducing fossil must-run |

#### Italy — Black Start from BESS

| Feature | Detail |
|---|---|
| **Requirement** | Large BESS (>20 MW) must include black start capability |
| **Approach** | Grid-forming capability is a **connection condition**, not an optional service |
| **Result** | BESS integrated into system restoration and stability framework |

#### EU-Wide — ENTSO-E Grid-Forming Standards

ENTSO-E (39 TSOs, 35 countries) has published **harmonised technical requirements for grid-forming capability** of power park modules. This means:
- Grid-forming inverter technology is **standardised across the EU**
- Every TSO is expected to integrate non-synchronous inertia sources
- The technology is mature, proven, and commercially available

### What Cyprus Could Do — But Doesn't

| Solution | How It Works | Estimated Impact |
|---|---|---|
| **Allow BESS to provide inertia** | Grid-forming BESS responds to frequency deviations in <100ms (faster than thermal) | Could replace 50-100 MW of must-run thermal |
| **Create an inertia services market** (as Germany did) | Pay BESS operators €8-17k/MW/year for grid-forming services | Private capital provides inertia instead of consumer-funded fossil generation |
| **Raise the SNSP limit** (as Ireland did) | Allow more non-synchronous generation before requiring thermal backup | Could increase from current ~50% to 70-75%, dramatically reducing curtailment |
| **Mandate grid-forming for new BESS** (as Italy did) | Require grid-forming inverters as a connection condition | Builds inertia capacity automatically as BESS fleet grows |

### Instead, Cyprus Does This:

1. **TSOC mandates 210-250 MW must-run thermal** at all times — even at midday when solar could serve 100% of demand
2. **EAC operates the must-run units** — and gets paid ~€190/MWh through the Forward Market for doing so
3. **Solar is curtailed** to make room for must-run — 306 GWh wasted in 2025 (47% of all distributed RES)
4. **BESS is not permitted to provide inertia** — no service agreement, no market, no procurement
5. **TSOC's own 120 MW BESS** (under development) may eventually provide inertia — but only for TSOC, not private operators
6. **Cyprus's total ETS bill** exceeds **€250-350M/year** (€230M in 2024, €204M through Oct 2025 alone) — driven by the must-run thermal fleet and passed directly to consumers. Of this, ~€15M is specifically attributable to curtailment (replacing 306 GWh of wasted solar with fossil)

### The Circular Trap

```
Must-run thermal (210-250 MW)
    → Displaces solar during midday
        → Solar is curtailed (47% in 2025)
            → Curtailed solar can't charge BESS
                → BESS can't provide inertia (no market exists)
                    → TSOC says it needs must-run for inertia
                        → Must-run thermal continues...
```

This is a self-reinforcing loop that:
- **Locks in fossil generation** at consumer expense (~€190/MWh must-run cost, socialized)
- **Wastes clean energy** (306 GWh in 2025 — enough for 51,000 homes)
- **Drives a €250-350M/year ETS bill** (total electricity sector CO₂ costs, of which curtailment alone adds ~€15M)
- **Blocks private BESS** from earning inertia revenue (unlike Germany, Ireland, UK)
- **Benefits EAC exclusively** — the operator of both the must-run thermal plants and the DSO
- **Cumulative ETS damage:** ~€1.28 billion spent on carbon allowances from 2018-2025

### Cyprus's EU Climate Obligations

| Obligation | Target | Current Status |
|---|---|---|
| **ETS sector reduction** | -24.9% vs 2005 by 2030 | -14.9% achieved (2023) — **behind schedule** |
| **Overall GHG reduction** | -30% vs 2005 by 2030 | -5.6% achieved — **significantly behind** |
| **Net zero** | By 2050 | No pathway visible with current policies |
| **EU Commission assessment** | | "Progress toward climate neutrality appears **insufficient**" |

The 210-250 MW must-run + BESS exclusion from inertia services directly undermines these obligations. Every MW of must-run thermal that could be replaced by grid-forming BESS would:
- Reduce CO₂ emissions by ~4,000-6,000 tonnes/year per MW replaced
- Reduce ETS costs by ~€300,000-450,000/year per MW replaced
- Free grid capacity for solar, reducing curtailment
- Create private-sector revenue and jobs (inertia service contracts)

### Summary: The Inertia Excuse

| Question | Cyprus | Germany | Ireland | UK |
|---|---|---|---|---|
| Must-run thermal for inertia? | **210-250 MW** (210 regulatory, ~250 operational) | Phasing out — replaced by BESS market | Reduced from ~50% to ~20% | Replaced by Stability Pathfinder |
| Can BESS provide inertia? | **No mechanism exists** | Yes — €8-17k/MW/yr contracts since Jan 2026 | Yes — DS3 contracts since 2016 | Yes — Pathfinder since 2020 |
| Grid-forming BESS accepted? | **Not recognised** | Standard market product | Integrated into stability programme | Connection requirement for large BESS |
| Who provides inertia? | **EAC thermal only** | Any certified provider | Any DS3 provider | Any Pathfinder contract holder |
| CO₂ consequence | 3.55M t/yr total; >200k t/yr from curtailment alone | Declining | Declining | Declining |
| Total ETS cost | **€250-350M/year** (€1.28B cumulative 2018-2025) | Lower and falling | Lower and falling | Lower and falling |
| Who pays? | **Consumers (socialized)** | Consumers (competitive procurement — lower cost) | Consumers (competitive) | Consumers (competitive) |
| Who benefits? | **EAC** | Multiple market participants | Multiple providers | Multiple providers |

---

## EXACT LEGAL WORDING: EU Directive vs Cyprus EAC Documents

This section places the verbatim text of EU Directive 2019/944 alongside the verbatim text from Cyprus EAC/CERA documents, highlighting every point of divergence.

---

### A. The Definition of Energy Storage

**EU Directive 2019/944 — Article 2(59):**

> *"'energy storage' means, in the electricity system, deferring the final use of electricity to a moment later than when it was generated, or the conversion of electrical energy into a form of energy which can be stored, the storing of such energy, and the subsequent reconversion of such energy into electrical energy or use as another energy carrier"*

**EU Directive 2019/944 — Article 2(60):**

> *"'energy storage facility' means, in the electricity system, a facility where energy storage occurs."*

**Cyprus EAC DSO Technical Guide 2025.1 — Section 2 (Categories):**

The Cyprus framework does NOT use the EU's single, technology-neutral definition. Instead, it splits storage into three categories with **different rights per category**:

> **Category A**: *"BESS must not exchange energy with grid"* — Grid Exchange: **NOT ALLOWED**
>
> **Category B**: *"Charging Source: RES only — Cannot charge from grid"* — Grid Discharge: ALLOWED per market dispatch
>
> **Category C**: *"Can charge from grid and discharge to grid"* — Full grid exchange ALLOWED

| | EU Directive 2019/944 | Cyprus EAC DSO Guide 2025.1 |
|---|---|---|
| **Definition** | Single definition: all storage is equal | Three tiered categories with different rights |
| **Market access** | All storage has the right to participate in all markets (Art. 2(9)) | Only Category C has full market access |
| **Grid charging** | No restriction on charging source in the definition | Category A & B: "Cannot charge from grid" |
| **Charging source** | Not specified — storage is technology-neutral | Category B: "RES only" (explicit restriction) |

**DIVERGENCE**: The EU directive defines storage as a **single category** with equal rights. Cyprus creates a **three-tier system** where most commercial installations (Category B) have fewer rights than the directive envisions.

---

### B. Storage as a Market Participant

**EU Directive 2019/944 — Article 2(57):**

> *"'electricity undertaking' means a natural or legal person who carries out at least one of the following functions: generation, transmission, distribution, aggregation, demand response, **energy storage**, supply or purchase of electricity"*

**EU Directive 2019/944 — Article 2(9):**

> *"'electricity markets' means markets for electricity, including over-the-counter markets and electricity exchanges, markets for the trading of energy, capacity, balancing and ancillary services **in all timeframes**, including forward, day-ahead and intraday markets"*

**Cyprus — Law N.130(I)/2021, Article 26(m) & Market Rules:**

> *"Installing and/or operating an electricity storage facility requires a CERA license"*
>
> **Current status (February 2026):** *"BESS cannot buy from the DAM"* — grid arbitrage legislation has NOT been passed.

| | EU Directive 2019/944 | Cyprus Law N.130(I)/2021 + Market Rules |
|---|---|---|
| **Storage as undertaking** | Storage is listed equally alongside generation, supply, etc. (Art. 2(57)) | Storage requires CERA license (Art. 26(m)) — but market access not granted |
| **Market participation** | All electricity markets "in all timeframes" including "day-ahead" (Art. 2(9)) | BESS excluded from DAM as buyer. No legislation enabling purchase. |
| **Active customer** | Can "store electricity" and "participate in flexibility" (Art. 2(8)) | Category A/B BESS cannot participate in grid markets |

**DIVERGENCE**: The EU directive grants storage the **same status as any electricity undertaking** with access to all markets. Cyprus licenses storage operators but then blocks them from the DAM — creating a license-without-access paradox.

---

### C. DSO/TSO Ownership of Storage

**EU Directive 2019/944 — Article 36(1) (DSO):**

> *"Distribution system operators **shall not** own, develop, manage or operate energy storage facilities."*

**Article 36(2) — Derogation conditions (all must be met):**

> *(a) "other parties, following an **open, transparent and non-discriminatory tendering procedure** that is subject to review and approval by the regulatory authority, **have not been awarded** a right to own, develop, manage or operate such facilities, or **could not deliver** those services at a reasonable cost and in a timely manner"*
>
> *(b) "such facilities are necessary for the distribution system operators to fulfil their obligations… for the efficient, reliable and secure operation of the distribution system and **the facilities are not used to buy or sell electricity in the electricity markets**"*
>
> *(c) "the regulatory authority has assessed the necessity of such a derogation and has carried out an assessment of the tendering procedure"*

**EU Directive 2019/944 — Article 54(1) (TSO):**

> *"Transmission system operators **shall not** own, develop, manage or operate energy storage facilities."*

**Article 54(2) — Identical derogation conditions, plus:**

> *(b) "such facilities or non-frequency ancillary services are necessary for the transmission system operators to fulfil their obligations… and **they are not used to buy or sell electricity in the electricity markets**"*

**Article 54(3):**

> *"The decision to grant a derogation **shall be notified to the Commission and ACER** together with relevant information about the request and the reasons for granting the derogation."*

**Cyprus — CERA Decision (June 2025) + TSOC BESS Tender:**

| EU Requirement (Art. 36/54) | Cyprus Implementation | Compliance |
|---|---|---|
| TSO/DSO "shall not own" storage | TSOC (owned by EAC) approved for 120 MW/400 MWh | Derogation obtained |
| "Open, transparent, non-discriminatory tendering" (Art. 54(2)(a)) | EMA filed complaint that tender favors TSOC; placed at EAC substations | **CONTESTED** — EMA complaint to European Commission |
| "Have not been awarded" / "could not deliver" (Art. 54(2)(a)) | 33 private companies hold BESS licenses (>1,000 MW). 7 received connection terms (151 MW). | **QUESTIONABLE** — private capacity existed |
| Storage "not used to buy or sell electricity in the electricity markets" (Art. 54(2)(b)) | TSOC BESS expected to participate in dispatch/market | **POTENTIAL VIOLATION** if TSOC trades in DAM |
| "Notified to the Commission and ACER" (Art. 54(3)) | Derogation obtained from EC; ACER issued **written warning** | Formally notified; ACER objected |
| "Public consultation every 5 years" (Art. 54(4)) | No public consultation on phase-out conducted | **NOT YET DUE** (new facility) |

**DIVERGENCE**: While Cyprus obtained a formal EC derogation, the implementation raises questions under Article 54(2)(a) — 33 licensed private operators existed, contradicting the "could not deliver" condition. ACER's warning is significant but not legally binding.

---

### D. The 50% Discharge Cap — No EU Basis

**EU Directive 2019/944 — No article restricts discharge capacity relative to generation capacity.**

**EU Regulation 2019/943 (Electricity Regulation) — Article 3 (Principles):**

> *"Member States, regulatory authorities, transmission system operators, distribution system operators, market operators and delegated operators shall ensure that electricity markets are operated in accordance with the following principles:*
> *(a) prices shall be formed on the basis of demand and supply;*
> ...
> *(h) **barriers to cross-border electricity flows and to cross-border transactions** in electricity markets and related services markets **shall be progressively removed**"*

**Cyprus EAC DSO Technical Guide 2025.1 — Section 2.2 (Category B):**

> *"Max Discharge Capacity: **≤ 50% of RES installed capacity**"*

| EU Source | Provision | Cyprus EAC Rule |
|---|---|---|
| Directive 2019/944 | No discharge cap relative to generation | **≤ 50%** of RES installed capacity |
| Regulation 2019/943, Art. 3 | Barriers "shall be progressively removed" | 50% cap **creates** a barrier |
| ENTSO-E Network Codes | No discharge restriction relative to co-located generation | **≤ 50%** — unique to Cyprus |
| EU Commission Recommendation C/2023/1729 | "Remove barriers to storage" | 50% cap is a barrier |

**DIVERGENCE**: The 50% discharge cap has **zero basis in EU law**. No EU regulation, directive, network code, or recommendation contains any provision limiting BESS discharge capacity relative to co-located generation capacity. This is a purely Cyprus-specific restriction written into the EAC DSO Technical Guide — a document authored by the DSO (EAC), which is the same entity that owns the TSO (TSOC).

---

### E. Software Limiting Prohibition — Against EU Trend

**EU Directive 2019/944 — No provision prohibits software-based power limiting.**

**EU Regulation 2019/943 — Article 13(6) (Redispatch, referenced for flexibility):**

The EU framework actively encourages flexible operation of generation and storage assets.

**Germany — EEG §8a (Solar Peak Act, January 2025):**

> Explicitly enables "flexible grid connections" where batteries operate in **mixed mode**, charging from both solar and grid. Software determines which output qualifies as "green". BNetzA implementation rules expected by June 2026.

**Cyprus — Κ.Δ.Π. 15/2026 (Official Gazette 5992, Condition 4):**

> *"BESS rated power ≤ RES rated power"* (Ονομαστική ισχύς BESS ≤ ισχύς ΑΠΕ)

**EAC DSO Technical Guide 2025.1 — Section 18.2, Condition 4 (confirmed Jan 2026):**

> *"PCS **nameplate capacity** must be ≤ RES licensed capacity. **Software limiting is NOT allowed** — physical installed PCS rating must match or be lower than the park's licensed MW capacity."*

| EU / European Standard | Provision | Cyprus EAC Rule |
|---|---|---|
| EU Directive 2019/944 | No restriction on software limiting | **Software limiting NOT allowed** |
| Germany EEG §8a (2025) | Explicitly enables mixed mode via software | **Prohibited** |
| Spain RD 997/2025 | New capacity definition for hybrid storage | **Physical nameplate must match** |
| ENTSO-E Network Codes | No requirement for physical capacity matching | **Physical only** |

**DIVERGENCE**: The prohibition on software limiting directly increases project costs. A developer wanting to install a 12 MW PCS (for future grid import capability) on a 10 MW PV park cannot software-limit it to 10 MW — they must buy a physically smaller 10 MW unit. This is the **opposite** of the EU's direction toward flexible grid connections.

---

### F. Combined Output Cap — Overly Restrictive Implementation

**EU Network Code Requirements for Generators (RfG) — Article 13:**

Generators must not exceed their **maximum capacity** as registered with the system operator. The cap is tied to the **grid connection agreement**, not to co-located generation.

**Cyprus EAC DSO Technical Guide 2025.1 — Section 2.2 (Category B):**

> *"Combined Output: RES + BESS output ≤ RES installed capacity"*

| Standard Approach (EU) | Cyprus EAC Rule |
|---|---|
| Output capped at **grid connection capacity** | Output capped at **RES installed capacity** |
| BESS can increase total injection if connection permits | BESS **cannot** increase total injection beyond PV rating |
| Connection capacity is the binding constraint | PV nameplate is the binding constraint |

**DIVERGENCE**: In most EU countries, the output cap is tied to the grid connection agreement (e.g., if you have a 15 MW connection, you can inject 10 MW PV + 5 MW BESS simultaneously). Cyprus ties it to the RES installed capacity (10 MW PV = maximum 10 MW total, ever). This means BESS can **never add incremental export capacity** — it can only time-shift existing PV output.

---

### G. Category B Charging Source Restriction — Explicit Exclusion

**EU Directive 2019/944 — Recital 62:**

> *"Energy storage will be essential for enabling integration of renewable electricity… In order to enable the further development of energy storage services, a level playing field for energy storage should be created. In particular, **no undue barriers preventing energy storage from being used** to provide… flexibility to the market and balancing should exist."*

**EU Commission Recommendation on Energy Storage — C/2023/1729:**

> *"Member States should… remove regulatory barriers… Storage should not be subject to **double charging** (grid fees for both input and output)… Storage should be able to participate in **all** electricity markets."*

**Cyprus EAC DSO Technical Guide 2025.1 — Section 2.2 (Category B):**

> *"Charging Source: **RES only** — Cannot charge from grid"*

This is the single most impactful restriction for commercial PV+BESS projects. The verbatim text creates an explicit exclusion from grid charging for the category where most commercial installations fall.

| EU Principle | Cyprus Implementation |
|---|---|
| "No undue barriers" (Recital 62) | "Cannot charge from grid" = explicit barrier |
| "Level playing field" (Recital 62) | Three-tier system with unequal rights |
| Storage can participate in "all electricity markets" (C/2023/1729) | Category B excluded from grid purchasing |
| "Remove regulatory barriers" (C/2023/1729) | "RES only" charging source restriction |

**DIVERGENCE**: The explicit wording "Cannot charge from grid" and "RES only" in the EAC Technical Guide directly contradicts the EU's stated principle of "no undue barriers" and "level playing field." The restriction is not found in any EU network code, regulation, or directive.

---

### Summary: Document-by-Document Divergence Map

| EAC/CERA Document | Section | Exact Wording | EU Article Contravened | Severity |
|---|---|---|---|---|
| DSO Technical Guide 2025.1 | §2.2 - Category B | *"Charging Source: RES only — Cannot charge from grid"* | Art. 2(59) single definition; Recital 62 "no undue barriers" | **HIGH** |
| DSO Technical Guide 2025.1 | §2.2 - Category B | *"Max Discharge Capacity ≤ 50% of RES installed capacity"* | No EU basis; Reg. 2019/943 Art. 3(h) "barriers shall be removed" | **HIGH** |
| DSO Technical Guide 2025.1 | §2.2 - Category B | *"Combined Output: RES + BESS ≤ RES installed capacity"* | RfG Art. 13 (cap should be connection capacity, not generation) | **MEDIUM** |
| Κ.Δ.Π. 15/2026 (Gazette 5992) | Condition 4 | *"BESS rated power ≤ RES rated power"* + *"Software limiting NOT allowed"* | No EU basis; opposes EEG §8a trend | **MEDIUM** |
| Market Rules (absent) | N/A | *No legislation enabling BESS to buy from DAM* | Art. 2(57) storage = undertaking; Art. 2(9) "all timeframes" | **CRITICAL** |
| CERA Decision June 2025 | TSOC BESS approval | *120 MW/400 MWh TSO-owned BESS* | Art. 54(1) "shall not own"; Art. 54(2)(a) private parties existed | **HIGH** |

---

## CYPRUS RESTRICTIONS: Fair Market Rules vs TSO Protectionism

### Methodology

To determine whether a restriction is based on legitimate technical/safety concerns (fair) versus protectionist intent (unfair), we apply three tests:
1. **EU Directive Compliance**: Does the restriction align with EU Directive 2019/944 requirements?
2. **European Precedent**: Do other EU countries with similar grid characteristics impose the same restriction?
3. **Cui Bono (Who Benefits)**: Does the restriction primarily benefit the incumbent monopoly (EAC/TSOC) at the expense of private market participants?

### Restriction 1: BESS Cannot Buy from the DAM (Grid Arbitrage Blocked)

| Test | Assessment |
|------|------------|
| **EU Directive** | **VIOLATION.** Article 2(59) of Directive 2019/944 defines storage as a market participant. Article 3 requires non-discriminatory market access. Article 36 restricts TSO/DSO from owning storage (with derogations). Blocking private BESS from the DAM while allowing TSO-owned BESS contradicts the directive's intent. |
| **European Precedent** | **No precedent.** Every other EU market with an operational DAM allows BESS to participate as buyer and seller. Germany, Spain, Italy, Greece, Portugal, Netherlands — all allow BESS DAM access. Cyprus is the **only** EU market blocking this. |
| **Cui Bono** | **EAC/TSOC benefit exclusively.** By blocking private BESS from the DAM, TSOC's own 120 MW/400 MWh BESS (to be operational by June 2026) will be the only storage able to participate in the market. Private operators are limited to curtailment recovery only. |

**Verdict: PROTECTIONIST.** This restriction has no technical justification and directly contradicts EU market liberalisation principles. ACER (EU energy regulator) issued a written warning that the TSOC BESS tender would harm market fairness.

### Restriction 2: Category B — No Grid Charging for Hybrid PV+BESS

| Test | Assessment |
|------|------------|
| **EU Directive** | **QUESTIONABLE.** The Clean Energy Package (2019) explicitly states storage should not face "double charging" and should have market access. Preventing Category B BESS from grid charging is a de facto market access restriction. |
| **European Precedent** | **Minority position.** Germany, Spain, Netherlands, Belgium, Austria all allow co-located BESS to grid-charge. Spain specifically removed this restriction in November 2025 (RD 997/2025). Only Czech Republic and Slovakia have a similar restriction, but at a much lower 20% threshold. |
| **Cui Bono** | **EAC/TSOC benefit.** If private PV+BESS parks could charge from the grid, they would compete with EAC's conventional generators during off-peak hours (buying cheap surplus) and with TSOC's BESS during peak dispatch. The restriction eliminates this competition. |

**Verdict: LIKELY PROTECTIONIST.** While there is a weak technical argument (grid stability in an isolated system), the same argument could apply to Greece (isolated islands) and Spain (post-blackout), yet both allow grid charging. The restriction disproportionately benefits the incumbent.

### Restriction 3: 50% Maximum Discharge Cap (Category B)

| Test | Assessment |
|------|------------|
| **EU Directive** | **NO BASIS.** No EU directive or regulation imposes a maximum discharge rate relative to co-located generation capacity. This is entirely a Cyprus-specific rule. |
| **European Precedent** | **UNIQUE to Cyprus.** No other EU country — not even small island systems like Malta, Crete (Greece), or Sardinia (Italy) — imposes a discharge cap relative to generation capacity. |
| **Cui Bono** | **EAC/TSOC benefit.** By capping discharge at 50%, private BESS can only inject half their potential power into the grid during peak hours. This reduces their impact on evening peak prices (where EAC's oil-fired generators earn the highest margins at €183-500/MWh). TSOC's BESS has no such cap. |

**Verdict: PROTECTIONIST.** There is no technical or safety justification for limiting discharge to 50% of PV capacity. BESS inverters can operate safely at 100% rated power. This restriction purely limits the commercial competitiveness of private BESS.

### Restriction 4: PCS Nameplate Must Physically Match (Software Limiting Prohibited)

| Test | Assessment |
|------|------------|
| **EU Directive** | **NO BASIS.** The EU has no requirement prohibiting software power limiting. In fact, Germany's EEG §8a explicitly encourages "flexible grid connections" where software manages power output. |
| **European Precedent** | **OPPOSITE of trend.** Germany's Solar Peak Act (Jan 2025) actively promotes software-based power management. Spain, Italy, and the Netherlands all allow software limiting as standard practice. |
| **Cui Bono** | **EAC/DSO benefit.** Prohibiting software limiting forces developers to buy physically smaller (and therefore more expensive per-kWh) inverter systems, increasing project costs. A 10 MW PV park that wants to add BESS under Category B must buy a PCS rated at exactly ≤10 MW — it cannot install a 12 MW PCS and software-limit it to 10 MW. This increases CapEx and reduces BESS economic viability for private investors. |

**Verdict: PROTECTIONIST.** Software limiting is a standard, safe, and cost-effective practice across Europe. The prohibition adds unnecessary cost to private BESS projects with no technical benefit.

### Restriction 5: Combined Output Cap (RES + BESS ≤ RES installed capacity)

| Test | Assessment |
|------|------------|
| **EU Directive** | **PARTIALLY JUSTIFIED** for grid connection sizing, but overly restrictive in execution. |
| **European Precedent** | **Exists but differently implemented.** Some countries limit grid injection to the connection capacity (which makes sense — you shouldn't inject more than your grid connection allows). But Cyprus ties this to RES capacity rather than grid connection capacity. In Germany and Spain, the BESS can inject beyond the PV nameplate if the grid connection supports it. |
| **Cui Bono** | **EAC/TSOC benefit.** By capping total output at RES capacity, the BESS can never increase the grid injection of a PV park beyond what the PV alone would produce. This prevents private BESS from becoming significant grid participants and limits their market impact. |

**Verdict: PARTIALLY PROTECTIONIST.** There is a legitimate technical basis (grid connection capacity), but the implementation (tying it to RES capacity rather than grid connection capacity) is unnecessarily restrictive and benefits the incumbent.

### Restriction 6: TSOC Owns and Operates 120 MW/400 MWh BESS While Private BESS Faces All Above Restrictions

| Test | Assessment |
|------|------------|
| **EU Directive** | **POTENTIAL VIOLATION of Article 36/54.** Directive 2019/944 generally prohibits TSOs from owning or operating storage, with narrow derogations for isolated systems. Cyprus obtained a derogation from the European Commission, but ACER (EU energy regulator) issued a written warning against it. |
| **European Precedent** | **33 private companies** hold BESS licenses in Cyprus representing over 1,000 MW of capacity. Only 7 have received preliminary connection terms (151 MW). Meanwhile, TSOC received fast-tracked approval for 120 MW. |
| **Cui Bono** | **TSOC/EAC exclusively.** The tender was placed at EAC's own substations, funded by EU Just Transition Fund (€30M of €41M), and will be operational before any private BESS. The Electricity Market Association (EMA) filed complaints with both CERA and the European Commission. |

**Verdict: PROTECTIONIST.** The state rushed to deploy its own storage before market liberalisation, using EU funds, while simultaneously blocking private BESS from DAM participation and imposing Category B restrictions that make private BESS commercially uncompetitive.

### Summary: Restriction Audit

| # | Restriction | Technical Basis? | EU Compliant? | European Precedent? | Primary Beneficiary | Verdict |
|---|------------|:----------------:|:-------------:|:-------------------:|---------------------|---------|
| 1 | No DAM purchase for BESS | None | NO | None (unique) | EAC/TSOC | **PROTECTIONIST** |
| 2 | No grid charging (Cat B) | Weak | Questionable | Minority (CZ/SK at 20%) | EAC/TSOC | **LIKELY PROTECTIONIST** |
| 3 | 50% discharge cap | None | NO | None (unique) | EAC/TSOC | **PROTECTIONIST** |
| 4 | Software limiting prohibited | None | NO | None (opposite trend) | EAC/DSO | **PROTECTIONIST** |
| 5 | Combined output cap at RES | Partial | Partial | Exists differently | EAC/TSOC | **PARTIALLY PROTECTIONIST** |
| 6 | TSO owns BESS while private restricted | Emergency basis | Derogation obtained; ACER warned | No — Art. 36/54 generally prohibits | TSOC/EAC | **PROTECTIONIST** |

### The Pattern

These six restrictions, taken together, form a coherent strategy:

1. **Block private BESS from the market** (no DAM access)
2. **Limit private BESS to RES-auxiliary** (no grid charging)
3. **Cap private BESS discharge** (50% cap)
4. **Increase private BESS costs** (no software limiting)
5. **Cap private BESS output** (combined output limit)
6. **Deploy state BESS first** (TSOC fast-tracked, private delayed)

The result: **TSOC's 120 MW/400 MWh BESS will be the dominant storage player in Cyprus, able to charge from the grid and participate in the DAM, while private BESS operators are confined to curtailment recovery with capped discharge at half capacity.**

This is not a coincidence. It is a structural advantage built into the regulatory framework.

---

## SOURCES & REFERENCES

### Cyprus
- Law N.130(I)/2021 — Electricity Market Regulation Act
- DSO Technical Guide for Storage - Edition 2025.1 (EAC)
- Κ.Δ.Π. 15/2026, 17/2026 — Official Gazette 5992 (January 16, 2026)
- CERA (ΡΑΕΚ): https://www.cera.org.cy/
- TSOC DAM data (134-day dataset, October 2025 - February 2026)

### EU-Level
- Directive (EU) 2019/944 — Common rules for internal electricity market
- Regulation (EU) 2023/1542 — EU Batteries Regulation
- Clean Energy Package (2019)
- Net-Zero Industry Act (2024)

### Country-Specific
- **Italy:** D.Lgs. 190/2024 (Testo Unico FER), D.Lgs. 178/2025 (corrective)
- **Germany:** EnWG §118(6), EEG §8a, BauGB §35, Electricity Tax Amendment 2025/2026
- **Spain:** RD 997/2025, RD 917/2025, RDL 7/2025
- **Greece:** Law 4951/2022, Law 5151/2024, MD 28255/1143/2025
- **Poland:** Energy Law Act (1997), 2021 Amendment
- **Czech Republic:** Lex OZE 3 Amendment (2024)
- **Portugal:** DL 15/2022, DL 99/2024, Despacho 1859/2025
- **Austria:** ElWG (December 11, 2025)
- **Belgium:** Federal Electricity Law, CREG Code of Conduct (April 2025)
- **Netherlands:** Electricity Act 1998, NFA reforms (2024-2025)
- **Slovakia:** Energy Act (updated)
- **Slovenia:** ESA, Official Gazette 172/21
- **Luxembourg:** ILR Tariff Regulation E24/18

### Regulatory Bodies
| Country | Regulator | Website |
|---------|-----------|---------|
| Cyprus | CERA (ΡΑΕΚ) | https://www.cera.org.cy/ |
| Italy | ARERA | https://www.arera.it/en |
| Germany | BNetzA | https://www.bundesnetzagentur.de/ |
| Spain | CNMC | https://www.cnmc.es/en |
| Greece | RAAEY | https://www.raaey.gr/energeia/en/ |
| Poland | URE | https://www.ure.gov.pl/en |
| Czech Rep. | ERU | https://www.eru.cz/ |
| Portugal | ERSE | https://www.erse.pt/en/ |
| Austria | E-Control | https://www.e-control.at/en |
| Belgium | CREG | https://www.creg.be/ |
| Netherlands | ACM | https://www.acm.nl/ |
| Slovakia | URSO | https://www.urso.gov.sk/ |
| Slovenia | AGEN-RS | https://www.agen-rs.si/web/en/ |
| Luxembourg | ILR | https://www.ilr.lu/ |

---

## CERA LEGISLATION FRAMEWORK: Complete Index of Cyprus Energy Laws (as of March 2026)

### Legislative Hierarchy

The Cyprus electricity sector is governed by a layered legal framework. Understanding the hierarchy is essential for identifying where DSO restrictions originate and whether they have proper legal authority.

```
EU DIRECTIVES & REGULATIONS (supranational, binding)
  └── Directive 2019/944 (Internal Electricity Market)
  └── Regulation 2019/943 (Electricity Market)
  └── Directive 2018/2001 (Renewable Energy — RED II)
  └── Regulation 1227/2011 (REMIT — Market Integrity)
  └── Directive 2024/1711 (Cyprus isolation derogation)
      │
NATIONAL LAW (Parliament — Βουλή των Αντιπροσώπων)
  └── N.130(I)/2021 — Electricity Market Regulation Act (Βασικός Νόμος)
  │     Amended by: N.224(I)/2022, Ν.44(I)/2023, N.56(I)/2025
  └── N.107(I)/2022 — Renewable Energy Promotion Act
  └── N.180(I)/2025 & N.181(I)/2025 — Roads and Buildings (storage permit exemptions)
  └── March 2026 Amendment — Flexible connection, license extensions, maturity criteria
      │
REGULATORY DECISIONS (CERA — Ρυθμιστικές Αποφάσεις)
  └── ΚΔΠ 523/2021 (ΡΑ 02/2021) — General License Framework
  └── ΚΔΠ 359/2021 (ΡΑ 01/2021) — Tariff Methodology
  └── ΚΔΠ 224/2019 (ΡΑ 03/2019) — Storage in Wholesale Market (upstream of meter)
  └── ΚΔΠ 260/2025 (ΡΑ 02/2025) — Flexible Connection Agreements (NEW)
  └── ΚΔΠ 243/2025 (ΡΑ 01/2025) — Active Customers & RES Prosumers (Amendment)
  └── ΚΔΠ 290/2025 (ΡΑ 03/2025) — General License Framework (Amendment)
  └── ΚΔΠ 376/2024 (ΡΑ 04/2024) — Energy Communities
  └── ΚΔΠ 375/2024 (ΡΑ 02/2024) — Active Customers & RES Prosumers
  └── ΚΔΠ 399/2024 (ΡΑ 05/2024) — Intraday Electricity Market Operation
      │
SECONDARY REGULATIONS (Κανονισμοί — approved by CERA / Cabinet)
  └── ΚΔΠ 538/2004 — License Issuance
  └── ΚΔΠ 467/2004 — License Fees
  └── Distribution Rules (Κανόνες Διανομής — ΚΜΔ)
  └── Electricity Market Rules (ΚΑΗ)
      │
TECHNICAL GUIDES (authored by DSO/EAC — lowest legal authority)
  └── DSO Technical Guide for Storage 2025.1 ← Contains 50% cap, Category B/C rules
  └── Κ.Δ.Π. 15/2026, 17/2026 — Building permit exemption conditions
```

### Key CERA Laws Published on cera.org.cy

#### Primary Electricity Law (Consolidated)

| Law | Title | Status |
|-----|-------|--------|
| **N.130(I)/2021** | Ρύθμιση της Αγοράς Ηλεκτρισμού (Electricity Market Regulation Act) | **In force** (consolidated through 2025) |
| N.224(I)/2022 | Τροποποιητικός (Amendment) | Merged into consolidated |
| Ν.44(I)/2023 | Τροποποιητικός (Amendment) | Merged into consolidated |
| N.56(I)/2025 | Τροποποιητικός (Amendment) | Merged into consolidated |

This law transposes EU Directive 2019/944 and establishes CERA's licensing authority, market structure, and the legal basis for energy storage. It replaced the old N.122(I)/2003–2018 framework entirely.

#### Renewable Energy Law

| Law | Title | Status |
|-----|-------|--------|
| **N.107(I)/2022** | Προώθηση και Ενθάρρυνση Χρήσης ΑΠΕ (RES Promotion Act) | **In force** |

Transposes EU Directive 2018/2001 (RED II). Replaced the older N.112(I)/2013–2018 framework.

#### Key 2025–2026 Regulatory Decisions

| ΚΔΠ | CERA Decision | Subject | Date | Relevance to BESS |
|-----|---------------|---------|------|-------------------|
| 260/2025 | ΡΑ 02/2025 | **Flexible Connection Agreements** in Transmission & Distribution | 2025 | **HIGH** — enables flexible grid access for BESS |
| 243/2025 | ΡΑ 01/2025 | Active Customers & RES Prosumers (Amendment) | 2025 | Defines self-consumption + storage rules |
| 290/2025 | ΡΑ 03/2025 | General License Framework (Amendment) | 2025 | License requirements for storage operators |
| 2326/2025 | ΡΑ 04/2025 | Operational Unbundling of DEFA (Natural Gas) | 2025 | Structural precedent for EAC unbundling |
| 15/2026 | — | BESS within RES stations — building permit exemption | Jan 2026 | Simplifies co-located BESS deployment |
| 17/2026 | — | Fire and environmental conditions for exempt BESS | Jan 2026 | Safety requirements for exempt BESS |

#### March 2026 Parliamentary Amendment (Flexible Connection & License Extensions)

On **13 March 2026**, Parliament voted **21–13** in favor of amendments to the Electricity Market Act covering:

1. **License Extensions:** CERA can now extend BESS/RES licenses for up to 1 year at a time (max 5 years total), provided the investor demonstrates technical/financial capacity and uses the "one-stop shop" service
2. **Connection Priority:** Projects at advanced readiness stages and energy storage systems get grid connection priority. Maturity criteria to be developed by Ministry of Energy in consultation with CERA and system operators
3. **Capacity Reservation Ban:** Grid capacity cannot be reserved for projects without all required permits — preventing "capacity hoarding" by dormant licenses
4. **Transparency Mandate:** DSO and TSO must publish connection application priority information **separately for each substation node**, covering both RES and storage projects
5. **Curtailment Rules:** Formalized rules for when the system operator limits RES generation for safety/stability reasons
6. **10-Year Plan Consultation:** Changes to the transmission/distribution network development plan now require public consultation

**Significance:** This is the first legislative act directly addressing the connection queue bottleneck. The transparency mandate (publishing per-substation priority) is a direct response to complaints from private BESS investors that the connection process was opaque and favored state projects.

---

## DSO NON-ADHERENCE TO LEGISLATION: Where EAC Exceeds Its Legal Authority

### Methodology

This section examines where EAC (as DSO) has implemented restrictions through its Technical Guide that either (a) go beyond what the primary legislation authorizes, (b) contradict CERA regulatory decisions, or (c) violate EU directives that Cyprus has transposed.

### Finding 1: The 50% Discharge Cap Has No Legal Basis Above the Technical Guide

| Level | Document | Contains 50% cap? |
|-------|----------|:-----------------:|
| EU Directive | 2019/944 | **NO** |
| EU Regulation | 2019/943 | **NO** |
| National Law | N.130(I)/2021 (consolidated) | **NO** |
| CERA Decision | ΡΑ 03/2019 (ΚΔΠ 224/2019) — Storage in Wholesale Market | **NO** |
| CERA Decision | ΡΑ 02/2025 (ΚΔΠ 260/2025) — Flexible Connection | **NO** |
| Distribution Rules | Κανόνες Διανομής (ΚΜΔ) | **NOT EXPLICITLY** |
| **DSO Technical Guide** | **Storage Edition 2025.1** | **YES — here only** |

**Conclusion:** The 50% discharge cap is an EAC-authored restriction sitting at the lowest level of the legal hierarchy. It was never approved by Parliament, never explicitly mandated by CERA, and contradicts the EU principle of "no undue barriers" (Directive 2019/944, Recital 62). EAC imposed it through its own technical document.

### Finding 2: Category B Grid-Charging Ban Contradicts CERA's Own Flexible Connection Framework

CERA's ΚΔΠ 260/2025 (ΡΑ 02/2025) established a **Regulatory Framework for Flexible Connection Agreements** in both the Transmission and Distribution systems. This decision envisions facilities with flexible, non-firm connections that can adjust their grid usage dynamically.

However, EAC's DSO Technical Guide 2025.1 simultaneously states for Category B:

> «το ΣΑΗΕ πρέπει να φορτίζει από ενέργεια η οποία προέρχεται αποκλειστικά από το Σύστημα ΑΠΕ»
> (The BESS must charge from energy originating exclusively from the RES System)

This creates a contradiction:
- **CERA says:** Flexible connection agreements should enable dynamic grid interaction
- **EAC's Technical Guide says:** Category B BESS cannot interact with the grid for charging at all

The Technical Guide effectively **nullifies CERA's flexible connection framework** for the majority of commercial BESS installations (which are Category B).

### Finding 3: Connection Queue Opacity Violates March 2026 Law

The March 2026 parliamentary amendment explicitly requires:

> *"electricity distribution and transmission system operators will be required to publish information on the order of priority for connection applications… separately for each substation node"*

**Current status:** As of March 2026, EAC has **not yet published** per-substation priority lists. The 33+ licensed private BESS operators and 7 with preliminary connection terms have no visibility into where they stand in the queue relative to other applicants at the same substation.

This is not yet a violation (the law was just passed), but it creates a clear compliance obligation that EAC must now fulfill.

### Finding 4: TSOC BESS Deployment vs Article 54 of Directive 2019/944

EU Directive 2019/944, Article 54(1) states TSOs "shall not own, develop, manage or operate energy storage facilities." The derogation conditions in Article 54(2) require:

| Condition | EU Requirement | Cyprus Implementation |
|-----------|---------------|----------------------|
| (a) | Open, transparent, non-discriminatory tendering AND private parties "have not been awarded" or "could not deliver" | **No competitive tender was held.** 33 licensed private operators existed. EMA filed complaint. |
| (b) | Storage "not used to buy or sell electricity in the electricity markets" | **Unclear** — TSOC BESS expected to participate in dispatch |
| (c) | Regulatory authority has assessed necessity and tendering | CERA approved but **ACER issued written warning** that the move would "hurt market fairness and reinforce state monopoly" |

**Source:** Kathimerini KNEWS, July 18, 2025: *"This is a slap in the face," said a source close to the Electricity Market Association (ΣΑΗ). "We've followed the rules, waited our turn, and now the state is jumping the queue, with public money."*

### Finding 5: EU Infringement Package — January 2026

In **January 2026**, the European Commission issued an infringement package that flagged Cyprus for delays across multiple sectors **including energy rules**. While specific details of the energy-related infringement were not published in detail, this confirms that the Commission has active concerns about Cyprus's implementation of EU energy legislation.

### Summary: DSO Legal Authority vs Actual Practice

| Restriction | Legal Authority Claimed by EAC | Actual Legal Basis | Assessment |
|-------------|-------------------------------|-------------------|------------|
| 50% discharge cap | DSO Technical Guide 2025.1 | **None above technical guide** | **Exceeds authority** |
| Category B no-grid-charging | DSO Technical Guide 2025.1 | **None in primary law** | **Exceeds authority** |
| Software limiting prohibition | Κ.Δ.Π. 15/2026 + Technical Guide | Κ.Δ.Π. only covers building permits, not grid operation | **Misapplied** |
| Connection queue opacity | Historical practice | **Now explicitly prohibited** by March 2026 law | **Must comply** |
| TSOC BESS without tender | EC derogation under Directive 2024/1711 | Derogation obtained but ACER objected | **Legally contested** |
| Combined output cap at RES capacity | DSO Technical Guide 2025.1 | EU RfG ties cap to connection capacity, not generation | **Non-standard implementation** |

---

## HOW TO MONITOR AND INDEX NEW CYPRUS ENERGY LEGISLATION

### The Problem

Cyprus publishes energy legislation across multiple sources — the Official Gazette, CERA decisions, parliamentary proceedings, and ministerial decrees. There is no single RSS feed or API that aggregates all energy-related legal changes. The March 2026 flexible connection vote, for example, was reported by news outlets before the Official Gazette publication.

### Source 1: CyLaw — Official Gazette Index (Primary Legal Source)

**URL:** http://www.cylaw.org/KDP/2026.html (regulatory acts) and http://www.cylaw.org/nomoi/2026_index.html (laws)

**What it contains:**
- Complete index of all Κανονιστικές Διοικητικές Πράξεις (ΚΔΠ) — Regulatory Administrative Acts published in the Official Gazette, by year
- Full text of every law passed by Parliament, indexed by year
- Searchable by act number, date, and subject

**How to use for energy monitoring:**
- Check the ΚΔΠ index page weekly for new entries mentioning: ηλεκτρισμός, ΑΠΕ, αποθήκευση, ενέργεια, ΡΑΕΚ, ΔΣΔ, ΔΣΜ
- New laws appear within 1-2 weeks of Parliamentary vote
- **Key search terms (Greek):** αποθήκευση ηλεκτρισμού (electricity storage), ευέλικτη σύνδεση (flexible connection), ανανεώσιμες πηγές ενέργειας (renewable energy sources), ρύθμιση αγοράς ηλεκτρισμού (electricity market regulation)

**Automation potential:** The CyLaw ΚΔΠ index page is a simple HTML table that can be scraped with a basic script. Each entry links to a PDF of the full act.

### Source 2: CERA Website — Regulatory Decisions & Announcements

**Decisions:** https://www.cera.org.cy/en-gb/apofasis (English) / https://www.cera.org.cy/el-gr/apofasis (Greek)

**Announcements:** https://www.cera.org.cy/en-gb/anakoinoseis?year=2026

**Consultations:** https://www.cera.org.cy/en-gb/diavoulefseis (draft decisions open for comment)

**What it contains:**
- Every CERA licensing decision (BESS licenses, generation licenses, exemptions)
- Regulatory decisions (ΡΑ) that become ΚΔΠ upon Official Gazette publication
- Public consultations on upcoming regulatory changes (early warning of new rules)
- Announcements about market changes, tender results, etc.

**How to use:**
- **Decisions page:** Filter by year; search for decisions mentioning "αποθήκευση" (storage), "ΣΑΗΕ" (BESS), "ηλεκτρισμός" (electricity)
- **Consultations page:** This is the **earliest warning** of upcoming regulation. When CERA publishes a draft ΡΑ for consultation, it typically becomes law within 3-6 months
- Example: Consultation 06/2024 on flexible connection agreements → became ΚΔΠ 260/2025 (ΡΑ 02/2025)

**Monitoring frequency:** Weekly check of announcements; monthly check of consultations

### Source 3: Cyprus Parliament (Βουλή των Αντιπροσώπων)

**URL:** http://www.parliament.cy/

**What it contains:**
- Plenary session agendas and voting results
- Committee session schedules and records
- Bills under consideration (before they become law)

**How to use:**
- The Parliamentary Committee on Energy, Commerce, Industry and Tourism (Κοινοβουλευτική Επιτροπή Ενέργειας, Εμπορίου, Βιομηχανίας και Τουρισμού) handles all energy legislation
- Bills are published before plenary vote — check the committee's agenda for upcoming energy items
- Voting results are published after plenary sessions

**The flexible connection vote (March 2026):** This was sponsored by DISY MPs Kyriakos Hadjiyiannis and Nikos Sykas, Famagusta MP Michalis Yakoumis, and Ecologists leader Stavros Papadouris. Passed 21-13 (AKEL voted against).

### Source 4: Ministry of Energy Website

**URL:** https://www.energy.gov.cy/

**What it contains:**
- Energy policy documents, national energy plans
- Laws and regulations under the Ministry's purview
- Public consultations on energy policy
- Maturity criteria development (mandated by March 2026 law) will be published here

### Source 5: News Monitoring (Fastest Source)

News outlets typically report on parliamentary votes and CERA decisions **before** official gazette publication:

| Source | URL | Language | Coverage |
|--------|-----|----------|----------|
| **Kathimerini KNEWS** | knews.kathimerini.com.cy/en | English | Best English-language coverage of energy policy |
| **StockWatch** | stockwatch.com.cy | Greek/English | Financial/market focus; covers CERA decisions, EAC |
| **Cyprus Mail** | cyprus-mail.com | English | General news; covers parliament votes |
| **DOM LiVE** | dom.com.cy/en/live/digest | English | Good for translated summaries of legal changes |
| **PolicyPress** | policypress.cy | English | Parliament vote coverage, budget analysis |
| **PV Magazine** | pv-magazine.com | English | International; covers Cyprus curtailment data |
| **CBN (Cyprus Business News)** | cbn.com.cy | English | Business focus; covers CERA and TSOC |

### Source 6: EAC/DSO Technical Updates

**URL:** https://www.eac.com.cy/

**What it contains:**
- DSO Technical Guide updates (the source of Category B/C rules)
- Connection procedures and forms
- National legislation page (mirrors CyLaw for electricity-related laws)

**Critical for:** Monitoring changes to the 50% discharge cap, software limiting prohibition, and connection queue rules. EAC can update its Technical Guide without parliamentary approval.

### Source 7: TSOC (Transmission System Operator)

**URL:** https://tsoc.org.cy/

**What it contains:**
- DAM results (daily)
- System adequacy reports
- Connection terms and grid capacity information
- 10-year network development plan (now requires public consultation per March 2026 law)

### Recommended Monitoring Cadence

| Source | Frequency | What to Look For |
|--------|-----------|-----------------|
| CyLaw ΚΔΠ index | Weekly | New ΚΔΠ mentioning ηλεκτρισμός, αποθήκευση, ΑΠΕ |
| CERA Consultations | Bi-weekly | Draft ΡΑ on storage, connections, market rules |
| CERA Decisions | Weekly | New BESS licenses, regulatory amendments |
| Parliament Committee | When in session | Energy committee agenda items |
| News (KNEWS, StockWatch) | Daily | Breaking coverage of votes, CERA decisions |
| EAC Technical Guides | Monthly | Updates to storage categories, connection rules |
| TSOC | Weekly | DAM data, grid capacity changes |

### Automation Approach: Building a Law Index

To systematically track and index new energy legislation, a monitoring script could:

1. **Scrape CyLaw ΚΔΠ 2026 index** (HTML table) → extract new entries → filter for energy keywords
2. **Check CERA decisions RSS/page** → extract decision numbers and subjects → flag storage-related
3. **Monitor CERA consultations** → these are the earliest predictor of future regulation
4. **Google News alerts** for: `"CERA" OR "ΡΑΕΚ" OR "energy storage" OR "αποθήκευση" site:cyprus-mail.com OR site:knews.kathimerini.com.cy OR site:stockwatch.com.cy`

**Key Greek search terms for law monitoring:**

| English | Greek | Context |
|---------|-------|---------|
| Energy storage | Αποθήκευση ηλεκτρισμού / ΣΑΗΕ | Storage facilities |
| Flexible connection | Ευέλικτη σύνδεση | Grid connection agreements |
| Renewable energy | Ανανεώσιμες πηγές ενέργειας (ΑΠΕ) | Solar/wind/RES |
| Electricity market | Αγορά ηλεκτρισμού | Market regulation |
| Distribution system | Σύστημα διανομής / ΔΣΔ | DSO/EAC grid |
| Transmission system | Σύστημα μεταφοράς / ΔΣΜΚ | TSO/TSOC grid |
| Regulatory decision | Ρυθμιστική απόφαση (ΡΑ) | CERA decisions |
| Official Gazette | Επίσημη Εφημερίδα | Law publication |
| Active customer | Ενεργός πελάτης | Prosumer/self-consumption |
| Grid connection | Σύνδεση στο δίκτυο | Connection terms |
| Day-ahead market | Αγορά επόμενης ημέρας (DAM) | Wholesale market |
| Curtailment | Περικοπή / περιορισμός παραγωγής | RES curtailment |

---

## APPENDIX: Recent CERA BESS License Decisions (2026)

| Decision | Date | Licensee | License # | Type |
|----------|------|----------|-----------|------|
| 006/2026 | 2026 | GDT Henergy Ltd | A1209 | Energy storage installation |
| 007/2026 | 2026 | Eloads Energies Storage Ltd | A1200 | Commercial energy storage |
| 008/2026 | 2026 | Eloads Energies Storage Ltd | A1202 | Commercial energy storage |
| 039/2026 | 2026 | D.P. Elsim Ltd | A1205 | Combined generation + storage |
| 040/2026 | 2026 | D.P. Elsim Ltd | A1206 | Combined generation + storage |
| 054/2026 | 2026 | (pending publication) | — | — |

These decisions confirm that CERA continues to issue BESS licenses to private operators — while simultaneously, those operators face the Category B restrictions documented above that limit the commercial viability of their licensed assets.

---

*Document last updated: March 2026*
*Location: docs/internal/regulation/*
