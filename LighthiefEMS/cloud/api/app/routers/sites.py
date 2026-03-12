"""
Site Management API Router

CRUD operations for BESS site management.
"""

from datetime import datetime
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select
import structlog

from app.models.schemas import SiteCreate, SiteResponse, SiteUpdate, DeviceCreate, DeviceResponse
from app.models.database import Site, Device, SiteStatus
from app.services.db_service import db_service

logger = structlog.get_logger()
router = APIRouter()


@router.get("/", response_model=list[SiteResponse])
async def list_sites(
    market: Optional[str] = Query(None, description="Filter by market code"),
    status: Optional[str] = Query(None, description="Filter by status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
):
    """List all BESS sites with optional filtering."""
    async with db_service.get_session() as session:
        query = select(Site)
        if market:
            query = query.where(Site.market == market)
        if status:
            query = query.where(Site.status == status)
        query = query.offset(skip).limit(limit).order_by(Site.created_at.desc())

        result = await session.execute(query)
        sites = result.scalars().all()
        return sites


@router.post("/", response_model=SiteResponse, status_code=201)
async def create_site(site_data: SiteCreate):
    """Register a new BESS site."""
    async with db_service.get_session() as session:
        # Check for duplicate site_id
        existing = await session.execute(
            select(Site).where(Site.site_id == site_data.site_id)
        )
        if existing.scalar_one_or_none():
            raise HTTPException(status_code=409, detail=f"Site {site_data.site_id} already exists")

        site = Site(**site_data.model_dump())
        session.add(site)
        await session.commit()
        await session.refresh(site)

        logger.info("Site created", site_id=site.site_id, market=site.market)
        return site


@router.get("/{site_id}", response_model=SiteResponse)
async def get_site(site_id: str):
    """Get site details by site_id."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")
        return site


@router.patch("/{site_id}", response_model=SiteResponse)
async def update_site(site_id: str, update: SiteUpdate):
    """Update site details."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        update_data = update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(site, key, value)

        site.updated_at = datetime.utcnow()
        await session.commit()
        await session.refresh(site)

        logger.info("Site updated", site_id=site_id, fields=list(update_data.keys()))
        return site


@router.delete("/{site_id}", status_code=204)
async def delete_site(site_id: str):
    """Delete a site (decommission)."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        await session.delete(site)
        await session.commit()
        logger.info("Site deleted", site_id=site_id)


# ─── Device Endpoints ────────────────────────────────────────────────────────

@router.get("/{site_id}/devices", response_model=list[DeviceResponse])
async def list_devices(site_id: str):
    """List all devices for a site."""
    async with db_service.get_session() as session:
        site_result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = site_result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        result = await session.execute(
            select(Device).where(Device.site_id == site.id)
        )
        return result.scalars().all()


@router.post("/{site_id}/devices", response_model=DeviceResponse, status_code=201)
async def add_device(site_id: str, device_data: DeviceCreate):
    """Add a device to a site."""
    async with db_service.get_session() as session:
        site_result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = site_result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        device = Device(site_id=site.id, **device_data.model_dump())
        session.add(device)
        await session.commit()
        await session.refresh(device)

        logger.info("Device added", site_id=site_id, device_type=device.device_type)
        return device
