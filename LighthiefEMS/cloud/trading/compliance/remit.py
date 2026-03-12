"""
REMIT (Regulation on Energy Market Integrity and Transparency) Reporting

EU Regulation 1227/2011 requires reporting of:
    - Wholesale energy transactions (trades)
    - Orders to trade (submitted orders)
    - Fundamental data (generation, consumption)

Reports are submitted to ACER (Agency for the Cooperation of Energy Regulators)
via the ARIS (ACER REMIT Information System) platform.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional
import structlog

logger = structlog.get_logger()


@dataclass
class REMITTransaction:
    """A REMIT-reportable transaction."""
    transaction_id: str
    report_type: str  # "trade", "order", "fundamental"
    market_participant_id: str  # ACER registration code
    counterparty_id: Optional[str] = None
    market: str = ""
    product: str = ""
    delivery_start: Optional[datetime] = None
    delivery_end: Optional[datetime] = None
    quantity_mw: float = 0.0
    price_eur_mwh: float = 0.0
    buy_sell: str = ""
    trade_timestamp: Optional[datetime] = None
    venue: str = ""  # Exchange name or "OTC"
    reporting_deadline: Optional[datetime] = None


class REMITReporter:
    """
    Generates REMIT-compliant transaction reports for ACER ARIS.

    Reporting requirements:
    - Standard contracts: T+1 reporting
    - Non-standard contracts: Report on conclusion
    - Orders to trade: Real-time reporting
    """

    def __init__(self, participant_id: str):
        self.participant_id = participant_id
        self.pending_reports: list[REMITTransaction] = []
        self.submitted_reports: list[REMITTransaction] = []
        logger.info("REMIT reporter initialized", participant_id=participant_id)

    def create_trade_report(
        self,
        transaction_id: str,
        market: str,
        product: str,
        delivery_start: datetime,
        delivery_end: datetime,
        quantity_mw: float,
        price_eur_mwh: float,
        buy_sell: str,
        trade_timestamp: datetime,
        venue: str,
        counterparty_id: Optional[str] = None,
    ) -> REMITTransaction:
        """Create a REMIT transaction report for a completed trade."""
        report = REMITTransaction(
            transaction_id=transaction_id,
            report_type="trade",
            market_participant_id=self.participant_id,
            counterparty_id=counterparty_id,
            market=market,
            product=product,
            delivery_start=delivery_start,
            delivery_end=delivery_end,
            quantity_mw=quantity_mw,
            price_eur_mwh=price_eur_mwh,
            buy_sell=buy_sell,
            trade_timestamp=trade_timestamp,
            venue=venue,
        )
        self.pending_reports.append(report)
        logger.info(
            "REMIT report created",
            transaction_id=transaction_id,
            market=market,
            venue=venue,
        )
        return report

    def submit_pending(self) -> int:
        """Submit all pending REMIT reports to ACER ARIS."""
        count = len(self.pending_reports)
        if count == 0:
            return 0

        # In production: submit via ACER ARIS API
        logger.info(f"Submitting {count} REMIT reports to ACER ARIS")

        self.submitted_reports.extend(self.pending_reports)
        self.pending_reports.clear()

        return count

    def get_reporting_summary(self) -> dict:
        """Get summary of REMIT reporting status."""
        return {
            "pending_reports": len(self.pending_reports),
            "submitted_reports": len(self.submitted_reports),
            "participant_id": self.participant_id,
        }
