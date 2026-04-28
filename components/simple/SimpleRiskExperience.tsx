'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CircleRiskMap from '@/components/CircleRiskMap';
import RegionSelector from '@/components/RegionSelector';
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

  const confidencePct =
    overallRisk.confidence === 'high' ? 92 : overallRisk.confidence === 'medium' ? 68 : 42;

  const postureCopy =
    overallRisk.score >= 61
      ? 'Live environmental signals indicate elevated relative risk in enclosed waterways, with lower-risk profiles concentrated across open, patrolled ocean beaches.'
      : overallRisk.score >= 31
      ? 'Current conditions indicate a moderate regional profile. Relative risk remains lower at open, patrolled beaches than in enclosed harbour and estuary environments.'
      : 'Current signals indicate a comparatively lower regional profile. Standard caution remains essential across all coastal locations.';

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-lg font-semibold text-slate-900">Live Shark Risk</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">Coastal risk intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
              <span className={`h-2 w-2 rounded-full ${dataStatus === 'live' ? 'bg-emerald-500' : dataStatus === 'delayed' ? 'bg-amber-500' : 'bg-orange-500'} ${dataStatus === 'live' ? 'animate-pulse' : ''}`}></span>
              <span className="text-xs font-medium text-slate-700">{statusLabel}</span>
              <span className="text-xs text-slate-500">Updated {updatedAt.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <RegionSelector currentRegion={regionId} onRegionChange={(id) => (window.location.href = `/?region=${id}`)} />
            <Link className="hidden text-sm text-slate-600 hover:text-slate-900 md:inline" href="/how-it-works">
              Methodology
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Current coastal risk posture · {regionName}</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Live risk profile for {regionName} beaches and waterways</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">{postureCopy}</p>
              <p className="mt-3 text-sm text-slate-700">
                Regional risk is currently <span className="font-semibold">{riskTone(overallRisk.score).label}</span>. Current conditions show stronger alignment with
                <span className="font-semibold"> {primarySpecies?.species || 'primary species'} </span>
                activity patterns in harbour, estuary and river-mouth environments.
              </p>
              <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-900">
                <span className="font-semibold">Recommended safety posture:</span> Prefer patrolled open-ocean beaches. Use caution in enclosed or murky waterways,
                particularly after rainfall.
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-slate-500">Regional model output</p>
                <span className="text-xs text-slate-500">{overallRisk.confidence} confidence</span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-semibold tabular-nums text-slate-900">{overallRisk.score}</span>
                <span className="pb-1 text-sm text-slate-500">/100</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: riskTone(overallRisk.score).color }}></span>
                <span className="text-sm font-medium text-slate-700">{riskTone(overallRisk.score).label} risk</span>
              </div>

              <div className="mt-3">
                <div className="flex overflow-hidden rounded-md border border-slate-200">
                  {scoreBarSegments.map((s) => (
                    <div key={s.label} className="h-2 flex-1" style={{ backgroundColor: s.color, opacity: 0.45 }} />
                  ))}
                </div>
                <div className="relative mt-1 h-4">
                  <div className="absolute top-0 h-4 w-0.5 bg-slate-800" style={{ left: `${overallRisk.score}%` }} />
                </div>
                <div className="mt-1 grid grid-cols-4 text-[11px] text-slate-500">
                  {scoreBarSegments.map((s) => (
                    <span key={s.label}>{s.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 px-2">
              <p className="text-sm font-medium text-slate-900">Location risk intelligence</p>
              <p className="text-xs text-slate-500">
                Risk varies by beach exposure, water type and active environmental signals. Select a location to inspect its current profile.
              </p>
            </div>
            <CircleRiskMap
              zoneRisks={zoneRisks}
              regionConfig={regionConfig}
              selectedZoneId={selectedZoneId || undefined}
              onZoneSelect={setSelectedZoneId}
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{selected ? selected.zoneName : 'Select a location'}</p>
              {selected ? (
                <>
                  <p className="mt-1 text-sm text-slate-600">
                    {riskTone(selected.score).label} relative risk · {selected.score}/100 · {getLocationType(selected.zoneId)}
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded bg-slate-100">
                    <div className="h-full" style={{ width: `${selected.score}%`, backgroundColor: riskTone(selected.score).color }} />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active signals</p>
                    <ul className="mt-1 space-y-1 text-sm text-slate-700">
                      {selected.explanation.conditionsMet
                        .filter((c) => c.met)
                        .slice(0, 4)
                        .map((c) => (
                          <li key={c.name}>• {c.name}</li>
                        ))}
                    </ul>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{selected.guidance}</p>
                  <p className="mt-2 text-xs text-slate-500">Model confidence: {selected.confidence}</p>
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-600">
                  Select a beach or waterway to inspect its local risk profile, active signals, species relevance and recommended safety posture.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Lower-risk profiles right now</p>
              <p className="mt-1 text-xs text-slate-500">Lower risk does not mean no risk. These locations currently show weaker alignment with active risk signals.</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
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
              <p className="text-sm font-semibold text-slate-900">Environments requiring caution</p>
              <p className="mt-1 text-xs text-slate-500">
                These environments show stronger alignment with current Bull Shark risk signals, particularly where water is enclosed, brackish or low visibility.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
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
            <p className="mt-1 text-xs text-slate-500">
              These signals show how current conditions align with known shark activity patterns. They do not indicate confirmed shark presence.
            </p>
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
            <p className="mt-1 text-xs text-slate-500">
              Species relevance is weighted by regional likelihood, habitat alignment, incident history and current environmental conditions.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
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
                      ? 'Primary habitat alignment in harbour, estuary and river-mouth systems.'
                      : 'Low current regional and habitat alignment under active conditions.'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Model confidence</p>
            <p className="mt-1 text-xs text-slate-500">
              Confidence reflects data availability, freshness and model completeness. It does not indicate certainty of shark presence or absence.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Overall confidence</p>
                <p className="mt-1 text-lg font-semibold capitalize text-slate-900">{overallRisk.confidence}</p>
                <div className="mt-2 h-1.5 rounded bg-slate-200">
                  <div className="h-full rounded bg-slate-700" style={{ width: `${confidencePct}%` }} />
                </div>
              </div>
              <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Data freshness</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{statusLabel}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Updated {updatedAt.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Signals available</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{signalRows.filter((s) => s.value !== null && s.value !== undefined).length}</p>
              </div>
              <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Signals missing</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{signalRows.filter((s) => s.value === null || s.value === undefined).length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Model flow</p>
            <p className="mt-1 text-xs text-slate-500">Live data → environmental signals → species model → location weighting → risk score → safety posture</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {['Live data', 'Signals', 'Species model', 'Location weighting', 'Risk score', 'Safety posture'].map((step) => (
                <span key={step} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700">
                  {step}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              This is an environmental risk model, not a shark detection system. Always follow lifeguard advice and local signage.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
