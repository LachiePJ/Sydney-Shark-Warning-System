# Live Shark Risk - V3 Product Redesign

## Overview

Complete product redesign focused on **Risk by Location** with a clear separation between decision-making and methodology understanding.

### Design Philosophy

**Two-Layer Architecture:**
1. **Homepage (Decision Layer)**: What should I do now?
2. **How It Works Page (Credibility Layer)**: Why should I trust this?

### Core Product Changes

#### ✅ Branding & Language

**Before:**
- "Shark Risk Intelligence"
- "Where is it safer to swim right now?"
- Mixed terminology
- Technical language throughout

**After:**
- "Live Shark Risk"
- "Risk by Location" (primary heading)
- Consistent, plain language
- Clear, confident, human tone
- Scientific detail moved to separate page

#### ✅ Information Hierarchy

**Before:**
- Overall regional risk score emphasized
- Map secondary
- Text-heavy
- Methodology cluttering main experience

**After:**
- Location-specific risk primary
- Map as hero interface (60-70% viewport)
- Concise, scannable sections
- Methodology in dedicated "How It Works" page

---

## V3 Components

### 1. Header (`components/v3/Header.tsx`)

**Features:**
- "Live Shark Risk" branding
- Prominent region selector
- Data status indicator (Live/Delayed/Partial)
- "How It Works" link in header
- Sticky positioning for easy access

**Mobile:**
- Collapsible region selector
- "How It Works" link below main header

---

### 2. Risk by Location Hero (`components/v3/RiskByLocationHero.tsx`)

**Primary Heading:** "Risk by Location"

**Supporting Copy:**
> "Current shark risk varies by beach, waterway and local conditions. Select a location to view today's risk."

**Map:**
- Full-width, 60-70% viewport height
- Interactive markers with location-specific risk
- Clear, non-intrusive legend (positioned to avoid clipping)
- Risk scale clearly defined with score ranges
- Live update time indicator

**Risk Scale (Updated for Clarity):**
- Low: 0-30
- Moderate: 31-60
- High: 61-80
- Severe: 81-100

**Legend Note:**
> "Score indicates how favourable conditions are for shark activity"

This clarifies the score represents **environmental risk**, not shark presence.

---

### 3. Location Guidance (`components/v3/LocationGuidance.tsx`)

**Two-column layout (region-aware):**

**Left Column: Lower-risk locations**
- Lists specific beaches with lowest current scores
- Color-coded risk badges
- Quick-scan format
- Always swim between flags reminder

**Right Column: Higher-risk environments**
- Harbours and enclosed bays
- River mouths and estuaries
- Murky or turbid water
- Each with brief, practical explanation

**Key Improvement:**
- Dynamic based on selected region
- Practical, actionable guidance
- No long paragraphs

---

### 4. Species Risk (`components/v3/SpeciesRisk.tsx`)

**More Prominent, Less Technical:**

**Primary Species Card:**
- Large, prominent display
- Clear risk level badge
- Current score
- "Where this matters most" section with habitat-specific guidance
- Active triggers displayed as tags

**Example:**
> **Primary Species:** Bull Shark  
> **Where this matters most:** Most relevant in harbours, estuaries, river mouths and brackish water. Risk increases after heavy rainfall.

**Secondary Species:**
- Cleaner grid format
- Only if relevant
- Less visual weight

---

### 5. Current Drivers (`components/v3/CurrentDrivers.tsx`)

**4 Visual Cards:**
- Water Temperature
- Rainfall (48h)
- Season
- Water Clarity

**Each Card Shows:**
- Icon
- Current value
- Influence level (Low/Moderate/High)
- Color-coded by influence

**Note Below:**
> "These environmental factors combine to estimate where conditions may be more favourable for shark activity. This is not a shark detection or prediction system."

---

### 6. Disclaimer (`components/v3/Disclaimer.tsx`)

**Prominent Yellow Alert Box:**

**Key Messages:**
- "This tool is not a shark detection system"
- Estimates environmental conditions, not shark presence
- Always follow official beach safety guidance
- Link to BeachSafe.org.au

**Official Safety Guidance:**
- Swim at patrolled beaches between flags
- Follow lifeguard instructions
- Obey beach closures
- Check official reports

---

## How It Works Page

**Dedicated Page (`app/how-it-works/page.tsx`)**

### 7 Clear Sections:

1. **How Risk is Calculated**
   - 3-step process
   - Environmental data collection
   - Species-specific behavioural indicators
   - Location-level scoring

2. **What the Score Means**
   - Environmental favourability, not shark presence
   - Risk scale explained with examples
   - Clear score ranges

3. **Why Location Matters**
   - Open-ocean beaches vs harbours vs estuaries
   - Habitat characteristics
   - Species behaviour by location type

4. **How Regions Differ**
   - Species profiles
   - Environmental triggers
   - Seasonal patterns
   - Location types

5. **Data Sources**
   - Bureau of Meteorology
   - Marine APIs
   - Beach/location data
   - Peer-reviewed research
   - Update frequency (30 minutes)

6. **Limitations**
   - Not a shark detection system
   - Does not predict presence
   - Does not guarantee safety
   - One factor in water safety decisions

7. **Official Safety Guidance**
   - Practical safety principles
   - Link to BeachSafe
   - When to avoid swimming

---

## Page Structure Comparison

### Before (Map-First v2)
```
Header (Shark Risk Intelligence)
├─ Map Hero ("Where is it safer to swim?")
├─ Quick Decision Panel
├─ Context Strip (1-2 sentences)
├─ Environmental Indicators
├─ Collapsible Details (methodology, species, etc.)
└─ Disclaimer
```

