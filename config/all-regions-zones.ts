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
  // Port Macquarie region
  {
    type: 'Feature',
    properties: {
      id: 'port-macquarie-town',
      name: 'Port Macquarie Town Beach',
      description: 'Town Beach (patrolled year-round)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.910, -31.425], [152.925, -31.425], [152.925, -31.435], [152.910, -31.435], [152.910, -31.425]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'flynns-lighthouse',
      name: 'Flynns - Lighthouse Beach',
      description: 'Flynns Beach, Lighthouse Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.915, -31.440], [152.935, -31.440], [152.935, -31.460], [152.915, -31.460], [152.915, -31.440]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'hastings-river',
      name: 'Hastings River',
      description: 'Hastings River mouth and estuary (high Bull Shark)',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.2 },
        { type: 'tiger-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.1 },
        { type: 'white-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.3 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.890, -31.425], [152.915, -31.425], [152.915, -31.445], [152.890, -31.445], [152.890, -31.425]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'lake-cathie-rainbow',
      name: 'Lake Cathie - Rainbow Beach',
      description: 'Lake Cathie Beach, Rainbow Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.840, -31.530], [152.865, -31.530], [152.865, -31.560], [152.840, -31.560], [152.840, -31.530]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'north-haven-camden',
      name: 'North Haven - Camden Haven',
      description: 'North Haven Beach, Camden Haven River',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[152.810, -31.625], [152.835, -31.625], [152.835, -31.650], [152.810, -31.650], [152.810, -31.625]]] },
  },
  // Kempsey Shire beaches
  {
    type: 'Feature',
    properties: {
      id: 'crescent-head',
      name: 'Crescent Head',
      description: 'Crescent Head Beach (patrolled summer)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.005, -31.185], [153.025, -31.185], [153.025, -31.205], [153.005, -31.205], [153.005, -31.185]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'hat-head',
      name: 'Hat Head',
      description: 'Hat Head Beach and National Park',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.050, -30.950], [153.070, -30.950], [153.070, -30.970], [153.050, -30.970], [153.050, -30.950]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'south-west-rocks',
      name: 'South West Rocks',
      description: 'Trial Bay, South West Rocks beaches',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.035, -30.870], [153.055, -30.870], [153.055, -30.895], [153.035, -30.895], [153.035, -30.870]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'grassy-head-horseshoe',
      name: 'Grassy Head - Horseshoe Bay',
      description: 'Grassy Head, Horseshoe Bay',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.045, -30.810], [153.065, -30.810], [153.065, -30.835], [153.045, -30.835], [153.045, -30.810]]] },
  },
  // Bellingen Shire
  {
    type: 'Feature',
    properties: {
      id: 'urunga-mylestom',
      name: 'Urunga - Mylestom',
      description: 'Hungry Beach (Urunga), North Beach (Mylestom)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.010, -30.490], [153.030, -30.490], [153.030, -30.515], [153.010, -30.515], [153.010, -30.490]]] },
  },
  // Coffs Harbour region
  {
    type: 'Feature',
    properties: {
      id: 'park-jetty-beach',
      name: 'Park - Jetty Beach',
      description: 'Park Beach (patrolled 365 days), Jetty Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.125, -30.295], [153.145, -30.295], [153.145, -30.315], [153.125, -30.315], [153.125, -30.295]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'diggers-beach',
      name: 'Diggers Beach',
      description: 'Diggers Beach (patrolled school holidays)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.115, -30.265], [153.130, -30.265], [153.130, -30.280], [153.115, -30.280], [153.115, -30.265]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'sawtell',
      name: 'Sawtell Beach',
      description: 'Sawtell Main Beach (patrolled Sep-Apr)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.095, -30.360], [153.110, -30.360], [153.110, -30.375], [153.095, -30.375], [153.095, -30.360]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'emerald-beach',
      name: 'Emerald Beach',
      description: 'Emerald Beach (patrolled Dec-Jan)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.130, -30.195], [153.145, -30.195], [153.145, -30.210], [153.130, -30.210], [153.130, -30.195]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'woolgoolga',
      name: 'Woolgoolga Beach',
      description: 'Woolgoolga Beach (patrolled Sep-Apr)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.195, -30.110], [153.215, -30.110], [153.215, -30.130], [153.195, -30.130], [153.195, -30.110]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'red-rock',
      name: 'Red Rock',
      description: 'Red Rock Beach (patrolled Dec-Jan)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.230, -29.985], [153.250, -29.985], [153.250, -30.005], [153.230, -30.005], [153.230, -29.985]]] },
  },
];

// ===== NORTH COAST NSW =====
export const NORTH_COAST_ZONES: Zone[] = [
  // Tweed region
  {
    type: 'Feature',
    properties: {
      id: 'tweed-heads',
      name: 'Tweed Heads',
      description: 'Rainbow Bay, Greenmount Beach, Coolangatta border',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.535, -28.160], [153.555, -28.160], [153.555, -28.180], [153.535, -28.180], [153.535, -28.160]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'kingscliff-cabarita',
      name: 'Kingscliff - Cabarita',
      description: 'Kingscliff Beach, Cabarita Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.565, -28.260], [153.585, -28.260], [153.585, -28.345], [153.565, -28.345], [153.565, -28.260]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'tweed-river',
      name: 'Tweed River',
      description: 'Tweed River mouth and estuary (high Bull Shark)',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.3 },
        { type: 'tiger-shark', likelihood: 'common', incidentHistory: 'moderate', weightMultiplier: 1.3 },
        { type: 'white-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 0.6 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.525, -28.170], [153.545, -28.170], [153.545, -28.190], [153.525, -28.190], [153.525, -28.170]]] },
  },
  // Byron Shire
  {
    type: 'Feature',
    properties: {
      id: 'byron-main-beach',
      name: 'Byron Bay Main Beach',
      description: 'Main Beach Byron Bay, Clarkes Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.605, -28.635], [153.620, -28.635], [153.620, -28.650], [153.605, -28.650], [153.605, -28.635]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'the-pass-wategos',
      name: 'The Pass - Wategos',
      description: 'The Pass, Wategos Beach (Cape Byron)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.610, -28.625], [153.630, -28.625], [153.630, -28.640], [153.610, -28.640], [153.610, -28.625]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'belongil-beach',
      name: 'Belongil Beach',
      description: 'Belongil Beach (north of Byron)',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.590, -28.625], [153.605, -28.625], [153.605, -28.640], [153.590, -28.640], [153.590, -28.625]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'suffolk-park',
      name: 'Suffolk Park - Tallow Beach',
      description: 'Suffolk Park, Tallow Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.585, -28.680], [153.610, -28.680], [153.610, -28.720], [153.585, -28.720], [153.585, -28.680]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'brunswick-heads',
      name: 'Brunswick Heads',
      description: 'Brunswick River mouth and beaches (high Bull Shark)',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.2 },
        { type: 'tiger-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 1.2 },
        { type: 'white-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 0.6 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.540, -28.535], [153.560, -28.535], [153.560, -28.555], [153.540, -28.555], [153.540, -28.535]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'new-brighton-south-golden',
      name: 'New Brighton - South Golden',
      description: 'New Brighton, South Golden Beach',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.545, -28.510], [153.565, -28.510], [153.565, -28.535], [153.545, -28.535], [153.545, -28.510]]] },
  },
  // Ballina region
  {
    type: 'Feature',
    properties: {
      id: 'lennox-head',
      name: 'Lennox Head',
      description: 'Lennox Head, Seven Mile Beach, Lake Ainsworth',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.585, -28.780], [153.605, -28.780], [153.605, -28.800], [153.585, -28.800], [153.585, -28.780]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'ballina-lighthouse',
      name: 'Ballina - Lighthouse Beach',
      description: 'Lighthouse Beach, Shelly Beach Ballina',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.570, -28.855], [153.590, -28.855], [153.590, -28.875], [153.570, -28.875], [153.570, -28.855]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'richmond-river',
      name: 'Richmond River',
      description: 'Richmond River mouth and estuary (high Bull Shark)',
      locationType: 'bay',
      speciesProfiles: [
        { type: 'bull-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.3 },
        { type: 'tiger-shark', likelihood: 'common', incidentHistory: 'moderate', weightMultiplier: 1.2 },
        { type: 'white-shark', likelihood: 'occasional', incidentHistory: 'moderate', weightMultiplier: 0.6 },
        { type: 'bronze-whaler', likelihood: 'common', incidentHistory: 'low', weightMultiplier: 0.9 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.540, -28.860], [153.565, -28.860], [153.565, -28.885], [153.540, -28.885], [153.540, -28.860]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'evans-head',
      name: 'Evans Head',
      description: 'Evans Head Beach, Evans River',
      locationType: 'beach',
      speciesProfiles: SUBTROPICAL_MIX,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[153.425, -29.120], [153.445, -29.120], [153.445, -29.140], [153.425, -29.140], [153.425, -29.120]]] },
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
  // Port Phillip Bay - Melbourne City beaches
  {
    type: 'Feature',
    properties: {
      id: 'st-kilda-port-melbourne',
      name: 'St Kilda - Port Melbourne',
      description: 'St Kilda Beach, Elwood Beach, Port Melbourne',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.950, -37.850], [144.980, -37.850], [144.980, -37.885], [144.950, -37.885], [144.950, -37.850]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'brighton-hampton',
      name: 'Brighton - Hampton',
      description: 'Brighton Beach (bathing boxes), Hampton Beach',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.980, -37.900], [145.000, -37.900], [145.000, -37.930], [144.980, -37.930], [144.980, -37.900]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'sandringham-beaumaris',
      name: 'Sandringham - Beaumaris',
      description: 'Sandringham, Black Rock, Beaumaris, Ricketts Point',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.000, -37.940], [145.030, -37.940], [145.030, -37.985], [145.000, -37.985], [145.000, -37.940]]] },
  },
  // Mornington Peninsula - Bay side
  {
    type: 'Feature',
    properties: {
      id: 'frankston-seaford',
      name: 'Frankston - Seaford',
      description: 'Frankston Beach, Seaford Beach',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.110, -38.125], [145.140, -38.125], [145.140, -38.160], [145.110, -38.160], [145.110, -38.125]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'mount-martha-safety',
      name: 'Mount Martha - Safety Beach',
      description: 'Mount Martha, Safety Beach, Dromana',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.000, -38.240], [145.050, -38.240], [145.050, -38.300], [145.000, -38.300], [145.000, -38.240]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'mccrae-rosebud',
      name: 'McCrae - Rosebud',
      description: 'McCrae, Rosebud, Rye Front Beach',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.900, -38.320], [144.950, -38.320], [144.950, -38.380], [144.900, -38.380], [144.900, -38.320]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'sorrento-portsea-bay',
      name: 'Sorrento - Portsea (Bay)',
      description: 'Sorrento Front Beach, Portsea Front Beach, Fishermans Beach',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.710, -38.330], [144.750, -38.330], [144.750, -38.370], [144.710, -38.370], [144.710, -38.330]]] },
  },
  // Mornington Peninsula - Ocean side (higher White Shark activity)
  {
    type: 'Feature',
    properties: {
      id: 'portsea-sorrento-ocean',
      name: 'Portsea - Sorrento (Ocean)',
      description: 'Portsea Ocean Beach, Sorrento Ocean Beach',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.690, -38.340], [144.730, -38.340], [144.730, -38.380], [144.690, -38.380], [144.690, -38.340]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'rye-gunnamatta',
      name: 'Rye - Gunnamatta',
      description: 'Rye Ocean Beach, Gunnamatta Beach',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.840, -38.380], [144.880, -38.380], [144.880, -38.420], [144.840, -38.420], [144.840, -38.380]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'st-andrews-cape-schanck',
      name: 'St Andrews - Cape Schanck',
      description: 'St Andrews Beach, Cape Schanck, Bushrangers Bay',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.860, -38.480], [144.910, -38.480], [144.910, -38.530], [144.860, -38.530], [144.860, -38.480]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'flinders-shoreham',
      name: 'Flinders - Shoreham',
      description: 'Flinders Ocean Beach, Shoreham Beach',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.100, -38.460], [145.150, -38.460], [145.150, -38.500], [145.100, -38.500], [145.100, -38.460]]] },
  },
  // Phillip Island & Westernport Bay
  {
    type: 'Feature',
    properties: {
      id: 'phillip-island-north',
      name: 'Phillip Island (North)',
      description: 'Cowes, San Remo, Westernport Bay side',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.220, -38.440], [145.260, -38.440], [145.260, -38.475], [145.220, -38.475], [145.220, -38.440]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'phillip-island-south',
      name: 'Phillip Island (South)',
      description: 'Woolamai Beach, Smiths Beach, Cat Bay',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[145.180, -38.500], [145.250, -38.500], [145.250, -38.550], [145.180, -38.550], [145.180, -38.500]]] },
  },
  // Geelong & Bellarine Peninsula
  {
    type: 'Feature',
    properties: {
      id: 'geelong-corio-bay',
      name: 'Geelong - Corio Bay',
      description: 'Eastern Beach Geelong, Corio Bay',
      locationType: 'bay',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.350, -38.125], [144.380, -38.125], [144.380, -38.160], [144.350, -38.160], [144.350, -38.125]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'barwon-heads-ocean-grove',
      name: 'Barwon Heads - Ocean Grove',
      description: 'Barwon Heads Beach, Ocean Grove Main Beach',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.500, -38.250], [144.550, -38.250], [144.550, -38.290], [144.500, -38.290], [144.500, -38.250]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'point-lonsdale-queenscliff',
      name: 'Point Lonsdale - Queenscliff',
      description: 'Point Lonsdale Beach, Queenscliff Front Beach',
      locationType: 'beach',
      speciesProfiles: WHITE_SHARK_DOMINANT,
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.600, -38.270], [144.640, -38.270], [144.640, -38.300], [144.600, -38.300], [144.600, -38.270]]] },
  },
  // Great Ocean Road - Surf Coast
  {
    type: 'Feature',
    properties: {
      id: 'torquay-jan-juc',
      name: 'Torquay - Jan Juc',
      description: 'Torquay Front Beach, Jan Juc Beach',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.310, -38.310], [144.340, -38.310], [144.340, -38.345], [144.310, -38.345], [144.310, -38.310]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'bells-winki-pop',
      name: 'Bells Beach - Winki Pop',
      description: 'Bells Beach (Rip Curl Pro), Winki Pop',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.280, -38.360], [144.310, -38.360], [144.310, -38.385], [144.280, -38.385], [144.280, -38.360]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'anglesea-aireys',
      name: 'Anglesea - Aireys Inlet',
      description: 'Anglesea Beach, Fairhaven Beach, Aireys Inlet',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[144.170, -38.390], [144.210, -38.390], [144.210, -38.450], [144.170, -38.450], [144.170, -38.390]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'lorne-wye-river',
      name: 'Lorne - Wye River',
      description: 'Lorne Beach, Wye River Beach',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[143.970, -38.530], [144.050, -38.530], [144.050, -38.590], [143.970, -38.590], [143.970, -38.530]]] },
  },
  {
    type: 'Feature',
    properties: {
      id: 'apollo-bay',
      name: 'Apollo Bay',
      description: 'Apollo Bay Beach and coastline',
      locationType: 'beach',
      speciesProfiles: [
        { type: 'white-shark', likelihood: 'common', incidentHistory: 'high', weightMultiplier: 2.0 },
        { type: 'bronze-whaler', likelihood: 'occasional', incidentHistory: 'low', weightMultiplier: 0.9 },
        { type: 'bull-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.2 },
        { type: 'tiger-shark', likelihood: 'rare', incidentHistory: 'low', weightMultiplier: 0.1 },
      ],
      bomStations: {},
    },
    geometry: { type: 'Polygon', coordinates: [[[143.660, -38.750], [143.690, -38.750], [143.690, -38.770], [143.660, -38.770], [143.660, -38.750]]] },
  },
];
