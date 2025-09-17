#Pickle index save/load helpers
import pickle
import gzip
import os
from typing import Dict, Any, Optional

def save_index(idx: Dict[str, Any], path: str) -> bool:
    """
    Save a built index dict to compressed pickle.
    Tries to pickle the whole idx; if that fails, falls back to saving raw point lists only.
    """
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    try:
        with gzip.open(path, "wb") as f:
            pickle.dump({"version": 1, "type": "full", "idx": idx}, f, protocol=pickle.HIGHEST_PROTOCOL)
        return True
    except Exception:
        # fallback: save only raw points (plain python lists)
        try:
            raw = idx.get("raw", {})
            safe_raw = {k: [(float(p[0]), float(p[1])) for p in pts] for k, pts in raw.items()}
            with gzip.open(path, "wb") as f:
                pickle.dump({"version": 1, "type": "raw_only", "raw": safe_raw}, f, protocol=pickle.HIGHEST_PROTOCOL)
            return True
        except Exception:
            return False

def load_index(path: str, rebuild_if_needed: bool = True, build_kdtree_fn: Optional[callable] = None) -> Dict[str, Any]:
    """
    Load an index previously saved by save_index().
    Returns dict compatible with build_point_index output: {'tree':..., 'arr':..., 'raw':...}
    If file contains raw-only data and rebuild_if_needed=True and build_kdtree_fn provided,
    KD-trees/arrays will be rebuilt on load.
    """
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    with gzip.open(path, "rb") as f:
        obj = pickle.load(f)

    typ = obj.get("type")
    if typ == "full":
        idx = obj.get("idx", {})
        # ensure raw exists
        if not idx.get("raw"):
            raw = {}
            arrs = idx.get("arr", {})
            for k, arr in (arrs.items() if isinstance(arrs, dict) else []):
                try:
                    raw[k] = [(float(x[0]), float(x[1])) for x in arr.tolist()]
                except Exception:
                    raw[k] = idx.get("raw", {}).get(k, [])
            idx["raw"] = raw
        return idx

    if typ == "raw_only":
        raw = obj.get("raw", {})
        idx = {"tree": {}, "arr": {}, "raw": raw}
        if rebuild_if_needed and build_kdtree_fn is not None:
            for t, pts in raw.items():
                try:
                    tree, arr = build_kdtree_fn(pts)
                    idx["tree"][t] = tree
                    idx["arr"][t] = arr
                except Exception:
                    idx["tree"][t] = None
                    idx["arr"][t] = None
        return idx

    raise ValueError(f"Unknown index file type: {typ}")

# Example usage (commented; paste these where appropriate in your program):
#   idx = build_point_index(points_by_type)                 # build index (KD-trees + raw) once
#   save_index(idx, "verifix_index.pkl.gz")                 # save index to disk
#   idx_loaded = load_index("verifix_index.pkl.gz", rebuild_if_needed=True, build_kdtree_fn=build_kdtree_from_points)
# -----------------------------------------------------------------------------------------------

!pip install -q numpy scipy fastapi "uvicorn[standard]" pytest

#imports and core utilities
import json, math, sys, os
from typing import List, Tuple, Dict, Any, Optional

# Try imports for KD-tree
try:
    import numpy as np
    from scipy.spatial import cKDTree
    _HAVE_KD = True
    print("KD-tree support: ENABLED (numpy & scipy found)")
except Exception as e:
    np = None
    cKDTree = None
    _HAVE_KD = False
    print("KD-tree support: DISABLED (numpy/scipy not available) - falling back to brute-force")

def haversine(lat1, lon1, lat2, lon2):
    """Return distance in kilometers between two lat/lon points using Haversine."""
    R = 6371.0
    phi1 = math.radians(lat1); phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1); dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return 2 * R * math.asin(math.sqrt(a))

