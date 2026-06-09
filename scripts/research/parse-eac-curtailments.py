# -*- coding: utf-8 -*-
"""
Parse EAC Daily Curtailment Reports (system-wide, not per-plant).
Extracts: date, time window, total energy, curtailed energy, % curtailed.
Outputs JSON summary + stats for KB and CRM.
"""
import sys, io, re, json
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

try:
    import pdfplumber
except ImportError:
    print("pip install pdfplumber"); exit(1)

REPO = Path(__file__).resolve().parents[2]
OUT = REPO / "marketing" / "research" / "eac-curtailment-events.json"

def parse_float(s):
    try: return float(re.sub(r'[^\d.,]', '', s).replace(',', '.'))
    except: return None

def parse_page(page):
    text = page.extract_text() or ""
    d = {}
    m = re.search(r'Date of Curtailment\s+(\d{2}/\d{2}/\d{4})', text)
    if m: d['date'] = m.group(1)
    m = re.search(r'Start of Curtailment\s+([\d:]+)', text)
    if m: d['start'] = m.group(1)
    m = re.search(r'End of Curtailment\s+([\d:]+)', text)
    if m: d['end'] = m.group(1)
    m = re.search(r'Total Estimated Energy of\s*[^:]*?:\s*([\d,\.]+)\s*MWh', text, re.DOTALL)
    if not m: m = re.search(r'Total Estimated Energy of[\s\S]{0,30}?([\d,\.]+)\s*MWh', text)
    if m: d['total_mwh'] = parse_float(m.group(1))
    m = re.search(r'Total Estimated Curtailed\s*[^:]*?:\s*([\d,\.]+)\s*MWh', text, re.DOTALL)
    if not m: m = re.search(r'Total Estimated Curtailed\s*Energy[\s\S]{0,20}?([\d,\.]+)\s*MWh', text)
    if m: d['curtailed_mwh'] = parse_float(m.group(1))
    m = re.search(r'Percentage of Curtailed\s*[^:]*?:\s*([\d,\.]+)\s*%', text, re.DOTALL)
    if not m: m = re.search(r'Percentage[\s\S]{0,30}?([\d,\.]+)\s*%', text)
    if m: d['curtailed_pct'] = parse_float(m.group(1))
    m = re.search(r'Reason of Curtailment\s+(.+?)(?:Total|$)', text, re.DOTALL)
    if m: d['reason'] = m.group(1).strip()[:120]
    return d if d.get('date') else None

all_events = []
for year, fname in [(2022, 'CURTAILMENTS_2022.pdf'), (2023, 'CURTAILMENTS_2023.pdf')]:
    path = REPO / 'marketing' / 'research' / fname
    if not path.exists(): continue
    with pdfplumber.open(path) as pdf:
        events = []
        for page in pdf.pages:
            ev = parse_page(page)
            if ev:
                ev['year'] = year
                events.append(ev)
        print(f"{year}: {len(events)} curtailment events")
        all_events.extend(events)

# Aggregate stats per year
for year in [2022, 2023]:
    evs = [e for e in all_events if e.get('year') == year]
    total_curtailed = sum(e.get('curtailed_mwh', 0) or 0 for e in evs)
    total_gen = sum(e.get('total_mwh', 0) or 0 for e in evs)
    avg_pct = sum(e.get('curtailed_pct', 0) or 0 for e in evs) / len(evs) if evs else 0
    max_ev = max(evs, key=lambda e: e.get('curtailed_pct', 0) or 0) if evs else {}
    print(f"\n--- {year} Summary ---")
    print(f"  Events: {len(evs)}")
    print(f"  Total curtailed: {total_curtailed:.1f} MWh")
    print(f"  Total generation on curtailed days: {total_gen:.1f} MWh")
    print(f"  Avg curtailment %: {avg_pct:.1f}%")
    if max_ev:
        print(f"  Worst day: {max_ev.get('date')} — {max_ev.get('curtailed_pct')}% ({max_ev.get('curtailed_mwh')} MWh)")
    # Monthly breakdown
    from collections import defaultdict
    by_month = defaultdict(list)
    for e in evs:
        dt_str = e.get('date', '')
        try: month = datetime.strptime(dt_str, '%d/%m/%Y').strftime('%b')
        except: month = '?'
        by_month[month].append(e.get('curtailed_pct', 0) or 0)
    month_order = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    print("  Monthly events: " + ", ".join(f"{m}:{len(by_month[m])}" for m in month_order if by_month[m]))

# Save
OUT.write_text(json.dumps({
    'events': all_events,
    'total_events': len(all_events),
    'by_year': {
        str(y): {
            'events': len([e for e in all_events if e.get('year')==y]),
            'total_curtailed_mwh': round(sum(e.get('curtailed_mwh',0) or 0 for e in all_events if e.get('year')==y), 1),
            'avg_pct': round(sum(e.get('curtailed_pct',0) or 0 for e in all_events if e.get('year')==y) / max(1,len([e for e in all_events if e.get('year')==y])), 1),
        } for y in [2022, 2023]
    }
}, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"\nSaved {len(all_events)} events to {OUT}")
