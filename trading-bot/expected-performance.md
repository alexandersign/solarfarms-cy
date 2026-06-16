# Expected Bot Performance — StochRSI BTC Daily Bot

> **Disclaimer:** Research and backtesting only. Not financial advice. Leveraged crypto futures can result in **total loss of capital**. Past simulated results do not guarantee future performance.

**Last updated:** May 2026  
**HTML version:** [expected-performance.html](./expected-performance.html)  
**Bot config:** `config/default.yaml` (default: **long only**, 10×, 2% trail, compound)  
**Backtest scripts:** `../scripts/stochrsi_leveraged.py`, `../scripts/stochrsi_long_short.py`

---

## 1. Executive summary

The bot implements a **daily (1D) StochRSI** mean-reversion system on **Binance BTCUSDT perpetual futures**: enter after overbought exhaustion, exit primarily via a **2% trailing stop** at **10× isolated leverage** with optional full compound reinvest.

| What backtests suggest | What to expect live |
|------------------------|---------------------|
| Strong compound growth in **favourable** multi-year windows | **Lower** returns after funding, slippage, and execution lag |
| **~15 long trades/year** (long-only mode) | Similar signal count; not every day has a trade |
| **2–6 trades in 3 months** is normal in quiet regimes | Lumpy PnL — months with zero closed trades happen |
| Long + short (`mode: both`) can **~2×** endpoint vs long-only in some windows | Higher complexity, more shorts in chop; validate on paper first |

**Recommended rollout:** testnet paper → fixed small notional → compound only after 30+ days of fill/signal parity with backtest.

---

## 2. Strategy the bot runs

| Parameter | Default | Notes |
|-----------|---------|--------|
| Symbol | BTCUSDT | USDⓈ-M perpetual |
| Timeframe | **1D** | Signal on **closed** daily candle (00:00 UTC) |
| Indicator | StochRSI **(14, 14, 3, 3)** | On close |
| Long entry | K was **≥ 75** in last **30** bars → K crosses **down** through **25** | One position at a time |
| Long exit | **2% trailing stop** (primary) or K cross **up** through **75** | ~100% of sim exits are trail |
| Short (optional) | Mirror: ≤25 → cross **up** @75; trail 2% above trough; exit @25 | `mode: both` in config |
| Leverage | **10×** | Isolated, one-way |
| Sizing | **Compound** (`compound: true`) | 100% equity as margin each trade |
| Fees (modeled) | **0.05%** taker/side | BNB discount not modeled |
| Friday rule | Close **only if losing** @ 20:00 UTC | Optional insurance |

Full rule history and rejected variants: [strategy-summary.md](./strategy-summary.md).

---

## 3. Historical backtest results (simulated)

**Assumptions:** €1,000 start, **10× leverage**, **2% trail**, **0.05% fee/side**, full compound, daily BTCUSDT from Binance public klines. Periods end **~22 May 2026**.

### 3.1 Compound returns by window

| Window | Long only — final | Return | Trades | Win% | Max DD | Long + short — final | Return | Trades | Win% | Max DD |
|--------|-------------------|--------|--------|------|--------|----------------------|--------|--------|------|--------|
| **3 months** | €1,189 | **+19%** | 2 | 100% | 0% | €1,675 | **+68%** | 6 | 83% | 3.6% |
| **6 months** | €2,269 | **+127%** | 7 | 71% | 13% | €4,869 | **+387%** | 15 | 73% | 14% |
| **1 year** | €10,834 | **+983%** | 15 | 80% | 11.5% | €20,514 | **+1,951%** | 29 | 69% | 24.6% |
| **2 years** | €27,284 | **+2,628%** | 34 | 73.5% | 26% | €241,738 | **+24,074%** | 64 | 65.6% | 31.6% |
| **3 years** | €584,122 | **+58,312%** | 52 | 73.1% | 26% | €20.0M* | **+2,000,475%** | 97 | 66% | 31.6% |

\*Long+short 3y figure is **extremely path-dependent** (compounding + short trades in 2022–2024 chop). Treat as an upper-bound sim, not a forecast.

**Scale reference (same % returns, different start):**

| Start capital | 1y long-only (~983%) | 1y long+short (~1,951%) |
|---------------|----------------------|---------------------------|
| €1,000 | ~€10,800 | ~€20,500 |
| €10,000 | ~€108,000 | ~€205,000 |

### 3.2 Trade frequency (long only)

| Window | Closed trades | Approx. trades/year |
|--------|---------------|---------------------|
| 3 months | 2 | ~8 (annualised from quiet window) |
| 1 year | 15 | **~15** |
| 2 years | 34 | **~17** |
| 3 years | 52 | **~17** |

The strategy is **low frequency** — often **weeks between entries**. Missing a month of trades is normal, not a bot failure.

### 3.3 Recent 3-month trade log (long only)

| # | Entry | Exit | BTC move | PnL (sim) | Equity after |
|---|-------|------|----------|-------------|--------------|
| 1 | 29 Apr 2026 | 30 Apr 2026 | $75,780 → $76,347 | +€70 | €1,070 |
| 2 | 15 May 2026 | 16 May 2026 | $79,113 → $80,031 | +€119 | **€1,189** |

Both exits: **trail_2pct** (no K@75 exit in this window).

---

## 4. Realistic live expectations (haircut view)

Backtests **omit** several live costs. Use the table below as a **planning range**, not promises.

| Factor | Backtest | Live impact |
|--------|----------|-------------|
| Funding (8h) | Not modeled | Often **−0.01% to −0.03%/day** on longs in bull regimes |
| Slippage on trail | Ideal stop price | Median **~−2.9%** worse than trail on daily low fills (~**−29% on margin** at 10× vs −20% clean) |
| BNB fee discount | 0.05%/side | **~10% lower fees** if enabled (~0.045%/side) |
| Signal timing | Perfect close | Bot runs after daily close — small entry drift possible |
| Compound | Full reinvest | One bad gap can wipe **months** of gains at 10× |

