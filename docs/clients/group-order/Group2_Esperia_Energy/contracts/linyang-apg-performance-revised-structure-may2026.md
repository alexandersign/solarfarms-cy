# Linyang APG + Performance — revised changes & financial structure (Jun 2026)

---

## 0. UPDATE 11 Jun — DIRECT BENEFICIARY now possible (supersedes back-to-back/escrow)

**Linyang confirmed:** if the bank is given **both** (a) the EPC contract (Galascope–Lighthief) and (b) the Sales Contract (Lighthief–Linyang), **Bank of Communications can issue the APG with Galascope Ltd named as beneficiary from the outset.**

This is **original issuance naming the end-customer** — *not* transfer, *not* proceeds assignment, *not* a tripartite (all of which Tom refused on 3 Jun). It is the clean solution:

- The Chinese bank issues a **first-demand APG directly in favour of Galascope Ltd (and/or Alpha security agent)**.
- No Cyprus back-to-back APG and no escrow needed **for the equipment-leg advance**.
- The lender gets a **direct OEM-bank guarantee** — strongest possible form.

**Amount logic (unchanged):** the APG still secures the advance under the **Sales Contract** = **EUR 846,951** (100% of 30% advance on Component A). Galascope's EPC advance is **EUR 1,033,290** (30% of €3,444,300, incl. services). The **services-leg gap = EUR 186,339** is *not* covered by the OEM APG and must be handled separately (see §0.3).

### 0.1 How it works in practice (sequencing)

1. **Finalise both contracts** — EPC (Galascope–Lighthief) + Sales Contract (Lighthief–Linyang), with matching advance definitions.
2. **Provide both to BoCom** (the bank needs to see the advance-payment chain: Galascope → Lighthief → Linyang). Margins need not be exposed — the bank needs **parties, advance amounts, delivery/PAC milestones**, not Lighthief's markup. Provide a **clean execution copy** (or the price pages BoCom requires).
3. **BoCom issues APG** — beneficiary **Galascope Ltd (HE 303759)** and/or **[Alpha security agent]**, amount **EUR 846,951**, URDG 758, expiry **delivery to Site + 30 days / earlier of PAC or 12 months**.
4. **APG delivered to Galascope = condition precedent** to the advance becoming due.
5. **Advance flows:** Galascope → Lighthief → Linyang (same chain), now with the OEM bank standing directly behind the equipment advance for Galascope's benefit.

### 0.2 Avoiding double recovery (critical EPC clause)

Because Galascope is both (i) owed an advance refund by **Lighthief** under the EPC and (ii) beneficiary of the **OEM** APG, the EPC must state: **any amount paid to the Client under the OEM APG discharges, pro tanto, the Contractor's corresponding advance-refund obligation to the Client.** Otherwise Lighthief is exposed twice.

### 0.3 Services-leg advance — RESOLVED (client accepts equipment-only APG)

**Client confirmed (11 Jun):** EPC services (Component B) are **outside the APG**; Galascope accepts the APG secures **equipment (Component A) only** = **EUR 846,951**.

- **No escrow and no controlled account required.** The earlier €186,339 services gap is **accepted unsecured** by the Client.
- This matches the existing v5 wording ("No APG on Component B" — §10.9(e)). No double-layer needed.
- Only remaining mechanics: APG beneficiary = Galascope, amount €846,951, + the **pro-tanto discharge** clause (§0.2) for the equipment advance.

### 0.4 What this does to earlier options

- **Cyprus back-to-back APG** (`Cyprus-Back-to-Back-APG-Galascope-DRAFT-jun2026.docx`) — **no longer needed for the equipment advance**. Keep only if Alpha wants a Cyprus-law instrument for the **services-leg gap**.
- **Full €1M escrow** — **dropped**; replaced by optional small €186k controlled account.

---


**Context:** Linyang's Polish lawyer confirmed the **bank APG cannot be transferable** (Bank of Communications will not give URDG 758 Art. 33 transfer). We accept that upstream and solve transferability **downstream** with a separate Cyprus instrument.

**Linyang (Tom) answers — 3 Jun 2026 (all NO):**

