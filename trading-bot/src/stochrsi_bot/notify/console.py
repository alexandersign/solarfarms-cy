"""Console notifications."""

from __future__ import annotations

from stochrsi_bot.signals import Action, SignalEvent


def log(msg: str) -> None:
    print(msg, flush=True)


def log_signal(event: SignalEvent) -> None:
    if event.action == Action.NONE:
        return
    log(
        f"SIGNAL {event.action.value.upper()} | {event.reason} | "
        f"{event.bar_time} | ${event.price:,.2f} | K={event.k:.1f} D={event.d:.1f}"
    )


def log_snapshot(snap: dict) -> None:
    log("=" * 60)
    log(f"BTCUSDT {snap['bar_time']} (closed bar)")
    log(f"  Price: ${snap['price']:,.0f}")
    log(f"  StochRSI K: {snap['k']:.1f}  D: {snap['d']:.1f}")
    log(f"  Max K lookback: {snap['max_k_lookback']:.1f}")
    if snap["position"]:
        ep = snap["entry_price"]
        up = (snap["price"] / ep - 1) * 100 if snap["position"] == "long" else (ep / snap["price"] - 1) * 100
        log(f"  Position: {snap['position'].upper()} since {snap['entry_time']} @ ${ep:,.0f} ({up:+.1f}%)")
    else:
        log("  Position: FLAT")
    sig = snap["signal"]
    if sig.action.value != "none":
        log(f"  Signal: {sig.action.value} ({sig.reason})")
    else:
        log("  Signal: none")
    log("=" * 60)
