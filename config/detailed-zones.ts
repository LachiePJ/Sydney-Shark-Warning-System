/**
 * Detailed Zone Definitions with More Granular Coverage
 * Creates smaller sub-zones for smoother risk visualization
 */

export interface DetailedZone {
  id: string;
  name: string;
  parentZone: string;
  riskModifier: number; // -0.1 to +0.1 to adjust risk based on local factors
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

/**
 * More granular zones for smoother map visualization
 * Each major area is split into multiple sub-zones
 */
export const DETAILED_ZONES: DetailedZone[] = [
  // Sydney Harbour - split into multiple smaller zones
  {
    id: 'harbour-circular-quay',
    name: 'Circular Quay',
    parentZone: 'sydney-harbour-inner',
    riskModifier: -0.05, // Lower risk in calm inner harbour
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.205, -33.850],
        [151.215, -33.850],
        [151.215, -33.858],
        [151.205, -33.858],
        [151.205, -33.850],
      ]],
    },
  },
  {
    id: 'harbour-farm-cove',
    name: 'Farm Cove',
    parentZone: 'sydney-harbour-inner',
    riskModifier: -0.08,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.215, -33.850],
        [151.225, -33.850],
        [151.225, -33.862],
        [151.215, -33.862],
        [151.215, -33.850],
      ]],
    },
  },
  {
    id: 'harbour-garden-island',
    name: 'Garden Island',
    parentZone: 'sydney-harbour-inner',
    riskModifier: -0.03,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.225, -33.850],
        [151.235, -33.850],
        [151.235, -33.862],
        [151.225, -33.862],
        [151.225, -33.850],
      ]],
    },
  },
  {
    id: 'harbour-rose-bay',
    name: 'Rose Bay',
    parentZone: 'sydney-harbour-inner',
    riskModifier: 0.0,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.265, -33.865],
        [151.275, -33.865],
        [151.275, -33.875],
        [151.265, -33.875],
        [151.265, -33.865],
      ]],
    },
  },
  {
    id: 'harbour-watsons-bay',
    name: 'Watsons Bay',
    parentZone: 'sydney-harbour-outer',
    riskModifier: 0.05, // Higher risk near harbour entrance
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.275, -33.840],
        [151.285, -33.840],
        [151.285, -33.850],
        [151.275, -33.850],
        [151.275, -33.840],
      ]],
    },
  },
  {
    id: 'harbour-middle-head',
    name: 'Middle Head',
    parentZone: 'sydney-harbour-outer',
    riskModifier: 0.08,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.255, -33.825],
        [151.265, -33.825],
        [151.265, -33.835],
        [151.255, -33.835],
        [151.255, -33.825],
      ]],
    },
  },
  {
    id: 'harbour-north-head',
    name: 'North Head',
    parentZone: 'sydney-harbour-outer',
    riskModifier: 0.1, // Highest harbour risk near ocean
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.285, -33.820],
        [151.295, -33.820],
        [151.295, -33.830],
        [151.285, -33.830],
        [151.285, -33.820],
      ]],
    },
  },
  
  // Manly - split into beach zones
  {
    id: 'manly-beach-north',
    name: 'Manly Beach North',
    parentZone: 'manly',
    riskModifier: 0.05,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.285, -33.790],
        [151.291, -33.790],
        [151.291, -33.797],
        [151.285, -33.797],
        [151.285, -33.790],
      ]],
    },
  },
  {
    id: 'manly-beach-central',
    name: 'Manly Beach Central',
    parentZone: 'manly',
    riskModifier: 0.0,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.287, -33.797],
        [151.293, -33.797],
        [151.293, -33.800],
        [151.287, -33.800],
        [151.287, -33.797],
      ]],
    },
  },
  {
    id: 'manly-beach-south',
    name: 'Manly Beach South',
    parentZone: 'manly',
    riskModifier: 0.03,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.287, -33.800],
        [151.293, -33.800],
        [151.293, -33.805],
        [151.287, -33.805],
        [151.287, -33.800],
      ]],
    },
  },
  {
    id: 'manly-shelly-beach',
    name: 'Shelly Beach',
    parentZone: 'manly',
    riskModifier: -0.05, // Protected beach
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.293, -33.795],
        [151.299, -33.795],
        [151.299, -33.800],
        [151.293, -33.800],
        [151.293, -33.795],
      ]],
    },
  },

  // Bondi to Bronte - detailed zones
  {
    id: 'bondi-north',
    name: 'Bondi Beach North',
    parentZone: 'bondi-bronte',
    riskModifier: 0.02,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.270, -33.885],
        [151.275, -33.885],
        [151.275, -33.892],
        [151.270, -33.892],
        [151.270, -33.885],
      ]],
    },
  },
  {
    id: 'bondi-central',
    name: 'Bondi Beach Central',
    parentZone: 'bondi-bronte',
    riskModifier: 0.0,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.272, -33.892],
        [151.277, -33.892],
        [151.277, -33.896],
        [151.272, -33.896],
        [151.272, -33.892],
      ]],
    },
  },
  {
    id: 'bondi-south',
    name: 'Bondi Beach South',
    parentZone: 'bondi-bronte',
    riskModifier: 0.03,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.272, -33.896],
        [151.277, -33.896],
        [151.277, -33.900],
        [151.272, -33.900],
        [151.272, -33.896],
      ]],
    },
  },
  {
    id: 'tamarama',
    name: 'Tamarama Beach',
    parentZone: 'bondi-bronte',
    riskModifier: 0.05, // Smaller beach, can have higher risk
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.272, -33.900],
        [151.277, -33.900],
        [151.277, -33.903],
        [151.272, -33.903],
        [151.272, -33.900],
      ]],
    },
  },
  {
    id: 'bronte',
    name: 'Brontë Beach',
    parentZone: 'bondi-bronte',
    riskModifier: 0.04,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.268, -33.903],
        [151.273, -33.903],
        [151.273, -33.908],
        [151.268, -33.908],
        [151.268, -33.903],
      ]],
    },
  },

  // Coogee to Maroubra - detailed zones
  {
    id: 'coogee',
    name: 'Coogee Beach',
    parentZone: 'coogee-maroubra',
    riskModifier: 0.0,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.255, -33.915],
        [151.260, -33.915],
        [151.260, -33.923],
        [151.255, -33.923],
        [151.255, -33.915],
      ]],
    },
  },
  {
    id: 'clovelly',
    name: 'Clovelly Beach',
    parentZone: 'coogee-maroubra',
    riskModifier: -0.05, // Protected cove
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.258, -33.923],
        [151.263, -33.923],
        [151.263, -33.928],
        [151.258, -33.928],
        [151.258, -33.923],
      ]],
    },
  },
  {
    id: 'maroubra-north',
    name: 'Maroubra Beach North',
    parentZone: 'coogee-maroubra',
    riskModifier: 0.05,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.255, -33.945],
        [151.260, -33.945],
        [151.260, -33.950],
        [151.255, -33.950],
        [151.255, -33.945],
      ]],
    },
  },
  {
    id: 'maroubra-south',
    name: 'Maroubra Beach South',
    parentZone: 'coogee-maroubra',
    riskModifier: 0.08,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.255, -33.950],
        [151.260, -33.950],
        [151.260, -33.957],
        [151.255, -33.957],
        [151.255, -33.950],
      ]],
    },
  },

  // Cronulla - split zones
  {
    id: 'cronulla-north',
    name: 'Cronulla North',
    parentZone: 'cronulla',
    riskModifier: 0.0,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.145, -34.045],
        [151.153, -34.045],
        [151.153, -34.053],
        [151.145, -34.053],
        [151.145, -34.045],
      ]],
    },
  },
  {
    id: 'cronulla-central',
    name: 'Cronulla Beach',
    parentZone: 'cronulla',
    riskModifier: 0.02,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.150, -34.053],
        [151.158, -34.053],
        [151.158, -34.058],
        [151.150, -34.058],
        [151.150, -34.053],
      ]],
    },
  },
  {
    id: 'cronulla-south',
    name: 'Cronulla South',
    parentZone: 'cronulla',
    riskModifier: 0.05,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.150, -34.058],
        [151.158, -34.058],
        [151.158, -34.065],
        [151.150, -34.065],
        [151.150, -34.058],
      ]],
    },
  },

  // Palm Beach - split zones
  {
    id: 'palm-beach-north',
    name: 'Palm Beach North',
    parentZone: 'palm-beach',
    riskModifier: 0.08,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.315, -33.595],
        [151.323, -33.595],
        [151.323, -33.601],
        [151.315, -33.601],
        [151.315, -33.595],
      ]],
    },
  },
  {
    id: 'palm-beach-south',
    name: 'Palm Beach South',
    parentZone: 'palm-beach',
    riskModifier: 0.05,
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [151.318, -33.601],
        [151.326, -33.601],
        [151.326, -33.608],
        [151.318, -33.608],
        [151.318, -33.601],
      ]],
    },
  },
];
