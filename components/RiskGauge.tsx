'use client';

import { RiskResult } from '@/lib/types';
import { useMemo } from 'react';

interface RiskGaugeProps {
  risk: RiskResult;
}

export default function RiskGauge({ risk }: RiskGaugeProps) {
  // Calculate needle angle based on score (0-100 maps to -90 to 90 degrees)
  const needleAngle = useMemo(() => {
    return (risk.score / 100) * 180 - 90;
  }, [risk.score]);

  // Map risk levels to gauge sections (left to right: Low to Catastrophic)
  const sections = [
    { level: 'LOW', color: '#10b981', startAngle: -90, endAngle: -54 },      // Bright Green
    { level: 'MODERATE', color: '#fbbf24', startAngle: -54, endAngle: -18 }, // Bright Yellow
    { level: 'HIGH', color: '#f59e0b', startAngle: -18, endAngle: 18 },      // Amber/Orange  
    { level: 'SEVERE', color: '#dc2626', startAngle: 18, endAngle: 54 },     // Bright Red
    { level: 'CATASTROPHIC', color: '#7f1d1d', startAngle: 54, endAngle: 90 }, // Dark Red/Maroon
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Gauge SVG */}
      <div className="relative w-full max-w-lg aspect-[2/1]">
        <svg viewBox="0 0 500 250" className="w-full h-full">
          {/* Background - light gray base */}
          <path
            d="M 50 220 A 200 200 0 0 1 450 220"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="50"
            strokeLinecap="round"
          />

          {/* Coloured sections as arcs */}
          {sections.map((section, idx) => {
            const startRad = (section.startAngle * Math.PI) / 180;
            const endRad = (section.endAngle * Math.PI) / 180;
            const outerRadius = 200;
            const innerRadius = 150;
            const centerX = 250;
            const centerY = 220;
            
            // Outer arc points
            const outerStartX = centerX + outerRadius * Math.cos(startRad);
            const outerStartY = centerY + outerRadius * Math.sin(startRad);
            const outerEndX = centerX + outerRadius * Math.cos(endRad);
            const outerEndY = centerY + outerRadius * Math.sin(endRad);
            
            // Inner arc points
            const innerStartX = centerX + innerRadius * Math.cos(startRad);
            const innerStartY = centerY + innerRadius * Math.sin(startRad);
            const innerEndX = centerX + innerRadius * Math.cos(endRad);
            const innerEndY = centerY + innerRadius * Math.sin(endRad);
            
            return (
              <path
                key={idx}
                d={`
                  M ${outerStartX} ${outerStartY}
                  A ${outerRadius} ${outerRadius} 0 0 1 ${outerEndX} ${outerEndY}
                  L ${innerEndX} ${innerEndY}
                  A ${innerRadius} ${innerRadius} 0 0 0 ${innerStartX} ${innerStartY}
                  Z
                `}
                fill={section.color}
                opacity="1"
              />
            );
          })}

          {/* Section labels */}
          <text x="90" y="160" fontSize="14" fontWeight="700" fill="#4b5563" textAnchor="middle" transform="rotate(-60 90 160)">
            LOW
          </text>
          <text x="160" y="90" fontSize="14" fontWeight="700" fill="#4b5563" textAnchor="middle" transform="rotate(-30 160 90)">
            MODERATE
          </text>
          <text x="250" y="60" fontSize="14" fontWeight="700" fill="#4b5563" textAnchor="middle">
            HIGH
          </text>
          <text x="340" y="90" fontSize="14" fontWeight="700" fill="#4b5563" textAnchor="middle" transform="rotate(30 340 90)">
            SEVERE
          </text>
          <text x="410" y="160" fontSize="14" fontWeight="700" fill="#4b5563" textAnchor="middle" transform="rotate(60 410 160)">
            CATASTROPHIC
          </text>

          {/* Needle */}
          <g transform={`rotate(${needleAngle} 250 220)`}>
            <line
              x1="250"
              y1="220"
              x2="250"
              y2="90"
              stroke="#1f2937"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="250" cy="220" r="10" fill="#1f2937" />
          </g>

          {/* Center pivot circle */}
          <circle cx="250" cy="220" r="12" fill="white" stroke="#1f2937" strokeWidth="2" />
        </svg>
      </div>

      {/* Risk level display below gauge */}
      <div 
        className="mt-6 px-12 py-6 rounded-lg text-center"
        style={{ backgroundColor: risk.color }}
      >
        <div className="text-white">
          <div className="text-4xl font-bold mb-2">
            {risk.level.toUpperCase()}
          </div>
          <div className="text-lg opacity-90">
            Risk Score: {risk.score}/100
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 max-w-2xl text-center mt-6 mb-4">
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
        Last updated: {new Date(risk.timestamp).toLocaleString('en-GB')}
      </div>
    </div>
  );
}
