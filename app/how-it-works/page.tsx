import Link from 'next/link';
import sources from '@/data/sources.json';
import { riskApp } from '@/lib/risk-app-ui';
import { HeaderSharkIcon } from '@/components/HeaderIcons';

const methodology = sources.methodology as {
  overview: string;
  speciesModels: Array<{
    species: string;
    habitat: string;
    sydneyRelevance: string;
    riskFactors: Record<string, { weight?: string; threshold?: string; rationale?: string; bonus?: string; penalty?: string; condition?: string }>;
  }>;
  overallScoring: string;
  locationGuidance: string;
};

export default function HowItWorksPage() {
  const papers = sources.researchPapers.slice(0, 6);
  const provenance = sources.dataProvenance;

  return (
    <div className={riskApp.pageBg}>
      <header className={riskApp.header}>
        <div className={riskApp.headerInner}>
          <Link href="/" className="flex min-w-0 items-center gap-3 hover:opacity-90">
            <HeaderSharkIcon theme="light" />
            <div className="min-w-0">
              <p className={riskApp.brandTitle}>Live Shark Risk</p>
              <p className={riskApp.brandKicker}>Methodology</p>
            </div>
          </Link>
          <Link href="/" className={`shrink-0 ${riskApp.navLink}`}>
            ← Risk map
          </Link>
        </div>
      </header>

      <main className={riskApp.mainArticle}>
        <div>
          <p className={riskApp.sectionKicker}>How this works</p>
          <h1 className={`mt-1 ${riskApp.pageHeadline}`}>Methodology</h1>
          <p className={`mt-2 max-w-2xl ${riskApp.body}`}>{methodology.overview}</p>
        </div>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>What you are looking at</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>Environmental risk, not detection</h2>
          <p className={`mt-2 ${riskApp.body}`}>
            The score shows how closely <strong className="text-slate-800">current weather and ocean conditions</strong> match patterns
            linked to shark activity in research. It does <strong className="text-slate-800">not</strong> mean a shark is present, and it is
            not a replacement for lifeguards, signage, or official warnings.
          </p>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Flow</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>From live data to a location score</h2>
          <ol className="mt-4 space-y-4">
            {[
              'Observations are pulled from trusted feeds (for example BoM for rain and sea temperature).',
              'Each reading is turned into environmental “signals” (active or not) using fixed thresholds from the model.',
              'Each shark species has its own signal weights; species scores are combined for the region.',
              'Each beach or waterway is scored using that mix plus its habitat type (open beach vs harbour vs estuary).',
            ].map((text, i) => (
              <li key={i} className="flex gap-3">
                <span className={riskApp.stepBadge}>{i + 1}</span>
                <p className={`pt-1 ${riskApp.body}`}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Reading the score</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>Score bands (0–100)</h2>
          <p className={`mt-2 ${riskApp.body}`}>
            A higher number means more environmental factors are in play at once for species that use this coastline—not a forecast of an
            incident.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { range: '0–30', label: 'Low', desc: 'Fewer factors match typical high-activity conditions.', border: 'border-emerald-200/90', bg: 'bg-emerald-50/60' },
              { range: '31–60', label: 'Moderate', desc: 'Several factors are in a range seen more often in elevated activity.', border: 'border-amber-200/90', bg: 'bg-amber-50/60' },
              { range: '61–80', label: 'High', desc: 'Multiple strong signals overlap.', border: 'border-orange-200/90', bg: 'bg-orange-50/60' },
              { range: '81–100', label: 'Severe', desc: 'Rare combination of very strong environmental drivers.', border: 'border-red-200/90', bg: 'bg-red-50/60' },
            ].map((b) => (
              <div key={b.range} className={`rounded-lg border p-3 ${b.border} ${b.bg}`}>
                <p className={`text-sm font-semibold text-slate-900`}>
                  {b.label} <span className="font-normal text-slate-600">({b.range})</span>
                </p>
                <p className={`mt-1 ${riskApp.bodySm}`}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Places</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>Why the map matters</h2>
          <p className={`mt-2 ${riskApp.body}`}>
            Harbours, rivers after rain, and enclosed bays behave differently from open, patrolled surf beaches. The model adds or removes risk
            by place type so the same rainfall or temperature does not mean the same thing everywhere.
          </p>
          <p className={`mt-3 ${riskApp.bodySm}`}>{methodology.locationGuidance}</p>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Evidence</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>Research behind the model</h2>
          <p className={`mt-2 ${riskApp.body}`}>
            Thresholds and weights are grounded in published work on species distribution, movement, and environmental drivers—not guesswork.
            Below are the main sources and what we take from each for this tool.
          </p>
          <ul className="mt-5 space-y-4">
            {papers.map((paper) => (
              <li key={paper.id} className={`${riskApp.inset} ${riskApp.insetPad}`}>
                <p className={`text-sm font-semibold text-slate-900`}>{paper.title}</p>
                <p className={`mt-1 ${riskApp.bodySm}`}>
                  {paper.authors.join(', ')} ({paper.year}). <em className="not-italic text-slate-600">{paper.journal}</em>. DOI:{' '}
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
                  >
                    {paper.doi}
                  </a>
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-slate-600">
                  {paper.keyFindings.slice(0, 3).map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Species models</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>How each species is scored</h2>
          <p className={`mt-2 ${riskApp.body}`}>{methodology.overallScoring}</p>
          <div className="mt-5 space-y-4">
            {methodology.speciesModels.map((sp) => (
              <div key={sp.species} className={`${riskApp.inset} ${riskApp.insetPad}`}>
                <p className="text-sm font-semibold text-slate-900">{sp.species}</p>
                <p className={`mt-1 ${riskApp.bodySm}`}>{sp.habitat}</p>
                <p className={`mt-2 ${riskApp.body}`}>{sp.sydneyRelevance}</p>
                <dl className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                  {Object.entries(sp.riskFactors).map(([key, val]) => (
                    <div key={key} className="rounded border border-slate-100 bg-white/80 p-2">
                      <dt className="font-semibold capitalize text-slate-800">{key}</dt>
                      <dd className="mt-0.5">
                        {[val.weight, val.threshold, val.bonus, val.penalty, val.condition].filter(Boolean).join(' · ')}
                        {val.rationale ? ` — ${val.rationale}` : ''}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Live inputs</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>Operational data sources</h2>
          <p className={`mt-2 ${riskApp.body}`}>
            These are the feeds that power the environmental layer. When a feed is late or missing, the UI shows it and the model may treat
            that signal cautiously.
          </p>
          <ul className="mt-4 space-y-3">
            {provenance.map((row) => (
              <li key={row.metric} className={riskApp.listItem}>
                <p className="text-sm font-semibold text-slate-900">{row.metric}</p>
                <p className={`mt-1 ${riskApp.bodySm}`}>{row.description}</p>
                <p className={`mt-1 ${riskApp.bodySm}`}>
                  Source:{' '}
                  {row.url ? (
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
                    >
                      {row.source}
                    </a>
                  ) : (
                    <span className="font-medium text-slate-700">{row.source}</span>
                  )}
                  {' · '}
                  Updates: {row.updateFrequency}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Limits</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>What this cannot do</h2>
          <div className={`mt-3 ${riskApp.disclaimer}`}>
            <p className="font-semibold">This is not a shark detection system.</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
              <li>It does not predict presence or absence of sharks.</li>
              <li>It does not replace lifeguard advice, beach closures, or official warnings.</li>
              <li>It does not track individual animals.</li>
            </ul>
          </div>
          <p className={`mt-4 ${riskApp.body}`}>{sources.disclaimer}</p>
        </section>

        <section className={`${riskApp.card} ${riskApp.cardPad}`}>
          <p className={riskApp.sectionKicker}>Safety</p>
          <h2 className={`mt-1 ${riskApp.sectionTitleMd}`}>Official guidance</h2>
          <ul className={`mt-3 list-disc space-y-1.5 pl-4 ${riskApp.body}`}>
            <li>Swim between the flags on patrolled beaches.</li>
            <li>Follow lifeguards and all signage.</li>
            <li>Avoid murky water and river mouths after heavy rain.</li>
            <li>Do not swim alone in harbours or enclosed waterways.</li>
          </ul>
          <p className={`mt-4 ${riskApp.bodySm}`}>
            Beach conditions and warnings:{' '}
            <a
              href="https://beachsafe.org.au"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-slate-950"
            >
              BeachSafe.org.au
            </a>
          </p>
        </section>

        <div className="flex justify-center border-t border-slate-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            View risk map
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            Data from{' '}
            <a href="http://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-700 hover:text-slate-900">
              Bureau of Meteorology
            </a>
            . Research citations on this page match the sources catalogue in the repository.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://beachsafe.org.au" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-700 hover:text-slate-900">
              BeachSafe
            </a>
            <a href="https://nodestrategy.com" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-700 hover:text-slate-900">
              Node Strategy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
