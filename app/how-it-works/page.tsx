import Link from 'next/link';
import { getRegion } from '@/config/regions';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Live Shark Risk</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Environmental risk assessment</p>
              </div>
            </Link>
            <Link 
              href="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Back to Risk Map
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-lg text-gray-700 mb-10">
            Understanding the Live Shark Risk assessment model
          </p>

          {/* Section 1: How Risk is Calculated */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">1</span>
              How Risk is Calculated
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Live Shark Risk uses a three-step process to estimate environmental conditions that may favour shark activity:
              </p>
              <ol className="space-y-3 ml-5 list-decimal">
                <li>
                  <strong>Current environmental conditions are collected</strong> from the Bureau of Meteorology, marine APIs, and beach monitoring systems.
                </li>
                <li>
                  <strong>Conditions are matched to species-specific behavioural indicators</strong> based on peer-reviewed research into shark behaviour, habitat preferences, and environmental triggers.
                </li>
                <li>
                  <strong>Location-level risk is scored</strong> using environmental factors, species likelihood, and habitat characteristics. Each location receives a score from 0-100.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 2: What the Score Means */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">2</span>
              What the Score Means
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">The score represents how favourable current environmental conditions are for shark activity, not whether sharks are present.</strong>
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50">
                  <div className="font-bold text-green-900 mb-1">Low (0-30)</div>
                  <div className="text-sm text-green-800">Conditions are less favourable for shark activity</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-yellow-200 bg-yellow-50">
                  <div className="font-bold text-yellow-900 mb-1">Moderate (31-60)</div>
                  <div className="text-sm text-yellow-800">Some environmental factors are met</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-orange-200 bg-orange-50">
                  <div className="font-bold text-orange-900 mb-1">High (61-80)</div>
                  <div className="text-sm text-orange-800">Multiple favourable conditions present</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-red-200 bg-red-50">
                  <div className="font-bold text-red-900 mb-1">Severe (81-100)</div>
                  <div className="text-sm text-red-800">Highly favourable conditions (rare)</div>
                </div>
              </div>
              <p className="mt-4">
                A higher score means current conditions more closely match those historically associated with increased shark activity. It does not predict shark presence or attacks.
              </p>
            </div>
          </section>

          {/* Section 3: Why Location Matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">3</span>
              Why Location Matters
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Different location types present different risk profiles based on habitat characteristics and species behaviour:
              </p>
              <ul className="space-y-3 ml-5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Open-ocean beaches:</strong> Generally lower risk, higher visibility, more wave action. White Sharks and Bronze Whalers may be present during certain seasons.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Harbours and enclosed bays:</strong> Variable conditions, reduced water circulation. Bull Sharks may enter these areas, especially after rainfall.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Estuaries and river mouths:</strong> Brackish water environments. Bull Sharks are adapted to these conditions and risk increases significantly after heavy rainfall (&gt;50mm).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Murky or turbid water:</strong> Reduced visibility after heavy rain. Increases risk across all location types as sharks rely on other senses and may mistake swimmers for prey.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: How Regions Differ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">4</span>
              How Regions Differ
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Each region has unique characteristics that influence shark risk assessment:
              </p>
              <ul className="space-y-3 ml-5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Species profiles:</strong> Different shark species are present in different regions based on water temperature, prey availability, and habitat.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Environmental triggers:</strong> Species respond differently to temperature, rainfall, and turbidity based on local conditions.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Seasonal patterns:</strong> Migration, breeding, and feeding patterns vary by region and season.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Location types:</strong> Different regions have different mixes of beaches, harbours, estuaries, and river systems.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Data Sources */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">5</span>
              Data Sources
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p>Live Shark Risk integrates data from multiple trusted sources:</p>
              <ul className="space-y-3 ml-5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Bureau of Meteorology (BOM):</strong> Real-time water temperature, rainfall, weather conditions
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Marine APIs:</strong> Tide, swell, water quality data
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Beach and location data:</strong> Geographic information, location types, patrol status
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Peer-reviewed research:</strong> Published studies on shark behaviour, environmental preferences, and attack patterns
                  </div>
                </li>
              </ul>
              <p className="text-sm mt-4">
                All environmental data is refreshed every 30 minutes. Risk calculations update automatically when new data is available.
              </p>
            </div>
          </section>

          {/* Section 6: Limitations */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">6</span>
              Limitations
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <div className="p-5 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <p className="font-bold text-yellow-900 mb-2">
                  This tool is not a shark detection system.
                </p>
                <p className="text-yellow-900">
                  It estimates environmental conditions that may increase relative risk. It does not:
                </p>
                <ul className="mt-3 space-y-2 ml-5 list-disc text-yellow-900">
                  <li>Predict shark presence or absence</li>
                  <li>Guarantee safety or warn of imminent danger</li>
                  <li>Replace official beach safety warnings or lifeguard advice</li>
                  <li>Track individual sharks or detect sharks in real-time</li>
                </ul>
              </div>
              <p>
                Environmental risk assessment is <strong>one factor</strong> in water safety decisions. Always follow official beach safety guidance, lifeguard instructions, and local warnings.
              </p>
            </div>
          </section>

          {/* Section 7: Official Safety Guidance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">7</span>
              Official Safety Guidance
            </h2>
            <div className="ml-13 space-y-4 text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900">Always follow these water safety principles:</p>
              <ul className="space-y-2 ml-5 list-disc">
                <li>Swim at patrolled beaches between the flags</li>
                <li>Follow all lifeguard instructions and warnings</li>
                <li>Obey beach closures and signage</li>
                <li>Never swim alone, especially in harbours or murky water</li>
                <li>Avoid swimming at dawn, dusk, or after heavy rainfall</li>
                <li>Stay close to shore and avoid deep channels</li>
              </ul>
              <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  For official beach safety information and current warnings, visit{' '}
                  <a 
                    href="https://beachsafe.org.au" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline font-semibold hover:text-blue-700"
                  >
                    BeachSafe.org.au
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Back to Map CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View Current Risk Map
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              &copy; 2026 Live Shark Risk. Data from{' '}
              <a href="http://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                Bureau of Meteorology
              </a>
            </p>
            <div className="flex gap-4">
              <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                BeachSafe
              </a>
              <a href="https://nodestrategy.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                Built by Node Strategy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
