import json
import sys
import urllib.request
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_btc, run_backtest, stoch_rsi

df = fetch_btc("1d", 80)
k, d = stoch_rsi(df["close"])
print("CURRENT DAILY BTCUSDT")
print(f"  Price: {df['close'].iloc[-1]:,.0f}")
print(f"  StochRSI K: {k.iloc[-1]:.1f}  D: {d.iloc[-1]:.1f}")
print(f"  Max K last 30d: {k.iloc[-30:].max():.1f}")
trades = run_backtest(df, entry_mode="cross_down_25")
open_t = [t for t in trades if t.return_pct is None]
if open_t:
    t = open_t[0]
    u = (df["close"].iloc[-1] / t.entry_price - 1) * 100
    print(f"  Open 25/75 signal: since {t.entry_time.date()} @ {t.entry_price:,.0f} ({u:+.1f}%)")
else:
    print("  No open 25/75 entry signal")

r = urllib.request.urlopen(
    "https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=6", timeout=10
)
fr = json.loads(r.read())
print("\nRECENT FUNDING (8h intervals, longs pay when positive):")
for x in fr:
    ts = pd.to_datetime(x["fundingTime"], unit="ms")
    print(f"  {ts.strftime('%Y-%m-%d %H:%M')} UTC: {float(x['fundingRate'])*100:+.4f}%")
