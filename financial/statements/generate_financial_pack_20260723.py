"""Generate Lighthief Cyprus management financial pack from BOC master + accrual CSVs."""
from __future__ import annotations

import csv
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

DIR = Path(__file__).parent
OUT_HTML = DIR / "financial-pack-management-20260723.html"
OUT_MD = DIR / "financial-pack-management-20260723.md"
SRC_12M = DIR / "TransactionHistory_12m_20260723.csv"
ACCRUAL_2025 = Path(
    r"c:\Users\alexa\code\solinvest\lighthief-cyprus\cashflow\Lighthief Cashflow 2025 - Accural 2025.csv"
)
ACCRUAL_2026 = Path(
    r"c:\Users\alexa\code\solinvest\financial\Lighthief Cashflow  - Accural 2026.csv"
)

# Accrual sheet figures (US-format € in source CSVs — verified manually)
ACCRUAL = {
    2025: {
        "revenue": 218_183.00,
        "commissions": 17_746.39,
        "subcontractors": 147_789.00,
        "advertising": 16_500.00,
        "accountant": 1_200.00,
        "cars": 1_000.00,
        "travel": 2_400.00,
        "payroll_gross": 12_000 + 7_100 + 2_000 + 2_000 + 1_400,  # Alex+Anasta+Tatiana+Chris+Novia
        "social": 9_885.65,
        "meta_ads_mgr": 2_820.30 + 2_757.15,
        "total_expenses": 226_598.49,
        "gross_margin": -8_415.49,
        "net_margin": -7_071.84,
        "vat": 9_555.86,
        "note": "Accrual Jul–Dec 2025 (trading started Aug 2025). Source: Lighthief Cashflow 2025 Accrual CSV.",
    },
    2026: {
        "system_sales": 2_291_564.00,
        "bess_sales": 357_000.00,
        "bess_om": 45_000.00,
        "revenue": 2_291_564.00,  # Total Income line in sheet (system-heavy; BESS lines separate memo)
        "total_expenses": 2_220_042.22,
        "gross_margin": 71_521.78,
        "net_margin": 60_102.34,
        "vat": 43_436.17,
        "note": "Full-year 2026 BUDGET/forecast accrual — not YTD actual. Includes large Jun/Jul BESS pipeline months. Bess Sales €357k and Bess OM €45k are memo lines on the sheet.",
    },
}


def parse_boc(s: str) -> float:
    if not s or not str(s).strip():
        return 0.0
    s = str(s).strip().strip('"')
    if re.search(r",\d{1,2}$", s):
        return float(s.replace(".", "").replace(",", "."))
    try:
        return float(s.replace(",", ""))
    except ValueError:
        return 0.0


def eur(n: float) -> str:
    neg = n < 0
    n = abs(n)
    s = f"{n:,.2f}"
    return f"(€{s})" if neg else f"€{s}"


def load_boc(path: Path):
    rows = []
    with open(path, encoding="utf-8", errors="replace") as f:
        for r in csv.reader(f):
            if len(r) < 7 or not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
                continue
            dt = datetime.strptime(r[0].strip(), "%d/%m/%Y")
            rows.append(
                {
                    "date": dt,
                    "ym": dt.strftime("%Y-%m"),
                    "y": dt.year,
                    "desc": r[1],
                    "type": r[2],
                    "debit": parse_boc(r[4]),
                    "credit": parse_boc(r[5]),
                    "bal": parse_boc(r[6]),
                }
            )
    return rows


def cat_in(r):
    d = r["desc"].upper()
    t = r["type"].upper()
    if r["credit"] <= 0:
        return None
    if "SHAREHOLDER" in d and "LOAN" in d:
        return "shareholder_loan"
    if "ATM CASH DEPOSIT" in t or "CASH DEPOSIT" in d:
        return "cash_deposit"
    return "client_receipt"


