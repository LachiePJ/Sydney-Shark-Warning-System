'use client';

import { ZoneRiskResult } from '@/lib/types';

interface LocationGuidanceProps {
  zoneRisks: ZoneRiskResult[];
  regionName: string;
}

export default function LocationGuidance({ zoneRisks, regionName }: LocationGuidanceProps) {
  const sortedZones = [...zoneRisks].sort((a, b) => a.score - b.score);
  const lowerRisk = sortedZones.filter(z => z.score <= 40).slice(0, 6);
  const higherRisk = sortedZones.filter(z => z.score > 40);

  const getRiskBadge = (score: number) => {
    if (score >= 61) return { label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200' };
    if (score >= 31) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' };
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Lower Risk */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Lower-risk locations in {regionName}
            </h2>
          </div>

          {lowerRisk.length > 0 ? (
            <ul className="space-y-2.5">
              {lowerRisk.map((zone) => {
                const badge = getRiskBadge(zone.score);
                return (
                  <li key={zone.zoneId} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{zone.zoneName}</div>
                      <div className="text-xs text-gray-600">Score: {zone.score}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No low-risk locations available currently.</p>
          )}

          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs text-green-900 leading-relaxed">
              <strong>Always:</strong> Swim between flags at patrolled beaches. Follow lifeguard advice.
            </p>
          </div>
        </div>

        {/* Higher Risk */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Higher-risk environments in {regionName}
            </h2>
          </div>

          <ul className="space-y-2.5 mb-4">
            <li className="flex items-start gap-2.5 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <span className="text-orange-600 mt-0.5 flex-shrink-0">⚠️</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-orange-900 text-sm">Harbours and enclosed bays</div>
                <div className="text-xs text-orange-800">Variable conditions, reduced water circulation</div>
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <span className="text-orange-600 mt-0.5 flex-shrink-0">⚠️</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-orange-900 text-sm">River mouths and estuaries</div>
                <div className="text-xs text-orange-800">Brackish water, especially after rainfall</div>
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <span className="text-orange-600 mt-0.5 flex-shrink-0">⚠️</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-orange-900 text-sm">Murky or turbid water</div>
                <div className="text-xs text-orange-800">Reduced visibility, particularly after heavy rain</div>
              </div>
            </li>
          </ul>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Never:</strong> Swim at dawn or dusk · Swim alone · Enter water after heavy rainfall (&gt;50mm)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
