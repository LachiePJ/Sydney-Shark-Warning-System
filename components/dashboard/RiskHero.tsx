'use client';

import { RiskResult } from '@/lib/types';
import { RegionContent } from '@/config/region-content';

interface RiskHeroProps {
  risk: RiskResult;
  regionContent: RegionContent;
  lastUpdated: string;
}

export default function RiskHero({ risk, regionContent, lastUpdated }: RiskHeroProps) {
  // Get risk-specific styling
  const getRiskColor = (score: number) => {
    if (score >= 81) return { bg: '#991b1b', text: '#ffffff', label: 'Extreme Risk' };
    if (score >= 61) return { bg: '#ef4444', text: '#ffffff', label: 'Severe Risk' };
    if (score >= 41) return { bg: '#f97316', text: '#ffffff', label: 'High Risk' };
    if (score >= 21) return { bg: '#f59e0b', text: '#1f2937', label: 'Moderate Risk' };
    return { bg: '#10b981', text: '#ffffff', label: 'Low Risk' };
  };

  const riskStyle = getRiskColor(risk.score);

  // Generate headline based on risk and primary threat
  const getHeadline = () => {
    if (risk.score >= 61) {
      return `Elevated risk conditions present${risk.primaryThreat ? ` — ${risk.primaryThreat} activity likely` : ''}`;
    }
    if (risk.score >= 41) {
      return `Elevated risk in harbour and estuary locations`;
    }
    if (risk.score >= 21) {
      return `Moderate conditions — standard beach precautions apply`;
    }
    return `Favourable conditions — standard beach precautions apply`;
  };

  // Generate primary driver explanation
  const getDriverExplanation = () => {
    if (risk.bySpecies && risk.bySpecies.length > 0) {
      const primary = risk.bySpecies[0];
      if (primary.activeTriggers.length > 0) {
        const triggers = primary.activeTriggers.slice(0, 2).map(t => t.split(':')[0].toLowerCase());
        return `${triggers.join(' and ')} are creating favourable conditions for ${primary.species} activity`;
      }
    }
    return 'Environmental conditions assessed against shark behaviour patterns';
  };

  // Generate recommended action
  const getRecommendedAction = () => {
    if (risk.score >= 61) {
      return 'Avoid swimming in harbour, estuary and river mouth locations. Use extreme caution at patrolled ocean beaches only.';
    }
    if (risk.score >= 41) {
      return 'Swim at patrolled open-ocean beaches. Avoid harbour, river mouths and murky water locations.';
    }
    if (risk.score >= 21) {
      return 'Swim at patrolled beaches. Standard beach safety precautions apply.';
    }
    return 'Conditions are favourable. Always swim at patrolled beaches between the flags.';
  };

  return (
    <section className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Risk Status Bar */}
      <div 
        className="px-6 py-4 md:px-8 md:py-5"
        style={{ backgroundColor: riskStyle.bg, color: riskStyle.text }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {riskStyle.label}
            </h1>
            <p className="text-sm md:text-base opacity-90">
              Current conditions for {regionContent.displayName}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl md:text-5xl font-bold">
              {risk.score}
            </div>
            <div className="text-xs md:text-sm opacity-90">
              / 100
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Assessment */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              {getHeadline()}
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Primary Driver
                </div>
                <p className="text-base text-gray-700">
                  {getDriverExplanation()}
                </p>
              </div>

              {risk.primaryThreat && (
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Primary Species
                  </div>
                  <p className="text-base text-gray-900 font-medium">
                    {risk.primaryThreat}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Action Guidance */}
          <div>
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4 md:p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-2">
                    Recommended Action
                  </h3>
                  <p className="text-sm md:text-base text-blue-900 leading-relaxed">
                    {getRecommendedAction()}
                  </p>
                </div>
              </div>
            </div>

            {/* Confidence & Data Status */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-medium">Confidence:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${
                  risk.confidence === 'high' ? 'bg-green-100 text-green-800' :
                  risk.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {risk.confidence.charAt(0).toUpperCase() + risk.confidence.slice(1)}
                </span>
              </div>
              <div>
                Updated: {new Date(lastUpdated).toLocaleTimeString('en-AU', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
