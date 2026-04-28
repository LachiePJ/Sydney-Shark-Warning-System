'use client';

import { RiskResult } from '@/lib/types';

interface DataConfidenceProps {
  risk: RiskResult;
  dataAge: number | null;
}

export default function DataConfidence({ risk, dataAge }: DataConfidenceProps) {
  const conditions = risk.explanation?.conditionsMet || [];
  const availableSignals = conditions.filter(c => c.value !== null && c.value !== undefined);
  const missingSignals = conditions.filter(c => c.value === null || c.value === undefined);

  const getDataFreshness = (): { label: string; color: string; bg: string } => {
    if (dataAge === null) return { label: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-50' };
    const minutes = Math.floor(dataAge / 60000);
    if (minutes <= 30) return { label: 'Current', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (minutes <= 120) return { label: 'Recent', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Stale', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const getConfidenceLevel = (): { label: string; percentage: number; color: string } => {
    if (risk.confidence === 'high') return { label: 'High', percentage: 100, color: 'bg-emerald-500' };
    if (risk.confidence === 'medium') return { label: 'Medium', percentage: 66, color: 'bg-amber-500' };
    return { label: 'Low', percentage: 33, color: 'bg-orange-500' };
  };

  const freshness = getDataFreshness();
  const confidence = getConfidenceLevel();

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Model Confidence & Data Quality
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed max-w-3xl">
          Assessment confidence reflects data availability, signal quality and model coverage. Missing signals are excluded from calculations.
        </p>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Overall Confidence */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-5">
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Overall Confidence
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {confidence.label}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${confidence.color} transition-all duration-500`}
                  style={{ width: `${confidence.percentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Based on signal coverage, data freshness and model alignment.
            </p>
          </div>

          {/* Data Freshness */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-5">
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Data Freshness
            </div>
            <div className="mb-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${freshness.bg} border border-${freshness.color.replace('text-', '')}/20 rounded-lg`}>
                <div className={`w-2 h-2 rounded-full ${freshness.color.replace('text-', 'bg-')}`}></div>
                <span className={`text-sm font-bold ${freshness.color}`}>
                  {freshness.label}
                </span>
              </div>
            </div>
            <div className="text-[13px] text-gray-600">
              <div className="mb-1">
                Last updated: {new Date(risk.timestamp).toLocaleTimeString('en-AU', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
              <div>
                {dataAge !== null && (
                  <span>Updated {Math.floor(dataAge / 60000)} minutes ago</span>
                )}
              </div>
            </div>
          </div>

          {/* Signal Coverage */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-5">
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Signal Coverage
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-600">Available signals</span>
                <span className="text-lg font-bold text-emerald-600 tabular-nums">
                  {availableSignals.length}
                </span>
              </div>
              {missingSignals.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-600">Missing signals</span>
                  <span className="text-lg font-bold text-amber-600 tabular-nums">
                    {missingSignals.length}
                  </span>
                </div>
              )}
            </div>
            {missingSignals.length > 0 && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Missing signals: {missingSignals.map(s => s.name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Calculation Status */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-blue-900 mb-1">
                Calculation Status
              </div>
              <p className="text-[13px] text-blue-800 leading-relaxed">
                Current risk score is calculated using {availableSignals.length} available environmental signals and {risk.bySpecies?.length || 0} species models. 
                {missingSignals.length > 0 && ` ${missingSignals.length} signal(s) excluded due to data unavailability.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
