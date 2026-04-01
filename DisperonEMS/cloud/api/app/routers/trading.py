"""
Trading API Router

Trading operations, portfolio management, and market data.
"""

from datetime import datetime
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func
import structlog

from app.models.schemas import TradeCreate, TradeResponse, PortfolioSummary
from app.models.database import Trade
from app.services.db_service import db_service

logger = structlog.get_logger()
router = APIRouter()


@router.post("/trades", response_model=TradeResponse, status_code=201)
async def create_trade(trade: TradeCreate):
    """Create a new trade record."""
    async with db_service.get_session() as session:
        db_trade = Trade(**trade.model_dump())
        db_trade.created_by = "api_user"  # TODO: from auth token
        session.add(db_trade)
        await session.commit()
        await session.refresh(db_trade)

        logger.info(
            "Trade created",
            trade_id=str(db_trade.id),
            market=trade.market,
            direction=trade.direction,
            quantity_mw=trade.quantity_mw,
        )
        return db_trade


@router.get("/trades", response_model=list[TradeResponse])
async def list_trades(
    market: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    limit: int = Query(100, ge=1, le=1000),
):
    """List trades with filtering."""
    async with db_service.get_session() as session:
        query = select(Trade)

        if market:
            query = query.where(Trade.market == market)
        if status:
            query = query.where(Trade.status == status)
        if start_date:
            query = query.where(Trade.delivery_start >= start_date)
        if end_date:
            query = query.where(Trade.delivery_end <= end_date)

        query = query.order_by(Trade.created_at.desc()).limit(limit)
        result = await session.execute(query)
        return result.scalars().all()


@router.get("/trades/{trade_id}", response_model=TradeResponse)
async def get_trade(trade_id: UUID):
    """Get trade details."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Trade).where(Trade.id == trade_id)
        )
        trade = result.scalar_one_or_none()
        if not trade:
            raise HTTPException(status_code=404, detail="Trade not found")
        return trade


@router.post("/trades/{trade_id}/cancel")
async def cancel_trade(trade_id: UUID):
    """Cancel a pending trade."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Trade).where(Trade.id == trade_id)
        )
        trade = result.scalar_one_or_none()
        if not trade:
            raise HTTPException(status_code=404, detail="Trade not found")

        if trade.status not in ("pending", "partially_filled"):
            raise HTTPException(
                status_code=400,
                detail=f"Cannot cancel trade in status: {trade.status}"
            )

        trade.status = "cancelled"
        await session.commit()

        logger.info("Trade cancelled", trade_id=str(trade_id))
        return {"status": "cancelled", "trade_id": str(trade_id)}


@router.get("/portfolio/summary", response_model=PortfolioSummary)
async def portfolio_summary(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
):
    """Get portfolio summary with P&L across all markets."""
    async with db_service.get_session() as session:
        query = select(Trade)
        if start_date:
            query = query.where(Trade.delivery_start >= start_date)
        if end_date:
            query = query.where(Trade.delivery_end <= end_date)

        result = await session.execute(query)
        trades = result.scalars().all()

        total_volume = 0.0
        total_pnl = 0.0
        open_positions = 0
        by_market: dict = {}

        for trade in trades:
            duration_hours = (trade.delivery_end - trade.delivery_start).total_seconds() / 3600
            volume = trade.quantity_mw * duration_hours
            total_volume += volume
            if trade.pnl_eur:
                total_pnl += trade.pnl_eur
            if trade.status in ("pending", "filled", "partially_filled"):
                open_positions += 1

            if trade.market not in by_market:
                by_market[trade.market] = {
                    "count": 0,
                    "volume_mwh": 0.0,
                    "pnl_eur": 0.0,
                }
            by_market[trade.market]["count"] += 1
            by_market[trade.market]["volume_mwh"] += volume
            if trade.pnl_eur:
                by_market[trade.market]["pnl_eur"] += trade.pnl_eur

        return PortfolioSummary(
            total_trades=len(trades),
            total_volume_mwh=total_volume,
            total_pnl_eur=total_pnl,
            open_positions=open_positions,
            by_market=by_market,
        )


@router.get("/positions")
async def get_open_positions():
    """Get current open trading positions."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Trade)
            .where(Trade.status.in_(["pending", "filled", "partially_filled"]))
            .where(Trade.delivery_end >= datetime.utcnow())
            .order_by(Trade.delivery_start)
        )
        trades = result.scalars().all()

        positions = []
        for trade in trades:
            positions.append({
                "trade_id": str(trade.id),
                "market": trade.market,
                "product": trade.product,
                "direction": trade.direction,
                "quantity_mw": trade.quantity_mw,
                "price_eur_mwh": trade.price_eur_mwh,
                "delivery_start": trade.delivery_start.isoformat(),
                "delivery_end": trade.delivery_end.isoformat(),
                "status": trade.status,
            })

        return {"count": len(positions), "positions": positions}
