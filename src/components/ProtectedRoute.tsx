/**
 * Componente ProtectedRoute
 * Protege rutas que requieren autenticación
 * 
 * Uso con React Router:
 * <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} path="/dashboard" />
 */

import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  isAuthenticated,
  redirectTo = '/',
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    // Redirigir al login
    window.location.href = redirectTo;
    return null;
  }

  return children;
}

/**
 * Hook para verificar si una ruta es privada
 * 
 * Uso:
 * const isPrivate = useIsPrivateRoute('/dashboard');
 */
export function useIsPrivateRoute(path: string): boolean {
  const privateRoutePrefixes = ['/dashboard'];
  return privateRoutePrefixes.some(prefix => path.startsWith(prefix));
}
