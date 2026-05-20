# -*- coding: utf-8 -*-
"""
Solar Warehouse Prospecting Automation - Cyprus
================================================
Discovers warehouse / industrial buildings via OpenStreetMap, calculates
rooftop PV potential via the EU PVGIS API, generates a satellite image with
a solar panel overlay (Pillow), extracts contact details, and sends a
personalised HTML offer email via Resend.

USAGE
-----
  # Sweep by city name (geocodes to bounding box automatically)
  python scripts/solar-prospect-sweep.py --city "Limassol" --radius 10000 --limit 20

  # Sweep by explicit bounding box (south,west,north,east)
  python scripts/solar-prospect-sweep.py --bbox "34.65,33.01,34.72,33.08" --limit 10

  # Dry-run: build images + CSV report, no emails sent
  python scripts/solar-prospect-sweep.py --city "Nicosia" --limit 5 --dry-run

  # Single test address (lat,lon)
  python scripts/solar-prospect-sweep.py --test-point "34.6867,33.0228"

REQUIRED ENV VARS (add to .env.local)
--------------------------------------
  GOOGLE_MAPS_KEY=...      Google Maps Static API key
                           Enable at: console.cloud.google.com → Maps Static API
  RESEND_API_KEY=...       Already set in .env.local

OPTIONAL ENV VARS
-----------------
  HUNTER_API_KEY=...       Hunter.io API key (free tier: 25/month)
                           Sign up at: hunter.io

DEPENDENCIES
------------
  pip install requests Pillow python-dotenv beautifulsoup4
"""

import argparse
import base64
import csv
import io
import json
import math
import os
import re
import sys
import time
import urllib.parse
from datetime import date, datetime
from pathlib import Path
from typing import Optional

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont

# ── Environment ───────────────────────────────────────────────────────────────
# Load .env.local from the repo root (two levels up from scripts/)
REPO_ROOT = Path(__file__).parent.parent
load_dotenv(REPO_ROOT / ".env.local")

MAPBOX_TOKEN      = os.getenv("MAPBOX_TOKEN", "")
RESEND_API_KEY    = os.getenv("RESEND_API_KEY", "")
HUNTER_API_KEY    = os.getenv("HUNTER_API_KEY", "")
GOOGLE_PLACES_KEY = os.getenv("GOOGLE_MAPS_KEY", "")  # reuse same key — Places API uses it

if not RESEND_API_KEY:
    sys.exit("ERROR: RESEND_API_KEY not set. Add it to .env.local")

if not MAPBOX_TOKEN:
    print("WARNING: MAPBOX_TOKEN not set. Satellite images will be skipped.")
    print("         Sign up free at mapbox.com -> Access Tokens -> copy default token")
    print("         Add MAPBOX_TOKEN=pk.ey... to .env.local")

if not GOOGLE_PLACES_KEY:
    print("WARNING: GOOGLE_MAPS_KEY not set. Google Places lookup will be skipped.")

# ── Sector Configuration ──────────────────────────────────────────────────────
# Each sector defines:
#   places_types  – Google Places API (New) includedTypes for Places-first search
#   osm_tags      – OSM building tags for OSM-first search (warehouses mode)
#   min_roof      – minimum usable roof m² to qualify
#   email_variant – controls copy in the email body (keys match render_email logic)
#   description   – human-readable label shown in reports

SECTORS: dict = {
    "warehouse": {
        "places_types": [],   # empty = OSM-first mode
        "osm_tags":  [("building", "warehouse"), ("building", "industrial"),
                      ("building", "storage_tank")],
        "min_roof":  200,
        "email_variant": "new_solar",
        "description": "Warehouses & Industrial",
    },
    "winery": {
        "places_types": ["winery"],
        "osm_tags":  [("building", "warehouse"), ("craft", "winery")],
        "min_roof":  200,
        "email_variant": "new_solar",
        "description": "Wineries & Vineyards",
    },
    "hospital": {
        "places_types": ["hospital"],
        "osm_tags":  [("building", "hospital"), ("amenity", "hospital")],
        "min_roof":  800,
        "email_variant": "new_solar_large",
        "description": "Hospitals",
    },
    "clinic": {
        "places_types": ["doctor", "dentist", "physiotherapist", "medical_lab"],
        "osm_tags":  [("amenity", "clinic"), ("amenity", "doctors")],
        "min_roof":  100,
        "email_variant": "new_solar",
        "description": "Clinics & Medical Practices",
    },
    "hotel": {
        "places_types": ["lodging"],
        "osm_tags":  [("tourism", "hotel"), ("building", "hotel")],
        "min_roof":  400,
        "email_variant": "new_solar",
        "description": "Hotels & Resorts",
    },
    "supermarket": {
        "places_types": ["supermarket", "grocery_or_supermarket"],
        "osm_tags":  [("shop", "supermarket")],
        "min_roof":  400,
        "email_variant": "new_solar",
        "description": "Supermarkets & Large Retail",
    },
    "school": {
        "places_types": ["school", "secondary_school", "primary_school"],
        "osm_tags":  [("amenity", "school"), ("building", "school")],
        "min_roof":  300,
        "email_variant": "new_solar",
        "description": "Schools & Educational",
    },
    "factory": {
        "places_types": ["light_industry_area", "food_production"],
        "osm_tags":  [("building", "factory"), ("man_made", "works")],
        "min_roof":  500,
        "email_variant": "new_solar",
        "description": "Factories & Food Production",
    },
    "restaurant": {
        "places_types": ["restaurant"],
        "osm_tags":  [("amenity", "restaurant")],
        "min_roof":  150,
        "email_variant": "new_solar",
        "description": "Restaurants",
    },
    "cafe": {
        "places_types": ["cafe", "coffee_shop"],
        "osm_tags":  [("amenity", "cafe")],
        "min_roof":  80,
        "email_variant": "new_solar",
        "description": "Cafes & Coffee Shops",
    },
    "car_dealership": {
        "places_types": ["car_dealer"],
        "osm_tags":  [("shop", "car")],
        "min_roof":  300,
        "email_variant": "new_solar",
        "description": "Car Dealerships",
    },
    "gym": {
        "places_types": ["gym", "sports_club"],
        "osm_tags":  [("leisure", "fitness_centre")],
        "min_roof":  200,
        "email_variant": "new_solar",
        "description": "Gyms & Sports Centres",
    },
}

# Sector groups for --sectors all / named bundles
SECTOR_GROUPS: dict = {
    "all":         list(SECTORS.keys()),
    "commercial":  ["warehouse", "factory", "logistics", "supermarket", "car_dealership"],
    "hospitality": ["restaurant", "cafe", "hotel", "winery"],
    "healthcare":  ["hospital", "clinic"],
    "mixed":       ["warehouse", "winery", "hospital", "clinic",
                    "hotel", "supermarket", "restaurant"],
}

PANEL_WATTS       = 500          # 500 W panels
PANEL_AREA_M2     = 2.0          # approx area per panel (m²)
ROOF_UTIL_FACTOR  = 0.40         # 40% of roof area is usable (obstacles, orientation)
SYSTEM_LOSS_PCT   = 14           # PVGIS system loss %
EAC_RATE_EUR_KWH  = 0.185        # EAC commercial rate (€/kWh)
EAC_SYSTEM_COST_EUR_KWP = 1_050  # installed cost per kWp (Cyprus market 2026)
CO2_FACTOR_KG_KWH = 0.57         # Cyprus grid emission factor kg CO₂/kWh (TSO data)
MIN_ROOF_AREA_M2  = 200          # skip buildings with <200 m² roof
OVPASS_API_URL    = "https://overpass-api.de/api/interpreter"
PVGIS_API_URL     = "https://re.jrc.ec.europa.eu/api/v5_2/PVcalc"
NOMINATIM_URL     = "https://nominatim.openstreetmap.org/search"
MAPBOX_STATIC_URL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static"
RESEND_URL        = "https://api.resend.com/emails"

# Lighthief brand colours (NAVY, GOLD) for panel overlay
PANEL_FILL   = (26, 54, 93, 210)    # RGBA navy with alpha
PANEL_BORDER = (201, 164, 50, 255)  # RGBA gold fully opaque

# Sender details
SENDER_NAME  = "Alexander Papacosta"
SENDER_TITLE = "Director"
SENDER_EMAIL = "alexander.papacosta@lighthief.com"
SENDER_PHONE = "+357 99 164 158"

OUTPUT_DIR = REPO_ROOT / "docs" / "solar-prospects"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TEMPLATE_PATH = REPO_ROOT / "lib" / "solar-email-template.html"

# ── Geocoding ─────────────────────────────────────────────────────────────────

