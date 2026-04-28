'use client';

import { RiskResult } from '@/lib/types';

interface SpeciesRiskProps {
  risk: RiskResult;
  regionName: string;
}

export default function SpeciesRisk({ risk, regionName }: SpeciesRiskProps) {
  const sortedSpecies = [...(risk.bySpecies || [])].sort((a, b) => b.score - a.score);
  const primarySpecies = sortedSpecies[0];
  const secondarySpecies = sortedSpecies.slice(1, 3);

  if (!primarySpecies) {
    return null;
  }

  const getRiskLevel = (score: number) => {
    if (score >= 81) return { label: 'SEVERE', color: 'bg-red-600 text-white' };
    if (score >= 61) return { label: 'HIGH', color: 'bg-orange-500 text-white' };
    if (score >= 31) return { label: 'MODERATE', color: 'bg-yellow-500 text-gray-900' };
    return { label: 'LOW', color: 'bg-green-500 text-white' };
  };

  const getHabitatText = (species: string) => {
    const name = species.toLowerCase();
    if (name.includes('bull')) {
      return 'Most relevant in harbours, estuaries, river mouths and brackish water. Risk increases after heavy rainfall.';
    }
    if (name.includes('white')) {
      return 'Most relevant at open-ocean beaches, particularly during cooler months. Often near seal colonies.';
    }
    if (name.includes('tiger')) {
      return 'Most relevant in tropical and subtropical waters. Often near reefs and drop-offs.';
    }
    if (name.includes('bronze') || name.includes('whaler')) {
      return 'Most relevant at open-ocean beaches during summer. Less aggressive species.';
    }
    return 'Risk varies by location type and environmental conditions.';
  };

  const primaryRisk = getRiskLevel(primarySpecies.score);

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Primary Species Risk
      </h2>

      {/* Primary Species Card */}
      <div className="border-2 border-gray-300 rounded-xl overflow-hidden mb-6">
        <div className="p-5 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Primary Species Driving Today's Risk
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {primarySpecies.species}
              </h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1.5 rounded-lg text-sm font-bold ${primaryRisk.color}`}>
                {primaryRisk.label}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {primarySpecies.score}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-800 leading-relaxed">
              <strong>Where this matters most:</strong> {getHabitatText(primarySpecies.species)}
            </p>
          </div>
        </div>

        {/* Active Triggers */}
        {primarySpecies.activeTriggers && primarySpecies.activeTriggers.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-200">
            <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Why Conditions Are Elevated
            </div>
            <div className="flex flex-wrap gap-2">
              {primarySpecies.activeTriggers.map((trigger, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-orange-200 text-sm"
                >
                  <span className="text-orange-600">▲</span>
                  <span className="font-medium text-gray-900">{trigger}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Secondary Species (if any) */}
      {secondarySpecies.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Other Species Present
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {secondarySpecies.map((species) => {
              const secondaryRisk = getRiskLevel(species.score);
              return (
                <div 
                  key={species.species}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900 text-sm">
                      {species.species}
                    </div>
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${secondaryRisk.color}`}>
                      {secondaryRisk.label}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Score: {species.score}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
