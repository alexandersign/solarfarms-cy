#!/usr/bin/env python3
"""
Generate comprehensive client presentations for all group and individual orders.
Combines: Pricing, Bankability, Grid-Forming, Insurance, LTSA, Technical Specs.
Source: lib/portfolio-data.ts (SSOT) + existing group templates.

Run: python scripts/generate-client-presentations.py
"""

import os
import textwrap
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLIENTS_DIR = os.path.join(BASE_DIR, "docs", "clients")
GROUP_DIR = os.path.join(CLIENTS_DIR, "group-order")

PORTFOLIO = {"parks": 51, "mw": 249, "mwh": 886.78, "containers": 252, "districts": 5}
LTSA_RATE = 1740
WARRANTY_BESS_6_10 = 913.92
WARRANTY_PCS_6_10 = 747.76
WARRANTY_TOTAL_6_10 = 1661.68
WARRANTY_BESS_11_15 = 1157.62
WARRANTY_PCS_11_15 = 926.10
WARRANTY_TOTAL_11_15 = 2083.72
RTE = 86.32
CYCLE_LIFE = 7000

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
:root{--primary:#1e3a5f;--accent:#2563eb;--bg:#f8fafc;--border:#e2e8f0;--text:#1a202c;--muted:#64748b;--ok:#059669;--warn:#d97706;--danger:#dc2626}
body{font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;font-size:9.5pt;line-height:1.6;color:var(--text);background:#edf2f7;padding:20px}
.page{background:#fff;max-width:210mm;margin:0 auto 24px;padding:22mm 18mm;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid var(--primary);padding-bottom:12px;margin-bottom:20px}
.logo-text{font-size:20pt;font-weight:800;color:var(--primary);letter-spacing:-.5px}
.logo-text span{color:var(--accent)}
.tagline{font-size:8pt;color:var(--muted);margin-top:2px}
.doc-info{text-align:right;font-size:7.5pt;color:var(--muted);line-height:1.7}
h1{font-size:14pt;color:var(--primary);margin:20px 0 6px}
h2{font-size:11pt;color:var(--primary);margin:22px 0 8px;border-bottom:2px solid var(--accent);padding-bottom:4px;display:inline-block}
h2::after{content:'';display:block}
h3{font-size:9.5pt;color:var(--primary);margin:10px 0 5px}
table{width:100%;border-collapse:collapse;font-size:8pt;margin:8px 0 14px}
th{background:var(--primary);color:#fff;padding:6px 7px;text-align:left;font-weight:600;white-space:normal}
td{padding:5px 7px;border-bottom:1px solid var(--border);word-wrap:break-word}
tr:nth-child(even){background:#fafbfc}
.r{text-align:right}.c{text-align:center}
.price{font-weight:700;color:var(--accent)}
.total-row{background:var(--primary)!important;color:#fff;font-weight:700}
.total-row td{border:none}
.sub-total{background:#edf2f7!important;font-weight:600}
.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0 20px}
.metric-grid-5{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:14px 0 20px}
.metric-box{background:var(--bg);border-radius:8px;padding:14px 10px;text-align:center;border:1px solid var(--border)}
.metric-box .val{font-size:18pt;font-weight:800;color:var(--primary)}
.metric-box .lbl{font-size:7pt;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
.metric-box.green{background:#f0fdf4;border-color:#86efac}.metric-box.green .val{color:#16a34a}
.metric-box.blue{background:#eff6ff;border-color:#93c5fd}.metric-box.blue .val{color:#2563eb}
.metric-box.amber{background:#fffbeb;border-color:#fcd34d}.metric-box.amber .val{color:#d97706}
.metric-box.purple{background:#f5f3ff;border-color:#c4b5fd}.metric-box.purple .val{color:#7c3aed}
.metric-box.red{background:#fef2f2;border-color:#fecaca}.metric-box.red .val{color:#dc2626}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:8px 0}
.box{border:1px solid var(--border);border-radius:6px;padding:12px}
.box h3{margin-top:0}
.box ul{margin-left:16px}.box li{margin-bottom:3px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:10px 14px;margin:10px 0;font-size:8pt}
.savings{background:#ecfdf5;border:1px solid #6ee7b7;border-radius:6px;padding:10px 14px;margin:10px 0;font-size:8pt}
.warn{background:#fef3c7;border:1px solid #fbbf24;border-radius:6px;padding:10px 14px;margin:10px 0;font-size:8pt}
.phase{background:var(--bg);padding:6px 12px;border-left:3px solid var(--accent);margin:14px 0 6px;font-weight:600;color:var(--primary);font-size:9pt}
.footer{margin-top:20px;padding-top:10px;border-top:2px solid var(--primary);font-size:7pt;color:var(--muted);text-align:center}
.note{font-size:7.5pt;color:var(--muted);margin:4px 0}
.print-btn{position:fixed;top:15px;right:15px;background:var(--primary);color:#fff;border:none;padding:10px 18px;border-radius:6px;cursor:pointer;font-size:10pt;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,.2)}
.print-btn:hover{background:var(--accent)}
ul{margin-left:18px}li{margin-bottom:3px}
.incl{color:var(--ok)}.excl{color:#dc2626}
.tag{display:inline-block;font-size:7pt;font-weight:600;padding:2px 8px;border-radius:10px;margin-right:4px}
.tag-confirmed{background:#dcfce7;color:#166534}
.tag-bankable{background:#dbeafe;color:#1e40af}
.tag-insured{background:#f3e8ff;color:#6b21a8}
.soh-row{display:flex;align-items:center;gap:8px;margin:4px 0}
.soh-year{width:50px;font-size:8pt;font-weight:600;color:#334155;text-align:right}
.soh-bar-bg{flex:1;height:14px;background:#e2e8f0;border-radius:4px;overflow:hidden}
.soh-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#16a34a,#22c55e)}
.soh-pct{width:50px;font-size:8pt;font-weight:600;color:#166534}
.flow-row{display:flex;align-items:stretch;gap:0;margin:10px 0}
.flow-box{flex:1;padding:8px 10px;text-align:center;font-size:8pt;font-weight:600;border:1px solid #cbd5e1}
.flow-box.oem{background:#eff6ff;border-color:#93c5fd;color:#1e40af}
.flow-box.lighthief{background:#f0fdf4;border-color:#86efac;color:#166534}
.flow-box.client{background:#fefce8;border-color:#fde047;color:#854d0e}
.flow-box .sub{font-size:7pt;font-weight:400;color:#64748b;display:block;margin-top:2px}
.flow-arrow{width:24px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#94a3b8;flex-shrink:0}
@media print{.print-btn{display:none}body{background:#fff;padding:0}.page{box-shadow:none;margin:0;padding:14mm 16mm}@page{margin:8mm;size:A4}.page-break{page-break-before:always}}
"""

def make_header(client_name, section_label=""):
    label = f" &mdash; {section_label}" if section_label else ""
    return f'''<div class="header">
        <div><div class="logo-text">Light<span>hief</span></div><div class="tagline">Energy Storage EPC &amp; O&amp;M</div></div>
        <div class="doc-info">{section_label + " &mdash; " if section_label else ""}{client_name}</div>
    </div>'''

def page_cover(c):
    return f'''<!-- PAGE 1: Cover -->
<div class="page">
    <div class="header">
        <div><div class="logo-text">Light<span>hief</span></div><div class="tagline">Energy Storage EPC &amp; O&amp;M</div></div>
        <div class="doc-info"><strong>CONFIDENTIAL</strong><br>Ref: {c["ref"]}<br>Date: March 2026<br>Valid: 30 days</div>
    </div>
    <h1>Battery Energy Storage System &mdash; Comprehensive EPC Proposal</h1>
    <p style="font-size:12pt;color:var(--accent);font-weight:600;margin-bottom:20px;">Prepared for: {c["client_name"]}</p>
    <div class="metric-grid">
        <div class="metric-box"><div class="val">{c["parks"]}</div><div class="lbl">BESS Parks</div></div>
        <div class="metric-box"><div class="val">{c["mwh"]} MWh</div><div class="lbl">Total Energy</div></div>
        <div class="metric-box"><div class="val">&euro;{c["revenue"]:,.0f}</div><div class="lbl">Total Investment</div></div>
        <div class="metric-box"><div class="val">{c["mw"]} MW</div><div class="lbl">Total Power</div></div>
    </div>
    <div class="two-col">
        <div class="box">
            <h3>Your EPC Partner &mdash; Lighthief Cyprus Ltd</h3>
            <ul>
                <li>Exclusive EPC &amp; Distribution partner for Linyang Energy in Cyprus</li>
                <li>Part of Lighthief European Group &mdash; Poland HQ with 150+ engineers</li>
                <li>Full turnkey: procurement, installation, commissioning &amp; O&amp;M</li>
                <li>{PORTFOLIO["mwh"]} MWh total BESS portfolio across {PORTFOLIO["parks"]} parks in Cyprus</li>
                <li>Marsh McLennan brokered insurance programme</li>
            </ul>
        </div>
        <div class="box">
            <h3>Equipment &amp; Technology</h3>
            <ul>
                <li><strong>Battery:</strong> Linyang Energy &mdash; EVE LFP cells (Tier 1, SSE-listed)</li>
                <li><strong>PCS:</strong> Kehua Tech &mdash; 3rd largest global manufacturer, grid-forming capable</li>
                <li><strong>EMS:</strong> Voltus Energy &mdash; Cyprus-based, IEC 60870-5-104 DSO compliant</li>
                <li><strong>Certifications:</strong> EN 50549-2 (T&Uuml;V), UL9540A, IEC 62619, IEC 63056</li>
                <li><strong>Warranty:</strong> 5-year OEM standard + optional 15-year extended</li>
            </ul>
        </div>
    </div>
    <div class="highlight">
        <strong>Group Order Advantage:</strong> As part of the {PORTFOLIO["mwh"]} MWh Cyprus portfolio ({PORTFOLIO["parks"]} parks), {c["client_name"]} benefits from volume-negotiated pricing on hardware, EMS, logistics, and installation &mdash; significantly below individual order rates. This portfolio scale also enables dedicated O&amp;M infrastructure including a local spare parts warehouse, 6 field engineers, and 24/7 monitoring.
    </div>
</div>'''

def page_lighthief_overview():
    return f'''<!-- LIGHTHIEF GROUP OVERVIEW -->
<div class="page">
    {make_header("Lighthief Cyprus Ltd", "Company Profile")}
    <h2>The Lighthief Group</h2>
    <div class="two-col">
        <div class="box">
            <h3>Lighthief Cyprus Ltd</h3>
            <ul>
                <li><strong>Registration:</strong> HE 477423 (Cyprus)</li>
                <li><strong>TIN:</strong> 60187188Q</li>
                <li><strong>Office:</strong> 28 October Ave 249, Lophitis Business Center I, Office 201, 3035 Limassol</li>
                <li><strong>Director:</strong> Alexander Papacosta</li>
                <li><strong>Role:</strong> Exclusive Linyang Energy distributor &amp; EPC contractor for Cyprus</li>
            </ul>
        </div>
        <div class="box">
            <h3>Lighthief European Group</h3>
            <ul>
                <li><strong>Headquarters:</strong> Poland</li>
                <li><strong>Engineering Team:</strong> 150+ engineers across Poland &amp; Cyprus</li>
                <li><strong>Specialisation:</strong> Utility-scale solar &amp; BESS EPC</li>
                <li><strong>Cyprus Operations:</strong> 6 dedicated field engineers, local warehouse (Limassol)</li>
                <li><strong>Insurance Broker:</strong> Marsh McLennan (world&rsquo;s largest)</li>
            </ul>
        </div>
    </div>
    <h2>Cyprus BESS Portfolio</h2>
    <div class="metric-grid-5">
        <div class="metric-box green"><div class="val">{PORTFOLIO["parks"]}</div><div class="lbl">Parks</div></div>
        <div class="metric-box blue"><div class="val">{PORTFOLIO["mw"]}</div><div class="lbl">Total MW</div></div>
        <div class="metric-box amber"><div class="val">{PORTFOLIO["mwh"]}</div><div class="lbl">Total MWh</div></div>
        <div class="metric-box purple"><div class="val">{PORTFOLIO["containers"]}</div><div class="lbl">Containers</div></div>
        <div class="metric-box red"><div class="val">{PORTFOLIO["districts"]}</div><div class="lbl">Districts</div></div>
    </div>
    <h2>Technology Partners</h2>
    <table>
        <thead><tr><th>Partner</th><th>Role</th><th>Key Credentials</th></tr></thead>
        <tbody>
            <tr><td><strong>Linyang Energy</strong></td><td>Battery OEM &amp; System Integrator</td><td>SSE-listed (SHA:601222), 5 GWh+ annual capacity, EVE LFP cells</td></tr>
            <tr><td><strong>Kehua Tech</strong></td><td>Power Conversion System (PCS)</td><td>Tier 1, 3rd largest global PCS manufacturer, grid-forming capable (VSG)</td></tr>
            <tr><td><strong>EVE Energy</strong></td><td>Cell Manufacturer</td><td>314Ah LFP cells, CATL-grade, UL9540A &mdash; zero thermal propagation</td></tr>
            <tr><td><strong>Voltus Energy</strong></td><td>EMS / SCADA Provider</td><td>Cyprus-based, IEC 60870-5-104, DSO-compliant, real-time monitoring</td></tr>
            <tr><td><strong>DEHN + StrikeRA</strong></td><td>Lightning &amp; Surge Protection</td><td>SPD + earthing grid, certified installation team in Cyprus</td></tr>
            <tr><td><strong>Marsh McLennan</strong></td><td>Insurance Broker</td><td>World&rsquo;s largest insurance broker &mdash; CAR/EAR, TPL, PI, DSU</td></tr>
        </tbody>
    </table>
    <h2>Grid-Forming Capability</h2>
    <div class="highlight">
        <strong>Future-Proof for Cyprus Island Grid:</strong> The Kehua C-series PCS is grid-forming capable with Virtual Synchronous Generator (VSG) mode, providing synthetic inertia and frequency support critical for island grids. This positions your BESS for future ancillary service revenue streams (FCR, aFRR) as Cyprus TSO develops its market framework per ENTSO-E guidelines.
    </div>
    <table>
        <thead><tr><th>Grid-Forming Feature</th><th>Status</th><th>Relevance</th></tr></thead>
        <tbody>
            <tr><td><strong>Virtual Synchronous Generator (VSG)</strong></td><td style="color:var(--ok);font-weight:700;">Built-in</td><td>Provides synthetic inertia &mdash; critical for island grid stability</td></tr>
            <tr><td><strong>Black-Start Capability</strong></td><td style="color:var(--ok);font-weight:700;">Available</td><td>Can restore grid from total blackout without external power</td></tr>
            <tr><td><strong>Voltage-Frequency (VF) Mode</strong></td><td style="color:var(--ok);font-weight:700;">Available</td><td>Autonomous voltage and frequency regulation</td></tr>
            <tr><td><strong>4-Quadrant Operation</strong></td><td style="color:var(--ok);font-weight:700;">Standard</td><td>Active &amp; reactive power in all quadrants</td></tr>
            <tr><td><strong>EN 50549-2 Certified</strong></td><td style="color:var(--ok);font-weight:700;">T&Uuml;V Certified</td><td>EU grid code compliance (cert D 115067 0077)</td></tr>
            <tr><td><strong>Droop Control</strong></td><td style="color:var(--ok);font-weight:700;">Configurable</td><td>Active power-frequency droop for parallel operation</td></tr>
        </tbody>
    </table>
</div>'''

def page_pricing(c):
    return f'''<!-- PRICING -->
<div class="page">
    {make_header(c["client_name"], "Turnkey EPC Pricing")}
    <h2>Turnkey EPC Pricing</h2>
    <p class="note">All prices are final turnkey EPC delivered and exclude VAT (19%).</p>
    {c["pricing_tables"]}
</div>'''

def page_epc_scope(c):
    return f'''<!-- EPC SCOPE -->
<div class="page">
    {make_header(c["client_name"], "EPC Scope &amp; Technical Specifications")}
    <h2>EPC Scope of Works</h2>
    <div class="two-col">
        <div class="box">
            <h3 class="incl">&#10003; Included in EPC Price</h3>
            <ul>
                <li>BESS containers (LFP battery + BMS + liquid cooling + fire suppression)</li>
                <li>PCS/MV Skid (Kehua inverter + transformer + MV switchgear)</li>
                <li>EMS/SCADA system (Voltus &mdash; energy management + monitoring)</li>
                <li>CIF shipping to Limassol + import duties + customs clearance</li>
                <li>Crane offloading + inland transport to site</li>
                <li>Civil works: reinforced concrete platforms, trenches, drainage</li>
                <li>LV &amp; MV cabling (DC bus, AC feeder connections)</li>
                <li>MV terminations and protection engineering</li>
                <li>Surge protection (DEHN SPD) + earthing grid</li>
                <li>Remote trip / SCADA communications infrastructure</li>
                <li>UPS &amp; auxiliary power supply</li>
                <li>Construction insurance (CAR/EAR, TPL, PI) via Marsh</li>
                <li>Documentation &amp; statutory compliance (EAC/CERA)</li>
                <li>Full commissioning, DSO witness testing &amp; grid synchronisation</li>
            </ul>
        </div>
        <div class="box">
            <h3 class="excl">&#10007; Excluded / Client Responsibility</h3>
            <ul>
                <li>Land / site lease and preparation beyond civil works</li>
                <li>Grid connection agreement and PCC bay extension (if needed)</li>
                <li>External lightning protection system (LPS &mdash; DEHN quoted per site)</li>
                <li>Protection testing / DSO inspection fees (&euro;1,250 per container)</li>
                <li>VAT (19%) &mdash; payable by importer of record</li>
                <li>CERA licence application fees</li>
                <li>Licensed electrical drawings (&euro;5,000&ndash;&euro;15,000 per site)</li>
                <li>Any works beyond the battery storage compound boundary</li>
            </ul>
        </div>
    </div>
    <h2>Technical Specifications</h2>
    <table>
        <thead><tr><th>Parameter</th><th>Specification</th></tr></thead>
        <tbody>
            <tr><td><strong>Battery Chemistry</strong></td><td>LFP (Lithium Iron Phosphate) &mdash; EVE 314Ah cells</td></tr>
            <tr><td><strong>Container Capacity</strong></td><td>5.015 MWh / 4.179 MWh per 20ft high-cube container</td></tr>
            <tr><td><strong>Cycle Life</strong></td><td>15 years or {CYCLE_LIFE:,} cycles @ 70% EOL, 90% DOD, 25&plusmn;2&deg;C</td></tr>
            <tr><td><strong>Round Trip Efficiency</strong></td><td>&ge; {RTE}% (full system AC-AC incl. cabling losses)</td></tr>
            <tr><td><strong>PCS</strong></td><td>Kehua BCS1000K-C / BCS1250K-C &mdash; bi-directional, 4-quadrant, grid-forming capable</td></tr>
            <tr><td><strong>Grid Code</strong></td><td>EN 50549-2 (T&Uuml;V cert D 115067 0077)</td></tr>
            <tr><td><strong>EMS/SCADA</strong></td><td>Voltus Energy &mdash; IEC 60870-5-104, DSO compliant</td></tr>
            <tr><td><strong>Fire Suppression</strong></td><td>Integrated aerosol system per container (auto-activation)</td></tr>
            <tr><td><strong>Fire Safety</strong></td><td>UL9540A PASSED &mdash; zero thermal propagation between modules</td></tr>
            <tr><td><strong>Cooling</strong></td><td>Liquid cooled &mdash; operating range -20&deg;C to +55&deg;C</td></tr>
            <tr><td><strong>Enclosure Rating</strong></td><td>IP55, C5 corrosion protection (coastal/industrial)</td></tr>
            <tr><td><strong>Design Life</strong></td><td>25 years (with augmentation strategy)</td></tr>
            <tr><td><strong>CIF Incoterms</strong></td><td>CIF Limassol &mdash; marine insurance included in OEM price</td></tr>
        </tbody>
    </table>
</div>'''

def page_bankability(c):
    return f'''<!-- BANKABILITY -->
<div class="page page-break">
    {make_header(c["client_name"], "Bankable Protection Brief")}
    <h2>Bankability &amp; Protection Framework</h2>
    <p class="note">Designed for review by end clients, project financiers, and lending institutions.</p>
    <div class="metric-grid-5">
        <div class="metric-box green"><div class="val">5yr</div><div class="lbl">Base Warranty</div></div>
        <div class="metric-box blue"><div class="val">15yr</div><div class="lbl">Max Extended</div></div>
        <div class="metric-box amber"><div class="val">97%</div><div class="lbl">Avail. Guarantee</div></div>
        <div class="metric-box purple"><div class="val">5%</div><div class="lbl">Performance Bond</div></div>
        <div class="metric-box red"><div class="val">&euro;30</div><div class="lbl">/MWh/day LD</div></div>
    </div>
    <h3>Guarantee Chain</h3>
    <div class="flow-row">
        <div class="flow-box oem">Linyang Energy<span class="sub">OEM &middot; SHA:601222</span></div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-box lighthief">Lighthief Cyprus Ltd<span class="sub">EPC &middot; HE 477423</span></div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-box client">{c["client_name"]}<span class="sub">Asset Owner</span></div>
    </div>
    <table>
        <thead><tr><th>Protection</th><th>Origin</th><th>Client Receives</th></tr></thead>
        <tbody>
            <tr><td><strong>Equipment Warranty (5yr)</strong></td><td>Linyang OEM</td><td>OEM Warranty Certificate per park <span class="tag tag-confirmed">CONTRACTUAL</span></td></tr>
            <tr><td><strong>SOH Guarantee (85/79.58/70%)</strong></td><td>Linyang OEM + LTSA</td><td>Annual SOH Certificate + bankable LDs <span class="tag tag-confirmed">V3 CONFIRMED</span></td></tr>
            <tr><td><strong>Performance Bond (5%)</strong></td><td>Linyang (Bank)</td><td>Corporate-backed bank guarantee <span class="tag tag-bankable">BANKABLE</span></td></tr>
            <tr><td><strong>Advance Payment Guarantee</strong></td><td>Linyang (Bank)</td><td>100% of advance, bank guarantee <span class="tag tag-bankable">BANKABLE</span></td></tr>
            <tr><td><strong>Product Liability (&euro;5M)</strong></td><td>Linyang / AXA Tianping</td><td>CGL policy confirmed in Sales Contract &sect;16 <span class="tag tag-confirmed">CONTRACTUAL</span></td></tr>
            <tr><td><strong>CAR/EAR Insurance</strong></td><td>Lighthief (Marsh)</td><td>Full contract value, LEG3/06 clause</td></tr>
            <tr><td><strong>Availability Guarantee (97%)</strong></td><td>LTSA Tier C</td><td>Monthly reports + direct LDs &mdash; group portfolio level <span class="tag tag-confirmed">CONFIRMED</span></td></tr>
        </tbody>
    </table>
    <h3>SOH Degradation Guarantee</h3>
    <div class="soh-row"><div class="soh-year">Year 5</div><div class="soh-bar-bg"><div class="soh-bar-fill" style="width:85%"></div></div><div class="soh-pct">&ge; 85%</div></div>
    <div class="soh-row"><div class="soh-year">Year 10</div><div class="soh-bar-bg"><div class="soh-bar-fill" style="width:79.58%"></div></div><div class="soh-pct">&ge; 79.58%</div></div>
    <div class="soh-row"><div class="soh-year">Year 15</div><div class="soh-bar-bg"><div class="soh-bar-fill" style="width:70%"></div></div><div class="soh-pct">&ge; 70%</div></div>
    <h3>Liquidated Damages &mdash; Delay Protection</h3>
    <table>
        <thead><tr><th>Delay Type</th><th>LD Rate</th><th>Cap</th></tr></thead>
        <tbody>
            <tr><td><strong>Full Park Delay</strong> (PCS, MV transformer, or switchgear late)</td><td>0.1% &rarr; 0.15% &rarr; 0.2%/day (tiered)</td><td>10% of park value</td></tr>
            <tr><td><strong>Partial Delay</strong> (battery containers late)</td><td>0.1% &rarr; 0.15% &rarr; 0.2%/day (tiered)</td><td>10% of delayed goods value</td></tr>
            <tr><td><strong>Availability LD</strong> (below 97% annual)</td><td>&euro;30/MWh/day below target</td><td>20% of annual LTSA fee</td></tr>
            <tr><td><strong>SOH Capacity Shortfall LD</strong></td><td>&euro;30/lost MWh/day (after 90-day grace)</td><td>Annual: 20% &middot; Lifetime: 50%</td></tr>
        </tbody>
    </table>
</div>'''

def page_warranty_ltsa(c):
    return f'''<!-- WARRANTY & LTSA -->
<div class="page">
    {make_header(c["client_name"], "Warranty, LTSA &amp; Payment")}
    <h2>Warranty &amp; Performance Guarantees</h2>
    <table>
        <thead><tr><th>Coverage</th><th>Period</th><th>Details</th></tr></thead>
        <tbody>
            <tr><td><strong>Standard OEM Warranty</strong></td><td>5 Years</td><td>Full BESS, PCS, BMS, cooling, fire suppression &mdash; included in EPC price</td></tr>
            <tr><td><strong>EPC Works Warranty</strong></td><td>2 Years</td><td>Civil works, cabling, grounding, earthing</td></tr>
            <tr><td><strong>Capacity Guarantee</strong></td><td>15 Years</td><td>&ge; 70% SOH at Year 15 (Linyang confirmed degradation curve)</td></tr>
            <tr><td><strong>Availability Guarantee</strong></td><td>LTSA Duration</td><td>&ge; 97% system availability with LD penalties</td></tr>
            <tr><td><strong>Performance Bond</strong></td><td>Pre-delivery &rarr; PAC + 30d</td><td>5% of contract value (OEM corporate bank guarantee)</td></tr>
            <tr><td><strong>Defects Liability</strong></td><td>24 months post-PAC</td><td>5% retention released after DLP</td></tr>
        </tbody>
    </table>
    <h2>Extended Warranty &amp; LTSA Pricing (OEM Confirmed)</h2>
    <table>
        <thead><tr><th>Period</th><th>BESS Warranty</th><th>PCS+MVS Warranty</th><th>Combined</th><th>LTSA O&amp;M</th><th>Total Annual</th></tr></thead>
        <tbody>
            <tr><td><strong>Years 1&ndash;5</strong></td><td colspan="2" class="c">Included in EPC</td><td>&euro;0</td><td>&euro;{LTSA_RATE:,}/MWh/yr</td><td class="price">&euro;{LTSA_RATE:,}/MWh/yr</td></tr>
            <tr><td><strong>Years 6&ndash;10</strong></td><td>&euro;{WARRANTY_BESS_6_10:,.2f}</td><td>&euro;{WARRANTY_PCS_6_10:,.2f}</td><td>&euro;{WARRANTY_TOTAL_6_10:,.2f}</td><td>&euro;{LTSA_RATE:,}/MWh/yr</td><td class="price">&euro;{LTSA_RATE + WARRANTY_TOTAL_6_10:,.2f}/MWh/yr</td></tr>
            <tr><td><strong>Years 11&ndash;15</strong></td><td>&euro;{WARRANTY_BESS_11_15:,.2f}</td><td>&euro;{WARRANTY_PCS_11_15:,.2f}</td><td>&euro;{WARRANTY_TOTAL_11_15:,.2f}</td><td>&euro;{LTSA_RATE:,}/MWh/yr</td><td class="price">&euro;{LTSA_RATE + WARRANTY_TOTAL_11_15:,.2f}/MWh/yr</td></tr>
        </tbody>
    </table>
    <p class="note">Extended warranty is paid by client directly to Linyang OEM. Alternative to Yr 11&ndash;15 warranty: upfront spare parts purchase at &euro;1,000&ndash;1,250/MWh (one-time).</p>
    <h2>LTSA Tier C &mdash; Service Level Agreement</h2>
    <table>
        <thead><tr><th>Severity</th><th>Remote Response</th><th>On-Site</th><th>Resolution</th><th>Coverage</th></tr></thead>
        <tbody>
            <tr style="background:#eff6ff;"><td><strong>Critical</strong></td><td>&le; 4 hours</td><td>&le; 8 hours</td><td>&le; 48 hours</td><td>24/7/365</td></tr>
            <tr><td><strong>Major</strong></td><td>&le; 8 hours</td><td>&le; 48 hours</td><td>&le; 5 BD</td><td>24/7/365</td></tr>
            <tr><td><strong>Minor</strong></td><td>&le; 48 hours</td><td>Next visit</td><td>Best endeavours</td><td>Business hours</td></tr>
        </tbody>
    </table>
    <h2>Payment Terms</h2>
    <table>
        <thead><tr><th>Milestone</th><th class="c">%</th><th>Trigger</th></tr></thead>
        <tbody>
            <tr><td><strong>Advance Payment</strong></td><td class="c">30%</td><td>Within 7 days of contract signing (protected by APG)</td></tr>
            <tr><td><strong>Pre-Shipment</strong></td><td class="c">55%</td><td>Equipment ready, factory inspection passed</td></tr>
            <tr><td><strong>Provisional Acceptance (PAC)</strong></td><td class="c">10%</td><td>System commissioned &amp; grid-connected</td></tr>
            <tr><td><strong>Retention</strong></td><td class="c">5%</td><td>Released after 24-month defects liability period</td></tr>
            <tr class="total-row"><td colspan="2" style="border:none"><strong>Total</strong></td><td style="border:none"><strong>100%</strong></td></tr>
        </tbody>
    </table>
</div>'''

def page_insurance(c):
    return f'''<!-- INSURANCE -->
<div class="page">
    {make_header(c["client_name"], "Insurance Programme")}
    <h2>Comprehensive Insurance Programme</h2>
    <p class="note">Brokered by Marsh McLennan &mdash; world&rsquo;s largest insurance broker. Structured for bankability.</p>
    <table>
        <thead><tr><th>Coverage</th><th>Limit</th><th>Provider</th><th>Key Features</th></tr></thead>
        <tbody>
            <tr style="background:#eff6ff;"><td><strong>Construction All Risks (CAR/EAR)</strong></td><td>Full Contract Value</td><td>Lighthief via Marsh</td><td>LEG3/06 defects clause; covers repair + resultant damage</td></tr>
            <tr><td><strong>Public Liability</strong></td><td>&euro;10M aggregate</td><td>Lighthief via Marsh</td><td>Third-party injury/damage during construction &amp; operations</td></tr>
            <tr><td><strong>Professional Indemnity</strong></td><td>&euro;5M aggregate</td><td>Lighthief via Marsh</td><td>Design/engineering errors, advisory liability</td></tr>
            <tr><td><strong>Delay in Start-Up (DSU)</strong></td><td>12-month indemnity</td><td>Lighthief via Marsh</td><td>Revenue protection during construction delay events</td></tr>
            <tr><td><strong>Inland Transit</strong></td><td>&euro;2M/shipment</td><td>Lighthief via Marsh</td><td>Limassol port to all project sites</td></tr>
            <tr><td><strong>Environmental / Pollution</strong></td><td>&euro;2M aggregate</td><td>Lighthief via Marsh</td><td>Electrolyte spill, soil contamination, cleanup</td></tr>
            <tr><td><strong>Cyber Liability</strong></td><td>&euro;500K</td><td>Lighthief via Marsh</td><td>SCADA/EMS protection, ransomware, data breach</td></tr>
            <tr><td><strong>D&amp;O + Legal Protection</strong></td><td>&euro;2M + defense</td><td>Lighthief via Marsh</td><td>Director/officer personal liability</td></tr>
        </tbody>
    </table>
    <h3>OEM Insurance (Linyang &mdash; Contractually Confirmed)</h3>
    <table>
        <thead><tr><th>Coverage</th><th>Limit</th><th>Insurer</th><th>Status</th></tr></thead>
        <tbody>
            <tr><td><strong>Product Liability</strong></td><td>&euro;5,000,000 per occurrence</td><td>AXA Tianping</td><td><span class="tag tag-confirmed">CONTRACTUAL &sect;16.1</span></td></tr>
            <tr><td><strong>Professional Indemnity</strong></td><td>&euro;2,000,000 per occurrence</td><td>Linyang corporate</td><td><span class="tag tag-confirmed">CONTRACTUAL &sect;16.1</span></td></tr>
            <tr><td><strong>Marine Cargo (Sea Voyage)</strong></td><td>Full shipment value</td><td>Linyang (CIF obligation)</td><td><span class="tag tag-confirmed">CIF INCOTERMS</span></td></tr>
        </tbody>
    </table>
    <h3>Fire Safety &amp; Risk Mitigation</h3>
    <div class="two-col">
        <div class="box">
            <h3>Battery Safety Certifications</h3>
            <ul>
                <li><strong>UL9540A:</strong> PASSED &mdash; no thermal propagation</li>
                <li><strong>IEC 62619:</strong> Secondary lithium cells safety</li>
                <li><strong>IEC 63056:</strong> ESS safety requirements</li>
                <li><strong>UN 38.3:</strong> Transport safety certified</li>
                <li><strong>UL 94 V-0:</strong> Fire retardant materials</li>
            </ul>
        </div>
        <div class="box">
            <h3>Container Protection</h3>
            <ul>
                <li><strong>Fire Detection:</strong> Multi-zone smoke, heat &amp; gas (H&#8322;, CO)</li>
                <li><strong>Suppression:</strong> Integrated aerosol per container</li>
                <li><strong>BMS:</strong> Cell-level V/T/I monitoring + auto-shutdown</li>
                <li><strong>Spacing:</strong> Min 6m (exceeds FM 5-33 / insurer 4.5m min)</li>
                <li><strong>24/7 Monitoring:</strong> Voltus SCADA + Lighthief NOC</li>
            </ul>
        </div>
    </div>
</div>'''

def page_next_steps(c):
    return f'''<!-- NEXT STEPS & CONTACT -->
<div class="page">
    {make_header(c["client_name"], "Next Steps")}
    <h2>Next Steps</h2>
    <table>
        <thead><tr><th style="width:5%">#</th><th style="width:30%">Action</th><th style="width:15%">Responsible</th><th>Detail</th></tr></thead>
        <tbody>
            <tr><td>1</td><td><strong>Confirm BESS sizing per park</strong></td><td>Client</td><td>Review park specifications and confirm MW / MWh configuration</td></tr>
            <tr><td>2</td><td><strong>Sign EPC Contract</strong></td><td>Both Parties</td><td>Formal EPC agreement with pricing schedule, milestones, and guarantees</td></tr>
            <tr><td>3</td><td><strong>Advance Payment</strong></td><td>Client</td><td>30% advance within 7 days, protected by Advance Payment Guarantee</td></tr>
            <tr><td>4</td><td><strong>SLD &amp; Protection Study</strong></td><td>Lighthief + Client Engineer</td><td>Submit single-line diagrams for DSO approval and grid connection</td></tr>
            <tr><td>5</td><td><strong>Factory Production</strong></td><td>Linyang</td><td>90-day production lead time from order confirmation</td></tr>
            <tr><td>6</td><td><strong>Factory Acceptance Test</strong></td><td>Lighthief + Client</td><td>Client invited to witness FAT at Linyang factory</td></tr>
            <tr><td>7</td><td><strong>CIF Delivery to Limassol</strong></td><td>Linyang</td><td>50-day shipping (Shanghai &rarr; Limassol)</td></tr>
            <tr><td>8</td><td><strong>Site Installation</strong></td><td>Lighthief</td><td>Civil works, equipment placement, cabling, protection</td></tr>
            <tr><td>9</td><td><strong>Commissioning &amp; PAC</strong></td><td>Lighthief + DSO</td><td>Full system commissioning, grid sync, DSO witness testing</td></tr>
            <tr><td>10</td><td><strong>LTSA Activation</strong></td><td>Both Parties</td><td>O&amp;M service agreement commences at or before PAC</td></tr>
        </tbody>
    </table>
    <div class="highlight">
        <strong>Timeline Estimate:</strong> From contract signing to grid connection &mdash; approximately 7&ndash;9 months (subject to DSO approval timelines and grid connection readiness).
    </div>
    <h2>Contact</h2>
    <div class="two-col">
        <div class="box">
            <h3>Project Contact</h3>
            <ul>
                <li><strong>Alexander Papacosta</strong></li>
                <li>Director &amp; BESS Project Lead</li>
                <li>Tel: +357 99 164 158</li>
                <li>Email: alexander.papacosta@lighthief.com</li>
            </ul>
        </div>
        <div class="box">
            <h3>Company</h3>
            <ul>
                <li><strong>Lighthief Cyprus Ltd</strong></li>
                <li>HE 477423</li>
                <li>28 October Ave 249, Lophitis Business Center I</li>
                <li>Office 201, 3035 Limassol, Cyprus</li>
                <li>Tel: +357 77 77 00 50</li>
                <li>office@lighthief.com</li>
            </ul>
        </div>
    </div>
    <div class="footer">
        <strong>Lighthief Cyprus Ltd</strong> | Energy Storage EPC &amp; O&amp;M<br>
        Confidential &mdash; Prepared for {c["client_name"]} | March 2026<br>
        Source: Linyang Sales Contract (9 March 2026) &middot; RFI V3 (Feb 2026) &middot; AXA Policy (9 March 2026) &middot; Marsh Insurance Programme<br>
        Pricing valid for 30 days from date of issue. All prices exclude VAT (19%).
    </div>
</div>'''


def generate_presentation(c, output_path):
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{c["client_name"]} &mdash; Comprehensive BESS EPC Proposal | Lighthief Cyprus</title>
<style>{CSS}</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">&#128424; Print / PDF</button>

{page_cover(c)}

{page_lighthief_overview()}

{page_pricing(c)}

{page_epc_scope(c)}

{page_bankability(c)}

{page_warranty_ltsa(c)}

{page_insurance(c)}

{page_next_steps(c)}

</body>
</html>'''
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  Generated: {os.path.relpath(output_path, BASE_DIR)}")


# ─── CLIENT DATA ────────────────────────────────────────────────────

ABIO = {
    "client_name": "ABIO Power",
    "ref": "LCY-GRP1-2026-MAR",
    "parks": 25, "mw": 125.0, "mwh": 430.3, "revenue": 52_609_992,
    "pricing_tables": """
    <div class="phase">ABIO STANDALONE &mdash; 4 Projects | 11.7 MW | 48 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Greendorado Agrivoltaic</td><td class="c">Larnaca</td><td class="c">0.8</td><td class="c">3</td><td class="c">1&times;5MWh</td><td class="c">0.8 MW</td><td class="r">&euro;209.42</td><td class="r price">&euro;628,265</td></tr>
            <tr><td>Agios Sozomenos</td><td class="c">Nicosia</td><td class="c">6</td><td class="c">25</td><td class="c">5&times;5MWh</td><td class="c">6 MW</td><td class="r">&euro;125.46</td><td class="r price">&euro;3,136,513</td></tr>
            <tr><td>Renergetic 2</td><td class="c">Nicosia</td><td class="c">2.4</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">2.4 MW</td><td class="r">&euro;124.60</td><td class="r price">&euro;1,245,983</td></tr>
            <tr><td>Solartech 3 Extension</td><td class="c">Nicosia</td><td class="c">2.5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;120.63</td><td class="r price">&euro;1,206,300</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;129.52</td><td class="r">&euro;6,217,061</td></tr>
        </tbody>
    </table>
    <div class="phase">DIANARY &mdash; 3 Projects | 13 MW | 55 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Dianary 1</td><td class="c">Nicosia</td><td class="c">2.5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;120.63</td><td class="r price">&euro;1,206,300</td></tr>
            <tr><td>Dianary 2</td><td class="c">Nicosia</td><td class="c">2.5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;120.63</td><td class="r price">&euro;1,206,300</td></tr>
            <tr><td>Dianary 3</td><td class="c">Nicosia</td><td class="c">8</td><td class="c">35</td><td class="c">7&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;119.96</td><td class="r price">&euro;4,198,621</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;120.20</td><td class="r">&euro;6,611,221</td></tr>
        </tbody>
    </table>
    <div class="phase">EASY POWER &mdash; 4 Projects | 16.3 MW | 38 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Easy Power 1</td><td class="c">Nicosia</td><td class="c">5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">5 MW</td><td class="r">&euro;136.10</td><td class="r price">&euro;1,361,050</td></tr>
            <tr><td>Easy Power 2</td><td class="c">Nicosia</td><td class="c">4.5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">4.5 MW</td><td class="r">&euro;140.15</td><td class="r price">&euro;1,401,540</td></tr>
            <tr><td>Easy Power 3</td><td class="c">Nicosia</td><td class="c">5</td><td class="c">10</td><td class="c">3&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;136.10</td><td class="r price">&euro;1,361,050</td></tr>
            <tr><td>Easy Power 4</td><td class="c">Nicosia</td><td class="c">1.8</td><td class="c">8</td><td class="c">2&times;5MWh</td><td class="c">1.8 MW</td><td class="r">&euro;142.12</td><td class="r price">&euro;1,136,949</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;138.44</td><td class="r">&euro;5,260,589</td></tr>
        </tbody>
    </table>
    <div class="phase">ELESTORE &mdash; 5 Projects | 60 MW | 200 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>ELESTORE 1</td><td class="c">Nicosia</td><td class="c">12</td><td class="c">40</td><td class="c">8&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;114.99</td><td class="r price">&euro;4,599,600</td></tr>
            <tr><td>ELESTORE 2</td><td class="c">Nicosia</td><td class="c">12</td><td class="c">40</td><td class="c">8&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;114.99</td><td class="r price">&euro;4,599,600</td></tr>
            <tr><td>ELESTORE 3</td><td class="c">Nicosia</td><td class="c">12</td><td class="c">40</td><td class="c">8&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;114.99</td><td class="r price">&euro;4,599,600</td></tr>
            <tr><td>ELESTORE 4</td><td class="c">Nicosia</td><td class="c">12</td><td class="c">40</td><td class="c">8&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;114.99</td><td class="r price">&euro;4,599,600</td></tr>
            <tr><td>ELESTORE 5</td><td class="c">Nicosia</td><td class="c">12</td><td class="c">40</td><td class="c">8&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;114.99</td><td class="r price">&euro;4,599,600</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;114.99</td><td class="r">&euro;22,998,000</td></tr>
        </tbody>
    </table>
    <div class="phase">OTHER ABIO &mdash; Greendorado, Polemi, Potamia, Renergetic, Solarity, Waneron</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Greendorado Larnaca 1</td><td class="c">Larnaca</td><td class="c">1.2</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="r">&euro;154.08</td><td class="r price">&euro;770,397</td></tr>
            <tr><td>Greendorado Larnaca 2</td><td class="c">Larnaca</td><td class="c">1</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="r">&euro;153.15</td><td class="r price">&euro;765,751</td></tr>
            <tr><td>Greendorado 1</td><td class="c">Nicosia</td><td class="c">1.8</td><td class="c">8</td><td class="c">2&times;5MWh</td><td class="r">&euro;142.12</td><td class="r price">&euro;1,136,949</td></tr>
            <tr><td>Polemi</td><td class="c">Nicosia</td><td class="c">1.2</td><td class="c">10</td><td class="c">3&times;5MWh</td><td class="r">&euro;112.96</td><td class="r price">&euro;1,129,579</td></tr>
            <tr><td>Potamia p151</td><td class="c">Nicosia</td><td class="c">1.2</td><td class="c">10</td><td class="c">3&times;5MWh</td><td class="r">&euro;112.96</td><td class="r price">&euro;1,129,579</td></tr>
            <tr><td>Potamia p208</td><td class="c">Nicosia</td><td class="c">4.5</td><td class="c">20</td><td class="c">6&times;5MWh</td><td class="r">&euro;119.79</td><td class="r price">&euro;2,395,785</td></tr>
            <tr><td>Renergetic</td><td class="c">Nicosia</td><td class="c">5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="r">&euro;136.10</td><td class="r price">&euro;1,361,050</td></tr>
            <tr><td>Solarity</td><td class="c">Nicosia</td><td class="c">5</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="r">&euro;136.10</td><td class="r price">&euro;1,361,050</td></tr>
            <tr><td>Waneron</td><td class="c">Nicosia</td><td class="c">3</td><td class="c">11.3</td><td class="c">2&times;5MWh</td><td class="r">&euro;130.58</td><td class="r price">&euro;1,472,981</td></tr>
            <tr class="sub-total"><td colspan="5">Subtotal</td><td class="r">&euro;127.24</td><td class="r">&euro;11,523,120</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="5" style="border:none"><strong>GRAND TOTAL &mdash; 25 Projects | 125 MW | 430.3 MWh</strong></td><td class="r" style="border:none">&euro;122.27/kWh</td><td class="r" style="border:none">&euro;52,609,992</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Prices are final turnkey EPC delivered.</p>
    """
}

ESPERIA = {
    "client_name": "Esperia Energy Group",
    "ref": "LCY-GRP2-2026-MAR",
    "parks": 11, "mw": 79.5, "mwh": 315.5, "revenue": 36_412_812,
    "pricing_tables": """
    <div class="phase">ESPERIA (2026) &mdash; 4 Projects | 44.5 MW | 200 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Esperia Famagusta</td><td class="c">Famagusta</td><td class="c">6.5</td><td class="c">20</td><td class="c">4&times;5MWh</td><td class="c">6.5 MW</td><td class="r">&euro;125.02</td><td class="r price">&euro;2,500,334</td></tr>
            <tr><td>Esperia Famagusta 2</td><td class="c">Famagusta</td><td class="c">5</td><td class="c">20</td><td class="c">4&times;5MWh</td><td class="c">5 MW</td><td class="r">&euro;112.94</td><td class="r price">&euro;2,258,900</td></tr>
            <tr><td>Esperia Frenaros</td><td class="c">Famagusta</td><td class="c">25</td><td class="c">100</td><td class="c">20&times;5MWh</td><td class="c">3&times;MV</td><td class="r">&euro;110.79</td><td class="r price">&euro;11,079,435</td></tr>
            <tr><td>Esperia Limassol</td><td class="c">Limassol</td><td class="c">8</td><td class="c">60</td><td class="c">12&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;100.05</td><td class="r price">&euro;6,003,120</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;109.21</td><td class="r">&euro;21,841,789</td></tr>
        </tbody>
    </table>
    <div class="phase">ESPERIA TSERI (2028 Pipeline) &mdash; 5 Projects | 27.5 MW | 87.5 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Esperia Tseri</td><td class="c">Nicosia</td><td class="c">7</td><td class="c">20</td><td class="c">4&times;5MWh</td><td class="c">7 MW</td><td class="r">&euro;127.95</td><td class="r price">&euro;2,559,071</td></tr>
            <tr><td>Esperia Tseri 2a</td><td class="c">Nicosia</td><td class="c">2.5</td><td class="c">7.5</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;154.67</td><td class="r price">&euro;1,159,991</td></tr>
            <tr><td>Esperia Tseri 2b</td><td class="c">Nicosia</td><td class="c">7.5</td><td class="c">25</td><td class="c">5&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;126.77</td><td class="r price">&euro;3,169,128</td></tr>
            <tr><td>Esperia Tseri 2c</td><td class="c">Nicosia</td><td class="c">6</td><td class="c">20</td><td class="c">4&times;5MWh</td><td class="c">6 MW</td><td class="r">&euro;122.24</td><td class="r price">&euro;2,444,867</td></tr>
            <tr><td>Esperia Tseri 3</td><td class="c">Nicosia</td><td class="c">4.5</td><td class="c">15</td><td class="c">3&times;5MWh</td><td class="c">4.5 MW</td><td class="r">&euro;133.92</td><td class="r price">&euro;2,008,827</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;129.62</td><td class="r">&euro;11,341,885</td></tr>
        </tbody>
    </table>
    <div class="phase">GALASCOPE &mdash; 2 Projects | 7.5 MW | 23 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Galascope 1</td><td class="c">Famagusta</td><td class="c">5</td><td class="c">15</td><td class="c">3&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;137.87</td><td class="r price">&euro;2,068,112</td></tr>
            <tr><td>Galascope 2</td><td class="c">Famagusta</td><td class="c">2.5</td><td class="c">8</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;145.13</td><td class="r price">&euro;1,161,027</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;140.40</td><td class="r">&euro;3,229,138</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>GRAND TOTAL &mdash; 11 Projects | 79.5 MW | 315.5 MWh</strong></td><td class="r" style="border:none">&euro;117.27/kWh</td><td class="r" style="border:none">&euro;36,412,812</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Prices are final turnkey EPC delivered.</p>
    """
}

LAMPROS = {
    "client_name": "Lampros Andreadis (Classone Solar)",
    "ref": "LCY-GRP3-2026-MAR",
    "parks": 2, "mw": 4.8, "mwh": 15, "revenue": 2_117_420,
    "pricing_tables": """
    <div class="phase">CLASSONE SOLAR &mdash; 2 Projects | 4.8 MW | 15 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Solar Breeze</td><td class="c">Limassol</td><td class="c">1.5</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="c">1.5 MW</td><td class="r">&euro;159.09</td><td class="r price">&euro;795,443</td></tr>
            <tr><td>Solar Garden</td><td class="c">Limassol</td><td class="c">3.3</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">3.3 MW</td><td class="r">&euro;132.20</td><td class="r price">&euro;1,321,976</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;141.16</td><td class="r">&euro;2,117,420</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>GRAND TOTAL &mdash; 2 Projects | 4.8 MW | 15 MWh</strong></td><td class="r" style="border:none">&euro;141.16/kWh</td><td class="r" style="border:none">&euro;2,117,420</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Adjacent site discount (&euro;15,000) available for shared EMS &mdash; contact us for details.</p>
    """
}

KERASI = {
    "client_name": "A. Kerasi (Paphos Solar)",
    "ref": "LCY-GRP4-2026-MAR",
    "parks": 3, "mw": 6.5, "mwh": 20, "revenue": 3_061_370,
    "pricing_tables": """
    <div class="phase">PAPHOS SOLAR &mdash; 3 Projects | 6.5 MW | 20 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Paphos 1</td><td class="c">Paphos</td><td class="c">2.5</td><td class="c">7.5</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;154.57</td><td class="r price">&euro;1,159,302</td></tr>
            <tr><td>Paphos 2</td><td class="c">Paphos</td><td class="c">2.5</td><td class="c">7.5</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;154.57</td><td class="r price">&euro;1,159,302</td></tr>
            <tr><td>Paphos 3</td><td class="c">Paphos</td><td class="c">1.5</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="c">1.5 MW</td><td class="r">&euro;148.55</td><td class="r price">&euro;742,767</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;153.07</td><td class="r">&euro;3,061,370</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>GRAND TOTAL &mdash; 3 Projects | 6.5 MW | 20 MWh</strong></td><td class="r" style="border:none">&euro;153.07/kWh</td><td class="r" style="border:none">&euro;3,061,370</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Prices are final turnkey EPC delivered.</p>
    """
}

KARIS = {
    "client_name": "Ioannis Karis (My Sun Park)",
    "ref": "LCY-GRP5-2026-MAR",
    "parks": 1, "mw": 7.7, "mwh": 25, "revenue": 3_220_675,
    "pricing_tables": """
    <div class="phase">MY SUN PARK &mdash; 1 Project | 7.7 MW | 25 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>My Sun Park</td><td class="c">Limassol</td><td class="c">7.7</td><td class="c">25</td><td class="c">5&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;128.83</td><td class="r price">&euro;3,220,675</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>GRAND TOTAL &mdash; 1 Project | 7.7 MW | 25 MWh</strong></td><td class="r" style="border:none">&euro;128.83/kWh</td><td class="r" style="border:none">&euro;3,220,675</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Prices are final turnkey EPC delivered.</p>
    """
}

TIMOTHEOS = {
    "client_name": "Timotheos Timotheou",
    "ref": "LCY-GRP6-2026-MAR",
    "parks": 9, "mw": 25.5, "mwh": 81, "revenue": 11_818_919,
    "pricing_tables": """
    <div class="phase">AGM GROUP &mdash; 4 Projects | 15.5 MW | 48 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>AGM Lightpower</td><td class="c">Nicosia</td><td class="c">8</td><td class="c">24</td><td class="c">5&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;134.42</td><td class="r price">&euro;3,225,985</td></tr>
            <tr><td>AGM Sunfield 1</td><td class="c">Nicosia</td><td class="c">5</td><td class="c">15</td><td class="c">3&times;5MWh</td><td class="c">5 MW</td><td class="r">&euro;136.33</td><td class="r price">&euro;2,044,888</td></tr>
            <tr><td>AGM Sunfield 2</td><td class="c">Nicosia</td><td class="c">1.5</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="c">1.5 MW</td><td class="r">&euro;159.36</td><td class="r price">&euro;796,807</td></tr>
            <tr><td>AGM Sunfield 3</td><td class="c">Nicosia</td><td class="c">1</td><td class="c">4</td><td class="c">1&times;5MWh</td><td class="c">1 MW</td><td class="r">&euro;176.18</td><td class="r price">&euro;704,706</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;141.09</td><td class="r">&euro;6,772,386</td></tr>
        </tbody>
    </table>
    <div class="phase">L&amp;T GROUP &mdash; 5 Projects | 10 MW | 33 MWh</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>L&amp;T Res Systems</td><td class="c">Famagusta</td><td class="c">1</td><td class="c">4</td><td class="c">1&times;5MWh</td><td class="c">1 MW</td><td class="r">&euro;176.35</td><td class="r price">&euro;705,395</td></tr>
            <tr><td>L&amp;T Solar Power</td><td class="c">Famagusta</td><td class="c">1.5</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="c">1.5 MW</td><td class="r">&euro;159.50</td><td class="r price">&euro;797,496</td></tr>
            <tr><td>L&amp;T Sun Energy</td><td class="c">Limassol</td><td class="c">5</td><td class="c">15</td><td class="c">3&times;5MWh</td><td class="c">5 MW</td><td class="r">&euro;136.14</td><td class="r price">&euro;2,042,130</td></tr>
            <tr><td>L&amp;T Energia</td><td class="c">Nicosia</td><td class="c">1.5</td><td class="c">5</td><td class="c">1&times;5MWh</td><td class="c">1.5 MW</td><td class="r">&euro;159.36</td><td class="r price">&euro;796,807</td></tr>
            <tr><td>L&amp;T PV Tech</td><td class="c">Nicosia</td><td class="c">1</td><td class="c">4</td><td class="c">1&times;5MWh</td><td class="c">1 MW</td><td class="r">&euro;176.18</td><td class="r price">&euro;704,706</td></tr>
            <tr class="sub-total"><td colspan="6">Subtotal</td><td class="r">&euro;152.93</td><td class="r">&euro;5,046,534</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>GRAND TOTAL &mdash; 9 Projects | 25.5 MW | 81 MWh</strong></td><td class="r" style="border:none">&euro;145.91/kWh</td><td class="r" style="border:none">&euro;11,818,919</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Prices are final turnkey EPC delivered.</p>
    """
}

AEOLIAN = {
    "client_name": "Aeolian Dynamics (Wind Farm BESS)",
    "ref": "LCY-IND-AEOLIAN-2026-MAR",
    "parks": 1, "mw": 5.4, "mwh": 20, "revenue": 2_258_900,
    "pricing_tables": """
    <div class="phase">AEOLIAN DYNAMICS &mdash; 1 Project | 5.4 MW | 20 MWh (Larnaca Wind Farm)</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Aeolian Dynamics BESS</td><td class="c">Larnaca</td><td class="c">5.4</td><td class="c">20</td><td class="c">4&times;5MWh</td><td class="c">5.4 MW</td><td class="r">&euro;112.95</td><td class="r price">&euro;2,258,900</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>TOTAL &mdash; 5.4 MW | 20 MWh</strong></td><td class="r" style="border:none">&euro;112.95/kWh</td><td class="r" style="border:none">&euro;2,258,900</td></tr>
    </table>
    <p class="note">Indicative pricing based on 5MW/20MWh group-order rate. Final pricing subject to wind farm grid connection assessment and MV integration scope.</p>
    """
}

CHRISTOS = {
    "client_name": "Christos (Nicosia)",
    "ref": "LCY-IND-CHRISTOS-2026-MAR",
    "parks": 1, "mw": 3.3, "mwh": 10, "revenue": 1_321_976,
    "pricing_tables": """
    <div class="phase">CHRISTOS BESS &mdash; 1 Project | 3.3 MW | 10 MWh (Nicosia)</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Christos Nicosia BESS</td><td class="c">Nicosia</td><td class="c">3.3</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">3.3 MW</td><td class="r">&euro;132.20</td><td class="r price">&euro;1,321,976</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>TOTAL &mdash; 3.3 MW | 10 MWh</strong></td><td class="r" style="border:none">&euro;132.20/kWh</td><td class="r" style="border:none">&euro;1,321,976</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Group-order pricing applied.</p>
    """
}

MALTEZOS = {
    "client_name": "Maltezos (Agios Theodoros)",
    "ref": "LCY-IND-MALTEZOS-2026-MAR",
    "parks": 1, "mw": 2.64, "mwh": 10, "revenue": 1_206_300,
    "pricing_tables": """
    <div class="phase">MALTEZOS BESS &mdash; 1 Project | 2.64 MW | 10 MWh (Agios Theodoros)</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Maltezos BESS</td><td class="c">Limassol</td><td class="c">2.64</td><td class="c">10</td><td class="c">2&times;5MWh</td><td class="c">2.5 MW</td><td class="r">&euro;120.63</td><td class="r price">&euro;1,206,300</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>TOTAL &mdash; 2.64 MW | 10 MWh</strong></td><td class="r" style="border:none">&euro;120.63/kWh</td><td class="r" style="border:none">&euro;1,206,300</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Group-order pricing applied.</p>
    """
}

SPANERCOM = {
    "client_name": "Spanercom (Anarita)",
    "ref": "LCY-IND-SPANERCOM-2026-MAR",
    "parks": 1, "mw": 10, "mwh": 40, "revenue": 4_599_600,
    "pricing_tables": """
    <div class="phase">SPANERCOM BESS &mdash; 1 Project | 10 MW | 40 MWh (Anarita, Paphos)</div>
    <table>
        <thead><tr><th>Project</th><th class="c">District</th><th class="c">MW</th><th class="c">MWh</th><th class="c">Containers</th><th class="c">MV Skid</th><th class="r">&euro;/kWh</th><th class="r">Total Price</th></tr></thead>
        <tbody>
            <tr><td>Spanercom Anarita BESS</td><td class="c">Paphos</td><td class="c">10</td><td class="c">40</td><td class="c">8&times;5MWh</td><td class="c">2&times;MV</td><td class="r">&euro;114.99</td><td class="r price">&euro;4,599,600</td></tr>
        </tbody>
    </table>
    <table>
        <tr class="total-row"><td colspan="6" style="border:none"><strong>TOTAL &mdash; 10 MW | 40 MWh</strong></td><td class="r" style="border:none">&euro;114.99/kWh</td><td class="r" style="border:none">&euro;4,599,600</td></tr>
    </table>
    <p class="note">All prices exclude VAT (19%). Group-order pricing applied. Financial model available separately.</p>
    """
}


if __name__ == "__main__":
    print("Generating comprehensive client presentations...")
    print(f"  Portfolio: {PORTFOLIO['parks']} parks | {PORTFOLIO['mw']} MW | {PORTFOLIO['mwh']} MWh")
    print()

    groups = [
        (ABIO, os.path.join(GROUP_DIR, "Group1_ABIO_Power", "client-presentation-mar2026.html")),
        (ESPERIA, os.path.join(GROUP_DIR, "Group2_Esperia_Energy", "client-presentation-mar2026.html")),
        (LAMPROS, os.path.join(GROUP_DIR, "Group3_Lampros_Andreadis", "client-presentation-mar2026.html")),
        (KERASI, os.path.join(GROUP_DIR, "Group4_A_Kerasi", "client-presentation-mar2026.html")),
        (KARIS, os.path.join(GROUP_DIR, "Group5_Ioannis_Karis", "client-presentation-mar2026.html")),
        (TIMOTHEOS, os.path.join(GROUP_DIR, "Group6_Timotheos_Timotheou", "client-presentation-mar2026.html")),
    ]

    individuals = [
        (AEOLIAN, os.path.join(CLIENTS_DIR, "Individual_Aeolian_Dynamics_Larnaca", "client-presentation-mar2026.html")),
        (CHRISTOS, os.path.join(CLIENTS_DIR, "Individual_Christos_Nicosia", "client-presentation-mar2026.html")),
        (MALTEZOS, os.path.join(CLIENTS_DIR, "Individual_Maltezos_Agios_Theodoros", "client-presentation-mar2026.html")),
        (SPANERCOM, os.path.join(CLIENTS_DIR, "Individual_Spanercom", "client-presentation-mar2026.html")),
    ]

    for client_data, output_path in groups + individuals:
        generate_presentation(client_data, output_path)

    print(f"\nDone! Generated {len(groups)} group + {len(individuals)} individual presentations.")
    print("Each presentation includes: Cover, Lighthief Overview, Pricing, EPC Scope,")
    print("Bankability Brief, Warranty/LTSA, Insurance Programme, and Next Steps.")
