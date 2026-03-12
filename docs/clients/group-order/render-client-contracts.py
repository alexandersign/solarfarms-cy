"""
Render client contract packages: LOI + EPC (Batch 1) + LTSA (Group Framework)
For: ABIO Power, Esperia/Galascope, Timotheos Timotheou, Lampros Andreadis
"""

import os
from datetime import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
NOW = datetime.now().strftime("%d %B %Y")

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
:root{--primary:#1e3a5f;--accent:#2563eb;--bg:#f8fafc;--border:#e2e8f0;--text:#1a202c;--muted:#64748b;--ok:#059669}
body{font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;font-size:9.5pt;line-height:1.6;color:var(--text);background:#edf2f7;padding:20px}
.page{background:#fff;max-width:210mm;margin:0 auto 24px;padding:22mm 18mm;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid var(--primary);padding-bottom:12px;margin-bottom:20px}
.logo{font-size:20pt;font-weight:800;color:var(--primary);letter-spacing:-.5px}.logo span{color:var(--accent)}
.doc-info{text-align:right;font-size:7.5pt;color:var(--muted);line-height:1.7}
h1{font-size:14pt;color:var(--primary);margin:20px 0 6px}
h2{font-size:11pt;color:var(--primary);margin:22px 0 8px;border-bottom:2px solid var(--accent);padding-bottom:4px;display:inline-block}
h3{font-size:9.5pt;color:var(--primary);margin:10px 0 5px}
table{width:100%;border-collapse:collapse;font-size:8pt;margin:8px 0 14px}
th{background:var(--primary);color:#fff;padding:6px 7px;text-align:left;font-weight:600}
td{padding:5px 7px;border-bottom:1px solid var(--border)}
tr:nth-child(even){background:#fafbfc}
.r{text-align:right}.c{text-align:center}
.price{font-weight:700;color:var(--accent)}
.total-row{background:var(--primary)!important;color:#fff;font-weight:700}
.total-row td{border:none}
.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0 20px}
.metric-box{background:var(--bg);border-radius:8px;padding:14px 10px;text-align:center;border:1px solid var(--border)}
.metric-box .val{font-size:18pt;font-weight:800;color:var(--primary)}
.metric-box .lbl{font-size:7pt;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:10px 14px;margin:10px 0;font-size:8pt}
.section{margin:16px 0}
ul{margin-left:18px}li{margin-bottom:3px;font-size:8.5pt}
.footer{margin-top:20px;padding-top:10px;border-top:2px solid var(--primary);font-size:7pt;color:var(--muted);text-align:center}
.sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin:30px 0}
.sig-box{border-top:1px solid var(--text);padding-top:8px;font-size:8pt}
.sig-box .label{color:var(--muted);font-size:7pt}
.badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:7pt;font-weight:700}
.badge-green{background:#d1fae5;color:#065f46}
.badge-blue{background:#dbeafe;color:#1e40af}
.badge-amber{background:#fef3c7;color:#92400e}
@media print{body{background:#fff;padding:0}.page{box-shadow:none;margin:0;padding:15mm}}
"""


GROUPS = {
    'abio': {
        'name': 'ABIO Power',
        'contact': 'Michalis Hadjimichael',
        'legal_name': '[ABIO Power Entity Name]',
        'folder': 'Group1_ABIO_Power',
        'total_parks': 25, 'total_mw': 125.0, 'total_mwh': 430.28,
        'batch1': [
            {'name': 'Easy Power 1',    'mw': 5.0,  'mwh': 10,    'containers': 3, 'district': 'Nicosia',  'revenue': 1_361_050},
            {'name': 'Easy Power 2',    'mw': 4.5,  'mwh': 10,    'containers': 3, 'district': 'Nicosia',  'revenue': 1_401_540},
            {'name': 'Dianary 1',       'mw': 2.5,  'mwh': 10,    'containers': 3, 'district': 'Nicosia',  'revenue': 1_206_300},
            {'name': 'Waneron',         'mw': 3.0,  'mwh': 11.28, 'containers': 3, 'district': 'Nicosia',  'revenue': 1_472_981},
            {'name': 'Solartech 3 Ext', 'mw': 2.5,  'mwh': 10,    'containers': 3, 'district': 'Nicosia',  'revenue': 1_206_300},
        ],
        'future_parks': '20 additional parks (379 MWh) across Batches 2–3',
        'revenue_total': 52_609_992,
    },
    'esperia': {
        'name': 'Esperia Energy / Galascope',
        'contact': 'Dino Constantinou',
        'legal_name': '[Esperia Energy / Galascope Limited]',
        'folder': 'Group2_Esperia_Energy',
        'total_parks': 11, 'total_mw': 79.5, 'total_mwh': 315.50,
        'batch1': [
            {'name': 'Galascope 1', 'mw': 5.0, 'mwh': 20, 'containers': 6, 'district': 'Famagusta', 'revenue': 2_258_900},
            {'name': 'Galascope 2', 'mw': 2.5, 'mwh': 10, 'containers': 3, 'district': 'Famagusta', 'revenue': 1_206_300},
        ],
        'future_parks': '9 additional parks (285.5 MWh) including 5 Esperia Tseri 2028 parks',
        'revenue_total': 36_412_812,
    },
    'timotheos': {
        'name': 'Timotheos Timotheou',
        'contact': 'Timotheos Timotheou',
        'legal_name': '[AGM Group / L&T Sun Energy Entity]',
        'folder': 'Group6_Timotheos_Timotheou',
        'total_parks': 9, 'total_mw': 25.5, 'total_mwh': 81.00,
        'batch1': [
            {'name': 'AGM Sunfield 1',   'mw': 5.0, 'mwh': 15, 'containers': 5, 'district': 'Nicosia',  'revenue': 1_961_880},
            {'name': 'L&T Sun Energy',    'mw': 5.0, 'mwh': 15, 'containers': 5, 'district': 'Limassol', 'revenue': 1_961_880},
            {'name': 'TBC (5 MWh park)',  'mw': 1.5, 'mwh': 5,  'containers': 2, 'district': 'TBC',      'revenue': 800_000},
        ],
        'future_parks': '6 additional parks (46 MWh) across Batches 2–3',
        'revenue_total': 11_818_919,
    },
    'lampros': {
        'name': 'Lampros Andreadis',
        'contact': 'Lampros Andreadis',
        'legal_name': '[Solar Breeze Ltd / Solar Garden Ltd]',
        'folder': 'Group3_Lampros_Andreadis',
        'total_parks': 2, 'total_mw': 4.8, 'total_mwh': 15.00,
        'batch1': [
            {'name': 'Solar Breeze', 'mw': 1.51, 'mwh': 5,  'containers': 2, 'district': 'Limassol', 'revenue': 795_443},
            {'name': 'Solar Garden', 'mw': 3.29, 'mwh': 10, 'containers': 3, 'district': 'Limassol', 'revenue': 1_321_976},
        ],
        'future_parks': 'None — full portfolio is Batch 1',
        'revenue_total': 2_117_420,
    },
}


def fmt(n):
    return f"€{n:,.0f}"

def header_html(title, ref, doc_type):
    return f"""
    <div class="header">
        <div><div class="logo">Light<span>hief</span></div><div style="font-size:7pt;color:var(--muted)">Lighthief Cyprus Ltd</div></div>
        <div class="doc-info">{doc_type}<br>{ref}<br>{NOW}<br>CONFIDENTIAL</div>
    </div>
    <h1>{title}</h1>"""

def footer_html():
    return f"""<div class="footer">Lighthief Cyprus Ltd | HE 477423 | 28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus<br>office@lighthief.com | +357 77 77 00 50 | solarfarms.cy</div>"""

def sig_html():
    return """
    <div class="sig-grid">
        <div class="sig-box"><div class="label">For Lighthief Cyprus Ltd</div><br>Name: Alexander Papacosta<br>Title: Managing Director<br><br>Signature: ___________________________<br><br>Date: ___________________________</div>
        <div class="sig-box"><div class="label">For the Client</div><br>Name: ___________________________<br>Title: ___________________________<br><br>Signature: ___________________________<br><br>Date: ___________________________</div>
    </div>"""


# ─── LOI ──────────────────────────────────────────────────────────────

def render_loi(key, g):
    b1 = g['batch1']
    b1_mwh = sum(p['mwh'] for p in b1)
    b1_parks = len(b1)
    b1_containers = sum(p['containers'] for p in b1)
    b1_revenue = sum(p['revenue'] for p in b1)

    park_rows = ""
    for p in b1:
        park_rows += f"<tr><td>{p['name']}</td><td class='c'>{p['mw']}</td><td class='c'>{p['mwh']}</td><td class='c'>{p['containers']}</td><td>{p['district']}</td><td class='badge badge-green'>Batch 1</td></tr>"

    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LOI — {g['name']} | Lighthief</title><style>{CSS}</style></head><body><div class="page">
{header_html(f"Letter of Intent — Full Portfolio Commitment<br>{g['name']}", f"LCY-LOI-{key.upper()}-2026", "LETTER OF INTENT")}

<div class="section">
<p>Dear Lighthief Cyprus Ltd,</p>
<p>This Letter of Intent ("LOI") confirms the commitment of <strong>{g['legal_name']}</strong> ("{g['name']}") to proceed with the full battery energy storage system (BESS) portfolio as outlined below, comprising <strong>{g['total_parks']} parks</strong> totalling <strong>{g['total_mw']} MW / {g['total_mwh']} MWh</strong>.</p>
</div>

<h2>1. Portfolio Overview</h2>
<div class="metric-grid">
    <div class="metric-box"><div class="val">{g['total_parks']}</div><div class="lbl">Total Parks</div></div>
    <div class="metric-box"><div class="val">{g['total_mw']}</div><div class="lbl">Total MW</div></div>
    <div class="metric-box"><div class="val">{g['total_mwh']}</div><div class="lbl">Total MWh</div></div>
    <div class="metric-box"><div class="val">{fmt(g['revenue_total'])}</div><div class="lbl">Portfolio Value</div></div>
</div>

<h2>2. Batch 1 — Proceeding Now</h2>
<p>The following parks are confirmed for immediate execution under the Batch 1 EPC Agreement (signed concurrently with this LOI):</p>
<table>
<tr><th>Park Name</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th>District</th><th>Batch</th></tr>
{park_rows}
<tr class="total-row"><td>Batch 1 Total</td><td class="c">{sum(p['mw'] for p in b1):.1f}</td><td class="c">{b1_mwh:.2f}</td><td class="c">{b1_containers}</td><td></td><td></td></tr>
</table>

<p><strong>Batch 1 Contract Value:</strong> {fmt(b1_revenue)} (excl. VAT)</p>
<p><strong>Target Delivery:</strong> CIF Limassol — August 2026</p>
<p><strong>Target Commissioning:</strong> December 2026</p>

<h2>3. Future Batches — Committed Pipeline</h2>
<p>{g['future_parks']}</p>
<p>The Client confirms its intention to execute EPC Agreements for all remaining parks within six (6) months of the Batch 1 PAC date, subject to:</p>
<ul>
    <li>Successful commissioning and performance of the Batch 1 systems;</li>
    <li>Availability of grid connection approvals from EAC/DSO;</li>
    <li>Finalisation of site-specific technical designs;</li>
    <li>Agreement on pricing for subsequent batches (based on the prevailing Lighthief pricing schedule or as separately agreed).</li>
</ul>

<h2>4. LTSA Framework</h2>
<p>The Client confirms its intention to enter into a Long-Term Service Agreement (LTSA) covering all parks in its portfolio. The LTSA shall:</p>
<ul>
    <li>Commence for each park from its PAC date;</li>
    <li>Apply a group-level 97% availability guarantee calculated across all active parks;</li>
    <li>Accumulate parks into the availability calculation as they are commissioned;</li>
    <li>Be priced per MWh per year in accordance with the agreed LTSA pricing schedule.</li>
</ul>

<h2>5. Purpose of this LOI</h2>
<p>This LOI is provided to Lighthief Cyprus Ltd to:</p>
<ul>
    <li>Confirm the Client's commitment to the full portfolio (not just Batch 1);</li>
    <li>Support Lighthief's procurement planning with its OEM equipment supplier;</li>
    <li>Evidence the pipeline for financing and insurance purposes;</li>
    <li>Establish the basis for the group-level LTSA framework.</li>
</ul>

<div class="highlight">
<strong>Non-Binding:</strong> This LOI is a statement of intent and does not constitute a binding obligation to execute EPC contracts for future batches. The binding commitment for Batch 1 is contained in the EPC Agreement executed concurrently. Future batch EPC contracts will be executed separately upon mutual agreement.
</div>

<h2>6. Signatures</h2>
{sig_html()}
{footer_html()}
</div></body></html>"""


# ─── EPC ──────────────────────────────────────────────────────────────

def render_epc(key, g):
    b1 = g['batch1']
    b1_mwh = sum(p['mwh'] for p in b1)
    b1_revenue = sum(p['revenue'] for p in b1)
    b1_containers = sum(p['containers'] for p in b1)

    park_rows = ""
    for p in b1:
        park_rows += f"<tr><td>{p['name']}</td><td class='c'>{p['mw']}</td><td class='c'>{p['mwh']}</td><td class='c'>{p['containers']}</td><td>{p['district']}</td><td class='r price'>{fmt(p['revenue'])}</td></tr>"

    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EPC Agreement — {g['name']} Batch 1 | Lighthief</title><style>{CSS}</style></head><body><div class="page">
{header_html(f"Engineering, Procurement &amp; Construction Agreement<br>Battery Energy Storage System (BESS) — Batch 1<br>{g['name']}", f"LCY-EPC-{key.upper()}-B1-2026", "EPC AGREEMENT")}

<div class="section">
<h2>Parties</h2>
<table>
<tr><th style="width:30%">Contractor</th><td><strong>Lighthief Cyprus Ltd</strong><br>HE 477423, 28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus</td></tr>
<tr><th>Client</th><td><strong>{g['legal_name']}</strong><br>[Address]</td></tr>
<tr><th>Effective Date</th><td>[●] March 2026</td></tr>
</table>
</div>

<h2>Batch 1 — Scope of Works</h2>
<div class="metric-grid">
    <div class="metric-box"><div class="val">{len(b1)}</div><div class="lbl">Parks</div></div>
    <div class="metric-box"><div class="val">{sum(p['mw'] for p in b1):.1f}</div><div class="lbl">MW</div></div>
    <div class="metric-box"><div class="val">{b1_mwh:.2f}</div><div class="lbl">MWh</div></div>
    <div class="metric-box"><div class="val">{fmt(b1_revenue)}</div><div class="lbl">Contract Price</div></div>
</div>

<table>
<tr><th>Park Name</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th>District</th><th class="r">Contract Price</th></tr>
{park_rows}
<tr class="total-row"><td>TOTAL</td><td class="c">{sum(p['mw'] for p in b1):.1f}</td><td class="c">{b1_mwh:.2f}</td><td class="c">{b1_containers}</td><td></td><td class="r">{fmt(b1_revenue)}</td></tr>
</table>

<p><strong>All prices exclude VAT (19%).</strong></p>

<h2>Key Commercial Terms</h2>
<table>
<tr><th style="width:35%">Term</th><th>Detail</th></tr>
<tr><td>Equipment</td><td>Linyang Power Atlantic LFP Battery Containers (5.015 MWh each) + PCS + MV Skid</td></tr>
<tr><td>Incoterms</td><td>CIF Limassol, Cyprus (Incoterms 2020)</td></tr>
<tr><td>Delivery</td><td>CIF Limassol — August 2026</td></tr>
<tr><td>Commissioning Target</td><td>December 2026</td></tr>
<tr><td>Warranty</td><td>5 years from PAC (OEM equipment + installation workmanship)</td></tr>
<tr><td>EPC Works Warranty</td><td>2 years from PAC (civil, cabling, grounding)</td></tr>
<tr><td>Liability Cap</td><td>Tiered: 10% warranty / 50% general / 100% fraud+manufacturing</td></tr>
<tr><td>Delay LDs</td><td>0.1%/day (d1-30), 0.15%/day (d31-60), 0.2%/day (d61+), 10% cap</td></tr>
<tr><td>Insurance (Contractor)</td><td>EUR 1M GL + EUR 1M PI + CAR</td></tr>
<tr><td>Insurance (OEM)</td><td>EUR 5M Product Liability (AXA Tianping) + EUR 2M PI</td></tr>
</table>

<h2>Payment Milestones</h2>
<table>
<tr><th>Milestone</th><th class="c">%</th><th class="r">Amount</th><th>Trigger</th></tr>
<tr><td>Advance</td><td class="c">30%</td><td class="r price">{fmt(b1_revenue * 0.30)}</td><td>Within 7 days of signing</td></tr>
<tr><td>Pre-Shipment</td><td class="c">55%</td><td class="r price">{fmt(b1_revenue * 0.55)}</td><td>Equipment ready, factory inspection passed</td></tr>
<tr><td>PAC</td><td class="c">10%</td><td class="r price">{fmt(b1_revenue * 0.10)}</td><td>System commissioned &amp; grid-connected</td></tr>
<tr><td>Retention</td><td class="c">5%</td><td class="r price">{fmt(b1_revenue * 0.05)}</td><td>Released after 24-month DLP</td></tr>
<tr class="total-row"><td>TOTAL</td><td class="c">100%</td><td class="r">{fmt(b1_revenue)}</td><td></td></tr>
</table>

<h2>Performance Warranties (OEM Backed)</h2>
<table>
<tr><th>Parameter</th><th>Warranted Value</th></tr>
<tr><td>State of Health — Year 5</td><td>&ge; 85%</td></tr>
<tr><td>State of Health — Year 10</td><td>&ge; 79.58%</td></tr>
<tr><td>State of Health — Year 15</td><td>&ge; 70%</td></tr>
<tr><td>System Round-Trip Efficiency (AC-AC)</td><td>&ge; 86.32%</td></tr>
<tr><td>Cycle Life</td><td>7,000 cycles @ 0.5C, 90% DoD, 70% EOL</td></tr>
<tr><td>PCS Efficiency</td><td>&ge; 98% at rated power</td></tr>
</table>

<div class="highlight">
<strong>Full Terms:</strong> This summary is for reference. The full EPC Agreement terms (including scope of works, delay LDs, warranty conditions, force majeure, indemnities, compliance, and data protection) are set out in document LCY-EPC-001 v3.0, which forms the binding agreement.
The complete EPC contract template is attached as the binding agreement document.
</div>

<h2>Signatures</h2>
{sig_html()}
{footer_html()}
</div></body></html>"""


# ─── LTSA ─────────────────────────────────────────────────────────────

def render_ltsa(key, g):
    park_rows = ""
    for p in g['batch1']:
        park_rows += f"<tr><td>{p['name']}</td><td class='c'>{p['mw']}</td><td class='c'>{p['mwh']}</td><td class='c'>{p['containers']}</td><td>{p['district']}</td><td class='badge badge-green'>Batch 1</td><td>From PAC</td></tr>"

    b1_mwh = sum(p['mwh'] for p in g['batch1'])

    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LTSA Framework — {g['name']} | Lighthief</title><style>{CSS}</style></head><body><div class="page">
{header_html(f"Long-Term Service Agreement<br>Group Framework — {g['name']}", f"LCY-LTSA-{key.upper()}-2026", "LTSA FRAMEWORK")}

<div class="section">
<h2>Parties</h2>
<table>
<tr><th style="width:30%">Service Provider</th><td><strong>Lighthief Cyprus Ltd</strong><br>HE 477423, 28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus</td></tr>
<tr><th>Client</th><td><strong>{g['legal_name']}</strong><br>[Address]</td></tr>
<tr><th>Effective Date</th><td>From PAC of first park in the group</td></tr>
<tr><th>Initial Term</th><td>5 years (auto-renewing annually thereafter)</td></tr>
</table>
</div>

<h2>Group Portfolio</h2>
<div class="metric-grid">
    <div class="metric-box"><div class="val">{g['total_parks']}</div><div class="lbl">Total Parks</div></div>
    <div class="metric-box"><div class="val">{g['total_mwh']}</div><div class="lbl">Total MWh</div></div>
    <div class="metric-box"><div class="val">97%</div><div class="lbl">Availability Guarantee</div></div>
    <div class="metric-box"><div class="val">5 yr</div><div class="lbl">Initial Term</div></div>
</div>

<h3>Parks Covered (Batch 1 — Active from PAC)</h3>
<table>
<tr><th>Park</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th>District</th><th>Batch</th><th>LTSA Start</th></tr>
{park_rows}
</table>
<p><strong>Future parks:</strong> {g['future_parks']} — will be added to this LTSA framework from their respective PAC dates.</p>

<h2>Availability Guarantee — Group Level</h2>
<div class="highlight">
<strong>97% Annual Availability Guarantee</strong> — calculated at the <strong>group portfolio level</strong>, not per individual park. Parks are added to the availability calculation from their PAC date. An isolated park outage does not breach the guarantee if the weighted group average exceeds 97%.
</div>

<table>
<tr><th>Availability Achieved</th><th>Service Fee Impact</th></tr>
<tr><td>&ge; 97%</td><td>No adjustment — guarantee met</td></tr>
<tr><td>95% to &lt; 97%</td><td>5% reduction in annual Service Fee</td></tr>
<tr><td>93% to &lt; 95%</td><td>10% reduction in annual Service Fee</td></tr>
<tr><td>90% to &lt; 93%</td><td>15% reduction in annual Service Fee</td></tr>
<tr><td>Below 90%</td><td>20% reduction (maximum)</td></tr>
</table>

<p><strong>Availability LD Rate:</strong> EUR 30/day/MWh of unavailable capacity</p>
<p><strong>Scheduled Downtime Allowance:</strong> 10 days per park per year (not counted as unavailable)</p>

<h2>Service Tier Pricing (Per MWh per Year)</h2>
<table>
<tr><th>Service Component</th><th class="r">EUR/MWh/Year</th><th>Scope</th></tr>
<tr><td><strong>Tier A</strong> — Basic Monitoring &amp; Maintenance</td><td class="r">€1,157.62</td><td>24/7 monitoring + bi-annual servicing</td></tr>
<tr><td><strong>Tier B</strong> — + Comprehensive O&amp;M</td><td class="r">€1,311.97</td><td>+ Corrective maintenance, PCS/MVS servicing</td></tr>
<tr><td><strong>Tier C</strong> — + 97% Availability Guarantee</td><td class="r">€2,201.73</td><td>+ Local team, spare parts, availability LDs</td></tr>
</table>

<p><strong>Batch 1 Annual Service Fee (Tier C):</strong> {b1_mwh:.2f} MWh &times; EUR 2,201.73 = <span class="price">{fmt(b1_mwh * 2201.73)}</span> per year</p>

<h2>Warranty Extension Options</h2>
<table>
<tr><th>Extension</th><th>Years</th><th class="r">EUR/MWh/Year</th></tr>
<tr><td>BESS Performance &amp; Product Warranty</td><td>6–10</td><td class="r">€913.92</td></tr>
<tr><td>BESS Performance &amp; Product Warranty</td><td>11–15</td><td class="r">€1,157.62</td></tr>
<tr><td>PCS + MVS Product Warranty</td><td>6–10</td><td class="r">€747.76</td></tr>
<tr><td>PCS + MVS Product Warranty</td><td>11–15</td><td class="r">€926.10</td></tr>
</table>
<p style="font-size:7.5pt;color:var(--muted)">Maximum warranty extension: 15 years from COD (1 cycle/day condition). Alternative: upfront spares at EUR 1,000–1,250/MWh.</p>

<h2>SOH Guarantee (with Tier C or Warranty Extension)</h2>
<table>
<tr><th>End of Year</th><th>Guaranteed Minimum SOH</th></tr>
<tr><td>5</td><td>&ge; 85%</td></tr>
<tr><td>10</td><td>&ge; 79.58%</td></tr>
<tr><td>15</td><td>&ge; 70%</td></tr>
</table>

<div class="highlight">
<strong>Full Terms:</strong> This summary is for reference. The full LTSA terms (including monitoring scope, maintenance procedures, response times, SLA credits, spare parts, SOH remedies, regulatory compliance, data protection) are set out in document LCY-LTSA-001 v3.0, which forms the binding agreement.
The complete LTSA contract template is attached as the binding agreement document.
</div>

<h2>Signatures</h2>
{sig_html()}
{footer_html()}
</div></body></html>"""


# ─── MAIN ─────────────────────────────────────────────────────────────

def main():
    for key, g in GROUPS.items():
        out_dir = os.path.join(SCRIPT_DIR, g['folder'], 'contracts')
        os.makedirs(out_dir, exist_ok=True)

        loi_path = os.path.join(out_dir, f"LOI-{g['name'].replace(' ', '-').replace('/', '-')}-full-portfolio-mar2026.html")
        with open(loi_path, 'w') as f:
            f.write(render_loi(key, g))
        print(f"  LOI:  {loi_path}")

        epc_path = os.path.join(out_dir, f"EPC-{g['name'].replace(' ', '-').replace('/', '-')}-batch1-mar2026.html")
        with open(epc_path, 'w') as f:
            f.write(render_epc(key, g))
        print(f"  EPC:  {epc_path}")

        ltsa_path = os.path.join(out_dir, f"LTSA-{g['name'].replace(' ', '-').replace('/', '-')}-framework-mar2026.html")
        with open(ltsa_path, 'w') as f:
            f.write(render_ltsa(key, g))
        print(f"  LTSA: {ltsa_path}")

        print()

    print(f"Done — {len(GROUPS) * 3} documents generated.")


if __name__ == '__main__':
    main()
