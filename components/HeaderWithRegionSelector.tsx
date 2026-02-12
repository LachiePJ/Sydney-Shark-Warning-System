'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RegionSelector from './RegionSelector';
import { HeaderSharkIcon, HeaderNodeLogo } from './HeaderIcons';

interface HeaderWithRegionSelectorProps {
  initialRegion: string;
}

export default function HeaderWithRegionSelector({ initialRegion }: HeaderWithRegionSelectorProps) {
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

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Left: Shark Icon + Title */}
          <div className="flex items-center gap-4 flex-1">
            <HeaderSharkIcon />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Real-Time Shark Risk
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Real-time shark risk based on trusted data and scientific research into shark behaviour
              </p>
            </div>
          </div>

          {/* Right: Region Selector + Logo */}
          <div className="flex items-center gap-8">
            <RegionSelector 
              currentRegion={currentRegion} 
              onRegionChange={handleRegionChange} 
            />
            <a
              href="https://www.nodestrategy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <HeaderNodeLogo />
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <HeaderSharkIcon />
              <h1 className="text-2xl font-bold">
                Real-Time Shark Risk
              </h1>
            </div>
            <a
              href="https://www.nodestrategy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <HeaderNodeLogo />
            </a>
          </div>
          <div className="mb-3">
            <RegionSelector 
              currentRegion={currentRegion} 
              onRegionChange={handleRegionChange} 
            />
          </div>
          <p className="text-xs text-slate-300">
            Real-time shark risk based on trusted data and scientific research
          </p>
        </div>
      </div>
    </header>
  );
}
