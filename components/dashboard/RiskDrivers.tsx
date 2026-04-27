'use client';

import { RiskResult } from '@/lib/types';

interface RiskDriversProps {
  risk: RiskResult;
}

export default function RiskDrivers({ risk }: RiskDriversProps) {
  // Extract environmental factors from conditions
  const conditions = risk.explanation?.conditionsMet || [];
  
  // Map conditions to driver cards
  const drivers = [
    {
      name: 'Water Temperature',
      condition: conditions.find(c => c.name.toLowerCase().includes('temperature')),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      getExplanation: (c: any) => c?.met 
        ? 'Water temperature is within the active range for shark species present'
        : 'Water temperature outside typical active range',
    },
    {
      name: 'Rainfall (48h)',
      condition: conditions.find(c => c.name.toLowerCase().includes('rainfall')),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      getExplanation: (c: any) => c?.met
        ? 'Recent rainfall may reduce water clarity and salinity, particularly in harbour and estuary locations'
        : 'Minimal recent rainfall — water clarity generally good',
    },
    {
      name: 'Water Clarity',
      condition: conditions.find(c => c.name.toLowerCase().includes('turbidity') || c.name.toLowerCase().includes('clarity')),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      getExplanation: (c: any) => c?.met
        ? 'Reduced water clarity can influence shark behaviour and detection difficulty'
        : 'Water clarity is good',
    },
    {
      name: 'Season',
      condition: conditions.find(c => c.name.toLowerCase().includes('season')),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      getExplanation: (c: any) => c?.met
        ? 'Currently in peak season for shark activity (warmer months)'
        : 'Outside peak activity season',
    },
  ];

  const getRiskInfluence = (condition: any) => {
    if (!condition) return { level: 'Unknown', color: 'text-gray-500' };
    if (condition.met && condition.weight >= 10) return { level: 'High', color: 'text-orange-600' };
    if (condition.met && condition.weight >= 5) return { level: 'Medium', color: 'text-yellow-600' };
    if (condition.met) return { level: 'Low', color: 'text-blue-600' };
    return { level: 'No influence', color: 'text-gray-500' };
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Current Environmental Drivers
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Factors contributing to today's risk assessment
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {drivers.map((driver) => {
          const influence = getRiskInfluence(driver.condition);
          const isActive = driver.condition?.met || false;

          return (
            <div 
              key={driver.name}
              className={`border-2 rounded-lg p-4 transition-all ${
                isActive 
                  ? 'border-orange-200 bg-orange-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={isActive ? 'text-orange-600' : 'text-gray-400'}>
                  {driver.icon}
                </div>
                <span className={`text-xs font-semibold ${influence.color}`}>
                  {influence.level}
                </span>
              </div>

              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                {driver.name}
              </h3>

              {driver.condition?.value !== null && driver.condition?.value !== undefined && (
                <div className="text-lg font-bold text-gray-900 mb-2">
                  {typeof driver.condition.value === 'number' 
                    ? driver.condition.value.toFixed(1) 
                    : String(driver.condition.value)}
                  {driver.name.includes('Temperature') && '°C'}
                  {driver.name.includes('Rainfall') && 'mm'}
                </div>
              )}

              <p className="text-xs text-gray-600 leading-relaxed">
                {driver.getExplanation(driver.condition)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> This assessment combines real-time environmental data with species-specific behaviour models. It estimates where conditions may be more favourable for shark activity, not actual shark presence.
        </p>
      </div>
    </section>
  );
}
