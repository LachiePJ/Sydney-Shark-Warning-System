/**
 * Zone Definitions (GeoJSON)
 * Sydney Harbour and surrounding beaches
 */

export interface ZoneProperties {
  id: string;
  name: string;
  description: string;
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
