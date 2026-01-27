/**
 * Debug endpoint to check what's in Redis
 */

import { NextResponse } from 'next/server';
import { loadFromRedis } from '@/lib/redis-cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await loadFromRedis();
    
    if (!data) {
      return NextResponse.json({
        status: 'NO_DATA',
        message: 'Redis returned null - either not configured or empty',
        redisUrl: process.env.UPSTASH_REDIS_REST_URL ? 'SET' : 'NOT_SET',
        redisToken: process.env.UPSTASH_REDIS_REST_TOKEN ? 'SET' : 'NOT_SET',
      });
    }
    
    // Show first beach data
    const firstBeachKey = Object.keys(data.beaches)[0];
    const firstBeach = data.beaches[firstBeachKey];
    
    return NextResponse.json({
      status: 'OK',
      beachCount: Object.keys(data.beaches).length,
      lastFetch: data.lastFetch,
      sampleBeach: firstBeachKey,
      sampleData: firstBeach,
      allBeachKeys: Object.keys(data.beaches),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
