/**
 * API Route: /api/refresh
 * Manually trigger data refresh from BoM
 */

import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60; // Vercel Pro: allow up to 60s
export const runtime = 'nodejs'; // Need Node.js runtime for file system

export async function GET() {
  return POST();
}

export async function POST() {
  try {
    const dataService = new DataService();
    await dataService.refreshData();

    return NextResponse.json(
      {
        success: true,
        message: 'Data refreshed from real Bureau of Meteorology sources (Open-Meteo API)',
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/refresh:', error);
    return NextResponse.json(
      { error: 'Failed to refresh data from BoM sources' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
