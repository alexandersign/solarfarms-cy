# RFI — Linyang draft APG & Performance Bond wording (EPC v5 / Galascope)

**To:** Linyang Energy — Finance / Legal (Jiangsu Linyang Energy Storage Technology Co., Ltd)  
**From:** Lighthief Cyprus Ltd — Alexander Papacosta  
**Date:** May 2026  
**Ref:** Galascope Ltd BESS (G1 5 MW / 20 MWh + G2 2.5 MW / 10 MWh) · LCY-EPC-001 v5.0/v5.1 · Sales Contract 17 Mar 2026  
**Purpose:** Obtain **draft bank guarantee texts** for client and lender review — must align with executed EPC payment/security chain (Anastasis / Alpha Bank CPs).

---

## 1. Why we need this now

Our client (Galascope / Esperia) is reviewing the **EPC v5** pack. Their counsel and project lender require **readable draft wording** for:

1. **Advance Payment Guarantee (APG)** — upstream (Linyang → Lighthief)  
2. **Performance Bond** — upstream (Linyang → Lighthief), disclosed to client under EPC §10.9(f)

Internal Esperia notes (`contracts/notes/LCY-ESPERIA-INTERNAL-meeting-prep-20-May-2026.docx`) and **Anastasis v4.0 EPC comments** (resolved in v5) require:

- **Bank demand guarantees** — not corporate letters or “reservation on books only”  
- APG **before** equipment prepayments to Linyang (condition precedent)  
- Instruments acceptable to **Cyprus / EU banks** (English or bilingual; URDG 758 / ISP98 or clearly stated rules)  
- Amounts and expiry dates that **match** EPC §7.1 and §10.9 (Component A only; DLP = 3 months after PAC)

---

## 2. EPC v5 parameters (non-negotiable for client pack)

Please draft both instruments to these parameters. Source: `legal/templates/generate_epc_v5.py` §10.9 and §7.1.

### 2.1 Advance Payment Guarantee (APG)

| Parameter | Required value |
|-----------|----------------|
| **Beneficiary** | Lighthief Cyprus Ltd (HE 477423), Limassol, Cyprus |
| **Applicant / Obligor** | Jiangsu Linyang Energy Storage Technology Co., Ltd (or issuing bank on your behalf) |
| **Underlying contract** | Linyang Sales Contract dated 17 Mar 2026 (or current executed version) + Galascope batch PO reference |
| **Amount** | **100%** of all Component A prepayments actually made by Lighthief under the sales contract that correspond to client EPC milestones **(a) advance 30%** and **(b) pre-shipment 55%** on equipment — i.e. cover **85% of Component A Equipment Supply Price** (or confirm if you only cover 70% = your 20% advance + 50% pre-shipment under your payment split) |
| **Form** | **Unconditional, irrevocable, on-demand bank guarantee** (not corporate guarantee; not balance-sheet reservation) |
| **Issuing bank** | International bank acceptable in Cyprus/EU (name bank and branch before issuance) |
| **Condition precedent** | APG delivered and accepted by Lighthief **before** any Linyang equipment prepayment becomes due (mirror sales contract §9B.4) |
| **Validity** | From date of issue until **equipment delivered to Site (CIF Limassol unloaded) + 30 days** |
| **Reduction** | Pro-rata reduction on delivery / value of equipment shipped (if applicable, state mechanism) |
| **Governing rules** | URDG 758 (2010) or equivalent — state in draft |
| **Language** | English (or English + Chinese; English prevails for Cyprus review) |

**EPC cross-reference (client-facing promise):**  
Contractor procures OEM APG equal to advance + pre-shipment on **Component A only**; no APG on Component B (EPC services).

### 2.2 Corporate Performance Guarantee (not bank)

