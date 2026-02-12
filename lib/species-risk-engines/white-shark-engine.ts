/**
 * White Shark Risk Engine
 * Carcharodon carcharias - Great White Shark
 * 
 * Key behaviors:
 * - Prefers cooler water (12-20°C optimal)
 * - Follows seal colonies and baitfish schools
 * - Peak activity: Winter/spring (May-Oct)
 * - Open ocean and coastal shelf habitat
 * - Rarely enters estuaries or harbours
 */

import { BaseSpeciesEngine, SpeciesThresholds, SpeciesWeights } from './base-species-engine';
import { RiskInput } from '@/lib/types';

export class WhiteSharkEngine extends BaseSpeciesEngine {
  readonly speciesName = 'White Shark';
  readonly scientificName = 'Carcharodon carcharias';

  readonly thresholds: SpeciesThresholds = {
    waterTempMin: 12,        // Can tolerate cold water
    waterTempMax: 22,        // Prefers cooler than Bull Sharks
    waterTempOptimal: 16,    // Optimal hunting temp
    rainfall48h: 100,        // Rainfall mostly irrelevant (high threshold = rarely met)
    swellMin: 1.5,
    swellMax: 3.5,           // Tolerates higher swell
    summerMonths: [4, 5, 6, 7, 8, 9], // May-Oct (winter/spring peak)
  };

  readonly weights: SpeciesWeights = {
    waterTemp: 25,      // Important but not catastrophic on its own
    rainfall: 5,        // Mostly irrelevant for White Sharks
    swell: 15,          // More relevant - White Sharks in surf zones
    season: 20,         // Seasonal pattern but present year-round
    turbidity: 10,      // Prefer clear water but not a huge factor
  };

  protected getTemperatureConditionName(): string {
    return 'White Shark Optimal Temperature';
  }

  protected getRainfallConditionName(): string {
    return 'Rainfall (minimal impact)';
  }

  protected getTurbidityConditionName(): string {
    return 'Water Clarity (White Sharks prefer clear)';
  }

  protected getTemperatureThresholdDisplay(): string {
    return `${this.thresholds.waterTempMin}-${this.thresholds.waterTempMax}°C (cooler)`;
  }

  protected getRainfallThresholdDisplay(): string {
    return 'N/A (not a factor)';
  }

  protected getSwellThresholdDisplay(): string {
    return `${this.thresholds.swellMin}-${this.thresholds.swellMax}m`;
  }

  protected getSeasonDisplay(): string {
    return 'May-Oct (winter/spring)';
  }

  /**
   * White Sharks AVOID turbid water (prefer clear water for visual hunting)
   */
  protected evaluateConditions(input: RiskInput) {
    const conditions = super.evaluateConditions(input);

    // Invert turbidity condition for White Sharks
    const turbidityCondition = conditions.find(c => c.name.includes('Clarity'));
    if (turbidityCondition) {
      // White Sharks prefer CLEAR water (opposite of Bull Sharks)
      turbidityCondition.met = input.waterQuality === 'good';
      turbidityCondition.threshold = 'Clear water (preferred)';
    }

    return conditions;
  }

  /**
   * Apply location-specific multiplier
   */
  calculateRisk(input: RiskInput): number {
    const baseScore = super.calculateRisk(input);

    // White Sharks prefer open ocean, avoid harbours
    if (input.locationType === 'harbour') {
      // Rarely enter harbours: -20 points
      return Math.max(0, baseScore - 20);
    } else if (input.locationType === 'bay') {
      // Occasionally in bays: -10 points
      return Math.max(0, baseScore - 10);
    } else if (input.locationType === 'beach') {
      // Open beaches: +3 points (preferred but not extreme)
      return Math.min(100, baseScore + 3);
    }

    return baseScore;
  }
}
