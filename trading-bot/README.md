# BTC StochRSI Trading Bot

Research and implementation docs for a **daily StochRSI 25/75** strategy on **Binance BTCUSDT perpetual futures**.

## Documents

| File | Description |
|------|-------------|
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

## Status

**Planning / backtest only** — no live bot code in this folder yet. See [development-plan.md](./development-plan.md) for M0–M4 roadmap.

## Disclaimer

Not financial advice. Leveraged crypto trading carries substantial risk of total loss.
