/**
 * Sydney Shark Warning System - Main Page
 * Build: v1.0.1 - Citations + Navy Logo + Redis (2026-01-28)
 */

import SimpleRiskGauge from '@/components/SimpleRiskGauge';
import CircleRiskMap from '@/components/CircleRiskMap';
import RiskFactorsDetail from '@/components/RiskFactorsDetail';
import ExplainabilitySection from '@/components/ExplainabilitySection';
import Disclaimer from '@/components/Disclaimer';
import NodeStrategyBranding from '@/components/NodeStrategyBranding';
import { HeaderSharkIcon, HeaderNodeLogo } from '@/components/HeaderIcons';
import { DataService } from '@/lib/data-service';

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
                  Sydney Shark Warning System
                </h1>
                <p className="text-sm text-slate-300 mt-1">
                  Environmental risk assessment for Sydney beaches
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
        {/* Purpose - Simplified */}
        <div className="bg-slate-50 border-l-4 border-slate-900 p-6 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            This system analyses environmental conditions that correlate with increased shark activity, using official Bureau of Meteorology data. 
            <strong className="text-slate-900"> This is an environmental risk heuristic</strong>, not a shark detection system.
          </p>
        </div>

        {/* Risk Gauge */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-gray-200">
          <SimpleRiskGauge risk={overallRisk} />
        </div>

        {/* Risk Map */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Interactive Risk Map</h2>
          <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
            <CircleRiskMap zoneRisks={zoneRisks} />
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
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
            Sydney Shark Warning System &copy; 2026. Built with data from the{' '}
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
