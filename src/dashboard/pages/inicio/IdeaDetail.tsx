import { ArrowLeft, Mic, Clock, Sparkles, Trash2, Edit2, Globe, CheckCircle } from 'lucide-react';

interface Idea {
  id: string;
  transcription: string;
  audioUrl?: string;
  audioDuration?: number;
  createdAt: Date;
  category: string;
  aiProcessed: boolean;
  aiAnalysis?: string;
  aiMarkdown?: string; 
  aiSuggestions?: string[];
  tags?: string[];
}

interface IdeaDetailProps {
  idea: Idea;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Idea>) => void;
  onDelete: (id: string) => void;
}

export default function IdeaDetail({ idea, onClose, onDelete }: IdeaDetailProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-200 bg-gray-50 px-8 py-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex-1">Detalles de la Idea</h1>
        {idea.aiProcessed && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Procesada</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-8 px-8 py-8 bg-white">
        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-300">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Capturado</p>
            <div className="flex items-center gap-2 mt-2">
              <Mic className="w-5 h-5 text-purple-500" />
              <p className="text-base font-medium text-gray-900">{formatDate(idea.createdAt)}</p>
            </div>
          </div>
          {idea.audioDuration && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Duración</p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <p className="text-base font-medium text-gray-900">{formatDuration(idea.audioDuration)}</p>
              </div>
            </div>
          )}
          {idea.category && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Categoría</p>
              <p className="text-base font-medium text-blue-600 capitalize mt-2">{idea.category}</p>
            </div>
          )}
        </div>

        {/* Transcripción */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Transcripción</h2>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300 shadow-sm">
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {idea.transcription}
            </p>
          </div>
        </div>

        {/* Tags */}
        {idea.tags && idea.tags.length > 0 && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-3">
              {idea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium border border-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Análisis Detallado de IA */}
        {idea.aiProcessed && (idea.aiMarkdown || idea.aiAnalysis) && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Análisis de la Idea</h2>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-300 shadow-sm prose prose-sm max-w-none">
              {idea.aiMarkdown ? (
                <div className="text-gray-700 space-y-3 text-sm leading-relaxed">
                  {idea.aiMarkdown.split('\n').map((line, idx) => {
                    // Si empieza con # es un título
                    if (line.startsWith('###')) {
                      return <h4 key={idx} className="font-bold text-gray-900 mt-3 mb-2">{line.replace(/^###\s/, '')}</h4>;
                    }
                    if (line.startsWith('##')) {
                      return <h3 key={idx} className="font-bold text-gray-900 mt-4 mb-2 text-base">{line.replace(/^##\s/, '')}</h3>;
                    }
                    if (line.startsWith('#')) {
                      return <h2 key={idx} className="font-bold text-gray-900 mt-4 mb-2 text-lg">{line.replace(/^#\s/, '')}</h2>;
                    }
                    // Si es lista
                    if (line.startsWith('- ')) {
                      return <li key={idx} className="ml-5 list-disc">{line.replace(/^-\s/, '')}</li>;
                    }
                    // Si está vacía
                    if (line.trim() === '') {
                      return <div key={idx} className="h-2"></div>;
                    }
                    // Texto normal
                    return <p key={idx} className="text-gray-700">{line}</p>;
                  })}
                </div>
              ) : (
                <p className="text-gray-700">{idea.aiAnalysis}</p>
              )}
            </div>
          </div>
        )}

        {/* Sugerencias */}
        {idea.aiProcessed && idea.aiSuggestions && idea.aiSuggestions.length > 0 && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sugerencias</h2>
            <div className="space-y-3">
              {idea.aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-white rounded-xl border-2 border-gray-300 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-7 h-7 bg-purple-100 rounded-full border border-purple-300">
                      <span className="text-xs font-bold text-purple-700">{index + 1}</span>
                    </div>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed flex-1">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viabilidad */}
        {idea.aiProcessed && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Viabilidad
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Viabilidad General</span>
                  <span className="text-sm font-bold text-green-600">7.5/10</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Complejidad</span>
                  <span className="text-sm font-bold text-orange-600">Media</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Potencial de Mercado</span>
                  <span className="text-sm font-bold text-blue-600">Alto</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Análisis de Mercado */}
        {idea.aiProcessed && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Análisis de Mercado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Tamaño de Mercado</p>
                <p className="text-lg font-bold text-blue-900">Mercado Moderado</p>
                <p className="text-sm text-blue-700 mt-2">Demanda creciente con espacio para innovación</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-xs font-semibold text-purple-700 uppercase mb-2">Competencia</p>
                <p className="text-lg font-bold text-purple-900">Moderada - Alta</p>
                <p className="text-sm text-purple-700 mt-2">Existe competencia pero oportunidades de diferenciación</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-xs font-semibold text-green-700 uppercase mb-2">Barreras de Entrada</p>
                <p className="text-lg font-bold text-green-900">Medias</p>
                <p className="text-sm text-green-700 mt-2">Requiere inversión pero factible para emprendedores</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-xs font-semibold text-amber-700 uppercase mb-2">Tiempo a Mercado</p>
                <p className="text-lg font-bold text-amber-900">6-12 meses</p>
                <p className="text-sm text-amber-700 mt-2">Plazo realista para MVP</p>
              </div>
            </div>
          </div>
        )}

        {/* Recursos Recomendados */}
        {idea.aiProcessed && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Recursos Recomendados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="#"
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-300 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="font-semibold text-blue-900 text-sm">Investigación de Tendencias</p>
                <p className="text-xs text-blue-700 mt-1">Google Trends - Analiza búsquedas relacionadas</p>
              </a>
              <a
                href="#"
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-300 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="font-semibold text-green-900 text-sm">Validación de Mercado</p>
                <p className="text-xs text-green-700 mt-1">Product Hunt - Descubre ideas similares</p>
              </a>
              <a
                href="#"
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-300 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="font-semibold text-purple-900 text-sm">Análisis de Competencia</p>
                <p className="text-xs text-purple-700 mt-1">Crunchbase - Información de empresas similares</p>
              </a>
              <a
                href="#"
                className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-300 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="font-semibold text-amber-900 text-sm">Validación Rápida</p>
                <p className="text-xs text-amber-700 mt-1">Survey Tools - Valida idea con usuarios reales</p>
              </a>
            </div>
          </div>
        )}

        {/* Próximos Pasos */}
        {idea.aiProcessed && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Próximos Pasos Recomendados</h2>
            <div className="space-y-2">
              <div className="flex gap-3 p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border-l-4 border-blue-500">
                <span className="font-bold text-blue-700 flex-shrink-0">1.</span>
                <p className="text-sm text-gray-700">Validar demanda: Entrevista a 5-10 potenciales usuarios</p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-lg border-l-4 border-green-500">
                <span className="font-bold text-green-700 flex-shrink-0">2.</span>
                <p className="text-sm text-gray-700">Investigar competencia: Identifica soluciones existentes</p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-lg border-l-4 border-purple-500">
                <span className="font-bold text-purple-700 flex-shrink-0">3.</span>
                <p className="text-sm text-gray-700">Crear MVP: Prototipo rápido para validación</p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-amber-50 to-transparent rounded-lg border-l-4 border-amber-500">
                <span className="font-bold text-amber-700 flex-shrink-0">4.</span>
                <p className="text-sm text-gray-700">Medir métricas: Define KPIs de éxito</p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-red-50 to-transparent rounded-lg border-l-4 border-red-500">
                <span className="font-bold text-red-700 flex-shrink-0">5.</span>
                <p className="text-sm text-gray-700">Plan de lanzamiento: Define timeline y recursos</p>
              </div>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-4 pt-6 border-t-2 border-gray-300">
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-base border border-blue-300">
            <Edit2 className="w-5 h-5" />
            Editar
          </button>
          <button
            onClick={() => {
              onDelete(idea.id);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-base border border-red-300"
          >
            <Trash2 className="w-5 h-5" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
