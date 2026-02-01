# Bull Shark Research Analysis & Model Adjustments

## Research Paper Added
**Title:** Bull Shark (Carcharhinus leucas) Occurrence along Beaches of South-Eastern Australia: Understanding Where, When, and Why  
**Authors:** Peddemors, V.M., et al. (2023)  
**Relevance:** ⚠️ **CRITICAL** - Bull Sharks are responsible for most shark incidents in the Sydney region

---

## Key Findings & Implications

### 1. **RAINFALL IS THE PRIMARY DRIVER** 🌧️
**Finding:** Bull Sharks actively move into estuarine and coastal areas after significant rainfall events

**Current Model:**
- Rainfall threshold: `> 60mm` (48h)
- Weight: `25%` (highest, but may need increase)

**Recommended Adjustments:**
- ✅ **LOWER threshold to 30-40mm** - Bull Sharks respond to moderate rainfall, not just heavy
- ✅ **INCREASE weight to 30-35%** - This is the strongest predictor for Bull Shark presence
- ✅ **Consider graduated risk** - 30-60mm = moderate risk, >60mm = high risk

**Reasoning:** Unlike other sharks, Bull Sharks actively seek areas with reduced salinity (estuaries, river mouths) after rain. This is a BEHAVIORAL ATTRACTION, not just a visibility issue.

---

### 2. **WATER TEMPERATURE THRESHOLD MAY BE TOO HIGH**
**Finding:** Bull Sharks are active at 18-20°C (not just >20°C)

**Current Model:**
- Temperature threshold: `> 20°C`
- Weight: `20%`

**Recommended Adjustments:**
- ⚠️ **LOWER threshold to 18°C** - Bull Sharks are active at lower temps than other species
- ✅ **Keep weight at 20%** - Temperature is still important but not the primary driver
- Consider graduated scale: 18-20°C = moderate, >20°C = high

---

### 3. **WATER QUALITY LOGIC NEEDS REVISION** 💧
**Finding:** Turbid water may actually ATTRACT Bull Sharks (they hunt using electroreception, not vision)

**Current Model:**
```typescript
// Water quality derived from rainfall
// Treats turbidity as an "encounter risk" factor
if (rainfall48h > 45) return 'poor';
```

**Recommended Adjustments:**
- ⚠️ **REFRAME THE FACTOR** - Instead of "Poor Water Quality" → "High Turbidity / Post-Rainfall Conditions"
- ✅ **Keep weight at 20%** or potentially increase to 25%
- **Rationale should emphasize:** "Bull Sharks are attracted to turbid, low-salinity conditions near river mouths and estuaries"

**Current rationale is MISLEADING:**
> "Reduced visibility from turbidity may increase risk of accidental encounters"

**Should be:**
> "Bull Sharks actively hunt in turbid water and are drawn to areas with freshwater runoff and reduced salinity"

---

### 4. **SEASONAL PATTERN ADJUSTMENT**
**Finding:** Peak activity Nov-Apr (not just Nov-Feb), but year-round presence

**Current Model:**
- Season: Nov-Feb only
- Weight: `15%`

**Recommended Adjustments:**
- ⚠️ **EXTEND season to Nov-Apr** (add March, April)
- ⚠️ **REDUCE weight to 10%** - Bull Sharks are present year-round in Sydney, seasonality is less critical than rainfall
- Consider year-round baseline risk for Bull Sharks

---

### 5. **LOCATION-SPECIFIC RISK** 📍
**Finding:** Bull Sharks prefer estuaries, harbours, river mouths

**Current Model:**
- No location-type weighting
- All beaches treated equally

**Recommended Additions:**
- ⚠️ **ADD NEW FACTOR:** "Estuary/Harbour Proximity" (weight: 10-15%)
- **Locations that should score higher:**
  - Sydney Harbour (all areas)
  - Manly (near harbour entrance)
  - Any beach near river mouth
  - Botany Bay areas
  
- **Lower risk:**
  - Open ocean beaches (Bondi, Coogee, Maroubra)
  - Palm Beach (less estuarine influence)

---

### 6. **SWELL HEIGHT - LESS RELEVANT FOR BULL SHARKS**
**Finding:** Not mentioned as significant factor for Bull Sharks

**Current Model:**
- Swell range: 1.8-2.8m
- Weight: `20%`

**Recommended Adjustments:**
- ⚠️ **REDUCE weight to 10-15%** - This factor is more relevant for other species
- Bull Sharks hunt in shallow, calm estuarine waters - swell is less relevant

---

## Summary of Recommended Changes

### Current Weights (Total: 100)
```
Water Temperature:  20
Rainfall (48h):     25
Swell Height:       20
Summer Season:      15
Water Quality:      20
```

### Proposed Weights (Total: 100)
```
Water Temperature:         15  (threshold lowered to 18°C)
Rainfall (48h):           35  (threshold lowered to 30mm, graduated)
Swell Height:             10  (less relevant for Bull Sharks)
Season (Extended):         5  (Nov-Apr, but less critical)
Turbidity/Runoff:         25  (reframed - Bull Sharks attracted to this)
Estuary/Harbour:          10  (NEW FACTOR - location type)
```

---

## Threshold Changes

| Factor | Current | Proposed | Reasoning |
|--------|---------|----------|-----------|
| **Rainfall** | >60mm | >30mm (moderate), >60mm (high) | Bull Sharks respond to moderate rainfall |
| **Water Temp** | >20°C | >18°C (moderate), >20°C (high) | Bull Sharks active at lower temps |
| **Season** | Nov-Feb | Nov-Apr | Extended activity period |
| **Water Quality** | Derived from 45mm rain | Derived from 20mm rain | Lower threshold, reframe as "turbidity attraction" |

---

## Implementation Priority

### HIGH PRIORITY (Critical for Bull Shark risk)
1. ✅ Lower rainfall threshold to 30mm
2. ✅ Increase rainfall weight to 35%
3. ✅ Reframe "Water Quality" factor description
4. ✅ Lower temperature threshold to 18°C

### MEDIUM PRIORITY (Improves accuracy)
5. ⚠️ Reduce swell weight to 10%
6. ⚠️ Extend season to Nov-Apr
7. ⚠️ Reduce season weight to 5%

### LOW PRIORITY (Enhancement)
8. 💡 Add estuary/harbour location factor (requires beach classification)

---

## Next Steps

1. **Update `config/risk-config.ts`** with new thresholds and weights
2. **Update `lib/risk-engine.ts`** to add graduated rainfall thresholds
3. **Update `data/sources.json`** rationale text to reflect Bull Shark behavior
4. **Update UI text** in ExplainabilitySection to emphasize Bull Shark-specific factors
5. **Consider adding location-type field** to beach-locations.ts

---

## Scientific Justification

The current model treats all shark species equally, but Bull Sharks:
- Are euryhaline (tolerate wide salinity ranges)
- Actively seek estuarine environments
- Are responsible for most Sydney incidents
- Hunt effectively in turbid water using electroreception
- Are less dependent on visual hunting than other species

**This means:** Rainfall and turbidity are ATTRACTORS for Bull Sharks, not just risk multipliers. The model should reflect this behavioral difference.

---

**Document Created:** Feb 2, 2026  
**Action Required:** Review and implement recommended changes to risk model
