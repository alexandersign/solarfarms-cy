"""Friday close-if-losing rule."""

from __future__ import annotations

from datetime import datetime, timezone

import pandas as pd

from stochrsi_bot.config import BotConfig
from stochrsi_bot.signals import PositionState, Side


def is_friday_check_window(now: datetime | None = None, cfg: BotConfig | None = None) -> bool:
    from stochrsi_bot.config import BotConfig as BC

    cfg = cfg or BC()
    now = now or datetime.now(timezone.utc)
    hour = cfg.optional.friday_check_utc_hour
    return now.weekday() == 4 and now.hour >= hour


def should_friday_close(
    pos: PositionState,
    current_price: float,
    cfg: BotConfig,
    now: datetime | None = None,
) -> bool:
    if not cfg.optional.friday_close_if_losing:
        return False
    if pos.side is None:
        return False
    if not is_friday_check_window(now, cfg):
        return False
    if pos.side == Side.LONG and current_price < pos.entry_price:
        return True
    if pos.side == Side.SHORT and current_price > pos.entry_price:
        return True
    return False
