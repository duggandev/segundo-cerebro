/**
 * Validador de Ideas
 * Valida entrada de usuario antes de enviar a API
 */

export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const ideaValidator = {
  /**
   * Valida que la transcripción sea válida
   */
  validateTranscription(text: string): void {
    if (!text) {
      throw new ValidationError(
        'transcription',
        'La transcripción no puede estar vacía'
      );
    }

    const trimmed = text.trim();
    if (trimmed.length === 0) {
      throw new ValidationError(
        'transcription',
        'La transcripción no puede contener solo espacios'
      );
    }

    if (trimmed.length < 3) {
      throw new ValidationError(
        'transcription',
        'La transcripción debe tener al menos 3 caracteres'
      );
    }

    if (trimmed.length > 10000) {
      throw new ValidationError(
        'transcription',
        'La transcripción no puede exceder 10,000 caracteres'
      );
    }
  },

  /**
   * Valida que la duración sea válida
   */
  validateDuration(duration: number): void {
    if (typeof duration !== 'number') {
      throw new ValidationError(
        'duration',
        'La duración debe ser un número'
      );
    }

    if (duration < 0) {
      throw new ValidationError(
        'duration',
        'La duración no puede ser negativa'
      );
    }

    if (!Number.isInteger(duration)) {
      throw new ValidationError(
        'duration',
        'La duración debe ser un número entero (segundos)'
      );
    }

    if (duration > 7200) {
      // 2 horas
      throw new ValidationError(
        'duration',
        'La duración no puede exceder 2 horas (7200 segundos)'
      );
    }
  },

  /**
   * Valida entrada completa de crear idea
   */
  validateCreateInput(transcription: string, duration: number): void {
    this.validateTranscription(transcription);
    this.validateDuration(duration);
  },
};
