# BTC StochRSI Trading Bot

Binance USDⓈ-M **BTCUSDT daily** StochRSI(14,14,3,3) bot — long 25/75 + 2% trailing stop.

## Quick start

```powershell
cd trading-bot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
pip install -e .

copy config\example.env .env
# Edit .env with testnet keys when ready
```

### M0 — Dry run (no API keys)

```powershell
python -m stochrsi_bot --dry-run
```

### M1 — Testnet paper trade

```powershell
python -m stochrsi_bot --testnet --once --confirm
python -m stochrsi_bot --testnet --once --execute
python -m stochrsi_bot --testnet --loop --execute
```

### Utilities

```powershell
python -m stochrsi_bot --status --testnet
python -m stochrsi_bot --flat --testnet
python -m stochrsi_bot --dry-run --mode both
```

## Tests

```powershell
cd trading-bot
pip install -e ".[dev]"
pytest tests/ -v
```

Signal parity tests compare entry dates against `../scripts/stochrsi_long_short.py` (requires network).

## Layout

```
trading-bot/
├── config/default.yaml
├── src/stochrsi_bot/
│   ├── indicators.py      # StochRSI (shared logic with scripts/)
│   ├── signals.py           # Entry/exit + simulation
│   ├── config.py
│   ├── exchange/            # Binance testnet/mainnet
│   ├── engine/runner.py     # CLI
│   ├── risk/
│   └── notify/
├── tests/
└── logs/                    # gitignored (SQLite state)
```

## Status

**M0 + M1 scaffold complete** — dry-run CLI, signal simulation, testnet order flow, tests passing.

| Phase | Status |
|-------|--------|
| M0 dry-run | Done |
| M1 testnet orders | Done (needs `.env` keys) |
| M2 semi-auto mainnet | Not started |

## Disclaimer

Not financial advice. Leveraged crypto trading carries substantial risk of total loss.
