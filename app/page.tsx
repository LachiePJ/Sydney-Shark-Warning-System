import SimpleRiskGauge from '@/components/SimpleRiskGauge';
import RiskMap from '@/components/RiskMap';
import RiskFactorsDetail from '@/components/RiskFactorsDetail';
import ExplainabilitySection from '@/components/ExplainabilitySection';
import Disclaimer from '@/components/Disclaimer';
import NodeStrategyBranding from '@/components/NodeStrategyBranding';
import { HeaderSharkIcon, HeaderNodeLogo } from '@/components/HeaderIcons';
import { DataService } from '@/lib/data-service';

export const revalidate = 1800; // Revalidate every 30 minutes

export default async function Home() {
  const dataService = new DataService();
  
  // Calculate risks
  const zoneRisks = await dataService.calculateAllZoneRisks();
  
  // Get overall risk (highest zone risk)
  const overallRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  const metricsStatus = dataService.getMetricsStatus();
  const dataFreshness = dataService.getDataFreshness();

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
        {/* Data Health Banner */}
        {dataFreshness !== 'current' && (
          <div className={`mb-6 p-4 rounded-lg ${
            dataFreshness === 'stale' 
              ? 'bg-yellow-50 border-2 border-yellow-300 text-yellow-900'
              : 'bg-red-50 border-2 border-red-300 text-red-900'
          }`}>
            <strong>Data Status:</strong> {
              dataFreshness === 'stale' 
                ? 'Data is older than 30 minutes. Risk assessment may not reflect current conditions.'
                : 'Data is significantly outdated or unavailable. Risk assessment reliability is reduced.'
            }
            {metricsStatus.missing.length > 0 && (
              <div className="mt-2 text-sm">
                Missing metrics: {metricsStatus.missing.join(', ')}
              </div>
            )}
          </div>
        )}

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
            <RiskMap zoneRisks={zoneRisks} />
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Click or hover over zones for detailed risk information and contributing factors
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
            Last updated: {new Date().toLocaleString('en-GB')} | Data freshness: {dataFreshness}
          </p>
        </footer>
      </div>

      {/* Node Strategy Branding */}
      <NodeStrategyBranding />
    </main>
  );
}
