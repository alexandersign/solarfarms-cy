"""
OTC / Bilateral Trade Manager

Manages over-the-counter bilateral electricity trades,
PPA contracts, and custom trading agreements.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4
import structlog

logger = structlog.get_logger()


@dataclass
class Counterparty:
    """A trading counterparty."""
    id: UUID = field(default_factory=uuid4)
    name: str = ""
    credit_limit_eur: float = 100000.0
    current_exposure_eur: float = 0.0
    is_active: bool = True


@dataclass
class BilateralContract:
    """A bilateral trading contract."""
    id: UUID = field(default_factory=uuid4)
    counterparty: Counterparty = field(default_factory=Counterparty)
    contract_type: str = "fixed"  # fixed, indexed, baseload, peak, shaped
    volume_mw: float = 0.0
    price_eur_mwh: float = 0.0
    index_reference: Optional[str] = None  # e.g., "EPEX_DAM_DE"
    premium_eur_mwh: float = 0.0  # Premium over index
    delivery_start: datetime = field(default_factory=datetime.utcnow)
    delivery_end: datetime = field(default_factory=datetime.utcnow)
    delivery_profile: str = "baseload"  # baseload, peak, offpeak, custom
    settlement_frequency: str = "monthly"
    status: str = "active"
    created_at: datetime = field(default_factory=datetime.utcnow)


class OTCManager:
    """
    Manages bilateral/OTC trading contracts and PPA agreements.
    """

    def __init__(self):
        self.counterparties: dict[UUID, Counterparty] = {}
        self.contracts: dict[UUID, BilateralContract] = {}
        logger.info("OTC manager initialized")

    def add_counterparty(self, name: str, credit_limit: float = 100000.0) -> Counterparty:
        """Register a trading counterparty."""
        cp = Counterparty(name=name, credit_limit_eur=credit_limit)
        self.counterparties[cp.id] = cp
        logger.info("Counterparty added", name=name, credit_limit=credit_limit)
        return cp

    def create_contract(
        self,
        counterparty_id: UUID,
        contract_type: str,
        volume_mw: float,
        price_eur_mwh: float,
        delivery_start: datetime,
        delivery_end: datetime,
        **kwargs,
    ) -> BilateralContract:
        """Create a new bilateral contract."""
        cp = self.counterparties.get(counterparty_id)
        if not cp:
            raise ValueError(f"Counterparty {counterparty_id} not found")

        contract = BilateralContract(
            counterparty=cp,
            contract_type=contract_type,
            volume_mw=volume_mw,
            price_eur_mwh=price_eur_mwh,
            delivery_start=delivery_start,
            delivery_end=delivery_end,
            **kwargs,
        )
        self.contracts[contract.id] = contract

        logger.info(
            "OTC contract created",
            contract_id=str(contract.id),
            counterparty=cp.name,
            type=contract_type,
            volume_mw=volume_mw,
            price=price_eur_mwh,
        )
        return contract

    def get_delivery_schedule(
        self,
        date: datetime,
    ) -> list[dict]:
        """Get delivery obligations for a specific date."""
        schedule = []
        for contract in self.contracts.values():
            if contract.status != "active":
                continue
            if contract.delivery_start.date() <= date.date() <= contract.delivery_end.date():
                schedule.append({
                    "contract_id": str(contract.id),
                    "counterparty": contract.counterparty.name,
                    "volume_mw": contract.volume_mw,
                    "price_eur_mwh": contract.price_eur_mwh,
                    "profile": contract.delivery_profile,
                })
        return schedule

    def calculate_exposure(self) -> dict:
        """Calculate current credit exposure by counterparty."""
        exposure = {}
        for contract in self.contracts.values():
            if contract.status != "active":
                continue
            cp_name = contract.counterparty.name
            remaining_hours = max(0, (contract.delivery_end - datetime.utcnow()).total_seconds() / 3600)
            value = contract.volume_mw * remaining_hours * contract.price_eur_mwh
            exposure[cp_name] = exposure.get(cp_name, 0.0) + value
        return exposure
