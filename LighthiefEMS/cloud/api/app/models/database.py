"""
SQLAlchemy ORM Models

Database models for the GridMind relational database (PostgreSQL).
Time-series data is stored in TimescaleDB with separate models.
"""

from datetime import datetime
from sqlalchemy import (
    Column, String, Float, Integer, Boolean, DateTime, Text,
    ForeignKey, Enum as SAEnum, JSON, UniqueConstraint, Index,
)
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import DeclarativeBase, relationship
import uuid
import enum


class Base(DeclarativeBase):
    pass


# ─── Enums ────────────────────────────────────────────────────────────────────

class SiteStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    COMMISSIONING = "commissioning"
    MAINTENANCE = "maintenance"
    DECOMMISSIONED = "decommissioned"


class DeviceType(str, enum.Enum):
    PCS = "pcs"
    BMS = "bms"
    PROTECTION_RELAY = "protection_relay"
    METER = "meter"
    TRANSFORMER = "transformer"
    OTHER = "other"


class AlarmSeverity(str, enum.Enum):
    INFO = "info"
    WARNING = "warning"
    ALARM = "alarm"
    CRITICAL = "critical"
    EMERGENCY = "emergency"


class AlarmState(str, enum.Enum):
    ACTIVE = "active"
    ACKNOWLEDGED = "acknowledged"
    CLEARED = "cleared"


class CommandStatus(str, enum.Enum):
    PENDING = "pending"
    SENT = "sent"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    EXECUTED = "executed"
    FAILED = "failed"


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    OPERATOR = "operator"
    VIEWER = "viewer"
    TRADER = "trader"
    ENGINEER = "engineer"


class EngineerRole(str, enum.Enum):
    FIELD_ENGINEER = "field_engineer"
    SENIOR_ENGINEER = "senior_engineer"
    MANAGER = "manager"


class EngineerStatus(str, enum.Enum):
    AVAILABLE = "available"
    ON_CALL = "on_call"
    BUSY = "busy"
    OFF_DUTY = "off_duty"
    ON_LEAVE = "on_leave"


class ContactMethod(str, enum.Enum):
    PUSH = "push"
    SMS = "sms"
    CALL = "call"
    EMAIL = "email"


class AckMethod(str, enum.Enum):
    APP_CONFIRM = "app_confirm"
    DTMF = "dtmf"
    CALLBACK = "callback"
    MANUAL = "manual"


class WorkOrderType(str, enum.Enum):
    REACTIVE = "reactive"
    PREVENTIVE = "preventive"
    PREDICTIVE = "predictive"
    INSPECTION = "inspection"


class WorkOrderPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"
    EMERGENCY = "emergency"


class WorkOrderStatus(str, enum.Enum):
    CREATED = "created"
    ASSIGNED = "assigned"
    ACKNOWLEDGED = "acknowledged"
    EN_ROUTE = "en_route"
    ON_SITE = "on_site"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class ActivityType(str, enum.Enum):
    STATUS_CHANGE = "status_change"
    LOCATION_UPDATE = "location_update"
    CALL_RECEIVED = "call_received"
    CALL_ACKNOWLEDGED = "call_acknowledged"
    ARRIVED_SITE = "arrived_site"
    STARTED_WORK = "started_work"
    COMPLETED_WORK = "completed_work"
    NOTE_ADDED = "note_added"
    PHOTO_UPLOADED = "photo_uploaded"


class ScheduleRecurrence(str, enum.Enum):
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    SEMI_ANNUAL = "semi_annual"
    ANNUAL = "annual"


# ─── Site ─────────────────────────────────────────────────────────────────────

class Site(Base):
    __tablename__ = "sites"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(200), nullable=False)
    market = Column(String(50), nullable=False)  # cyprus, germany, greece, etc.
    status = Column(SAEnum(SiteStatus), default=SiteStatus.COMMISSIONING)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(Text, nullable=True)
    rated_power_kw = Column(Float, nullable=False)
    rated_energy_kwh = Column(Float, nullable=False)
    dso_name = Column(String(100), nullable=True)
    tso_name = Column(String(100), nullable=True)
    grid_connection_voltage_kv = Column(Float, nullable=True)
    commissioning_date = Column(DateTime, nullable=True)
    config = Column(JSON, nullable=True)  # Full site configuration
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    devices = relationship("Device", back_populates="site", cascade="all, delete-orphan")
    alarms = relationship("Alarm", back_populates="site", cascade="all, delete-orphan")
    commands = relationship("Command", back_populates="site", cascade="all, delete-orphan")


# ─── Device ───────────────────────────────────────────────────────────────────

