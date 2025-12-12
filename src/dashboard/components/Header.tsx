import { Search, Brain } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

interface HeaderProps {
  onLogout?: () => Promise<void>;
  userName?: string;
}

export default function Header({}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 lg:px-20 py-2">
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

        <div className="flex items-center gap-8">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          {/* Clerk UserButton - Solo avatar, sin nombre */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10',
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
    </header>
  );
}
