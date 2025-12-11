/**
 * Configuración de Router con React Router v6
 * 
 * REQUISITO: Instalar React Router
 * npm install react-router-dom
 * 
 * Nota: Este archivo está listo para usar una vez instale react-router-dom
 */

import { ReactNode } from 'react';
import { ROUTES } from './routes';

/**
 * Interfaz para la definición de rutas
 */
export interface RouteConfig {
  path: string;
  component: ReactNode;
  isPrivate?: boolean;
  layout?: 'default' | 'dashboard' | 'auth';
  title?: string;
  description?: string;
}

/**
 * Configuración de todas las rutas del sistema
 * Mejor para mantenimiento y documentación
 */
export const routeConfig: RouteConfig[] = [
  // ===== LANDING =====
  {
    path: ROUTES.LANDING,
    component: null, // Será importado dinámicamente
    isPrivate: false,
    layout: 'default',
    title: 'Segundo Cerebro - Tu asistente de ideas',
    description: 'Captura tus ideas mediante audio con IA',
  },

  // ===== AUTH =====
  {
    path: ROUTES.LOGIN,
    component: null,
    isPrivate: false,
    layout: 'auth',
    title: 'Iniciar Sesión',
    description: 'Accede a tu segundo cerebro',
  },

  // ===== DASHBOARD =====
  {
    path: ROUTES.DASHBOARD,
    component: null,
    isPrivate: true,
    layout: 'dashboard',
    title: 'Dashboard',
    description: 'Tu panel de ideas',
  },
  {
    path: ROUTES.DASHBOARD_HOME,
    component: null,
    isPrivate: true,
    layout: 'dashboard',
    title: 'Inicio',
    description: 'Gestiona tus ideas capturadas',
  },
  {
    path: ROUTES.DASHBOARD_REPORTS,
    component: null,
    isPrivate: true,
    layout: 'dashboard',
    title: 'Reportes',
    description: 'Visualiza estadísticas y análisis',
  },
  {
    path: ROUTES.DASHBOARD_BENEFITS,
    component: null,
    isPrivate: true,
    layout: 'dashboard',
    title: 'Beneficios',
    description: 'Descubre los beneficios disponibles',
  },
  {
    path: ROUTES.DASHBOARD_SETTINGS,
    component: null,
    isPrivate: true,
    layout: 'dashboard',
    title: 'Ajustes',
    description: 'Configura tu cuenta',
  },
];

/**
 * Obtiene la configuración de una ruta específica
 */
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return routeConfig.find(route => route.path === path);
};

/**
 * Obtiene todas las rutas privadas
 */
export const getPrivateRoutes = (): RouteConfig[] => {
  return routeConfig.filter(route => route.isPrivate);
};

/**
 * Obtiene todas las rutas públicas
 */
export const getPublicRoutes = (): RouteConfig[] => {
  return routeConfig.filter(route => !route.isPrivate);
};
