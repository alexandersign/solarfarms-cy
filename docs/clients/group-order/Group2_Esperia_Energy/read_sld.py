import fitz, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

sld_path = r'L:\My Drive\LINYANG\BESS CLIENTS\GROUP ORDER CY\Group2_Esperia_Energy\Esperia Energy Group\Galascope_2.5MW_SLD_MCTS.PDF'
doc = fitz.open(sld_path)
page = doc[0]

print(f"Page size: {page.rect.width:.0f} x {page.rect.height:.0f} pt")
print()

# Extract all text with detail
d = page.get_text('dict')
all_text = []
for blk in d.get('blocks', []):
    for line in blk.get('lines', []):
        for span in line.get('spans', []):
            t = span.get('text', '').strip()
            if t and len(t) > 1:
                sz = span.get('size', 0)
                x = span.get('bbox', [0])[0]
                y = span.get('bbox', [0,0,0,1])[3]
                all_text.append((y, x, sz, t))

# Sort by Y position (top to bottom)
all_text.sort()
print(f"Total text spans: {len(all_text)}")
print()
for y, x, sz, t in all_text:
    print(f"  {sz:4.0f}pt  x={x:6.0f}  y={y:6.0f}  |  {t}")
