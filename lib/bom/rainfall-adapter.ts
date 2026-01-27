/**
 * BoM Rainfall Data Adapter
 * Fetches rainfall data from Bureau of Meteorology JSON feeds
 */

import { BomDataPoint } from '@/lib/types';

const BOM_BASE_URL = 'http://www.bom.gov.au/fwo';

export interface RainfallReading {
  timestamp: string;
  rainfall: number; // mm
}

/**
 * Fetch rainfall data for a specific BoM station
 * @param stationId - BoM station ID (e.g., '066062' for Sydney Observatory Hill)
 * @returns Array of rainfall readings over the last 48+ hours
 */
export async function fetchRainfallData(stationId: string): Promise<BomDataPoint[]> {
  try {
    // BoM observation JSON format: /fwo/IDN60901/IDN60901.{stationId}.json
    const url = `${BOM_BASE_URL}/IDN60901/IDN60901.${stationId}.json`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Sydney-Shark-Warning-System/1.0',
      },
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`BoM API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Parse BoM JSON structure
    const observations = data?.observations?.data || [];
    const station = data?.observations?.header?.[0];
    
    const readings: BomDataPoint[] = observations
      .filter((obs: any) => obs.rain_trace !== undefined && obs.rain_trace !== null)
      .map((obs: any) => ({
        value: parseFloat(obs.rain_trace) || 0,
        timestamp: obs.local_date_time_full || obs.aifstime_utc,
        source: `BoM Station ${stationId} (${station?.name || 'Unknown'})`,
        stationId,
      }));

    return readings;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`Rainfall fetch timeout for station ${stationId}`);
    } else {
      console.error(`Failed to fetch rainfall data for station ${stationId}:`, error);
    }
    return [];
  }
}

/**
 * Calculate total rainfall over the last 48 hours
 */
export function calculate48hRainfall(readings: BomDataPoint[]): number {
  if (readings.length === 0) return 0;

  const now = new Date();
  const hours48Ago = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  const recentReadings = readings.filter(reading => {
    const readingDate = new Date(reading.timestamp);
    return readingDate >= hours48Ago && readingDate <= now;
  });

  // Sum all rainfall values
  return recentReadings.reduce((sum, reading) => sum + reading.value, 0);
}

/**
 * Check if any single day in the last 48h had > threshold mm
 */
export function hasSignificantDailyRainfall(
  readings: BomDataPoint[],
  threshold: number = 45
): boolean {
  if (readings.length === 0) return false;

  const now = new Date();
  const hours48Ago = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  // Group by day
  const dailyTotals = new Map<string, number>();

  readings
    .filter(reading => {
      const readingDate = new Date(reading.timestamp);
      return readingDate >= hours48Ago && readingDate <= now;
    })
    .forEach(reading => {
      const date = new Date(reading.timestamp).toISOString().split('T')[0];
      dailyTotals.set(date, (dailyTotals.get(date) || 0) + reading.value);
    });

  return Array.from(dailyTotals.values()).some(total => total > threshold);
}
