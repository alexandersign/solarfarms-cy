import os, sys, datetime
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
b = r"L:\My Drive\LINYANG\BESS CLIENTS\Individual_60-120-standalone"
rows = []
for root, dirs, files in os.walk(b):
    dirs[:] = [d for d in dirs if d not in ["__pycache__", ".git"]]
    for f in sorted(files):
        if f in ("desktop.ini",) or f.endswith(".ocr.txt"):
            continue
        fp = os.path.join(root, f)
        mt = datetime.datetime.fromtimestamp(os.path.getmtime(fp))
        sz = os.path.getsize(fp) // 1024
        rel = os.path.relpath(fp, b)
        rows.append((mt, sz, rel))
for mt, sz, rel in sorted(rows, key=lambda x: x[0], reverse=True):
    ts = mt.strftime("%m-%d %H:%M")
    print(f"{ts}  {sz:>6}KB  {rel}")
