'use client';

import { BrandingNodeLogo } from './HeaderIcons';

export default function NodeStrategyBranding() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://www.nodestrategy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-white rounded-lg shadow-xl px-5 py-4 hover:shadow-2xl transition-all hover:scale-105 group border border-gray-200"
      >
        <BrandingNodeLogo />
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
          Built by Node Strategy
        </span>
      </a>
    </div>
  );
}
