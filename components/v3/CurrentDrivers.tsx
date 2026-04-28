'use client';

import { RiskResult } from '@/lib/types';

interface CurrentDriversProps {
  risk: RiskResult;
  regionName: string;
}

export default function CurrentDrivers({ risk, regionName }: CurrentDriversProps) {
  const conditions = risk.explanation?.conditionsMet || [];

  const drivers = [
    {
      name: 'Water Temperature',
      icon: '🌡️',
      condition: conditions.find(c => c.name.toLowerCase().includes('temperature')),
      getLabel: (c: any) => {
        if (!c || c.value === null || c.value === undefined) return 'Unknown';
        return typeof c.value === 'number' ? `${c.value.toFixed(1)}°C` : String(c.value);
      },
    },
    {
      name: 'Rainfall (48h)',
      icon: '🌧️',
      condition: conditions.find(c => c.name.toLowerCase().includes('rainfall')),
      getLabel: (c: any) => {
        if (!c || c.value === null || c.value === undefined) return 'Unknown';
        return typeof c.value === 'number' ? `${c.value.toFixed(1)}mm` : String(c.value);
      },
    },
    {
      name: 'Season',
      icon: '📅',
      condition: conditions.find(c => c.name.toLowerCase().includes('season')),
      getLabel: (c: any) => {
        if (!c) return 'Unknown';
        return c.value === true || c.value === 'Yes' ? 'Peak season' : 'Off-season';
      },
    },
    {
      name: 'Water Clarity',
      icon: '💧',
      condition: conditions.find(c => c.name.toLowerCase().includes('turbidity') || c.name.toLowerCase().includes('clarity')),
      getLabel: (c: any) => {
        if (!c) return 'Unknown';
        return c.met ? 'Reduced' : 'Good';
      },
    },
  ];

  const getStatus = (condition: any) => {
    if (!condition || !condition.met) return { label: 'Low influence', color: 'text-gray-600 bg-gray-50 border-gray-200' };
    if (condition.weight >= 10) return { label: 'High influence', color: 'text-orange-700 bg-orange-50 border-orange-200' };
    if (condition.weight >= 5) return { label: 'Moderate influence', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' };
    return { label: 'Low influence', color: 'text-blue-700 bg-blue-50 border-blue-200' };
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Current Environmental Drivers
      </h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {drivers.map((driver) => {
          const status = getStatus(driver.condition);
          return (
            <div 
              key={driver.name}
              className={`rounded-lg p-4 border-2 ${status.color}`}
            >
              <div className="text-3xl mb-3">{driver.icon}</div>
              <div className="text-sm font-bold text-gray-900 mb-2">
                {driver.name}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-2">
                {driver.getLabel(driver.condition)}
              </div>
              <div className="text-xs font-semibold">
                {status.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Note:</strong> These environmental factors combine to estimate where conditions may be more favourable for shark activity. This is not a shark detection or prediction system.
        </p>
      </div>
    </section>
  );
}
