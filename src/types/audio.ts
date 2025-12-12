/**
 * Tipos compartidos para el sistema de grabación y transcripción
 */

export interface RecordingData {
  transcription: string;
  duration: number;
}

export interface SpeechRecognitionConfig {
  language?: string;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  error: string | null;
  isSupported: boolean;
  audioDuration: number;
  resetDuration: () => void;
  cleanup: () => void;
}

/**
 * Opciones de lenguaje soportadas por Web Speech API
 */
export const SUPPORTED_LANGUAGES = {
  es_ES: 'es-ES',
  en_US: 'en-US',
  fr_FR: 'fr-FR',
  de_DE: 'de-DE',
  it_IT: 'it-IT',
  pt_BR: 'pt-BR',
  ja_JP: 'ja-JP',
  zh_CN: 'zh-CN',
  ko_KR: 'ko-KR',
  ru_RU: 'ru-RU',
} as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];
