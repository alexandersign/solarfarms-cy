"""Entry/exit signal detection and leveraged simulation."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Literal

import numpy as np
import pandas as pd

from stochrsi_bot.config import BotConfig
from stochrsi_bot.indicators import (
    bars_since_level,
    cross_down,
    cross_up,
    stoch_rsi,
    was_overbought,
    was_oversold,
)


class Side(str, Enum):
    LONG = "long"
    SHORT = "short"


class Action(str, Enum):
    NONE = "none"
    ENTER_LONG = "enter_long"
    ENTER_SHORT = "enter_short"
    EXIT_LONG = "exit_long"
    EXIT_SHORT = "exit_short"
    FRIDAY_CLOSE = "friday_close"


@dataclass
class SignalEvent:
    action: Action
    reason: str
    bar_time: pd.Timestamp
    price: float
    k: float
    d: float


@dataclass
class PositionState:
    side: Side | None = None
    entry_price: float = 0.0
    entry_time: pd.Timestamp | None = None
    extreme: float = 0.0  # peak (long) or trough (short)


@dataclass
class SimTrade:
    side: Side
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp
    entry_price: float
    exit_price: float
    equity_before: float
    pnl: float
    reason: str


def compute_stoch(df: pd.DataFrame, cfg: BotConfig) -> tuple[pd.Series, pd.Series]:
    sr = cfg.stoch_rsi
    return stoch_rsi(
        df["close"],
        rsi_len=sr.rsi_len,
        stoch_len=sr.stoch_len,
        smooth_k=sr.smooth_k,
        smooth_d=sr.smooth_d,
    )


def long_entry_ok(i: int, kv: np.ndarray, cfg: BotConfig) -> bool:
    lv = cfg.levels
    if not was_overbought(kv, i, lv.lookback_bars, lv.overbought):
        return False
    if not cross_down(kv[i - 1], kv[i], lv.entry_long):
        return False
    min_bars = cfg.optional.min_bars_since_ob
    if min_bars > 0:
        since = bars_since_level(kv, i, lv.overbought, above=True)
        if since is None or since < min_bars:
            return False
    return True


def short_entry_ok(i: int, kv: np.ndarray, cfg: BotConfig) -> bool:
    lv = cfg.levels
    if not was_oversold(kv, i, lv.lookback_bars, lv.oversold):
        return False
    if not cross_up(kv[i - 1], kv[i], lv.entry_short):
        return False
    return True


def evaluate_bar(
    i: int,
    df: pd.DataFrame,
    kv: np.ndarray,
    dv: np.ndarray,
    pos: PositionState,
    cfg: BotConfig,
) -> SignalEvent:
    """Evaluate one closed bar index i."""
    lv = cfg.levels
    times = df.index
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    trail = cfg.trail.callback_pct
    k_val, d_val = float(kv[i]), float(dv[i])

    if pos.side == Side.LONG:
        pos.extreme = max(pos.extreme, h[i])
        trail_stop = pos.extreme * (1 - trail / 100)
        if lo[i] <= trail_stop:
            return SignalEvent(
                Action.EXIT_LONG, f"trail_{trail:.0f}pct", times[i], trail_stop, k_val, d_val
            )
        if cross_up(kv[i - 1], kv[i], lv.exit_long):
            return SignalEvent(
                Action.EXIT_LONG, "stoch_75", times[i], c[i], k_val, d_val
            )

    elif pos.side == Side.SHORT:
        pos.extreme = min(pos.extreme, lo[i])
        trail_stop = pos.extreme * (1 + trail / 100)
        if h[i] >= trail_stop:
            return SignalEvent(
                Action.EXIT_SHORT, f"trail_{trail:.0f}pct", times[i], trail_stop, k_val, d_val
            )
        if cross_down(kv[i - 1], kv[i], lv.exit_short):
            return SignalEvent(
                Action.EXIT_SHORT, "stoch_25", times[i], c[i], k_val, d_val
            )

    if pos.side is None:
        if cfg.mode in ("long_only", "both") and long_entry_ok(i, kv, cfg):
            return SignalEvent(
                Action.ENTER_LONG, "cross_down_25", times[i], c[i], k_val, d_val
            )
        if cfg.mode in ("short_only", "both") and short_entry_ok(i, kv, cfg):
            return SignalEvent(
                Action.ENTER_SHORT, "cross_up_75", times[i], c[i], k_val, d_val
            )

    return SignalEvent(Action.NONE, "", times[i], c[i], k_val, d_val)


def run_simulation(
    df: pd.DataFrame,
    cfg: BotConfig,
    start_equity: float | None = None,
) -> tuple[list[SimTrade], float, float, PositionState]:
    """
    Full bar-by-bar simulation matching scripts/stochrsi_long_short.py.
    Returns (trades, final_equity, max_drawdown_pct, open_position).
    """
    k, d = compute_stoch(df, cfg)
    kv, dv = k.values, d.values
    c, h, lo = df["close"].values, df["high"].values, df["low"].values
    times = df.index
    lb = cfg.levels.lookback_bars
    trail = cfg.trail.callback_pct
    lev = cfg.leverage
    fee = cfg.fees.taker_rate
    lv = cfg.levels

    eq = start_equity if start_equity is not None else cfg.start_equity_usdt
    peak_eq = eq
    max_dd = 0.0
    trades: list[SimTrade] = []
    pos = PositionState()
    eq0 = 0.0

    for i in range(lb + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        if pos.side is None:
            entered = False
            if cfg.mode in ("long_only", "both") and long_entry_ok(i, kv, cfg):
                pos = PositionState(Side.LONG, c[i], times[i], h[i])
                eq0 = eq
                eq -= eq * lev * fee
                entered = True
            elif cfg.mode in ("short_only", "both") and short_entry_ok(i, kv, cfg):
                pos = PositionState(Side.SHORT, c[i], times[i], lo[i])
                eq0 = eq
                eq -= eq * lev * fee
                entered = True
            if entered:
                continue

        if pos.side == Side.LONG:
            pos.extreme = max(pos.extreme, h[i])
            trail_stop = pos.extreme * (1 - trail / 100)
            ex_p, reason = None, ""
            if lo[i] <= trail_stop:
                ex_p, reason = trail_stop, f"trail_{trail:.0f}pct"
            elif cross_up(kv[i - 1], kv[i], lv.exit_long):
                ex_p, reason = c[i], "stoch_75"

            if ex_p is not None:
                ret = (ex_p / pos.entry_price - 1) * 100
                new_eq = max(0.0, eq0 + eq0 * lev * (ret / 100) - abs(eq0 * lev * fee))
                trades.append(
                    SimTrade(
                        pos.side, pos.entry_time, times[i],
                        pos.entry_price, ex_p, eq0, new_eq - eq0, reason,
                    )
                )
                eq = new_eq
                pos = PositionState()
                peak_eq = max(peak_eq, eq)
                max_dd = max(max_dd, (peak_eq - eq) / peak_eq * 100 if peak_eq else 0)

        elif pos.side == Side.SHORT:
            pos.extreme = min(pos.extreme, lo[i])
            trail_stop = pos.extreme * (1 + trail / 100)
            ex_p, reason = None, ""
            if h[i] >= trail_stop:
                ex_p, reason = trail_stop, f"trail_{trail:.0f}pct"
            elif cross_down(kv[i - 1], kv[i], lv.exit_short):
                ex_p, reason = c[i], "stoch_25"

            if ex_p is not None:
                ret = (pos.entry_price / ex_p - 1) * 100
                new_eq = max(0.0, eq0 + eq0 * lev * (ret / 100) - abs(eq0 * lev * fee))
                trades.append(
                    SimTrade(
                        pos.side, pos.entry_time, times[i],
                        pos.entry_price, ex_p, eq0, new_eq - eq0, reason,
                    )
                )
                eq = new_eq
                pos = PositionState()
                peak_eq = max(peak_eq, eq)
                max_dd = max(max_dd, (peak_eq - eq) / peak_eq * 100 if peak_eq else 0)

    return trades, eq, max_dd, pos


def latest_snapshot(df: pd.DataFrame, cfg: BotConfig, closed_only: bool = True) -> dict:
    """Current indicator values and signal on last closed bar."""
    k, d = compute_stoch(df, cfg)
    idx = len(df) - 1
    if closed_only and "close_time" in df.columns:
        idx = last_closed_index(df)

    kv, dv = k.values, d.values
    pos = PositionState()
    # Replay simulation to get current position state
    _, _, _, pos = run_simulation(df.iloc[: idx + 1], cfg)

    event = evaluate_bar(idx, df, kv, dv, pos, cfg)
    lv = cfg.levels
    window = kv[max(0, idx - lv.lookback_bars) : idx + 1]

    return {
        "bar_time": df.index[idx],
        "price": float(df["close"].iloc[idx]),
        "k": float(k.iloc[idx]),
        "d": float(d.iloc[idx]),
        "max_k_lookback": float(np.nanmax(window)),
        "position": pos.side.value if pos.side else None,
        "entry_price": pos.entry_price if pos.side else None,
        "entry_time": pos.entry_time,
        "signal": event,
    }


def last_closed_index(df: pd.DataFrame) -> int:
    from stochrsi_bot.data.klines import last_closed_bar_index
    return last_closed_bar_index(df)
