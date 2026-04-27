'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RegionSelector from '../RegionSelector';

interface AppHeaderProps {
  initialRegion: string;
  dataStatus?: 'live' | 'delayed' | 'partial';
}

export default function AppHeader({ initialRegion, dataStatus = 'live' }: AppHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentRegion, setCurrentRegion] = useState(initialRegion);

  useEffect(() => {
    const urlRegion = searchParams.get('region');
    if (urlRegion && urlRegion !== currentRegion) {
      setCurrentRegion(urlRegion);
    }
  }, [searchParams, currentRegion]);

  const handleRegionChange = (newRegion: string) => {
    setCurrentRegion(newRegion);
    router.push(`/?region=${newRegion}`);
  };

  const statusConfig = {
    live: { label: 'Live', color: 'bg-green-500', textColor: 'text-green-700' },
    delayed: { label: 'Delayed', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    partial: { label: 'Partial Data', color: 'bg-orange-500', textColor: 'text-orange-700' },
  };

  const status = statusConfig[dataStatus];

  return (
    <header className="bg-gradient-to-r from-[#102a43] via-[#243b53] to-[#102a43] text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4 md:py-5">
          {/* Left: Branding */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Shark Risk Intelligence
              </h1>
              <p className="text-xs md:text-sm text-gray-300 hidden sm:block">
                Real-time environmental risk assessment
              </p>
            </div>
          </div>

          {/* Right: Region & Status */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Data Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
              <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`}></div>
              <span className="text-xs font-medium">{status.label}</span>
            </div>

            {/* Region Selector */}
            <RegionSelector 
              currentRegion={currentRegion} 
              onRegionChange={handleRegionChange} 
            />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="md:hidden pb-3 flex items-center justify-between text-xs">
          <span className="text-gray-300">Real-time risk assessment</span>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status.color}`}></div>
            <span className="font-medium">{status.label}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
