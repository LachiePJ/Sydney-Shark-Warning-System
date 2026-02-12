/**
 * Multi-Region Configuration
 * Defines all supported regions and their zones
 */

import { ZonesCollection } from './zones';
import {
  SYDNEY_ZONES,
  SOUTH_COAST_ZONES,
  CENTRAL_COAST_ZONES,
  MID_NORTH_COAST_ZONES,
  NORTH_COAST_ZONES,
  BRISBANE_SUNSHINE_COAST_ZONES,
  MELBOURNE_ZONES,
} from './all-regions-zones';

export interface Region {
  id: string;
  name: string;
  displayName: string;
  description: string;
  country: string;
  state: string;
  center: {
    lat: number;
    lon: number;
  };
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  zoom: number;
  timezone: string;
  zones: ZonesCollection;
}

export const REGIONS: Record<string, Region> = {
  'sydney': {
    id: 'sydney',
    name: 'sydney',
    displayName: 'Sydney',
    description: 'Greater Sydney region including harbour and ocean beaches',
    country: 'Australia',
    state: 'NSW',
    center: { lat: -33.8688, lon: 151.2093 },
    bounds: {
      north: -33.5,
      south: -34.2,
      east: 151.5,
      west: 150.9,
    },
    zoom: 11,
    timezone: 'Australia/Sydney',
    zones: {
      type: 'FeatureCollection',
      features: SYDNEY_ZONES,
    },
  },

  'south-coast-nsw': {
    id: 'south-coast-nsw',
    name: 'south-coast-nsw',
    displayName: 'South Coast NSW',
    description: 'Wollongong to Jervis Bay including beaches, harbours, and estuaries',
    country: 'Australia',
    state: 'NSW',
    center: { lat: -34.9, lon: 150.7 },
    bounds: {
      north: -34.2,
      south: -35.3,
      east: 151.0,
      west: 150.3,
    },
    zoom: 10,
    timezone: 'Australia/Sydney',
    zones: {
      type: 'FeatureCollection',
      features: SOUTH_COAST_ZONES,
    },
  },

  'central-coast-nsw': {
    id: 'central-coast-nsw',
    name: 'central-coast-nsw',
    displayName: 'Central Coast NSW',
    description: 'Gosford to Newcastle region',
    country: 'Australia',
    state: 'NSW',
    center: { lat: -33.3, lon: 151.5 },
    bounds: {
      north: -32.8,
      south: -33.5,
      east: 151.8,
      west: 151.2,
    },
    zoom: 10,
    timezone: 'Australia/Sydney',
    zones: {
      type: 'FeatureCollection',
      features: CENTRAL_COAST_ZONES,
    },
  },

  'mid-north-coast-nsw': {
    id: 'mid-north-coast-nsw',
    name: 'mid-north-coast-nsw',
    displayName: 'Mid North Coast NSW',
    description: 'Port Macquarie to Coffs Harbour region',
    country: 'Australia',
    state: 'NSW',
    center: { lat: -31.4, lon: 152.9 },
    bounds: {
      north: -29.9,
      south: -32.5,
      east: 153.2,
      west: 152.5,
    },
    zoom: 9,
    timezone: 'Australia/Sydney',
    zones: {
      type: 'FeatureCollection',
      features: MID_NORTH_COAST_ZONES,
    },
  },

  'north-coast-nsw': {
    id: 'north-coast-nsw',
    name: 'north-coast-nsw',
    displayName: 'North Coast NSW',
    description: 'Ballina to Byron Bay and Tweed region',
    country: 'Australia',
    state: 'NSW',
    center: { lat: -28.8, lon: 153.5 },
    bounds: {
      north: -28.2,
      south: -29.5,
      east: 153.7,
      west: 153.3,
    },
    zoom: 10,
    timezone: 'Australia/Sydney',
    zones: {
      type: 'FeatureCollection',
      features: NORTH_COAST_ZONES,
    },
  },

  'brisbane-sunshine-coast': {
    id: 'brisbane-sunshine-coast',
    name: 'brisbane-sunshine-coast',
    displayName: 'Brisbane & Sunshine Coast',
    description: 'Moreton Bay to Sunshine Coast beaches',
    country: 'Australia',
    state: 'QLD',
    center: { lat: -26.8, lon: 153.1 },
    bounds: {
      north: -26.3,
      south: -27.5,
      east: 153.3,
      west: 152.8,
    },
    zoom: 10,
    timezone: 'Australia/Brisbane',
    zones: {
      type: 'FeatureCollection',
      features: BRISBANE_SUNSHINE_COAST_ZONES,
    },
  },

  'melbourne': {
    id: 'melbourne',
    name: 'melbourne',
    displayName: 'Melbourne',
    description: 'Port Phillip Bay and Melbourne beaches',
    country: 'Australia',
    state: 'VIC',
    center: { lat: -37.8, lon: 145.0 },
    bounds: {
      north: -37.5,
      south: -38.4,
      east: 145.5,
      west: 144.5,
    },
    zoom: 10,
    timezone: 'Australia/Melbourne',
    zones: {
      type: 'FeatureCollection',
      features: MELBOURNE_ZONES,
    },
  },
};

export const DEFAULT_REGION = 'sydney';

export function getRegion(regionId: string): Region | undefined {
  return REGIONS[regionId];
}

export function getAllRegions(): Region[] {
  return Object.values(REGIONS);
}

export function getRegionsList(): Array<{ id: string; name: string; state: string }> {
  return getAllRegions().map(r => ({
    id: r.id,
    name: r.displayName,
    state: r.state,
  }));
}
