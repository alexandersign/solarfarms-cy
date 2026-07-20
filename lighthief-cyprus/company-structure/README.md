# Company structure & governance drafts (Lighthief Cyprus Ltd)

**Purpose:** Working pack for **bank KYC**, **investor diligence**, and **internal alignment** on who can bind the company and how decisions are recorded.

**Classification:** Internal — draft. **Not executed** until signed by the board (and shareholders where required).

**Last updated:** 30 June 2026 — LCY-GOV-STRUCT-2026-003 · UBO: Dr. Arkadiusz Sybaris (100% Bretwald Sybaris Holding Ltd)

**Bank KYC:** [KYC-GROUP-STRUCTURE-BANKS.md](./KYC-GROUP-STRUCTURE-BANKS.md) — Revolut & Bank of Cyprus  
**Registrar PDFs:** [reg docs/](../reg%20docs/README.md) — shareholder & director certificates, HE32 filings, Pandaserve invoices

**Critical:** These files are **templates only** and **do not constitute legal advice**. A **Cyprus-qualified lawyer** must adapt them to your articles of association, any shareholders’ agreement, and Registrar of Companies practice.

**Verified company identifiers** (from `lib/constants.ts`):

| Field | Value |
|--------|--------|
| Legal name | Lighthief Cyprus Ltd |
| Company number | HE 477423 |
| TIN | 60187188Q |
| Registered office | Agiou Andreou 241, AG TRIAS COURT, Flat/Office 31, 3036 Limassol, Cyprus |
| Operational office | 28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus |
| General email | office@lighthief.com |
| Office phone | +357 77 77 00 50 |

**Confirmed share register (LCY):**

| Shareholder | Shares | % |
|-------------|-------:|--:|
| Lighthief International Ltd (HE 464727) | 900 | 90% |
| Alexander Papacosta | 100 | 10% |

**Parent chain (confirmed):** Dr. Arkadiusz Sybaris (100%) → Bretwald Sybaris Holding Ltd (100%) → Lighthief International Ltd (90%) → Lighthief Cyprus Ltd · Alexander Papacosta (10% direct)

## Contents

| File | Description |
|------|-------------|
| [KYC-GROUP-STRUCTURE-BANKS.html](./KYC-GROUP-STRUCTURE-BANKS.html) | **Print-ready HTML** — open in browser → Print → Save as PDF for banks |
| [KYC-GROUP-STRUCTURE-BANKS.md](./KYC-GROUP-STRUCTURE-BANKS.md) | Bank KYC chart (source markdown) |
| [company-structure.md](./company-structure.md) | **Master overview:** group org charts (Cyprus + Poland), cap table, officers, checklist |
| [BOARD-RESOLUTION-signing-authority-DRAFT.md](./BOARD-RESOLUTION-signing-authority-DRAFT.md) | Draft board resolution: bank signatories & contract signing limits |
| [BOARD-RESOLUTION-operating-budget-and-delegation-DRAFT.md](./BOARD-RESOLUTION-operating-budget-and-delegation-DRAFT.md) | Draft board resolution: approved budget band & delegated authority |
| [MINUTES-template-first-board-2026-DRAFT.md](./MINUTES-template-first-board-2026-DRAFT.md) | Template minutes to adopt the above (optional first formal meeting) |

Related: [Signing matrix & governance](../../Alexander/DRAFT-SIGNING-MATRIX-AND-GOVERNANCE.md) (LCY-GOV-SIGN-2026-002)

Fill all `[BRACKETS]` in draft resolutions before legal review. Remove drafts from client-facing folders.

## Word versions (.docx)

Regenerate from Markdown (requires `python-docx`):

```powershell
python lighthief-cyprus/company-structure/generate-governance-docx.py
```

Outputs one `.docx` per `.md` in this folder (same base name).
