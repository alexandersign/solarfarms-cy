"""
Application configuration loaded from environment variables.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "GridMind"
    app_version: str = "0.1.0"
    debug: bool = False
    secret_key: str = "change-me-in-production"

    # Database
    database_url: str = "postgresql+asyncpg://gridmind:dev_password_change_me@localhost:5432/gridmind"
    timescale_url: str = "postgresql+asyncpg://gridmind:dev_password_change_me@localhost:5433/gridmind_ts"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # NATS
    nats_url: str = "nats://localhost:4222"

    # Keycloak / Auth
    keycloak_url: str = "http://localhost:8080"
    keycloak_realm: str = "gridmind"
    jwt_algorithm: str = "RS256"

    # CORS
    cors_origins: list[str] = ["http://localhost:3000", "http://localhost:3001"]

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    return Settings()
