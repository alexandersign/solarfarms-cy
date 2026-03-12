"""
NATS service for edge-cloud messaging.

Subscribes to telemetry from edge devices and publishes commands.
"""

import json
from typing import Optional
import nats
from nats.aio.client import Client as NATSClient
import structlog

from app.services.redis_service import redis_service

logger = structlog.get_logger()


class NatsService:
    """NATS JetStream client for edge-cloud communication."""

    def __init__(self):
        self.client: Optional[NATSClient] = None
        self._connected = False

    async def connect(self, nats_url: str):
        """Connect to NATS server."""
        self.client = await nats.connect(nats_url)
        self._connected = True
        logger.info("NATS connected", url=nats_url)

    async def disconnect(self):
        """Disconnect from NATS."""
        if self.client:
            await self.client.drain()
            self._connected = False
            logger.info("NATS disconnected")

    def is_connected(self) -> bool:
        return self._connected

    async def subscribe_telemetry(self):
        """Subscribe to telemetry from all edge sites."""
        if not self.client:
            return

        async def telemetry_handler(msg):
            """Process incoming telemetry messages."""
            try:
                data = json.loads(msg.data.decode())
                site_id = data.get("site_id", "unknown")
                payload = data.get("payload", {})
                payload_type = payload.get("type", "unknown")

                if payload_type == "Measurement":
                    # Cache latest measurement in Redis
                    await redis_service.set_site_measurement(site_id, payload)
                    # Publish to WebSocket subscribers
                    await redis_service.publish_measurement(site_id, payload)

                elif payload_type == "Alarm":
                    await redis_service.publish_alarm(site_id, payload)

                elif payload_type == "StateChange":
                    state_data = {
                        "previous": payload.get("previous"),
                        "current": payload.get("current"),
                        "reason": payload.get("reason"),
                    }
                    await redis_service.set_site_state(site_id, state_data)

                elif payload_type == "Heartbeat":
                    await redis_service.set_site_state(site_id, payload)

            except Exception as e:
                logger.error("Error processing telemetry", error=str(e))

        # Subscribe to all site telemetry
        await self.client.subscribe("ems.*.telemetry", cb=telemetry_handler)
        logger.info("Subscribed to edge telemetry: ems.*.telemetry")

    async def send_command(self, site_id: str, command: dict):
        """Send a command to a specific edge site."""
        if not self.client:
            raise RuntimeError("NATS not connected")

        subject = f"ems.{site_id}.commands"
        payload = json.dumps(command).encode()
        await self.client.publish(subject, payload)
        logger.info("Command sent to edge", site_id=site_id, command_type=command.get("type"))


nats_service = NatsService()