def geocode_city(city: str, country: str = "Cyprus") -> tuple[float, float, float, float]:
    """Return (south, west, north, east) bounding box for a city name."""
    r = requests.get(NOMINATIM_URL, params={
        "q": f"{city}, {country}",
        "format": "json",
        "limit": 1,
    }, headers={"User-Agent": "Lighthief-Solar-Sweep/1.0"}, timeout=10)
    r.raise_for_status()
    results = r.json()
    if not results:
        sys.exit(f"ERROR: Could not geocode '{city}, {country}'")
    bb = results[0]["boundingbox"]
    return float(bb[0]), float(bb[2]), float(bb[1]), float(bb[3])


def expand_bbox_by_radius(lat: float, lon: float, radius_m: float):
    """Given a centre point and radius, return (south, west, north, east)."""
    delta_lat = radius_m / 111_000
    delta_lon = radius_m / (111_000 * math.cos(math.radians(lat)))
    return lat - delta_lat, lon - delta_lon, lat + delta_lat, lon + delta_lon

# ── Places-first Sector Search ────────────────────────────────────────────────

def search_sector_by_places(sector: str, south: float, west: float,
                             north: float, east: float, limit: int) -> list[dict]:
    """
    For typed business sectors (wineries, hospitals, clinics, etc.):
    Query Google Places Nearby Search → get each business's lat/lon →
    fetch OSM building polygon at that point → return unified building list.
    """
    if not GOOGLE_PLACES_KEY:
        print("  ERROR: GOOGLE_MAPS_KEY required for sector search.")
        return []

    sector_cfg  = SECTORS[sector]
    types       = sector_cfg["places_types"]
    description = sector_cfg["description"]

    c_lat = (south + north) / 2
    c_lon = (west + east) / 2
    radius = max(
        math.hypot((north - south) * 111_000, (east - west) * 111_000 * math.cos(math.radians(c_lat))) / 2,
        500,
    )

    print(f"  Places search for sector '{description}' (types: {types}) radius {radius:.0f}m ...")

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
        "X-Goog-FieldMask": (
            "places.displayName,places.formattedAddress,places.location,"
            "places.nationalPhoneNumber,places.websiteUri,places.id,"
            "places.googleMapsUri,places.types"
        ),
    }

    places_found = []
    for ptype in types:
        try:
            r = requests.post(
                PLACES_NEARBY_URL,
                headers=headers,
                json={
                    "includedTypes":   [ptype],
                    "maxResultCount":  min(20, limit),
                    "locationRestriction": {
                        "circle": {
                            "center": {"latitude": c_lat, "longitude": c_lon},
                            "radius": min(radius, 50_000),
                        }
                    },
                },
                timeout=15,
            )
            r.raise_for_status()
            for p in r.json().get("places", []):
                loc = p.get("location", {})
                if loc.get("latitude"):
                    places_found.append(p)
        except Exception as exc:
            print(f"  Places search error for type '{ptype}': {exc}")

    # Deduplicate by place_id
    seen     = set()
    unique   = []
    for p in places_found:
        pid = p.get("id", "")
        if pid not in seen:
            seen.add(pid)
            unique.append(p)

    print(f"  Found {len(unique)} unique {description} businesses from Places")

    # For each Place, get the OSM building polygon at that coordinate
    buildings = []
    for p in unique[:limit]:
        loc  = p["location"]
        lat  = loc["latitude"]
        lon  = loc["longitude"]
        name = p.get("displayName", {}).get("text", f"Business at {lat:.4f},{lon:.4f}")
        addr = p.get("formattedAddress", "Cyprus")
        poly = get_osm_building_at_point(lat, lon, radius_m=120)

        if poly:
            roof_area = poly["area_m2"]
        else:
            roof_area = sector_cfg["min_roof"] * 2  # rough default if no OSM polygon

        if roof_area < sector_cfg["min_roof"]:
            continue

        buildings.append({
            "name":         name,
            "lat":          lat,
            "lon":          lon,
            "roof_area_m2": roof_area,
            "geom_nodes":   poly["nodes"] if poly else [],
            "tags":         {},
            "website":      p.get("websiteUri", ""),
            "email":        "",
            "phone":        p.get("nationalPhoneNumber", ""),
            "addr":         addr,
            # Pre-fill GMB data so pipeline skips the second Places lookup
            "_gmb_prefilled": {
                "gmb_found":      True,
                "gmb_confidence": "HIGH",
                "gmb_name":       name,
                "phone":          p.get("nationalPhoneNumber", ""),
                "website":        p.get("websiteUri", ""),
                "gmaps_url":      p.get("googleMapsUri", f"https://www.google.com/maps?q={lat},{lon}"),
                "place_id":       p.get("id", ""),
                "google_types":   ", ".join(p.get("types", [])),
                "gmb_address":    addr,
                "gmb_dist_m":     0,
            },
        })

    print(f"  {len(buildings)} buildings with sufficient roof area (>= {sector_cfg['min_roof']} m²)")
    return buildings


def get_osm_building_at_point(lat: float, lon: float, radius_m: float = 60) -> Optional[dict]:
    """
    Find the OSM building polygon that contains a given lat/lon point.
    Returns {"area_m2": float, "nodes": list[dict]} or None.
    """
    query = f"""
[out:json][timeout:45];
(
  way(around:{radius_m},{lat},{lon})["building"];
);
out geom tags;
"""
    try:
        r = requests.post(
            OVPASS_API_URL,
            data={"data": query},
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent":   "Lighthief-Solar-Sweep/1.0 (alex@lighthief.cy)",
                "Accept":       "application/json",
            },
            timeout=30,
        )
        r.raise_for_status()
        elements = r.json().get("elements", [])
        if not elements:
            return None

        # Strategy: take the building whose centroid is CLOSEST to the query point,
        # within 150m. This keeps the polygon on-screen (image is centred on the Places pin).
        best, best_dist = None, 9999.0
        for el in elements:
            geom = el.get("geometry", [])
            if not geom:
                continue
            c_lat = sum(n["lat"] for n in geom) / len(geom)
            c_lon = sum(n["lon"] for n in geom) / len(geom)
            d = math.hypot((c_lat - lat) * 111_000,
                           (c_lon - lon) * 111_000 * math.cos(math.radians(lat)))
            if d < best_dist:
                best_dist = d
                best = el

        # Reject if centroid is too far — polygon would project mostly off-screen
        if not best or best_dist > 150:
            return None

        area = estimate_area_from_nodes(best)
        if area < 20:
            area = 500.0  # fallback

        return {"area_m2": area, "nodes": best.get("geometry", [])}

    except Exception as exc:
        print(f"    OSM building lookup error: {exc}")
        return None


# ── OpenStreetMap Building Discovery ──────────────────────────────────────────

def fetch_osm_buildings(south: float, west: float, north: float, east: float) -> list[dict]:
    """
    Query Overpass API for warehouse + industrial buildings in bounding box.
    Returns list of dicts with: name, lat, lon, roof_area_m2, tags.
    For large bboxes the query is split into four quadrants to avoid timeouts.
    """
    bbox_area_deg2 = (north - south) * (east - west)
    if bbox_area_deg2 > 0.01:  # ~10km × 10km: split into quadrants
        mid_lat = (south + north) / 2
        mid_lon = (west + east) / 2
        quadrants = [
            (south, west, mid_lat, mid_lon),
            (south, mid_lon, mid_lat, east),
            (mid_lat, west, north, mid_lon),
            (mid_lat, mid_lon, north, east),
        ]
        all_buildings: list[dict] = []
        seen_ids: set = set()
        for q in quadrants:
            q_buildings = _query_overpass_bbox(*q)
            for b in q_buildings:
                key = f"{b['lat']:.5f},{b['lon']:.5f}"
                if key not in seen_ids:
                    seen_ids.add(key)
                    all_buildings.append(b)
        print(f"  {len(all_buildings)} unique buildings from 4 quadrant queries")
        return all_buildings
    return _query_overpass_bbox(south, west, north, east)


