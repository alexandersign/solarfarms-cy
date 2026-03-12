"""
Alarm Management API Router

View, acknowledge, and manage system alarms.
Integrates with Smart Maintenance for severity-based auto-escalation.
"""

from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func, or_
import structlog

from app.models.schemas import AlarmResponse, AlarmAcknowledge
from app.models.database import (
    Site, Alarm, AlarmState, AlarmSeverity,
    AlarmEscalation, ContactMethod,
    OnCallRoster, WorkOrder, WorkOrderStatus, WorkOrderType, WorkOrderPriority,
    EngineerActivityLog, ActivityType,
)
from app.services.db_service import db_service

logger = structlog.get_logger()
router = APIRouter()

# Severity to escalation level mapping
SEVERITY_ESCALATION = {
    AlarmSeverity.INFO: 1,
    AlarmSeverity.WARNING: 2,
    AlarmSeverity.ALARM: 3,
    AlarmSeverity.CRITICAL: 4,
    AlarmSeverity.EMERGENCY: 5,
}

# SLA response times in minutes per severity level
SEVERITY_SLA_MINUTES = {
    1: None,   # INFO: no SLA
    2: 240,    # WARNING: 4 hours
    3: 60,     # ALARM: 1 hour
    4: 15,     # CRITICAL: 15 minutes
    5: 5,      # EMERGENCY: 5 minutes
}

# Contact method per severity
SEVERITY_CONTACT = {
    1: None,
    2: ContactMethod.PUSH,
    3: ContactMethod.CALL,
    4: ContactMethod.CALL,
    5: ContactMethod.CALL,
}


@router.get("/{site_id}", response_model=list[AlarmResponse])
async def list_alarms(
    site_id: str,
    state: Optional[str] = Query(None, description="Filter: active, acknowledged, cleared"),
    severity: Optional[str] = Query(None, description="Filter: info, warning, alarm, critical, emergency"),
    limit: int = Query(100, ge=1, le=1000),
):
    """List alarms for a site with optional filtering."""
    async with db_service.get_session() as session:
        site_result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = site_result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        query = select(Alarm).where(Alarm.site_id == site.id)

        if state:
            query = query.where(Alarm.state == state)
        if severity:
            query = query.where(Alarm.severity == severity)

        query = query.order_by(Alarm.timestamp.desc()).limit(limit)
        result = await session.execute(query)
        return result.scalars().all()


@router.get("/{site_id}/active", response_model=list[AlarmResponse])
async def get_active_alarms(site_id: str):
    """Get all active (unacknowledged) alarms for a site."""
    async with db_service.get_session() as session:
        site_result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = site_result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        result = await session.execute(
            select(Alarm)
            .where(Alarm.site_id == site.id)
            .where(Alarm.state == AlarmState.ACTIVE)
            .order_by(Alarm.severity.desc(), Alarm.timestamp.desc())
        )
        return result.scalars().all()


@router.get("/summary/all")
async def alarm_summary():
    """Get alarm summary counts across all sites."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(
                Alarm.severity,
                Alarm.state,
                func.count(Alarm.id).label("count"),
            )
            .where(Alarm.state != AlarmState.CLEARED)
            .group_by(Alarm.severity, Alarm.state)
        )
        rows = result.all()

        summary = {
            "total_active": 0,
            "by_severity": {},
        }
        for severity, state, count in rows:
            if state == AlarmState.ACTIVE:
                summary["total_active"] += count
            if severity not in summary["by_severity"]:
                summary["by_severity"][severity] = {"active": 0, "acknowledged": 0}
            summary["by_severity"][severity][state] = count

        return summary


@router.post("/{alarm_id}/acknowledge", response_model=AlarmResponse)
async def acknowledge_alarm(alarm_id: UUID, ack: AlarmAcknowledge):
    """Acknowledge an alarm."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Alarm).where(Alarm.id == alarm_id)
        )
        alarm = result.scalar_one_or_none()
        if not alarm:
            raise HTTPException(status_code=404, detail="Alarm not found")

        if alarm.state != AlarmState.ACTIVE:
            raise HTTPException(
                status_code=400,
                detail=f"Alarm is not active (current state: {alarm.state})"
            )

        alarm.state = AlarmState.ACKNOWLEDGED
        alarm.acknowledged_by = ack.acknowledged_by
        alarm.acknowledged_at = datetime.utcnow()
        await session.commit()
        await session.refresh(alarm)

        logger.info("Alarm acknowledged", alarm_id=str(alarm_id), by=ack.acknowledged_by)
        return alarm


