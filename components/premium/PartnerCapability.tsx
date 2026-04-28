'use client';

export default function PartnerCapability() {
  const capabilities = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Real-Time Environmental Monitoring',
      description: 'Live signal aggregation from Bureau of Meteorology, marine APIs and beach monitoring systems with 30-minute refresh cycles.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location-Level Risk Profiling',
      description: 'Granular risk assessment by beach, harbour, estuary and river mouth with habitat-specific species weighting and exposure modeling.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Species-Specific Risk Modelling',
      description: 'Research-based behavioural models for Bull Shark, White Shark, Tiger Shark and Bronze Whaler with regional calibration.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: 'Public Guidance & Alerting',
      description: 'Plain-language safety recommendations with location-specific guidance, safety posture and risk band communication.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Partner Dashboard Potential',
      description: 'Configurable risk thresholds, custom region definitions, API access and integration capability for operational teams.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'API-Ready Architecture',
      description: 'RESTful API endpoints for risk scores, zone data, species profiles and environmental signals with JSON responses.',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#0f1f3a] to-[#1a2f4f] border-t border-[#2a4163]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          <div className="text-[11px] font-semibold text-[#6b9bb3] uppercase tracking-wider mb-3">
            Platform Capability
          </div>
          <h2 className="text-[30px] lg:text-[36px] font-bold text-white mb-4 tracking-tight">
            Built for Coastal Safety Teams
          </h2>
          <p className="text-[17px] text-[#8cb4c7] max-w-3xl mx-auto leading-relaxed">
            Live Shark Risk provides coastal risk intelligence infrastructure for councils, emergency services, lifesaving organizations and tourism operators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, idx) => (
            <div 
              key={idx}
              className="bg-[#1a2f4f]/60 backdrop-blur-sm border border-[#2a4163] rounded-xl p-6 hover:bg-[#1a2f4f]/80 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#2b5876] flex items-center justify-center text-[#6b9bb3] mb-4">
                {capability.icon}
              </div>
              <h3 className="text-[17px] font-bold text-white mb-3">
                {capability.title}
              </h3>
              <p className="text-[13px] text-[#8cb4c7] leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#2b5876] hover:bg-[#3a6d8c] border border-[#3a6d8c] rounded-lg transition-colors">
            <span className="text-[15px] font-medium text-white">
              For partnership enquiries
            </span>
            <svg className="w-5 h-5 text-[#6b9bb3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
