!pip install -q fastapi "uvicorn[standard]" pytest

# Cell 1: write verifix_costs.py
module_code = r'''
"""
verifix_costs.py

Production-hardened budget estimation for Verifix (Jharkhand civic repairs).
"""

from typing import Dict, Any, List, Optional
import json, math, copy
from decimal import Decimal, ROUND_HALF_UP
from datetime import datetime

# -------------------------
# Defaults (official baseline)
# -------------------------
DEFAULT_RATES = {
    "pothole_per_m2": 1070.60,          # per square meter
    "waste_per_mt": 1492.00,           # per metric tonne
    "drain_per_m": 133.20,             # per linear meter
    "manhole_per_unit": 3885.00,       # per manhole replacement
    "streetlight_per_unit": 8405.60    # per LED streetlight replacement
}

# -------------------------
# Official / suggested cost-index multipliers for Jharkhand (editable)
# These multipliers are applied to baseline CPWD rates to reflect local costs.
# Example: 1.05 => +5% over baseline.
DEFAULT_COST_INDEX = {
    "Ranchi": 1.05,
    "Dhanbad": 1.03,
    "Jamshedpur": 1.04,
    "Bokaro": 1.02
}

CURRENCY = "INR"
CURRENCY_SYMBOL = "₹"

# -------------------------
# Helpers
# -------------------------
def _to_number(v: Any) -> Optional[float]:
    if v is None:
        return None
    if isinstance(v, (int, float)):
        try:
            if math.isnan(float(v)) or math.isinf(float(v)):
                return None
        except Exception:
            return None
        return float(v)
    if isinstance(v, str):
        s = v.strip().replace(",", "")
        if s == "":
            return None
        try:
            return float(s)
        except Exception:
            return None
    return None

def _round_money(value: float, ndigits: int = 2) -> float:
    dec = Decimal(str(value)).quantize(Decimal(f"1.{'0'*ndigits}"), rounding=ROUND_HALF_UP)
    return float(dec)

def _format_currency(value: float) -> str:
    rounded = _round_money(value, 2)
    parts = f"{rounded:,.2f}".split(".")
    return f"{CURRENCY_SYMBOL}{parts[0]}.{parts[1]}"

# -------------------------
# Category map
# -------------------------
_DEFAULT_CATEGORIES = {
    "pothole_area_m2": ("Pothole repair", "m²", "pothole_per_m2"),
    "garbage_weight_mt": ("Solid waste management", "MT", "waste_per_mt"),
    "drain_length_m": ("Drain cleaning", "m", "drain_per_m"),
    "manhole_count": ("Manhole cover replacement", "unit", "manhole_per_unit"),
    "streetlight_count": ("LED streetlight replacement", "unit", "streetlight_per_unit"),
}

# -------------------------
# Rate calculation helpers
# -------------------------
def _get_effective_rates(
    base_rates: Dict[str, float],
    city: Optional[str] = None,
    cost_index_overrides: Optional[Dict[str, float]] = None,
    manual_rate_overrides: Optional[Dict[str, float]] = None
) -> Dict[str, float]:
    idx_map = DEFAULT_COST_INDEX.copy()
    if cost_index_overrides:
        idx_map.update(cost_index_overrides)
    multiplier = 1.0
    if city:
        multiplier = float(idx_map.get(city, 1.0))

    eff = {k: float(v) * multiplier for k, v in base_rates.items()}
    if manual_rate_overrides:
        for rk, rv in manual_rate_overrides.items():
            if rk in eff and rv is not None:
                try:
                    eff[rk] = float(rv)
                except Exception:
                    pass
    return eff

# -------------------------
# Core estimation
# -------------------------
def estimate_cost_for_incident(
    incident: Dict[str, Any],
    *,
    base_rates: Optional[Dict[str, float]] = None,
    city: Optional[str] = None,
    cost_index_overrides: Optional[Dict[str, float]] = None,
    manual_rate_overrides: Optional[Dict[str, float]] = None,
    allow_zero_quantities: bool = False,
    contingency_pct: float = 0.0,
    rates_version: str = "cpwd_jh_v1"
) -> Dict[str, Any]:
    """
    Estimate budget for a single incident with validation and audit fields.
    Raises ValueError on negative quantities.
    """
    inc = copy.deepcopy(incident)
    base = base_rates if base_rates is not None else DEFAULT_RATES
    city_name = city or inc.get("city")
    effective_rates = _get_effective_rates(base, city=city_name,
                                           cost_index_overrides=cost_index_overrides,
                                           manual_rate_overrides=manual_rate_overrides)

    breakdown: List[Dict[str, Any]] = []
    total = 0.0

    # Validate and compute known categories
    for input_key, (label, unit, rate_key) in _DEFAULT_CATEGORIES.items():
        raw_q = inc.get(input_key)
        q = _to_number(raw_q)
        if q is None:
            continue
        # validation: no negatives
        if q < 0:
            raise ValueError(f"Negative quantity for {input_key}: {q}")
        if q == 0 and not allow_zero_quantities:
            continue
        unit_rate = float(effective_rates.get(rate_key, 0.0))
        cost = _round_money(q * unit_rate)
        total += cost
        breakdown.append({
            "category": label,
            "input_key": input_key,
            "quantity": q,
            "unit": unit,
            "unit_rate": _round_money(unit_rate),
            "cost": cost,
            "cost_display": _format_currency(cost)
        })

    # custom items
    custom_items = inc.get("custom_items")
    if isinstance(custom_items, list):
        for ci in custom_items:
            label = str(ci.get("label", "Custom"))
            q = _to_number(ci.get("quantity"))
            unit = str(ci.get("unit", "unit"))
            unit_rate = _to_number(ci.get("unit_rate"))
            if q is None or unit_rate is None:
                continue
            if q < 0:
                raise ValueError(f"Negative quantity in custom item {label}: {q}")
            if q == 0 and not allow_zero_quantities:
                continue
            cost = _round_money(q * float(unit_rate))
            total += cost
            breakdown.append({
                "category": label,
                "input_key": "custom",
                "quantity": q,
                "unit": unit,
                "unit_rate": _round_money(float(unit_rate)),
                "cost": cost,
                "cost_display": _format_currency(cost)
            })

    # apply contingency
    if contingency_pct and contingency_pct != 0.0:
        contingency_amount = _round_money(total * (contingency_pct / 100.0))
        total = _round_money(total + contingency_amount)
        breakdown.append({
            "category": "Contingency",
            "input_key": "contingency",
            "quantity": contingency_pct,
            "unit": "pct",
            "unit_rate": None,
            "cost": contingency_amount,
            "cost_display": _format_currency(contingency_amount)
        })

    total = _round_money(total)
    result = {
        "input": inc,
        "rates_version": rates_version,
        "timestamp_utc": datetime.utcnow().isoformat() + "Z",
        "rates": {k: _round_money(v) for k, v in effective_rates.items()},
        "breakdown": breakdown,
        "total_cost": total,
        "total_cost_display": _format_currency(total),
        "currency": CURRENCY
    }
    return result

def estimate_costs(
    incidents: List[Dict[str, Any]],
    *,
    base_rates: Optional[Dict[str, float]] = None,
    city: Optional[str] = None,
    cost_index_overrides: Optional[Dict[str, float]] = None,
    manual_rate_overrides: Optional[Dict[str, float]] = None,
    allow_zero_quantities: bool = False,
    contingency_pct: float = 0.0,
    rates_version: str = "cpwd_jh_v1"
) -> List[Dict[str, Any]]:
    out = []
    for inc in incidents:
        res = estimate_cost_for_incident(
            inc,
            base_rates=base_rates,
            city=city,
            cost_index_overrides=cost_index_overrides,
            manual_rate_overrides=manual_rate_overrides,
            allow_zero_quantities=allow_zero_quantities,
            contingency_pct=contingency_pct,
            rates_version=rates_version
        )
        out.append(res)
    return out

# -------------------------
# Demo when run directly
# -------------------------
if __name__ == "__main__":
    demo_incidents = [
        {
            "id": "demo_1",
            "pothole_area_m2": 10,
            "garbage_weight_mt": 1.5,
            "drain_length_m": 20,
            "manhole_count": 0,
            "streetlight_count": 1,
            "city": "Ranchi"
        },
        {
            "id": "demo_2",
            "pothole_area_m2": "5.2",
            "garbage_weight_mt": None,
            "drain_length_m": 0,
            "manhole_count": 2,
            "streetlight_count": 0,
            "custom_items": [
                {"label": "Minor concrete patch", "quantity": 3, "unit": "unit", "unit_rate": 450.0}
            ]
        }
    ]
    import json
    print("Demo estimates:")
    print(json.dumps(estimate_costs(demo_incidents), indent=2, ensure_ascii=False))
'''
# write module file
with open("verifix_costs.py", "w", encoding="utf-8") as f:
    f.write(module_code)

