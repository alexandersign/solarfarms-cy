"""
Risk Management Module

Pre-trade and post-trade risk checks for the trading engine.
Implements position limits, credit exposure monitoring,
and automated kill-switch for abnormal conditions.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional
import structlog

logger = structlog.get_logger()


@dataclass
class RiskLimits:
    """Risk limits configuration."""
    max_position_mw: float = 10.0  # Maximum net position per market
    max_daily_volume_mwh: float = 100.0  # Maximum daily trading volume
    max_daily_loss_eur: float = 10000.0  # Maximum daily loss
    max_order_size_mw: float = 5.0  # Maximum single order size
    max_price_deviation_percent: float = 50.0  # Max deviation from reference price
    min_price_eur_mwh: float = -500.0  # Minimum acceptable price
    max_price_eur_mwh: float = 4000.0  # Maximum acceptable price
    kill_switch_loss_eur: float = 50000.0  # Kill switch threshold


@dataclass
class RiskCheckResult:
    """Result of a risk check."""
    passed: bool
    checks: list[dict]  # Individual check results
    blocked_reason: Optional[str] = None


class RiskManager:
    """
    Pre-trade and real-time risk management.

    Checks:
    1. Position limits per market
    2. Order size limits
    3. Price reasonableness
    4. Daily volume limits
    5. Daily loss limits
    6. Kill switch (automated trading halt)
    """

    def __init__(self, limits: Optional[RiskLimits] = None):
        self.limits = limits or RiskLimits()
        self.kill_switch_active = False
        self.daily_volume_mwh = 0.0
        self.daily_pnl_eur = 0.0
        self._last_reset = datetime.utcnow().date()

        logger.info(
            "Risk manager initialized",
            max_position_mw=self.limits.max_position_mw,
            max_daily_loss=self.limits.max_daily_loss_eur,
        )

    def pre_trade_check(
        self,
        side: str,
        quantity_mw: float,
        price_eur_mwh: float,
        market: str,
        current_position_mw: float = 0.0,
        reference_price: Optional[float] = None,
    ) -> RiskCheckResult:
        """
        Perform pre-trade risk checks before submitting an order.

        Returns:
            RiskCheckResult with pass/fail and details
        """
        self._check_daily_reset()
        checks = []

        # Kill switch
        if self.kill_switch_active:
            return RiskCheckResult(
                passed=False,
                checks=[{"check": "kill_switch", "passed": False}],
                blocked_reason="Kill switch is active - all trading halted",
            )

        # Order size
        size_ok = quantity_mw <= self.limits.max_order_size_mw
        checks.append({
            "check": "order_size",
            "passed": size_ok,
            "value": quantity_mw,
            "limit": self.limits.max_order_size_mw,
        })

        # Position limit
        if side == "buy":
            new_position = current_position_mw - quantity_mw
        else:
            new_position = current_position_mw + quantity_mw
        position_ok = abs(new_position) <= self.limits.max_position_mw
        checks.append({
            "check": "position_limit",
            "passed": position_ok,
            "value": new_position,
            "limit": self.limits.max_position_mw,
        })

        # Price limits
        price_ok = self.limits.min_price_eur_mwh <= price_eur_mwh <= self.limits.max_price_eur_mwh
        checks.append({
            "check": "price_limits",
            "passed": price_ok,
            "value": price_eur_mwh,
            "min": self.limits.min_price_eur_mwh,
            "max": self.limits.max_price_eur_mwh,
        })

        # Price deviation from reference
        if reference_price and reference_price > 0:
            deviation = abs(price_eur_mwh - reference_price) / reference_price * 100
            deviation_ok = deviation <= self.limits.max_price_deviation_percent
            checks.append({
                "check": "price_deviation",
                "passed": deviation_ok,
                "deviation_percent": deviation,
                "limit": self.limits.max_price_deviation_percent,
            })
        else:
            deviation_ok = True

        # Daily volume
        volume_ok = self.daily_volume_mwh + quantity_mw <= self.limits.max_daily_volume_mwh
        checks.append({
            "check": "daily_volume",
            "passed": volume_ok,
            "current_mwh": self.daily_volume_mwh,
            "limit": self.limits.max_daily_volume_mwh,
        })

        # Daily loss
        loss_ok = abs(self.daily_pnl_eur) < self.limits.max_daily_loss_eur
        checks.append({
            "check": "daily_loss",
            "passed": loss_ok,
            "current_pnl": self.daily_pnl_eur,
            "limit": self.limits.max_daily_loss_eur,
        })

        all_passed = all(c["passed"] for c in checks)

        if not all_passed:
            failed = [c for c in checks if not c["passed"]]
            reason = "; ".join(f"{c['check']} failed" for c in failed)
            logger.warning("Pre-trade check FAILED", reason=reason, checks=checks)
        else:
            logger.debug("Pre-trade check passed", market=market, qty=quantity_mw)

        return RiskCheckResult(
            passed=all_passed,
            checks=checks,
            blocked_reason=None if all_passed else reason,
        )

    def record_fill(self, quantity_mwh: float, pnl_eur: float) -> None:
        """Record a trade execution for daily tracking."""
        self.daily_volume_mwh += quantity_mwh
        self.daily_pnl_eur += pnl_eur

        # Check kill switch
        if self.daily_pnl_eur < -self.limits.kill_switch_loss_eur:
            self.kill_switch_active = True
            logger.error(
                "KILL SWITCH ACTIVATED",
                daily_pnl=self.daily_pnl_eur,
                threshold=-self.limits.kill_switch_loss_eur,
            )

    def activate_kill_switch(self, reason: str) -> None:
        """Manually activate the kill switch."""
        self.kill_switch_active = True
        logger.error("Kill switch manually activated", reason=reason)

    def deactivate_kill_switch(self, authorized_by: str) -> None:
        """Deactivate the kill switch (requires authorization)."""
        self.kill_switch_active = False
        logger.warning("Kill switch deactivated", by=authorized_by)

    def _check_daily_reset(self) -> None:
        """Reset daily counters at midnight."""
        today = datetime.utcnow().date()
        if today != self._last_reset:
            self.daily_volume_mwh = 0.0
            self.daily_pnl_eur = 0.0
            self._last_reset = today
            logger.info("Daily risk counters reset")
