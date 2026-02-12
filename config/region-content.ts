/**
 * Region-Specific Content Configuration
 * Dynamic content that changes based on selected region
 */

export interface RegionContent {
  regionId: string;
  displayName: string;
  
  // Popular beaches/locations for safety guidance
  safeBeaches: string[];
  dangerousLocations: string[];
  
  // Region-specific statistics and facts
  dominantSpecies: string;
  dominantSpeciesStats?: string; // e.g., "86% of attacks in harbours"
  
  // Safety guidance
  safestSwimmingAdvice: string;
  highRiskAdvice: string;
  
  // Species relevance descriptions
  speciesRelevance: {
    [key: string]: string; // e.g., "bull-shark": "PRIMARY THREAT - Responsible for..."
  };
}

export const REGION_CONTENT: Record<string, RegionContent> = {
  'sydney': {
    regionId: 'sydney',
    displayName: 'Sydney',
    safeBeaches: ['Bondi', 'Coogee', 'Maroubra', 'Northern Beaches'],
    dangerousLocations: ['Sydney Harbour', 'river mouths', 'estuaries'],
    dominantSpecies: 'Bull Shark',
    dominantSpeciesStats: '86% of attacks occur in harbours/estuaries',
    safestSwimmingAdvice: 'Swim at patrolled open ocean beaches (Bondi, Coogee, Maroubra, Northern Beaches) rather than harbour/estuary locations.',
    highRiskAdvice: 'Avoid swimming in Sydney Harbour, river mouths, and estuaries especially after rainfall.',
    speciesRelevance: {
      'bull-shark': 'PRIMARY THREAT - Responsible for overwhelming majority of Sydney attacks, especially in harbour and river systems. 86% of bites occur in estuaries/freshwater.',
      'white-shark': 'RARE - White Sharks prefer cooler southern Australian waters (Victoria, SA, Tasmania). Extremely uncommon in Sydney region.',
      'bronze-whaler': 'COMMON but LOW DANGER - Frequently present in Sydney surf zones but rarely involved in serious incidents.',
      'tiger-shark': 'RARE - Tiger Sharks prefer warmer northern Australian waters. Uncommon in temperate Sydney.',
    },
  },

  'south-coast-nsw': {
    regionId: 'south-coast-nsw',
    displayName: 'South Coast NSW',
    safeBeaches: ['Wollongong City Beach', 'Shellharbour', 'Jervis Bay beaches'],
    dangerousLocations: ['river mouths', 'Lake Illawarra entrance'],
    dominantSpecies: 'White Shark',
    dominantSpeciesStats: 'Most common large shark species in cooler southern NSW waters',
    safestSwimmingAdvice: 'Swim at patrolled beaches during daylight hours. White Sharks are most active at dawn and dusk.',
    highRiskAdvice: 'Avoid swimming at dawn, dusk, near seal colonies, or in areas with schools of fish.',
    speciesRelevance: {
      'white-shark': 'PRIMARY THREAT - Common in cooler South Coast waters. This region is within their preferred southern Australian range.',
      'bull-shark': 'OCCASIONAL - Present in estuaries and river mouths, especially during warmer months.',
      'bronze-whaler': 'COMMON - Regularly seen but low incident rate.',
      'tiger-shark': 'RARE - Uncommon this far south in temperate waters.',
    },
  },

  'central-coast-nsw': {
    regionId: 'central-coast-nsw',
    displayName: 'Central Coast NSW',
    safeBeaches: ['Terrigal', 'Avoca', 'The Entrance', 'Newcastle Beach'],
    dangerousLocations: ['Hunter River mouth', 'Tuggerah Lakes entrance', 'Newcastle Harbour'],
    dominantSpecies: 'Bull Shark',
    dominantSpeciesStats: 'Frequent in estuaries, particularly Hunter River and lake systems',
    safestSwimmingAdvice: 'Swim at patrolled ocean beaches (Terrigal, Avoca, Newcastle) rather than river/lake entrances.',
    highRiskAdvice: 'Avoid Hunter River, Tuggerah Lakes entrance, and Newcastle Harbour especially after heavy rainfall.',
    speciesRelevance: {
      'bull-shark': 'PRIMARY THREAT - Very common in Hunter River system and lake entrances. Active in estuarine environments.',
      'white-shark': 'OCCASIONAL - Sometimes seen offshore, less common than in southern waters.',
      'bronze-whaler': 'COMMON - Present in surf zones, low danger.',
      'tiger-shark': 'RARE - Uncommon in this temperate region.',
    },
  },

  'mid-north-coast-nsw': {
    regionId: 'mid-north-coast-nsw',
    displayName: 'Mid North Coast NSW',
    safeBeaches: ['Park Beach (Coffs)', 'Town Beach (Port Mac)', 'Sawtell'],
    dangerousLocations: ['Hastings River mouth', 'Bellinger River', 'Nambucca River'],
    dominantSpecies: 'Bull Shark',
    dominantSpeciesStats: 'Common in river systems with increasing Tiger Shark presence',
    safestSwimmingAdvice: 'Swim at patrolled ocean beaches. This region sees both Bull and Tiger Sharks.',
    highRiskAdvice: 'Avoid river mouths and estuaries, especially Hastings River after rainfall.',
    speciesRelevance: {
      'bull-shark': 'COMMON - Very active in river systems (Hastings, Bellinger, Nambucca).',
      'tiger-shark': 'OCCASIONAL - Increasing presence as water warms. More common than in southern NSW.',
      'white-shark': 'OCCASIONAL - Less common than southern waters but still present.',
      'bronze-whaler': 'COMMON - Regular in surf zones.',
    },
  },

  'north-coast-nsw': {
    regionId: 'north-coast-nsw',
    displayName: 'North Coast NSW',
    safeBeaches: ['Byron Bay Main Beach', 'Wategos', 'Lennox Head'],
    dangerousLocations: ['Brunswick River', 'Richmond River (Ballina)', 'river mouths'],
    dominantSpecies: 'Bull Shark',
    dominantSpeciesStats: 'High Bull Shark activity with notable White Shark incidents at Ballina',
    safestSwimmingAdvice: 'Swim at patrolled beaches. This region has experienced both Bull and White Shark incidents.',
    highRiskAdvice: 'Avoid Brunswick River, Richmond River (Ballina), and Seven Mile Beach. High Bull Shark activity in river systems.',
    speciesRelevance: {
      'bull-shark': 'VERY COMMON - Extremely active in Richmond and Brunswick River systems. Major threat.',
      'white-shark': 'OCCASIONAL - Notable incidents at Ballina. More common than central NSW.',
      'tiger-shark': 'OCCASIONAL - Warmer waters support Tiger Shark presence.',
      'bronze-whaler': 'COMMON - Regular presence in surf.',
    },
  },

  'brisbane-sunshine-coast': {
    regionId: 'brisbane-sunshine-coast',
    displayName: 'Brisbane & Sunshine Coast',
    safeBeaches: ['Noosa Main Beach', 'Mooloolaba', 'Caloundra', 'patrolled beaches'],
    dangerousLocations: ['Moreton Bay', 'Brisbane River', 'canals', 'river mouths'],
    dominantSpecies: 'Bull Shark',
    dominantSpeciesStats: 'Bull and Tiger Sharks both common in warmer Queensland waters',
    safestSwimmingAdvice: 'Swim at patrolled ocean beaches. Avoid Moreton Bay, Brisbane River, and canal systems.',
    highRiskAdvice: 'Bull Sharks dominate river/bay systems. Tiger Sharks more common than southern regions due to warmer water.',
    speciesRelevance: {
      'bull-shark': 'VERY COMMON - Extremely active in Brisbane River, Moreton Bay, and canal systems. Major threat.',
      'tiger-shark': 'COMMON - Warmer tropical waters support significant Tiger Shark populations.',
      'white-shark': 'RARE - Uncommon in warmer Queensland waters.',
      'bronze-whaler': 'OCCASIONAL - Present but less common than bull/tiger sharks.',
    },
  },

  'melbourne': {
    regionId: 'melbourne',
    displayName: 'Melbourne',
    safeBeaches: ['St Kilda', 'Brighton', 'Port Phillip Bay beaches'],
    dangerousLocations: ['Port Phillip Bay heads', 'offshore areas', 'seal colonies'],
    dominantSpecies: 'White Shark',
    dominantSpeciesStats: 'White Sharks common in southern Victorian waters',
    safestSwimmingAdvice: 'Swim at patrolled Port Phillip Bay beaches. White Sharks prefer cooler southern waters.',
    highRiskAdvice: 'Avoid swimming near seal colonies, Port Phillip Bay heads, and offshore areas. White Sharks most active at dawn/dusk.',
    speciesRelevance: {
      'white-shark': 'PRIMARY THREAT - Common in southern Victorian waters. This is core White Shark habitat.',
      'bronze-whaler': 'OCCASIONAL - Present in coastal areas.',
      'bull-shark': 'RARE - Uncommon in cooler Melbourne waters.',
      'tiger-shark': 'VERY RARE - Virtually absent from cool southern waters.',
    },
  },
};

export function getRegionContent(regionId: string): RegionContent {
  return REGION_CONTENT[regionId] || REGION_CONTENT['sydney'];
}
