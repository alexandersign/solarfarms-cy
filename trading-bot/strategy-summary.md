# StochRSI BTC Daily Strategy — Chat Summary

> **Disclaimer:** Research and backtesting only. Not financial advice. Leveraged trading can result in total loss of capital.

**Last updated:** May 2026  
**Asset:** BTCUSDT Perpetual (Binance USDⓈ-M Futures)  
**Existing backtest code:** `scripts/stochrsi_*.py`  
**Expected bot performance (summary doc):** [expected-performance.md](./expected-performance.md)

---

## 1. Finalized strategy rules

| Parameter | Value |
|-----------|--------|
| Exchange | Binance USDⓈ-M Futures |
| Symbol | BTCUSDT Perpetual |
| Timeframe | **Daily (1D)** — candles close 00:00 UTC |
| Indicator | **Stochastic RSI (14, 14, 3, 3)** on close |
| Overbought filter | K was **≥ 75** within last **30** daily bars |
| **Entry** | K crosses **DOWN through 25** |
| **Exit A** | Trailing stop (**2%** default; **1%** tested) |
| **Exit B** | K crosses **UP through 75** (rarely triggers before trail) |
| Leverage | **10×**, isolated margin, one-way mode |
| Sizing | Full compound reinvest (100% of equity as margin) |
| Fees (modeled) | **0.05%** taker per side on notional (VIP 0) |

### Optional rules (backtested)

| Rule | Verdict |
|------|---------|
| **Friday:** close only if **losing** (price < entry) | Same as trail-only in most windows; insurance only |
| **Friday:** always flat | **Avoid** — forced weekend exits hurt returns |
| **Fri–Sun:** tighten trail to **1%** if in profit | Slightly better in some 3y/5y sims |
| **≥ 5 bars since K hit 75** before entry | Higher win rate, lower DD, fewer trades |
| **News API filter** | Skipped (user decision) |

### Rejected variants

- Cross **up** @25 after K<20 (custom mid-cycle rules)
- **80 → <20 → enter @25** (underperforms baseline)
- **No bearish K/D cross** since overbought (filters out winners)
- **1H / 4H** timeframes at 10× (large losses)
- Always flat Friday

---

## 2. Backtest results (high level)

All leveraged sims use **€/USD 10,000 or 1,000 start**, **10× compound**, **0.05% fee/side** unless noted.

### Timeframe comparison (1y, 2% trail)

| TF | ~Trades | 10× compound (1y) | Verdict |
|----|---------|-------------------|---------|
| **1D** | 15 | **+883%** (€10k → €9.8k from €1k scale) | **Use this** |
| 12H | 34 | −31% | Poor |
| 4H | 83 | −95% | Avoid |
| 1H | 296 | −99% | Avoid |

### Level tweaks (daily, 2% trail, 3y)

- **25/75 baseline:** €185k from €1k (+18,441%)
- **24/76:** higher on 3y, **worse on 1y** — overfit risk
- **20/80:** much worse
- With **2% trail**, **exit level (73/75/78) barely matters** — ~100% of exits are trail stops

### Safeguards (daily, 2% trail, 3y)

| Filter | vs baseline |
|--------|-------------|
| No K/D bearish cross since OB | **−97%** final equity |
| K > D at entry | ~1 trade / 3y |
| **≥ 5 bars since overbought** | +4,917% vs +18,441% — smoother, fewer trades |

### Recent windows (€10,000 start, 2% trail)

| Period | Final € | Return | Trades | Win% | Max DD |
|--------|---------|--------|--------|------|--------|
| **6 months** (Nov 2025 – May 2026) | €33,709 | +237% | 6 | 100% | 0%* |
| **2 years** (May 2024 – May 2026) | €272,840 | +2,628% | 34 | 73.5% | 26% |

\*Unusually clean window; not representative long-term.

### 1% vs 2% trail (2 years, €10k)

| Trail | Final € | Return | Win% | Max DD |
|-------|---------|--------|------|--------|
| **1%** | €4,796,234 | +47,862% | 94.1% | 2.8% |
| **2%** | €272,840 | +2,628% | 73.5% | 26% |

Same 34 entries; tighter trail wins in sim but is **more slippage-sensitive** live.

### Longer horizon warnings

- **3y** compound @10× from €1k: ~€584k (not blown)
- **6y** compound @10×: **blown to €0** (Jun 2022, −10% gap at 10×)
- **20×** compound: blown quickly

---