def cat_out(r):
    d = r["desc"].upper()
    t = r["type"].upper()
    if r["debit"] <= 0:
        return None
    if "TRIKKIS" in d or "SAL00" in d or "DAS PINAK" in d:
        return "cogs_trikkis"
    if "REVOLUT" in d and "PURCHASE" in t:
        return "revolut_loan_return"
    if any(
        x in d
        for x in [
            "SALARY",
            "SALLARY",
            "ZINO",
            "COSTAS",
            "CHIAT",
            "JIHA",
            "CHILAT",
            "ANDREAS CHRIST",
            "PENDING COM",
            "ALEX BASE",
            "ALEX MAY",
            "ALEX NOV",
            "ALEX COM",
            "SALES COMISSION",
            "SALSS COMISSION",
        ]
    ):
        return "payroll"
    if "FACEBK" in d or "GOOGLE ADS" in d:
        return "marketing"
    if any(x in d for x in ["CURSOR", "INTUIT", "OPENAI", "CANVA", "ADOBE", "QBOOKS"]):
        return "software"
    if "COMMISSION" in t or "MEMBERSHIP FEE" in d:
        return "bank_fees"
    if "ATM CASH WITHDRAWAL" in t:
        return "atm_cash"
    if "SOCIAL" in d or "GRSI" in d:
        return "social_insurance"
    if any(
        x in d
        for x in ["7SUN", "GALASCOPE", "S.M.T", "ZAMPUS", "BIG SOLAR", "SONOUPO"]
    ):
        return "suppliers_other"
    if any(x in d for x in ["KAFKAS", "MPAKAS", "MANGAS", "IKEA"]):
        return "materials_site"
    if "ESSO" in d or "CORAL" in d:
        return "fuel"
    if "PURCHASE" in t:
        return "card_misc"
    return "transfers_other"


OUT_LABELS = {
    "cogs_trikkis": "COGS — Trikkis / kit",
    "payroll": "Payroll & commissions",
    "social_insurance": "Social insurance",
    "marketing": "Marketing (Meta/Google)",
    "software": "Software / SaaS",
    "materials_site": "Materials / site (Kafkas etc.)",
    "suppliers_other": "Other suppliers (7Sun, Galascope, etc.)",
    "fuel": "Fuel",
    "card_misc": "Card purchases (misc)",
    "atm_cash": "ATM cash",
    "bank_fees": "Bank fees",
    "revolut_loan_return": "Revolut top-ups (SH loan drawdown)",
    "transfers_other": "Other transfers (uncategorised)",
}


