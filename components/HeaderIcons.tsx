'use client';

import { useState } from 'react';
import SharkIcon from './SharkIcon';
import NodeLogo from './NodeLogo';
import Image from 'next/image';

export function HeaderSharkIcon({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const isLight = theme === 'light';

  // Use the SVG icon directly so header branding always renders, even when image assets are missing.
  return <SharkIcon className={`h-11 w-11 flex-shrink-0 ${isLight ? 'text-slate-900' : 'text-white'}`} />;
}

export function HeaderNodeLogo() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <NodeLogo className="h-12 text-white" />;
  }

  return (
    <Image
      src="/node-logo.png"
      alt="Node Strategy"
      width={120}
      height={48}
      className="h-12 w-auto brightness-0 invert"
      onError={() => setImageError(true)}
      unoptimized
    />
  );
}

export function BrandingNodeLogo() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <NodeLogo className="h-8 text-[#1e3a8a]" />;
  }

  return (
    <Image
      src="/node-logo.png"
      alt="Node Strategy"
      width={80}
      height={32}
      className="h-8 w-auto"
      style={{
        filter: 'brightness(0) saturate(100%) invert(13%) sepia(73%) saturate(3458%) hue-rotate(214deg) brightness(91%) contrast(101%)'
      }}
      onError={() => setImageError(true)}
      unoptimized
    />
  );
}
