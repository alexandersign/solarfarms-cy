"""
Backtest: Stochastic RSI swing strategy on BTC
  - Must have been overbought (>=75) recently
  - BUY when StochRSI %K crosses down through 25 (overbought -> oversold transition)
  - SELL when StochRSI %K crosses up through 75

Settings match TradingView: RSI 14, Stoch 14, smooth K=3, D=3, source=close
"""

from __future__ import annotations

import json
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Literal

import numpy as np
import pandas as pd

# ── Stochastic RSI (TradingView-compatible) ──────────────────────────────────

def rsi(series: pd.Series, length: int = 14) -> pd.Series:
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.ewm(alpha=1 / length, min_periods=length, adjust=False).mean()
    avg_loss = loss.ewm(alpha=1 / length, min_periods=length, adjust=False).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    return 100 - (100 / (1 + rs))


def stoch_rsi(
    close: pd.Series,
    rsi_len: int = 14,
    stoch_len: int = 14,
    smooth_k: int = 3,
    smooth_d: int = 3,
) -> tuple[pd.Series, pd.Series]:
    r = rsi(close, rsi_len)
    lo = r.rolling(stoch_len).min()
    hi = r.rolling(stoch_len).max()
    stoch = 100 * (r - lo) / (hi - lo).replace(0, np.nan)
    k = stoch.rolling(smooth_k).mean()
    d = k.rolling(smooth_d).mean()
    return k, d


# ── Data fetch ───────────────────────────────────────────────────────────────