class Device(Base):
    __tablename__ = "devices"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    device_type = Column(SAEnum(DeviceType), nullable=False)
    manufacturer = Column(String(200), nullable=True)
    model = Column(String(200), nullable=True)
    serial_number = Column(String(100), nullable=True)
    firmware_version = Column(String(50), nullable=True)
    rated_power_kw = Column(Float, nullable=True)
    rated_energy_kwh = Column(Float, nullable=True)
    connection_host = Column(String(100), nullable=True)
    connection_port = Column(Integer, nullable=True)
    driver = Column(String(100), nullable=True)
    is_online = Column(Boolean, default=False)
    last_seen_at = Column(DateTime, nullable=True)
    config = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    site = relationship("Site", back_populates="devices")

    __table_args__ = (
        UniqueConstraint("site_id", "device_type", "serial_number"),
    )


# ─── Alarm ────────────────────────────────────────────────────────────────────

class Alarm(Base):
    __tablename__ = "alarms"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    severity = Column(SAEnum(AlarmSeverity), nullable=False)
    state = Column(SAEnum(AlarmState), default=AlarmState.ACTIVE)
    source = Column(String(100), nullable=False)
    code = Column(Integer, nullable=False)
    message = Column(Text, nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    acknowledged_by = Column(String(100), nullable=True)
    acknowledged_at = Column(DateTime, nullable=True)
    cleared_at = Column(DateTime, nullable=True)

    # Relationships
    site = relationship("Site", back_populates="alarms")

    __table_args__ = (
        Index("idx_alarms_site_state", "site_id", "state"),
        Index("idx_alarms_timestamp", "timestamp"),
    )


# ─── Command ─────────────────────────────────────────────────────────────────

class Command(Base):
    __tablename__ = "commands"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    source = Column(String(50), nullable=False)  # cloud_optimizer, operator, trading
    status = Column(SAEnum(CommandStatus), default=CommandStatus.PENDING)
    active_power_kw = Column(Float, nullable=True)
    reactive_power_kvar = Column(Float, nullable=True)
    mode = Column(String(20), nullable=True)
    reason = Column(Text, nullable=True)
    response = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    sent_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_by = Column(String(100), nullable=True)

    # Relationships
    site = relationship("Site", back_populates="commands")

    __table_args__ = (
        Index("idx_commands_site_created", "site_id", "created_at"),
    )


# ─── User ─────────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    full_name = Column(String(200), nullable=True)
    role = Column(SAEnum(UserRole), default=UserRole.VIEWER)
    is_active = Column(Boolean, default=True)
    keycloak_id = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login_at = Column(DateTime, nullable=True)


# ─── Trade ────────────────────────────────────────────────────────────────────

class Trade(Base):
    __tablename__ = "trades"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=True)
    market = Column(String(50), nullable=False)  # day_ahead, intraday, fcr, afrr
    exchange = Column(String(50), nullable=True)
    product = Column(String(100), nullable=False)
    direction = Column(String(10), nullable=False)  # buy, sell
    quantity_mw = Column(Float, nullable=False)
    price_eur_mwh = Column(Float, nullable=False)
    delivery_start = Column(DateTime, nullable=False)
    delivery_end = Column(DateTime, nullable=False)
    status = Column(String(20), default="pending")  # pending, filled, partially_filled, cancelled
    order_id = Column(String(100), nullable=True)
    counterparty = Column(String(200), nullable=True)
    pnl_eur = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    executed_at = Column(DateTime, nullable=True)
    settled_at = Column(DateTime, nullable=True)
    created_by = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)

    __table_args__ = (
        Index("idx_trades_market_delivery", "market", "delivery_start"),
        Index("idx_trades_site", "site_id"),
    )


# ─── Engineer ────────────────────────────────────────────────────────────────

class Engineer(Base):
    __tablename__ = "engineers"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    role = Column(SAEnum(EngineerRole), default=EngineerRole.FIELD_ENGINEER)
    status = Column(SAEnum(EngineerStatus), default=EngineerStatus.OFF_DUTY)
    current_location_lat = Column(Float, nullable=True)
    current_location_lon = Column(Float, nullable=True)
    location_updated_at = Column(DateTime, nullable=True)
    certifications = Column(JSON, nullable=True)  # ["electrical", "bess", "hv"]
    assigned_sites = Column(JSON, nullable=True)  # ["CY-BESS-001", "CY-BESS-002"]
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    on_call_slots = relationship("OnCallRoster", back_populates="engineer", cascade="all, delete-orphan")
    escalations = relationship("AlarmEscalation", back_populates="engineer")
    work_orders = relationship("WorkOrder", back_populates="assigned_engineer")
    activity_log = relationship("EngineerActivityLog", back_populates="engineer", cascade="all, delete-orphan")

    __table_args__ = (
        Index("idx_engineers_status", "status"),
    )


# ─── On-Call Roster ──────────────────────────────────────────────────────────

class OnCallRoster(Base):
    __tablename__ = "on_call_roster"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    engineer_id = Column(PGUUID(as_uuid=True), ForeignKey("engineers.id"), nullable=False)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=True)  # null = all sites
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    priority = Column(Integer, default=1)  # 1=primary, 2=backup, 3=tertiary
    is_active = Column(Boolean, default=True)

    # Relationships
    engineer = relationship("Engineer", back_populates="on_call_slots")
    site = relationship("Site")

    __table_args__ = (
        Index("idx_oncall_time", "start_time", "end_time"),
        Index("idx_oncall_site", "site_id"),
    )