def load_geojson_points(path: str) -> List[Tuple[float,float]]:
    """Load Point features from a GeoJSON file and return list of (lat, lon) tuples."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            j = json.load(f)
    except Exception as e:
        print(f"[load_geojson_points] Warning: couldn't read {path}: {e}", file=sys.stderr)
        return []
    points = []
    if isinstance(j, dict):
        if j.get("type") == "FeatureCollection" and isinstance(j.get("features"), list):
            for feat in j["features"]:
                geom = feat.get("geometry")
                if not geom: continue
                if geom.get("type") == "Point" and isinstance(geom.get("coordinates"), list):
                    lon, lat = geom["coordinates"][:2]
                    points.append((lat, lon))
        elif j.get("type") == "Feature" and isinstance(j.get("geometry"), dict):
            geom = j["geometry"]
            if geom.get("type") == "Point" and isinstance(geom.get("coordinates"), list):
                lon, lat = geom["coordinates"][:2]
                points.append((lat, lon))
        elif j.get("type") == "Point" and isinstance(j.get("coordinates"), list):
            lon, lat = j["coordinates"][:2]
            points.append((lat, lon))
    return points

def nearest_distance_bruteforce(lat: float, lon: float, points: List[Tuple[float,float]]) -> float:
    """Return nearest distance in km using brute-force haversine; 9999 if no points."""
    if not points:
        return 9999.0
    return min(haversine(lat, lon, p[0], p[1]) for p in points)

#scoring core (uses index built above)
DEFAULT_PARAMS = {
    "close_km": 0.5,
    "near_km": 2.0,
    "impact_weights": {
        "hospital": {"close": 1.0, "near": 0.5},
        "school":   {"close": 0.8, "near": 0.3},
        "waterway": {"close": 0.5, "near": 0.2},
        "atm":      {"close": 0.1, "near": 0.05},
        "fuel":     {"close": 0.2, "near": 0.1},
    },
    "urgency_weights": {
        "fuel":     {"close": 0.7, "near": 0.3},
        "school":   {"close": 0.6, "near": 0.2},
        "hospital": {"close": 0.2, "near": 0.1},
        "waterway": {"close": 0.3, "near": 0.1},
        "atm":      {"close": 0.05,"near": 0.02},
    },
    "synergy": [
        (("fuel","school"), 0.5),
        (("fuel","hospital"), 0.3),
        (("waterway","school"), 0.25),
    ],
    "wA": 0.5,
    "wB": 0.5,
    "buckets": [1.0, 2.5, 4.0]
}

def compute_ab_severity(lat: float, lon: float, idx, params: Optional[Dict]=None) -> Dict[str,Any]:
    """Compute Impact A, Urgency B, severity 0..5 and level for one point using index."""
    if params is None: params = DEFAULT_PARAMS
    close_km = params["close_km"]; near_km = params["near_km"]
    impact_w = params["impact_weights"]; urgency_w = params["urgency_weights"]
    synergy = params.get("synergy", []); wA = params.get("wA", 0.5)

#write tiny sample GeoJSONs and create sample incidents
def write_demo_geojsons():
    sample_hospitals = {"type":"FeatureCollection","features":[
        {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[86.956092834472656,23.090784072875977]}}
    ]}
    sample_schools = {"type":"FeatureCollection","features":[
        {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[87.347976684570312,23.581695556640625]}}
    ]}
    sample_atms = {"type":"FeatureCollection","features":[
        {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[87.317855834960938,23.567581176757812]}}
    ]}
    sample_fuels = {"type":"FeatureCollection","features":[
        {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[86.167037963867188,22.804729461669922]}}
    ]}
    sample_water = {"type":"FeatureCollection","features":[
        {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[87.301322937011719,23.474699020385742]}}
    ]}
    open("jh_hospitals.geojson","w",encoding="utf-8").write(json.dumps(sample_hospitals))
    open("jh_schools.geojson","w",encoding="utf-8").write(json.dumps(sample_schools))
    open("jh_atms.geojson","w",encoding="utf-8").write(json.dumps(sample_atms))
    open("jh_fuel.geojson","w",encoding="utf-8").write(json.dumps(sample_fuels))
    open("jh_water.geojson","w",encoding="utf-8").write(json.dumps(sample_water))
    print("Demo geojson files written to working directory.")

write_demo_geojsons()

sample_incidents = [
    {"id":"inc_hosp_near","lat":23.0909,"lon":86.9561,"issue_type":"medical emergency"},
    {"id":"inc_school_atm","lat":23.5680,"lon":87.3180,"issue_type":"crowd"},
    {"id":"inc_fuel","lat":22.8050,"lon":86.1675,"issue_type":"fire risk"},
    {"id":"inc_remote","lat":24.0,"lon":86.0,"issue_type":"minor"}
]

# load points
points_by_type = {
    "hospital": load_geojson_points("jh_hospitals.geojson"),
    "school": load_geojson_points("jh_schools.geojson"),
    "fuel": load_geojson_points("jh_fuel.geojson"),
    "atm": load_geojson_points("jh_atms.geojson"),
    "waterway": load_geojson_points("jh_water.geojson")
}
print({k: len(v) for k,v in points_by_type.items()})

#define compute_ab_severity_batch (robust) and run the demo scoring
import json, pprint, sys

# If compute_ab_severity and build_point_index exist (from earlier cells), use them.
# Otherwise we'll try to provide a fallback that uses available functions.
if "compute_ab_severity" in globals() and "build_point_index" in globals():
    def compute_ab_severity_batch(incidents, points_by_type, params=None):
        """Batch scoring using existing compute_ab_severity and build_point_index in globals."""
        idx = build_point_index(points_by_type)
        out = []
        for inc in incidents:
            try:
                lat = float(inc.get("lat") or inc.get("latitude") or inc.get("y"))
                lon = float(inc.get("lon") or inc.get("longitude") or inc.get("x"))
            except Exception:
                # skip invalid incident
                continue
            res = compute_ab_severity(lat, lon, idx, params=params)
            out.append({"input": inc, **res})
        return out
    print("Defined compute_ab_severity_batch() using existing compute_ab_severity and build_point_index.")
else:
    # Fallback: attempt to import from the other module name (if you saved it as verifix_severity_kdtree.py)
    try:
        from verifix_severity_kdtree import compute_ab_severity_batch as imported_batch
        compute_ab_severity_batch = imported_batch
        print("Imported compute_ab_severity_batch() from verifix_severity_kdtree.py")
    except Exception as e:
        # As a last resort, define a simple brute-force wrapper that re-implements the minimal logic
        print("Warning: compute_ab_severity or build_point_index not found in globals and import failed:", e, file=sys.stderr)
        print("Defining fallback brute-force batch scorer (uses nearest_distance_bruteforce).")
        def compute_ab_severity_batch(incidents, points_by_type, params=None):
            if params is None:
                params = DEFAULT_PARAMS if 'DEFAULT_PARAMS' in globals() else {}
            out = []
            for inc in incidents:
                try:
                    lat = float(inc.get("lat") or inc.get("latitude") or inc.get("y"))
                    lon = float(inc.get("lon") or inc.get("longitude") or inc.get("x"))
                except Exception:
                    continue
                # compute distances brute-force (use nearest_distance_bruteforce if available)
                d = {}
                for t in ["hospital","school","waterway","atm","fuel"]:
                    pts = points_by_type.get(t, [])
                    if 'nearest_distance_bruteforce' in globals():
                        d[t] = nearest_distance_bruteforce(lat, lon, pts)
                    else:
                        # minimal haversine brute-force
                        if not pts:
                            d[t] = 9999.0
                        else:
                            d[t] = min(haversine(lat, lon, p[0], p[1]) for p in pts)
                # replicate basic scoring as in core (no kd-tree) — reuse params weights if present
                close_km = params.get("close_km", 0.5)
                near_km = params.get("near_km", 2.0)
                impact_w = params.get("impact_weights", DEFAULT_PARAMS.get("impact_weights") if 'DEFAULT_PARAMS' in globals() else {})
                urgency_w = params.get("urgency_weights", DEFAULT_PARAMS.get("urgency_weights") if 'DEFAULT_PARAMS' in globals() else {})
                synergy = params.get("synergy", DEFAULT_PARAMS.get("synergy") if 'DEFAULT_PARAMS' in globals() else [])
                wA = params.get("wA", DEFAULT_PARAMS.get("wA", 0.5) if 'DEFAULT_PARAMS' in globals() else 0.5)
                wB = params.get("wB", DEFAULT_PARAMS.get("wB", 0.5) if 'DEFAULT_PARAMS' in globals() else 0.5)
                # Impact A
                A = 0.0
                for t, thr in (impact_w.items() if isinstance(impact_w, dict) else []):
                    dist = d.get(t, 9999.0)
                    if dist <= close_km:
                        A += thr.get("close", 0.0)
                    elif dist <= near_km:
                        A += thr.get("near", 0.0)
                A = min(max(A, 0.0), 1.0)
                # Urgency B
                B = 0.0
                for t, thr in (urgency_w.items() if isinstance(urgency_w, dict) else []):
                    dist = d.get(t, 9999.0)
                    if dist <= close_km:
                        B += thr.get("close", 0.0)
                    elif dist <= near_km:
                        B += thr.get("near", 0.0)
                for combo, bonus in synergy:
                    if d.get(combo[0], 9999.0) <= near_km and d.get(combo[1], 9999.0) <= near_km:
                        B += bonus
                B = min(max(B, 0.0), 1.0)
                denom = (wA + wB) if (wA + wB) != 0 else 1.0
                severity = 5.0 * (wA * A + wB * B) / denom
                b0,b1,b2 = params.get("buckets", DEFAULT_PARAMS.get("buckets", [1.0,2.5,4.0]))
                if severity <= b0:
                    level = "Safe"
                elif severity <= b1:
                    level = "Moderate"
                elif severity <= b2:
                    level = "High"
                else:
                    level = "Critical"
                out.append({
                    "input": inc,
                    "impact_A": round(A,3),
                    "urgency_B": round(B,3),
                    "severity_0_5": round(severity,3),
                    "level": level,
                    "distances_km": {k: round(v,3) for k,v in d.items()}
                })
            return out

# Now run the batch scoring on the sample_incidents and points_by_type
try:
    results = compute_ab_severity_batch(sample_incidents, points_by_type)
    pprint.pprint(results, width=140)
    # save results for download
    with open("scored_sample_incidents.json","w",encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("Saved scored_sample_incidents.json")
except Exception as ex:
    print("Error while running compute_ab_severity_batch:", ex, file=sys.stderr)
    print("Make sure you've executed Cells 1-4 so that compute_ab_severity and helpers are defined.")

#run scoring on the sample incidents and pretty-print results
results = compute_ab_severity_batch(sample_incidents, points_by_type)
import pprint
pprint.pprint(results, width=140)
# Optionally save results to file
open("scored_sample_incidents.json","w",encoding="utf-8").write(json.dumps(results, indent=2))
print("Saved scored_sample_incidents.json")

#minimal FastAPI server to serve scoring (optional)
# Save this block as a file and run (or run directly in Colab with proper port tunneling)
#server_code = r'''
#from fastapi import FastAPI, HTTPException
#from pydantic import BaseModel
#from typing import List, Optional
#import json, os

# Import scoring from this notebook's namespace: we saved functions in globals
#from importlib import import_module

#app = FastAPI()

#class Incident(BaseModel):
#    lat: float
#    lon: float
#    issue_type: Optional[str] = None

#class ScoreRequest(BaseModel):
#    incidents: Optional[List[Incident]] = None
#    incident: Optional[Incident] = None

# load geojson file names from env (defaults are the demo files)
#DEFAULT_FILES = {
#    "hospital": os.getenv("VERIFIX_HOSPITALS", "jh_hospitals.geojson"),
#    "school":   os.getenv("VERIFIX_SCHOOLS", "jh_schools.geojson"),
#    "fuel":     os.getenv("VERIFIX_FUELS", "jh_fuel.geojson"),
#    "atm":      os.getenv("VERIFIX_ATMS", "jh_atms.geojson"),
#    "waterway": os.getenv("VERIFIX_WATER", "jh_water.geojson")
#}

#@app.on_event("startup")
#def load_context_layers():
  #  global POINTS_BY_TYPE
  #  from __main__ import load_geojson_points  # using functions defined in this notebook
 #   POINTS_BY_TYPE = {}
 #   for k, fname in DEFAULT_FILES.items():
 #       POINTS_BY_TYPE[k] = load_geojson_points(fname)

#@app.post("/score")
#def score(req: ScoreRequest):
#    if req.incidents is None and req.incident is None:
#        raise HTTPException(status_code=400, detail="Provide 'incident' or 'incidents'")
#    incidents = []
#    if req.incident is not None:
#        incidents.append(req.incident.dict())
#    if req.incidents is not None:
#        incidents.extend([i.dict() for i in req.incidents])
#    from __main__ import compute_ab_severity_batch
#    results = compute_ab_severity_batch(incidents, POINTS_BY_TYPE)
#    return {"count": len(results), "results": results}

#@app.get("/health")
#def health():
#    return {"status": "ok"}
#'''
#open("verifix_server.py","w",encoding="utf-8").write(server_code)
#print("Server file written to verifix_server.py")
#print("To run server locally (outside Colab): uvicorn verifix_server:app --reload --port 8000")

#quick unit-check functions (not full pytest run)
def _make_sample_points():
    return {
        "hospital": [(23.09, 86.956)],
        "school":   [(23.5817, 87.34797)],
        "fuel":     [(22.8047, 86.1670)],
        "atm":      [(23.56758, 87.31785)],
        "waterway": [(23.474699,87.30132)]
    }

# test near hospital
inc1 = [{"lat":23.09, "lon":86.956, "issue_type":"test"}]
out1 = compute_ab_severity_batch(inc1, _make_sample_points())
print("Near hospital ->", out1)

# test far away
inc2 = [{"lat":0.0, "lon":0.0}]
out2 = compute_ab_severity_batch(inc2, _make_sample_points())
print("Far away ->", out2)