/**
 * Improved Data Service - Beach-Specific Data
 * Fetches granular data for each beach location
 */

import { RiskInput, ZoneRiskResult } from '@/lib/types';
import { RiskEngine } from '@/lib/risk-engine';
import { ZONES, ZoneProperties } from '@/config/zones';
import { DEFAULT_THRESHOLDS } from '@/config/risk-config';
import { fetchAllBeachesMarineData } from '@/lib/bom/marine-temperature-adapter';
import { getCachedData } from '@/lib/cache-loader';
import { STATIC_CACHE_DATA } from '@/lib/static-cache';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'cache.json');
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

// Pre-load cached data - use static data as guaranteed fallback
const INITIAL_CACHE = STATIC_CACHE_DATA;
console.log('🔧 INITIAL_CACHE loaded at module init:', {
  beaches: Object.keys(INITIAL_CACHE.beaches),
  manlyRainfall: INITIAL_CACHE.beaches.manly.rainfall48h,
});

// Map zones to their nearest beach for data
const ZONE_TO_BEACH_MAP: Record<string, string> = {
  // Sydney Harbour zones
  'sydney-harbour-inner': 'sydneyHarbour',
  'sydney-harbour-outer': 'sydneyHarbour',
  
  // Manly area
  'manly': 'manly',
  
  // Bondi to Bronte
  'bondi-bronte': 'bondi',
  
  // Coogee to Maroubra
  'coogee-maroubra': 'coogee',
  
  // Cronulla
  'cronulla': 'cronulla',
  
  // Palm Beach
  'palm-beach': 'palmBeach',
};

interface BeachData {
  temperature: number | null;
  waveHeight: number | null;
  rainfall48h: number | null;
  timestamp: string;
}

interface CacheData {
  beaches: Record<string, BeachData>;
  lastFetch: string;
}

export class DataService {
  private cache: CacheData | null = null;
  private riskEngine: RiskEngine;

  constructor() {
    this.riskEngine = new RiskEngine();
  }

