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
  // Harbour zones (high Bull Shark risk)
  {
    type: 'Feature',
    properties: {
      id: 'sydney-harbour-inner',
      name: 'Sydney Harbour (Inner)',
      description: 'Circular Quay, Middle Head, inner harbour',
      locationType: 'harbour',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.205, -33.850], [151.245, -33.835], [151.280, -33.840], [151.245, -33.855], [151.205, -33.850]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'parramatta-river',
      name: 'Parramatta River',
      description: 'Parramatta River from Homebush to Iron Cove',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.5 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.05 },
        { type: 'bronze-whaler', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.085, -33.830], [151.160, -33.860], [151.160, -33.880], [151.085, -33.850], [151.085, -33.830]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'lane-cove-river',
      name: 'Lane Cove River',
      description: 'Lane Cove River and tributaries',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.3 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.05 },
        { type: 'bronze-whaler', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.160, -33.810], [151.180, -33.810], [151.180, -33.840], [151.160, -33.840], [151.160, -33.810]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'georges-river',
      name: 'Georges River',
      description: 'Georges River estuary and swimming areas',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.2 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.05 },
        { type: 'bronze-whaler', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.065, -33.990], [151.110, -33.990], [151.110, -34.020], [151.065, -34.020], [151.065, -33.990]]] },
  },
  // Northern Beaches
  {
    type: 'Feature',
    properties: {
      id: 'northern-beaches-palm-avalon',
      name: 'Palm Beach - Avalon',
      description: 'Palm Beach, Whale Beach, Avalon',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.4 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.25 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.85 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.315, -33.580], [151.335, -33.580], [151.335, -33.635], [151.315, -33.635], [151.315, -33.580]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'northern-beaches-mona-vale',
      name: 'Mona Vale - Newport',
      description: 'Mona Vale, Bungan, Newport, Bilgola',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.4 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.25 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.300, -33.660], [151.320, -33.660], [151.320, -33.700], [151.300, -33.700], [151.300, -33.660]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'northern-beaches-narrabeen',
      name: 'Narrabeen - Dee Why',
      description: 'Narrabeen, Collaroy, Dee Why, Curl Curl',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.2 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.95 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.290, -33.735], [151.310, -33.735], [151.310, -33.770], [151.290, -33.770], [151.290, -33.735]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'manly-area',
      name: 'Manly - Freshwater',
      description: 'Manly, Queenscliff, Freshwater, Harbord',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.3 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 1.0 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.280, -33.785], [151.300, -33.785], [151.300, -33.810], [151.280, -33.810], [151.280, -33.785]]] },
  },
  // Eastern Suburbs Beaches
  {
    type: 'Feature',
    properties: {
      id: 'bondi-tamarama',
      name: 'Bondi - Tamarama',
      description: 'Bondi Beach, Tamarama Beach',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.5 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.270, -33.885], [151.280, -33.885], [151.280, -33.900], [151.270, -33.900], [151.270, -33.885]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'bronte-clovelly',
      name: 'Brontë - Clovelly',
      description: 'Brontë, Clovelly, Gordons Bay',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.5 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.258, -33.900], [151.268, -33.900], [151.268, -33.915], [151.258, -33.915], [151.258, -33.900]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'coogee-maroubra',
      name: 'Coogee - Maroubra',
      description: 'Coogee, Malabar, Maroubra, Little Bay',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.5 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.250, -33.915], [151.265, -33.915], [151.265, -33.965], [151.250, -33.965], [151.250, -33.915]]] },
  },
  // Botany Bay area
  {
    type: 'Feature',
    properties: {
      id: 'botany-bay',
      name: 'Botany Bay',
      description: 'Botany Bay, Cooks River mouth, Brighton-Le-Sands',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'moderate', weightMultiplier: 1.7 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.8 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.145, -33.955], [151.215, -33.955], [151.215, -34.015], [151.145, -34.015], [151.145, -33.955]]] },
  },
  // Cronulla & Port Hacking
  {
    type: 'Feature',
    properties: {
      id: 'cronulla-beaches',
      name: 'Cronulla Beaches',
      description: 'Cronulla, North Cronulla, Elouera, Wanda',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.2 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.95 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.145, -34.040], [151.160, -34.040], [151.160, -34.070], [151.145, -34.070], [151.145, -34.040]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'port-hacking',
      name: 'Port Hacking',
      description: 'Port Hacking River and estuary',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.7 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.090, -34.060], [151.140, -34.060], [151.140, -34.090], [151.090, -34.090], [151.090, -34.060]]] },
  },
  // Additional harbour beaches
  {
    type: 'Feature',
    properties: {
      id: 'balmoral-mosman',
      name: 'Balmoral - Mosman Bays',
      description: 'Balmoral, Chinaman\'s Beach, Edwards Beach',
      locationType: 'harbour',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.240, -33.820], [151.260, -33.820], [151.260, -33.840], [151.240, -33.840], [151.240, -33.820]]] },
  },
];

