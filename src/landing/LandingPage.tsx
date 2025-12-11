import { Brain, Mic, Tag, Sparkles } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function LandingPage() {
  const { goToLogin } = useNavigation();

  return (
    <div className="min-h-screen bg-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Segundo Cerebro</span>
        </div>
        <button
          onClick={goToLogin}
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
            onClick={goToLogin}
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
              <Brain className="w-6 h-6 text-blue-600" />
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
          <p className="mb-2">Desarrollado con pasión por <span className="font-semibold text-gray-900">Luis Zamora</span></p>
          <p className="text-sm">Gratis para la comunidad</p>
        </div>
      </footer>
    </div>
  );
}
