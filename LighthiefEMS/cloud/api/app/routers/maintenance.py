"""
Smart Maintenance API Router

Engineer management, alarm escalation with call verification,
work order management, and maintenance scheduling.
"""

from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func, and_, or_
import structlog

from app.models.schemas import (
    EngineerCreate, EngineerUpdate, EngineerLocationUpdate, EngineerResponse,
    OnCallCreate, OnCallResponse,
    EscalationResponse, EscalationAcknowledge,
    WorkOrderCreate, WorkOrderUpdate, WorkOrderResponse,
    ActivityLogCreate, ActivityLogResponse,
    MaintenanceScheduleCreate, MaintenanceScheduleResponse,
    MaintenanceDashboard,
)
from app.models.database import (
    Engineer, EngineerStatus, EngineerRole,
    OnCallRoster,
    Alarm, AlarmEscalation, AlarmState, AlarmSeverity,
    ContactMethod, AckMethod,
    WorkOrder, WorkOrderStatus, WorkOrderType, WorkOrderPriority,
    EngineerActivityLog, ActivityType,
    MaintenanceSchedule,
    Site,
)
from app.services.db_service import db_service

logger = structlog.get_logger()
router = APIRouter()

# ── SLA Configuration ────────────────────────────────────────────────────────

SEVERITY_SLA = {
    # severity_level: (response_sla_minutes, contact_method, auto_escalate_after_minutes)
    1: (None, None, None),               # INFO: dashboard only
    2: (240, ContactMethod.PUSH, 120),    # WARNING: 4h SLA, push, escalate after 2h
    3: (60, ContactMethod.CALL, 15),      # ALARM: 1h SLA, call, escalate after 15min
    4: (15, ContactMethod.CALL, 5),       # CRITICAL: 15min SLA, call, escalate after 5min
    5: (5, ContactMethod.CALL, 2),        # EMERGENCY: 5min SLA, call all immediately
}

SEVERITY_MAP = {
    "info": 1, "warning": 2, "alarm": 3, "critical": 4, "emergency": 5,
}


# ═══════════════════════════════════════════════════════════════════════════════
#  ENGINEERS
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/engineers", response_model=EngineerResponse, tags=["Engineers"])
async def create_engineer(data: EngineerCreate):
    """Register a new maintenance engineer."""
    async with db_service.get_session() as session:
        engineer = Engineer(
            name=data.name,
            phone=data.phone,
            email=data.email,
            role=EngineerRole(data.role),
            certifications=data.certifications,
            assigned_sites=data.assigned_sites,
        )
        session.add(engineer)
        await session.commit()
        await session.refresh(engineer)
        logger.info("Engineer created", name=data.name, id=str(engineer.id))
        return engineer


@router.get("/engineers", response_model=list[EngineerResponse], tags=["Engineers"])
async def list_engineers(
    status: Optional[str] = Query(None, description="Filter by status"),
    active_only: bool = Query(True, description="Only show active engineers"),
):
    """List all engineers with optional filtering."""
    async with db_service.get_session() as session:
        query = select(Engineer)
        if active_only:
            query = query.where(Engineer.is_active.is_(True))
        if status:
            query = query.where(Engineer.status == status)
        query = query.order_by(Engineer.name)
        result = await session.execute(query)
        return result.scalars().all()


@router.get("/engineers/{engineer_id}", response_model=EngineerResponse, tags=["Engineers"])
async def get_engineer(engineer_id: UUID):
    """Get engineer details."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Engineer).where(Engineer.id == engineer_id)
        )
        engineer = result.scalar_one_or_none()
        if not engineer:
            raise HTTPException(status_code=404, detail="Engineer not found")
        return engineer


@router.patch("/engineers/{engineer_id}", response_model=EngineerResponse, tags=["Engineers"])
async def update_engineer(engineer_id: UUID, data: EngineerUpdate):
    """Update engineer details or status."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Engineer).where(Engineer.id == engineer_id)
        )
        engineer = result.scalar_one_or_none()
        if not engineer:
            raise HTTPException(status_code=404, detail="Engineer not found")

        for field, value in data.model_dump(exclude_unset=True).items():
            if field == "role" and value:
                value = EngineerRole(value)
            elif field == "status" and value:
                value = EngineerStatus(value)
            setattr(engineer, field, value)

        await session.commit()
        await session.refresh(engineer)
        logger.info("Engineer updated", id=str(engineer_id))
        return engineer


