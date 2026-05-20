"""Shared paths for Galascope electrical generators."""
from pathlib import Path

ESPERIA_ROOT = Path(__file__).resolve().parent.parent.parent
ELECTRICAL = ESPERIA_ROOT / "electrical"
SLD_ROOT = ELECTRICAL / "sld"
ANALYSIS_DIR = ELECTRICAL / "analysis"
SCRIPTS_DIR = ELECTRICAL / "scripts"


def sld_rev_dir(rev: str) -> Path:
    """rev: D, E, F, G, legacy, html"""
    d = SLD_ROOT / f"rev-{rev}"
    d.mkdir(parents=True, exist_ok=True)
    return d
