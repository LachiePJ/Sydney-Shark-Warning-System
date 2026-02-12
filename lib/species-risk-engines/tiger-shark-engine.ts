/**
 * Tiger Shark Risk Engine
 * Galeocerdo cuvier - Tiger Shark
 * 
 * Key behaviors:
 * - Warm water species (20-30°C preferred)
 * - Peak activity: Summer
 * - Follows turtle migrations
 * - Opportunistic predator (wide diet)
 * - More common in tropical/subtropical waters
 * - Occasional visitor to Sydney (rare)
 */

import { BaseSpeciesEngine, SpeciesThresholds, SpeciesWeights } from './base-species-engine';
import { RiskInput } from '@/lib/types';

export class TigerSharkEngine extends BaseSpeciesEngine {
  readonly speciesName = 'Tiger Shark';
  readonly scientificName = 'Galeocerdo cuvier';
  
  /**
   * Tiger Sharks are aggressive and considered one of the most dangerous species
   * Will eat almost anything, less discerning than most sharks
   */
  readonly aggressionFactor = 0.9;

  readonly thresholds: SpeciesThresholds = {
    waterTempMin: 20,        // Warm water species
    waterTempMax: 35,        // High tolerance
    waterTempOptimal: 26,    // Tropical optimal
    rainfall48h: 40,
    swellMin: 1.5,
    swellMax: 3.0,
    summerMonths: [11, 0, 1, 2], // Dec-Feb (peak summer)
  };

  readonly weights: SpeciesWeights = {
    waterTemp: 40,      // PRIMARY FACTOR - warm water species
    rainfall: 10,       // Some tolerance
    swell: 12,
    season: 25,         // Strong summer preference
    turbidity: 8,       // Tolerant of various conditions
  };

  protected getTemperatureConditionName(): string {
    return 'Tiger Shark Warm Water Preference';
  }

  protected getRainfallConditionName(): string {
    return 'Rainfall (moderate impact)';
  }

  protected getTurbidityConditionName(): string {
    return 'Water Conditions';
  }

  protected getTemperatureThresholdDisplay(): string {
    return `> ${this.thresholds.waterTempMin}°C (warm water)`;
  }

  protected getRainfallThresholdDisplay(): string {
    return `> ${this.thresholds.rainfall48h}mm (48h)`;
  }

  protected getSwellThresholdDisplay(): string {
    return `${this.thresholds.swellMin}-${this.thresholds.swellMax}m`;
  }

  protected getSeasonDisplay(): string {
    return 'Dec-Feb (peak summer)';
  }

  /**
   * Tiger Sharks are more common in tropical regions
   * Sydney is at the southern edge of their range
   */
  calculateRisk(input: RiskInput): number {
    const baseScore = super.calculateRisk(input);

    // In Sydney, Tiger Sharks are relatively rare visitors
    // Apply a general reduction factor for Sydney region
    const sydneyFactor = 0.7; // 30% reduction for temperate location

    return Math.round(baseScore * sydneyFactor);
  }
}