1. *Assignment of proceeds to lender without transfer of beneficiary?* → **No** — if the bond is assigned, the beneficiary changes.
2. *Beneficiary stays Lighthief with a tripartite acknowledgment lender may receive proceeds?* → **No** — a bank guarantee is unconditional payment to the beneficiary; the bank will not commit to any third-party payment process.
3. *EU confirming / advising bank?* → **Bank-dependent**; beneficiary must call following the issuing bank's process — no committed EU confirming bank offered.

**Consequence:** The upstream Bank of Communications APG will be a **plain, non-transferable, non-assignable, Lighthief-only** instrument. The lender (Alpha) gets **no rights to it whatsoever** — not as transferee, not as assignee of proceeds, not via tripartite. It is **internal protection of Lighthief's advance to Linyang only**, and **cannot be shown to Alpha as part of the security package**, nor pledged to Bank of Cyprus as collateral.

**Decision:** Two-layer (back-to-back) structure — but the two layers are now **fully independent** (no security link between them).

```
 UPSTREAM (China)                    LIGHTHIEF                 DOWNSTREAM (Cyprus)
 Bank of Communications  ── APG ──►  Lighthief Cyprus  ── APG ──►  Galascope Ltd /
 (Applicant: Linyang)    non-transf.  (beneficiary)     1st-demand  Alpha security agent
 EUR 846,951 (30% Comp A)            counter-indemnity   EUR [●]    (beneficiary)
```

---

## 1. Upstream APG — `APG draft.docx` (Bank of Communications)

**Accept:** non-transferable; BoCom form; URDG 758; beneficiary = Lighthief only.

**Still must change before issuance:**

| # | Item | BoCom draft now | Change to |
|---|------|-----------------|-----------|
| 1 | **Beneficiary** | SUNCATCHER Engineering GmbH | **Lighthief Cyprus Ltd (HE 477423)**, Limassol |
| 2 | **Amount** | EUR blank | **EUR 846,951** = 100% of the **30% advance** on Component A (EUR 2,823,169) |
| 3 | **Demand basis** | “default in any obligation for which advance is made” | **Refund of the Advance Payment** when Applicant fails to repay per Contract (after 14-day call) |
| 4 | **Expiry** | blank, auto-null | **Earlier of (i) delivery to Site (CIF Limassol, unloaded) + 30 days; or (ii) hard longstop [●]** — *not* PAC |
| 5 | **Contract ref** | generic | **Sales Contract 17 Mar 2026** + Galascope G1/G2 PO |
| 6 | **Demand channel** | paper courier to Nanjing only | add **authenticated SWIFT** so a Cyprus demand is workable |
| 7 | **Reduction** | silent | confirm **no reduction on shipping docs alone** (reduce only on site delivery/acceptance, or not at all) |

**Drop all transfer/assignment language entirely.** Tom (3 Jun) confirmed BoCom will not allow transfer, proceeds assignment, or a tripartite acknowledgment. Accept a clean **Lighthief-only, non-transferable, non-assignable** instrument. It is now **internal Lighthief protection only** — do **not** reference it in the Alpha security package, and BoC **cannot** take it as collateral.

---

## 2. Performance security — Polish Solarfun template

**Wrong contract** — do not redline it. Replace with our **English Cyprus corporate performance guarantee** (`Linyang-Corporate-Performance-Guarantee-Galascope-G1-G2-may2026.docx`).

| Item | Polish return | Required |
|------|---------------|----------|
| Parties | Solarfun Poland → Warsaw SPV | **Jiangsu Linyang → Lighthief Cyprus** |
| Currency / amount | USD blank | **EUR 141,158** (5% × Component A) |
| Validity | **5 July 2031** | **3 months after PAC** (DLP end) |
| Law / disputes | Polish law, Warsaw arbitration | **Cyprus law / Cyprus courts** (court-enforceable for assignment to lender) |
| Transfer | none w/o consent | **Assignable to Galascope / security agent on notice** |
| Form | first-demand bank-style | **Corporate** guarantee, 30-day cure (insolvency immediate) |

*(If Linyang prefers their **first-demand** form, that is stronger for us — acceptable **only** if parties/currency/law/validity above are fixed.)*

---

## 3. Proposed financial instrument (downstream) — what we add

