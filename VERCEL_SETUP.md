# Vercel Deployment - Data Refresh Setup

## ⚠️ IMPORTANT: How Data Works

The app now **never fetches data during page requests** to avoid Vercel's 10-second timeout.

Instead:
- **Cache file** (`data/cache.json`) contains the current data
- **`/api/refresh`** endpoint fetches fresh data from APIs (takes ~30 seconds)
- **Vercel Cron Job** should call `/api/refresh` every 30 minutes

---

## 🔧 Setup Vercel Cron Job

### **Step 1: Add vercel.json**

Already done! The `vercel.json` file includes:

```json
{
  "crons": [{
    "path": "/api/refresh",
    "schedule": "*/30 * * * *"
  }]
}
```

This calls `/api/refresh` every 30 minutes.

### **Step 2: Enable Cron Jobs in Vercel Dashboard**

1. Go to your Vercel project: https://vercel.com/lachies-projects/sydney-shark-warning-system
2. Click **Settings** → **Cron Jobs**
3. You should see: `GET /api/refresh` every 30 minutes
4. Click **Enable** if it's not already enabled

---

## 🧪 Manual Data Refresh

You can manually refresh data anytime:

```bash
# Via command line:
curl -X GET https://sydney-shark-warning-system.vercel.app/api/refresh

# Or open in browser:
# https://sydney-shark-warning-system.vercel.app/api/refresh
```

---

## 📊 Check Data Status

```bash
# Check cached data age and status:
curl https://sydney-shark-warning-system.vercel.app/api/status
```

---

## 🐛 Troubleshooting

**Problem:** Still seeing N/A values

**Solutions:**
1. Manually call `/api/refresh` first time after deployment
2. Check Vercel logs for errors
3. Verify cache.json was deployed (should be in repo)

**Problem:** Cron job not running

**Solutions:**
1. Cron jobs require Vercel Pro plan (Hobby plan limited to 1 job)
2. Enable in Dashboard → Settings → Cron Jobs
3. Check **Deployments** → **Functions** → **Cron Jobs** for logs

---

## 📝 Notes

- **First deployment:** Data will be from the committed `cache.json`
- **After first `/api/refresh` call:** Data will be live from Open-Meteo APIs
- **Cache duration:** 30 minutes (configurable in `lib/data-service.ts`)
- **Fetch duration:** ~20-30 seconds for all 7 beaches
- **Vercel timeout:** 10s (free), 60s (Pro) - that's why we need cron
