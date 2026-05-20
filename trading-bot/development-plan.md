# Trading Bot — Development Plan

> Binance USDⓈ-M **BTCUSDT daily** StochRSI bot.  
> Strategy reference: [strategy-summary.md](./strategy-summary.md)  
> Backtest code: `../scripts/stochrsi_*.py`

**Last updated:** May 2026

---

## 1. Product goals

| Phase | Deliverable | Environment |
|-------|-------------|-------------|
| **M0** | Signal-only CLI (no API keys) | Public klines |
| **M1** | **Paper trade on Binance Futures Testnet** | testnet.binancefuture.com |
| **M2** | Live semi-auto (alert → confirm → execute) | Mainnet, small size |
| **M3** | Full auto with safety rails | Mainnet |
| **M4** | Monitoring, fill analytics, optional UI | Mainnet |

### v1 scope

| In scope | Out of scope (v1) |
|----------|-------------------|
| Daily **1D** StochRSI(14,14,3,3) | 1H / 4H / intraday signals |
| **Long** 25/75 + 2% trail | News API, VIP tier logic |
| Optional **short mirror** (`mode: both`) | Multi-symbol portfolio |
| Testnet + mainnet | Hedged long+short simultaneously |
| Compound sizing (configurable) | Copy-trading platform |

### Backtest targets to validate in paper (1y, €1k, 10×, 2% trail)

| Mode | Sim final | Return | Trades | Notes |
|------|-----------|--------|--------|-------|
| Long only | ~€9,833 | +883% | 15 | Baseline |
| Long + short | ~€20,722 | +1,972% | 32 | ~2.1× endpoint vs long-only |

Script: `python scripts/stochrsi_1y_trade_log.py` (set `START = 1000` in `stochrsi_long_short.py`).

---

## 2. Strategy rules (bot must implement)

### Long (baseline)

| Step | Rule |
|------|------|
| Filter | K was **≥ 75** within last **30** closed daily bars |
| Entry | K crosses **down** through **25** → open **LONG** |
| Exit A | **TRAILING_STOP_MARKET** callback **2.0%** (tracks peak) |
| Exit B | K crosses **up** through **75** → cancel trail, market close |
| Friday | **20:00 UTC** — close only if **price < entry** |

### Short (mirror, optional `mode: both`)

| Step | Rule |
|------|------|
| Filter | K was **≤ 25** within last **30** bars |
| Entry | K crosses **up** through **75** → open **SHORT** |
| Exit A | Trail **2% above** trough (`callbackRate=2.0`, short) |
| Exit B | K crosses **down** through **25** → market cover |

**One position at a time** (one-way mode): flat → long **or** short → flat.

### Config default

```yaml
mode: long_only          # long_only | short_only | both
symbol: BTCUSDT
interval: 1d
leverage: 10
margin_type: ISOLATED
position_mode: ONE_WAY
trail_callback_pct: 2.0
compound: true
start_equity_usdt: 1000  # paper tracking only on testnet
```

---

## 3. Repository layout

```
trading-bot/
├── README.md
├── strategy-summary.md
├── development-plan.md       ← this file
├── requirements.txt
├── config/
│   ├── default.yaml
│   └── example.env
├── src/
│   └── stochrsi_bot/
│       ├── __init__.py
│       ├── config.py
│       ├── indicators.py     # StochRSI — shared with scripts/
│       ├── signals.py        # long + short entry/exit
│       ├── exchange/
│       │   ├── binance_client.py   # testnet vs mainnet base URL
│       │   ├── orders.py           # market, trailing stop, cancel
│       │   └── account.py          # balance, position, leverage
│       ├── engine/
│       │   ├── runner.py           # CLI entrypoint
│       │   ├── scheduler.py        # daily + friday jobs
│       │   └── state.py            # SQLite
│       ├── risk/
│       │   ├── limits.py
│       │   └── friday.py
│       └── notify/
│           ├── telegram.py         # optional
│           └── console.py
├── tests/
│   ├── test_indicators.py
│   ├── test_signals.py
│   └── fixtures/
└── logs/                         # gitignored
```

**Refactor (sprint 0):** Extract `stoch_rsi()` + kline fetch from `scripts/stochrsi_backtest.py` into `src/stochrsi_bot/indicators.py` (or `lib/stochrsi/`) so bot and backtests share one implementation.

---

## 4. Binance paper trading (M1)

### Yes — use Futures Testnet

| Item | Value |
|------|--------|
| URL | https://testnet.binancefuture.com |
| Money | Test USDT (not real) |
| API base | `https://testnet.binancefuture.com` |
| Keys | Separate from mainnet — **never mix** in `.env` |

### Setup checklist

