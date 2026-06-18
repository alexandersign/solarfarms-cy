# EPC v6 — Galascope agreed clauses (paste-ready)

**Ref:** LCY-EPC-GAL-B1-2026 · **Supersedes:** v5.1 + `redlines/v5.1-galascope-agreed-redlines-may2026.md` · **Date:** 16 Jun 2026 · **INTERNAL**

> Sign-now logic: **only the EPC** is signed now (Lighthief + Galascope / Ntinos Konstantinos).
> The real **order** crystallises at **Connection Terms** (2 weeks–9 months out), when the Lighthief–Linyang
> Sales Contract is signed and the bank issues the APG against **both** agreements. No payment before then.
> Companion docs (DWU, APG, performance guarantee, EMS) travel in the pack **for review**, executed at the trigger.

---

## 0. NEW — Order Trigger & Companion Documents (add as §1A.4–1A.6, with §10.9)

> **1A.4 Nature of EPC Execution.** Execution of this Agreement records the Parties' agreed terms. It is **not an order to manufacture** and creates **no payment obligation**. The order is placed, and the advance under Section 7.1(a) falls due, only on satisfaction of the Conditions Precedent in Sections 1A.1 and 1A.5.
>
> **1A.5 Companion Documents — Condition Precedent to the Advance.** The advance shall not become due until the Contractor has presented to the Client, each substantially in the form attached to this Agreement: (a) the **OEM Direct Warranty Undertaking**, signed and sealed by the OEM (one per park); (b) the **Advance Payment Guarantee** issued by the OEM's bank naming the Client as beneficiary; (c) the **OEM 5% performance guarantee**; and (d) the **Confirmed Price Certificate** per Section 6.1.
>
> **1A.6 Bilateral Walk-Away.** If any document in Section 1A.5 is not presented in the agreed form by the Long-Stop Date in Section 1A.1, **either Party may elect not to proceed** by written notice without liability to the other, and any advance received shall be refunded within thirty (30) days less reasonable and documented costs. The companion-document drafts attached are provided **for review and are not executed** by signature of this Agreement.

**Why:** client never pays ahead of the security; Contractor is never forced to order if the bank/OEM do not issue. Mirrors the existing §1A.2 Connection-Terms walk-away.

---

## 1. Force Majeure — §8.4.7A (carried from v5.1 redline; unchanged)

Replace §8.4.7A with the (a)–(f) flow-through + 10-BD client dispute / 30-day → §15.3 ADR / no extension during dispute / only true §12.1 FM passes through. *(Text as per `redlines/v5.1-galascope-agreed-redlines-may2026.md` §1.)*

---

## 2. Confirmed Price — §6.1(g) Price Basis Certificates (carried; unchanged)

Add §6.1(g): Indicative Price Basis Certificate at signing + Delivery Price Basis Certificate at delivery; full Mysteel + EUR/CNY index values and calculation shown; 14-day client query. *(Text as per v5.1 redline §2.)* Schedule A effective MWh: G1 **20.06**, G2 **10.03**.

---

## 3. NEW — Price Validity Long-Stop (add as §6.1(h))

> **(h) Validity Long-Stop.** Where the Client receives Connection Terms **within six (6) months** of the Effective Date, the Confirmed Price is set under sub-clauses (c)–(d) (two-way adjustment; upward movement capped at five percent (5%); downward movement passed through in full on milestones not yet invoiced). Where Connection Terms are received **more than six (6) months** after the Effective Date, the Contractor shall obtain a refreshed OEM quotation and **re-anchor** the Indicative Price and reference indices to the month of that refreshed quotation; the same two-way adjustment and 5% cap then apply from the re-anchored basis. Either Party may terminate under Section 6.1(d) if the resulting upward adjustment would exceed five percent (5%).

**Why:** the Jan-2026 quote and a 5% cap cannot survive a 9-month gap. This keeps treatment **symmetrical** (client gets downside, Contractor not stuck on a stale quote) and transparent via the Price Basis Certificate.

---

## 4. Planning — §5A.1(f) (carried; unchanged)

60-day reasonable endeavours, day-for-day extension for authority delay, reasonable + documented standby only. *(Text as per v5.1 redline §4.)*

---

## 5. Limitation of liability — §13.2 (carried; unchanged)

(a) Contractor EPC/installation/non-OEM works: **10%**; (b) other breaches: **50%**; (c) OEM manufacturing defects + fraud/wilful misconduct: **uncapped**. OEM equipment removed from the 10% tier. *(Text as per v5.1 redline §5.)*

---

## 6. NEW — Round-Trip Efficiency split (replace §10.6(b))

