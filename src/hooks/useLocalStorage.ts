import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage de forma segura y sincronizada
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para guardar el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Obtener el valor del localStorage
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return initialValue;
    } catch (error) {
      // Error silencioso - usar valor inicial
      return initialValue;
    }
  });

  // Función para actualizar el valor en localStorage y en el estado
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Error silencioso - continuar sin localStorage
    }
  };

  // Sincronizar cambios del localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          // Error silencioso - mantener estado actual
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}
