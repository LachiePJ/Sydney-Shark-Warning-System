'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RegionSelector from './RegionSelector';
import { DEFAULT_REGION } from '@/config/regions';

interface RegionAwareAppProps {
  children: React.ReactNode;
  initialRegion?: string;
}

export default function RegionAwareApp({ children, initialRegion }: RegionAwareAppProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentRegion, setCurrentRegion] = useState(initialRegion || DEFAULT_REGION);

  // Sync with URL on mount
  useEffect(() => {
    const urlRegion = searchParams.get('region');
    if (urlRegion && urlRegion !== currentRegion) {
      setCurrentRegion(urlRegion);
    }
  }, [searchParams]);

  const handleRegionChange = (newRegion: string) => {
    setCurrentRegion(newRegion);
    // Update URL and trigger page reload with new region
    router.push(`/?region=${newRegion}`);
  };

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <RegionSelector 
          currentRegion={currentRegion} 
          onRegionChange={handleRegionChange} 
        />
      </div>
      {children}
    </div>
  );
}
