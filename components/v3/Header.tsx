'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import RegionSelector from '../RegionSelector';

interface HeaderProps {
  initialRegion: string;
  dataStatus?: 'live' | 'delayed' | 'partial';
}

export default function Header({ initialRegion, dataStatus = 'live' }: HeaderProps) {
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
    live: { label: 'Live', color: 'bg-green-500' },
    delayed: { label: 'Delayed', color: 'bg-yellow-500' },
    partial: { label: 'Partial', color: 'bg-orange-500' },
  };

  const status = statusConfig[dataStatus];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left: Branding */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Live Shark Risk
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Environmental risk assessment
              </p>
            </div>
          </Link>

          {/* Right: Region Selector + Status + How It Works Link */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Data Status */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-md border border-gray-200">
              <div className={`w-1.5 h-1.5 rounded-full ${status.color}`}></div>
              <span className="text-xs font-medium text-gray-700">{status.label}</span>
            </div>

            {/* Region Selector */}
            <RegionSelector 
              currentRegion={currentRegion} 
              onRegionChange={handleRegionChange} 
            />

            {/* How It Works Link */}
            <Link 
              href="/how-it-works"
              className="hidden md:block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Mobile: How It Works link */}
        <div className="md:hidden pb-3">
          <Link 
            href="/how-it-works"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            How It Works →
          </Link>
        </div>
      </div>
    </header>
  );
}
