# Setup Upstash Redis - 5 Minute Guide

## ✅ Code is Ready

I've already integrated Upstash Redis into the codebase. You just need to connect it to your Vercel project.

## 📋 Setup Steps

### Step 1: Add Upstash Integration to Vercel

1. Go to your Vercel project dashboard:
   **https://vercel.com/lachies-projects/sydney-shark-warning-system**

2. Click **"Storage"** tab in the left sidebar

3. Click **"Connect Store"** or **"Create Database"**

4. Select **"Upstash Redis"** (KV Store)

5. Click **"Continue"**

6. Name it: `shark-cache` (or any name you prefer)

7. Select region: **US East** (or closest to you)

8. Click **"Create"**

9. Click **"Connect to Project"**

10. Select `sydney-shark-warning-system`

11. Click **"Connect"**

### Step 2: Verify Environment Variables

The integration should automatically add these to your project:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

You can check in: **Settings → Environment Variables**

### Step 3: Deploy

The next deployment will automatically use Redis!

You can either:
- **Wait for automatic deployment** (when I push the code)
- **Or manually trigger**: Dashboard → Deployments → Redeploy

### Step 4: Test

Once deployed:

```bash
# Fetch live data (it will save to Redis)
curl -X POST https://sydney-shark-warning-system.vercel.app/api/refresh

# Check if data appears (should now show rainfall!)
curl https://sydney-shark-warning-system.vercel.app/api/risk
```

## ✅ What Will Happen

After Redis is connected:
1. `/api/refresh` will fetch live data AND save to Redis ✅
2. `/api/risk` will read from Redis (data persists!) ✅
3. **Rainfall data will appear:** 1.9-3.1mm ✅
4. **Water quality will calculate:** Based on rainfall ✅
5. **Source citations will show:** With timestamps ✅

## 💰 Cost

**FREE TIER:**
- 10,000 commands/day
- 256 MB storage
- More than enough for this project!

## 🔍 How to Verify It's Working

Look for these logs in Vercel Function Logs:
```
✅ Upstash Redis connected
✅ Saved to Redis: { beaches: 7, lastFetch: '...' }
✅ Loaded from Redis (2min old, 7 beaches)
```

## 🆘 Troubleshooting

**If you see:** `⚠️  Redis not configured`
- Check environment variables are set
- Redeploy after adding them

**If data still missing:**
- Call `/api/refresh` once after deployment
- Check Vercel function logs for errors

---

**That's it!** Once you complete Step 1, everything else is automatic. The code is already integrated and ready to use Redis.