def build():
    rows = load_boc(SRC_12M)
    latest_bal = rows[0]["bal"]
    latest_date = rows[0]["date"]
    rows_s = sorted(rows, key=lambda x: x["date"])
    first = rows_s[0]
    opening = round(first["bal"] - first["credit"] + first["debit"], 2)
    ye2025 = [r for r in rows_s if r["date"].year == 2025][-1]["bal"]

    by_y: dict[int, dict[str, float]] = defaultdict(lambda: defaultdict(float))
    by_ym: dict[str, dict[str, float]] = defaultdict(lambda: defaultdict(float))
    sh_loans = []

    for r in rows:
        if r["credit"] > 0:
            c = cat_in(r)
            by_y[r["y"]][c] += r["credit"]
            by_y[r["y"]]["total_in"] += r["credit"]
            by_ym[r["ym"]][c] += r["credit"]
            by_ym[r["ym"]]["total_in"] += r["credit"]
            if c == "shareholder_loan":
                sh_loans.append((r["date"], r["credit"], r["desc"]))
        if r["debit"] > 0:
            c = cat_out(r)
            by_y[r["y"]][c] += r["debit"]
            by_y[r["y"]]["total_out"] += r["debit"]
            by_ym[r["ym"]][c] += r["debit"]
            by_ym[r["ym"]]["total_out"] += r["debit"]

    sh_loans.sort(key=lambda x: x[0])
    sh_tot = sum(a for _, a, _ in sh_loans)
    rev_ret = by_y[2025]["revolut_loan_return"] + by_y[2026]["revolut_loan_return"]
    sh_out = sh_tot - rev_ret

    def cash_pnl(year: int):
        d = by_y[year]
        ops_in = d["client_receipt"] + d["cash_deposit"]
        # Operating outflows exclude SH loan drawdowns (financing)
        op_keys = [k for k in OUT_LABELS if k != "revolut_loan_return"]
        ops_out = sum(d[k] for k in op_keys)
        net_ops = ops_in - ops_out
        return {
            "client_receipt": d["client_receipt"],
            "cash_deposit": d["cash_deposit"],
            "ops_in": ops_in,
            "ops_out": ops_out,
            "net_ops": net_ops,
            "sh_loan_in": d["shareholder_loan"],
            "sh_draw": d["revolut_loan_return"],
            "total_in": d["total_in"],
            "total_out": d["total_out"],
            "net_cash": d["total_in"] - d["total_out"],
            "detail": {k: d[k] for k in OUT_LABELS if d[k] > 0},
        }

    pnl25 = cash_pnl(2025)
    pnl26 = cash_pnl(2026)

    # Simplified BS proxy at 22 Jul 2026
    # Assets: cash BOC only (Revolut unknown)
    # Liabilities: SH loan outstanding
    # Equity plug
    cash = latest_bal
    liab = sh_out
    equity_plug = cash - liab  # will be largely negative — typical early stage + loan funded

    gen = datetime.now().strftime("%d %B %Y")
    period = f"{rows_s[0]['date'].strftime('%d %b %Y')} – {latest_date.strftime('%d %b %Y')}"

    # --- HTML ---
    def rows_out_html(detail: dict) -> str:
        lines = []
        for k, label in OUT_LABELS.items():
            if detail.get(k, 0) > 0:
                lines.append(
                    f"<tr><td>{label}</td><td class='num'>{eur(detail[k])}</td></tr>"
                )
        return "\n".join(lines)

    def monthly_html() -> str:
        lines = []
        for ym in sorted(by_ym.keys()):
            m = by_ym[ym]
            net = m["total_in"] - m["total_out"]
            cls = "pos" if net >= 0 else "neg"
            lines.append(
                f"<tr><td>{ym}</td>"
                f"<td class='num'>{eur(m.get('client_receipt',0))}</td>"
                f"<td class='num'>{eur(m.get('shareholder_loan',0))}</td>"
                f"<td class='num'>{eur(m['total_in'])}</td>"
                f"<td class='num'>{eur(m['total_out'])}</td>"
                f"<td class='num {cls}'>{eur(net)}</td></tr>"
            )
        return "\n".join(lines)

    def sh_html() -> str:
        lines = []
        for dt, amt, desc in sh_loans:
            lines.append(
                f"<tr><td>{dt.strftime('%d %b %Y')}</td><td class='num'>{eur(amt)}</td>"
                f"<td>{desc[:90]}</td></tr>"
            )
        return "\n".join(lines)

    a25, a26 = ACCRUAL[2025], ACCRUAL[2026]

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lighthief Cyprus Ltd — Management Financial Pack | 23 Jul 2026</title>
<style>
:root {{
  --primary: #1A365D;
  --primary-light: #2B5FA0;
  --accent: #C9A432;
  --accent-dark: #9C7D22;
  --white: #FFFFFF;
  --grey-text: #404040;
  --body-bg: #F0F4F8;
  --border: #D0D8E0;
  --green: #166534;
  --red: #991B1B;
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--body-bg);
  color: #000;
  font-size: 13px;
  line-height: 1.5;
}}
.wrap {{ max-width: 980px; margin: 0 auto; padding: 24px 16px 64px; }}
.header {{
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  padding: 28px 32px;
  border-radius: 8px 8px 0 0;
}}
.header h1 {{ color: var(--accent); font-size: 1.55rem; margin-bottom: 4px; }}
.header .sub {{ color: rgba(255,255,255,.85); font-size: .92rem; }}
.header .meta {{ margin-top: 14px; font-size: .8rem; color: rgba(255,255,255,.7); }}
.badge {{
  display: inline-block; background: rgba(201,164,50,.25); color: var(--accent);
  border: 1px solid var(--accent); padding: 2px 10px; border-radius: 4px;
  font-size: .7rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
  margin-bottom: 10px;
}}
.card {{
  background: #fff; border: 1px solid var(--border); border-top: none;
  padding: 28px 32px;
}}
.card + .card {{ border-top: 1px solid var(--border); margin-top: 0; }}
h2 {{ color: var(--accent); font-size: 1.15rem; margin: 0 0 8px; }}
h3 {{ color: var(--primary); font-size: .98rem; margin: 20px 0 8px; }}
p.desc {{ color: var(--grey-text); margin-bottom: 16px; }}
.kpis {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin: 18px 0; }}
.kpi {{ background: var(--body-bg); border: 1px solid var(--border); padding: 14px 16px; border-radius: 6px; }}
.kpi .l {{ font-size: .68rem; text-transform: uppercase; letter-spacing: .04em; color: var(--grey-text); }}
.kpi .v {{ font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-top: 2px; }}
.kpi .v.gold {{ color: var(--accent-dark); }}
.kpi .v.neg {{ color: var(--red); }}
.kpi .v.pos {{ color: var(--green); }}
table {{ width: 100%; border-collapse: collapse; margin: 10px 0 18px; }}
th {{ background: var(--primary); color: #fff; text-align: left; padding: 8px 10px; font-size: .72rem; text-transform: uppercase; letter-spacing: .03em; }}
td {{ padding: 7px 10px; border-bottom: 1px solid var(--border); }}
td.num {{ text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }}
td.num.pos {{ color: var(--green); font-weight: 600; }}
td.num.neg {{ color: var(--red); font-weight: 600; }}
tr.total td {{ font-weight: 700; background: #EEF2F7; border-top: 2px solid var(--primary); }}
tr.section td {{ background: #F7F9FC; font-weight: 600; color: var(--primary); }}
.warn {{
  background: #FFF8E7; border-left: 4px solid var(--accent); padding: 12px 14px;
  margin: 14px 0; color: var(--grey-text); font-size: .88rem;
}}
.gap {{
  background: #FEF2F2; border-left: 4px solid var(--red); padding: 12px 14px;
  margin: 14px 0; color: var(--grey-text); font-size: .88rem;
}}
.ok {{
  background: #F0FDF4; border-left: 4px solid var(--green); padding: 12px 14px;
  margin: 14px 0; color: var(--grey-text); font-size: .88rem;
}}
ul {{ margin: 8px 0 12px 18px; color: var(--grey-text); }}
li {{ margin-bottom: 4px; }}
.footer {{
  background: var(--primary); color: rgba(255,255,255,.75); padding: 16px 32px;
  border-radius: 0 0 8px 8px; font-size: .75rem;
}}
.footer strong {{ color: var(--accent); }}
@media print {{
  body {{ background: #fff; }}
  .wrap {{ max-width: 100%; padding: 0; }}
  .card {{ break-inside: avoid; }}
}}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="badge">Management pack · Not audited</div>
    <h1>Lighthief Cyprus Ltd — Financial Information Pack</h1>
    <div class="sub">Trial Balance / Balance Sheet / P&amp;L proxies · Bank accounts &amp; loans · Response pack for information request</div>
    <div class="meta">Generated {gen} · Bank source: BOC a/c 357044102353 · Period {period} · Ref: LH-FIN-PACK-20260723</div>
  </div>

  <div class="card">
    <h2>0. Cover note — scope &amp; limitations</h2>
    <p class="desc">Lighthief Cyprus Ltd was incorporated in Cyprus on <strong>1 July 2025</strong> (HE 477423). No audited financial statements exist yet. This pack is prepared from Bank of Cyprus transaction history and internal accrual cashflow worksheets.</p>
    <div class="ok"><strong>Included from bank / management books:</strong> Cash-basis P&amp;L 2025 &amp; 2026 YTD · Accrual management P&amp;L · Simplified balance-sheet proxy · Active bank accounts · Shareholder loans schedule</div>
    <div class="gap"><strong>Not available in company systems (require accountant / TFA portal / QuickBooks export):</strong>
      <ul>
        <li>Formal Trial Balance / Chart of Accounts export</li>
        <li>Statutory Balance Sheet &amp; Profit &amp; Loss (audited or accountant-signed)</li>
        <li>Confirmation that Temporary Tax assessments for 2025 were submitted and paid</li>
        <li>Latest filed VAT return PDF (Q3 2025 pack exists on Drive; later quarters need confirmation)</li>
      </ul>
    </div>
    <div class="kpis">
      <div class="kpi"><div class="l">BOC balance</div><div class="v gold">{eur(latest_bal)}</div><div class="l">{latest_date.strftime('%d %b %Y')}</div></div>
      <div class="kpi"><div class="l">2025 client receipts (cash)</div><div class="v">{eur(pnl25['client_receipt'])}</div></div>
      <div class="kpi"><div class="l">2026 YTD client receipts</div><div class="v">{eur(pnl26['client_receipt'])}</div></div>
      <div class="kpi"><div class="l">SH loans outstanding</div><div class="v">{eur(sh_out)}</div></div>
    </div>
  </div>

  <div class="card">
    <h2>1. Profit &amp; Loss — Cash basis (Bank of Cyprus)</h2>
    <p class="desc">Derived from BOC statement {period}. Operating inflows = client receipts + cash deposits. Shareholder loans and Revolut top-ups treated as financing, not trading profit.</p>

    <h3>1.1 Financial year 2025 (22 Aug – 31 Dec)</h3>
    <table>
      <thead><tr><th>Item</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr class="section"><td colspan="2">Operating income</td></tr>
        <tr><td>Client receipts</td><td class="num">{eur(pnl25['client_receipt'])}</td></tr>
        <tr><td>Cash deposits</td><td class="num">{eur(pnl25['cash_deposit'])}</td></tr>
        <tr class="total"><td>Total operating inflows</td><td class="num">{eur(pnl25['ops_in'])}</td></tr>
        <tr class="section"><td colspan="2">Operating outflows</td></tr>
        {rows_out_html({k:v for k,v in pnl25['detail'].items() if k != 'revolut_loan_return'})}
        <tr class="total"><td>Total operating outflows</td><td class="num">{eur(pnl25['ops_out'])}</td></tr>
        <tr class="total"><td>Net operating cash</td><td class="num {'pos' if pnl25['net_ops']>=0 else 'neg'}">{eur(pnl25['net_ops'])}</td></tr>
        <tr class="section"><td colspan="2">Financing</td></tr>
        <tr><td>Shareholder loans received</td><td class="num">{eur(pnl25['sh_loan_in'])}</td></tr>
        <tr><td>Revolut top-ups (loan drawdown)</td><td class="num neg">{eur(-pnl25['sh_draw'])}</td></tr>
        <tr class="total"><td>Net bank cash movement (all)</td><td class="num {'pos' if pnl25['net_cash']>=0 else 'neg'}">{eur(pnl25['net_cash'])}</td></tr>
      </tbody>
    </table>

    <h3>1.2 Financial year 2026 YTD (1 Jan – 22 Jul)</h3>
    <table>
      <thead><tr><th>Item</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr class="section"><td colspan="2">Operating income</td></tr>
        <tr><td>Client receipts</td><td class="num">{eur(pnl26['client_receipt'])}</td></tr>
        <tr><td>Cash deposits</td><td class="num">{eur(pnl26['cash_deposit'])}</td></tr>
        <tr class="total"><td>Total operating inflows</td><td class="num">{eur(pnl26['ops_in'])}</td></tr>
        <tr class="section"><td colspan="2">Operating outflows</td></tr>
        {rows_out_html({k:v for k,v in pnl26['detail'].items() if k != 'revolut_loan_return'})}
        <tr class="total"><td>Total operating outflows</td><td class="num">{eur(pnl26['ops_out'])}</td></tr>
        <tr class="total"><td>Net operating cash</td><td class="num {'pos' if pnl26['net_ops']>=0 else 'neg'}">{eur(pnl26['net_ops'])}</td></tr>
        <tr class="section"><td colspan="2">Financing</td></tr>
        <tr><td>Shareholder loans received</td><td class="num">{eur(pnl26['sh_loan_in'])}</td></tr>
        <tr><td>Revolut top-ups (loan drawdown)</td><td class="num neg">{eur(-pnl26['sh_draw'])}</td></tr>
        <tr class="total"><td>Net bank cash movement (all)</td><td class="num {'pos' if pnl26['net_cash']>=0 else 'neg'}">{eur(pnl26['net_cash'])}</td></tr>
      </tbody>
    </table>
    <div class="warn">2026 figures are <strong>year-to-date through 22 July</strong>, not full-year. Revolut account activity outside BOC card top-ups is not included.</div>
  </div>

  <div class="card">
    <h2>2. Profit &amp; Loss — Accrual management (internal worksheets)</h2>
    <p class="desc">From Lighthief Cashflow Accrual CSVs. Useful as management P&amp;L; <strong>not</strong> a statutory income statement.</p>

    <h3>2.1 FY 2025 accrual</h3>
    <table>
      <thead><tr><th>Item</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr><td>System sales (billed)</td><td class="num">{eur(a25['revenue'])}</td></tr>
        <tr><td>Subcontractors (Trikkis etc.)</td><td class="num">{eur(a25['subcontractors'])}</td></tr>
        <tr><td>Sales commissions</td><td class="num">{eur(a25['commissions'])}</td></tr>
        <tr><td>Advertising</td><td class="num">{eur(a25['advertising'])}</td></tr>
        <tr><td>Payroll + social (sheet)</td><td class="num">{eur(a25['payroll_gross'] + a25['social'])}</td></tr>
        <tr><td>Other opex (cars, travel, accountant, Meta mgr)</td><td class="num">{eur(a25['cars']+a25['travel']+a25['accountant']+a25['meta_ads_mgr'])}</td></tr>
        <tr class="total"><td>Total expenses</td><td class="num">{eur(a25['total_expenses'])}</td></tr>
        <tr class="total"><td>Gross margin (sheet)</td><td class="num neg">{eur(a25['gross_margin'])}</td></tr>
        <tr class="total"><td>Net margin (sheet)</td><td class="num neg">{eur(a25['net_margin'])}</td></tr>
        <tr><td>VAT (sheet)</td><td class="num">{eur(a25['vat'])}</td></tr>
      </tbody>
    </table>
    <p class="desc">{a25['note']}</p>

    <h3>2.2 FY 2026 accrual budget / forecast</h3>
    <table>
      <thead><tr><th>Item</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr><td>Total income (sheet — primarily system/BESS pipeline)</td><td class="num">{eur(a26['revenue'])}</td></tr>
        <tr><td>Bess sales (memo)</td><td class="num">{eur(a26['bess_sales'])}</td></tr>
        <tr><td>Bess O&amp;M (memo)</td><td class="num">{eur(a26['bess_om'])}</td></tr>
        <tr class="total"><td>Total expenses</td><td class="num">{eur(a26['total_expenses'])}</td></tr>
        <tr class="total"><td>Gross margin</td><td class="num pos">{eur(a26['gross_margin'])}</td></tr>
        <tr class="total"><td>Net margin</td><td class="num pos">{eur(a26['net_margin'])}</td></tr>
        <tr><td>VAT (sheet)</td><td class="num">{eur(a26['vat'])}</td></tr>
      </tbody>
    </table>
    <div class="warn">{a26['note']}</div>
  </div>

  <div class="card">
    <h2>3. Balance Sheet proxy (management)</h2>
    <p class="desc">Simplified position from known cash and labelled shareholder loans. <strong>Not a statutory balance sheet</strong> — excludes receivables, payables, inventory, fixed assets, VAT debtor/creditor, Revolut cash, and unpaid Trikkis balances.</p>
    <table>
      <thead><tr><th>As at {latest_date.strftime('%d %B %Y')}</th><th style="text-align:right">EUR</th></tr></thead>
      <tbody>
        <tr class="section"><td colspan="2">Assets</td></tr>
        <tr><td>Cash at bank — Bank of Cyprus 357044102353</td><td class="num">{eur(cash)}</td></tr>
        <tr><td>Cash — Revolut (not in this export)</td><td class="num">TBC</td></tr>
        <tr><td>Trade receivables / other assets</td><td class="num">TBC (accountant)</td></tr>
        <tr class="total"><td>Total assets (known cash only)</td><td class="num">{eur(cash)}</td></tr>
        <tr class="section"><td colspan="2">Liabilities</td></tr>
        <tr><td>Shareholder loans (Arkadiusz Sybaris) — outstanding</td><td class="num">{eur(liab)}</td></tr>
        <tr><td>Bank loans / overdrafts</td><td class="num">{eur(0)}</td></tr>
        <tr><td>Trade payables / VAT / tax</td><td class="num">TBC (accountant)</td></tr>
        <tr class="total"><td>Total liabilities (known loans only)</td><td class="num">{eur(liab)}</td></tr>
        <tr class="section"><td colspan="2">Equity (plug)</td></tr>
        <tr><td>Net assets known cash − known SH loans</td><td class="num neg">{eur(equity_plug)}</td></tr>
      </tbody>
    </table>
    <div class="warn">Opening cash at first BOC activity ≈ {eur(opening)}. Year-end 2025 BOC balance ≈ {eur(ye2025)}.</div>
  </div>

  <div class="card">
    <h2>4. Trial Balance</h2>
    <div class="gap">No Chart of Accounts / Trial Balance export is available in company repositories. QuickBooks Online is in use (card charges visible on BOC). Please request TB as at 31 Dec 2025 and as at latest month-end from the chartered accountant / QuickBooks administrator.</div>
  </div>

  <div class="card">
    <h2>5. Temporary Tax assessments 2025</h2>
    <div class="gap"><strong>Status: not confirmed from available records.</strong> No Temporary Tax (προσωρινή φορολογία) assessment or payment receipt for 2025 was found in the solinvest workspace or indexed Drive accounting folders. Confirm with the Cyprus chartered accountant / TFA portal whether assessments were filed and paid for the 2025 stub year (incorporation 1 Jul 2025).</div>
  </div>

  <div class="card">
    <h2>6. VAT returns &amp; payments</h2>
    <p class="desc">Company is VAT-registered. Evidence on Google Drive <code>Lighthief Cyprus\\ACCOUNTING\\VAT\\</code>:</p>
    <table>
      <thead><tr><th>Period</th><th>Return PDF</th><th>Payment evidence</th></tr></thead>
      <tbody>
        <tr><td>Jul–Sep 2025 (Q3)</td><td>VAT JUL AUG SEP 2025.pdf — filed pack</td><td>VAT Payment.pdf</td></tr>
        <tr><td>Oct–Dec 2025 (Q4)</td><td>Supporting docs; full return PDF TBC</td><td>Payment receipt Feb 2026</td></tr>
        <tr><td>Jan–Mar 2026 (Q1)</td><td>Supporting docs; full return PDF TBC</td><td>Payment receipt May 2026</td></tr>
        <tr><td>Apr–Jun 2026 (Q2)</td><td>Supporting invoices/statements</td><td>TBC</td></tr>
      </tbody>
    </table>
    <div class="warn">Accrual sheet VAT markers: 2025 ≈ {eur(a25['vat'])} · 2026 budget ≈ {eur(a26['vat'])}. These are worksheet estimates, not filed amounts.</div>
  </div>

  <div class="card">
    <h2>7. Active bank accounts &amp; loans</h2>
    <h3>7.1 Bank accounts</h3>
    <table>
      <thead><tr><th>Institution</th><th>Account</th><th>Currency</th><th>Status / balance</th></tr></thead>
      <tbody>
        <tr><td>Bank of Cyprus</td><td>357044102353 (current)</td><td>EUR</td><td>Active — {eur(latest_bal)} as at {latest_date.strftime('%d %b %Y')}</td></tr>
        <tr><td>Revolut Business</td><td>IBAN on file (confirmation PDF in Drive SALES)</td><td>EUR</td><td>Active — balance not in this BOC export</td></tr>
      </tbody>
    </table>

    <h3>7.2 Loans</h3>
    <table>
      <thead><tr><th>Type</th><th>Lender</th><th>Drawn (labelled)</th><th>Drawdowns (Revolut)</th><th>Outstanding (est.)</th></tr></thead>
      <tbody>
        <tr><td>Shareholder loan</td><td>Arkadiusz Sybaris</td><td class="num">{eur(sh_tot)}</td><td class="num">{eur(rev_ret)}</td><td class="num">{eur(sh_out)}</td></tr>
        <tr><td>Bank loan / facility</td><td>—</td><td class="num">{eur(0)}</td><td class="num">—</td><td class="num">{eur(0)}</td></tr>
        <tr class="total"><td colspan="4">Total interest-bearing bank debt</td><td class="num">{eur(0)}</td></tr>
      </tbody>
    </table>

    <h3>7.3 Shareholder loan drawdowns (labelled)</h3>
    <table>
      <thead><tr><th>Date</th><th style="text-align:right">Amount</th><th>Narrative</th></tr></thead>
      <tbody>
        {sh_html()}
        <tr class="total"><td>Total</td><td class="num">{eur(sh_tot)}</td><td></td></tr>
      </tbody>
    </table>
    <div class="ok">No Bank of Cyprus loan, overdraft facility, or external bank borrowing appears in the 12-month statement.</div>
  </div>

  <div class="card">
    <h2>8. Monthly cash summary (BOC)</h2>
    <table>
      <thead>
        <tr>
          <th>Month</th><th style="text-align:right">Client IN</th>
          <th style="text-align:right">SH loan IN</th>
          <th style="text-align:right">Total IN</th>
          <th style="text-align:right">Total OUT</th>
          <th style="text-align:right">Net</th>
        </tr>
      </thead>
      <tbody>
        {monthly_html()}
      </tbody>
    </table>
  </div>

  <div class="card">
    <h2>9. Source files</h2>
    <ul>
      <li><code>financial/statements/TransactionHistory_12m_20260723.csv</code> — BOC 12-month export</li>
      <li><code>financial/statements/TransactionHistory_master_boc.csv</code> — deduped master</li>
      <li><code>financial/statements/bank-validation-20260723.md</code> — validation vs Apr report</li>
      <li><code>lighthief-cyprus/cashflow/Lighthief Cashflow 2025 - Accural 2025.csv</code></li>
      <li><code>financial/Lighthief Cashflow  - Accural 2026.csv</code></li>
    </ul>
  </div>

  <div class="footer">
    <strong>Lighthief Cyprus Ltd</strong> · HE 477423 · solarfarms.cy<br>
    28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus<br>
    office@lighthief.com · +357 77 77 00 50 · Cyprus Director: Alexander Papacosta +357 99 164 158<br>
    This document is a management information pack and does not constitute audited financial statements.
  </div>
</div>
</body>
</html>
"""

    OUT_HTML.write_text(html, encoding="utf-8")

    # --- Markdown ---
    md_lines = [
        "# Lighthief Cyprus Ltd — Management Financial Pack",
        f"**Generated:** {gen} · **Ref:** LH-FIN-PACK-20260723  ",
        f"**Bank period:** {period} · BOC a/c **357044102353**  ",
        f"**Latest BOC balance:** {eur(latest_bal)} ({latest_date.strftime('%d %b %Y')})",
        "",
        "> Management pack — **not audited**. Formal TB / statutory BS / Temporary Tax confirmation require accountant.",
        "",
        "## 1. Cash P&L (BOC)",
        "",
        "### 2025 (22 Aug – 31 Dec)",
        f"| Item | Amount |",
        f"|------|--------|",
        f"| Client receipts | {eur(pnl25['client_receipt'])} |",
        f"| Cash deposits | {eur(pnl25['cash_deposit'])} |",
        f"| Operating inflows | {eur(pnl25['ops_in'])} |",
        f"| Operating outflows | {eur(pnl25['ops_out'])} |",
        f"| **Net operating cash** | **{eur(pnl25['net_ops'])}** |",
        f"| Shareholder loans in | {eur(pnl25['sh_loan_in'])} |",
        f"| Revolut drawdowns | {eur(pnl25['sh_draw'])} |",
        "",
        "### 2026 YTD (1 Jan – 22 Jul)",
        f"| Item | Amount |",
        f"|------|--------|",
        f"| Client receipts | {eur(pnl26['client_receipt'])} |",
        f"| Cash deposits | {eur(pnl26['cash_deposit'])} |",
        f"| Operating inflows | {eur(pnl26['ops_in'])} |",
        f"| Operating outflows | {eur(pnl26['ops_out'])} |",
        f"| **Net operating cash** | **{eur(pnl26['net_ops'])}** |",
        f"| Shareholder loans in | {eur(pnl26['sh_loan_in'])} |",
        f"| Revolut drawdowns | {eur(pnl26['sh_draw'])} |",
        "",
        "## 2. Accrual management P&L",
        "",
        f"| | 2025 actual (accrual) | 2026 budget |",
        f"|--|--:|--:|",
        f"| Revenue / Total income | {eur(a25['revenue'])} | {eur(a26['revenue'])} |",
        f"| Total expenses | {eur(a25['total_expenses'])} | {eur(a26['total_expenses'])} |",
        f"| Net margin | {eur(a25['net_margin'])} | {eur(a26['net_margin'])} |",
        f"| VAT (sheet) | {eur(a25['vat'])} | {eur(a26['vat'])} |",
        "",
        "## 3. Balance sheet proxy (22 Jul 2026)",
        "",
        f"| | EUR |",
        f"|--|--:|",
        f"| Cash BOC | {eur(cash)} |",
        f"| Shareholder loans outstanding | {eur(liab)} |",
        f"| Bank loans | {eur(0)} |",
        f"| Net (cash − SH loans) | {eur(equity_plug)} |",
        "",
        f"YE 2025 BOC balance ≈ {eur(ye2025)} · Opening first activity ≈ {eur(opening)}",
        "",
        "## 4–6. Gaps",
        "",
        "- **Trial Balance:** not available — request from QuickBooks / accountant",
        "- **Temporary Tax 2025:** not confirmed in records",
        "- **VAT:** Q3 2025 filed pack on Drive; later quarters need accountant confirmation",
        "",
        "## 7. Banks & loans",
        "",
        f"- **BOC** 357044102353 — {eur(latest_bal)}",
        "- **Revolut** — active (IBAN confirmation on Drive); balance TBC",
        f"- **Shareholder loans** (Sybaris): drawn {eur(sh_tot)}, Revolut drawdowns {eur(rev_ret)}, outstanding **{eur(sh_out)}**",
        "- **Bank loans:** none",
        "",
        "### Shareholder loan schedule",
        "",
        "| Date | Amount |",
        "|------|--------|",
    ]
    for dt, amt, desc in sh_loans:
        md_lines.append(f"| {dt.strftime('%Y-%m-%d')} | {eur(amt)} |")
    md_lines += [
        f"| **Total** | **{eur(sh_tot)}** |",
        "",
        "## Monthly cash (BOC)",
        "",
        "| Month | Client IN | SH loan | Total IN | Total OUT | Net |",
        "|-------|----------:|--------:|---------:|----------:|----:|",
    ]
    for ym in sorted(by_ym.keys()):
        m = by_ym[ym]
        net = m["total_in"] - m["total_out"]
        md_lines.append(
            f"| {ym} | {eur(m.get('client_receipt',0))} | {eur(m.get('shareholder_loan',0))} | "
            f"{eur(m['total_in'])} | {eur(m['total_out'])} | {eur(net)} |"
        )
    md_lines += [
        "",
        "---",
        "Lighthief Cyprus Ltd · HE 477423 · solarfarms.cy · office@lighthief.com · +357 77 77 00 50",
    ]
    OUT_MD.write_text("\n".join(md_lines), encoding="utf-8")

    print(f"Wrote {OUT_HTML}")
    print(f"Wrote {OUT_MD}")
    print(f"BOC bal {eur(latest_bal)} | SH outst {eur(sh_out)}")
    print(f"2025 ops net {eur(pnl25['net_ops'])} | 2026 YTD ops net {eur(pnl26['net_ops'])}")


if __name__ == "__main__":
    build()
