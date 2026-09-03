# Stelios — SCC Call Comments (31 Jul 2026 evening) — Triage

**Source:** `/Users/alex/Downloads/01-EPC-Agreement-Galascope-G1-G2-v6.3 SCC CALL COMMNETS .docx`
Tracked changes by **Stelios Constantinou**, timestamps 2026-07-31 16:33–18:35 (i.e. made *after* the v6.3 package was sent — this is a new, live redline round from a call, not the earlier Jun/Jul redlines already triaged).

**Context shift driving this round:** the deal structure is moving from *"sign EPC now, Companion Documents (LTSA/DWU/APG/Technical Agreement/EMS) as Conditions Precedent to the advance payment"* to *"finish and sign all documents (EPC, LTSA, DWU, EMS, Technical Agreement) together, with Order Date = the date of signing."* Several items below (1A.8, the Effective Date → Order Date sweep) are the contract-drafting consequence of that shift.

No comment bubbles in this file — all input is via Word tracked changes (ins/del), all attributed to Stelios Constantinou (some are visibly relaying Anastasios's or Demos's input, flagged in the item itself, e.g. "FROM ANASTASIS", "DEMOS TO CONFIRM").

---

## Part A — Items that are explicitly or substantively LTSA-relevant

| # | EPC clause (source) | What Stelios/team asked | LTSA impact / current LTSA state | Action needed |
|---|---|---|---|---|
| A1 | §4.4B — End-to-end interface responsibility | Comment: **"SHOULD BE THE SAME IN THE LTSA."** | Checked LTSA v6.3 — **no equivalent clause exists today.** LTSA has the EMS-affiliate warranty/availability carve-out (§8.x, "(e) Downtime caused by EMS or third-party system failures — except... attributable to DISPERON...") but nothing stating the Service Provider remains responsible for end-to-end BMS/PCS/SCADA/EMS interface compatibility even if an affiliate/subcontractor fails. | **New LTSA clause needed** — mirror EPC §4.4B into the LTSA (new sub-clause, e.g. under §5 Service Provider Obligations). |
| A2 | New §1A.8 — Condition subsequent (Companion Documents), "FROM ANASTASIS" | LTSA (Ref. LCY-LTSA-GAL-2026) is listed as Companion Document (a)(i) — must be "agreed and executed... on or before [Documents Long-Stop Date]" or the **entire EPC becomes void ab initio** at Client's election. | Structural: changes the *legal mechanism* gating LTSA execution — from "CP to advance payment" (current §1A.5A) to "condition subsequent with a hard Documents Long-Stop Date and a walk-away right." This is a big step up in consequence for late LTSA execution. | Confirm this supersedes (or sits alongside) §1A.5A; needs a Documents Long-Stop Date to be filled in (currently "[●] 2026" placeholder); LTSA itself may need a cross-reference to §1A.8. |
| A3 | §10.5A — Warranty-void carve-out (EMS/monitoring) | Insertion: DISPERON described as EMS provider **"AND RESPONSIBLE FOR EMS."** | LTSA's parallel clause (EMS-affiliate carve-out) doesn't yet carry this "and responsible for EMS" framing either. | Mirror the same phrase into the LTSA's EMS-affiliate carve-out for consistency once EPC wording is finalised. |
| A4 | §10.6-EXT — Extended BESS warranty | Insertion: **"DECISION TO EXTEND IS WITH CLIENT. SOH GUARANTEE IS 5 YEARS IF WE DO NOT EXTEND."** | This is Stelios/Anastasios's own team **confirming in writing** the exact ambiguity flagged internally today (EPC §10.6(a) only conditions Year 15, not Year 10, on the extension — inconsistent with §10.6-SOH/§10.6-EXT and with Linyang's own DWU §2.2). The extended warranty is delivered *through* the LTSA (Schedule 2), and the SOH curve itself lives in **LTSA §10.2 / Schedule 5**. | Fix EPC §10.6(a) to condition **both** Year 10 and Year 15 (not just Year 15) on the extension being purchased — and add the same explicit sentence ("decision to extend is with Client; SOH guarantee is 5 years if not extended") to **LTSA §10.2 / Schedule 5** so both documents say the same thing. |
| A5 | §7.1A / §7.4(b) — Interim performance guarantee | 9 months → **12 months**; "WAITING FOR LIGHTHIEF INTERNATIONAL BACK UP GUARANTEE" | Not an LTSA clause itself (Lighthief Cyprus corporate PG under the EPC), but ties to the broader "documents ready together" plan — the Lighthief International back-up guarantee (§16.3B) may now need to be finalised/signed alongside the LTSA rather than delivered later. | EPC-primary; flag as a dependency for the "sign together" timeline, not a direct LTSA text change. |
| A6 | Global — "Effective Date" → "ORDER DATE" (§6.1A, §6.1B, §6.1C, §10.10, and the new bare heading at old §3.1 "'ORDER DATE' MEANS" with **no definition text drafted yet**) | Consistent with signing-date-is-order-date structure. | LTSA currently defines its **own** "Effective Date" (LTSA recital, "made as of [●] 2026 ('Effective Date')") — under the new "sign everything together" plan this should now be the same date as the EPC's Order Date. | Once "Order Date" is defined in the EPC, cross-reference/align the LTSA's own Effective Date to it (or replace it with the same term) so the two documents don't run on two different clocks. |

---