> **(b) Round-Trip Efficiency (RTE).**
>
> (i) **Equipment RTE (OEM-backed).** The OEM warrants RTE of **≥ 86.32%** measured at the **equipment terminals** (PCS AC output / battery DC boundary) under the test conditions in the Technical Agreement (0.5C, 25 ± 2 °C, defined SOC window), consistent with the OEM's isolated-equipment test data.
>
> (ii) **System RTE (Contractor).** Measured at the **AC point of connection**, the Contractor guarantees Equipment RTE **less a Balance-of-Plant loss allowance of [X.X]%** attributable to the Contractor-supplied MV cabling, transformer, and auxiliaries (the "System RTE Floor"), tested at PAC per Section 9.1 under the same conditions.
>
> (iii) The OEM Direct Warranty Undertaking and remedy under Section 10.6(d) apply to **Equipment RTE only**. Balance-of-plant losses within the Contractor's design are the Contractor's responsibility and are not an OEM warranty claim.

**Why:** RTE at the grid point depends on the cabling/transformer **Lighthief** supplies as EPC; the OEM only tests isolated parts. Splitting the boundary stops Lighthief guaranteeing a number the OEM won't back. **[X.X]% BOP allowance to be set from the as-designed cable/transformer losses (typ. 1–3%).**

SOH (§10.6(a)) and cycle life (§10.6(c)) remain OEM-backed unchanged.

---

## 7. APG — §10.9 (REVISED this round — KEEP PAC EXPIRY; supersedes the "port expiry" draft)

> **(b) Beneficiary & basis.** The Contractor shall procure that the OEM's bank (Bank of Communications) issues a first-demand Advance Payment Guarantee under URDG 758 naming **Galascope Ltd (HE 303759) and/or its project-finance security agent as beneficiary**, issued on the basis of both the EPC Agreement and the OEM Sales Contract. The APG amount equals **100% of the advance under the OEM Sales Contract**.
>
> **(d) Validity — expiry at PAC.** The APG shall remain valid until the **earlier of: (i) issuance of the Provisional Acceptance Certificate (PAC); or (ii) twelve (12) months after delivery of the equipment to Site**, after which it expires automatically; upon issuance of PAC the APG is released. This keeps the advance-refund cover **alive through commissioning**, when latent equipment faults are typically discovered.
>
> **(e) Trigger.** A demand may be made where the OEM has failed to refund the Advance Payment when due under the Sales Contract, **including on the Client's rejection of equipment that fails to deliver conforming/functioning performance at commissioning** (see Section 9 rejection window and §13/Sales carve-out for confirmed manufacturing defects).

> **§10.9A — Security layering alongside the APG.** Through to PAC the Client is protected by, in combination: (a) the **APG** (advance refund, to PAC / 12 months — clause (d)); (b) **CAR / erection all-risks insurance for the full replacement value** from arrival at the discharge port through installation to PAC (Section 14) — note the **sea voyage is covered by the OEM's CIF marine insurance**, so the Contractor's policy runs **from port of discharge**, not the voyage; (c) the **OEM 5% performance guarantee** to the end of the Defects Liability Period; (d) the **Retention** (Section 7.4); and (e) the **OEM Direct Warranty Undertaking** and 5-year product warranty (Section 10.8). The flow is illustrated in the Annex "Ownership & Guarantee Flow".

**Drafting comment (carry into the pack for Galascope):**
> *The APG is kept alive to PAC (or 12 months after delivery) so that, if a material proportion of the equipment is found defective at commissioning, the advance can be recovered — this bridges the gap left by the OEM warranty's 10% liability cap (see Section 11). Insurance for the sea leg sits with the OEM under CIF; the Contractor's CAR/erection policy covers from port of discharge to PAC.*

---

## 7A. NEW — Factory Acceptance Test (FAT) as the primary >10% defect remedy (add to §8 / Schedule A; client highlight)

> **8.x Pre-Shipment Inspection / FAT.** Before any equipment is despatched and before the pre-shipment milestone (Section 7.1(b)) is paid, the Client and/or its appointed third-party inspector may inspect and witness factory acceptance testing of the equipment at the OEM's facility on ten (10) Business Days' notice. **Where the FAT reveals defects or non-conformity, the OEM/Contractor shall remedy them at no additional cost before shipment, and the Client may re-inspect.** Pre-shipment payment is conditional on a passed FAT.

**Why this is the key protection (client highlight):** the FAT catches defects **before** the Client pays the 55% pre-shipment milestone and **before** the goods ship. It is the primary defence against the ">10% of equipment faulty" scenario, because it stops payment for, and shipment of, defective equipment in the first place — ahead of, and stronger than, the OEM warranty's 10% liability cap. Mirrors proposed **Sales Contract Section 18 (Pre-Shipment Inspection)**.

---

## 7B. NEW — Extended rejection window (amend §9 / Sales §5)

> **Rejection window to commissioning.** The Client's right to inspect and to give notice of defect or non-conformity, and the associated repair/replace/refund remedy, shall extend until **commissioning / PAC**, and shall **not** be limited to thirty (30) days after delivery. For non-conformity affecting **[10]% or more** of installed capacity discovered up to PAC, the Client may require repair or replacement, or **reject the affected equipment and require refund of the corresponding price** (recoverable, where unpaid, under the APG per §10.9(e)).

