"""
Galascope BESS Network Model — pandapower Rev F
Lighthief Cyprus Ltd  |  May 2026

Rev F — G1 parallel PV transformers on one SwS feeder (JZ2), BESS on JZ3:
  EAC Grid → UniSec 22 kV bus
    ├── JZ2 combined PV: 2× 1250 kVA @ 22/0.8 kV Dyn11 Uk6% (parallel, same bus)
    └── JZ3 BESS: MV cable → skid RMU → BESS TX → 690 V

G2: same BESS branch as Rev E; PV modelled as 1× 1250 kVA (per MCTS EL00.01.02).

Outputs JSON for galascope-sld-revF.py.
"""

import copy
import io
import json
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

import pandapower as pp
import pandapower.shortcircuit as sc

from pathlib import Path
OUTPUT_JSON = str(
    Path(__file__).resolve().parent.parent / "analysis" / "galascope-pandapower-revF-results.json"
)

SEPARATOR = "=" * 70


def _bess_branch(net, b_sws, tag, cable_len_km, cable_r, cable_x, cable_i, sn_mva):
    b_skid = pp.create_bus(net, vn_kv=22.0, name=f"{tag} T-skid RMU 22 kV")
    b_lv = pp.create_bus(net, vn_kv=0.690, name=f"{tag} BESS LV 690 V")
    pp.create_line_from_parameters(
        net,
        from_bus=b_sws,
        to_bus=b_skid,
        length_km=cable_len_km,
        r_ohm_per_km=cable_r,
        x_ohm_per_km=cable_x,
        c_nf_per_km=280.0,
        max_i_ka=cable_i,
        name=f"{tag} MV SwS JZ3→skid",
        parallel=3,
    )
    pp.create_transformer_from_parameters(
        net,
        hv_bus=b_skid,
        lv_bus=b_lv,
        sn_mva=sn_mva,
        vn_hv_kv=22.0,
        vn_lv_kv=0.690,
        vk_percent=6.0,
        vkr_percent=1.0 if sn_mva <= 3 else 0.8,
        pfe_kw=5.0 if sn_mva <= 3 else 7.0,
        i0_percent=0.5 if sn_mva <= 3 else 0.4,
        vector_group="Dyn11",
        name=f"{tag} BESS TX {sn_mva:.0f} MVA",
    )
    return b_skid, b_lv


def create_galascope_1_revF():
    """G1: 5 MW — 2× parallel 1250 kVA PV + BESS on freed JZ3"""
    net = pp.create_empty_network(name="Galascope 1 Rev F — 5 MW / 20 MWh")

    b_sws = pp.create_bus(net, vn_kv=22.0, name="UniSec SwS 22 kV")
    b_pv = pp.create_bus(net, vn_kv=22.0, name="JZ2 combined PV MV (tee)")

    pp.create_ext_grid(
        net,
        bus=b_sws,
        vm_pu=1.0,
        s_sc_max_mva=250.0,
        rx_max=0.1,
        s_sc_min_mva=150.0,
        rx_min=0.1,
        name="EAC 22 kV",
    )

    # Combined feeder SwS → outdoor tee (upgrade cable — 120 mm² Cu class)
    pp.create_line_from_parameters(
        net,
        from_bus=b_sws,
        to_bus=b_pv,
        length_km=0.080,
        r_ohm_per_km=0.153,
        x_ohm_per_km=0.097,
        c_nf_per_km=300.0,
        max_i_ka=0.350,
        name="JZ2 combined PV 3×(1×120) Cu 80m",
        parallel=3,
    )

    for i in (1, 2):
        pp.create_transformer_from_parameters(
            net,
            hv_bus=b_pv,
            lv_bus=pp.create_bus(net, vn_kv=0.8, name=f"PV MCTS-{i} LV 800V"),
            sn_mva=1.25,
            vn_hv_kv=22.0,
            vn_lv_kv=0.8,
            vk_percent=6.0,
            vkr_percent=1.2,
            pfe_kw=9.5,
            i0_percent=0.4,
            vector_group="Dyn11",
            name=f"PV Trafo {i} 1250kVA Lami/GALA",
        )
        pp.create_load(
            net,
            bus=net.bus.index[-1],
            p_mw=2.5,
            q_mvar=0.0,
            name=f"PV equivalent load MCTS-{i} 2.5MW",
        )

    b_skid, b_lv = _bess_branch(net, b_sws, "G1", 0.025, 0.153, 0.097, 0.350, 5.0)
    for i in range(1, 5):
        pp.create_sgen(
            net, bus=b_lv, p_mw=1.25, q_mvar=0.0, sn_mva=1.25,
            name=f"PCS-{i} BCS1250K",
        )

    return net, b_sws, b_pv, b_skid, b_lv


