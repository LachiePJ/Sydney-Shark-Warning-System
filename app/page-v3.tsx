/**
 * Live Shark Risk - V3 Redesign
 * Focus: Risk by Location | Map-Led | Clear Hierarchy | Credibility through "How It Works"
 */

import { DataService } from '@/lib/data-service';
import { getRegion } from '@/config/regions';
import { getRegionContent } from '@/config/region-content';
import RegionAwareApp from '@/components/RegionAwareApp';

// V3 Components
import Header from '@/components/v3/Header';
import RiskByLocationHero from '@/components/v3/RiskByLocationHero';
import LocationGuidance from '@/components/v3/LocationGuidance';
import CurrentDrivers from '@/components/v3/CurrentDrivers';
import SpeciesRisk from '@/components/v3/SpeciesRisk';
import Disclaimer from '@/components/v3/Disclaimer';

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
  
  // Calculate zone risks (location-based)
  const zoneRisks = await dataService.calculateAllZoneRisks();
  
  // Get highest risk for context (not primary focus)
  const highestRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  return (
    <RegionAwareApp initialRegion={regionId}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <Header initialRegion={regionId} dataStatus={dataStatus} />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 md:py-10 max-w-7xl space-y-8 md:space-y-10">
          
          {/* 1. HERO: Risk by Location + Map (Primary Interface) */}
          <RiskByLocationHero 
            zoneRisks={zoneRisks}
            regionConfig={regionConfig!}
            regionName={regionName}
          />

          {/* 2. LOCATION GUIDANCE: Safer vs Higher-Risk (Region-Aware) */}
          <LocationGuidance 
            zoneRisks={zoneRisks}
            regionName={regionName}
          />

          {/* 3. SPECIES RISK: Primary Species Driving Today's Risk */}
          <SpeciesRisk 
            risk={highestRisk}
            regionName={regionName}
          />

          {/* 4. CURRENT DRIVERS: Environmental Factors (Clear, Simple) */}
          <CurrentDrivers 
            risk={highestRisk}
            regionName={regionName}
          />

          {/* 5. DISCLAIMER: Prominent Safety Information */}
          <Disclaimer />

        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>
                &copy; 2026 Live Shark Risk. Data from{' '}
                <a href="http://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 underline">
                  Bureau of Meteorology
                </a>
              </p>
              <div className="flex gap-6">
                <a href="/how-it-works" className="hover:text-gray-300 underline">
                  How It Works
                </a>
                <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 underline">
                  BeachSafe
                </a>
                <a href="https://nodestrategy.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 underline">
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
