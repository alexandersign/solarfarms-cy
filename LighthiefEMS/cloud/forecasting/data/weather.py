"""
Weather Data Integration

Fetches weather forecasts for solar/wind generation prediction.
Supports multiple weather APIs for redundancy.
"""

import requests
from datetime import datetime
from typing import Optional
from dataclasses import dataclass
import structlog

logger = structlog.get_logger()


@dataclass
class WeatherForecast:
    """Weather forecast data point."""
    timestamp: datetime
    temperature_c: float
    ghi_wm2: float  # Global Horizontal Irradiance
    dni_wm2: float  # Direct Normal Irradiance
    wind_speed_ms: float
    wind_direction_deg: float
    cloud_cover_percent: float
    humidity_percent: float
    pressure_hpa: float


class WeatherClient:
    """
    Weather data client for generation forecasting.

    Uses Open-Meteo API (free, no key required) as primary source.
    """

    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1/forecast"
        logger.info("Weather client initialized (Open-Meteo)")

    def get_forecast(
        self,
        latitude: float,
        longitude: float,
        hours_ahead: int = 48,
    ) -> list[WeatherForecast]:
        """
        Get weather forecast for a location.

        Args:
            latitude: Site latitude
            longitude: Site longitude
            hours_ahead: Forecast horizon in hours

        Returns:
            List of hourly weather forecast data points
        """
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": [
                "temperature_2m",
                "direct_normal_irradiance",
                "global_tilted_irradiance",
                "windspeed_10m",
                "winddirection_10m",
                "cloudcover",
                "relativehumidity_2m",
                "surface_pressure",
            ],
            "forecast_days": max(1, hours_ahead // 24 + 1),
            "timezone": "UTC",
        }

        try:
            response = requests.get(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

            hourly = data.get("hourly", {})
            timestamps = hourly.get("time", [])
            forecasts = []

            for i, ts in enumerate(timestamps[:hours_ahead]):
                forecasts.append(WeatherForecast(
                    timestamp=datetime.fromisoformat(ts),
                    temperature_c=hourly.get("temperature_2m", [0])[i],
                    ghi_wm2=hourly.get("global_tilted_irradiance", [0])[i],
                    dni_wm2=hourly.get("direct_normal_irradiance", [0])[i],
                    wind_speed_ms=hourly.get("windspeed_10m", [0])[i],
                    wind_direction_deg=hourly.get("winddirection_10m", [0])[i],
                    cloud_cover_percent=hourly.get("cloudcover", [0])[i],
                    humidity_percent=hourly.get("relativehumidity_2m", [0])[i],
                    pressure_hpa=hourly.get("surface_pressure", [1013])[i],
                ))

            logger.info(
                "Weather forecast fetched",
                location=f"{latitude:.2f},{longitude:.2f}",
                hours=len(forecasts),
            )
            return forecasts

        except Exception as e:
            logger.error("Weather forecast failed", error=str(e))
            return []
