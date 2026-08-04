# Stelios Call Comments — EPC v6.3 Triage
**Source:** `01-EPC-Agreement-Galascope-G1-G2-v6.3 SCC CALL COMMNETS .docx`  
**Date reviewed:** 4 August 2026 · **Prepared by:** Lighthief Cyprus Ltd internal  
**Status:** EPC update HOLD — awaiting Arkadiusz feedback. LTSA updates applied in v5.0.

---

## ★ STRUCTURAL DECISION — 4 August 2026

**All documents co-signed simultaneously. Order Date = Effective Date = signing date.**

All six instruments will be finalised and **signed on the same day**:

1. EPC Agreement (LCY-EPC-GAL-B1-2026 v6.3)
2. LTSA (LCY-LTSA-GAL-2026 v5.0)
3. Technical Agreement — Galascope 1 (5 MW / 20 MWh)
4. Technical Agreement — Galascope 2 (2.5 MW / 10 MWh)
5. OEM Direct Warranty Undertakings (DWU G1 + DWU G2) — Linyang to sign/seal
6. EMS Subscription Addendum (DISPERON / R&D Innovations)

**Consequences for EPC (to implement when Arek confirms):**

| Clause | Current state | Change needed |
|--------|--------------|---------------|
| "Order Date" definition | Blank — `"ORDER DATE" MEANS` | Define: **Order Date = Effective Date** (date of signing) |
| §1A.4 "not an order to manufacture, no payment obligation" | Signing does NOT trigger order | **DELETE or rewrite** — signing IS the order placement; advance payment falls due on Connection Terms receipt per §1A.3 |
| §1A.5 companion document CPs | LTSA is a CP to the advance — must be in place before advance | **Simplify** — LTSA, TAs, DWU, EMS Addendum are all co-signed; remaining CPs to advance = APG, performance guarantee, Confirmed Price Certificate |
| §1A.5A "LTSA executed before advance payment" | LTSA executed before advance | **Replace** — LTSA co-executed at signing; already in force |
| §1A.8 Documents Long-Stop (Anastasios) | All companion docs by a future Long-Stop Date | **NOT NEEDED** — all docs signed simultaneously. Drop this clause. |
| §6.1B price basis reference | "Indicative Price Basis Certificate at EPC signing" | Already aligned with signing date — **no change needed** |
| §6.1C price validity | "within 6 months of Effective Date" / "more than 6 months after Effective Date ORDER DATE" | Align "ORDER DATE" → "Effective Date" — **same thing now** |
| §2.4 LTSA integrated suite | "executed simultaneously with EPC as condition precedent" | **Confirm** — co-execution is now the actual approach, not a CP |

**Consequences for LTSA:**
- §2.4 "condition precedent to the advance" language softened — the LTSA is simply co-signed; the advance CP wording moves to EPC §1A.5 (APG + Confirmed Price Certificate remain as CPs)
- Companion docs section: remove CP language, replace with co-execution confirmation
- LTSA v5.0 updated accordingly (see below)

**Consequences for Technical Agreements:**
- Both TAs (G1 and G2) must be finalised and signed on the same day
- All TBC / placeholder items in the TAs must be closed before signing — consistent with §1A.3 / Schedule A spec-freeze requirement
- BOP loss allowance [X.X]% in EPC §10.6(b) must be set from the as-designed TA before signing

**Consequences for DWU:**
- Linyang must sign and seal DWU G1 and DWU G2 on signing day
- This requires Linyang's advance confirmation that they will sign — coordinate with Kamil Tyburski / Conor Yang before fixing the signing date

---

## ★ TARGET SIGNING DATE: **12 August 2026**

8 calendar days from today (4 Aug 2026). All 6 documents must be finalised and ready by **11 Aug EOD** for a 12 Aug signing.

### Pre-signing countdown — critical path

| # | Task | Owner | Must be done by | Status |
|---|------|-------|-----------------|--------|
| 1 | Arek reviews EPC → confirms ORDER DATE = Effective Date, §1A.4 rewrite, §1A.8 drop | Arkadiusz Sybaris | **5 Aug** | Waiting |
| 2 | EPC v6.3 final updated with Arek's feedback | Alexander | 6 Aug | Pending #1 |
| 3 | Technical Agreement G1 + G2 — all TBC / placeholders closed, BOP loss allowance [X.X]% filled in from Costas's design | Costas | **6 Aug** | Open |
| 4 | Confirm with Linyang (Kamil / Conor) that DWU G1 + G2 will be signed/sealed by 12 Aug | Alexander | **5 Aug** | Open |
| 5 | DWU G1 + G2 final text agreed with Linyang (SOH values updated to 0.25P curve) | Linyang / Alexander | 7 Aug | Open |
| 6 | EMS Subscription Addendum final — DISPERON / R&D Innovations ready to sign | Alexander | 7 Aug | Open |
| 7 | LTSA Schedule 2 completed — Dino confirms Tier C and signs off fee schedule | Dino / Galascope | **7 Aug** | Open |
| 8 | LTSA v5.0 final (post Dino Schedule 2 confirmation) | Alexander | 8 Aug | Pending #7 |
| 9 | Full package review — all 6 documents cross-checked for consistency | Alexander + Costas | 10 Aug | Pending above |
| 10 | Send final package to Anastasios (Galascope lawyer) for pre-signing clearance | Alexander | 10 Aug | Pending #9 |
| 11 | Signing logistics agreed — location / e-signature platform / Linyang DWU wet-ink vs e-sign | Alexander + Dino | 10 Aug | Open |
| 12 | **All 6 documents signed — Effective Date 12 August 2026** | Both Parties + Linyang | **12 Aug** | — |

