# Shia-Sia Site & Model Validation

> Generated 2026-06-17 · `npx tsx scripts/validate-shia-sia-site.ts`

## Summary

| Status | Count |
|--------|-------|
| ✅ Pass | 18 |
| ⚠️ Warn | 2 |
| ❌ Fail | 0 |
| ⬜ Gap (data not in repo) | 0 |

## Checks

### ✅ land.plot — Land

Land registry: Plot 316, Sheet 39/47, Sia, Larnaca District (lease executed 2025-05)

*Sources: lib/deals/shia-sia-sources.ts, SHIA-SIA-PROJECT-ANALYSIS.md*

### ✅ land.sheet — Land

Cadastral sheet 39/47 (XXXIX/47) — consistent with DD

*Sources: SHIA-SIA-PROJECT-ANALYSIS.md*

### ✅ land.district — Land

Public location: Larnaca District, Cyprus — matches DD (Larnaca District, not Nicosia city)

*Sources: lib/deals/shia-sia-rtb.ts*

### ⚠️ land.coords — Land

PVGIS coords 34.957, 33.377 — APPROXIMATE (Sia village centroid); refine from town planning topographic plan when PDF available in repo

*Sources: scripts/pvgis-park-yield.py, pvgis-yield-shia-sia.json*

### ✅ cap.mwp-stack — Capacity

Model 3.2 MWp (civil confirmed) vs town planning cap 3.32 MWp vs EAC licence 3 MWp — AC export 2.7 MW

*Sources: shia-sia-rtb.ts, shia-sia-sources.ts*

### ✅ cap.modules — Capacity

Jinko 645W: model ≈ 4961 modules (3.2 MWp); permit max ≈ 5147 modules (3.32 MWp)

*Sources: SHIA-SIA-PROJECT-ANALYSIS.md*

### ✅ cap.dc-ac — Capacity

DC:AC ratio 1.19 (3.2 MWp DC / 2.7 MW AC) — typical utility range 1.15–1.35

*Sources: EAC connection terms*

### ✅ layout.design — Layout

Financial model layout: Jinko 645W bifacial, east–west 10° tilt, 1 m row spacing, Larnaca District

*Sources: lib/deals/shia-sia-rtb.ts*

### ⚠️ layout.permit-dd — Layout

DD quick reference still lists south fixed tilt 15° / 0.5 m pile (Dec 2024 drawings). Current Lighthief design = bifacial E–W 10° — intentional change; confirm no permit amendment required before EPC

*Sources: SHIA-SIA-PROJECT-ANALYSIS.md*

### ✅ layout.row-spacing — Layout

1 m inter-row spacing — confirmed by Lighthief civil engineer (Jun 2026)

*Sources: lib/deals/shia-sia-sources.ts PV_SITE*

### ✅ layout.yield-alignment — Layout

Yield 1480 kWh/kWp matches PVGIS E–W audit 1480 (south ref 1633)

*Sources: pvgis-yield-shia-sia.json, shia-sia-rtb.ts*

### ✅ bess.size — BESS

BESS 2.5 MW / 7.5 MWh (3h) — downsized for E–W 45% curtailment (DD still recommends 10 MWh for 50% south case)

*Sources: shia-sia-rtb.ts*

### ✅ fin.generation — Financial

Annual generation 4736 MWh = 3.2 × 1480

*Sources: shia-sia-rtb.ts*

### ✅ fin.capex — Financial

CAPEX total €5,100,342 = RTB + PV + BESS + EAC grid (€83,842)

*Sources: shia-sia-rtb.ts*

### ✅ pack.file — Investor pack

Present: public\lighthief-cyprus\parks-for-sale\shia-sia-nicosia\shia-sia-investor-model.xlsx

*Sources: generate-shia-sia-investor-pack.ts*

### ✅ pack.file — Investor pack

Present: public\lighthief-cyprus\parks-for-sale\shia-sia-nicosia\shia-sia-investor-teaser.html

*Sources: generate-shia-sia-investor-pack.ts*

### ✅ pack.file — Investor pack

Present: parks-for-sale\novikov\investor-pack\SOURCES.md

*Sources: generate-shia-sia-investor-pack.ts*

### ✅ pack.teaser-land — Investor pack

Teaser includes Plot 316 + Larnaca District

*Sources: shia-sia-investor-teaser.html*

### ✅ pack.teaser-layout — Investor pack

Teaser states E–W 10° layout

*Sources: shia-sia-investor-teaser.html*

### ✅ pack.teaser-mwp — Investor pack

Teaser headline 3.2 MWp vs model 3.2 MWp vs permit 3.32 MWp

*Sources: shia-sia-investor-teaser.html*

## Actions required before investor send

1. **Coordinates** — replace approximate PVGIS centroid with coords from topographic plan.
2. **MWp** — model uses 3.2 MWp (civil confirmed); permit allows up to 3.32 MWp.
3. **Land lease rent** — OCR executed lease for actual €/yr (currently €18k indicative).