  /**
   * Fetch rainfall for a specific beach location
   */
  private async fetchBeachRainfall(lat: number, lon: number): Promise<number | null> {
    try {
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.searchParams.append('latitude', lat.toString());
      url.searchParams.append('longitude', lon.toString());
      url.searchParams.append('hourly', 'precipitation');
      url.searchParams.append('timezone', 'Australia/Sydney');
      url.searchParams.append('past_days', '2');
      url.searchParams.append('forecast_days', '1');

      const response = await fetch(url.toString());
      if (!response.ok) return null;

      const data = await response.json();
      
      // Sum rainfall from last 48 hours
      if (data.hourly?.precipitation) {
        const now = Date.now();
        const hours48Ago = now - 48 * 60 * 60 * 1000;
        
        let total = 0;
        data.hourly.time.forEach((time: string, index: number) => {
          const timestamp = new Date(time).getTime();
          if (timestamp >= hours48Ago) {
            total += data.hourly.precipitation[index] || 0;
          }
        });
        
        return total;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to fetch rainfall:', error);
      return null;
    }
  }

  /**
   * Refresh all beach-specific data
   */
  async refreshData(): Promise<void> {
    console.log('Fetching beach-specific marine and weather data...');
    
    try {
      // Fetch marine data (ocean temp + wave height) for all beaches
      const marineData = await fetchAllBeachesMarineData();
      
      const beaches: Record<string, BeachData> = {};
      
      // Beach coordinates for rainfall fetching
      const beachCoords: Record<string, { lat: number; lon: number }> = {
        manly: { lat: -33.7969, lon: 151.2887 },
        bondi: { lat: -33.8915, lon: 151.2767 },
        coogee: { lat: -33.9233, lon: 151.2585 },
        maroubra: { lat: -33.9501, lon: 151.2591 },
        cronulla: { lat: -34.0576, lon: 151.1532 },
        palmBeach: { lat: -33.6005, lon: 151.3216 },
        sydneyHarbour: { lat: -33.8688, lon: 151.2093 },
      };
      
      // Fetch rainfall for each beach in parallel
      const rainfallPromises = Object.entries(beachCoords).map(async ([beachKey, coords]) => {
        const rainfall = await this.fetchBeachRainfall(coords.lat, coords.lon);
        return { beachKey, rainfall };
      });
      
      const rainfallResults = await Promise.all(rainfallPromises);
      
      // Combine marine and rainfall data
      Object.keys(beachCoords).forEach((beachKey) => {
        const marine = marineData[beachKey];
        const rainfallData = rainfallResults.find(r => r.beachKey === beachKey);
        
        beaches[beachKey] = {
          temperature: marine?.temperature?.value || null,
          waveHeight: marine?.waveHeight?.value || null,
          rainfall48h: rainfallData?.rainfall || null,
          timestamp: new Date().toISOString(),
        };
        
        console.log(`✓ ${beachKey}: Temp=${beaches[beachKey].temperature}°C, Rain=${beaches[beachKey].rainfall48h}mm, Waves=${beaches[beachKey].waveHeight}m`);
      });
      
      this.cache = {
        beaches,
        lastFetch: new Date().toISOString(),
      };
      
      await this.saveCache();
      console.log('✓ Beach-specific data successfully fetched');
      
    } catch (error) {
      console.error('Failed to refresh beach data:', error);
      throw error;
    }
  }

  /**
   * Get risk input data for a specific zone (uses beach-specific data)
   */
  async getRiskInputForZone(zoneProperties: ZoneProperties): Promise<RiskInput> {
    await this.ensureCacheLoaded();
    
    // Map zone to its beach
    const beachKey = ZONE_TO_BEACH_MAP[zoneProperties.id] || 'sydneyHarbour';
    const beachData = this.cache?.beaches?.[beachKey];
    
    const now = new Date();
    const month = now.getMonth();
    const isSummer = DEFAULT_THRESHOLDS.summerMonths.includes(month);
    
    // Derive water quality from rainfall
    const waterQuality = RiskEngine.deriveWaterQuality(beachData?.rainfall48h ?? null);
    
    return {
      waterTemp: beachData?.temperature ?? null,
      rainfall48h: beachData?.rainfall48h ?? null,
      swellHeight: beachData?.waveHeight ?? null,
      isSummer,
      waterQuality,
      timestamp: beachData?.timestamp || now.toISOString(),
      sources: {
        waterTemp: 'Open-Meteo Marine API',
        rainfall: 'Open-Meteo Weather API (BoM-backed)',
        swell: 'Open-Meteo Marine API',
      },
    };
  }

  /**
   * Calculate risk for all zones
   */
  async calculateAllZoneRisks(): Promise<ZoneRiskResult[]> {
    const results: ZoneRiskResult[] = [];
    
    for (const zone of ZONES.features) {
      const input = await this.getRiskInputForZone(zone.properties);
      const risk = this.riskEngine.calculateRisk(input);
      
      results.push({
        ...risk,
        zoneId: zone.properties.id,
        zoneName: zone.properties.name,
      });
    }
    
    return results;
  }

  /**
   * Load cache from disk
   */
  private async ensureCacheLoaded(): Promise<void> {
    if (this.cache) {
      return; // Already loaded
    }
    
    // Try to load from filesystem first (for local dev and after /api/refresh)
    let loadedFromFile = false;
    try {
      const data = await fs.readFile(CACHE_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      
      // Check if the file cache has actual data
      const hasBeachData = parsed.beaches && Object.keys(parsed.beaches).length > 0;
      const firstBeach = hasBeachData ? Object.values(parsed.beaches)[0] as any : null;
      const hasRealData = firstBeach && (
        firstBeach.temperature !== null ||
        firstBeach.rainfall48h !== null ||
        firstBeach.waveHeight !== null
      );
      
      if (hasRealData) {
        this.cache = parsed;
        loadedFromFile = true;
        console.log('✓ Loaded cache from filesystem with real data');
      } else {
        console.log('⚠️  Filesystem cache is empty, using bundled cache');
        this.cache = INITIAL_CACHE as CacheData;
      }
    } catch (error) {
      // Filesystem read failed (common on Vercel) - use bundled initial cache
      console.log('ℹ️  Filesystem read failed, using bundled cache data');
      this.cache = INITIAL_CACHE as CacheData;
    }
    
    if (this.cache) {
      const beachCount = this.cache.beaches ? Object.keys(this.cache.beaches).length : 0;
      console.log(`📊 Cache loaded: ${beachCount} beaches, source: ${loadedFromFile ? 'file' : 'bundled'}`);
      
      const cacheAge = Date.now() - new Date(this.cache.lastFetch).getTime();
      const minutesOld = Math.round(cacheAge / 1000 / 60);
      
      if (cacheAge >= CACHE_DURATION_MS) {
        console.warn(`⚠️  Cache is ${minutesOld} minutes old (stale) - call /api/refresh to update`);
      } else {
        console.log(`✓ Using cached data (${minutesOld} minutes old)`);
      }
    }
  }

  /**
   * Save cache to disk
   */
  private async saveCache(): Promise<void> {
    if (!this.cache) return;
    
    try {
      await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
      await fs.writeFile(CACHE_FILE, JSON.stringify(this.cache, null, 2));
    } catch (error) {
      console.error('Failed to save cache:', error);
    }
  }

  /**
   * Get data freshness status
   */
  getDataFreshness(): 'current' | 'stale' | 'degraded' {
    if (!this.cache) return 'degraded';
    
    const cacheAge = Date.now() - new Date(this.cache.lastFetch).getTime();
    
    if (cacheAge < CACHE_DURATION_MS) return 'current';
    if (cacheAge < 2 * CACHE_DURATION_MS) return 'stale';
    return 'degraded';
  }

  /**
   * Get available and missing metrics
   */
  getMetricsStatus(): { available: string[]; missing: string[] } {
    if (!this.cache) {
      return { available: [], missing: ['All metrics'] };
    }
    
    const available: string[] = [];
    const missing: string[] = [];
    
    // Check if we have data for at least one beach
    const hasAnyData = Object.values(this.cache.beaches).some(
      beach => beach.temperature !== null || beach.rainfall48h !== null || beach.waveHeight !== null
    );
    
    if (hasAnyData) {
      available.push('Beach-specific ocean temperature');
      available.push('Beach-specific rainfall');
      available.push('Beach-specific wave height');
    } else {
      missing.push('All beach data');
    }
    
    return { available, missing };
  }

  /**
   * Get beach data for display
   */
  getBeachData(beachKey: string): BeachData | null {
    return this.cache?.beaches[beachKey] || null;
  }
}
