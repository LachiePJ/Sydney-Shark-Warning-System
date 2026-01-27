/**
 * Risk Configuration
 * Define thresholds, weights, and zone definitions for the shark warning system
 */

export interface RiskThresholds {
  waterTemp: number;      // °C - above this increases risk
  rainfall48h: number;    // mm - total over 48h that indicates significant runoff
  swellMin: number;       // m - minimum swell for elevated risk
  swellMax: number;       // m - maximum swell for elevated risk
  summerMonths: number[]; // months (0-11) considered "summer"
}

export interface RiskWeights {
  waterTemp: number;
  rainfall: number;
  swell: number;
  season: number;
  waterQuality: number;
}

export const DEFAULT_THRESHOLDS: RiskThresholds = {
  waterTemp: 20,          // > 20°C
  rainfall48h: 60,        // > 60mm total in 48h
  swellMin: 1.8,          // 1.8m - 2.8m range
  swellMax: 2.8,
  summerMonths: [10, 11, 0, 1], // Nov, Dec, Jan, Feb (0-indexed)
};

export const DEFAULT_WEIGHTS: RiskWeights = {
  waterTemp: 20,
  rainfall: 25,
  swell: 20,
  season: 15,
  waterQuality: 20,
};

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Severe' | 'Catastrophic';

export interface RiskLevelConfig {
  level: RiskLevel;
  minScore: number;
  maxScore: number;
  color: string;
  guidance: string;
}

export const RISK_LEVELS: RiskLevelConfig[] = [
  {
    level: 'Low',
    minScore: 0,
    maxScore: 20,
    color: '#10b981',  // Bright Green
    guidance: 'Conditions are favourable. Normal swimming precautions apply.',
  },
  {
    level: 'Moderate',
    minScore: 21,
    maxScore: 40,
    color: '#fbbf24',  // Bright Yellow
    guidance: 'Swim with caution. Avoid murky water and dawn/dusk periods.',
  },
  {
    level: 'High',
    minScore: 41,
    maxScore: 60,
    color: '#f59e0b',  // Amber/Orange
    guidance: 'Elevated risk. Stay in patrolled areas and avoid murky conditions.',
  },
  {
    level: 'Severe',
    minScore: 61,
    maxScore: 80,
    color: '#dc2626',  // Bright Red
    guidance: 'Serious risk. Swimming not recommended. Stay out of the water if possible.',
  },
  {
    level: 'Catastrophic',
    minScore: 81,
    maxScore: 100,
    color: '#7f1d1d',  // Dark Red/Maroon
    guidance: 'DO NOT SWIM. All high-risk conditions are present.',
  },
];

export function getRiskLevelFromScore(score: number): RiskLevelConfig {
  for (const level of RISK_LEVELS) {
    if (score >= level.minScore && score <= level.maxScore) {
      return level;
    }
  }
  return RISK_LEVELS[0]; // Default to Low
}
