"""
GridMind Cloud API

FastAPI application providing REST API for the EMS cloud platform.
Handles site management, telemetry data, commands, alarms, trading,
and real-time WebSocket streams.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import structlog

from app.config import get_settings
from app.routers import sites, telemetry, commands, alarms, trading, reports, maintenance
from app.middleware.audit import AuditLogMiddleware
from app.services.nats_service import nats_service
from app.services.redis_service import redis_service
from app.services.db_service import db_service

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle: startup and shutdown."""
    settings = get_settings()
    logger.info("Starting GridMind API", version=settings.app_version)

    # Initialize services
    await db_service.connect(settings.database_url, settings.timescale_url)
    await redis_service.connect(settings.redis_url)
    await nats_service.connect(settings.nats_url)

    # Start NATS telemetry subscriber
    await nats_service.subscribe_telemetry()

    logger.info("All services initialized")
    yield

    # Shutdown
    logger.info("Shutting down GridMind API")
    await nats_service.disconnect()
    await redis_service.disconnect()
    await db_service.disconnect()


app = FastAPI(
    title="GridMind API",
    description="Energy Management System - Cloud API for BESS monitoring, control, and trading",
    version=get_settings().app_version,
    lifespan=lifespan,
)

# CORS
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Audit logging
app.add_middleware(AuditLogMiddleware)

# Routers
app.include_router(sites.router, prefix="/api/v1/sites", tags=["Sites"])
app.include_router(telemetry.router, prefix="/api/v1/telemetry", tags=["Telemetry"])
app.include_router(commands.router, prefix="/api/v1/commands", tags=["Commands"])
app.include_router(alarms.router, prefix="/api/v1/alarms", tags=["Alarms"])
app.include_router(trading.router, prefix="/api/v1/trading", tags=["Trading"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Reports"])
app.include_router(maintenance.router, prefix="/api/v1/maintenance", tags=["Maintenance"])


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": settings.app_version,
        "services": {
            "database": db_service.is_connected(),
            "timescale": db_service.is_ts_connected(),
            "redis": redis_service.is_connected(),
            "nats": nats_service.is_connected(),
        },
    }


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "GridMind API",
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/health",
    }
