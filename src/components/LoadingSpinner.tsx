/**
 * Componente LoadingSpinner
 * Spinner reutilizable para estados de carga
 */

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Cargando...</p>
      </div>
    </div>
  );
}
