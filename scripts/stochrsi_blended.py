"""
Blended v2 backtest: 3x leverage, risk-based sizing, realistic trail fills,
funding, regime filter (200 MA), min_bars_since_ob=5.

Compare vs idealized legacy (10x full margin, perfect trail fill).
"""

from __future__ import annotations

import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi
from stochrsi_long_short import run as run_legacy
from stochrsi_safeguards import Filters, entry_ok, last_overbought_bar

START = 1000.0
LB, BUY, SELL = 30, 25.0, 75.0


@dataclass
class BlendedConfig:
    leverage: float = 3.0
    trail_pct: float = 3.0
    risk_pct: float = 1.0  # max % equity lost if stop hit at trail distance
    max_margin_frac: float = 0.35
    fee_rate: float = 0.00045  # BNB-discounted taker
    fill_mode: Literal["ideal", "realistic"] = "realistic"
    exit_on_close: bool = False  # if True: exit at close when trail hit (no intrabar)
    min_bars_since_ob: int = 5
    price_above_ma200: bool = True
    funding_per_8h: float = 0.0001  # fallback avg long funding (~0.01%/8h)
    use_funding_series: bool = True


@dataclass
class BlendedTrade:
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp
    entry_price: float
    exit_price: float
    margin: float
    pnl: float
    pnl_pct_margin: float
    reason: str
    funding_paid: float


def fetch_funding_8h(symbol: str = "BTCUSDT") -> pd.Series:
    """Hourly-aligned funding rate series (index UTC)."""
    import urllib.request
    import json

    url = f"https://fapi.binance.com/fapi/v1/fundingRate?symbol={symbol}&limit=1000"
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            data = json.loads(resp.read())
        if not data:
            return pd.Series(dtype=float)
        s = pd.Series(
            {pd.to_datetime(x["fundingTime"], unit="ms", utc=True): float(x["fundingRate"]) for x in data}
        ).sort_index()
        return s
    except Exception:
        return pd.Series(dtype=float)


def margin_for_risk(equity: float, cfg: BlendedConfig) -> float:
    """Margin so trail% adverse move * leverage * (margin/eq) ≈ risk_pct."""
    if cfg.trail_pct <= 0 or cfg.leverage <= 0:
        return equity * cfg.max_margin_frac
    frac = (cfg.risk_pct / 100) / ((cfg.trail_pct / 100) * cfg.leverage)
    frac = min(frac, cfg.max_margin_frac)
    return equity * max(frac, 0.01)


def funding_cost(
    entry_t: pd.Timestamp,
    exit_t: pd.Timestamp,
    notional: float,
    funding: pd.Series,
    fallback: float,
) -> float:
    if notional <= 0:
        return 0.0
    if funding.empty:
        days = max((exit_t - entry_t).total_seconds() / 86400, 0.25)
        periods = days * 3  # ~3 per day
        return notional * fallback * periods
    sub = funding[(funding.index >= entry_t) & (funding.index <= exit_t)]
    if sub.empty:
        days = max((exit_t - entry_t).total_seconds() / 86400, 0.25)
        return notional * fallback * days * 3
    # Long pays positive funding
    return float((sub * notional).sum())


