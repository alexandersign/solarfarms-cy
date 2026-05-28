# Paper Trading Setup — Step by Step

Run the StochRSI bot on **Binance Futures Testnet** (fake USDT, real API flow).

---

## Overview

| Step | What you do | Time |
|------|-------------|------|
| 1 | Install Python deps | 5 min |
| 2 | **Dry-run** (no API keys) | 2 min |
| 3 | Create **testnet** account + API keys | 10 min |
| 4 | Configure `.env` | 2 min |
| 5 | **Paper trade** (`--testnet --once`) | 5 min |
| 6 | Schedule daily runs | 10 min |

---

## Step 1 — Install dependencies

Open PowerShell:

```powershell
cd C:\Users\alexa\code\solinvest\trading-bot
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## Step 2 — Dry-run (no Binance account needed)

Verifies StochRSI signals against live daily candles (read-only public API).

```powershell
$env:PYTHONPATH = "src"
python -m stochrsi_bot.engine.runner --dry-run
```

**You should see:**
- Last closed daily bar date
- BTC close price
- StochRSI K and D values
- `enter_long`, `enter_short`, or `none`

Compare with:

```powershell
cd C:\Users\alexa\code\solinvest
python scripts/stochrsi_live_check.py
```

---

## Step 3 — Binance Futures Testnet account

1. Open **https://testnet.binancefuture.com** (not binance.com).
2. Log in with GitHub or email (separate from main Binance).
3. Get test USDT from the testnet faucet / wallet UI if balance is zero.
4. Go to **API Management** → **Create API**.
5. Settings:
   - Enable **Futures**
   - **Disable** withdrawals
   - Optional: IP whitelist (your home IP)
6. Copy **API Key** and **Secret** — secret shown once only.

> Never use mainnet keys for testing. Never commit keys to git.

---

## Step 4 — Configure environment

```powershell
cd C:\Users\alexa\code\solinvest\trading-bot
copy config\example.env .env
notepad .env
```

Edit `.env`:

```env
BINANCE_TESTNET=true
BINANCE_API_KEY=paste_your_testnet_key
BINANCE_API_SECRET=paste_your_testnet_secret
BOT_ENABLED=true
BOT_MODE=long_only
```

| Setting | Recommendation for first run |
|---------|-------------------------------|
| `BOT_MODE` | `long_only` (simpler) |
| `BOT_MODE=both` | Adds short trades after you're comfortable |

Strategy params live in `config/default.yaml` (trail 2%, leverage 10, etc.).

---

## Step 5 — First paper trade run

```powershell
cd C:\Users\alexa\code\solinvest\trading-bot
.\.venv\Scripts\Activate.ps1
$env:PYTHONPATH = "src"
python -m stochrsi_bot.engine.runner --testnet --once
```

**What the bot does:**

1. Loads config + `.env`
2. Fetches last **closed** daily candle
3. Computes StochRSI(14,14,3,3)
4. If **flat** and entry signal → MARKET open + **TRAILING_STOP_MARKET** 2%
5. If **in position** → checks Friday rule, stoch exit, trail order exists
6. Logs to console; saves state in `data/state.db`

**If no entry signal:** output shows `none` — normal most days.

**If entry signal:** check testnet UI → Positions → BTCUSDT → should see long + trailing stop.

---

## Step 6 — Schedule daily runs (Windows)

Run **once per day after the daily candle closes** (~00:10 UTC).

### Task Scheduler

1. Open **Task Scheduler** → Create Task
2. Trigger: Daily, **00:10 UTC** (adjust for your timezone)
3. Action:
   - Program: `powershell.exe`
   - Arguments:
   ```
   -NoProfile -ExecutionPolicy Bypass -Command "cd C:\Users\alexa\code\solinvest\trading-bot; .\.venv\Scripts\Activate.ps1; $env:PYTHONPATH='src'; python -m stochrsi_bot.engine.runner --testnet --once"
   ```
4. Optional second task: **Friday 20:00 UTC** (same command — Friday logic is inside the bot)

### Manual check anytime

```powershell
$env:PYTHONPATH = "src"
python -m stochrsi_bot.engine.runner --dry-run
python -m stochrsi_bot.engine.runner --testnet --once
```

---

## Safety controls

| Control | How |
|---------|-----|
| **Kill switch** | Create file `trading-bot/STOP` → bot exits without trading |
| **Dry-run only** | Use `--dry-run` only |
| **Testnet only** | Only pass `--testnet` in v0.1 (no mainnet flag) |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ModuleNotFoundError: stochrsi_bot` | Set `$env:PYTHONPATH = "src"` from `trading-bot` folder |
| `API keys` error | Check `.env` exists in `trading-bot/` not repo root |
| `-2015 Invalid API-key` | Keys from **testnet** site, not mainnet |
| `Margin type` error | Ignore if already ISOLATED; bot continues |
| No entry for weeks | Normal — strategy waits for K cross down @25 after OB |
| Position without stop | Re-run `--testnet --once` — bot re-places trail |

---

## What to validate over 30 days

- [ ] Dry-run entry dates match `scripts/stochrsi_long_short.py` backtest
- [ ] Every entry has a trailing stop on testnet within seconds
- [ ] No naked position at 10× without stop
- [ ] `data/state.db` logs trades
- [ ] Friday rule closes losers only (if enabled)

---

## Next phases (after paper works)

| Phase | Change |
|-------|--------|
| M2 | `--confirm` + Telegram before orders |
| M3 | Mainnet with small size |
| M4 | Fill analytics vs backtest |

See [development-plan.md](./development-plan.md).

---

*Not financial advice.*
