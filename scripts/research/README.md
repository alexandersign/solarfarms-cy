# Cyprus RTB research scripts

Best-effort crawlers and helpers for the pipeline described in `docs/internal/pv-prospects-rtb-migration.sql` and the marketing CERA CSV.

## Setup

```powershell
cd c:\Users\alexa\code\solinvest
py -m pip install -r scripts/research/requirements.txt
```

## Data flow

1. **Refresh CERA segments (TypeScript)**  
   `npx tsx scripts/import-cera-prospects.ts --dry-run --min-mwp 1`  
   Writes `marketing/cera-rtb-segments.json` and `marketing/cera-prospects-preview.json`.

2. **Internal HTML report**  
   `npx tsx scripts/generate-rtb-intelligence-report.ts`  
   Writes `docs/internal/rtb-cyprus-intelligence-YYYY-MM-DD.html`.

3. **TSOC PDF crawl**  
   `python scripts/research/scrape-tsoc-development-plan.py --match-cera --max-pdfs 3`

4. **DoE / environment pages**  
   `python scripts/research/scrape-doe-eia-registry.py`

5. **EAC keyword crawl + manual checklist**  
   `python scripts/research/scrape-eac-connection-queue.py --from-cera-rtb`

6. **Geocode / map hints**  
   `py scripts/research/satellite-check-parks.py --limit 40`  
   Output uses `mapbox_static_overlay` only (no secrets). With `MAPBOX_TOKEN` in `.env.local`, build URLs locally:  
   `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/{overlay}?access_token=...`

7. **Manual enrichment**  
   Fill `marketing/research/rtb-enrichment-template.csv` and merge into Supabase when columns exist.

## Supabase

Apply `docs/internal/pv-prospects-rtb-migration.sql` before relying on new CRM fields from `import-cera-prospects.ts` live imports.
