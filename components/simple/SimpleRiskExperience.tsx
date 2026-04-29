'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CircleRiskMap from '@/components/CircleRiskMap';
import RegionSelector from '@/components/RegionSelector';
import NodeStrategyBranding from '@/components/NodeStrategyBranding';
import { BrandingNodeLogo, HeaderSharkIcon } from '@/components/HeaderIcons';
import { Region } from '@/config/regions';
import { ZoneRiskResult } from '@/lib/types';
import { riskApp, RISK_SCORE_BAR_GRADIENT } from '@/lib/risk-app-ui';

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
  const activeSignals = signalRows.filter((c) => c.met && c.value !== null && c.value !== undefined);
  const missingSignals = signalRows.filter((c) => c.value === null || c.value === undefined).length;

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
    <div className={riskApp.pageBg}>
      <header className={riskApp.header}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <HeaderSharkIcon theme="light" />
            <div className="min-w-0">
              <p className={riskApp.brandTitle}>Live Shark Risk</p>
              <p className={riskApp.brandKicker}>Real-time waterways risk assessment</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:inline">Location</span>
            <RegionSelector
              currentRegion={regionId}
              onRegionChange={(id) => (window.location.href = `/?region=${id}`)}
              theme="light"
            />
            <Link className={riskApp.navLink} href="/how-it-works">
              Methodology
            </Link>
            <a
              href="https://www.nodestrategy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden px-1 py-1 hover:opacity-80 md:block"
              aria-label="Node Strategy"
            >
              <BrandingNodeLogo />
            </a>
          </div>
        </div>
      </header>

      <main className={riskApp.main}>
        <section className="grid items-stretch gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className={`${riskApp.card} ${riskApp.cardPadSm}`}>
            <div className="mb-2 px-1">
              <p className={riskApp.sectionTitle}>Risk By Location</p>
              <p className={`mt-0.5 ${riskApp.bodySm}`}>Click on a specific location to view local risk details.</p>
            </div>
            <CircleRiskMap
              zoneRisks={zoneRisks}
              regionConfig={regionConfig}
              selectedZoneId={selectedZoneId || undefined}
              onZoneSelect={setSelectedZoneId}
            />
          </div>

          <div className={`${riskApp.card} ${riskApp.cardPad} flex flex-col`}>
            <div className="flex items-start justify-between gap-2">
              <p className={riskApp.sectionKicker}>Overall assessment</p>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${dataStatus === 'live' ? 'bg-emerald-500' : dataStatus === 'delayed' ? 'bg-amber-500' : 'bg-orange-500'} ${dataStatus === 'live' ? 'animate-pulse' : ''}`}
                  />
                  <span className="text-xs font-medium text-slate-700">{statusLabel}</span>
                  <span className="text-xs text-slate-500">
                    {updatedAt.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
            <h1 className={`mt-1 ${riskApp.pageHeadline}`}>{regionName} risk snapshot</h1>
            <p className={`mt-2 ${riskApp.body}`}>{overviewCopy}</p>
            <p className={`mt-2 ${riskApp.body}`}>
              Overall risk is <span className="font-semibold text-slate-900">{riskTone(overallRisk.score).label}</span>. Most high risk
              species: <span className="font-semibold text-slate-900">{primarySpecies?.species || 'Bull Shark'}.</span>
            </p>

            <div className={`mt-4 ${riskApp.inset} ${riskApp.insetPad}`}>
              <div className="flex items-center justify-between gap-2">
                <p className={riskApp.sectionKicker}>Score</p>
                <span className={`${riskApp.bodySm} capitalize`}>{overallRisk.confidence} confidence</span>
              </div>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-3xl font-semibold tabular-nums text-slate-900">{overallRisk.score}</span>
                <span className="pb-1 text-sm text-slate-500">/100</span>
              </div>

              <div className="relative mt-3 h-3.5 overflow-hidden rounded-full border border-slate-200/90 shadow-inner">
                <div className="absolute inset-0" style={{ background: RISK_SCORE_BAR_GRADIENT }} aria-hidden />
                <div
                  className="absolute inset-y-0 w-px -translate-x-1/2 bg-slate-950/90"
                  style={{ left: `${Math.min(100, Math.max(0, overallRisk.score))}%` }}
                  aria-hidden
                />
                <div
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-900 shadow-md ring-1 ring-slate-900/10"
                  style={{ left: `${Math.min(100, Math.max(0, overallRisk.score))}%` }}
                  title={`Score ${overallRisk.score}`}
                />
              </div>
              <div className="mt-1.5 grid grid-cols-4 gap-1 text-[11px] font-medium text-slate-500">
                {scoreBarSegments.map((s) => (
                  <span key={s.label} className="text-center first:text-left last:text-right">
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            <div className={`mt-4 grid flex-1 gap-3 md:grid-cols-2 ${riskApp.inset} ${riskApp.insetPad}`}>
              <div>
                <p className={`${riskApp.sectionKicker} mb-1.5`}>How This Works</p>
                <p className={riskApp.body}>
                  This score combines live weather and ocean data with species behavior research, then adjusts for local environment type.
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs text-slate-600">
                  <li>Live conditions are converted into model signals.</li>
                  <li>Signals are weighted per species and location type.</li>
                  <li>Final score is a risk context indicator, not detection.</li>
                </ul>
                <Link href="/how-it-works" className="mt-3 inline-flex text-xs font-semibold text-slate-800 underline underline-offset-2 hover:text-slate-950">
                  View detailed methodology
                </Link>
              </div>
              <div>
                <p className={`${riskApp.sectionKicker} mb-1.5`}>Signals snapshot</p>
                <p className={riskApp.body}>
                  <span className="font-semibold text-slate-900">{activeSignals.length}</span> of{' '}
                  <span className="font-semibold text-slate-900">{signalRows.length}</span> signals are active
                  {selected ? ` for ${selected.zoneName}` : ' for this region'}.
                </p>
                <p className={`mt-2 ${riskApp.bodySm}`}>
                  {missingSignals > 0
                    ? `${missingSignals} signal${missingSignals === 1 ? '' : 's'} still awaiting a value from source feeds.`
                    : 'All listed signals have a value for this run.'}
                </p>
                {activeSignals.length > 0 && (
                  <ul className="mt-2 space-y-1.5 border-t border-slate-200/70 pt-2">
                    {activeSignals.slice(0, 3).map((c) => (
                      <li key={c.name} className="flex justify-between gap-2 text-xs text-slate-600">
                        <span className="font-medium text-slate-800">{c.name}</span>
                        <span className="shrink-0 tabular-nums text-slate-500">{String(c.value)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {selected && (
              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/90 p-3">
                <p className={`${riskApp.sectionTitle} text-blue-950`}>{selected.zoneName}</p>
                <p className={`mt-1 text-sm text-blue-950`}>
                  {riskTone(selected.score).label} risk · {selected.score}/100 · {getLocationType(selected.zoneId)}
                </p>
                <p className={`mt-1 ${riskApp.bodySm} text-blue-900/90`}>{selected.guidance}</p>
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={`${riskApp.card} ${riskApp.cardPad}`}>
            <p className={riskApp.sectionTitle}>Lower Risk</p>
            <ul className="mt-3 space-y-2">
              {safest.map((z) => (
                <li key={z.zoneId} className={riskApp.listItem}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-800">{z.zoneName}</span>
                    <span className="tabular-nums text-slate-600">{z.score}/100</span>
                  </div>
                  <div className={`mt-1 flex flex-wrap items-center gap-2 ${riskApp.bodySm}`}>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-800">{riskTone(z.score).label}</span>
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

          <div className={`${riskApp.card} ${riskApp.cardPad}`}>
            <p className={riskApp.sectionTitle}>Higher Risk</p>
            <ul className="mt-3 space-y-2">
              {highest.map((z) => (
                <li key={z.zoneId} className={riskApp.listItem}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-800">{z.zoneName}</span>
                    <span className="tabular-nums text-slate-600">{z.score}/100</span>
                  </div>
                  <div className={`mt-1 flex flex-wrap items-center gap-2 ${riskApp.bodySm}`}>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-900">{riskTone(z.score).label}</span>
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
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={`${riskApp.card} ${riskApp.cardPad}`}>
            <p className={riskApp.sectionTitle}>Environmental risk signals</p>
            <p className={`mt-1 ${riskApp.bodySm}`}>Live inputs that feed the model for the location or region you are viewing.</p>
            <div className="mt-3 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className={riskApp.tableHead}>
                    <th className="pb-2 pr-2">Signal</th>
                    <th className="pb-2 pr-2">State</th>
                    <th className="pb-2 pr-2">Status</th>
                    <th className="pb-2">Influence</th>
                  </tr>
                </thead>
                <tbody>
                  {signalRows.map((c) => {
                    const unknown = c.value === null || c.value === undefined;
                    const influence = unknown ? 'Excluded' : c.met ? getInfluence(c.weight) : 'Inactive';
                    const status = unknown ? 'Data unavailable' : c.met ? 'Active' : 'Inactive';
                    return (
                      <tr key={c.name} className="border-t border-slate-100">
                        <td className={`${riskApp.tableCell} text-slate-800`}>{c.name}</td>
                        <td className={riskApp.tableCellMuted}>{unknown ? '—' : String(c.value)}</td>
                        <td className={riskApp.tableCellMuted}>{status}</td>
                        <td className={riskApp.tableCellMuted}>
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

          <div className={`${riskApp.card} ${riskApp.cardPad}`}>
            <p className={riskApp.sectionTitle}>Species relevance model</p>
            <p className={`mt-1 ${riskApp.bodySm}`}>Relative weighting of species for current conditions (not a census of sharks).</p>
            <ul className="mt-3 space-y-2">
              {topSpecies.map((s) => (
                <li key={s.species} className={`${riskApp.listItem} bg-slate-50/80`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-800">{s.species}</span>
                    <span className="tabular-nums text-slate-600">{s.score}/100</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded bg-slate-200/80">
                    <div className="h-full rounded bg-slate-700" style={{ width: `${s.score}%` }} />
                  </div>
                  <p className={`mt-2 ${riskApp.bodySm}`}>
                    {s.species.toLowerCase().includes('bull')
                      ? 'Most active in current harbour and estuary conditions.'
                      : 'Lower activity likelihood in current conditions.'}
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
