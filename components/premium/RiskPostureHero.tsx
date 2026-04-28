'use client';

import { RiskResult } from '@/lib/types';

interface RiskPostureHeroProps {
  risk: RiskResult;
  regionName: string;
}

export default function RiskPostureHero({ risk, regionName }: RiskPostureHeroProps) {
  const getRiskBand = (score: number): { label: string; color: string; bg: string } => {
    if (score >= 81) return { label: 'Severe', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 61) return { label: 'High', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (score >= 31) return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  const getPostureNarrative = (score: number): { headline: string; body: string; action: string } => {
    if (score >= 61) {
      return {
        headline: 'Elevated risk profile in enclosed waterways',
        body: 'Current conditions show stronger alignment with Bull Shark activity patterns in harbour, estuary and river-mouth environments. Open, patrolled ocean beaches currently present a lower relative-risk profile.',
        action: 'Prefer patrolled open beaches. Avoid murky or enclosed water, especially after rainfall.',
      };
    }
    if (score >= 31) {
      return {
        headline: 'Moderate environmental conditions',
        body: 'Current signals indicate some alignment with shark activity patterns. Standard caution advised in all waterways. Risk profile remains lower at patrolled open-ocean beaches.',
        action: 'Swim at patrolled beaches between the flags. Exercise caution in enclosed waterways.',
      };
    }
    return {
      headline: 'Favourable conditions for coastal activity',
      body: 'Current environmental signals show minimal alignment with elevated shark activity patterns. Standard water safety protocols apply across all locations.',
      action: 'Follow normal swimming precautions. Always swim at patrolled beaches.',
    };
  };

  const band = getRiskBand(risk.score);
  const narrative = getPostureNarrative(risk.score);
  const primarySpecies = risk.bySpecies?.[0];
  const primaryDriver = risk.explanation?.conditionsMet?.find(c => c.met && c.weight >= 10);

  return (
    <section className="bg-gradient-to-br from-[#0f1f3a] to-[#1a2f4f] border-b border-[#2a4163]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10 lg:py-12">
        {/* Top Label */}
        <div className="text-[11px] font-semibold text-[#6b9bb3] uppercase tracking-wider mb-6">
          Current Coastal Risk Posture · {regionName}
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12">
          {/* Left: Narrative */}
          <div className="space-y-5">
            <h1 className="text-[30px] lg:text-[36px] font-bold text-white leading-tight tracking-tight">
              {narrative.headline}
            </h1>
            
            <p className="text-[17px] text-[#8cb4c7] leading-relaxed max-w-3xl">
              {narrative.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Recommended Safety Posture
                </div>
                <p className="text-[15px] text-white leading-relaxed">
                  {narrative.action}
                </p>
              </div>
              
              {primarySpecies && (
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                    Primary Species Signal
                  </div>
                  <p className="text-[15px] text-white leading-relaxed">
                    {primarySpecies.species} · Score {primarySpecies.score}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Score Module */}
          <div className="lg:w-[280px]">
            <div className="bg-[#1a2f4f]/60 backdrop-blur-sm border border-[#2a4163] rounded-xl p-6 space-y-4">
              {/* Risk Band */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Risk Band
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${band.bg} border border-${band.color.replace('text-', '')}/20 rounded-lg`}>
                  <div className={`w-2 h-2 rounded-full ${band.color.replace('text-', 'bg-')}`}></div>
                  <span className={`text-sm font-bold ${band.color}`}>{band.label}</span>
                </div>
              </div>

              {/* Score */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Aggregate Score
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tabular-nums">{risk.score}</span>
                  <span className="text-sm text-[#6b9bb3]">/ 100</span>
                </div>
                <p className="text-[13px] text-[#6b9bb3] mt-2 leading-relaxed">
                  Score reflects relative alignment between current environmental conditions and known shark activity patterns.
                </p>
              </div>

              {/* Primary Driver */}
              {primaryDriver && (
                <div>
                  <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                    Primary Environmental Driver
                  </div>
                  <p className="text-[15px] text-white">
                    {primaryDriver.name}
                  </p>
                </div>
              )}

              {/* Confidence */}
              <div>
                <div className="text-[11px] font-semibold text-[#516a8b] uppercase tracking-wider mb-2">
                  Model Confidence
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#2a4163] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        risk.confidence === 'high' ? 'bg-emerald-500 w-full' :
                        risk.confidence === 'medium' ? 'bg-amber-500 w-2/3' :
                        'bg-orange-500 w-1/3'
                      }`}
                    ></div>
                  </div>
                  <span className="text-[13px] font-medium text-[#8cb4c7] capitalize">{risk.confidence}</span>
                </div>
              </div>

              {/* Last Updated */}
              <div className="pt-3 border-t border-[#2a4163]">
                <div className="text-[11px] text-[#516a8b]">
                  Updated {new Date(risk.timestamp).toLocaleTimeString('en-AU', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
