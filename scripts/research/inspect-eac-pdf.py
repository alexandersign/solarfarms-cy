# -*- coding: utf-8 -*-
"""Inspect raw table extraction from an EAC PDF to debug parsing."""
import sys, io
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import pdfplumber

pdf_path = Path(sys.argv[1])
print(f"Inspecting: {pdf_path.name}  ({pdf_path.stat().st_size//1024} KB)")

with pdfplumber.open(pdf_path) as pdf:
    print(f"Pages: {len(pdf.pages)}")
    for i, page in enumerate(pdf.pages):
        tables = page.extract_tables() or []
        print(f"\n--- Page {i+1}: {len(tables)} table(s) ---")
        for ti, table in enumerate(tables):
            print(f"  Table {ti+1}: {len(table)} rows x {max(len(r) for r in table) if table else 0} cols")
            for row in table[:5]:
                print(f"    {row}")
        # Also try words
        words = page.extract_words()
        if not tables and words:
            print(f"  No tables, but {len(words)} words found (PDF may use text, not table structure)")
            sample = " ".join(w['text'] for w in words[:30])
            print(f"  Sample text: {sample}")
