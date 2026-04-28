'use client';

import dynamic from 'next/dynamic';
import { ZoneRiskResult } from '@/lib/types';
import { Region } from '@/config/regions';

const CircleRiskMap = dynamic(() => import('@/components/CircleRiskMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-gray-600">Loading map...</div>
      </div>
    </div>
  ),
});

interface MapHeroProps {
  zoneRisks: ZoneRiskResult[];
  regionConfig: Region;
  regionName: string;
}

export default function MapHero({ zoneRisks, regionConfig, regionName }: MapHeroProps) {
  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 md:px-8 md:py-6 border-b border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Where is it safer to swim right now?
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Live shark risk varies by location. Check your beach before entering the water.
        </p>
      </div>

      {/* Map - Primary Focus */}
      <div className="relative">
        <div className="h-[60vh] md:h-[65vh] min-h-[400px] max-h-[700px]">
          <CircleRiskMap zoneRisks={zoneRisks} regionConfig={regionConfig} />
        </div>
        
        {/* Map Legend - Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Risk Level</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-700">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-700">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs text-gray-700">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-xs text-gray-700">Severe</span>
            </div>
          </div>
        </div>

        {/* Update Time - Overlay */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-700">
              Updated {new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Instruction */}
      <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
        <p className="text-sm text-blue-900 text-center">
          <strong>Tap any beach marker</strong> to see risk level and guidance
        </p>
      </div>
    </section>
  );
}
