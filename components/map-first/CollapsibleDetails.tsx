'use client';

import { useState } from 'react';
import { RiskResult } from '@/lib/types';

interface CollapsibleDetailsProps {
  risk: RiskResult;
}

export default function CollapsibleDetails({ risk }: CollapsibleDetailsProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const primary = risk.bySpecies?.[0];
  const secondary = risk.bySpecies?.slice(1) || [];

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Species Risk Profile */}
      <button
        onClick={() => toggleSection('species')}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🦈</span>
          <span className="font-semibold text-gray-900">Species Risk Profile</span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform ${openSection === 'species' ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {openSection === 'species' && primary && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 mb-1">{primary.species}</h3>
            <p className="text-sm text-gray-600 italic">{primary.scientificName}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-orange-600">{primary.score}</span>
              <span className="text-xs text-gray-600">/ 100</span>
            </div>
          </div>
          {secondary.length > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Other species:</strong> {secondary.map(s => s.species).join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Data Sources */}
      <button
        onClick={() => toggleSection('sources')}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📊</span>
          <span className="font-semibold text-gray-900">Data Sources</span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform ${openSection === 'sources' ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {openSection === 'sources' && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Bureau of Meteorology (rainfall, weather)</li>
            <li>• Marine APIs (water temperature, wave height)</li>
            <li>• Peer-reviewed shark behaviour research</li>
            <li>• Location data (beach characteristics, habitat types)</li>
          </ul>
        </div>
      )}

      {/* Methodology */}
      <button
        onClick={() => toggleSection('methodology')}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🔬</span>
          <span className="font-semibold text-gray-900">Methodology</span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform ${openSection === 'methodology' ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {openSection === 'methodology' && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Collect real-time environmental data</li>
            <li>Apply species-specific behaviour models</li>
            <li>Weight by location characteristics</li>
            <li>Calculate risk for each beach</li>
          </ol>
        </div>
      )}

      {/* Limitations */}
      <button
        onClick={() => toggleSection('limitations')}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <span className="font-semibold text-gray-900">Limitations</span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform ${openSection === 'limitations' ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {openSection === 'limitations' && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-sm text-gray-700">
            This tool estimates environmental conditions that may increase shark activity. It does not detect sharks or guarantee safety. Shark behaviour is complex and influenced by many factors beyond environmental conditions.
          </p>
        </div>
      )}
    </section>
  );
}