## Part B — EPC-only items (no direct LTSA text impact, but material — flagging for visibility since this is the same call/document)

| # | Clause | Change requested |
|---|---|---|
| B1 | New §1A.8(a)-(e) | Full "condition subsequent" clause (see A2) — EPC voidable ab initio if any Companion Document isn't executed by the Documents Long-Stop Date. Client not obliged to accept any Companion Document; no waiver by part-performance/payment. |
| B2 | Schedule A note | Add "COMPLIANCE WITH EAC AND TSO REQUIREMENT WITH EPC" to the spec-freeze note. |
| B3 | §4.5 | Add note: **"ANNEX WITH THE DETAILED EPC WORKS"** — wants a full annex itemising the detailed EPC works scope (currently only a 7-item list at §4.2(d)-(j) plus §6.3). |
| B4 | §4.6 | Minor: "Schedule" → "4.6" cross-reference fix (self-correcting typo). |
| B5 | §4.6A(b) | Insert **"(DEMOS TO CONFIRM COST OF SWITCHGEAR AND MV MODIFICATION)"** — flags the €20,000–35,000 indicative MV switchgear variation-item price needs Demos's confirmation before finalising. |
| B6 | §6.1(a) | Insert **"SECTION 11B RULES APPLY"** right after the VAT-exclusive statement. |
| B7 | §7.2 / §7C / "Payments shall be made by bank transfer as follows:" | **Entire paragraphs deleted** — the detailed Article 11B VAT reverse-charge text (§7.2) and the import-VAT/customs clause (§7C) were struck out in full, with no replacement text inserted in their place (only the short "SECTION 11B RULES APPLY" note landed at §6.1 instead, per B6). **This needs your explicit decision** — do we consolidate the VAT treatment down to that one short line, or was this an unintended over-deletion during editing? Recommend keeping the fuller §7.2/§7C legal language and only *adding* the short cross-reference at §6.1, not deleting the substantive clause. |
| B8 | §7.1 (payment schedule) | **A3 Delivery: 15% → 10%** (EUR 423,475.41 → EUR 282,316.94); **new stand-alone 5% Retention line added to Component A** (EUR 141,158.47, "released upon issuance of FAC at end of DLP") — i.e. Component A moves from a 4-tranche (25/50/15/10) to a 5-tranche structure (25/50/**10**/10/**+5% retention**), adding retention on the *equipment* side, not just Component B. This is a real commercial ask — retention security on equipment, funded by trimming the Delivery tranche. |
| B9 | §8.1 | **Incoterm change: CIF Limassol → DDP to Client Site.** Major — shifts responsibility/cost/risk for the final transport leg, customs, and on-site delivery from the Client-adjacent CIF handoff at the port all the way to the Client's site, onto the Contractor. Has ripple effects on §7.5 (Title and Risk Transfer), §10.9A (APG/CAR insurance layering references "CIF Limassol"), and pricing. |
| B10 | §9.1A (PAC acceptance matrix) | Add item **"(J) FULL PASS OF THE SAT PROTOCOL"** — this is the missing SAT gate we flagged earlier today; client wants it explicit. |
| B11 | §9.2A (FAC) | **Delete** the Client's self-help fallback: *"If the Contractor fails to issue a FAC within thirty (30) days... the Client may issue the FAC itself and the Retention shall be released automatically."* — removing the Client's own automatic-release safety net. Worth querying why (may be an unintended casualty of other 9.2A edits, or a deliberate ask to tighten the FAC process). |
| B12 | §10.6(c) Cycle Life | "0.5C" → **"0.25P"** — same P-rate vs C-rate correction logic applied to cycle-life rating basis for consistency with the SOH curve fix. Needs a technical sanity check (cycle life is conventionally C-rate-referenced; confirm with Linyang/Costas before adopting). |
| B13 | §13.5 (Manufacturing-defect carve-out) | **"TIMOTHEOS LIST ADD HERE"** — explicit instruction to insert Timotheos's full carve-out list (design/latent/firmware/cyber/regulatory/grid-code/batch/safety-recall/serial defects — the list already surfaced in our redline-matrix review) directly into §13.5, going beyond the negotiated §13.3A (latent + safety/grid-code only). This reopens the C1 risk item we'd flagged as a "standing watch, not to reopen" — now the client side is actively asking to reopen it. |

---

## Bottom line for your ask ("track what LTSA changes Stelios requested")

**Only one item is an explicit, direct "do this in the LTSA too" instruction: A1 (§4.4B end-to-end interface responsibility — "SHOULD BE THE SAME IN THE LTSA").**

Four more items (A2, A3, A4, A6) don't say "LTSA" outright but **do** require an LTSA-side change to stay consistent with the EPC once implemented — A4 in particular is important because it's the client's own team confirming the exact SOH-conditionality ambiguity flagged to you a moment ago, and the fix needs to land in both the EPC (§10.6(a)) and the LTSA (§10.2/Schedule 5).

Part B is the much bigger bucket — 13 EPC-only items, several of them major (DDP incoterm change, new equipment-side retention tranche, the §1A.8 condition-subsequent restructuring, and the §7.2/§7C VAT clause deletion that needs your explicit sign-off before I treat it as intentional).

Given the scale of Part B, do you want me to proceed and draft all of these into the EPC now, or review Part B with you item-by-item first (especially B7 and B9, which materially change risk/cash-flow)?
