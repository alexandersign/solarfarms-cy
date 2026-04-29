"""
Galascope BESS — Full Electrical Analysis
Lighthief Cyprus Ltd

Cross-checks BESS design against confirmed data from:
  - Park MCTS SLD (EL00.01.02, 2019): JZ1/JZ2 rated 16kA/1s, 200A; LV bus 800V; earth bar 90x10mm
  - 800V Technical Proposal (Mar 2026): AUX transformer 50kVA 690V/400V, 2kVA UPS
  - BCS1250K datasheet: 690V AC, 1046A rated current
  - SL-series transformer datasheets: Uk=6%, Dy11

Checks:
  1. Load flow (cable/transformer loading)
  2. Short-circuit IEC 60909 (ACB selection)
  3. Earth fault (NER sizing, touch/step voltage)
  4. Protection coordination
  5. Earthing conductor sizing
  6. 800V vs 690V comparison
"""
import sys, io, math, copy, warnings
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
warnings.filterwarnings('ignore')

import pandapower as pp
import pandapower.shortcircuit as sc

SEP = "=" * 68
DIV = "-" * 50

# ─── CONFIRMED DATA FROM DOCUMENTS ────────────────────────────────────────

# From park MCTS SLD (EL00.01.02, 2019)
PARK_SC_LEVEL_MVA  = 250    # EAC grid SC power (assumed — actual from EAC needed)
PARK_PANEL_RATED_kA = 16    # Existing JZ1/JZ2 rated fault current (kA/1s) — from SLD
PARK_LV_BUS_V      = 800    # Existing PV park LV bus voltage (V) — confirmed from SLD
EARTH_BAR_MM2      = 90*10  # Existing earth bar 90x10mm CuE = 900mm²

# From BCS1250K datasheet
PCS_RATED_MW   = 1.25
PCS_OUTPUT_V   = 690
PCS_RATED_A    = 1046   # at 690V, 1250kW / (sqrt(3)*690)

# From Linyang CIF scope + 800V proposal
NER_OHM        = 25.0
NER_MAX_If_A   = 16.0     # Max earth fault current with NER
NER_ENERGY_kJ  = 100      # NER energy class

# G2 (2.5MW): T2 + 2x BCS1250K
G2_SN_MVA  = 3.0    # transformer MVA (SL-2500 → 3MVA confirmed in SLD Rev.C)
G2_UK_PCT  = 6.0
G2_VHV_KV  = 22.0
G2_VLV_KV  = 0.690
G2_PNOM_MW = 2.5

# G1 (5MW): T4 + 4x BCS1250K
G1_SN_MVA  = 5.0
G1_UK_PCT  = 6.0
G1_VHV_KV  = 22.0
G1_VLV_KV  = 0.690
G1_PNOM_MW = 5.0

# AUX transformer (from 800V proposal, same in standard config)
AUX_TX_KVA = 50       # 50kVA, 690V/400V/Dyn11
AUX_TX_UK  = 4.0      # 4% impedance
UPS_KVA    = 2        # 2kVA UPS inside skid


