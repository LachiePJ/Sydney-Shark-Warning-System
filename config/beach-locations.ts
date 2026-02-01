/**
 * Beach and water locations for risk mapping
 * Each location renders as a semi-transparent circle
 */

export interface BeachLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  radius: number; // in meters
  type: 'beach' | 'harbour' | 'bay';
  bullSharkRisk?: 'high' | 'moderate' | 'low'; // Bull Shark preference (estuarine vs open ocean)
}

export const BEACH_LOCATIONS: BeachLocation[] = [
  // Northern Beaches (Open ocean - lower Bull Shark risk)
  { id: 'palm-beach', name: 'Palm Beach', lat: -33.5965, lon: 151.3242, radius: 800, type: 'beach', bullSharkRisk: 'low' },
  { id: 'whale-beach', name: 'Whale Beach', lat: -33.6055, lon: 151.3295, radius: 500, type: 'beach', bullSharkRisk: 'low' },
  { id: 'avalon', name: 'Avalon Beach', lat: -33.6340, lon: 151.3315, radius: 700, type: 'beach', bullSharkRisk: 'low' },
  { id: 'bilgola', name: 'Bilgola Beach', lat: -33.6485, lon: 151.3320, radius: 500, type: 'beach', bullSharkRisk: 'low' },
  { id: 'newport', name: 'Newport Beach', lat: -33.6575, lon: 151.3185, radius: 600, type: 'beach', bullSharkRisk: 'low' },
  { id: 'mona-vale', name: 'Mona Vale', lat: -33.6770, lon: 151.3050, radius: 800, type: 'beach', bullSharkRisk: 'low' },
  { id: 'warriewood', name: 'Warriewood Beach', lat: -33.6930, lon: 151.2985, radius: 600, type: 'beach', bullSharkRisk: 'low' },
  { id: 'turimetta', name: 'Turimetta Beach', lat: -33.7055, lon: 151.2975, radius: 400, type: 'beach', bullSharkRisk: 'low' },
  { id: 'narrabeen', name: 'Narrabeen Beach', lat: -33.7115, lon: 151.2980, radius: 900, type: 'beach', bullSharkRisk: 'low' },
  { id: 'collaroy', name: 'Collaroy Beach', lat: -33.7325, lon: 151.3015, radius: 800, type: 'beach', bullSharkRisk: 'low' },
  { id: 'dee-why', name: 'Dee Why Beach', lat: -33.7535, lon: 151.2985, radius: 700, type: 'beach', bullSharkRisk: 'low' },
  { id: 'curl-curl', name: 'Curl Curl Beach', lat: -33.7695, lon: 151.2945, radius: 500, type: 'beach', bullSharkRisk: 'low' },
  { id: 'freshwater', name: 'Freshwater Beach', lat: -33.7805, lon: 151.2905, radius: 500, type: 'beach', bullSharkRisk: 'low' },
  { id: 'manly', name: 'Manly Beach', lat: -33.7969, lon: 151.2890, radius: 700, type: 'beach', bullSharkRisk: 'moderate' }, // Near harbour entrance
  { id: 'shelly', name: 'Shelly Beach', lat: -33.7975, lon: 151.2925, radius: 300, type: 'bay', bullSharkRisk: 'moderate' },
  
  // Sydney Harbour (HIGH Bull Shark risk - estuarine environment)
  { id: 'balmoral', name: 'Balmoral Beach', lat: -33.8275, lon: 151.2555, radius: 500, type: 'harbour', bullSharkRisk: 'high' },
  { id: 'chinamans', name: 'Chinamans Beach', lat: -33.8125, lon: 151.2445, radius: 300, type: 'harbour', bullSharkRisk: 'high' },
  { id: 'camp-cove', name: 'Camp Cove', lat: -33.8385, lon: 151.2805, radius: 300, type: 'harbour', bullSharkRisk: 'high' },
  { id: 'watsons-bay', name: 'Watsons Bay', lat: -33.8415, lon: 151.2825, radius: 400, type: 'harbour', bullSharkRisk: 'high' },
  { id: 'shark-beach', name: 'Shark Beach', lat: -33.8515, lon: 151.2715, radius: 250, type: 'harbour', bullSharkRisk: 'high' },
  { id: 'harbour-inner', name: 'Sydney Harbour (Inner)', lat: -33.8568, lon: 151.2153, radius: 2000, type: 'harbour', bullSharkRisk: 'high' },
  
  // Eastern Beaches (Open ocean - lower Bull Shark risk)
  { id: 'bondi', name: 'Bondi Beach', lat: -33.8915, lon: 151.2767, radius: 900, type: 'beach', bullSharkRisk: 'low' },
  { id: 'tamarama', name: 'Tamarama Beach', lat: -33.8985, lon: 151.2735, radius: 400, type: 'beach', bullSharkRisk: 'low' },
  { id: 'bronte', name: 'Bronte Beach', lat: -33.9060, lon: 151.2695, radius: 500, type: 'beach', bullSharkRisk: 'low' },
  { id: 'clovelly', name: 'Clovelly Beach', lat: -33.9155, lon: 151.2635, radius: 300, type: 'bay', bullSharkRisk: 'low' },
  { id: 'coogee', name: 'Coogee Beach', lat: -33.9215, lon: 151.2585, radius: 700, type: 'beach', bullSharkRisk: 'low' },
  { id: 'maroubra', name: 'Maroubra Beach', lat: -33.9505, lon: 151.2590, radius: 1000, type: 'beach', bullSharkRisk: 'low' },
  { id: 'malabar', name: 'Malabar Beach', lat: -33.9625, lon: 151.2545, radius: 400, type: 'beach', bullSharkRisk: 'low' },
  
  // Southern Beaches (Bays = moderate, near Botany Bay = moderate)
  { id: 'la-perouse', name: 'La Perouse', lat: -33.9885, lon: 151.2305, radius: 500, type: 'bay', bullSharkRisk: 'moderate' }, // Near Botany Bay entrance
  { id: 'little-bay', name: 'Little Bay', lat: -33.9765, lon: 151.2495, radius: 400, type: 'bay', bullSharkRisk: 'moderate' },
  { id: 'cronulla', name: 'Cronulla Beach', lat: -34.0576, lon: 151.1532, radius: 1200, type: 'beach', bullSharkRisk: 'moderate' }, // Near Port Hacking entrance
  { id: 'wanda', name: 'Wanda Beach', lat: -34.0485, lon: 151.1475, radius: 600, type: 'beach', bullSharkRisk: 'moderate' },
  { id: 'elouera', name: 'Elouera Beach', lat: -34.0415, lon: 151.1445, radius: 500, type: 'beach', bullSharkRisk: 'moderate' },
  { id: 'north-cronulla', name: 'North Cronulla', lat: -34.0495, lon: 151.1505, radius: 500, type: 'beach', bullSharkRisk: 'moderate' },
];

