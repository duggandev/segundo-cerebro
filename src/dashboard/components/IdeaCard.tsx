import { Mic, Clock, Sparkles } from 'lucide-react';

interface Idea {
  id: string;
  transcription: string;
  audioUrl?: string;
  audioDuration?: number;
  createdAt: Date;
  category: string;
  aiProcessed: boolean;
  aiAnalysis?: string;
  aiSuggestions?: string[];
  tags?: string[];
}

interface IdeaCardProps {
  idea: Idea;
  onClick?: () => void;
}

export default function IdeaCard({ idea, onClick }: IdeaCardProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const truncateText = (text: string, maxLines: number = 3) => {
    const lines = text.split('\n').slice(0, maxLines).join('\n');
    return lines.length > 150 ? lines.substring(0, 150) + '...' : lines;
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all text-left"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-purple-500" />
          <span className="text-xs text-gray-500">{formatDate(idea.createdAt)}</span>
          {idea.audioDuration && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {formatDuration(idea.audioDuration)}
            </span>
          )}
        </div>
        {idea.aiProcessed && (
          <Sparkles className="w-4 h-4 text-green-500" />
        )}
      </div>

      {/* Transcripción truncada */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        {truncateText(idea.transcription)}
      </p>

      {/* Tags */}
      {idea.tags && idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {idea.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {idea.tags.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{idea.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Categoría */}
      {idea.category && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-blue-600 font-medium capitalize">{idea.category}</p>
        </div>
      )}
    </button>
  );
}
