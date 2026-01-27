/**
 * BoM Ocean Data Adapter
 * Fetches water temperature and swell data from BoM oceanography feeds
 */

import { BomDataPoint } from '@/lib/types';

const BOM_OCEAN_URL = 'http://www.bom.gov.au/oceanography';

export interface OceanObservation {
  waterTemp?: number;
  swellHeight?: number;
  timestamp: string;
}

/**
 * Fetch ocean observations from BoM
 * Note: BoM provides oceanographic data through various products
 * This adapter targets the Australian Baseline Sea Level Monitoring Project
 * and offshore buoy data
 */
export async function fetchOceanData(stationPath: string): Promise<OceanObservation | null> {
  try {
    // BoM ocean data can be fetched from oceanography endpoints
    // Format: http://www.bom.gov.au/oceanography/projects/abslmp/data/{station}.json
    // Or: http://www.bom.gov.au/fwo/{stationPath}
    
    const url = stationPath.startsWith('http')
      ? stationPath
      : `http://www.bom.gov.au/fwo/${stationPath}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Sydney-Shark-Warning-System/1.0',
      },
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`BoM Ocean API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Parse BoM ocean data structure
    // Structure varies by product, handle multiple formats
    const observations = data?.observations?.data || [];
    
    if (observations.length === 0) {
      return null;
    }

    const latest = observations[0];
    
    return {
      waterTemp: latest.sea_temp || latest.water_temp || null,
      swellHeight: latest.swell_height || latest.wave_height || null,
      timestamp: latest.local_date_time_full || latest.aifstime_utc || new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`Ocean data fetch timeout for ${stationPath}`);
    } else {
      console.error(`Failed to fetch ocean data from ${stationPath}:`, error);
    }
    return null;
  }
}

/**
 * Fetch water temperature from BoM
 */
export async function fetchWaterTemperature(stationPath: string): Promise<BomDataPoint | null> {
  const observation = await fetchOceanData(stationPath);
  
  if (!observation || observation.waterTemp === null || observation.waterTemp === undefined) {
    return null;
  }

  return {
    value: observation.waterTemp,
    timestamp: observation.timestamp,
    source: `BoM Ocean Observations (${stationPath})`,
  };
}

/**
 * Fetch swell height from BoM
 */
export async function fetchSwellHeight(stationPath: string): Promise<BomDataPoint | null> {
  const observation = await fetchOceanData(stationPath);
  
  if (!observation || observation.swellHeight === null || observation.swellHeight === undefined) {
    return null;
  }

  return {
    value: observation.swellHeight,
    timestamp: observation.timestamp,
    source: `BoM Ocean Observations (${stationPath})`,
  };
}

/**
 * Fallback: Fetch from ABSLMP (Australian Baseline Sea Level Monitoring Project)
 * These stations provide tide gauge data which includes sea temperature
 */
export async function fetchABSLMPData(stationId: string): Promise<OceanObservation | null> {
  try {
    // Example: Fort Denison is a key Sydney Harbour station
    // However, BoM's ABSLMP data format may require different parsing
    // This is a fallback adapter
    
    const url = `${BOM_OCEAN_URL}/projects/abslmp/data/${stationId}.json`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // Parse ABSLMP format (structure may vary)
    return {
      waterTemp: data?.latest?.temperature || undefined,
      swellHeight: undefined, // ABSLMP doesn't typically include swell
      timestamp: data?.latest?.timestamp || new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch ABSLMP data for ${stationId}:`, error);
    return null;
  }
}
