/**
 * Comprehensive Multi-Region Zone Definitions
 * All supported regions with beaches, harbours, rivers, and estuaries
 */

import { Zone, SpeciesProfile } from './zones';

// ===== SPECIES PROFILE TEMPLATES =====

// Sydney/Central Coast - Bull Shark dominated
const BULL_SHARK_DOMINANT: SpeciesProfile[] = [
  { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
  { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
  { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
  { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
];

// North Coast NSW/QLD - Warmer water, Tiger & Bull Sharks
const SUBTROPICAL_MIX: SpeciesProfile[] = [
  { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 1.8 },
  { type: 'tiger-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.2 },
  { type: 'white-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 0.8 },
  { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 1.0 },
];

// Queensland - Tiger Shark & Bull Shark preferred
const TROPICAL_DOMINANT: SpeciesProfile[] = [
  { type: 'tiger-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 1.5 },
  { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 1.6 },
  { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
  { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.7 },
];

// Victoria/South Coast - White Shark dominated, cooler water
const WHITE_SHARK_DOMINANT: SpeciesProfile[] = [
  { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 1.8 },
  { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 1.0 },
  { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
  { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
];

// ===== SYDNEY REGION =====
export const SYDNEY_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'sydney-harbour-inner',
      name: 'Sydney Harbour (Inner)',
      description: 'Inner harbour including Circular Quay to Middle Head',
      locationType: 'harbour',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: { rainfall: '066062', waterTemp: 'IDO71000/IDO71000_55.json', swell: 'IDO71000/IDO71000_55.json' },
    },
    geometry: { type: 'Polygon', coordinates: [[[151.205, -33.850], [151.225, -33.850], [151.245, -33.835], [151.265, -33.825], [151.280, -33.825], [151.280, -33.840], [151.265, -33.850], [151.245, -33.855], [151.225, -33.855], [151.205, -33.850]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'manly',
      name: 'Manly',
      description: 'Manly Beach and North Harbour',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.3 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 1.0 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.285, -33.795], [151.295, -33.795], [151.295, -33.805], [151.285, -33.805], [151.285, -33.795]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'bondi-bronte',
      name: 'Bondi - Brontë',
      description: 'Eastern suburbs ocean beaches',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.5 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.265, -33.885], [151.280, -33.885], [151.280, -33.900], [151.265, -33.900], [151.265, -33.885]]] },
  },
];

// ===== SOUTH COAST NSW (Wollongong to Jervis Bay) =====
export const SOUTH_COAST_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'wollongong-north',
      name: 'Wollongong North Beaches',
      description: 'Stanwell Park to Thirroul beaches',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.985, -34.220], [151.000, -34.220], [151.000, -34.240], [150.985, -34.240], [150.985, -34.220]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'wollongong-city',
      name: 'Wollongong City Beaches',
      description: 'North Wollongong, Wollongong, Port Kembla',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.890, -34.400], [150.910, -34.400], [150.910, -34.440], [150.890, -34.440], [150.890, -34.400]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'shellharbour',
      name: 'Shellharbour Beaches',
      description: 'Shellharbour, Warilla, Barrack Point',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.850, -34.560], [150.875, -34.560], [150.875, -34.600], [150.850, -34.600], [150.850, -34.560]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'jervis-bay',
      name: 'Jervis Bay',
      description: 'Huskisson, Hyams, Callala Bay beaches',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.650, -35.050], [150.780, -35.050], [150.780, -35.180], [150.650, -35.180], [150.650, -35.050]]] },
  },
];

// ===== CENTRAL COAST NSW =====
export const CENTRAL_COAST_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'terrigal-avoca',
      name: 'Terrigal - Avoca',
      description: 'Terrigal and Avoca beaches',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.435, -33.425], [151.455, -33.425], [151.455, -33.465], [151.435, -33.465], [151.435, -33.425]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'the-entrance',
      name: 'The Entrance',
      description: 'The Entrance beach and Tuggerah Lakes',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.490, -33.330], [151.510, -33.330], [151.510, -33.360], [151.490, -33.360], [151.490, -33.330]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'newcastle',
      name: 'Newcastle Beaches',
      description: 'Newcastle, Merewether, Bar Beach',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.770, -32.920], [151.800, -32.920], [151.800, -32.950], [151.770, -32.950], [151.770, -32.920]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'newcastle-harbour',
      name: 'Newcastle Harbour',
      description: 'Hunter River mouth and harbour',
      locationType: 'harbour',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.2 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.8 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.780, -32.915], [151.800, -32.915], [151.800, -32.930], [151.780, -32.930], [151.780, -32.915]]] },
  },
];

