#!/usr/bin/env python3
"""Build the FINAL Galascope client package (for Dino / lawyer / board).

1. Generates EPC v6 = the v5.1 body + a governing "Annex V6 — Amendment Schedule
   (June 2026)" that integrates every agreed v6 change (APG to PAC, RTE split,
   FAT, extended rejection window, price validity long-stop, VSG note, liability
   split, manufacturing-defect carve-out, order-trigger CP). A top banner marks
   the document as v6.0; the Annex prevails over the body where inconsistent.
2. Assembles docs/.../v6/CLIENT-PACKAGE/ with ONLY client-facing final files
   (renamed, numbered) + a clean client cover note (no internal content).

Run: python docs/clients/group-order/Group2_Esperia_Energy/contracts/v6/build-galascope-final-package-jun2026.py
"""
from __future__ import annotations

import shutil
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, RGBColor

NAVY = RGBColor(0x1A, 0x36, 0x5D)
GOLD = RGBColor(0xC9, 0xA4, 0x32)
GREY = RGBColor(0x40, 0x40, 0x40)

V6 = Path(__file__).resolve().parent
CONTRACTS = V6.parent
REPO = CONTRACTS.parents[4]  # .../solinvest
PKG = V6 / "CLIENT-PACKAGE"

EPC_SRC = CONTRACTS / "EPC-Galascope-Esperia-batch1-may2026.docx"
EPC_OUT = PKG / "01-EPC-Agreement-Galascope-G1-G2-v6-jun2026.docx"


def _run(p, text, *, bold=False, italic=False, size=10.5, color=None):
    r = p.add_run(text)
    r.bold = bold
    r.italic = italic
    r.font.name = "Calibri"
    r.font.size = Pt(size)
    if color is not None:
        r.font.color.rgb = color
    return r


def h(doc, text, size=12):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    _run(p, text, bold=True, size=size, color=GOLD)
    return p


def para(doc, text, *, bold=False, italic=False, color=None, size=10.5):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    _run(p, text, bold=bold, italic=italic, color=color, size=size)
    return p


