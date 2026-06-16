# Cyprus RTB research scripts

Best-effort crawlers and helpers for the pipeline described in `docs/internal/pv-prospects-rtb-migration.sql` and the marketing CERA CSV.

## Setup

```powershell
cd c:\Users\alexa\code\solinvest
py -m pip install -r scripts/research/requirements.txt
```

## Data flow

### Company-level CRM (existing)

1. **Refresh CERA segments (TypeScript)**  
   `npx tsx scripts/import-cera-prospects.ts --dry-run --min-mwp 1`  
   Writes `marketing/cera-rtb-segments.json` and `marketing/cera-prospects-preview.json`.

2. **Internal HTML report**  
   `npx tsx scripts/generate-rtb-intelligence-report.ts`  
   Writes `docs/internal/rtb-cyprus-intelligence-YYYY-MM-DD.html`.

### Plant-level intelligence (CERA × EAC)

3. **License-level CERA import**  
   `npx tsx scripts/import-cera-plants.ts --json-only --min-mwp 0.1`  
   → `marketing/cyprus-energy-plants.json`

4. **EAC RES System Table PDFs**  
   `python scripts/research/discover-eac-res-pdfs.py --download`  
   `python scripts/research/parse-eac-res-pdf.py --all`  
   → `marketing/research/eac-res-systems.json`  
   **Note:** EAC tables list legal/natural person type, not SPV names — matching uses municipality + capacity.

5. **Match plants to EAC rows**  
   `npx tsx scripts/match-cyprus-plants.ts --dry-run`  
   → `marketing/cyprus-plant-matches.json`

6. **Extended segments + report**  
   `npx tsx scripts/generate-cyprus-rtb-segments.ts`  
   `npm run rtb:report`

7. **CRM UI**  
   `/admin/prospects/plants` — filters, export CSV

### Other research scripts

8. **TSOC PDF crawl** — `python scripts/research/scrape-tsoc-development-plan.py --match-cera --max-pdfs 3`

9. **DoE / environment** — `python scripts/research/scrape-doe-eia-registry.py`

10. **EAC keyword crawl** — `python scripts/research/scrape-eac-connection-queue.py --from-cera-rtb`

11. **EAC applications portal spike** — `python scripts/research/scrape-eac-applications-status.py`

12. **Satellite hints** — `py scripts/research/satellite-check-parks.py --limit 40`

13. **Manual enrichment** — fill `marketing/research/rtb-enrichment-template.csv`, then  
    `npx tsx scripts/merge-rtb-enrichment.ts`

## Contact discovery (no Hunter.io)

| Stage | Command | What you get |
|-------|---------|----------------|
| 1 | `npm run enrich:register` | Directors, HE reg no, address from [Cyprus company register](https://efiling.drcor.mcit.gov.cy/) (Playwright) |
| 3 | `npm run enrich:contacts` | Website via domain guess / Google Places text search → scrape `mailto:` + regex; else email pattern from director name |

Logic lives in [`lib/contact-discovery.ts`](../../lib/contact-discovery.ts) (same ideas as [`scripts/solar-prospect-sweep.py`](../solar-prospect-sweep.py) website scrape).

**Google Places** helps C&I rooftops (`solar-prospect-sweep.py`); utility **SPVs** rarely have a GMB listing — Stage 1 directors + LinkedIn manual is usually better for those.

## Sales targeting (per licence / SPV)

| Target | When |
|--------|------|
| **PV O&M** | Operational PV ≥1 MWp |
| **PV EPC** | CERA construction licence, PV only (pre-operational) |
| **Hybrid EPC (PV + BESS)** | Construction, PV + BESS on licence |
| **BESS EPC** | Standalone BESS or construction with BESS only |
| **PV O&M + BESS O&M** | Operational hybrid |
| **BESS retrofit** | Secondary on operational PV without BESS |

```powershell
npx tsx scripts/import-cera-plants.ts --json-only --min-mwp 0.1
npx tsx scripts/enrich-cyprus-plants-register.ts --limit 40 --min-score 35
npx tsx scripts/analyze-cyprus-directors.ts --min-spvs 2
npx tsx scripts/export-cyprus-sales-targets.ts --min-score 35
```

Outputs: `marketing/cyprus-sales-targets.csv`, `marketing/cyprus-top-directors.csv`

## Supabase

Apply migrations before live DB writes:

- `docs/internal/pv-prospects-rtb-migration.sql`
- `docs/internal/cyprus-energy-plants-migration.sql`
