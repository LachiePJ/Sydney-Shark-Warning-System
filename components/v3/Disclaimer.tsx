'use client';

export default function Disclaimer() {
  return (
    <section className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <svg className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold text-yellow-900 mb-3">
            Important Safety Information
          </h2>
          <div className="space-y-2 text-sm text-yellow-900 leading-relaxed">
            <p>
              <strong>This tool is not a shark detection system.</strong> It estimates environmental conditions that may increase relative risk based on peer-reviewed research.
            </p>
            <p>
              It does not predict shark presence or guarantee safety. Environmental risk assessment is one factor in water safety decisions.
            </p>
            <ul className="mt-4 space-y-2 ml-5 list-disc">
              <li>Always swim at patrolled beaches between the flags</li>
              <li>Follow all lifeguard instructions and warnings</li>
              <li>Obey beach closures and signage</li>
              <li>Check official beach safety reports before entering water</li>
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t border-yellow-300">
            <p className="text-xs text-yellow-800">
              For official beach safety information, visit{' '}
              <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-900">
                BeachSafe.org.au
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
