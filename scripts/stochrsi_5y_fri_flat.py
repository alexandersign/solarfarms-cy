"""5y compound @10x: original rules + Friday flat only."""

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START = 1000.0
LEV = 10
FEE = 0.0005
BUY, SELL, TRAIL = 25, 75, 2.0
LB = 30


def simulate(df: pd.DataFrame, friday_flat: bool) -> dict:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index
    dow = pd.Series(times).dt.dayofweek.values

    eq = START
    eq0 = START
    started = in_pos = False
    ep = pp = 0.0
    trades = []
    exits = {}

    for i in range(LB + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LB) : i]) >= SELL

        if not in_pos:
            if friday_flat and dow[i] in (5, 6):
                continue
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                started = in_pos = True
                ep = c[i]
                pp = h[i]
                et = times[i]
                eq0 = eq
                eq -= eq * LEV * FEE
            elif not started:
                continue
        else:
            pp = max(pp, h[i])
            ex = reason = None
            if friday_flat and dow[i] == 4:
                ex, reason = c[i], "friday"
            elif lo[i] <= pp * (1 - TRAIL / 100):
                ex, reason = pp * (1 - TRAIL / 100), "trail"
            elif lo[i] <= ep * (1 - 1 / LEV):
                ex, reason = ep * (1 - 1 / LEV), "liq"
            elif kv[i - 1] < SELL <= kv[i]:
                ex, reason = c[i], "stoch75"
            if ex:
                ret = (ex / ep - 1) * 100
                if reason == "liq":
                    eq = 0.0
                else:
                    eq = max(0.0, eq0 + eq0 * LEV * (ret / 100) - abs(eq0 * LEV * FEE))
                trades.append((et, times[i], ret, reason, eq))
                exits[reason] = exits.get(reason, 0) + 1
                in_pos = False
                if eq <= 0:
                    break

    return {
        "trades": len(trades),
        "final": eq,
        "blown": eq <= 0,
        "exits": exits,
        "first": trades[0][0].date() if trades else None,
        "last": trades[-1][1].date() if trades else None,
    }


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=365 * 5)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 2200, start_ms=start_ms)
    d0, d1 = df.index.min().date(), df.index.max().date()

    print(f"5 YEARS {d0} -> {d1} | EUR {START:.0f} | compound {LEV}x | no news")
    print("Entry: cross-down 25 after OB | Exit: 2% trail or stoch 75\n")

    for label, ff in [("No weekend rule", False), ("Friday flat (your plan)", True)]:
        r = simulate(df, ff)
        ret = (r["final"] / START - 1) * 100
        print(f"{label}:")
        print(f"  Trades: {r['trades']} ({r['first']} to {r['last']})")
        print(f"  Final:  EUR {r['final']:,.2f} ({ret:+,.1f}%)")
        print(f"  Blown:  {r['blown']} | exits: {r['exits']}\n")


if __name__ == "__main__":
    main()
