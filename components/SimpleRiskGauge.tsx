'use client';

import { RiskResult } from '@/lib/types';

interface SimpleRiskGaugeProps {
  risk: RiskResult;
}

export default function SimpleRiskGauge({ risk }: SimpleRiskGaugeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 max-w-2xl mx-auto">
      {/* Simple gauge indicator */}
      <div className="relative w-full mb-6">
        {/* Colored bar segments */}
        <div className="flex h-16 rounded-full overflow-hidden shadow-lg">
          <div className="flex-1 bg-emerald-500" title="LOW"></div>
          <div className="flex-1 bg-yellow-400" title="MODERATE"></div>
          <div className="flex-1 bg-orange-500" title="HIGH"></div>
          <div className="flex-1 bg-red-600" title="SEVERE"></div>
          <div className="flex-1 bg-red-900" title="CATASTROPHIC"></div>
        </div>
        
        {/* Labels below bar */}
        <div className="flex justify-between mt-2 px-2">
          <span className="text-xs font-semibold text-gray-600">LOW</span>
          <span className="text-xs font-semibold text-gray-600">MODERATE</span>
          <span className="text-xs font-semibold text-gray-600">HIGH</span>
          <span className="text-xs font-semibold text-gray-600">SEVERE</span>
          <span className="text-xs font-semibold text-gray-600">CATASTROPHIC</span>
        </div>
      </div>

      {/* Current level display */}
      <div 
        className="w-full px-12 py-8 rounded-xl text-center shadow-xl"
        style={{ backgroundColor: risk.color }}
      >
        <div className="text-white">
          <div className="text-5xl font-bold mb-3">
            {risk.level.toUpperCase()}
          </div>
          <div className="text-2xl opacity-90">
            Risk Score: {risk.score}/100
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 text-center mt-6 mb-4 leading-relaxed">
        {risk.guidance}
      </p>

      <div className="flex items-center justify-center gap-3 text-sm">
        <span className={`inline-block w-3 h-3 rounded-full ${
          risk.confidence === 'high' ? 'bg-green-500' :
          risk.confidence === 'medium' ? 'bg-yellow-500' :
          'bg-red-500'
        }`}></span>
        <span className="text-gray-600">Confidence: <strong>{risk.confidence}</strong></span>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Last updated: {new Date(risk.timestamp).toLocaleString('en-GB')}
      </div>
    </div>
  );
}