// ===== MID NORTH COAST NSW =====
export const MID_NORTH_COAST_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'port-macquarie',
      name: 'Port Macquarie Beaches',
      description: 'Town Beach, Flynns, Lighthouse Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.900, -31.425], [152.930, -31.425], [152.930, -31.445], [152.900, -31.445], [152.900, -31.425]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'hastings-river',
      name: 'Hastings River',
      description: 'Hastings River mouth and estuary',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'tiger-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.0 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.4 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 1.0 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.890, -31.430], [152.915, -31.430], [152.915, -31.445], [152.890, -31.445], [152.890, -31.430]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'coffs-harbour',
      name: 'Coffs Harbour Beaches',
      description: 'Park Beach, Jetty Beach, Diggers Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.125, -30.280], [153.150, -30.280], [153.150, -30.320], [153.125, -30.320], [153.125, -30.280]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'sawtell-woolgoolga',
      name: 'Sawtell - Woolgoolga',
      description: 'Sawtell Main Beach, Emerald Beach, Woolgoolga',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.095, -30.060], [153.120, -30.060], [153.120, -30.120], [153.095, -30.120], [153.095, -30.060]]] },
  },
];

// ===== NORTH COAST NSW =====
export const NORTH_COAST_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'byron-bay',
      name: 'Byron Bay',
      description: 'Main Beach, The Pass, Wategos, Clarkes Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.610, -28.630], [153.635, -28.630], [153.635, -28.655], [153.610, -28.655], [153.610, -28.630]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'brunswick-heads',
      name: 'Brunswick Heads',
      description: 'Brunswick River mouth and beaches',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.1 },
        { type: 'tiger-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.3 },
        { type: 'white-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 0.9 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 1.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.540, -28.540], [153.560, -28.540], [153.560, -28.560], [153.540, -28.560], [153.540, -28.540]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'ballina',
      name: 'Ballina',
      description: 'Ballina beaches and Richmond River',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.555, -28.845], [153.580, -28.845], [153.580, -28.875], [153.555, -28.875], [153.555, -28.845]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'lennox-head',
      name: 'Lennox Head',
      description: 'Seven Mile Beach, Lake Ainsworth',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.585, -28.785], [153.605, -28.785], [153.605, -28.810], [153.585, -28.810], [153.585, -28.785]]] },
  },
];

// ===== BRISBANE & SUNSHINE COAST =====
export const BRISBANE_SUNSHINE_COAST_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'noosa',
      name: 'Noosa Heads',
      description: 'Noosa Main Beach, National Park beaches',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.090, -26.385], [153.110, -26.385], [153.110, -26.405], [153.090, -26.405], [153.090, -26.385]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'mooloolaba',
      name: 'Mooloolaba',
      description: 'Mooloolaba Beach, Alexandra Headland',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.115, -26.680], [153.135, -26.680], [153.135, -26.700], [153.115, -26.700], [153.115, -26.680]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'caloundra',
      name: 'Caloundra',
      description: 'Kings Beach, Bulcock Beach, Golden Beach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.120, -26.795], [153.145, -26.795], [153.145, -26.815], [153.120, -26.815], [153.120, -26.795]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'moreton-bay',
      name: 'Moreton Bay',
      description: 'Moreton Bay beaches and Stradbroke Island',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.3 },
        { type: 'tiger-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 1.7 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.7 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.200, -27.100], [153.450, -27.100], [153.450, -27.450], [153.200, -27.450], [153.200, -27.100]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'gold-coast-north',
      name: 'Gold Coast (North)',
      description: 'Southport, Main Beach, Surfers Paradise',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.420, -27.960], [153.445, -27.960], [153.445, -28.020], [153.420, -28.020], [153.420, -27.960]]] },
  },
];

// ===== MELBOURNE & PORT PHILLIP BAY =====
export const MELBOURNE_ZONES: Zone[] = [
  {
    type: 'Feature',
    properties: {
      id: 'port-phillip-west',
      name: 'Port Phillip Bay (West)',
      description: 'St Kilda, Elwood, Brighton beaches',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.960, -37.855], [144.985, -37.855], [144.985, -37.915], [144.960, -37.915], [144.960, -37.855]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'port-phillip-south',
      name: 'Port Phillip Bay (South)',
      description: 'Frankston, Mornington Peninsula beaches',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.100, -38.100], [145.200, -38.100], [145.200, -38.300], [145.100, -38.300], [145.100, -38.100]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'torquay-bells',
      name: 'Torquay - Bells Beach',
      description: 'Torquay, Bells Beach, Point Addis',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.310, -38.290], [144.350, -38.290], [144.350, -38.370], [144.310, -38.370], [144.310, -38.290]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'phillip-island',
      name: 'Phillip Island',
      description: 'Phillip Island beaches and Westernport Bay',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.180, -38.470], [145.260, -38.470], [145.260, -38.530], [145.180, -38.530], [145.180, -38.470]]] },
  },
];
