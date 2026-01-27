/**
 * Type definitions for the shark warning system
 */

import { RiskLevel } from '@/config/risk-config';

export interface RiskInput {
  waterTemp: number | null;      // °C
  rainfall48h: number | null;    // mm
  swellHeight: number | null;    // m
  isSummer: boolean;
  waterQuality: 'good' | 'poor' | 'unknown';  // derived proxy
  timestamp: string;
  sources?: {                    // Data source metadata
    waterTemp?: string;
    rainfall?: string;
    swell?: string;
  };
}

export interface Condition {
  name: string;
  met: boolean;
  value: any;
  threshold: any;
  weight: number;
  source?: string;        // Data source (e.g., "Open-Meteo Marine API")
  timestamp?: string;     // When this data was fetched
  dataAge?: string;       // Human-readable age (e.g., "5 minutes ago")
}

export interface RiskExplanation {
  conditionsMet: Condition[];
  missingData: string[];
  reasoning: string;
}

export interface RiskResult {
  level: RiskLevel;
  score: number;  // 0-100
  color: string;
  guidance: string;
  explanation: RiskExplanation;
  confidence: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface ZoneRiskResult extends RiskResult {
  zoneId: string;
  zoneName: string;
}

export interface OverallStatusResponse {
  overall: RiskResult;
  zones: ZoneRiskResult[];
  health: {
    dataFreshness: 'current' | 'stale' | 'degraded';
    lastUpdate: string;
    availableMetrics: string[];
    missingMetrics: string[];
  };
}

export interface BomDataPoint {
  value: number;
  timestamp: string;
  source: string;
  stationId?: string;
}

export interface BomDataCache {
  rainfall: Record<string, BomDataPoint[]>; // stationId -> array of readings
  waterTemp: Record<string, BomDataPoint>;
  swell: Record<string, BomDataPoint>;
  lastFetch: string;
}
