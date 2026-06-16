"""Entry/exit signal evaluation on last closed daily bar."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum

import numpy as np
import pandas as pd

from .config import BotConfig
from .indicators import stoch_rsi


class Action(str, Enum):
    NONE = "none"
    ENTER_LONG = "enter_long"
    ENTER_SHORT = "enter_short"
    EXIT_STOCH_LONG = "exit_stoch_long"
    EXIT_STOCH_SHORT = "exit_stoch_short"
    FRIDAY_CLOSE_LOSING = "friday_close_losing"


@dataclass
class SignalResult:
    action: Action
    bar_time: pd.Timestamp
    k: float
    d: float
    close: float
    message: str


def evaluate_entry(cfg: BotConfig, df: pd.DataFrame, i: int, kv: np.ndarray) -> Action:
    lb = cfg.lookback_bars
    was_ob = np.nanmax(kv[max(0, i - lb) : i]) >= cfg.overbought
    was_os = np.nanmin(kv[max(0, i - lb) : i]) <= cfg.oversold

    if cfg.mode in ("long_only", "both") and was_ob:
        if kv[i - 1] > cfg.oversold >= kv[i]:
            return Action.ENTER_LONG
    if cfg.mode in ("short_only", "both") and was_os:
        if kv[i - 1] < cfg.overbought <= kv[i]:
            return Action.ENTER_SHORT
    return Action.NONE


def evaluate_stoch_exit(cfg: BotConfig, kv: np.ndarray, i: int, side: str) -> Action:
    if side == "LONG" and kv[i - 1] < cfg.overbought <= kv[i]:
        return Action.EXIT_STOCH_LONG
    if side == "SHORT" and kv[i - 1] > cfg.oversold >= kv[i]:
        return Action.EXIT_STOCH_SHORT
    return Action.NONE


def evaluate_signals(cfg: BotConfig, df: pd.DataFrame) -> SignalResult:
    k, d = stoch_rsi(
        df["close"],
        cfg.rsi_len,
        cfg.stoch_len,
        cfg.smooth_k,
        cfg.smooth_d,
    )
    kv, dv = k.values, d.values
    i = len(df) - 1
    if i < cfg.lookback_bars + 1 or np.isnan(kv[i]) or np.isnan(kv[i - 1]):
        return SignalResult(
            Action.NONE,
            df.index[i],
            float(kv[i]) if not np.isnan(kv[i]) else 0,
            float(dv[i]) if not np.isnan(dv[i]) else 0,
            float(df["close"].iloc[i]),
            "Not enough bars for StochRSI",
        )

    entry = evaluate_entry(cfg, df, i, kv)
    if entry != Action.NONE:
        return SignalResult(
            entry,
            df.index[i],
            float(kv[i]),
            float(dv[i]),
            float(df["close"].iloc[i]),
            f"Entry signal: {entry.value}",
        )

    return SignalResult(
        Action.NONE,
        df.index[i],
        float(kv[i]),
        float(dv[i]),
        float(df["close"].iloc[i]),
        "No entry on last closed bar",
    )
