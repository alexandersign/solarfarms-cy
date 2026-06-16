"""Risk guard checks."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from pathlib import Path

from stochrsi_bot.config import BotConfig


@dataclass
class RiskStatus:
    ok: bool
    reason: str = ""


def check_kill_switch(cfg: BotConfig, root: Path | None = None) -> RiskStatus:
    base = root or Path.cwd()
    path = base / cfg.risk.kill_switch_file
    if path.exists():
        return RiskStatus(False, f"kill switch file present: {path.name}")
    return RiskStatus(True)


def check_min_equity(equity: float, cfg: BotConfig) -> RiskStatus:
    if equity < cfg.risk.min_equity_usdt:
        return RiskStatus(False, f"equity {equity:.2f} below min {cfg.risk.min_equity_usdt}")
    return RiskStatus(True)


def check_drawdown(current_equity: float, peak_equity: float, cfg: BotConfig) -> RiskStatus:
    if peak_equity <= 0:
        return RiskStatus(True)
    dd = (peak_equity - current_equity) / peak_equity * 100
    if dd >= cfg.risk.max_drawdown_pct:
        return RiskStatus(False, f"drawdown {dd:.1f}% >= limit {cfg.risk.max_drawdown_pct}%")
    return RiskStatus(True)


def check_daily_loss(
    day_start_equity: float,
    current_equity: float,
    cfg: BotConfig,
) -> RiskStatus:
    if day_start_equity <= 0:
        return RiskStatus(True)
    loss_pct = (day_start_equity - current_equity) / day_start_equity * 100
    if loss_pct >= cfg.risk.max_daily_loss_pct:
        return RiskStatus(False, f"daily loss {loss_pct:.1f}% >= limit {cfg.risk.max_daily_loss_pct}%")
    return RiskStatus(True)


def can_open_position(
    cfg: BotConfig,
    equity: float,
    peak_equity: float,
    day_start_equity: float,
    root: Path | None = None,
) -> RiskStatus:
    for check in (
        check_kill_switch(cfg, root),
        check_min_equity(equity, cfg),
        check_drawdown(equity, peak_equity, cfg),
        check_daily_loss(day_start_equity, equity, cfg),
    ):
        if not check.ok:
            return check
    if not cfg.bot_enabled:
        return RiskStatus(False, "BOT_ENABLED=false")
    return RiskStatus(True)
