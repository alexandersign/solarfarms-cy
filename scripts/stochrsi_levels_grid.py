"""
Grid search: StochRSI entry/exit levels on daily BTC — 2% trail, 10x compound.
Tests 20/80, 22/73, 24/78, etc. vs baseline 25/75.
Overbought filter = sell level (K must have reached sell within 30 bars).
"""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START_EUR = 1000.0
LEVERAGE = 10
FEE = 0.0005
LOOKBACK = 30
TRAIL = 2.0

# buy, sell — symmetric + user-requested asymmetric pairs
LEVEL_PAIRS = [
    (18, 82), (20, 80), (21, 79), (22, 78), (22, 73), (23, 77),
    (24, 76), (24, 78), (25, 75), (26, 74), (27, 73), (28, 72),
    (30, 70), (30, 60), (25, 80), (20, 75),
]


def simulate(df: pd.DataFrame, buy: float, sell: float, trail: float = TRAIL) -> dict:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    closes = df["close"].values
    highs = df["high"].values
    lows = df["low"].values

    eq = START_EUR
    peak = eq
    max_dd = 0.0
    trades = wins = stoch_ex = trail_ex = 0
    in_pos = False
    ep = eq0 = 0.0
    peak_price = 0.0

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= sell

        if not in_pos:
            if was_ob and kv[i - 1] > buy >= kv[i]:
                in_pos = True
                ep = closes[i]
                peak_price = highs[i]
                eq0 = eq
                eq -= eq * LEVERAGE * FEE
        else:
            peak_price = max(peak_price, highs[i])
            exit_price = None
            reason = ""
            trail_stop = peak_price * (1 - trail / 100)
            if lows[i] <= trail_stop:
                exit_price = trail_stop
                reason = "trail"
            elif kv[i - 1] < sell <= kv[i]:
                exit_price = closes[i]
                reason = "stoch"

            if exit_price is not None:
                ret = (exit_price / ep - 1) * 100
                new_eq = max(0.0, eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE))
                trades += 1
                if new_eq > eq0:
                    wins += 1
                if reason == "stoch":
                    stoch_ex += 1
                else:
                    trail_ex += 1
                eq = new_eq
                peak = max(peak, eq)
                if peak > 0:
                    max_dd = max(max_dd, (peak - eq) / peak * 100)
                in_pos = False

    if in_pos and eq > 0:
        ret = (closes[-1] / ep - 1) * 100
        eq = max(0.0, eq0 + eq0 * LEVERAGE * (ret / 100))

    return {
        "levels": f"{int(buy)}/{int(sell)}",
        "buy": buy,
        "sell": sell,
        "trades": trades,
        "win_rate": round(100 * wins / trades, 1) if trades else 0,
        "stoch_exits": stoch_ex,
        "trail_exits": trail_ex,
        "final_eur": round(eq, 2),
        "return_pct": round((eq / START_EUR - 1) * 100, 1),
        "max_dd": round(max_dd, 1),
        "blown": eq <= 0,
    }


def run_window(days: int) -> list[dict]:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days + 60)).timestamp() * 1000)
    df = fetch_binance_klines("1d", limit=days + 100, start_ms=start_ms)
    cutoff = df.index.max() - pd.Timedelta(days=days)
    df = df[df.index >= cutoff]
    return [simulate(df, b, s) for b, s in LEVEL_PAIRS]


def print_table(rows: list[dict], title: str) -> None:
    rows = sorted(rows, key=lambda r: r["final_eur"], reverse=True)
    print(f"\n{title}")
    hdr = f"{'Levels':<8} {'Trades':>6} {'Win%':>6} {'Stoch':>5} {'Trail':>5} {'Final EUR':>12} {'Return':>9} {'MaxDD':>7} {'Blown':>6}"
    print(hdr)
    print("-" * len(hdr))
    for r in rows:
        blown = "YES" if r["blown"] else "no"
        mark = " <-- baseline" if r["levels"] == "25/75" else ""
        print(
            f"{r['levels']:<8} {r['trades']:>6} {r['win_rate']:>5.1f}% "
            f"{r['stoch_exits']:>5} {r['trail_exits']:>5} "
            f"{r['final_eur']:>12,.2f} {r['return_pct']:>+8.1f}% {r['max_dd']:>6.1f}% {blown:>6}{mark}"
        )
    best = rows[0]
    base = next(r for r in rows if r["levels"] == "25/75")
    print(f"\n  Best: {best['levels']} -> EUR {best['final_eur']:,.2f} ({best['return_pct']:+.1f}%)")
    print(f"  Baseline 25/75: EUR {base['final_eur']:,.2f} ({base['return_pct']:+.1f}%)")
    diff = best["final_eur"] - base["final_eur"]
    print(f"  Best vs baseline: EUR {diff:+,.2f}")


def main() -> None:
    print("=" * 80)
    print("STOCHRSI LEVEL GRID | daily | 2% trail | 10x compound | EUR 1000")
    print("Entry: cross-DOWN through buy | Exit: cross-UP through sell OR trail")
    print(f"Overbought filter: K >= sell within {LOOKBACK} bars")
    print("=" * 80)

    for days, label in [(365, "1 YEAR"), (365 * 3, "3 YEARS"), (365 * 6, "6 YEARS")]:
        rows = run_window(days)
        print_table(rows, f"--- {label} ---")

    print("\n--- INTERPRETATION ---")
    print("  Wider bands (20/80): fewer trades, wait for deeper pullback / bigger run")
    print("  Tighter bands (30/60): more trades, earlier in/out")
    print("  Asymmetric (22/73): earlier exit than entry symmetry would suggest")
    print("\nNot financial advice. In-sample optimization risk — validate on forward data.")


if __name__ == "__main__":
    main()
