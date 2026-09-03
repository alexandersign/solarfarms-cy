"""
Investor One-Pager Generator — all Cyprus RTB parks for sale.
Outputs one clean A4 HTML per project.

Realistic model assumptions (calibrated against Galascope 2025 data):
  PV yield:         1,700 kWh/kWp  (bifacial)
  Curtailment:        50.0%         (operator-reported, Nicosia/Larnaca area)
  BESS capture:       87.4%         (Galascope 365-day real model)
  RTE AC-AC:          86.32%        (full system incl. cabling)
  Discharge price:   €195/MWh       (blended conservative; DAM avg €184, Apr >€340)
  Solar sell price:  €140.88/MWh   (TSOC DAM daytime avg 06-17h)
  PV O&M:          €15,000/MWp/yr  (confirmed rate)
  BESS O&M (LTSA): €1,740/MWh/yr  (Tier C, Yr 1-5 — portfolio-data.ts confirmed)
  SCADA/EMS:        €5,000/yr
  Aggregator:          10%
  Cyprus CIT:          15%           (from 1 Jan 2026)
  PV EPC:         €720k/MWp         (standard Lighthief)
  BESS EPC:       €125k/MWh
  Financing:       100% equity

Ext. Linyang warranty (paid by investor directly to Linyang — separate from LTSA):
  Yr 6-10: €1,661.68/MWh/yr
  Yr 11-15: €2,083.72/MWh/yr

Run: python3 scripts/generate-investor-onepagers.py
Output: public/lighthief-cyprus/teasers/{slug}/{slug}-investor.html
        docs/teasers/{slug}-investor.html
"""

import base64, math, os, pathlib

# ── Logo ─────────────────────────────────────────────────────────────────────
_root = pathlib.Path(__file__).parent.parent
_logo_path = _root / "public/images/logo/lighthief-logo-200.png"
with open(_logo_path, "rb") as f:
    LOGO_SRC = f"data:image/png;base64,{base64.b64encode(f.read()).decode()}"

# ── Shared financial constants ────────────────────────────────────────────────
YIELD_KWH_KWP    = 1_700
CURTAILMENT      = 0.50
CAPTURE_RATE     = 0.874
RTE              = 0.8632
DISCHARGE_PRICE  = 195.0
SOLAR_RATE       = 140.88
AGGREGATOR       = 0.10
CIT              = 0.15
PV_OM_PER_MWP    = 15_000   # €/MWp/yr
BESS_LTSA_MWH    = 1_740    # €/MWh/yr — LTSA Tier C (Yr 1-5)
SCADA_PA         = 5_000    # €/yr
PV_EPC_PER_MWP   = 720_000  # €/MWp
BESS_EPC_PER_MWH = 125_000  # €/MWh
INS_PCT          = 0.005    # 0.5% of CAPEX operational insurance

# Extended Linyang warranty (investor pays direct to Linyang from Yr 6)
EXT_WAR_6_10_MWH  = 1_661.68   # €/MWh/yr
EXT_WAR_11_15_MWH = 2_083.72   # €/MWh/yr

# Contacts (SSOT: lib/constants.ts)
CONTACT = {
    "director":       "Alexander Papacosta",
    "title":          "Cyprus Director",
    "phone":          "+357 99 164 158",
    "email":          "office@lighthief.com",
    "company":        "Lighthief Cyprus Ltd",
    "reg":            "HE 477423",
    "website":        "solarfarms.cy",
    "office_phone":   "+357 77 77 00 50",
    "address":        "15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol, Cyprus",
}


# ── Project definitions ───────────────────────────────────────────────────────

