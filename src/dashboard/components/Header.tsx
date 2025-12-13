import { useState } from 'react';
import { Search } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';


import type { Idea } from '../../types/domain';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  ideas?: Idea[];
  onResultClick?: (idea: Idea) => void;
  onLogout?: () => Promise<void>;
  userName?: string;
}

export default function Header({ searchValue, onSearchChange, ideas = [], onResultClick }: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Evita scroll cuando el overlay está abierto
  if (typeof window !== 'undefined') {
    if (showMobileSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 lg:px-20 py-2 relative z-30">
      <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-8">
        <div className="flex items-center gap-1 md:gap-0.5 lg:gap-1 min-w-0">
          <div className="w-6 md:w-7 h-6 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/images/icon-192.png" alt="Logo Segundo Cerebro" className="w-6 md:w-7 h-6 md:h-7 rounded-lg object-cover" />
          </div>
          <div className="flex items-center gap-2 md:gap-2 min-w-0">
            <h2 className="font-bold text-gray-900 text-base md:text-lg lg:text-xl truncate">oti</h2>
            <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded flex-shrink-0">Premium</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          {/* Search input: solo lupa en mobile, input en md+ */}
          <div className="relative w-8 h-8 md:w-48 lg:w-64 flex items-center justify-center">
            <button
              type="button"
              className="block md:hidden focus:outline-none"
              aria-label="Buscar"
              onClick={() => setShowMobileSearch(true)}
            >
              <Search className="text-gray-400 w-5 h-5" />
            </button>
            <Search className="hidden md:block text-gray-400 md:absolute md:left-3 md:top-1/2 md:transform md:-translate-y-1/2 md:w-4 md:h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              className="hidden md:block w-full pl-8 md:pl-9 pr-3 py-1 md:py-1.5 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          {/* Clerk UserButton - avatar más pequeño */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-7 h-7',
                userButtonPopoverCard:
                  'shadow-lg border border-gray-200 rounded-xl',
                userPreviewMainIdentifier: 'font-semibold text-gray-900',
                userPreviewSecondaryIdentifier: 'text-gray-600',
                userButtonPopoverActionButton:
                  'hover:bg-gray-100 rounded-lg transition-colors',
                menuContent:
                  'rounded-xl shadow-lg border border-gray-200',
              },
            }}
            afterSignOutUrl="/"
            showName={false}
          />
        </div>
      </div>

      {/* Overlay de búsqueda mobile */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md mt-16 mx-auto bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar..."
                value={searchValue}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full pl-2 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                aria-label="Cerrar búsqueda"
                onClick={() => setShowMobileSearch(false)}
              >
                ×
              </button>
            </div>
            {/* Resultados en tiempo real */}
            {searchValue.trim().length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto divide-y divide-gray-100">
                {ideas
                  .filter(idea =>
                    idea.transcription?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    idea.title?.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .slice(0, 8)
                  .map(idea => (
                    <button
                      key={idea.id}
                      className="w-full text-left px-2 py-2 hover:bg-blue-50 rounded transition"
                      onClick={() => {
                        setShowMobileSearch(false);
                        onResultClick?.(idea);
                      }}
                    >
                      <div className="font-medium text-gray-900 text-sm truncate">{idea.title || idea.transcription.slice(0, 40) + (idea.transcription.length > 40 ? '...' : '')}</div>
                      <div className="text-xs text-gray-500 truncate">{idea.transcription}</div>
                    </button>
                  ))}
                {ideas.filter(idea =>
                  idea.transcription?.toLowerCase().includes(searchValue.toLowerCase()) ||
                  idea.title?.toLowerCase().includes(searchValue.toLowerCase())
                ).length === 0 && (
                  <div className="text-gray-400 text-sm px-2 py-2">Sin resultados</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
