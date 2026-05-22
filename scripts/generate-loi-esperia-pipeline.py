"""
Generate LOI — Esperia Energy Group pipeline only (9 parks, no Galascope).

Output: docs/clients/group-order/Group2_Esperia_Energy/contracts/
        LOI-Esperia-Energy-pipeline-may2026.docx

Galascope has a separate LOI: generate-loi-galascope.py
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from loi_docx_common import (  # noqa: E402
    AMBER_HDR,
    AMBER_HEX,
    AMBER_TXT,
    CLIENT_REP_TITLE_ESPERIA,
    ESPERIA_CLIENT_ADDRESS,
    GREY,
    LIGHT_HEX,
    client_rep_line,
    NAVY,
    NAVY_HEX,
    PIPELINE,
    PIPELINE_PHASE_LABELS,
    PIPELINE_PHASE_EPC_TARGET,
    PIPELINE_PHASE_ORDER,
    PIPELINE_SCHEDULE_COLS,
    PIPELINE_SCHEDULE_RC,
    WHITE,
    add_clause_1_3,
    add_clause_6_good_faith,
    add_clause_7_exclusivity,
    add_footer,
    add_pipeline_price_footnotes,
    add_header_bar,
    add_parties_table,
    add_price_mechanism_section,
    add_run,
    add_signatures,
    body,
    fmt_eur,
    h1,
    lock_table_widths,
    new_document,
    pipeline_phase_totals,
    pipeline_price_display,
    set_cell_bg,
    tbl_hdr,
    tbl_row,
)
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt

REF = "Ref: LCY-LOI-ESP-PIPELINE-2026-R13"
N_PARKS = 9

PIPELINE_ONLY = PIPELINE["phase1"] + PIPELINE["phase2"] + PIPELINE["phase3"]
TOTAL_MW = sum(p["mw"] for p in PIPELINE_ONLY)
TOTAL_MWH = sum(p["mwh"] for p in PIPELINE_ONLY)
TOTAL_VAL = sum(p["client_price"] for p in PIPELINE_ONLY)
PHASE_TOTALS = pipeline_phase_totals()


def build():
    doc = new_document()
    add_header_bar(doc, REF)

    tp = doc.add_paragraph()
    add_run(tp, "Letter of Intent", bold=True, size_pt=18, color=NAVY)
    sp = doc.add_paragraph()
    add_run(
        sp,
        "Esperia Energy Group — BESS Pipeline Commitment (Schedule 1)",
        italic=True,
        size_pt=11,
        color=GREY,
    )

    add_parties_table(
        doc,
        "Esperia Energy Group\n"
        + ESPERIA_CLIENT_ADDRESS
        + "\n"
        + client_rep_line(CLIENT_REP_TITLE_ESPERIA)
        + "(hereinafter \"the Client\")",
    )

    h1(doc, "RECITALS")
    for letter, text in [
        ("A.", "Lighthief supplies and installs grid-connected BESS for hybrid PV projects in Cyprus."),
        ("B.", "The Client (Esperia Energy Group) develops BESS projects in Famagusta, Limassol, and Nicosia."),
        (
            "C.",
            f"The Client wishes to commit to the nine (9) pipeline parks in Schedule 1 "
            f"({TOTAL_MW:.1f} MW / {TOTAL_MWH:.1f} MWh). Galascope 1 and Galascope 2 are "
            "covered under a separate Letter of Intent with Galascope Ltd (Ref: LCY-LOI-GAL-B1-2026).",
        ),
    ]:
        rp = doc.add_paragraph()
        rp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        add_run(rp, letter + "  ", bold=True, color=NAVY)
        add_run(rp, text)
    body(doc, "NOW THEREFORE, the Parties agree as follows:", space_after=8)

    h1(doc, "1.   COMMITMENT AND PURPOSE")
    body(
        doc,
        f"1.1  The Client confirms its intention to award BESS EPC contracts to Lighthief for "
        f"nine (9) parks in Schedule 1 ({TOTAL_MW:.1f} MW / {TOTAL_MWH:.1f} MWh). Combined "
        f"indicative value {fmt_eur(TOTAL_VAL)} (excl. VAT), based on Linyang quotation "
        f"LY202601271 and group-order pricing. This LOI does not include Galascope Ltd parks.",
    )
    body(
        doc,
        "1.2  This LOI supports Lighthief's procurement and OEM planning. Except where "
        "expressly stated as binding below, this LOI is not an obligation to sign any EPC; "
        "each phase EPC is binding only when signed.",
    )
    add_clause_1_3(doc, reimbursement_cap=400_000)

    h1(doc, "2.   SCHEDULE 1 — PARKS AND INDICATIVE PRICING")

    mx_tbl = doc.add_table(rows=1, cols=4)
    for i, (val, lbl) in enumerate([
        (f"{N_PARKS} Parks", "Schedule 1 Total"),
        (f"{TOTAL_MW:.2f} MW", "Total BESS Power"),
        (f"{TOTAL_MWH:.1f} MWh", "Total BESS Energy"),
        (fmt_eur(TOTAL_VAL), "Indicative Value (ex. VAT)"),
    ]):
        cell = mx_tbl.rows[0].cells[i]
        set_cell_bg(cell, LIGHT_HEX)
        mp = cell.paragraphs[0]
        mp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        add_run(mp, val + "\n", bold=True, size_pt=12, color=NAVY)
        add_run(mp, lbl, size_pt=7.5, color=GREY)
    lock_table_widths(mx_tbl, [3.5, 3.5, 3.5, 3.5])

    pipe_tbl = doc.add_table(rows=1, cols=7)
    pipe_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
    tbl_hdr(
        pipe_tbl,
        [
            "Park / Project",
            "District",
            "MW",
            "MWh",
            "Indicative delivery",
            "Licence",
            "Indicative Price (ex. VAT)",
        ],
    )
    for phase_key in PIPELINE_PHASE_ORDER:
        parks = PIPELINE[phase_key]
        if not parks:
            continue
        for p in parks:
            tbl_row(
                pipe_tbl,
                [
                    p["name"],
                    p["district"],
                    f"{p['mw']:.2f}",
                    f"{p['mwh']:.1f}",
                    p["delivery"],
                    p["licence"],
                    pipeline_price_display(p),
                ],
                right_cols=PIPELINE_SCHEDULE_RC,
            )
        pt = PHASE_TOTALS[phase_key]
        tbl_row(
            pipe_tbl,
            [
                pt["label"] + " — Subtotal",
                "",
                f"{pt['mw']:.2f}",
                f"{pt['mwh']:.1f}",
                "",
                "",
                fmt_eur(pt["val"]),
            ],
            right_cols=PIPELINE_SCHEDULE_RC,
            total=True,
        )
    tbl_row(
        pipe_tbl,
        [
            f"TOTAL SCHEDULE 1  ({N_PARKS} pipeline parks)",
            "",
            f"{TOTAL_MW:.2f}",
            f"{TOTAL_MWH:.1f}",
            "",
            "",
            fmt_eur(TOTAL_VAL),
        ],
        right_cols=PIPELINE_SCHEDULE_RC,
        total=True,
    )
    lock_table_widths(pipe_tbl, PIPELINE_SCHEDULE_COLS)
    add_pipeline_price_footnotes(doc)

    h1(doc, "3.   INDICATIVE PROGRAMME")
    prog_tbl = doc.add_table(rows=1, cols=5)
    tbl_hdr(prog_tbl, ["Batch / Phase", "Parks", "MWh", "EPC target", "Indicative value (ex VAT)"])
    prog_rows = [
        (
            PIPELINE_PHASE_LABELS[k],
            str(len(PIPELINE[k])),
            PHASE_TOTALS[k]["mwh"],
            PIPELINE_PHASE_EPC_TARGET[k],
            PHASE_TOTALS[k]["val"],
        )
        for k in PIPELINE_PHASE_ORDER
    ]
    for label, n, mwh, tgt, val in prog_rows:
        tbl_row(prog_tbl, [label, n, f"{mwh:.1f}", tgt, fmt_eur(val)], right_cols={2, 3, 4})
    lock_table_widths(prog_tbl, [5.5, 1.0, 1.2, 2.0, 3.3])

    add_price_mechanism_section(
        doc,
        schedule_a_note="Effective MWh for each pipeline park will be stated in that park's phase EPC Schedule A. ",
    )

    h1(doc, "5.   NEXT STEPS")
    body(
        doc,
        "5.1  The Parties will negotiate EPCs per batch in Section 3. LTSA, EMS, and warranty "
        "terms are agreed in each EPC — not in this LOI.",
    )

    add_clause_6_good_faith(doc, per_phase_exit=True)

    add_clause_7_exclusivity(doc, carveout_galascope=True)

    h1(doc, "8.   CONFIDENTIALITY")
    body(
        doc,
        "8.1  (Binding) Each Party shall keep confidential this LOI and related information, "
        "except to advisers, lenders, or as required by law. Survives five (5) years.",
    )

    h1(doc, "9.   TERM AND GOVERNING LAW")
    body(
        doc,
        "9.1  This LOI runs until the earlier of: all Schedule 1 EPCs signed, thirty-six "
        "(36) months from signing, or termination of a phase under Section 6.",
    )
    body(doc, "9.2  Governed by Cyprus law. Cyprus courts have exclusive jurisdiction.")
    nb_tbl = doc.add_table(rows=1, cols=1)
    nb_cell = nb_tbl.rows[0].cells[0]
    set_cell_bg(nb_cell, AMBER_HEX)
    nbp = nb_cell.paragraphs[0]
    nbp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_run(nbp, "NATURE OF THIS DOCUMENT:  ", bold=True, size_pt=9, color=AMBER_HDR)
    add_run(
        nbp,
        "Non-binding except Clauses 1.3, 7, and 8. Nine (9) pipeline parks only. "
        "Galascope Ltd: LCY-LOI-GAL-B1-2026-R13. Binding price and payment terms are in each EPC.",
        size_pt=9,
        color=AMBER_TXT,
    )
    lock_table_widths(nb_tbl, [14.0])

    add_signatures(doc)
    add_footer(doc, REF)
    return doc


def save_doc(doc, filename):
    base = os.path.join(
        os.path.dirname(__file__), "..",
        "docs", "clients", "group-order", "Group2_Esperia_Energy",
    )
    contracts_dir = os.path.join(base, "contracts")
    os.makedirs(contracts_dir, exist_ok=True)
    p1 = os.path.join(contracts_dir, filename)
    doc.save(p1)
    print("Saved -> " + os.path.abspath(p1))
    try:
        doc.save(os.path.join(base, filename))
        print("Saved -> " + os.path.abspath(os.path.join(base, filename)))
    except PermissionError:
        alt = os.path.join(base, filename.replace(".docx", "-UPDATED.docx"))
        doc.save(alt)
        print("Root locked — saved -> " + os.path.abspath(alt))


if __name__ == "__main__":
    save_doc(build(), "LOI-Esperia-Energy-pipeline-may2026.docx")
