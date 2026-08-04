# Stelios Constantinou — EPC v6.2 Track-Changes Triage
**Author of changes:** Stelios Constantinou (Galascope) · July 2026  
**Source file:** `Galascope-Client-Package-v6.2/new changes 6.2/01-EPC-Agreement-Galascope-G1-G2-v6-jun2026 Galascope track changes.docx`  
**Comment:** 57 insertions / 9 deletions / 1 comment  

---

## Status legend
- **ACCEPT** — implement as Stelios requests.
- **COUNTER** — include but with our modification.
- **NEEDS-COSTAS** — technical question; hold until Costas/Linyang confirm.
- **PLACEHOLDER** — "to be included/updated" markers; resolve during v6.3 drafting.

---

## Triage Table

| # | Clause context | Stelios's request | Status | Action / Response |
|---|---|---|---|---|
| 1 | §4.5 excluded items | Add note: "to add milestones and works and link it to the payments" | **ACCEPT** | Milestone annex being added (see Part B). Add cross-reference in §4.5 to the EPC works milestone schedule in Annex. |
| 2 | §5A.3 / Client obligations (d) Provide secure storage | Add: "(existing fencing and alarm system is satisfactory)" | **ACCEPT** | Add parenthetical note confirming Galascope's existing site security is sufficient; no additional works required. |
| 3 | §5A.3 (e) Client obligation — electrical connection | Add "Obligation to" prefix | **ACCEPT** | Minor clarification; acceptable. |
| 4 | §5A.3 (a) Operate BESS per OEM guidelines | Add "LTSA and EMS" cross-reference | **ACCEPT** | Confirms that BESS operation under OEM guidelines is managed via LTSA and EMS; consistent with existing §5A.3 / LTSA §12.5A. |
| 5 | §5A.3 (b) Maintain monitoring systems | Add "LTSA and EMS" cross-reference | **ACCEPT** | Same as above; monitoring managed via the LTSA/EMS architecture. |
| 6 | §5A.3 (e) Make all payments when due | Add "linked to the agreed milestones" | **ACCEPT** | Ties client's payment obligation to the milestone schedule (Part B). |
| 7 | §17 Late-payment interest (EU Dir 2011/7/EU) | Change ECB + **8%** → ECB + **3%** | **ACCEPT** | ECB+3% is below the statutory default (ECB+8%) but is negotiated; Lighthief accepts the lower rate. (Note: this reduces Lighthief's late-payment entitlement if client pays late — minor impact.) |
| 8 | §7.1(b) Pre-shipment payment trigger | Add: "and Client or his representative joint" — i.e., joint Client inspection/sign-off required | **ACCEPT** | Client or representative co-signs the FAT acceptance. Consistent with §1A.5B and §10.6A (witnessed testing). Supervising engineer Aioliki/Glekas (per Andri's APG comment). |
| 9 | §7.4 / DLP retention — performance guarantee | Add: "and EPC to provide a 5% performance guarantee for **9 months**" after retention release | **COUNTER** | We accept a 5% performance guarantee but counter the validity to **6 months post-PAC** (3 months DLP + 3 months additional PG cover post-DLP). 9 months not supportable by current OEM PG structure (OEM PG valid to DLP end). Counter: extend OEM PG validity by 3 months or issue a Lighthief corporate PG for the additional 3 months. |
| 10 | §8.4 Target PAC | Add: "90 or 120 day timeframe at the worst case scenario, exact dates to be defined at physical order" | **ACCEPT** | Consistent with the Delivery Schedule confirmed at Connection Terms. Add wording: Target PAC shall be achieved within [90] calendar days of equipment delivery to Site (worst case [120] days); exact dates defined in the Delivery Schedule issued at Connection Terms. |
| 11 | §9.1(a) PAC capacity criterion | Change 95% → **98.50% (State of Health)** and add "(what is the remedy if less)" | **ACCEPT** | Raises the PAC floor from 95% to 98.5% (consistent with Year-0 SOH = 98.5% per Atlantic 5 datasheet / Schedule 5). §9.1B shortfall remedy already provides the answer to "what is the remedy if less" — add a cross-reference: "if the measured SOH is below 98.5% but above the PAC hard floor, §9.1B applies." |
| 12 | §10.5 battery warranty conditions | Minor punctuation correction | **ACCEPT** | Trivial; accept. |
| 13 | §10.5 / §11 relationship | Add: "For as long as the O&M of the BESS system is being carried out under a confirmed LTSA with the Contractor, the responsibility for the above lies with the Contractor and any remedies for failure in above are provided in the LTSA." | **ACCEPT (concede-capped)** | This is the §11 park-performance point. Per agreed decision: concede partially — EPC acknowledges that while LTSA is in force the Contractor holds park-performance responsibility and the primary remedies are in the LTSA; but overall EPC liability cap (§13.2) is retained. Implement as §11 redraft (see separate task). |
| 14 | §10.6 SOH guarantees — Year 5 / Year 10 / Year 15 | Change: Year 5 ≥85% → **≥86.78%**, Year 15 ≥70% → **≥73.61%**; add "As per the attached table in Annex ?" | **NEEDS-COSTAS** | Stelios's Y5 (86.78%) and Y15 (73.61%) are **above** the OEM 1-cycle/day reference curve (Y5 = 86.26%, Y15 = 72.45%) — we would guarantee more than the OEM data supports. Need Costas/Linyang to confirm whether these specific values are in any Linyang-issued degradation curve document for this project. Until confirmed: counter with OEM-reference values (Y5 ≥86.26%, Y10 ≥79.58% [unchanged], Y15 ≥72.45%). Also accept adding the full annual SOH table in Annex (already drafted in Schedule 5/LTSA). |
| 15 | §11 heading | Add note: "Should be redrafted as we cannot accept separation of responsibility and remedies when it comes to park performance which is inevitably linked to EPC performance not just O&M" | **ACCEPT (concede-capped)** | Captured in §11 redraft. Heading changed from "LTSA SEPARATION" to "Relationship with the LTSA and Companion Documents" in v6.2; §11.1 further updated (see §11 task). |
| 16 | §12.1/§12.2 — sits between Force Majeure "Definition" and "Effect" | "To insert agreed addition" | **RESOLVED** | Exact clause location traced (paragraph immediately after the §12.1 FM exclusions list, before §12.2). This is the FM carve-out already agreed with Timotheos and implemented as Annex V6 §12.6 "Force Majeure — limitations" (v6.2): FM does not excuse amounts already due, warranty for pre-existing defects, APG-extension obligations, insurance maintenance, mitigation, or electronic document delivery. No further drafting needed. |
| 17 | §13.3(e) — sits directly after carve-outs (a)–(d) | "(e) to add items in TT comments" | **RESOLVED** | TT = Timotheos. Traced to the exact liability-carve-out list. His original ask (per the Dino/Anastasios decision log) was to uncap design/latent/firmware defects, cyber breach and regulatory non-compliance; negotiated down and implemented as Annex V6 §13.3A — uncapped for **latent defects** and **safety/grid-code non-conformity** only (firmware/software/design stay OEM-backed and capped). Already in v6.3. No further drafting needed. |
| 18 | §18 (data/GDPR/cyber) | "Agreed amendments to be added" | **RESOLVED** | Cyber/data clause §18A was added in Annex V6 (v6.2) and is in v6.3. |
| 19 | §19.11(b) — sits directly after "Contractor: All technical and regulatory responsibilities…" | "Agreed amendments to be added" (2nd occurrence) | **RESOLVED (high confidence)** | Traced to sit immediately after the Contractor's regulatory-responsibilities line. Matches Annex V6 §19.x "Licensing" (installer sign-off by Contractor's ETEK engineer included; licensed electrical design/as-built for the wider site excluded — Client's engineer), already in v6.3. Worth a one-line confirmation to Stelios but not a blocker. |
| 20 | Schedule A heading — sits directly under "SCHEDULE A — TECHNICAL SPECIFICATIONS…" | "TO BE INCLUDED HERE" | **RESOLVED** | Literal instruction to insert the Schedule A content at that point. The generator builds Schedule A Parts 1–6 (park details, price basis, technical spec, companion documents) at exactly this location. Structurally resolved. |
| 21 | Schedule A Part 2 — sits directly above the old "TOTAL INDICATIVE CONTRACT PRICE (ex VAT): EUR 3,444,300.00" line | "TO BE UPDATED" | **RESOLVED** | Flag on the stale total. Generator replaces this with the current EUR 3,462,849.40 figure (and the full decoupled Component A/B schedule). Resolved. |
| 22 | §10.9 APG clauses | "TO BE CONSISTENT WITH WORDING IN THE PAG [APG]" | **ACCEPT** | §10.9 APG clause wording shall be aligned with the final agreed APG instrument wording (per the bank-change instruction memo). Add cross-reference note in §10.9 to the agreed APG form. |
| 23 | §9.2A FAC | Add: "AN INDEPENDENT EXPERT TO VERIFY ALL MATTERS HAVE BEEN RESOLVED TO PROCEED WITH FAC SIGNING" | **ACCEPT** | Add to §9.2A (FAC): FAC sign-off requires acceptance in writing by the Client or its Independent Engineer (consistent with §7.1A PAC-payment gate). Already in §10.6A (witnessed testing) — add a cross-reference in §9.2A. |
| 24 | System underperformance | "REMEDY IN CASE OF SYSTEM UNDERPERFORMANCE" heading inserted | **ACCEPT** | Add a cross-reference heading/clause pointing to §9.1B (PAC shortfall remedy) as the primary remedy for system underperformance at or after PAC. |

---

## Comment — VAT reverse-charge

**Source:** Stelios Constantinou comment in EPC  
**Text:** "The EPC services are subject to Cyprus VAT under the provisions of the reverse charge mechanism of article 11B of the VAT Law L. 95(I)/2000. As such Lighthief will not be charging us VAT for their services as EPC."  
**Status: ACCEPT** — Add a clause to EPC §7 or §17 (Taxes): EPC services provided by Lighthief Cyprus Ltd to Galascope Ltd are subject to Cyprus VAT on a **reverse-charge basis** under Article 11B of the Value Added Tax Law (L. 95(I)/2000). The Client is responsible for self-accounting the VAT; Lighthief Cyprus Ltd will not charge VAT on its invoice for EPC services. All EPC prices are exclusive of VAT.

---

## Open / Needs-Costas items

| # | Item | What is needed |
|---|---|---|
| 1 | SOH Y5 86.78% / Y15 73.61% | Confirm with Costas/Linyang whether these values are in a Linyang-issued project-specific degradation document. OEM reference (bess-degradation-analysis.py) shows Y5=86.26%, Y15=72.45% — Stelios's values are above these. |
| 2 | 5% PG for 9 months | Confirm with Linyang whether OEM performance guarantee can be extended from 3 months post-PAC to 6 months post-PAC, or if Lighthief Cyprus needs to issue a separate corporate PG for the additional 3 months. |
| 3 | Milestones "Annex ?" | Confirm annex number / designation for the EPC works milestone schedule (will be designated in v6.3 as Annex V6 / Schedule B). |
| 4 | ~~"To insert agreed addition" / "(e) to add TT items" / "TO BE INCLUDED HERE"~~ | **Closed 30 Jul 2026** — re-read the tracked-changes XML directly to find the exact paragraph each marker sits next to (rather than relying on visible text alone). All 6 markers (items 16, 17, 18, 19, 20, 21 above) map onto Annex V6 clauses already implemented from Timotheos's v6.2 comments (§12.6, §13.3A, §18A, §19.x Licensing) or are structural instructions the generator already fulfils (Schedule A content, updated total). Nothing outstanding — only item 19 (§19.11 Licensing match) merits a one-line confirmation to Stelios, not a blocker. |
| 5 | Supervising engineer | Confirm identity — Andri says "Aioliki/Glekas." Galascope to confirm which engineer will sign reduction certificates for APG No. 2 and PAC-related documents. |

---

*Prepared by Lighthief Cyprus Ltd internal team · July 2026 · INTERNAL — not for distribution*
