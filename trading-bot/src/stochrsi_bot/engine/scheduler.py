"""Daily evaluation scheduler helpers."""

from __future__ import annotations

import time
from datetime import datetime, timezone


def seconds_until_daily_eval(utc_hour: int = 0, utc_minute: int = 10) -> float:
    """Seconds until next daily candle eval (default 00:10 UTC)."""
    now = datetime.now(timezone.utc)
    target = now.replace(hour=utc_hour, minute=utc_minute, second=0, microsecond=0)
    if now >= target:
        from datetime import timedelta
        target = target + timedelta(days=1)
    return (target - now).total_seconds()


def sleep_until_daily_eval(utc_hour: int = 0, utc_minute: int = 10) -> None:
    delay = seconds_until_daily_eval(utc_hour, utc_minute)
    if delay > 0:
        time.sleep(delay)
