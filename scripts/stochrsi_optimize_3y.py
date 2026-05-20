"""
Grid search: last 3 years BTC daily StochRSI system.
Optimizes trailing stop % and compares entry/exit levels.
Leveraged: EUR 1000, 10x, full margin, 0.05% fee/side.
Also reports spot (1x) for reference.
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START_EUR = 1000.0
LEVERAGE = 10
FEE = 0.0005
DAYS_3Y = 365 * 3
LOOKBACK = 30

LEVEL_SETS = [
    ("25/75", 25, 75),
    ("20/80", 20, 80),
    ("30/60", 30, 60),
]

TRAIL_GRID = [round(x * 0.5, 1) for x in range(2, 31)]  # 1.0% .. 15.0%


@dataclass
class SimResult:
    levels: str
    buy: float
    sell: float
    trail_pct: float | None
    leverage: int
    trades: int
    win_rate: float
    final_eur: float
    return_pct: float
    max_dd: float
    blown: bool
    stoch_exits: int
    trail_exits: int


def simulate(
    df: pd.DataFrame,
    buy: float,
    sell: float,
    trail_pct: float | None,
    leverage: int = LEVERAGE,
    start_eur: float = START_EUR,
) -> SimResult:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    closes = df["close"].values
    highs = df["high"].values
    lows = df["low"].values
    times = df.index

    eq = start_eur
    peak = eq
    max_dd = 0.0
    trades = 0
    wins = 0
    stoch_exits = 0
    trail_exits = 0
    in_pos = False
    ep = eq0 = 0.0
    peak_price = 0.0
    levels_label = f"{int(buy)}/{int(sell)}"

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
                eq -= eq * leverage * FEE
        else:
            peak_price = max(peak_price, highs[i])
            exit_price = None
            reason = ""

            if trail_pct is not None:
                trail_stop = peak_price * (1 - trail_pct / 100)
                if lows[i] <= trail_stop:
                    exit_price = trail_stop
                    reason = "trail"

            if exit_price is None and leverage > 1:
                liq = ep * (1 - 1 / leverage)
                if lows[i] <= liq:
                    exit_price = liq
                    reason = "liq"

            if exit_price is None and kv[i - 1] < sell <= kv[i]:
                exit_price = closes[i]
                reason = "stoch"

            if exit_price is not None:
                ret = (exit_price / ep - 1) * 100
                pnl = eq0 * leverage * (ret / 100)
                new_eq = max(0.0, eq0 + pnl - abs(eq0 * leverage * FEE))
                trades += 1
                if new_eq > eq0:
                    wins += 1
                if reason == "stoch":
                    stoch_exits += 1
                elif reason == "trail":
                    trail_exits += 1
                eq = new_eq
                peak = max(peak, eq)
                if peak > 0:
                    max_dd = max(max_dd, (peak - eq) / peak * 100)
                in_pos = False

    if in_pos and eq > 0:
        ret = (closes[-1] / ep - 1) * 100
        eq = max(0.0, eq0 + eq0 * leverage * (ret / 100))

    ret_pct = (eq / start_eur - 1) * 100
    wr = 100 * wins / trades if trades else 0.0
    return SimResult(
        levels=levels_label,
        buy=buy,
        sell=sell,
        trail_pct=trail_pct,
        leverage=leverage,
        trades=trades,
        win_rate=round(wr, 1),
        final_eur=round(eq, 2),
        return_pct=round(ret_pct, 1),
        max_dd=round(max_dd, 1),
        blown=eq <= 0,
        stoch_exits=stoch_exits,
        trail_exits=trail_exits,
    )


def main() -> None:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=DAYS_3Y)).timestamp() * 1000)
    df = fetch_binance_klines("1d", limit=1200, start_ms=start_ms)
    d0, d1 = df.index.min().date(), df.index.max().date()

    print("=" * 80)
    print(f"3-YEAR OPTIMIZATION ({d0} to {d1}) | StochRSI(14,14,3,3) daily")
    print("Entry: cross-DOWN through buy level after prior overbought (>= sell level)")
    print(f"Leveraged sim: EUR {START_EUR:.0f} start, {LEVERAGE}x, fees {FEE*100:.2f}%/side")
    print("=" * 80)

    all_lev: list[SimResult] = []
    all_spot: list[SimResult] = []

    for label, buy, sell in LEVEL_SETS:
        # No trail (spot + lev)
        all_spot.append(simulate(df, buy, sell, trail_pct=None, leverage=1))
        all_lev.append(simulate(df, buy, sell, trail_pct=None, leverage=LEVERAGE))
        for trail in TRAIL_GRID:
            all_lev.append(simulate(df, buy, sell, trail_pct=trail, leverage=LEVERAGE))

    # Best per level set (leveraged)
    print("\n--- BEST TRAILING STOP PER LEVEL SET (10x leveraged) ---")
    print(f"{'Levels':<8} {'BestTrail':>9} {'Trades':>6} {'Win%':>6} {'Final EUR':>11} {'Return':>8} {'MaxDD':>7}")
    print("-" * 62)
    best_overall: SimResult | None = None
    for label, buy, sell in LEVEL_SETS:
        subset = [r for r in all_lev if r.levels == f"{int(buy)}/{int(sell)}" and r.trail_pct is not None and not r.blown]
        if not subset:
            subset = [r for r in all_lev if r.levels == f"{int(buy)}/{int(sell)}" and r.trail_pct is not None]
        best = max(subset, key=lambda r: r.final_eur)
        if best_overall is None or best.final_eur > best_overall.final_eur:
            best_overall = best
        print(
            f"{label:<8} {best.trail_pct:>8.1f}% {best.trades:>6} {best.win_rate:>5.1f}% "
            f"{best.final_eur:>11,.2f} {best.return_pct:>+7.1f}% {best.max_dd:>6.1f}%"
        )

    # No trail comparison
    print("\n--- NO TRAILING STOP (10x) ---")
    for label, buy, sell in LEVEL_SETS:
        r = next(x for x in all_lev if x.levels == f"{int(buy)}/{int(sell)}" and x.trail_pct is None)
        status = "BLOWN" if r.blown else "ok"
        print(f"  {label}: EUR {r.final_eur:,.2f} ({r.return_pct:+.1f}%) | {r.trades} trades | {status}")

    # Spot comparison
    print("\n--- SPOT (1x, no trail, no fees) ---")
    for r in all_spot:
        print(f"  {r.levels}: compound {r.return_pct:+.1f}% | {r.trades} trades | win {r.win_rate:.1f}%")

    # Top 10 leveraged combos overall
    print("\n--- TOP 10 COMBOS (10x, all level sets + trail grid) ---")
    ranked = sorted([r for r in all_lev if r.trail_pct is not None], key=lambda r: r.final_eur, reverse=True)[:10]
    print(f"{'Rank':<5} {'Levels':<8} {'Trail':>6} {'Trades':>6} {'Win%':>6} {'Final EUR':>11} {'Return':>8} {'MaxDD':>7}")
    for i, r in enumerate(ranked, 1):
        print(
            f"{i:<5} {r.levels:<8} {r.trail_pct:>5.1f}% {r.trades:>6} {r.win_rate:>5.1f}% "
            f"{r.final_eur:>11,.2f} {r.return_pct:>+7.1f}% {r.max_dd:>6.1f}%"
        )

    # Trail sensitivity for each level (top 5 trails)
    print("\n--- TRAIL SENSITIVITY (top 5 trails per level set) ---")
    for label, buy, sell in LEVEL_SETS:
        subset = sorted(
            [r for r in all_lev if r.levels == f"{int(buy)}/{int(sell)}" and r.trail_pct is not None],
            key=lambda r: r.final_eur,
            reverse=True,
        )[:5]
        print(f"\n  {label}:")
        for r in subset:
            print(f"    {r.trail_pct:.1f}% trail -> EUR {r.final_eur:,.0f} ({r.return_pct:+.0f}%) | {r.trades} trades | DD {r.max_dd:.0f}%")

    # Winner summary
    print("\n" + "=" * 80)
    print("WINNER SUMMARY")
    print("=" * 80)
    if best_overall:
        print(
            f"  Best leveraged (10x): {best_overall.levels} + {best_overall.trail_pct}% trail "
            f"-> EUR {best_overall.final_eur:,.2f} ({best_overall.return_pct:+.1f}%)"
        )
    best_spot = max(all_spot, key=lambda r: r.return_pct)
    print(
        f"  Best spot (1x):       {best_spot.levels} (no trail) "
        f"-> {best_spot.return_pct:+.1f}% compound, {best_spot.trades} trades"
    )
    print("\nNot financial advice. Full-reinvest compounding; real trading differs.")

    # CSV for reference
    out = Path(__file__).parent / "stochrsi_3y_grid_results.csv"
    rows = []
    for r in all_lev:
        rows.append(r.__dict__)
    pd.DataFrame(rows).to_csv(out, index=False)
    print(f"\nFull grid saved: {out}")


if __name__ == "__main__":
    main()
