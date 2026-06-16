# -*- coding: utf-8 -*-
"""
Scrape CERA monthly production statistics from cera.org.cy/smv/sp-graph.
Extracts monthly MWh by producer category (PV FIT, PV net-billing, Wind, Biomass, IPP, EAC).

Saves to: marketing/research/cera-production-monthly.json

Usage:
    python scripts/research/scrape-cera-production-stats.py
    python scripts/research/scrape-cera-production-stats.py --dry-run

Run monthly to track PV production vs curtailment trends for the BESS ROI pitch.
"""

import sys, io, re, json, urllib.request
from pathlib import Path
from datetime import datetime, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

REPO = Path(__file__).resolve().parents[2]
OUT  = REPO / 'marketing' / 'research' / 'cera-production-monthly.json'

# CERA market participants share pages (EN + EL)
URLS = [
    'https://www.cera.org.cy/en-gb/smv/sp-graph',
    'https://www.cera.org.cy/en-gb/ilektrismos/details/statistika-ape',
]
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122'}

def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    return urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='replace')

def extract_tables(html: str) -> list:
    """Extract all HTML table data as list of (headers, rows) dicts."""
    tables = []
    for match in re.finditer(r'<table[^>]*>(.*?)</table>', html, re.DOTALL | re.IGNORECASE):
        raw = match.group(1)
        # Headers
        ths = re.findall(r'<th[^>]*>(.*?)</th>', raw, re.DOTALL | re.IGNORECASE)
        headers = [re.sub(r'<[^>]+>', '', h).strip() for h in ths]
        # Rows
        row_matches = re.findall(r'<tr[^>]*>(.*?)</tr>', raw, re.DOTALL | re.IGNORECASE)
        rows = []
        for row_html in row_matches:
            cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', row_html, re.DOTALL | re.IGNORECASE)
            cleaned = [re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', c)).strip() for c in cells]
            if any(c for c in cleaned):
                rows.append(cleaned)
        if rows:
            tables.append({'headers': headers, 'rows': rows})
    return tables

def find_production_tables(html: str) -> list:
    """Find tables that look like monthly production data (contain MWh or month names)."""
    month_keywords = ['january','february','march','april','may','june','july',
                      'august','september','october','november','december',
                      'ιαν','φεβ','μαρ','απρ','μαι','ιουν']
    useful = []
    all_tables = extract_tables(html)
    text = html.lower()
    for t in all_tables:
        flat = ' '.join(str(r) for r in t['rows']).lower()
        if any(kw in flat for kw in month_keywords) and len(t['rows']) >= 6:
            useful.append(t)
    return useful

def extract_numbers_from_text(html: str) -> dict:
    """Extract key statistics from page text."""
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text)

    stats = {}
    # Look for MWh/GWh figures near producer type keywords
    patterns = [
        (r'PV\s+FIT[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'pv_fit_mwh'),
        (r'net[- ]?billin[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'net_billing_mwh'),
        (r'net[- ]?meter[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'net_metering_mwh'),
        (r'wind[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'wind_mwh'),
        (r'biomass[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'biomass_mwh'),
        (r'IPP[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'ipp_mwh'),
        (r'EAC[^\d]{0,30}([\d,\.]+)\s*(MWh|GWh|kWh)', 'eac_mwh'),
        (r'total[^\d]{0,20}([\d,\.]+)\s*(MWh|GWh|kWh)', 'total_mwh'),
    ]
    for pattern, key in patterns:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            try:
                val = float(m.group(1).replace(',', ''))
                unit = m.group(2).upper()
                if unit == 'GWH': val *= 1000
                elif unit == 'KWH': val /= 1000
                stats[key] = val
            except ValueError:
                pass
    return stats

print("=== CERA Production Stats Scraper ===\n")
results = {}
all_tables = []

for url in URLS:
    print(f"Fetching: {url}")
    try:
        html = fetch(url)
        tables = find_production_tables(html)
        stats = extract_numbers_from_text(html)
        print(f"  Tables found: {len(tables)}")
        print(f"  Stats extracted: {list(stats.keys())}")
        if tables:
            print(f"  Best table: {len(tables[0]['rows'])} rows x {len(tables[0]['headers'])} cols")
            print(f"  Headers: {tables[0]['headers'][:6]}")
            for row in tables[0]['rows'][:5]:
                print(f"    {row[:6]}")
        all_tables.extend(tables)
        if stats:
            results[url] = stats
    except Exception as e:
        print(f"  ERROR: {e}")

# Save whatever we found
payload = {
    'scraped_at': datetime.now(timezone.utc).isoformat(),
    'source_urls': URLS,
    'note': (
        'CERA monthly production stats. If tables are empty, the page may require JS rendering '
        'or a different URL. Use Playwright scraper or check manually at cera.org.cy/smv/sp-graph. '
        'Key fields: pv_fit_mwh, net_billing_mwh, wind_mwh, biomass_mwh, ipp_mwh, total_mwh.'
    ),
    'stats_by_url': results,
    'tables': [
        {'headers': t['headers'], 'sample_rows': t['rows'][:10]}
        for t in all_tables[:5]
    ],
}
OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"\nSaved to {OUT}")

if not any(results.values()):
    print("\nNOTE: CERA pages use JavaScript rendering — static fetch returns empty tables.")
    print("To get the data, use Playwright:")
    print()
    print("  python scripts/research/scrape-cera-production-playwright.py")
    print()
    print("Or manually: visit https://www.cera.org.cy/en-gb/smv/sp-graph in a browser,")
    print("  right-click the table → copy as CSV, save to marketing/research/cera-production-manual.csv")
    print("  then run: python scripts/research/parse-cera-csv.py")

# ─── Playwright version (run if pdfplumber static fails) ───────────────────
# Uncomment and run if you have Playwright installed:
"""
PLAYWRIGHT_FALLBACK = True
if PLAYWRIGHT_FALLBACK:
    import asyncio
    from playwright.async_api import async_playwright

    async def scrape_with_playwright():
        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=True)
            page = await browser.new_page(user_agent='Mozilla/5.0 Chrome/122')
            await page.goto('https://www.cera.org.cy/en-gb/smv/sp-graph', wait_until='networkidle')
            await page.wait_for_timeout(3000)
            html = await page.content()
            await browser.close()
        tables = find_production_tables(html)
        stats = extract_numbers_from_text(html)
        print(f"Playwright: {len(tables)} tables, stats: {list(stats.keys())}")
        for t in tables[:3]:
            print(f"  {len(t['rows'])} rows: {t['headers'][:5]}")
            for row in t['rows'][:4]:
                print(f"    {row[:6]}")
        return tables, stats

    loop = asyncio.new_event_loop()
    tables, stats = loop.run_until_complete(scrape_with_playwright())
    payload['tables'] = [{'headers': t['headers'], 'sample_rows': t['rows'][:12]} for t in tables[:5]]
    payload['stats_by_url']['playwright'] = stats
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"Updated: {OUT}")
"""
