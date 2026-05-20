"""
Analyze trailing stop fill assumptions vs gaps/slippage on BTC daily.
Uses same entry/exit logic as strategy from Feb 22 2023.
"""

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START_DATE = pd.Timestamp("2023-02-22", tz="UTC")
LB, BUY, SELL, TRAIL = 30, 25, 75, 2.0


def analyze_trades(df: pd.DataFrame) -> list[dict]:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    o = df["open"].values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index
    dow = pd.Series(times).dt.dayofweek.values

    rows = []
    in_pos = False
    started = ep = pp = 0.0
    entry_i = 0

    for i in range(LB + 1, len(df)):
        if times[i] < START_DATE:
            continue
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LB) : i]) >= SELL

        if not in_pos:
            if dow[i] in (5, 6):
                continue
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                started = in_pos = True
                ep = c[i]
                pp = h[i]
                entry_i = i
            elif not started:
                continue
        else:
            pp = max(pp, h[i])
            trail_stop = pp * (1 - TRAIL / 100)
            prev_close = c[i - 1]

            ex = reason = None
            if dow[i] == 4 and c[i] < ep:
                ex, reason = c[i], "fri_loss"
            elif lo[i] <= trail_stop:
                ex, reason = trail_stop, "trail"
            elif kv[i - 1] < SELL <= kv[i]:
                ex, reason = c[i], "stoch75"

            if ex is not None:
                # Gap / slippage metrics for trail exits
                gap_open_below_trail = False
                open_slippage_pct = 0.0
                worst_fill_vs_trail = 0.0
                if reason == "trail":
                    # If bar opens already below trail, stop-market fills ~at open (worse)
                    if o[i] < trail_stop:
                        gap_open_below_trail = True
                        open_slippage_pct = (o[i] / trail_stop - 1) * 100  # negative = worse
                    # Worst realistic fill = low of bar (if stop triggered intrabar)
                    worst_fill_vs_trail = (lo[i] / trail_stop - 1) * 100

                rows.append({
                    "entry": times[entry_i].date(),
                    "exit": times[i].date(),
                    "reason": reason,
                    "entry_px": ep,
                    "exit_assumed": ex,
                    "trail_stop": trail_stop if reason == "trail" else None,
                    "open": o[i],
                    "low": lo[i],
                    "gap_open_below_trail": gap_open_below_trail,
                    "open_slippage_pct": open_slippage_pct,
                    "worst_vs_trail_pct": worst_fill_vs_trail,
                    "ret_assumed": (ex / ep - 1) * 100,
                    "ret_at_open_if_gap": (o[i] / ep - 1) * 100 if reason == "trail" else None,
                    "dow_exit": int(dow[i]),
                })
                in_pos = False

    return rows


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=1200)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 1500, start_ms=start_ms)
    trades = analyze_trades(df)

    trail = [t for t in trades if t["reason"] == "trail"]
    n_trail = len(trail)
    gap_opens = [t for t in trail if t["gap_open_below_trail"]]
    bad_slip = [t for t in trail if t["worst_vs_trail_pct"] < -0.5]  # >0.5% worse than trail

    print("=" * 72)
    print("FEES USED IN OUR BACKTESTS")
    print("=" * 72)
    print("  Applied:  0.05% per side on NOTIONAL (10x taker rate, VIP 0)")
    print("  NOT applied: funding (8h), BNB 10% discount, maker rebates")
    print("  Binance USDT-M VIP0: maker 0.02%, taker 0.05%")
    print("  With BNB pay: taker ~0.045% per side")
    print("  Trail/stoch exits modeled as TAKER (realistic for stop-market)")

    print("\n" + "=" * 72)
    print(f"STOP FILL ANALYSIS | {START_DATE.date()} -> {df.index[-1].date()}")
    print(f"2% trailing stop | {len(trades)} total exits | {n_trail} trail exits")
    print("=" * 72)

    print(f"\n1) GAP OPEN below trail stop (bar opens past stop — can't fill AT trail):")
    print(f"   Count: {len(gap_opens)} / {n_trail} trail exits ({100*len(gap_opens)/max(n_trail,1):.1f}%)")
    for t in gap_opens:
        print(
            f"   {t['exit']} open ${t['open']:,.0f} vs trail ${t['trail_stop']:,.0f} "
            f"({t['open_slippage_pct']:+.2f}% vs trail) | ret@open {t['ret_at_open_if_gap']:+.1f}%"
        )

    print(f"\n2) Intrabar low >0.5% BELOW trail (slippage risk even if open OK):")
    print(f"   Count: {len(bad_slip)} / {n_trail} ({100*len(bad_slip)/max(n_trail,1):.1f}%)")

    print(f"\n3) All BTC daily bars (context) — gap down open vs prev close:")
    sub = df[df.index >= START_DATE]
    prev_c = sub["close"].shift(1)
    gap_pct = (sub["open"] / prev_c - 1) * 100
    print(f"   Bars with open gap down > 2%: {(gap_pct < -2).sum()} / {len(sub)}")
    print(f"   Bars with open gap down > 5%: {(gap_pct < -5).sum()} / {len(sub)}")
    print(f"   Mon open gap down > 2% (weekend gap): {sum((gap_pct < -2) & (sub.index.dayofweek==0))}")

    print(f"\n4) Weekend-adjacent trail exits (Fri/Sat/Sun/Mon):")
    wk = [t for t in trail if t["dow_exit"] in (0, 4, 5, 6)]
    wk_gap = [t for t in wk if t["gap_open_below_trail"]]
    print(f"   Trail exits on Fri/Mon etc: {len(wk)} | with gap-open: {len(wk_gap)}")

    # Fee impact estimate on 162k final from feb 2023
    n = len(trades)
    avg_notional_pct = 0.05 / 100 * 2 * 10  # 0.05% * 2 sides * 10x on equity... rough
    print("\n" + "=" * 72)
    print("FEE DRAG ESTIMATE (46 trades, compound path)")
    print("=" * 72)
    print("  Exact fee drag depends on equity path; rough: 0.05% x 2 x 10x = 1% of equity per round trip")
    print(f"  x ~{n} trades => material but far smaller than compound gains in backtest")
    print("  Funding: often +0.01-0.03%/day on longs at 10x notional — adds up on multi-week holds")
    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
