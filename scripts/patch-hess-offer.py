"""Patch the HESS offer HTML/MD files: update date, CT label, Linyang validity note."""
from pathlib import Path
import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

folder = Path(r"L:\My Drive\LINYANG\BESS CLIENTS\Individual_60-120-standalone\Offer-jul2026")

files = [
    "HESS-Psevdas-Turnkey-Offer-Rev0-jul2026.html",
    "HESS-Psevdas-Offer-Annexes-jul2026.html",
    "HESS-Psevdas-Indicative-Schedule-jul2026.html",
    "HESS-Psevdas-Cover-Email-jul2026.md",
]

for fn in files:
    fp = folder / fn
    txt = fp.read_text(encoding="utf-8")
    orig = txt

    # 1. Date
    txt = txt.replace("20 July 2026", "23 July 2026")
    txt = txt.replace("20&nbsp;July&nbsp;2026", "23&nbsp;July&nbsp;2026")

    # 2. CT compliance status: b-dev OPEN -> b-confirm CONFIRM at design freeze (HTML files)
    txt = txt.replace(
        'class="b b-dev">OPEN</span>',
        'class="b b-confirm">CONFIRM</span>'
    )
    txt = txt.replace(
        '<span class="b b-dev">OPEN</span> to be fixed at design freeze',
        '<span class="b b-confirm">CONFIRM</span> value confirmed at design freeze'
    )

    # 3. Add Linyang validity note in the main offer only
    if "Turnkey-Offer" in fn:
        OLD = "firm Linyang supply quotation plus assumed balance-of-plant budgets.</p>"
        NEW = (
            "firm Linyang supply quotation (Katherine Lu, 2\u00a0Jul\u00a02026) "
            "plus assumed balance-of-plant budgets. "
            "<strong>BESS equipment pricing is subject to confirmation on award; "
            "quotation validity expires 1\u00a0August\u00a02026.</strong></p>"
        )
        txt = txt.replace(OLD, NEW)

    if txt != orig:
        fp.write_text(txt, encoding="utf-8")
        print(f"Updated: {fn}")
    else:
        print(f"No change:  {fn}")
