'use client';

import { useState } from 'react';
import sourcesData from '@/data/sources.json';
import { RegionContent } from '@/config/region-content';

import { RiskResult } from '@/lib/types';

interface ExplainabilitySectionProps {
  regionContent: RegionContent;
  risk?: RiskResult;
}

export default function ExplainabilitySection({ regionContent, risk }: ExplainabilitySectionProps) {
  const [activeTab, setActiveTab] = useState<'how' | 'research' | 'data'>('how');

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">How This Works</h2>

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
          <p className="text-gray-700 mb-4">
            {sourcesData.methodology.overview}
          </p>

          {/* Species-Specific Models with Live Data */}
          <div>
            <h4 className="font-semibold text-xl mb-4">Species-Specific Risk Models:</h4>
            <p className="text-sm text-gray-600 mb-4">
              Each shark species is scored independently with its own environmental triggers and weights. Fields marked as <span className="font-semibold text-red-700">Met</span> show current conditions that increase risk.
            </p>

            <div className="space-y-6">
              {sourcesData.methodology.speciesModels?.map((model: any, idx: number) => {
                // Get live species risk data if available
                const liveSpeciesRisk = risk?.bySpecies?.find(s => s.species === model.species);
                
                return (
                  <div key={idx} className="border-2 border-gray-300 rounded-lg p-5 bg-white shadow-sm">
                    {/* Species Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🦈</span>
                        <h5 className="font-bold text-lg">{model.species}</h5>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Habitat:</strong> {model.habitat}
                      </p>
                      {(() => {
                        const speciesKey = model.species.includes('Bull') ? 'bull-shark' : 
                                         model.species.includes('White') ? 'white-shark' :
                                         model.species.includes('Tiger') ? 'tiger-shark' : 'bronze-whaler';
                        const relevance = regionContent.speciesRelevance[speciesKey] || model.sydneyRelevance;
                        return (
                          <p className={`text-sm font-semibold ${
                            relevance.includes('PRIMARY') || relevance.includes('VERY COMMON') ? 'text-red-700' :
                            relevance.includes('RARE') || relevance.includes('VERY RARE') ? 'text-gray-600' :
                            relevance.includes('COMMON') ? 'text-orange-600' : 'text-gray-700'
                          }`}>
                            {regionContent.displayName}: {relevance}
                          </p>
                        );
                      })()}
                      {liveSpeciesRisk && (
                        <div className="mt-2">
                          <span className="text-sm font-semibold">Current Risk Score: </span>
                          <span className={`text-sm font-bold ${
                            liveSpeciesRisk.score >= 60 ? 'text-red-700' :
                            liveSpeciesRisk.score >= 40 ? 'text-orange-600' :
                            liveSpeciesRisk.score >= 20 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {liveSpeciesRisk.score}/100
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Risk Factors with Live Met Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(model.riskFactors).map(([key, factor]: [string, any]) => {
                        // Check if this factor is currently met
                        const isMetNow = liveSpeciesRisk?.activeTriggers?.some((trigger: string) => 
                          trigger.toLowerCase().includes(key.toLowerCase())
                        );
                        
                        return (
                          <div key={key} className={`rounded p-3 text-sm border-2 ${
                            isMetNow ? 'bg-red-50 border-red-400' : 'bg-gray-50 border-gray-200'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex-1">
                                <span className="font-semibold capitalize">{key}:</span>
                                {isMetNow && (
                                  <span className="ml-2 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                                    Met
                                  </span>
                                )}
                              </div>
                              <span className="text-blue-600 font-bold text-xs">
                                {factor.weight || factor.bonus || factor.penalty}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              <strong>Threshold:</strong> {factor.threshold || factor.condition}
                            </div>
                            <p className="text-xs text-gray-700">{factor.rationale}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Overall Scoring */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
            <h4 className="font-semibold text-lg mb-3">Overall Risk Calculation</h4>
            <p className="text-sm text-gray-700 mb-4">{sourcesData.methodology.overallScoring}</p>
            
            <div className="bg-white rounded p-4 border border-blue-200">
              <h5 className="font-semibold text-sm mb-2">Where to Swim for Lowest Risk in {regionContent.displayName}</h5>
              <p className="text-sm text-gray-700">{regionContent.safestSwimmingAdvice} {regionContent.highRiskAdvice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Research & Sources */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <p className="text-gray-700 mb-6">
            This system is based on peer-reviewed scientific research examining environmental
            factors associated with shark behavior and activity patterns in coastal waters.
            <strong className="block mt-2 text-slate-900">
              For {regionContent.displayName}: {regionContent.dominantSpecies}s are the primary threat. {regionContent.dominantSpeciesStats || ''}
            </strong>
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
            <strong>Live data feed:</strong> All environmental data is continuously sourced from the Australian Bureau of Meteorology (BoM) and marine APIs in real-time, ensuring up-to-date reliability and official provenance.
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
