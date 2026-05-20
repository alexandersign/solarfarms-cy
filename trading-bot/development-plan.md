# Trading Bot — Development Plan

> Binance USDⓈ-M BTCUSDT daily StochRSI bot aligned with `strategy-summary.md`.

**Target repo layout:** `trading-bot/` (app) + reuse `scripts/stochrsi_backtest.py` (indicator math)

---

## 1. Goals

| Phase | Goal |
|-------|------|
| **M0** | Signal-only CLI (no keys) — parity with backtest |
| **M1** | Paper / testnet trading with logging |
| **M2** | Live semi-auto (alerts + manual confirm) |
| **M3** | Fully automated live with safety rails |
| **M4** | Monitoring, reporting, optional web UI |

**Non-goals (v1):** Multi-symbol, shorting, news API, VIP optimization.

---

## 2. Architecture

```
trading-bot/
├── README.md
├── strategy-summary.md
├── development-plan.md          (this file)
├── pyproject.toml               (or requirements.txt)
├── config/
│   ├── default.yaml             # strategy params
│   └── example.env              # API keys template
├── src/
│   └── stochrsi_bot/
│       ├── __init__.py
│       ├── config.py            # load YAML + env
│       ├── indicators.py        # StochRSI(14,14,3,3) — import from scripts or extract shared lib
│       ├── signals.py           # entry/exit/friday rules
│       ├── exchange/
│       │   ├── binance_client.py
│       │   ├── orders.py        # market entry, trailing stop, cancel
│       │   └── account.py       # balance, position, leverage
│       ├── engine/
│       │   ├── scheduler.py     # daily candle close + fri check
│       │   ├── runner.py        # main loop / one-shot
│       │   └── state.py         # SQLite: trades, entry price, peak for trail
│       ├── risk/
│       │   ├── limits.py        # max DD halt, min balance
│       │   └── friday.py
│       ├── notify/
│       │   ├── telegram.py      # optional
│       │   └── console.py
│       └── backtest/
│           └── replay.py        # thin wrapper calling scripts/
├── tests/
│   ├── test_indicators.py       # match TradingView / scripts output
│   ├── test_signals.py
│   └── fixtures/                # saved daily klines JSON
└── docker/
    └── Dockerfile               # optional VPS deploy
```

**Shared library refactor (recommended):** Move `stoch_rsi()`, kline fetch, and `run_leveraged_backtest()` from `scripts/` into `lib/stochrsi/` or `trading-bot/src/stochrsi_bot/` so bot and backtests share one implementation.

---

## 3. Strategy module (`signals.py`)

### Inputs (from `config/default.yaml`)

```yaml
symbol: BTCUSDT
interval: 1d
stoch_rsi:
  rsi_len: 14
  stoch_len: 14
  smooth_k: 3
  smooth_d: 3
levels:
  overbought: 75
  entry: 25
  exit: 75
  lookback_bars: 30
trail:
  callback_pct: 2.0          # 1.0 for aggressive (paper first)
leverage: 10
margin_type: ISOLATED
position_mode: ONE_WAY
compound: true               # use full available margin
optional:
  min_bars_since_ob: 0       # set 5 for insurance filter
  friday_close_if_losing: true
  friday_tight_trail_if_profit: false
  friday_tight_trail_pct: 1.0
fees:
  taker_rate: 0.0005
  use_bnb_discount: true
```

### Signal functions

```python
def was_overbought(k: Series, i: int, level: float, lookback: int) -> bool: ...
def entry_cross_down_25(k: Series, i: int) -> bool: ...
def exit_cross_up_75(k: Series, i: int) -> bool: ...
def passes_optional_filters(k, d, i, cfg) -> bool: ...
def friday_should_close(entry_price, mark_price, cfg) -> bool: ...
```

### Daily evaluation schedule

| Time (UTC) | Action |
|------------|--------|
| **00:05** | Fetch last **closed** daily candle; compute StochRSI; evaluate entry/exit signals |
| **Every 1–5 min** | Sync open position; ensure trailing stop exists; update state |
| **Fri 20:00** | Apply Friday losing rule if enabled |

> Binance daily kline `close_time` is 23:59:59 UTC for the candle labeled that date. Align bot cron with **closed** bar only — never signal on forming candle.

---

## 4. Exchange integration (`exchange/`)

### Dependencies

- `python-binance` or direct REST + `websocket` for user stream
- Prefer **official Binance Futures API** docs for USDT-M

### Client capabilities

| Method | API / order type |
|--------|------------------|
| Set leverage + margin type | `POST /fapi/v1/leverage`, `marginType` |
| Market long | `MARKET` buy |
| Trailing stop | `TRAILING_STOP_MARKET`, `callbackRate=2.0`, `reduceOnly=true` |
| Cancel all open orders | On stoch exit or manual flat |
| Position query | `GET /fapi/v2/positionRisk` |
| Klines | `GET /fapi/v1/klines` interval=1d |

### Order workflow (long entry)

1. Read USDT balance → compute qty = `(equity * leverage) / price` (respect min notional / step size)
2. Place **MARKET** buy
3. Immediately place **TRAILING_STOP_MARKET** sell for full qty
4. Persist `entry_price`, `entry_time`, `trail_order_id` in `state.db`

### Exit workflow

- **Trail hit:** Binance handles; bot detects flat position on next poll → log trade
- **Stoch 75:** Cancel trail → **MARKET** sell → log trade
- **Friday losing:** Cancel trail → **MARKET** sell

### Error handling

- Retry with exponential backoff (429 / 5xx)
- If trail placement fails after entry → **alert + emergency market close** or retry trail (config flag)
- Never leave naked long at 10×