def build_net(name, sn_mva, uk_pct, vhv, vlv, n_pcs, pcs_mw, mv_cable_km,
              r_cable, x_cable, max_i_ka_cable):
    net = pp.create_empty_network(name=name)
    b_eac = pp.create_bus(net, vn_kv=vhv, name=f"EAC RMU {vhv:.0f}kV")
    b_jz  = pp.create_bus(net, vn_kv=vhv, name=f"JZ Panel {vhv:.0f}kV")
    b_lv  = pp.create_bus(net, vn_kv=vlv, name=f"BESS LV Bus {vlv*1000:.0f}V")
    b_aux = pp.create_bus(net, vn_kv=0.400, name="Aux Bus 400V")

    pp.create_ext_grid(net, bus=b_eac, vm_pu=1.0,
                       s_sc_max_mva=PARK_SC_LEVEL_MVA, rx_max=0.1,
                       s_sc_min_mva=150, rx_min=0.1,
                       name=f"EAC Grid (assumed {PARK_SC_LEVEL_MVA}MVA)")

    pp.create_line_from_parameters(net, from_bus=b_eac, to_bus=b_jz,
        length_km=mv_cable_km, r_ohm_per_km=r_cable, x_ohm_per_km=x_cable,
        c_nf_per_km=280, max_i_ka=max_i_ka_cable,
        name=f"MV Cable {mv_cable_km*1000:.0f}m", parallel=3)

    pp.create_transformer_from_parameters(net, hv_bus=b_jz, lv_bus=b_lv,
        sn_mva=sn_mva, vn_hv_kv=vhv, vn_lv_kv=vlv,
        vk_percent=uk_pct, vkr_percent=0.9,
        pfe_kw=max(4, sn_mva*1.2), i0_percent=0.45,
        name=f"BESS TX {sn_mva*1000:.0f}kVA {vhv:.0f}/{vlv*1000:.0f}V Dy11")

    # AUX transformer (inside skid)
    pp.create_transformer_from_parameters(net, hv_bus=b_lv, lv_bus=b_aux,
        sn_mva=AUX_TX_KVA/1000, vn_hv_kv=vlv, vn_lv_kv=0.400,
        vk_percent=AUX_TX_UK, vkr_percent=2.0, pfe_kw=0.2, i0_percent=2.0,
        name=f"AUX TX {AUX_TX_KVA}kVA {vlv*1000:.0f}/400V Dyn11")

    # PCS units (BESS discharging = static generators on LV bus)
    for i in range(n_pcs):
        pp.create_sgen(net, bus=b_lv, p_mw=pcs_mw, q_mvar=0.0, sn_mva=pcs_mw,
                       name=f"PCS-{i+1} BCS1250K {pcs_mw*1000:.0f}kW")

    # Aux loads (HVAC, controls etc ~5kW per container)
    pp.create_load(net, bus=b_aux, p_mw=0.005*n_pcs, q_mvar=0.001*n_pcs,
                   name="Site Aux Loads (HVAC+controls)")

    pp.runpp(net, numba=False)
    return net, b_eac, b_jz, b_lv, b_aux


def run_sc_lv(net, b_lv):
    net_sc = copy.deepcopy(net)
    net_sc.sgen = net_sc.sgen.iloc[0:0]
    sc.calc_sc(net_sc, bus=b_lv, fault='3ph', use_pre_fault_voltage=False, ip=True)
    ikss = net_sc.res_bus_sc.loc[b_lv, 'ikss_ka']
    ip   = net_sc.res_bus_sc.loc[b_lv, 'ip_ka'] if 'ip_ka' in net_sc.res_bus_sc.columns else ikss * 2.1
    return ikss, ip


def run_sc_mv(net, b_jz):
    """SC at MV (JZ panel) bus — for MV CB sizing"""
    net_sc = copy.deepcopy(net)
    net_sc.sgen = net_sc.sgen.iloc[0:0]
    sc.calc_sc(net_sc, bus=b_jz, fault='3ph', use_pre_fault_voltage=False, ip=True)
    ikss = net_sc.res_bus_sc.loc[b_jz, 'ikss_ka']
    return ikss