# ── v6 amendment clauses (verbatim agreed text) ──────────────────────────────
ANNEX = [
    ("1A.4  Nature of EPC Execution.",
     "Execution of this Agreement records the Parties' agreed terms. It is not an order to "
     "manufacture and creates no payment obligation. The order is placed, and the advance under "
     "Section 7.1(a) falls due, only on satisfaction of the Conditions Precedent in Sections 1A.1 "
     "and 1A.5."),
    ("1A.5  Companion Documents \u2014 Condition Precedent to the Advance.",
     "The advance shall not become due until the Contractor has presented to the Client, each "
     "substantially in the form attached: (a) the OEM Direct Warranty Undertaking, signed and "
     "sealed by the OEM, covering the Project (Galascope 1 and Galascope 2); (b) the Advance Payment "
     "Guarantee (APG No. 1) issued by the OEM's bank naming the Client as beneficiary; (c) the OEM "
     "5% performance guarantee; and (d) the Confirmed Price Certificate per Section 6.1."),
    ("1A.5A  Pre-Shipment Payment \u2014 Condition Precedent.",
     "The pre-shipment payment (Section 7.1(b)) shall not become due until: (a) the equipment has "
     "passed the Factory Acceptance Test (Section 8.x) witnessed by or on behalf of the Client; and "
     "(b) the Contractor has presented the Pre-Shipment Advance Payment Guarantee (APG No. 2) issued "
     "by the OEM's bank naming the Client as beneficiary (Section 10.9(c)). The Client never funds an "
     "equipment prepayment tranche without a guarantee in place for that equipment prepayment."),
    ("1A.6  Bilateral Walk-Away.",
     "If any document in Section 1A.5 is not presented in the agreed form by the Long-Stop Date in "
     "Section 1A.1, either Party may elect not to proceed by written notice without liability, and "
     "any advance received shall be refunded within thirty (30) days less reasonable and documented "
     "costs. The companion-document drafts attached are provided for review and are not executed by "
     "signature of this Agreement."),
    ("6.1(g)  Price Basis Certificates.",
     "The Contractor shall issue: (i) an Indicative Price Basis Certificate at signing, stating the "
     "Indicative Contract Price, the reference indices (Mysteel lithium carbonate and EUR/CNY as at "
     "the Effective Date) and effective MWh per park; and (ii) a Delivery Price Basis Certificate "
     "upon delivery, stating whether the Confirmed Price equals the Indicative Price or the adjusted "
     "Confirmed Price under (c)-(d), with full index values and calculation shown. The Client may "
     "notify a dispute within fourteen (14) days of each Certificate; absent dispute the Certificate "
     "is deemed accepted for payment milestones following that date. Schedule A effective MWh: "
     "Galascope 1 \u2014 20.06 MWh; Galascope 2 \u2014 10.03 MWh."),
    ("6.1(h)  Price Validity Long-Stop.",
     "Where the Client receives Connection Terms within six (6) months of the Effective Date, the "
     "Confirmed Price is set under sub-clauses (c)-(d) (two-way adjustment; upward movement capped "
     "at five percent (5%); downward movement passed through in full on milestones not yet "
     "invoiced). Where Connection Terms are received more than six (6) months after the Effective "
     "Date, the Contractor shall obtain a refreshed OEM quotation and re-anchor the Indicative Price "
     "and reference indices to the month of that refreshed quotation; the same two-way adjustment and "
     "5% cap then apply from the re-anchored basis. Either Party may terminate under Section 6.1(d) "
     "if the resulting upward adjustment would exceed five percent (5%)."),
    ("6.1(a)  Price basis \u2014 consistent with the signed Letter of Intent (LOI Clause 4.4).",
     "Consistent with the signed LOI (Clause 4.4): Schedule A pricing is locked with the OEM on the "
     "January 2026 quotation basis, not spot index. The Indicative Price (Schedule A, or as updated "
     "in writing before signing) shall be the Confirmed Price for equipment-cost purposes, without "
     "upward raw-material or FX adjustment for index movement occurring before the EPC Effective "
     "Date. The two-way adjustment under Section 6.1(c)-(d) applies after signing only, to verified "
     "movement from the indices stated in the Indicative Price Basis Certificate at EPC signing "
     "(Section 6.1(g)). The OEM has confirmed it continues to hold this price at the current level. "
     "References in the body and Schedule A to the January 2026 quotation or reference values are "
     "read consistently with this paragraph and LOI Clause 4.4."),
    ("8 / Schedule A Part 3  Delivery & Shipping Schedule and Target PAC \u2014 confirmed at Connection Terms, not fixed at signing.",
     "Manufacturing, shipping and delivery lead time is NOT fixed at signing and no time commitment is "
     "given at signing. Production lead time is indicative only and may change from any manufacturing "
     "estimate previously discussed (including any three (3) month manufacturing figure), depending on "
     "the OEM's production capacity at the time of order. Upon receipt of Connection Terms (the order "
     "trigger under Section 1A), the Contractor shall issue a binding Delivery Schedule stating the "
     "confirmed manufacturing lead time, the shipping timeline and the Target PAC Date, together with the "
     "Confirmed Price Certificate under Section 6.1(g); the Confirmed Price may differ from the "
     "Indicative Price only within the two-way adjustment and the five percent (5%) upward cap under "
     "Section 6.1(c)-(d). All time-based obligations and all Delay Liquidated Damages under Section 8.4 "
     "are calculated from that confirmed Delivery Schedule, and not from any duration or calendar date "
     "stated at or before signing."),
    ("1A.7  Client withdrawal on the delivery timeline.",
     "If the Delivery Schedule confirmed at Connection Terms shows a delivery or Target PAC date that "
     "the Client reasonably considers too long, the Client may withdraw from this Agreement by written "
     "notice within ten (10) Business Days of receiving the Delivery Schedule, without liability to "
     "either Party, and any advance received shall be refunded within thirty (30) days. This reflects "
     "that neither Party can predict the OEM's market or production-capacity movements at the time of "
     "order."),
    ("5A.1(f)  Planning.",
     "The Client shall use reasonable endeavours to obtain planning permissions and landowner "
     "consents within sixty (60) days of the Effective Date. Where delay by a planning or competent "
     "authority beyond the Client's reasonable control causes delay to the Target PAC Date, the "
     "Target PAC Date extends day-for-day. The Contractor shall not be entitled to additional cost "
     "reimbursement beyond reasonable and documented standby costs directly caused by such planning "
     "delay. The Client shall notify the Contractor promptly of material planning delay."),
    ("8.4.7A  Upstream Force Majeure (OEM Flow-Through) \u2014 replaces the body clause.",
     "(a) Where the OEM has formally notified the Contractor in writing of an event it claims is "
     "Force Majeure under the upstream supply contract, the Contractor may notify the Client within "
     "seven (7) Business Days, attaching a copy of the OEM notice. (b) The Target PAC Date extends "
     "only if the notified event constitutes Force Majeure under Section 12.1 (no extension for "
     "events within the §12.1 exclusions, including ordinary commercial or production delays, raw "
     "material sourcing, port congestion, or financing). (c) If the Client reasonably contends the "
     "event is not §12.1 Force Majeure, it shall notify the Contractor within ten (10) Business Days "
     "of the Contractor's notice; the Target PAC Date shall not extend during any dispute. (d) If "
     "the Parties do not agree within thirty (30) days, either Party may refer the matter to dispute "
     "resolution under Section 15.3; no extension is deemed agreed unless resolved in favour of FM "
     "qualification. (e) Where the event is agreed or determined to be Force Majeure, the Target PAC "
     "Date extends day-for-day and no Delay LDs accrue for that period. (f) The Contractor shall use "
     "reasonable endeavours to challenge any OEM notice that clearly does not meet Section 12.1."),
    ("10.9(b)  Advance Payment Guarantee No. 1 \u2014 advance tranche (replaces body 10.9(b)).",
     "The Contractor shall procure that the equipment manufacturer's bank (Bank of Communications) "
     "issues a first-demand Advance Payment Guarantee under URDG 758 naming Galascope Ltd (HE 303759) "
     "and/or its project-finance security agent as beneficiary, securing the advance payment for the "
     "supply of the equipment. The Guaranteed Amount is EUR 705,792 (the equipment-side advance), as "
     "set out in Schedule A and stated on the face of the APG. This and Section 10.9(c) replace the "
     "APG figures in the body and in Schedule A Parts 2 and 4."),
    ("10.9(aa)  APG issuance & validity \u2014 confirmed mechanism (addresses the legality query).",
     "The OEM's bank (Bank of Communications) issues the Advance Payment Guarantee(s) upon being "
     "provided with both this EPC Agreement and the OEM Sales Contract, and issues them with "
     "Galascope Ltd named as beneficiary from the outset. The Client may therefore demand directly "
     "under the APG(s) notwithstanding that the Client pays the Contractor (and not the OEM): the "
     "APG is original issuance naming the Client as beneficiary, not a transfer or assignment. This "
     "confirms the validity of the APG for the Client and underpins the payment terms in Section 7.1."),
    ("10.9(c)  Advance Payment Guarantee No. 2 \u2014 pre-shipment tranche (new).",
     "Before the pre-shipment payment falls due, and conditional on a passed Factory Acceptance Test, "
     "the Contractor shall procure that the manufacturer's bank issues a second first-demand Advance "
     "Payment Guarantee (or, at the Contractor's election, an increase to APG No. 1) under URDG 758 "
     "naming the Client and/or its security agent as beneficiary, securing the pre-shipment payment "
     "for the supply of the equipment. The Guaranteed Amount is EUR 1,411,585 (the equipment-side "
     "pre-shipment tranche), as set out in Schedule A. Combined APG cover is therefore EUR 2,117,377 "
     "(the equipment payments made before delivery). The DAP and acceptance tranches, paid on or "
     "after delivery, are not prepayments and are not APG-secured (covered by possession of the "
     "equipment, the performance guarantee, and the Retention)."),
    ("10.9(d)  APG validity \u2014 to PAC (replaces body 10.9(d) 'delivery + 30 days').",
     "Each APG shall remain valid until the earlier of: (i) issuance of the Provisional Acceptance "
     "Certificate (PAC); or (ii) twelve (12) months after delivery of the equipment to Site; upon "
     "issuance of PAC the APGs are released. This keeps the advance-refund cover alive through "
     "commissioning, when latent equipment faults are typically discovered."),
    ("10.9(e)  APG trigger.",
     "A demand may be made under either APG where the manufacturer has failed to refund the relevant "
     "prepayment when due, or has failed to deliver conforming/functioning equipment, including on the "
     "Client's rejection of equipment at commissioning (see Section 9 rejection window and the "
     "manufacturing-defect carve-out below)."),
    ("10.9A  Security layering alongside the APGs.",
     "Through to PAC the Client is protected by, in combination: (a) the two APGs (advance + "
     "pre-shipment refund, to PAC / 12 months, EUR 2,117,377 combined); (b) CAR / erection all-risks "
     "insurance for the full replacement value from "
     "arrival at the discharge port through installation to PAC \u2014 the sea voyage is covered by the "
     "OEM's CIF marine insurance, so the Contractor's policy runs from port of discharge; (c) the "
     "OEM 5% performance guarantee to the end of the Defects Liability Period; (d) the Retention "
     "(Section 7.4); and (e) the OEM Direct Warranty Undertaking and 5-year product warranty "
     "(Section 10.8)."),
    ("8.x  Pre-Shipment Inspection / Factory Acceptance Test (FAT).",
     "Before any equipment is despatched and before the pre-shipment milestone (Section 7.1(b)) is "
     "paid, the Client and/or its appointed third-party inspector may inspect and witness factory "
     "acceptance testing at the OEM's facility on ten (10) Business Days' notice. Where the FAT "
     "reveals defects or non-conformity, the OEM/Contractor shall remedy them at no additional cost "
     "before shipment, and the Client may re-inspect. Pre-shipment payment is conditional on a "
     "passed FAT. The FAT is the primary protection against a material proportion of equipment being "
     "defective, as it prevents payment for and shipment of defective equipment."),
    ("9.2A  Final Acceptance Certificate (FAC).",
     "At the end of the Defects Liability Period (three (3) months after PAC), the Contractor shall "
     "issue a Final Acceptance Certificate once: (a) all defects notified during the Defects "
     "Liability Period have been rectified to the Client's reasonable satisfaction; (b) all "
     "punch-list items are closed or formally deferred by written agreement; and (c) the "
     "deliverables in Section 19.12 have been provided. The Retention shall be released within "
     "thirty (30) days of FAC issuance. If the Contractor fails to issue a FAC within thirty (30) "
     "days of the end of the Defects Liability Period despite the above conditions being met, the "
     "Client may issue the FAC itself and the Retention shall be released automatically."),
    ("9.1B  PAC with performance shortfall \u2014 remedy and cap.",
     "If measured capacity or Round-Trip Efficiency is below the Contract guarantees (Section 10.6) "
     "but above the PAC hard floor (Section 9.1(a)\u2013(b)), PAC shall be issued but the Contractor "
     "shall, at the Client's election, (i) perform augmentation, repair or recommissioning to "
     "restore performance to the guaranteed level within sixty (60) days of PAC; or (ii) pay "
     "Liquidated Damages calculated as: LD = (Guaranteed level \u2212 Measured level) \u00d7 System "
     "Capacity \u00d7 prevailing market rate per kWh for equivalent battery modules. The aggregate "
     "Liquidated Damages for performance shortfall under this Section shall not exceed ten percent "
     "(10%) of the Component A Equipment Supply Price. This cap shall not apply to manufacturing "
     "defects, which are subject to the uncapped remedy in Section 13.5 and the OEM Direct "
     "Warranty Undertaking. Performance shortfall LDs under this Section and Delay LDs under "
     "Section 8.4 shall not be aggregated beyond the respective caps for each."),
    ("8.4.8  Delivery Schedule hardening and FM preservation.",
     "Upon issue of the Delivery Schedule at Connection Terms, the milestones set out in that "
     "Schedule are binding on the Contractor. The Contractor shall provide monthly progress reports "
     "against each milestone. Where any milestone is at risk of delay, the Contractor shall notify "
     "the Client within seven (7) Business Days of that risk arising. Notwithstanding the foregoing, "
     "the extension-of-time regime in Section 8.4.7A (OEM Force Majeure flow-through), Section "
     "8.4.6 (Exclusions), and Section 8.4.7 (Extension of Time) remain in full force and effect "
     "and are not affected by the binding nature of the Delivery Schedule. Ordinary production-capacity "
     "constraints, raw-material sourcing, port congestion, and financing issues shall not entitle "
     "the Contractor to an extension of time under this Agreement (consistent with Section 8.4.7A's "
     "exclusion of such events from Force Majeure). The Client accepts that the Delivery Schedule "
     "is established at Connection Terms and may differ materially from indicative lead times "
     "discussed before signing."),
    ("7.4(e)  Set-off rights.",
     "The Client may set off against any unpaid milestone or PAC payment any amount that is: "
     "(i) agreed in writing by the Parties as due from the Contractor; or (ii) determined as due "
     "by a binding adjudicator's or expert's decision under Section 15.3. Set-off shall not apply "
     "to amounts that are disputed in good faith and not yet ascertained. The Client shall give "
     "the Contractor seven (7) Business Days' prior written notice before exercising any set-off "
     "right, identifying the amount and basis of the set-off."),
    ("14.6  Insurance \u2014 coverage structure and Contractor's procurement covenant.",
     "(a) Coverage structure. The sea voyage from the port of shipment to CIF Limassol is intended "
     "to be covered by the OEM's (Linyang's) CIF marine cargo insurance, and the Contractor's "
     "Construction All-Risks (CAR) policy is intended to attach from arrival at the port of "
     "discharge (CIF Limassol) and to run through inland transit and installation to PAC. "
     "(b) Procurement covenant. The Contractor shall use all reasonable endeavours to procure, and "
     "to maintain in force for the relevant periods, insurances that: (i) name Lighthief Cyprus Ltd "
     "as insured; (ii) name the Client (Galascope Ltd) and, where notified, its project-finance "
     "lender or security agent as additional insured on the CAR and Public Liability policies, with "
     "a waiver of subrogation in their favour and, in respect of the lender, a loss-payee / lenders' "
     "endorsement; (iii) provide inland-transit cover attaching from the port of discharge through "
     "to delivery at Site; and (iv) so far as reasonably obtainable from insurers, bridge the "
     "interface between the OEM's marine cargo cover and the CAR cover (including by way of a "
     "difference-in-conditions or 50/50 loss-sharing basis). (c) Evidence. The Contractor shall "
     "provide certificates of insurance and the relevant endorsements evidencing the above before "
     "work commences at Site (and, in respect of any advance payment, per Section 14.4), and shall "
     "notify the Client promptly of any material change to or cancellation of any policy. "
     "(d) Where any endorsement in (b) is not obtainable from insurers on commercially reasonable "
     "terms, the Contractor shall notify the Client and the Parties shall agree an alternative "
     "arrangement in good faith; nothing in this Section warrants cover that insurers decline to "
     "provide. (e) Commissioning failure due to Contractor negligence. For the avoidance of doubt, "
     "any failure to achieve commissioning, or any defect, that is attributable to the Contractor's "
     "professional negligence (including electrical-engineering or design negligence) is covered "
     "under the Contractor's Professional Indemnity insurance, which the Contractor maintains with "
     "a limit of not less than EUR 2,000,000; this is in addition to, and does not limit, the "
     "Contractor's rectification, delay-LD, performance-LD, retention and performance-guarantee "
     "obligations under this Agreement."),
    ("11.5  Integrated document suite and interpretation (client-agreed).",
     "The EPC Agreement, the LTSA, the OEM Direct Warranty Undertaking, the Advance Payment "
     "Guarantees, the OEM Performance Guarantee, the EMS Subscription Addendum, the Technical "
     "Agreements and the OEM Warranty Terms shall be read together as a single, integrated "
     "project-document suite. In the event of any inconsistency or conflict between them, the "
     "interpretation that is most favourable to the Client shall govern."),
    ("7.1A  Independent Engineer sign-off \u2014 PAC payment.",
     "The PAC payment under Section 7.1(c) shall not become due until the relevant PAC test "
     "certificate and PAC report (Section 9.1) have been accepted in writing by the Client or its "
     "appointed Independent Engineer, such acceptance not to be unreasonably withheld or delayed "
     "beyond ten (10) Business Days of the Client's receipt of a complying PAC certificate. This "
     "condition applies to the PAC payment only and does not affect the advance or pre-shipment "
     "payments under Sections 7.1(a)-(b)."),
    ("13.3A  Additional liability carve-outs (not subject to any cap).",
     "In addition to the carve-outs in Section 13.3, the liability caps in Section 13.2 shall not "
     "apply to: (a) latent defects in the Works or Equipment; and (b) non-conformity with mandatory "
     "safety requirements or applicable grid-code requirements. For the avoidance of doubt, general "
     "firmware, software and design defects that are the responsibility of the OEM remain subject "
     "to the OEM Direct Warranty Undertaking and the manufacturing-defect carve-out (Section 13.5), "
     "and are not additionally uncapped under this Section."),
    ("16.3B  Lighthief International Ltd \u2014 performance undertaking.",
     "Lighthief International Ltd guarantees to the Client the due performance by Lighthief Cyprus "
     "Ltd of its core EPC obligations under this Agreement, being: (a) delivery of the BESS "
     "equipment to Site as EPC Contractor; (b) installation, commissioning and handover of the "
     "BESS to the technical specification in Schedule A; and (c) the Contractor's warranty "
     "obligations under Section 10.1 for the Warranty Period. This undertaking: (i) does not "
     "extend to financial liabilities beyond the Contract Price, to the LTSA or EMS services "
     "(which are contracted separately), or to OEM obligations guaranteed under the DWU and "
     "performance guarantee; (ii) is governed by Cyprus law; and (iii) remains in force for the "
     "duration of the Warranty Period. This undertaking is provided by way of a parent-company "
     "confirmation letter from Lighthief International Ltd, signed by its authorised officer "
     "(Dr. Arkadius Sybaris, Founder & CEO), delivered to the Client before the advance payment "
     "under Section 7.1(a) becomes due."),
    ("9.x  Extended rejection window.",
     "The Client's right to inspect and to give notice of defect or non-conformity, and the "
     "associated repair/replace/refund remedy, extends until commissioning / PAC and is not limited "
     "to thirty (30) days after delivery. For non-conformity affecting ten percent (10%) or more of "
     "installed capacity discovered up to PAC, the Client may require repair or replacement, or "
     "reject the affected equipment and require refund of the corresponding price (recoverable, "
     "where unpaid, under the APG per Section 10.9(e))."),
    ("13.2  Limitation of Liability \u2014 replaces body 13.2.",
     "The Contractor's aggregate liability shall be: (a) for claims relating to the Contractor's own "
     "EPC services, installation and non-OEM works (excluding OEM equipment): ten percent (10%) of "
     "the Contract Price; (b) for all other contractual breaches (excluding (a), (c), fraud and "
     "wilful misconduct): fifty percent (50%) of the Contract Price; (c) for manufacturing defects "
     "in OEM equipment and for fraud or wilful misconduct: uncapped, with the Contractor's right to "
     "pursue OEM recovery per Section 13.4."),
    ("13.5  Manufacturing-defect carve-out.",
     "For confirmed manufacturing defects in OEM equipment, the OEM bears the full cost of repair or "
     "replacement, including shipping to CIF Limassol, and the OEM's standard 10% warranty-liability "
     "cap does not apply. The Contractor shall procure this carve-out from the OEM and reflect it in "
     "the OEM Direct Warranty Undertaking provided to the Client."),
    ("4.4 / 3.1  EMS provider (replaces references to the EMS integration affiliate).",
     "EMS integration, SCADA commissioning and the DISPERON software subscription are provided by "
     "R&D Innovations Sp. z o.o. (NIP 9492265995; trading as DISPERON), a company under Lighthief "
     "International Ltd, under a separate EMS Integration Agreement and EMS Subscription Addendum. "
     "The Contractor guarantees that provider's performance of its obligations under those documents."),
    ("4.4(f)  End-to-end interface responsibility.",
     "The Contractor remains responsible for end-to-end BMS, PCS, SCADA and EMS interface "
     "compatibility, communications, command execution and data integrity at PAC and during the "
     "Defects Liability Period. Failure of an affiliate, software provider or subcontractor to "
     "deliver these functions shall not excuse the Contractor's responsibility to the Client."),
    ("10.5A  Warranty-void carve-out \u2014 EMS/monitoring failures.",
     "The warranty-voiding conditions set out in Section 10.5 shall not be invoked by the "
     "Contractor, and shall not restrict the Client's rights under the OEM Direct Warranty "
     "Undertaking or the LTSA availability guarantee, where the condition was caused by or "
     "attributable to: (a) DISPERON (R&D Innovations Sp. z o.o.) in its capacity as EMS provider; "
     "(b) any other entity within the Lighthief group of companies acting in connection with the "
     "Project; or (c) the Contractor's own monitoring failure or failure to issue a timely alert "
     "that would have enabled the Client to prevent the condition."),
    ("1A.5(e)  LTSA as companion document \u2014 simultaneous execution.",
     "In addition to the companion documents in Section 1A.5(a)\u2013(d), the Client's obligation to "
     "pay the advance under Section 7.1(a) is also conditional upon the Long-Term Service Agreement "
     "(LTSA) between the same Parties (Ref. LCY-LTSA-GAL-2026) being executed simultaneously with "
     "or before this Agreement. The Parties confirm their mutual intent to execute the EPC, LTSA and "
     "OEM Direct Warranty Undertaking at the same time."),
    ("19.12  Technical deliverables at handover.",
     "No later than thirty (30) days after PAC, the Contractor shall deliver to the Client: "
     "(a) as-built drawings and single-line diagrams (SLD); (b) all test reports, commissioning "
     "certificates and inspection certificates issued at FAT, SAT and PAC; (c) SCADA/EMS "
     "IEC\u202f60870-5-104 and Modbus register maps / point lists; (d) protection-relay settings files "
     "and test certificates; (e) firmware version records and access credentials for each device; "
     "(f) fire-system inspection and pressure test certificates; (g) C5 corrosion-coating "
     "certificates; (h) serial-number records for all containers, PCS units, transformers and "
     "MV switchgear; (i) DSO/EAC submission files and approval records; and (j) OEM operation "
     "and maintenance manuals. Documents shall be provided in editable electronic format where "
     "reasonably available. These deliverables are a condition of final retention release under "
     "Section 7.4."),
    ("Schedule A \u2014 Specification Freeze.",
     "The Technical Specification in Schedule A (and the companion Technical Agreements) shall be "
     "frozen and all placeholders, \u2018to be confirmed\u2019 items and open comments shall be closed before "
     "the order-placement advance becomes due under Section 7.1(a). The Contractor shall not place "
     "the order or invoke the advance-payment trigger against an open specification."),
    ("10.x  Grid-forming (VSG) & Black Start.",
     "The PCS supplied (Kehua C-series) is capable of grid-forming (VSG) and black-start operation "
     "via firmware. Activation, FAT or SAT verification, firmware enablement, licences and "
     "commissioning support for grid-forming and black-start capability are included in the Contract "
     "Price, unless a future DSO or grid-code requirement first published after the Effective Date "
     "materially exceeds the requirements known as at signing. Hardware is unaffected."),
    ("19.x  Licensing.",
     "The Contractor shall ensure BESS installation works are performed in a manner suitable for "
     "compliance with applicable licensing and permitting rules published by the Republic of Cyprus "
     "for energy storage installations, to the extent such compliance is within the Contractor's "
     "scope of supply. Installer sign-off by the Contractor's ETEK engineer is included; licensed "
     "electrical design and as-built drawing packages for the wider site are excluded (Client's "
     "engineer)."),
]


