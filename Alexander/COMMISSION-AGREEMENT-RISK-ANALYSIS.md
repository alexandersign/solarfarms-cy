# Commission Agreement — Risk Analysis

**Agreement:** `commission-agreement-lighthief-moiostrov.html` (LCY-MOI-TOCA-2026-001)  
**Parties:** Lighthief Cyprus Ltd ↔ Moi Ostrov Ltd  
**Audience:** Alexander Papacosta (internal)  
**Status:** Working analysis — **not legal advice**. Review with Cyprus corporate counsel before signing or relying on this document.

---

## Executive summary

The draft is **strong on paper** (30% origination on 51 parks, 30% on future revenue, Protected Matter, UBO undertaking, audit rights, termination penalty). In practice, your biggest exposures are:

1. **You sign every side of the deal** — weakens enforceability and gives the founder/investor a **director-duty / related-party** attack path.
2. **Commission is calculated on Net Margin** — the founder controls **cost allocation** without needing to “cancel” the contract.
3. **Payment mirrors client cash** — if the company is illiquid or clients pay late, you wait; insolvency may leave you an **unsecured creditor**.
4. **Structural bypass** — revenue routed through **another group entity** or a **fund vehicle** not named as “the Company” may fall outside the agreement unless tightly drafted and monitored.
5. **Protections are conditional** — Annex A, Annex B, **Articles amendment**, and **Schedule 1** must be **executed and filed**; unsigned = mostly aspirational.

---

## How the fee works (baseline)

| Stream | Rate | Base | When due |
|--------|------|------|----------|
| **Part A — Origination Fee** | 30% | Net Margin on **Existing Project** (Schedule 1 parks) | Within 14 days of each **client payment** (pro-rata milestones) |
| **Part B — Team Operations Fee** | 30% | Net Margin / Net Revenue on **Future Business** | Same |
| **Existing vs Future** | Not cumulative | Part A only on Schedule 1; Part B on everything else | — |

**Net Margin** = Client Price − CIF Cost − EPC Cost (before overheads, tax, and the fee itself).

---

## Risk map — ways you lose out or payment is delayed/reduced

### A. Related-party / governance attacks (founder or future investor)

| # | Risk | How it happens | Why it hurts you | Draft mitigation | Residual gap |
|---|------|----------------|------------------|------------------|--------------|
| A1 | **Dual / triple signing** | You sign as LCY director, Moi Ostrov director, and (in Annex A) as signatory for **Lighthief International Ltd** | Courts/regulators may treat approval as **non-independent**; investor due diligence flags “self-dealing” | Recital (F), Clause 7, Annex A conflict waiver | Need **Sybaris/UBO signature** on Annex A, not only you; ideally **independent director** or shareholder resolution signed by UBO personally |
| A2 | **Related-party transaction challenge** | Shareholder or future investor claims consultancy fee is **excessive** or not arm’s length | **Section 202** (unfair prejudice) or derivative action to **rescind / reduce** fees | Commercial rationale clauses, 5-year term, penalty | Cyprus courts can still **adjust** related-party terms; “irrevocable” is not absolute |
| A3 | **Director duty claim** | Argument you breached **duty of care / loyalty** by committing LCY to 30% to your own company | Company (controlled by founder) sues **you** or seeks **repayment** of fees paid | Clause 7 disclosure, shareholder approval | Founder controls the company — **they choose whether to sue**; creates leverage in negotiation |
| A4 | **Investor refuses to acknowledge** | New 25% investor will not sign Clause **6.3** deed of acknowledgement | Investor pushes to **renegotiate or cap** “team consultancy” as condition of investment | 6.3 condition precedent, investment-options memo | If you need the €1M, investor has **leverage at signing** — before shares transfer |
| A5 | **Protected Matter never in Articles** | Clause 5.3(b) / 6.8 require **Articles amendment** — never filed at Registrar | Founder passes **75% special resolution** (if allowed) or uses **board control** to vary practice | Unanimous consent + Articles | **No Articles change = weaker protection** |
| A6 | **Annex B never signed** | Sybaris does not sign personal undertaking | No **personal enforcement** against UBO; only LCY (may be empty) | Annex B personal liability | Undertaking may still be **limited** vs insolvency; enforcement cost |
| A7 | **Agreement never executed** | “We’ll sign after the client contract” | **No contract = no entitlement**; verbal 30% worthless | — | Your current situation per founder behaviour |
| A8 | **Removal as director** | Founder removes you from LCY board (still shareholder control) | Fee **survives** (6.1) but you lose **visibility**, signing authority, bank access | 6.1 independent right, audit 4.3 | Harder to **monitor** margin calculations and client receipts |

