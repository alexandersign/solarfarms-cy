import os, sys, datetime
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
b = r"L:\My Drive\LINYANG\BESS CLIENTS\Individual_60-120-standalone"
files = []
for f in os.listdir(b):
    if f.endswith(('.xlsx', '.docx', '.pdf', '.zip')):
        fp = os.path.join(b, f)
        mt = datetime.datetime.fromtimestamp(os.path.getmtime(fp))
        sz = os.path.getsize(fp) // 1024
        files.append((mt, sz, f))
for mt, sz, f in sorted(files, reverse=True)[:20]:
    ts = mt.strftime("%Y-%m-%d %H:%M")
    print(f"{ts}  {sz:>7} KB  {f}")