@router.post("/engineers/{engineer_id}/location", response_model=EngineerResponse, tags=["Engineers"])
async def update_engineer_location(engineer_id: UUID, data: EngineerLocationUpdate):
    """Update engineer GPS location from mobile app."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(Engineer).where(Engineer.id == engineer_id)
        )
        engineer = result.scalar_one_or_none()
        if not engineer:
            raise HTTPException(status_code=404, detail="Engineer not found")

        engineer.current_location_lat = data.latitude
        engineer.current_location_lon = data.longitude
        engineer.location_updated_at = datetime.utcnow()

        # Also log the location update
        log_entry = EngineerActivityLog(
            engineer_id=engineer_id,
            activity_type=ActivityType.LOCATION_UPDATE,
            details={"lat": data.latitude, "lon": data.longitude},
            latitude=data.latitude,
            longitude=data.longitude,
        )
        session.add(log_entry)
        await session.commit()
        await session.refresh(engineer)
        return engineer


# ═══════════════════════════════════════════════════════════════════════════════
#  ON-CALL ROSTER
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/on-call", response_model=OnCallResponse, tags=["On-Call"])
async def create_on_call_slot(data: OnCallCreate):
    """Add an on-call slot for an engineer."""
    async with db_service.get_session() as session:
        slot = OnCallRoster(
            engineer_id=data.engineer_id,
            site_id=data.site_id,
            start_time=data.start_time,
            end_time=data.end_time,
            priority=data.priority,
        )
        session.add(slot)
        await session.commit()
        await session.refresh(slot)
        logger.info("On-call slot created", engineer_id=str(data.engineer_id), priority=data.priority)
        return slot


@router.get("/on-call/current", response_model=list[OnCallResponse], tags=["On-Call"])
async def get_current_on_call(
    site_id: Optional[UUID] = Query(None, description="Filter by site"),
):
    """Get currently active on-call engineers."""
    now = datetime.utcnow()
    async with db_service.get_session() as session:
        query = (
            select(OnCallRoster)
            .where(OnCallRoster.is_active.is_(True))
            .where(OnCallRoster.start_time <= now)
            .where(OnCallRoster.end_time > now)
        )
        if site_id:
            query = query.where(
                or_(OnCallRoster.site_id == site_id, OnCallRoster.site_id.is_(None))
            )
        query = query.order_by(OnCallRoster.priority)
        result = await session.execute(query)
        return result.scalars().all()


# ═══════════════════════════════════════════════════════════════════════════════
#  ALARM ESCALATION
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/escalate/{alarm_id}", response_model=EscalationResponse, tags=["Escalation"])
async def escalate_alarm(alarm_id: UUID):
    """
    Trigger escalation for an alarm.

    The system will:
    1. Determine severity level (L1-L5)
    2. Find on-call engineer for the alarm's site
    3. Initiate contact (push/SMS/call based on severity)
    4. Create an escalation record
    5. Auto-create a work order for L3+ alarms
    """
    async with db_service.get_session() as session:
        # Get alarm
        alarm_result = await session.execute(
            select(Alarm).where(Alarm.id == alarm_id)
        )
        alarm = alarm_result.scalar_one_or_none()
        if not alarm:
            raise HTTPException(status_code=404, detail="Alarm not found")

        severity_level = SEVERITY_MAP.get(alarm.severity.value if hasattr(alarm.severity, 'value') else alarm.severity, 1)
        sla_config = SEVERITY_SLA[severity_level]

        if sla_config[0] is None:
            raise HTTPException(status_code=400, detail="L1/INFO alarms do not require escalation")

        # Check for existing unresolved escalation
        existing = await session.execute(
            select(AlarmEscalation)
            .where(AlarmEscalation.alarm_id == alarm_id)
            .where(AlarmEscalation.contact_acknowledged_at.is_(None))
            .where(AlarmEscalation.escalated_to_next.is_(False))
        )
        existing_escalation = existing.scalar_one_or_none()
        if existing_escalation:
            raise HTTPException(status_code=409, detail="Active escalation already exists for this alarm")

        # Find on-call engineer (priority ordered)
        now = datetime.utcnow()
        on_call_query = (
            select(OnCallRoster)
            .where(OnCallRoster.is_active.is_(True))
            .where(OnCallRoster.start_time <= now)
            .where(OnCallRoster.end_time > now)
            .where(
                or_(
                    OnCallRoster.site_id == alarm.site_id,
                    OnCallRoster.site_id.is_(None),
                )
            )
            .order_by(OnCallRoster.priority)
        )
        on_call_result = await session.execute(on_call_query)
        on_call_engineers = on_call_result.scalars().all()

        engineer_id = on_call_engineers[0].engineer_id if on_call_engineers else None

        # Determine SLA deadline
        sla_minutes, contact_method, _ = sla_config
        sla_deadline = now + timedelta(minutes=sla_minutes)

        # Create escalation record
        escalation = AlarmEscalation(
            alarm_id=alarm_id,
            severity_level=severity_level,
            escalation_step=1,
            engineer_id=engineer_id,
            contact_method=contact_method,
            contact_initiated_at=now,
        )
        session.add(escalation)

        # Auto-create work order for L3+ alarms
        if severity_level >= 3:
            priority_map = {3: WorkOrderPriority.HIGH, 4: WorkOrderPriority.CRITICAL, 5: WorkOrderPriority.EMERGENCY}
            work_order = WorkOrder(
                site_id=alarm.site_id,
                alarm_id=alarm_id,
                assigned_engineer_id=engineer_id,
                type=WorkOrderType.REACTIVE,
                priority=priority_map.get(severity_level, WorkOrderPriority.HIGH),
                status=WorkOrderStatus.ASSIGNED if engineer_id else WorkOrderStatus.CREATED,
                title=f"[L{severity_level}] {alarm.message}",
                description=f"Auto-generated from alarm. Source: {alarm.source}, Code: {alarm.code}",
                sla_deadline=sla_deadline,
                assigned_at=now if engineer_id else None,
            )
            session.add(work_order)

            # Log the dispatch
            if engineer_id:
                activity = EngineerActivityLog(
                    engineer_id=engineer_id,
                    activity_type=ActivityType.CALL_RECEIVED,
                    details={
                        "alarm_id": str(alarm_id),
                        "severity": severity_level,
                        "contact_method": contact_method.value,
                        "sla_deadline": sla_deadline.isoformat(),
                    },
                )
                session.add(activity)

        await session.commit()
        await session.refresh(escalation)

        logger.info(
            "Alarm escalated",
            alarm_id=str(alarm_id),
            severity=severity_level,
            engineer_id=str(engineer_id) if engineer_id else "none",
            sla_minutes=sla_minutes,
        )
        return escalation


@router.post("/escalate/{escalation_id}/acknowledge", response_model=EscalationResponse, tags=["Escalation"])
async def acknowledge_escalation(escalation_id: UUID, data: EscalationAcknowledge):
    """
    Engineer acknowledges receiving the escalation call.

    This verifies the engineer has picked up the call/notification
    and records the response time for SLA tracking.
    """
    async with db_service.get_session() as session:
        result = await session.execute(
            select(AlarmEscalation).where(AlarmEscalation.id == escalation_id)
        )
        escalation = result.scalar_one_or_none()
        if not escalation:
            raise HTTPException(status_code=404, detail="Escalation not found")

        if escalation.contact_acknowledged_at is not None:
            raise HTTPException(status_code=400, detail="Escalation already acknowledged")

        now = datetime.utcnow()
        response_seconds = None
        if escalation.contact_initiated_at:
            response_seconds = int((now - escalation.contact_initiated_at).total_seconds())

        # Check SLA
        sla_config = SEVERITY_SLA[escalation.severity_level]
        sla_met = True
        if sla_config[0] and response_seconds:
            sla_met = response_seconds <= sla_config[0] * 60

        escalation.contact_acknowledged_at = now
        escalation.acknowledgement_method = AckMethod(data.acknowledgement_method)
        escalation.response_time_seconds = response_seconds
        escalation.sla_met = sla_met
        escalation.notes = data.notes

        # Update associated work order to acknowledged
        if escalation.alarm_id:
            wo_result = await session.execute(
                select(WorkOrder).where(WorkOrder.alarm_id == escalation.alarm_id)
            )
            work_order = wo_result.scalar_one_or_none()
            if work_order and work_order.status in (WorkOrderStatus.CREATED, WorkOrderStatus.ASSIGNED):
                work_order.status = WorkOrderStatus.ACKNOWLEDGED
                work_order.acknowledged_at = now

        # Log the acknowledgement
        activity = EngineerActivityLog(
            engineer_id=data.engineer_id,
            activity_type=ActivityType.CALL_ACKNOWLEDGED,
            details={
                "escalation_id": str(escalation_id),
                "response_seconds": response_seconds,
                "sla_met": sla_met,
                "method": data.acknowledgement_method,
            },
        )
        session.add(activity)

        await session.commit()
        await session.refresh(escalation)

        logger.info(
            "Escalation acknowledged",
            escalation_id=str(escalation_id),
            engineer_id=str(data.engineer_id),
            response_seconds=response_seconds,
            sla_met=sla_met,
        )
        return escalation


@router.post("/escalate/{escalation_id}/escalate-next", response_model=EscalationResponse, tags=["Escalation"])
async def escalate_to_next_engineer(escalation_id: UUID):
    """
    Escalate to the next on-call engineer when current engineer
    doesn't respond within the timeout.
    """
    async with db_service.get_session() as session:
        result = await session.execute(
            select(AlarmEscalation).where(AlarmEscalation.id == escalation_id)
        )
        escalation = result.scalar_one_or_none()
        if not escalation:
            raise HTTPException(status_code=404, detail="Escalation not found")

        if escalation.contact_acknowledged_at is not None:
            raise HTTPException(status_code=400, detail="Already acknowledged, no escalation needed")

        # Mark current escalation as escalated
        escalation.escalated_to_next = True

        # Find next on-call engineer
        now = datetime.utcnow()
        next_step = escalation.escalation_step + 1

        # Get the alarm to find its site
        alarm_result = await session.execute(
            select(Alarm).where(Alarm.id == escalation.alarm_id)
        )
        alarm = alarm_result.scalar_one_or_none()

        on_call_query = (
            select(OnCallRoster)
            .where(OnCallRoster.is_active.is_(True))
            .where(OnCallRoster.start_time <= now)
            .where(OnCallRoster.end_time > now)
            .where(OnCallRoster.priority == next_step)
        )
        if alarm:
            on_call_query = on_call_query.where(
                or_(
                    OnCallRoster.site_id == alarm.site_id,
                    OnCallRoster.site_id.is_(None),
                )
            )
        on_call_result = await session.execute(on_call_query)
        next_on_call = on_call_result.scalar_one_or_none()

        next_engineer_id = next_on_call.engineer_id if next_on_call else None

        # Create new escalation for next engineer
        sla_config = SEVERITY_SLA[escalation.severity_level]
        new_escalation = AlarmEscalation(
            alarm_id=escalation.alarm_id,
            severity_level=escalation.severity_level,
            escalation_step=next_step,
            engineer_id=next_engineer_id,
            contact_method=sla_config[1],
            contact_initiated_at=now,
        )
        session.add(new_escalation)

        # Update work order assignment
        if alarm:
            wo_result = await session.execute(
                select(WorkOrder).where(WorkOrder.alarm_id == alarm.id)
            )
            work_order = wo_result.scalar_one_or_none()
            if work_order and next_engineer_id:
                work_order.assigned_engineer_id = next_engineer_id
                work_order.assigned_at = now

        await session.commit()
        await session.refresh(new_escalation)

        logger.warning(
            "Escalated to next engineer",
            alarm_id=str(escalation.alarm_id),
            step=next_step,
            next_engineer_id=str(next_engineer_id) if next_engineer_id else "none",
        )
        return new_escalation


@router.get("/escalations/pending", response_model=list[EscalationResponse], tags=["Escalation"])
async def get_pending_escalations():
    """Get all escalations waiting for acknowledgement."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(AlarmEscalation)
            .where(AlarmEscalation.contact_acknowledged_at.is_(None))
            .where(AlarmEscalation.escalated_to_next.is_(False))
            .order_by(AlarmEscalation.severity_level.desc(), AlarmEscalation.contact_initiated_at)
        )
        return result.scalars().all()