def _replace_in_paragraph(p, old, new):
    if old in "".join(r.text for r in p.runs):
        full = "".join(r.text for r in p.runs).replace(old, new)
        for r in p.runs:
            r.text = ""
        if p.runs:
            p.runs[0].text = full
        else:
            p.add_run(full)


def build_epc_v6():
    doc = Document(str(EPC_SRC))

    # Version stamp: bump cover page from v5.1 / May 2026 to v6.0 / June 2026
    for p in doc.paragraphs:
        _replace_in_paragraph(p, "Version: 5.1", "Version: 6.1")
        _replace_in_paragraph(p, "Date: May 2026", "Date: June 2026")
        # Add v6.0 entry to VERSION HISTORY block
        _replace_in_paragraph(
            p,
            "v5.1 — May 2026: Indicative Price + Confirmed Price mechanism (raw material / FX adjustment), "
            "LD Value split (Comp A delivery / Comp B commissioning), upstream FM flow-through, "
            "12-month Connection Terms longstop, 30-day advance payment trigger",
            "v5.1 — May 2026: Indicative Price + Confirmed Price mechanism (raw material / FX adjustment), "
            "LD Value split (Comp A delivery / Comp B commissioning), upstream FM flow-through, "
            "12-month Connection Terms longstop, 30-day advance payment trigger\n"
            "v6.0 — June 2026: Annex V6 Amendment Schedule — dual APG to PAC, DWU as CP, "
            "manufacturing-defect carve-out, delivery at Connection Terms, price re-anchoring, "
            "VAT clarity, title/APG alignment, EMS entity update\n"
            "v6.1 — July 2026: Client redline (Dino/Anastasios) — accepted: grid-forming "
            "included in Contract Price, EMS-affiliate warranty carve-out, 4.4(f) interface "
            "responsibility, LTSA as simultaneous-execution CP, 19.12 deliverables list, "
            "Schedule A spec-freeze, insurance before first payment; negotiated: integrated-suite "
            "most-favourable-to-Client interpretation (11.5), Independent Engineer PAC-payment gate "
            "(7.1A), additional liability carve-outs latent + safety/grid-code (13.3A), FAC "
            "reinstated (9.2A), PAC shortfall remedy capped 10% Component A (9.1B), binding "
            "Delivery Schedule with OEM FM preserved (8.4.8), set-off with ascertained/agreed "
            "qualifier (7.4(e)), Lighthief International performance undertaking by confirmation "
            "letter (16.3B)")

    # EMS provider entity change: Lighthief EU BESS Ltd -> R&D Innovations Sp. z o.o.
    for p in doc.paragraphs:
        _replace_in_paragraph(
            p, "Lighthief EU BESS Ltd",
            "R&D Innovations Sp. z o.o. (trading as DISPERON, under Lighthief International Ltd)")
        # FINAL REVIEW: align EPC §10.6 SOH/cycle figures to the OEM Atlantic 5MWh datasheet + LTSA
        _replace_in_paragraph(p, "Year 10 \u226579.58%", "Year 10 \u226578%")
        _replace_in_paragraph(
            p, "(c) Cycle Life: 7,000 cycles at 0.5C, 90% DoD, to 70% EOL.",
            "(c) Cycle Life: 8,000 cycles at 0.5C, 90% DoD, to 70% EOL.")
        # EMS fee clarity: the €400/MWh EMS subscription is included within the LTSA all-in fee
        _replace_in_paragraph(
            p, "3. EMS Subscription Addendum — DISPERON (EUR 400/MWh/yr from PAC)",
            "3. EMS Subscription Addendum — DISPERON (EUR 400/MWh/yr from PAC; while the LTSA is in "
            "force this is included within the LTSA all-in Service Fee of EUR 1,740/MWh/yr and not "
            "invoiced separately; the standalone rate applies only if the Client exits the LTSA)")

    # Re-anchor Confirmed-Price baseline from January 2026 to the May 2026 / Effective-Date basis.
    # The negotiated May price already absorbs the Jan->May index movement; the two-way adjustment
    # must run only from the Effective-Date reference values, not the stale January baseline.
    for p in doc.paragraphs:
        # Price basis worded to MATCH the signed LOI Clause 4.4 (no inconsistency).
        _replace_in_paragraph(
            p, "Linyang Quotation LY202601271 (January 2026)",
            "the January 2026 quotation basis (locked per the signed LOI Clause 4.4)")
        _replace_in_paragraph(
            p, "155,000 CNY/tonne (Mysteel China battery-grade spot, January 2026 monthly average)",
            "as recorded in the Indicative Price Basis Certificate at EPC signing (per LOI Clause 4.4)")
        _replace_in_paragraph(
            p, "8.18 CNY per EUR (January 2026 average)",
            "as recorded in the Indicative Price Basis Certificate at EPC signing (per LOI Clause 4.4)")
        if p.text.strip().startswith("Reference Date"):
            _replace_in_paragraph(
                p, "January 2026",
                "January 2026 quotation basis (price held per LOI Clause 4.4; adjustment measured "
                "from the indices in the Indicative Price Basis Certificate at EPC signing)")
        # Delivery timeline not fixed at signing -> set at Connection Terms (Annex V6)
        _replace_in_paragraph(
            p, "31 January 2027",
            "the date in the Delivery Schedule confirmed at Connection Terms (Annex V6)")
        # Strip indicative calendar-date estimates (all timing keyed to Connection Terms)
        _replace_in_paragraph(p, " (January 2032)", "")
        _replace_in_paragraph(p, " (approx. April 2027)", "")
        # Consolidate body to match Annex V6 (remove contradictions a reviewer would catch)
        _replace_in_paragraph(
            p,
            "(b) The APG covers: 20% advance on Component A + 50% pre-shipment on Component A = 70% of the Component A Equipment Supply Price.",
            "(b) Two Advance Payment Guarantees are provided, each issued by the OEM's bank naming the "
            "Client (Galascope Ltd) as beneficiary: APG No. 1 securing the equipment advance "
            "(EUR 705,792) and APG No. 2 securing the equipment pre-shipment tranche (EUR 1,411,585); "
            "combined cover EUR 2,117,377. APG No. 2 is issued at the Factory Acceptance Test, before "
            "the pre-shipment payment falls due.")
        _replace_in_paragraph(
            p, "(d) The APG shall remain valid until equipment delivery to Site plus thirty (30) days.",
            "(d) Each APG shall remain valid until the earlier of issuance of PAC or twelve (12) months "
            "after delivery of the equipment to Site; upon PAC the APGs are released.")
        _replace_in_paragraph(
            p,
            "(a) Warranty claims (defects in materials, workmanship, or OEM equipment): ten percent (10%) of the Contract Price;",
            "(a) Claims relating to the Contractor's own EPC services, installation and non-OEM works "
            "(excluding OEM equipment): ten percent (10%) of the Contract Price;")
        _replace_in_paragraph(p, "APG (70% \u00d7 Indicative Component A):", "APG (combined batch, per Annex V6):")
        _replace_in_paragraph(
            p, "EUR 1,294,098.70",
            "No. 1 advance EUR 705,792 + No. 2 pre-shipment EUR 1,411,585 (combined batch)")
        _replace_in_paragraph(p, "EUR 682,119.90", "see combined batch APG figure above (Annex V6)")
        _replace_in_paragraph(p, "Performance Bond (5% \u00d7 Component A):", "Performance Guarantee (5% \u00d7 Component A):")
        # §9.2 body — replace "no FAC / auto-release" with "see Annex V6 §9.2A for FAC"
        _replace_in_paragraph(
            p,
            "There is no Final Acceptance Certificate. Retention is released automatically at the "
            "end of the Defects Liability Period subject to Section 7.4(c).",
            "A Final Acceptance Certificate (FAC) shall be issued at the end of the Defects "
            "Liability Period in accordance with Annex V6 Section 9.2A. Retention is released "
            "within thirty (30) days of FAC issuance per Section 7.4.")
        # §8.4.5(a) — Dino: deduction should be cost-to-complete (already correct; add clarification)
        _replace_in_paragraph(
            p,
            "(a) The Contractor shall retain from payments received an amount equal to the value "
            "of works completed and materials delivered to Site;",
            "(a) The Contractor shall retain from payments received an amount equal to the value "
            "of works completed and materials delivered to Site, being the reasonable and documented "
            "cost incurred by the Contractor up to the date of termination;")
        # §14.4 Insurance — evidence provided BEFORE the first payment (Dino accept)
        _replace_in_paragraph(
            p,
            "The Contractor shall provide insurance certificates or cover notes within fourteen (14) days of the first payment under Section 7.1(a).",
            "The Contractor shall provide insurance certificates or cover notes (public liability, "
            "professional indemnity, and CAR/erection all-risks as required by Section 14.1) to the "
            "Client before the advance payment under Section 7.1(a) falls due. Insurance shall be "
            "in place from the Effective Date.")
        # §7.2 VAT — Contract Price is ex-VAT, but VAT is added to payments and client-paid
        _replace_in_paragraph(
            p, "7.2 Payments exclusive of VAT.",
            "7.2 The Contract Price and all milestone amounts are stated exclusive of VAT. VAT at the "
            "applicable Cyprus rate (currently nineteen percent (19%)) shall be added to each invoice "
            "and paid by the Client, and is recoverable by the Client in accordance with applicable law.")
        # §7.5(b) title — "whichever comes first" so title never lags the APG (Anastasios point)
        _replace_in_paragraph(
            p,
            "(b) Title (ownership) passes to the Client upon issuance of PAC and receipt of the PAC payment under Section 7.1(c). The Retention does not defer title.",
            "(b) Title (ownership) passes to the Client on the earlier of: (i) issuance of PAC and "
            "receipt of the PAC payment under Section 7.1(c); or (ii) twelve (12) months after delivery "
            "of the equipment to Site (the latest expiry of the Advance Payment Guarantees), so that "
            "title passes no later than the end of APG cover. Where title passes under (ii) before "
            "PAC, the Contractor retains a security interest in the Equipment for any unpaid balance "
            "until the PAC payment is made. The Retention does not defer title.")

    # Top banner marking v6.0
    first = doc.paragraphs[0]
    banner = first.insert_paragraph_before()
    _run(banner, "EPC AGREEMENT \u2014 VERSION 6.0 (June 2026)", bold=True, size=13, color=NAVY)
    b2 = first.insert_paragraph_before()
    _run(b2, "This is the Agreement as amended by Annex V6 (Amendment Schedule, June 2026) at "
             "the end of this document, which prevails over the body where inconsistent.",
         italic=True, size=9.5, color=GREY)
    first.insert_paragraph_before()

    # Append Annex V6
    doc.add_page_break()
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    _run(title, "ANNEX V6 \u2014 AMENDMENT SCHEDULE (JUNE 2026)", bold=True, size=14, color=NAVY)
    para(doc,
         "This Amendment Schedule forms part of EPC Agreement LCY-EPC-GAL-B1-2026. It amends and, "
         "where it states it replaces a clause, supersedes the corresponding clause in the body. "
         "Where this Schedule is inconsistent with the body, this Schedule prevails. Defined terms "
         "have the meaning given in the body.", italic=True)
    for headline, text in ANNEX:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(7)
        p.paragraph_format.space_after = Pt(2)
        _run(p, headline + "  ", bold=True, size=10.5, color=NAVY)
        _run(p, text, size=10.5)

    PKG.mkdir(parents=True, exist_ok=True)
    doc.save(str(EPC_OUT))
    print(f"EPC v6 -> {EPC_OUT}")


