/**
 * Zone Definitions (GeoJSON)
 * Sydney Harbour and surrounding beaches
 */

export interface SpeciesProfile {
  type: 'bull-shark' | 'white-shark' | 'tiger-shark' | 'bronze-whaler';
  likelihood: 'common' | 'occasional' | 'rare';
  incidentHistory: 'high' | 'moderate' | 'low';
  weightMultiplier: number; // Adjust risk score based on species prevalence
}

export interface ZoneProperties {
  id: string;
  name: string;
  description: string;
  bullSharkRisk?: 'high' | 'moderate' | 'low'; // Bull Shark habitat preference (legacy)
  locationType?: 'beach' | 'harbour' | 'bay';
  speciesProfiles: SpeciesProfile[]; // Multi-species risk profiles
  bomStations: {
    rainfall?: string;  // BoM station ID
    waterTemp?: string; // BoM station ID or buoy
    swell?: string;     // BoM buoy ID
  };
}

export interface Zone {
  type: 'Feature';
  properties: ZoneProperties;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][]; // [[[lng, lat], ...]]
  };
}

export interface ZonesCollection {
  type: 'FeatureCollection';
  features: Zone[];
}

/**
 * Initial zone definitions with approximate boundaries
 * Coordinates are [longitude, latitude]
 */