PARKS = [
    {
        "slug":        "shia-sia-nicosia",
        "ref":         "PARK-RTB-SIA-2026",
        "title":       "Sia Solar Park + BESS — 3.2 MWp / 10 MWh",
        "location":    "Larnaca District, Cyprus",
        "status":      "Permit-Ready",
        "status_cls":  "amber",
        "permits":     "CERA E3511 issued · Town planning issued · EIA approved · Land lease executed · EAC preliminary terms accepted (deposit paid Feb 2023)",
        "grid_note":   "EAC connection ref 498000141; 5% deposit paid Feb 2023; substation sublease formalisation in progress",
        "grid_cls":    "green",
        "timeline":    "Target COD Q3–Q4 2027",
        "solar_mwp":   3.2,
        "bess_mwh":    7.5,
        "bess_mw":     2.5,
        "curtailment_pct": 0.45,
        "rtb_cost":    1_600_000,   # Novikov's actual embedded development cost
        "rtb_label":   "Project licences & development",
        "pv_epc_mwp":  PV_EPC_PER_MWP,   # €720k/MWp standard
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  83_842,            # EAC preliminary — not binding
        "land_lease":  18_000,
        "pv_om_per_mwp": 8_000,
        "yield_kwh_kwp": 1_480,
        "yield_note":  "1,480 kWh/kWp (bifacial E-W 10 deg, PVGIS Jun 2026)",
        "note":        "EAC grid infrastructure cost €83,842 is a preliminary estimate — not binding; final confirmed after EAC Techno-Economic Study.",
    },
    {
        "slug":        "agios-theodoros-rtb",
        "ref":         "PARK-RTB-2026",
        "title":       "Agios Theodoros Solar Park + BESS — 2.64 MWp / 10.56 MWh",
        "location":    "Agios Theodoros, Larnaca District, Cyprus",
        "status":      "Ready to Build",
        "status_cls":  "green",
        "permits":     "CERA Ε004576/2024 issued · Town planning issued · Building permits issued · Land rights secured",
        "grid_note":   "EAC grid connection terms issued — RTB status confirmed",
        "grid_cls":    "green",
        "timeline":    "Target COD Q4 2026",
        "solar_mwp":   2.64,
        "bess_mwh":    10.56,
        "bess_mw":     2.5,
        "rtb_cost":    1_000_000,
        "rtb_label":   "RTB acquisition",
        "pv_epc_mwp":  PV_EPC_PER_MWP,
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  350_000,           # Development incl. grid in existing model
        "land_lease":  15_000,
        "note":        "Agios Theodoros is the most advanced RTB asset — all permits confirmed, grid terms issued.",
    },
    {
        "slug":        "ragelia-2205-2206",
        "ref":         "PARK-RTB-RAG2206-2026",
        "title":       "Solar Parks #2205 + #2206 — Combined 2.817 MW (Freehold Land)",
        "location":    "Nicosia District, Cyprus",
        "status":      "Fully Licensed / RTB",
        "status_cls":  "green",
        "permits":     "#2205 construction complete — awaiting grid · #2206 Tier 1 RTB all permits issued · Land FREEHOLD on both plots (no lease risk)",
        "grid_note":   "Preliminary DSO application filed; formal offer expected Q3 2026",
        "grid_cls":    "amber",
        "timeline":    "#2205 energisation Q3 2026 · #2206 COD Q4 2026",
        "solar_mwp":   2.817,
        "bess_mwh":    6,
        "bess_mw":     1.5,
        "rtb_cost":    1_850_000,   # Seller package price (land owned, built works incl.)
        "rtb_label":   "Package acquisition (incl. freehold land + built works)",
        "pv_epc_mwp":  PV_EPC_PER_MWP,   # Only for #2206's 2.317 MWp
        "pv_mwp_for_epc": 2.317,          # #2205 already built — EPC only for #2206
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  0,
        "land_lease":  0,           # Freehold — no lease
        "note":        "Land is FREEHOLD on both plots — zero lease risk. #2205 civil + electrical construction already complete. PV EPC only required for #2206 (2.317 MWp).",
    },
    {
        "slug":        "ragelia-2302",
        "ref":         "PARK-RTB-RAG2302-2026",
        "title":       "Solar Park #2302 + BESS — 0.825 MWp",
        "location":    "Nicosia District, Cyprus",
        "status":      "Fully Licensed / RTB",
        "status_cls":  "green",
        "permits":     "Tier 1 RTB — all licences in place · Land lease registered, zero encumbrances",
        "grid_note":   "Preliminary DSO application filed; formal offer expected Q3 2026",
        "grid_cls":    "amber",
        "timeline":    "Target COD Q4 2026 / Q1 2027",
        "solar_mwp":   0.825,
        "bess_mwh":    2,
        "bess_mw":     0.5,
        "rtb_cost":    330_000,
        "rtb_label":   "RTB acquisition (SPV share purchase)",
        "pv_epc_mwp":  PV_EPC_PER_MWP,
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  0,
        "land_lease":  8_000,
        "note":        "BESS upgrade requires CERA licence amendment (standard process). Grid formal offer expected Q3 2026.",
    },
    {
        "slug":        "ragelia-2110",
        "ref":         "PARK-RTB-RAG2110-2026",
        "title":       "Solar Park #2110 + BESS — 0.714 MWp",
        "location":    "Nicosia District, Cyprus",
        "status":      "Fully Licensed / RTB",
        "status_cls":  "green",
        "permits":     "Tier 1 RTB — all licences in place · Land lease registered, zero encumbrances",
        "grid_note":   "Preliminary DSO application filed; formal offer expected Q3 2026",
        "grid_cls":    "amber",
        "timeline":    "Target COD Q4 2026 / Q1 2027",
        "solar_mwp":   0.714,
        "bess_mwh":    2,
        "bess_mw":     0.5,
        "rtb_cost":    285_600,
        "rtb_label":   "RTB acquisition (SPV share purchase)",
        "pv_epc_mwp":  PV_EPC_PER_MWP,
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  0,
        "land_lease":  7_500,
        "note":        "BESS upgrade requires CERA licence amendment. Grid formal offer expected Q3 2026.",
    },
    {
        "slug":        "ragelia-2105",
        "ref":         "PARK-RTB-RAG2105-2026",
        "title":       "Solar Park #2105 + BESS — 0.69 MWp",
        "location":    "Nicosia District, Cyprus",
        "status":      "Fully Licensed / RTB",
        "status_cls":  "green",
        "permits":     "Tier 1 RTB — all licences in place · Land lease registered, zero encumbrances",
        "grid_note":   "Preliminary DSO application filed; formal offer expected Q3 2026",
        "grid_cls":    "amber",
        "timeline":    "Target COD Q4 2026 / Q1 2027",
        "solar_mwp":   0.69,
        "bess_mwh":    2,
        "bess_mw":     0.5,
        "rtb_cost":    276_000,
        "rtb_label":   "RTB acquisition (SPV share purchase)",
        "pv_epc_mwp":  PV_EPC_PER_MWP,
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  0,
        "land_lease":  7_000,
        "note":        "BESS upgrade requires CERA licence amendment. Grid formal offer expected Q3 2026.",
    },
    {
        "slug":        "vanalio-nicosia",
        "ref":         "PARK-RTB-VAN-2026",
        "title":       "Agios Ioannis Malountas Solar Parks — 10.4 MWp / 20 MWh",
        "location":    "Agios Ioannis Malountas, Nicosia District, Cyprus",
        "status":      "Fully Licensed",
        "status_cls":  "amber",
        "permits":     "CERA licences extended to 31/12/2029 · Town planning issued · Building permits issued · Environmental approval · Land leases valid to 2051",
        "grid_note":   "⚠ GRID CAPACITY RISK: TSO confirmed no area capacity (Jan 2023). Area substation upgrade in progress — EAC/TSO est. completion Q4 2026. Preliminary refs 400387217–400387472 issued only.",
        "grid_cls":    "red",
        "timeline":    "Target COD 2027/2028 — conditional on area grid upgrade",
        "solar_mwp":   10.4,
        "bess_mwh":    20,
        "bess_mw":     5,
        "rtb_cost":    400_000,
        "rtb_label":   "RTB acquisition (4 SPVs — 4 plots)",
        "pv_epc_mwp":  PV_EPC_PER_MWP,
        "bess_epc_mwh": BESS_EPC_PER_MWH,
        "grid_works":  0,
        "land_lease":  30_000,    # Confirmed in Technical DD
        "note":        "Grid capacity risk is the critical item — area substation upgrade required before final EAC connection terms can be issued. COD is conditional on TSO/EAC upgrade completion.",
    },
]


