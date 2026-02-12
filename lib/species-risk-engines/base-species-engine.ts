/**
 * Base Species Risk Engine
 * Abstract class that all species-specific engines extend
 */

import { RiskInput, Condition } from '@/lib/types';

export interface SpeciesThresholds {
  waterTempMin: number;
  waterTempMax?: number;
  waterTempOptimal?: number;
  rainfall48h?: number;
  swellMin?: number;
  swellMax?: number;
  summerMonths: number[];
}

export interface SpeciesWeights {
  waterTemp: number;
  rainfall: number;
  swell: number;
  season: number;
  turbidity: number;
  // Additional species-specific factors can be added by subclasses
}

export abstract class BaseSpeciesEngine {
  abstract readonly speciesName: string;
  abstract readonly scientificName: string;
  abstract readonly thresholds: SpeciesThresholds;
  abstract readonly weights: SpeciesWeights;
  
  /**
   * Aggression factor: inherent likelihood of this species to attack humans
   * 1.0 = highly aggressive (Bull Shark)
   * 0.3-0.5 = low aggression (Bronze Whaler)
   * 0.7-0.8 = moderate aggression (White Shark - less likely to attack in close proximity)
   */
  abstract readonly aggressionFactor: number;

  /**
   * Calculate raw risk score for this species (0-100)
   * Environmental risk is scaled by aggression factor to reflect actual attack likelihood
   */
  calculateRisk(input: RiskInput): number {
    const conditions = this.evaluateConditions(input);
    const environmentalScore = this.calculateScore(conditions);
    
    // Scale by aggression factor to reflect realistic attack likelihood
    const adjustedScore = environmentalScore * this.aggressionFactor;
    return Math.round(adjustedScore);
  }

  /**
   * Evaluate conditions for this species
   */
  protected evaluateConditions(input: RiskInput): Condition[] {
    const conditions: Condition[] = [];

    // Temperature condition
    const tempMet = this.evaluateTemperature(input.waterTemp);
    conditions.push({
      name: this.getTemperatureConditionName(),
      met: tempMet,
      value: input.waterTemp,
      threshold: this.getTemperatureThresholdDisplay(),
      weight: this.weights.waterTemp,
      source: input.sources?.waterTemp,
      timestamp: input.timestamp,
    });

    // Rainfall condition
    const rainfallMet = this.evaluateRainfall(input.rainfall48h);
    conditions.push({
      name: this.getRainfallConditionName(),
      met: rainfallMet,
      value: input.rainfall48h,
      threshold: this.getRainfallThresholdDisplay(),
      weight: this.weights.rainfall,
      source: input.sources?.rainfall,
      timestamp: input.timestamp,
    });

    // Swell condition
    const swellMet = this.evaluateSwell(input.swellHeight);
    conditions.push({
      name: 'Swell Height in Risk Range',
      met: swellMet,
      value: input.swellHeight,
      threshold: this.getSwellThresholdDisplay(),
      weight: this.weights.swell,
      source: input.sources?.swell,
      timestamp: input.timestamp,
    });

    // Season condition
    conditions.push({
      name: 'Active Season',
      met: input.isSummer,
      value: input.isSummer ? 'Yes' : 'No',
      threshold: this.getSeasonDisplay(),
      weight: this.weights.season,
      source: 'System calculated',
    });

    // Turbidity condition
    const turbidityMet = input.waterQuality === 'poor';
    conditions.push({
      name: this.getTurbidityConditionName(),
      met: turbidityMet,
      value: input.waterQuality,
      threshold: 'Turbid/murky water',
      weight: this.weights.turbidity,
      source: 'Derived from rainfall',
      timestamp: input.timestamp,
    });

    return conditions;
  }

  /**
   * Species-specific temperature evaluation
   */
  protected evaluateTemperature(temp: number | null): boolean {
    if (temp === null) return false;
    
    const meetsMin = temp >= this.thresholds.waterTempMin;
    const meetsMax = this.thresholds.waterTempMax ? temp <= this.thresholds.waterTempMax : true;
    
    return meetsMin && meetsMax;
  }

  /**
   * Species-specific rainfall evaluation
   */
  protected evaluateRainfall(rainfall: number | null): boolean {
    if (rainfall === null || !this.thresholds.rainfall48h) return false;
    return rainfall > this.thresholds.rainfall48h;
  }

  /**
   * Species-specific swell evaluation
   */
  protected evaluateSwell(swell: number | null): boolean {
    if (swell === null) return false;
    if (!this.thresholds.swellMin || !this.thresholds.swellMax) return false;
    
    return swell >= this.thresholds.swellMin && swell <= this.thresholds.swellMax;
  }

  /**
   * Calculate score from conditions
   */
  protected calculateScore(conditions: Condition[]): number {
    let score = 0;
    let totalWeight = 0;

    for (const condition of conditions) {
      totalWeight += condition.weight;
      if (condition.met) {
        score += condition.weight;
      }
    }

    // Normalize to 0-100 scale
    return (score / totalWeight) * 100;
  }

  /**
   * Get active environmental triggers for this species
   */
  getActiveTriggers(input: RiskInput): string[] {
    const triggers: string[] = [];
    const conditions = this.evaluateConditions(input);

    for (const condition of conditions) {
      if (condition.met) {
        triggers.push(`${condition.name}: ${this.formatValue(condition.value)}`);
      }
    }

    return triggers;
  }

  /**
   * Format condition value for display
   */
  protected formatValue(value: any): string {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return String(value);
  }

  // Abstract methods for species-specific display text
  protected abstract getTemperatureConditionName(): string;
  protected abstract getRainfallConditionName(): string;
  protected abstract getTurbidityConditionName(): string;
  protected abstract getTemperatureThresholdDisplay(): string;
  protected abstract getRainfallThresholdDisplay(): string;
  protected abstract getSwellThresholdDisplay(): string;
  protected abstract getSeasonDisplay(): string;
}
