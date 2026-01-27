'use client';

import { RiskResult } from '@/lib/types';

interface WarningBadgeProps {
  risk: RiskResult;
}

export default function WarningBadge({ risk }: WarningBadgeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Current Risk Level</h2>
        
        <div 
          className="inline-block px-12 py-8 rounded-lg mb-4"
          style={{ backgroundColor: risk.color }}
        >
          <div className="text-white">
            <div className="text-5xl font-bold mb-2">
              {risk.level}
            </div>
            <div className="text-xl">
              Risk Score: {risk.score}/100
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
          {risk.guidance}
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className={`inline-block w-3 h-3 rounded-full ${
            risk.confidence === 'high' ? 'bg-green-500' :
            risk.confidence === 'medium' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}></span>
          <span>Confidence: {risk.confidence}</span>
        </div>

        <div className="mt-4 text-xs text-gray-400">
          Last updated: {new Date(risk.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Risk Factors</h3>
        <p className="text-gray-700 mb-4">{risk.explanation.reasoning}</p>

        <div className="grid md:grid-cols-2 gap-4">
          {risk.explanation.conditionsMet.map((condition, index) => (
            <div
              key={index}
              className={`p-4 rounded border-2 ${
                condition.met
                  ? 'bg-red-50 border-red-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{condition.name}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    condition.met
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {condition.met ? 'MET' : 'NOT MET'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div>Value: <span className="font-mono">{
                  typeof condition.value === 'number' 
                    ? condition.value.toFixed(1)
                    : condition.value || 'N/A'
                }</span></div>
                <div>Threshold: <span className="font-mono">{condition.threshold}</span></div>
              </div>
            </div>
          ))}
        </div>

        {risk.explanation.missingData.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Missing data:</strong> {risk.explanation.missingData.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
