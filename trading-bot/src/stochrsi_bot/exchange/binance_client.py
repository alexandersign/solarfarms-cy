"""Binance USD-M futures client (testnet + mainnet)."""

from __future__ import annotations

from binance.client import Client

from stochrsi_bot.config import BotConfig


def make_client(cfg: BotConfig) -> Client:
    if cfg.binance_testnet:
        return Client(
            cfg.binance_api_key,
            cfg.binance_api_secret,
            testnet=True,
        )
    return Client(cfg.binance_api_key, cfg.binance_api_secret)


def futures_base_url(cfg: BotConfig) -> str:
    if cfg.binance_testnet:
        return cfg.exchange.testnet_base_url
    return cfg.exchange.mainnet_base_url
