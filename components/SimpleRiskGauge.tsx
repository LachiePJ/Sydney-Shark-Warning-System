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
          <div className="flex-1 bg-emerald-500" title="LOW RISK"></div>
          <div className="flex-1 bg-yellow-400" title="MODERATE RISK"></div>
          <div className="flex-1 bg-orange-500" title="HIGH RISK"></div>
          <div className="flex-1 bg-red-600" title="SEVERE RISK"></div>
          <div className="flex-1 bg-red-900" title="EXTREME RISK"></div>
        </div>
        
        {/* Labels below bar */}
        <div className="flex justify-between mt-2 px-2">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600">LOW</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 hidden xs:inline">MODERATE</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600">HIGH</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 hidden xs:inline">SEVERE</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 hidden sm:inline">EXTREME</span>
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

          {/* Where to Swim Box - Always visible with full detail list */}
          <div className={`mt-3 p-3 border-l-4 rounded ${
            risk.score >= 60 ? 'bg-red-50 border-red-600' : 
            risk.score >= 40 ? 'bg-orange-50 border-orange-600' : 
            'bg-blue-50 border-blue-600'
          }`}>
            <p className={`font-semibold text-sm mb-2 ${
              risk.score >= 60 ? 'text-red-900' : 
              risk.score >= 40 ? 'text-orange-900' : 
              'text-blue-900'
            }`}>
              ⚠️ Where to Swim for Lowest Risk
            </p>
            {risk.score >= 40 && risk.primaryThreat && regionContent.dominantSpeciesStats && (
              <p className={`text-xs mb-2 ${
                risk.score >= 60 ? 'text-red-800' : 'text-orange-800'
              }`}>
                {regionContent.dominantSpecies}s: {regionContent.dominantSpeciesStats}
              </p>
            )}
            
            {/* Detailed safety list */}
            <ul className={`text-xs space-y-1 ${
              risk.score >= 60 ? 'text-red-900' : 
              risk.score >= 40 ? 'text-orange-900' : 
              'text-blue-900'
            }`}>
              <li>✓ <strong>Based on current conditions, lowest risk:</strong> {regionContent.safeBeaches.join(', ')}</li>
              <li>⚠️ <strong>Higher risk right now:</strong> {regionContent.dangerousLocations.join(', ')} - especially after rainfall</li>
              <li>✓ Always swim between the flags at patrolled beaches</li>
              <li>✓ Avoid swimming at dawn, dusk, or after heavy rainfall (&gt;30mm)</li>
              <li>✓ Never swim alone, especially in harbours or murky water</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confidence and timestamp below */}
      <div className="flex flex-col items-center mt-6 gap-2">
        <div className="flex items-center justify-center gap-3 text-xs md:text-sm">
          <span className={`inline-block w-3 h-3 rounded-full ${
            risk.confidence === 'high' ? 'bg-green-500' :
            risk.confidence === 'medium' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}></span>
          <span className="text-gray-600">Data Confidence: <strong>{risk.confidence}</strong></span>
        </div>

        <div className="text-xs md:text-sm text-gray-500 font-medium">
          Updated: {new Date(risk.timestamp).toLocaleString('en-GB')}
        </div>
      </div>
    </div>
  );
}
