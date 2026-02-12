'use client';

import { RiskResult } from '@/lib/types';
import { RegionContent } from '@/config/region-content';

interface SimpleRiskGaugeProps {
  risk: RiskResult;
  regionContent: RegionContent;
}

export default function SimpleRiskGauge({ risk, regionContent }: SimpleRiskGaugeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-8 px-2 md:px-4 max-w-2xl mx-auto">
      {/* Simple gauge indicator */}
      <div className="relative w-full mb-4 md:mb-6">
        {/* Colored bar segments */}
        <div className="flex h-12 md:h-16 rounded-full overflow-hidden shadow-lg">
          <div className="flex-1 bg-emerald-500" title="LOW"></div>
          <div className="flex-1 bg-yellow-400" title="MODERATE"></div>
          <div className="flex-1 bg-orange-500" title="HIGH"></div>
          <div className="flex-1 bg-red-600" title="SEVERE"></div>
          <div className="flex-1 bg-red-900" title="CATASTROPHIC"></div>
        </div>
        
        {/* Labels below bar */}
        <div className="flex justify-between mt-2 px-2">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600">LOW</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 hidden xs:inline">MODERATE</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600">HIGH</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 hidden xs:inline">SEVERE</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 hidden sm:inline">CATASTROPHIC</span>
        </div>
      </div>

      {/* Current level display */}
      <div 
        className="w-full px-4 py-5 md:px-12 md:py-8 rounded-xl text-center shadow-xl"
        style={{ backgroundColor: risk.color }}
      >
        <div className="text-white">
          <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-3 break-words">
            {risk.level.toUpperCase()}
          </div>
          <div className="text-base sm:text-lg md:text-2xl opacity-90">
            Risk Score: {risk.score}/100
          </div>
        </div>
      </div>

      {/* Overall Risk Explanation */}
      <div className="mt-6 w-full max-w-xl">
        <div className="bg-white rounded-lg p-5">
          <h3 className="font-bold text-lg mb-3 text-gray-900">Live Shark Risk Assessment</h3>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            {risk.guidance}
          </p>
          
          {risk.primaryThreat && (
            <p className="text-sm mb-3">
              <strong>Primary Threat Species:</strong> {risk.primaryThreat}
            </p>
          )}

          {/* Safety Advice Based on Risk Level */}
          {risk.score >= 40 && risk.primaryThreat && (
            <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-600 rounded">
              <p className="font-semibold text-red-900 text-sm mb-2">⚠️ {risk.primaryThreat} Activity Elevated</p>
              {regionContent.dominantSpeciesStats && (
                <p className="text-xs text-red-800 mb-2">
                  {regionContent.dominantSpecies}s: {regionContent.dominantSpeciesStats}
                </p>
              )}
              <p className="text-xs text-red-900 font-semibold">
                Based on current conditions: {regionContent.safestSwimmingAdvice}
              </p>
              <p className="text-xs text-red-900 mt-2">
                {regionContent.highRiskAdvice}
              </p>
            </div>
          )}

          {risk.score < 30 && (
            <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-600 rounded">
              <p className="font-semibold text-green-900 text-sm mb-1">✓ Low Overall Shark Risk</p>
              <p className="text-xs text-green-800">
                Current conditions show low shark activity across all species. Always swim at patrolled 
                beaches between the flags.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 text-xs md:text-sm mt-4">
        <span className={`inline-block w-3 h-3 rounded-full ${
          risk.confidence === 'high' ? 'bg-green-500' :
          risk.confidence === 'medium' ? 'bg-yellow-500' :
          'bg-red-500'
        }`}></span>
        <span className="text-gray-600">Data Confidence: <strong>{risk.confidence}</strong></span>
      </div>

      <div className="mt-2 text-xs md:text-sm text-gray-500 font-medium">
        Updated: {new Date(risk.timestamp).toLocaleString('en-GB')}
      </div>
    </div>
  );
}
