/**
 * Simplified Rainfall Adapter
 * Uses Open-Meteo archive API which is more reliable
 */

export async function fetchSimpleRainfall(lat: number, lon: number): Promise<number | null> {
  try {
    // Try current forecast API first (simple version)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&timezone=auto&past_days=2`;
    
    console.log(`[Rainfall] Fetching for ${lat},${lon}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('[Rainfall] Request timeout after 5s');
      controller.abort();
    }, 5000);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Sydney-Shark-Warning-System/1.0',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error(`[Rainfall] API returned ${response.status}: ${response.statusText}`);
      return null;
    }
    
    const text = await response.text();
    console.log(`[Rainfall] Response length: ${text.length} bytes`);
    
    const data = JSON.parse(text);
    
    if (data.daily?.precipitation_sum && Array.isArray(data.daily.precipitation_sum)) {
      const values = data.daily.precipitation_sum;
      const total = values.reduce((sum: number, val: number | null) => sum + (val || 0), 0);
      console.log(`[Rainfall] ✓ Success: ${total.toFixed(1)}mm over ${values.length} days`);
      return Math.round(total * 10) / 10; // Round to 1 decimal
    }
    
    console.warn('[Rainfall] No precipitation_sum in response');
    return null;
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('[Rainfall] Timeout - request took >5s');
      } else {
        console.error(`[Rainfall] Error: ${error.message}`);
      }
    } else {
      console.error('[Rainfall] Unknown error:', error);
    }
    return null;
  }
}
