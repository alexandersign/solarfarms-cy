"""
Audit Log Middleware

Logs all API requests with timestamps, user info, and response status.
Required for NIS2 compliance.
"""

import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import structlog

logger = structlog.get_logger("audit")


class AuditLogMiddleware(BaseHTTPMiddleware):
    """Middleware that logs all API requests for audit trail."""

    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.time()

        # Extract request info
        method = request.method
        path = request.url.path
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "unknown")

        # Skip health checks from audit log
        if path in ("/health", "/"):
            return await call_next(request)

        # Process request
        response = await call_next(request)

        # Calculate duration
        duration_ms = (time.time() - start_time) * 1000

        # Log audit entry
        logger.info(
            "api_request",
            method=method,
            path=path,
            status_code=response.status_code,
            duration_ms=round(duration_ms, 2),
            client_ip=client_ip,
            user_agent=user_agent,
        )

        return response
