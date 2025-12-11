export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Total de Ideas</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Procesadas</p>
          <p className="text-3xl font-bold text-blue-600">10</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Pendientes</p>
          <p className="text-3xl font-bold text-amber-600">2</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Categorías</p>
          <p className="text-3xl font-bold text-purple-600">5</p>
        </div>
      </div>
      <p className="text-gray-600">Vista de análisis y estadísticas (próximamente)</p>
    </div>
  );
}
