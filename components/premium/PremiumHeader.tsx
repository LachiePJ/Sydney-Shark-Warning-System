'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import RegionSelector from '../RegionSelector';

interface PremiumHeaderProps {
  initialRegion: string;
  dataStatus?: 'live' | 'delayed' | 'partial';
}

export default function PremiumHeader({ initialRegion, dataStatus = 'live' }: PremiumHeaderProps) {
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
    live: { label: 'Live', color: 'bg-emerald-500', pulse: true },
    delayed: { label: 'Delayed', color: 'bg-amber-500', pulse: false },
    partial: { label: 'Partial', color: 'bg-orange-500', pulse: false },
  };

  const status = statusConfig[dataStatus];

  return (
    <header className="bg-[#0a1628] border-b border-[#1a2f4f]/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <Link href="/" className="flex flex-col hover:opacity-90 transition-opacity">
            <div className="text-white font-bold text-lg tracking-tight">
              Live Shark Risk
            </div>
            <div className="text-[#6b9bb3] text-[11px] font-medium uppercase tracking-wider">
              Coastal Risk Intelligence
            </div>
          </Link>

          {/* Right: Controls */}
          <div className="flex items-center gap-6">
            {/* Data Status */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-[#1a2f4f]/40 rounded-md border border-[#2a4163]">
              <div className={`w-1.5 h-1.5 rounded-full ${status.color} ${status.pulse ? 'animate-pulse' : ''}`}></div>
              <span className="text-[11px] font-semibold text-[#8cb4c7] uppercase tracking-wider">{status.label}</span>
            </div>

            {/* Region Selector */}
            <RegionSelector 
              currentRegion={currentRegion} 
              onRegionChange={handleRegionChange} 
            />

            {/* How It Works */}
            <Link 
              href="/how-it-works"
              className="hidden md:block text-[13px] font-medium text-[#6b9bb3] hover:text-[#8cb4c7] transition-colors"
            >
              Methodology
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
