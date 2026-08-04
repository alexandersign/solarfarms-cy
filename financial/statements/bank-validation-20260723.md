# BOC Bank Statement Validation — 23 July 2026

**Source:** `12months box 23-07-2026.csv` (Bank of Cyprus account **357044102353**)  
**Imported as:** `TransactionHistory_12m_20260723.csv`  
**Master (deduped):** `TransactionHistory_master_boc.csv` (926 txs)  
**New since prior exports:** `new-transactions-since-prior_20260723.csv` (**151** txs, 17 Jun – 22 Jul 2026)

---

## 1. Import summary

| Metric | Value |
|--------|-------|
| Period covered | 22 Aug 2025 → 22 Jul 2026 |
| Transactions in 12m export | 925 |
| Prior unique txs (May/Jun exports) | 775 |
| Overlap | 774 |
| **New transactions** | **151** |
| Latest indicative balance | **€2,889.86** (22 Jul 2026) |
| New period IN | €86,670.10 |
| New period OUT | €88,758.19 |

One prior row (KAFKAS €697.20, 17 Jun) differed only by Auth spacing in the description; kept in master.

---

## 2. Validation vs `financial-report-apr2026.md`

Bank export **corrects** several Apr 2026 management estimates:

| Item | Apr report (est.) | Bank actual (12m) | Delta |
|------|-------------------|-------------------|-------|
| Opening bal ~1 Jan 2026 | ~€14,000 | **€1,924.26** (31 Dec 2025) | Report overstated ~€12k |
| Jan–Apr client receipts | ~€62,067 | **€67,960.50** | +€5,893 |
| Jan–Apr shareholder loans | ~€5,500 | **€22,000.00** | Report missed €16.5k |
| Jan–Apr total bank IN | ~€67,567 | **€89,960.50** | +€22,393 |
| Jan–Apr total bank OUT | ~€64,225 | **€91,782.26** | +€27,557 |

### Shareholder loans (labelled) — full bank list

| Date | Amount | Narrative |
|------|--------|-----------|
| 22 Aug 2025 | €500 | Arkadiusz Sybaris — Shareholders loan |
| 08 Sep 2025 | €5,000 | Arkadiusz Sybaris — Shareholders loan |
| 15 Jan 2026 | €8,000 | Shareholders loan to the company |
| 10 Feb 2026 | €4,000 | Shareholders loan to the company |
| 18 Feb 2026 | €10,000 | Shareholders loan to the company |
| **02 Jul 2026** | **€60,000** | **NEW — Shareholders loan to the company** |
| **09 Jul 2026** | **€3,000** | **NEW — Shareholders loan to the company** |
| **Total** | **€90,500** | |

---

## 3. Monthly cash (full 12m export)

| Month | IN | OUT | NET | Client IN (approx) | SH loans |
|-------|-----|-----|-----|--------------------|----------|
| 2025-08 | 4,743 | 1,463 | +3,280 | 4,243 | 500 |
| 2025-09 | 16,076 | 11,750 | +4,326 | 11,076 | 5,000 |
| 2025-10 | 11,832 | 8,611 | +3,221 | 11,832 | — |
| 2025-11 | 18,021 | 22,520 | −4,498 | 18,021 | — |
| 2025-12 | 20,826 | 25,231 | −4,405 | 20,826 | — |
| 2026-01 | 20,261 | 12,777 | +7,484 | 12,261 | 8,000 |
| 2026-02 | 38,628 | 34,476 | +4,152 | 24,628 | 14,000 |
| 2026-03 | 18,420 | 20,603 | −2,183 | 18,420 | — |
| 2026-04 | 12,652 | 23,926 | −11,275 | 12,652 | — |
| 2026-05 | 39,816 | 22,563 | +17,253 | 39,816 | — |
| 2026-06 | 17,776 | 34,399 | −16,623 | 17,776 | — |
| 2026-07 | 78,669 | 76,511 | +2,157 | 15,669 | 63,000 |

---

## 4. Material new transactions (17 Jun – 22 Jul 2026)

### Large credits
- **€60,000** — 02 Jul — Shareholders loan (Sybaris)
- **€5,485** — 14 Jul — P.Y MyFamilyFarm (solar)
- **€5,002** — 26 Jun — INV. 1082
- **€4,624** — 17 Jul — Inv. 1085 settlement
- **€3,676** — 17 Jul — Invoice 1086
- **€3,000** — 09 Jul — Shareholders loan
- **€3,000** — 25 Jun — ATM cash deposit

