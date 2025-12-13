import { Mic, Tag, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Si el usuario está autenticado, redirigir al dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <img src="/images/icon-192.png" alt="Logo oti" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-2xl font-bold text-gray-800">oti</span>
        </div>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Comenzar
        </button>
      </nav>

      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Tu Segundo Cerebro
            <span className="block text-blue-600 mt-2">Impulsado por IA</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Captura tus ideas, pensamientos y reflexiones mediante audio.
            Nuestra IA los procesa y organiza automáticamente para que nunca pierdas una idea brillante.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Comenzar Gratis
          </button>
          <p className="text-sm text-gray-500 mt-4">
            100% Gratis para la comunidad
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Graba tu voz</h3>
            <p className="text-gray-600">
              Captura tus ideas mediante audio de forma rápida y natural. Sin necesidad de escribir.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <img src="/images/icon-192.png" alt="Logo oti" className="w-6 h-6 rounded object-cover" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Procesamiento IA</h3>
            <p className="text-gray-600">
              Nuestra IA analiza y valida tus pensamientos, extrayendo lo más importante.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Organiza con Tags</h3>
            <p className="text-gray-600">
              Todas tus ideas se organizan automáticamente con etiquetas inteligentes.
            </p>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-6 py-8 border-t border-gray-200 mt-20">
        <div className="text-center text-gray-600">
          <p>&copy; 2025 Noti. Creador Luis Zamora. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de Autenticación - SignIn y SignUp */}
      {showAuthModal && (
        <>
          {/* Overlay oscuro */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowAuthModal(false)}
          />
          
          {/* Modal con SignIn o SignUp */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
            <div className="pointer-events-auto relative">
              {/* Botón cerrar pegado al modal */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute -top-3 -right-3 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors z-50"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {authMode === 'signin' ? (
                <div>
                  <SignIn
                    appearance={{
                      elements: {
                        formButtonPrimary:
                          'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg w-full transition-all duration-200 shadow-md hover:shadow-lg',
                        card: 'shadow-xl border-0',
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
                    forceRedirectUrl={ROUTES.HOME}
                    redirectUrl={ROUTES.HOME}
                  />
                  <div className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => setAuthMode('signup')}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Registrate aquí
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <SignUp
                    appearance={{
                      elements: {
                        formButtonPrimary:
                          'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg w-full transition-all duration-200 shadow-md hover:shadow-lg',
                        card: 'shadow-xl border-0',
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
                    forceRedirectUrl={ROUTES.HOME}
                    redirectUrl={ROUTES.HOME}
                  />
                  <div className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <button
                      onClick={() => setAuthMode('signin')}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Inicia sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

