'use client';

import { RiskResult } from '@/lib/types';

interface RiskFactorsDetailProps {
  risk: RiskResult;
}

export default function RiskFactorsDetail({ risk }: RiskFactorsDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">Risk Factors Analysis</h2>
      
      <p className="text-gray-700 mb-6 text-lg">{risk.explanation.reasoning}</p>

      <div className="grid md:grid-cols-2 gap-4">
        {risk.explanation.conditionsMet.map((condition, index) => (
          <div
            key={index}
            className={`p-5 rounded-lg border-2 transition-all ${
              condition.met
                ? 'bg-red-50 border-red-300 shadow-sm'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900">{condition.name}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  condition.met
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {condition.met ? 'MET' : 'NOT MET'}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Value:</span>
                <span className="font-mono font-semibold">
                  {typeof condition.value === 'number' 
                    ? condition.value.toFixed(1)
                    : condition.value || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Threshold:</span>
                <span className="font-mono">{condition.threshold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {risk.explanation.missingData.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-900">
            <strong>Missing data:</strong> {risk.explanation.missingData.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
