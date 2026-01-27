/**
 * API Route: /api/risk
 * Returns risk assessment for all zones or a specific zone
 * Build: v1.0.1 - Citations + Navy Logo + Redis (2026-01-28)
 */

import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zoneId = searchParams.get('zone');

    const dataService = new DataService();
    const zoneRisks = await dataService.calculateAllZoneRisks();

    // If specific zone requested
    if (zoneId) {
      const zoneRisk = zoneRisks.find(z => z.zoneId === zoneId);
      
      if (!zoneRisk) {
        return NextResponse.json(
          { error: `Zone '${zoneId}' not found` },
          { status: 404 }
        );
      }

      return NextResponse.json(zoneRisk, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      });
    }

    // Return all zone risks
    return NextResponse.json(
      {
        zones: zoneRisks,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/risk:', error);
    return NextResponse.json(
      { error: 'Failed to calculate risk' },
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
