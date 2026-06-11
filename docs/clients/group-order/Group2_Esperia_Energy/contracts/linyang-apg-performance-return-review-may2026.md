# Linyang return — APG & performance security review (May 2026)

**Context:** Lighthief sent Galascope APG + corporate performance drafts; Linyang returned two documents from Drive.

| File | What it is |
|------|------------|
| `APG_Galascope_Linyang_DRAFT_30May2026.docx` | **Lighthief outbound draft** (Cyprus / Galascope / URDG 758 Art. 33) — not a Linyang redline |
| `APG draft.docx` | **Linyang / Bank of Communications** standard advance guarantee template |
| `SECURITY FOR PROPER PERFORMANCE…docx` | **Polish corporate performance bond** (Solarfun Poland → Warsaw beneficiary) — wrong deal |

---

## 1. APG — Bank of Communications (`APG draft.docx`)

### Critical blockers (must change before issuance)

| Issue | Linyang draft | Required for Galascope / Alpha |
|-------|---------------|--------------------------------|
| **Beneficiary** | SUNCATCHER Engineering GmbH | **Lighthief Cyprus Ltd** (HE 477423) |
| **Transferability** | “Shall not be transferred or assigned without our prior written consent” | **URDG 758 Art. 33** transfer + proceeds assignable to **Galascope Ltd** / security agent **without further bank consent** (one transfer) |
| **Demand channel** | Paper only via courier to Nanjing counter | SWIFT + Cyprus-presentable; lender-standard |
| **Demand basis** | Any “default in fulfillment of any obligation for which the advance payment is made” | **Refund of Advance Payment** when Applicant fails to return advance per Contract (after 14-day call per §9B.1) |
| **Expiry** | Blank; auto-null after Expiry Date | **Delivery to Site (CIF Limassol unloaded) + 30 days** + hard longstop `[●]` — **not PAC** |
| **Reduction** | Not stated (full amount until expiry) | **No reduction on shipping docs alone**; optional amortisation only on site delivery + Beneficiary acceptance (or delete §5A) |
| **Amount** | EUR blank | **EUR 846,951** (= 100% of 30% advance on Component A **EUR 2,823,169**) unless Sales Contract advance % differs |
| **Contract** | Generic placeholder | Sales Contract **17 March 2026** + Galascope G1/G2 scope |

### Acceptable if bank insists

- **Issuing bank:** Bank of Communications, Jiangsu Branch (name branch on face).
- **URDG 758** — already stated.
- **5-day payment** — our draft uses 5 calendar days; align.
- **Charges:** applicant pays issuing bank; beneficiary pays advising — standard.

### Instruction to Linyang / BoCom

> Issue the guarantee on your bank’s form **only if** the operative clauses are replaced to match the attached `APG_Galascope_Linyang_DRAFT_30May2026.docx` paragraphs (2), (5A), (6), (7), (11), (12). Do not issue with Suncatcher as beneficiary or without transfer to Galascope / `[Security Agent]`.

---

## 2. Performance security — Polish template

### Not usable for Galascope Cyprus as-is

| Issue | Linyang return | Required (EPC §10.9(f) / Sales §9B.2) |
|-------|----------------|----------------------------------------|
| **Parties** | Beneficiary = Warsaw SPV; Obligated = **Solarfun Poland** | Beneficiary = **Lighthief Cyprus**; Guarantor = **Jiangsu Linyang** |
| **Law / disputes** | **Polish law**; Warsaw ICC arbitration | **Cyprus law** (or English + Cyprus courts); align with Sales Contract dispute resolution for corporate instruments |
| **Currency** | **USD** blank | **EUR** — **EUR 141,158** (5% × Component A EUR 2,823,169) |
| **Form** | Polish “Performance Bond” (first demand, 14 days) | **Corporate guarantee** (not bank) — 30-day cure; insolvency immediate |
| **Validity** | To **5 July 2031** (Poland framework deal) | Until **DLP end** = **3 months after PAC** (indicative ~Q2 2027) |
| **Transfer** | No transfer without Guarantor consent | Assignable to **Galascope Ltd** / lender on notice |
| **Call** | Email to biuro@linyang.com.cn with QES | Written demand + 30-day cure (per Lighthief RFI draft) |

### Action

Return **`Linyang-Corporate-Performance-Guarantee-draft-Galascope-G1-G2-may2026.docx`** (from repo generator) and ask Linyang to **sign and seal** an English Cyprus-facing version — **not** to recycle the Solarfun Warsaw instrument.

---

## 3. Outbound APG draft (`APG_Galascope_Linyang_DRAFT_30May2026.docx`)

This file already reflects agreed Lighthief positions:

- Transfer under **URDG 758 Art. 33** + proceeds assignment; one transfer without bank consent
- Expiry: **delivery to Site + 30 days** + longstop
- **§5A:** reduction on site acceptance only (or delete)
- **§6:** 14-day call on Applicant before bank demand (matches §9B.1)
- **Cyprus law / courts** (bracketed for Alpha)
- Amount left **[●]** for bank to fill at **EUR 846,951** on issue

**Gap vs Galascope EPC §10.9(a):** Client EPC may expect APG covering **advance + pre-shipment on Component A (~EUR 2.40M)**. Linyang §9B.1 and BoCom template cover **100% of advance only (~EUR 847k)**. Disclose to Galascope / lender; do not represent BoCom draft as full EPC security.

---

## 4. Recommended email back to Linyang

1. **APG:** We cannot use the BoCom template with Suncatcher beneficiary. Please have **Bank of Communications** issue against **`APG_Galascope_Linyang_DRAFT_30May2026.docx`** (operative clauses 2, 5A, 6, 7, 11, 12), amount **EUR 846,951**, beneficiary **Lighthief Cyprus Ltd**.
2. **Performance:** The Polish Solarfun document is the wrong contract. Please sign the attached **English corporate performance guarantee** for **EUR 141,158**, beneficiary Lighthief, validity through **DLP + 3 months after PAC**.
3. Confirm **issuing bank name**, **fee quote**, and **timeline** to final instrument.

---

## 5. Checklist before showing Galascope / Alpha

- [ ] APG issued: correct beneficiary, amount, expiry, transfer clause
- [ ] APG not tied to PAC-only expiry
- [ ] Performance guarantee: Linyang corporate, EUR 141,158, Cyprus/EPC DLP timing
- [ ] Written confirmation instruments are **bank APG** + **corporate performance** (not books-only reserve)
- [ ] EPC §10.9(a) gap (847k vs 2.4M) explained or top-up agreed

*Lighthief internal — May 2026*
