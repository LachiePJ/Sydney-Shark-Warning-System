/**
 * Improved Data Service - Beach-Specific Data
 * Fetches granular data for each beach location
 */

import { RiskInput, ZoneRiskResult } from '@/lib/types';
import { RiskEngine } from '@/lib/risk-engine';
import { ZONES, ZoneProperties } from '@/config/zones';
import { DEFAULT_THRESHOLDS } from '@/config/risk-config';
import { fetchAllBeachesMarineData } from '@/lib/bom/marine-temperature-adapter';
import { cacheSingleton } from '@/lib/cache-singleton';
import { saveToRedis, loadFromRedis, isRedisConfigured } from '@/lib/redis-cache';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'cache.json');
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

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
      // Use daily precipitation instead of hourly for better reliability
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.searchParams.append('latitude', lat.toString());
      url.searchParams.append('longitude', lon.toString());
      url.searchParams.append('daily', 'precipitation_sum');
      url.searchParams.append('timezone', 'Australia/Sydney');
      url.searchParams.append('past_days', '2');
      url.searchParams.append('forecast_days', '0');

      console.log(`Fetching rainfall for ${lat},${lon}...`);
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      const response = await fetch(url.toString(), {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      
      if (!response.ok) {
        console.error(`Rainfall API returned ${response.status}`);
        return null;
      }

      const data = await response.json();
      
      // Sum rainfall from last 2 days
      if (data.daily?.precipitation_sum) {
        const total = data.daily.precipitation_sum.reduce((sum: number, val: number | null) => {
          return sum + (val || 0);
        }, 0);
        
        console.log(`✓ Rainfall for ${lat},${lon}: ${total.toFixed(1)}mm`);
        return total;
      }
      
      console.warn('No precipitation data in response');
      return null;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Rainfall fetch timed out after 8s');
      } else {
        console.error('Failed to fetch rainfall:', error);
      }
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
      return; // Already loaded in this instance
    }
    
    // 1. Try Redis FIRST (primary source for Vercel) ⭐
    if (isRedisConfigured()) {
      const redisCache = await loadFromRedis();
      if (redisCache && redisCache.beaches && Object.keys(redisCache.beaches).length > 0) {
        this.cache = redisCache;
        const cacheAge = Date.now() - new Date(this.cache.lastFetch).getTime();
        const minutesOld = Math.round(cacheAge / 1000 / 60);
        console.log(`✅ Loaded from Redis (${minutesOld}min old, ${Object.keys(this.cache.beaches).length} beaches)`);
        
        // Show what data we have
        const firstBeach = Object.keys(this.cache.beaches)[0];
        const sample = this.cache.beaches[firstBeach];
        console.log(`   Sample data (${firstBeach}):`, {
          temp: sample.temperature,
          rainfall: sample.rainfall48h,
          waves: sample.waveHeight,
        });
        return;
      }
    }
    
    // 2. Check in-memory singleton (temporary fallback)
    const singletonCache = cacheSingleton.getCache();
    if (singletonCache) {
      this.cache = singletonCache;
      const cacheAge = Date.now() - new Date(this.cache.lastFetch).getTime();
      const minutesOld = Math.round(cacheAge / 1000 / 60);
      console.log(`✓ Loaded from memory singleton (${minutesOld}min old, ${Object.keys(this.cache.beaches).length} beaches)`);
      return;
    }
    
    // 3. Try filesystem (local development)
    try {
      const data = await fs.readFile(CACHE_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      
      const hasBeachData = parsed.beaches && Object.keys(parsed.beaches).length > 0;
      const firstBeach = hasBeachData ? Object.values(parsed.beaches)[0] as any : null;
      const hasRealData = firstBeach && (
        firstBeach.temperature !== null ||
        firstBeach.rainfall48h !== null ||
        firstBeach.waveHeight !== null
      );
      
      if (hasRealData) {
        this.cache = parsed;
        cacheSingleton.setCache(parsed);
        console.log('✓ Loaded from filesystem, saved to singleton');
        return;
      }
    } catch (error) {
      console.log('ℹ️  No filesystem cache available');
    }
    
    // No cache available - return empty (user must call /api/refresh)
    console.warn('⚠️  NO CACHE AVAILABLE - Call /api/refresh to fetch live data');
    this.cache = {
      beaches: {},
      lastFetch: new Date(0).toISOString(),
    };
  }

  /**
   * Save cache to disk
   */
  private async saveCache(): Promise<void> {
    if (!this.cache) return;
    
    // 1. Save to Redis (primary persistence for Vercel) ⭐
    if (isRedisConfigured()) {
      const saved = await saveToRedis(this.cache);
      if (saved) {
        console.log('✅ Data persisted to Redis - will survive across requests!');
      }
    } else {
      console.warn('⚠️  Redis not configured - data will not persist between requests');
    }
    
    // 2. Save to in-memory singleton (temporary backup)
    cacheSingleton.setCache(this.cache);
    
    // 3. Save to file (local development only)
    try {
      await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
      await fs.writeFile(CACHE_FILE, JSON.stringify(this.cache, null, 2));
      console.log('✓ Cache saved to file');
    } catch (error) {
      console.log('ℹ️  Could not save to file (expected on Vercel)');
    }
  }

  /**
   * Get cache age in milliseconds (null if no cache)
   */
  getCacheAge(): number | null {
    if (!this.cache) return null;
    return Date.now() - new Date(this.cache.lastFetch).getTime();
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