# ═══════════════════════════════════════════════════════════════════════════════
#  WORK ORDERS
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/work-orders", response_model=WorkOrderResponse, tags=["Work Orders"])
async def create_work_order(data: WorkOrderCreate):
    """Create a new work order (manual or from predictive maintenance)."""
    async with db_service.get_session() as session:
        work_order = WorkOrder(
            site_id=data.site_id,
            alarm_id=data.alarm_id,
            assigned_engineer_id=data.assigned_engineer_id,
            type=WorkOrderType(data.type),
            priority=WorkOrderPriority(data.priority),
            status=WorkOrderStatus.ASSIGNED if data.assigned_engineer_id else WorkOrderStatus.CREATED,
            title=data.title,
            description=data.description,
            checklist=data.checklist,
            sla_deadline=data.sla_deadline,
            assigned_at=datetime.utcnow() if data.assigned_engineer_id else None,
        )
        session.add(work_order)
        await session.commit()
        await session.refresh(work_order)
        logger.info("Work order created", id=str(work_order.id), title=data.title)
        return work_order


@router.get("/work-orders", response_model=list[WorkOrderResponse], tags=["Work Orders"])
async def list_work_orders(
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    site_id: Optional[UUID] = Query(None, description="Filter by site"),
    engineer_id: Optional[UUID] = Query(None, description="Filter by assigned engineer"),
    limit: int = Query(50, ge=1, le=500),
):
    """List work orders with filtering."""
    async with db_service.get_session() as session:
        query = select(WorkOrder)
        if status:
            query = query.where(WorkOrder.status == status)
        if priority:
            query = query.where(WorkOrder.priority == priority)
        if site_id:
            query = query.where(WorkOrder.site_id == site_id)
        if engineer_id:
            query = query.where(WorkOrder.assigned_engineer_id == engineer_id)

        query = query.order_by(WorkOrder.created_at.desc()).limit(limit)
        result = await session.execute(query)
        return result.scalars().all()