# import module
import importlib, verifix_costs
importlib.reload(verifix_costs)
print("verifix_costs.py written and imported.")

# Cell 2: optional overrides and demo run printing breakdown + total
import verifix_costs
from verifix_costs import estimate_cost_for_incident, estimate_costs

# OPTIONAL: override multipliers for cities if you have updated official values
cost_index_overrides = {
    "Ranchi": 1.05,    # example: +5%
    "Dhanbad": 1.03,
    "Jamshedpur": 1.04,
    "Bokaro": 1.02
}
# Apply in-memory (module-level) so calls without explicit overrides use these
verifix_costs.DEFAULT_COST_INDEX.update(cost_index_overrides)
print("Applied cost index overrides:", verifix_costs.DEFAULT_COST_INDEX)

# Demo incident (edit quantities as required)
incident = {
    "id": "site_42",
    "pothole_area_m2": 12.5,
    "garbage_weight_mt": 1.2,
    "drain_length_m": 8,
    "manhole_count": 1,
    "streetlight_count": 0,
    "city": "Ranchi",
    "custom_items": [
        {"label": "Edge trimming", "quantity": 2, "unit": "hr", "unit_rate": 300.0}
    ]
}

# Compute estimate with 5% contingency
result = estimate_cost_for_incident(incident, contingency_pct=5.0)
import pprint
print("\n=== Verifix Estimated Budget ===")
print("Incident id:", result["input"].get("id"))
print("Timestamp (UTC):", result["timestamp_utc"])
print("Rates version:", result["rates_version"])
print("\nBreakdown:")
for item in result["breakdown"]:
    qty = item["quantity"]
    unit = item["unit"]
    cat = item["category"]
    rate = item.get("unit_rate")
    cost_display = item["cost_display"]
    if rate is not None:
        print(f" - {cat}: {qty} {unit} × {verifix_costs._format_currency(rate)} = {cost_display}")
    else:
        print(f" - {cat}: {cost_display}")
