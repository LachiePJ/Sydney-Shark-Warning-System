/**
 * Shark Risk Intelligence - Redesigned Main Page
 * Professional coastal safety risk assessment platform
 */

import dynamic from 'next/dynamic';
import { DataService } from '@/lib/data-service';
import { getRegion } from '@/config/regions';
import { getRegionContent } from '@/config/region-content';
import RegionAwareApp from '@/components/RegionAwareApp';

// New dashboard components
import AppHeader from '@/components/dashboard/AppHeader';
import RiskHero from '@/components/dashboard/RiskHero';
import RecommendedLocations from '@/components/dashboard/RecommendedLocations';
import RiskDrivers from '@/components/dashboard/RiskDrivers';
import SpeciesProfile from '@/components/dashboard/SpeciesProfile';
import SafetyDisclaimer from '@/components/dashboard/SafetyDisclaimer';
import DataSources from '@/components/dashboard/DataSources';

// Dynamic import for map (client-side only)
const CircleRiskMap = dynamic(() => import('@/components/CircleRiskMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-gray-600">Loading interactive map...</div>
      </div>
    </div>
  ),
});

export const revalidate = 1800; // Revalidate every 30 minutes

interface HomeProps {
  searchParams: { region?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const regionId = searchParams.region || 'sydney';
  const regionConfig = getRegion(regionId);
  const regionContent = getRegionContent(regionId);
  
  const dataService = new DataService(regionId);
  
  // Auto-refresh: Update data if cache is stale (older than 30 minutes)
  const dataAge = dataService.getCacheAge();
  const THIRTY_MINUTES = 30 * 60 * 1000;
  
  let dataStatus: 'live' | 'delayed' | 'partial' = 'live';
  
  if (dataAge === null || dataAge > THIRTY_MINUTES) {
    console.log('🔄 Cache is stale, auto-refreshing data...');
    try {
      await dataService.refreshData();
      console.log('✅ Auto-refresh complete');
    } catch (error) {
      console.error('⚠️  Auto-refresh failed:', error);
      dataStatus = 'partial';
    }
  }
  
  // Calculate risks
  const zoneRisks = await dataService.calculateAllZoneRisks();
  
  // Get overall risk (highest zone risk)
  const overallRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  const lastUpdated = new Date().toISOString();

  return (
    <RegionAwareApp initialRegion={regionId}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <AppHeader initialRegion={regionId} dataStatus={dataStatus} />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
          {/* Hero Risk Summary */}
          <div className="mb-6 md:mb-8">
            <RiskHero 
              risk={overallRisk} 
              regionContent={regionContent}
              lastUpdated={lastUpdated}
            />
          </div>

          {/* Recommended Locations */}
          <div className="mb-6 md:mb-8">
            <RecommendedLocations 
              zoneRisks={zoneRisks}
              regionContent={regionContent}
              overallRiskScore={overallRisk.score}
            />
          </div>

          {/* Interactive Risk Map */}
          <div className="mb-6 md:mb-8">
            <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Interactive Risk Map
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Location-specific risk assessment across {regionContent.displayName}
                </p>
              </div>
              <div className="p-4 md:p-6">
                <CircleRiskMap zoneRisks={zoneRisks} regionConfig={regionConfig!} />
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Click or tap beach markers for detailed risk information and guidance
                </p>
              </div>
            </section>
          </div>

          {/* Risk Drivers */}
          <div className="mb-6 md:mb-8">
            <RiskDrivers risk={overallRisk} />
          </div>

          {/* Species Risk Profile */}
          {overallRisk.bySpecies && overallRisk.bySpecies.length > 0 && (
            <div className="mb-6 md:mb-8">
              <SpeciesProfile 
                speciesRisks={overallRisk.bySpecies}
                primaryThreat={overallRisk.primaryThreat || overallRisk.bySpecies[0].species}
              />
            </div>
          )}

          {/* Data Sources & Methodology */}
          <div className="mb-6 md:mb-8">
            <DataSources />
          </div>

          {/* Safety Disclaimer */}
          <div className="mb-8 md:mb-10">
            <SafetyDisclaimer />
          </div>

          {/* Optional: Built for Coastal Safety Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Built for Coastal Safety Intelligence
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              This platform demonstrates real-time environmental risk monitoring capabilities for beach safety operations, councils and coastal management.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Real-Time Monitoring
                </h3>
                <p className="text-xs text-gray-600">
                  Live environmental risk assessment updated every 30 minutes
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Location-Specific
                </h3>
                <p className="text-xs text-gray-600">
                  Beach-level risk assessment across multiple locations
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Science-Based
                </h3>
                <p className="text-xs text-gray-600">
                  Methodology grounded in peer-reviewed research
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Operational Ready
                </h3>
                <p className="text-xs text-gray-600">
                  Designed for integration with safety operations
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8 md:py-10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 mb-6">
              <div>
                <h3 className="text-white font-bold mb-3">Shark Risk Intelligence</h3>
                <p className="text-sm text-gray-400">
                  Real-time environmental risk assessment for Australian coastal locations.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Official Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      BeachSafe Australia
                    </a>
                  </li>
                  <li>
                    <a href="http://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      Bureau of Meteorology
                    </a>
                  </li>
                  <li>
                    <a href="https://sls.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      Surf Life Saving Australia
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Important</h4>
                <p className="text-sm text-gray-400 mb-2">
                  This is an environmental risk assessment tool, not a shark detection system.
                </p>
                <p className="text-sm text-gray-400">
                  Always follow official beach safety advice and lifeguard instructions.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>
                &copy; 2026 Shark Risk Intelligence. Built with data from the Bureau of Meteorology and marine APIs.
              </p>
              <p className="text-gray-500">
                Built by <a href="https://nodestrategy.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Node Strategy</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </RegionAwareApp>
  );
}
