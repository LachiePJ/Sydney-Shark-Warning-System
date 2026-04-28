export default function TightDisclaimer() {
  return (
    <section className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5 md:p-6">
      <div className="flex items-start gap-3">
        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-yellow-900 mb-2">Important</h3>
          <p className="text-sm text-yellow-900 leading-relaxed">
            This tool estimates environmental conditions that may increase shark activity. It does not detect sharks or guarantee safety. Always follow lifeguard advice and swim between the flags.
          </p>
        </div>
      </div>
    </section>
  );
}
