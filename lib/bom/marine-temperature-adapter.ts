/**
 * Marine Temperature Adapter
 * Fetches real ocean temperature data for Sydney beaches
 */

import { BomDataPoint } from '@/lib/types';

// Beach coordinates for Sydney
const BEACHES = {
  manly: { lat: -33.7969, lon: 151.2887, name: 'Manly' },
  bondi: { lat: -33.8915, lon: 151.2767, name: 'Bondi' },
  coogee: { lat: -33.9233, lon: 151.2585, name: 'Coogee' },
  maroubra: { lat: -33.9501, lon: 151.2591, name: 'Maroubra' },
  cronulla: { lat: -34.0576, lon: 151.1532, name: 'Cronulla' },
  palmBeach: { lat: -33.6005, lon: 151.3216, name: 'Palm Beach' },
  sydneyHarbour: { lat: -33.8688, lon: 151.2093, name: 'Sydney Harbour' },
};

interface MarineData {
  temperature: BomDataPoint | null;
  waveHeight: BomDataPoint | null;
}

/**
 * Fetch marine data (sea surface temperature and wave height) from Open-Meteo Marine API
 */
export async function fetchMarineDataForBeach(
  beachKey: keyof typeof BEACHES
): Promise<MarineData> {
  try {
    const beach = BEACHES[beachKey];
    const url = new URL('https://marine-api.open-meteo.com/v1/marine');
    
    url.searchParams.append('latitude', beach.lat.toString());
    url.searchParams.append('longitude', beach.lon.toString());
    url.searchParams.append('current', 'sea_surface_temperature,wave_height');
    url.searchParams.append('timezone', 'Australia/Sydney');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Sydney-Shark-Warning-System/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Marine API returned ${response.status}`);
    }

    const data = await response.json();
    const now = new Date().toISOString();

    const temperature: BomDataPoint | null = data.current?.sea_surface_temperature
      ? {
          value: data.current.sea_surface_temperature,
          timestamp: now,
          source: `Marine Data (${beach.name})`,
        }
      : null;

    const waveHeight: BomDataPoint | null = data.current?.wave_height
      ? {
          value: data.current.wave_height,
          timestamp: now,
          source: `Marine Data (${beach.name})`,
        }
      : null;

    return { temperature, waveHeight };
  } catch (error) {
    console.error(`Failed to fetch marine data for ${beachKey}:`, error);
    return { temperature: null, waveHeight: null };
  }
}

/**
 * Fetch marine data for all Sydney beaches
 */
export async function fetchAllBeachesMarineData(): Promise<Record<string, MarineData>> {
  const results: Record<string, MarineData> = {};
  
  // Fetch data for all beaches in parallel
  const promises = Object.keys(BEACHES).map(async (beachKey) => {
    const data = await fetchMarineDataForBeach(beachKey as keyof typeof BEACHES);
    results[beachKey] = data;
  });

  await Promise.all(promises);
  
  return results;
}

/**
 * Get average ocean temperature across all Sydney beaches
 */
export async function getAverageOceanTemperature(): Promise<BomDataPoint | null> {
  const allData = await fetchAllBeachesMarineData();
  
  const temperatures = Object.values(allData)
    .map(d => d.temperature?.value)
    .filter((v): v is number => v !== null && v !== undefined);

  if (temperatures.length === 0) return null;

  const average = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

  return {
    value: average,
    timestamp: new Date().toISOString(),
    source: 'Marine Data (Sydney average)',
  };
}