### After (V3 - Risk by Location)
```
Header (Live Shark Risk + How It Works link)
├─ Risk by Location Hero (Map primary, clear heading)
├─ Location Guidance (Safer vs Higher-risk)
├─ Species Risk (Primary species prominent)
├─ Current Drivers (4 visual cards)
└─ Disclaimer (prominent)

Separate Page:
└─ How It Works (7 sections, comprehensive)
```

---

## Risk Scale Changes

### Updated for Communication Clarity

**Before:**
- Low: 0-20
- Moderate: 21-40
- High: 41-60
- Severe: 61-80
- Extreme: 81-100

**After:**
- Low: 0-30
- Moderate: 31-60
- High: 61-80
- Severe: 81-100

**Rationale:**
- Clearer boundaries
- Easier to communicate
- Matches user's suggested ranges
- Maintains scientific calibration

---

## Language Principles Applied

### ✅ Clear
- Short sentences
- Simple explanations
- No jargon in main UI

### ✅ Confident
- Direct statements
- No hedging or vague phrases
- "Current shark risk varies by beach" not "may potentially vary"

### ✅ Human
- Plain language
- Practical guidance
- Avoids overly scientific tone

### ✅ Credible
- Scientific detail available in "How It Works"
- Data sources transparent
- Limitations stated clearly

### ✅ Not Alarmist
- "Environmental risk assessment" not "shark warning"
- "Conditions are more favourable" not "sharks are present"
- Balanced safety guidance

---

## Mobile Optimization

### All Components Responsive:
- Map remains usable (60vh minimum height)
- Region selector easy to access
- Cards stack cleanly
- No horizontal overflow
- Marker popups usable
- Key guidance before methodology

### Touch-Friendly:
- Large tap targets
- Easy map interactions
- Readable text sizes
- Clear spacing

---

## Technical Implementation

### New Files Created:
```
components/v3/
├─ Header.tsx
├─ RiskByLocationHero.tsx
├─ LocationGuidance.tsx
├─ SpeciesRisk.tsx
├─ CurrentDrivers.tsx
└─ Disclaimer.tsx

app/
├─ page.tsx (v3 version, replaces map-first)
└─ how-it-works/
   └─ page.tsx (new dedicated page)
```

### Backups Preserved:
```
app/
├─ page-map-first-backup.tsx
├─ page-dashboard-version.tsx
└─ page-old-backup.tsx
```

### Updated:
```
config/
└─ risk-config.ts (updated risk scale ranges)
```

---

## Success Metrics

This redesign addresses all user requirements:

### ✅ Product Logic
- Clear location-based risk hierarchy
- Map as primary interface
- Separated decision-making from methodology

### ✅ Information Hierarchy
- Location risk → Regional conditions → Species → Environmental drivers
- Progressive disclosure (homepage → How It Works)

### ✅ Map Usability
- Prominent, no clipping
- Clear legend with score ranges
- Easy marker interaction

### ✅ Risk Communication
- Score explained as "environmental favourability"
- Clear ranges
- Not predictive of shark presence

### ✅ Clear Copy
- Plain, confident, human language
- Region-aware content
- Practical guidance

### ✅ Responsive Layout
- Desktop: Strong map-led layout, clear hierarchy
- Mobile: Usable map, clean stacking, no overflow

### ✅ Scientific Credibility
- Comprehensive "How It Works" page
- Data sources transparent
- Research-based methodology
- Clear limitations

---

## Next Steps for User

1. **Test the application:**
   ```bash
   npm run dev
   ```

2. **Review the new structure:**
   - Homepage: Location-focused, map-led
   - How It Works page: Comprehensive methodology

3. **Provide feedback on:**
   - Information hierarchy
   - Language clarity
   - Map usability
   - Risk scale communication
   - Mobile experience

4. **Deploy when ready:**
   ```bash
   git add .
   git commit -m "feat: V3 redesign - Risk by Location architecture"
   git push origin main
   ```

---

## Design Decisions & Rationale

### Why Separate "How It Works" Page?

**Problem:** Scientific credibility vs. usable decision-making tool

**Solution:** Two-layer architecture
- Homepage: "What should I do now?" (5-10 second decision)
- How It Works: "Why should I trust this?" (deep dive for interested users)

This allows the tool to feel **confident and usable** while maintaining **scientific credibility**.

### Why "Risk by Location" Not "Where is it safer to swim?"

**User Brief:** "Use 'Risk by Location' as the core homepage heading"

**Rationale:**
- More professional
- Clearer product positioning
- Focuses on the core value proposition
- Not a question, a statement of capability

### Why 4-Tier Risk Scale Instead of 5?

**User Suggestion:** 0-30, 31-60, 61-80, 81-100

**Rationale:**
- Clearer boundaries
- Easier to explain
- Maintains top tier for "perfect storm" scenarios
- More communicable to general public

### Why Prominent Species Risk Section?

**User Feedback:** "Species section should feel more useful and less buried"

**Implementation:**
- Large primary species card
- Clear habitat guidance
- Active triggers visible
- Secondary species only if relevant

This makes the "why" clearer without overwhelming users.

---

## Summary

**V3 Live Shark Risk is now:**
- Map-first, location-specific
- Clear, confident language
- Credible through "How It Works"
- Practical and actionable
- Suitable for councils, Surf Life Saving, beach safety teams, and public

**The product now answers:**
1. **What's the risk here?** → Map markers
2. **Where should I swim?** → Location Guidance
3. **Why are conditions elevated?** → Species Risk + Current Drivers
4. **How does this work?** → Dedicated How It Works page
5. **What are the limitations?** → Prominent disclaimer

This structure makes Live Shark Risk a **credible, scalable environmental risk tool** ready for public safety organizations.
