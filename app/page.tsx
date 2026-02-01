/**
 * Sydney Shark Warning System - Main Page
 * Build: v1.0.1 - Citations + Navy Logo + Redis (2026-01-28)
 */

import dynamic from 'next/dynamic';
import SimpleRiskGauge from '@/components/SimpleRiskGauge';
import RiskFactorsDetail from '@/components/RiskFactorsDetail';
import ExplainabilitySection from '@/components/ExplainabilitySection';
import Disclaimer from '@/components/Disclaimer';
import NodeStrategyBranding from '@/components/NodeStrategyBranding';
import { HeaderSharkIcon, HeaderNodeLogo } from '@/components/HeaderIcons';
import { DataService } from '@/lib/data-service';

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

export default async function Home() {
  const dataService = new DataService();
  
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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Shark Icon */}
            <div className="flex items-center gap-4">
              <HeaderSharkIcon />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Real-Time Shark Risk
                </h1>
                <p className="text-sm text-slate-300 mt-1">
                  Real-time environmental risk assessment for Sydney beaches
                </p>
              </div>
            </div>

            {/* Right: Node Strategy Logo */}
            <a
              href="https://www.nodestrategy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block hover:opacity-80 transition-opacity"
            >
              <HeaderNodeLogo />
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Purpose */}
        <div className="bg-slate-50 border-l-4 border-slate-900 p-4 md:p-6 mb-6 md:mb-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
            This tool draws on peer-reviewed scientific data on the leading indicators of increased shark-attack risk, using publicly available real-time data from the Bureau of Meteorology and marine APIs to create a scored risk assessment that helps inform people of the risk of swimming.
          </p>
        </div>

        {/* Risk Gauge */}
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8 border border-gray-200">
          <SimpleRiskGauge risk={overallRisk} />
        </div>

        {/* Risk Map */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900 px-2">Interactive Risk Map</h2>
          <div className="bg-white rounded-lg shadow-xl p-2 md:p-4 border border-gray-200">
            <CircleRiskMap zoneRisks={zoneRisks} />
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3 text-center px-4">
            Click or hover over beach areas to see risk levels and guidance. Each circle represents a beach or harbour swimming area.
          </p>
        </div>

        {/* Risk Factors Detail */}
        <RiskFactorsDetail risk={overallRisk} />

        {/* Explainability */}
        <ExplainabilitySection />

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
  );
}
