/**
 * Sydney Shark Warning System - Main Page
 * Build: v1.0.1 - Citations + Navy Logo + Redis (2026-01-28)
 */

import dynamic from 'next/dynamic';
import SimpleRiskGauge from '@/components/SimpleRiskGauge';
import RiskFactorsDetail from '@/components/RiskFactorsDetail';
import SpeciesRiskBreakdown from '@/components/SpeciesRiskBreakdown';
import ExplainabilitySection from '@/components/ExplainabilitySection';
import Disclaimer from '@/components/Disclaimer';
import NodeStrategyBranding from '@/components/NodeStrategyBranding';
import { HeaderSharkIcon, HeaderNodeLogo } from '@/components/HeaderIcons';
import { DataService } from '@/lib/data-service';
import { getRegion } from '@/config/regions';
import { getRegionContent } from '@/config/region-content';
import RegionAwareApp from '@/components/RegionAwareApp';
import HeaderWithRegionSelector from '@/components/HeaderWithRegionSelector';

// Dynamic import for map (client-side only)
const CircleRiskMap = dynamic(() => import('@/components/CircleRiskMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
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
  const regionName = regionConfig?.displayName || 'Sydney';
  const regionContent = getRegionContent(regionId);
  
  const dataService = new DataService(regionId);
  
  // Auto-refresh: Update data if cache is stale (older than 30 minutes)
  const dataAge = dataService.getCacheAge();
  const THIRTY_MINUTES = 30 * 60 * 1000;
  
  if (dataAge === null || dataAge > THIRTY_MINUTES) {
    console.log('🔄 Cache is stale, auto-refreshing data...');
    try {
      await dataService.refreshData();
      console.log('✅ Auto-refresh complete');
    } catch (error) {
      console.error('⚠️  Auto-refresh failed:', error);
      // Continue with cached data if refresh fails
    }
  }
  
  // Calculate risks
  const zoneRisks = await dataService.calculateAllZoneRisks();
  
  // Get overall risk (highest zone risk)
  const overallRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  return (
    <RegionAwareApp initialRegion={regionId}>
      <main className="min-h-screen bg-white">
      {/* Header with Region Selector */}
      <HeaderWithRegionSelector initialRegion={regionId} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Purpose */}
        <div className="bg-slate-50 border-l-4 border-slate-900 p-4 md:p-6 mb-6 md:mb-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
            Welcome to real-time shark risk. This tool analyzes real-time environmental data from the Bureau of Meteorology and marine APIs, combining it with peer-reviewed scientific research on shark behavior to provide up-to-the-minute risk assessments for {regionName} beaches.
          </p>
        </div>

        {/* Risk Gauge */}
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8 border border-gray-200">
          <SimpleRiskGauge risk={overallRisk} regionContent={regionContent} />
        </div>

        {/* Risk Map */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900 px-2">Interactive Risk Map</h2>
          <div className="bg-white rounded-lg shadow-xl p-2 md:p-4 border border-gray-200">
            <CircleRiskMap zoneRisks={zoneRisks} regionConfig={regionConfig!} />
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3 text-center px-4">
            Click or hover over beach areas to see risk levels and guidance. Each circle represents a beach or harbour swimming area.
          </p>
        </div>

        {/* Species Risk Breakdown - NEW */}
        {overallRisk.bySpecies && overallRisk.bySpecies.length > 0 && (
          <SpeciesRiskBreakdown 
            speciesRisks={overallRisk.bySpecies} 
            primaryThreat={overallRisk.primaryThreat || ''} 
            regionContent={regionContent}
          />
        )}

        {/* Risk Factors Detail */}
        <RiskFactorsDetail risk={overallRisk} />

        {/* Explainability */}
        <ExplainabilitySection regionContent={regionContent} />

        {/* Disclaimer - Moved to bottom */}
        <Disclaimer />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p className="mb-2">
            Real-Time Shark Risk &copy; 2026. Built with data from the{' '}
            <a
              href="http://www.bom.gov.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Australian Bureau of Meteorology
            </a>
            .
          </p>
          <p className="mb-4">
            For official beach safety information, visit{' '}
            <a
              href="https://www.beachsafe.org.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              BeachSafe
            </a>{' '}
            or consult local lifeguard services.
          </p>
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleString('en-GB')}
          </p>
        </footer>
      </div>

      {/* Node Strategy Branding */}
      <NodeStrategyBranding />
    </main>
    </RegionAwareApp>
  );
}
