"""
Database service managing PostgreSQL and TimescaleDB connections.
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
import structlog

logger = structlog.get_logger()


class DatabaseService:
    """Manages database connections for both PostgreSQL and TimescaleDB."""

    def __init__(self):
        self.engine = None
        self.ts_engine = None
        self.session_factory = None
        self.ts_session_factory = None
        self._connected = False
        self._ts_connected = False

    async def connect(self, database_url: str, timescale_url: str):
        """Initialize database connections."""
        self.engine = create_async_engine(
            database_url,
            pool_size=20,
            max_overflow=10,
            pool_timeout=30,
            echo=False,
        )
        self.session_factory = async_sessionmaker(
            self.engine, class_=AsyncSession, expire_on_commit=False
        )
        self._connected = True
        logger.info("PostgreSQL connected", url=database_url.split("@")[-1])

        self.ts_engine = create_async_engine(
            timescale_url,
            pool_size=20,
            max_overflow=10,
            pool_timeout=30,
            echo=False,
        )
        self.ts_session_factory = async_sessionmaker(
            self.ts_engine, class_=AsyncSession, expire_on_commit=False
        )
        self._ts_connected = True
        logger.info("TimescaleDB connected", url=timescale_url.split("@")[-1])

    async def disconnect(self):
        """Close database connections."""
        if self.engine:
            await self.engine.dispose()
            self._connected = False
        if self.ts_engine:
            await self.ts_engine.dispose()
            self._ts_connected = False
        logger.info("Database connections closed")

    def get_session(self) -> AsyncSession:
        """Get a PostgreSQL session."""
        return self.session_factory()

    def get_ts_session(self) -> AsyncSession:
        """Get a TimescaleDB session."""
        return self.ts_session_factory()

    def is_connected(self) -> bool:
        return self._connected

    def is_ts_connected(self) -> bool:
        return self._ts_connected


db_service = DatabaseService()