@router.get("/work-orders/{work_order_id}", response_model=WorkOrderResponse, tags=["Work Orders"])
async def get_work_order(work_order_id: UUID):
    """Get work order details."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(WorkOrder).where(WorkOrder.id == work_order_id)
        )
        wo = result.scalar_one_or_none()
        if not wo:
            raise HTTPException(status_code=404, detail="Work order not found")
        return wo


@router.patch("/work-orders/{work_order_id}", response_model=WorkOrderResponse, tags=["Work Orders"])
async def update_work_order(work_order_id: UUID, data: WorkOrderUpdate):
    """Update work order status, assignment, or resolution."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(WorkOrder).where(WorkOrder.id == work_order_id)
        )
        wo = result.scalar_one_or_none()
        if not wo:
            raise HTTPException(status_code=404, detail="Work order not found")

        now = datetime.utcnow()
        update_data = data.model_dump(exclude_unset=True)

        # Handle status transitions with timestamps
        if "status" in update_data:
            new_status = WorkOrderStatus(update_data["status"])
            timestamp_map = {
                WorkOrderStatus.ACKNOWLEDGED: "acknowledged_at",
                WorkOrderStatus.EN_ROUTE: "en_route_at",
                WorkOrderStatus.ON_SITE: "arrived_at",
                WorkOrderStatus.IN_PROGRESS: "started_at",
                WorkOrderStatus.COMPLETED: "completed_at",
            }
            ts_field = timestamp_map.get(new_status)
            if ts_field:
                setattr(wo, ts_field, now)

            # Check SLA on completion
            if new_status == WorkOrderStatus.COMPLETED and wo.sla_deadline:
                wo.sla_met = now <= wo.sla_deadline

            wo.status = new_status

        # Update other fields
        for field in ("priority", "description", "checklist", "parts_used", "root_cause", "resolution"):
            if field in update_data:
                value = update_data[field]
                if field == "priority" and value:
                    value = WorkOrderPriority(value)
                setattr(wo, field, value)

        if "assigned_engineer_id" in update_data:
            wo.assigned_engineer_id = update_data["assigned_engineer_id"]
            wo.assigned_at = now

        await session.commit()
        await session.refresh(wo)
        logger.info("Work order updated", id=str(work_order_id), status=wo.status.value)
        return wo