| Parameter | Required value |
|-----------|----------------|
| **Beneficiary** | Lighthief Cyprus Ltd (assignable to Galascope Ltd / lender on notice) |
| **Guarantor** | Jiangsu Linyang Energy Storage Technology Co., Ltd — **direct corporate obligation** |
| **Amount** | **5% of Component A Equipment Supply Price** |
| **Form** | **Corporate guarantee** (signed + sealed) — **not** a bank guarantee; **not** books-only internal reserve letter |
| **Issuance deadline** | No later than **1 month before** first equipment shipment |
| **Validity** | Until **end of DLP** = **3 months after PAC** |
| **Purpose** | Equipment delivery, materials/workmanship in DLP (per proposed §9B.2) |
| **Call** | Written notice + 30-day cure (immediate if insolvency/abandonment); payment within 30 days |
| **Backing** | RFI V3: OEM warranty reserve ~1.9%, AXA PL EUR 5M; **no parent guarantee** unless separately agreed |

**Note:** APG remains **bank guarantee** (§2.1). Linyang has indicated performance security is **corporate**, not bank — draft reflects that so Kamil can sign.

---

## 3. Galascope — indicative amounts (for draft schedules)

Insert exact figures from executed Schedule A / sales contract when sending.

| Park | Component A (equipment) indic. | APG @ 85% of Comp A | APG @ 70% of Comp A (if Linyang 20+50 only) | Performance bond @ 5% Comp A |
|------|-------------------------------|---------------------|---------------------------------------------|------------------------------|
| Galascope 1 | €[●] | €[●] | €[●] | €[●] |
| Galascope 2 | €[●] | €[●] | €[●] | €[●] |
| **Combined G1+G2** | €[●] | €[●] | €[●] | €[●] |

*Client EPC total (incl. services) is higher; guarantees above are **equipment leg only** per v5.*

---

## 4. Deliverables requested (checklist)

Please return within **[10] business days**:

- [ ] **Draft APG** — full text (Word/PDF), marked DRAFT, with bank header or template  
- [ ] **Draft Corporate Performance Guarantee** — full text (Word/PDF), marked DRAFT — Linyang sign+seal  
- [ ] **Bank comfort letter** or email from issuing bank confirming willingness to issue (if drafts are Lighthief-template pending bank fill-in)  
- [ ] **Fee schedule** — APG + PB issuance cost, validity extension cost, currency (EUR vs USD)  
- [ ] **Timeline** — draft → final → issue, and whether Sinosure/export credit affects wording  
- [ ] **Confirmation letter** signed by Linyang stating instruments are **bank guarantees**, not accounting reservations  
- [ ] **Call procedure** — address for demands, required documents, response time  
- [ ] **Assignment** — whether beneficiary may assign to Galascope Ltd / lender security agent (for Alpha Bank)  

---

## 5. Explicit exclusions (do not substitute)

The following **do not** satisfy this RFI or the client EPC:

- Internal “guarantee reserve” or **on-books provision only**  
- Bank performance bond (Linyang position is **corporate** performance guarantee only)  
- Parent company letter without bank instrument  
- Performance bond released at **PAC** only (v5 requires **DLP + 3 months**)  
- APG below **100%** of covered prepayments without written lender waiver  

---

## 6. What we will give Galascope / Anastasis while waiting

Attach to client email (no internal paths):

1. **EPC §10.9** extract (APG + Performance Bond) from v5.0/v5.1  
2. **Commercial summary** §5 — `docs/clients/lighthief-bess-epc-ltsa-commercial-summary-may2026.html`  
3. This RFI cover note: “draft bank wording pending from OEM; parameters fixed per EPC”  
4. Optional: **redacted** Poland BG samples as format reference only (non-binding) — per internal meeting note §7  

**Separate track (Lighthief → client):** If Alpha requires **contractor** APG/PB from Lighthief Cyprus, that is a **Bank of Cyprus** discussion — not part of this Linyang RFI.

---

## 7. Internal gates (do not pay Linyang until)

Per SSOT / meeting prep:

1. Executed sales contract + batch scope confirmed  
2. **APG in hand** — bank instrument, acceptable to counsel  
3. CAR/EAR construction insurance CP satisfied  
4. Performance bond **draft approved** and issuance date committed before first shipment  

---

*Lighthief Cyprus Ltd · HE 477423 · office@lighthief.com · +357 99 164 158*
