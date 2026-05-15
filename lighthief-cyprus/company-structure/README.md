# Company structure & governance drafts (Lighthief Cyprus Ltd)

**Purpose:** Working pack for **bank KYC**, **investor diligence**, and **internal alignment** on who can bind the company and how decisions are recorded.

**Classification:** Internal — draft. **Not executed** until signed by the board (and shareholders where required).

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

## Contents

| File | Description |
|------|-------------|
| [company-structure.md](./company-structure.md) | Master overview: intended org chart, roles, signatory policy summary, checklist |
| [BOARD-RESOLUTION-signing-authority-DRAFT.md](./BOARD-RESOLUTION-signing-authority-DRAFT.md) | Draft board resolution: bank signatories & contract signing limits |
| [BOARD-RESOLUTION-operating-budget-and-delegation-DRAFT.md](./BOARD-RESOLUTION-operating-budget-and-delegation-DRAFT.md) | Draft board resolution: approved budget band & delegated authority |
| [MINUTES-template-first-board-2026-DRAFT.md](./MINUTES-template-first-board-2026-DRAFT.md) | Template minutes to adopt the above (optional first formal meeting) |

Fill all `[BRACKETS]` before legal review. Remove drafts from client-facing folders.

## Word versions (.docx)

Regenerate from Markdown (requires `python-docx`):

```powershell
python lighthief-cyprus/company-structure/generate-governance-docx.py
```

Outputs one `.docx` per `.md` in this folder (same base name).