# ── clean client cover note ──────────────────────────────────────────────────
def build_cover_note():
    doc = Document()
    s = doc.styles["Normal"]; s.font.name = "Calibri"; s.font.size = Pt(10.5)

    t = doc.add_paragraph()
    t.alignment = WD_ALIGN_PARAGRAPH.CENTER
    _run(t, "Galascope BESS \u2014 EPC Package", bold=True, size=15, color=NAVY)
    st = doc.add_paragraph()
    st.alignment = WD_ALIGN_PARAGRAPH.CENTER
    _run(st, "Galascope 1 (5 MW / 20 MWh) & Galascope 2 (2.5 MW / 10 MWh) \u2014 Famagusta, Cyprus  \u00b7  Ref. LCY-EPC-GAL-B1-2026 (v6, June 2026)",
         italic=True, size=10, color=GOLD)
    doc.add_paragraph()

    para(doc, "To: Galascope Ltd \u2014 Ntinos Konstantinos (Director), and advisers / board.")
    para(doc, "From: Lighthief Cyprus Ltd \u2014 Alexander Papacosta (Director).")

    h(doc, "How this package works")
    for tx in [
        "Only the EPC Agreement is signed now. Signing it records the agreed terms and triggers no payment.",
        "The order begins at Connection Terms (grid terms from EAC/DSO). At that point Lighthief signs the "
        "supply contract with the manufacturer and the manufacturer's bank issues the Advance Payment "
        "Guarantee against both agreements.",
        "The companion documents below travel with this pack for review now; they are executed at the order "
        "trigger, not today.",
        "No advance is payable until the signed Direct Warranty Undertaking, the bank APG (with Galascope as "
        "beneficiary), the 5% performance guarantee and the Confirmed Price Certificate are presented. If any "
        "is not provided in the agreed form, either party may withdraw with no liability.",
    ]:
        b = doc.add_paragraph(style="List Bullet"); _run(b, tx)

    h(doc, "Documents in this package")
    rows = [
        ("01", "EPC Agreement v6 (with Annex V6 Amendment Schedule)", "For signature now"),
        ("02", "Ownership & Guarantee Flow (one-page explainer)", "Explainer"),
        ("03", "LTSA (Long-Term Service Agreement)", "For review"),
        ("04", "OEM Direct Warranty Undertaking \u2014 G1 & G2", "Draft for review; signed by OEM at order"),
        ("05a", "Advance Payment Guarantee No. 1 \u2014 equipment advance (EUR 705,792 = 25% of equipment supply, Galascope beneficiary)", "Form for review; bank-issued before advance"),
        ("05b", "Advance Payment Guarantee No. 2 \u2014 equipment pre-shipment (EUR 1,411,585 = 50% of equipment supply)", "Form for review; bank-issued at FAT"),
        ("06", "OEM 5% Performance Guarantee", "Form for review; issued at order"),
        ("07", "EMS Subscription Addendum (DISPERON)", "For review"),
        ("08", "Technical Agreement \u2014 Galascope 1 (5 MW / 20 MWh)", "For review"),
        ("09", "Technical Agreement \u2014 Galascope 2 (2.5 MW / 10 MWh)", "For review"),
        ("10", "Linyang Product Warranty Terms v2 (OEM warranty manual)", "Reference"),
    ]
    tbl = doc.add_table(rows=1, cols=3)
    tbl.style = "Light Grid Accent 1"
    hdr = tbl.rows[0].cells
    for c, txt in zip(hdr, ["#", "Document", "Status"]):
        _run(c.paragraphs[0], txt, bold=True, size=10)
    for num, name, status in rows:
        cells = tbl.add_row().cells
        _run(cells[0].paragraphs[0], num); _run(cells[1].paragraphs[0], name); _run(cells[2].paragraphs[0], status)

    h(doc, "Key protections built in for the Client")
    for tx in [
        "The manufacturer's equipment supply is secured by two first-demand bank guarantees totalling "
        "EUR 2,117,377: APG No. 1 (EUR 705,792, 25% of the equipment supply value) issued before the "
        "advance, and APG No. 2 (EUR 1,411,585, 50% of the equipment supply value) issued at the Factory "
        "Acceptance Test before the pre-shipment payment. These secure the equipment refund from the "
        "manufacturer. They are deliberately not full cover for each milestone: your milestone payments "
        "(30% / 55% of the total contract price) also include EPC services, and that portion \u2014 together "
        "with any balance above the APG figures \u2014 is protected by the other layers below (FAT before "
        "payment, the 5% performance guarantee, the 5% retention, your possession and title of the "
        "equipment, and the 5-year DWU), not by the APGs.",
        "Both APGs name Galascope directly as beneficiary and are kept valid to PAC (or 12 months after "
        "delivery), so faults found at commissioning remain covered.",
        "The manufacturer's bank issues the APG(s) once it holds both this EPC and the supply contract, "
        "naming Galascope as beneficiary from the outset \u2014 so you can claim directly under the APG even "
        "though you pay Lighthief (not the manufacturer). It is original issuance in your name, not a "
        "transfer, which confirms the guarantee is valid for you and supports the payment terms.",
        "Title passes to you on the earlier of PAC or 12 months after delivery \u2014 so ownership never "
        "lags the end of the APG cover (with Lighthief retaining a security interest for any unpaid "
        "balance if title passes before PAC). The APGs expire at the same moment as the latest "
        "title-transfer branch (PAC or 12 months); once the APGs release, protection continues under "
        "the 5-year DWU warranty and the performance guarantee (valid to DLP end).",
        "A Factory Acceptance Test (FAT) lets you (or your inspector) witness factory testing and have "
        "defects fixed before the pre-shipment payment and before shipment, and the second guarantee is "
        "issued at that point \u2014 the primary protection against a large proportion of equipment being "
        "faulty.",
        "Your right to reject and require remedy runs to commissioning / PAC, not just 30 days after delivery.",
        "Price moves both ways \u2014 the Indicative Price is the current agreed price; the confirmed price "
        "tracks the lithium index and EUR/CNY measured only from the Effective Date (signing) forward: "
        "downward moves are passed to you; upward moves are capped at 5%; either side may walk away above "
        "the cap; orders more than six months out are re-quoted on the same two-way basis.",
        "Delivery timeline is set at the order trigger, not fixed today. Production lead time is "
        "indicative only and can change from any manufacturing estimate. When Connection Terms are "
        "received, the confirmed manufacturing lead time, the shipping timeline and the Target PAC date "
        "are set in the Delivery Schedule, and the Confirmed Price is fixed at the same time (it can move "
        "only within the two-way adjustment and the 5% upward cap). All delay liquidated damages are "
        "measured from that confirmed schedule. If the confirmed timeline is too long for you, you may "
        "withdraw with no liability \u2014 this protects you against unpredictable manufacturer lead times.",
        "Continuous cover: APGs to PAC (advance + pre-shipment) \u2192 CAR/erection insurance at full "
        "replacement value from port of discharge (the sea voyage is covered by the manufacturer's CIF "
        "marine) \u2192 5% performance guarantee \u2192 5% retention \u2192 5-year OEM warranty & Direct Warranty "
        "Undertaking.",
        "The OEM's standard warranty caps aggregate liability at 10% of the payment received for "
        "defective products. The EPC and DWU draft include a requested manufacturing-defect carve-out "
        "under which the OEM bears full repair/replacement cost for confirmed manufacturing defects "
        "(not subject to the 10% cap). The primary protection against a large proportion of equipment "
        "being faulty is FAT: defects are identified and remedied before the pre-shipment payment is "
        "made and before shipment, preventing payment for defective goods. The APGs, extended "
        "rejection window to PAC, and 5-year DWU provide continuous layered cover.",
    ]:
        b = doc.add_paragraph(style="List Bullet"); _run(b, tx)

    h(doc, "Note \u2014 Kehua PCS and OEM scope")
    para(doc,
         "The PCS is Kehua C-series (BCS1250K-C-HUD), supplied within Linyang's commercial scope as part of "
         "Linyang's integrated BESS offering. The Kehua PCS is an OEM-supplied product and is covered under "
         "the Linyang product warranty and Direct Warranty Undertaking.")

    h(doc, "Note \u2014 grid-forming (VSG) & black start")
    para(doc,
         "The PCS is hardware-capable of grid-forming (VSG) and black start; these are firmware-enabled. "
         "The current Technical Agreement lists them as excluded and they will be added by amendment after "
         "review. The hardware is identical, so we expect no change to the equipment price; whether "
         "activation is at the factory or by later update depends on the DSO grid-code requirement, "
         "which we are confirming. This is flagged for transparency and does not affect signing the EPC now.")

    h(doc, "Note \u2014 governing law")
    para(doc,
         "This EPC, the LTSA, EMS Addendum, and the Advance Payment Guarantee instruments are governed by "
         "Cyprus law. The OEM Direct Warranty Undertaking follows the manufacturer's standard warranty terms "
         "under PRC law, with disputes resolved at the Shanghai International Arbitration Center (SHIAC) in "
         "English \u2014 consistent with international BESS procurement practice. The Cyprus-law EPC and APGs "
         "provide the primary enforceable remedies. Lenders requiring a legal opinion on SHIAC enforceability "
         "are directed to the OEM DWU section 6.3.")

    doc.add_paragraph()
    f = doc.add_paragraph(); f.alignment = WD_ALIGN_PARAGRAPH.CENTER
    _run(f, "Lighthief Cyprus Ltd \u00b7 HE 477423 \u00b7 28 October Ave 249, Lophitis Business Center 1, Office 201, "
            "3035 Limassol, Cyprus \u00b7 office@lighthief.com \u00b7 +357 99 164 158 \u00b7 solarfarms.cy",
         size=8, color=GREY)

    out = PKG / "00-Cover-Note-and-Index.docx"
    doc.save(str(out))
    print(f"Cover note -> {out}")


