'use client';

import { RISK_LEVELS } from '@/config/risk-config';

export default function MapLegend() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Risk Level Legend</h3>
      <div className="grid md:grid-cols-5 gap-4">
        {RISK_LEVELS.map((level) => (
          <div key={level.level} className="text-center">
            <div
              className="w-full h-20 rounded-lg mb-2"
              style={{ backgroundColor: level.color }}
            ></div>
            <div className="font-semibold">{level.level}</div>
            <div className="text-xs text-gray-500 mt-1">
              {level.minScore}-{level.maxScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
