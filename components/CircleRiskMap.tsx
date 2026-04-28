'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoneRiskResult } from '@/lib/types';
import { Region } from '@/config/regions';

interface CircleRiskMapProps {
  zoneRisks: ZoneRiskResult[];
  regionConfig: Region;
  selectedZoneId?: string;
  onZoneSelect?: (zoneId: string) => void;
}

export default function CircleRiskMap({
  zoneRisks,
  regionConfig,
  selectedZoneId,
  onZoneSelect,
}: CircleRiskMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on region
    const map = L.map(mapRef.current, {
      center: [regionConfig.center.lat, regionConfig.center.lon],
      zoom: regionConfig.zoom,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Use CartoDB Positron (light, clean basemap)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CartoDB',
      maxZoom: 19,
    }).addTo(map);

    // Helper to get color based on risk level
    const getColor = (level: string): string => {
      switch (level) {
        case 'Low Risk': return '#22c55e';
        case 'Moderate Risk': return '#fbbf24';
        case 'High Risk': return '#f97316';
        case 'Severe Risk': return '#ef4444';
        case 'Extreme Risk': return '#7f1d1d';
        default: return '#94a3b8';
      }
    };

    // Helper to calculate center of polygon
    const getPolygonCenter = (coordinates: number[][][]): [number, number] => {
      const coords = coordinates[0];
      let latSum = 0;
      let lonSum = 0;
      coords.forEach(([lon, lat]) => {
        latSum += lat;
        lonSum += lon;
      });
      return [latSum / coords.length, lonSum / coords.length];
    };

    // Add markers for each zone
    regionConfig.zones.features.forEach(zone => {
      const risk = zoneRisks.find(r => r.zoneId === zone.properties.id);
      if (!risk) return;

      const color = getColor(risk.level);
      const center = getPolygonCenter(zone.geometry.coordinates);
      const isSelected = selectedZoneId === zone.properties.id;
      
      // Determine radius based on location type
      const radius = zone.properties.locationType === 'harbour' ? 800 : 1500;
      
      // Create circle marker
      const circle = L.circle(center, {
        radius: radius,
        fillColor: color,
        fillOpacity: isSelected ? 0.52 : 0.3,
        color: color,
        weight: isSelected ? 4 : 2,
        opacity: isSelected ? 1 : 0.7,
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 220px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #1e293b;">
            ${zone.properties.name}
          </h3>
          <div style="background: ${color}; color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; text-align: center; margin-bottom: 10px;">
            ${risk.level.toUpperCase()}
          </div>
          <div style="font-size: 13px; color: #475569; line-height: 1.6;">
            <strong>Risk Score:</strong> ${risk.score}/100<br/>
            <strong>Guidance:</strong> ${risk.guidance}<br/>
            <strong>Type:</strong> ${zone.properties.locationType ? zone.properties.locationType.charAt(0).toUpperCase() + zone.properties.locationType.slice(1) : 'Beach'}<br/>
            ${zone.properties.description ? `<strong>Area:</strong> ${zone.properties.description}<br/>` : ''}
          </div>
        </div>
      `;

      circle.bindPopup(popupContent);
      circle.on('click', () => {
        onZoneSelect?.(zone.properties.id);
      });

      // Add hover effect
      circle.on('mouseover', function(this: L.Circle) {
        this.setStyle({
          fillOpacity: 0.5,
          weight: 3,
          opacity: 0.95,
        });
      });

      circle.on('mouseout', function(this: L.Circle) {
        this.setStyle({
          fillOpacity: 0.3,
          weight: 2,
          opacity: 0.7,
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
  }, [mounted, zoneRisks, regionConfig, onZoneSelect, selectedZoneId]);

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
