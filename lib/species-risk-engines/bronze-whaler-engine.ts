/**
 * Bronze Whaler Risk Engine
 * Carcharhinus brachyurus - Bronze Whaler / Copper Shark
 * 
 * Key behaviors:
 * - Common in surf zones and open beaches
 * - Follows baitfish schools
 * - Moderate temperature range (16-24°C)
 * - Peak activity: Summer/autumn
 * - Generally less dangerous to humans (fewer incidents)
 */

import { BaseSpeciesEngine, SpeciesThresholds, SpeciesWeights } from './base-species-engine';
import { RiskInput } from '@/lib/types';

export class BronzeWhalerEngine extends BaseSpeciesEngine {
  readonly speciesName = 'Bronze Whaler';
  readonly scientificName = 'Carcharhinus brachyurus';

  readonly thresholds: SpeciesThresholds = {
    waterTempMin: 16,
    waterTempMax: 26,
    waterTempOptimal: 20,
    rainfall48h: 50,         // Moderate sensitivity to rainfall
    swellMin: 1.2,           // Active in surf zones
    swellMax: 2.5,
    summerMonths: [10, 11, 0, 1, 2], // Nov-Feb (summer)
  };

  readonly weights: SpeciesWeights = {
    waterTemp: 20,      // Moderate importance
    rainfall: 15,       // Some sensitivity
    swell: 25,          // IMPORTANT - active in surf zones
    season: 20,         // Seasonal presence
    turbidity: 10,      // Some tolerance
  };

  protected getTemperatureConditionName(): string {
    return 'Bronze Whaler Active Temperature';
  }

  protected getRainfallConditionName(): string {
    return 'Moderate Rainfall';
  }

  protected getTurbidityConditionName(): string {
    return 'Moderate Turbidity';
  }

  protected getTemperatureThresholdDisplay(): string {
    return `${this.thresholds.waterTempMin}-${this.thresholds.waterTempMax}°C`;
  }

  protected getRainfallThresholdDisplay(): string {
    return `> ${this.thresholds.rainfall48h}mm (48h)`;
  }

  protected getSwellThresholdDisplay(): string {
    return `${this.thresholds.swellMin}-${this.thresholds.swellMax}m (surf zone)`;
  }

  protected getSeasonDisplay(): string {
    return 'Nov-Feb (summer)';
  }

  /**
   * Bronze Whalers prefer open beaches with surf
   */
  calculateRisk(input: RiskInput): number {
    const baseScore = super.calculateRisk(input);

    // Bronze Whalers favor surf zones at open beaches
    if (input.locationType === 'beach') {
      // Open beaches with surf: +8 points
      return Math.min(100, baseScore + 8);
    } else if (input.locationType === 'bay') {
      // Bays: neutral
      return baseScore;
    } else if (input.locationType === 'harbour') {
      // Rarely in harbours: -10 points
      return Math.max(0, baseScore - 10);
    }

    return baseScore;
  }
}
