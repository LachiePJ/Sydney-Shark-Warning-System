/**
 * Script to refresh live data from APIs
 * Run this to populate cache with real BoM data
 */

const https = require('https');

const url = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/refresh`
  : 'http://localhost:3000/api/refresh';

console.log(`🔄 Refreshing data from: ${url}`);

https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('✅ Success:', result);
    } catch (e) {
      console.log('Response:', data);
    }
  });
}).on('error', (err) => {
  console.error('❌ Error:', err.message);
});
