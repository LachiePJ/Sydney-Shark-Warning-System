export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-slate-700 border-t-2"></div>
        <h2 className="mb-2 text-xl font-semibold text-slate-900">Updating coastal risk signals</h2>
        <p className="text-sm text-slate-600">Retrieving live environmental data and refreshing location risk scores.</p>
      </div>
    </div>
  );
}
