#!/usr/bin/env python3
"""UHE Ukraine — skid-block sizing (T4 / T8 only, 2h, 2 PCS per container)."""
from __future__ import annotations

import math

CONTAINER_MWH = 5.015
CONTAINER_MW_2H = 2.5  # 1C on ME 5.015 datasheet
PCS_MW = 1.25
PCS_PER_CONTAINER = 2

# Standard 2-hour blocks — 2 x BCS1250K wired per ME 5.015 container
T4 = dict(
    name="T4",
    bess=2,
    pcs=4,
    mw=4 * PCS_MW,  # 5.0 MW
    mwh=2 * CONTAINER_MWH,  # 10.03 MWh
)
T8 = dict(
    name="T8",
    bess=4,
    pcs=8,
    mw=8 * PCS_MW,  # 10.0 MW
    mwh=4 * CONTAINER_MWH,  # 20.06 MWh
)

SITES = [
    ("PSP", 46, 92),
    ("HPP-1", 66, 132),
    ("HPP-2", 60, 120),
    ("HPP-3", 25, 50),
]

WARRANTY = {"y5": 0.85, "y10": 0.7958, "y15": 0.70}


def pack_site(req_mw: float, req_mwh: float) -> dict:
    """Minimise skids; use T8 then T4; size up to nearest valid block combination."""
    best = None
    max_t8 = math.ceil(req_mw / T8["mw"]) + math.ceil(req_mwh / T8["mwh"]) + 1
    for n8 in range(max_t8 + 1):
        for n4 in range(max_t8 * 2 + 2):
            mw = n8 * T8["mw"] + n4 * T4["mw"]
            mwh = n8 * T8["mwh"] + n4 * T4["mwh"]
            if mw < req_mw or mwh < req_mwh:
                continue
            skids = n8 + n4
            overshoot = (mw - req_mw) + (mwh - req_mwh)
            key = (skids, overshoot, mw + mwh)
            cand = (key, n8, n4, mw, mwh)
            if best is None or cand[0] < best[0]:
                best = cand
    if best is None:
        raise ValueError(f"No pack for {req_mw}/{req_mwh}")
    _, n8, n4, mw, mwh = best
    blocks = [f"{n8}xT8"] if n8 else []
    if n4:
        blocks.append(f"{n4}xT4")
    return dict(
        t8=n8,
        t4=n4,
        skids=n8 + n4,
        blocks_str=" + ".join(blocks),
        containers=n8 * T8["bess"] + n4 * T4["bess"],
        pcs=n8 * T8["pcs"] + n4 * T4["pcs"],
        mw=mw,
        mwh=mwh,
        mw_headroom_pct=round((mw / req_mw - 1) * 100, 1),
        mwh_headroom_pct=round((mwh / req_mwh - 1) * 100, 1),
    )


def block_detail(n8: int, n4: int) -> list[str]:
    lines = []
    for i in range(n8):
        lines.append(
            f"    T8-{i + 1}: 4 BESS + 1 T8 skid (8x BCS1250K) = 10.0 MW / 20.06 MWh"
        )
    for i in range(n4):
        lines.append(
            f"    T4-{i + 1}: 2 BESS + 1 T4 skid (4x BCS1250K) = 5.0 MW / 10.03 MWh"
        )
    return lines


def main() -> None:
    print("=" * 72)
    print("UHE UKRAINE — T4 / T8 SKID-BLOCK SIZING (2h, 2 PCS per container)")
    print("=" * 72)
    print("\nBlock definitions:")
    print(f"  T4: 2 x ME 5.015 + T4 skid (4 x BCS1250K) = {T4['mw']} MW / {T4['mwh']:.2f} MWh")
    print(f"  T8: 4 x ME 5.015 + T8 skid (8 x BCS1250K) = {T8['mw']} MW / {T8['mwh']:.2f} MWh")
    print(f"  Wiring: 2 x BCS1250K (2.5 MW) per container @ 1C / 2-hour discharge\n")

    totals = dict(req_mw=0, req_mwh=0, mw=0, mwh=0, containers=0, pcs=0, skids=0, t8=0, t4=0)
    site_results = []

    for name, req_mw, req_mwh in SITES:
        s = pack_site(req_mw, req_mwh)
        site_results.append((name, req_mw, req_mwh, s))
        totals["req_mw"] += req_mw
        totals["req_mwh"] += req_mwh
        totals["mw"] += s["mw"]
        totals["mwh"] += s["mwh"]
        totals["containers"] += s["containers"]
        totals["pcs"] += s["pcs"]
        totals["skids"] += s["skids"]
        totals["t8"] += s["t8"]
        totals["t4"] += s["t4"]

        print(f"{name} — contract {req_mw} MW / {req_mwh} MWh")
        print(f"  Pack: {s['blocks_str']}  ({s['skids']} skids)")
        print(f"  Installed: {s['mw']:.1f} MW (+{s['mw_headroom_pct']}%) / {s['mwh']:.1f} MWh (+{s['mwh_headroom_pct']}%)")
        print(f"  Totals: {s['containers']} containers, {s['pcs']} x BCS1250K")
        for line in block_detail(s["t8"], s["t4"]):
            print(line)
        print()

    print("=" * 72)
    print("PROGRAMME TOTAL")
    print(f"  Contract:  {totals['req_mw']} MW / {totals['req_mwh']} MWh")
    print(f"  Installed: {totals['mw']:.1f} MW (+{round((totals['mw']/totals['req_mw']-1)*100,1)}%) / "
          f"{totals['mwh']:.1f} MWh (+{round((totals['mwh']/totals['req_mwh']-1)*100,1)}%)")
    print(f"  {totals['t8']} x T8 + {totals['t4']} x T4 = {totals['skids']} skids")
    print(f"  {totals['containers']} x ME 5.015 containers")
    print(f"  {totals['pcs']} x BCS1250K (2 per container)")

    print("\nPer-site summary table:")
    print(f"{'Site':<8} {'Req MW':>7} {'Req MWh':>8} {'T8':>4} {'T4':>4} {'Inst MW':>8} {'Inst MWh':>9} {'BESS':>5}")
    print("-" * 72)
    for name, req_mw, req_mwh, s in site_results:
        print(
            f"{name:<8} {req_mw:>7} {req_mwh:>8} {s['t8']:>4} {s['t4']:>4} "
            f"{s['mw']:>8.1f} {s['mwh']:>9.1f} {s['containers']:>5}"
        )


if __name__ == "__main__":
    main()
