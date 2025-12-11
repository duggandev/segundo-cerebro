import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_IDEAS } from '../constants/defaultIdeas';

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

export default function Dashboard() {
  const { logout } = useAuth();
  
  // Inicializar con datos por defecto si no hay ideas guardadas
  const [ideasData, setIdeasData] = useLocalStorage<any[]>('ideas', DEFAULT_IDEAS);

  // Convertir las fechas strings a Date objects
  const ideas = ideasData.map((idea: any) => ({
    ...idea,
    createdAt: idea.createdAt instanceof Date ? idea.createdAt : new Date(idea.createdAt)
  })) as Idea[];

  const updateIdea = (id: string, updates: Partial<Idea>) => {
    const updatedIdeas = ideas.map((idea: Idea) =>
      idea.id === id ? { ...idea, ...updates } : idea
    );
    setIdeasData(updatedIdeas);
  };

  const deleteIdea = (id: string) => {
    const filteredIdeas = ideas.filter((idea: Idea) => idea.id !== id);
    setIdeasData(filteredIdeas);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onLogout={logout} />

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Sidebar desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8">
          <Outlet context={{ ideas, onUpdate: updateIdea, onDelete: deleteIdea }} />
        </main>
      </div>

      {/* Bottom navigation mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <Sidebar isMobile={true} />
      </nav>
    </div>
  );
}
