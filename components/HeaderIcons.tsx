'use client';

import { useState } from 'react';
import SharkIcon from './SharkIcon';
import NodeLogo from './NodeLogo';
import Image from 'next/image';

export function HeaderSharkIcon() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <SharkIcon className="w-16 h-16 text-white flex-shrink-0" />;
  }

  return (
    <Image
      src="/shark-icon.png"
      alt="Shark"
      width={64}
      height={64}
      className="flex-shrink-0 brightness-0 invert"
      onError={() => setImageError(true)}
      unoptimized
    />
  );
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
    return <NodeLogo className="h-8 text-slate-900" />;
  }

  return (
    <Image
      src="/node-logo.png"
      alt="Node Strategy"
      width={80}
      height={32}
      className="h-8 w-auto"
      onError={() => setImageError(true)}
      unoptimized
    />
  );
}
