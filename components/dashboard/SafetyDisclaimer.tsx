export default function SafetyDisclaimer() {
  return (
    <section className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-yellow-900 mb-3">
            Important Safety Information
          </h3>
          <div className="space-y-3 text-sm text-yellow-900">
            <p>
              <strong>This is an environmental risk assessment tool, not a shark detection or sighting system.</strong> It estimates where environmental conditions may be more favourable for shark activity based on scientific research and real-time data.
            </p>
            <p>
              Shark encounters can occur at any time in any marine environment, regardless of environmental conditions. This tool does not guarantee safety or predict actual shark presence.
            </p>
            <div className="mt-4 pt-4 border-t border-yellow-300">
              <p className="font-semibold mb-2">Always follow official beach safety advice:</p>
              <ul className="space-y-1 ml-4">
                <li>• Swim only at patrolled beaches between the red and yellow flags</li>
                <li>• Follow all instructions from surf lifeguards and lifesavers</li>
                <li>• Obey beach warning signs and closures</li>
                <li>• Visit <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-yellow-700">BeachSafe.org.au</a> for official beach safety information</li>
                <li>• In an emergency, call 000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
