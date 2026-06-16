"""OCR image-based PDFs using PyMuPDF (render) + Tesseract (OCR).

Usage:
    python scripts/ocr-pdf.py "path/to/file.pdf"          # print to stdout
    python scripts/ocr-pdf.py "path/to/file.pdf" --save   # save as .ocr.txt alongside PDF
    python scripts/ocr-pdf.py "L:/My Drive/.../folder"    # OCR all PDFs in folder missing text

Requires: pymupdf (pip install pymupdf), pytesseract (pip install pytesseract)
Tesseract binary: C:\\Program Files\\Tesseract-OCR\\tesseract.exe  (auto-configured)
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

import fitz  # PyMuPDF
import pytesseract
from PIL import Image

TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

# DPI for rendering — 200 is fast/good; 300 is better for small text; 150 for quick preview
RENDER_DPI = 250


def has_text(path: Path, threshold: int = 50) -> bool:
    """Return True if the PDF already has extractable text (above threshold chars/page avg)."""
    doc = fitz.open(path)
    total = sum(len(p.get_text().strip()) for p in doc)
    avg = total / max(len(doc), 1)
    doc.close()
    return avg >= threshold


def ocr_pdf(path: Path, dpi: int = RENDER_DPI) -> str:
    """Render each page as an image and OCR it. Returns full text."""
    doc = fitz.open(path)
    parts = []
    mat = fitz.Matrix(dpi / 72, dpi / 72)  # scale factor
    for page_num, page in enumerate(doc, 1):
        pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        text = pytesseract.image_to_string(img, lang="eng", config="--psm 3")
        parts.append(f"-- page {page_num} of {len(doc)} --\n\n{text.strip()}")
    doc.close()
    return "\n\n".join(parts)


def extract_or_ocr(path: Path, force_ocr: bool = False) -> str:
    """Try native text extraction first; fall back to OCR if image-based."""
    if not force_ocr and has_text(path):
        doc = fitz.open(path)
        pages = []
        for i, page in enumerate(doc, 1):
            t = page.get_text().strip()
            pages.append(f"-- page {i} of {len(doc)} --\n\n{t}")
        doc.close()
        return "\n\n".join(pages)
    print(f"  [OCR] {path.name} — image-based, running Tesseract at {RENDER_DPI} DPI...", file=sys.stderr)
    return ocr_pdf(path)


def main() -> None:
    parser = argparse.ArgumentParser(description="OCR image-based PDFs via PyMuPDF + Tesseract")
    parser.add_argument("target", help="PDF file or folder of PDFs")
    parser.add_argument("--save", action="store_true", help="Save output as .ocr.txt alongside each PDF")
    parser.add_argument("--force", action="store_true", help="Force OCR even if PDF has text")
    parser.add_argument("--dpi", type=int, default=RENDER_DPI, help=f"Render DPI (default {RENDER_DPI})")
    args = parser.parse_args()

    target = Path(args.target)
    pdfs: list[Path] = []

    if target.is_file() and target.suffix.lower() == ".pdf":
        pdfs = [target]
    elif target.is_dir():
        pdfs = sorted(target.rglob("*.pdf"))
        if not args.force:
            pdfs = [p for p in pdfs if not has_text(p)]
            if pdfs:
                print(f"Found {len(pdfs)} image-based PDF(s) in {target}", file=sys.stderr)
    else:
        print(f"Error: {target} is not a PDF or directory.", file=sys.stderr)
        sys.exit(1)

    for pdf in pdfs:
        print(f"\n{'='*80}\nFILE: {pdf.name}\n{'='*80}", file=sys.stderr)
        text = extract_or_ocr(pdf, force_ocr=args.force)
        if args.save:
            out = pdf.with_suffix(".ocr.txt")
            out.write_text(text, encoding="utf-8")
            print(f"  Saved -> {out}", file=sys.stderr)
        else:
            print(text)


if __name__ == "__main__":
    main()