// ===== SOUTH COAST NSW (Wollongong to Jervis Bay) =====
export const SOUTH_COAST_ZONES: Zone[] = [
  // Wollongong North
  {
    type: 'Feature',
    properties: {
      id: 'stanwell-coalcliff',
      name: 'Stanwell Park - Coalcliff',
      description: 'Stanwell Park, Coalcliff beaches',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.985, -34.220], [151.000, -34.220], [151.000, -34.240], [150.985, -34.240], [150.985, -34.220]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'scarborough-woonona',
      name: 'Scarborough - Woonona',
      description: 'Scarborough, Coledale, Austinmer, Thirroul',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.995, -34.245], [151.010, -34.245], [151.010, -34.310], [150.995, -34.310], [150.995, -34.245]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'bulli-bellambi',
      name: 'Bulli - Bellambi',
      description: 'Sandon Point, Bulli, Woonona, Bellambi',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.915, -34.320], [150.930, -34.320], [150.930, -34.365], [150.915, -34.365], [150.915, -34.320]]] },
  },
  // Wollongong City
  {
    type: 'Feature',
    properties: {
      id: 'corrimal-towradgi',
      name: 'Corrimal - Towradgi',
      description: 'Corrimal, Towradgi beaches',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.900, -34.370], [150.915, -34.370], [150.915, -34.390], [150.900, -34.390], [150.900, -34.370]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'wollongong-city',
      name: 'Wollongong City Beach',
      description: 'North Wollongong, Wollongong Beach',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.905, -34.410], [150.920, -34.410], [150.920, -34.430], [150.905, -34.430], [150.905, -34.410]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'port-kembla',
      name: 'Port Kembla Harbour',
      description: 'Port Kembla harbour and beach',
      locationType: 'harbour',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.895, -34.465], [150.910, -34.465], [150.910, -34.485], [150.895, -34.485], [150.895, -34.465]]] },
  },
  // Shellharbour & Kiama
  {
    type: 'Feature',
    properties: {
      id: 'shellharbour-warilla',
      name: 'Shellharbour - Warilla',
      description: 'Shellharbour, Warilla, Illawarra River mouth',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.855, -34.555], [150.875, -34.555], [150.875, -34.590], [150.855, -34.590], [150.855, -34.555]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'kiama-beaches',
      name: 'Kiama',
      description: 'Kiama, Bombo Beach, Jones Beach',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.850, -34.660], [150.870, -34.660], [150.870, -34.680], [150.850, -34.680], [150.850, -34.660]]] },
  },
  // Shoalhaven region
  {
    type: 'Feature',
    properties: {
      id: 'shoalhaven-river',
      name: 'Shoalhaven River',
      description: 'Shoalhaven River mouth and estuary',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'moderate', weightMultiplier: 1.5 },
        { type: 'bull-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.2 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.15 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.750, -34.860], [150.790, -34.860], [150.790, -34.890], [150.750, -34.890], [150.750, -34.860]]] },
  },
  // Jervis Bay - multiple zones
  {
    type: 'Feature',
    properties: {
      id: 'jervis-bay-north',
      name: 'Jervis Bay (North)',
      description: 'Huskisson, Vincentia, Collingwood Beach',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.650, -35.030], [150.720, -35.030], [150.720, -35.080], [150.650, -35.080], [150.650, -35.030]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'jervis-bay-south',
      name: 'Jervis Bay (South)',
      description: 'Hyams Beach, Callala Bay, Greenfields Beach',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[150.665, -35.090], [150.730, -35.090], [150.730, -35.150], [150.665, -35.150], [150.665, -35.090]]] },
  },
];

