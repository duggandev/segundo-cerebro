import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../constants/routes';
import { PrivateRoute } from '../components/PrivateRoute';
import LoadingSpinner from '../components/LoadingSpinner';
import LandingPage from '../landing/LandingPage';

// Lazy loading para componentes
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const Inicio = lazy(() => import('../dashboard/pages/inicio/Inicio'));
const DashboardPage = lazy(() => import('../dashboard/pages/dashboard/DashboardPage'));
const Archivados = lazy(() => import('../dashboard/pages/archivados/Archivados'));
const Beneficios = lazy(() => import('../dashboard/pages/beneficios/Beneficios'));
const Ajustes = lazy(() => import('../dashboard/pages/ajustes/Ajustes'));
const ProfilePage = lazy(() => import('../dashboard/pages/ajustes/ProfilePage'));

// Wrapper para Suspense
const withSuspense = (Component: React.ComponentType<any>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

/**
 * Rutas públicas
 */
const publicRoutes: RouteObject[] = [];

/**
 * Rutas privadas
 */
const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <PrivateRoute>
        {withSuspense(Dashboard)}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(Inicio),
      },
      {
        path: 'idea/:ideaId',
        element: withSuspense(Inicio),
      },
    ],
  },
  {
    path: ROUTES.ANALYTICS,
    element: (
      <PrivateRoute>
        {withSuspense(Dashboard)}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(DashboardPage),
      },
    ],
  },
  {
    path: ROUTES.REPORTS,
    element: (
      <PrivateRoute>
        {withSuspense(Dashboard)}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(Archivados),
      },
    ],
  },
  {
    path: ROUTES.BENEFITS,
    element: (
      <PrivateRoute>
        {withSuspense(Dashboard)}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(Beneficios),
      },
    ],
  },
  {
    path: ROUTES.SETTINGS,
    element: (
      <PrivateRoute>
        {withSuspense(Dashboard)}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(Ajustes),
      },
      {
        path: 'perfil',
        element: withSuspense(ProfilePage),
      },
    ],
  },
];

/**
 * Todas las rutas
 */
export const appRoutes: RouteObject[] = [
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
  },
  ...publicRoutes,
  ...privateRoutes,
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
];