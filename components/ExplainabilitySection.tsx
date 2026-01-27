'use client';

import { useState } from 'react';
import sourcesData from '@/data/sources.json';

export default function ExplainabilitySection() {
  const [activeTab, setActiveTab] = useState<'how' | 'research' | 'data'>('how');

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">Understanding the System</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'how'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('how')}
        >
          How It Works
        </button>
        <button
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'research'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('research')}
        >
          Research & Sources
        </button>
        <button
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'data'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('data')}
        >
          Data Provenance
        </button>
      </div>

      {/* How It Works */}
      {activeTab === 'how' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Methodology</h3>
            <p className="text-gray-700 mb-4">
              {sourcesData.methodology.overview}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Risk Factors</h4>
            <div className="space-y-4">
              {sourcesData.methodology.conditions.map((condition, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold">{condition.name}</h5>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                      Weight: {condition.weight}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Threshold:</strong> {condition.threshold}
                  </div>
                  <p className="text-sm text-gray-700">{condition.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h4 className="font-semibold mb-2">Scoring System</h4>
            <p className="text-sm text-gray-700">{sourcesData.methodology.scoring}</p>
          </div>
        </div>
      )}

      {/* Research & Sources */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <p className="text-gray-700 mb-6">
            This system is based on peer-reviewed scientific research examining environmental
            factors associated with shark behavior and activity patterns in coastal waters.
          </p>

          <div className="space-y-6">
            {sourcesData.researchPapers.map((paper) => (
              <div key={paper.id} className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-semibold text-lg mb-2">{paper.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {paper.authors.join(', ')} ({paper.year}). <em>{paper.journal}</em>.
                  {paper.doi && (
                    <>
                      {' '}
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        DOI: {paper.doi}
                      </a>
                    </>
                  )}
                </p>
                <div className="mt-3">
                  <strong className="text-sm">Key Findings:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                    {paper.keyFindings.map((finding, idx) => (
                      <li key={idx}>{finding}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Provenance */}
      {activeTab === 'data' && (
        <div className="space-y-6">
          <p className="text-gray-700 mb-6">
            All environmental data is sourced from the Australian Bureau of Meteorology (BoM),
            ensuring reliability and official provenance.
          </p>

          <div className="space-y-4">
            {sourcesData.dataProvenance.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{item.metric}</h4>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {item.updateFrequency}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                <div className="text-xs text-gray-500">
                  <div><strong>Source:</strong> {item.source}</div>
                  <div><strong>Format:</strong> {item.format}</div>
                  {item.url && (
                    <div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {item.url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Note on Water Quality
            </h4>
            <p className="text-sm text-gray-700">
              BoM does not provide direct water quality or turbidity measurements. This system
              uses rainfall data as a proxy indicator, based on research showing that heavy
              rainfall events cause urban runoff and reduced water clarity in coastal areas.
              This is clearly labeled as a derived metric, not a direct measurement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
