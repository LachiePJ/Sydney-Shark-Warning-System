'use client';

import { RegionContent } from '@/config/region-content';
import { ZoneRiskResult } from '@/lib/types';

interface RecommendedLocationsProps {
  zoneRisks: ZoneRiskResult[];
  regionContent: RegionContent;
  overallRiskScore: number;
}

export default function RecommendedLocations({ 
  zoneRisks, 
  regionContent, 
  overallRiskScore 
}: RecommendedLocationsProps) {
  // Sort zones by risk score
  const sortedZones = [...zoneRisks].sort((a, b) => a.score - b.score);
  const lowerRiskZones = sortedZones.slice(0, 4);
  const higherRiskZones = sortedZones.slice(-3);

  const getRiskBadge = (score: number) => {
    if (score >= 61) return { label: 'Severe', color: 'bg-red-100 text-red-800 border-red-200' };
    if (score >= 41) return { label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200' };
    if (score >= 21) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' };
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Swimming Location Guidance
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Based on current environmental conditions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lower Risk Options */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              Lower-Risk Options
            </h3>
          </div>
          
          <div className="space-y-3">
            {lowerRiskZones.map((zone) => {
              const badge = getRiskBadge(zone.score);
              return (
                <div 
                  key={zone.zoneId}
                  className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {zone.zoneName}
                    </h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {zone.score < 30 
                      ? 'Open ocean beach with good water circulation' 
                      : 'Patrolled beach — standard precautions apply'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Always:</strong> Swim between the flags at patrolled beaches. Follow lifeguard instructions.
            </p>
          </div>
        </div>

        {/* Use Caution */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              Use Extra Caution
            </h3>
          </div>

          <div className="space-y-3">
            {overallRiskScore >= 40 && (
              <>
                <div className="border border-orange-200 bg-orange-50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-medium text-orange-900 text-sm mb-1">
                        Harbour & Estuary Locations
                      </h4>
                      <p className="text-xs text-orange-800">
                        Avoid murky water, especially after rainfall (&gt;30mm)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-orange-200 bg-orange-50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-medium text-orange-900 text-sm mb-1">
                        River Mouths
                      </h4>
                      <p className="text-xs text-orange-800">
                        Increased activity risk in brackish water conditions
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 text-sm mb-2">
                General Precautions
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Avoid dawn and dusk swimming</li>
                <li>• Never swim alone</li>
                <li>• Stay in shallow, clear water</li>
                <li>• Exit water if marine life is feeding nearby</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
