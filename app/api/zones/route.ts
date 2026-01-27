/**
 * API Route: /api/zones
 * Returns zone definitions as GeoJSON
 */

import { NextResponse } from 'next/server';
import { ZONES } from '@/config/zones';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(ZONES, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, s-maxage=86400', // Cache for 24 hours
    },
  });
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