1. Register at **testnet.binancefuture.com** (different account from binance.com).
2. Create API key: **Enable Futures**, **disable Withdrawals**, optional IP whitelist.
3. Copy `config/example.env` → `.env`:
   ```env
   BINANCE_API_KEY=...
   BINANCE_API_SECRET=...
   BINANCE_TESTNET=true
   BOT_ENABLED=true
   BOT_MODE=both
   ```
4. Fund test wallet via testnet faucet if balance is zero.
5. Set BTCUSDT **isolated 10×** once at startup.

### Testnet limitations

- Liquidity and fills ≠ mainnet.
- Occasional resets / downtime.
- Use for **logic + order flow**, not exact PnL vs backtest.

### Paper-trade success criteria (30 days)

- [ ] Every backtest signal date has matching bot signal (±0 bars).
- [ ] Every entry has trailing stop within 5s.
- [ ] No naked position without stop.
- [ ] Trade log CSV matches `stochrsi_long_short.py` direction (long/short).

---

## 5. Exchange integration

### Dependencies

```
pandas>=2.0
numpy>=1.24
pyyaml>=6.0
python-dotenv>=1.0
python-binance>=1.0.19
requests>=2.28
pytest>=7.0
# optional: python-telegram-bot>=20.0
```

### Order flows

**Long entry**

1. `POST /fapi/v1/leverage` → 10, `ISOLATED`
2. `MARKET` BUY qty = `floor(equity * leverage / price, stepSize)`
3. `TRAILING_STOP_MARKET` SELL, `callbackRate=2.0`, `reduceOnly=true`, full qty
4. Save `entry_price`, `trail_order_id`, `side=LONG` in SQLite

**Short entry**

1. `MARKET` SELL (open short)
2. `TRAILING_STOP_MARKET` BUY, `callbackRate=2.0`, `reduceOnly=true`
3. Trail tracks **low** — exchange handles direction

**Exit (signal or Friday)**

1. Cancel open trailing stop
2. `MARKET` close position
3. Log fill price, PnL, `exit_reason`

### Polling loop (between daily signals)

| Interval | Action |
|----------|--------|
| Every 60s | Position flat? → log closed trade if we had one |
| Every 60s | Trail order still open? → re-place if missing |
| Daily 00:10 UTC | Closed 1D candle → run `signals.evaluate()` |

> Evaluate signals only on **closed** daily candles (not the forming bar).

---

## 6. CLI interface (`runner.py`)

```powershell
cd C:\Users\alexa\code\solinvest\trading-bot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy config\example.env .env

# M0 — no keys
python -m stochrsi_bot.runner --dry-run

# M1 — testnet paper
python -m stochrsi_bot.runner --testnet --once
python -m stochrsi_bot.runner --testnet --loop

# M2 — mainnet, confirm gate
python -m stochrsi_bot.runner --confirm

# Utilities
python -m stochrsi_bot.runner --status
python -m stochrsi_bot.runner --flat
```

| Flag | Meaning |
|------|---------|
| `--dry-run` | Signals + log only |
| `--testnet` | Use testnet base URL + keys |
| `--once` | Single evaluation then exit |
| `--loop` | Poll + daily scheduler |
| `--confirm` | Notify but don’t order until approved |
| `--mode long_only\|both` | Override YAML |

---

## 7. State & persistence

```sql
CREATE TABLE trades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  side TEXT NOT NULL,           -- long | short
  entry_time TEXT,
  exit_time TEXT,
  entry_price REAL,
  exit_price REAL,
  qty REAL,
  pnl_usdt REAL,
  exit_reason TEXT,
  equity_before REAL,
  mode TEXT                     -- testnet | mainnet
);

CREATE TABLE bot_state (
  key TEXT PRIMARY KEY,
  value TEXT
);
-- keys: last_candle_ts, open_side, entry_price, trail_order_id
```

Export weekly: `logs/trades-YYYY-MM-DD.csv` for comparison with `scripts/stochrsi_1y_trade_log.py`.

---

## 8. Risk module

| Guard | Default | Action |
|-------|---------|--------|
| `min_equity_usdt` | 50 | Stop bot |
| `max_drawdown_pct` | 40 | Halt new entries |
| `max_daily_loss_pct` | 15 | Halt until next UTC day |
| `kill_switch_file` | `STOP` | If file exists, no new trades |
| Single position | — | Reject entry if already in position |
| API permissions | — | Futures only; no withdrawals |

**Live recommendation:** Start with `compound: false` and fixed **€100–200** notional until 30 paper days pass; then enable compound.

---

## 9. Development phases (detailed)

### M0 — Signal parity (1–2 days)