# ─── Alarm Escalation ───────────────────────────────────────────────────────

class AlarmEscalation(Base):
    __tablename__ = "alarm_escalations"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    alarm_id = Column(PGUUID(as_uuid=True), ForeignKey("alarms.id"), nullable=False)
    severity_level = Column(Integer, nullable=False)  # 1-5 matching L1-L5
    escalation_step = Column(Integer, default=1)  # which attempt
    engineer_id = Column(PGUUID(as_uuid=True), ForeignKey("engineers.id"), nullable=True)
    contact_method = Column(SAEnum(ContactMethod), nullable=True)
    contact_initiated_at = Column(DateTime, nullable=True)
    contact_acknowledged_at = Column(DateTime, nullable=True)
    acknowledgement_method = Column(SAEnum(AckMethod), nullable=True)
    response_time_seconds = Column(Integer, nullable=True)
    sla_met = Column(Boolean, nullable=True)
    escalated_to_next = Column(Boolean, default=False)
    notes = Column(Text, nullable=True)

    # Relationships
    alarm = relationship("Alarm")
    engineer = relationship("Engineer", back_populates="escalations")

    __table_args__ = (
        Index("idx_escalation_alarm", "alarm_id"),
        Index("idx_escalation_engineer", "engineer_id"),
    )


# ─── Work Order ──────────────────────────────────────────────────────────────

class WorkOrder(Base):
    __tablename__ = "work_orders"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    alarm_id = Column(PGUUID(as_uuid=True), ForeignKey("alarms.id"), nullable=True)
    assigned_engineer_id = Column(PGUUID(as_uuid=True), ForeignKey("engineers.id"), nullable=True)
    type = Column(SAEnum(WorkOrderType), default=WorkOrderType.REACTIVE)
    priority = Column(SAEnum(WorkOrderPriority), default=WorkOrderPriority.MEDIUM)
    status = Column(SAEnum(WorkOrderStatus), default=WorkOrderStatus.CREATED)
    title = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    checklist = Column(JSON, nullable=True)  # [{"step": "Check PCS", "done": false}]
    parts_used = Column(JSON, nullable=True)  # [{"part": "Fuse 100A", "qty": 2}]
    root_cause = Column(Text, nullable=True)
    resolution = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    assigned_at = Column(DateTime, nullable=True)
    acknowledged_at = Column(DateTime, nullable=True)
    en_route_at = Column(DateTime, nullable=True)
    arrived_at = Column(DateTime, nullable=True)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    sla_deadline = Column(DateTime, nullable=True)
    sla_met = Column(Boolean, nullable=True)
    created_by = Column(String(100), nullable=True)

    # Relationships
    site = relationship("Site")
    alarm = relationship("Alarm")
    assigned_engineer = relationship("Engineer", back_populates="work_orders")
    activity_log = relationship("EngineerActivityLog", back_populates="work_order")

    __table_args__ = (
        Index("idx_workorder_status", "status"),
        Index("idx_workorder_site", "site_id"),
        Index("idx_workorder_engineer", "assigned_engineer_id"),
        Index("idx_workorder_sla", "sla_deadline"),
    )


# ─── Engineer Activity Log ───────────────────────────────────────────────────

class EngineerActivityLog(Base):
    __tablename__ = "engineer_activity_log"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    engineer_id = Column(PGUUID(as_uuid=True), ForeignKey("engineers.id"), nullable=False)
    work_order_id = Column(PGUUID(as_uuid=True), ForeignKey("work_orders.id"), nullable=True)
    activity_type = Column(SAEnum(ActivityType), nullable=False)
    details = Column(JSON, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    engineer = relationship("Engineer", back_populates="activity_log")
    work_order = relationship("WorkOrder", back_populates="activity_log")

    __table_args__ = (
        Index("idx_activity_engineer", "engineer_id", "timestamp"),
        Index("idx_activity_workorder", "work_order_id"),
    )


# ─── Maintenance Schedule ────────────────────────────────────────────────────

class MaintenanceSchedule(Base):
    __tablename__ = "maintenance_schedules"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(PGUUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    type = Column(SAEnum(WorkOrderType), default=WorkOrderType.PREVENTIVE)
    title = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    recurrence = Column(SAEnum(ScheduleRecurrence), default=ScheduleRecurrence.MONTHLY)
    next_due_date = Column(DateTime, nullable=False)
    last_completed_date = Column(DateTime, nullable=True)
    assigned_engineer_id = Column(PGUUID(as_uuid=True), ForeignKey("engineers.id"), nullable=True)
    checklist_template = Column(JSON, nullable=True)
    estimated_duration_hours = Column(Float, default=4.0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    site = relationship("Site")
    assigned_engineer = relationship("Engineer")

    __table_args__ = (
        Index("idx_maint_sched_site", "site_id"),
        Index("idx_maint_sched_due", "next_due_date"),
    )
