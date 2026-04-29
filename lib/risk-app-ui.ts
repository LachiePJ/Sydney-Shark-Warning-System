/**
 * Shared typography and surface tokens for Live Shark Risk UI.
 * Use these classes on the dashboard and methodology pages for consistency.
 */
export const riskApp = {
  pageBg: 'min-h-screen bg-[#f7f9fc]',

  header: 'sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur',
  headerInner: 'mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3.5',

  brandTitle: 'text-xl font-semibold tracking-tight text-slate-900',
  brandKicker: 'text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500',

  navLink:
    'text-sm font-medium text-slate-600 transition-colors hover:text-slate-900',
  navLinkDesktop: 'hidden md:inline text-sm font-medium text-slate-600 transition-colors hover:text-slate-900',

  main: 'mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4',
  mainArticle: 'mx-auto max-w-3xl flex flex-col gap-8 px-4 py-8 md:py-10',

  card: 'rounded-xl border border-slate-200 bg-white shadow-sm',
  cardPad: 'p-4',
  cardPadSm: 'p-3',

  /** Small label above a module (e.g. OVERALL ASSESSMENT) */
  sectionKicker: 'text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500',
  /** In-card section heading */
  sectionTitle: 'text-sm font-semibold text-slate-900',
  /** Slightly larger in-card title */
  sectionTitleMd: 'text-base font-semibold text-slate-900',
  /** Page-level headline inside a card */
  pageHeadline: 'text-xl font-semibold tracking-tight text-slate-900',

  body: 'text-sm text-slate-600 leading-relaxed',
  bodySm: 'text-xs text-slate-500 leading-relaxed',
  bodyStrong: 'text-sm font-semibold text-slate-800',

  inset: 'rounded-lg border border-slate-100 bg-slate-50/90',
  insetPad: 'p-3',

  tableHead: 'text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500',
  tableCell: 'py-2.5 text-sm text-slate-700',
  tableCellMuted: 'py-2.5 text-sm text-slate-600',

  listItem: 'rounded-md border border-slate-100 p-2.5 text-sm text-slate-700',

  stepBadge:
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700',

  disclaimer: 'rounded-lg border border-amber-200/80 bg-amber-50/90 p-4 text-sm text-amber-950',
} as const;

/** Full colour gradient matching score bands: Low → Moderate → High → Severe */
export const RISK_SCORE_BAR_GRADIENT =
  'linear-gradient(90deg, #10b981 0%, #10b981 30%, #f59e0b 30%, #f59e0b 60%, #f97316 60%, #f97316 80%, #ef4444 80%, #ef4444 100%)';
