/**
 * Rutas de la aplicación
 * Centraliza todas las rutas del sistema para mejor mantenimiento
 */

export enum ROUTES {
  // Landing
  LANDING = '/',
  
  // Auth
  LOGIN = '/login',
  
  // Dashboard pages
  HOME = '/inicio',
  ANALYTICS = '/analytics',
  REPORTS = '/archivados',
  BENEFITS = '/beneficios',
  SETTINGS = '/ajustes',
}

/**
 * Configuración de rutas públicas (sin autenticación)
 */
export const PUBLIC_ROUTES = [
  ROUTES.LANDING,
];

/**
 * Configuración de rutas privadas (requieren autenticación)
 */
export const PRIVATE_ROUTES = [
  ROUTES.HOME,
  ROUTES.ANALYTICS,
  ROUTES.REPORTS,
  ROUTES.BENEFITS,
  ROUTES.SETTINGS,
];

/**
 * Obtiene la ruta de redirección según autenticación
 */
export const getRedirectRoute = (isAuthenticated: boolean): ROUTES => {
  return isAuthenticated ? ROUTES.HOME : ROUTES.LANDING;
};

/**
 * Verifica si una ruta requiere autenticación
 */
export const isPrivateRoute = (path: string): boolean => {
  return PRIVATE_ROUTES.some(route => path.startsWith(route));
};

/**
 * Obtiene la ruta principal según el usuario
 */
export const getHomeRoute = (isAuthenticated: boolean): ROUTES => {
  return isAuthenticated ? ROUTES.HOME : ROUTES.LANDING;
};
