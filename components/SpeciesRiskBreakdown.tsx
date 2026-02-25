'use client';

import { SpeciesRisk } from '@/lib/types';
import { RegionContent } from '@/config/region-content';

interface SpeciesRiskBreakdownProps {
  speciesRisks: SpeciesRisk[];
  primaryThreat: string;
  regionContent: RegionContent;
}

export default function SpeciesRiskBreakdown({ speciesRisks, primaryThreat, regionContent }: SpeciesRiskBreakdownProps) {
  if (!speciesRisks || speciesRisks.length === 0) {
    return null;
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-red-900 bg-red-100 border-red-300';
    if (score >= 60) return 'text-red-700 bg-red-50 border-red-200';
    if (score >= 40) return 'text-orange-700 bg-orange-50 border-orange-200';
    if (score >= 20) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  const getRiskLabel = (score: number): string => {
    if (score >= 80) return 'EXTREME';
    if (score >= 60) return 'SEVERE';
    if (score >= 40) return 'HIGH';
    if (score >= 20) return 'MODERATE';
    return 'LOW';
  };

  const getLikelihoodBadge = (likelihood: string) => {
    const colors = {
      common: 'bg-red-100 text-red-800',
      occasional: 'bg-yellow-100 text-yellow-800',
      rare: 'bg-green-100 text-green-800',
    };
    return colors[likelihood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getIncidentBadge = (history: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[history as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const primary = speciesRisks.find(s => s.species === primaryThreat) || speciesRisks[0];
  const others = speciesRisks.filter(s => s.species !== primaryThreat);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">🦈 Species Specific Risk Model</h3>

      {/* Primary Threat */}
      <div className={`border-2 rounded-lg p-3 md:p-4 mb-3 md:mb-4 ${getScoreColor(primary.score)}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl md:text-2xl">🦈</span>
              <div>
                <h4 className="text-base md:text-lg font-bold">Primary: {primary.species}</h4>
                <p className="text-xs md:text-sm italic hidden md:block">{primary.scientificName}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-3">
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getLikelihoodBadge(primary.likelihood)}`}>
                {primary.likelihood.toUpperCase()}
              </span>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getIncidentBadge(primary.incidentHistory)}`}>
                {primary.incidentHistory.toUpperCase()} INCIDENT HISTORY
              </span>
            </div>

            {primary.activeTriggers.length > 0 && (
              <div>
                <p className="text-xs md:text-sm font-semibold mb-1">Active Triggers:</p>
                <ul className="text-xs md:text-sm space-y-0.5 md:space-y-1">
                  {primary.activeTriggers.map((trigger, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-1 md:mr-2">⚠️</span>
                      <span>{trigger}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-right ml-2 md:ml-4">
            <div className="text-2xl md:text-3xl font-bold">{primary.score}</div>
            <div className="text-xs md:text-sm font-semibold">{getRiskLabel(primary.score)}</div>
          </div>
        </div>
      </div>

      {/* Other Species */}
      {others.length > 0 && (
        <div>
          <h5 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Other Species:</h5>
          <div className="space-y-2">
            {others.map((species) => (
              <div key={species.species} className={`border rounded p-2 md:p-3 ${getScoreColor(species.score)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm md:text-base">{species.species}</span>
                      <span className="text-xs italic text-gray-600 hidden md:inline">{species.scientificName}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getLikelihoodBadge(species.likelihood)}`}>
                        {species.likelihood}
                      </span>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${getIncidentBadge(species.incidentHistory)}`}>
                        {species.incidentHistory} incidents
                      </span>
                    </div>

                    {species.activeTriggers.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        {species.activeTriggers.slice(0, 2).join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="text-right ml-2 md:ml-4">
                    <div className="text-xl md:text-2xl font-bold">{species.score}</div>
                    <div className="text-xs">{getRiskLabel(species.score)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Note - Simplified */}
      <div className="mt-3 p-2 md:p-3 bg-blue-50 border border-blue-200 rounded text-xs md:text-sm text-blue-900">
        <p className="font-semibold mb-1">📊 {regionContent.displayName}</p>
        <p className="text-xs">
          {regionContent.dominantSpecies}s are the primary threat. {regionContent.dominantSpeciesStats || ''}
        </p>
      </div>
    </div>
  );
}