---

### B. Margin engineering (legal ways to shrink the 30% base)

| # | Risk | How it happens | Example | What to add / monitor |
|---|------|----------------|---------|------------------------|
| B1 | **Inflate EPC Cost** | Book more into EPC Cost line than agreed in pricing model | Related-party subs, founder’s vehicles, “management charges”, excessive contingency | **Approved cost schedule per park** in annex; **cap** on related-party EPC unless board-approved; audit right (4.3) — use it |
| B2 | **Inflate CIF allocation** | Over-allocate equipment cost to high-margin parks | Shifts margin between parks | Per-park CIF from **Linyang invoice** tied to SSOT; no discretionary reallocation |
| B3 | **Reduce Client Price** | Renegotiate EPC down with client after your origination | Galascope-style margin compression (8–9%) | Fee on **executed contract price** unless **written variation** agreed with Consultant consent |
| B4 | **Unpaid / partial client invoices** | Invoice less than EPC contract value | “Credit notes”, scope reductions | Commission on **contractual entitlement**, not only cash received — *not in current draft* |
| B5 | **Cost timing** | Front-load costs before revenue; show zero/negative margin in a quarter | Cash pressure on Moi Ostrov while LCY holds cash | Quarterly true-up (4.2) + **minimum fee accrual** clause — *not in current draft* |
| B6 | **Corporate overhead in EPC** | Finance/legal/marketing allocated to project EPC Cost | Reduces Net Margin | Definition says EPC Cost is **enumerated list** — argue **overheads excluded**; clarify in Schedule 2 |
| B7 | **Warranty / retention disputes** | Client withholds 5–10%; PAC delayed | Your 30% on withheld portion **delayed** | Mirror client payment is intentional — accept delay or negotiate **partial advance on accrual** |
| B8 | **LTSA / O&M separated** | Long-term service revenue booked low or in different entity | Part B Net Revenue on O&M — but if **another company** bills O&M, fee lost | Define “Company” includes **LTSA billing entity** or require all BESS revenue through LCY |

---

### C. Structural bypass (revenue never hits Lighthief Cyprus Ltd)

| # | Risk | How it happens | Impact |
|---|------|----------------|--------|
| C1 | **Newco / parallel vehicle** | Future EPCs contracted with **new 100% Sybaris company** | Part B fee on “Company” only — **zero** if not LCY |
| C2 | **Lighthief International / Poland / EU entity** | Group entity signs EPC or import contract | Same — outside agreement |
| C3 | **Fund / GP structure** | EPC with **fund SPV**, management fees to **GP Ltd**, not LCY | Part B lists fund streams — but only if **LCY is the contracting EPC** |
| C4 | **Asset sale / business transfer** | Sell pipeline or “project management” to affiliate without **deed of assumption** | 6.2 requires assumption — if not done, buyer has no obligation |
| C5 | **Client pays affiliate** | Client instructed to pay **Lighthief International** or equipment-only split | No client receipt at LCY → **no fee trigger** (Clauses 2.3, 3.4) |
| C6 | **Equipment-only / client-as-importer** | Restructure so LCY only does thin install margin | Smaller Client Price and Net Margin |
| C7 | **Hive-down / liquidation** | Wind up LCY after extracting assets | You rank as **unsecured creditor**; priority clause (6.5) may not bind liquidator in full |

**Mitigation to negotiate:** “Company” = LCY **and any affiliate performing BESS EPC/LTSA for Schedule 1 or Future Business”; **anti-circumvention** clause; **fee on group consolidated BESS margin** if work is diverted.

---

### D. Cash and insolvency (cannot pay vs will not pay)

