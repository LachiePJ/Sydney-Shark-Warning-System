/**
 * Debug endpoint to inspect cache state on Vercel
 */

import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { STATIC_CACHE_DATA } from '@/lib/static-cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dataService = new DataService();
  
  // Force cache load
  const risks = await dataService.calculateAllZoneRisks();
  const firstRisk = risks[0];
  
  return NextResponse.json({
    staticCacheHasData: !!STATIC_CACHE_DATA.beaches,
    staticCacheBeaches: Object.keys(STATIC_CACHE_DATA.beaches),
    staticCacheManlyRainfall: STATIC_CACHE_DATA.beaches.manly.rainfall48h,
    
    firstZoneId: firstRisk.zoneId,
    firstZoneRisk: firstRisk.level,
    firstZoneScore: firstRisk.score,
    firstZoneConditions: firstRisk.explanation.conditionsMet.map(c => ({
      name: c.name,
      value: c.value,
      met: c.met,
    })),
    firstZoneMissing: firstRisk.explanation.missingData,
  });
}
