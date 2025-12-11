/**
 * Hook personalizado para navegación con React Router
 * Proporciona funciones tipadas para navegar por la aplicación
 */

import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { ROUTES } from '../constants/routes';

interface UseNavigationReturn {
  goToLanding: () => void;
  goToLogin: () => void;
  goToHome: () => void;
  navigate: (path: ROUTES | string) => void;
  goBack: () => void;
}

/**
 * Hook para navegación tipada en toda la aplicación
 * 
 * Uso:
 * const { goToHome, goToLogin } = useNavigation();
 */
export function useNavigation(): UseNavigationReturn {
  const router = useNavigate();

  const navigate = useCallback((path: ROUTES | string) => {
    router(path);
  }, [router]);

  return {
    goToLanding: useCallback(() => navigate(ROUTES.LANDING), [navigate]),
    goToLogin: useCallback(() => navigate(ROUTES.LOGIN), [navigate]),
    goToHome: useCallback(() => navigate(ROUTES.HOME), [navigate]),
    navigate,
    goBack: useCallback(() => router(-1), [router]),
  };
}