def create_galascope_2_revF():
    """G2: 2.5 MW — 1× 1250 kVA PV + BESS on JZ3"""
    net = pp.create_empty_network(name="Galascope 2 Rev F — 2.5 MW / 10 MWh")

    b_sws = pp.create_bus(net, vn_kv=22.0, name="UniSec SwS 22 kV")
    b_pv = pp.create_bus(net, vn_kv=22.0, name="JZ2 PV MV")

    pp.create_ext_grid(
        net,
        bus=b_sws,
        vm_pu=1.0,
        s_sc_max_mva=250.0,
        rx_max=0.1,
        s_sc_min_mva=150.0,
        rx_min=0.1,
        name="EAC 22 kV",
    )

    pp.create_line_from_parameters(
        net,
        from_bus=b_sws,
        to_bus=b_pv,
        length_km=0.050,
        r_ohm_per_km=0.193,
        x_ohm_per_km=0.101,
        c_nf_per_km=280.0,
        max_i_ka=0.305,
        name="JZ2 PV 3×(1×95) Cu 50m",
        parallel=3,
    )

    b_pv_lv = pp.create_bus(net, vn_kv=0.8, name="PV MCTS LV 800V")
    pp.create_transformer_from_parameters(
        net,
        hv_bus=b_pv,
        lv_bus=b_pv_lv,
        sn_mva=1.25,
        vn_hv_kv=22.0,
        vn_lv_kv=0.8,
        vk_percent=6.0,
        vkr_percent=1.2,
        pfe_kw=9.5,
        i0_percent=0.4,
        vector_group="Dyn11",
        name="PV Trafo 1250kVA",
    )
    pp.create_load(net, bus=b_pv_lv, p_mw=2.5, q_mvar=0.0, name="PV 2.5MW")

    b_skid, b_lv = _bess_branch(net, b_sws, "G2", 0.030, 0.193, 0.101, 0.305, 3.0)
    for name in ("PCS-A", "PCS-B"):
        pp.create_sgen(net, bus=b_lv, p_mw=1.25, q_mvar=0.0, sn_mva=1.25, name=name)

    return net, b_sws, b_pv, b_skid, b_lv


def analyse(net, b_skid, b_lv, tag, line_idxs):
    pp.runpp(net, algorithm="nr", numba=False)

    cable_loads = {int(i): float(net.res_line.at[i, "loading_percent"]) for i in line_idxs}
    trafo_loads = [float(v) for v in net.res_trafo["loading_percent"]]
    bess_trafo_load = float(net.res_trafo["loading_percent"].iloc[-1])
    lv_v = float(net.res_bus.loc[b_lv, "vm_pu"])

    net_sc = copy.deepcopy(net)
    net_sc.sgen = net_sc.sgen.iloc[0:0]
    net_sc.res_sgen = net_sc.res_sgen.iloc[0:0]
    sc.calc_sc(net_sc, bus=b_lv, fault="3ph", use_pre_fault_voltage=False, ip=True)
    ikss_lv = float(net_sc.res_bus_sc.loc[b_lv, "ikss_ka"])
    sc.calc_sc(net_sc, bus=b_skid, fault="3ph", use_pre_fault_voltage=False)
    ikss_mv = float(net_sc.res_bus_sc.loc[b_skid, "ikss_ka"])

    acb_icu = 65 if ikss_lv > 50 else 50

    print(f"\n{SEPARATOR}\n  {tag} — Rev F\n{SEPARATOR}")
    for idx, pct in cable_loads.items():
        name = net.line.at[idx, "name"]
        print(f"  Line [{idx}] {name}: {pct:.1f} %")
    print(f"  PV trafos loading:    {trafo_loads[:-1]}")
    print(f"  BESS TX loading:      {bess_trafo_load:.1f} %")
    print(f"  Ikss @ skid 22kV:     {ikss_mv:.2f} kA")
    print(f"  Ikss @ LV 690V:       {ikss_lv:.2f} kA  → ACB Icu >= {acb_icu} kA")

    return {
        "cable_loads": cable_loads,
        "bess_trafo_load": round(bess_trafo_load, 1),
        "ikss_lv": round(ikss_lv, 2),
        "ikss_mv": round(ikss_mv, 2),
        "acb_m_icu": acb_icu,
        "cable_load": round(max(cable_loads.values()), 1),
        "trafo_load": round(bess_trafo_load, 1),
    }


if __name__ == "__main__":
    print("\nGALASCOPE BESS — pandapower Rev F (parallel PV + JZ3 BESS)")
    net1, _, _, b_sk1, b_lv1 = create_galascope_1_revF()
    r1 = analyse(net1, b_sk1, b_lv1, "GALASCOPE 1", line_idxs=[0, 1])
    net2, _, _, b_sk2, b_lv2 = create_galascope_2_revF()
    r2 = analyse(net2, b_sk2, b_lv2, "GALASCOPE 2", line_idxs=[0, 1])

    results = {
        "G1": r1,
        "G2": r2,
        "topology": "Rev F — JZ2 combined PV (G1: 2×1250) + JZ3 BESS → skid RMU",
    }
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print(f"\nResults written: {OUTPUT_JSON}")