The lender gets its protection **only** from a Cyprus-issued instrument. The upstream BoCom APG is now **ring-fenced to Lighthief** and gives BoC **no collateral**, so BoC must underwrite Lighthief on its **own credit / cash margin** for the whole downstream amount.

### Option A — Cyprus back-to-back APG (lender's preferred form)
- **Lighthief** instructs **Bank of Cyprus** (or EU bank) to issue a **first-demand APG** directly to **Galascope Ltd / Alpha security agent** (beneficiary named from the start — no transfer needed).
- BoC's recourse is **Lighthief counter-indemnity + cash margin / facility only** — it **cannot** lean on the BoCom guarantee (Tom: no assignment, no tripartite).
- **Amount:** client advance = **30% × EUR 3,444,300 = EUR 1,033,290** (or **EUR 846,951** if lender accepts equipment-leg only).
- **Full collateral burden on Lighthief:** with no upstream credit support, BoC will likely require **cash cover / margin** for a large part of the amount — relationship is new (~€200k flows), so unsecured €1M is unlikely.

### Option B — Escrow (now the more realistic primary)
- Galascope advance into a **Cyprus escrow / controlled account**; released to Lighthief against CPs (delivery milestones, APG copy). Lighthief pays Linyang same-day.
- Avoids asking BoC to carry €1M unsecured **and** avoids tying up Lighthief cash as bank margin. Given Tom's answers, this is the **cleanest lender-acceptable route**.

### Option C — Lower advance / staged
- Reduce client advance %, or split into tranches sized to what BoC will issue — fallback if A/B stall.

**Ask Alpha (now the only open question):** is a **Cyprus escrow / controlled-account** structure acceptable as advance security, or does the lender insist on a **bank APG with the security agent as beneficiary**? Tom's answers rule out any hybrid that leans on the Chinese guarantee, so it is **escrow vs a Lighthief-collateralised Cyprus bank APG** — nothing in between.

---

## 4. Draft example produced

