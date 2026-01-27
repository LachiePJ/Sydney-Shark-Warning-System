'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ZoneRiskResult } from '@/lib/types';
import { DETAILED_ZONES } from '@/config/detailed-zones';

// Dynamically import map components (client-side only)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface RiskMapProps {
  zoneRisks: ZoneRiskResult[];
}

export default function RiskMap({ zoneRisks }: RiskMapProps) {
  const [zones, setZones] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Fetch zones GeoJSON
    fetch('/api/zones')
      .then(res => res.json())
      .then(data => {
        // Enhance zones with detailed sub-zones
        const enhancedFeatures = DETAILED_ZONES.map(detailZone => {
          // Find parent zone risk
          const parentRisk = zoneRisks.find(r => r.zoneId === detailZone.parentZone);
          
          return {
            type: 'Feature',
            properties: {
              id: detailZone.id,
              name: detailZone.name,
              parentZone: detailZone.parentZone,
              riskModifier: detailZone.riskModifier,
              parentRisk: parentRisk,
            },
            geometry: detailZone.geometry,
          };
        });

        setZones({
          type: 'FeatureCollection',
          features: enhancedFeatures,
        });
      })
      .catch(err => console.error('Failed to load zones:', err));
  }, [zoneRisks]);

  if (!isClient) {
    return (
      <div className="bg-gray-200 rounded-lg h-[600px] flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  if (!zones) {
    return (
      <div className="bg-gray-200 rounded-lg h-[600px] flex items-center justify-center">
        <p className="text-gray-500">Loading zones...</p>
      </div>
    );
  }

  // Helper to interpolate between colors
  const interpolateColor = (color: string, intensity: number): string => {
    // Parse hex color
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Apply intensity (darker = higher intensity)
    const factor = 0.7 + (intensity * 0.3); // Range from 0.7 to 1.0
    const newR = Math.round(r * factor);
    const newG = Math.round(g * factor);
    const newB = Math.round(b * factor);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  const styleFeature = (feature: any) => {
    const parentRisk = feature.properties.parentRisk;
    const riskModifier = feature.properties.riskModifier || 0;
    
    if (!parentRisk) {
      return {
        fillColor: '#e5e7eb',
        weight: 0.5,
        opacity: 0.3,
        color: '#cbd5e1',
        fillOpacity: 0.3,
      };
    }

    // Calculate adjusted opacity based on risk modifier
    // Higher risk modifier = darker/more opaque
    const baseOpacity = 0.35;
    const adjustedOpacity = Math.min(0.65, Math.max(0.2, baseOpacity + (riskModifier * 2)));
    
    // Slightly adjust color intensity
    const adjustedColor = interpolateColor(parentRisk.color, 0.5 + riskModifier);
    
    return {
      fillColor: adjustedColor,
      weight: 0.5,
      opacity: 0.2,
      color: '#ffffff',
      fillOpacity: adjustedOpacity,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const parentRisk = feature.properties.parentRisk;
    const riskModifier = feature.properties.riskModifier || 0;
    
    if (parentRisk) {
      const adjustedScore = Math.min(100, Math.max(0, parentRisk.score + (riskModifier * 100)));
      const localRiskNote = riskModifier > 0.03 ? ' (Higher local risk)' : 
                           riskModifier < -0.03 ? ' (Lower local risk)' : '';
      
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <h3 class="font-bold text-base mb-2 text-gray-800">${feature.properties.name}</h3>
          <div class="mb-3">
            <span class="inline-block px-3 py-1 rounded-md font-semibold text-white text-sm" 
                  style="background-color: ${parentRisk.color}">
              ${parentRisk.level}${localRiskNote}
            </span>
          </div>
          <p class="text-sm text-gray-700 mb-3 leading-relaxed">${parentRisk.guidance}</p>
          <div class="text-xs text-gray-600 space-y-1.5 border-t border-gray-200 pt-2">
            <div class="font-semibold">Local Score: ${adjustedScore.toFixed(0)}/100</div>
            <div>Confidence: <span class="capitalize">${parentRisk.confidence}</span></div>
            ${parentRisk.explanation.conditionsMet
              .filter((c: any) => c.met)
              .map((c: any) => `<div class="flex items-start gap-1"><span class="text-green-600">✓</span><span>${c.name}</span></div>`)
              .join('')}
          </div>
          <div class="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
            Last updated: ${new Date(parentRisk.timestamp).toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      `;
      
      layer.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'risk-popup',
      });
    }

    layer.on({
      mouseover: (e: any) => {
        e.target.setStyle({
          fillOpacity: 0.75,
          weight: 1.5,
          color: '#3b82f6',
        });
      },
      mouseout: (e: any) => {
        const originalStyle = styleFeature(feature);
        e.target.setStyle(originalStyle);
      },
    });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .leaflet-popup-content {
          margin: 0;
        }
        .risk-popup .leaflet-popup-content-wrapper {
          padding: 0;
        }
      `}</style>
      <MapContainer
        center={[-33.865, 151.209]}
        zoom={11}
        style={{ height: '600px', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {zones && (
          <GeoJSON
            data={zones}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}
