"""SQLite persistence for trades and bot state."""

from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


SCHEMA = """
CREATE TABLE IF NOT EXISTS trades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  side TEXT NOT NULL,
  entry_time TEXT,
  exit_time TEXT,
  entry_price REAL,
  exit_price REAL,
  qty REAL,
  pnl_usdt REAL,
  exit_reason TEXT,
  equity_before REAL,
  mode TEXT
);

CREATE TABLE IF NOT EXISTS bot_state (
  key TEXT PRIMARY KEY,
  value TEXT
);
"""


@dataclass
class StoredTrade:
    id: int
    side: str
    entry_time: str
    exit_time: str | None
    entry_price: float
    exit_price: float | None
    qty: float
    pnl_usdt: float | None
    exit_reason: str | None
    equity_before: float
    mode: str


class StateStore:
    def __init__(self, db_path: Path):
        self.db_path = db_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self) -> None:
        with self._connect() as conn:
            conn.executescript(SCHEMA)

    def get(self, key: str, default: str = "") -> str:
        with self._connect() as conn:
            row = conn.execute("SELECT value FROM bot_state WHERE key=?", (key,)).fetchone()
            return row["value"] if row else default

    def set(self, key: str, value: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "INSERT INTO bot_state(key,value) VALUES(?,?) "
                "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                (key, value),
            )

    def log_trade_open(
        self,
        side: str,
        entry_time: datetime,
        entry_price: float,
        qty: float,
        equity_before: float,
        mode: str,
    ) -> int:
        with self._connect() as conn:
            cur = conn.execute(
                """INSERT INTO trades(side, entry_time, entry_price, qty, equity_before, mode)
                   VALUES (?,?,?,?,?,?)""",
                (side, entry_time.isoformat(), entry_price, qty, equity_before, mode),
            )
            return int(cur.lastrowid)

    def log_trade_close(
        self,
        trade_id: int,
        exit_time: datetime,
        exit_price: float,
        pnl_usdt: float,
        exit_reason: str,
    ) -> None:
        with self._connect() as conn:
            conn.execute(
                """UPDATE trades SET exit_time=?, exit_price=?, pnl_usdt=?, exit_reason=?
                   WHERE id=?""",
                (exit_time.isoformat(), exit_price, pnl_usdt, exit_reason, trade_id),
            )

    def open_trade_id(self) -> int | None:
        with self._connect() as conn:
            row = conn.execute(
                "SELECT id FROM trades WHERE exit_time IS NULL ORDER BY id DESC LIMIT 1"
            ).fetchone()
            return int(row["id"]) if row else None

    def export_csv(self, path: Path) -> None:
        import csv

        with self._connect() as conn:
            rows = conn.execute("SELECT * FROM trades ORDER BY id").fetchall()
        if not rows:
            return
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=rows[0].keys())
            writer.writeheader()
            writer.writerows([dict(r) for r in rows])
