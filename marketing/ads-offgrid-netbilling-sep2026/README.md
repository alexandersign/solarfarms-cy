# Lighthief Ad Set — Off-Grid & Net Billing (Sep 2026)

Ready-to-upload image set for **Meta** (Facebook / Instagram / Advantage+) and **Google** (Demand Gen, Performance Max, Display). Two products, A/B/C home tests, plus a business creative each.

Open `preview.html` in a browser to review every export.

## Contact on all campaigns

| Field | Value |
|---|---|
| Named contact | Alexander Papacosta, Cyprus Director |
| Phone | +357 99 164 158 |
| Email | office@lighthief.com |
| Office | +357 77 77 00 50 |
| Website / landing | https://solarfarms.cy |
| Company | Lighthief Cyprus Ltd · HE 477423 |

## A/B matrix

| Campaign | Variant | Angle | Image line |
|---|---|---|---|
| Off-grid · Home | A | Pain | Go full off-grid. |
| Off-grid · Home | B | Aspiration | Live off-grid. Live free. |
| Off-grid · Home | C | Control | Total control of your power. |
| Off-grid · Business | — | Commercial | Power your business off-grid. |
| Net billing · Home | A | Pain | Keep your solar. |
| Net billing · Home | B | Aspiration | Solar + battery. Lower bills. |
| Net billing · Business | — | Commercial | Cut your business energy bill. |

Run **home A vs B** first. Add C only if A/B is inconclusive. Do not mix off-grid and net billing in one ad set.

Ad-account primary text, headlines, and descriptions are in `copy-sheet.csv`.

## Folder map

```
export/
  meta/{off-grid|net-billing}/{home-a|home-b|home-c|business}/
  google/{off-grid|net-billing}/{home-a|home-b|home-c|business}/
```

## Sizes

### Meta
| File | Pixels | Placement |
|---|---|---|
| `feed-square_1080x1080.png` | 1080×1080 | Feed, Explore |
| `feed-portrait_1080x1350.png` | 1080×1350 | Feed 4:5 (preferred) |
| `stories-reels_1080x1920.png` | 1080×1920 | Stories, Reels, Advantage+ |
| `landscape_1920x1080.png` | 1920×1080 | Landscape feed / LinkedIn |
| `link-landscape_1200x628.png` | 1200×628 | Link ads, right column |
| `carousel-square_1200x1200.png` | 1200×1200 | Carousel / collection |

### Google
| File | Pixels | Placement |
|---|---|---|
| `feed-square_1080x1080.png` | 1080×1080 | Demand Gen / YouTube / Discover |
| `carousel-square_1200x1200.png` | 1200×1200 | Responsive display square |
| `link-landscape_1200x628.png` | 1200×628 | Responsive display landscape |
| `rd-portrait_960x1200.png` | 960×1200 | Responsive display portrait |
| `mrec_300x250.png` | 300×250 | Medium rectangle |
| `large-rect_336x280.png` | 336×280 | Large rectangle |
| `square-250_250x250.png` | 250×250 | Square |
| `leaderboard_728x90.png` | 728×90 | Leaderboard |
| `billboard_970x250.png` | 970×250 | Billboard |
| `mobile-banner_320x50.png` | 320×50 | Mobile banner |
| `large-mobile_320x100.png` | 320×100 | Large mobile banner |
| `half-page_300x600.png` | 300×600 | Half page |
| `wide-skyscraper_160x600.png` | 160×600 | Wide skyscraper |

## Campaign setup (recommended)

1. **Meta — Off-grid home**  
   Campaign: Traffic or Leads · 3 ad sets (A / B / C) or 1 Advantage+ ad set with 3 creatives.  
   Upload all 6 Meta sizes per variant.

2. **Meta — Off-grid business**  
   Separate ad set. Interest: retail, hospitality, offices. Upload all 6 Meta sizes.

3. **Meta — Net billing home**  
   Same structure as off-grid home, variants A / B only.

4. **Meta — Net billing business**  
   Separate ad set.

5. **Google — Demand Gen / PMax**  
   Upload landscape 1200×628, square 1200×1200, portrait 960×1200 per variant.  
   Add IAB banners only on a Display or PMax asset group that allows them.

6. **Landing**  
   One form page per product. Do not send off-grid and net billing to the same thank-you path if you need clean A/B readouts.

## Rebuild

```bash
node marketing/ads-offgrid-netbilling-sep2026/scripts/render-ads.mjs
```

Edit copy in `html/ad.html` (`CREATIVES`), then re-render.