// Map beach locations to data zones
export const BEACH_TO_ZONE_MAP: Record<string, string> = {
  'palm-beach': 'palm-beach',
  'whale-beach': 'palm-beach',
  'avalon': 'palm-beach',
  'bilgola': 'palm-beach',
  'newport': 'palm-beach',
  'mona-vale': 'palm-beach',
  'warriewood': 'manly',
  'turimetta': 'manly',
  'narrabeen': 'manly',
  'collaroy': 'manly',
  'dee-why': 'manly',
  'curl-curl': 'manly',
  'freshwater': 'manly',
  'manly': 'manly',
  'shelly': 'manly',
  'balmoral': 'sydney-harbour-outer',
  'chinamans': 'sydney-harbour-outer',
  'camp-cove': 'sydney-harbour-outer',
  'watsons-bay': 'sydney-harbour-outer',
  'shark-beach': 'sydney-harbour-outer',
  'harbour-inner': 'sydney-harbour-inner',
  'bondi': 'bondi-bronte',
  'tamarama': 'bondi-bronte',
  'bronte': 'bondi-bronte',
  'clovelly': 'bondi-bronte',
  'coogee': 'coogee-maroubra',
  'maroubra': 'coogee-maroubra',
  'malabar': 'coogee-maroubra',
  'la-perouse': 'coogee-maroubra',
  'little-bay': 'coogee-maroubra',
  'cronulla': 'cronulla',
  'wanda': 'cronulla',
  'elouera': 'cronulla',
  'north-cronulla': 'cronulla',
};