print("\nTotal estimated cost:", result["total_cost_display"])
print("\nFull JSON result (saved to demo_estimate.json).")
with open("demo_estimate.json","w",encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
pprint.pprint(result, width=200)

# Cell 3: write a FastAPI wrapper file verifix_costs_api.py
api_code = r'''
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import verifix_costs

app = FastAPI(title="Verifix Cost Estimation API")

class Incident(BaseModel):
    pothole_area_m2: Optional[float] = None
    garbage_weight_mt: Optional[float] = None
    drain_length_m: Optional[float] = None
    manhole_count: Optional[int] = None
    streetlight_count: Optional[int] = None
    city: Optional[str] = None
    custom_items: Optional[list] = None

class EstimateRequest(BaseModel):
    incidents: Optional[List[Incident]] = None
    incident: Optional[Incident] = None
    contingency_pct: Optional[float] = 0.0

@app.post("/estimate")
def estimate(req: EstimateRequest):
    if req.incident is None and req.incidents is None:
        raise HTTPException(status_code=400, detail="Provide 'incident' or 'incidents' in body.")
    incidents = []
    if req.incident is not None:
        incidents.append(req.incident.dict())
    if req.incidents is not None:
        incidents.extend([i.dict() for i in req.incidents])
    results = verifix_costs.estimate_costs(incidents, contingency_pct=req.contingency_pct)
    return {"count": len(results), "results": results}

@app.get("/health")
def health():
    return {"status": "ok", "module": "verifix_costs", "version": "1.0"}
'''
with open("verifix_costs_api.py","w",encoding="utf-8") as f:
    f.write(api_code)
print("verifix_costs_api.py written. To run locally: !uvicorn verifix_costs_api:app --reload --port 8000")

# Cell 4: write unit tests and run pytest
test_code = r'''
from verifix_costs import estimate_cost_for_incident

def test_simple_pothole():
    inc = {"pothole_area_m2": 10}
    res = estimate_cost_for_incident(inc)
    assert res["total_cost"] == round(10 * 1070.60, 2)

def test_multiple_items_and_contingency():
    inc = {"pothole_area_m2": 5, "manhole_count": 1}
    res = estimate_cost_for_incident(inc, contingency_pct=10.0)
    base = round(5*1070.60 + 1*3885.00,2)
    cont = round(base * 0.10, 2)
    assert res["total_cost"] == round(base + cont, 2)

def test_negative_quantity_raises():
    inc = {"pothole_area_m2": -1}
    try:
        estimate_cost_for_incident(inc)
        assert False, "Negative quantity should raise"
    except ValueError:
        assert True
'''
with open("test_verifix_costs.py","w",encoding="utf-8") as f:
    f.write(test_code)

# Run pytest
import subprocess, sys
print("Running pytest...")
res = subprocess.run([sys.executable, "-m", "pytest", "-q"], capture_output=True, text=True)
print(res.stdout)
print(res.stderr)
if res.returncode == 0:
    print("All tests passed.")
else:
    print("Tests failed. See output above.")

# Cell 5: confirm files and demo output presence
import os
files = ["verifix_costs.py","verifix_costs_api.py","test_verifix_costs.py","demo_estimate.json"]
for f in files:
    print(f, "->", "FOUND" if os.path.exists(f) else "MISSING")
print("If all FOUND, demo and test files are present.")