import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { AuthProvider } from './context/AuthContext';
import { appRoutes } from './config/routerConfig';

/**
 * Renderiza las rutas
 */
function AppRoutes() {
  const routes = useRoutes(appRoutes);
  return routes;
}

/**
 * App Principal
 */
function App() {
  const { isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando aplicación...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
