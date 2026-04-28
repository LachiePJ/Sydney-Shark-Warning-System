'use client';

import { RiskResult } from '@/lib/types';

interface SpeciesRiskProfileProps {
  risk: RiskResult;
  regionName: string;
}

export default function SpeciesRiskProfile({ risk, regionName }: SpeciesRiskProfileProps) {
  const sortedSpecies = [...(risk.bySpecies || [])].sort((a, b) => b.score - a.score);
  const primarySpecies = sortedSpecies[0];
  const secondarySpecies = sortedSpecies.slice(1);

  if (!primarySpecies) {
    return null;
  }

  const getRelevanceLevel = (score: number): { label: string; color: string; bg: string } => {
    if (score >= 61) return { label: 'High relevance', color: 'text-orange-700', bg: 'bg-orange-50' };
    if (score >= 31) return { label: 'Moderate relevance', color: 'text-amber-700', bg: 'bg-amber-50' };
    return { label: 'Low relevance', color: 'text-blue-700', bg: 'bg-blue-50' };
  };

  const getHabitatAlignment = (species: string): string => {
    const name = species.toLowerCase();
    if (name.includes('bull')) {
      return 'Harbour, estuary, river mouth, brackish systems';
    }
    if (name.includes('white')) {
      return 'Open-ocean beaches, cooler temperate waters';
    }
    if (name.includes('tiger')) {
      return 'Tropical and subtropical coastal waters, reef systems';
    }
    if (name.includes('bronze') || name.includes('whaler')) {
      return 'Open-ocean beaches, coastal waters';
    }
    return 'Coastal and near-shore environments';
  };

  const getOperatorGuidance = (species: string, score: number): string => {
    const name = species.toLowerCase();
    if (name.includes('bull') && score >= 31) {
      return 'Use caution in enclosed waterways and avoid murky water, particularly after rainfall.';
    }
    if (name.includes('white') && score >= 31) {
      return 'Elevated relevance at open-ocean beaches during cooler months. Follow standard protocols.';
    }
    if (name.includes('tiger') && score >= 31) {
      return 'Moderate relevance in warm coastal waters. Exercise standard caution near reef drop-offs.';
    }
    if (score >= 31) {
      return 'Current conditions show moderate alignment with this species\' known activity patterns.';
    }
    return 'Current conditions show minimal alignment with this species\' typical activity patterns.';
  };

  const getRegionalRelevance = (likelihood: string): { label: string; color: string } => {
    if (likelihood === 'common') return { label: 'Primary regional species', color: 'text-emerald-700' };
    if (likelihood === 'occasional') return { label: 'Secondary regional species', color: 'text-amber-700' };
    return { label: 'Rare in region', color: 'text-gray-600' };
  };

  const primaryRelevance = getRelevanceLevel(primarySpecies.score);
  const primaryRegional = getRegionalRelevance(primarySpecies.likelihood);

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Species Risk Profile
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed max-w-3xl">
          Species models are weighted by regional relevance, habitat alignment, incident history and current environmental conditions.
        </p>
      </div>

      <div className="p-6 lg:p-8">
        {/* Primary Species */}
        <div className="bg-gradient-to-br from-[#0f1f3a] to-[#1a2f4f] rounded-xl p-6 lg:p-8 mb-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6">
            {/* Left: Details */}
            <div className="space-y-5">
              {/* Header */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Primary Species Signal
                </div>
                <h3 className="text-[24px] font-bold text-white mb-3">
                  {primarySpecies.species}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${primaryRelevance.bg} border border-${primaryRelevance.color.replace('text-', '')}/20 rounded-lg`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${primaryRelevance.color.replace('text-', 'bg-')}`}></div>
                    <span className={`text-[13px] font-semibold ${primaryRelevance.color}`}>
                      {primaryRelevance.label}
                    </span>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg`}>
                    <span className={`text-[13px] font-semibold ${primaryRegional.color}`}>
                      {primaryRegional.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Habitat Alignment */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Habitat Alignment
                </div>
                <p className="text-[15px] text-[#8cb4c7]">
                  {getHabitatAlignment(primarySpecies.species)}
                </p>
              </div>

              {/* Active Signals */}
              {primarySpecies.activeTriggers && primarySpecies.activeTriggers.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                    Active Risk Signals
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primarySpecies.activeTriggers.map((trigger, idx) => (
                      <div 
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-amber-400/30 rounded-lg"
                      >
                        <div className="w-1 h-1 rounded-full bg-amber-400"></div>
                        <span className="text-[13px] font-medium text-white">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operator Guidance */}
              <div className="pt-4 border-t border-[#2a4163]">
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Operator Guidance
                </div>
                <p className="text-[15px] text-white leading-relaxed">
                  {getOperatorGuidance(primarySpecies.species, primarySpecies.score)}
                </p>
              </div>
            </div>

            {/* Right: Score */}
            <div className="flex flex-col items-end justify-start">
              <div className="text-right">
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Current Score
                </div>
                <div className="text-5xl font-bold text-white tabular-nums mb-1">
                  {primarySpecies.score}
                </div>
                <div className="text-[13px] text-[#6b9bb3]">
                  / 100
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Species - Compact Comparison */}
        {secondarySpecies.length > 0 && (
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Secondary Species Comparison
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {secondarySpecies.map((species) => {
                const relevance = getRelevanceLevel(species.score);
                return (
                  <div 
                    key={species.species}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[15px] font-semibold text-gray-900">
                        {species.species}
                      </div>
                      <div className="text-lg font-bold text-gray-900 tabular-nums">
                        {species.score}
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${relevance.bg} border border-${relevance.color.replace('text-', '')}/20 rounded`}>
                      <div className={`w-1 h-1 rounded-full ${relevance.color.replace('text-', 'bg-')}`}></div>
                      <span className={`text-[11px] font-semibold ${relevance.color}`}>
                        {relevance.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
