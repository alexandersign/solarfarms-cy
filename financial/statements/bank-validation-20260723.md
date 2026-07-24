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
