"""Load YAML config + .env overrides."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Literal

import yaml
from dotenv import load_dotenv

Mode = Literal["long_only", "short_only", "both"]
MarginType = Literal["ISOLATED", "CROSSED"]


@dataclass
class StochRsiConfig:
    rsi_len: int = 14
    stoch_len: int = 14
    smooth_k: int = 3
    smooth_d: int = 3


@dataclass
class LevelsConfig:
    overbought: float = 75.0
    oversold: float = 25.0
    entry_long: float = 25.0
    exit_long: float = 75.0
    entry_short: float = 75.0
    exit_short: float = 25.0
    lookback_bars: int = 30


@dataclass
class TrailConfig:
    callback_pct: float = 2.0


@dataclass
class OptionalConfig:
    min_bars_since_ob: int = 0
    friday_close_if_losing: bool = True
    friday_check_utc_hour: int = 20


@dataclass
class FeesConfig:
    taker_rate: float = 0.0005


@dataclass
class RiskConfig:
    min_equity_usdt: float = 50.0
    max_drawdown_pct: float = 40.0
    max_daily_loss_pct: float = 15.0
    kill_switch_file: str = "STOP"


@dataclass
class ExchangeConfig:
    testnet_base_url: str = "https://testnet.binancefuture.com"
    mainnet_base_url: str = "https://fapi.binance.com"


@dataclass
class BotConfig:
    symbol: str = "BTCUSDT"
    interval: str = "1d"
    mode: Mode = "long_only"
    stoch_rsi: StochRsiConfig = field(default_factory=StochRsiConfig)
    levels: LevelsConfig = field(default_factory=LevelsConfig)
    trail: TrailConfig = field(default_factory=TrailConfig)
    leverage: int = 10
    margin_type: MarginType = "ISOLATED"
    position_mode: str = "ONE_WAY"
    compound: bool = True
    optional: OptionalConfig = field(default_factory=OptionalConfig)
    fees: FeesConfig = field(default_factory=FeesConfig)
    risk: RiskConfig = field(default_factory=RiskConfig)
    exchange: ExchangeConfig = field(default_factory=ExchangeConfig)
    bot_enabled: bool = True
    binance_testnet: bool = True
    binance_api_key: str = ""
    binance_api_secret: str = ""
    start_equity_usdt: float = 1000.0
    auto_execute: bool = False


def _nested(data: dict, cls, defaults):
    if not data:
        return defaults
    kwargs = {k: v for k, v in data.items() if k in defaults.__dataclass_fields__}
    return cls(**kwargs)


def load_config(
    config_path: Path | None = None,
    env_path: Path | None = None,
    mode_override: str | None = None,
) -> BotConfig:
    root = Path(__file__).resolve().parents[2]
    cfg_file = config_path or root / "config" / "default.yaml"
    env_file = env_path or root / ".env"

    if env_file.exists():
        load_dotenv(env_file)

    with open(cfg_file) as f:
        raw = yaml.safe_load(f) or {}

    cfg = BotConfig(
        symbol=raw.get("symbol", "BTCUSDT"),
        interval=raw.get("interval", "1d"),
        mode=raw.get("mode", "long_only"),
        stoch_rsi=_nested(raw.get("stoch_rsi", {}), StochRsiConfig, StochRsiConfig()),
        levels=_nested(raw.get("levels", {}), LevelsConfig, LevelsConfig()),
        trail=_nested(raw.get("trail", {}), TrailConfig, TrailConfig()),
        leverage=int(raw.get("leverage", 10)),
        margin_type=raw.get("margin_type", "ISOLATED"),
        position_mode=raw.get("position_mode", "ONE_WAY"),
        compound=bool(raw.get("compound", True)),
        optional=_nested(raw.get("optional", {}), OptionalConfig, OptionalConfig()),
        fees=_nested(raw.get("fees", {}), FeesConfig, FeesConfig()),
        risk=_nested(raw.get("risk", {}), RiskConfig, RiskConfig()),
        exchange=_nested(raw.get("exchange", {}), ExchangeConfig, ExchangeConfig()),
        bot_enabled=os.getenv("BOT_ENABLED", "true").lower() in ("1", "true", "yes"),
        binance_testnet=os.getenv("BINANCE_TESTNET", "true").lower() in ("1", "true", "yes"),
        binance_api_key=os.getenv("BINANCE_API_KEY", ""),
        binance_api_secret=os.getenv("BINANCE_API_SECRET", ""),
    )

    if mode_override:
        cfg.mode = mode_override  # type: ignore[assignment]

    env_mode = os.getenv("BOT_MODE")
    if env_mode and not mode_override:
        cfg.mode = env_mode  # type: ignore[assignment]

    return cfg
