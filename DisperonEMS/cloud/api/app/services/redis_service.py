"""
Redis service for real-time state caching and pub/sub.
"""

import json
from typing import Optional
import redis.asyncio as aioredis
import structlog

logger = structlog.get_logger()


class RedisService:
    """Redis client for caching and pub/sub."""

    def __init__(self):
        self.client: Optional[aioredis.Redis] = None
        self._connected = False

    async def connect(self, redis_url: str):
        """Connect to Redis."""
        self.client = aioredis.from_url(redis_url, decode_responses=True)
        await self.client.ping()
        self._connected = True
        logger.info("Redis connected", url=redis_url)

    async def disconnect(self):
        """Close Redis connection."""
        if self.client:
            await self.client.close()
            self._connected = False
            logger.info("Redis disconnected")

    def is_connected(self) -> bool:
        return self._connected

    # ─── Real-time State Cache ────────────────────────────────────────────

    async def set_site_state(self, site_id: str, state: dict):
        """Cache current site state (overwritten each measurement cycle)."""
        key = f"site:{site_id}:state"
        await self.client.set(key, json.dumps(state), ex=300)  # 5min TTL

    async def get_site_state(self, site_id: str) -> Optional[dict]:
        """Get cached site state."""
        key = f"site:{site_id}:state"
        data = await self.client.get(key)
        return json.loads(data) if data else None

    async def set_site_measurement(self, site_id: str, measurement: dict):
        """Cache latest measurement for a site."""
        key = f"site:{site_id}:measurement"
        await self.client.set(key, json.dumps(measurement), ex=60)

    async def get_site_measurement(self, site_id: str) -> Optional[dict]:
        """Get cached latest measurement."""
        key = f"site:{site_id}:measurement"
        data = await self.client.get(key)
        return json.loads(data) if data else None

    # ─── Pub/Sub for Live Dashboard ───────────────────────────────────────

    async def publish_measurement(self, site_id: str, measurement: dict):
        """Publish measurement for WebSocket subscribers."""
        channel = f"live:{site_id}"
        await self.client.publish(channel, json.dumps(measurement))

    async def publish_alarm(self, site_id: str, alarm: dict):
        """Publish alarm for WebSocket subscribers."""
        channel = f"alarms:{site_id}"
        await self.client.publish(channel, json.dumps(alarm))


redis_service = RedisService()
