'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CircleRiskMap from '@/components/CircleRiskMap';
import RegionSelector from '@/components/RegionSelector';
import NodeStrategyBranding from '@/components/NodeStrategyBranding';
import { HeaderNodeLogo } from '@/components/HeaderIcons';
import { Region } from '@/config/regions';
import { ZoneRiskResult } from '@/lib/types';

interface SimpleRiskExperienceProps {
  regionId: string;
  regionName: string;
  regionConfig: Region;
  dataStatus: 'live' | 'delayed' | 'partial';
  zoneRisks: ZoneRiskResult[];
  overallRisk: ZoneRiskResult;
}

export default function SimpleRiskExperience({
  regionId,
  regionName,
  regionConfig,
  dataStatus,
  zoneRisks,
  overallRisk,
}: SimpleRiskExperienceProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const selected = useMemo(
    () => zoneRisks.find((z) => z.zoneId === selectedZoneId) || null,
    [zoneRisks, selectedZoneId]
  );
  const selectedRisk = selected || overallRisk;
  const safest = useMemo(() => [...zoneRisks].sort((a, b) => a.score - b.score).slice(0, 5), [zoneRisks]);
  const highest = useMemo(() => [...zoneRisks].sort((a, b) => b.score - a.score).slice(0, 5), [zoneRisks]);
  const topSpecies = (selectedRisk.bySpecies || []).slice().sort((a, b) => b.score - a.score);
  const updatedAt = new Date(overallRisk.timestamp);
  const zoneMetaById = useMemo(() => {
    const map = new Map<string, { locationType?: string }>();
    regionConfig.zones.features.forEach((f) => map.set(f.properties.id, { locationType: f.properties.locationType }));
    return map;
  }, [regionConfig.zones.features]);

  const riskTone = (score: number) => {
    if (score >= 81) return { label: 'Severe', color: '#dc2626' };
    if (score >= 61) return { label: 'High', color: '#ea580c' };
    if (score >= 31) return { label: 'Moderate', color: '#d97706' };
    return { label: 'Low', color: '#059669' };
  };

  const statusLabel =
    dataStatus === 'live' ? 'Live data' : dataStatus === 'delayed' ? 'Delayed data' : 'Partial data';

  const overviewCopy =
    overallRisk.score >= 61
      ? 'Conditions are elevated in enclosed waterways. Open, patrolled ocean beaches are generally lower risk right now.'
      : overallRisk.score >= 31
      ? 'Conditions are mixed. Open, patrolled beaches are generally lower risk than enclosed harbour and estuary areas.'
      : 'Conditions are calmer right now. Use normal caution across all coastal locations.';

  const primarySpecies = topSpecies[0];

  const scoreBarSegments = [
    { from: 0, to: 30, label: 'Low', color: '#10b981' },
    { from: 31, to: 60, label: 'Moderate', color: '#f59e0b' },
    { from: 61, to: 80, label: 'High', color: '#f97316' },
    { from: 81, to: 100, label: 'Severe', color: '#ef4444' },
  ];

  const signalRows = selectedRisk.explanation.conditionsMet;

  const getInfluence = (weight: number) => {
    if (weight >= 20) return 'High';
    if (weight >= 10) return 'Moderate';
    return 'Minor';
  };

  const getLocationType = (zoneId: string) =>
    (zoneMetaById.get(zoneId)?.locationType || 'beach').replace('-', ' ');

  const listReason = (zoneId: string) => {
    const type = getLocationType(zoneId).toLowerCase();
    if (type.includes('harbour') || type.includes('estuary') || type.includes('river')) {
      return 'enclosed waterway exposure';
    }
    return 'open ocean profile';
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
          <div>
            <p className="text-lg font-semibold text-slate-900">Live Shark Risk</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">{regionName}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
              <span className={`h-2 w-2 rounded-full ${dataStatus === 'live' ? 'bg-emerald-500' : dataStatus === 'delayed' ? 'bg-amber-500' : 'bg-orange-500'} ${dataStatus === 'live' ? 'animate-pulse' : ''}`}></span>
              <span className="text-xs font-medium text-slate-700">{statusLabel}</span>
              <span className="text-xs text-slate-500">Updated {updatedAt.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <span className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 md:inline">Location</span>
            <RegionSelector currentRegion={regionId} onRegionChange={(id) => (window.location.href = `/?region=${id}`)} />
            <Link className="hidden text-sm text-slate-600 hover:text-slate-900 md:inline" href="/how-it-works">
              Method
            </Link>
            <a
              href="https://www.nodestrategy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50 md:block"
              aria-label="Node Strategy"
            >
              <HeaderNodeLogo />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
        <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 px-2">
              <p className="text-sm font-medium text-slate-900">Map</p>
              <p className="text-xs text-slate-500">Click a beach or waterway to view local risk details.</p>
            </div>
            <CircleRiskMap
              zoneRisks={zoneRisks}
              regionConfig={regionConfig}
              selectedZoneId={selectedZoneId || undefined}
              onZoneSelect={setSelectedZoneId}
            />
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Overall assessment</p>
              <h1 className="mt-1 text-xl font-semibold text-slate-900">{regionName} risk snapshot</h1>
              <p className="mt-1 text-sm text-slate-600">{overviewCopy}</p>
              <p className="mt-2 text-sm text-slate-700">
                Regional risk is <span className="font-semibold">{riskTone(overallRisk.score).label}</span>. Most aligned species:
                <span className="font-semibold"> {primarySpecies?.species || 'Primary species'}.</span>
              </p>
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
                  <span className="text-xs text-slate-500">{overallRisk.confidence} confidence</span>
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-semibold tabular-nums text-slate-900">{overallRisk.score}</span>
                  <span className="pb-1 text-sm text-slate-500">/100</span>
                </div>
                <div className="mt-2 flex overflow-hidden rounded-md border border-slate-200">
                  {scoreBarSegments.map((s) => (
                    <div key={s.label} className="h-2 flex-1" style={{ backgroundColor: s.color, opacity: 0.45 }} />
                  ))}
                </div>
              </div>
              {selected && (
                <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <p className="text-sm font-semibold text-blue-900">{selected.zoneName}</p>
                  <p className="text-sm text-blue-900">
                    {riskTone(selected.score).label} risk · {selected.score}/100 · {getLocationType(selected.zoneId)}
                  </p>
                  <p className="mt-1 text-xs text-blue-800">{selected.guidance}</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Lower Risk</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {safest.map((z) => (
                  <li key={z.zoneId} className="rounded-md border border-slate-100 p-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">{z.zoneName}</span>
                      <span className="tabular-nums text-slate-600">{z.score}/100</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">{riskTone(z.score).label}</span>
                      <span>{getLocationType(z.zoneId)}</span>
                      <span>· {listReason(z.zoneId)}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded bg-slate-100">
                      <div className="h-full rounded" style={{ width: `${z.score}%`, backgroundColor: riskTone(z.score).color }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Higher Risk</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {highest.map((z) => (
                  <li key={z.zoneId} className="rounded-md border border-slate-100 p-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">{z.zoneName}</span>
                      <span className="tabular-nums text-slate-600">{z.score}/100</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">{riskTone(z.score).label}</span>
                      <span>{getLocationType(z.zoneId)}</span>
                      <span>· {listReason(z.zoneId)}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded bg-slate-100">
                      <div className="h-full rounded" style={{ width: `${z.score}%`, backgroundColor: riskTone(z.score).color }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Environmental risk signals</p>
            <div className="mt-3 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="pb-2 font-medium">Signal</th>
                    <th className="pb-2 font-medium">State</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Influence</th>
                  </tr>
                </thead>
                <tbody>
                  {signalRows.map((c) => {
                    const unknown = c.value === null || c.value === undefined;
                    const influence = unknown ? 'Excluded' : c.met ? getInfluence(c.weight) : 'Inactive';
                    const status = unknown ? 'Data unavailable' : c.met ? 'Active' : 'Inactive';
                    return (
                      <tr key={c.name} className="border-t border-slate-100">
                        <td className="py-2 text-slate-800">{c.name}</td>
                        <td className="py-2 text-slate-600">{unknown ? 'Awaiting source update' : String(c.value)}</td>
                        <td className="py-2 text-slate-600">{status}</td>
                        <td className="py-2 text-slate-600">
                          <div className="flex items-center gap-2">
                            <span>{influence}</span>
                            {!unknown && (
                              <span className="inline-block h-1.5 w-14 rounded bg-slate-100">
                                <span
                                  className="block h-1.5 rounded bg-slate-500"
                                  style={{
                                    width: `${Math.max(15, Math.min(100, (c.weight / 35) * 100))}%`,
                                  }}
                                />
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Species relevance model</p>
            <ul className="mt-2 space-y-2 text-sm">
              {topSpecies.map((s) => (
                <li key={s.species} className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800">{s.species}</span>
                    <span className="tabular-nums text-slate-600">{s.score}/100</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded bg-slate-100">
                    <div className="h-full rounded bg-slate-600" style={{ width: `${s.score}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {s.species.toLowerCase().includes('bull')
                      ? 'Most aligned with current harbour and estuary conditions.'
                      : 'Lower alignment with current conditions.'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <NodeStrategyBranding />
    </div>
  );
}