**What is NOT changed by this decision:**
- Advance payment still falls due when Connection Terms are received (§1A.3 remains — 30 days after later of Effective Date and Connection Terms)
- APG is still a CP to the advance (bank cannot issue APG until it has both the signed EPC and the signed Linyang Sales Contract)
- Delivery Schedule still confirmed at Connection Terms
- Price adjustment / Confirmed Price Certificate still issued within 14 days of Connection Terms

---

---

## Status legend
| Tag | Meaning |
|-----|---------|
| **LTSA-DONE** | Already reflected in LTSA v5.0 redline |
| **EPC-HOLD** | EPC change — awaiting Arek before implementing |
| **OPEN** | Needs external confirmation |
| **RESOLVED** | Confirmed from source data — no blocker |

---

## A. Resolved / confirmed items (implement now)

### A1. SOH curve — source PDF confirmed · RESOLVED + LTSA-DONE

The Linyang Power Atlantic 5MWh Degradation Curve source PDF confirms that both G1 and G2 are **~4-hour systems (0.25P operating condition)**. The correct guaranteed curve (0.25P, 1 cycle/day) is:

| Year | Guaranteed SOH |
|------|---------------|
| Y1 | 94.62% |
| Y2 | 91.77% |
| Y3 | 89.91% |
| Y4 | 88.00% |
| Y5 | **86.78%** ✓ |
| Y6 | 84.97% |
| Y7 | 83.83% |
| Y8 | 82.25% |
| Y9 | 81.06% |
| Y10 | 79.58% |
| Y15 | **73.61%** ✓ |

This matches Stelios's original request exactly. It is an OEM-data correction, not a new concession. **LTSA Schedule 5 and §10.2 updated accordingly in v5.0.**

### A2. Cycle life correction · RESOLVED + LTSA-DONE

EPC §10.6(c): cycle life corrected from 7,000 to **8,000 cycles at 0.25P, 90% DoD, to 70% EOL**. Updated in LTSA Schedule 5 warranty-voiding conditions.

### A3. Extended warranty pricing disclosed · LTSA-DONE

EPC §10.6-EXT now discloses official Linyang Cyprus pricing:
- BESS Years 6–10: €913.92/MWh/yr
- BESS Years 11–15: €1,157.62/MWh/yr
- PCS/MVS extended warranty: **not offered** (per Client instruction)

LTSA Schedule 2 updated to show extended warranty rows and mark PCS/MVS as "not offered".

### A4. §4.4B end-to-end interface responsibility · LTSA-DONE

EPC §4.4B states: "Contractor remains responsible for end-to-end BMS, PCS, SCADA and EMS interface compatibility, communications, command execution and data integrity at PAC and during the DLP. Failure of an affiliate, software provider or subcontractor shall not excuse the Contractor's responsibility."

Stelios's note: **"SHOULD BE THE SAME IN THE LTSA"** — reflected in LTSA v5.0 §4.4A (DISPERON/EMS carve-out) and §4.3A (corrective maintenance scope). Wording cross-references EPC §4.4B.

### A5. Component A3 milestone: 15% (not 10%) · EPC-HOLD

EPC §7.1 shows A3 Delivery changed from 10% (€282,316.94) to **15% (€423,475.41)**. A4 PAC remains 10%. **First combined payment A1+M1a = €833,728.35** (confirmed in Schedule A).  
LTSA: no direct impact. EPC update pending Arek.

### A6. Performance guarantee: 9 months · EPC-HOLD

EPC §7.1A and §7.4: Lighthief Cyprus Ltd corporate PG confirmed as **9 months** (3 months DLP + 6 months additional), with OEM PG backing the first 3 months (DLP only). The "12" appearing is the client's original ask which was countered at 9.  
Note: "WAITING FOR LIGHTHIEF INTERNATIONAL BACK UP GUARANTEE" — parent guarantee letter from Sybaris pending.

---

## B. New EPC items — HOLD pending Arek

### B1. §1A.8 — Condition Subsequent (from Anastasios) · EPC-HOLD

