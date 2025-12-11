import { Plus, Pin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import IdeaCard from '../../components/IdeaCard';
import IdeaDetail from './IdeaDetail';
import ProcessingIdeas from './ProcessingIdeas';

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
}

export default function Inicio() {
  const { ideas, onUpdate, onDelete } = useOutletContext<ContextType>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pinnedCategories, setPinnedCategories] = useState<string[]>([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [processingIdeas, setProcessingIdeas] = useState<ProcessingIdea[]>([]);

  // Cargar categorías pinadas y ideas procesando del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pinnedCategories');
    if (saved) {
      setPinnedCategories(JSON.parse(saved));
    }
    
    // Simulación de ideas procesando (en un caso real vendrían del servidor)
    const savedProcessing = localStorage.getItem('processingIdeas');
    if (savedProcessing) {
      setProcessingIdeas(JSON.parse(savedProcessing));
    }
  }, []);

  // Obtener todas las categorías de las ideas procesadas
  const allCategories = [...new Set(ideas.filter(idea => idea.aiProcessed).map(idea => idea.category))].filter(Boolean) as string[];
  
  // Separar categorías pinadas y no pinadas
  const displayedCategories = pinnedCategories.filter(cat => allCategories.includes(cat));
  const unpinnedCategories = allCategories.filter(cat => !displayedCategories.includes(cat));
  
  // Si hay más de 3 no pinadas, agrupar en "Otros"
  const mainCategories = displayedCategories.slice(0, 3);
  const otherCategories = unpinnedCategories.slice(3);
  
  // Establecer categoría seleccionada por defecto
  const active = selectedCategory || mainCategories[0] || allCategories[0];

  // Ideas filtradas por categoría seleccionada
  const filteredIdeas = active === 'otros' 
    ? ideas.filter(idea => idea.aiProcessed && otherCategories.includes(idea.category))
    : ideas.filter(idea => idea.aiProcessed && idea.category === active);

  const selectedIdea = ideas.find(idea => idea.id === selectedIdeaId);

  const togglePin = (category: string) => {
    let updated: string[];
    if (pinnedCategories.includes(category)) {
      updated = pinnedCategories.filter(c => c !== category);
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
      return ideas.filter(idea => idea.aiProcessed && otherCategories.includes(idea.category)).length;
    }
    return ideas.filter(idea => idea.aiProcessed && idea.category === category).length;
  };

  // Si hay una idea seleccionada, mostrar el detalle
  if (selectedIdea) {
    return (
      <IdeaDetail
        idea={selectedIdea}
        onClose={() => setSelectedIdeaId(null)}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Ideas</h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <button
          onClick={() => {
            // Simular captura de nueva idea
            const newProcessingIdea: ProcessingIdea = {
              id: `processing-${Date.now()}`,
              transcription: 'Nueva idea capturada...',
              createdAt: new Date(),
              progress: 0
            };
            const updated = [...processingIdeas, newProcessingIdea];
            setProcessingIdeas(updated);
            localStorage.setItem('processingIdeas', JSON.stringify(updated));

            // Simular progreso
            let progress = 0;
            const interval = setInterval(() => {
              progress += Math.random() * 30;
              if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                // Aquí se movería a ideas procesadas
                setTimeout(() => {
                  const remaining = processingIdeas.filter(i => i.id !== newProcessingIdea.id);
                  setProcessingIdeas(remaining);
                  localStorage.setItem('processingIdeas', JSON.stringify(remaining));
                }, 1000);
              }
              setProcessingIdeas(prev =>
                prev.map(i =>
                  i.id === newProcessingIdea.id ? { ...i, progress: Math.min(progress, 100) } : i
                )
              );
            }, 500);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Idea
        </button>
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
            {mainCategories.map(category => (
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
                <span className={`text-sm font-bold ${active === category ? 'text-blue-200' : 'text-gray-500'}`}>
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

            {/* Categorías no pinadas (primeras 2 en la vista) */}
            {unpinnedCategories.slice(0, 2).map(category => (
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
                <span className={`text-sm font-bold ${active === category ? 'text-blue-200' : 'text-gray-500'}`}>
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
                <span className={`text-sm font-bold ${active === 'otros' ? 'text-blue-200' : 'text-gray-500'} ml-2`}>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías en Otros:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-medium text-gray-900 capitalize">{category}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {ideas.filter(i => i.aiProcessed && i.category === category).length} ideas
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ideas de la categoría seleccionada */}
      {filteredIdeas.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map(idea => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onClick={() => setSelectedIdeaId(idea.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay ideas aún. ¡Comienza capturando tu primera idea!</p>
        </div>
      )}
    </div>
  );
}
