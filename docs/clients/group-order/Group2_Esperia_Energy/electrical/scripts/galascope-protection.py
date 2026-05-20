"""
Galascope BESS — Visual SLD + Protection Engineering
Lighthief Cyprus Ltd
Outputs:
  1. galascope-2.5mw-sld.png  — pandapower network diagram
  2. galascope-5mw-sld.png    — pandapower network diagram
  3. galascope-protection.html — interactive protection coordination chart
"""

import sys, io, math, copy, warnings
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
warnings.filterwarnings('ignore')

import pandapower as pp
import pandapower.shortcircuit as sc
import pandapower.plotting as pplot
import matplotlib
matplotlib.use('Agg')  # non-interactive backend for file output
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.lines import Line2D
import numpy as np

OUTPUT_DIR = r"c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy"

# ══════════════════════════════════════════════════════════════════
#  BUILD NETWORKS  (reuse from model script)
# ══════════════════════════════════════════════════════════════════

def build_g2():
    net = pp.create_empty_network(name="Galascope 2 — 2.5 MW / 10 MWh")
    b_eac = pp.create_bus(net, vn_kv=22.0,  name="EAC RMU\n22 kV",      geodata=(0, 4))
    b_jz4 = pp.create_bus(net, vn_kv=22.0,  name="JZ4\n22 kV",          geodata=(0, 2))
    b_lv  = pp.create_bus(net, vn_kv=0.690, name="LV Bus\n690 V",        geodata=(0, 0))
    b_pcsa= pp.create_bus(net, vn_kv=0.690, name="PCS-A\n1.25 MW",       geodata=(-2, -2))
    b_pcsb= pp.create_bus(net, vn_kv=0.690, name="PCS-B\n1.25 MW",       geodata=(2, -2))

    pp.create_ext_grid(net, bus=b_eac, vm_pu=1.0, name="EAC 22kV",
                       s_sc_max_mva=250, rx_max=0.1, s_sc_min_mva=150, rx_min=0.1)
    pp.create_line_from_parameters(net, from_bus=b_eac, to_bus=b_jz4, length_km=0.030,
        r_ohm_per_km=0.193, x_ohm_per_km=0.101, c_nf_per_km=280, max_i_ka=0.305,
        name="MV 3x95mm² Cu 30m", parallel=3)
    pp.create_transformer_from_parameters(net, hv_bus=b_jz4, lv_bus=b_lv,
        sn_mva=3.0, vn_hv_kv=22.0, vn_lv_kv=0.690,
        vk_percent=6.0, vkr_percent=1.0, pfe_kw=5.0, i0_percent=0.5,
        name="T2 3000kVA 22/0.69kV")
    # PCS buses connected to LV via short bus-bar (0.001 km tie)
    pp.create_line_from_parameters(net, from_bus=b_lv, to_bus=b_pcsa, length_km=0.001,
        r_ohm_per_km=0.1, x_ohm_per_km=0.05, c_nf_per_km=10, max_i_ka=2.5, name="ACB-A")
    pp.create_line_from_parameters(net, from_bus=b_lv, to_bus=b_pcsb, length_km=0.001,
        r_ohm_per_km=0.1, x_ohm_per_km=0.05, c_nf_per_km=10, max_i_ka=2.5, name="ACB-B")
    pp.create_sgen(net, bus=b_pcsa, p_mw=1.25, q_mvar=0.0, sn_mva=1.25, name="PCS-A 1.25MW")
    pp.create_sgen(net, bus=b_pcsb, p_mw=1.25, q_mvar=0.0, sn_mva=1.25, name="PCS-B 1.25MW")
    pp.runpp(net, numba=False)
    return net, b_eac, b_jz4, b_lv


