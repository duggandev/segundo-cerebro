import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Componente que redirige automáticamente según el estado de autenticación
 * - Si está logeado: va al dashboard
 * - Si no está logeado: va al landing
 */
export default function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Si está autenticado, ir al dashboard, sino al landing
  return isAuthenticated ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <Navigate to={ROUTES.LANDING} replace />
  );
}
