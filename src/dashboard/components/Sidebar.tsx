import { Home, LayoutDashboard, BarChart3, Gift, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

interface SidebarProps {
  isMobile?: boolean;
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { to: ROUTES.HOME, icon: Home, label: 'Inicio' },
    { to: ROUTES.ANALYTICS, icon: LayoutDashboard, label: 'Dashboard' },
    { to: ROUTES.REPORTS, icon: BarChart3, label: 'Reportes' },
    { to: ROUTES.BENEFITS, icon: Gift, label: 'Beneficios' },
    { to: ROUTES.SETTINGS, icon: Settings, label: 'Ajustes' },
  ];

  if (isMobile) {
    return (
      <nav className="w-full px-0 py-0">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive(item.to)
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 m-4 ml-20 rounded-lg shadow-sm min-h-96">
      <nav className="px-4 py-2 pb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Navegacion</div>
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive(item.to)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="px-4 py-3 bg-blue-50 rounded-lg mx-4 mb-4">
        <div className="text-sm font-semibold text-gray-900 mb-1">Premium</div>
        <div className="text-xs text-gray-600">Ideas: Ilimitadas</div>
        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}
