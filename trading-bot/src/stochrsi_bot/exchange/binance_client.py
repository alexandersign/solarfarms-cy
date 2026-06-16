"""Binance USD-M Futures REST client (testnet + mainnet)."""

from __future__ import annotations

import hashlib
import hmac
import json
import time
import urllib.parse
import urllib.request
from typing import Any


class BinanceFuturesClient:
    def __init__(self, base_url: str, api_key: str = "", api_secret: str = ""):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.api_secret = api_secret

    def _sign(self, params: dict[str, Any]) -> str:
        query = urllib.parse.urlencode(params)
        return hmac.new(
            self.api_secret.encode(),
            query.encode(),
            hashlib.sha256,
        ).hexdigest()

    def _request(
        self,
        method: str,
        path: str,
        params: dict[str, Any] | None = None,
        signed: bool = False,
    ) -> Any:
        params = dict(params or {})
        headers = {"User-Agent": "stochrsi-bot/0.1"}
        if self.api_key:
            headers["X-MBX-APIKEY"] = self.api_key
        if signed:
            params["timestamp"] = int(time.time() * 1000)
            params["signature"] = self._sign(params)

        query = urllib.parse.urlencode(params)
        url = f"{self.base_url}{path}"
        if query:
            url = f"{url}?{query}"

        req = urllib.request.Request(url, method=method, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())

    def exchange_info(self, symbol: str) -> dict:
        data = self._request("GET", "/fapi/v1/exchangeInfo")
        for s in data["symbols"]:
            if s["symbol"] == symbol:
                return s
        raise ValueError(f"Symbol {symbol} not found")

    def set_leverage(self, symbol: str, leverage: int) -> None:
        self._request(
            "POST",
            "/fapi/v1/leverage",
            {"symbol": symbol, "leverage": leverage},
            signed=True,
        )

    def set_margin_type(self, symbol: str, margin_type: str) -> None:
        try:
            self._request(
                "POST",
                "/fapi/v1/marginType",
                {"symbol": symbol, "marginType": margin_type},
                signed=True,
            )
        except urllib.error.HTTPError as e:
            # Already set
            if e.code != 400:
                raise

    def balance_usdt(self) -> float:
        balances = self._request("GET", "/fapi/v2/balance", signed=True)
        for b in balances:
            if b["asset"] == "USDT":
                return float(b["balance"])
        return 0.0

    def position(self, symbol: str) -> dict | None:
        positions = self._request("GET", "/fapi/v2/positionRisk", signed=True)
        for p in positions:
            if p["symbol"] == symbol and float(p["positionAmt"]) != 0:
                return p
        return None

    def open_orders(self, symbol: str) -> list:
        return self._request(
            "GET",
            "/fapi/v1/openOrders",
            {"symbol": symbol},
            signed=True,
        )

    def cancel_all(self, symbol: str) -> None:
        self._request(
            "DELETE",
            "/fapi/v1/allOpenOrders",
            {"symbol": symbol},
            signed=True,
        )

    def market_order(
        self,
        symbol: str,
        side: str,
        quantity: float,
        reduce_only: bool = False,
    ) -> dict:
        params: dict[str, Any] = {
            "symbol": symbol,
            "side": side,
            "type": "MARKET",
            "quantity": quantity,
        }
        if reduce_only:
            params["reduceOnly"] = "true"
        return self._request("POST", "/fapi/v1/order", params, signed=True)

    def trailing_stop(
        self,
        symbol: str,
        side: str,
        quantity: float,
        callback_rate: float,
    ) -> dict:
        return self._request(
            "POST",
            "/fapi/v1/order",
            {
                "symbol": symbol,
                "side": side,
                "type": "TRAILING_STOP_MARKET",
                "quantity": quantity,
                "callbackRate": callback_rate,
                "reduceOnly": "true",
                "workingType": "CONTRACT_PRICE",
            },
            signed=True,
        )


def round_qty(qty: float, step_size: float) -> float:
    if step_size <= 0:
        return qty
    precision = max(0, -int(round(__import__("math").log10(step_size))))
    factor = 10**precision
    return int(qty * factor) / factor
