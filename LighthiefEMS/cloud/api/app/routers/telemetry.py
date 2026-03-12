"""
Telemetry API Router

Real-time and historical measurement data endpoints.
Includes WebSocket support for live data streaming.
"""

from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException, Query, WebSocket, WebSocketDisconnect
import json
import structlog

from app.models.schemas import TelemetryQuery, TelemetryResponse, MeasurementPoint
from app.services.redis_service import redis_service

logger = structlog.get_logger()
router = APIRouter()


@router.get("/{site_id}/latest")
async def get_latest_measurement(site_id: str):
    """Get the latest measurement for a site (from Redis cache)."""
    measurement = await redis_service.get_site_measurement(site_id)
    if not measurement:
        raise HTTPException(
            status_code=404,
            detail=f"No recent measurements for site {site_id}"
        )
    return measurement


@router.get("/{site_id}/state")
async def get_site_state(site_id: str):
    """Get the current state of a site."""
    state = await redis_service.get_site_state(site_id)
    if not state:
        raise HTTPException(
            status_code=404,
            detail=f"No state data for site {site_id}"
        )
    return state


@router.post("/query", response_model=TelemetryResponse)
async def query_telemetry(query: TelemetryQuery):
    """Query historical telemetry data from TimescaleDB.

    Supports configurable resolution for data aggregation:
    - 1s: Raw data (max 1 hour range)
    - 1m: 1-minute averages
    - 5m: 5-minute averages
    - 15m: 15-minute averages
    - 1h: Hourly averages
    """
    # Validate time range
    duration = (query.end_time - query.start_time).total_seconds()
    if duration <= 0:
        raise HTTPException(status_code=400, detail="end_time must be after start_time")
    if query.resolution == "1s" and duration > 3600:
        raise HTTPException(
            status_code=400,
            detail="Raw (1s) resolution limited to 1 hour range"
        )

    # TODO: Query TimescaleDB with time_bucket aggregation
    # For now, return empty response structure
    return TelemetryResponse(
        site_id=query.site_id,
        start_time=query.start_time,
        end_time=query.end_time,
        resolution=query.resolution,
        count=0,
        data=[],
    )


@router.websocket("/{site_id}/live")
async def websocket_live(websocket: WebSocket, site_id: str):
    """WebSocket endpoint for live measurement streaming.

    Streams real-time measurements as they arrive from the edge device.
    """
    await websocket.accept()
    logger.info("WebSocket connected", site_id=site_id)

    try:
        # Subscribe to Redis pub/sub for this site
        pubsub = redis_service.client.pubsub()
        await pubsub.subscribe(f"live:{site_id}")

        while True:
            message = await pubsub.get_message(
                ignore_subscribe_messages=True, timeout=1.0
            )
            if message and message["type"] == "message":
                await websocket.send_text(message["data"])

            # Check for client messages (commands, pings)
            try:
                client_msg = await websocket.receive_text()
                # Handle client commands if needed
            except Exception:
                pass

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected", site_id=site_id)
    except Exception as e:
        logger.error("WebSocket error", site_id=site_id, error=str(e))
    finally:
        await pubsub.unsubscribe(f"live:{site_id}")


@router.websocket("/alarms/live")
async def websocket_alarms(websocket: WebSocket):
    """WebSocket endpoint for live alarm streaming across all sites."""
    await websocket.accept()
    logger.info("Alarm WebSocket connected")

    try:
        pubsub = redis_service.client.pubsub()
        await pubsub.psubscribe("alarms:*")

        while True:
            message = await pubsub.get_message(
                ignore_subscribe_messages=True, timeout=1.0
            )
            if message and message["type"] == "pmessage":
                await websocket.send_text(message["data"])

    except WebSocketDisconnect:
        logger.info("Alarm WebSocket disconnected")
    except Exception as e:
        logger.error("Alarm WebSocket error", error=str(e))
    finally:
        await pubsub.punsubscribe("alarms:*")