@router.post("/{alarm_id}/clear", response_model=AlarmResponse)
async def clear_alarm(alarm_id: UUID):
    """Clear an alarm."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Alarm).where(Alarm.id == alarm_id)
        )
        alarm = result.scalar_one_or_none()
        if not alarm:
            raise HTTPException(status_code=404, detail="Alarm not found")

        alarm.state = AlarmState.CLEARED
        alarm.cleared_at = datetime.utcnow()
        await session.commit()
        await session.refresh(alarm)

        logger.info("Alarm cleared", alarm_id=str(alarm_id))
        return alarm


# ─── Auto-Escalation on Alarm Ingestion ──────────────────────────────────────

@router.post("/{site_id}/ingest", response_model=AlarmResponse)
async def ingest_alarm(
    site_id: str,
    severity: str = Query(..., description="info, warning, alarm, critical, emergency"),
    source: str = Query(..., description="Alarm source (BMS, PCS, SCADA, etc.)"),
    code: int = Query(..., description="Alarm code"),
    message: str = Query(..., description="Alarm message"),
    details: Optional[str] = Query(None, description="Additional details"),
):
    """
    Ingest a new alarm from the edge and auto-escalate based on severity.

    This endpoint:
    1. Creates the alarm record
    2. For L2+ severities: auto-creates an escalation
    3. For L3+ severities: auto-creates a work order and dispatches engineer
    4. Tracks call initiation for pickup verification
    """
    async with db_service.get_session() as session:
        # Resolve site
        site_result = await session.execute(
            select(Site).where(Site.site_id == site_id)
        )
        site = site_result.scalar_one_or_none()
        if not site:
            raise HTTPException(status_code=404, detail=f"Site {site_id} not found")

        now = datetime.utcnow()
        severity_enum = AlarmSeverity(severity)
        severity_level = SEVERITY_ESCALATION.get(severity_enum, 1)

        # Create alarm
        alarm = Alarm(
            site_id=site.id,
            severity=severity_enum,
            state=AlarmState.ACTIVE,
            source=source,
            code=code,
            message=message,
            details=details,
            timestamp=now,
        )
        session.add(alarm)
        await session.flush()  # Get alarm.id

        # Auto-escalate for L2+
        if severity_level >= 2:
            sla_minutes = SEVERITY_SLA_MINUTES[severity_level]
            contact_method = SEVERITY_CONTACT[severity_level]

            # Find on-call engineer
            on_call_query = (
                select(OnCallRoster)
                .where(OnCallRoster.is_active.is_(True))
                .where(OnCallRoster.start_time <= now)
                .where(OnCallRoster.end_time > now)
                .where(
                    or_(
                        OnCallRoster.site_id == site.id,
                        OnCallRoster.site_id.is_(None),
                    )
                )
                .order_by(OnCallRoster.priority)
            )
            on_call_result = await session.execute(on_call_query)
            on_call_list = on_call_result.scalars().all()
            engineer_id = on_call_list[0].engineer_id if on_call_list else None

            # For L5 EMERGENCY: notify ALL on-call engineers
            if severity_level == 5:
                for slot in on_call_list:
                    esc = AlarmEscalation(
                        alarm_id=alarm.id,
                        severity_level=severity_level,
                        escalation_step=slot.priority,
                        engineer_id=slot.engineer_id,
                        contact_method=contact_method,
                        contact_initiated_at=now,
                    )
                    session.add(esc)
                    # Log each dispatch
                    activity = EngineerActivityLog(
                        engineer_id=slot.engineer_id,
                        activity_type=ActivityType.CALL_RECEIVED,
                        details={
                            "alarm_id": str(alarm.id),
                            "severity": severity_level,
                            "emergency": True,
                        },
                    )
                    session.add(activity)
            else:
                # Standard escalation: primary on-call only
                esc = AlarmEscalation(
                    alarm_id=alarm.id,
                    severity_level=severity_level,
                    escalation_step=1,
                    engineer_id=engineer_id,
                    contact_method=contact_method,
                    contact_initiated_at=now,
                )
                session.add(esc)

                if engineer_id:
                    activity = EngineerActivityLog(
                        engineer_id=engineer_id,
                        activity_type=ActivityType.CALL_RECEIVED,
                        details={
                            "alarm_id": str(alarm.id),
                            "severity": severity_level,
                        },
                    )
                    session.add(activity)

            # Auto-create work order for L3+
            if severity_level >= 3:
                priority_map = {
                    3: WorkOrderPriority.HIGH,
                    4: WorkOrderPriority.CRITICAL,
                    5: WorkOrderPriority.EMERGENCY,
                }
                sla_deadline = now + timedelta(minutes=sla_minutes) if sla_minutes else None

                wo = WorkOrder(
                    site_id=site.id,
                    alarm_id=alarm.id,
                    assigned_engineer_id=engineer_id,
                    type=WorkOrderType.REACTIVE,
                    priority=priority_map.get(severity_level, WorkOrderPriority.HIGH),
                    status=WorkOrderStatus.ASSIGNED if engineer_id else WorkOrderStatus.CREATED,
                    title=f"[L{severity_level}] {message}",
                    description=f"Auto-generated from {source} alarm (code {code}). {details or ''}",
                    sla_deadline=sla_deadline,
                    assigned_at=now if engineer_id else None,
                )
                session.add(wo)

            logger.info(
                "Alarm auto-escalated",
                alarm_id=str(alarm.id),
                severity=severity,
                level=severity_level,
                engineer_dispatched=str(engineer_id) if engineer_id else "none",
                work_order_created=severity_level >= 3,
            )

        await session.commit()
        await session.refresh(alarm)
        return alarm
