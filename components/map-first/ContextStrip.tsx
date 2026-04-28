'use client';

import { RiskResult } from '@/lib/types';

interface ContextStripProps {
  risk: RiskResult;
}

export default function ContextStrip({ risk }: ContextStripProps) {
  const getConditionSummary = () => {
    if (risk.score >= 61) return 'Conditions are elevated across multiple locations';
    if (risk.score >= 41) return 'Conditions are elevated in harbour and estuary locations';
    if (risk.score >= 21) return 'Conditions are moderate — standard beach precautions apply';
    return 'Conditions are favourable — standard beach precautions apply';
  };

  const getPrimaryDriver = () => {
    if (risk.bySpecies && risk.bySpecies[0]) {
      const species = risk.bySpecies[0];
      if (species.activeTriggers.length > 0) {
        const trigger = species.activeTriggers[0].split(':')[0];
        return `${trigger} creating favourable conditions`;
      }
    }
    return null;
  };

  const getConditionColor = () => {
    if (risk.score >= 61) return 'bg-red-50 border-red-200';
    if (risk.score >= 41) return 'bg-orange-50 border-orange-200';
    if (risk.score >= 21) return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getTextColor = () => {
    if (risk.score >= 61) return 'text-red-900';
    if (risk.score >= 41) return 'text-orange-900';
    if (risk.score >= 21) return 'text-yellow-900';
    return 'text-blue-900';
  };

  return (
    <section className={`rounded-xl border-2 p-4 md:p-5 ${getConditionColor()}`}>
      <div className="flex items-start gap-3">
        <svg className={`w-6 h-6 flex-shrink-0 mt-0.5 ${getTextColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <h3 className={`text-sm font-bold mb-1 ${getTextColor()}`}>
            Why conditions are elevated today
          </h3>
          <p className={`text-sm ${getTextColor()}`}>
            {getConditionSummary()}.
            {getPrimaryDriver() && ` ${getPrimaryDriver()}.`}
            {risk.primaryThreat && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/50">
                Primary species: {risk.primaryThreat}
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
