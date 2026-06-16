"""Offline simulation parity on synthetic OHLCV."""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
import pandas as pd

REPO = Path(__file__).resolve().parents[2]
SCRIPTS = REPO / "scripts"
sys.path.insert(0, str(SCRIPTS))

from stochrsi_long_short import run as script_run

from stochrsi_bot.config import BotConfig, LevelsConfig, StochRsiConfig, TrailConfig
from stochrsi_bot.signals import run_simulation


def _synthetic_df(n: int = 400) -> pd.DataFrame:
    rng = np.random.default_rng(7)
    dates = pd.date_range("2024-01-01", periods=n, freq="D", tz="UTC")
    close = 50000 + np.cumsum(rng.normal(0, 800, n))
    high = close + rng.uniform(100, 1200, n)
    low = close - rng.uniform(100, 1200, n)
    open_ = close + rng.normal(0, 300, n)
    df = pd.DataFrame({"open": open_, "high": high, "low": low, "close": close}, index=dates)
    df["close_time"] = dates + pd.Timedelta(hours=23, minutes=59, seconds=59)
    return df


def _cfg(mode: str) -> BotConfig:
    return BotConfig(
        mode=mode,  # type: ignore[arg-type]
        stoch_rsi=StochRsiConfig(),
        levels=LevelsConfig(),
        trail=TrailConfig(callback_pct=2.0),
        leverage=10,
        start_equity_usdt=10000.0,
    )


def test_offline_long_only_matches_script():
    df = _synthetic_df()
    cfg = _cfg("long_only")
    bot_trades, _, _, _ = run_simulation(df, cfg, start_equity=10000.0)
    script_trades, _, _ = script_run(df, "long_only", trail=2.0, start=10000.0)
    bot_entries = [t.entry_time.date() for t in bot_trades]
    script_entries = [t.entry_time.date() for t in script_trades if t.exit_time]
    assert bot_entries == script_entries


def test_offline_both_matches_script():
    df = _synthetic_df()
    cfg = _cfg("both")
    bot_trades, _, _, _ = run_simulation(df, cfg, start_equity=10000.0)
    script_trades, _, _ = script_run(df, "both", trail=2.0, start=10000.0)
    bot_entries = [(t.side.value, t.entry_time.date()) for t in bot_trades]
    script_entries = [(t.side.value, t.entry_time.date()) for t in script_trades if t.exit_time]
    assert bot_entries == script_entries