# ═══════════════════════════════════════════════════════════════════════════════
#  ENGINEER ACTIVITY LOG
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/engineers/{engineer_id}/activity", response_model=ActivityLogResponse, tags=["Activity Log"])
async def log_engineer_activity(engineer_id: UUID, data: ActivityLogCreate):
    """Log an engineer activity (status change, arrival, work progress, etc.)."""
    async with db_service.get_session() as session:
        # Verify engineer exists
        eng_result = await session.execute(
            select(Engineer).where(Engineer.id == engineer_id)
        )
        if not eng_result.scalar_one_or_none():
            raise HTTPException(status_code=404, detail="Engineer not found")

        log_entry = EngineerActivityLog(
            engineer_id=engineer_id,
            work_order_id=data.work_order_id,
            activity_type=ActivityType(data.activity_type),
            details=data.details,
            latitude=data.latitude,
            longitude=data.longitude,
        )
        session.add(log_entry)
        await session.commit()
        await session.refresh(log_entry)
        return log_entry


@router.get("/engineers/{engineer_id}/activity", response_model=list[ActivityLogResponse], tags=["Activity Log"])
async def get_engineer_activity(
    engineer_id: UUID,
    limit: int = Query(50, ge=1, le=500),
):
    """Get activity log for an engineer."""
    async with db_service.get_session() as session:
        result = await session.execute(
            select(EngineerActivityLog)
            .where(EngineerActivityLog.engineer_id == engineer_id)
            .order_by(EngineerActivityLog.timestamp.desc())
            .limit(limit)
        )
        return result.scalars().all()


