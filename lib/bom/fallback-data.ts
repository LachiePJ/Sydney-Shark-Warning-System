/**
 * Fallback data and synthetic data generation for development/testing
 * Also provides default values when BoM data is unavailable
 */

import { BomDataPoint, RiskInput } from '@/lib/types';

/**
 * Generate realistic synthetic ocean data based on season
 * Used as fallback when BoM APIs are unavailable
 */
export function generateFallbackOceanData(): {
  waterTemp: BomDataPoint;
  swellHeight: BomDataPoint;
} {
  const now = new Date();
  const month = now.getMonth();
  
  // Sydney water temperature varies by season
  // Summer (Dec-Feb): 21-24°C
  // Autumn (Mar-May): 19-22°C
  // Winter (Jun-Aug): 16-18°C
  // Spring (Sep-Nov): 17-20°C
  
  let waterTemp: number;
  if (month >= 11 || month <= 1) { // Summer
    waterTemp = 21 + Math.random() * 3;
  } else if (month >= 2 && month <= 4) { // Autumn
    waterTemp = 19 + Math.random() * 3;
  } else if (month >= 5 && month <= 7) { // Winter
    waterTemp = 16 + Math.random() * 2;
  } else { // Spring
    waterTemp = 17 + Math.random() * 3;
  }
  
  // Typical Sydney swell: 1.0-2.5m
  const swellHeight = 1.0 + Math.random() * 1.5;
  
  return {
    waterTemp: {
      value: parseFloat(waterTemp.toFixed(1)),
      timestamp: now.toISOString(),
      source: 'Fallback synthetic data (BoM unavailable)',
    },
    swellHeight: {
      value: parseFloat(swellHeight.toFixed(1)),
      timestamp: now.toISOString(),
      source: 'Fallback synthetic data (BoM unavailable)',
    },
  };
}

/**
 * Generate fallback rainfall data
 */
export function generateFallbackRainfallData(): BomDataPoint[] {
  const now = new Date();
  const readings: BomDataPoint[] = [];
  
  // Generate hourly readings for last 48 hours
  // Typical Sydney rainfall pattern
  for (let i = 0; i < 48; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const rainfall = Math.random() > 0.8 ? Math.random() * 5 : 0; // 20% chance of rain
    
    readings.push({
      value: parseFloat(rainfall.toFixed(1)),
      timestamp: timestamp.toISOString(),
      source: 'Fallback synthetic data',
      stationId: 'synthetic',
    });
  }
  
  return readings;
}

/**
 * Get default risk input when data is unavailable
 * Returns safe/neutral values
 */
export function getDefaultRiskInput(): RiskInput {
  const now = new Date();
  const month = now.getMonth();
  const isSummer = [10, 11, 0, 1].includes(month);
  
  return {
    waterTemp: null,
    rainfall48h: null,
    swellHeight: null,
    isSummer,
    waterQuality: 'unknown',
    timestamp: now.toISOString(),
  };
}
