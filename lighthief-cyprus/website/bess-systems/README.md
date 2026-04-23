# BESS Systems Page — lighthief.cy

**File:** `bess-page.html`  
**Target:** `https://lighthief.cy/bess-systems/` (or equivalent Divi page)

---

## How to Deploy in Divi (WordPress)

### Option A — Full Code Module (recommended for exact layout)

1. In WP Admin → Pages → Add New
2. Name the page "Battery Energy Storage Systems"
3. Open with **Divi Builder** → Use Divi Builder
4. Add a **1-column row** → insert a **Code module**
5. Open `bess-page.html` in a text editor, **select all**, paste into the Code module
6. Remove the `<nav>` block (lines 190–210) if your Divi theme already has navigation
7. Remove the `<footer>` block if your Divi theme has a global footer
8. Save & publish

### Option B — Section by Section in Divi Visual Builder

Use the HTML as a **content reference** and build using native Divi modules:

| Page Section | Divi Module | Notes |
|---|---|---|
| Hero | **Fullwidth Header** | Navy gradient background, gold CTA button |
| Proof bar | **Blurb** (row of 5) | White text on navy row |
| Intro | **Text** + **Number Counter** modules | |
| Product cards | **Blurb** or **Portfolio** | One card per product |
| Specs table | **Code module** | Paste just the `<table class="specs">` block |
| Use cases | **Blurb** (3-col) | Icon + title + text |
| Certifications | **Icon + Text** (4-col) | |
| Why Lighthief | **Text** (2-col, left-border style) | |
| Process steps | **Step module** or **Blurb** (5-col) | |
| CTA | **Call to Action** module | Gold on navy |

---

## Adding Images

All image slots are marked with `<!-- WP IMAGE SLOT -->` comments in the HTML.

### Images to upload to WP Media Library

| Slot | Suggested image | Source |
|------|----------------|--------|
| Hero | Linyang Atlantic 5MWh container (outdoor) | Request from Linyang/Kamil |
| T1 card | BCS T1 skid in 20ft container | Request from Linyang |
| T2 card | BCS T2 dual-PCS skid | Request from Linyang |
| T4 card | BCS T4 in 40ft HC container | Request from Linyang |
| T8 card | BCS T8 10MW station | Request from Linyang |
| Deye MS-GS215 | `ms-gs215-cabinet.webp` | `lighthief-cyprus/pv-clients/habanay/assets/` |
| Deye GE-F120 | Product photo from Deye brochure | `docs/internal/deye-specs/` |

To activate an image slot, find the `<!-- Uncomment ... -->` comment in the HTML and replace the placeholder `<div>` with the `<img>` tag using the WP Media URL.

---

## Brand Colours (for Divi Global Settings)

| Token | Hex | Use |
|-------|-----|-----|
| Primary Navy | `#1A365D` | Headers, nav, table rows |
| Mid Navy | `#2B5FA0` | Gradients, hover |
| Gold | `#C9A432` | Headings, badges, CTAs |
| Gold Dark | `#9C7D22` | Gold hover states |
| Body BG | `#F0F4F8` | Page background |

---

## Phone / Contact Details

Replace the placeholder `+357 99 000 000` in the CTA section with the real Lighthief Cyprus number before publishing.
