/**
 * Multi-Species Risk Calculator
 * Calculates risk for multiple shark species and determines overall threat
 */

import { RiskInput, SpeciesRisk, RiskResult, RiskExplanation } from '@/lib/types';
import { getRiskLevelFromScore } from '@/config/risk-config';
import {
  BullSharkEngine,
  WhiteSharkEngine,
  BronzeWhalerEngine,
  TigerSharkEngine,
  BaseSpeciesEngine,
} from './species-risk-engines';
import { SpeciesProfile } from '@/config/zones';

export class MultiSpeciesCalculator {
  private engines: Map<string, BaseSpeciesEngine>;

  constructor() {
    this.engines = new Map([
      ['bull-shark', new BullSharkEngine()],
      ['white-shark', new WhiteSharkEngine()],
      ['bronze-whaler', new BronzeWhalerEngine()],
      ['tiger-shark', new TigerSharkEngine()],
    ]);
  }

  /**
   * Calculate risk for all species at a location
   */
  calculateMultiSpeciesRisk(
    input: RiskInput,
    speciesProfiles: SpeciesProfile[]
  ): RiskResult {
    const speciesRisks: SpeciesRisk[] = [];

    // Calculate risk for each species present at this location
    for (const profile of speciesProfiles) {
      const engine = this.engines.get(profile.type);
      if (!engine) continue;

      // Calculate base risk for this species
      const baseScore = engine.calculateRisk(input);

      // Apply location-specific multiplier
      const weightedScore = Math.round(baseScore * profile.weightMultiplier);
      const finalScore = Math.min(100, Math.max(0, weightedScore));

      // Get active environmental triggers
      const activeTriggers = engine.getActiveTriggers(input);

      speciesRisks.push({
        species: engine.speciesName,
        scientificName: engine.scientificName,
        score: finalScore,
        likelihood: profile.likelihood,
        incidentHistory: profile.incidentHistory,
        activeTriggers,
      });
    }

    // Sort by score (highest first)
    speciesRisks.sort((a, b) => b.score - a.score);

    // Overall risk = highest species risk
    const primarySpecies = speciesRisks[0];
    const overallScore = primarySpecies.score;
    const levelConfig = getRiskLevelFromScore(overallScore);

    // Generate explanation
    const explanation = this.generateExplanation(speciesRisks, input);

    return {
      level: levelConfig.level,
      score: overallScore,
      color: levelConfig.color,
      guidance: this.generateGuidance(levelConfig.guidance, primarySpecies),
      explanation,
      confidence: this.calculateConfidence(input),
      timestamp: input.timestamp,
      bySpecies: speciesRisks,
      primaryThreat: primarySpecies.species,
    };
  }

  /**
   * Generate multi-species explanation
   */
  private generateExplanation(
    speciesRisks: SpeciesRisk[],
    input: RiskInput
  ): RiskExplanation {
    const primarySpecies = speciesRisks[0];
    const secondarySpecies = speciesRisks.filter(s => s.score > 20 && s !== primarySpecies);

    let reasoning = `Primary threat: ${primarySpecies.species} (${primarySpecies.likelihood}, ${primarySpecies.incidentHistory} incident history). `;

    if (primarySpecies.activeTriggers.length > 0) {
      reasoning += `Active conditions: ${primarySpecies.activeTriggers.slice(0, 3).join(', ')}. `;
    }

    if (secondarySpecies.length > 0) {
      const names = secondarySpecies.map(s => s.species).join(', ');
      reasoning += `Secondary concerns: ${names}. `;
    }

    // Build combined conditions for explanation
    const allConditions = this.buildCombinedConditions(speciesRisks);

    return {
      conditionsMet: allConditions,
      missingData: this.getMissingData(input),
      reasoning,
    };
  }

  /**
   * Build combined condition list from species risks
   */
  private buildCombinedConditions(speciesRisks: SpeciesRisk[]) {
    // Use the primary species' triggers as the main conditions
    const primary = speciesRisks[0];
    
    return primary.activeTriggers.map((trigger, idx) => ({
      name: trigger.split(':')[0],
      met: true,
      value: trigger.split(':')[1]?.trim() || '',
      threshold: '',
      weight: 0,
    }));
  }

  /**
   * Generate species-specific guidance
   */
  private generateGuidance(baseGuidance: string, primarySpecies: SpeciesRisk): string {
    let guidance = baseGuidance;

    // Add species-specific advice
    if (primarySpecies.species === 'Bull Shark' && primarySpecies.score > 40) {
      guidance += ' Bull Sharks present - avoid murky water and areas near river mouths after rainfall.';
    } else if (primarySpecies.species === 'White Shark' && primarySpecies.score > 40) {
      guidance += ' White Shark activity possible - avoid dawn/dusk and areas near seal colonies.';
    } else if (primarySpecies.species === 'Bronze Whaler' && primarySpecies.score > 40) {
      guidance += ' Bronze Whalers in surf zones - swim at patrolled beaches and avoid schools of baitfish.';
    }

    return guidance;
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
    if (input.waterQuality === 'unknown') missing.push('Water Quality');

    return missing;
  }
}
