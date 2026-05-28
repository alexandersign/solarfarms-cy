"""SQLite persistence for open trades and bot state."""

from __future__ import annotations

import sqlite3
from pathlib import Path


class StateStore:
    def __init__(self, db_path: Path):
        db_path.parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(db_path)
        self._init()

    def _init(self) -> None:
        self.conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS bot_state (
                key TEXT PRIMARY KEY,
                value TEXT
            );
            CREATE TABLE IF NOT EXISTS trades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                side TEXT,
                entry_time TEXT,
                exit_time TEXT,
                entry_price REAL,
                exit_price REAL,
                qty REAL,
                exit_reason TEXT,
                trail_order_id TEXT
            );
            """
        )
        self.conn.commit()

    def get(self, key: str) -> str | None:
        row = self.conn.execute(
            "SELECT value FROM bot_state WHERE key = ?", (key,)
        ).fetchone()
        return row[0] if row else None

    def set(self, key: str, value: str) -> None:
        self.conn.execute(
            "INSERT OR REPLACE INTO bot_state (key, value) VALUES (?, ?)",
            (key, value),
        )
        self.conn.commit()

    def open_trade(self) -> dict | None:
        row = self.conn.execute(
            "SELECT id, side, entry_time, entry_price, qty, trail_order_id "
            "FROM trades WHERE exit_time IS NULL ORDER BY id DESC LIMIT 1"
        ).fetchone()
        if not row:
            return None
        return {
            "id": row[0],
            "side": row[1],
            "entry_time": row[2],
            "entry_price": row[3],
            "qty": row[4],
            "trail_order_id": row[5],
        }

    def start_trade(
        self,
        side: str,
        entry_time: str,
        entry_price: float,
        qty: float,
        trail_order_id: str,
    ) -> int:
        cur = self.conn.execute(
            "INSERT INTO trades (side, entry_time, entry_price, qty, trail_order_id) "
            "VALUES (?, ?, ?, ?, ?)",
            (side, entry_time, entry_price, qty, trail_order_id),
        )
        self.conn.commit()
        return int(cur.lastrowid)

    def close_trade(
        self,
        trade_id: int,
        exit_time: str,
        exit_price: float,
        exit_reason: str,
    ) -> None:
        self.conn.execute(
            "UPDATE trades SET exit_time=?, exit_price=?, exit_reason=? WHERE id=?",
            (exit_time, exit_price, exit_reason, trade_id),
        )
        self.conn.commit()