def _query_overpass_bbox(south: float, west: float, north: float, east: float) -> list[dict]:
    """Single Overpass API call for a bounding box."""
    bbox = f"{south},{west},{north},{east}"
    query = f"""
[out:json][timeout:90];
(
  way["building"="warehouse"]({bbox});
  way["building"="industrial"]({bbox});
  way["building"="storage_tank"]({bbox});
  way["landuse"="industrial"]["building"]({bbox});
);
out center geom tags;
"""
    print(f"  Querying Overpass API for bbox {bbox}...")
    try:
        r = requests.post(
            OVPASS_API_URL,
            data={"data": query},
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Lighthief-Solar-Sweep/1.0 (alex@lighthief.cy)",
                "Accept": "application/json",
            },
            timeout=120,
        )
        r.raise_for_status()
    except requests.exceptions.Timeout:
        print(f"  WARNING: Overpass timeout for {bbox} - skipping quadrant")
        return []
    except requests.exceptions.HTTPError as exc:
        print(f"  WARNING: Overpass HTTP error {exc} - skipping quadrant")
        return []
    elements = r.json().get("elements", [])
    print(f"  Found {len(elements)} raw OSM elements")

    buildings = []
    for el in elements:
        # Try center key first; fall back to mean of geometry nodes; else node lat/lon
        center = el.get("center", {})
        geom   = el.get("geometry", [])
        if center.get("lat"):
            lat, lon = center["lat"], center["lon"]
        elif geom:
            lat = sum(n["lat"] for n in geom) / len(geom)
            lon = sum(n["lon"] for n in geom) / len(geom)
        elif el.get("lat"):
            lat, lon = el["lat"], el["lon"]
        else:
            continue

        tags = el.get("tags", {})
        name = (tags.get("name")
                or tags.get("operator")
                or tags.get("brand")
                or f"Building at {lat:.4f},{lon:.4f}")

        # Estimate roof area from node geometry if available (shoelace formula)
        geo_area = estimate_area_from_nodes(el)
        tag_area = estimate_area_from_tags(tags)
        # Use geometric area if > 20 m² (plausible result); else fall back to tag/default
        roof_area = geo_area if geo_area > 20 else tag_area

        if roof_area < MIN_ROOF_AREA_M2:
            continue

        buildings.append({
            "name":         name,
            "lat":          lat,
            "lon":          lon,
            "roof_area_m2": roof_area,
            "tags":         tags,
            "geom_nodes":   geom,   # raw polygon nodes for pixel projection
            "website":      tags.get("website") or tags.get("contact:website") or "",
            "email":        tags.get("email") or tags.get("contact:email") or "",
            "phone":        tags.get("phone") or tags.get("contact:phone") or "",
            "addr":         format_osm_address(tags),
        })

    return buildings


def estimate_area_from_nodes(element: dict) -> float:
    """Attempt to compute polygon area via shoelace; returns 0 if nodes unavailable."""
    nodes = element.get("geometry", [])
    if len(nodes) < 3:
        return 0.0
    # Convert lat/lon degrees to approximate metres relative to centroid
    lats = [n["lat"] for n in nodes]
    lons = [n["lon"] for n in nodes]
    c_lat = sum(lats) / len(lats)
    xs = [(lon - lons[0]) * 111_000 * math.cos(math.radians(c_lat)) for lon in lons]
    ys = [(lat - lats[0]) * 111_000 for lat in lats]
    n = len(xs)
    area = abs(sum(xs[i] * ys[(i+1) % n] - xs[(i+1) % n] * ys[i] for i in range(n))) / 2
    return area


def estimate_area_from_tags(tags: dict) -> float:
    """Fall back to OSM area tag or a conservative 500 m² default."""
    raw = tags.get("area") or tags.get("building:area") or ""
    try:
        return float(raw)
    except (ValueError, TypeError):
        return 500.0  # conservative default for untagged warehouses


def format_osm_address(tags: dict) -> str:
    parts = [
        tags.get("addr:housenumber", ""),
        tags.get("addr:street", ""),
        tags.get("addr:city", ""),
        tags.get("addr:postcode", ""),
    ]
    return ", ".join(p for p in parts if p) or "Cyprus"

# ── PVGIS Solar Yield ─────────────────────────────────────────────────────────

def get_pvgis_yield(lat: float, lon: float, roof_area_m2: float) -> dict:
    """
    Call the EU PVGIS API (free, no key) and return solar calculations.
    """
    usable_m2   = roof_area_m2 * ROOF_UTIL_FACTOR
    panel_count = max(1, int(usable_m2 / PANEL_AREA_M2))
    peak_kw     = round(panel_count * PANEL_WATTS / 1000, 1)

    try:
        r = requests.get(PVGIS_API_URL, params={
            "lat":          round(lat, 4),
            "lon":          round(lon, 4),
            "peakpower":    peak_kw,
            "loss":         SYSTEM_LOSS_PCT,
            "outputformat": "json",
            "browser":      0,
        }, timeout=20)
        r.raise_for_status()
        data = r.json()
        annual_kwh = data["outputs"]["totals"]["fixed"]["E_y"]
    except Exception as exc:
        print(f"    PVGIS API error: {exc} — using Cyprus irradiance fallback")
        # Cyprus baseline: 1,850 kWh/kWp/year
        annual_kwh = peak_kw * 1_850 * (1 - SYSTEM_LOSS_PCT / 100)

    annual_kwh   = round(annual_kwh)
    savings_eur  = round(annual_kwh * EAC_RATE_EUR_KWH)
    system_cost  = round(peak_kw * EAC_SYSTEM_COST_EUR_KWP)
    payback_yrs  = round(system_cost / savings_eur, 1) if savings_eur else 99.0
    co2_tonnes   = round(annual_kwh * CO2_FACTOR_KG_KWH / 1000, 1)

    return {
        "panel_count":  panel_count,
        "peak_kw":      peak_kw,
        "annual_kwh":   annual_kwh,
        "savings_eur":  savings_eur,
        "system_cost":  system_cost,
        "payback_yrs":  payback_yrs,
        "co2_tonnes":   co2_tonnes,
    }

# ── Roof Image with Panel Overlay ─────────────────────────────────────────────

IMG_W, IMG_H = 800, 520   # satellite image dimensions
IMG_ZOOM     = 18          # zoom 18 gives ~0.6 m/px in Cyprus — building visible with context

def _mercator_to_px(lat: float, lon: float,
                    center_lat: float, center_lon: float,
                    zoom: int, img_w: int, img_h: int) -> tuple[float, float]:
    """Convert a lat/lon to pixel position within a Mapbox static image."""
    scale = 256 * (2 ** zoom)

    def lon_to_x(lo: float) -> float:
        return (lo + 180) / 360 * scale

    def lat_to_y(la: float) -> float:
        la_r = math.radians(la)
        return (1 - math.log(math.tan(la_r) + 1 / math.cos(la_r)) / math.pi) / 2 * scale

    cx = lon_to_x(center_lon)
    cy = lat_to_y(center_lat)
    px = (lon_to_x(lon) - cx) + img_w / 2
    py = (lat_to_y(lat) - cy) + img_h / 2
    return px, py


