# Data Sources Audit 🔍

## Current Data Sources Review

### 1. Water Temperature 🌡️
**Status**: ❌ FIXED - Was using air temp, now using ocean surface temp
- **Old Source**: Air temperature (`temperature_2m`) - WRONG
- **New Source**: Marine API `ocean_surface_temperature` - CORRECT
- **Granularity**: ✅ Beach-specific (7 beaches)
- **API**: `https://marine-api.open-meteo.com/v1/marine`

### 2. Rainfall 🌧️
**Status**: ⚠️ NEEDS IMPROVEMENT
- **Current**: Sydney-wide average (single point)
- **Source**: Open-Meteo weather API
- **Granularity**: ❌ City-wide only
- **Opportunity**: Can add beach-specific rainfall data
- **Impact**: Heavy rainfall in one area (e.g., Northern Beaches) might not affect Cronulla

**Recommendation**: Fetch rainfall for each beach location

### 3. Wave Height 🌊
**Status**: ⚠️ NEEDS VERIFICATION
- **Current**: Not fully implemented
- **Source**: Marine API has `wave_height` parameter
- **Granularity**: Can be beach-specific
- **Opportunity**: Already available in Marine API, just need to use it

**Recommendation**: Integrate wave height from same Marine API call as temperature

### 4. Water Quality 💧
**Status**: ⚠️ DERIVED DATA
- **Current**: Proxy based on rainfall amount
- **Source**: Calculated (not measured)
- **Logic**: High rainfall (>30mm) = poor water quality
- **Accuracy**: Reasonable proxy but not direct measurement

**Potential Better Sources**:
- NSW Beach Watch API (if available)
- Beachwatch water quality reports
- Direct turbidity measurements

### 5. Season 📅
**Status**: ✅ CORRECT
- **Source**: Date calculation (Nov-Feb = summer)
- **Accuracy**: 100% accurate
- **Granularity**: N/A (same for all zones)

## Recommended Data Structure

### Beach-Specific Data Collection
Each beach should have:
```typescript
{
  beachId: 'manly',
  name: 'Manly',
  coordinates: { lat: -33.7969, lon: 151.2887 },
  data: {
    oceanTemp: 23.5,      // From Marine API
    rainfall48h: 12.3,     // Beach-specific rainfall
    waveHeight: 1.8,       // From Marine API
    waterQuality: 'good',  // Derived or measured
    timestamp: '2026-01-28T...'
  }
}
```

### Zone Mapping
Map each risk zone to its nearest beach:
- Manly zones → Manly beach data
- Bondi/Tamarama/Bronte → Bondi beach data
- Coogee/Clovelly → Coogee beach data
- Maroubra zones → Maroubra beach data
- Cronulla zones → Cronulla beach data
- Palm Beach zones → Palm Beach beach data
- Harbour zones → Sydney Harbour data

## Action Items 📋

1. ✅ **Water Temperature**: Fixed with Marine API
2. 🔄 **Wave Height**: Integrate from Marine API
3. 🔄 **Rainfall**: Add beach-specific rainfall
4. ⏭️ **Water Quality**: Keep proxy for now (consider NSW Beachwatch later)
5. ✅ **Season**: Already correct

## API Endpoints Being Used

### Current (Post-Fix):
1. **Marine Data**: `https://marine-api.open-meteo.com/v1/marine`
   - ocean_surface_temperature ✅
   - wave_height ✅ (available, need to use)

2. **Weather Data**: `https://api.open-meteo.com/v1/forecast`
   - precipitation (rainfall) ✅
   - Can be called per-beach for granular data

### Potential Future:
3. **NSW Beachwatch**: Water quality measurements (if API available)

## Next Steps

1. Update data-service.ts to:
   - Use marine temperature adapter ✅
   - Fetch wave height from Marine API
   - Fetch rainfall for each beach location
   - Map zones to beaches for data assignment

2. Update cache structure to store beach-specific data

3. Update UI to display beach-specific metrics in zone popups

---

**Priority**: High  
**Impact**: More accurate risk assessment per zone  
**User Benefit**: See actual conditions for their specific beach, not city-wide averages
