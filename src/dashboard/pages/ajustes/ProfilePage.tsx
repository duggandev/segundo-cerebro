import { UserProfile } from '@clerk/clerk-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Clerk UserProfile Component */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <UserProfile
              appearance={{
                elements: {
                  userProfileContainer:
                    'bg-white',
                  userProfileTitle:
                    'text-2xl font-bold text-gray-900 px-6 pt-6',
                  card: 'rounded-lg border border-gray-200 shadow-sm',
                  cardContent: 'p-6',
                  navbarButton:
                    'hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hover:text-gray-900',
                  navbarBackButton:
                    'hover:bg-gray-100 rounded-lg transition-colors',
                  activeNavbarButton:
                    'text-blue-600 bg-blue-50',
                  socialButtonsBlockButton:
                    'border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all',
                  formButtonPrimary:
                    'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg w-full transition-all duration-200 shadow-md hover:shadow-lg',
                  formFieldInput:
                    'border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                  profileSection:
                    'mb-6 last:mb-0',
                  profileSectionTitle:
                    'text-lg font-semibold text-gray-900 mb-4',
                  profilePage:
                    'pb-8',
                  badge:
                    'bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium',
                },
                layout: {
                  socialButtonsPlacement: 'bottom',
                },
              }}
              routing="path"
              path="/ajustes/perfil"
            />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Perfil Personal</p>
                  <p className="font-semibold text-gray-900">Edita tu información</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seguridad</p>
                  <p className="font-semibold text-gray-900">Contraseña y 2FA</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sesiones</p>
                  <p className="font-semibold text-gray-900">Dispositivos activos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Funcionalidades de Perfil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Foto de Perfil</p>
                  <p className="text-sm text-gray-600">Cambiar y actualizar tu foto</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Información Personal</p>
                  <p className="text-sm text-gray-600">Nombre, email y datos básicos</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contraseña</p>
                  <p className="text-sm text-gray-600">Cambiar contraseña de forma segura</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Autenticación Multi-Factor</p>
                  <p className="text-sm text-gray-600">Protege tu cuenta con 2FA</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Conexiones Sociales</p>
                  <p className="text-sm text-gray-600">Conectar Google, GitHub, etc.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sesiones Activas</p>
                  <p className="text-sm text-gray-600">Ver y cerrar sesiones en otros dispositivos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
