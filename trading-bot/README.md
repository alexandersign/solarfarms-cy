# BTC StochRSI Trading Bot

Research and implementation docs for a **daily StochRSI 25/75** strategy on **Binance BTCUSDT perpetual futures**.

## Documents

| File | Description |
|------|-------------|
| [expected-performance.md](./expected-performance.md) | **Expected bot performance** — backtest tables, live haircuts, risk, rollout |
| [expected-performance.html](./expected-performance.html) | HTML report (open in browser / print to PDF) |
| [strategy-summary.md](./strategy-summary.md) | Full chat summary: rules, backtests, fees, setup, lessons |
| [development-plan.md](./development-plan.md) | Bot architecture, phases, API workflow, deployment |

## Backtest code (existing)

Python scripts live in `../scripts/`:

```powershell
cd C:\Users\alexa\code\solinvest
python scripts/stochrsi_live_check.py      # current signal
python scripts/stochrsi_leveraged.py       # leveraged sim
python scripts/stochrsi_timeframe_sweep.py # timeframe comparison
```

## Config

- `config/default.yaml` — strategy parameters
- `config/example.env` — API keys template (testnet first)

## Paper trading (start here)

**[PAPER-TRADING-SETUP.md](./PAPER-TRADING-SETUP.md)** — step-by-step testnet guide.

Quick start:

```powershell
cd trading-bot
.\run.ps1 dry-run          # no API keys
.\run.ps1 testnet          # after .env configured
```

## Status

**M0 + M1 implemented** — dry-run and testnet paper in `src/stochrsi_bot/`. See [development-plan.md](./development-plan.md).

## Disclaimer

Not financial advice. Leveraged crypto trading carries substantial risk of total loss.