def _point_in_polygon(x: float, y: float, polygon: list[tuple]) -> bool:
    """Ray-casting algorithm — True if (x,y) is inside the polygon."""
    n = len(polygon)
    inside = False
    px, py = x, y
    j = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        if ((yi > py) != (yj > py)) and (px < (xj - xi) * (py - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside


def _is_roof_pixel(img_rgb, x: int, y: int) -> bool:
    """
    Return True if the pixel at (x, y) looks like roofing material
    (concrete, metal, tile, asphalt) rather than ground, vegetation or shadow.

    Excluded:
      - Vegetation: strong green bias  (g > r+18 and g > b+8)
      - Deep shadow / tree canopy:     max channel < 45
      - Bare soil / sand:              r > g+30 and r > b+30 and g < 160  (very orange-brown)
      - Very saturated red (terracotta ground, not roof): r > 180 and r > g*1.6

    Accepted: anything else — white concrete, grey metal, dark bitumen, light tiles
    """
    iw, ih = img_rgb.size
    x, y = max(0, min(iw - 1, int(x))), max(0, min(ih - 1, int(y)))
    r, g, b = img_rgb.getpixel((x, y))[:3]

    # Vegetation
    if g > r + 18 and g > b + 8:
        return False
    # Shadow / tree canopy (too dark)
    if max(r, g, b) < 45:
        return False
    # Very orange-brown bare soil / dirt road
    if r > g + 30 and r > b + 30 and g < 160:
        return False
    # Saturated terracotta / red-tile ground areas
    if r > 180 and g < 110 and b < 110:
        return False
    return True


def build_roof_image(lat: float, lon: float, panel_count: int,
                     building_name: str, geom_nodes: list[dict] = None) -> tuple[Optional[bytes], dict]:
    """
    Fetch Mapbox satellite image, detect existing PV, then draw proposed panels.
    Returns (png_bytes, pv_info_dict).
    """
    if not MAPBOX_TOKEN:
        return None, {"pv_status": "none", "pv_coverage": 0.0}

    img_url = (
        f"{MAPBOX_STATIC_URL}"
        f"/{lon},{lat},{IMG_ZOOM},0"
        f"/{IMG_W}x{IMG_H}"
        f"?access_token={MAPBOX_TOKEN}"
    )

    try:
        resp = requests.get(img_url, timeout=20)
        resp.raise_for_status()
        img = Image.open(io.BytesIO(resp.content)).convert("RGBA")
    except Exception as exc:
        print(f"    Satellite image fetch failed: {exc}")
        return None, {"pv_status": "none", "pv_coverage": 0.0}

    draw = ImageDraw.Draw(img)

    # ── Build polygon in pixel space from OSM geometry nodes ──────────────────
    poly_px: list[tuple] = []
    if geom_nodes and len(geom_nodes) >= 3:
        for node in geom_nodes:
            px, py = _mercator_to_px(
                node["lat"], node["lon"], lat, lon, IMG_ZOOM, IMG_W, IMG_H
            )
            poly_px.append((px, py))

    # ── Detect existing PV BEFORE drawing new panels ──────────────────────────
    pv_info = detect_existing_pv(img, poly_px)

    # ── Panel layout ──────────────────────────────────────────────────────────
    # At zoom 18 / ~0.6 m/px: a 500W panel (2.0 × 1.0 m) ≈ 3.3 × 1.7 px
    # Scale up for legibility: draw each panel as 14 × 8 px with 2 px gap
    pw, ph   = 14, 8
    gap_x, gap_y = 2, 2

    # Pre-convert to RGB for pixel sampling
    img_rgb_sample = img.convert("RGB")

    if poly_px:
        # Inset polygon by INSET pixels to keep panels away from roof edges/walls
        INSET = 6
        xs = [p[0] for p in poly_px]
        ys = [p[1] for p in poly_px]
        cx_poly = sum(xs) / len(xs)
        cy_poly = sum(ys) / len(ys)
        inset_poly = [
            (px + (cx_poly - px) * INSET / max(1, math.hypot(px - cx_poly, py - cy_poly)),
             py + (cy_poly - py) * INSET / max(1, math.hypot(px - cx_poly, py - cy_poly)))
            for px, py in poly_px
        ]

        bb_x0 = min(p[0] for p in inset_poly)
        bb_y0 = min(p[1] for p in inset_poly)
        bb_x1 = max(p[0] for p in inset_poly)
        bb_y1 = max(p[1] for p in inset_poly)

        # Draw roof outline on original polygon (gold, 1px)
        draw.polygon(poly_px, outline=(201, 164, 50, 230))

        # Fill grid within inset polygon — pixel validity check prevents
        # panels landing on courtyards, vegetation, shadow or bare ground
        drawn = 0
        y = bb_y0 + gap_y
        while y + ph <= bb_y1 and drawn < panel_count:
            x = bb_x0 + gap_x
            while x + pw <= bb_x1 and drawn < panel_count:
                cx_panel = x + pw / 2
                cy_panel = y + ph / 2
                if (_point_in_polygon(cx_panel, cy_panel, inset_poly)
                        and _is_roof_pixel(img_rgb_sample, cx_panel, cy_panel)):
                    draw.rectangle(
                        [x, y, x + pw - 1, y + ph - 1],
                        fill=PANEL_FILL, outline=PANEL_BORDER, width=1
                    )
                    drawn += 1
                x += pw + gap_x
            y += ph + gap_y
    else:
        # Fallback: centred grid with pixel validity check
        cols = 12
        rows = max(1, math.ceil(panel_count / cols))
        grid_w = cols * (pw + gap_x) - gap_x
        grid_h = rows * (ph + gap_y) - gap_y
        x0 = (IMG_W - grid_w) // 2
        y0 = max(20, (IMG_H - grid_h) // 2 - 30)
        drawn = 0
        for row in range(rows):
            for col in range(cols):
                if drawn >= panel_count:
                    break
                cx_panel = x0 + col * (pw + gap_x) + pw / 2
                cy_panel = y0 + row * (ph + gap_y) + ph / 2
                if _is_roof_pixel(img_rgb_sample, cx_panel, cy_panel):
                    draw.rectangle(
                        [x0 + col * (pw + gap_x), y0 + row * (ph + gap_y),
                         x0 + col * (pw + gap_x) + pw - 1,
                         y0 + row * (ph + gap_y) + ph - 1],
                        fill=PANEL_FILL, outline=PANEL_BORDER, width=1
                    )
                    drawn += 1

    draw.text((8, IMG_H - 18), f"Lighthief  |  lighthief.cy",
              fill=(255, 255, 255, 200))

    buf = io.BytesIO()
    img.convert("RGB").save(buf, format="PNG", optimize=True)
    pv_info["panels_drawn"] = drawn
    return buf.getvalue(), pv_info


def png_to_base64(png_bytes: bytes) -> str:
    return base64.b64encode(png_bytes).decode("ascii")


def detect_existing_pv(img_rgba: Image.Image, poly_px: list[tuple]) -> dict:
    """
    Analyse pixel colours inside the building polygon to detect existing solar panels.

    Solar panels in Mapbox satellite imagery appear as:
      - Dark navy/blue-grey  (R<110, G<110, B<130, and B somewhat >= R and G)
      - Very dark near-black (R<60,  G<60,  B<70)  — thin-film / aged panels

    Returns dict:
      pv_status   : "none" | "partial" | "likely" | "confirmed"
      pv_coverage : float 0-1 (fraction of roof pixels that look like panels)
      pv_pixels   : int
      roof_pixels : int
    """
    if len(poly_px) < 3:
        return {"pv_status": "none", "pv_coverage": 0.0, "pv_pixels": 0, "roof_pixels": 0}

    # Create a binary mask the same size as the image
    iw, ih = img_rgba.size
    mask = Image.new("L", (iw, ih), 0)
    ImageDraw.Draw(mask).polygon(poly_px, fill=255)

    img_rgb = img_rgba.convert("RGB")
    pixels  = img_rgb.load()
    mask_px = mask.load()

    roof_count  = 0
    panel_count = 0

    # Bounding box of polygon to avoid scanning the entire image
    xs = [p[0] for p in poly_px]
    ys = [p[1] for p in poly_px]
    x0, x1 = max(0, int(min(xs))), min(iw - 1, int(max(xs)))
    y0, y1 = max(0, int(min(ys))), min(ih - 1, int(max(ys)))

    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            if mask_px[x, y] == 0:
                continue
            roof_count += 1
            r, g, b = pixels[x, y]
            # Dark solar-panel signature:
            #   1. Overall dark  (max channel < 110)
            #   2. Blue-leaning or neutral  (b >= r - 10)
            #   3. Not reddish rooftop material
            if (max(r, g, b) < 115
                    and b >= r - 15
                    and not (r > 100 and r > b + 20)):
                panel_count += 1

    coverage = panel_count / roof_count if roof_count else 0.0

    if coverage >= 0.30:
        status = "confirmed"
    elif coverage >= 0.15:
        status = "likely"
    elif coverage >= 0.06:
        status = "partial"
    else:
        status = "none"

    return {
        "pv_status":   status,
        "pv_coverage": round(coverage, 3),
        "pv_pixels":   panel_count,
        "roof_pixels": roof_count,
    }

# ── Google Places Lookup ──────────────────────────────────────────────────────

PLACES_NEARBY_URL = "https://places.googleapis.com/v1/places:searchNearby"
GOOGLE_MAPS_LINK  = "https://www.google.com/maps?q={lat},{lon}"

def lookup_google_places(lat: float, lon: float) -> dict:
    """
    Query Google Places API (New) Nearby Search at the building centroid.
    Returns enriched dict or empty dict if nothing found / no key.

    Returned keys: name, phone, website, gmaps_url, gmb_found, place_id, google_types
    """
    gmaps_url = GOOGLE_MAPS_LINK.format(lat=round(lat, 6), lon=round(lon, 6))

    if not GOOGLE_PLACES_KEY:
        return {"gmaps_url": gmaps_url, "gmb_found": False}

    try:
        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
            # Only request fields we need — keeps billing at Basic tier
            "X-Goog-FieldMask": (
                "places.displayName,places.nationalPhoneNumber,"
                "places.websiteUri,places.id,places.types,"
                "places.formattedAddress,places.googleMapsUri,places.location"
            ),
        }

        def _nearby_search(radius_m: float) -> list:
            r = requests.post(
                PLACES_NEARBY_URL,
                headers=headers,
                json={
                    "maxResultCount": 3,
                    "locationRestriction": {
                        "circle": {
                            "center": {"latitude": lat, "longitude": lon},
                            "radius": radius_m,
                        }
                    },
                },
                timeout=10,
            )
            r.raise_for_status()
            return r.json().get("places", [])

        def _place_distance(p: dict) -> float:
            """Distance in metres between Place pin and building centroid."""
            loc = p.get("location", {})
            plat = loc.get("latitude")
            plon = loc.get("longitude")
            if plat is None or plon is None:
                return 9999
            dlat = (plat - lat) * 111_000
            dlon = (plon - lon) * 111_000 * math.cos(math.radians(lat))
            return math.hypot(dlat, dlon)

        # Confidence tiers:  HIGH ≤50m  |  MEDIUM 51–100m  |  REJECTED >100m
        HIGH_M   = 50
        MEDIUM_M = 100

        best_place = None
        best_dist  = 9999

        for radius in [50, 100]:
            for p in _nearby_search(radius):
                d = _place_distance(p)
                if d < best_dist:
                    best_dist  = d
                    best_place = p
            if best_place and best_dist <= HIGH_M:
                break

        if not best_place or best_dist > MEDIUM_M:
            return {
                "gmaps_url":  gmaps_url,
                "gmb_found":  False,
                "gmb_dist_m": round(best_dist) if best_place else None,
            }

        p = best_place
        confidence = "HIGH" if best_dist <= HIGH_M else "MEDIUM"
        return {
            "gmb_found":    True,
            "gmb_confidence": confidence,
            "gmb_name":     p.get("displayName", {}).get("text", ""),
            "phone":        p.get("nationalPhoneNumber", ""),
            "website":      p.get("websiteUri", ""),
            "gmaps_url":    p.get("googleMapsUri", gmaps_url),
            "place_id":     p.get("id", ""),
            "google_types": ", ".join(p.get("types", [])),
            "gmb_address":  p.get("formattedAddress", ""),
            "gmb_dist_m":   round(best_dist),
        }

    except Exception as exc:
        print(f"    Places API error: {exc}")
        return {"gmaps_url": gmaps_url, "gmb_found": False}


# ── Contact Extraction ────────────────────────────────────────────────────────

def extract_email(building: dict) -> Optional[str]:
    """
    Try to find a contact email using:
    1. OSM tag
    2. Website scrape (mailto: links, regex)
    3. Hunter.io domain search
    """
    # 1. OSM tag
    if building.get("email"):
        return building["email"].strip()

    # 2. Scrape website
    website = building.get("website", "").strip()
    if website:
        email = scrape_email_from_website(website)
        if email:
            return email

    # 3. Hunter.io fallback
    if HUNTER_API_KEY and website:
        domain = extract_domain(website)
        if domain:
            email = hunter_domain_search(domain)
            if email:
                return email

    return None


def scrape_email_from_website(url: str) -> Optional[str]:
    if not url.startswith("http"):
        url = "https://" + url
    try:
        resp = requests.get(url, timeout=8, allow_redirects=True,
                            headers={"User-Agent": "Mozilla/5.0"})
        html = resp.text
    except Exception:
        return None

    # mailto: links first (most reliable)
    soup = BeautifulSoup(html, "html.parser")
    for link in soup.find_all("a", href=True):
        href = link["href"]
        if href.startswith("mailto:"):
            addr = href[7:].split("?")[0].strip()
            if "@" in addr and is_valid_email(addr):
                return addr

    # Regex fallback on full page text
    matches = re.findall(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}', html)
    for m in matches:
        if is_valid_email(m) and not m.endswith((".png", ".jpg", ".svg")):
            return m.lower()
    return None


def is_valid_email(email: str) -> bool:
    skip = {"example.com", "sentry.io", "wixpress.com", "schema.org", "w3.org"}
    domain = email.split("@")[-1].lower()
    return "." in domain and domain not in skip and len(email) < 80


def extract_domain(url: str) -> str:
    try:
        parsed = urllib.parse.urlparse(url if url.startswith("http") else "https://" + url)
        return parsed.netloc.lstrip("www.")
    except Exception:
        return ""


def hunter_domain_search(domain: str) -> Optional[str]:
    try:
        r = requests.get("https://api.hunter.io/v2/domain-search", params={
            "domain":  domain,
            "api_key": HUNTER_API_KEY,
            "limit":   1,
        }, timeout=10)
        data = r.json().get("data", {})
        emails = data.get("emails", [])
        if emails:
            return emails[0]["value"]
    except Exception:
        pass
    return None

# ── Email Rendering & Sending ─────────────────────────────────────────────────

def render_email(building: dict, solar: dict, image_b64: Optional[str],
                 pv_status: str = "none") -> str:
    """Inject all variables into the HTML template."""
    template = TEMPLATE_PATH.read_text(encoding="utf-8")

    has_pv = pv_status in ("partial", "likely", "confirmed")

    # Adjust headline and body for buildings that already have PV
    if has_pv:
        headline = (f"Your site could generate an additional<br />"
                    f"&#8364;{solar['savings_eur']:,} per year &mdash; plus battery storage savings")
        why_solar = (
            "You've already made the smart move with solar. Now is the ideal time to consider "
            "<strong>battery energy storage (BESS)</strong> to capture surplus generation, "
            "reduce peak demand charges, and maximise self-consumption — especially with "
            "EAC's evolving net-billing tariffs. There is also likely additional unused roof "
            "area that could support a system expansion."
        )
        next_steps = (
            "We offer a <strong>free, no-obligation BESS and expansion assessment</strong> — "
            "we'll review your existing system, model battery sizing, and identify available "
            "roof space for additional panels. No commitment required."
        )
        cta_text = "Book Free BESS & Expansion Assessment"
    else:
        headline = "Your warehouse could generate<br />&#8364;{{SAVINGS_EUR}} per year in electricity savings"
        why_solar = (
            "EAC electricity prices in Cyprus have risen significantly and remain among the "
            "highest in the EU for commercial consumers. A rooftop PV system under the "
            "net-billing scheme allows you to offset consumption directly, with surplus "
            "exported to the grid at a guaranteed rate."
        )
        next_steps = (
            "We offer a <strong>free, no-obligation on-site assessment</strong> that will "
            "confirm exact panel placement, shading analysis, and a detailed financial model "
            "tailored to your actual electricity bill. There is no commitment required."
        )
        cta_text = "Book Free Site Assessment"

    img_src = "cid:roof@lighthief"  # CID reference — image sent as inline attachment

    unsub_mailto = (
        f"mailto:{SENDER_EMAIL}"
        f"?subject=Unsubscribe%20-%20{urllib.parse.quote(building['name'])}"
    )

    replacements = {
        "{{BUILDING_NAME}}":      building["name"],
        "{{ADDRESS}}":            building["addr"] or building["name"],
        "{{PEAK_KW}}":            str(solar["peak_kw"]),
        "{{PANEL_COUNT}}":        f"{solar['panel_count']:,}",
        "{{ANNUAL_KWH}}":         f"{solar['annual_kwh']:,}",
        "{{SAVINGS_EUR}}":        f"{solar['savings_eur']:,}",
        "{{PAYBACK_YEARS}}":      str(solar["payback_yrs"]),
        "{{CO2_TONNES}}":         str(solar["co2_tonnes"]),
        "{{ROOF_AREA_M2}}":       f"{int(building['roof_area_m2']):,}",
        "{{ROOF_IMAGE_BASE64}}":  img_src,
        "{{SENDER_NAME}}":        SENDER_NAME,
        "{{SENDER_TITLE}}":       SENDER_TITLE,
        "{{SENDER_EMAIL}}":       SENDER_EMAIL,
        "{{SENDER_PHONE}}":       SENDER_PHONE,
        "{{UNSUBSCRIBE_MAILTO}}": unsub_mailto,
        "{{YEAR}}":               str(date.today().year),
        "{{HEADLINE}}":           headline,
        "{{WHY_SOLAR_BODY}}":     why_solar,
        "{{NEXT_STEPS_BODY}}":    next_steps,
        "{{CTA_TEXT}}":           cta_text,
    }
    for placeholder, value in replacements.items():
        template = template.replace(placeholder, value)
    return template


def send_email(to_email: str, building: dict, solar: dict,
               image_bytes: Optional[bytes], pv_status: str = "none") -> bool:
    """Send offer email via Resend. Adjusts subject/messaging for buildings with existing PV."""
    image_b64 = png_to_base64(image_bytes) if image_bytes else None
    html_body = render_email(building, solar, image_b64, pv_status=pv_status)

    has_pv = pv_status in ("partial", "likely", "confirmed")
    if has_pv:
        subject = (f"Expand your solar + add BESS storage - {building['name']} "
                   f"(EUR {solar['savings_eur']:,}/yr additional potential)")
    else:
        subject = (f"Solar assessment for your warehouse in Cyprus - "
                   f"EUR {solar['savings_eur']:,}/yr potential")

    payload = {
        "from":     "Lighthief Cyprus <noreply@solarfarms.cy>",
        "reply_to": SENDER_EMAIL,
        "to":       [to_email],
        "subject":  subject,
        "html":     html_body,
        "headers":  {
            "List-Unsubscribe": (
                f"<mailto:{SENDER_EMAIL}"
                f"?subject=Unsubscribe%20-%20{urllib.parse.quote(building['name'])}>"
            ),
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
    }

    # CID inline attachment — referenced in HTML as cid:roof@lighthief
    # This renders correctly in Gmail, Apple Mail and Outlook (unlike base64 data URIs)
    if image_bytes:
        payload["attachments"] = [{
            "filename":    "solar-roof-assessment.png",
            "content":     png_to_base64(image_bytes),
            "content_type":"image/png",
            "content_id":  "roof@lighthief",
            "inline":      True,
        }]

    try:
        r = requests.post(RESEND_URL,
            headers={"Authorization": f"Bearer {RESEND_API_KEY}",
                     "Content-Type": "application/json"},
            json=payload, timeout=30)
        r.raise_for_status()
        print(f"    OK  Email sent to {to_email}")
        return True
    except Exception as exc:
        print(f"    ERR Email failed ({to_email}): {exc}")
        return False

# ── CSV Report ────────────────────────────────────────────────────────────────

def write_csv_report(results: list[dict], path: Path):
    if not results:
        return
    fields = [
        "send", "name", "lat", "lon", "addr", "roof_area_m2",
        "peak_kw", "panel_count", "annual_kwh", "savings_eur",
        "payback_yrs", "co2_tonnes", "system_cost",
        "pv_status", "pv_coverage",
        "email_found", "email_sent",
        "gmaps_url", "gmb_found", "gmb_confidence", "gmb_name", "gmb_phone", "gmb_website",
        "gmb_address", "google_types", "place_id", "website", "phone",
    ]
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        # Strip non-serialisable fields before writing
        for row in results:
            row.pop("geom_nodes", None)
            row.pop("tags", None)
            # Pre-fill send=YES for rows with confirmed GMB identity + email
            row["send"] = "YES" if (row.get("gmb_found") and row.get("email_found")) else ""
        w.writerows(results)
    print(f"\nCSV saved: {path}")


def write_html_review(results: list[dict], html_path: Path, images_dir: Path):
    """
    Generate a self-contained HTML review dashboard.
    Each card shows: satellite roof image, business name, GMB confidence,
    savings figures, email found, and a Google Maps verification link.
    User reviews this page, then edits the CSV to mark send=YES before live run.
    """
    cards = []
    for i, r in enumerate(results, 1):
        name      = r.get("name", "Unknown")
        addr      = r.get("addr", "")
        savings   = r.get("savings_eur", 0)
        peak_kw   = r.get("peak_kw", 0)
        kwh       = r.get("annual_kwh", 0)
        payback   = r.get("payback_yrs", 0)
        roof_m2   = int(r.get("roof_area_m2", 0))
        email     = r.get("email_found", "")
        phone     = r.get("gmb_phone", "") or r.get("phone", "")
        gmaps_url = r.get("gmaps_url", "#")
        gmb_found = r.get("gmb_found", False)
        gmb_dist  = r.get("gmb_dist_m", "")
        website   = r.get("gmb_website", "") or r.get("website", "")
        pv_status   = r.get("pv_status", "none")
        pv_coverage = float(r.get("pv_coverage", 0.0))

        # Embed roof image — use stored filename from run_sweep (globally unique)
        img_filename_stored = r.get("img_filename", "")
        safe_name = re.sub(r'[\\/:*?"<>|()\']+', '', name)[:40].replace(' ', '_')
        # Try stored filename first, then fallback legacy pattern
        img_path = (images_dir / img_filename_stored
                    if img_filename_stored else
                    images_dir / f"roof_{safe_name}.png")
        # Also try older index-based naming as last resort
        if not img_path.exists():
            candidates = list(images_dir.glob(f"roof_*_{safe_name[:20]}*.png"))
            if candidates:
                img_path = candidates[0]
        if img_path.exists():
            img_b64 = base64.b64encode(img_path.read_bytes()).decode()
            img_tag = f'<img src="data:image/png;base64,{img_b64}" style="width:100%;border-radius:6px 6px 0 0;" />'
        else:
            img_tag = '<div style="height:140px;background:#0d1f35;border-radius:6px 6px 0 0;display:flex;align-items:center;justify-content:center;color:#C9A432;font-size:12px;">No image</div>'

        # PV badge
        pv_colours = {"confirmed": "#c0392b", "likely": "#e67e22", "partial": "#f39c12"}
        pv_labels  = {"confirmed": "PV Confirmed", "likely": "PV Likely", "partial": "PV Partial"}
        pv_badge   = (f'<span style="background:{pv_colours.get(pv_status,"#999")};color:#fff;'
                      f'font-size:10px;padding:2px 7px;border-radius:10px;font-weight:700;">'
                      f'{pv_labels.get(pv_status,"")} {int(pv_coverage*100)}%</span>'
                      if pv_status in pv_colours else "")

        if gmb_found:
            conf  = r.get("gmb_confidence", "MEDIUM")
            color = "#1e7e34" if conf == "HIGH" else "#856404"
            badge = f'<span style="background:{color};color:#fff;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:700;">{conf} {gmb_dist}m</span>'
        else:
            badge = '<span style="background:#6c757d;color:#fff;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:700;">Unverified</span>'

        email_html = (f'<a href="mailto:{email}" style="color:#C9A432;">{email}</a>'
                      if email else '<span style="color:#aaa;">Not found</span>')
        phone_html = f'<span style="color:#1A365D;font-weight:600;">{phone}</span>' if phone else '<span style="color:#aaa;">-</span>'
        web_row    = (f"<tr><td style='color:#888;padding:2px 0;'>Web</td>"
                      f"<td style='text-align:right;'><a href='{website}' style='color:#C9A432;font-size:11px;' target='_blank'>Visit</a></td></tr>"
                      if website else "")
        ready_btn  = (
            "<a href='#' style='flex:1;text-align:center;padding:7px;background:#C9A432;color:#1A365D;"
            "font-size:12px;font-weight:700;border-radius:4px;text-decoration:none;'>Ready to send</a>"
            if (gmb_found and email) else
            "<span style='flex:1;text-align:center;padding:7px;background:#f0f0f0;color:#999;"
            "font-size:12px;border-radius:4px;display:block;'>Needs review</span>"
        )

        cards.append(f"""
<div style="background:#fff;border-radius:8px;box-shadow:0 2px 12px rgba(26,54,93,.12);overflow:hidden;display:flex;flex-direction:column;">
  {img_tag}
  <div style="padding:12px 14px;flex:1;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">{badge}{pv_badge}<span style="font-size:11px;color:#888;">#{i}</span></div>
    <div style="font-size:14px;font-weight:700;color:#1A365D;line-height:1.3;margin-bottom:2px;">{name}</div>
    <div style="font-size:11px;color:#888;margin-bottom:8px;">{addr or 'Cyprus'}</div>
    <div style="font-size:20px;font-weight:700;color:#C9A432;margin-bottom:2px;">&#8364;{savings:,}/yr</div>
    <div style="font-size:11px;color:#666;margin-bottom:8px;">{peak_kw} kWp &middot; {kwh:,} kWh &middot; {payback}yr payback &middot; {roof_m2:,} m&#178;</div>
    <table style="width:100%;font-size:12px;border-collapse:collapse;">
      <tr><td style="color:#888;padding:2px 0;">Email</td><td style="text-align:right;">{email_html}</td></tr>
      <tr><td style="color:#888;padding:2px 0;">Phone</td><td style="text-align:right;">{phone_html}</td></tr>
      {web_row}
    </table>
  </div>
  <div style="padding:10px 14px;border-top:1px solid #eee;display:flex;gap:8px;">
    <a href="{gmaps_url}" target="_blank" style="flex:1;text-align:center;padding:7px;background:#1A365D;color:#fff;font-size:12px;font-weight:700;border-radius:4px;text-decoration:none;">Verify on Maps</a>
    {ready_btn}
  </div>
</div>""")

    ready   = sum(1 for r in results if r.get("gmb_found") and r.get("email_found"))
    unverif = len(results) - ready
    total_s = sum(r.get("savings_eur", 0) for r in results)
    ts      = datetime.now().strftime('%d %b %Y %H:%M')

    # Group cards by sector for the merged view
    from collections import defaultdict
    by_sector: dict = defaultdict(list)
    card_by_idx = {}
    for idx, (r, card) in enumerate(zip(results, cards)):
        sec = r.get("sector_description", r.get("sector", "Other"))
        by_sector[sec].append(card)

    # Build sector sections
    sections_html = ""
    sector_stats  = []
    for sec_name, sec_cards in by_sector.items():
        sec_ready = sum(1 for r in results
                        if r.get("sector_description", r.get("sector", "")) == sec_name
                        and r.get("gmb_found") and r.get("email_found"))
        sec_save  = sum(r.get("savings_eur", 0) for r in results
                        if r.get("sector_description", r.get("sector", "")) == sec_name)
        sector_stats.append(f'<div class="stat"><div class="stat-v">{len(sec_cards)}</div>'
                             f'<div class="stat-l">{sec_name}</div></div>')
        sections_html += f"""
<div style="padding:0 32px 8px;">
  <h2 style="font-size:16px;font-weight:700;color:#1A365D;border-bottom:2px solid #C9A432;
             padding-bottom:6px;margin:28px 0 16px;">
    {sec_name}
    <span style="font-size:13px;font-weight:400;color:#888;margin-left:10px;">
      {len(sec_cards)} buildings &middot; &#8364;{sec_save:,}/yr potential &middot;
      {sec_ready} auto-approved
    </span>
  </h2>
</div>
<div class="grid">{"".join(sec_cards)}</div>"""

    html = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<title>Lighthief Solar Prospect Review</title>
<style>
  body{{margin:0;padding:0;background:#F0F4F8;font-family:Arial,sans-serif;}}
  .header{{background:#1A365D;padding:24px 32px;}}
  .header h1{{color:#C9A432;font-size:20px;margin:0;}}
  .header p{{color:#9BB5D4;font-size:13px;margin:6px 0 0;}}
  .summary{{display:flex;gap:16px;padding:20px 32px;flex-wrap:wrap;}}
  .stat{{background:#fff;border-radius:8px;padding:14px 20px;min-width:130px;
         box-shadow:0 1px 6px rgba(0,0,0,.07);}}
  .stat-v{{font-size:22px;font-weight:700;color:#1A365D;}}
  .stat-l{{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-top:2px;}}
  .note{{background:#fff3cd;border-left:4px solid #C9A432;margin:0 32px 20px;
         padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;color:#555;line-height:1.7;}}
  .note strong{{color:#1A365D;}}
  .note code{{background:#f0f0f0;padding:1px 5px;border-radius:3px;font-size:12px;}}
  .grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;
         padding:0 32px 8px;}}
</style>
</head><body>
<div class="header">
  <h1>Solar Prospect Review &mdash; Lighthief Cyprus Ltd</h1>
  <p>Generated {ts} &middot; {len(results)} businesses &middot; {len(by_sector)} sectors</p>
</div>
<div class="summary">
  <div class="stat"><div class="stat-v">{len(results)}</div><div class="stat-l">Total</div></div>
  <div class="stat"><div class="stat-v" style="color:#1e7e34;">{ready}</div><div class="stat-l">Auto-approved</div></div>
  <div class="stat"><div class="stat-v" style="color:#856404;">{unverif}</div><div class="stat-l">Need review</div></div>
  <div class="stat"><div class="stat-v">&#8364;{total_s:,}</div><div class="stat-l">Total savings/yr</div></div>
  {"".join(sector_stats)}
</div>
<div class="note">
  <strong>3-step validation workflow:</strong><br/>
  1. Click <strong>Verify on Maps</strong> on each card &rarr; confirm satellite image matches the correct business<br/>
  2. Open the CSV in Excel &rarr; set <code>send=YES</code> for approved rows &rarr; fill in <code>email_found</code> where missing<br/>
  3. Run: <code>python scripts/solar-prospect-sweep.py --from-csv docs/solar-prospects/solar-sweep-XXXX.csv</code>
</div>
{sections_html}
<div style="height:40px;"></div>
</body></html>"""

    html_path.write_text(html, encoding="utf-8")
    print(f"Review dashboard: {html_path}")

# ── Main Pipeline ─────────────────────────────────────────────────────────────

def run_sweep(buildings: list[dict], limit: int, dry_run: bool,
              test_email: str = "", skip: int = 0) -> list[dict]:
    results = []
    target = buildings[skip:skip + limit]
    total = len(target)
    print(f"\nProcessing {total} buildings (dry_run={dry_run})\n{'-'*60}")

    for i, building in enumerate(target, 1):
        name = building["name"]
        lat, lon = building["lat"], building["lon"]
        roof_m2 = building["roof_area_m2"]
        print(f"[{i}/{total}] {name}")
        print(f"  lat={lat:.4f} lon={lon:.4f} roof={roof_m2:.0f}m²")

        # Solar calculation
        solar = get_pvgis_yield(lat, lon, roof_m2)
        print(f"  {solar['peak_kw']} kWp · {solar['annual_kwh']:,} kWh/yr · "
              f"€{solar['savings_eur']:,}/yr · {solar['payback_yrs']}yr payback")

        # Google Maps link + Places API enrichment
        # Skip the Places lookup if sector search already pre-filled GMB data
        if building.get("_gmb_prefilled"):
            places    = building.pop("_gmb_prefilled")
            gmaps_url = places.get("gmaps_url", f"https://www.google.com/maps?q={lat},{lon}")
        else:
            places    = lookup_google_places(lat, lon)
            gmaps_url = places.get("gmaps_url", f"https://www.google.com/maps?q={lat},{lon}")
        if places.get("gmb_found"):
            gmb_name = places.get("gmb_name", "")
            dist_m   = places.get("gmb_dist_m", "?")
            conf     = places.get("gmb_confidence", "MEDIUM")
            if gmb_name and name.startswith("Building at"):
                building["name"] = gmb_name
                name = gmb_name
            if places.get("phone") and not building.get("phone"):
                building["phone"] = places["phone"]
            if places.get("website") and not building.get("website"):
                building["website"] = places["website"]
            print(f"  GMB {conf} ({dist_m}m): {gmb_name} | {places.get('phone','no phone')} | {gmaps_url}")
        else:
            dist_m = places.get("gmb_dist_m")
            if dist_m:
                print(f"  GMB: nearest {dist_m}m away (too far, rejected) | {gmaps_url}")
            else:
                print(f"  GMB: no listing found | {gmaps_url}")

        # Satellite image + PV detection
        image_bytes, pv_info = build_roof_image(lat, lon, solar["panel_count"], name,
                                                building.get("geom_nodes", []))
        pv_status    = pv_info.get("pv_status", "none")
        pv_coverage  = pv_info.get("pv_coverage", 0.0)
        panels_drawn = pv_info.get("panels_drawn", solar["panel_count"])
        img_filename = ""

        if image_bytes:
            # Use name-based filename (no sector-local index) so the review HTML can find it
            safe_name    = re.sub(r'[\\/:*?"<>|()\']+', '', name)[:40].replace(' ', '_')
            img_filename = f"roof_{safe_name}.png"
            img_path     = OUTPUT_DIR / img_filename
            img_path.write_bytes(image_bytes)
            pv_label = f" [EXISTING PV ~{pv_coverage*100:.0f}%]" if pv_status != "none" else ""
            print(f"  Roof image saved: {img_filename}{pv_label}")

            # Recalculate solar stats based on actual drawn panel count if it differs
            # significantly (>20% less) — keeps badge numbers consistent with the image
            if panels_drawn > 0 and panels_drawn < solar["panel_count"] * 0.8:
                actual_kw  = round(panels_drawn * PANEL_WATTS / 1000, 1)
                ratio      = actual_kw / max(solar["peak_kw"], 0.001)
                solar = {**solar,
                         "panel_count": panels_drawn,
                         "peak_kw":     actual_kw,
                         "annual_kwh":  round(solar["annual_kwh"] * ratio),
                         "savings_eur": round(solar["savings_eur"] * ratio),
                         "system_cost": round(solar["system_cost"] * ratio),
                         "co2_tonnes":  round(solar["co2_tonnes"] * ratio, 1)}
        else:
            pv_status = "unknown"
            print("  (No satellite image — Mapbox token missing or request failed)")

        # Contact extraction (OSM tags → website scrape → Hunter.io)
        # Also try phone/website from Places API result above
        email = extract_email(building)
        print(f"  Contact email: {email or '(not found)'}")

        row = {
            **building,
            **solar,
            "email_found":    email or "",
            "email_sent":     False,
            "pv_status":      pv_status,
            "pv_coverage":    pv_coverage,
            "img_filename":   img_filename,
            "gmaps_url":      gmaps_url,
            "gmb_found":      places.get("gmb_found", False),
            "gmb_confidence": places.get("gmb_confidence", ""),
            "gmb_name":       places.get("gmb_name", ""),
            "gmb_phone":      places.get("phone", ""),
            "gmb_website":    places.get("website", ""),
            "gmb_address":    places.get("gmb_address", ""),
            "google_types":   places.get("google_types", ""),
            "place_id":       places.get("place_id", ""),
        }

        # Send email — choose subject/body based on pv_status
        effective_email = test_email or email
        if effective_email and not dry_run:
            sent = send_email(effective_email, building, solar, image_bytes,
                              pv_status=pv_status)
            row["email_sent"] = sent
            time.sleep(1.5)  # gentle rate limit
        elif dry_run and effective_email:
            print(f"  [DRY RUN] Would send to {effective_email}")

        results.append(row)
        print()

    return results


def main():
    parser = argparse.ArgumentParser(description="Lighthief Solar Prospect Sweep - Cyprus")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--city",      help="City name to geocode (e.g. 'Limassol')")
    group.add_argument("--bbox",      help="Bounding box south,west,north,east")
    group.add_argument("--test-point",help="Single lat,lon point for testing")
    group.add_argument("--from-csv",  help="Send emails to rows in CSV where send=YES (skips scan)")

    parser.add_argument("--sector",     type=str,   default="warehouse",
                        choices=list(SECTORS.keys()),
                        help=("Business sector to target. "
                              "warehouse=OSM-first (default). "
                              "All others use Google Places-first. "
                              f"Choices: {', '.join(SECTORS.keys())}"))
    parser.add_argument("--sectors",    type=str,   default="",
                        help=("Comma-separated sectors or group name to run in one pass. "
                              f"Groups: {', '.join(SECTOR_GROUPS.keys())}. "
                              "Example: --sectors winery,restaurant,clinic  "
                              "Overrides --sector when set."))
    parser.add_argument("--radius",     type=float, default=8_000)
    parser.add_argument("--limit",      type=int,   default=20)
    parser.add_argument("--skip",       type=int,   default=0)
    parser.add_argument("--min-roof",   type=float, default=MIN_ROOF_AREA_M2)
    parser.add_argument("--dry-run",    action="store_true")
    parser.add_argument("--test-email", type=str,   default="")
    args = parser.parse_args()

    print("=" * 60)
    print("  LIGHTHIEF - Solar Warehouse Prospecting Sweep")
    print(f"  {datetime.now().strftime('%d %b %Y %H:%M')} - Cyprus")
    print("=" * 60)

    # ── FROM-CSV MODE: send from a reviewed + edited CSV ──────────────────────
    if args.from_csv:
        csv_file = Path(args.from_csv)
        if not csv_file.exists():
            sys.exit(f"ERROR: CSV not found: {csv_file}")
        with open(csv_file, newline="", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        to_send = [r for r in rows if r.get("send", "").strip().upper() == "YES"]
        print(f"\nFrom-CSV mode: {len(to_send)} rows marked send=YES in {csv_file.name}")
        if not to_send:
            print("No rows marked send=YES. Edit the CSV and try again.")
            sys.exit(0)
        sent = 0
        for r in to_send:
            email = args.test_email or r.get("email_found", "").strip()
            if not email:
                print(f"  SKIP (no email): {r.get('name','?')}")
                continue
            building = {
                "name": r.get("name", ""),
                "addr": r.get("addr", ""),
                "roof_area_m2": float(r.get("roof_area_m2", 500)),
                "phone": r.get("gmb_phone") or r.get("phone", ""),
            }
            solar = {
                "peak_kw":     float(r.get("peak_kw", 0)),
                "panel_count": int(r.get("panel_count", 0)),
                "annual_kwh":  int(r.get("annual_kwh", 0)),
                "savings_eur": int(r.get("savings_eur", 0)),
                "payback_yrs": float(r.get("payback_yrs", 0)),
                "co2_tonnes":  float(r.get("co2_tonnes", 0)),
                "system_cost": int(r.get("system_cost", 0)),
            }
            # Reload roof image if it exists
            image_bytes = None
            safe_name = re.sub(r'[\\/:*?"<>|()\']+', '', building["name"])[:30].replace(' ', '_')
            for png in OUTPUT_DIR.glob(f"roof_*_{safe_name}.png"):
                image_bytes = png.read_bytes()
                break
            ok = send_email(email, building, solar, image_bytes)
            if ok:
                sent += 1
            time.sleep(1.5)
        print(f"\nSent {sent}/{len(to_send)} emails.")
        return

    print("=" * 60)
    print("  LIGHTHIEF - Solar Warehouse Prospecting Sweep")
    print(f"  {datetime.now().strftime('%d %b %Y %H:%M')} - Cyprus")
    print("=" * 60)

    # Determine bounding box
    if args.test_point:
        lat, lon = map(float, args.test_point.split(","))
        south, west, north, east = expand_bbox_by_radius(lat, lon, 200)
        args.limit = 1
        print(f"\nTest point: lat={lat}, lon={lon}")
    elif args.city:
        print(f"\nGeocoding '{args.city}'...")
        south, west, north, east = geocode_city(args.city)
        # Apply radius constraint around city centre
        c_lat = (south + north) / 2
        c_lon = (west + east) / 2
        south, west, north, east = expand_bbox_by_radius(c_lat, c_lon, args.radius)
        print(f"  Bounding box: {south:.4f},{west:.4f},{north:.4f},{east:.4f}")
    else:
        parts = [float(x) for x in args.bbox.split(",")]
        south, west, north, east = parts[0], parts[1], parts[2], parts[3]

    # Resolve sector list
    if args.sectors:
        raw = args.sectors.strip()
        if raw in SECTOR_GROUPS:
            sectors_to_run = SECTOR_GROUPS[raw]
        else:
            sectors_to_run = [s.strip() for s in raw.split(",") if s.strip() in SECTORS]
            unknown = [s.strip() for s in raw.split(",") if s.strip() not in SECTORS]
            if unknown:
                print(f"WARNING: Unknown sectors ignored: {unknown}")
    else:
        sectors_to_run = [args.sector]

    # Per-sector limit (divide overall --limit across sectors)
    limit_per_sector = max(1, args.limit // len(sectors_to_run))

    # ── Multi-sector fetch + sweep ─────────────────────────────────────────────
    all_results: list[dict] = []

    for sector in sectors_to_run:
        sector_cfg = SECTORS[sector]
        min_roof   = sector_cfg["min_roof"]
        print(f"\n{'='*60}")
        print(f"  SECTOR: {sector_cfg['description']}")
        print(f"{'='*60}")

        if sector_cfg["places_types"]:
            buildings = search_sector_by_places(sector, south, west, north, east,
                                                limit_per_sector)
        else:
            print("Fetching buildings from OpenStreetMap...")
            buildings = fetch_osm_buildings(south, west, north, east)
            before    = len(buildings)
            buildings = [b for b in buildings if b["roof_area_m2"] >= min_roof]
            print(f"  {len(buildings)} buildings >= {min_roof:.0f} m² (filtered from {before})")

        if not buildings:
            print(f"  No qualifying buildings found for sector {sector}.")
            continue

        buildings.sort(key=lambda b: b["roof_area_m2"], reverse=True)

        sector_results = run_sweep(buildings, limit_per_sector,
                                   args.dry_run, args.test_email, args.skip)

        # Tag each result with its sector for the merged HTML
        for r in sector_results:
            r["sector"]             = sector
            r["sector_description"] = sector_cfg["description"]

        all_results.extend(sector_results)
        time.sleep(2)  # brief pause between sector API calls

    results = all_results

    # Save CSV + HTML review (always, even on live run)
    ts       = datetime.now().strftime("%Y%m%d-%H%M")
    csv_path  = OUTPUT_DIR / f"solar-sweep-{ts}.csv"
    html_path = OUTPUT_DIR / f"solar-review-{ts}.html"
    write_csv_report(results, csv_path)
    write_html_review(results, html_path, OUTPUT_DIR)

    # Summary
    sent   = sum(1 for r in results if r.get("email_sent"))
    found  = sum(1 for r in results if r.get("email_found"))
    total_savings = sum(r.get("savings_eur", 0) for r in results)
    print("\n" + "=" * 60)
    print(f"  Buildings processed : {len(results)}")
    print(f"  Emails found        : {found}")
    print(f"  Emails sent         : {sent}")
    print(f"  Total savings pot.  : EUR {total_savings:,}/yr across all sites")
    print("=" * 60)
    print(f"\nReview dashboard : {html_path}")
    print(f"CSV (edit & mark): {csv_path}")


if __name__ == "__main__":
    main()
