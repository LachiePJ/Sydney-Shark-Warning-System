export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Sydney Shark Warning System</h2>
        <p className="text-gray-600">Fetching environmental data from Bureau of Meteorology...</p>
      </div>
    </div>
  );
}