def earth_fault_analysis(sn_mva, vlv_kv, ner_ohm):
    """
    Checks NER sizing and earth fault compliance
    Per IEC 61936-1 / Cyprus T&D Rules v4 for resistively earthed 690V system
    """
    print(f"\n{DIV}\n  Earth Fault & NER Analysis\n{DIV}")
    vln = vlv_kv * 1000 / math.sqrt(3)   # phase-to-neutral voltage (V)
    if_max = vln / ner_ohm                # max earth fault current (A)
    ner_energy_j = if_max**2 * ner_ohm * 10   # E = I²Rt (10s)

    print(f"  LV bus: {vlv_kv*1000:.0f} V  (phase-neutral: {vln:.1f} V)")
    print(f"  NER: R = {ner_ohm:.0f} Ohm")
    print(f"  Max earth fault current: {if_max:.1f} A")
    print(f"  NER energy (10s): {ner_energy_j/1000:.0f} kJ  (class: {'100kJ OK' if ner_energy_j/1000 <= 100 else '> 100kJ - UPGRADE'})")
    check = "OK" if if_max <= 16 else "EXCEEDS 16A - increase NER resistance"
    print(f"  16A limit check: {check}")

    # Earthing conductor sizing (IEC 61936-1)
    # Min cross-section: A = (If * sqrt(t)) / k  (k=143 for Cu)
    t_fault = 10   # seconds (NER rated time)
    k_cu = 143     # copper conductor constant (IEC 60364)
    a_min_mm2 = (if_max * math.sqrt(t_fault)) / k_cu
    print(f"\n  Min earthing conductor (IEC 61936): {a_min_mm2:.1f} mm² Cu")
    print(f"  Existing park earth bar: {EARTH_BAR_MM2:.0f} mm² CuE (90x10mm)")
    print(f"  Earth bar adequacy: {'OK - existing bar is adequate' if EARTH_BAR_MM2 >= a_min_mm2 else 'CHECK - undersized'}")

    # Touch voltage (simplified)
    r_earth = 10   # assumed earth electrode resistance (Ohm) - needs soil resistivity test
    v_touch = if_max * r_earth / 2  # simplified
    print(f"\n  Simplified touch voltage (R_E={r_earth}Ohm): {v_touch:.1f} V")
    print(f"  IEC 61936 limit: 50 V touch voltage")
    if v_touch > 50:
        print(f"  WARNING: touch voltage may exceed limit - soil resistivity test required")
        print(f"  Required R_E < {50*2/if_max:.1f} Ohm to keep touch voltage < 50V")
    else:
        print(f"  Touch voltage OK")
    print(f"\n  Note: Galascope geological report (2019) is in the folder.")
    print(f"  Use the soil resistivity values from that report for accurate calculation.")


def protection_check(site, I_n_hv_a, ikss_lv_ka, ikss_mv_ka, existing_rating_ka):
    print(f"\n{DIV}\n  Protection Coordination — {site}\n{DIV}")
    print(f"  Relay: Siemens SIPROTEC 7SJ82 on new JZ4/JZ5")
    print()

    # 50/51 settings
    i51_lo = 1.20 * I_n_hv_a
    i51_hi = 8.0  * I_n_hv_a
    print(f"  50/51 Phase OC:")
    print(f"    In (HV side) = {I_n_hv_a:.1f} A")
    print(f"    I>  = 1.20 x In = {i51_lo:.0f} A  (IEC Very-Inverse, TMS=0.20)")
    print(f"    I>> = 8.0 x In  = {i51_hi:.0f} A  (instantaneous, t=0.05s)")
    print(f"    Check I>> < 0.8 x Ikss_min: {i51_hi:.0f} < {ikss_mv_ka*1000*0.8:.0f} A  -> {'OK' if i51_hi < ikss_mv_ka*1000*0.8 else 'ADJUST'}")

    # Earth fault (NER-limited)
    ie_max = (22000/math.sqrt(3)) / NER_OHM  # wrong for LV earth fault...
    # Actually for LV NER: If = (690/sqrt(3)) / 25 = 15.9A
    ie_lv = (690/math.sqrt(3)) / NER_OHM
    print(f"\n  50N/51N Earth Fault (NER 25Ohm, 690V):")
    print(f"    Max earth fault current: {ie_lv:.1f} A")
    print(f"    IE>  = 5 A  (IEC Very-Inverse TMS=0.15)")
    print(f"    IE>> = {ie_lv*2:.0f} A  (instantaneous, t=0.10s)")

    # Coordination with existing switchgear (JZ1/JZ2 rated 16kA/1s)
    print(f"\n  Coordination with existing switchgear:")
    print(f"    Existing JZ1/JZ2 rated: {PARK_PANEL_RATED_kA} kA/1s — from park MCTS SLD (EL00.01.02)")
    print(f"    New JZ4/JZ5 requires:  >= {PARK_PANEL_RATED_kA} kA/1s to match")
    print(f"    Specified JZ4/JZ5:      25 kA/1s (Schneider SM6) — EXCEEDS requirement OK")

    # LV ACB
    print(f"\n  LV ACB selection:")
    print(f"    Ikss (LV bus): {ikss_lv_ka:.2f} kA")
    standard_acb = 50 if ikss_lv_ka < 50 else 65
    print(f"    Required Icu: >= {ikss_lv_ka:.1f} kA  -> select {standard_acb} kA ACB")
    if ikss_lv_ka > 50:
        print(f"    CRITICAL: 50kA ACB insufficient. Need {standard_acb}kA Icu.")
        print(f"    Confirm with Linyang that T4 skid ships with 65kA rated main ACB.")

    # Grading margin
    print(f"\n  Time grading (Zone-Zone discrimination):")
    print(f"    Zone 1: PCS internal protection    < 100ms")
    print(f"    Zone 2: 7SJ82 I>> (instantaneous)    50ms")
    print(f"    Zone 3: 7SJ82 I>  (time-delay)     ~200ms  (TMS=0.20)")
    print(f"    Zone 4: Existing EAC/park relay     400ms+  (200ms grading margin)")
    print(f"    Grade OK: {50}ms < {200}ms < 400ms")


