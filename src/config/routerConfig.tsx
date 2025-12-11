import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../constants/routes';
import { PrivateRoute } from '../components/PrivateRoute';
import LoadingSpinner from '../components/LoadingSpinner';

// Importación lazy de componentes para code-splitting
const LandingPage = lazy(() => import('../landing/LandingPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const Inicio = lazy(() => import('../dashboard/pages/inicio/Inicio'));
const DashboardPage = lazy(() => import('../dashboard/pages/dashboard/DashboardPage'));
const Reportes = lazy(() => import('../dashboard/pages/reportes/Reportes'));
const Beneficios = lazy(() => import('../dashboard/pages/beneficios/Beneficios'));
const Ajustes = lazy(() => import('../dashboard/pages/ajustes/Ajustes'));

// Wrapper para Suspense
const withSuspense = (Component: React.ComponentType<any>, props?: any) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component {...props} />
  </Suspense>
);

/**
 * Rutas públicas de la aplicación
 */
export const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.LANDING,
    element: withSuspense(LandingPage),
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar la página</div>,
  },
  {
    path: ROUTES.LOGIN,
    element: withSuspense(LoginPage),
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar el login</div>,
  },
];

/**
 * Rutas privadas de la aplicación
 */
export const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <PrivateRoute>
        {withSuspense(Dashboard)}
      </PrivateRoute>
    ),
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar el dashboard</div>,
    children: [
      {
        index: true,
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
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar el dashboard</div>,
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
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar el dashboard</div>,
    children: [
      {
        index: true,
        element: withSuspense(Reportes),
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
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar el dashboard</div>,
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
    errorElement: <div className="p-8 text-center text-red-600">Error al cargar el dashboard</div>,
    children: [
      {
        index: true,
        element: withSuspense(Ajustes),
      },
    ],
  },
];

/**
 * Todas las rutas combinadas
 */
export const appRoutes: RouteObject[] = [
  ...publicRoutes,
  ...privateRoutes,
  {
    path: '*',
    element: (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Página no encontrada</p>
        <a href={ROUTES.LANDING} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Volver al inicio
        </a>
      </div>
    ),
  },
];
