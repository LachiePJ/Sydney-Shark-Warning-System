'use client';

import { ZoneRiskResult } from '@/lib/types';

interface QuickDecisionPanelProps {
  zoneRisks: ZoneRiskResult[];
}

export default function QuickDecisionPanel({ zoneRisks }: QuickDecisionPanelProps) {
  // Sort zones by risk
  const sortedZones = [...zoneRisks].sort((a, b) => a.score - b.score);
  const saferZones = sortedZones.filter(z => z.score < 41).slice(0, 6);
  const cautionZones = sortedZones.filter(z => z.score >= 41);

  const getRiskBadge = (score: number) => {
    if (score >= 41) return { label: 'High', color: 'bg-orange-100 text-orange-800' };
    if (score >= 21) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Low', color: 'bg-green-100 text-green-800' };
  };

  const getLocationDescriptor = (zoneName: string) => {
    if (zoneName.toLowerCase().includes('harbour')) return 'Harbour location';
    if (zoneName.toLowerCase().includes('river')) return 'River mouth area';
    if (zoneName.toLowerCase().includes('estuary')) return 'Estuary zone';
    return 'Open ocean beach';
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Safer Options */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900">Safer right now</h2>
          </div>

          {saferZones.length > 0 ? (
            <ul className="space-y-2">
              {saferZones.map((zone) => {
                const badge = getRiskBadge(zone.score);
                return (
                  <li key={zone.zoneId} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{zone.zoneName}</div>
                      <div className="text-xs text-gray-600">{getLocationDescriptor(zone.zoneName)}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No low-risk locations currently</p>
          )}

          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-900">
              <strong>Always:</strong> Swim between flags at patrolled beaches
            </p>
          </div>
        </div>

        {/* Caution Areas */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900">Use caution / avoid</h2>
          </div>

          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
              <span className="text-orange-600 mt-0.5">⚠️</span>
              <div className="flex-1">
                <div className="font-medium text-orange-900 text-sm">Harbour locations</div>
                <div className="text-xs text-orange-800">Enclosed water, variable conditions</div>
              </div>
            </li>
            <li className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
              <span className="text-orange-600 mt-0.5">⚠️</span>
              <div className="flex-1">
                <div className="font-medium text-orange-900 text-sm">River mouths & estuaries</div>
                <div className="text-xs text-orange-800">Brackish water, especially after rain</div>
              </div>
            </li>
            <li className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
              <span className="text-orange-600 mt-0.5">⚠️</span>
              <div className="flex-1">
                <div className="font-medium text-orange-900 text-sm">Murky water</div>
                <div className="text-xs text-orange-800">Reduced visibility after rainfall</div>
              </div>
            </li>
          </ul>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>Never:</strong> Dawn/dusk swimming · Swimming alone · After heavy rain
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
