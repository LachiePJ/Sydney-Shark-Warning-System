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
    this.engines = new Map<string, BaseSpeciesEngine>();
    this.engines.set('bull-shark', new BullSharkEngine());
    this.engines.set('white-shark', new WhiteSharkEngine());
    this.engines.set('bronze-whaler', new BronzeWhalerEngine());
    this.engines.set('tiger-shark', new TigerSharkEngine());
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

    // Calculate overall risk weighted by likelihood and incident history
    const overallScore = this.calculateWeightedOverallRisk(speciesRisks);
    const primarySpecies = speciesRisks[0];
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
   * Calculate overall risk weighted by species likelihood and incident history
   * Rare species with low incident history contribute less to overall score
   */
  private calculateWeightedOverallRisk(speciesRisks: SpeciesRisk[]): number {
    if (speciesRisks.length === 0) return 0;

    let weightedSum = 0;
    let totalWeight = 0;

    for (const species of speciesRisks) {
      // Likelihood weight
      const likelihoodWeight = 
        species.likelihood === 'common' ? 1.0 :
        species.likelihood === 'occasional' ? 0.6 :
        0.3; // rare

      // Incident history weight
      const incidentWeight = 
        species.incidentHistory === 'high' ? 1.0 :
        species.incidentHistory === 'moderate' ? 0.7 :
        0.4; // low

      // Combined weight
      const weight = likelihoodWeight * incidentWeight;

      weightedSum += species.score * weight;
      totalWeight += weight;
    }

    return Math.round(weightedSum / totalWeight);
  }

  /**
   * Generate multi-species explanation
   */
  private generateExplanation(
    speciesRisks: SpeciesRisk[],
    input: RiskInput
  ): RiskExplanation {
    const primarySpecies = speciesRisks[0];
    const significantSpecies = speciesRisks.filter(s => s.likelihood !== 'rare' || s.score > 30);
    const secondarySpecies = significantSpecies.filter(s => s.score > 20 && s !== primarySpecies);

    let reasoning = '';

    // Only show primary threat if it's actually significant
    if (primarySpecies.score > 20 || primarySpecies.likelihood === 'common') {
      reasoning += `Primary threat: ${primarySpecies.species} (${primarySpecies.likelihood} at this location, ${primarySpecies.incidentHistory} incident history). `;

      if (primarySpecies.activeTriggers.length > 0) {
        reasoning += `Active conditions: ${primarySpecies.activeTriggers.slice(0, 3).join(', ')}. `;
      }
    } else {
      reasoning += `Low overall risk - no significant shark activity detected for current conditions. `;
    }

    if (secondarySpecies.length > 0) {
      const names = secondarySpecies.map(s => s.species).join(', ');
      reasoning += `Also present: ${names}. `;
    }

    // Add species absence note for rare species
    const rareSpecies = speciesRisks.filter(s => s.likelihood === 'rare' && s.score < 20);
    if (rareSpecies.length > 0) {
      const rareNames = rareSpecies.map(s => s.species).join(', ');
      reasoning += `${rareNames} rarely occur at this location. `;
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