### Large debits
- **€45,000** — 02 Jul — Trikkis Energy (same-day after €60k loan)
- **€3,904** — 20 Jul — Payment for 92120
- **€3,108** — 19 Jun — Payment for 58625
- **€3,094** — 07 Jul — S.M.T. Unlimited Group
- **€3,000** — 09 Jul — Galascope Inv 0404
- **€2,517** — 06 Jul — Invoice 2026/26
- Payroll: Costas €2,416 · Alex base €2,000 · Zinovia €1,240 · Pending com €1,200+€1,000
- **€610** — 17 Jul — 7Sun / Pawel Sternal (FPF 6532)

---

## 5. Files updated

| Path | Role |
|------|------|
| `financial/statements/TransactionHistory_12m_20260723.csv` | Raw 12m BOC export |
| `financial/statements/TransactionHistory_master_boc.csv` | Deduped master (use this) |
| `financial/statements/new-transactions-since-prior_20260723.csv` | 151 new rows only |
| `lighthief-cyprus/cashflow/lighthief-bankstatement-12m-20260723.csv` | Cashflow folder copy |
| `lighthief-cyprus/cashflow/lighthief-bankstatement-july-april.csv` | Refreshed to latest 12m |
| `analyze_*.py` | Pointed at master |

---

## 6. Implications for bank/auditor pack

1. **P&L cash side** should use this master, not Apr report estimates.  
2. **Shareholder loans outstanding** at least €90,500 labelled inflows (net of Revolut drawdowns still needs separate analysis).  
3. **Bank accounts:** BOC `357044102353` confirmed active; latest bal **€2,889.86**.  
4. Revolut still separate — not in this export.  
5. Apr report opening balance and loan figures are **stale** — do not send without correction.

---

## 7. Transaction clarifications (1 Aug 2026)

Previously flagged as "uncategorised" — now resolved:

### 7a. Lighthief Poland transfer — €6,070.12 (25 Nov 2025)

| Field | Detail |
|-------|--------|
| Date | 25 Nov 2025 |
| Amount | €6,070.12 (OUT) |
| Counterparty | Lighthief Sp. z o.o. (Poland) — a/c PL25116022020000000541536513 |
| BOC ref | CY251125412396 |
| Description on statement | "Faktura V..." (Faktura = Polish for invoice) |
| **Clarified as** | **Intercompany purchase — inverters and panels bought from / via Lighthief Poland entity** |
| Accounting treatment | Reclassify from "unclassified OUT" → **COGS / stock purchase — intercompany**. Requires: (a) the Polish sales invoice ("Faktura"), (b) confirmation of VAT treatment on cross-border purchase, (c) disclosure as related-party transaction in statutory accounts. |
| Action | Obtain "Faktura" invoice from Lighthief Poland; book as stock/COGS purchase with intercompany disclosure |

### 7b. TFA Portal — Tax Department payments (VAT)

| Date | Amount | Auth ref | Clarified as |
|------|-------:|----------|--------------|
| 11 Nov 2025 | €2,513.99 | Auth 31xxx | VAT payment to Cyprus Tax Department via TFA portal |
| 11 Feb 2026 | €4,079.08 | Auth 39xxx | VAT payment to Cyprus Tax Department via TFA portal |
| 21 May 2026 | €3,840.81 | Auth 33xxx | VAT payment to Cyprus Tax Department via TFA portal |
| **Total** | **€10,433.88** | | **Reclassify → VAT liability payments (not P&L expense)** |

These are balance-sheet VAT liability clearances, not operating expenses. They should be matched to the corresponding VAT return periods (Q3 2025, Q4 2025/Q1 2026, Q1/Q2 2026). Action: obtain filed VAT returns from accountant (Timkas) and cross-reference each payment to the matching quarter.

### 7c. Charalambos Ioannou — residential PV client (missing from sales pipeline)

| Date | Amount (IN) | Invoice ref | Note |
|------|------------:|-------------|------|
| 02 Oct 2025 | €4,216.81 | Invoice 1008 (dated 30 Sep 2025) | First payment |
| 05 Feb 2026 | €2,216.81 | Invoice 1032 | Second payment |
| 21 May 2026 | €553.55 | Includes invoice 107x | Final/balance payment |
| **Total received** | **€6,987.17** | | |

**Clarified as:** Residential PV client — **not in `sales-pipeline-master-apr2026.csv`**. Added to pipeline as row #48 (see below). Total revenue likely equals or slightly exceeds €6,987.17 received (check if any balance outstanding). Requires: signed proposal/contract on file, system size confirmed.

