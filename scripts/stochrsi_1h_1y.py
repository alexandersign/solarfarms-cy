"""
StochRSI strategy on 1h BTCUSDT — last 365 days.
Same rules as daily model: cross-DOWN @25 after overbought, exit @75 or trailing stop.
Compares bar-count lookback (30) vs calendar-equivalent lookback (720h = 30 days).
"""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import BacktestResult, fetch_binance_klines, run_backtest, stoch_rsi
from stochrsi_leveraged import FEE_RATE, LEVERAGE, START_EUR, run_leveraged_backtest

DAYS = 365
WARMUP_HOURS = 800  # indicator + lookback headroom
TRAIL = 2.0


def fetch_1h_window(days: int, warmup_hours: int) -> pd.DataFrame:
    end = datetime.now(timezone.utc)
    start = end - pd.Timedelta(days=days, hours=warmup_hours)
    start_ms = int(start.timestamp() * 1000)
    need = days * 24 + warmup_hours + 100
    df = fetch_binance_klines("1h", limit=need, start_ms=start_ms)
    cutoff = end - pd.Timedelta(days=days)
    return df[df.index >= cutoff]


def spot_stats(trades) -> dict:
    closed = [t for t in trades if t.return_pct is not None]
    if not closed:
        return {"trades": 0}
    rets = [t.return_pct for t in closed]
    wins = [r for r in rets if r > 0]
    compound = 1.0
    for r in rets:
        compound *= 1 + r / 100
    return {
        "trades": len(closed),
        "win_rate": round(100 * len(wins) / len(closed), 1),
        "avg_ret": round(float(np.mean(rets)), 2),
        "total_compound_pct": round((compound - 1) * 100, 1),
        "avg_bars": round(float(np.mean([t.bars_held for t in closed])), 1),
    }


def lev_summary(df: pd.DataFrame, lookback: int, trail: float) -> dict:
    trades, final, max_dd = run_leveraged_backtest(
        df, trail, lookback_bars=lookback
    )
    closed = [t for t in trades if not t.exit_reason.startswith("open")]
    wins = sum(1 for t in closed if t.pnl_eur and t.pnl_eur > 0)
    trail_ex = sum(1 for t in closed if t.exit_reason.startswith("trail"))
    stoch_ex = sum(1 for t in closed if t.exit_reason == "stoch_75")
    return {
        "lookback": lookback,
        "trail": trail,
        "trades": len(closed),
        "win_rate": round(100 * wins / len(closed), 1) if closed else 0,
        "trail_exits": trail_ex,
        "stoch_exits": stoch_ex,
        "final_eur": round(final, 2),
        "return_pct": round((final / START_EUR - 1) * 100, 1),
        "max_dd_pct": round(max_dd, 1),
        "blown": final <= 0,
        "trades_list": trades,
    }


def main() -> None:
    df = fetch_1h_window(DAYS, WARMUP_HOURS)
    d0, d1 = df.index.min().date(), df.index.max().date()
    print("=" * 78)
    print(f"STOCHRSI 1H BACKTEST | {d0} -> {d1} | BTCUSDT | StochRSI(14,14,3,3)")
    print("Entry: K cross DOWN @25 after overbought | Exit: K @75 OR 2% trail")
    print("=" * 78)
    print(f"Bars: {len(df):,} ({DAYS}d x 24h)")

    k, _ = stoch_rsi(df["close"])
    print(f"Latest: {df['close'].iloc[-1]:,.0f} | K={k.iloc[-1]:.1f} | max K 30b={k.iloc[-30:].max():.1f}")

    lookbacks = [
        (30, "30 bars (~30 hours) — same bar count as daily"),
        (720, "720 bars (~30 days) — calendar-equivalent to daily"),
    ]

    print("\n--- SPOT (1x, no trail, stoch exit only) ---")
    for lb, desc in lookbacks:
        trades = run_backtest(df, lookback_bars=lb)
        st = spot_stats(trades)
        print(f"  Lookback {lb:>4}: {st.get('trades', 0)} trades | win {st.get('win_rate', 0)}% | "
              f"compound {st.get('total_compound_pct', 0):+.1f}% | avg hold {st.get('avg_bars', 0)}h")
        print(f"            ({desc})")

    print(f"\n--- LEVERAGED: EUR {START_EUR:.0f} | {LEVERAGE}x | fees {FEE_RATE*100:.2f}%/side | 2% trail ---")
    hdr = f"{'Lookback':>8} {'Trades':>6} {'Win%':>6} {'Trail':>5} {'Stoch':>5} {'Final EUR':>11} {'Return':>9} {'MaxDD':>7}"
    print(hdr)
    print("-" * len(hdr))

    best_detail = None
    for lb, desc in lookbacks:
        r = lev_summary(df, lb, TRAIL)
        print(
            f"{lb:>8} {r['trades']:>6} {r['win_rate']:>5.1f}% "
            f"{r['trail_exits']:>5} {r['stoch_exits']:>5} "
            f"{r['final_eur']:>11,.2f} {r['return_pct']:>+8.1f}% {r['max_dd_pct']:>6.1f}%"
        )
        if lb == 720:
            best_detail = r

    print("\n--- TRAIL SWEEP (720-bar lookback, 1h, 1y leveraged) ---")
    print(f"{'Trail%':>6} {'Trades':>6} {'Win%':>6} {'Final EUR':>11} {'Return':>9} {'MaxDD':>7}")
    print("-" * 50)
    for trail in [1.0, 1.5, 2.0, 3.0, 5.0]:
        r = lev_summary(df, 720, trail)
        print(
            f"{trail:>5.1f}% {r['trades']:>6} {r['win_rate']:>5.1f}% "
            f"{r['final_eur']:>11,.2f} {r['return_pct']:>+8.1f}% {r['max_dd_pct']:>6.1f}%"
        )

    if best_detail:
        print(f"\n--- LAST 15 TRADES (720-bar lookback, 2% trail) ---")
        for t in best_detail["trades_list"][-15:]:
            ex = t.exit_time.strftime("%Y-%m-%d %H:%M") if t.exit_time else "OPEN"
            pnl = t.pnl_eur if t.pnl_eur is not None else 0
            hrs = ""
            if t.exit_time and t.entry_time:
                hrs = f" ({int((t.exit_time - t.entry_time).total_seconds()/3600)}h)"
            print(
                f"  {t.entry_time.strftime('%Y-%m-%d %H:%M')} @ ${t.entry_price:,.0f} -> "
                f"{ex} @ ${t.exit_price:,.0f} | EUR{pnl:+,.0f} | {t.exit_reason}{hrs}"
            )

    print("\n--- vs DAILY (reference) ---")
    print("  Daily 1y @ 10x compound ~ check stochrsi_monthly_3y / leveraged scripts")
    print("  1h generates many more signals; 2% trail may be tight on hourly noise.")

    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
