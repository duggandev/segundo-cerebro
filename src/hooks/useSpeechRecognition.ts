import { useCallback, useRef, useState } from 'react';
import { SpeechRecognitionConfig, UseSpeechRecognitionReturn } from '../types/audio';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useSpeechRecognition(
  config: SpeechRecognitionConfig = {}
): UseSpeechRecognitionReturn {
  const {
    language = 'es-ES',
  } = config;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');
  const isListeningRef = useRef(false);

  // Verificar soporte
  const isSupported =
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // Crear una nueva instancia limpia cada vez
  const createRecognition = useCallback(() => {
    if (!isSupported) return null;

    try {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognitionAPI();
      recognition.language = language;
      recognition.continuous = true;
      recognition.interimResults = true;

      return recognition;
    } catch (err) {
      console.error('Error creando reconocimiento:', err);
      return null;
    }
  }, [isSupported, language]);

  const startListening = useCallback(() => {
    // Limpiar instancia anterior si existe
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (err) {
        console.warn('Error al abortar reconocimiento anterior:', err);
      }
    }

    // Crear nueva instancia limpia
    const recognition = createRecognition();
    if (!recognition) {
      setError('Speech Recognition no soportado');
      return;
    }

    recognitionRef.current = recognition;

    // Resetear estado
    transcriptRef.current = '';
    setTranscript('');
    setInterimTranscript('');
    setError(null);
    isListeningRef.current = true;

    // Configurar handlers ANTES de iniciar
    recognition.onstart = () => {
      console.log('Reconocimiento iniciado');
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      console.log('Resultado recibido:', event);
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        console.log(`[${i}] isFinal: ${event.results[i].isFinal}, transcript: "${transcript}"`);

        if (event.results[i].isFinal) {
          transcriptRef.current += transcript + ' ';
          setTranscript(transcriptRef.current);
        } else {
          interim += transcript;
        }
      }

      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      console.error('Error de reconocimiento:', event.error);

      if (event.error === 'no-speech') {
        console.warn('No se detectó voz');
        setError(null); // No mostrar error para no desesperar
        return;
      }

      if (event.error === 'network') {
        console.warn('Error de red, reintentando...');
        setError(null);
        return;
      }

      setError(event.error);
    };

    recognition.onend = () => {
      console.log('Reconocimiento finalizado');
      setIsListening(false);
      isListeningRef.current = false;
    };

    // INICIAR
    try {
      recognition.start();
    } catch (err) {
      console.error('Error al iniciar reconocimiento:', err);
      setError('No se pudo iniciar el reconocimiento');
      setIsListening(false);
      isListeningRef.current = false;
    }
  }, [createRecognition]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    isListeningRef.current = false;

    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.warn('Error al detener reconocimiento:', err);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    transcriptRef.current = '';
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
}