| Task | Owner | Done |
|------|-------|------|
| `indicators.py` matches `scripts/stochrsi_backtest.py` | | [ ] |
| `signals.py` long + short | | [ ] |
| `config/default.yaml` + `example.env` | | [ ] |
| `runner --dry-run` output | | [ ] |
| Unit tests vs 50-bar fixture | | [ ] |

**Acceptance:** Last 2y entry dates match `stochrsi_long_short.py` for `long_only` and `both`.

### M1 — Paper / testnet (3–5 days)

| Task | Done |
|------|------|
| `binance_client.py` testnet URL toggle | [ ] |
| Market entry + trailing stop both sides | [ ] |
| Position sync + trade logging | [ ] |
| Console log + optional Telegram | [ ] |
| Compare 30d signals to dry-run | [ ] |

**Acceptance:** 30 days testnet without missed stops or naked positions.

### M2 — Semi-auto mainnet (2–3 days)

| Task | Done |
|------|------|
| `--confirm` + Telegram YES/NO | [ ] |
| `status`, `flat`, `attach-trail` commands | [ ] |
| BNB fee discount reminder in startup check | [ ] |

**Acceptance:** 1 week operator-in-the-loop on minimum size.

### M3 — Full automation (3–5 days)

| Task | Done |
|------|------|
| `auto_execute: true` in config | [ ] |
| Windows Task Scheduler / VPS systemd | [ ] |
| Friday 20:00 UTC job | [ ] |
| Restart recovery (reconcile DB ↔ exchange) | [ ] |
| Funding rate log | [ ] |

**Acceptance:** 2 weeks unattended on small size with zero naked positions.

### M4 — Hardening (ongoing)

| Task | Done |
|------|------|
| Fill vs trail slippage report | [ ] |
| Replay live fills through `stochrsi_stop_fill_analysis.py` | [ ] |
| Optional FastAPI status page | [ ] |
| TradingView webhook (optional) | [ ] |

---

## 10. Testing

```powershell
cd C:\Users\alexa\code\solinvest
python -m pytest trading-bot/tests/
python scripts/stochrsi_live_check.py
python scripts/stochrsi_1y_trade_log.py
```

| Layer | What |
|-------|------|
| Unit | StochRSI values, cross detectors, Friday rule |
| Integration | Mock Binance: entry → trail → fill sequence |
| Regression | 1y trade list vs `stochrsi_long_short.py` |
| Paper | Testnet 30d shadow vs dry-run |

---

## 11. Deployment

### Windows (local)

- Task Scheduler: **00:10 UTC** daily + **Fri 20:00 UTC**
- Or `runner --loop` in background terminal

### VPS (optional)

- Docker + `systemd` restart on failure
- IP whitelist on API key

### Do not use

- GitHub Actions for order placement (latency, secret exposure)

---

## 12. Open decisions

| # | Question | Recommendation |
|---|----------|----------------|
| 1 | `long_only` or `both` for v1 paper? | **`long_only` first**, enable `both` after 30d |
| 2 | Trail 1% or 2%? | **2%** main; paper-test 1% in parallel log |
| 3 | Compound on testnet? | **Yes** (matches backtest) |
| 4 | Compound on first mainnet? | **No** — fixed stake 30d |
| 5 | Stoch 75/25 exit orders? | **Low priority** — trail handles ~100% |

---

## 13. Sprint 1 — file checklist

Create in order:

1. [ ] `trading-bot/requirements.txt`
2. [ ] `trading-bot/config/default.yaml`
3. [ ] `trading-bot/config/example.env`
4. [ ] `trading-bot/src/stochrsi_bot/indicators.py`
5. [ ] `trading-bot/src/stochrsi_bot/signals.py`
6. [ ] `trading-bot/src/stochrsi_bot/config.py`
7. [ ] `trading-bot/src/stochrsi_bot/engine/runner.py` (`--dry-run`)
8. [ ] `trading-bot/tests/test_signals.py`
9. [ ] `trading-bot/src/stochrsi_bot/exchange/binance_client.py` (M1)
10. [ ] Update `trading-bot/README.md` with run commands

**Estimate:** M0–M1 ≈ **1–2 weeks** part-time; M3 live ≈ **+2 weeks** after paper validation.

---

## 14. Related files

| Path | Purpose |
|------|---------|
| [strategy-summary.md](./strategy-summary.md) | Research + backtest summary |
| [README.md](./README.md) | Quick index |
| `../scripts/stochrsi_backtest.py` | Core indicator + engine |
| `../scripts/stochrsi_long_short.py` | Long/short backtest |
| `../scripts/stochrsi_1y_trade_log.py` | 1y trade-by-trade log |
| `../scripts/stochrsi_live_check.py` | Current signal snapshot |

---

*Not financial advice. Leveraged trading can result in total loss of capital.*
