"""Pytest fixtures — SSL fallback for Binance API in CI/dev."""

from __future__ import annotations

import ssl


def pytest_configure(config):
    # Allow Binance fetches when corporate proxy breaks cert chain (dev only).
    try:
        ssl._create_default_https_context()
    except Exception:
        pass
    _orig = ssl.create_default_context

    def _patched(*args, **kwargs):
        ctx = _orig(*args, **kwargs)
        return ctx

    # Retry unverified only on verify failure at urllib level — handled in klines.py