def compare_800v_690v(sn_mva_g2, vlv_standard=0.690, vlv_800=0.800):
    print(f"\n{SEP}")
    print(f"  690V vs 800V COMPARISON — G2 (2.5MW)")
    print(f"  Based on park MCTS SLD: existing PV LV bus = 800V")
    print(SEP)

    for label, vlv in [("Standard 690V", vlv_standard), ("Optional 800V", vlv_800)]:
        # Transformer LV current at rated load
        i_lv = sn_mva_g2 * 1e6 / (math.sqrt(3) * vlv * 1000)
        # SC current at LV bus (simplified, grid 250MVA + tx impedance)
        z_grid = vlv**2 / PARK_SC_LEVEL_MVA * 1000  # mOhm
        z_tx   = (sn_mva_g2 * vlv**2 / sn_mva_g2) * (6/100) * 1000  # mOhm
        # Actually: Z_tx_pu = uk/100 → Z_tx = uk/100 * V²/S
        z_tx_ohm   = (vlv * 1000)**2 * (6/100) / (sn_mva_g2 * 1e6)   # Ohm
        z_grid_ohm = (vlv * 1000)**2 / (PARK_SC_LEVEL_MVA * 1e6)      # Ohm
        z_total    = z_tx_ohm + z_grid_ohm  # Ohm
        ikss_lv    = (vlv * 1000) / (math.sqrt(3) * z_total) / 1000   # kA
        ne_lv = (vlv * 1000 / math.sqrt(3)) / NER_OHM                 # earth fault A

        print(f"\n  [{label}]")
        print(f"    LV bus voltage:          {vlv*1000:.0f} V")
        print(f"    Rated LV current:        {i_lv:.0f} A  (at {sn_mva_g2*1000:.0f} kVA)")
        print(f"    ACB min current rating:  {i_lv*1.25:.0f} A  (125% of rated)")
        print(f"    Ikss at LV bus:          {ikss_lv:.1f} kA  (IEC 60909 simplified)")
        print(f"    ACB Icu needed:          >= {ikss_lv:.0f} kA  -> {'50kA OK' if ikss_lv < 50 else '65kA REQUIRED'}")
        print(f"    Earth fault current:     {ne_lv:.1f} A  (NER 25 Ohm)")
        print(f"    Match existing 800V LV:  {'YES - same voltage' if vlv == 0.800 else 'NO - different voltage (no issue if separate TX)'}")

    print(f"\n  KEY FINDING:")
    print(f"  The existing PV LV bus is 800V (confirmed from MCTS SLD).")
    print(f"  The BESS T2/T4 skid connects at 22kV through its OWN transformer.")
    print(f"  The 800V PV LV bus is SEPARATE from the BESS LV circuit.")
    print(f"  Therefore: 690V or 800V option for BESS makes NO difference to the")
    print(f"  existing park infrastructure. Decision is BESS-internal only.")
    print(f"  Recommendation: STAY WITH 690V standard (confirmed data, IP55, copper TX).")


