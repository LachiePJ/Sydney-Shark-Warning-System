/**
 * Risk Engine Unit Tests
 */

import { RiskEngine } from '@/lib/risk-engine';
import { RiskInput } from '@/lib/types';

describe('RiskEngine', () => {
  let engine: RiskEngine;

  beforeEach(() => {
    engine = new RiskEngine();
  });

  test('should return Low risk when no conditions are met', () => {
    const input: RiskInput = {
      waterTemp: 18,
      rainfall48h: 10,
      swellHeight: 1.0,
      isSummer: false,
      waterQuality: 'good',
      timestamp: new Date().toISOString(),
    };

    const result = engine.calculateRisk(input);

    expect(result.level).toBe('Low');
    expect(result.score).toBeLessThanOrEqual(20);
  });

  test('should return Catastrophic when all conditions are met', () => {
    const input: RiskInput = {
      waterTemp: 22,
      rainfall48h: 100,
      swellHeight: 2.2,
      isSummer: true,
      waterQuality: 'poor',
      timestamp: new Date().toISOString(),
    };

    const result = engine.calculateRisk(input);

    expect(result.level).toBe('Catastrophic');
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  test('should return Moderate risk with some conditions met', () => {
    const input: RiskInput = {
      waterTemp: 21,
      rainfall48h: 10,
      swellHeight: 1.0,
      isSummer: true,
      waterQuality: 'good',
      timestamp: new Date().toISOString(),
    };

    const result = engine.calculateRisk(input);

    expect(result.level).toBe('Moderate');
    expect(result.score).toBeGreaterThan(20);
    expect(result.score).toBeLessThanOrEqual(40);
  });

  test('should handle null values gracefully', () => {
    const input: RiskInput = {
      waterTemp: null,
      rainfall48h: null,
      swellHeight: null,
      isSummer: false,
      waterQuality: 'unknown',
      timestamp: new Date().toISOString(),
    };

    const result = engine.calculateRisk(input);

    expect(result.level).toBeDefined();
    expect(result.confidence).toBe('low');
    expect(result.explanation.missingData.length).toBeGreaterThan(0);
  });

  test('should correctly identify met conditions', () => {
    const input: RiskInput = {
      waterTemp: 22,
      rainfall48h: 50,
      swellHeight: 1.5,
      isSummer: true,
      waterQuality: 'good',
      timestamp: new Date().toISOString(),
    };

    const result = engine.calculateRisk(input);

    const metConditions = result.explanation.conditionsMet.filter(c => c.met);
    expect(metConditions.length).toBeGreaterThan(0);
    
    const tempCondition = result.explanation.conditionsMet.find(
      c => c.name === 'High Water Temperature'
    );
    expect(tempCondition?.met).toBe(true);
  });

  test('should derive water quality from rainfall', () => {
    expect(RiskEngine.deriveWaterQuality(100)).toBe('poor');
    expect(RiskEngine.deriveWaterQuality(30)).toBe('poor');
    expect(RiskEngine.deriveWaterQuality(10)).toBe('good');
    expect(RiskEngine.deriveWaterQuality(null)).toBe('unknown');
  });

  test('should adjust confidence based on data availability', () => {
    const fullData: RiskInput = {
      waterTemp: 20,
      rainfall48h: 50,
      swellHeight: 2.0,
      isSummer: true,
      waterQuality: 'good',
      timestamp: new Date().toISOString(),
    };

    const partialData: RiskInput = {
      waterTemp: 20,
      rainfall48h: null,
      swellHeight: null,
      isSummer: true,
      waterQuality: 'unknown',
      timestamp: new Date().toISOString(),
    };

    const fullResult = engine.calculateRisk(fullData);
    const partialResult = engine.calculateRisk(partialData);

    expect(fullResult.confidence).toBe('high');
    expect(partialResult.confidence).toBe('low');
  });

  test('should provide explanation with reasoning', () => {
    const input: RiskInput = {
      waterTemp: 21,
      rainfall48h: 95,
      swellHeight: 2.0,
      isSummer: true,
      waterQuality: 'poor',
      timestamp: new Date().toISOString(),
    };

    const result = engine.calculateRisk(input);

    expect(result.explanation.reasoning).toBeDefined();
    expect(result.explanation.reasoning.length).toBeGreaterThan(0);
    expect(result.explanation.conditionsMet).toHaveLength(5);
  });
});
