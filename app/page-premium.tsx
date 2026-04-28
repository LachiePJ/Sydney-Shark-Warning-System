/**
 * Live Shark Risk - Premium Coastal Risk Intelligence Platform
 * Enterprise-grade environmental risk assessment
 */

import { DataService } from '@/lib/data-service';
import { getRegion } from '@/config/regions';
import { getRegionContent } from '@/config/region-content';
import RegionAwareApp from '@/components/RegionAwareApp';

// Premium Components
import PremiumHeader from '@/components/premium/PremiumHeader';
import RiskPostureHero from '@/components/premium/RiskPostureHero';
import LocationIntelligenceMap from '@/components/premium/LocationIntelligenceMap';
import RiskSignalMatrix from '@/components/premium/RiskSignalMatrix';
import SpeciesRiskProfile from '@/components/premium/SpeciesRiskProfile';
import DataConfidence from '@/components/premium/DataConfidence';
import MethodologyOverview from '@/components/premium/MethodologyOverview';
import PartnerCapability from '@/components/premium/PartnerCapability';
import SafetyContext from '@/components/premium/SafetyContext';

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
  
  // Get highest risk for regional overview (not primary focus)
  const highestRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  return (
    <RegionAwareApp initialRegion={regionId}>
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fb] to-white">
        {/* Premium Header */}
        <PremiumHeader initialRegion={regionId} dataStatus={dataStatus} />

        {/* Main Content */}
        <main className="space-y-8 lg:space-y-12 pb-16">
          
          {/* A. Risk Posture Hero - Command Center Style */}
          <RiskPostureHero 
            risk={highestRisk}
            regionName={regionName}
          />

          {/* Content Container */}
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 space-y-8 lg:space-y-12">
            
            {/* B. Location Intelligence Map + Side Panel */}
            <LocationIntelligenceMap 
              zoneRisks={zoneRisks}
              regionConfig={regionConfig!}
              regionName={regionName}
            />

            {/* C. Risk Signal Matrix */}
            <RiskSignalMatrix 
              risk={highestRisk}
            />

            {/* D. Species Risk Profile */}
            <SpeciesRiskProfile 
              risk={highestRisk}
              regionName={regionName}
            />

            {/* E. Data Confidence Module */}
            <DataConfidence 
              risk={highestRisk}
              dataAge={dataAge}
            />

            {/* F. Methodology Overview */}
            <MethodologyOverview />

            {/* G. Safety Context & Limitations */}
            <SafetyContext />

          </div>

          {/* H. Partner Capability Section */}
          <PartnerCapability />

        </main>

        {/* Premium Footer */}
        <footer className="bg-[#0a1628] border-t border-[#1a2f4f]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="text-white font-bold text-lg mb-2">
                  Live Shark Risk
                </div>
                <div className="text-[#6b9bb3] text-[13px] leading-relaxed">
                  Coastal risk intelligence platform translating live environmental conditions into practical water-safety guidance.
                </div>
              </div>

              {/* Links */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-3">
                  Resources
                </div>
                <ul className="space-y-2 text-[13px]">
                  <li>
                    <a href="/how-it-works" className="text-[#6b9bb3] hover:text-[#8cb4c7] transition-colors">
                      Methodology
                    </a>
                  </li>
                  <li>
                    <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="text-[#6b9bb3] hover:text-[#8cb4c7] transition-colors">
                      BeachSafe Australia
                    </a>
                  </li>
                  <li>
                    <a href="http://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" className="text-[#6b9bb3] hover:text-[#8cb4c7] transition-colors">
                      Bureau of Meteorology
                    </a>
                  </li>
                </ul>
              </div>

              {/* Attribution */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-3">
                  Data Sources
                </div>
                <div className="text-[13px] text-[#6b9bb3] leading-relaxed">
                  Environmental data from Bureau of Meteorology and Open-Meteo Marine API. Species models based on peer-reviewed research.
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#1a2f4f] flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[13px] text-[#516a8b]">
                &copy; 2026 Live Shark Risk. Environmental intelligence for safer coastal decisions.
              </div>
              <div className="text-[13px] text-[#516a8b]">
                Built by{' '}
                <a href="https://nodestrategy.com" target="_blank" rel="noopener noreferrer" className="text-[#6b9bb3] hover:text-[#8cb4c7] transition-colors">
                  Node Strategy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </RegionAwareApp>
  );
}