def run_blended(df: pd.DataFrame, cfg: BlendedConfig, start: float = START) -> dict:
    k, d = stoch_rsi(df["close"])
    kv, dv = k.values, d.values
    o = df["open"].values
    c, h, l = df["close"].values, df["high"].values, df["low"].values
    times = df.index
    ma200 = df["close"].rolling(200).mean().values

    funding = fetch_funding_8h() if cfg.use_funding_series else pd.Series(dtype=float)
    filt = Filters(
        min_bars_since_ob=cfg.min_bars_since_ob,
        price_above_ma200=cfg.price_above_ma200,
    )

    eq = start
    peak_eq = eq
    max_dd = 0.0
    trades: list[BlendedTrade] = []
    in_pos = False
    ep = margin = 0.0
    extreme = 0.0
    et = None

    for i in range(LB + 1, len(df)):
        if eq <= 1:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        if cfg.price_above_ma200 and (np.isnan(ma200[i]) or c[i] <= ma200[i]):
            if not in_pos:
                continue

        was_ob = np.nanmax(kv[max(0, i - LB) : i]) >= SELL

        if not in_pos:
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                if not entry_ok(i, df, kv, dv, ma200, ma200, filt):
                    continue
                margin = margin_for_risk(eq, cfg)
                notional = margin * cfg.leverage
                eq -= notional * cfg.fee_rate
                in_pos = True
                ep, extreme, et = c[i], h[i], times[i]
        else:
            extreme = max(extreme, h[i])
            trail_stop = extreme * (1 - cfg.trail_pct / 100)
            ex_p, reason = None, ""
            if l[i] <= trail_stop:
                if cfg.exit_on_close:
                    ex_p, reason = c[i], "trail_close"
                elif cfg.fill_mode == "realistic":
                    # Stop-market: gap at open or pierce to bar low (worse than trail)
                    ex_p = o[i] if o[i] < trail_stop else l[i]
                    reason = "trail_realistic"
                else:
                    ex_p, reason = trail_stop, "trail_ideal"
            elif kv[i - 1] < SELL <= kv[i]:
                ex_p, reason = c[i], "stoch_75"

            if ex_p is not None:
                notional = margin * cfg.leverage
                ret_pct = (ex_p / ep - 1) * 100
                gross = margin * cfg.leverage * (ret_pct / 100)
                fund = funding_cost(et, times[i], notional, funding, cfg.funding_per_8h)
                fee_exit = notional * cfg.fee_rate
                pnl = gross - fund - fee_exit
                new_eq = max(0.0, eq + pnl)
                trades.append(
                    BlendedTrade(
                        et, times[i], ep, ex_p, margin, pnl,
                        (pnl / margin * 100) if margin else 0,
                        reason, fund,
                    )
                )
                eq = new_eq
                in_pos = False
                peak_eq = max(peak_eq, eq)
                max_dd = max(max_dd, (peak_eq - eq) / peak_eq * 100 if peak_eq else 0)

    closed = trades
    wins = sum(1 for t in closed if t.pnl > 0)
    price_wins = sum(1 for t in closed if t.exit_price > t.entry_price)
    total_fund = sum(t.funding_paid for t in closed)
    total_fees = sum(
        t.margin * cfg.leverage * cfg.fee_rate * 2 for t in closed
    )  # approx round trip
    pnls = [t.pnl for t in closed]

    return {
        "final": round(eq, 2),
        "return_pct": round((eq / start - 1) * 100, 1),
        "trades": len(closed),
        "win_rate": round(100 * wins / len(closed), 1) if closed else 0,
        "price_win_rate": round(100 * price_wins / len(closed), 1) if closed else 0,
        "max_dd": round(max_dd, 1),
        "expectancy": round(np.mean(pnls), 2) if pnls else 0,
        "profit_factor": round(
            sum(p for p in pnls if p > 0) / max(abs(sum(p for p in pnls if p < 0)), 1e-9), 2
        )
        if pnls
        else 0,
        "total_funding": round(total_fund, 2),
        "avg_pnl": round(np.mean(pnls), 2) if pnls else 0,
        "median_pnl": round(float(np.median(pnls)), 2) if pnls else 0,
        "trade_pnls": pnls,
        "blown": eq <= 1,
        "closed_trades": closed,
    }


def bootstrap_ruin(pnls: list[float], start: float, n_paths: int = 2000, seed: int = 42) -> dict:
    if not pnls:
        return {}
    rng = np.random.default_rng(seed)
    finals = []
    ruins = 0
    for _ in range(n_paths):
        eq = start
        sample = rng.choice(pnls, size=len(pnls), replace=True)
        for p in sample:
            eq += p
            if eq <= 1:
                ruins += 1
                break
        finals.append(eq)
    finals = np.array(finals)
    return {
        "median_final": round(float(np.median(finals)), 2),
        "p5_final": round(float(np.percentile(finals, 5)), 2),
        "p95_final": round(float(np.percentile(finals, 95)), 2),
        "p_ruin": round(100 * ruins / n_paths, 1),
        "median_return_pct": round((float(np.median(finals)) / start - 1) * 100, 1),
    }


def slice_df(days: int) -> pd.DataFrame:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days + 250)).timestamp() * 1000)
    df = fetch_binance_klines("1d", days + 300, start_ms=start_ms)
    return df[df.index >= df.index.max() - pd.Timedelta(days=days)]


