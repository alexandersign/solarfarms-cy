"""Stochastic RSI — shared with scripts/stochrsi_backtest.py."""

from __future__ import annotations

import numpy as np
import pandas as pd


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


def cross_down(prev_k: float, curr_k: float, level: float) -> bool:
    return prev_k > level >= curr_k


def cross_up(prev_k: float, curr_k: float, level: float) -> bool:
    return prev_k < level <= curr_k


def was_overbought(kv: np.ndarray, i: int, lookback: int, level: float) -> bool:
    window = kv[max(0, i - lookback) : i]
    return bool(np.nanmax(window) >= level)


def was_oversold(kv: np.ndarray, i: int, lookback: int, level: float) -> bool:
    window = kv[max(0, i - lookback) : i]
    return bool(np.nanmin(window) <= level)


def bars_since_level(kv: np.ndarray, i: int, level: float, above: bool = True) -> int | None:
    """Bars since K last touched level (searching backward from i-1)."""
    for j in range(i - 1, -1, -1):
        if np.isnan(kv[j]):
            continue
        if above and kv[j] >= level:
            return i - 1 - j
        if not above and kv[j] <= level:
            return i - 1 - j
    return None
