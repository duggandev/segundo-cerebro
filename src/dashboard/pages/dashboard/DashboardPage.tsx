// ==================== Imports ====================
import { Lock } from 'lucide-react';

// ==================== Component ====================
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto pr-8 lg:pr-30 h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">Disponible próximamente</p>
      </div>
    </div>
  );
}