| # | Risk | Mechanism |
|---|------|-----------|
| D1 | **Mirror client payments** | No client cash → no fee due (by design). Signing → first milestone can be **3–4 months**. |
| D2 | **Company illiquid** | LCY pays payroll, Trikkis, VAT, Linyang before your fee despite 6.5 “priority” | Priority clause is **contractual** — does not create **statutory charge** over assets |
| D3 | **Insolvency / bankruptcy** | LCY insolvent; liquidator pays **preferential creditors** first | Your fee = **ordinary unsecured** unless secured (not in draft) |
| D4 | **Disputed margin** | Company withholds fee pending “review” of EPC Cost | 6.4 no set-off helps — but **delay** until arbitration |
| D5 | **Termination penalty worthless** | 3× average fee penalty (5.5) — if company has **no assets**, judgment uncollectable |
| D6 | **Dividends before fee** | Founder extracts cash via **shareholder loan repayment** or related-party invoices | 6.5 prohibits dividends until fee paid — **monitor accounts** |

---

### E. Scope gaps — clients / parks you think are covered but may not be

| # | Gap | Detail |
|---|-----|--------|
| E1 | **Parks after agreement date** | Existing Project = Schedule 1 + parks **originated by you before agreement date**. New park after signing → only Part B if in LCY |
| E2 | **Schedule 1 accuracy** | Must match **live SSOT** (51 parks, names, groups). Missing park = no Part A |
| E3 | **“Originated or introduced” disputes** | Founder claims client was **his relationship** or **ABIO aggregator** not you | Need **introduction register** + emails; Culvera introducer agreement is **separate** (10% / tiered), not your 30% |
| E4 | **Affiliated entities** | Schedule 1 lists groups — dispute if project sits in **SPV not listed** |
| E5 | **PV / small works** | Agreement is **BESS-focused**. PV-only revenue may be argued out of scope |
| E6 | **Part A vs Part B** | Existing Project pays **once** (Part A). You do **not** get 60% (Part A + Part B) on same park |

---

### F. Team Operations Fee pool — internal leakage

| # | Issue | Detail |
|---|-------|--------|
| F1 | **Not all 30% is yours** | Clause 3.2: Director distributes Team Ops Fee to **team at discretion** | Economically correct for Part B narrative — but if you intended **personal 30%**, Part B wording is **team pool**, not “Alexander 30%” |
| F2 | **Sub-team commission policy** | `team/policies/unified-commission-structure.md` (LCY-COM-001) pays **Andreas/Costas/Zinovia** on closed projects | Company may argue your 30% **includes** their commission — **double payment** dispute |
| F3 | **Payroll overlap** | Your LCY salary + socials may be argued as **already compensating** operational role | Keep salary **base only**; commission in **Moi Ostrov invoice** |

---

### G. Tax and recharacterisation

| # | Risk | Detail |
|---|------|--------|
| G1 | **Employment recharacterisation** | Tax authority treats 30% as **employment income** not consultancy | Moi Ostrov invoices + VAT; separate employment contract with **low base** |
| G2 | **Transfer pricing** | Large fee to Moi Ostrov (you 100%) challenged | Arm’s length study / comparable PM rates |
| G3 | **Withholding** | Cross-border elements if invoicing changes | Accountant review |
| G4 | **Dividend vs fee** | If you upstream from Moi Ostrov as dividend | Personal tax timing — not founder attack but **net loss** |

---

### H. Enforcement cost and delay

| # | Issue | Detail |
|---|-------|--------|
| H1 | **ICC arbitration Limassol** | Clause 10.2 — costly, slow (months–years) | Budget for legal fees; interim relief 10.3 |
| H2 | **Specific performance uncertain** | Courts may award **damages** not ongoing 30% | Penalty 5.5 helps but collectability issue |
| H3 | **Confidentiality** | Clause 9 — limits disclosure in disputes | Use permitted disclosures for advisers/counsel |
| H4 | **Moi Ostrov standing** | Creditor sues — need **clean books** at Moi Ostrov | Keep fee accrual schedules |

---

## Founder playbook — likely legal moves (in order of probability)

