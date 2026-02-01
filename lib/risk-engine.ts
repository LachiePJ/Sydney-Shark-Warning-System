/**
 * Risk Scoring Engine
 * Implements the rule-based scoring logic for shark risk assessment
 */

import {
  DEFAULT_THRESHOLDS,
  DEFAULT_WEIGHTS,
  getRiskLevelFromScore,
  RiskThresholds,
  RiskWeights,
} from '@/config/risk-config';
import { RiskInput, RiskResult, Condition, RiskExplanation } from '@/lib/types';

export interface RiskEngineConfig {
  thresholds?: Partial<RiskThresholds>;
  weights?: Partial<RiskWeights>;
}

export class RiskEngine {
  private thresholds: RiskThresholds;
  private weights: RiskWeights;

  constructor(config: RiskEngineConfig = {}) {
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...config.thresholds };
    this.weights = { ...DEFAULT_WEIGHTS, ...config.weights };
  }

  /**
   * Calculate risk score and level based on input conditions
   */
  calculateRisk(input: RiskInput): RiskResult {
    const conditions = this.evaluateConditions(input);
    const score = this.calculateScore(conditions, input);
    const confidence = this.calculateConfidence(input);
    const levelConfig = getRiskLevelFromScore(score);

    const explanation: RiskExplanation = {
      conditionsMet: conditions,
      missingData: this.getMissingData(input),
      reasoning: this.generateReasoning(conditions, score, input),
    };

    return {
      level: levelConfig.level,
      score,
      color: levelConfig.color,
      guidance: levelConfig.guidance,
      explanation,
      confidence,
      timestamp: input.timestamp,
      debug: {
        rawInput: input,  // Include raw input for debugging
      },
    };
  }

  /**
   * Evaluate each risk condition
   */
  private evaluateConditions(input: RiskInput): Condition[] {
    const conditions: Condition[] = [];

    // Helper to format data age
    const getDataAge = (timestamp?: string): string => {
      if (!timestamp) return 'Unknown';
      const age = Date.now() - new Date(timestamp).getTime();
      const minutes = Math.floor(age / 60000);
      const hours = Math.floor(minutes / 60);
      if (hours > 0) return `${hours}h ago`;
      if (minutes > 0) return `${minutes}min ago`;
      return 'Just now';
    };

    // Condition 1: Water temperature (Bull Shark threshold: 18°C)
    conditions.push({
      name: 'High Water Temperature',
      met: input.waterTemp !== null && input.waterTemp > this.thresholds.waterTemp,
      value: input.waterTemp,
      threshold: `> ${this.thresholds.waterTemp}°C`,
      weight: this.weights.waterTemp,
      source: input.sources?.waterTemp,
      timestamp: input.timestamp,
      dataAge: getDataAge(input.timestamp),
    });

    // Condition 2: Significant rainfall (Bull Sharks respond to 30mm+)
    // This is the PRIMARY driver for Bull Shark movement into coastal areas
    conditions.push({
      name: 'Heavy Rainfall (48h)',
      met: input.rainfall48h !== null && input.rainfall48h > this.thresholds.rainfall48h,
      value: input.rainfall48h,
      threshold: `> ${this.thresholds.rainfall48h}mm`,
      weight: this.weights.rainfall,
      source: input.sources?.rainfall,
      timestamp: input.timestamp,
      dataAge: getDataAge(input.timestamp),
    });

    // Condition 3: Swell in risk range (less relevant for Bull Sharks)
    const swellInRange = input.swellHeight !== null &&
      input.swellHeight >= this.thresholds.swellMin &&
      input.swellHeight <= this.thresholds.swellMax;
    
    conditions.push({
      name: 'Swell Height in Risk Range',
      met: swellInRange,
      value: input.swellHeight,
      threshold: `${this.thresholds.swellMin}m - ${this.thresholds.swellMax}m`,
      weight: this.weights.swell,
      source: input.sources?.swell,
      timestamp: input.timestamp,
      dataAge: getDataAge(input.timestamp),
    });

    // Condition 4: Summer/warm season (extended to Nov-Apr for Bull Sharks)
    conditions.push({
      name: 'Summer Season',
      met: input.isSummer,
      value: input.isSummer ? 'Yes' : 'No',
      threshold: 'Nov-Apr',
      weight: this.weights.season,
      source: 'System calculated',
      dataAge: 'Current',
    });

    // Condition 5: Turbidity/runoff (Bull Sharks ATTRACTED to this)
    conditions.push({
      name: 'High Turbidity / Post-Rainfall',
      met: input.waterQuality === 'poor',
      value: input.waterQuality,
      threshold: 'Turbid/reduced salinity',
      weight: this.weights.waterQuality,
      source: 'Derived from rainfall data',
      timestamp: input.timestamp,
      dataAge: getDataAge(input.timestamp),
    });

    return conditions;
  }

  /**
   * Calculate overall risk score (0-100) with location-based Bull Shark adjustment
   */
  private calculateScore(conditions: Condition[], input?: RiskInput): number {
    let score = 0;
    let totalWeight = 0;

    for (const condition of conditions) {
      totalWeight += condition.weight;
      if (condition.met) {
        score += condition.weight;
      }
    }

    // Normalize to 0-100 scale
    let normalizedScore = (score / totalWeight) * 100;

    // LOCATION-BASED ADJUSTMENT for Bull Shark habitat preference
    // Bull Sharks prefer estuaries, harbours, and areas with freshwater influence
    if (input?.bullSharkRisk) {
      if (input.bullSharkRisk === 'high') {
        // Harbour/estuary locations: +10 points (Bull Sharks actively seek these areas)
        normalizedScore = Math.min(100, normalizedScore + 10);
      } else if (input.bullSharkRisk === 'moderate') {
        // Bay/near-estuary locations: +5 points
        normalizedScore = Math.min(100, normalizedScore + 5);
      }
      // 'low' = open ocean beaches: no adjustment (Bull Sharks less common)
    }

    // If ALL conditions are met, escalate to catastrophic (>80)
    const allConditionsMet = conditions.every(c => c.met);
    if (allConditionsMet) {
      return 90; // Catastrophic
    }

    return Math.round(normalizedScore);
  }

  /**
   * Calculate confidence based on data availability
   */
  private calculateConfidence(input: RiskInput): 'high' | 'medium' | 'low' {
    const availableDataPoints = [
      input.waterTemp,
      input.rainfall48h,
      input.swellHeight,
    ].filter(v => v !== null).length;

    if (availableDataPoints === 3 && input.waterQuality !== 'unknown') {
      return 'high';
    } else if (availableDataPoints >= 2) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Get list of missing data fields
   */
  private getMissingData(input: RiskInput): string[] {
    const missing: string[] = [];

    if (input.waterTemp === null) missing.push('Water Temperature');
    if (input.rainfall48h === null) missing.push('Rainfall Data');
    if (input.swellHeight === null) missing.push('Swell Height');
    if (input.waterQuality === 'unknown') missing.push('Water Quality (proxy)');

    return missing;
  }

  /**
   * Generate human-readable reasoning with Bull Shark context
   */
  private generateReasoning(conditions: Condition[], score: number, input?: RiskInput): string {
    const metConditions = conditions.filter(c => c.met);
    const count = metConditions.length;

    let baseReasoning = '';
    
    if (count === 0) {
      baseReasoning = 'No elevated risk conditions are currently present.';
    } else if (count === 1) {
      baseReasoning = `One risk factor detected: ${metConditions[0].name}. Risk remains relatively low.`;
    } else if (count === 2) {
      baseReasoning = `Two risk factors present: ${metConditions.map(c => c.name).join(' and ')}. Moderate caution advised.`;
    } else if (count === conditions.length) {
      baseReasoning = `ALL risk factors are present. Conditions are highly favourable for increased shark activity. Do not swim.`;
    } else {
      baseReasoning = `Multiple risk factors detected (${count}/${conditions.length}). Exercise significant caution.`;
    }

    // Add location-specific Bull Shark context
    if (input?.bullSharkRisk === 'high') {
      baseReasoning += ' This harbour/estuary location has elevated Bull Shark risk.';
    } else if (input?.bullSharkRisk === 'moderate') {
      baseReasoning += ' This location has moderate Bull Shark presence.';
    }

    return baseReasoning;
  }

  /**
   * Derive water quality proxy from rainfall
   * Heavy rainfall typically means increased runoff and turbidity
   */
  static deriveWaterQuality(rainfall48h: number | null): 'good' | 'poor' | 'unknown' {
    if (rainfall48h === null) return 'unknown';
    
    // If significant rainfall, assume poor water quality due to runoff
    if (rainfall48h > 45) {
      return 'poor';
    } else if (rainfall48h > 20) {
      return 'poor'; // Moderate runoff
    } else {
      return 'good';
    }
  }
}
