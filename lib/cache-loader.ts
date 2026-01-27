/**
 * Static cache loader - reads from filesystem at import time
 * This ensures the cache data is bundled into the serverless function
 */

import cacheData from '@/data/cache.json';

export function getCachedData() {
  // Handle both ESM default export and direct import
  const data = (cacheData as any).default || cacheData;
  console.log('📦 Cache loader: data type =', typeof data);
  console.log('📦 Cache loader: has beaches =', !!data?.beaches);
  if (data?.beaches) {
    console.log('📦 Cache loader: beach keys =', Object.keys(data.beaches));
    console.log('📦 Cache loader: manly data =', data.beaches.manly);
  }
  return data;
}
