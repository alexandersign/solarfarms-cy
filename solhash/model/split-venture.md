# Split-venture structure (conceptual)

Who invests what; how revenue and degradation compensation flow. No legal agreements in this phase — cash flows and roles only.

---

## Equipment venture

- **Invests**: Capex for containerized load (containers, ASICs or GPUs, networking, cooling).
- **Receives**: Revenue from mining (BTC/GPU) or datacenter services (e.g. cloud/AI inference).
- **Pays**: 
  - Degradation-based compensation to the park owner (see [degradation-park-owner.md](degradation-park-owner.md)).
  - Opex: cooling, maintenance, labour, insurance, container moves.
- **Mobility**: Equipment can move park-to-park when connection nears or terms change; capex is shared across parks.

---

## Park owner

- **Invests**: PV + “early” EPC (civil, grid-tie prep, LV for containers). Does **not** invest in mining/datacenter hardware.
- **Receives**: Degradation compensation from the equipment venture (not a PPA €/MWh).
- **Upside (out of scope for ROI model)**: Site and generation ready earlier; when connection is granted, can benefit from earlier COD and normal BESS/PPA revenue.

---

## Cash flow summary

| Flow | From | To |
|------|------|----|
| MWh to load | Park (PV) | Equipment venture (consumed on-site) |
| Degradation payment | Equipment venture | Park owner |
| Mining/datacenter revenue | Market / customers | Equipment venture |
| Opex | Equipment venture | Vendors / labour |
| Capex | Equipment venture | Equipment suppliers |

---

## Notes

- No obligation for park owner to sell energy at market price; only degradation is compensated.
- Legal structure (JV, lease, service agreement) to be defined later; this document describes the economic split only.
