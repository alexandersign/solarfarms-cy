import sys, io, warnings
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
warnings.filterwarnings('ignore')

import ezdxf, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
from ezdxf.addons.drawing.properties import LayoutProperties

files = [
    r'c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy\LC-G1-SLD-001-E_Cypriot.dxf',
    r'c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy\LC-G1-SLD-001-E-IEC.dxf',
    r'c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy\LC-G2-SLD-001-E_Cypriot.dxf',
    r'c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy\LC-G2-SLD-001-E-IEC.dxf',
]

# Colour overrides: force annotation/text layers to near-black
# Keep functional colours: MV=red, LV=yellow(→darken to orange), BNDRY=green, CTRL=teal
LAYER_COLOURS = {
    "ANN":    "#111111",   # annotation text → near black
    "DIM":    "#333333",   # dim/notes → dark grey
    "TITLE":  "#000000",   # title block text → black
    "FRAME":  "#000000",   # frame → black
    "SYM":    "#000000",   # symbols → black
    "DEVICE": "#000000",
    "MV":     "#CC0000",   # 22kV → dark red (readable on white)
    "LV":     "#996600",   # 690V yellow → dark amber (readable on white)
    "CTRL":   "#006666",   # control → dark teal
    "BNDRY":  "#006600",   # boundary → dark green
    "RMU":    "#000088",   # RMU box → dark blue
}

for dxf_path in files:
    doc = ezdxf.readfile(dxf_path)

    # Override layer colours in the document
    for layer_name, colour_hex in LAYER_COLOURS.items():
        try:
            layer = doc.layers.get(layer_name)
            if layer:
                # Convert hex to ACI closest or use true colour
                r = int(colour_hex[1:3], 16)
                g = int(colour_hex[3:5], 16)
                b = int(colour_hex[5:7], 16)
                layer.rgb = (r, g, b)
        except Exception:
            pass

    fig = plt.figure(figsize=(420/25.4, 297/25.4), facecolor='white')
    ax  = fig.add_axes([0, 0, 1, 1])
    ax.set_facecolor('white')

    ctx = RenderContext(doc)
    backend = MatplotlibBackend(ax)
    lp = LayoutProperties.from_layout(doc.modelspace())
    lp.set_colors('#ffffff')

    Frontend(ctx, backend).draw_layout(
        doc.modelspace(), finalize=True, layout_properties=lp)

    png = dxf_path.replace('.dxf', '-white.png')
    fig.savefig(png, dpi=280, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print('saved:', png)