def fetch_binance_klines(
    interval: str,
    limit: int = 1000,
    start_ms: int | None = None,
) -> pd.DataFrame:
    """Fetch BTCUSDT klines from Binance (public API)."""
    rows: list = []
    cursor = start_ms
    while len(rows) < limit:
        batch = min(1000, limit - len(rows))
        url = (
            f"https://api.binance.com/api/v3/klines"
            f"?symbol=BTCUSDT&interval={interval}&limit={batch}"
        )
        if cursor:
            url += f"&startTime={cursor}"
        req = urllib.request.Request(url, headers={"User-Agent": "backtest/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            chunk = json.loads(resp.read())
        if not chunk:
            break
        rows.extend(chunk)
        if len(chunk) < batch:
            break
        cursor = chunk[-1][0] + 1
        if batch == 1000 and len(rows) >= limit:
            break

    df = pd.DataFrame(
        rows,
        columns=[
            "open_time", "open", "high", "low", "close", "volume",
            "close_time", "quote_vol", "trades", "taker_buy_base",
            "taker_buy_quote", "ignore",
        ],
    )
    df["timestamp"] = pd.to_datetime(df["open_time"], unit="ms", utc=True)
    for c in ("open", "high", "low", "close"):
        df[c] = df[c].astype(float)
    return df.set_index("timestamp").sort_index()


def fetch_btc(interval: str, bars: int) -> pd.DataFrame:
    return fetch_binance_klines(interval, limit=bars)


# ── Backtest engine ──────────────────────────────────────────────────────────

@dataclass
class Trade:
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp | None
    entry_price: float
    exit_price: float | None
    entry_k: float
    exit_k: float | None
    return_pct: float | None = None
    bars_held: int = 0
    exit_reason: str = ""


@dataclass
class BacktestResult:
    timeframe: str
    period_label: str
    bars: int
    start: str
    end: str
    trades: list[Trade] = field(default_factory=list)

    def stats(self) -> dict:
        closed = [t for t in self.trades if t.return_pct is not None]
        if not closed:
            return {
                "trades": 0,
                "win_rate": None,
                "avg_return_pct": None,
                "median_return_pct": None,
                "total_return_pct": None,
                "profit_factor": None,
                "avg_bars_held": None,
                "max_win_pct": None,
                "max_loss_pct": None,
            }
        rets = [t.return_pct for t in closed]
        wins = [r for r in rets if r > 0]
        losses = [r for r in rets if r <= 0]
        gross_profit = sum(wins) if wins else 0
        gross_loss = abs(sum(losses)) if losses else 0
        compound = 1.0
        for r in rets:
            compound *= 1 + r / 100
        return {
            "trades": len(closed),
            "win_rate": round(100 * len(wins) / len(closed), 1),
            "avg_return_pct": round(float(np.mean(rets)), 2),
            "median_return_pct": round(float(np.median(rets)), 2),
            "total_return_pct": round((compound - 1) * 100, 2),
            "profit_factor": round(gross_profit / gross_loss, 2) if gross_loss else float("inf"),
            "avg_bars_held": round(float(np.mean([t.bars_held for t in closed])), 1),
            "max_win_pct": round(max(rets), 2),
            "max_loss_pct": round(min(rets), 2),
        }


def run_backtest(
    df: pd.DataFrame,
    buy_level: float = 25,
    sell_level: float = 75,
    overbought_level: float = 75,
    lookback_bars: int = 30,
    entry_mode: Literal["cross_down_25", "cross_up_25"] = "cross_down_25",
) -> list[Trade]:
    """
    Entry rules:
      cross_down_25: was >= overbought within lookback, then %K crosses DOWN through buy_level
      cross_up_25:   was >= overbought within lookback, then %K crosses UP through buy_level
    Exit: %K crosses UP through sell_level while in position
    """
    k, _ = stoch_rsi(df["close"])
    prices = df["close"].values
    times = df.index
    trades: list[Trade] = []
    in_pos = False
    current: Trade | None = None
    entry_bar = 0

    k_vals = k.values
    for i in range(lookback_bars + 1, len(df)):
        if np.isnan(k_vals[i]) or np.isnan(k_vals[i - 1]):
            continue

        was_ob = np.nanmax(k_vals[max(0, i - lookback_bars) : i]) >= overbought_level

        if not in_pos:
            if not was_ob:
                continue
            if entry_mode == "cross_down_25":
                signal = k_vals[i - 1] > buy_level >= k_vals[i]
            else:
                signal = k_vals[i - 1] < buy_level <= k_vals[i]
            if signal:
                in_pos = True
                entry_bar = i
                current = Trade(
                    entry_time=times[i],
                    exit_time=None,
                    entry_price=prices[i],
                    exit_price=None,
                    entry_k=float(k_vals[i]),
                    exit_k=None,
                )
        else:
            assert current is not None
            # Exit on cross up through 75
            if k_vals[i - 1] < sell_level <= k_vals[i]:
                current.exit_time = times[i]
                current.exit_price = prices[i]
                current.exit_k = float(k_vals[i])
                current.bars_held = i - entry_bar
                current.return_pct = (current.exit_price / current.entry_price - 1) * 100
                current.exit_reason = "stoch_75"
                trades.append(current)
                in_pos = False
                current = None

    # Mark open trade
    if in_pos and current:
        current.exit_reason = "still_open"
        trades.append(current)

    return trades


def slice_period(df: pd.DataFrame, days: int | None) -> pd.DataFrame:
    if days is None:
        return df
    cutoff = df.index.max() - pd.Timedelta(days=days)
    return df[df.index >= cutoff]


# ── Main ─────────────────────────────────────────────────────────────────────

TIMEFRAMES = {
    "4h": ("4h", 2000),
    "1d": ("1d", 1500),
    "1w": ("1w", 500),
}

PERIODS = [
    ("90d", 90),
    ("180d", 180),
    ("365d", 365),
    ("730d", 730),
    ("all", None),
]


def main() -> None:
    print("=" * 72)
    print("BTC StochRSI Backtest: overbought->oversold, BUY@25, SELL@75")
    print("StochRSI(14,14,3,3) | prior overbought within 30 bars")
    print("=" * 72)

    all_results: list[tuple[str, str, str, dict, list[Trade]]] = []

    for tf_label, (interval, bars) in TIMEFRAMES.items():
        print(f"\nFetching {tf_label} data ({bars} bars)...")
        try:
            df_full = fetch_btc(interval, bars)
        except Exception as e:
            print(f"  SKIP {tf_label}: {e}")
            continue

        for period_label, days in PERIODS:
            df = slice_period(df_full, days)
            if len(df) < 50:
                continue

            for mode, label in [
                ("cross_down_25", "buy cross-DOWN thru 25"),
                ("cross_up_25", "buy cross-UP thru 25"),
            ]:
                trades = run_backtest(df, entry_mode=mode)
                closed = [t for t in trades if t.return_pct is not None]
                result = BacktestResult(
                    timeframe=tf_label,
                    period_label=period_label,
                    bars=len(df),
                    start=str(df.index.min().date()),
                    end=str(df.index.max().date()),
                    trades=closed,
                )
                st = result.stats()
                all_results.append((tf_label, period_label, label, st, closed))

    # Summary table
    print("\n" + "=" * 72)
    print("SUMMARY (closed trades only)")
    print("=" * 72)
    header = f"{'TF':<4} {'Period':<6} {'Entry rule':<22} {'Trades':>6} {'Win%':>6} {'Avg%':>7} {'Med%':>7} {'Total%':>8} {'PF':>6} {'AvgBars':>8}"
    print(header)
    print("-" * len(header))

    for tf, period, rule, st, _ in all_results:
        if st["trades"] == 0:
            print(f"{tf:<4} {period:<6} {rule:<22} {'—':>6}")
            continue
        print(
            f"{tf:<4} {period:<6} {rule:<22} "
            f"{st['trades']:>6} {st['win_rate']:>5.1f}% "
            f"{st['avg_return_pct']:>6.2f}% {st['median_return_pct']:>6.2f}% "
            f"{st['total_return_pct']:>7.2f}% {st['PF' if False else 'profit_factor']:>6} "
            f"{st['avg_bars_held']:>8.1f}"
        )

    # Best configs + recent trades on daily (matches user's chart)
    print("\n" + "=" * 72)
    print("DETAIL: 1d / 90d / buy cross-DOWN thru 25 (matches chart timeframe)")
    print("=" * 72)
    for tf, period, rule, st, trades in all_results:
        if tf == "1d" and period == "90d" and "DOWN" in rule:
            print(f"Period: {trades[0].entry_time.date() if trades else 'n/a'} to latest")
            print(f"Stats: {json.dumps(st, indent=2)}")
            print("\nLast 8 closed trades:")
            for t in trades[-8:]:
                print(
                    f"  {t.entry_time.date()} @ ${t.entry_price:,.0f} -> "
                    f"{t.exit_time.date() if t.exit_time else '?'} @ ${t.exit_price:,.0f} | "
                    f"{t.return_pct:+.2f}% | {t.bars_held} bars | K {t.entry_k:.1f}->{t.exit_k:.1f}"
                )

    # Compare entry modes on 1d all data
    print("\n" + "=" * 72)
    print("ENTRY MODE COMPARISON (1d, all available history)")
    print("=" * 72)
    for tf, period, rule, st, _ in all_results:
        if tf == "1d" and period == "all":
            print(f"  {rule}: trades={st['trades']}, win={st['win_rate']}%, "
                  f"avg={st['avg_return_pct']}%, compound={st['total_return_pct']}%, PF={st['profit_factor']}")

    print("\nNote: Backtest uses close prices, no fees/slippage. Not financial advice.")


if __name__ == "__main__":
    main()