// ===== CENTRAL COAST NSW =====
export const CENTRAL_COAST_ZONES: Zone[] = [
  // Gosford area beaches
  {
    type: 'Feature',
    properties: {
      id: 'pearl-beach-patonga',
      name: 'Pearl Beach - Patonga',
      description: 'Pearl Beach, Patonga, Broken Bay',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.295, -33.545], [151.315, -33.545], [151.315, -33.570], [151.295, -33.570], [151.295, -33.545]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'terrigal-wamberal',
      name: 'Terrigal - Wamberal',
      description: 'Terrigal, Wamberal beaches',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.440, -33.430], [151.460, -33.430], [151.460, -33.465], [151.440, -33.465], [151.440, -33.430]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'avoca-macmasters',
      name: 'Avoca - MacMasters',
      description: 'Avoca Beach, MacMasters Beach',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.425, -33.460], [151.445, -33.460], [151.445, -33.485], [151.425, -33.485], [151.425, -33.460]]] },
  },
  // Tuggerah Lakes area
  {
    type: 'Feature',
    properties: {
      id: 'tuggerah-lakes',
      name: 'Tuggerah Lakes Entrance',
      description: 'The Entrance, Tuggerah Lakes system',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.4 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.7 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.490, -33.330], [151.510, -33.330], [151.510, -33.360], [151.490, -33.360], [151.490, -33.330]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'toowoon-shelly',
      name: 'Toowoon Bay - Shelly Beach',
      description: 'Toowoon Bay, Shelly Beach, Bateau Bay',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.480, -33.360], [151.505, -33.360], [151.505, -33.385], [151.480, -33.385], [151.480, -33.360]]] },
  },
  // Lake Macquarie
  {
    type: 'Feature',
    properties: {
      id: 'lake-macquarie',
      name: 'Lake Macquarie',
      description: 'Swansea, Belmont, lake entrance',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.3 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.7 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.620, -33.070], [151.660, -33.070], [151.660, -33.110], [151.620, -33.110], [151.620, -33.070]]] },
  },
  // Newcastle area
  {
    type: 'Feature',
    properties: {
      id: 'nobbys-newcastle',
      name: 'Nobbys - Newcastle Beach',
      description: 'Nobbys Beach, Newcastle Beach, Ocean Baths',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.785, -32.925], [151.800, -32.925], [151.800, -32.935], [151.785, -32.935], [151.785, -32.925]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'bar-merewether',
      name: 'Bar Beach - Merewether',
      description: 'Bar Beach, Merewether Beach, Dixon Park',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.760, -32.940], [151.780, -32.940], [151.780, -32.960], [151.760, -32.960], [151.760, -32.940]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'hunter-river',
      name: 'Hunter River',
      description: 'Hunter River mouth and harbour entrance',
      locationType: 'harbour',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.5 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.7 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.775, -32.915], [151.795, -32.915], [151.795, -32.930], [151.775, -32.930], [151.775, -32.915]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'stockton-beach',
      name: 'Stockton Beach',
      description: 'Stockton Beach and sand dunes',
      locationType: 'beach',
      speciesProfiles: BULL_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[151.765, -32.890], [151.785, -32.890], [151.785, -32.915], [151.765, -32.915], [151.765, -32.890]]] },
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
  // Noosa region
  {
    type: 'Feature',
    properties: {
      id: 'noosa-main',
      name: 'Noosa Main Beach',
      description: 'Noosa Main Beach, Little Cove',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.090, -26.385], [153.105, -26.385], [153.105, -26.395], [153.090, -26.395], [153.090, -26.385]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'noosa-sunshine',
      name: 'Sunshine Beach - Coolum',
      description: 'Sunshine Beach, Peregian, Coolum Beach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.090, -26.410], [153.110, -26.410], [153.110, -26.555], [153.090, -26.555], [153.090, -26.410]]] },
  },
  // Maroochydore region
  {
    type: 'Feature',
    properties: {
      id: 'maroochydore',
      name: 'Maroochydore',
      description: 'Maroochydore Beach and Maroochy River mouth',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.095, -26.655], [153.115, -26.655], [153.115, -26.670], [153.095, -26.670], [153.095, -26.655]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'alexandra-mooloolaba',
      name: 'Alexandra Headland - Mooloolaba',
      description: 'Alexandra Headland, Mooloolaba Beach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.110, -26.675], [153.130, -26.675], [153.130, -26.695], [153.110, -26.695], [153.110, -26.675]]] },
  },
  // Caloundra
  {
    type: 'Feature',
    properties: {
      id: 'caloundra-kings',
      name: 'Caloundra - Kings Beach',
      description: 'Kings Beach, Bulcock Beach, Moffat Beach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.125, -26.795], [153.145, -26.795], [153.145, -26.815], [153.125, -26.815], [153.125, -26.815]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'currimundi-kawana',
      name: 'Currimundi - Kawana',
      description: 'Currimundi Beach, Kawana Beach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.130, -26.765], [153.150, -26.765], [153.150, -26.790], [153.130, -26.790], [153.130, -26.765]]] },
  },
  // Brisbane & Moreton Bay
  {
    type: 'Feature',
    properties: {
      id: 'brisbane-river',
      name: 'Brisbane River',
      description: 'Brisbane River and estuary',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.8 },
        { type: 'tiger-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.3 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
        { type: 'bronze-whaler', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.5 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.030, -27.380], [153.180, -27.380], [153.180, -27.480], [153.030, -27.480], [153.030, -27.380]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'redcliffe-sandgate',
      name: 'Redcliffe - Sandgate',
      description: 'Suttons Beach, Scarborough, Sandgate',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.2 },
        { type: 'tiger-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 1.6 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.6 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.080, -27.200], [153.130, -27.200], [153.130, -27.250], [153.080, -27.250], [153.080, -27.200]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'moreton-island',
      name: 'Moreton Island',
      description: 'Tangalooma, Bulwer, Moreton Island beaches',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.350, -27.050], [153.450, -27.050], [153.450, -27.200], [153.350, -27.200], [153.350, -27.050]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'stradbroke-island',
      name: 'North Stradbroke Island',
      description: 'Cylinder Beach, Main Beach, Adams Beach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.425, -27.400], [153.550, -27.400], [153.550, -27.560], [153.425, -27.560], [153.425, -27.400]]] },
  },
  // Gold Coast
  {
    type: 'Feature',
    properties: {
      id: 'gold-coast-main',
      name: 'Gold Coast',
      description: 'Main Beach, Surfers Paradise, Broadbeach',
      locationType: 'beach',
      speciesProfiles: TROPICAL_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.420, -27.960], [153.445, -27.960], [153.445, -28.030], [153.420, -28.030], [153.420, -27.960]]] },
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
