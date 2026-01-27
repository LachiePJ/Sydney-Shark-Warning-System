/**
 * Static cache loader - reads from filesystem at import time
 * This ensures the cache data is bundled into the serverless function
 */

import cacheData from '@/data/cache.json';

export function getCachedData() {
  return cacheData;
}