1. **Delay signature** until after client EPC signed — keeps arrangement informal.  
2. **Never sign Annex B** — removes UBO personal hook.  
3. **Skip Articles amendment** — Protected Matter exists only in contract.  
4. **Argue margin** — inflate EPC Cost, dispute Net Margin per park (B1–B6).  
5. **Route new work elsewhere** — fund, International, newco (C1–C3).  
6. **Bring investor** — force renegotiation of “excessive” consultancy (A4).  
7. **Section 202 / unfair prejudice** — if investor minority (after dilution).  
8. **Director duty / related-party** — threaten claim you breached duties (A3).  
9. **Starve cash** — pay suppliers/VAT first; you wait for milestones (D1–D2).  
10. **Insolvency threat** — empty company, related-party creditors paid first (D3).

---

## Critical fixes before signature (priority order)

| Priority | Action | Why |
|----------|--------|-----|
| **P0** | **Sybaris signs Annex B** personally (not just you on Annex A) | Personal enforcement + voting undertaking |
| **P0** | **UBO / Lighthief International** resolution signed by **Sybaris or authorised sole director** — verify who can bind shareholder | Annex A currently shows **you** signing for shareholder — confirm authority |
| **P0** | **File Articles** with Protected Matter + unanimous consent for consultancy | 5.3(b), 6.8 |
| **P1** | **Schedule 1** locked to SSOT export (`portfolio-data.ts` / v5 adders) — every park named | Part A scope |
| **P1** | **Introduction register** — email log of every client to `office@lighthief.com` with date | E3 disputes |
| **P1** | **Anti-circumvention / group revenue** clause — fee if BESS work diverted to affiliate | C1–C3 |
| **P1** | **Related-party EPC cap** + pre-approved cost build-up per park | B1 |
| **P2** | **Independent witness / second board member** approves related-party deal | A1 |
| **P2** | **Accrual on signed contract** (optional) — partial fee when EPC signed, not only on cash | D1 |
| **P2** | **Security** — floating charge or escrow on first client receipts | D3 |
| **P2** | Clarify **Part B vs team pool** vs **your personal share** — if intent is 30% to you personally on all revenue, align wording with Part A style |

---

## What the draft does well

- **30% on 51-park portfolio** with named groups (Schedule 1).  
- **Future Business** broadly defined (fund, O&M, trading, new EPC).  
- **Audit rights** (4.3) and margin reporting (4.1–4.2).  
- **No set-off** (6.4), **payment priority** (6.5), **late payment** acceleration (8.2).  
- **Survival** if you leave board (6.1).  
- **Termination penalty** (5.5) — if enforceable and collectable.  
- **Investor acknowledgement** framework (6.3).  
- **Deed** execution — stronger than simple contract (if properly witnessed).

---

## Related files in repo

| File | Relevance |
|------|-----------|
| `Alexander/commission-agreement-lighthief-moiostrov.html` | Main agreement (moved from `legal/`) |
| `Alexander/DRAFT-OPTION-A-FOUNDER-RUNWAY-AND-MD-TERMS.md` | Lighter founder heads — 30% placeholder |
| `Alexander/DRAFT-OPTION-B-INVESTOR-PATH-AND-MD-CARVEOUT.md` | Investor path — €300k carve-out |
| `docs/internal/investment-options-comparison-feb2026.html` | Investor incentive to attack Moi Ostrov contract |
| `team/policies/unified-commission-structure.md` | Sub-team commission — potential overlap |
| `legal/introducer-agreement-culvera-holdings-lighthief.html` | Third-party introducer template (different economics) |
| `lib/portfolio-data.ts` | `EXPECTED_COMMISSION` — model only, not legal |

---

## Bottom line

You lose money or control not mainly because the founder **voids** the contract, but because:

1. It is **never signed** or **Annexes/Articles never completed**.  
2. **Net Margin is manipulated** through costs you do not control.  
3. **Cash never arrives** at LCY (client delay, insolvency, or diversion).  
4. **New revenue is structured outside LCY**.  
5. An **investor** reopens the fee as a condition of investment.  
6. **You signed all sides**, weakening independence and inviting **related-party** challenges.

**Next step:** Cyprus lawyer review with focus on **Section 202**, **related-party approval**, **Articles filing**, and **group anti-circumvention**. Do not sign client EPC until **P0 items** are done or you accept documented risk.

---

*Internal working document — Lighthief / Alexander folder — May 2026*
