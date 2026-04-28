'use client';

import { useState, useEffect } from 'react';
import { Region, getRegionsList } from '@/config/regions';

interface RegionSelectorProps {
  currentRegion: string;
  onRegionChange: (regionId: string) => void;
  theme?: 'dark' | 'light';
}

export default function RegionSelector({ currentRegion, onRegionChange, theme = 'dark' }: RegionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const regions = getRegionsList();
  
  const selectedRegion = regions.find(r => r.id === currentRegion);

  const groupedRegions = regions.reduce((acc, region) => {
    if (!acc[region.state]) {
      acc[region.state] = [];
    }
    acc[region.state].push(region);
    return acc;
  }, {} as Record<string, typeof regions>);

  const handleRegionSelect = (regionId: string) => {
    setIsOpen(false);
    onRegionChange(regionId);
  };
  
  const isLight = theme === 'light';

  return (
    <div className="relative z-50 w-full md:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-1.5 px-3 py-1.5 md:py-2 rounded-md transition-all font-medium text-xs md:text-sm ${
          isLight
            ? 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-50'
            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <svg className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isLight ? 'text-slate-600' : 'text-white opacity-80'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">{selectedRegion?.name}</span>
        </div>
        <svg 
          className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''} ${isLight ? 'text-slate-600' : 'text-white opacity-80'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 left-0 right-0 md:left-auto md:right-0 z-20 w-full md:w-72 bg-white border border-slate-200 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
            {Object.entries(groupedRegions).map(([state, stateRegions]) => (
              <div key={state} className="border-b border-gray-200 last:border-b-0">
                <div className="px-4 py-2 bg-slate-100 font-semibold text-sm text-slate-700">
                  {state}
                </div>
                {stateRegions.map(region => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionSelect(region.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                      region.id === currentRegion ? 'bg-blue-50 font-semibold' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-900">{region.name}</span>
                      {region.id === currentRegion && (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