# ═══════════════════════════════════════════════════════════════════════════════
#  MAINTENANCE SCHEDULES
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/schedules", response_model=MaintenanceScheduleResponse, tags=["Schedules"])
async def create_maintenance_schedule(data: MaintenanceScheduleCreate):
    """Create a recurring maintenance schedule."""
    async with db_service.get_session() as session:
        schedule = MaintenanceSchedule(
            site_id=data.site_id,
            type=WorkOrderType(data.type),
            title=data.title,
            description=data.description,
            recurrence=data.recurrence,
            next_due_date=data.next_due_date,
            assigned_engineer_id=data.assigned_engineer_id,
            checklist_template=data.checklist_template,
            estimated_duration_hours=data.estimated_duration_hours,
        )
        session.add(schedule)
        await session.commit()
        await session.refresh(schedule)
        logger.info("Maintenance schedule created", title=data.title)
        return schedule


@router.get("/schedules", response_model=list[MaintenanceScheduleResponse], tags=["Schedules"])
async def list_maintenance_schedules(
    site_id: Optional[UUID] = Query(None),
    active_only: bool = Query(True),
):
    """List maintenance schedules."""
    async with db_service.get_session() as session:
        query = select(MaintenanceSchedule)
        if site_id:
            query = query.where(MaintenanceSchedule.site_id == site_id)
        if active_only:
            query = query.where(MaintenanceSchedule.is_active.is_(True))
        query = query.order_by(MaintenanceSchedule.next_due_date)
        result = await session.execute(query)
        return result.scalars().all()


@router.get("/schedules/upcoming", response_model=list[MaintenanceScheduleResponse], tags=["Schedules"])
async def get_upcoming_maintenance(days_ahead: int = Query(30, ge=1, le=365)):
    """Get maintenance scheduled within the next N days."""
    now = datetime.utcnow()
    deadline = now + timedelta(days=days_ahead)
    async with db_service.get_session() as session:
        result = await session.execute(
            select(MaintenanceSchedule)
            .where(MaintenanceSchedule.is_active.is_(True))
            .where(MaintenanceSchedule.next_due_date <= deadline)
            .order_by(MaintenanceSchedule.next_due_date)
        )
        return result.scalars().all()


