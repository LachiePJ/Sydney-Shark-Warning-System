import { DataService } from '@/lib/data-service';
import { getRegion } from '@/config/regions';
import RegionAwareApp from '@/components/RegionAwareApp';
import SimpleRiskExperience from '@/components/simple/SimpleRiskExperience';

export const revalidate = 1800; // 30 minutes

interface HomeProps {
  searchParams: { region?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const regionId = searchParams.region || 'sydney';
  const regionConfig = getRegion(regionId);
  const regionName = regionConfig?.displayName || 'Sydney';
  
  const dataService = new DataService(regionId);
  
  // Auto-refresh stale data
  const dataAge = dataService.getCacheAge();
  const THIRTY_MINUTES = 30 * 60 * 1000;
  
  let dataStatus: 'live' | 'delayed' | 'partial' = 'live';
  
  if (dataAge === null || dataAge > THIRTY_MINUTES) {
    try {
      await dataService.refreshData();
    } catch (error) {
      console.error('Auto-refresh failed:', error);
      dataStatus = 'partial';
    }
  }
  
  // Calculate zone risks (location-based)
  const zoneRisks = await dataService.calculateAllZoneRisks();
  
  // Context score only; primary UX remains location-specific
  const highestRisk = zoneRisks.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  return (
    <RegionAwareApp initialRegion={regionId}>
      <SimpleRiskExperience
        regionId={regionId}
        regionName={regionName}
        regionConfig={regionConfig!}
        dataStatus={dataStatus}
        zoneRisks={zoneRisks}
        overallRisk={highestRisk}
      />
    </RegionAwareApp>
  );
}
