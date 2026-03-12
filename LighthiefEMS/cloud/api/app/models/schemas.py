"""
Pydantic Schemas for API request/response validation.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


# ─── Site Schemas ─────────────────────────────────────────────────────────────

class SiteCreate(BaseModel):
    site_id: str = Field(..., description="Unique site identifier", example="CY-BESS-001")
    name: str = Field(..., description="Site name", example="Cyprus BESS Pilot")
    market: str = Field(..., description="Market code", example="cyprus")
    rated_power_kw: float = Field(..., gt=0, description="Rated power in kW")
    rated_energy_kwh: float = Field(..., gt=0, description="Rated energy in kWh")
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None
    dso_name: Optional[str] = None
    tso_name: Optional[str] = None
    grid_connection_voltage_kv: Optional[float] = None
    config: Optional[dict] = None


class SiteUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None
    config: Optional[dict] = None


class SiteResponse(BaseModel):
    id: UUID
    site_id: str
    name: str
    market: str
    status: str
    latitude: Optional[float]
    longitude: Optional[float]
    rated_power_kw: float
    rated_energy_kwh: float
    dso_name: Optional[str]
    tso_name: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─── Device Schemas ───────────────────────────────────────────────────────────

class DeviceCreate(BaseModel):
    device_type: str
    manufacturer: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    rated_power_kw: Optional[float] = None
    rated_energy_kwh: Optional[float] = None
    connection_host: Optional[str] = None
    connection_port: Optional[int] = None
    driver: Optional[str] = None


class DeviceResponse(BaseModel):
    id: UUID
    device_type: str
    manufacturer: Optional[str]
    model: Optional[str]
    serial_number: Optional[str]
    is_online: bool
    last_seen_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Alarm Schemas ────────────────────────────────────────────────────────────

class AlarmResponse(BaseModel):
    id: UUID
    severity: str
    state: str
    source: str
    code: int
    message: str
    details: Optional[str]
    timestamp: datetime
    acknowledged_by: Optional[str]
    acknowledged_at: Optional[datetime]
    cleared_at: Optional[datetime]

    class Config:
        from_attributes = True


class AlarmAcknowledge(BaseModel):
    acknowledged_by: str = Field(..., description="Username acknowledging the alarm")


# ─── Command Schemas ──────────────────────────────────────────────────────────

class CommandCreate(BaseModel):
    active_power_kw: Optional[float] = Field(None, description="Active power setpoint in kW")
    reactive_power_kvar: Optional[float] = Field(None, description="Reactive power in kVAr")
    mode: Optional[str] = Field(None, description="Control mode: pq, vf, vsg, droop, zero_export")
    reason: Optional[str] = Field(None, description="Reason for the command")


class CommandResponse(BaseModel):
    id: UUID
    source: str
    status: str
    active_power_kw: Optional[float]
    reactive_power_kvar: Optional[float]
    mode: Optional[str]
    reason: Optional[str]
    response: Optional[str]
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Telemetry Schemas ────────────────────────────────────────────────────────

class TelemetryQuery(BaseModel):
    site_id: str
    start_time: datetime
    end_time: datetime
    resolution: Optional[str] = Field("1m", description="Data resolution: 1s, 1m, 5m, 15m, 1h")
    metrics: Optional[list[str]] = Field(None, description="Specific metrics to return")


class MeasurementPoint(BaseModel):
    timestamp: datetime
    active_power_kw: Optional[float] = None
    reactive_power_kvar: Optional[float] = None
    soc_percent: Optional[float] = None
    soh_percent: Optional[float] = None
    frequency_hz: Optional[float] = None
    voltage_v: Optional[float] = None
    current_a: Optional[float] = None
    power_factor: Optional[float] = None
    state: Optional[str] = None


class TelemetryResponse(BaseModel):
    site_id: str
    start_time: datetime
    end_time: datetime
    resolution: str
    count: int
    data: list[MeasurementPoint]


# ─── Trading Schemas ──────────────────────────────────────────────────────────

class TradeCreate(BaseModel):
    site_id: Optional[str] = None
    market: str = Field(..., description="day_ahead, intraday, fcr, afrr, mfrr, otc")
    exchange: Optional[str] = None
    product: str
    direction: str = Field(..., description="buy or sell")
    quantity_mw: float = Field(..., gt=0)
    price_eur_mwh: float
    delivery_start: datetime
    delivery_end: datetime
    counterparty: Optional[str] = None
    notes: Optional[str] = None


class TradeResponse(BaseModel):
    id: UUID
    market: str
    exchange: Optional[str]
    product: str
    direction: str
    quantity_mw: float
    price_eur_mwh: float
    delivery_start: datetime
    delivery_end: datetime
    status: str
    pnl_eur: Optional[float]
    created_at: datetime
    executed_at: Optional[datetime]

    class Config:
        from_attributes = True


class PortfolioSummary(BaseModel):
    total_trades: int
    total_volume_mwh: float
    total_pnl_eur: float
    open_positions: int
    by_market: dict[str, dict]


# ─── Engineer Schemas ────────────────────────────────────────────────────────

class EngineerCreate(BaseModel):
    name: str = Field(..., description="Full name of the engineer")
    phone: str = Field(..., description="Phone number for call dispatch")
    email: str = Field(..., description="Email address")
    role: str = Field("field_engineer", description="field_engineer, senior_engineer, manager")
    certifications: Optional[list[str]] = Field(None, description="List of certifications")
    assigned_sites: Optional[list[str]] = Field(None, description="List of assigned site IDs")


class EngineerUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None
    certifications: Optional[list[str]] = None
    assigned_sites: Optional[list[str]] = None
    is_active: Optional[bool] = None


class EngineerLocationUpdate(BaseModel):
    latitude: float = Field(..., description="Current GPS latitude")
    longitude: float = Field(..., description="Current GPS longitude")


class EngineerResponse(BaseModel):
    id: UUID
    name: str
    phone: str
    email: str
    role: str
    status: str
    current_location_lat: Optional[float]
    current_location_lon: Optional[float]
    location_updated_at: Optional[datetime]
    certifications: Optional[list[str]]
    assigned_sites: Optional[list[str]]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── On-Call Roster Schemas ──────────────────────────────────────────────────

class OnCallCreate(BaseModel):
    engineer_id: UUID
    site_id: Optional[UUID] = Field(None, description="Null = all sites")
    start_time: datetime
    end_time: datetime
    priority: int = Field(1, ge=1, le=3, description="1=primary, 2=backup, 3=tertiary")


class OnCallResponse(BaseModel):
    id: UUID
    engineer_id: UUID
    site_id: Optional[UUID]
    start_time: datetime
    end_time: datetime
    priority: int
    is_active: bool

    class Config:
        from_attributes = True


# ─── Alarm Escalation Schemas ────────────────────────────────────────────────

class EscalationResponse(BaseModel):
    id: UUID
    alarm_id: UUID
    severity_level: int
    escalation_step: int
    engineer_id: Optional[UUID]
    contact_method: Optional[str]
    contact_initiated_at: Optional[datetime]
    contact_acknowledged_at: Optional[datetime]
    acknowledgement_method: Optional[str]
    response_time_seconds: Optional[int]
    sla_met: Optional[bool]
    escalated_to_next: bool
    notes: Optional[str]

    class Config:
        from_attributes = True


class EscalationAcknowledge(BaseModel):
    engineer_id: UUID = Field(..., description="Engineer acknowledging the escalation")
    acknowledgement_method: str = Field("app_confirm", description="app_confirm, dtmf, callback, manual")
    notes: Optional[str] = None


# ─── Work Order Schemas ──────────────────────────────────────────────────────

class WorkOrderCreate(BaseModel):
    site_id: UUID
    alarm_id: Optional[UUID] = None
    assigned_engineer_id: Optional[UUID] = None
    type: str = Field("reactive", description="reactive, preventive, predictive, inspection")
    priority: str = Field("medium", description="low, medium, high, critical, emergency")
    title: str = Field(..., description="Work order title")
    description: Optional[str] = None
    checklist: Optional[list[dict]] = Field(None, description="Steps/parts checklist")
    sla_deadline: Optional[datetime] = None


class WorkOrderUpdate(BaseModel):
    status: Optional[str] = None
    assigned_engineer_id: Optional[UUID] = None
    priority: Optional[str] = None
    description: Optional[str] = None
    checklist: Optional[list[dict]] = None
    parts_used: Optional[list[dict]] = None
    root_cause: Optional[str] = None
    resolution: Optional[str] = None


class WorkOrderResponse(BaseModel):
    id: UUID
    site_id: UUID
    alarm_id: Optional[UUID]
    assigned_engineer_id: Optional[UUID]
    type: str
    priority: str
    status: str
    title: str
    description: Optional[str]
    checklist: Optional[list[dict]]
    parts_used: Optional[list[dict]]
    root_cause: Optional[str]
    resolution: Optional[str]
    created_at: datetime
    assigned_at: Optional[datetime]
    acknowledged_at: Optional[datetime]
    en_route_at: Optional[datetime]
    arrived_at: Optional[datetime]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    sla_deadline: Optional[datetime]
    sla_met: Optional[bool]

    class Config:
        from_attributes = True


# ─── Engineer Activity Schemas ───────────────────────────────────────────────

class ActivityLogCreate(BaseModel):
    work_order_id: Optional[UUID] = None
    activity_type: str = Field(..., description="status_change, location_update, etc.")
    details: Optional[dict] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class ActivityLogResponse(BaseModel):
    id: UUID
    engineer_id: UUID
    work_order_id: Optional[UUID]
    activity_type: str
    details: Optional[dict]
    latitude: Optional[float]
    longitude: Optional[float]
    timestamp: datetime

    class Config:
        from_attributes = True


# ─── Maintenance Schedule Schemas ────────────────────────────────────────────

class MaintenanceScheduleCreate(BaseModel):
    site_id: UUID
    type: str = Field("preventive", description="preventive, predictive, inspection")
    title: str
    description: Optional[str] = None
    recurrence: str = Field("monthly", description="weekly, monthly, quarterly, semi_annual, annual")
    next_due_date: datetime
    assigned_engineer_id: Optional[UUID] = None
    checklist_template: Optional[list[dict]] = None
    estimated_duration_hours: float = Field(4.0, gt=0)


class MaintenanceScheduleResponse(BaseModel):
    id: UUID
    site_id: UUID
    type: str
    title: str
    description: Optional[str]
    recurrence: str
    next_due_date: datetime
    last_completed_date: Optional[datetime]
    assigned_engineer_id: Optional[UUID]
    checklist_template: Optional[list[dict]]
    estimated_duration_hours: float
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Maintenance Dashboard Summary ──────────────────────────────────────────

class MaintenanceDashboard(BaseModel):
    total_engineers: int
    available_engineers: int
    on_call_engineers: int
    active_work_orders: int
    overdue_work_orders: int
    sla_compliance_percent: float
    avg_response_time_minutes: float
    pending_escalations: int
    upcoming_scheduled_maintenance: int
    work_orders_by_status: dict[str, int]
    work_orders_by_priority: dict[str, int]
