'use client';

import { useState } from 'react';
import { SpeciesRisk } from '@/lib/types';

interface SpeciesProfileProps {
  speciesRisks: SpeciesRisk[];
  primaryThreat: string;
}

export default function SpeciesProfile({ speciesRisks, primaryThreat }: SpeciesProfileProps) {
  const [expanded, setExpanded] = useState(false);

  const primary = speciesRisks.find(s => s.species === primaryThreat) || speciesRisks[0];
  const secondary = speciesRisks.filter(s => s.species !== primaryThreat);

  const getRiskColor = (score: number) => {
    if (score >= 61) return 'bg-red-50 border-red-200 text-red-900';
    if (score >= 41) return 'bg-orange-50 border-orange-200 text-orange-900';
    if (score >= 21) return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    return 'bg-green-50 border-green-200 text-green-900';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 61) return 'Severe';
    if (score >= 41) return 'High';
    if (score >= 21) return 'Moderate';
    return 'Low';
  };

  const getHabitatGuidance = (species: string) => {
    if (species.includes('Bull')) {
      return 'Harbour, estuary, river mouths, coastal zones. Avoid murky water after rainfall.';
    }
    if (species.includes('White')) {
      return 'Open ocean, seal colonies, offshore reefs. More common in cooler months.';
    }
    if (species.includes('Tiger')) {
      return 'Tropical and sub-tropical waters, reefs, harbours. More active in warmer months.';
    }
    return 'Coastal and offshore environments.';
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Species Risk Profile
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Species-specific environmental risk assessment
        </p>
      </div>

      {/* Primary Species */}
      <div className={`border-2 rounded-lg p-5 md:p-6 mb-4 ${getRiskColor(primary.score)}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🦈</span>
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {primary.species}
                </h3>
                <p className="text-sm italic opacity-75">
                  {primary.scientificName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/50">
                Primary Threat
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/50">
                {primary.likelihood.charAt(0).toUpperCase() + primary.likelihood.slice(1)} in this region
              </span>
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="text-3xl md:text-4xl font-bold">
              {primary.score}
            </div>
            <div className="text-sm font-semibold">
              {getRiskLabel(primary.score)} Risk
            </div>
          </div>
        </div>

        {primary.activeTriggers.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">
              Active Environmental Triggers:
            </h4>
            <ul className="text-sm space-y-1 opacity-90">
              {primary.activeTriggers.map((trigger, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="flex-shrink-0">⚠️</span>
                  <span>{trigger}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-current/20">
          <h4 className="text-sm font-semibold mb-1">
            Habitat & Guidance:
          </h4>
          <p className="text-sm opacity-90">
            {getHabitatGuidance(primary.species)}
          </p>
        </div>
      </div>

      {/* Secondary Species - Collapsible */}
      {secondary.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-2"
          >
            <span className="text-sm font-semibold text-gray-700">
              Other Species Present ({secondary.length})
            </span>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expanded && (
            <div className="space-y-3">
              {secondary.map((species) => {
                const riskLabel = getRiskLabel(species.score);
                return (
                  <div 
                    key={species.species}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {species.species}
                        </h4>
                        <p className="text-xs text-gray-600 italic">
                          {species.scientificName}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {species.score}
                        </div>
                        <div className="text-xs text-gray-600">
                          {riskLabel} Risk
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded-full bg-white border border-gray-300 text-gray-700">
                        {species.likelihood}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-white border border-gray-300 text-gray-700">
                        {species.incidentHistory} incident history
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong>Understanding Species Risk:</strong> Each species is scored independently based on current environmental conditions, then weighted by likelihood at this location and historical incident data. This assessment estimates where environmental conditions may be favourable for activity, not actual species presence.
        </p>
      </div>
    </section>
  );
}