**Why:** the OEM's standard 30-day-from-delivery inspection window typically **closes before commissioning**, when faults actually surface. Extending it to PAC — and giving the Client (not only the OEM) a refund right above a defect threshold — is what makes the APG a real backstop for the >10% case. **Upstream item:** requires Linyang to accept the extended window + buyer refund right in the Sales Contract.

---

## 8. DWU — DWU-1 / DWU-2 (carried; unchanged from v5.1 redline §6)

§1.1 Warranty Start = PAC logic; §4.1(e) 60-day dispute direct-claim trigger; §3.2 insolvency direct claim = replacement modules CIF Limassol + reasonable technical training to client's O&M provider (no third-party install labour upstream — Lighthief covers install labour under EPC §10.1 / LTSA). **Signed & sealed by Linyang at the order trigger, alongside the Sales Contract.**

---

## 9. Licensing (carried; unchanged)

Installation works performed suitable for compliance with Cyprus energy-storage licensing/permitting within the Contractor's scope. ETEK installer sign-off included; licensed design / as-built drawing packages excluded (client engineer). *(Text as per v5.1 redline §7.)*

---

## 10. NEW — Grid-forming (VSG) & Black Start — NOTE TO CLIENT + scope option

**Status:** The Kehua C-series PCS supplied is **hardware-capable** of virtual synchronous generator (VSG / grid-forming) operation and black start; these are **firmware-enabled**. The current **Technical Agreement V2.1 excludes** VSG and black start. To be added by **technical-agreement amendment after review.**

**To verify before committing date/price (external):**
1. **DSO / Connection Terms** — is grid-forming **mandatory** for this Category B site? If mandatory → enable and test **pre-ship at FAT** (do not rely on OTA at commissioning). If optional → offer as a client option, OTA-capable.
2. **Linyang / Kehua** — confirm any **firmware licence/activation fee** and warranty impact. **Hardware is identical**, so the equipment price should be unchanged.
3. **Timing** — pre-ship (verified at FAT) preferred; OTA later only if the DSO permits.

**Suggested EPC scope line (assumption/option, price-neutral on hardware):**
> The PCS supplied is capable of grid-forming (VSG) and black-start operation via firmware. Activation, test point (FAT or OTA), and any OEM firmware licence fee shall be confirmed by amendment to the Technical Agreement following the technical review and confirmation of the applicable DSO grid-code requirement. Hardware is unaffected.

---

## 11. NEW — OEM 10% warranty cap & manufacturing-defect carve-out (disclose + upstream)

**Issue:** Linyang's standard terms cap warranty liability at **10%** — Warranty Manual v2 §XI ("any and all warranty services and related costs … 10% of the payment for the defective Products") and Sales Contract §8B.1 / §9. EPC §13.4 promises the Client **uncapped** OEM manufacturing-defect cover, so as drafted there is a gap the Contractor/insurer carries.

**Fix (already drafted in `legal/linyang sales - COMMENTS.md`, not yet signed by Linyang):**
> **§8B.2 / §9.4 Manufacturing Defect Carve-Out.** Notwithstanding the 10% cap, for **confirmed manufacturing defects** the Seller bears the **full cost of repair or replacement, including shipping to CIF Limassol**; the 10% cap does not apply.

**Action:** (a) get Linyang to accept §8B.2/§9.4 in the Sales Contract; (b) mirror the carve-out in the DWU so the Client's direct-enforcement right is not capped at 10%; (c) until accepted, disclose to Galascope that uncapped manufacturing-defect cover depends on this carve-out, with the FAT (§7A) and APG-to-PAC (§7) as the primary protections in the interim.

---

## Open items requiring external confirmation (not blocking EPC signature)

| Item | Owner | Needed by |
|------|-------|-----------|
| DSO: is VSG mandatory for this site? | Client / DSO | Before FAT |
| Linyang/Kehua: VSG firmware fee + pre-ship vs OTA | Lighthief ↔ Linyang | Before FAT |
| Linyang/BoC: confirm APG **PAC / 12-month expiry** + **Galascope beneficiary** + broadened trigger (§10.9(e)) + fee/timeline | Lighthief ↔ Linyang | At order trigger |
| Linyang: accept **extended rejection window to PAC + buyer refund right** (§7B / Sales §5) | Lighthief ↔ Linyang | At order trigger |
| Linyang: accept **manufacturing-defect carve-out §8B.2/§9.4** (uncapped repair/replace) | Lighthief ↔ Linyang | At order trigger |
| Linyang: confirm **FAT / Pre-Shipment Inspection (Sales §18)** with buyer/third-party witness | Lighthief ↔ Linyang | Before pre-shipment |
| CAR / erection all-risks: full replacement-value cover **port-of-discharge → PAC** (sea leg = OEM CIF marine) | Lighthief ↔ broker | Before delivery |
| §10.6(b) BOP loss allowance **[X.X]%** | Lighthief engineering | Into v6 before signing |

---

*Lighthief Cyprus Ltd · HE 477423 · office@lighthief.com · +357 99 164 158 · solarfarms.cy*
