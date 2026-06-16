import os, sys, datetime
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
b = r"L:\My Drive\LINYANG\BESS CLIENTS\Individual_60-120-standalone"
for f in sorted(os.listdir(b)):
    if any(k in f.lower() for k in ("clarif", "response", "answer", "reply")):
        sz = os.path.getsize(os.path.join(b, f))
        mt = datetime.datetime.fromtimestamp(os.path.getmtime(os.path.join(b, f)))
        print(f"{mt.strftime('%Y-%m-%d %H:%M')}  {sz//1024:>6} KB  {f}")
