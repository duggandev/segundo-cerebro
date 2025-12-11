import { Sparkles, Loader } from 'lucide-react';

interface ProcessingIdea {
  id: string;
  transcription: string;
  createdAt: Date;
  progress?: number; // 0-100
}

interface ProcessingIdeasProps {
  ideas: ProcessingIdea[];
}

export default function ProcessingIdeas({ ideas }: ProcessingIdeasProps) {
  if (ideas.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-amber-300">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Procesando ideas</h2>
        </div>
        <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
          {ideas.length}
        </span>
      </div>

      {/* Grid de ideas en procesamiento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map(idea => (
          <div
            key={idea.id}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border-2 border-amber-200 relative overflow-hidden"
          >
            {/* Animación de fondo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></div>
            </div>

            {/* Contenido */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 text-amber-600 animate-spin" />
                  <span className="text-xs text-amber-700 font-medium">{formatDate(idea.createdAt)}</span>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-200 px-2 py-1 rounded">
                  ⏳ Procesando
                </span>
              </div>

              {/* Transcripción truncada */}
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                {idea.transcription}
              </p>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-amber-700 font-medium">Análisis de IA</span>
                  <span className="text-xs font-bold text-amber-600">{idea.progress || 0}%</span>
                </div>
                <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 rounded-full"
                    style={{ width: `${idea.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
