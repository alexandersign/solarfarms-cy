"""Tests for StochRSI indicator parity."""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
import pandas as pd

# Allow importing scripts alongside bot package
REPO = Path(__file__).resolve().parents[2]
SCRIPTS = REPO / "scripts"
sys.path.insert(0, str(SCRIPTS))

from stochrsi_backtest import stoch_rsi as script_stoch_rsi
from stochrsi_bot.indicators import cross_down, cross_up, stoch_rsi


def test_stoch_rsi_matches_script():
    rng = np.random.default_rng(42)
    close = pd.Series(30000 + np.cumsum(rng.normal(0, 500, 200)))
    k1, d1 = stoch_rsi(close)
    k2, d2 = script_stoch_rsi(close)
    valid = ~(k1.isna() | k2.isna())
    np.testing.assert_allclose(k1[valid], k2[valid], rtol=1e-9)
    np.testing.assert_allclose(d1[valid], d2[valid], rtol=1e-9)


def test_cross_detectors():
    assert cross_down(30, 20, 25)
    assert not cross_down(20, 30, 25)
    assert cross_up(20, 30, 25)
    assert not cross_up(30, 20, 25)
