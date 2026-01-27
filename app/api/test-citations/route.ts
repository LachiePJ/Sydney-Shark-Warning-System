/**
 * Debug endpoint to test if citations are flowing through correctly
 */

import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { DETAILED_ZONES } from '@/config/detailed-zones';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get Manly data
    const manlyZone = DETAILED_ZONES.find(z => z.properties.name === 'Manly Beach');
    if (!manlyZone) {
      return NextResponse.json({ error: 'Manly zone not found' });
    }
    
    const dataService = new DataService();
    
    // Get risk input
    const riskInput = await dataService.getRiskInputForZone(manlyZone.properties);
    
    // Calculate risk
    const riskResult = await dataService.calculateZoneRisk(manlyZone.properties);
    
    // Show the full data flow
    return NextResponse.json({
      step1_riskInput: {
        waterTemp: riskInput.waterTemp,
        rainfall48h: riskInput.rainfall48h,
        swellHeight: riskInput.swellHeight,
        sources: riskInput.sources,
        timestamp: riskInput.timestamp,
      },
      step2_conditions: riskInput.sources ? 'Sources present in input ✅' : 'Sources MISSING in input ❌',
      step3_resultConditions: riskResult.explanation.conditionsMet.map(c => ({
        name: c.name,
        value: c.value,
        source: c.source || 'MISSING',
        dataAge: c.dataAge || 'MISSING',
        timestamp: c.timestamp,
      })),
      step4_analysis: {
        hasSourcesInInput: !!riskInput.sources,
        hasSourcesInConditions: riskResult.explanation.conditionsMet.some(c => c.source),
        waterTempSource: riskInput.sources?.waterTemp,
        rainfallSource: riskInput.sources?.rainfall,
        swellSource: riskInput.sources?.swell,
      }
    }, { 
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