Anastasios wants a new §1A.8: condition subsequent clause with a **Documents Long-Stop Date** — all companion documents must be agreed and executed by a specific date or the entire EPC is null and void ab initio (no liability either side; full refund).

**Key points:**
- All 7 companion documents must be executed by the Documents Long-Stop Date `[●]`
- Client has unilateral right to declare EPC void if any document is missing
- No course of dealing / part performance waives this right
- Only extendable by written agreement

**Our position:** This is acceptable in principle — it is already broadly covered by §1A.5/§1A.6. The new clause adds a hard deadline and an explicit nullity right. **Discuss with Arek** whether the `[●]` date should be e.g. 30 days after Connection Terms or tied to the advance payment trigger.

### B2. §2 — "COMPLIANCE WITH EAC AND TSO REQUIREMENT WITH EPC" · EPC-HOLD

Placeholder inserted under §2 Background for a clause on compliance with EAC/TSO requirements within the EPC. Needs drafting — likely a reference to §19 Regulatory Compliance and the DSO requirements confirmed in Schedule A at Connection Terms.

### B3. §6.1 — "ORDER DATE" definition · EPC-HOLD

"ORDER DATE" appears multiple times in the document as the anchor point for price indices (replacing "Effective Date" in some places). The definition was left blank: `"ORDER DATE" MEANS`. This needs to be defined — **Order Date = the date the Contractor places the order with Linyang (concurrent with Connection Terms and the advance payment trigger under §1A.3).**  
Currently unresolved in the document text.

### B4. §4.6A(b) — switchgear/MV modification cost · OPEN

Note: "DEMOS TO CONFIRM COST OF SWITCHGEAR AND MV MODIFICATION". Indicative range €20,000–35,000 in the text but flagged for Demos to verify. Not a blocker to signing — it is a separately-priced variation item.

### B5. §13.5 — "TIMOTHEOS LIST ADD HERE" · EPC-HOLD

In the manufacturing defect carve-out (§13.5), there is a placeholder to insert additional items from Timotheos's list. This list has not been specified in the document. Need to retrieve Timotheos's specific additions and confirm whether they should be included in the Galascope EPC.

### B6. §7.1A / §7.4 — Lighthief International guarantee · OPEN

"WAITING FOR LIGHTHIEF INTERNATIONAL BACK UP GUARANTEE" — the parent-company confirmation letter from Dr. Arkadius Sybaris (Lighthief International Ltd) per §16.3B is still outstanding. Must be delivered before the advance payment falls due.

---

## C. LTSA-specific updates applied in v5.0

| Item | LTSA change |
|------|-------------|
| SOH Y5 86.78% / Y15 73.61% | **CLOSED** — confirmed from Linyang 0.25P source PDF. Updated in §10.2 and Schedule 5. No longer an open item. |
| Cycle life 8,000 cycles at 0.25P | Updated in Schedule 5 warranty-voiding conditions and SOH context |
| Extended warranty rates (BESS only) | Added to Schedule 2 as optional elected rows |
| PCS/MVS extended warranty "not offered" | Marked in Schedule 2 per Client instruction |
| §4.4B mirror ("same in LTSA") | LTSA §4.4A DISPERON carve-out + §4.3A corrective scope already reflects this |
| EPC reference updated v4.0 → v6.3 | Done throughout LTSA v5.0 |
| Simultaneous execution / CP to advance | LTSA §2.4 and companion docs section |
| LTSA §5.5 Client training on monitoring platform | Added per v6.3 final sweep note (Timotheos ask) |

---

## D. Pre-signature checklist — updated status

| # | Item | Status |
|---|------|--------|
| 1 | DWU G1 + G2 signed/sealed by Linyang | Open |
| 2 | Performance guarantee signed/sealed by Linyang | Open |
| 3 | APG (BoC) — Galascope beneficiary + PAC expiry | Open |
| 4 | EMS Addendum (DISPERON) executed | Open |
| 5 | SOH Y5/Y15 values | **CLOSED** — 86.78% / 73.61% confirmed from Linyang 0.25P source |
| 6 | LTSA Schedule 2 completed and signed | Open |
| 7 | EPC reference v6.3 throughout | Done in LTSA v5.0 |
| 8 | LTSA executed simultaneously / CP to advance | Done in LTSA v5.0 §2.4 |
| 9 | Alpha Bank lender step-in structure | Open |
| 10 | Scheduled downtime 4 days — client response | Pending |
| 11 | Liability cap 24 months — client response | Pending |
| 12 | Lighthief International guarantee letter (Sybaris) | Open |
| 13 | §1A.8 Documents Long-Stop Date agreed | EPC-HOLD / Arek |
| 14 | ORDER DATE definition inserted in EPC | EPC-HOLD / Arek |

---

*Lighthief Cyprus Ltd · HE 477423 · Internal use only · 4 August 2026*