# ── Financial calculations ────────────────────────────────────────────────────

def calc(p):
    solar_mwp = p["solar_mwp"]
    bess_mwh  = p["bess_mwh"]
    land      = p["land_lease"]

    # PV EPC — use pv_mwp_for_epc if set (e.g. combined package where part is already built)
    pv_for_epc = p.get("pv_mwp_for_epc", solar_mwp)
    pv_epc  = round(pv_for_epc * p["pv_epc_mwp"])
    bess_epc = round(bess_mwh * p["bess_epc_mwh"])
    total_capex = p["rtb_cost"] + pv_epc + bess_epc + p["grid_works"]

    # Revenue
    yield_kwp = p.get("yield_kwh_kwp", YIELD_KWH_KWP)
    curtailment = p.get("curtailment_pct", CURTAILMENT)
    annual_mwh   = solar_mwp * yield_kwp
    uncurtailed  = round(annual_mwh * (1 - curtailment))
    curtailed    = round(annual_mwh * curtailment)
    ideal_charge = round(curtailed * CAPTURE_RATE)
    max_charge   = round(bess_mwh * 280)  # energy-limited days/yr
    bess_charged = min(ideal_charge, max_charge)
    bess_out     = round(bess_charged * RTE)
    solar_rev    = round(uncurtailed * SOLAR_RATE)
    bess_rev     = round(bess_out * DISCHARGE_PRICE)
    gross_rev    = solar_rev + bess_rev

    # P&L
    aggregator = round(gross_rev * AGGREGATOR)
    net_rev    = gross_rev - aggregator
    pv_om      = round(solar_mwp * p.get("pv_om_per_mwp", PV_OM_PER_MWP))
    bess_ltsa  = round(bess_mwh * BESS_LTSA_MWH)
    insurance  = round(total_capex * INS_PCT)
    admin      = 10_000
    opex       = pv_om + bess_ltsa + SCADA_PA + land + insurance + admin
    ebitda     = net_rev - opex

    # D&A (tax shield)
    da_epc = round((pv_epc + bess_epc) / 20)
    da_dev = round(p["rtb_cost"] / 15)
    da_total = da_epc + da_dev

    taxable = max(0, ebitda - da_total)
    tax     = round(taxable * CIT)
    fcf_y1  = ebitda - tax

    cash_yield  = fcf_y1 / total_capex if total_capex > 0 else 0
    payback     = round(total_capex / fcf_y1, 1) if fcf_y1 > 0 else 99

    # Extended warranty (Yr 6-10) — for disclosure
    ext_war_6_10 = round(bess_mwh * EXT_WAR_6_10_MWH)

    return {
        "pv_epc": pv_epc, "bess_epc": bess_epc, "total_capex": total_capex,
        "uncurtailed": uncurtailed, "bess_out": bess_out,
        "solar_rev": solar_rev, "bess_rev": bess_rev, "gross_rev": gross_rev,
        "aggregator": aggregator, "net_rev": net_rev,
        "pv_om": pv_om, "bess_ltsa": bess_ltsa, "insurance": insurance,
        "land": land, "opex": opex, "ebitda": ebitda,
        "da_total": da_total, "tax": tax, "fcf_y1": fcf_y1,
        "cash_yield": cash_yield, "payback": payback,
        "ext_war_6_10": ext_war_6_10,
    }


