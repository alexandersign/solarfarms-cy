# -*- coding: utf-8 -*-
"""Scrape EAC renewables section to discover all available data sources."""
import sys, io, re, json, urllib.request
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122'}

def fetch(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        return urllib.request.urlopen(req, timeout=12).read().decode('utf-8', errors='replace')
    except Exception as e:
        return f"ERROR: {e}"

def extract_links(html, base="https://www.eac.com.cy"):
    links = re.findall(r'href=[\'"](.*?)[\'"]', html)
    out = []
    for l in links:
        if not l.startswith('http'):
            l = base + l if l.startswith('/') else base + '/' + l
        out.append(l)
    return list(dict.fromkeys(out))  # dedup

# 1. Main RES systems page
print("=== EAC RES Systems page ===")
html1 = fetch("https://www.eac.com.cy/EN/RegulatedActivities/Distribution/renewableenergy/Pages/ressystems.aspx")
if "ERROR" not in html1:
    links1 = extract_links(html1)
    pdfs = [l for l in links1 if '.pdf' in l.lower()]
    interesting = [l for l in links1 if any(k in l.lower() for k in ['res', 'renew', 'produc', 'licens', 'table', 'stat', 'report', 'document', 'list'])]
    print(f"PDFs found: {len(pdfs)}")
    for p in pdfs: print(f"  PDF: {p}")
    print(f"Other interesting links: {len(interesting)}")
    for l in interesting[:20]: print(f"  {l}")

# 2. Distribution renewables home
print("\n=== EAC Renewables Distribution home ===")
html2 = fetch("https://www.eac.com.cy/EN/RegulatedActivities/Distribution/renewableenergy/Pages/default.aspx")
if "ERROR" not in html2:
    # Extract visible text
    text = re.sub(r'<script[^>]*>.*?</script>', '', html2, flags=re.DOTALL)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    # Find content
    for keyword in ['RES', 'Application', 'Connection', 'Table', 'Queue', 'List', 'Publication']:
        idx = text.find(keyword)
        if idx > 0:
            snippet = text[max(0,idx-50):idx+200].strip()
            print(f"  [{keyword}] ...{snippet}...")
    
    links2 = extract_links(html2)
    pdfs2 = [l for l in links2 if '.pdf' in l.lower()]
    res_links = [l for l in links2 if 'renewableenergy' in l.lower() or 'res' in l.lower()]
    print(f"\nSub-pages in renewableenergy section:")
    for l in sorted(set(res_links))[:30]: print(f"  {l}")
    print(f"\nPDFs: {len(pdfs2)}")
    for p in pdfs2[:20]: print(f"  {p}")

# 3. Try to discover queue / applications pages
print("\n=== Probing known EAC sub-pages ===")
probes = [
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/ConnectionQueue.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/resapplications.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/Applications.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/queue.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/Statistics.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/statistics.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/Reports.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/publications.aspx",
    "/EN/RegulatedActivities/Distribution/Pages/RES.aspx",
    "/EN/CustomerService/SmallScalePV/Pages/default.aspx",
    "/EN/RegulatedActivities/Distribution/renewableenergy/Documents/",
]
BASE = "https://www.eac.com.cy"
for path in probes:
    url = BASE + path
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        r = urllib.request.urlopen(req, timeout=6)
        print(f"  200 OK: {url}")
        # Quick check for PDFs
        content = r.read().decode('utf-8', errors='replace')
        pdfs = re.findall(r'href=[\'"]([^\'"]*\.pdf)[\'"]', content, re.IGNORECASE)
        if pdfs:
            for p in pdfs[:5]: print(f"    PDF: {p}")
    except Exception as e:
        code = str(e)[:40]
        print(f"  {code}: {path}")
