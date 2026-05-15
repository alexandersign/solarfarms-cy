# Cash assessment — PV / Trikkis / runway (R2)

**Sources:**  
- `financial/Lighthief Cyprus Sales Sheet.xlsx - Sales.csv`  
- `financial/sales-pipeline-master-apr2026.csv`  
- `financial/Lighthief Cashflow  - Accural 2026.csv` (2026 model — “2026 tab” export)  
- `lighthief-cyprus/cashflow/cashflow-operational-mar2026.md` (March operational note — **not** same as Excel; used only where cited)

**Date:** 15 May 2026  
**Status:** INTERNAL DRAFT — **Social arrears locked at €9,000** (payroll / GRSI, May 2026).

---

## 1. Your inputs (locked for this version)

| Topic | Your instruction |
|--------|-------------------|
| **Social insurance** | Not settled from **December** onward; **only Costas, Alexander, Zinovia** registered for SI — use **amounts as in cashflow model** where they exist, **plus** true arrears from payroll if higher than model. |
| **Trikkis “reserve”** | Supplier **reserves for installs not yet executed** — aligns with **Pend. Inst. Cost** on sales sheet. |
| **€30k Trikkis** | **Cost of new installs not yet billed by Trikkis** (future invoice), not a duplicate label for the same € as **Balance Trikkis** unless you confirm overlap. |
| **~€60k “incoming”** | **Uncollected / not yet in bank** per **cashflow model** (not the same as “cash received”). Tie to **AR**: sales pipeline **Pending €63,488** (PV CLIENTS TOTAL, May 2026 corrections) and/or sales detail **Payment Pending €62,549** — update sales sheet to match. |
| **Your salary** | From **May** in the cashflow model: **€8,000 / month** gross (replacing current **€2,350** Jan–Apr and **€4,500** May–Dec in the CSV for Alexander). You described current package as **€2k + net share**; **€8k** applies after project / director salary change — **model from May 2026** as requested. |
| **Shareholder liquidity** | **€15,000** loan / advance **against your shares** (wedding timing vs Dino payment). |
| **Runway burn** | From **`Lighthief Cashflow  - Accural 2026.csv`** — **Total Expenses** row. |

---

## 2. Social insurance — what the 2026 cashflow CSV actually contains

**Row label:** `Social` (aggregate; does not split Costas / Alexander / Zinovia).

**Monthly amounts in the model (Jan → Dec 2026):**

| Month | Social (€) |
|-------|------------:|
| Jan | 1,330 |
| Feb | 1,890 |
| Mar | 1,890 |
| Apr | 1,890 |
| May | 2,492 |
| Jun–Oct | 2,492 each |
| Nov | 3,332 |
| Dec | 3,332 |
| **Year Total (row)** | **29,456** |

**Important:** These columns are **calendar 2026**. The **December** column is **December 2026 (forecast)**, not “December 2025 arrears.” **Unpaid SI from calendar Dec 2025** is **not** read from that cell.

**What to book until payroll confirms**

1. **Minimum from model if you treat “one month model accrual unpaid”:** e.g. **Nov–Dec 2026 columns** = **€6,664** (only meaningful if you are already booking 2026 accruals unpaid).  
2. **Better:** Pull **actual employer SI owed** from **GRSI + payroll** for **Dec 2025 → current** for **Costas, Alexander, Zinovia** only (your registration list).  
3. **Cross-check:** Internal March note (`cashflow-operational-mar2026.md`) mentioned **€2,500** for **Dec+Jan** SI arrears — **likely stale**; replace with accountant figure.

**Locked for planning:** **`S` = €9,000** (employer SI owed Dec 2025 → May 2026, Costas / Alexander / Zinovia).

---

## 3. Receivables (“uncollected” / ~€60k)

| Source | Amount (€) | Note |
|--------|------------:|------|
| Master pipeline PV **Pending** | **63,488** | `sales-pipeline-master-apr2026.csv` — PV CLIENTS TOTAL (updated May 2026: Culvera, David David, Anton discount, Andy, Pambos, Alexandra) |
| Sales detail **Payment Pending** (`2025 TOTAL`) | **62,549** | `Lighthief Cyprus Sales Sheet.xlsx - Sales.csv` — **reconcile** to master when sales sheet is updated |
| **Use for planning** | **~63,490** | Prefer **master** pending until sales sheet matches |
| **2026 client balance (60% outstanding)** | **25,092** | Live sales sheet — Cipri, Peter, Raz, Savvakis, Christina, May job |
| **Total client AR** | **88,580** | 63,488 + 25,092 |

Your **~€60k** was the 2025 bucket only; **~€88.6k** is the full client picture with 2026 balances.

---

## 4. Trikkis — sales sheet mapping (your interpretation)

