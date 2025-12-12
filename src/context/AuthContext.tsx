/**
 * Contexto de Autenticación con Clerk
 */

import { createContext, ReactNode, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import type { User } from '@clerk/clerk-react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();

  const isAuthenticated = !!user;
  const isLoading = !isLoaded;

  const handleSignOut = async () => {
    // Clerk maneja signOut automáticamente con UserButton
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