### 4.1 Indicative annual bands (long only, 10×, after haircut)

These are **subjective planning bands** derived from 1y/2y backtests minus ~30–50% for costs and execution — **not** a statistical forecast.

| Scenario | Approx. annual return (€1k start, compound) | Comment |
|----------|-----------------------------------------------|---------|
| **Quiet / ranging** | **0% to +50%** | Few entries (e.g. recent 3m: +19%) |
| **Base case** | **+100% to +400%** | Near 1y backtest order of magnitude, discounted |
| **Strong trend + clean trails** | **+500% to +1,000%+** | Possible in sim; requires favourable path |
| **Adverse gap / wrong side** | **−50% to −100%** | 10×: ~10% adverse move ≈ full equity loss |

### 4.2 Long + short (`mode: both`)

| | Long only | Long + short (typical ratio in sim) |
|--|-----------|-------------------------------------|
| 1y return (sim) | +983% | +1,951% (~**2.0×** endpoint) |
| 2y return (sim) | +2,628% | +24,074% (~**8.9×** endpoint) |
| Trade count | Lower | ~2× trades; more shorts in sideways markets |
| Max DD (1y) | 11.5% | 24.6% |

**Bot default remains `long_only`** until paper trading proves signal parity for shorts.

---

## 5. Risk profile

### 5.1 Drawdown (simulated, long only)

| Window | Max drawdown |
|--------|--------------|
| 1 year | 11.5% |
| 2 years | 26% |
| 3 years | 26% |

Long+short can reach **~25–32%** max DD in the same windows.

### 5.2 Tail risk (not shown in recent windows)

| Stress test | Result |
|-------------|--------|
| **6-year** compound @10× (long only) | Sim **blown to €0** (Jun 2022, gap beyond isolated margin) |
| **20×** leverage | Blown quickly in sim |
| **1H / 4H** at 10× with same rules | Large losses — **not supported** |

### 5.3 Built-in bot safeguards (`config/default.yaml`)

| Guard | Default |
|-------|---------|
| `min_equity_usdt` | 50 |
| `max_drawdown_pct` | 40 (kill / pause) |
| `max_daily_loss_pct` | 15 |
| `kill_switch_file` | `STOP` (create file to halt) |

---

## 6. Paper vs live validation targets

Before trusting compound sizing on mainnet, the bot should match backtest **logic** (not exact PnL):

| Check | Target |
|-------|--------|
| Entry dates | Match `stochrsi_long_short.py` ±0 bars on same klines |
| Exit reason | Almost always trailing stop in sim |
| Trade count (1y paper) | Long only: **~15** closed trades |
| 30-day paper | No unexplained entries; trail placed on every fill |

See [PAPER-TRADING-SETUP.md](./PAPER-TRADING-SETUP.md) and [development-plan.md](./development-plan.md) § M1–M4.

### Recommended live rollout

| Phase | Sizing | Goal |
|-------|--------|------|
| **Dry-run** | None | Signal log only (`.\run.ps1 dry-run`) |
| **Testnet** | Compound or fixed €100–200 notional | 30 days signal + order flow |
| **Mainnet v1** | **Fixed notional** (no compound) | Prove fills vs trail |
| **Mainnet v2** | Compound | Only after fill analytics (M4) |

---

## 7. What is *not* expected

- **Daily income** — trades are sparse; many days show `signal: none`.
- **Smooth equity curve** — compound makes returns **lumpy** and path-dependent.
- **Matching backtest € to the cent** — funding, slippage, and VIP tier change outcomes.
- **Verified third-party track record** — no audited public account found for this exact system (see [strategy-summary.md](./strategy-summary.md) §5).

---

## 8. Reproduce these numbers

```powershell
cd C:\Users\alexa\code\solinvest

# Current signal
python scripts/stochrsi_live_check.py

# Long-only leveraged sim (edit DAYS in script or use one-liner below)
python scripts/stochrsi_leveraged.py

# Long + short
python scripts/stochrsi_long_short.py
```

**3-month / multi-window snapshot** (€1k, 10×, 2% trail):

```powershell
python -c "
import sys; sys.path.insert(0,'scripts')
from datetime import datetime, timezone
import pandas as pd
from stochrsi_backtest import fetch_binance_klines
from stochrsi_leveraged import run_leveraged_backtest
from stochrsi_long_short import run
for days in [90, 180, 365, 730]:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days+60)).timestamp()*1000)
    df = fetch_binance_klines('1d', days+100, start_ms=start_ms)
    df = df[df.index >= df.index.max() - pd.Timedelta(days=days)]
    _, fl, ddl = run_leveraged_backtest(df, 2.0, start_eur=1000, leverage=10)
    _, fb, ddb = run(df, 'both', 2.0, 1000)
    print(days, 'd | long', round(fl), round((fl/1000-1)*100), '% | both', round(fb), round((fb/1000-1)*100), '%')
"
```

---

## 9. Related documents

| Document | Purpose |
|----------|---------|
| [strategy-summary.md](./strategy-summary.md) | Full research, fees, slippage analysis, lessons |
| [development-plan.md](./development-plan.md) | Bot phases, architecture, API workflow |
| [PAPER-TRADING-SETUP.md](./PAPER-TRADING-SETUP.md) | Testnet setup checklist |
| [README.md](./README.md) | Quick start |

---

*Figures in §3 were generated from Binance public daily klines as of May 2026. Re-run scripts after new candles close to refresh.*