export const ZONES: ZonesCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'sydney-harbour-inner',
        name: 'Sydney Harbour (Inner)',
        description: 'Inner harbour including Circular Quay to Middle Head',
        bullSharkRisk: 'high', // Estuarine environment - Bull Shark hotspot
        locationType: 'harbour',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'common',
            incidentHistory: 'high',
            weightMultiplier: 2.0, // Bull Sharks are THE dominant threat in Sydney harbours
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.1, // Virtually absent from Sydney harbours
          },
          {
            type: 'bronze-whaler',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.2,
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.15, // Very rare in temperate Sydney
          },
        ],
        bomStations: {
          rainfall: '066062', // Sydney Observatory Hill
          waterTemp: 'IDO71000/IDO71000_55.json', // Fort Denison
          swell: 'IDO71000/IDO71000_55.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.205, -33.850], // Circular Quay area
          [151.225, -33.850],
          [151.245, -33.835],
          [151.265, -33.825], // Middle Head
          [151.280, -33.825],
          [151.280, -33.840],
          [151.265, -33.850],
          [151.245, -33.855],
          [151.225, -33.855],
          [151.205, -33.850],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sydney-harbour-outer',
        name: 'Sydney Harbour (Outer)',
        description: 'Outer harbour from Middle Head to North/South Heads',
        bullSharkRisk: 'high', // Harbour entrance - Bull Shark hotspot
        locationType: 'harbour',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'common',
            incidentHistory: 'high',
            weightMultiplier: 1.8, // Still dominant at harbour entrance
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.2, // Only 1 fatal in 60 years in Sydney
          },
          {
            type: 'bronze-whaler',
            likelihood: 'occasional',
            incidentHistory: 'low',
            weightMultiplier: 0.5,
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.2,
          },
        ],
        bomStations: {
          rainfall: '066062',
          waterTemp: 'IDO71000/IDO71000_55.json',
          swell: 'IDO71000/IDO71000_55.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.265, -33.825],
          [151.280, -33.825],
          [151.285, -33.830], // South Head
          [151.285, -33.840],
          [151.280, -33.840],
          [151.265, -33.850],
          [151.265, -33.825],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'manly',
        name: 'Manly',
        description: 'Manly Beach and surrounding areas',
        bullSharkRisk: 'moderate', // Near harbour entrance
        locationType: 'beach',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'occasional',
            incidentHistory: 'moderate',
            weightMultiplier: 1.0, // Near harbour - moderate Bull Shark presence
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3, // Rare in Sydney (1 fatal in 60 years)
          },
          {
            type: 'bronze-whaler',
            likelihood: 'common',
            incidentHistory: 'low',
            weightMultiplier: 0.9, // Common but low danger
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.25,
          },
        ],
        bomStations: {
          rainfall: '066062',
          waterTemp: 'IDO71000/IDO71000_60.json', // Sydney offshore
          swell: 'IDO71000/IDO71000_60.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.285, -33.790],
          [151.295, -33.790],
          [151.295, -33.805],
          [151.285, -33.805],
          [151.285, -33.790],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'bondi-bronte',
        name: 'Bondi - Brontë',
        description: 'Bondi, Tamarama, and Brontë beaches',
        bullSharkRisk: 'low', // Open ocean beaches
        locationType: 'beach',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.4, // Open ocean - Bull Sharks uncommon
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3, // Rare in Sydney waters (prefers southern coasts)
          },
          {
            type: 'bronze-whaler',
            likelihood: 'common',
            incidentHistory: 'low',
            weightMultiplier: 1.0, // Common but rarely dangerous
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3,
          },
        ],
        bomStations: {
          rainfall: '066062',
          waterTemp: 'IDO71000/IDO71000_60.json',
          swell: 'IDO71000/IDO71000_60.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.270, -33.885],
          [151.280, -33.885],
          [151.280, -33.905],
          [151.270, -33.905],
          [151.270, -33.885],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'coogee-maroubra',
        name: 'Coogee - Maroubra',
        description: 'Coogee, Clovelly, and Maroubra beaches',
        bullSharkRisk: 'low', // Open ocean beaches
        locationType: 'beach',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.4,
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3, // Rare in Sydney
          },
          {
            type: 'bronze-whaler',
            likelihood: 'common',
            incidentHistory: 'low',
            weightMultiplier: 1.0,
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3,
          },
        ],
        bomStations: {
          rainfall: '066062',
          waterTemp: 'IDO71000/IDO71000_60.json',
          swell: 'IDO71000/IDO71000_60.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.255, -33.915],
          [151.265, -33.915],
          [151.265, -33.955],
          [151.255, -33.955],
          [151.255, -33.915],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'cronulla',
        name: 'Cronulla',
        description: 'Cronulla Beach and surrounding areas',
        bullSharkRisk: 'moderate', // Near Port Hacking entrance
        locationType: 'beach',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'occasional',
            incidentHistory: 'moderate',
            weightMultiplier: 0.9, // Near Port Hacking - some estuarine influence
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.4, // Rare in Sydney, slightly more common further south
          },
          {
            type: 'bronze-whaler',
            likelihood: 'common',
            incidentHistory: 'low',
            weightMultiplier: 1.0,
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3,
          },
        ],
        bomStations: {
          rainfall: '066062',
          waterTemp: 'IDO71000/IDO71000_60.json',
          swell: 'IDO71000/IDO71000_60.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.145, -34.045],
          [151.160, -34.045],
          [151.160, -34.065],
          [151.145, -34.065],
          [151.145, -34.045],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'palm-beach',
        name: 'Palm Beach',
        description: 'Palm Beach and northern beaches',
        bullSharkRisk: 'low', // Open ocean beaches
        locationType: 'beach',
        speciesProfiles: [
          {
            type: 'bull-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3, // Far from estuaries
          },
          {
            type: 'white-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.3, // Rare in Sydney region
          },
          {
            type: 'bronze-whaler',
            likelihood: 'common',
            incidentHistory: 'low',
            weightMultiplier: 1.0,
          },
          {
            type: 'tiger-shark',
            likelihood: 'rare',
            incidentHistory: 'low',
            weightMultiplier: 0.25,
          },
        ],
        bomStations: {
          rainfall: '066062',
          waterTemp: 'IDO71000/IDO71000_60.json',
          swell: 'IDO71000/IDO71000_60.json',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.315, -33.595],
          [151.330, -33.595],
          [151.330, -33.610],
          [151.315, -33.610],
          [151.315, -33.595],
        ]],
      },
    },
  ],
};
