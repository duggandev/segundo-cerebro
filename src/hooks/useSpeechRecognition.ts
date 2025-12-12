import { useCallback, useEffect, useRef, useState } from 'react';
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
    continuous = true,
    interimResults = true,
  } = config;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const interimRef = useRef('');

  // Verificar soporte
  const isSupported =
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // Inicializar reconocimiento de voz
  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognitionAPI();

    const recognition = recognitionRef.current;
    recognition.language = language;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptSegment + ' ');
        } else {
          interim += transcriptSegment;
        }
      }

      interimRef.current = interim;
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [isSupported, language, continuous, interimResults]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    // Resetear estado
    interimRef.current = '';
    setInterimTranscript('');
    setError(null);

    try {
      recognitionRef.current.start();
    } catch (err) {
      // Ya está escuchando - ignorar silenciosamente
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    interimRef.current = '';
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