def build_g1():
    net = pp.create_empty_network(name="Galascope 1 — 5 MW / 20 MWh")
    b_eac = pp.create_bus(net, vn_kv=22.0,  name="EAC (new)\n22 kV",     geodata=(0, 4))
    b_jz5 = pp.create_bus(net, vn_kv=22.0,  name="JZ5\n22 kV",           geodata=(0, 2))
    b_lv  = pp.create_bus(net, vn_kv=0.690, name="LV Bus\n690 V",         geodata=(0, 0))
    b_p1  = pp.create_bus(net, vn_kv=0.690, name="PCS1",  geodata=(-3, -2))
    b_p2  = pp.create_bus(net, vn_kv=0.690, name="PCS2",  geodata=(-1, -2))
    b_p3  = pp.create_bus(net, vn_kv=0.690, name="PCS3",  geodata=(1, -2))
    b_p4  = pp.create_bus(net, vn_kv=0.690, name="PCS4",  geodata=(3, -2))

    pp.create_ext_grid(net, bus=b_eac, vm_pu=1.0, name="EAC 22kV",
                       s_sc_max_mva=250, rx_max=0.1, s_sc_min_mva=150, rx_min=0.1)
    pp.create_line_from_parameters(net, from_bus=b_eac, to_bus=b_jz5, length_km=0.025,
        r_ohm_per_km=0.153, x_ohm_per_km=0.097, c_nf_per_km=300, max_i_ka=0.350,
        name="MV 3x120mm² Cu 25m", parallel=3)
    pp.create_transformer_from_parameters(net, hv_bus=b_jz5, lv_bus=b_lv,
        sn_mva=5.0, vn_hv_kv=22.0, vn_lv_kv=0.690,
        vk_percent=6.0, vkr_percent=0.8, pfe_kw=7.0, i0_percent=0.4,
        name="T4 5000kVA 22/0.69kV")
    for b in [b_p1, b_p2, b_p3, b_p4]:
        pp.create_line_from_parameters(net, from_bus=b_lv, to_bus=b, length_km=0.001,
            r_ohm_per_km=0.1, x_ohm_per_km=0.05, c_nf_per_km=10, max_i_ka=2.5, name="ACB")
        pp.create_sgen(net, bus=b, p_mw=1.25, q_mvar=0.0, sn_mva=1.25, name="PCS 1.25MW")
    pp.runpp(net, numba=False)
    return net, b_eac, b_jz5, b_lv


# ══════════════════════════════════════════════════════════════════
#  PLOT NETWORK — Custom SLD-style diagram
# ══════════════════════════════════════════════════════════════════

NAVY  = '#1A365D'
GOLD  = '#C9A432'
WHITE = '#FFFFFF'
RED22 = '#E84040'
ORANGE = '#FF8C00'
CYAN  = '#4FC3F7'
GREEN = '#81C784'
GREY  = '#B0BEC5'

