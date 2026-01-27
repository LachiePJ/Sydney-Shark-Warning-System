# Vercel Data Persistence Issue - SOLUTION REQUIRED

## Problem

The Sydney Shark Warning System is experiencing a critical data persistence issue on Vercel:

1. `/api/refresh` successfully fetches live data from Open-Meteo APIs ✅
2. Data includes: temperature (22.7°C), rainfall (1.9-3.1mm), waves (0.98-1.42m) ✅
3. **BUT** the data doesn't persist between serverless function invocations ❌
4. Result: "Missing data: Rainfall Data, Water Quality (proxy)" ❌

## Root Cause

**Vercel Serverless Functions are stateless and isolated:**
- Each API request runs in a separate, ephemeral container
- Filesystem writes don't persist (read-only after build)
- In-memory singletons don't persist across function instances
- No shared state between `/api/refresh` and `/api/risk`

## Current Architecture (Broken on Vercel)

```
/api/refresh → Fetches data → Saves to cache → ❌ Lost immediately
/api/risk → Tries to read cache → ❌ Cache is empty → Returns N/A
```

## Solutions

### Option 1: Vercel KV (Redis) - RECOMMENDED ✅

**Cost:** Free tier: 256MB, 3000 commands/day  
**Setup time:** 10 minutes

```typescript
// Install: npm install @vercel/kv
import { kv } from '@vercel/kv';

// In /api/refresh:
await kv.set('shark-cache', cacheData);

// In getRiskInputForZone:
const cache = await kv.get('shark-cache');
```

**Steps:**
1. Go to Vercel Dashboard → Storage → Create KV Database
2. Link to project
3. Add `@vercel/kv` to dependencies
4. Update data-service.ts to use KV instead of filesystem

### Option 2: External Database (PostgreSQL/MongoDB)

**Cost:** ~$5-10/month  
**Setup time:** 30 minutes

Use Supabase, PlanetScale, or MongoDB Atlas to store cache.

### Option 3: Client-Side Refresh (Temporary Workaround)

Add a button on the frontend that calls `/api/refresh` and displays the returned data directly.

### Option 4: Scheduled Function with Edge Config

Use Vercel Cron + Edge Config to store data globally.

## Immediate Workaround

**For now, the system works with these limitations:**
- Temperature and wave data ARE showing (from build-time cache)
- Rainfall is missing (needs runtime persistence)
- Call `/api/refresh` manually when needed
- Data will be available for ~5-10 minutes (function warm time)

## Recommendation

**Implement Option 1 (Vercel KV)** - it's free, fast, and designed for this exact use case.

I can implement this in ~15 minutes once you create the KV database in your Vercel dashboard.
