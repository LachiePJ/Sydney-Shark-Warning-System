'use client';

import { useState } from 'react';

export default function MethodologyOverview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'species' | 'location' | 'sources' | 'limitations'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Method Overview' },
    { id: 'species' as const, label: 'Species Models' },
    { id: 'location' as const, label: 'Location Weighting' },
    { id: 'sources' as const, label: 'Data Sources' },
    { id: 'limitations' as const, label: 'Limitations' },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          How the Model Works
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed max-w-3xl">
          Live Shark Risk estimates relative environmental risk using live signals, species behaviour models and location profiles.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 text-[13px] font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#2b5876] text-[#2b5876] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Five-Step Risk Assessment Process</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Live Environmental Signals', desc: 'Water temperature, rainfall, turbidity, swell and seasonal data collected from Bureau of Meteorology and marine APIs.' },
                  { step: '2', title: 'Location Exposure Profile', desc: 'Each location is classified by type (open beach, harbour, estuary, river mouth) and assigned exposure characteristics.' },
                  { step: '3', title: 'Species Behaviour Model', desc: 'Environmental signals are compared against species-specific behavioural patterns from peer-reviewed research.' },
                  { step: '4', title: 'Risk Weighting & Aggregation', desc: 'Signals are weighted by species relevance, habitat alignment and regional likelihood. Scores are aggregated into overall risk.' },
                  { step: '5', title: 'Safety Guidance Generation', desc: 'Risk scores are translated into practical operator guidance and safety recommendations.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2b5876] text-white flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="text-[15px] font-semibold text-gray-900 mb-1">{item.title}</div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'species' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Species-Specific Behavioural Models</h3>
              <p className="text-[15px] text-gray-700 leading-relaxed mb-6">
                Each species model uses different environmental signals based on known behavioural patterns, habitat preferences and regional incident data.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { species: 'Bull Shark', signals: 'Rainfall/runoff (high weight), water temperature, season, turbidity', habitat: 'Harbours, estuaries, river mouths' },
                  { species: 'White Shark', signals: 'Water temperature (cooler), season (winter/spring), location type', habitat: 'Open-ocean beaches, temperate waters' },
                  { species: 'Tiger Shark', signals: 'Water temperature (warmer), season (summer), swell, reef proximity', habitat: 'Tropical/subtropical coasts, reef systems' },
                  { species: 'Bronze Whaler', signals: 'Season (summer), water temperature, swell, schooling fish activity', habitat: 'Open-ocean beaches, coastal shelf' },
                ].map((model) => (
                  <div key={model.species} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="text-[15px] font-bold text-gray-900 mb-3">{model.species}</div>
                    <div className="space-y-2 text-[13px]">
                      <div>
                        <span className="font-semibold text-gray-700">Primary signals:</span>
                        <p className="text-gray-600 mt-1">{model.signals}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Habitat alignment:</span>
                        <p className="text-gray-600 mt-1">{model.habitat}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Location-Specific Risk Weighting</h3>
              <p className="text-[15px] text-gray-700 leading-relaxed mb-6">
                Location type significantly influences species relevance and overall risk profile. Bull Shark risk is elevated in enclosed waterways, while White Shark risk is higher at open beaches.
              </p>
              <div className="space-y-3">
                {[
                  { type: 'Open-Ocean Beach', profile: 'Lower Bull Shark relevance, moderate White Shark relevance (seasonal), good visibility, higher wave action' },
                  { type: 'Harbour / Enclosed Bay', profile: 'Elevated Bull Shark relevance, reduced circulation, variable turbidity, proximity to urban runoff' },
                  { type: 'Estuary / River Mouth', profile: 'High Bull Shark relevance, brackish water, elevated risk after rainfall, reduced salinity' },
                  { type: 'Murky / Post-Rainfall', profile: 'Risk modifier applied across all locations due to reduced visibility and increased Bull Shark movement' },
                ].map((location) => (
                  <div key={location.type} className="bg-gray-50 border-l-4 border-[#2b5876] p-4">
                    <div className="text-[15px] font-bold text-gray-900 mb-2">{location.type}</div>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{location.profile}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Data Sources & Refresh Frequency</h3>
              <div className="space-y-4">
                {[
                  { source: 'Bureau of Meteorology (BOM)', data: 'Water temperature, rainfall observations, weather conditions', frequency: 'Hourly', reliability: 'High' },
                  { source: 'Open-Meteo Marine API', data: 'Swell height, wave period, ocean temperature', frequency: 'Hourly', reliability: 'High' },
                  { source: 'Beach & Location Database', data: 'Location coordinates, type classification, patrol status', frequency: 'Static', reliability: 'High' },
                  { source: 'Peer-Reviewed Research', data: 'Species behaviour patterns, environmental triggers, attack patterns', frequency: 'Quarterly review', reliability: 'High' },
                ].map((item) => (
                  <div key={item.source} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[15px] font-bold text-gray-900">{item.source}</div>
                      <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider px-2 py-1 bg-emerald-50 rounded">
                        {item.reliability}
                      </div>
                    </div>
                    <div className="space-y-1 text-[13px]">
                      <div className="text-gray-700"><span className="font-semibold">Data:</span> {item.data}</div>
                      <div className="text-gray-600"><span className="font-semibold">Refresh:</span> {item.frequency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'limitations' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">System Limitations & Safe Use</h3>
              <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-[15px] font-bold text-amber-900 mb-2">Critical: This is Not a Shark Detection System</div>
                    <p className="text-[15px] text-amber-900 leading-relaxed">
                      This system estimates relative environmental risk. It does not detect sharks, predict individual animal movement or replace official beach safety advice.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed">
                <div>
                  <span className="font-semibold text-gray-900">What this system does:</span>
                  <ul className="mt-2 ml-5 space-y-1 list-disc text-[13px]">
                    <li>Estimate how current environmental conditions align with known shark activity patterns</li>
                    <li>Calculate location-specific risk based on water type, species relevance and environmental signals</li>
                    <li>Provide relative risk comparison across locations within a region</li>
                    <li>Generate practical safety guidance based on current conditions</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">What this system does not do:</span>
                  <ul className="mt-2 ml-5 space-y-1 list-disc text-[13px]">
                    <li>Detect actual shark presence or absence at any location</li>
                    <li>Predict individual shark movement or behaviour</li>
                    <li>Guarantee safety or warn of imminent danger</li>
                    <li>Replace official beach closures, lifeguard advice or emergency warnings</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-[13px] font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Always Follow Official Safety Protocols
                </div>
                <ul className="space-y-2 text-[13px] text-gray-600 ml-5 list-disc">
                  <li>Swim at patrolled beaches between the flags</li>
                  <li>Follow all lifeguard instructions and warnings</li>
                  <li>Obey beach closures and signage</li>
                  <li>Check official beach safety reports before entering water</li>
                  <li>Never swim alone, especially in enclosed or murky waterways</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
