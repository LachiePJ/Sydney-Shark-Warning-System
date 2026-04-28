'use client';

import dynamic from 'next/dynamic';
import { ZoneRiskResult } from '@/lib/types';
import { Region } from '@/config/regions';

const CircleRiskMap = dynamic(() => import('@/components/CircleRiskMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-gray-600 text-sm">Loading map...</div>
      </div>
    </div>
  ),
});

interface RiskByLocationHeroProps {
  zoneRisks: ZoneRiskResult[];
  regionConfig: Region;
  regionName: string;
}

export default function RiskByLocationHero({ zoneRisks, regionConfig, regionName }: RiskByLocationHeroProps) {
  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Hero Header */}
      <div className="px-6 py-6 md:px-8 md:py-7 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Risk by Location
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl">
          Current shark risk varies by beach, waterway and local conditions. Select a location to view today's risk.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="h-[60vh] md:h-[65vh] min-h-[450px] max-h-[750px]">
          <CircleRiskMap zoneRisks={zoneRisks} regionConfig={regionConfig} />
        </div>
        
        {/* Risk Scale Legend - Positioned to avoid clipping */}
        <div className="absolute bottom-6 left-4 bg-white/98 backdrop-blur rounded-lg shadow-xl p-4 border border-gray-300 max-w-[180px]">
          <div className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Risk Scale</div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="text-xs">
                <div className="font-semibold text-gray-900">Low</div>
                <div className="text-gray-600">0-30</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0"></div>
              <div className="text-xs">
                <div className="font-semibold text-gray-900">Moderate</div>
                <div className="text-gray-600">31-60</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-orange-500 flex-shrink-0"></div>
              <div className="text-xs">
                <div className="font-semibold text-gray-900">High</div>
                <div className="text-gray-600">61-80</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-700 flex-shrink-0"></div>
              <div className="text-xs">
                <div className="font-semibold text-gray-900">Severe</div>
                <div className="text-gray-600">81-100</div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-[10px] text-gray-600 leading-tight">
              Score indicates how favourable conditions are for shark activity
            </p>
          </div>
        </div>

        {/* Last Updated - Top Right */}
        <div className="absolute top-4 right-4 bg-white/98 backdrop-blur rounded-lg shadow-lg px-3 py-2 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-gray-700">
              Updated {new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
        <p className="text-sm text-blue-900 text-center font-medium">
          Tap a marker to see location-specific risk, score and guidance
        </p>
      </div>
    </section>
  );
}