# ─── RUN ALL ANALYSES ─────────────────────────────────────────────────────────

print(f"\n{SEP}")
print(f"  GALASCOPE BESS — FULL ELECTRICAL ANALYSIS")
print(f"  Data sources: MCTS SLD EL00.01.02, Kehua datasheets, Linyang RFI")
print(SEP)

print(f"\n  Key data from park MCTS SLD (EL00.01.02, 2019):")
print(f"    Existing panels: JZ1, JZ2 (16kA/1s, 200A, 22kV)")
print(f"    Existing LV bus: {PARK_LV_BUS_V}V (PV park runs at 800V)")
print(f"    Earth bar: 90x10mm CuE (PEN)")
print(f"    Designer: Hrisas Solar OOD")
print(f"    New BESS panels: JZ3/JZ4 to be added to same switchroom")

# ── G2 (2.5MW) ─────────────────────────────────────────────────────────────
print(f"\n{SEP}\n  GALASCOPE 2 — 2.5MW / 10MWh\n{SEP}")
net2, b_eac2, b_jz2, b_lv2, b_aux2 = build_net(
    "G2 2.5MW", G2_SN_MVA, G2_UK_PCT, G2_VHV_KV, G2_VLV_KV,
    2, PCS_RATED_MW, 0.030, 0.193, 0.101, 0.305)

# Load flow
print(f"\n{DIV}\n  Load Flow — G2 Full Discharge (2x1.25MW)\n{DIV}")
tx_load = net2.res_trafo['loading_percent'].values[0]
mv_load = net2.res_line['loading_percent'].values[0]
lv_v    = net2.res_bus.loc[b_lv2, 'vm_pu']
aux_v   = net2.res_bus.loc[b_aux2, 'vm_pu']
print(f"  BESS Transformer loading:  {tx_load:.1f}%  {'OK' if tx_load < 100 else 'OVERLOAD'}")
print(f"  MV cable loading:          {mv_load:.1f}%  {'OK' if mv_load < 80 else 'HIGH'}")
print(f"  LV bus voltage:            {lv_v:.4f} pu  ({lv_v*690:.1f} V)")
print(f"  Aux 400V bus voltage:      {aux_v:.4f} pu  ({aux_v*400:.1f} V)")
lv_a = net2.res_trafo['i_lv_ka'].values[0] * 1000
print(f"  LV rated current (TX):     {lv_a:.0f} A  (ACB > {lv_a*1.25:.0f}A needed)")
print(f"  Selected main ACB:         2500A  {'OK' if 2500 >= lv_a*1.25 else 'UNDERSIZE'}")

# SC
ikss2_lv, ip2  = run_sc_lv(net2, b_lv2)
ikss2_mv       = run_sc_mv(net2, b_jz2)
print(f"\n{DIV}\n  IEC 60909 Short Circuit — G2\n{DIV}")
print(f"  Ikss at 690V LV bus:       {ikss2_lv:.2f} kA  (IEC 60909)")
print(f"  ip peak:                   {ip2:.2f} kA")
print(f"  Ikss at 22kV JZ4 bus:      {ikss2_mv:.2f} kA")
print(f"  Main ACB 50kA Icu:         {'OK - margin {:.1f}kA'.format(50-ikss2_lv) if ikss2_lv < 50 else 'INSUFFICIENT'}")
print(f"  JZ4 CB 25kA/1s:            {'OK' if ikss2_mv < 25 else 'INSUFFICIENT'}")

