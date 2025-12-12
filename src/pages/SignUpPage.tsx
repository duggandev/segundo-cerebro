import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignUp } from '@clerk/clerk-react';
import { Brain } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  // Redirigir al dashboard si ya está autenticado
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
            Segundo Cerebro
          </h1>
          <p className="text-gray-600 text-lg">Crea tu cuenta y comienza</p>
        </div>

        {/* Componente de SignUp de Clerk */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg w-full transition-all duration-200 shadow-md hover:shadow-lg',
                card: 'shadow-none border-0',
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton:
                  'border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all',
                formFieldInput:
                  'border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
              },
              layout: {
                socialButtonsPlacement: 'bottom',
                privacyPageUrl: '/privacy',
                termsPageUrl: '/terms',
              },
            }}
            signInUrl={ROUTES.LOGIN}
            forceRedirectUrl={ROUTES.HOME}
            redirectUrl={ROUTES.HOME}
          />
        </div>

        {/* Pie de página */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Gratis para la comunidad • Desarrollado con ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
