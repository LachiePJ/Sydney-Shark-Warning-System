/**
 * Bull Shark Risk Engine
 * Carcharhinus leucas - Primary species in Sydney incidents
 * 
 * Key behaviors:
 * - Euryhaline (tolerates fresh/brackish water)
 * - Actively seeks estuarine environments after rainfall
 * - Hunts effectively in turbid water using electroreception
 * - Peak activity: Summer/warm months (Nov-Apr)
 * - Temperature range: 18-28°C
 */

import { BaseSpeciesEngine, SpeciesThresholds, SpeciesWeights } from './base-species-engine';
import { RiskInput } from '@/lib/types';

export class BullSharkEngine extends BaseSpeciesEngine {
  readonly speciesName = 'Bull Shark';
  readonly scientificName = 'Carcharhinus leucas';

  readonly thresholds: SpeciesThresholds = {
    waterTempMin: 18,        // Active at lower temps than most species
    waterTempMax: 32,        // Upper tolerance limit
    waterTempOptimal: 24,    // Optimal hunting temp
    rainfall48h: 30,         // Responds to moderate rainfall
    swellMin: 1.8,
    swellMax: 2.8,
    summerMonths: [10, 11, 0, 1, 2, 3], // Nov-Apr (extended season)
  };

  readonly weights: SpeciesWeights = {
    waterTemp: 15,      // Moderate importance
    rainfall: 35,       // PRIMARY DRIVER - Bull Sharks seek rainfall runoff
    swell: 10,          // Less relevant (prefer calm estuarine waters)
    season: 5,          // Present year-round, but more active in summer
    turbidity: 25,      // IMPORTANT - actively attracted to turbid water
  };

  protected getTemperatureConditionName(): string {
    return 'Bull Shark Active Temperature';
  }

  protected getRainfallConditionName(): string {
    return 'Rainfall (Bull Shark Attractant)';
  }

  protected getTurbidityConditionName(): string {
    return 'High Turbidity (Bull Shark Hunting Conditions)';
  }

  protected getTemperatureThresholdDisplay(): string {
    return `${this.thresholds.waterTempMin}-${this.thresholds.waterTempMax}°C`;
  }

  protected getRainfallThresholdDisplay(): string {
    return `> ${this.thresholds.rainfall48h}mm (48h)`;
  }

  protected getSwellThresholdDisplay(): string {
    return `${this.thresholds.swellMin}-${this.thresholds.swellMax}m`;
  }

  protected getSeasonDisplay(): string {
    return 'Nov-Apr (peak season)';
  }

  /**
   * Bull Sharks are strongly attracted to turbid, low-salinity water
   */
  protected evaluateRainfall(rainfall: number | null): boolean {
    if (rainfall === null) return false;
    // Bull Sharks respond to even moderate rainfall
    return rainfall > this.thresholds.rainfall48h!;
  }

  /**
   * Apply location-specific multiplier for estuarine habitats
   */
  calculateRisk(input: RiskInput): number {
    const baseScore = super.calculateRisk(input);

    // Bull Sharks have strong habitat preferences
    let locationMultiplier = 1.0;

    if (input.bullSharkRisk === 'high') {
      // Harbour/estuary: +15 points (strong preference)
      return Math.min(100, baseScore + 15);
    } else if (input.bullSharkRisk === 'moderate') {
      // Bay/near-estuary: +8 points
      return Math.min(100, baseScore + 8);
    }
    // Open ocean: -5 points (less preferred)
    else if (input.bullSharkRisk === 'low') {
      return Math.max(0, baseScore - 5);
    }

    return baseScore;
  }
}
