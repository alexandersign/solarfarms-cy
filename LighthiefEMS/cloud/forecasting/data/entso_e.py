"""
ENTSO-E Transparency Platform Client

Fetches electricity market data from the ENTSO-E Transparency Platform
for price forecasting and market analysis.

Data available:
    - Day-ahead prices (all EU bidding zones)
    - Generation forecasts (solar, wind, total)
    - Load forecasts
    - Cross-border flows
    - Balancing market data
"""

import pandas as pd
from datetime import datetime, timedelta
from typing import Optional
import structlog

logger = structlog.get_logger()

# Bidding zone codes for priority markets
BIDDING_ZONES = {
    "cyprus": "10YCY-1001A0003J",
    "greece": "10YGR-HTSO-----Y",
    "germany_luxembourg": "10Y1001A1001A82H",
    "italy_north": "10Y1001A1001A73I",
    "spain": "10YES-REE------0",
    "france": "10YFR-RTE------C",
    "sweden_se3": "10Y1001A1001A46L",
    "norway_no2": "10YNO-2--------T",
    "finland": "10YFI-1--------U",
}


class EntsoeClient:
    """
    Client for ENTSO-E Transparency Platform REST API.

    Requires an API key from https://transparency.entsoe.eu/
    """

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://web-api.tp.entsoe.eu/api"
        logger.info("ENTSO-E client initialized")

    def get_day_ahead_prices(
        self,
        bidding_zone: str,
        start: datetime,
        end: datetime,
    ) -> pd.DataFrame:
        """
        Fetch day-ahead electricity prices.

        Args:
            bidding_zone: Market code or bidding zone EIC
            start: Start datetime
            end: End datetime

        Returns:
            DataFrame with columns: [timestamp, price_eur_mwh]
        """
        zone_code = BIDDING_ZONES.get(bidding_zone, bidding_zone)

        try:
            from entsoe import EntsoePandasClient
            client = EntsoePandasClient(api_key=self.api_key)
            prices = client.query_day_ahead_prices(
                zone_code,
                start=pd.Timestamp(start, tz="UTC"),
                end=pd.Timestamp(end, tz="UTC"),
            )
            df = prices.reset_index()
            df.columns = ["timestamp", "price_eur_mwh"]
            logger.info(
                "Day-ahead prices fetched",
                zone=bidding_zone,
                rows=len(df),
                start=start.isoformat(),
                end=end.isoformat(),
            )
            return df

        except ImportError:
            logger.warning("entsoe-py not available, returning empty DataFrame")
            return pd.DataFrame(columns=["timestamp", "price_eur_mwh"])
        except Exception as e:
            logger.error("Failed to fetch day-ahead prices", error=str(e))
            return pd.DataFrame(columns=["timestamp", "price_eur_mwh"])

    def get_generation_forecast(
        self,
        bidding_zone: str,
        start: datetime,
        end: datetime,
    ) -> pd.DataFrame:
        """
        Fetch generation forecast (solar, wind, total).

        Returns:
            DataFrame with generation forecast by type
        """
        zone_code = BIDDING_ZONES.get(bidding_zone, bidding_zone)

        try:
            from entsoe import EntsoePandasClient
            client = EntsoePandasClient(api_key=self.api_key)
            forecast = client.query_generation_forecast(
                zone_code,
                start=pd.Timestamp(start, tz="UTC"),
                end=pd.Timestamp(end, tz="UTC"),
            )
            return forecast.reset_index()
        except Exception as e:
            logger.error("Failed to fetch generation forecast", error=str(e))
            return pd.DataFrame()

    def get_load_forecast(
        self,
        bidding_zone: str,
        start: datetime,
        end: datetime,
    ) -> pd.DataFrame:
        """Fetch load forecast for a bidding zone."""
        zone_code = BIDDING_ZONES.get(bidding_zone, bidding_zone)

        try:
            from entsoe import EntsoePandasClient
            client = EntsoePandasClient(api_key=self.api_key)
            forecast = client.query_load_forecast(
                zone_code,
                start=pd.Timestamp(start, tz="UTC"),
                end=pd.Timestamp(end, tz="UTC"),
            )
            df = forecast.reset_index()
            df.columns = ["timestamp", "load_mw"]
            return df
        except Exception as e:
            logger.error("Failed to fetch load forecast", error=str(e))
            return pd.DataFrame(columns=["timestamp", "load_mw"])
