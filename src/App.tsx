import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { appRoutes } from './config/routerConfig';

/**
 * Componente AppRoutes
 * Renderiza todas las rutas de la aplicación
 */
function AppRoutes() {
  const routes = useRoutes(appRoutes);
  return routes;
}

/**
 * Componente App Principal
 * Configura los proveedores y enrutador
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