| Line (sales sheet `2025 TOTAL`) | € | Meaning (per your note) |
|----------------------------------|---:|-------------------------|
| **Balance Trikkis** | **42,734.49** | Stock / supplier balance **already in system** (incl. reserves tied to installs). |
| **Pend. Inst. Cost** | **36,748.25** | Install cost **not executed / not cleared** — overlaps conceptually with “reserve for installs not executed.” |
| **+ Not yet billed (2026 installs)** | **30,000** | **Your estimate** — Trikkis invoices **not yet issued** for new work. |

**Avoid double counting:** If the **€30k** is **included inside** Pend. Inst. or Balance, reduce one bucket. If it is **incremental** future invoices, keep separate.

**Payable pressure (illustrative):**

- **A)** Balance only: **€42,734**  
- **B)** Balance + your future bill: **€72,734**  
- **C)** Balance + full Pend. Inst. (conservative): **€79,483** — only if Pend. Inst. is **all** payable to Trikkis **in addition** to Balance.

---

## 5. Monthly burn — from `Lighthief Cashflow  - Accural 2026.csv`

**Row:** `Total Expenses`

| Month 2026 | Total Expenses (€) | Comment |
|------------|---------------------:|---------|
| Jan | 33,877.60 | PV / overhead |
| Feb | 16,340.00 | |
| Mar | 22,526.80 | |
| Apr | 21,749.60 | |
| May | 21,672.20 | Last **normal** month before BESS spike in model |
| Jun | **2,103,876.02** | **BESS / project** — not “PV runway” |
| Jul | **1,144,967.90** | **BESS / project** |

**PV-era average (Jan–May):**  
(33,877.60 + 16,340 + 22,526.80 + 21,749.60 + 21,672.20) / 5 = **€23,233.24 / month**

### Alexander salary change (from May): €4,500 → €8,000 in model

CSV has **Alexander Papacosta** at **€2,350** (Jan–Apr) and **€4,500** (May–Dec). You want **€8,000 from May**.

**Incremental monthly cost from May:** €8,000 − €4,500 = **€3,500 / month** (on top of current model from May onward).

**Adjusted PV-style May month:**  
€21,672.20 + €3,500 = **€25,172.20** (if nothing else changes).

**Adjusted Jan–May average (if May is at new salary, Jan–Apr unchanged):**  
(33,877.60 + 16,340 + 22,526.80 + 21,749.60 + 25,172.20) / 5 = **€23,933.24 / month**

---

## 6. Four-month runway (company) — two conventions

**Convention A — “Steady PV burn” (average Jan–May, salary €8k from May in May only):**  
€23,933.24 × **4** ≈ **€95,733**

**Convention B — “May run-rate × 4” (each month looks like adjusted May):**  
€25,172.20 × **4** ≈ **€100,689**

**Do not** use Jun/Jul **Total Expenses** from the same row for PV runway — those months are dominated by **BESS project** lines in this model.

---

## 7. Liquidity bridge (no investor) — schematic

Let **`S`** = social payable now (§2). Let **`T`** = Trikkis cash-out you commit to (**see §4** — e.g. €42.7k + €30k = €72.7k if no double-count).

| Line | € |
|------|---:|
| **+** AR / uncollected (total **€88,580**) | +88,580 |
| **+** Cash on account | +7,600 |
| **+** Share-backed liquidity | +15,000 |
| **−** Trikkis / install payables (pick scenario §4) | −T |
| **−** Social **`S`** | −9,000 |
| **−** 4-month runway reserve (use **€95,733** or **€100,689**) | −95,733 to −100,689 |
| **=** **Headroom / shortfall** | *solve* |

**Example A — Trikkis on sheet only:** T = **€79,483** (Balance + Pend. Inst.), S = **€9,000**, runway = **€95,733**  

→ 88,580 + 7,600 + 15,000 − 79,483 − 9,000 − 95,733 = **−€73,036** (needs collections + time, or lower burn / defer T).

**Example B — + €30k future Trikkis invoices:** T = **€109,483**  

→ 88,580 + 7,600 + 15,000 − 109,483 − 9,000 − 95,733 = **−€103,036**.

**On paper (AR vs payables, no runway):** 88,580 − 79,483 − 9,000 = **+€97** — essentially flat before future Trikkis bills and monthly burn.

---

## 8. Actions

1. ~~**One number from payroll:**~~ **Done — S = €9,000.**  
2. **Trikkis:** Confirm whether **€30k** is **inside** or **on top of** **Pend. Inst. €36,748** and **Balance €42,734**.  
3. **Excel:** Split **Total Expenses** into **PV operating** vs **BESS project** rows for Jun+ so runway and project cash stay separate.  
4. **Cashflow model:** From **May**, set **Alexander Papacosta** line to **€8,000** (and rebalance **Total Expenses** / margins).  
5. **Document** the **€15k** share-backed advance (terms, repayment from Dino tranche, board approval).

---

*Figures from CSVs are model exports — reconcile to bank before decisions.*
