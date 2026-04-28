'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CircleRiskMap from '@/components/CircleRiskMap';
import RegionSelector from '@/components/RegionSelector';
import { Region } from '@/config/regions';
import { RiskResult, ZoneRiskResult } from '@/lib/types';

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
  const safest = useMemo(() => [...zoneRisks].sort((a, b) => a.score - b.score).slice(0, 5), [zoneRisks]);
  const highest = useMemo(() => [...zoneRisks].sort((a, b) => b.score - a.score).slice(0, 5), [zoneRisks]);
  const topSpecies = (selected?.bySpecies || overallRisk.bySpecies || []).slice().sort((a, b) => b.score - a.score);

  const riskTone = (score: number) => {
    if (score >= 81) return 'Severe';
    if (score >= 61) return 'High';
    if (score >= 31) return 'Moderate';
    return 'Low';
  };

  const statusLabel = dataStatus === 'live' ? 'Live' : dataStatus === 'delayed' ? 'Delayed' : 'Partial';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-lg font-semibold text-slate-900">Live Shark Risk</p>
            <p className="text-xs text-slate-500">Risk by location</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 md:inline">
              {statusLabel}
            </span>
            <RegionSelector currentRegion={regionId} onRegionChange={(id) => (window.location.href = `/?region=${id}`)} />
            <Link className="hidden text-sm text-slate-600 hover:text-slate-900 md:inline" href="/how-it-works">
              Methodology
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Current region · {regionName}</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Where is safer to swim right now?</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Use the map first. Risk changes by beach and waterway. Select a location to see risk score, active factors, species relevance,
            and practical guidance.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Regional risk: {riskTone(overallRisk.score)}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Score: {overallRisk.score}/100</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Confidence: {overallRisk.confidence}</span>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="mb-2 px-2">
              <p className="text-sm font-medium text-slate-900">Location risk map</p>
              <p className="text-xs text-slate-500">Select any marker to inspect local risk profile.</p>
            </div>
            <CircleRiskMap
              zoneRisks={zoneRisks}
              regionConfig={regionConfig}
              selectedZoneId={selectedZoneId || undefined}
              onZoneSelect={setSelectedZoneId}
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">{selected ? selected.zoneName : 'Select a location'}</p>
              {selected ? (
                <>
                  <p className="mt-1 text-sm text-slate-600">
                    {riskTone(selected.score)} risk · {selected.score}/100 · Confidence {selected.confidence}
                  </p>
                  <p className="mt-3 text-sm text-slate-700">{selected.guidance}</p>
                  <div className="mt-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active factors</p>
                    <ul className="mt-1 space-y-1 text-sm text-slate-700">
                      {selected.explanation.conditionsMet
                        .filter((c) => c.met)
                        .slice(0, 4)
                        .map((c) => (
                          <li key={c.name}>• {c.name}</li>
                        ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-600">Select a beach or waterway marker to view score, factors and guidance.</p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Lower-risk swimming profile</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {safest.map((z) => (
                  <li key={z.zoneId} className="flex justify-between">
                    <span>{z.zoneName}</span>
                    <span className="tabular-nums text-slate-500">{z.score}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Elevated-risk environments</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {highest.map((z) => (
                  <li key={z.zoneId} className="flex justify-between">
                    <span>{z.zoneName}</span>
                    <span className="tabular-nums text-slate-500">{z.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Environmental risk factors</p>
            <p className="mt-1 text-xs text-slate-500">
              Score reflects alignment between current conditions and known shark activity patterns.
            </p>
            <div className="mt-3 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="pb-2 font-medium">Signal</th>
                    <th className="pb-2 font-medium">State</th>
                    <th className="pb-2 font-medium">Influence</th>
                  </tr>
                </thead>
                <tbody>
                  {(selected || overallRisk).explanation.conditionsMet.map((c) => {
                    const unknown = c.value === null || c.value === undefined;
                    const influence = unknown ? 'Data unavailable' : c.met ? (c.weight >= 10 ? 'Contributing' : 'Minor') : 'Not contributing';
                    return (
                      <tr key={c.name} className="border-t border-slate-100">
                        <td className="py-2 text-slate-800">{c.name}</td>
                        <td className="py-2 text-slate-600">{unknown ? 'Unavailable' : String(c.value)}</td>
                        <td className="py-2 text-slate-600">{influence}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Species risk profile</p>
            <p className="mt-1 text-xs text-slate-500">
              Species weighting uses regional relevance, habitat alignment, incident history and current conditions.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {topSpecies.map((s) => (
                <li key={s.species} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                  <span className="text-slate-800">{s.species}</span>
                  <span className="tabular-nums text-slate-600">{s.score}/100</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              This is an environmental risk model, not a shark detection system. Always follow lifeguard advice and local signage.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
