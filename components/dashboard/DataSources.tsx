'use client';

import { useState } from 'react';

export default function DataSources() {
  const [activeTab, setActiveTab] = useState<'sources' | 'methodology' | 'limitations'>('sources');

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'sources'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Data Sources
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'methodology'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab('limitations')}
            className={`px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'limitations'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Limitations
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Data Sources & Provenance
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                This system integrates real-time environmental data with peer-reviewed shark behaviour research.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Bureau of Meteorology
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Rainfall, weather observations
                </p>
                <p className="text-xs text-gray-500">
                  Update frequency: Hourly
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Marine APIs
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Water temperature, wave height
                </p>
                <p className="text-xs text-gray-500">
                  Update frequency: 30 minutes
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Scientific Research
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Peer-reviewed shark behaviour studies
                </p>
                <p className="text-xs text-gray-500">
                  Validated against published literature
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Location Data
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Beach characteristics, habitat types
                </p>
                <p className="text-xs text-gray-500">
                  Curated from official sources
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methodology' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Risk Assessment Methodology
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Environmental Data Collection
                  </h4>
                  <p className="text-sm text-gray-600">
                    Real-time data gathered from Bureau of Meteorology, marine APIs and weather services.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Species-Specific Analysis
                  </h4>
                  <p className="text-sm text-gray-600">
                    Each shark species is assessed independently using species-specific environmental triggers and behaviour patterns.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Location Weighting
                  </h4>
                  <p className="text-sm text-gray-600">
                    Risk scores are adjusted based on species likelihood at each location and historical incident data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Overall Risk Calculation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Species scores are combined using weighted methodology to produce an overall risk assessment mapped to a 5-tier scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'limitations' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Model Limitations
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Understanding the scope and constraints of this risk assessment tool.
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="font-semibold mb-1">
                  Environmental Assessment Only
                </p>
                <p className="text-gray-600">
                  This tool assesses environmental conditions that may be associated with shark activity. It does not detect, track or predict actual shark presence or movements.
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="font-semibold mb-1">
                  Not a Substitute for Official Advice
                </p>
                <p className="text-gray-600">
                  Always follow official beach safety advice, lifeguard instructions and beach closure notices. This tool is supplementary information only.
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="font-semibold mb-1">
                  Data Availability
                </p>
                <p className="text-gray-600">
                  Risk assessments depend on the availability and currency of environmental data. Confidence ratings indicate data quality and recency.
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="font-semibold mb-1">
                  Model Uncertainty
                </p>
                <p className="text-gray-600">
                  Shark behaviour is complex and influenced by many factors. This model provides estimated risk based on known environmental correlations, but cannot account for all variables.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
