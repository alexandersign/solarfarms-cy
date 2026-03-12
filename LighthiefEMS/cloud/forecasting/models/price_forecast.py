"""
Electricity Price Forecasting

ML-based electricity price prediction for day-ahead and intraday markets.
Uses historical prices, load forecasts, generation forecasts, and weather
data as features.

Models:
    - Gradient Boosting (fast, baseline)
    - LSTM / Transformer (deep learning, production)
"""

import numpy as np
import pandas as pd
from dataclasses import dataclass
from typing import Optional
from datetime import datetime, timedelta
import structlog

logger = structlog.get_logger()


@dataclass
class PriceForecastResult:
    """Price forecast output."""
    timestamps: list[datetime]
    prices_eur_mwh: list[float]
    confidence_lower: list[float]
    confidence_upper: list[float]
    model_name: str
    forecast_horizon_hours: int
    mae_eur_mwh: Optional[float] = None  # Mean Absolute Error from backtest


class PriceForecaster:
    """
    Electricity price forecaster using gradient boosting.

    Features used:
        - Hour of day, day of week, month
        - Lagged prices (1h, 2h, 24h, 168h)
        - Load forecast
        - Solar/wind generation forecast
        - Temperature
        - Gas price (if available)
    """

    def __init__(self):
        self.model = None
        self.is_trained = False
        self.feature_names: list[str] = []
        self.scaler = None
        logger.info("Price forecaster initialized")

    def train(self, historical_data: pd.DataFrame) -> dict:
        """
        Train the price forecasting model.

        Args:
            historical_data: DataFrame with columns:
                timestamp, price_eur_mwh, load_mw, solar_mw, wind_mw, temperature_c

        Returns:
            Training metrics (MAE, RMSE, R²)
        """
        from sklearn.ensemble import GradientBoostingRegressor
        from sklearn.model_selection import TimeSeriesSplit
        from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

        df = historical_data.copy()
        df = self._create_features(df)

        # Features and target
        self.feature_names = [
            "hour", "day_of_week", "month", "is_weekend",
            "price_lag_1h", "price_lag_24h", "price_lag_168h",
            "price_rolling_24h_mean", "price_rolling_24h_std",
        ]

        # Add optional features
        for col in ["load_mw", "solar_mw", "wind_mw", "temperature_c"]:
            if col in df.columns:
                self.feature_names.append(col)

        df = df.dropna(subset=self.feature_names + ["price_eur_mwh"])

        X = df[self.feature_names].values
        y = df["price_eur_mwh"].values

        # Time series cross-validation
        tscv = TimeSeriesSplit(n_splits=5)
        mae_scores = []

        for train_idx, test_idx in tscv.split(X):
            X_train, X_test = X[train_idx], X[test_idx]
            y_train, y_test = y[train_idx], y[test_idx]

            model = GradientBoostingRegressor(
                n_estimators=200,
                max_depth=6,
                learning_rate=0.1,
                subsample=0.8,
                min_samples_leaf=10,
                random_state=42,
            )
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            mae_scores.append(mean_absolute_error(y_test, y_pred))

        # Train final model on all data
        self.model = GradientBoostingRegressor(
            n_estimators=200,
            max_depth=6,
            learning_rate=0.1,
            subsample=0.8,
            min_samples_leaf=10,
            random_state=42,
        )
        self.model.fit(X, y)
        self.is_trained = True

        metrics = {
            "mae_eur_mwh": float(np.mean(mae_scores)),
            "mae_std": float(np.std(mae_scores)),
            "n_samples": len(X),
            "n_features": len(self.feature_names),
        }

        logger.info("Price model trained", **metrics)
        return metrics

    def forecast(
        self,
        recent_prices: pd.DataFrame,
        horizon_hours: int = 48,
        load_forecast: Optional[pd.DataFrame] = None,
        gen_forecast: Optional[pd.DataFrame] = None,
    ) -> PriceForecastResult:
        """
        Generate price forecast.

        Args:
            recent_prices: Recent price history for feature calculation
            horizon_hours: Forecast horizon
            load_forecast: Optional load forecast
            gen_forecast: Optional generation forecast

        Returns:
            Price forecast with confidence intervals
        """
        if not self.is_trained:
            # Return simple persistence forecast if model not trained
            last_price = recent_prices["price_eur_mwh"].iloc[-1] if len(recent_prices) > 0 else 50.0
            now = datetime.utcnow()
            timestamps = [now + timedelta(hours=h) for h in range(horizon_hours)]
            prices = [last_price] * horizon_hours

            return PriceForecastResult(
                timestamps=timestamps,
                prices_eur_mwh=prices,
                confidence_lower=[p * 0.7 for p in prices],
                confidence_upper=[p * 1.3 for p in prices],
                model_name="persistence",
                forecast_horizon_hours=horizon_hours,
            )

        # Create feature matrix for forecast horizon
        now = datetime.utcnow()
        timestamps = [now + timedelta(hours=h) for h in range(horizon_hours)]

        # Build forecast features
        forecast_features = []
        last_prices = recent_prices["price_eur_mwh"].values

        for i, ts in enumerate(timestamps):
            features = {
                "hour": ts.hour,
                "day_of_week": ts.weekday(),
                "month": ts.month,
                "is_weekend": 1 if ts.weekday() >= 5 else 0,
                "price_lag_1h": last_prices[-1] if i == 0 else forecast_features[-1].get("predicted", last_prices[-1]),
                "price_lag_24h": last_prices[-24] if len(last_prices) >= 24 else last_prices[-1],
                "price_lag_168h": last_prices[-168] if len(last_prices) >= 168 else last_prices[-1],
                "price_rolling_24h_mean": np.mean(last_prices[-24:]) if len(last_prices) >= 24 else np.mean(last_prices),
                "price_rolling_24h_std": np.std(last_prices[-24:]) if len(last_prices) >= 24 else np.std(last_prices),
            }
            forecast_features.append(features)

        X_forecast = pd.DataFrame(forecast_features)[self.feature_names].values
        predictions = self.model.predict(X_forecast)

        # Estimate confidence intervals using prediction variance
        std_estimate = np.std(predictions) * 0.2  # Rough estimate
        confidence_lower = (predictions - 1.96 * std_estimate).tolist()
        confidence_upper = (predictions + 1.96 * std_estimate).tolist()

        return PriceForecastResult(
            timestamps=timestamps,
            prices_eur_mwh=predictions.tolist(),
            confidence_lower=confidence_lower,
            confidence_upper=confidence_upper,
            model_name="gradient_boosting",
            forecast_horizon_hours=horizon_hours,
        )

    def _create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create time-based and lag features."""
        df = df.copy()
        df["timestamp"] = pd.to_datetime(df["timestamp"])
        df = df.sort_values("timestamp").reset_index(drop=True)

        df["hour"] = df["timestamp"].dt.hour
        df["day_of_week"] = df["timestamp"].dt.dayofweek
        df["month"] = df["timestamp"].dt.month
        df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)

        # Price lags
        df["price_lag_1h"] = df["price_eur_mwh"].shift(1)
        df["price_lag_24h"] = df["price_eur_mwh"].shift(24)
        df["price_lag_168h"] = df["price_eur_mwh"].shift(168)

        # Rolling statistics
        df["price_rolling_24h_mean"] = df["price_eur_mwh"].rolling(24).mean()
        df["price_rolling_24h_std"] = df["price_eur_mwh"].rolling(24).std()

        return df
