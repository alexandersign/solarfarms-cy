"""Load YAML config + .env overrides."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path

import yaml
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]


@dataclass
class BotConfig:
    symbol: str = "BTCUSDT"
    interval: str = "1d"
    mode: str = "long_only"
    rsi_len: int = 14
    stoch_len: int = 14
    smooth_k: int = 3
    smooth_d: int = 3
    overbought: float = 75.0
    oversold: float = 25.0
    lookback_bars: int = 30
    trail_callback_pct: float = 2.0
    leverage: int = 10
    margin_type: str = "ISOLATED"
    friday_close_if_losing: bool = True
    friday_hour_utc: int = 20
    testnet: bool = True
    dry_run: bool = True
    api_key: str = ""
    api_secret: str = ""
    testnet_base_url: str = "https://testnet.binancefuture.com"
    mainnet_base_url: str = "https://fapi.binance.com"
    state_db: Path = field(default_factory=lambda: ROOT / "data" / "state.db")
    kill_switch_file: Path = field(default_factory=lambda: ROOT / "STOP")

    @property
    def base_url(self) -> str:
        return self.testnet_base_url if self.testnet else self.mainnet_base_url


def load_config(config_path: Path | None = None) -> BotConfig:
    load_dotenv(ROOT / ".env")
    path = config_path or ROOT / "config" / "default.yaml"
    with open(path, encoding="utf-8") as f:
        raw = yaml.safe_load(f)

    cfg = BotConfig(
        symbol=raw.get("symbol", "BTCUSDT"),
        interval=raw.get("interval", "1d"),
        mode=os.getenv("BOT_MODE", raw.get("mode", "long_only")),
        rsi_len=raw["stoch_rsi"]["rsi_len"],
        stoch_len=raw["stoch_rsi"]["stoch_len"],
        smooth_k=raw["stoch_rsi"]["smooth_k"],
        smooth_d=raw["stoch_rsi"]["smooth_d"],
        overbought=raw["levels"]["overbought"],
        oversold=raw["levels"]["oversold"],
        lookback_bars=raw["levels"]["lookback_bars"],
        trail_callback_pct=raw["trail"]["callback_pct"],
        leverage=raw.get("leverage", 10),
        friday_close_if_losing=raw["optional"]["friday_close_if_losing"],
        friday_hour_utc=raw["optional"]["friday_check_utc_hour"],
        testnet=os.getenv("BINANCE_TESTNET", "true").lower() in ("1", "true", "yes"),
        api_key=os.getenv("BINANCE_API_KEY", ""),
        api_secret=os.getenv("BINANCE_API_SECRET", ""),
        testnet_base_url=raw["exchange"]["testnet_base_url"],
        mainnet_base_url=raw["exchange"]["mainnet_base_url"],
        kill_switch_file=ROOT / raw["risk"]["kill_switch_file"],
    )
    return cfg
