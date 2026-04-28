'use client';

export default function SafetyContext() {
  return (
    <section className="bg-amber-50 border-2 border-amber-400 rounded-xl overflow-hidden">
      <div className="p-6 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-[17px] font-bold text-amber-900 mb-3">
              Safety Context and Limitations
            </h2>
            <div className="space-y-3 text-[15px] text-amber-900 leading-relaxed">
              <p>
                <strong>This is an environmental risk assessment, not a shark detection system.</strong> It estimates relative risk based on current conditions and species behaviour patterns. It does not detect sharks, predict individual animal movement or replace official beach safety advice.
              </p>
              <p>
                Risk scores indicate how closely current environmental conditions align with historical patterns associated with increased shark activity. Higher scores represent stronger alignment with these patterns, not confirmed shark presence.
              </p>
            </div>
            <div className="mt-5 pt-5 border-t border-amber-300">
              <div className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider mb-3">
                Recommended Safety Posture
              </div>
              <ul className="space-y-2 text-[13px] text-amber-900">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Prefer patrolled open-ocean beaches and swim between the flags</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Follow all lifeguard instructions and obey beach closures</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Avoid enclosed or murky waterways, particularly after heavy rainfall</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Check official beach safety reports at <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-amber-800">BeachSafe.org.au</a></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
