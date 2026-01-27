#!/usr/bin/env node

/**
 * Initialize the system with fallback data
 * Run this to ensure the app works even if BoM APIs are unavailable
 */

const http = require('http');

console.log('🦈 Initializing Sydney Shark Warning System with fallback data...\n');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/refresh?fallback=true',
  method: 'POST',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Success! Fallback data has been initialized.');
      console.log('📊 Response:', JSON.parse(data));
      console.log('\n🌊 The app is now ready to use at http://localhost:3000');
      process.exit(0);
    } else {
      console.error('❌ Failed to initialize data:', res.statusCode);
      console.error(data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error connecting to server:', error.message);
  console.log('\n💡 Make sure the dev server is running: npm run dev');
  process.exit(1);
});

req.end();
