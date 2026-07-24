"""Generate HESS Package A — BESS Commercial Offer (Lighthief-branded, client-facing prices).

Mirrors the Linyang/Kehua config-list structure but branded as Lighthief and showing
client prices (Linyang cost + 15% margin applied). No internal costs shown.
"""
from pathlib import Path

OUT = Path(
    r"L:\My Drive\LINYANG\BESS CLIENTS\Individual_60-120-standalone\Offer-jul2026"
    r"\HESS-Psevdas-BESS-Commercial-Quote-PackageA-jul2026.html"
)

HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Lighthief — HESS Psevdas BESS — Commercial Quotation Package A</title>
<style>
  :root{
    --primary:#1A365D;--primary-light:#2B5FA0;--accent:#C9A432;
    --white:#FFFFFF;--grey:#404040;--body-bg:#F0F4F8;
  }
  *{box-sizing:border-box;}
  body{font-family:'Segoe UI',system-ui,sans-serif;font-size:12.5px;
    color:var(--grey);background:var(--body-bg);margin:0;padding:0;line-height:1.5;}
  .page{max-width:960px;margin:0 auto;background:#fff;padding:0 0 60px;}
  header{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-light) 100%);
    color:#fff;padding:32px 48px;}
  header .brand{font-size:26px;font-weight:700;letter-spacing:4px;}
  header .tagline{font-size:10.5px;letter-spacing:2px;opacity:.8;margin-top:2px;}
  header h1{color:var(--accent);font-size:20px;margin:18px 0 4px;}
  header .sub{font-size:12.5px;opacity:.9;}
  .meta{display:flex;flex-wrap:wrap;gap:6px 40px;padding:16px 48px 12px;
    border-bottom:3px solid var(--accent);font-size:11.5px;}
  .meta div span{color:var(--primary);font-weight:600;}
  section{padding:20px 48px;}
  h2{color:var(--accent);font-size:15px;border-bottom:1px solid #e3e8ee;
    padding-bottom:5px;margin:6px 0 12px;}
  h3{color:var(--primary);font-size:12.5px;margin:14px 0 5px;text-transform:uppercase;letter-spacing:.5px;}
  table{width:100%;border-collapse:collapse;margin:8px 0 14px;font-size:11.5px;}
  th{background:var(--primary);color:#fff;text-align:left;padding:8px 10px;font-weight:600;}
  td{padding:7px 10px;border-bottom:1px solid #e6ebf1;vertical-align:top;}
  tr:nth-child(even) td{background:#f7f9fc;}
  .no{width:6%;text-align:center;}
  .item{width:26%;}
  .spec{width:34%;}
  .qty{width:7%;text-align:center;}
  .unit{width:7%;text-align:center;}
  .price{width:20%;text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;}
  .section-row td{background:#e8f0fb;font-weight:700;color:var(--primary);
    font-size:12px;text-transform:uppercase;letter-spacing:.3px;}
  .subtotal-row td{background:#f0f4f8;font-weight:700;}
  .total-band{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-light) 100%);
    color:#fff;padding:14px 20px;border-radius:8px;display:flex;
    justify-content:space-between;align-items:center;margin:14px 0;}
  .total-band .l{font-size:14px;font-weight:600;}
  .total-band .v{font-size:24px;font-weight:800;color:var(--accent);}
  .note{background:#fff8e6;border-left:4px solid var(--accent);padding:11px 15px;
    margin:10px 0;font-size:11.5px;}
  .callout{background:#eef3f9;border-left:4px solid var(--primary);padding:11px 15px;
    margin:10px 0;font-size:11.5px;}
  .muted{color:#6b7684;font-size:11px;}
  ul{margin:5px 0;padding-left:18px;} li{margin:3px 0;}
  footer{padding:18px 48px;border-top:3px solid var(--accent);font-size:10.5px;color:#6b7684;}
  @media print{body{background:#fff;}.page{max-width:none;}}
</style>
</head>
<body>
<div class="page">

<header>
  <div class="brand">LIGHTHIEF</div>
  <div class="tagline">EPC &middot; O&amp;M &middot; RECYCLING &middot; PV &middot; BESS &middot; SCADA/EMS</div>
  <h1>Commercial Quotation &mdash; Package A: BESS Turnkey Island</h1>
  <div class="sub">Power&nbsp;On&nbsp;BESS &mdash; 59&nbsp;MW&nbsp;/&nbsp;120&nbsp;MWh, Plot&nbsp;26, Psevdas, Larnaca District, Cyprus</div>
</header>

<div class="meta">
  <div><span>Client:</span> H.E.S.S. Hybrid Energy Storage Systems Ltd</div>
  <div><span>Quote ref:</span> LCY-HESS-PSEVDAS-PKG-A-REV0</div>
  <div><span>Issued by:</span> Lighthief Cyprus Ltd (HE&nbsp;477423)</div>
  <div><span>Date:</span> 23 July 2026</div>
  <div><span>Validity:</span> 30 days</div>
  <div><span>Incoterms:</span> DDP Psevdas, Larnaca (Incoterms&nbsp;2020)</div>
</div>

<!-- ─── 1. PROJECT SUMMARY ─────────────────────────────────────── -->
<section>
  <h2>1. Project Summary</h2>
  <table>
    <tr><th style="width:35%">Parameter</th><th>Value</th></tr>
    <tr><td>Project name</td><td>Power On BESS &mdash; Psevdas, Larnaca, Cyprus</td></tr>
    <tr><td>Client / SPV</td><td>H.E.S.S. Hybrid Energy Storage Systems Ltd (HE&nbsp;439846) &mdash; CERA licence KEA14-2024</td></tr>
    <tr><td>Nameplate energy (initial phase)</td><td>120.36&nbsp;MWh DC (24 &times; 5.015&nbsp;MWh LFP containers)</td></tr>
    <tr><td>Guaranteed usable energy at POI</td><td>&ge;&nbsp;100&nbsp;MWh at POI, maintained for 10 years (Year-3 augmentation included as option)</td></tr>
    <tr><td>Export power at POC</td><td>50&nbsp;MW (via 6 &times; 10&nbsp;MW PCS &amp; MV skid containers)</td></tr>
    <tr><td>Application scenarios</td><td>Arbitrage + frequency regulation (grid-following; grid-forming firmware available)</td></tr>
    <tr><td>Point of connection voltage</td><td>33&nbsp;kV (MV, via Package&nbsp;B substation)</td></tr>
    <tr><td>Site</td><td>Plot 26, Psevdas Community, Larnaca District, Cyprus — altitude 264&nbsp;m, ambient 45&nbsp;&deg;C design, pollution Class&nbsp;III</td></tr>
    <tr><td>Delivery</td><td>DDP Larnaka / Psevdas site (duties, freight, customs, offloading included)</td></tr>
    <tr><td>Contracting entity</td><td>Lighthief Cyprus Ltd</td></tr>
  </table>
</section>

<!-- ─── 2. CONFIGURATION LIST & PRICING ───────────────────────── -->
<section>
  <h2>2. Configuration List &amp; Pricing &mdash; Initial Phase</h2>
  <div class="note">
    All prices are in EUR, net of VAT (Cyprus 19%), net of import duties, taxes and public charges.
    DDP Psevdas site: supply, sea/road freight, customs clearance, port handling, inland transport,
    offloading, craning, positioning, hot &amp; cold commissioning and site training included.
  </div>

  <table>
    <tr>
      <th class="no">No.</th>
      <th class="item">Item</th>
      <th class="spec">Specification</th>
      <th class="qty">Qty</th>
      <th class="unit">Unit</th>
      <th class="price">Price (EUR)</th>
    </tr>

    <!-- Section A: Battery Containers -->
    <tr class="section-row">
      <td colspan="6">A &mdash; Battery Energy Storage System (BESS)</td>
    </tr>
    <tr>
      <td class="no">A1</td>
      <td class="item">LFP Battery Container<br/><span class="muted">Linyang Power Atlantic ME&nbsp;5.015&nbsp;MWh</span></td>
      <td class="spec">
        20HC, 5,015&nbsp;kWh DC (BOL), LFP / EVE 314&nbsp;Ah, 12P416S, 1,500&nbsp;Vdc,
        liquid cooling 60&nbsp;kW, IP55, C5-M, &minus;30&hellip;+55&nbsp;&deg;C discharge,
        dual aerosol + water fire suppression, 3-level BMS (BMU/BCMU/BAMS),
        Modbus TCP / IEC&nbsp;104 / IEC&nbsp;61850.
        Certs: IEC&nbsp;62619 / 63056 / 61000 / 62477-1 / UN&nbsp;3536 / UL&nbsp;9540A.
        Paint: body&nbsp;RAL9003 / bottom&nbsp;RAL9005.
      </td>
      <td class="qty">24</td>
      <td class="unit">set</td>
      <td class="price">Incl.</td>
    </tr>

    <!-- Section B: MV Skids -->
    <tr class="section-row">
      <td colspan="6">B &mdash; PCS &amp; MV Skid Containers</td>
    </tr>
    <tr>
      <td class="no">B1</td>
      <td class="item">PCS &amp; MV Skid Container 10&nbsp;MW<br/><span class="muted">Kehua BCS10000K-C-HUD/T8</span></td>
      <td class="spec">
        40HC, 10,000&nbsp;kW AC, 8&nbsp;&times;&nbsp;BCS1250K-C-HUD PCS (690&nbsp;Vac / 1,500&nbsp;Vdc),
        1&nbsp;&times;&nbsp;10,000&nbsp;kVA 0.69/33&nbsp;kV oil-immersed transformer (Dy11y11, Al/Al,
        Ecodesign Tier&nbsp;2), SF6/eco-gas RMU (40.5&nbsp;kV / 630&nbsp;A), auxiliary transformer
        150&nbsp;kVA 0.69/0.38&nbsp;kV dry-type. IP65 (PCS) / IP54 (skid). Max. efficiency&nbsp;&ge;99%.
        Communications: Modbus-TCP / IEC&nbsp;61850 / IEC&nbsp;104.
        Certs: EN/IEC&nbsp;62477-1, EN&nbsp;50549-2.
      </td>
      <td class="qty">6</td>
      <td class="unit">set</td>
      <td class="price">Incl.</td>
    </tr>

    <!-- Section C: Installation & Commissioning (included) -->
    <tr class="section-row">
      <td colspan="6">C &mdash; DDP Delivery, Installation &amp; Commissioning (included in above prices)</td>
    </tr>
    <tr>
      <td class="no">C1</td>
      <td class="item">DDP delivery — sea freight + Cyprus customs + inland transport Limassol &rarr; Psevdas</td>
      <td class="spec">Included in the BESS equipment supply price (Section A+B subtotal). DDP Psevdas site per Incoterms&nbsp;2020. ~40&nbsp;km inland, abnormal-load transport for MV skids (40&nbsp;t each).</td>
      <td class="qty">&mdash;</td><td class="unit">&mdash;</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">C2</td>
      <td class="item">Offloading, crane, skidding &amp; positioning on foundation</td>
      <td class="spec">30 units (24 battery containers + 6 MV skids). Crane &ge;100&nbsp;t. Included.</td>
      <td class="qty">&mdash;</td><td class="unit">&mdash;</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">C3</td>
      <td class="item">Cold &amp; hot commissioning, SAT, site training</td>
      <td class="spec">Factory-trained engineers on site; cold commissioning (pre-energisation checks), hot commissioning (charge/discharge tests), TSOC-witnessed energisation, site training for client O&amp;M staff.</td>
      <td class="qty">&mdash;</td><td class="unit">&mdash;</td><td class="price">Incl.</td>
    </tr>

    <!-- Section D: BESS-island BoP -->
    <tr class="section-row">
      <td colspan="6">D &mdash; BESS-Island Balance of Plant (BoP)</td>
    </tr>
    <tr>
      <td class="no">D1</td>
      <td class="item">Container &amp; skid foundations</td>
      <td class="spec">Reinforced concrete foundations for 24&nbsp;&times;&nbsp;20HC battery containers + 6&nbsp;&times;&nbsp;40HC MV skid containers. C30/37 concrete, B500C steel, seismic Zone&nbsp;III design per CYS&nbsp;EN&nbsp;1998-1.</td>
      <td class="qty">1</td><td class="unit">lot</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">D2</td>
      <td class="item">BESS-yard civil works</td>
      <td class="spec">Site grading, access roads and hardstanding, drainage, fencing &amp; gates for BESS yard, separation from HV/MV area.</td>
      <td class="qty">1</td><td class="unit">lot</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">D3</td>
      <td class="item">DC &amp; LV cabling, array earthing, SPD, lighting</td>
      <td class="spec">Internal BESS DC/LV interconnect cabling, earthing ring, surge protection devices (Lighthief/DEHN), small power and emergency lighting in BESS yard.</td>
      <td class="qty">1</td><td class="unit">lot</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">D4</td>
      <td class="item">Fire-suppression water interface (DN65 tie-in)</td>
      <td class="spec">DN65 connection stubs from each battery container water fire interface to the site fire-water main (site fire-water system &mdash; 20&nbsp;m&sup3; tank, pumps, hydrant network &mdash; is in Package&nbsp;B).</td>
      <td class="qty">1</td><td class="unit">lot</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">D5</td>
      <td class="item">Energy Management System (EMS / SCADA)</td>
      <td class="spec">Voltus EMS platform: 24/7 remote monitoring, TSOC RTU interface (IEC&nbsp;104 / IEC&nbsp;61850), arbitrage &amp; frequency-regulation scheduling, web portal, historical data, alarm management. Independent from HV/MV substation SCADA per ANNEX-II §A.9.</td>
      <td class="qty">1</td><td class="unit">lot</td><td class="price">Incl.</td>
    </tr>

    <!-- Subtotal & Total -->
    <tr class="subtotal-row">
      <td colspan="5" style="text-align:right;">A + B &mdash; BESS equipment supply, DDP Psevdas (24 battery containers + 6 PCS/MV skids)</td>
      <td class="price">€ 14,040,000</td>
    </tr>
    <tr class="subtotal-row">
      <td colspan="5" style="text-align:right;">C + D &mdash; Installation, commissioning, BoP, civil &amp; EMS (lump sum)</td>
      <td class="price">€ 2,115,000</td>
    </tr>
  </table>

  <div class="total-band">
    <span class="l">PACKAGE A TOTAL &mdash; BESS Turnkey Island (DDP Psevdas, ex-VAT)</span>
    <span class="v">&euro; 16,155,000</span>
  </div>
  <p class="muted">BESS equipment supply (24 battery containers + 6 PCS/MV skids), DDP Psevdas: €14,040,000.
    Installation, commissioning, balance of plant, civil works &amp; EMS (lump sum): €2,115,000.
    <strong>Package&nbsp;A total: €16,155,000.</strong> Turnkey lump sum &mdash; battery, skid and works
    prices are consolidated at package level.</p>
</section>

<!-- ─── 3. AUGMENTATION OPTION (Year 3) ───────────────────────── -->
<section>
  <h2>3. Year-3 Augmentation Option (not in Package A total)</h2>
  <div class="callout">
    To maintain the guaranteed &ge;&nbsp;100&nbsp;MWh usable at POI throughout 10 years at 1.5 cycles/day,
    an augmentation package is planned for Year&nbsp;3. Priced separately so it can be contracted at the
    appropriate time. Linyang supply is on a firm quotation basis.
  </div>
  <table>
    <tr>
      <th class="no">No.</th><th class="item">Item</th><th class="spec">Specification</th>
      <th class="qty">Qty</th><th class="unit">Unit</th><th class="price">Unit Price (EUR)</th>
    </tr>
    <tr>
      <td class="no">Aug-1</td>
      <td class="item">LFP Battery Container (augmentation)<br/><span class="muted">Linyang Power Atlantic ME&nbsp;5.015&nbsp;MWh</span></td>
      <td class="spec">Same specification as A1. Delivery DDP Psevdas Year&nbsp;3 (+25&nbsp;MWh DC).</td>
      <td class="qty">5</td><td class="unit">set</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">Aug-2</td>
      <td class="item">PCS &amp; MV Skid 10&nbsp;MW (augmentation)<br/><span class="muted">Kehua BCS10000K-C-HUD/T8</span></td>
      <td class="spec">Same specification as B1. DDP Psevdas Year&nbsp;3.</td>
      <td class="qty">1</td><td class="unit">set</td><td class="price">Incl.</td>
    </tr>
    <tr>
      <td class="no">Aug-3</td>
      <td class="item">Augmentation BoP (foundations, cabling, commissioning)</td>
      <td class="spec">Foundations, DC/LV cabling, earthing extension, commissioning for augmentation units.</td>
      <td class="qty">1</td><td class="unit">lot</td><td class="price">Incl.</td>
    </tr>
    <tr class="subtotal-row">
      <td colspan="5" style="text-align:right;"><strong>Year-3 Augmentation Option Total (ex-VAT)</strong></td>
      <td class="price"><strong>&euro; 3,382,000</strong></td>
    </tr>
  </table>
  <p class="muted">Year-3 augmentation supplied and installed as a single turnkey lump sum of €3,382,000
    (5 battery containers + 1 PCS/MV skid + associated balance of plant, DDP Psevdas).
    To be contracted separately at or before Year&nbsp;2 to allow production planning.</p>
</section>

<!-- ─── 4. LTSA OPTION ─────────────────────────────────────────── -->
<section>
  <h2>4. Long-Term Service Agreement Option (not in Package A total)</h2>
  <table>
    <tr><th style="width:50%">Service</th><th>Term</th><th class="price">Price (EUR, ex-VAT)</th></tr>
    <tr>
      <td>OEM-backed BESS O&amp;M: preventive maintenance (bi-annual site visit), 24/7 remote monitoring,
        corrective maintenance, spare-parts supply, warranty management &mdash; Years 1&ndash;10</td>
      <td>10 years</td>
      <td class="price"><strong>&euro; 680,000</strong></td>
    </tr>
  </table>
  <p class="muted">Covers Linyang factory-trained O&amp;M, Lighthief field-team coordination, SCADA monitoring and spare-parts warehouse.
    Enhanced Tier&nbsp;C (97% availability guarantee + availability LDs) available at additional cost.</p>
</section>

<!-- ─── 5. COMMERCIAL TERMS ───────────────────────────────────── -->
<section>
  <h2>5. Commercial Terms</h2>
  <table>
    <tr><th style="width:30%">Item</th><th>Terms</th></tr>
    <tr><td>Currency</td><td>EUR, net of VAT (Cyprus 19%) and net of import duties, public charges</td></tr>
    <tr><td>Validity</td><td>30 days from date of issue</td></tr>
    <tr><td>Incoterms</td><td>DDP Larnaka / Psevdas site (Incoterms 2020) — duties, sea freight, customs clearance, port handling, inland transport, offloading and crane all included</td></tr>
    <tr><td>Delivery</td><td>T0 (contract + production-drawing approval) + 90 days production + ~75 days transit DDP Psevdas. Linyang pricing assumes shipment by end-December 2026.</td></tr>
    <tr><td>Payment</td><td>Lighthief standard EPC milestones (advance / pre-shipment / commissioning / retention) — to be agreed in the EPC contract</td></tr>
    <tr><td>Performance bond</td><td>5% of Package A Contract Price, provided within 14 days of advance receipt; released 30 days after PAC</td></tr>
    <tr><td>Delay liquidated damages</td><td>0.1%/day (days 1&ndash;30), 0.15%/day (days 31&ndash;60), 0.2%/day (day 61+), maximum 10% of Package A Contract Price</td></tr>
    <tr><td>Product warranty</td><td>10 years product warranty (DC &amp; AC equipment)</td></tr>
    <tr><td>Performance warranty</td><td>Guaranteed usable energy &ge;&nbsp;100&nbsp;MWh at POI for 10 years (including Year-3 augmentation option)</td></tr>
  </table>
</section>

<!-- ─── 6. EXCLUSIONS ─────────────────────────────────────────── -->
<section>
  <h2>6. Exclusions (not in Package A price)</h2>
  <ul>
    <li>VAT (Cyprus 19%, reclaimable), import duties, taxes, connection/permit/authority fees and land acquisition</li>
    <li>33&nbsp;kV cables from MV skid containers to the KYEA 33&nbsp;kV switchgear (in Package&nbsp;B)</li>
    <li>Site fire-water main, 20&nbsp;m&sup3; tank, pump sets and hydrant network (in Package&nbsp;B) &mdash; Package&nbsp;A includes only the DN65 container tie-in stubs</li>
    <li>132/33&nbsp;kV step-up transformer, 132&nbsp;kV AIS substation, earthing transformer, protection &amp; RTU (Package&nbsp;B scope)</li>
    <li>Long-term service agreement and Year-3 augmentation (priced as separate options above)</li>
    <li>Any changes arising from TSOC or authority requirements after the date of issue (subject to written variation order)</li>
  </ul>
</section>

<!-- ─── 7. TECHNICAL NOTES ────────────────────────────────────── -->
<section>
  <h2>7. Key Technical Notes</h2>
  <ul>
    <li><strong>Fire suppression:</strong> each battery container includes a dual-layer system (aerosol + gas at pack and container level + water firefighting interface per container, DN65). The water firefighting system (municipal hydrant or site fire-water main connection) is provided by others.</li>
    <li><strong>Grid support:</strong> grid-following operation per T14 (FSM, LFSM-O/U, Q-V, active &amp; reactive power control). Grid-forming (VSG) is available in the same Kehua PCS firmware with no equipment change.</li>
    <li><strong>Augmentation space:</strong> site layout reserves space for 5 additional 20HC containers + 1 additional 40HC MV skid for Year-3 augmentation.</li>
    <li><strong>Preliminary proposal note:</strong> final equipment selection subject to project-specific adjustments agreed in the technical agreement. Battery container auxiliary power supplied from the MV skid auxiliary transformers.</li>
  </ul>
  <div class="callout">
    For technical queries, scope clarifications or to progress to a signed EPC agreement, please contact
    <strong>Alexander Papacosta</strong>, Cyprus Director &mdash;
    <strong>+357&nbsp;99&nbsp;164&nbsp;158</strong> &middot; <strong>office@lighthief.com</strong> &middot; solarfarms.cy
  </div>
</section>

<footer>
  <strong>Lighthief Cyprus Ltd</strong> &middot; Company No. HE&nbsp;477423 &middot;
  28&nbsp;October&nbsp;Ave&nbsp;249, Lophitis Business Center&nbsp;1, Office&nbsp;201,
  3035&nbsp;Limassol, Cyprus &middot; office@lighthief.com &middot; +357&nbsp;77&nbsp;77&nbsp;00&nbsp;50 &middot;
  <strong>solarfarms.cy</strong><br/>
  Confidential &mdash; prepared for H.E.S.S. Hybrid Energy Storage Systems Ltd.
  Commercial Quotation Package A, 23&nbsp;July&nbsp;2026. Ref: LCY-HESS-PSEVDAS-PKG-A-REV0.
  Valid 30 days. Subject to the terms and assumptions set out above.
</footer>
</div>
</body>
</html>
"""

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(HTML, encoding="utf-8")
print(f"Saved -> {OUT}")
