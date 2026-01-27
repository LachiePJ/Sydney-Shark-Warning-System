# URGENT FIXES NEEDED

## Issue 1: Logo Images Are Empty (0 bytes)
The PNG files exist but are empty:
```
-rw-r--r--@  1 lox  staff    0 Jan 28 07:48 node-logo.png
-rw-r--r--@  1 lox  staff    0 Jan 28 07:48 shark-icon.png
```

**ACTION NEEDED**: You need to actually copy your real logo images to `/Users/lox/SharkWarningSystem/public/`

The `touch` command I ran just created empty files. You need to:
1. Find your actual `node-logo.png` and `shark-icon.png` files
2. Copy them to `/Users/lox/SharkWarningSystem/public/`
3. Run: `cd ~/SharkWarningSystem && git add public/*.png && git commit -m "add: real logo images" && git push`

## Issue 2: Wrong Marine API Parameter
Used: `ocean_surface_temperature` ❌
Should be: `sea_surface_temperature` ✅

Marine API documentation shows the correct parameter is `sea_surface_temperature` not `ocean_surface_temperature`.

Fixing this now...