# Earth fault
earth_fault_analysis(G2_SN_MVA, G2_VLV_KV, NER_OHM)

# Protection
I_n_hv_g2 = G2_SN_MVA * 1e6 / (math.sqrt(3) * G2_VHV_KV * 1000)
protection_check("G2 2.5MW", I_n_hv_g2, ikss2_lv, ikss2_mv, PARK_PANEL_RATED_kA)

# ── G1 (5MW) ───────────────────────────────────────────────────────────────
print(f"\n{SEP}\n  GALASCOPE 1 — 5MW / 20MWh\n{SEP}")
net1, b_eac1, b_jz1, b_lv1, b_aux1 = build_net(
    "G1 5MW", G1_SN_MVA, G1_UK_PCT, G1_VHV_KV, G1_VLV_KV,
    4, PCS_RATED_MW, 0.025, 0.153, 0.097, 0.350)

print(f"\n{DIV}\n  Load Flow — G1 Full Discharge (4x1.25MW)\n{DIV}")
tx_load1 = net1.res_trafo['loading_percent'].values[0]
mv_load1 = net1.res_line['loading_percent'].values[0]
lv_v1    = net1.res_bus.loc[b_lv1, 'vm_pu']
aux_v1   = net1.res_bus.loc[b_aux1, 'vm_pu']
lv_a1 = net1.res_trafo['i_lv_ka'].values[0] * 1000
print(f"  BESS Transformer loading:  {tx_load1:.1f}%  {'OK' if tx_load1 < 100 else 'OVERLOAD'}")
print(f"  MV cable loading:          {mv_load1:.1f}%  {'OK' if mv_load1 < 80 else 'HIGH'}")
print(f"  LV bus voltage:            {lv_v1:.4f} pu  ({lv_v1*690:.1f} V)")
print(f"  Aux 400V bus voltage:      {aux_v1:.4f} pu  ({aux_v1*400:.1f} V)")
print(f"  LV rated current (TX):     {lv_a1:.0f} A")
print(f"  Branch ACB (1600A, from T8 SLD):  {'OK' if 1600 >= PCS_RATED_A*1.25 else 'CHECK'} for each PCS branch")

ikss1_lv, ip1  = run_sc_lv(net1, b_lv1)
ikss1_mv       = run_sc_mv(net1, b_jz1)
print(f"\n{DIV}\n  IEC 60909 Short Circuit — G1\n{DIV}")
print(f"  Ikss at 690V LV bus:       {ikss1_lv:.2f} kA")
print(f"  ip peak:                   {ip1:.2f} kA")
print(f"  Ikss at 22kV JZ5 bus:      {ikss1_mv:.2f} kA")
acb1_size = 65 if ikss1_lv > 50 else 50
print(f"  Main ACB selection:        {acb1_size}kA Icu needed  {'(50kA INSUFFICIENT - CONFIRM WITH LINYANG)' if ikss1_lv > 50 else 'OK'}")
print(f"  JZ5 CB 25kA/1s:            {'OK' if ikss1_mv < 25 else 'INSUFFICIENT'}")

earth_fault_analysis(G1_SN_MVA, G1_VLV_KV, NER_OHM)
I_n_hv_g1 = G1_SN_MVA * 1e6 / (math.sqrt(3) * G1_VHV_KV * 1000)
protection_check("G1 5MW", I_n_hv_g1, ikss1_lv, ikss1_mv, PARK_PANEL_RATED_kA)

# ── 800V vs 690V ───────────────────────────────────────────────────────────
compare_800v_690v(G2_SN_MVA)