---

## 5. State & persistence (`state.py`)

SQLite schema (minimum):

```sql
CREATE TABLE bot_state (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE trades (
  id INTEGER PRIMARY KEY,
  entry_time TEXT,
  exit_time TEXT,
  entry_price REAL,
  exit_price REAL,
  qty REAL,
  pnl_usdt REAL,
  exit_reason TEXT,
  equity_before REAL
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  trade_id INTEGER,
  binance_order_id TEXT,
  type TEXT,
  status TEXT,
  created_at TEXT
);
```

Store: last processed candle timestamp (idempotency), open trade metadata, peak price for logging.

---

## 6. Risk module (`risk/`)

| Guard | Behavior |
|-------|----------|
| **Min balance** | Stop bot if equity < threshold |
| **Max daily loss** | Halt new entries if −X% today |
| **Max drawdown** | Halt if equity −Y% from peak |
| **Single position** | No pyramiding; one BTC long max |
| **Kill switch** | File flag `STOP` or env `BOT_ENABLED=false` |
| **API permissions** | Futures only; withdrawals disabled |

**Slippage awareness (v2):** Log actual fill vs trail trigger; optionally widen trail in config if median slippage > 1%.

---

## 7. Development phases

### M0 — Signal parity (1–2 days)

- [ ] Extract `stoch_rsi()` to shared module
- [ ] `python -m stochrsi_bot.runner --dry-run` prints signal vs `stochrsi_live_check.py`
- [ ] Unit tests: indicator values vs saved fixture for 50 daily bars
- [ ] Config YAML loads and validates

**Done when:** Dry-run matches backtest entry dates on last 2y window.

### M1 — Paper / testnet (3–5 days)

- [ ] Binance **testnet** futures connection
- [ ] Implement entry + trailing stop + position sync
- [ ] SQLite trade log
- [ ] Console / Telegram notifications
- [ ] Run 30 days parallel to dry-run signals

**Done when:** Paper fills logged; no missed signals vs M0.

### M2 — Semi-automatic live (2–3 days)

- [ ] `--confirm` flag: notify only unless `--execute`
- [ ] Telegram: “ENTRY signal — reply YES to execute”
- [ ] Manual override CLI: `flat`, `status`, `attach-trail`

**Done when:** Operator can run one week with confirm gate.

### M3 — Full automation (3–5 days)

- [ ] Remove confirm gate (config `auto_execute: true`)
- [ ] VPS cron or long-running process with healthcheck
- [ ] Friday rule cron
- [ ] Funding rate log (informational)
- [ ] Restart recovery: reconcile exchange state vs DB

**Done when:** 2 weeks live at **minimum size** (e.g. €100–500) without intervention.

### M4 — Hardening (ongoing)

- [ ] Slippage-adjusted backtest replay on live fills
- [ ] Dashboard (optional FastAPI + simple HTML)
- [ ] Monthly PDF/email report
- [ ] Optional: TradingView webhook receiver instead of polling

---

## 8. Testing strategy

| Layer | Tests |
|-------|--------|
| **Unit** | StochRSI math, signal booleans, Friday rule |
| **Integration** | Mock Binance responses; order sequence |
| **Regression** | Compare 2y trade list to `stochrsi_leveraged.py` output |
| **Live shadow** | Dry-run alongside real account for 1 month |

```powershell
# Regression check (after shared lib extract)
python -m pytest trading-bot/tests/
python scripts/stochrsi_leveraged.py
```

---

## 9. Deployment

### Local / VPS (Windows or Linux)

```powershell
cd trading-bot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy config\example.env .env   # BINANCE_API_KEY, BINANCE_API_SECRET
python -m stochrsi_bot.runner --dry-run
```

### Scheduler

- **Windows:** Task Scheduler — daily 00:10 UTC + Fri 20:00 UTC
- **Linux:** `cron` + `systemd` service for websocket/poll loop
- **Alternative:** GitHub Actions **not recommended** for live trading (latency, secrets)

### Secrets

- `.env` in `.gitignore`
- API: **Futures enabled, withdrawals disabled, IP whitelist**

---

## 10. `requirements.txt` (initial)

```
pandas>=2.0
numpy>=1.24
pyyaml>=6.0
python-dotenv>=1.0
python-binance>=1.0.19
requests>=2.28
# optional
python-telegram-bot>=20.0
pytest>=7.0
```

---

## 11. Open decisions

| # | Question | Recommendation |
|---|----------|----------------|
| 1 | Default trail **1%** or **2%**? | **2%** live; paper-test 1% |
| 2 | Enable **≥5 bar** OB wait? | Off initially; toggle in config |
| 3 | Compound vs fixed stake live? | Start **fixed small stake**; enable compound after 3 months |
| 4 | Stoch 75 exit polling? | Low priority — trail exits first |
| 5 | Shared lib location | `lib/stochrsi/` used by both `scripts/` and `trading-bot/` |

---

## 12. First implementation tasks (sprint 1)

1. Create `trading-bot/src/stochrsi_bot/indicators.py` — copy/adapt from `scripts/stochrsi_backtest.py`
2. Create `signals.py` + tests against known dates (Jul 2024, Jan 2026 entries)
3. Create `config/default.yaml` + `example.env`
4. Create `runner.py --dry-run` using public klines API (no keys)
5. Document run instructions in `trading-bot/README.md`

**Estimated effort:** M0–M1 ≈ **1–2 weeks** part-time; M3 live ≈ **+2 weeks** including paper validation.

---

## 13. Related documents

- [strategy-summary.md](./strategy-summary.md) — full research summary and backtest numbers
- `scripts/stochrsi_*.py` — existing backtest implementations
