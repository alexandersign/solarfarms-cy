"""
Galascope BESS Network Model — pandapower Rev E
Lighthief Cyprus Ltd  |  May 2026

Topology (Rev E — skid-RMU direct connection):
  EAC Grid → Customer SwS 22 kV bus (existing)
    ├── Existing PV feeders (JZ1–JZ3) — parallel, unchanged
    └── Repurposed existing SwS bay (no new SM6 cubicle)
          → MV cable (~30 m G2 / ~25 m G1)
          → T2/T4 skid RMU (Schneider RM AirSeT, CIF)
          → BESS MV/LV transformer (Kehua SL-3000 / SL-5000)
          → 690 V LV → PCS / BESS containers

Electrical impedances match Rev D (same cable + transformer); Rev E differs
in protection/physical layout only — no additional series impedance from
omitting the new JZ4/JZ5 panel at SwS.

Outputs JSON summary for SLD Rev E config (galascope-sld-revE.py).
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
    Path(__file__).resolve().parent.parent / "analysis" / "galascope-pandapower-revE-results.json"
)

SEPARATOR = "=" * 70


def create_galascope_2_revE():
    """G2: 2.5 MW / 10 MWh — T2 skid + 2× BESS"""
    net = pp.create_empty_network(name="Galascope 2 Rev E — 2.5 MW / 10 MWh")

    b_sws = pp.create_bus(net, vn_kv=22.0, name="Customer SwS 22 kV bus (existing)")
    b_skid = pp.create_bus(net, vn_kv=22.0, name="T2 Skid RMU 22 kV (RM AirSeT)")
    b_lv = pp.create_bus(net, vn_kv=0.690, name="T2 LV Bus 690 V")

    pp.create_ext_grid(
        net,
        bus=b_sws,
        vm_pu=1.0,
        va_degree=0.0,
        name="EAC 22 kV Grid",
        s_sc_max_mva=250.0,
        rx_max=0.1,
        s_sc_min_mva=150.0,
        rx_min=0.1,
    )

    # SwS repurposed bay → skid RMU: 3×(1×95 mm²) Cu XLPE, 30 m
    pp.create_line_from_parameters(
        net,
        from_bus=b_sws,
        to_bus=b_skid,
        length_km=0.030,
        r_ohm_per_km=0.193,
        x_ohm_per_km=0.101,
        c_nf_per_km=280.0,
        max_i_ka=0.305,
        name="MV Cable SwS→T2 skid 3×(1×95 mm²) Cu XLPE 30 m",
        parallel=3,
    )

    pp.create_transformer_from_parameters(
        net,
        hv_bus=b_skid,
        lv_bus=b_lv,
        sn_mva=3.0,
        vn_hv_kv=22.0,
        vn_lv_kv=0.690,
        vk_percent=6.0,
        vkr_percent=1.0,
        pfe_kw=5.0,
        i0_percent=0.5,
        vector_group="Dyn11",
        name="T2 Kehua SL-3000  3000 kVA  22/0.69 kV  Dyn11",
    )

    for name in ("PCS-A BCS1250K", "PCS-B BCS1250K"):
        pp.create_sgen(net, bus=b_lv, p_mw=1.25, q_mvar=0.0, sn_mva=1.25, name=name)

    return net, b_sws, b_skid, b_lv


def create_galascope_1_revE():
    """G1: 5 MW / 20 MWh — T4 skid + 4× BESS"""
    net = pp.create_empty_network(name="Galascope 1 Rev E — 5 MW / 20 MWh")

    b_sws = pp.create_bus(net, vn_kv=22.0, name="Customer SwS 22 kV bus (existing)")
    b_skid = pp.create_bus(net, vn_kv=22.0, name="T4 Skid RMU 22 kV (RM AirSeT)")
    b_lv = pp.create_bus(net, vn_kv=0.690, name="T4 LV Bus 690 V")

    pp.create_ext_grid(
        net,
        bus=b_sws,
        vm_pu=1.0,
        va_degree=0.0,
        name="EAC 22 kV Grid",
        s_sc_max_mva=250.0,
        rx_max=0.1,
        s_sc_min_mva=150.0,
        rx_min=0.1,
    )

    # SwS repurposed bay → skid RMU: 3×(1×120 mm²) Cu XLPE, 25 m
    pp.create_line_from_parameters(
        net,
        from_bus=b_sws,
        to_bus=b_skid,
        length_km=0.025,
        r_ohm_per_km=0.153,
        x_ohm_per_km=0.097,
        c_nf_per_km=300.0,
        max_i_ka=0.350,
        name="MV Cable SwS→T4 skid 3×(1×120 mm²) Cu XLPE 25 m",
        parallel=3,
    )

    pp.create_transformer_from_parameters(
        net,
        hv_bus=b_skid,
        lv_bus=b_lv,
        sn_mva=5.0,
        vn_hv_kv=22.0,
        vn_lv_kv=0.690,
        vk_percent=6.0,
        vkr_percent=0.8,
        pfe_kw=7.0,
        i0_percent=0.4,
        vector_group="Dyn11",
        name="T4 Kehua SL-5000  5000 kVA  22/0.69 kV  Dyn11",
    )

    for i in range(1, 5):
        pp.create_sgen(
            net, bus=b_lv, p_mw=1.25, q_mvar=0.0, sn_mva=1.25,
            name=f"PCS-{i} BCS1250K 1.25 MW",
        )

    return net, b_sws, b_skid, b_lv


def analyse(net, b_skid, b_lv, tag):
    pp.runpp(net, algorithm="nr", numba=False)

    cable_load = float(net.res_line["loading_percent"].iloc[0])
    trafo_load = float(net.res_trafo["loading_percent"].iloc[0])
    lv_v = float(net.res_bus.loc[b_lv, "vm_pu"])

    net_sc = copy.deepcopy(net)
    net_sc.sgen = net_sc.sgen.iloc[0:0]
    net_sc.res_sgen = net_sc.res_sgen.iloc[0:0]
    sc.calc_sc(net_sc, bus=b_lv, fault="3ph", use_pre_fault_voltage=False, ip=True)
    ikss_lv = float(net_sc.res_bus_sc.loc[b_lv, "ikss_ka"])

    sc.calc_sc(net_sc, bus=b_skid, fault="3ph", use_pre_fault_voltage=False)
    ikss_mv = float(net_sc.res_bus_sc.loc[b_skid, "ikss_ka"])

    acb_icu = 65 if ikss_lv > 50 else 50

    print(f"\n{SEPARATOR}\n  {tag} — Rev E skid-RMU topology\n{SEPARATOR}")
    print(f"  MV cable loading:     {cable_load:.1f} %")
    print(f"  Transformer loading:  {trafo_load:.1f} %")
    print(f"  LV voltage (pu):      {lv_v:.4f}")
    print(f"  Ikss @ skid RMU 22kV: {ikss_mv:.2f} kA  (RMU rated 25 kA/1s — verify with DSO)")
    print(f"  Ikss @ LV 690 V:      {ikss_lv:.2f} kA  → ACB Icu >= {acb_icu} kA")

    return {
        "cable_load": round(cable_load, 1),
        "trafo_load": round(trafo_load, 1),
        "lv_v_pu": round(lv_v, 4),
        "ikss_lv": round(ikss_lv, 2),
        "ikss_mv": round(ikss_mv, 2),
        "acb_m_icu": acb_icu,
    }


if __name__ == "__main__":
    print("\nGALASCOPE BESS — pandapower Rev E (skid-RMU direct)")
    print("Lighthief Cyprus Ltd  |  Esperia Energy Group\n")

    net2, _, b_skid2, b_lv2 = create_galascope_2_revE()
    r2 = analyse(net2, b_skid2, b_lv2, "GALASCOPE 2")
    net1, _, b_skid1, b_lv1 = create_galascope_1_revE()
    r1 = analyse(net1, b_skid1, b_lv1, "GALASCOPE 1")

    results = {"G2": r2, "G1": r1, "topology": "Rev E — SwS repurposed bay → MV cable → skid RMU → TX"}
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print(f"\nResults written: {OUTPUT_JSON}")
