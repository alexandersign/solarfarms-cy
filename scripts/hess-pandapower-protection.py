"""
HESS Psevdas — KYEA 132/33 kV step-up transformer
Short-circuit (IEC 60909) and indicative protection / CT sizing.

Lighthief Cyprus Ltd | June 2026
"""

from __future__ import annotations

import copy
import io
import json
import math
import sys
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

import pandapower as pp
import pandapower.shortcircuit as sc

PROJECT = "HESS — Power On BESS, Psevdas Larnaca (Hybrid Energy Storage Systems Ltd)"
IK_HV_KA = 31.5  # TSOC Transmission Rules T1.8.6(a)
VN_HV_KV = 132.0
VN_LV_KV = 33.0
SN_MVA = 63.0
BESS_P_MW_NAMEPLATE = 59.0  # ΠΟΣ installed capacity
BESS_P_MW_POC = 50.0  # Max discharge @ POC — basis for PCS fault contribution
PCS_FAULT_PU = 1.0  # Current-limited PCS (typical 1.0–1.2 pu; 1.0 for design)
VK_PCT = 21.0  # Transformer Requirements item 17 (§40); RfP brief referenced 20%
VKR_PCT = 0.5
DESIGN_PF = 0.9  # Requirements item 1(b): load power factor 0.9 lag
CABLE_KM = 0.10
R_CABLE_OHM_KM = 0.075
X_CABLE_OHM_KM = 0.130
MV_INTERNAL_KM = 0.05
R_MV_OHM_KM = 0.12
X_MV_OHM_KM = 0.10
SITE_ALT_M = 264
# Plot 26 Psevdas 34.960°N 33.495°E — EC8 NA boundary; adopt Zone II unless EPS civil confirms Zone I
SEISMIC_DESIGN = "CYS EN 1998-1 Zone II, agR = 0.23 g (Zone I/II boundary — confirm with EPS civil)"
POLLUTION = "Heavy (IEC 60815 Class III); composite insulators ≥35 mm/kV"

OUTPUT_JSON = (
    Path(__file__).resolve().parent.parent
    / "docs"
    / "dso"
    / "analysis"
    / "hess-pandapower-results.json"
)


def s_sc_mva(vn_kv: float, ik_ka: float) -> float:
    return math.sqrt(3) * vn_kv * ik_ka


def i_nom_a(sn_mva: float, vn_kv: float) -> float:
    return sn_mva * 1e6 / (math.sqrt(3) * vn_kv * 1e3)


def ik_lv_analytical(
    uk_pct: float,
    ik_hv_ka: float = IK_HV_KA,
    sn_mva: float = SN_MVA,
    vn_hv: float = VN_HV_KV,
    vn_lv: float = VN_LV_KV,
) -> float:
    """Grid-fed 3ph fault on 33 kV bus; transformer-limited component only."""
    z_hv = vn_hv / (math.sqrt(3) * ik_hv_ka)
    z_tr = (uk_pct / 100) * (vn_lv**2) / sn_mva
    z_sys_lv = z_hv * (vn_lv / vn_hv) ** 2
    return vn_lv / (math.sqrt(3) * (z_sys_lv + z_tr))


def ik_lv_combined(
    uk_pct: float,
    p_bess_fault_mw: float = BESS_P_MW_POC,
    p_bess_reg_mw: float = BESS_P_MW_NAMEPLATE,
    pcs_fault_pu: float = PCS_FAULT_PU,
) -> dict:
    """Grid-through-transformer + current-limited BESS PCS contribution."""
    ik_tr = ik_lv_analytical(uk_pct)
    # P [MW] / (√3 × V [kV]) → kA directly
    i_bess_ka = p_bess_fault_mw / (math.sqrt(3) * VN_LV_KV) * pcs_fault_pu
    ik_total = ik_tr + i_bess_ka
    u_r = VKR_PCT
    u_x = math.sqrt(max(uk_pct**2 - u_r**2, 0.0))

    def vr(cosphi: float, k: float = 1.0) -> float:
        sinphi = math.sqrt(max(1.0 - cosphi**2, 0.0))
        return k * (u_r * cosphi + u_x * sinphi) + (k**2 / 200.0) * (u_x * cosphi - u_r * sinphi) ** 2

    k_active = p_bess_reg_mw / SN_MVA  # active load factor at full BESS power
    return {
        "transformer_grid_ka": round(ik_tr, 2),
        "bess_pcs_ka": round(i_bess_ka, 2),
        "combined_ka": round(ik_total, 2),
        "uk_impedance_volts_pct": round(uk_pct, 1),
        # Design point per Requirements item 1(b): 0.9 PF lag at rated MVA
        "voltage_regulation_pct_design_0p9pf": round(vr(DESIGN_PF, 1.0), 1),
        "voltage_regulation_pct_unity_pf": round(vr(1.0, k_active), 1),
        "voltage_regulation_pct_full_reactive": round(vr(0.0, 1.0), 1),
        "bess_fault_basis_mw": p_bess_fault_mw,
    }