# ── HTML template ─────────────────────────────────────────────────────────────

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#1A365D;--gold:#C9A432;--bg:#F8FAFC;--border:#E2E8F0;--text:#1A202C;--muted:#64748B;--green:#059669;--amber:#D97706;--red:#DC2626}
body{font-family:'Segoe UI',-apple-system,sans-serif;background:#E2E8F0;padding:20px;font-size:10pt;color:var(--text)}
.page{background:#fff;width:210mm;max-width:100%;margin:0 auto;padding:13mm 15mm;box-shadow:0 4px 20px rgba(0,0,0,.1)}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid var(--navy);padding-bottom:9px;margin-bottom:12px}
.logo{height:36px}
.doc-label{text-align:right;font-size:7pt;color:var(--muted);line-height:1.7}
.doc-label strong{color:var(--navy);font-size:7.5pt}
h1{font-size:13.5pt;font-weight:800;color:var(--navy);margin-bottom:2px}
.subtitle{font-size:8.5pt;color:var(--muted);margin-bottom:5px}
.badges{margin-bottom:9px}
.badge{display:inline-block;font-size:6.5pt;font-weight:700;padding:2px 9px;border-radius:10px;text-transform:uppercase;letter-spacing:.4px;margin-right:5px;margin-bottom:2px}
.badge-green{background:#DCFCE7;color:#166534}
.badge-amber{background:#FEF9C3;color:#92400E}
.badge-red{background:#FEE2E2;color:#991B1B}
.kpi-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}
.kpi{background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:10px 6px;text-align:center}
.kpi.hi{border-color:var(--navy);background:#EFF6FF}
.kpi.gr{border-color:var(--green);background:#ECFDF5}
.kpi .val{font-size:15pt;font-weight:800;color:var(--navy);line-height:1.1}
.kpi.gr .val{color:var(--green)}
.kpi .lbl{font-size:6pt;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;margin-top:3px}
.kpi .sub{font-size:5.5pt;color:var(--muted);margin-top:1px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:11px}
h2{font-size:9pt;font-weight:700;color:var(--navy);border-bottom:2px solid var(--gold);padding-bottom:2px;display:inline-block;margin-bottom:7px}
table{width:100%;border-collapse:collapse;font-size:7.5pt}
th{background:var(--navy);color:#fff;padding:4px 7px;text-align:left;font-size:7pt;font-weight:600}
td{padding:4px 7px;border-bottom:1px solid var(--border)}
tr:last-child td{border-bottom:none}
.r{text-align:right}
.total td{background:var(--navy);color:#fff;font-weight:700;border:none}
.sub-row td{background:#F1F5F9;font-weight:600}
.warn-row td{background:#FEF9C3;color:#92400E;font-size:7pt}
ul.bullets{font-size:7.5pt;line-height:1.85}
ul.bullets li{list-style:none;padding-left:13px;position:relative}
ul.bullets li::before{content:"·";position:absolute;left:0;color:var(--gold);font-weight:900;font-size:11pt;line-height:1}
.grid-pill{display:inline-block;padding:1px 7px;border-radius:8px;font-size:6.5pt;font-weight:600}
.grid-green{background:#DCFCE7;color:#166534}
.grid-amber{background:#FEF9C3;color:#92400E}
.grid-red{background:#FEE2E2;color:#991B1B}
.contact{background:#EFF6FF;border:1px solid #BFDBFE;border-radius:4px;padding:8px 10px;font-size:7.5pt;margin-top:8px}
.note{font-size:6.5pt;color:var(--muted);margin-top:6px;line-height:1.5;padding-top:6px;border-top:1px solid var(--border)}
.footer{margin-top:8px;padding-top:6px;border-top:2px solid var(--navy);font-size:6pt;color:var(--muted);text-align:center}
.print-btn{position:fixed;top:12px;right:12px;background:var(--navy);color:#fff;border:none;padding:8px 14px;border-radius:4px;cursor:pointer;font-size:12px;z-index:100}
@media print{.print-btn{display:none}html,body{background:#fff;padding:0}.page{box-shadow:none;padding:10mm 12mm;width:auto;max-width:none}}
"""


def eur(n):
    if abs(n) >= 1_000_000:
        return f"&euro;{n/1e6:.2f}M"
    if abs(n) >= 1_000:
        return f"&euro;{round(n/1000):,}K"
    return f"&euro;{round(n):,}"


def render(p, c):
    badge_cls = f"badge-{p['status_cls']}"
    grid_cls  = f"grid-{p['grid_cls']}"
    date_str  = "May 2026"

    # Special PV EPC note for combined package
    pv_epc_label = f"PV EPC &mdash; {p.get('pv_mwp_for_epc', p['solar_mwp'])} MWp"
    if "pv_mwp_for_epc" in p:
        pv_epc_label += f" (&#35;2206 only &mdash; &#35;2205 already built)"

    # Ext warranty note
    ext_war_note = f"From Yr 6: +{eur(c['ext_war_6_10'])}/yr (Linyang warranty paid direct)"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{p['title']} | Lighthief Cyprus — Investor One-Pager</title>
<style>{CSS}</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">Print / PDF</button>
<div class="page">

  <div class="header">
    <img class="logo" src="{LOGO_SRC}" alt="Lighthief Cyprus">
    <div class="doc-label">
      <strong>INVESTOR ONE-PAGER &mdash; CONFIDENTIAL</strong><br>
      {p['ref']} &middot; {date_str}<br>
      Non-binding &middot; 100% equity basis
    </div>
  </div>

  <h1>{p['title']}</h1>
  <div class="subtitle">{p['location']}</div>
  <div class="badges">
    <span class="badge {badge_cls}">{p['status']}</span>
    <span class="grid-pill {grid_cls}">{p['grid_note']}</span>
  </div>

  <div class="kpi-strip">
    <div class="kpi hi">
      <div class="val">{eur(c['total_capex'])}</div>
      <div class="lbl">Total equity</div>
      <div class="sub">100% equity, no debt</div>
    </div>
    <div class="kpi">
      <div class="val">{eur(c['gross_rev'])}</div>
      <div class="lbl">Gross Y1 revenue</div>
      <div class="sub">Solar + BESS dispatch</div>
    </div>
    <div class="kpi gr">
      <div class="val">{eur(c['fcf_y1'])}</div>
      <div class="lbl">Y1 free cash flow</div>
      <div class="sub">Post-tax (CIT 15%)</div>
    </div>
    <div class="kpi gr">
      <div class="val">{c['cash_yield']*100:.1f}%</div>
      <div class="lbl">Cash-on-cash yield</div>
      <div class="sub">~{c['payback']} yr payback</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <h2>Investment (CAPEX)</h2>
      <table>
        <thead><tr><th>Component</th><th class="r">EUR ex VAT</th></tr></thead>
        <tbody>
          <tr><td>{p['rtb_label']}</td><td class="r">{eur(p['rtb_cost'])}</td></tr>
          <tr><td>{pv_epc_label}</td><td class="r">{eur(c['pv_epc'])}</td></tr>
          <tr><td>BESS EPC &mdash; {p['bess_mw']} MW / {p['bess_mwh']} MWh (4h)</td><td class="r">{eur(c['bess_epc'])}</td></tr>
          {f'<tr><td>EAC grid works (indicative)</td><td class="r">{eur(p["grid_works"])}</td></tr>' if p['grid_works'] else ''}
          <tr class="total"><td><strong>Total equity required</strong></td><td class="r"><strong>{eur(c['total_capex'])}</strong></td></tr>
        </tbody>
      </table>

      <br>
      <h2>Y1 P&amp;L</h2>
      <table>
        <thead><tr><th>Item</th><th class="r">EUR</th></tr></thead>
        <tbody>
          <tr><td>Gross revenue</td><td class="r">{eur(c['gross_rev'])}</td></tr>
          <tr><td>Aggregator fee (10%)</td><td class="r">&minus;{eur(c['aggregator'])}</td></tr>
          <tr><td>OPEX (O&amp;M, LTSA, land, insurance)</td><td class="r">&minus;{eur(c['opex'])}</td></tr>
          <tr class="sub-row"><td>EBITDA</td><td class="r">{eur(c['ebitda'])}</td></tr>
          <tr><td>D&amp;A (tax shield)</td><td class="r">&minus;{eur(c['da_total'])}</td></tr>
          <tr><td>Cyprus CIT @ 15%</td><td class="r">&minus;{eur(c['tax'])}</td></tr>
          <tr class="total"><td><strong>Free cash flow Y1</strong></td><td class="r"><strong>{eur(c['fcf_y1'])}</strong></td></tr>
          <tr class="warn-row"><td colspan="2">{ext_war_note} (Yr 11-15: +{eur(round(p['bess_mwh']*EXT_WAR_11_15_MWH))}/yr)</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2>Revenue model</h2>
      <table>
        <thead><tr><th>Source</th><th class="r">MWh/yr</th><th class="r">&euro;/MWh</th><th class="r">Y1</th></tr></thead>
        <tbody>
          <tr><td>Solar (uncurtailed 50%)</td><td class="r">{c['uncurtailed']:,}</td><td class="r">141</td><td class="r">{eur(c['solar_rev'])}</td></tr>
          <tr><td>BESS (evening peak 17&ndash;21h)</td><td class="r">{c['bess_out']:,}</td><td class="r">195</td><td class="r">{eur(c['bess_rev'])}</td></tr>
          <tr class="total"><td><strong>Total Y1</strong></td><td class="r"><strong>{c['uncurtailed']+c['bess_out']:,}</strong></td><td class="r">&mdash;</td><td class="r"><strong>{eur(c['gross_rev'])}</strong></td></tr>
        </tbody>
      </table>
      <p style="font-size:6pt;color:#64748B;margin-top:3px">50% curtailment · 87.4% BESS capture · 86.32% RTE · &euro;195/MWh discharge (conservative; Apr 2026 &gt;&euro;340 observed)</p>

      <br>
      <h2>OPEX breakdown (Y1)</h2>
      <table>
        <thead><tr><th>Item</th><th class="r">&euro;/yr</th></tr></thead>
        <tbody>
          <tr><td>PV O&amp;M (&euro;{p.get('pv_om_per_mwp', PV_OM_PER_MWP) // 1000}k/MWp)</td><td class="r">{eur(c['pv_om'])}</td></tr>
          <tr><td>BESS LTSA Tier C (&euro;1,740/MWh)</td><td class="r">{eur(c['bess_ltsa'])}</td></tr>
          <tr><td>SCADA / EMS</td><td class="r">{eur(SCADA_PA)}</td></tr>
          <tr><td>Land lease</td><td class="r">{eur(c['land']) if c['land'] else '&mdash; (freehold)'}</td></tr>
          <tr><td>Insurance (0.5% CAPEX)</td><td class="r">{eur(c['insurance'])}</td></tr>
          <tr><td>Admin / monitoring</td><td class="r">{eur(10_000)}</td></tr>
          <tr class="total"><td><strong>Total OPEX Y1</strong></td><td class="r"><strong>{eur(c['opex'])}</strong></td></tr>
        </tbody>
      </table>

      <br>
      <h2>Project highlights</h2>
      <ul class="bullets">
        <li>{p['permits']}</li>
        <li>BESS: {p['bess_mw']} MW / {p['bess_mwh']} MWh &mdash; 4-hour duration</li>
        <li>PV yield: {p.get('yield_note', '1,700 kWh/kWp (bifacial, fixed tilt)')}</li>
        <li>Lighthief Cyprus as EPC contractor (upon NDA)</li>
        <li>{p['timeline']}</li>
      </ul>

      <div class="contact">
        <strong>{CONTACT['director']}</strong> &mdash; {CONTACT['title']}<br>
        {CONTACT['phone']} &middot; {CONTACT['email']} &middot; {CONTACT['website']}
      </div>
    </div>
  </div>

  <p class="note">
    {p['note']}<br>
    Non-binding indicative summary. Revenue modelled on TSOC DAM (Oct 2025&ndash;Feb 2026) and Galascope 2025 actual curtailment data. BESS O&M: LTSA Tier C &euro;1,740/MWh/yr (Lighthief) + Linyang extended warranty from Yr 6 (paid direct). All figures ex VAT. Full dataroom and model available under NDA.
    {CONTACT['company']} ({CONTACT['reg']}) &middot; {CONTACT['address']}
  </p>

  <div class="footer">
    {CONTACT['company']} ({CONTACT['reg']}) &middot; {CONTACT['website']} &middot; {p['ref']} &middot; CONFIDENTIAL &mdash; NOT FOR DISTRIBUTION
  </div>

</div>
</body>
</html>"""


# ── Writer ────────────────────────────────────────────────────────────────────

def write_park(p):
    c = calc(p)
    html = render(p, c)
    slug = p["slug"]

    out_public = _root / f"public/lighthief-cyprus/teasers/{slug}"
    out_docs   = _root / "docs/teasers"
    out_public.mkdir(parents=True, exist_ok=True)
    out_docs.mkdir(parents=True, exist_ok=True)

    fname = f"{slug}-investor.html"
    (out_public / fname).write_text(html)
    (out_docs   / fname).write_text(html)

    print(f"  OK {p['ref']}  |  {p['solar_mwp']} MWp + {p['bess_mwh']} MWh  |  "
          f"CAPEX {eur(c['total_capex'])}  |  Y1 FCF {eur(c['fcf_y1'])}  |  "
          f"Yield {c['cash_yield']*100:.1f}%  |  Payback {c['payback']}yr")


def main():
    print(f"\nLighthief Investor One-Pager Generator — May 2026")
    print(f"Realistic model: €195 discharge · 87.4% capture · 86.32% RTE · 50% curtailment")
    print(f"BESS O&M: LTSA Tier C €1,740/MWh/yr + SCADA €5k | PV EPC €720k/MWp | BESS EPC €125k/MWh\n")
    for p in PARKS:
        write_park(p)
    print(f"\nDone — {len(PARKS)} one-pagers written to:")
    print(f"  public/lighthief-cyprus/teasers/{{slug}}/{{slug}}-investor.html")
    print(f"  docs/teasers/{{slug}}-investor.html\n")


if __name__ == "__main__":
    main()
