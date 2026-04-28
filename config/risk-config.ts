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
  waterTemp: 18,          // > 18°C (Bull Sharks active at lower temps)
  rainfall48h: 30,        // > 30mm (Bull Sharks respond to moderate rainfall)
  swellMin: 1.8,          // 1.8m - 2.8m range
  swellMax: 2.8,
  summerMonths: [10, 11, 0, 1, 2, 3], // Nov, Dec, Jan, Feb, Mar, Apr (0-indexed) - Extended for Bull Sharks
};

// Bull Shark-optimized weights (based on Peddemors et al. 2023)
// Bull Sharks are primary species responsible for Sydney incidents
export const DEFAULT_WEIGHTS: RiskWeights = {
  waterTemp: 15,      // Reduced - less critical for Bull Sharks
  rainfall: 35,       // INCREASED - primary driver for Bull Shark movement into coastal areas
  swell: 10,          // Reduced - less relevant for estuarine Bull Sharks
  season: 5,          // Reduced - Bull Sharks present year-round
  waterQuality: 25,   // Increased - turbidity attracts Bull Sharks (hunt via electroreception)
};

export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Severe Risk' | 'Extreme Risk';

export interface RiskLevelConfig {
  level: RiskLevel;
  minScore: number;
  maxScore: number;
  color: string;
  guidance: string;
}

export const RISK_LEVELS: RiskLevelConfig[] = [
  {
    level: 'Low Risk',
    minScore: 0,
    maxScore: 30,
    color: '#10b981',  // Bright Green
    guidance: 'Conditions are favourable. Normal swimming precautions apply.',
  },
  {
    level: 'Moderate Risk',
    minScore: 31,
    maxScore: 60,
    color: '#fbbf24',  // Bright Yellow
    guidance: 'Swim with caution. Avoid murky water and dawn/dusk periods.',
  },
  {
    level: 'High Risk',
    minScore: 61,
    maxScore: 80,
    color: '#f59e0b',  // Amber/Orange
    guidance: 'Elevated risk. Stay in patrolled areas and avoid murky conditions.',
  },
  {
    level: 'Severe Risk',
    minScore: 81,
    maxScore: 100,
    color: '#dc2626',  // Bright Red
    guidance: 'DO NOT SWIM. Highly unfavourable conditions.',
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