def calc_ikss(net: pp.pandapowerNet, bus: int) -> dict[str, float]:
    n = copy.deepcopy(net)
    n.sgen = n.sgen.iloc[0:0]
    n.res_sgen = n.res_sgen.iloc[0:0]
    sc.calc_sc(n, bus=bus, fault="3ph", use_pre_fault_voltage=False, ip=True)
    row = n.res_bus_sc.loc[bus]
    return {"ikss_ka": float(row.ikss_ka), "ip_ka": float(row.ip_ka)}


def build_network(vk_pct: float = VK_PCT) -> tuple[pp.pandapowerNet, dict[str, int]]:
    s_sc = s_sc_mva(VN_HV_KV, IK_HV_KA)
    net = pp.create_empty_network(name="HESS Psevdas KYEA")

    b_ts = pp.create_bus(net, vn_kv=VN_HV_KV, name="Psevdas TS 132 kV")
    b_ais = pp.create_bus(net, vn_kv=VN_HV_KV, name="KYEA 132 kV AIS")
    b_33 = pp.create_bus(net, vn_kv=VN_LV_KV, name="KYEA 33 kV switchgear")
    b_bess = pp.create_bus(net, vn_kv=VN_LV_KV, name="BESS 33 kV collection")

    pp.create_ext_grid(
        net, bus=b_ts, vm_pu=1.0, s_sc_max_mva=s_sc, rx_max=0.1,
        s_sc_min_mva=s_sc * 0.6, rx_min=0.1, name="TSOC 132 kV",
    )
    pp.create_line_from_parameters(
        net, b_ts, b_ais, CABLE_KM, R_CABLE_OHM_KM, X_CABLE_OHM_KM,
        200, 0.8, name="132 kV UGC 300 mm² XLPE (3×1c)", parallel=3,
    )
    pp.create_transformer_from_parameters(
        net, b_ais, b_33, SN_MVA, VN_HV_KV, VN_LV_KV, vk_pct, VKR_PCT,
        40, 0.3, vector_group="YNd11", name="Main step-up 63 MVA YNd11",
    )
    pp.create_line_from_parameters(
        net, b_33, b_bess, MV_INTERNAL_KM, R_MV_OHM_KM, X_MV_OHM_KM, 250, 2.0,
        name="33 kV KYEA buswork",
    )
    for i in range(1, 6):
        pp.create_sgen(net, bus=b_bess, p_mw=10.0, q_mvar=0.0, sn_mva=10.0, name=f"PCS-T8-{i}")

    pp.runpp(net, algorithm="nr", numba=False)
    return net, {"ts_132": b_ts, "ais_132": b_ais, "swg_33": b_33, "bess_33": b_bess}


def protection_settings(i_nom_hv: float, i_nom_lv: float, ikss_hv: float, ikss_lv: float) -> dict:
    i_gg_lv = min(8.0 * i_nom_lv, 0.85 * ikss_lv * 1000)
    return {
        "hv_132": {
            "in_a": round(i_nom_hv, 1),
            "ikss_ka": round(ikss_hv, 2),
            "51_i_pickup_a": round(1.2 * i_nom_hv, 0),
            "50_i_instant_a": round(8.0 * i_nom_hv, 0),
            "ct_ratio": "400/1",
            "ct_cores": "Core 1: 0.2, 30 VA (metering); Core 2: 5P20, 20 VA (protection)",
        },
        "lv_33": {
            "in_a": round(i_nom_lv, 1),
            "ikss_ka": round(ikss_lv, 2),
            "51_i_pickup_a": round(1.2 * i_nom_lv, 0),
            "50_i_instant_a": round(i_gg_lv, 0),
            "ct_ratio": "1600/1",
            "ct_cores": "Core 1: 0.2, 30 VA (metering); Core 2: 5P20, 20 VA (protection)",
        },
    }


