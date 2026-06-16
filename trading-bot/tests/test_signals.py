"""Signal parity vs scripts/stochrsi_long_short.py."""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

REPO = Path(__file__).resolve().parents[2]
SCRIPTS = REPO / "scripts"
sys.path.insert(0, str(SCRIPTS))

import pytest

from stochrsi_backtest import stoch_rsi as script_stoch_rsi
from stochrsi_long_short import run as script_run

from stochrsi_bot.config import load_config
from stochrsi_bot.data.klines import fetch_klines
from stochrsi_bot.signals import run_simulation


def _fetch_2y() -> pd.DataFrame:
    days = 730
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days + 60)).timestamp() * 1000)
    df = fetch_klines("BTCUSDT", "1d", limit=days + 100, start_ms=start_ms)
    return df[df.index >= df.index.max() - pd.Timedelta(days=days)]


@pytest.mark.integration
def test_long_only_entry_dates_match_script():
    df = _fetch_2y()
    cfg = load_config()
    cfg.mode = "long_only"

    bot_trades, _, _, _ = run_simulation(df, cfg, start_equity=10000.0)
    script_trades, _, _ = script_run(df, "long_only", trail=cfg.trail.callback_pct, start=10000.0)

    bot_entries = [t.entry_time.date() for t in bot_trades]
    script_entries = [t.entry_time.date() for t in script_trades if t.exit_time]

    assert bot_entries == script_entries, f"bot={bot_entries}\nscript={script_entries}"


@pytest.mark.integration
def test_both_mode_entry_dates_match_script():
    df = _fetch_2y()
    cfg = load_config()
    cfg.mode = "both"

    bot_trades, _, _, _ = run_simulation(df, cfg, start_equity=10000.0)
    script_trades, _, _ = script_run(df, "both", trail=cfg.trail.callback_pct, start=10000.0)

    bot_entries = [(t.side.value, t.entry_time.date()) for t in bot_trades]
    script_entries = [
        (t.side.value, t.entry_time.date()) for t in script_trades if t.exit_time
    ]

    assert bot_entries == script_entries
