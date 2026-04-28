'use client';

import { RiskResult } from '@/lib/types';

interface SimpleIndicatorsProps {
  risk: RiskResult;
}

export default function SimpleIndicators({ risk }: SimpleIndicatorsProps) {
  const conditions = risk.explanation?.conditionsMet || [];

  const indicators = [
    {
      name: 'Water Temp',
      condition: conditions.find(c => c.name.toLowerCase().includes('temperature')),
      icon: '🌡️',
    },
    {
      name: 'Rainfall',
      condition: conditions.find(c => c.name.toLowerCase().includes('rainfall')),
      icon: '🌧️',
    },
    {
      name: 'Season',
      condition: conditions.find(c => c.name.toLowerCase().includes('season')),
      icon: '📅',
    },
    {
      name: 'Water Clarity',
      condition: conditions.find(c => c.name.toLowerCase().includes('turbidity') || c.name.toLowerCase().includes('clarity')),
      icon: '💧',
    },
  ];

  const getInfluence = (condition: any) => {
    if (!condition || !condition.met) return { level: 'Low', color: 'text-gray-500 bg-gray-50' };
    if (condition.weight >= 10) return { level: 'High', color: 'text-orange-700 bg-orange-50' };
    if (condition.weight >= 5) return { level: 'Moderate', color: 'text-yellow-700 bg-yellow-50' };
    return { level: 'Low', color: 'text-blue-700 bg-blue-50' };
  };

  const getValue = (condition: any, name: string) => {
    if (!condition || condition.value === null) return '—';
    if (typeof condition.value === 'number') {
      const val = condition.value.toFixed(1);
      if (name.includes('Temp')) return `${val}°C`;
      if (name.includes('Rainfall')) return `${val}mm`;
      return val;
    }
    return String(condition.value);
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Environmental Factors</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indicators.map((indicator) => {
          const influence = getInfluence(indicator.condition);
          return (
            <div key={indicator.name} className={`rounded-lg p-4 border-2 ${influence.color.includes('gray') ? 'border-gray-200' : influence.color.includes('orange') ? 'border-orange-200' : influence.color.includes('yellow') ? 'border-yellow-200' : 'border-blue-200'}`}>
              <div className="text-2xl mb-2">{indicator.icon}</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {indicator.name}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">
                {getValue(indicator.condition, indicator.name)}
              </div>
              <div className={`text-xs font-medium ${influence.color}`}>
                {influence.level} influence
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