`Cyprus-Back-to-Back-APG-Galascope-DRAFT-jun2026.docx` — a **first-demand Cyprus bank APG** (Lighthief applicant → Galascope/Alpha beneficiary), URDG 758, Cyprus law, delivery+30 expiry. This is **self-standing** — the lender relies on it alone. **Do not** attach the BoCom upstream APG to the lender pack (Tom's answers mean it gives the lender nothing); keep it internal to Lighthief.

---

## 5. Email line to Linyang (revised — direct beneficiary)

> Thank you for confirming the bank can name the end-customer as beneficiary once it has both contracts. Please proceed on that basis: issue the APG with **Galascope Ltd (HE 303759)** [and/or its security agent] as **beneficiary**, amount **EUR 846,951** (100% of the 30% advance on Component A under the Sales Contract), URDG 758, expiry **earlier of PAC or 12 months after delivery to Site**. We will provide the executed **EPC (Galascope–Lighthief)** and **Sales Contract (Lighthief–Linyang)** to your bank. Separately, on performance security: the Polish Solarfun text is the wrong contract — please sign the attached **English corporate performance guarantee** (EUR 141,158, valid to 3 months after PAC, Cyprus law).

*Lighthief Cyprus Ltd · HE 477423 · office@lighthief.com · +357 99 164 158*

---

## 6. Contract changes to fit Anastasis 5.1 — given direct beneficiary

### 6.1 EPC §10.9 — rewrite (APG now to the Client directly)

This **exceeds** Anastasis/board item #4 (which only asked for the Client to receive a *copy*): the Client becomes the **beneficiary**.

> **10.9 Advance Payment Guarantee (APG) and Performance Bond**
> **(a)** The Contractor shall procure that the OEM (Jiangsu Linyang) arranges for its bank to issue an unconditional, irrevocable, first-demand **Advance Payment Guarantee** under URDG 758 in which **the Client (and/or the Client's project finance security agent) is named as beneficiary**, securing refund of the advance payment referable to the Equipment Supply Price (Component A). The Contractor shall provide the OEM's bank with such copies of this Agreement and the upstream supply contract as the bank requires to name the Client as beneficiary.
> **(b)** The guaranteed amount shall equal one hundred percent (100%) of the advance payment payable in respect of Component A (indicatively **EUR 846,951** for the Galascope batch).
> **(c)** The APG shall be delivered to the Client **before** the advance payment under §7.1(a) becomes due (condition precedent).
> **(d)** The APG shall remain valid until the **earlier of (i) issuance of PAC; or (ii) twelve (12) months after delivery of equipment to Site**, and shall be released automatically upon PAC. *(satisfies 5.1 redline item 3 / board #4)*
> **(e)** Any amount paid to the Client under the APG shall **discharge, to the same extent (pro tanto), the Contractor's obligation to refund the corresponding advance payment** to the Client under this Agreement (no double recovery).
> **(f)** The APG secures the **Equipment Supply Price (Component A) only**. The Client **acknowledges** that the EPC Services Price (Component B) is **not secured** by the APG or any other advance guarantee. *(Client confirmed 11 Jun.)*
> **(g)** Performance bond: **5% of Component A**, valid until end of DLP (three (3) months after PAC) — unchanged.

### 6.2 Sales Contract §9B.1 — mirror

> The Seller shall procure a bank APG for 100% of the advance, in which **the End-Customer (Galascope Ltd) and/or its security agent may be named as beneficiary** as the Buyer directs, valid until earlier of PAC or 12 months after delivery, demand procedure compatible with an end-customer call. Buyer/End-Customer to give the Seller 14 days' notice to refund before demanding.

### 6.3 Payment trigger / CP wiring (§1A.3, §7.1(a))

Advance becomes due on the later of (i) Effective Date; (ii) Connection Terms; **and (iii) delivery of the APG (beneficiary: Client) — confirm the 30-day trigger runs from the latest of these**, so the CP chain is non-circular.

## 6A. Breaking the chicken-and-egg (bank wants signed contracts; client wants APG draft)

**Deadlock:** Bank issues APG only after seeing signed EPC + Sales Contract; Dino wants to see the APG before signing the EPC. **Resolution — nobody goes first on risk:**

1. **APG is a CP to the *advance*, not to *signature*.** Dino signs the EPC, but **no advance is due and no money moves** until the APG (beneficiary Galascope) is delivered (§10.9(c)). Signing is therefore risk-free for the client.
2. **Give the client a specimen now.** `BoC-APG-Galascope-beneficiary-SPECIMEN-jun2026.docx` — the bank's own template recast with Galascope as beneficiary, €846,951, validity earlier of PAC/12mo. Send to Dino so he "sees the draft", and to Linyang for the bank to **pre-confirm wording**.
3. **Attach the specimen as an EPC Schedule** ("Form of Advance Payment Guarantee"). EPC §10.9(a): Contractor procures the APG **substantially in the form of that Schedule**. Now the signed form *is* what the client reviewed.
4. **Longstop / unwind protection.** EPC clause: if the APG (in the agreed form) is not delivered within **[30] days** of signature, the Client may terminate at no cost and any sums are returned. Removes the residual "what if the bank never issues" fear.
5. **Run in parallel:** finalise EPC redlines + Sales Contract + specimen confirmation simultaneously — do not serialise behind the bank.

**Sequence:** recast specimen (done) → Linyang/bank pre-confirm wording → attach as EPC schedule → Dino signs EPC (advance CP'd on APG, longstop protection) → signed EPC + Sales Contract to bank → bank issues APG (beneficiary Galascope) → advance becomes due → flows.

### 6.4 Still-open 5.1 EPC items (independent of APG — from prior gap review)

These remain to land in `generate-contracts-v5.1-may2026.py` regardless:

1. **§8.4.7A** — upgrade simplified FM to the **full dispute mechanism** (10 BD contest, 30-day → §15.3, no extension during dispute, challenge weak OEM notices).
2. **§6.1(g)** — add **Price Basis Certificates** (Indicative at signing + Delivery), 14-day dispute each.
3. **§5A.1(f)** — add **planning** (60-day endeavours, day-for-day, documented standby only).
4. **§13.2(a)** — fix wording: remove **OEM equipment** from the 10% tier (it is uncapped under (c)).
5. **Licensing** — add Cyprus licensing/permitting-suitability clause to §19 / Schedule A.
6. **DWU** — warranty start, §4.1(e), §3.2 insolvency training (separate docs, pre-condition).
