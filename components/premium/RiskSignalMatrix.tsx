'use client';

import { RiskResult } from '@/lib/types';

interface RiskSignalMatrixProps {
  risk: RiskResult;
}

export default function RiskSignalMatrix({ risk }: RiskSignalMatrixProps) {
  const conditions = risk.explanation?.conditionsMet || [];

  const signals = [
    {
      name: 'Rainfall / Runoff',
      key: 'rainfall',
      condition: conditions.find(c => c.name.toLowerCase().includes('rainfall')),
      interpretation: 'Runoff can reduce salinity and visibility in enclosed waterways, increasing relevance for Bull Shark risk models.',
    },
    {
      name: 'Water Temperature',
      key: 'temperature',
      condition: conditions.find(c => c.name.toLowerCase().includes('temperature')),
      interpretation: 'Warmer water temperatures can increase metabolic activity and habitat suitability for multiple species.',
    },
    {
      name: 'Turbidity / Clarity',
      key: 'turbidity',
      condition: conditions.find(c => c.name.toLowerCase().includes('turbidity') || c.name.toLowerCase().includes('clarity') || c.name.toLowerCase().includes('quality')),
      interpretation: 'Reduced visibility after rainfall can impair visual discrimination, increasing encounter risk across species.',
    },
    {
      name: 'Swell Height',
      key: 'swell',
      condition: conditions.find(c => c.name.toLowerCase().includes('swell')),
      interpretation: 'Moderate swell can increase baitfish activity and attract predator species to near-shore zones.',
    },
    {
      name: 'Seasonality',
      key: 'season',
      condition: conditions.find(c => c.name.toLowerCase().includes('season')),
      interpretation: 'Seasonal patterns influence migration, breeding behaviour and regional presence of key species.',
    },
  ];

  const getInfluenceLevel = (condition: any): { label: string; color: string; bg: string } => {
    if (!condition || !condition.met) {
      return { label: 'Not contributing', color: 'text-gray-500', bg: 'bg-gray-50' };
    }
    if (condition.weight >= 20) return { label: 'High influence', color: 'text-orange-700', bg: 'bg-orange-50' };
    if (condition.weight >= 10) return { label: 'Moderate influence', color: 'text-amber-700', bg: 'bg-amber-50' };
    return { label: 'Low influence', color: 'text-blue-700', bg: 'bg-blue-50' };
  };

  const getCurrentReading = (condition: any): string => {
    if (!condition) return 'Data unavailable';
    if (condition.value === null || condition.value === undefined) return 'Awaiting source update';
    
    const name = condition.name.toLowerCase();
    if (name.includes('temperature') && typeof condition.value === 'number') {
      return `${condition.value.toFixed(1)}°C`;
    }
    if (name.includes('rainfall') && typeof condition.value === 'number') {
      return `${condition.value.toFixed(1)}mm / 48h`;
    }
    if (name.includes('swell') && typeof condition.value === 'number') {
      return `${condition.value.toFixed(1)}m`;
    }
    if (name.includes('season')) {
      return condition.value === true || condition.value === 'Yes' ? 'Peak season' : 'Off-season';
    }
    if (name.includes('turbidity') || name.includes('clarity') || name.includes('quality')) {
      return condition.met ? 'Reduced' : 'Good';
    }
    return String(condition.value);
  };

  const getDataStatus = (condition: any): { label: string; show: boolean } => {
    if (!condition) return { label: 'Data unavailable', show: true };
    if (condition.value === null || condition.value === undefined) {
      return { label: 'Excluded from current calculation', show: true };
    }
    return { label: '', show: false };
  };

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Environmental Risk Signals
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed max-w-3xl">
          These signals indicate how current conditions align with known species activity patterns. They do not indicate confirmed shark presence.
        </p>
      </div>

      {/* Signal Matrix */}
      <div className="divide-y divide-gray-200">
        {signals.map((signal) => {
          const influence = getInfluenceLevel(signal.condition);
          const reading = getCurrentReading(signal.condition);
          const dataStatus = getDataStatus(signal.condition);

          return (
            <div key={signal.key} className="px-6 lg:px-8 py-5 hover:bg-gray-50/50 transition-colors">
              <div className="grid lg:grid-cols-[200px_1fr_200px] gap-4 lg:gap-6">
                {/* Signal Name */}
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">
                    {signal.name}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  {/* Current Reading */}
                  <div>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mr-2">
                      Current State:
                    </span>
                    <span className="text-[15px] text-gray-900 font-medium tabular-nums">
                      {reading}
                    </span>
                  </div>

                  {/* Data Status Warning */}
                  {dataStatus.show && (
                    <div className="flex items-start gap-2 text-[13px] text-amber-700">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{dataStatus.label}</span>
                    </div>
                  )}

                  {/* Interpretation */}
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {signal.interpretation}
                  </p>
                </div>

                {/* Influence Badge */}
                <div className="flex items-start justify-end">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${influence.bg} border border-${influence.color.replace('text-', '')}/20 rounded-lg`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${influence.color.replace('text-', 'bg-')}`}></div>
                    <span className={`text-[13px] font-semibold ${influence.color}`}>
                      {influence.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="px-6 lg:px-8 py-4 bg-blue-50 border-t border-blue-100">
        <p className="text-[13px] text-blue-900 leading-relaxed">
          <strong className="font-semibold">Note:</strong> Signal influence is calculated using species-specific behavioural models, regional likelihood patterns and current environmental alignment. These are risk indicators, not detection data.
        </p>
      </div>
    </section>
  );
}
