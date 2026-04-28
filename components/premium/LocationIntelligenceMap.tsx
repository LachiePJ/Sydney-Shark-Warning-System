'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ZoneRiskResult } from '@/lib/types';
import { Region } from '@/config/regions';

const CircleRiskMap = dynamic(() => import('@/components/CircleRiskMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0f1f3a] rounded-lg flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4a829f] mx-auto"></div>
        <div className="text-[13px] text-[#6b9bb3]">Updating coastal risk signals</div>
      </div>
    </div>
  ),
});

interface LocationIntelligenceMapProps {
  zoneRisks: ZoneRiskResult[];
  regionConfig: Region;
  regionName: string;
}

export default function LocationIntelligenceMap({ zoneRisks, regionConfig, regionName }: LocationIntelligenceMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<ZoneRiskResult | null>(null);

  const getRiskBand = (score: number): { label: string; color: string; bg: string } => {
    if (score >= 81) return { label: 'Severe', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 61) return { label: 'High', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (score >= 31) return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Location Risk Intelligence
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed max-w-3xl">
          Risk varies materially by exposure, water type and local environmental conditions. Select a location to inspect its current profile.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px]">
        {/* Map */}
        <div className="relative h-[500px] lg:h-[600px]">
          <CircleRiskMap zoneRisks={zoneRisks} regionConfig={regionConfig} />
          
          {/* Legend Overlay */}
          <div className="absolute bottom-6 left-6 bg-white/98 backdrop-blur rounded-lg shadow-xl p-4 border border-gray-300">
            <div className="text-[11px] font-bold text-gray-900 mb-3 uppercase tracking-wide">Risk Scale</div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex-shrink-0 border border-emerald-600"></div>
                <div className="text-[13px]">
                  <div className="font-semibold text-gray-900">Low</div>
                  <div className="text-gray-600">0-30</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 flex-shrink-0 border border-amber-600"></div>
                <div className="text-[13px]">
                  <div className="font-semibold text-gray-900">Moderate</div>
                  <div className="text-gray-600">31-60</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-orange-500 flex-shrink-0 border border-orange-600"></div>
                <div className="text-[13px]">
                  <div className="font-semibold text-gray-900">High</div>
                  <div className="text-gray-600">61-80</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-red-600 flex-shrink-0 border border-red-700"></div>
                <div className="text-[13px]">
                  <div className="font-semibold text-gray-900">Severe</div>
                  <div className="text-gray-600">81-100</div>
                </div>
              </div>
            </div>
          </div>

          {/* Updated Time */}
          <div className="absolute top-4 right-4 bg-white/98 backdrop-blur rounded-lg shadow-lg px-3 py-2 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[11px] font-medium text-gray-700 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Location Intelligence Panel */}
        <div className="bg-gradient-to-b from-gray-50 to-white border-l border-gray-200 p-6 lg:p-8">
          {selectedLocation ? (
            <div className="space-y-6">
              <div>
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Selected Location
                </div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">
                  {selectedLocation.zoneName}
                </h3>
                
                {(() => {
                  const band = getRiskBand(selectedLocation.score);
                  return (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${band.bg} border border-${band.color.replace('text-', '')}/20 rounded-lg mb-4`}>
                      <div className={`w-2 h-2 rounded-full ${band.color.replace('text-', 'bg-')}`}></div>
                      <span className={`text-sm font-bold ${band.color}`}>{band.label}</span>
                      <span className="text-sm text-gray-600">· {selectedLocation.score}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Key Risk Drivers */}
              {selectedLocation.explanation?.conditionsMet && selectedLocation.explanation.conditionsMet.some(c => c.met) && (
                <div>
                  <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Active Risk Signals
                  </div>
                  <div className="space-y-2">
                    {selectedLocation.explanation.conditionsMet
                      .filter(c => c.met)
                      .slice(0, 4)
                      .map((condition, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[13px]">
                          <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                          <span className="text-gray-700">{condition.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Species Relevance */}
              {selectedLocation.bySpecies && selectedLocation.bySpecies.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Species Relevance
                  </div>
                  <div className="space-y-2">
                    {selectedLocation.bySpecies.slice(0, 3).map((species, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[13px] py-1.5">
                        <span className="text-gray-700 font-medium">{species.species}</span>
                        <span className="text-gray-600 tabular-nums">{species.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Posture */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Recommended Posture
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed">
                  {selectedLocation.guidance}
                </p>
              </div>

              {/* Confidence */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Assessment Confidence
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        selectedLocation.confidence === 'high' ? 'bg-emerald-500 w-full' :
                        selectedLocation.confidence === 'medium' ? 'bg-amber-500 w-2/3' :
                        'bg-orange-500 w-1/3'
                      }`}
                    ></div>
                  </div>
                  <span className="text-[13px] font-medium text-gray-700 capitalize">{selectedLocation.confidence}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[15px] text-gray-600 leading-relaxed max-w-xs">
                Select a beach or waterway marker to inspect its local risk profile.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
