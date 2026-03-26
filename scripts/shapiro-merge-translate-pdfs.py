"""
Merge Individual_Shapiro ST-MLP PDFs into one document with English text
followed by original Polish pages (figures/layout preserved).

Requires: python -m pip install pymupdf deep-translator

Usage (from repo root):
  python -u scripts/shapiro-merge-translate-pdfs.py
  python -u scripts/shapiro-merge-translate-pdfs.py --limit 2   # first N PDFs only
"""
from __future__ import annotations

import argparse
import html
import re
import sys
import time
from pathlib import Path

import fitz
from deep_translator import GoogleTranslator

FOLDER = Path(__file__).resolve().parents[1] / "docs" / "clients" / "Individual_Shapiro"
OUTPUT_NAME = "ST_MLP_Shapiro_merged_English-text_plus_Polish-originals.pdf"
COVER_NOTE = """\
Lighthief — ST / MLP battery specifications (Shapiro portfolio)

This PDF combines all site variants from Individual_Shapiro.

Structure for each file:
  1) English — machine translation of extractable text (Google Translate via deep-translator).
  2) Original Polish — full PDF pages (diagrams, tables, and layout unchanged).

Use the Polish section for authoritative wording; use the English section for quick reading.
"""


def extract_pdf_text(pdf_path: Path) -> str:
    doc = fitz.open(str(pdf_path))
    parts: list[str] = []
    for i in range(doc.page_count):
        parts.append(doc[i].get_text("text"))
    doc.close()
    text = "\n\n".join(parts)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text


def translate_pl_to_en(text: str, translator: GoogleTranslator, delay_s: float) -> str:
    text = text.strip()
    if not text:
        return ""
    max_chunk = 4500
    chunks: list[str] = []
    start = 0
    n = len(text)
    while start < n:
        end = min(start + max_chunk, n)
        if end < n:
            # break at paragraph or space
            cut = text.rfind("\n\n", start, end)
            if cut == -1 or cut < start + 500:
                cut = text.rfind(" ", start, end)
            if cut > start + 200:
                end = cut
        chunk = text[start:end].strip()
        start = end
        if not chunk:
            continue
        for attempt in range(4):
            try:
                chunks.append(translator.translate(chunk))
                break
            except Exception as e:
                wait = 2.0 * (attempt + 1)
                print(f"  translate retry in {wait}s: {e}", file=sys.stderr)
                time.sleep(wait)
        else:
            chunks.append(f"[Translation failed for chunk: {chunk[:80]}...]")
        time.sleep(delay_s)
    return "\n\n".join(chunks)


def _paragraph_chunks(text: str, max_chars: int = 9000) -> list[str]:
    """Split text into chunks at paragraph boundaries for one HTML box per page."""
    paras = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks: list[str] = []
    buf: list[str] = []
    n = 0
    for p in paras:
        if n + len(p) + 2 > max_chars and buf:
            chunks.append("\n\n".join(buf))
            buf = [p]
            n = len(p)
        else:
            buf.append(p)
            n += len(p) + 2
    if buf:
        chunks.append("\n\n".join(buf))
    return chunks if chunks else ([text.strip()] if text.strip() else [])


def _html_fragment_for_body(body: str) -> str:
    body = html.escape(body)
    parts = []
    for para in body.split("\n\n"):
        if not para.strip():
            continue
        inner = para.replace("\n", "<br/>")
        parts.append(f"<p>{inner}</p>")
    inner_html = "".join(parts) if parts else "<p>(empty)</p>"
    return (
        '<div style="font-size:9pt;font-family:sans-serif;line-height:1.25;color:#111;">'
        f"{inner_html}</div>"
    )


def append_fitting_text_pages(doc: fitz.Document, title: str, body: str) -> None:
    """Lay out translated text with insert_htmlbox (insert_textbox fails for long blocks in PyMuPDF)."""
    margin = 50
    w, h = 595, 842
    chunks = _paragraph_chunks(body.strip() or "(No extractable text.)", max_chars=9000)
    if not chunks:
        chunks = ["(No extractable text.)"]

    for i, chunk in enumerate(chunks):
        page = doc.new_page(width=w, height=h)
        if i == 0:
            html_content = (
                f'<h2 style="font-size:12pt;margin:0 0 8px 0;font-family:sans-serif;">'
                f"{html.escape(title)}</h2>"
                + _html_fragment_for_body(chunk)
            )
            rect = fitz.Rect(margin, margin + 6, w - margin, h - margin)
        else:
            html_content = _html_fragment_for_body(chunk)
            rect = fitz.Rect(margin, margin, w - margin, h - margin)
        page.insert_htmlbox(rect, html_content)


def main() -> int:
    ap = argparse.ArgumentParser(description="Merge Shapiro ST-MLP PDFs with EN translation + PL originals.")
    ap.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Process only the first N PDFs (0 = all).",
    )
    args = ap.parse_args()

    if not FOLDER.is_dir():
        print(f"Missing folder: {FOLDER}", file=sys.stderr)
        return 1

    pdfs = sorted(FOLDER.glob("ST_MLP_*.pdf"))
    pdfs = [p for p in pdfs if p.name != OUTPUT_NAME]
    if args.limit and args.limit > 0:
        pdfs = pdfs[: args.limit]
    if not pdfs:
        print(f"No ST_MLP_*.pdf files in {FOLDER}", file=sys.stderr)
        return 1

    out_path = FOLDER / OUTPUT_NAME
    translator = GoogleTranslator(source="pl", target="en")
    merged = fitz.open()

    # Cover (HTML — plain textbox is unreliable for multi-line blocks here)
    p0 = merged.new_page(width=595, height=842)
    cover_html = (
        '<div style="font-size:11pt;font-family:sans-serif;line-height:1.35;">'
        f"<p>{html.escape(COVER_NOTE).replace(chr(10), '<br/>')}</p></div>"
    )
    p0.insert_htmlbox(fitz.Rect(50, 50, 545, 790), cover_html)

    for i, pdf_path in enumerate(pdfs, 1):
        print(f"[{i}/{len(pdfs)}] {pdf_path.name}", flush=True)
        pl_text = extract_pdf_text(pdf_path)
        print(f"  extracted {len(pl_text)} chars (PL)", flush=True)
        en_text = translate_pl_to_en(pl_text, translator, delay_s=0.4)
        print(f"  translated {len(en_text)} chars (EN)", flush=True)
        section_title = f"English — {pdf_path.stem}"
        append_fitting_text_pages(merged, section_title, en_text)

        src = fitz.open(str(pdf_path))
        merged.insert_pdf(src)
        src.close()

    merged.save(out_path, garbage=4, deflate=True)
    merged.close()
    print(f"Wrote {out_path}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
