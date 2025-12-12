/**
 * Utilidades de formateo reutilizables
 * Centralizadas para evitar duplicación
 */

/**
 * Formatea una fecha para mostrar
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    // Parseando: "Thu, 11 Dec 2025 13:49:41 GMT"
    const parts = date.split(' ');
    if (parts.length >= 3) {
      const day = parts[1];
      const month = parts[2];
      return `${day} ${month}`;
    }
  }
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

/**
 * Formatea una fecha con hora
 */
export function formatDateTime(date: Date | string): string {
  if (typeof date === 'string') {
    const parts = date.split(' ');
    if (parts.length >= 5) {
      const day = parts[1];
      const month = parts[2];
      const year = parts[3];
      const time = parts[4];
      const [hour, minute] = time.split(':');
      return `${day} ${month} ${year} • ${hour}:${minute}`;
    }
  }
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formatea duración en segundos a formato mm:ss
 */
export function formatDuration(seconds?: number): string {
  if (!seconds) return '';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formatea duración en formato legible (1h 2m 30s)
 */
export function formatDurationLong(seconds?: number): string {
  if (!seconds) return '';
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m ${secs}s`;
  } else if (mins > 0) {
    return `${mins}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

/**
 * Formatea duración para temporizador (00:00)
 */
export function formatDurationTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Trunca texto a un número máximo de líneas
 */
export function truncateText(text: string, maxLength = 150, maxLines = 3): string {
  const lines = text.split('\n').slice(0, maxLines).join('\n');
  return lines.length > maxLength ? lines.substring(0, maxLength) + '...' : lines;
}
