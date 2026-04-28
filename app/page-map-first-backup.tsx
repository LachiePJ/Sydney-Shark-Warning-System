/**
 * Shark Risk Intelligence - Map-First Redesign
 * Radical simplification: Location-specific, action-oriented
 */

import { DataService } from '@/lib/data-service';
import { getRegion } from '@/config/regions';
import { getRegionContent } from '@/config/region-content';
import RegionAwareApp from '@/components/RegionAwareApp';

// Map-first components
import AppHeader from '@/components/dashboard/AppHeader';
import MapHero from '@/components/map-first/MapHero';
import QuickDecisionPanel from '@/components/map-first/QuickDecisionPanel';
import ContextStrip from '@/components/map-first/ContextStrip';
import SimpleIndicators from '@/components/map-first/SimpleIndicators';
import CollapsibleDetails from '@/components/map-first/CollapsibleDetails';
import TightDisclaimer from '@/components/map-first/TightDisclaimer';

export const revalidate = 1800; // 30 minutes

interface HomeProps {
  searchParams: { region?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const regionId = searchParams.region || 'sydney';
  const regionConfig = getRegion(regionId);
  const regionName = regionConfig?.displayName || 'Sydney';
  const regionContent = getRegionContent(regionId);
  
  const dataService = new DataService(regionId);
  
  // Auto-refresh stale data
  const dataAge = dataService.getCacheAge();
  const THIRTY_MINUTES = 30 * 60 * 1000;
  
  let dataStatus: 'live' | 'delayed' | 'partial' = 'live';
  
  if (dataAge === null || dataAge > THIRTY_MINUTES) {
    try {
      await dataService.refreshData();
    } catch (error) {
      console.error('Auto-refresh failed:', error);
      dataStatus = 'partial';
    }
  }
  
  // Calculate zone risks
  const zoneRisks = await dataService.calculateAllZoneRisks();
  
  // Get overall risk (for context only, not primary)
  const overallRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  return (
    <RegionAwareApp initialRegion={regionId}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Compact Header */}
        <AppHeader initialRegion={regionId} dataStatus={dataStatus} />

        {/* Main Content - Generous Spacing */}
        <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl space-y-6 md:space-y-8">
          
          {/* 1. MAP HERO - Primary Focus (60-70% viewport) */}
          <MapHero 
            zoneRisks={zoneRisks}
            regionConfig={regionConfig!}
            regionName={regionName}
          />

          {/* 2. QUICK DECISION PANEL - Two Columns */}
          <QuickDecisionPanel zoneRisks={zoneRisks} />

          {/* 3. CONTEXT STRIP - Minimal, 1-2 Sentences */}
          <ContextStrip risk={overallRisk} />

          {/* 4. ENVIRONMENTAL INDICATORS - Simplified */}
          <SimpleIndicators risk={overallRisk} />

          {/* 5. COLLAPSIBLE DETAIL SECTIONS - Hidden by Default */}
          <CollapsibleDetails risk={overallRisk} />

          {/* 6. TIGHT DISCLAIMER */}
          <TightDisclaimer />

        </main>

        {/* Minimal Footer */}
        <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>
                &copy; 2026 Shark Risk Intelligence. Data from{' '}
                <a href="http://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Bureau of Meteorology
                </a>
              </p>
              <div className="flex gap-4">
                <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  BeachSafe
                </a>
                <a href="https://nodestrategy.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Built by Node Strategy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </RegionAwareApp>
  );
}