# ═══════════════════════════════════════════════════════════════════════════════
#  DASHBOARD SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/dashboard", response_model=MaintenanceDashboard, tags=["Dashboard"])
async def maintenance_dashboard():
    """Get maintenance dashboard summary with KPIs."""
    now = datetime.utcnow()

    async with db_service.get_session() as session:
        # Engineer counts
        total_eng = await session.execute(
            select(func.count(Engineer.id)).where(Engineer.is_active.is_(True))
        )
        available_eng = await session.execute(
            select(func.count(Engineer.id))
            .where(Engineer.is_active.is_(True))
            .where(Engineer.status == EngineerStatus.AVAILABLE)
        )
        on_call_eng = await session.execute(
            select(func.count(func.distinct(OnCallRoster.engineer_id)))
            .where(OnCallRoster.is_active.is_(True))
            .where(OnCallRoster.start_time <= now)
            .where(OnCallRoster.end_time > now)
        )

        # Work order counts
        active_statuses = [
            WorkOrderStatus.CREATED, WorkOrderStatus.ASSIGNED,
            WorkOrderStatus.ACKNOWLEDGED, WorkOrderStatus.EN_ROUTE,
            WorkOrderStatus.ON_SITE, WorkOrderStatus.IN_PROGRESS,
        ]
        active_wo = await session.execute(
            select(func.count(WorkOrder.id))
            .where(WorkOrder.status.in_(active_statuses))
        )
        overdue_wo = await session.execute(
            select(func.count(WorkOrder.id))
            .where(WorkOrder.status.in_(active_statuses))
            .where(WorkOrder.sla_deadline < now)
        )

        # SLA compliance (last 30 days)
        thirty_days_ago = now - timedelta(days=30)
        sla_total = await session.execute(
            select(func.count(WorkOrder.id))
            .where(WorkOrder.sla_met.isnot(None))
            .where(WorkOrder.completed_at >= thirty_days_ago)
        )
        sla_met_count = await session.execute(
            select(func.count(WorkOrder.id))
            .where(WorkOrder.sla_met.is_(True))
            .where(WorkOrder.completed_at >= thirty_days_ago)
        )
        total_sla = sla_total.scalar_one() or 0
        met_sla = sla_met_count.scalar_one() or 0
        sla_percent = (met_sla / total_sla * 100.0) if total_sla > 0 else 100.0

        # Average response time (last 30 days)
        avg_response = await session.execute(
            select(func.avg(AlarmEscalation.response_time_seconds))
            .where(AlarmEscalation.response_time_seconds.isnot(None))
            .where(AlarmEscalation.contact_initiated_at >= thirty_days_ago)
        )
        avg_resp_seconds = avg_response.scalar_one() or 0
        avg_resp_minutes = avg_resp_seconds / 60.0

        # Pending escalations
        pending_esc = await session.execute(
            select(func.count(AlarmEscalation.id))
            .where(AlarmEscalation.contact_acknowledged_at.is_(None))
            .where(AlarmEscalation.escalated_to_next.is_(False))
        )

        # Upcoming scheduled maintenance (next 30 days)
        upcoming_maint = await session.execute(
            select(func.count(MaintenanceSchedule.id))
            .where(MaintenanceSchedule.is_active.is_(True))
            .where(MaintenanceSchedule.next_due_date <= now + timedelta(days=30))
        )

        # Work orders by status
        status_counts_result = await session.execute(
            select(WorkOrder.status, func.count(WorkOrder.id))
            .group_by(WorkOrder.status)
        )
        wo_by_status = {str(status.value): count for status, count in status_counts_result.all()}

        # Work orders by priority
        priority_counts_result = await session.execute(
            select(WorkOrder.priority, func.count(WorkOrder.id))
            .where(WorkOrder.status.in_(active_statuses))
            .group_by(WorkOrder.priority)
        )
        wo_by_priority = {str(priority.value): count for priority, count in priority_counts_result.all()}

        return MaintenanceDashboard(
            total_engineers=total_eng.scalar_one() or 0,
            available_engineers=available_eng.scalar_one() or 0,
            on_call_engineers=on_call_eng.scalar_one() or 0,
            active_work_orders=active_wo.scalar_one() or 0,
            overdue_work_orders=overdue_wo.scalar_one() or 0,
            sla_compliance_percent=round(sla_percent, 1),
            avg_response_time_minutes=round(avg_resp_minutes, 1),
            pending_escalations=pending_esc.scalar_one() or 0,
            upcoming_scheduled_maintenance=upcoming_maint.scalar_one() or 0,
            work_orders_by_status=wo_by_status,
            work_orders_by_priority=wo_by_priority,
        )