## 3. Fees, VIP, and realism

### Modeled in backtests

- **0.05%** taker per side on notional (Binance VIP 0)
- ~**1% of equity** fee drag per round trip at 10×

### Not modeled

- **Funding** (8h; often +0.01–0.03%/day on longs)
- **BNB 10% fee discount** (~0.045%/side) — enable in live setup
- **Slippage** beyond trail price
- **VIP tiers** — VIP 1 taker still 0.05%; meaningful taker savings from VIP 2+ (~$10M/mo volume or ~25 BNB)

### Stop fills (Feb 2023 – May 2026 analysis)

- Overnight **gap through stop** on daily BTC: **essentially zero**
- If filled at bar **low** vs ideal trail: **median ~−2.9%** extra slippage (~**−29% on margin** at 10× vs −20% for clean 2% trail)
- Risk is **worse fill**, not “order never executes”

---

## 4. Live setup (semi-automatic)

### Binance one-time

1. Enable USDⓈ-M Futures, transfer USDT
2. **Isolated** margin, **one-way**, **10×** on BTCUSDT
3. Enable **pay fees with BNB** (~10% discount)
4. API key (if bot): futures only, no withdrawals, IP whitelist

### Per trade

1. **Entry alert:** daily K cross down @25 after K was ≥75 (TradingView or `python scripts/stochrsi_live_check.py`)
2. **Open long** at full isolated margin
3. Attach **TRAILING_STOP_MARKET** immediately (**callback 2.0** or **1.0**)
4. **Stoch 75 alert:** cancel trail, market close (optional — trail usually fires first)
5. **Friday ~20:00 UTC:** close only if price < entry

### Current signal (last check, May 2026)

- Open signal since **15 May 2026** @ ~$79,113
- K near 0; bearish K/D cross since 11 May OB bar

---

## 5. Public / verified accounts (web search)

**No verified live account found** for this exact system (daily StochRSI 25/75, BTC, 10× compound).

| Source | What it is | Levels |
|--------|------------|--------|
| [Flex EA RSI 25-75](https://www.myfxbook.com/members/flexea/flex-ea-rsi-25-75/9613375) | **Plain RSI**, forex **demo** | 25/75 |
| [Boring Edge BTC StochRSI](https://boringedge.com/bitcoin-stochastic-rsi-strategy-backtest/) | Spot backtest | 20/80 |
| TradingView / GitHub bots | Various; mostly 20/80 or 30/70 | Not audited |

---

## 6. Key scripts

| Script | Purpose |
|--------|---------|
| `scripts/stochrsi_backtest.py` | Core StochRSI + spot backtest engine |
| `scripts/stochrsi_leveraged.py` | 10× + trailing stop simulation |
| `scripts/stochrsi_live_check.py` | Current daily signal + funding |
| `scripts/stochrsi_monthly_3y.py` | 3y compound breakdown |
| `scripts/stochrsi_timeframe_sweep.py` | 1h–1w comparison |
| `scripts/stochrsi_levels_grid.py` | Entry/exit level grid |
| `scripts/stochrsi_safeguards.py` | K/D and MA filters |
| `scripts/stochrsi_80_20_25.py` | 80 → <20 → 25 variant |
| `scripts/stochrsi_stop_fill_analysis.py` | Slippage / gap analysis |

### Quick commands

```powershell
cd C:\Users\alexa\code\solinvest
python scripts/stochrsi_live_check.py
python scripts/stochrsi_leveraged.py
python scripts/stochrsi_timeframe_sweep.py
```

---

## 7. Lessons learned

1. **Daily only** — lower timeframes fail at 10× with these rules.
2. **2% trail dominates exits** — tuning sell level (73/75/78) doesn’t matter much until trail is widened.
3. **Compound @10× is path-dependent** — spectacular in some windows, **total loss** in others (6y sim).
4. **1% trail** backtests better on recent 2y but is **fragile live** due to slippage.
5. **Chart intuition** (no K/D cross) **conflicts with data** — pullbacks normally cross K below D.
6. **Paper trade or small size** before full compound live.

---

## 8. Recommended live configuration (conservative)

```
Timeframe:     1D
Entry:         K cross DOWN @25 after K >= 75 in last 30 bars
Optional:      Wait >= 5 bars since K last touched 75
Exit:          2% trailing stop (start here; test 1% on paper)
Leverage:      10× isolated
Friday:        Close only if losing
Fees:          BNB discount ON
```