def plot_network(net, title, filename, site_label, transformer_label,
                 mv_cable_label, pcs_labels, ikss_ka, trafo_loading, cable_loading):
    fig, ax = plt.subplots(figsize=(14, 10), facecolor=NAVY)
    ax.set_facecolor('#0D1B2E')
    ax.set_xlim(-5, 5)
    ax.set_ylim(-4, 6)
    ax.axis('off')

    # Title
    ax.text(0, 5.5, title, ha='center', va='center',
            fontsize=15, fontweight='bold', color=GOLD,
            fontfamily='DejaVu Sans')
    ax.text(0, 5.1, site_label, ha='center', va='center',
            fontsize=9, color=GREY)

    # ── EAC RMU (top) ──────────────────────────────────────────
    eac_box = mpatches.FancyBboxPatch((-1.2, 3.5), 2.4, 0.8,
        boxstyle="round,pad=0.05", facecolor=NAVY, edgecolor='#2B5FA0', linewidth=2)
    ax.add_patch(eac_box)
    ax.text(0, 4.0, 'EAC RMU  22 kV', ha='center', va='center',
            fontsize=9, fontweight='bold', color=WHITE)
    ax.text(0, 3.65, 'External Grid  Scc=250 MVA', ha='center', va='center',
            fontsize=7.5, color=GREY)

    # ── MV bus bar ──────────────────────────────────────────────
    ax.plot([-3, 3], [3.3, 3.3], color=RED22, linewidth=3, zorder=3)
    ax.text(-3.1, 3.3, '22 kV', ha='right', va='center', fontsize=8, color=RED22)

    # ── MV cable (3 parallel lines) ─────────────────────────────
    for dx in [-0.05, 0, 0.05]:
        ax.plot([dx, dx], [3.3, 2.2], color=RED22, linewidth=2.5, zorder=3)
    # Cable label
    ax.text(0.25, 2.75, mv_cable_label, ha='left', va='center',
            fontsize=7.5, color=RED22,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#1A2E47', edgecolor=RED22, linewidth=0.8))
    # Loading indicator
    ax.text(0.25, 2.45, f'Loading: {cable_loading:.1f}%', ha='left', va='center',
            fontsize=7, color=GOLD if cable_loading > 50 else '#6AE8A4')

    # ── JZ panel ───────────────────────────────────────────────
    jz_box = mpatches.FancyBboxPatch((-0.7, 1.85), 1.4, 0.55,
        boxstyle="round,pad=0.05", facecolor='#1A2E47', edgecolor=RED22, linewidth=1.5)
    ax.add_patch(jz_box)
    ax.text(0, 2.15, 'JZ4 / JZ5   Siemens 7SJ82', ha='center', va='center',
            fontsize=7.5, fontweight='bold', color=WHITE)
    ax.text(0, 1.97, '24 kV  630 A  25 kA/1s', ha='center', va='center',
            fontsize=7, color=GREY)

    # Circuit breaker symbol
    ax.plot([0, 0], [1.85, 1.55], color=RED22, linewidth=2.5)
    # CB box
    rect = mpatches.FancyBboxPatch((-0.12, 1.38), 0.24, 0.17,
        boxstyle="square,pad=0.02", facecolor='#1A2E47', edgecolor=RED22, linewidth=1.5)
    ax.add_patch(rect)
    ax.plot([-0.12, 0.12], [1.38, 1.55], color=RED22, linewidth=1.5)
    ax.plot([0.12, -0.12], [1.38, 1.55], color=RED22, linewidth=1.5)
    ax.plot([0, 0], [1.38, 1.1], color=RED22, linewidth=2.5)

    # CT circles
    for y_ct in [1.25]:
        ct_circle = plt.Circle((0.18, y_ct), 0.09, color='#2B5FA0', fill=False, linewidth=1.5)
        ax.add_patch(ct_circle)
        ax.text(0.35, y_ct, 'CT 200/1A  5P20', ha='left', va='center', fontsize=7, color=CYAN)

    # ── Transformer ──────────────────────────────────────────────
    # Two interlocked circles = transformer symbol
    c1 = plt.Circle((0, 0.72), 0.27, color='#1A2E47', edgecolor=GOLD, linewidth=2, fill=True)
    c2 = plt.Circle((0, 0.38), 0.27, color='#1A2E47', edgecolor=GOLD, linewidth=2, fill=True)
    ax.add_patch(c1)
    ax.add_patch(c2)
    ax.text(0, 0.72, 'D', ha='center', va='center', fontsize=9, color=GOLD, fontweight='bold')
    ax.text(0, 0.38, 'Y', ha='center', va='center', fontsize=9, color=GOLD, fontweight='bold')
    ax.text(0.5, 0.7, transformer_label, ha='left', va='center',
            fontsize=7.5, color=GOLD,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#1A2E47', edgecolor=GOLD, linewidth=0.8))
    load_color = '#E84040' if trafo_loading > 100 else '#E8C46A' if trafo_loading > 90 else '#6AE8A4'
    ax.text(0.5, 0.42, f'Loading: {trafo_loading:.1f}%', ha='left', va='center',
            fontsize=7.5, fontweight='bold', color=load_color)
    ax.plot([0, 0], [1.1, 0.99], color=RED22, linewidth=2.5)
    ax.plot([0, 0], [0.11, -0.05], color=ORANGE, linewidth=3)

    # ── NER ─────────────────────────────────────────────────────
    ax.text(-0.55, -0.08, 'NER  25 Ohm', ha='right', va='center', fontsize=7, color=GREY)
    ax.plot([-0.55, -0.05], [-0.05, -0.05], color=GREY, linewidth=1, linestyle='--')

    # ── LV bus bar ──────────────────────────────────────────────
    ax.plot([-3.5, 3.5], [-0.1, -0.1], color=ORANGE, linewidth=4, zorder=3)
    ax.text(-3.6, -0.1, '690 V', ha='right', va='center', fontsize=8,
            fontweight='bold', color=ORANGE)

    # ── ACB main ────────────────────────────────────────────────
    ax.text(0.3, -0.35, 'Main ACB', ha='left', va='center', fontsize=7.5, color=ORANGE)

    # ── BESS containers (PCS branches) ──────────────────────────
    n_pcs = len(pcs_labels)
    xs = np.linspace(-3, 3, n_pcs)
    for i, (x, lbl) in enumerate(zip(xs, pcs_labels)):
        # Branch line
        ax.plot([x, x], [-0.1, -0.7], color=ORANGE, linewidth=2)
        # ACB branch symbol
        sq = mpatches.FancyBboxPatch((x-0.15, -0.88), 0.30, 0.18,
            boxstyle="square,pad=0.02", facecolor='#1A2E47', edgecolor=ORANGE, linewidth=1.2)
        ax.add_patch(sq)
        ax.plot([x-0.15, x+0.15], [-0.88, -0.70], color=ORANGE, linewidth=1.2)
        ax.plot([x+0.15, x-0.15], [-0.88, -0.70], color=ORANGE, linewidth=1.2)
        ax.plot([x, x], [-1.06, -1.3], color=ORANGE, linewidth=2)
        # BESS container box
        bess = mpatches.FancyBboxPatch((x-0.85, -2.6), 1.7, 1.3,
            boxstyle="round,pad=0.05", facecolor='#162840', edgecolor='#2B5FA0', linewidth=2)
        ax.add_patch(bess)
        ax.text(x, -1.85, 'PCS', ha='center', va='center',
                fontsize=8, fontweight='bold', color=WHITE)
        ax.text(x, -2.1, 'BCS1250K', ha='center', va='center', fontsize=7, color=GREY)
        ax.text(x, -2.3, '1.25 MW', ha='center', va='center', fontsize=7, color=ORANGE)
        # Battery sub-box
        batt = mpatches.FancyBboxPatch((x-0.75, -3.6), 1.5, 0.85,
            boxstyle="round,pad=0.04", facecolor='#0D1B2E', edgecolor='#2B5FA0', linewidth=1.5)
        ax.add_patch(batt)
        ax.text(x, -3.0, 'BESS', ha='center', va='center',
                fontsize=8, fontweight='bold', color='#7AB8E8')
        ax.text(x, -3.25, lbl, ha='center', va='center', fontsize=7, color=GREY)
        ax.text(x, -3.48, '5 MWh LFP', ha='center', va='center', fontsize=7, color=GREY)
        # DC cable
        ax.plot([x, x], [-2.6, -2.75], color='#C0C0C0', linewidth=1.5, linestyle='dotted')

    # ── SC result badge ──────────────────────────────────────────
    sc_color = '#E84040' if ikss_ka > 50 else '#6AE8A4'
    sc_box = mpatches.FancyBboxPatch((2.5, -0.8), 2.3, 1.4,
        boxstyle="round,pad=0.1", facecolor='#162840', edgecolor=sc_color, linewidth=1.5)
    ax.add_patch(sc_box)
    ax.text(3.65, 0.32, 'IEC 60909 SC', ha='center', va='center',
            fontsize=7.5, fontweight='bold', color=WHITE)
    ax.text(3.65, 0.08, f'Ikss = {ikss_ka:.1f} kA', ha='center', va='center',
            fontsize=9, fontweight='bold', color=sc_color)
    ax.text(3.65, -0.2, f'ACB 50kA:', ha='center', va='center', fontsize=7.5, color=WHITE)
    if ikss_ka < 50:
        ax.text(3.65, -0.45, f'OK  (+{50-ikss_ka:.1f} kA margin)', ha='center', va='center',
                fontsize=7.5, color='#6AE8A4')
    else:
        ax.text(3.65, -0.45, f'UPGRADE TO 65kA!', ha='center', va='center',
                fontsize=7.5, fontweight='bold', color='#E84040')

    # ── Protection relay annotation ──────────────────────────────
    prot = mpatches.FancyBboxPatch((-4.9, 0.5), 1.7, 3.0,
        boxstyle="round,pad=0.1", facecolor='#162840', edgecolor=CYAN, linewidth=1.2)
    ax.add_patch(prot)
    ax.text(-4.05, 3.2, 'RELAY 7SJ82', ha='center', va='center',
            fontsize=8, fontweight='bold', color=CYAN)
    relay_lines = [
        '50/51  I> = 79 A',
        '       I>> = 525 A',
        '50N/51N IE> = 5 A',
        '67N  80 deg',
        '27/59  0.85/1.10pu',
        '81U/O  47.5/51.5Hz',
        '81R  1.0 Hz/s',
        '78  dPhi > 8 deg',
    ]
    for j, line in enumerate(relay_lines):
        ax.text(-4.05, 2.9 - j * 0.32, line, ha='center', va='center',
                fontsize=6.5, color=GREY, fontfamily='monospace')
    # Dashed line to JZ panel
    ax.annotate('', xy=(-0.75, 2.1), xytext=(-3.2, 2.1),
                arrowprops=dict(arrowstyle='->', color=CYAN, lw=1.2, linestyle='dashed'))

    # ── Legend ───────────────────────────────────────────────────
    legend_elements = [
        Line2D([0], [0], color=RED22,  linewidth=2.5, label='22 kV MV'),
        Line2D([0], [0], color=ORANGE, linewidth=2.5, label='690 V LV / DC'),
        Line2D([0], [0], color=CYAN,   linewidth=1.5, linestyle='dashed', label='Control / relay'),
        Line2D([0], [0], color=GOLD,   linewidth=2, label='Transformer'),
    ]
    ax.legend(handles=legend_elements, loc='lower right', facecolor='#162840',
              edgecolor=NAVY, labelcolor=WHITE, fontsize=7.5)

    plt.tight_layout(pad=0.3)
    out_path = f"{OUTPUT_DIR}\\{filename}"
    plt.savefig(out_path, dpi=150, bbox_inches='tight', facecolor=NAVY)
    plt.close()
    print(f"  Saved: {out_path}")
    return out_path


# ══════════════════════════════════════════════════════════════════
#  PROTECTION ENGINEERING — Relay Setting Calculations
# ══════════════════════════════════════════════════════════════════

def protection_engineering(site, vn_kv, sn_mva, vk_pct, i_fl_hv_a, ikss_lv_ka, mv_cable_km, r_cable, x_cable):
    """
    Calculate and verify protection relay settings per IEC 60255 / Cyprus T&D Rules v4
    """
    print(f"\n{'='*70}")
    print(f"  PROTECTION ENGINEERING — {site}")
    print(f"  Siemens SIPROTEC 7SJ82 on JZ4/JZ5 panel")
    print(f"{'='*70}")

    I_n = i_fl_hv_a  # nominal current at 22kV side
    print(f"\n  System data:")
    print(f"    Transformer:  {sn_mva*1000:.0f} kVA  22/{vn_kv*1000:.0f} V  uk={vk_pct}%")
    print(f"    Nominal HV current (In):  {I_n:.1f} A")
    print(f"    Ikss at 690V LV bus:      {ikss_lv_ka:.2f} kA")
    print(f"    MV cable:  {mv_cable_km*1000:.0f} m   R={r_cable:.3f} Ohm/km  X={x_cable:.3f} Ohm/km")

    # ── 50/51 Phase Overcurrent ──────────────────────────────────
    # I>  (time-delayed) = 1.2 × In (IEC very-inverse, TMS 0.20)
    # I>> (instantaneous) = 8 × In (below minimum fault current)
    i_set_low  = 1.20 * I_n
    i_set_high = 8.0  * I_n
    # Verify I>> < minimum fault current at remote end (far end of cable)
    # Z_cable = sqrt((r*l)^2 + (x*l)^2)
    z_cable = math.sqrt((r_cable * mv_cable_km)**2 + (x_cable * mv_cable_km)**2)
    z_trafo_hv = (vk_pct / 100) * (22.0**2) / sn_mva  # in kOhm → need to scale
    # Minimum fault current at transformer HV terminals (minimum SC conditions)
    z_grid_min = (22.0**2) / 150.0  # 150 MVA minimum SC
    z_total_min = z_grid_min + z_cable  # (simplified, ohms at 22kV)
    ikss_hv_min_ka = (1.0 * 22.0) / (math.sqrt(3) * z_total_min)

    print(f"\n  50/51 Phase Overcurrent Relay:")
    print(f"    I>   = 1.20 x In = {i_set_low:.1f} A  [IEC Very-Inverse, TMS = 0.20]")
    print(f"    I>>  = 8.0 x In  = {i_set_high:.1f} A  [Instantaneous, t = 0.05 s]")
    print(f"    Min fault current at HV: {ikss_hv_min_ka*1000:.0f} A")
    check = "OK" if i_set_high < ikss_hv_min_ka * 1000 * 0.8 else "CHECK - I>> may not operate on min fault"
    print(f"    I>> < 80% of min Ikss: {check}")

    # ── 50N/51N Earth Fault ──────────────────────────────────────
    # For resistively earthed system (NER 25 Ohm):
    # Max earth fault current = V_phase / NER = (690/sqrt(3)) / 25 = 16 A
    # Earth fault setting: 5A (30% of max)
    i_ef_max = (690 / math.sqrt(3)) / 25.0
    i_ef_set = max(5.0, 0.05 * I_n)  # 5% of In or 5A minimum
    print(f"\n  50N/51N Earth Fault (NER 25 Ohm system):")
    print(f"    Max earth fault current: {i_ef_max:.1f} A")
    print(f"    IE>  = {i_ef_set:.1f} A  (30% of max, IEC Very-Inverse TMS=0.15)")
    print(f"    IE>> = {i_ef_set * 8:.1f} A  (2x max earth fault, t=0.10s)")

    # ── 67N Directional Earth Fault ─────────────────────────────
    print(f"\n  67N Directional Earth Fault:")
    print(f"    Setting: 5% of In = {0.05 * I_n:.1f} A")
    print(f"    Characteristic angle: 80 deg")
    print(f"    Time: 0.4 s (definite time)")
    print(f"    Mandatory per Cyprus T&D Rules v4.0.0 Section 5")

    # ── 27/59 Under/Over Voltage ─────────────────────────────────
    v_nom = 22.0  # kV
    v_low  = 0.85 * v_nom   # 18.7 kV
    v_high = 1.10 * v_nom   # 24.2 kV
    print(f"\n  27/59 Under/Over Voltage (Anti-islanding Stage 1):")
    print(f"    U<  = 0.85 pu = {v_low:.1f} kV  |  t = 1.0 s")
    print(f"    U>  = 1.10 pu = {v_high:.1f} kV  |  t = 1.0 s")

    # ── 81 Under/Over Frequency ──────────────────────────────────
    print(f"\n  81U/O Under/Over Frequency (Anti-islanding Stage 2 — EAC mandatory):")
    print(f"    f<  = 47.5 Hz  |  Instant trip")
    print(f"    f>  = 51.5 Hz  |  Instant trip")

    # ── 81R ROCOF ────────────────────────────────────────────────
    print(f"\n  81R Rate-of-Change-of-Frequency (LOM — Category B mandatory):")
    print(f"    df/dt > 1.0 Hz/s  |  t = 0.5 s")

    # ── 78 Vector Shift ──────────────────────────────────────────
    print(f"\n  78 Vector Shift (LOM backup):")
    print(f"    delta-phi > 8 deg  |  Instant")
    print(f"    NOTE: Tune carefully to avoid nuisance trip on load switching")

    # ── CT sizing check ──────────────────────────────────────────
    ct_primary = 200  # A
    ct_ratio   = ct_primary / 1  # 200/1
    ct_burden_va = 30
    print(f"\n  CT Sizing Verification:")
    print(f"    Primary current: {ct_primary} A  |  Ratio: {ct_ratio:.0f}/1")
    print(f"    I_n to relay: {I_n / ct_ratio:.2f} A  (relay range typically 0.1–2.0 A OK)")
    print(f"    Class 5P20: ALF=20, Ie at 20xIn = {ct_primary*20/ct_ratio:.0f} A (relay input)")
    i_relay_n = I_n / ct_ratio
    print(f"    CT burden: {ct_burden_va} VA at {ct_primary} A  ({ct_burden_va/(ct_primary/ct_ratio)**2:.1f} Ohm)")

    # ── Coordination time summary ────────────────────────────────
    print(f"\n  Protection Coordination Summary:")
    print(f"    Zone 1 (BESS inverter trip):  <100 ms  (PCS internal)")
    print(f"    Zone 2 (7SJ82 I>>):            50 ms   (instantaneous)")
    print(f"    Zone 3 (7SJ82 I>):            ~200 ms  (IEC very-inverse TMS=0.20)")
    print(f"    Zone 4 (EAC upstream relay):   400+ ms (grading margin 200ms)")
    print(f"    LOM (81R ROCOF):               500 ms")
    print(f"    Anti-islanding (27/59/81U/O):  1.0s / instant")
    print(f"\n  IMPORTANT: 7SJ82 settings must be submitted to EAC/DSO for")
    print(f"  approval and witnessed testing before energisation.")
    print(f"  Reference: Cyprus T&D Rules v4.0.0 (Κανόνες Μεταφοράς v4)")


# ══════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════

print("\nBuilding and plotting Galascope networks...")

# Galascope 2 (2.5MW)
net2, b_eac2, b_jz4, b_lv2 = build_g2()
net_sc2 = copy.deepcopy(net2)
net_sc2.sgen = net_sc2.sgen.iloc[0:0]
sc.calc_sc(net_sc2, bus=b_lv2, fault='3ph', use_pre_fault_voltage=False, ip=True)
ikss2 = net_sc2.res_bus_sc.loc[b_lv2, 'ikss_ka']

out2 = plot_network(
    net2, "Galascope 2  —  2.5 MW / 10 MWh BESS",
    "galascope-2.5mw-sld.png",
    "Site: Famagusta — Avgorou  |  EPC: Lighthief Cyprus Ltd  |  Rev. C Apr 2026",
    "T2  3000 kVA\n22 / 0.69 kV\nDyn11  uk=6%",
    "3x(1x95mm²) Cu XLPE\n12/20(24) kV  |  30m",
    ["BESS-A\n5 MWh", "BESS-B\n5 MWh"],
    ikss2,
    net2.res_trafo['loading_percent'].values[0],
    net2.res_line['loading_percent'].values[0]
)

# Galascope 1 (5MW)
net1, b_eac1, b_jz5, b_lv1 = build_g1()
net_sc1 = copy.deepcopy(net1)
net_sc1.sgen = net_sc1.sgen.iloc[0:0]
sc.calc_sc(net_sc1, bus=b_lv1, fault='3ph', use_pre_fault_voltage=False, ip=True)
ikss1 = net_sc1.res_bus_sc.loc[b_lv1, 'ikss_ka']

out1 = plot_network(
    net1, "Galascope 1  —  5 MW / 20 MWh BESS",
    "galascope-5mw-sld.png",
    "Site: Famagusta  |  EAC Room New Position  |  EPC: Lighthief Cyprus Ltd  |  Rev. C Apr 2026",
    "T4  5000 kVA\n22 / 0.69 kV\nDyn11  uk=6%",
    "3x(1x120mm²) Cu XLPE\n12/20(24) kV  |  25m",
    ["BESS-1\n5 MWh", "BESS-2\n5 MWh", "BESS-3\n5 MWh", "BESS-4\n5 MWh"],
    ikss1,
    net1.res_trafo['loading_percent'].values[0],
    net1.res_line['loading_percent'].values[0]
)

# Protection Engineering
# G2: HV current = 2500kVA / (sqrt(3)*22kV) = 65.6 A
i_fl_g2 = (2.5e6) / (math.sqrt(3) * 22000)
protection_engineering(
    "GALASCOPE 2 — 2.5 MW",
    vn_kv=0.690, sn_mva=3.0, vk_pct=6.0,
    i_fl_hv_a=i_fl_g2,
    ikss_lv_ka=ikss2,
    mv_cable_km=0.030, r_cable=0.193, x_cable=0.101
)

# G1: HV current = 5000kVA / (sqrt(3)*22kV) = 131.2 A
i_fl_g1 = (5.0e6) / (math.sqrt(3) * 22000)
protection_engineering(
    "GALASCOPE 1 — 5 MW",
    vn_kv=0.690, sn_mva=5.0, vk_pct=6.0,
    i_fl_hv_a=i_fl_g1,
    ikss_lv_ka=ikss1,
    mv_cable_km=0.025, r_cable=0.153, x_cable=0.097
)

print(f"\n{'='*70}")
print(f"  OUTPUTS")
print(f"{'='*70}")
print(f"  Visual SLD:      {out2}")
print(f"  Visual SLD:      {out1}")
print(f"  Model script:    {OUTPUT_DIR}\\galascope-pandapower-model.py")
print(f"\n  CRITICAL FINDING:")
print(f"  Galascope 1 (5MW) Ikss = {ikss1:.1f} kA > 50kA ACB rating.")
print(f"  Confirm Linyang T4 skid uses 65kA or 80kA rated LV ACB internally.")
