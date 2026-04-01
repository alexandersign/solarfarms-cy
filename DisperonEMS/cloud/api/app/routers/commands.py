"""
Command API Router

Dispatch control commands to edge sites via NATS.
"""

from datetime import datetime
from uuid import UUID
from fastapi import APIRouter, HTTPException
from sqlalchemy import select
import structlog

from app.models.schemas import CommandCreate, CommandResponse
from app.models.database import Site, Command, CommandStatus
from app.services.db_service import db_service
from app.services.nats_service import nats_service

logger = structlog.get_logger()
router = APIRouter()


@router.post("/{site_id}", response_model=CommandResponse, status_code=201)
async def send_command(site_id: str, command: CommandCreate):
    """Send a control command to a site.

    The command is validated, logged to the database, and dispatched
    to the edge device via NATS.
    """
    async with db_service.get_session() as session:
        # Verify site exists
        result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        # Validate command
        if command.active_power_kw is not None:
            if abs(command.active_power_kw) > site.rated_power_kw:
                raise HTTPException(
                    status_code=400,
                    detail=f"Power setpoint exceeds rated capacity ({site.rated_power_kw}kW)"
                )

        # Create command record
        cmd = Command(
            site_id=site.id,
            source="cloud_api",
            active_power_kw=command.active_power_kw,
            reactive_power_kvar=command.reactive_power_kvar,
            mode=command.mode,
            reason=command.reason,
            status=CommandStatus.PENDING,
            created_by="api_user",  # TODO: from auth token
        )
        session.add(cmd)
        await session.commit()
        await session.refresh(cmd)

        # Dispatch via NATS
        try:
            await nats_service.send_command(site_id, {
                "type": "setpoint",
                "command_id": str(cmd.id),
                "active_power_kw": command.active_power_kw,
                "reactive_power_kvar": command.reactive_power_kvar,
                "mode": command.mode,
                "source": "cloud_api",
            })
            cmd.status = CommandStatus.SENT
            cmd.sent_at = datetime.utcnow()
            await session.commit()
            await session.refresh(cmd)
            logger.info(
                "Command dispatched",
                site_id=site_id,
                command_id=str(cmd.id),
                power_kw=command.active_power_kw,
            )
        except Exception as e:
            cmd.status = CommandStatus.FAILED
            cmd.response = str(e)
            await session.commit()
            raise HTTPException(status_code=503, detail=f"Failed to dispatch command: {e}")

        return cmd


@router.get("/{site_id}", response_model=list[CommandResponse])
async def list_commands(site_id: str, limit: int = 50):
    """List recent commands for a site."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        result = await session.execute(
            select(Command)
            .where(Command.site_id == site.id)
            .order_by(Command.created_at.desc())
            .limit(limit)
        )
        return result.scalars().all()


@router.get("/{site_id}/{command_id}", response_model=CommandResponse)
async def get_command(site_id: str, command_id: UUID):
    """Get command details and status."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Command).where(Command.id == command_id)
        )
        cmd = result.scalar_one_or_none()
        if not cmd:
            raise HTTPException(status_code=404, detail="Command not found")
        return cmd
