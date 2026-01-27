'use client';

import sourcesData from '@/data/sources.json';

export default function Disclaimer() {
  return (
    <div className="bg-red-50 border-2 border-red-400 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Important Disclaimer
      </h3>
      <p className="text-sm text-red-900 leading-relaxed">
        {sourcesData.disclaimer}
      </p>
    </div>
  );
}
