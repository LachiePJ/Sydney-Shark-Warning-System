/**
 * Data Service
 * Orchestrates data fetching, caching, and normalization
 */

import { RiskInput, BomDataCache, ZoneRiskResult } from '@/lib/types';
import { fetchOpenMeteoBOMData, fetchMarineData } from '@/lib/bom/openmeteo-adapter';
import { RiskEngine } from '@/lib/risk-engine';
import { ZONES, ZoneProperties } from '@/config/zones';
import { DEFAULT_THRESHOLDS } from '@/config/risk-config';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'cache.json');
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export class DataService {
  private cache: BomDataCache | null = null;
  private riskEngine: RiskEngine;

  constructor() {
    this.riskEngine = new RiskEngine();
  }

  /**
   * Get risk input data for a specific zone (uses Sydney-wide data)
   */
  async getRiskInputForZone(zoneProperties: ZoneProperties): Promise<RiskInput> {
    await this.ensureCacheLoaded();

    const now = new Date();
    const month = now.getMonth();
    const isSummer = DEFAULT_THRESHOLDS.summerMonths.includes(month);

    // Get rainfall data (Sydney-wide)
    let rainfall48h: number | null = null;
    const rainfallReadings = this.cache?.rainfall['sydney'] || [];
    if (rainfallReadings.length > 0) {
      // Sum all rainfall in last 48 hours
      rainfall48h = rainfallReadings.reduce((sum, reading) => sum + reading.value, 0);
    }

    // Get water temperature (Sydney-wide)
    let waterTemp: number | null = null;
    const tempData = this.cache?.waterTemp['sydney'];
    if (tempData) {
      waterTemp = tempData.value;
    }

    // Get swell/wave height (Sydney-wide)
    let swellHeight: number | null = null;
    const swellData = this.cache?.swell['sydney'];
    if (swellData) {
      swellHeight = swellData.value;
    }

    // Derive water quality from rainfall
    const waterQuality = RiskEngine.deriveWaterQuality(rainfall48h);

    return {
      waterTemp,
      rainfall48h,
      swellHeight,
      isSummer,
      waterQuality,
      timestamp: now.toISOString(),
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
   * Refresh data from REAL BoM sources (via Open-Meteo API)
   * Open-Meteo uses Bureau of Meteorology ACCESS-G model data
   */
  async refreshData(): Promise<void> {
    const newCache: BomDataCache = {
      rainfall: {},
      waterTemp: {},
      swell: {},
      lastFetch: new Date().toISOString(),
    };

    try {
      console.log('Fetching REAL BoM data via Open-Meteo API...');
      
      // Fetch weather data (temperature, rainfall) from Open-Meteo BOM API
      const bomData = await fetchOpenMeteoBOMData();
      
      // Store temperature
      if (bomData.temperature) {
        newCache.waterTemp['sydney'] = bomData.temperature;
        console.log(`✓ Temperature: ${bomData.temperature.value}°C`);
      }

      // Store rainfall
      if (bomData.rainfall.length > 0) {
        newCache.rainfall['sydney'] = bomData.rainfall;
        const total = bomData.rainfall.reduce((sum, r) => sum + r.value, 0);
        console.log(`✓ Rainfall (48h): ${total.toFixed(1)}mm`);
      }

      // Fetch marine data (wave height)
      const marineData = await fetchMarineData();
      if (marineData) {
        newCache.swell['sydney'] = marineData;
        console.log(`✓ Wave Height: ${marineData.value}m`);
      }

      console.log('✓ REAL BoM data successfully fetched');
    } catch (error) {
      console.error('Failed to fetch real BoM data:', error);
      throw error;
    }

    this.cache = newCache;
    await this.saveCache();
  }

  /**
   * Get unique BoM stations from all zones
   */
  private getUniqueStations(): {
    rainfall: Set<string>;
    ocean: Set<string>;
  } {
    const rainfall = new Set<string>();
    const ocean = new Set<string>();

    for (const zone of ZONES.features) {
      if (zone.properties.bomStations.rainfall) {
        rainfall.add(zone.properties.bomStations.rainfall);
      }
      if (zone.properties.bomStations.waterTemp) {
        ocean.add(zone.properties.bomStations.waterTemp);
      }
      if (zone.properties.bomStations.swell) {
        ocean.add(zone.properties.bomStations.swell);
      }
    }

    return { rainfall, ocean };
  }

  /**
   * Load cache from disk
   */
  private async ensureCacheLoaded(): Promise<void> {
    if (this.cache) {
      // Check if cache is still fresh
      const cacheAge = Date.now() - new Date(this.cache.lastFetch).getTime();
      if (cacheAge < CACHE_DURATION_MS) {
        return;
      }
    }

    // Try to load from disk
    try {
      const data = await fs.readFile(CACHE_FILE, 'utf-8');
      this.cache = JSON.parse(data);

      const cacheAge = Date.now() - new Date(this.cache!.lastFetch).getTime();
      if (cacheAge >= CACHE_DURATION_MS) {
        // Cache is stale, refresh
        await this.refreshData();
      }
    } catch (error) {
      // Cache doesn't exist or is invalid, refresh
      await this.refreshData();
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

    if (cacheAge < CACHE_DURATION_MS) {
      return 'current';
    } else if (cacheAge < 2 * CACHE_DURATION_MS) {
      return 'stale';
    } else {
      return 'degraded';
    }
  }

  /**
   * Get available and missing metrics
   */
  getMetricsStatus(): {
    available: string[];
    missing: string[];
  } {
    if (!this.cache) {
      return { available: [], missing: ['All metrics'] };
    }

    const available: string[] = [];
    const missing: string[] = [];

    if (Object.keys(this.cache.rainfall).length > 0) {
      available.push('Rainfall');
    } else {
      missing.push('Rainfall');
    }

    if (Object.keys(this.cache.waterTemp).length > 0) {
      available.push('Water Temperature');
    } else {
      missing.push('Water Temperature');
    }

    if (Object.keys(this.cache.swell).length > 0) {
      available.push('Swell Height');
    } else {
      missing.push('Swell Height');
    }

    return { available, missing };
  }
}
