'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoneRiskResult } from '@/lib/types';
import { BEACH_LOCATIONS, BEACH_TO_ZONE_MAP } from '@/config/beach-locations';

interface CircleRiskMapProps {
  zoneRisks: ZoneRiskResult[];
}

export default function CircleRiskMap({ zoneRisks }: CircleRiskMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Sydney
    const map = L.map(mapRef.current, {
      center: [-33.8688, 151.2093],
      zoom: 11,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Use CartoDB Positron (light, clean basemap)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CartoDB',
      maxZoom: 19,
    }).addTo(map);

    // Create a map of zone risks
    const riskMap = new Map(zoneRisks.map(z => [z.zoneId, z]));

    // Helper to get color based on risk level
    const getColor = (level: string): string => {
      switch (level) {
        case 'Low': return '#22c55e';
        case 'Moderate': return '#fbbf24';
        case 'High': return '#f97316';
        case 'Severe': return '#ef4444';
        case 'Catastrophic': return '#7f1d1d';
        default: return '#94a3b8';
      }
    };

    // Add circles for each beach
    BEACH_LOCATIONS.forEach(beach => {
      const zoneId = BEACH_TO_ZONE_MAP[beach.id];
      const risk = riskMap.get(zoneId);
      
      if (!risk) return;

      const color = getColor(risk.level);
      
      // Create circle marker
      const circle = L.circle([beach.lat, beach.lon], {
        radius: beach.radius,
        fillColor: color,
        fillOpacity: 0.25,
        color: color,
        weight: 2,
        opacity: 0.6,
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #1e293b;">
            ${beach.name}
          </h3>
          <div style="background: ${color}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-align: center; margin-bottom: 8px;">
            ${risk.level.toUpperCase()} RISK
          </div>
          <div style="font-size: 13px; color: #475569; line-height: 1.4;">
            <strong>Risk Score:</strong> ${risk.score}/100<br/>
            <strong>Guidance:</strong> ${risk.guidance}<br/>
            <strong>Type:</strong> ${beach.type.charAt(0).toUpperCase() + beach.type.slice(1)}<br/>
            <strong>Data Zone:</strong> ${risk.zoneName}
          </div>
        </div>
      `;

      circle.bindPopup(popupContent);

      // Add hover effect
      circle.on('mouseover', function(this: L.Circle) {
        this.setStyle({
          fillOpacity: 0.45,
          weight: 3,
          opacity: 0.9,
        });
      });

      circle.on('mouseout', function(this: L.Circle) {
        this.setStyle({
          fillOpacity: 0.25,
          weight: 2,
          opacity: 0.6,
        });
      });
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mounted, zoneRisks]);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[600px] rounded-lg shadow-lg border-2 border-gray-200"
      style={{ zIndex: 1 }}
    />
  );
}
