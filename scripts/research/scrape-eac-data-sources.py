# -*- coding: utf-8 -*-
"""Scrape the most valuable EAC data pages for CRM enrichment."""
import sys, io, re, json, urllib.request
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122'}
BASE = "https://www.eac.com.cy"

PAGES = [
    ("hosting_capacity",   "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/hosting-capacity.aspx"),
    ("curtailments",       "/EN/RegulatedActivities/Distribution/DistributionSystemOperation/Pages/res-e_curtailments.aspx"),
    ("res_energy_purchase","/EN/RegulatedActivities/Supply/renewableenergy/resenergypurchase/Pages/default.aspx"),
    ("statistical_figures","/EN/EAC/FinancialInformation/Pages/StatisticalFigures.aspx"),
    ("general_res",        "/EN/RegulatedActivities/Distribution/renewableenergy/Pages/general.aspx"),
    ("documents_dir",      "/EN/RegulatedActivities/Distribution/renewableenergy/Documents/"),
    ("mgmt_private_mv",    "/EN/RegulatedActivities/Distribution/DistributionSystemOperation/Pages/Management_of_RES-E_Units_Private_MV_Networks.aspx"),
]

def fetch(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        return urllib.request.urlopen(req, timeout=12).read().decode('utf-8', errors='replace')
    except Exception as e:
        return f"ERROR: {e}"

def clean_text(html):
    t = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    t = re.sub(r'<style[^>]*>.*?</style>', '', t, flags=re.DOTALL)
    t = re.sub(r'<[^>]+>', ' ', t)
    return re.sub(r'\s+', ' ', t).strip()

def extract_pdfs(html):
    return list(dict.fromkeys(re.findall(r'href=[\'"]([^\'"]*\.pdf)[\'"]', html, re.IGNORECASE)))

def extract_tables(html):
    """Try to find table data."""
    tables = re.findall(r'<table[^>]*>(.*?)</table>', html, re.DOTALL | re.IGNORECASE)
    results = []
    for t in tables:
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', t, re.DOTALL | re.IGNORECASE)
        table_data = []
        for row in rows:
            cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', row, re.DOTALL | re.IGNORECASE)
            cleaned = [re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', c)).strip() for c in cells]
            if any(c for c in cleaned):
                table_data.append(cleaned)
        if len(table_data) > 1:
            results.append(table_data)
    return results

for name, path in PAGES:
    url = BASE + path
    print(f"\n{'='*60}")
    print(f"PAGE: {name}")
    print(f"URL:  {url}")
    html = fetch(url)
    if html.startswith("ERROR"):
        print(f"  {html}")
        continue
    
    text = clean_text(html)
    pdfs = extract_pdfs(html)
    tables = extract_tables(html)
    
    print(f"  Text length: {len(text)} chars | PDFs: {len(pdfs)} | Tables: {len(tables)}")
    
    if pdfs:
        print("  PDFs:")
        for p in pdfs[:10]:
            print(f"    {p}")
    
    if tables:
        print(f"  Tables found: {len(tables)}")
        for i, t in enumerate(tables[:3]):
            print(f"    Table {i+1} ({len(t)} rows x {max(len(r) for r in t)} cols):")
            for row in t[:5]:
                print(f"      {row}")
    
    # Key text snippets
    keywords = ['MW', 'kW', 'capacity', 'curtail', 'queue', 'waiting', 'connected', 'statistic', 'report', 'data', 'download']
    for kw in keywords:
        idx = text.lower().find(kw.lower())
        if idx > 0:
            snippet = text[max(0,idx-30):idx+150].strip()
            print(f"  [{kw}] ...{snippet}...")
            break