*Note: "CHR. MICHAEL INV 1078" (€1,952, 28 May 2026) is a separate client — Christakis Michael (row #34 in pipeline) — do not merge.*

---

## 8. Transaction clarifications — batch 2 (1 Aug 2026)

### 8a. Jihat / Chiat Ertugrul — salary and expenses

All transfers to BE51967573628862 (Chiat Ertugrul) = **staff payments — salary and project expenses**:

| Date | OUT € | Narrative on statement |
|------|------:|------------------------|
| 05 Feb 2026 | 450.00 | Salary (part) |
| 13 Feb 2026 | 266.00 | Remaining Jan salary |
| 06 Mar 2026 | 1,239.70 | Salary Feb 2026 |
| 20 Mar 2026 | 163.00 | Out-of-pocket expenses |
| 08 Apr 2026 | 1,800.00 | Salary |
| 14 May 2026 | 1,000.00 | Salary April |
| 21 May 2026 | 50.00 | Misc |
| 02 Jun 2026 | 500.00 | Deposit |
| 09 Jun 2026 | 700.00 | Anton project — site work |
| 19 Jun 2026 | 80.00 | Pending |
| 26 Jun 2026 | 100.00 | Petrol |
| 30 Jun 2026 | 400.00 | Container inspection |
| 07 Jul 2026 | 1,400.00 | June salary (TIPS) |
| 08 Jul 2026 | 1,400.00 | June salary (SEPA — same tx ref CY260707347575; duplicate entry, net = €3 fee) |
| 17 Jul 2026 | 100.00 | Misc |
| 20 Jul 2026 | 150.00 | Misc |
| **Total (net of duplicate)** | **9,798.70** | Reclassify → **Staff / payroll + expenses (Jihat)** |

The "unidentified SEPA €1,400" flagged in prior analysis is this same transaction.

### 8b. Further clarified items

| Supplier | Date(s) | Total OUT € | Category | Notes |
|----------|---------|------------:|----------|-------|
| IKEA Cyprus | 22 Jul 2026 | 569.93 | **Office supplies / furniture** | Card purchase |
| Zampus Trading Ltd | 16 Jul 2026 | 731.85 | **Installation supplies** | TIPS; invoice to obtain |
| Lufthansa | Jun 2026 | 566.72 | **Travel — Intersolar trade show** | Business travel Jun 2026 |
| LinkedIn Jobs (×4) | Dec 25 – Apr 26 | 1,043.90 | **Recruiting — job postings** | €131 + €291 + €442 + €180 |
| Autodesk (PayPal) | Mar 2026 | 380.00 | **Software — CAD (Autodesk)** | Licence/subscription |
| EngineerCY (×2) | Jul 2026 | 533.67 | **Engineering portal** | Subscription or listing |
| Wizz Air | Mar 2026 | 222.24 | **Travel** | Destination/purpose to note |

### 8c. Still to clarify (€1,979 remaining)

| Supplier | Date | OUT € | Best guess |
|----------|------|------:|------------|
| Sonoupo Ltd (Lithuania) | 16 Jun 2026 | 285.60 | Unknown — invoice ref 2026-025; Lithuanian IBAN |
| A. Stephanis & Co | 22 Jan 2026 | 596.18 | Electrical / hardware retailer? |
| Y.C. Mega Tech | 10 Dec 2025 | 362.90 | IT / tech supplier? |
| Agelco Sales Polemidia | 3 Jul 2026 | 235.00 | Local trade supplier |
| Thenut Cracker House | 10 Oct 2025 | 217.20 | Restaurant / client entertainment |
| Misc fees / small items | various | ~282 | Transfer commissions, rounding |

---

## 9. Uncategorised OUT — running reconciliation

| Layer | 2025 OUT | 2026 OUT | Total |
|-------|--------:|--------:|------:|
| Original uncategorised | €12,565 | €24,605 | **€37,170** |
| 7a — Poland stock purchase | (€6,070) | — | (€6,070) |
| 7b — VAT payments (TFA portal) | (€2,514) | (€7,920) | (€10,434) |
| 8a — Jihat salary + expenses | — | (€9,799) | (€9,799) |
| 8b — IKEA office supplies | — | (€570) | (€570) |
| 8b — Zampus install supplies | — | (€732) | (€732) |
| 8b — Lufthansa (Intersolar) | — | (€567) | (€567) |
| 8b — LinkedIn recruiting | (€131) | (€913) | (€1,044) |
| 8b — Autodesk software | — | (€380) | (€380) |
| 8b — EngineerCY | — | (€534) | (€534) |
| 8b — Wizz Air travel | — | (€222) | (€222) |
| **Remaining to classify (8c)** | **€3,850** | **(€1,968)** | **€1,968** |

**Total unexplained OUT is now ≈ €1,979** — down from €37,170. Items in 8c above.
