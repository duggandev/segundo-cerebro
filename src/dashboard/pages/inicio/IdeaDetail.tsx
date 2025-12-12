import { ArrowLeft, Mic, Sparkles } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import type { Idea } from '../../../types/domain';
import { formatDateTime, formatDurationLong } from '../../../utils/formatters';

interface IdeaDetailProps {
  idea: Idea;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Idea>) => void;
  onDelete: (id: string) => void;
}

export default function IdeaDetail({ idea, onClose }: IdeaDetailProps) {

  return (
    <div className="w-full border-2 border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gray-200 bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="font-medium">Volver</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">Detalles de la Idea</h1>
        {idea.aiProcessed && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-green-200 text-xs sm:text-sm whitespace-nowrap">
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="font-medium">Procesada</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
        {/* Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-300">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Capturado</p>
            <div className="flex items-center gap-2 mt-2">
              <Mic className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500" />
              <p className="text-sm sm:text-base font-medium text-gray-900">{formatDateTime(idea.createdAt)}</p>
            </div>
          </div>
          {idea.category && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Categoría</p>
              <p className="text-sm sm:text-base font-medium text-blue-600 capitalize mt-2">{idea.category}</p>
            </div>
          )}
          {idea.audioDuration && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Duración</p>
              <p className="text-sm sm:text-base font-medium text-green-600 mt-2">{formatDurationLong(idea.audioDuration)}</p>
            </div>
          )}
        </div>

        {/* Transcripción */}
        {idea.transcription && (
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Transcripción</h2>
            <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-gray-300 shadow-sm">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {idea.transcription}
              </p>
            </div>
          </div>
        )}

        {/* Análisis Detallado de IA */}
        {idea.aiProcessed && idea.aiMarkdown && (
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Análisis de la Idea</h2>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6 border-2 border-purple-300 shadow-sm">
              <MarkdownRenderer content={idea.aiMarkdown} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