def main() -> None:
    fault_33 = ik_lv_combined(VK_PCT)
    ik_33_design = fault_33["combined_ka"]
    uk_sensitivity = {
        str(uk): ik_lv_combined(float(uk))["combined_ka"]
        for uk in (12, 14, 16, 18, 20, 21)
    }

    sc_pp: dict = {}
    try:
        net, buses = build_network(VK_PCT)
        sc_pp = {k: calc_ikss(net, buses[k]) for k in buses}
    except FloatingPointError:
        sc_pp = {"note": "pandapower YNd11 cross-check skipped (model error)"}

    i_hv = i_nom_a(SN_MVA, VN_HV_KV)
    i_lv = i_nom_a(SN_MVA, VN_LV_KV)
    prot = protection_settings(i_hv, i_lv, IK_HV_KA, ik_33_design)

    payload = {
        "project": PROJECT,
        "source": "scripts/hess-pandapower-protection.py",
        "assumptions": {
            "grid_fault_132_kv_ka": IK_HV_KA,
            "grid_fault_source": "TSOC Transmission Rules T1.8.6(a) — provisional until ISM bus study",
            "132_kv_bus_note": (
                "POS SLD: 63 MVA step-up at BESS plant (above DSMK boundary). UGC terminates at "
                "Psevdas TS (existing wind-farm substation, red bay). Sectionalised 132 kV bus "
                "interconnects Alambra, Paragogos, F.I.Z., T3 (40 MVA). Ik at BESS connection bay "
                "requires ISM study before fixing 132 kV CT ALF."
            ),
            "33_kv_bus_note": (
                "33 kV fault at BESS plant only: transformer-limited + PCS. T3 22 kV network is at "
                "remote source substation (below DSMK boundary) — not coupled to BESS 33 kV MV bus."
            ),
            "transformer": f"{SN_MVA} MVA {VN_HV_KV}/{VN_LV_KV} kV YNd11",
            "uk_pct_requirements": VK_PCT,
            "uk_pct_rfp_brief": 20,
            "design_power_factor": DESIGN_PF,
            "voltage_regulation_pct_design_0p9pf": fault_33["voltage_regulation_pct_design_0p9pf"],
            "voltage_regulation_pct_unity_pf": fault_33["voltage_regulation_pct_unity_pf"],
            "voltage_regulation_pct_full_reactive": fault_33["voltage_regulation_pct_full_reactive"],
            "uk_producer_questions": (
                "uk=21% is high but firmly specified (Requirements item 17, 75°C CMR, HV base). "
                f"At the specified 0.9 PF lag (item 1b) regulation is ~{fault_33['voltage_regulation_pct_design_0p9pf']}% "
                f"at full load (~{fault_33['voltage_regulation_pct_unity_pf']}% at unity PF); the wide OLTC "
                "(+12.5/-18.75%) is sized for this. Confirm 21% is the intended design value."
            ),
            "33_kv_fault_basis": (
                "Combined: grid-through-transformer (~5.0 kA @ uk=21%) + "
                "BESS PCS current-limited infeed (~0.9 kA @ 50 MW POC, 1.0 pu)"
            ),
            "33_kv_fault_ka_design": ik_33_design,
            "33_kv_fault_breakdown": fault_33,
            "ugc_cable": f"{CABLE_KM} km, 300 mm² XLPE 3×1c",
            "site_altitude_m": SITE_ALT_M,
            "site_coordinates": "34.960°N, 33.495°E (plot 26 Psevdas)",
            "seismic": SEISMIC_DESIGN,
            "pollution": POLLUTION,
        },
        "uk_sensitivity_33kv_combined_ka": uk_sensitivity,
        "short_circuit": {
            "132_kv_design_ka": IK_HV_KA,
            "33_kv_combined_ka": ik_33_design,
            "33_kv_transformer_only_ka": fault_33["transformer_grid_ka"],
            "33_kv_bess_pcs_ka": fault_33["bess_pcs_ka"],
            "pandapower_crosscheck": sc_pp,
        },
        "protection_indicative": prot,
        "protection_notes": (
            "CT polarity must follow EPS connection-bay protection (PQR, boundary CTs) — "
            "fault direction reverses with BESS import/export. "
            "132 kV CT ALF depends on ISM fault study at BESS UGC bay, Psevdas TS "
            "(Alambra + Paragogos + F.I.Z. + T3 on sectionalised wind-farm substation bus)."
        ),
        "surge_arresters_on_transformer": False,
        "surge_arrester_note": "Arresters in KYEA 132/33 kV AIS scope per TSOC POS",
        "surge_arrester_mcov_kv": {"132_kv": 102, "33_kv": 27},
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    print("\nHESS Psevdas — short-circuit study")
    print("=" * 60)
    print(f"  33 kV Ik transformer (grid-only):  {fault_33['transformer_grid_ka']:.2f} kA")
    print(f"  33 kV Ik BESS PCS ({BESS_P_MW_POC} MW POC):     {fault_33['bess_pcs_ka']:.2f} kA")
    print(f"  33 kV Ik combined (design):       {ik_33_design:.2f} kA")
    print(f"  V-reg @ 0.9 PF (design, item 1b): {fault_33['voltage_regulation_pct_design_0p9pf']:.1f}%")
    print(f"  V-reg @ unity PF:                 {fault_33['voltage_regulation_pct_unity_pf']:.1f}%")
    print(f"  V-reg full reactive (worst case): {fault_33['voltage_regulation_pct_full_reactive']:.1f}%")
    print(f"\nWrote {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
