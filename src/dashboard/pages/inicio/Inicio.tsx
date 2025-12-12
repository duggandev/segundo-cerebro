import { Pin, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import IdeaCard from '../../components/IdeaCard';
import IdeaDetail from './IdeaDetail';
import ProcessingIdeas from './ProcessingIdeas';
import RecordingModal from '../../components/RecordingModal';
import type { Idea } from '../../../types/domain';

interface ProcessingIdea {
  id: string;
  transcription: string;
  createdAt: Date;
  progress?: number;
}

interface ContextType {
  ideas: Idea[];
  onUpdate: (id: string, updates: Partial<Idea>) => void;
  onDelete: (id: string) => void;
  createIdea: (input: { transcription: string; duration: number }) => Promise<Idea | null>;
  getIdeaDetails: (id: string) => Promise<Idea | null>;
}

export default function Inicio() {
  const { ideas, onDelete, createIdea, getIdeaDetails } = useOutletContext<ContextType>();
  const { ideaId } = useParams<{ ideaId?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pinnedCategories, setPinnedCategories] = useState<string[]>([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [selectedIdeaDetail, setSelectedIdeaDetail] = useState<Idea | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [processingIdeas, setProcessingIdeas] = useState<ProcessingIdea[]>([]);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);

  // Cargar categorías pinadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pinnedCategories');
    if (saved) {
      setPinnedCategories(JSON.parse(saved));
    }
  }, []);

  // Si hay ideaId en la URL, cargar esa idea
  useEffect(() => {
    if (ideaId) {
      setSelectedIdeaId(ideaId);
    } else {
      setSelectedIdeaId(null);
      setSelectedIdeaDetail(null);
    }
  }, [ideaId]);

  // Navegar a la idea cuando se selecciona (solo si viene del usuario, no de la URL)
  useEffect(() => {
    if (selectedIdeaId && !ideaId) {
      navigate(`idea/${selectedIdeaId}`, { replace: true });
    }
  }, [selectedIdeaId, ideaId, navigate]);

  // Cargar detalles de idea cuando se selecciona
  useEffect(() => {
    const loadIdeaDetail = async () => {
      if (!selectedIdeaId) {
        setSelectedIdeaDetail(null);
        return;
      }

      setLoadingDetail(true);
      try {
        const detail = await getIdeaDetails(selectedIdeaId);
        setSelectedIdeaDetail(detail);
      } catch (err) {
        setSelectedIdeaDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    loadIdeaDetail();
  }, [selectedIdeaId, getIdeaDetails]);

  // Obtener todas las categorías de las ideas
  const allCategories = [
    ...new Set(
      ideas
        .map((idea) => idea.category)
        .filter(Boolean)
    ),
  ] as string[];

  // Separar categorías pinadas y no pinadas
  const displayedCategories = pinnedCategories.filter((cat) =>
    allCategories.includes(cat)
  );
  const unpinnedCategories = allCategories.filter(
    (cat) => !displayedCategories.includes(cat)
  );

  // Primeras 3 categorías para mostrar
  const mainCategories = displayedCategories.slice(0, 3);
  const otherCategories = unpinnedCategories;

  // Establecer categoría seleccionada por defecto
  const active = selectedCategory || mainCategories[0] || allCategories[0];

  // Ideas filtradas por categoría seleccionada
  const filteredIdeas =
    active === 'otros'
      ? ideas.filter((idea) => otherCategories.includes(idea.category))
      : ideas.filter((idea) => idea.category === active);

  const togglePin = (category: string) => {
    let updated: string[];
    if (pinnedCategories.includes(category)) {
      updated = pinnedCategories.filter((c) => c !== category);
    } else {
      if (pinnedCategories.length >= 3) {
        updated = [category, ...pinnedCategories.slice(0, 2)];
      } else {
        updated = [category, ...pinnedCategories];
      }
    }
    setPinnedCategories(updated);
    localStorage.setItem('pinnedCategories', JSON.stringify(updated));
  };

  const getCountForCategory = (category: string) => {
    if (category === 'otros') {
      return ideas.filter((idea) =>
        otherCategories.includes(idea.category)
      ).length;
    }
    return ideas.filter((idea) => idea.category === category).length;
  };

  const handleSaveRecording = async (data: {
    transcription: string;
    audioBlob: Blob;
    audioDuration: number;
  }) => {
    try {
      // Agregar a ideas procesando para feedback visual
      const processingIdea: ProcessingIdea = {
        id: `processing-${Date.now()}`,
        transcription: data.transcription,
        createdAt: new Date(),
        progress: 0,
      };

      setProcessingIdeas((prev) => [processingIdea, ...prev]);

      // Llamar a la API para crear la idea
      const newIdea = await createIdea({
        transcription: data.transcription,
        duration: data.audioDuration,
      });

      // Remover de ideas procesando
      setProcessingIdeas((prev) => prev.filter((idea) => idea.id !== processingIdea.id));

      if (newIdea) {
        // La idea se agregó exitosamente
      }
    } catch (error) {
      setProcessingIdeas((prev) =>
        prev.filter((idea) => idea.id !== `processing-${Date.now()}`)
      );
    }
  };

  // Si hay una idea seleccionada, mostrar el detalle
  // Si hay una idea seleccionada, mostrar el detalle
  if (selectedIdeaId && selectedIdeaDetail) {
    return (
      <IdeaDetail
        idea={selectedIdeaDetail as any}
        onClose={() => {
          setSelectedIdeaId(null);
          setSelectedIdeaDetail(null);
          navigate('/inicio', { replace: true });
        }}
        onUpdate={(_id, _updates) => {}}
        onDelete={onDelete}
      />
    );
  }

  // Mostrar loading mientras se carga el detalle
  if (selectedIdeaId && loadingDetail) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl ml-auto mr-0 pr-8 lg:pr-30">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Ideas</h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'}
          </span>
          <button
            onClick={() => setIsRecordingModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Nueva Idea
          </button>
        </div>
      </div>

      {/* Ideas procesando */}
      {processingIdeas.length > 0 && (
        <ProcessingIdeas ideas={processingIdeas} />
      )}

      {/* Categorías como tabs */}
      {allCategories.length > 0 && (
        <div className="mb-8 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {/* Categorías principales pinadas */}
            {mainCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 group ${
                  active === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="capitalize">{category}</span>
                <span
                  className={`text-sm font-bold ${
                    active === category ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  ({getCountForCategory(category)})
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(category);
                  }}
                  className={`ml-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                    active === category ? 'text-blue-300' : 'text-gray-400'
                  }`}
                >
                  <Pin className="w-4 h-4" />
                </button>
              </button>
            ))}

            {/* Categorías no pinadas (primeras 2) */}
            {unpinnedCategories.slice(0, 2).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 group ${
                  active === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="capitalize">{category}</span>
                <span
                  className={`text-sm font-bold ${
                    active === category ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  ({getCountForCategory(category)})
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(category);
                  }}
                  className={`ml-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                    active === category ? 'text-blue-300' : 'text-gray-400'
                  }`}
                >
                  <Pin className="w-4 h-4" />
                </button>
              </button>
            ))}

            {/* Botón "Otros" si hay más categorías */}
            {otherCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategory('otros')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  active === 'otros'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Otros</span>
                <span
                  className={`text-sm font-bold ${
                    active === 'otros' ? 'text-blue-200' : 'text-gray-500'
                  } ml-2`}
                >
                  ({getCountForCategory('otros')})
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mostrar lista de categorías en "Otros" */}
      {active === 'otros' && otherCategories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Categorías en Otros:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-medium text-gray-900 capitalize">{category}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {ideas.filter((i) => i.category === category).length} ideas
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ideas de la categoría seleccionada */}
      {filteredIdeas.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea as any}
              onClick={() => setSelectedIdeaId(idea.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {ideas.length === 0
              ? 'No hay ideas aún. ¡Comienza capturando tu primera idea!'
              : 'No hay ideas en esta categoría'}
          </p>
        </div>
      )}

      {/* Audio Recorder */}
      <RecordingModal
        isOpen={isRecordingModalOpen}
        onClose={() => setIsRecordingModalOpen(false)}
        onSave={handleSaveRecording}
      />
    </div>
  );
}
