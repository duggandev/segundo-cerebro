import { Search, User, LogOut, Brain } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 lg:px-20 py-4">
      <div className="flex items-center justify-between gap-4 lg:gap-8">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="font-bold text-gray-900 text-sm lg:text-base truncate">Segundo Cerebro</h2>
            <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded flex-shrink-0">Premium</span>
          </div>
        </div>
        <div className="hidden md:flex flex-1 max-w-2xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar ideas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 ml-auto lg:ml-8">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