def main() -> None:
    cfg = BlendedConfig()
    windows = [365, 730, 1095]

    print("=" * 78)
    print("BLENDED v2 vs LEGACY IDEALIZED | EUR 1,000 start")
    print("=" * 78)
    print(
        f"BLENDED: {cfg.leverage:.0f}x | {cfg.trail_pct}% trail | risk {cfg.risk_pct}%/trade | "
        f"max margin {cfg.max_margin_frac*100:.0f}% | fill={cfg.fill_mode} | "
        f"MA200={'on' if cfg.price_above_ma200 else 'off'} | min_bars_ob={cfg.min_bars_since_ob} | "
        f"funding={'live series' if cfg.use_funding_series else 'estimate'}"
    )
    print(
        "LEGACY:  10x | 2% trail | 100% equity margin | ideal trail fill | no MA filter | compound"
    )
    print("=" * 78)

    for days in windows:
        df = slice_df(days)
        d0, d1 = df.index.min().date(), df.index.max().date()
        leg_tr, leg_fin, leg_dd = run_legacy(df, "long_only", 2.0, START)
        leg_closed = [t for t in leg_tr if t.exit_time]
        bl = run_blended(df, cfg, START)
        bs = bootstrap_ruin(bl["trade_pnls"], START) if bl["trade_pnls"] else {}

        print(f"\n--- {days}d ({d0} -> {d1}) ---")
        print(
            f"  LEGACY ideal:  EUR {leg_fin:>10,.2f}  ({(leg_fin/START-1)*100:+,.1f}%)  "
            f"trades={len(leg_closed):>3}  maxDD={leg_dd:.1f}%"
        )
        print(
            f"  BLENDED v2:    EUR {bl['final']:>10,.2f}  ({bl['return_pct']:+,.1f}%)  "
            f"trades={bl['trades']:>3}  net_win={bl['win_rate']:.1f}%  "
            f"price_win={bl.get('price_win_rate', 0):.1f}%  maxDD={bl['max_dd']:.1f}%"
        )
        print(
            f"                 expectancy EUR {bl['expectancy']:+.2f}/trade  "
            f"PF={bl['profit_factor']:.2f}  funding paid EUR {bl['total_funding']:.2f}"
        )
        if bs:
            print(
                f"                 bootstrap: median EUR {bs['median_final']:,.0f} "
                f"({bs['median_return_pct']:+.1f}%)  P(ruin)={bs['p_ruin']:.1f}%  "
                f"5th–95th pct EUR {bs['p5_final']:,.0f}–{bs['p95_final']:,.0f}"
            )

    # Sensitivity: trail 2 vs 3, fill modes
    print("\n" + "=" * 78)
    print("SENSITIVITY (730d, blended risk sizing)")
    print("=" * 78)
    df = slice_df(730)
    variants = [
        ("v2 default (3% trail, realistic)", BlendedConfig()),
        ("2% trail realistic", BlendedConfig(trail_pct=2.0)),
        ("3% trail ideal fill", BlendedConfig(fill_mode="ideal")),
        ("3% exit at close on trail", BlendedConfig(exit_on_close=True)),
        ("no MA200 filter", BlendedConfig(price_above_ma200=False)),
        ("no min_bars_ob", BlendedConfig(min_bars_since_ob=0)),
    ]
    for label, vcfg in variants:
        r = run_blended(df, vcfg, START)
        print(
            f"  {label:<32} EUR {r['final']:>9,.0f} ({r['return_pct']:+6.1f}%)  "
            f"n={r['trades']:>2}  PF={r['profit_factor']:.2f}  E={r['expectancy']:+.1f}"
        )

    print("\n--- MA200 filter impact (365d raw signals) ---")
    df1 = slice_df(365)
    k, d = stoch_rsi(df1["close"])
    kv = k.values
    c = df1["close"].values
    ma200 = df1["close"].rolling(200).mean().values
    raw = ma_blk = 0
    for i in range(LB + 1, len(df1)):
        if np.isnan(kv[i]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LB) : i]) >= SELL
        if was_ob and kv[i - 1] > BUY >= kv[i]:
            raw += 1
            if np.isnan(ma200[i]) or c[i] <= ma200[i]:
                ma_blk += 1
    print(f"  Cross-down entries: {raw} | blocked by below 200MA: {ma_blk} | pass: {raw - ma_blk}")

    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
