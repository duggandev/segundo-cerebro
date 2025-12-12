import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-20"></div>
            <div className="relative w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Te Perdiste</h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe. Puede haber sido movida, eliminada o tal vez escribiste la URL incorrectamente.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium hover:border-gray-400"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
          
          {isAuthenticated ? (
            // Si está logeado: botón para ir al dashboard
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Ir al Dashboard
            </button>
          ) : (
            // Si NO está logeado: botón para iniciar sesión
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </button>
          )}
        </div>


      </div>
    </div>
  );
}