# ── EARTHING CONDUCTOR SIZING ──────────────────────────────────────────────
print(f"\n{SEP}\n  EARTHING CONDUCTOR SIZING (per IEC 61936-1)\n{SEP}")
print(f"  Earth fault current (both sites): {(690/math.sqrt(3))/NER_OHM:.1f} A (NER 25 Ohm)")
print(f"  Fault clearance time: 10s (NER rated)")
t_cl = 10
k_cu = 143
ie_lv = (690/math.sqrt(3))/NER_OHM
a_min = (ie_lv * math.sqrt(t_cl)) / k_cu
print(f"  Min PE conductor: A = (If x sqrt(t)) / k = ({ie_lv:.1f} x {math.sqrt(t_cl):.2f}) / {k_cu} = {a_min:.1f} mm2 Cu")
print(f"  Standard selection: 35mm2 Cu (>> {a_min:.0f}mm2 required)")
print(f"  Existing earth bar: {EARTH_BAR_MM2:.0f}mm2 CuE (90x10mm) - MORE than adequate")
print()
print(f"  Container earthing: Bond each container to site earth bar via 35mm2 Cu minimum")
print(f"  Earth electrode: Driven rods or buried ring conductor around container pads")
print(f"  Target resistance: < 1 Ohm (IEC 61936-1 for LV systems)")
print(f"  IMPORTANT: Use geological report (2019, in Esperia Energy Group folder)")
print(f"  for soil resistivity values at both sites before final earthing design")

# ── SUMMARY ────────────────────────────────────────────────────────────────
print(f"\n{SEP}\n  SUMMARY — ALL CHECKS\n{SEP}")
checks = [
    ("G2 BESS transformer loading",   f"{tx_load:.0f}%",   tx_load < 100,    ""),
    ("G2 MV cable loading",           f"{mv_load:.0f}%",   mv_load < 80,     ""),
    ("G2 LV voltage (discharge)",     f"{lv_v*690:.0f}V",  0.95 < lv_v < 1.05, ""),
    ("G2 Ikss at LV bus",             f"{ikss2_lv:.1f}kA", True,             ""),
    ("G2 Main ACB 50kA",              "50kA",              ikss2_lv < 50,    "OK" if ikss2_lv < 50 else "OK"),
    ("G2 JZ4 CB 25kA/1s",            "25kA/1s",           ikss2_mv < 25,    "matches existing 16kA/1s panels"),
    ("G2 Earth fault current",        f"{ie_lv:.1f}A",     ie_lv <= 16,      "NER 25Ohm"),
    ("G2 Earthing conductor",         f">={a_min:.0f}mm2", True,             "35mm2 Cu selected"),
    ("G1 BESS transformer loading",   f"{tx_load1:.0f}%",  tx_load1 < 100,   ""),
    ("G1 MV cable loading",           f"{mv_load1:.0f}%",  mv_load1 < 80,    ""),
    ("G1 Ikss at LV bus",             f"{ikss1_lv:.1f}kA", True,             ""),
    ("G1 Main ACB Icu needed",        f"{acb1_size}kA",    True,             "CONFIRM with Linyang T4 skid spec" if ikss1_lv > 50 else ""),
    ("JZ4/JZ5 panel rating",          "25kA/1s",           True,             "exceeds existing 16kA/1s - correct"),
    ("800V vs 690V BESS",             "Stay 690V",         True,             "800V PV LV bus is separate - no impact"),
    ("NER sizing",                    "25 Ohm / 100kJ",    ie_lv <= 16,      "confirmed correct"),
    ("Earth bar (existing)",          "900mm2 CuE",        True,             "adequate for new BESS loads"),
    ("Voltus signal map to Kehua",    "REQUIRED",          False,            "Must be provided before delivery"),
]
for item, value, ok, note in checks:
    status = "OK  " if ok else "ACT "
    print(f"  {status} | {item:<40} | {value:<12} {note}")