def _rewrite_paragraph(p, full_new):
    """Replace the entire text of a paragraph (keeps first run's formatting)."""
    for r in p.runs:
        r.text = ""
    if p.runs:
        p.runs[0].text = full_new
    else:
        p.add_run(full_new)


def _fix_docx_text(src: Path, dest: Path, replacements=None, rewrites=None):
    """Load src docx, apply substring replacements and/or full-paragraph rewrites, save to dest.

    replacements: list of (old_substring, new_substring) applied within runs.
    rewrites: list of (marker_substring, full_new_paragraph_text); if marker is in a
    paragraph's text, the whole paragraph is rewritten (used to strip group/portfolio leaks).
    """
    replacements = replacements or []
    rewrites = rewrites or []
    doc = Document(str(src))

    def handle(p):
        for marker, full_new in rewrites:
            if marker in p.text:
                _rewrite_paragraph(p, full_new)
                return
        for old, new in replacements:
            _replace_in_paragraph(p, old, new)

    for p in doc.paragraphs:
        handle(p)
    for tbl in doc.tables:
        for row in tbl.rows:
            for cell in row.cells:
                for p in cell.paragraphs:
                    handle(p)
    doc.save(str(dest))


def copy_attachments():
    # Simple file copies
    mapping = [
        (V6 / "Galascope-ownership-guarantee-flow-jun2026.html", "02-Ownership-and-Guarantee-Flow.html"),
        (V6 / "OEM-DWU-Galascope-CLIENT-REVIEW-jun2026.docx", "04-OEM-Direct-Warranty-Undertaking-G1-G2.docx"),
        (V6 / "Performance-Guarantee-Galascope-CLIENT-REVIEW-jun2026.docx", "06-OEM-5pct-Performance-Guarantee.docx"),
        (CONTRACTS / "Cyprus 5MW_20MWh Technical Agreement V2.1 (draft) 260429.docx", "08-Technical-Agreement-Galascope-1-5MW-20MWh.docx"),
        (CONTRACTS / "Cyprus 2.5MW_10MWh Technical Agreement V2.1 (draft) 260429.docx", "09-Technical-Agreement-Galascope-2-2.5MW-10MWh.docx"),
        (REPO / "docs" / "hardware" / "Linyang Warranty Terms v2.pdf", "10-Linyang-Product-Warranty-Terms-v2.pdf"),
    ]
    for src, dest in mapping:
        if src.exists():
            shutil.copy2(str(src), str(PKG / dest))
            print(f"  copied -> {dest}")
        else:
            print(f"  !! MISSING: {src}")

    # LTSA — copy with group-order/portfolio pricing leak stripped + Dino v6.1 ACCEPT fixes
    ltsa_src = CONTRACTS / "LTSA-Galascope-Esperia-may2026.docx"
    ltsa_dest = PKG / "03-LTSA-Galascope-G1-G2.docx"
    if ltsa_src.exists():
        _fix_docx_text(ltsa_src, ltsa_dest,
            replacements=[
                # ACCEPT: EPC ref v4.0 → v6.0 (Anastasios checklist)
                ("LCY-EPC-GAL-B1-2026 v4.0", "LCY-EPC-GAL-B1-2026 (v6.0, July 2026)"),
                ("EPC Agreement (LCY-EPC-GAL-B1-2026 v4.0)", "EPC Agreement (LCY-EPC-GAL-B1-2026 v6.0)"),
                # Leak-hygiene: avoid "portfolio" wording implying the wider group order
                ("the BESS portfolio covered under this Agreement",
                 "the BESS systems covered under this Agreement"),
                # Align PI limit to EUR 2,000,000 (consistent with EPC §14.1(b))
                ("General Commercial Liability and Professional Indemnity Insurance of minimum EUR 1,000,000 each.",
                 "General Commercial Liability Insurance of minimum EUR 1,000,000 and Professional "
                 "Indemnity Insurance of minimum EUR 2,000,000."),
            ],
            rewrites=[
                # ACCEPT: Strip group/portfolio pricing leak (existing)
                ("portfolio range",
                 "Calculation basis: Annual subscription = 20% of total installed EMS/SCADA cost (EMS hardware "
                 "+ SCADA Local + SCADA Global), divided by system capacity in MWh. For this Project the "
                 "EMS/SCADA subscription rate is EUR 400/MWh/Year (EUR 12,000 per year for the 30 MWh combined "
                 "across Galascope 1 and Galascope 2), as set out in the EMS Subscription Addendum. For the "
                 "avoidance of doubt, this EUR 400/MWh/Year EMS/SCADA component is included within — and is not "
                 "additional to — the all-in LTSA Service Fee of EUR 1,740/MWh/Year agreed for this Project; the "
                 "EMS subscription is not invoiced separately on top of the LTSA Service Fee while this Agreement "
                 "is in force. The standalone EUR 400/MWh/Year rate applies only if the Client exits or "
                 "terminates the LTSA and the EMS subscription continues on a standalone basis."),
            # group-availability paragraph handled by the NEGOTIATE rewrite block below
                # ACCEPT: EMS-affiliate carve-out in LTSA §9.3(e) (mirrors EPC 10.5A) — Anastasios #4
                ("(e) Downtime caused by EMS or third-party system failures;",
                 "(e) Downtime caused by EMS or third-party system failures — except that this exclusion shall "
                 "not apply where the EMS failure is attributable to DISPERON (R&D Innovations Sp. z o.o.) or "
                 "any other entity within the Lighthief group of companies, or is caused by the Service "
                 "Provider's configuration, monitoring, integration or cyber-security controls;"),
                # FINAL REVIEW: align §10.2 + Schedule 5 guaranteed SOH (1 cycle/day) to the OEM
                # Power Atlantic 5MWh degradation reference (monotonic, at/below OEM curve).
                # §10.2 body milestones:
                ("(a) End of Year 1: 98% of original rated capacity;",
                 "(a) End of Year 1: 94% of original rated capacity;"),
                ("(b) End of Year 2: 96% of original rated capacity;",
                 "(b) End of Year 2: 91% of original rated capacity;"),
                ("(c) End of Year 3: 94% of original rated capacity;",
                 "(c) End of Year 3: 89% of original rated capacity;"),
                ("(d) End of Year 4: 92% of original rated capacity;",
                 "(d) End of Year 4: 87% of original rated capacity;"),
                ("(f) End of Year 10: 79.58% of original rated capacity;",
                 "(f) End of Year 10: 78% of original rated capacity;"),
                # Schedule 5 "1 cycle per day" guaranteed table (monotonic, ≤ OEM reference):
                ("| 1 | 95% |", "| 1 | 94% |"),
                ("| 2 | 92% |", "| 2 | 91% |"),
                ("| 7 | 81% |", "| 7 | 82% |"),
                ("| 8 | 79% |", "| 8 | 80% |"),
                ("| 9 | 80% |", "| 9 | 79% |"),
                ("| 10 | 79.58% |", "| 10 | 78% |"),
                # Datasheet spec alignment (Power Atlantic 5.015 MWh):
                ("| Cycle Life (to 70% EOL) | 7,000 cycles (25\u00b0C, 90% DOD, 0.5C) |",
                 "| Cycle Life (to 70% EOL) | 8,000 cycles (25\u00b0C, 90% DOD, 0.5C) |"),
                ("Based on cycle life of 7,000 cycles to 70% EOL at reference conditions:",
                 "Based on cycle life of 8,000 cycles to 70% EOL at reference conditions:"),
                ("| Energy Density | 183 Wh/kg |",
                 "| Energy Density | 175 Wh/kg |"),
                # ACCEPT: Schedule 4 — clarify LD formula (remove ambiguity between % table and EUR/day rate)
                ("Availability LD Rate: \u20ac30/day/MWh of unavailable capacity (per OEM confirmed rate)",
                 "Availability LDs shall be calculated as follows: for each percentage point below 97% "
                 "achieved, the Service Provider shall pay EUR 30 per MWh per day of affected unavailable "
                 "capacity (minimum EUR 500 per day per Park). Where this daily rate would produce a lower "
                 "aggregate than the fee-reduction percentages in the table above, the fee-reduction table "
                 "governs; where the daily rate produces a higher aggregate, the daily rate governs. In all "
                 "cases the cap in Section 9.5 applies."),
                # ACCEPT: Data retention — 15 years + client accessible; warranty claim logs (Dino request)
                ("The Service Provider shall retain Performance Data for a minimum of five (5) years "
                 "from the date of collection.",
                 "The Service Provider shall retain Performance Data, alarm/event logs, BMS/PCS/EMS logs, "
                 "maintenance records, SOH certificates and availability calculations for a minimum of "
                 "fifteen (15) years from the Commissioning Date, and for five (5) years following "
                 "termination. The Client shall have continuous access to and the right to export all "
                 "such data at any time. Data shall be retained in formats acceptable to the OEM (Linyang) "
                 "for warranty claims and to any applicable regulatory authority."),
                # NEGOTIATE: Availability LD cap 20% → 50% of annual Service Fee
                ("The maximum Availability Liquidated Damages payable in any year shall not exceed "
                 "twenty percent (20%) of the annual Service Fee.",
                 "The maximum Availability Liquidated Damages payable in any year shall not exceed "
                 "fifty percent (50%) of the annual Service Fee per Park. This cap shall not apply "
                 "to wilful default or gross negligence by the Service Provider."),
                # NEGOTIATE: Remove 'sole remedy' (§9.6) — client may claim for wilful default/gross negligence/safety
                # Note: the source uses a standard apostrophe in "Client's"
                ("The Availability Liquidated Damages set out in this Section shall be the Client's "
                 "sole and exclusive remedy for failure to achieve the Availability Guarantee, and "
                 "the Client shall not be entitled to claim additional damages for unavailability "
                 "beyond the Liquidated Damages.",
                 "The Availability Liquidated Damages set out in this Section are the agreed primary "
                 "remedy for ordinary failure to achieve the Availability Guarantee. They shall not "
                 "exclude the Client's right to claim for wilful default, gross negligence, or "
                 "repeated safety incidents by the Service Provider, for which the general liability "
                 "provisions of Section 14 apply."),
                # NEGOTIATE: Liability cap 12 months → 24 months
                ("The Service Provider's total aggregate liability under this Agreement shall not "
                 "exceed the total Service Fees paid by the Client in the twelve (12) months "
                 "preceding the claim.",
                 "The Service Provider's total aggregate liability under this Agreement shall not "
                 "exceed the total Service Fees paid by the Client in the twenty-four (24) months "
                 "preceding the claim. This cap shall not apply to wilful misconduct, gross "
                 "negligence, fraud, breach of confidentiality, or the carve-outs in Section 14.3."),
                # NEGOTIATE: Remove CPI+2% escalation — fees locked
                ("The Service Fee may be adjusted annually on each anniversary of the Effective "
                 "Date, by an amount not exceeding the Cyprus Consumer Price Index (CPI) increase "
                 "for the preceding twelve (12) months, plus two percent (2%).",
                 "The Service Fee is fixed for the Initial Term (five (5) years). No adjustment "
                 "shall apply during the Initial Term. After the Initial Term, the Service Fee "
                 "may be adjusted only by written agreement of both Parties."),
                # NEGOTIATE: Scheduled downtime 10 days → 2 days (accepted)
                ("Total Scheduled Downtime shall not exceed ten (10) days per calendar year, "
                 "distributed across preventive maintenance visits, OEM service windows, and "
                 "system health checks.",
                 "Total Scheduled Downtime shall not exceed two (2) days (48 hours) per Park per "
                 "calendar year, excluding Force Majeure events. Maintenance visits shall be "
                 "pre-scheduled at least thirty (30) days in advance, confirmed by the Client, "
                 "and performed in low-dispatch windows (preferably between 04:00 and 08:00 local "
                 "time). Scheduled Downtime exceeding 48 consecutive hours per Park requires the "
                 "Client's prior written approval except for safety emergencies."),
                # NEGOTIATE: Availability stays group level — rename header and add explanatory note.
                # Target the original source text for the paragraph (before any other rewrite touches it).
                ("9.2A Group-Level Rationale",
                 "9.2A Group-Level Availability Rationale and LD Protection"),
                # This paragraph is the one that in the source reads "The 97% Availability Guarantee
                # applies at the group portfolio level..." — the "reflects the portfolio pricing basis"
                # rewrite also targets it, so we combine both into one final form here.
                ("The 97% Availability Guarantee applies at the group portfolio level, not per "
                 "individual park. This means that an isolated park outage does not constitute a "
                 "breach of the guarantee provided the weighted average availability across all "
                 "active parks exceeds 97%. This structure reflects the portfolio pricing basis "
                 "under which the Tier C service fee was calculated and enables the Service "
                 "Provider to allocate resources efficiently across the Client's park portfolio.",
                 "The 97% Availability Guarantee applies at the Project level across Galascope 1 "
                 "and Galascope 2 in aggregate, consistent with the Parties\u2019 agreement. An isolated "
                 "park outage does not constitute a breach of the guarantee provided the weighted "
                 "average availability across both Project parks exceeds 97%. This structure was "
                 "agreed by the Parties and reflects the aggregated (project-level) basis under which "
                 "the Tier C service fee was agreed. Note: the group-level calculation does not "
                 "eliminate the financial consequence of individual park underperformance \u2014 the "
                 "Availability LD cap has been increased to fifty percent (50%) of the annual "
                 "Service Fee (Section 9.5) to provide meaningful compensation even where one "
                 "park drives the shortfall. The Parties acknowledge that requiring per-park 97% "
                 "guarantees on individual smaller parks would require a materially higher service "
                 "fee and was not the basis on which the Tier C fee was agreed."),
                # NEGOTIATE: Spare parts — critical sub-components; counter on transformer (TBD)
                ("(d) Critical spare parts include, at minimum:",
                 "(d) Critical spare parts stocked in the local warehouse include, at minimum: "
                 "(Note: full transformer unit stocking is subject to further discussion given the "
                 "distinct transformer ratings across Galascope 1 and Galascope 2; the Parties shall "
                 "agree a transformer-spares arrangement within thirty (30) days of the LTSA "
                 "Effective Date. In the interim, the Service Provider commits to a four (4) week "
                 "OEM supply lead-time for transformer units.) Critical sub-components include:"),
                # NEGOTIATE (accept client): termination for convenience — Client 90 days / SP 12 months
                ("Either Party may terminate this Agreement for convenience by providing one "
                 "hundred eighty (180) days' written notice.",
                 "The Client may terminate this Agreement for convenience by providing ninety (90) "
                 "days' written notice. The Service Provider may terminate for convenience only "
                 "after the Initial Term, by providing twelve (12) months' written notice, provided "
                 "that such termination shall not prejudice warranty, data-handover or transition "
                 "obligations."),
                # NEGOTIATE (accept client): systemic SOH underperformance trigger 5% -> 3%
                ("(b) SYSTEMIC UNDERPERFORMANCE (affecting 5% or more of total capacity):",
                 "(b) SYSTEMIC UNDERPERFORMANCE (affecting 3% or more of total capacity):"),
                ("(Affecting \u2265 5% of total system capacity)",
                 "(Affecting \u2265 3% of total system capacity)"),
                # NEGOTIATE (item 7): €1,740/MWh/yr all-in rate INCLUDING the EMS/SCADA subscription
                ("SELECTED SERVICE TIER: \u2610 Tier A  \u2610 Tier B  \u2610 Tier C",
                 "SELECTED SERVICE TIER: \u2610 Tier A  \u2610 Tier B  \u2612 Tier C (default)\n"
                 "AGREED ALL-IN RATE: EUR 1,740 / MWh / Year, which is inclusive of the DISPERON "
                 "EMS/SCADA software subscription (i.e. the EMS subscription is NOT charged "
                 "separately on top of this rate). This all-in Tier C rate is the rate agreed for "
                 "this Project."),
                # ACCEPT: Scheduled downtime 240h/10 days reference in Schedule 4
                ("(maximum 240 hours / 10 days per year)",
                 "(maximum 48 hours / 2 days per year per Park)"),
                # AGREED SLA RESPONSE TIMES (settled Jul 2026)
                # Critical: immediate remote, 30-min ack, 24h on-site
                ("(a) Critical Alerts: Initial remote response within four (4) hours; on-site "
                 "attendance (if required) by the end of the next Business Day. For any safety "
                 "risk the Service Provider shall apply immediate remote isolation or safe-shutdown.",
                 "(a) Critical Alerts: Initial remote response immediately upon alert generation "
                 "(automated 24/7 platform); duty technician acknowledgement within thirty (30) "
                 "minutes; on-site attendance (if required) within twelve (12) hours. "
                 "For any safety risk the Service Provider shall apply immediate remote isolation "
                 "or safe-shutdown command without waiting for acknowledgement."),
                # Major: 4h remote, 6h on-site
                ("(b) Major Alerts: Initial remote response within one (1) Business Day; "
                 "on-site attendance (if required) within five (5) Business Days.",
                 "(b) Major Alerts: Initial remote response within four (4) hours; on-site "
                 "attendance (if required) within six (6) hours of the alert."),
                # Minor: 12h remote, 5 Business Days on-site
                ("(c) Minor Alerts: Initial remote response within forty-eight (48) hours; "
                 "on-site attendance (if required) at the next scheduled maintenance visit "
                 "or within five (5) business days, whichever is sooner.",
                 "(c) Minor Alerts: Initial remote response within twelve (12) hours; on-site "
                 "attendance (if required) at the next scheduled maintenance visit or within "
                 "five (5) Business Days, whichever is sooner."),
                # Auto-escalation: 30 minutes (was 1 hour)
                ("If the primary duty technician does not acknowledge a Critical Alert within "
                 "one (1) hour, the Monitoring Platform shall automatically escalate the alert "
                 "to the backup technician ",
                 "If the primary duty technician does not acknowledge a Critical Alert within "
                 "thirty (30) minutes, the Monitoring Platform shall automatically escalate "
                 "the alert to the backup technician "),
                # Management escalation trigger: 2 hours (was 4 hours)
                ("If on-site attendance has not been dispatched within four (4) hours of a "
                 "Critical Alert, the operations manager shall escalate",
                 "If on-site attendance has not been dispatched within two (2) hours of a "
                 "Critical Alert, the operations manager shall escalate"),
                # ACCEPT: Schedule 2 note — must be completed before signing
                ("SYSTEM CAPACITY: [●] MWh",
                 "SYSTEM CAPACITY: 30 MWh (Galascope 1: 20.06 MWh + Galascope 2: 10.03 MWh)\n"
                 "NOTE: Schedule 2 (Tier selection, annual fees, warranty-extension elections and EMS/SCADA "
                 "subscription) must be completed and agreed by both Parties before this Agreement is signed. "
                 "No blank fields shall remain at the time of execution."),
            ]
        )
        print("  fixed + copied -> 03-LTSA-Galascope-G1-G2.docx")
    else:
        print(f"  !! MISSING: {ltsa_src}")

    # EMS addendum — copy with inline LTSA reference fix (LCY-LTSA-GAL-B1-2026 → LCY-LTSA-GAL-2026)
    ems_src = CONTRACTS / "EMS-Subscription-Galascope-may2026.docx"
    ems_dest = PKG / "07-EMS-Subscription-Addendum.docx"
    if ems_src.exists():
        _fix_docx_text(ems_src, ems_dest, replacements=[
            ("LCY-LTSA-GAL-B1-2026", "LCY-LTSA-GAL-2026"),
        ], rewrites=[
            ("invoiced annually in advance from the PAC date",
             "The subscription fee of EUR 12,000.00 per year (ex VAT) is invoiced annually in advance "
             "from the PAC date (set per the EPC Delivery Schedule confirmed at Connection Terms). "
             "Payment due within 30 days of invoice. Fee is exclusive of VAT (19%). For the avoidance "
             "of doubt, while the LTSA (LCY-LTSA-GAL-2026) is in force this EMS/SCADA subscription is "
             "included within the all-in LTSA Service Fee of EUR 1,740/MWh/Year and is not invoiced "
             "separately in addition to it. The standalone pricing in this Addendum applies only if "
             "the Client exits or terminates the LTSA and the EMS subscription continues on a "
             "standalone basis; for as long as the LTSA remains in force the EMS subscription is "
             "included in the LTSA Service Fee and is not charged separately."),
            ("persists for the lifetime",
             "The Linyang OEM product warranty and Direct Warranty Undertaking survive termination of the "
             "Lighthief\u2013Linyang Distribution Agreement, so OEM product cover does not depend on that "
             "arrangement. The BMS northbound communication interface (Modbus TCP / RS485) is a standard "
             "OEM interface, and its compatibility with the DISPERON EMS is confirmed in the Technical "
             "Agreement. Continuity of DISPERON EMS data access is provided under this Subscription "
             "Agreement and is not contingent on the Distribution Agreement."),
        ])
        print("  fixed + copied -> 07-EMS-Subscription-Addendum.docx")
    else:
        print(f"  !! MISSING: {ems_src}")


if __name__ == "__main__":
    build_epc_v6()
    build_cover_note()
    copy_attachments()
    print("\nDONE. Package folder:", PKG)
