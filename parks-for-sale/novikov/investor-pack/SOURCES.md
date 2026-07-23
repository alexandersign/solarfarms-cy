# Shia-Sia Investor Pack — Document Sources

> PARK-RTB-SIA-2026 · Generated 2026-06-17

## DD package (Novikov, received 9 May 2026)

| Document | Key figures used |
|----------|------------------|
| `498000141_Grid_Connection_Terms_SIA.pdf` | Grid works **€83,842.14** ex VAT (preliminary); deposit **€4,988.61** incl. VAT paid 22 Feb 2023 |
| `Scan_Grid_Connection_Terms_5__SIA.pdf` | Amendment 5 (Jun 2025) |
| CERA licence | **E3511** (Apr 2025) |
| Town planning | **3.32 MWp** issued 5 May 2025 |
| Land lease | Plot 316 executed May 2025 — **annual rent not OCR'd** (€18k model = INDICATIVE) |
| PPA draft Synenergia | **$0.16/kWh Y1** — not executed; shown as comparison only |
| `FM_3,2MW_250126_BESS.xlsx` | Seller €4.78M CAPEX — comparison only |

## Lighthief pricing

| Item | Rate | Source |
|------|------|--------|
| PV EPC | €720,000/MWp | `lib/deals/rtb-deal-types.ts` / v4 workbook |
| BESS EPC | €127,000/MWh | Same |
| RTB | €600,000 | `RTB_COSTS.withConnectionTerms` |

## Market data

| Item | Value | Source |
|------|-------|--------|
| Solar sell | €140.88/MWh | TSOC DAM daytime 06–17h |
| BESS discharge | €182.99/MWh | TSOC evening avg 17–21h (134 TSOC day-ahead days (1 Oct 2025 – 11 Feb 2026), 6,432 half-hourly prints) |
| Sample | 134 days | 1 Oct 2025 – 11 Feb 2026 |

## Yield

PVGIS E–W 10° run → **1,480 kWh/kWp** (`pvgis-yield-shia-sia.json`)
