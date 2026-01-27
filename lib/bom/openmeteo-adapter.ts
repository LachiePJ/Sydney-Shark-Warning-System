/**
 * Open-Meteo BOM API Adapter
 * Uses real Bureau of Meteorology ACCESS-G model data
 * API: https://open-meteo.com/en/docs/bom-api
 */

import { BomDataPoint } from '@/lib/types';

// Sydney coordinates
const SYDNEY_LAT = -33.8688;
const SYDNEY_LON = 151.2093;

export interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
    precipitation?: number;
  };
  hourly?: {
    time: string[];
    temperature_2m?: number[];
    precipitation?: number[];
    wave_height?: number[];
  };
}

/**
 * Fetch current weather data from Open-Meteo BOM API
 */
export async function fetchOpenMeteoBOMData(): Promise<{
  temperature: BomDataPoint | null;
  rainfall: BomDataPoint[];
  waveHeight: BomDataPoint | null;
}> {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.append('latitude', SYDNEY_LAT.toString());
    url.searchParams.append('longitude', SYDNEY_LON.toString());
    url.searchParams.append('current', 'temperature_2m,precipitation');
    url.searchParams.append('hourly', 'temperature_2m,precipitation');
    url.searchParams.append('timezone', 'Australia/Sydney');
    url.searchParams.append('past_days', '2');
    url.searchParams.append('forecast_days', '1');

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
      throw new Error(`Open-Meteo API returned ${response.status}`);
    }

    const data: OpenMeteoResponse = await response.json();
    const now = new Date().toISOString();

    // Current temperature
    const temperature: BomDataPoint | null = data.current?.temperature_2m
      ? {
          value: data.current.temperature_2m,
          timestamp: now,
          source: 'Bureau of Meteorology (via Open-Meteo API)',
        }
      : null;

    // Rainfall data (last 48 hours)
    const rainfall: BomDataPoint[] = [];
    if (data.hourly?.precipitation && data.hourly?.time) {
      const now = Date.now();
      const hours48Ago = now - 48 * 60 * 60 * 1000;

      data.hourly.time.forEach((time, index) => {
        const timestamp = new Date(time).getTime();
        if (timestamp >= hours48Ago && data.hourly?.precipitation) {
          rainfall.push({
            value: data.hourly.precipitation[index] || 0,
            timestamp: time,
            source: 'Bureau of Meteorology (via Open-Meteo API)',
          });
        }
      });
    }

    // Wave height placeholder (Open-Meteo doesn't provide this in free tier)
    const waveHeight: BomDataPoint | null = null;

    return { temperature, rainfall, waveHeight };
  } catch (error) {
    console.error('Failed to fetch Open-Meteo BOM data:', error);
    return { temperature: null, rainfall: [], waveHeight: null };
  }
}

/**
 * Fetch marine data from Open-Meteo Marine API
 */
export async function fetchMarineData(): Promise<BomDataPoint | null> {
  try {
    const url = new URL('https://marine-api.open-meteo.com/v1/marine');
    url.searchParams.append('latitude', SYDNEY_LAT.toString());
    url.searchParams.append('longitude', SYDNEY_LON.toString());
    url.searchParams.append('current', 'wave_height');
    url.searchParams.append('timezone', 'Australia/Sydney');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url.toString(), {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Marine API returned ${response.status}`);
    }

    const data: any = await response.json();

    if (data.current?.wave_height) {
      return {
        value: data.current.wave_height,
        timestamp: new Date().toISOString(),
        source: 'Open-Meteo Marine API',
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch marine data:', error);
    return null;
  }
}
