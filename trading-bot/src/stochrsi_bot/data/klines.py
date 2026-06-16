"""Kline fetch — spot API for backtest parity; futures API for live/testnet."""

from __future__ import annotations

import json
import ssl
import urllib.error
import urllib.request
from datetime import datetime, timezone

import pandas as pd

SPOT_KLINES = "https://api.binance.com/api/v3/klines"
FUTURES_KLINES = "https://fapi.binance.com/fapi/v1/klines"
TESTNET_KLINES = "https://testnet.binancefuture.com/fapi/v1/klines"


def _urlopen(req: urllib.request.Request, timeout: int = 30):
    """Open URL; retry with unverified SSL if corporate proxy breaks cert chain."""
    try:
        return urllib.request.urlopen(req, timeout=timeout)
    except urllib.error.URLError as exc:
        if "CERTIFICATE_VERIFY_FAILED" not in str(exc):
            raise
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return urllib.request.urlopen(req, timeout=timeout, context=ctx)


def fetch_klines(
    symbol: str = "BTCUSDT",
    interval: str = "1d",
    limit: int = 500,
    start_ms: int | None = None,
    *,
    futures: bool = False,
    testnet: bool = False,
) -> pd.DataFrame:
    """Fetch OHLCV klines. Default: spot (matches backtest scripts)."""
    base = TESTNET_KLINES if testnet else (FUTURES_KLINES if futures else SPOT_KLINES)
    rows: list = []
    cursor = start_ms
    while len(rows) < limit:
        batch = min(1000, limit - len(rows))
        url = f"{base}?symbol={symbol}&interval={interval}&limit={batch}"
        if cursor:
            url += f"&startTime={cursor}"
        req = urllib.request.Request(url, headers={"User-Agent": "stochrsi-bot/0.1"})
        with _urlopen(req) as resp:
            chunk = json.loads(resp.read())
        if not chunk:
            break
        rows.extend(chunk)
        if len(chunk) < batch:
            break
        cursor = chunk[-1][0] + 1

    df = pd.DataFrame(
        rows,
        columns=[
            "open_time", "open", "high", "low", "close", "volume",
            "close_time", "quote_vol", "trades", "taker_buy_base",
            "taker_buy_quote", "ignore",
        ],
    )
    df["timestamp"] = pd.to_datetime(df["open_time"], unit="ms", utc=True)
    df["close_time"] = pd.to_datetime(df["close_time"], unit="ms", utc=True)
    for col in ("open", "high", "low", "close"):
        df[col] = df[col].astype(float)
    return df.set_index("timestamp").sort_index()


def last_closed_bar_index(df: pd.DataFrame) -> int:
    """Index of the last fully closed candle (exclude forming bar)."""
    now = pd.Timestamp.now(tz="UTC")
    closed = df[df["close_time"] <= now]
    if closed.empty:
        return 0
    return df.index.get_loc(closed.index[-1])
