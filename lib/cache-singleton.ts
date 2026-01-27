/**
 * In-memory cache singleton for Vercel serverless functions
 * Persists data across requests within the same function instance
 */

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

class CacheSingleton {
  private static instance: CacheSingleton;
  private cache: CacheData | null = null;

  private constructor() {}

  static getInstance(): CacheSingleton {
    if (!CacheSingleton.instance) {
      CacheSingleton.instance = new CacheSingleton();
    }
    return CacheSingleton.instance;
  }

  getCache(): CacheData | null {
    return this.cache;
  }

  setCache(data: CacheData): void {
    this.cache = data;
    console.log(`✅ Cache updated in memory: ${Object.keys(data.beaches).length} beaches`);
  }

  hasCache(): boolean {
    return this.cache !== null;
  }
}

export const cacheSingleton = CacheSingleton.getInstance();
