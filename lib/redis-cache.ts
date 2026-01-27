/**
 * Redis cache using Upstash
 * Provides persistent storage across Vercel serverless function invocations
 */

import { Redis } from '@upstash/redis';

interface BeachData {
  temperature: number | null;
  waveHeight: number | null;
  rainfall48h: number | null;
  timestamp: string;
}

interface CacheData {
  beaches: Record<string, BeachData>;
  lastFetch: string;
}

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  
  // Check if Upstash credentials are available
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    console.warn('⚠️  Upstash Redis not configured - data will not persist');
    return null;
  }
  
  redis = new Redis({
    url,
    token,
  });
  
  console.log('✅ Upstash Redis connected');
  return redis;
}

export async function saveToRedis(data: CacheData): Promise<boolean> {
  try {
    const client = getRedis();
    if (!client) return false;
    
    await client.set('shark-cache', JSON.stringify(data));
    console.log('✅ Saved to Redis:', {
      beaches: Object.keys(data.beaches).length,
      lastFetch: data.lastFetch,
    });
    return true;
  } catch (error) {
    console.error('❌ Redis save failed:', error);
    return false;
  }
}

export async function loadFromRedis(): Promise<CacheData | null> {
  try {
    const client = getRedis();
    if (!client) return null;
    
    const data = await client.get<string>('shark-cache');
    if (!data) {
      console.log('ℹ️  No data in Redis yet');
      return null;
    }
    
    const parsed = JSON.parse(data) as CacheData;
    console.log('✅ Loaded from Redis:', {
      beaches: Object.keys(parsed.beaches).length,
      lastFetch: parsed.lastFetch,
    });
    return parsed;
  } catch (error) {
    console.error('❌ Redis load failed:', error);
    return null;
  }
}

export function isRedisConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
