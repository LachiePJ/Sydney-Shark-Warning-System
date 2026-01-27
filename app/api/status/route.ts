/**
 * API Route: /api/status
 * Returns overall system status and health
 */

import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { OverallStatusResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const dataService = new DataService();
    
    // Calculate risks for all zones
    const zoneRisks = await dataService.calculateAllZoneRisks();
    
    // Calculate overall risk (highest zone risk)
    const overallRisk = zoneRisks.reduce((highest, current) => {
      return current.score > highest.score ? current : highest;
    });
    
    const metricsStatus = dataService.getMetricsStatus();
    
    const response: OverallStatusResponse = {
      overall: {
        level: overallRisk.level,
        score: overallRisk.score,
        color: overallRisk.color,
        guidance: overallRisk.guidance,
        explanation: overallRisk.explanation,
        confidence: overallRisk.confidence,
        timestamp: overallRisk.timestamp,
      },
      zones: zoneRisks,
      health: {
        dataFreshness: dataService.getDataFreshness(),
        lastUpdate: new Date().toISOString(),
        availableMetrics: metricsStatus.available,
        missingMetrics: metricsStatus.missing,
      },
    };

    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error in /api/status:', error);
    return NextResponse.json(
      { error: 'Failed to calculate risk status' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
