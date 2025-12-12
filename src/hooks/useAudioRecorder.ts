import { useCallback, useRef, useState } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  error: string | null;
  isSupported: boolean;
  audioDuration: number;
  resetDuration: () => void;
  cleanup: () => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isSupported = typeof navigator !== 'undefined' && !!navigator.mediaDevices;

  const startRecording = useCallback(async () => {
    try {
      setError(null);

      // Obtener acceso al micrófono
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];
      setAudioDuration(0);

      // Crear MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      // Eventos del recorder
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onerror = (event) => {
        setError(`Error en grabación: ${event.error}`);
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Rastrear duración
      let seconds = 0;
      durationIntervalRef.current = setInterval(() => {
        seconds++;
        setAudioDuration(seconds);
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al acceder al micrófono';
      setError(message);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      const stream = streamRef.current;

      if (!mediaRecorder) {
        resolve(null);
        return;
      }

      // Limpiar intervalo
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      mediaRecorder.onstop = () => {
        // Detener todas las pistas del stream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        // Crear blob con todo el audio
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        setIsRecording(false);
        resolve(audioBlob);
      };

      mediaRecorder.stop();
    });
  }, []);

  const resetDuration = useCallback(() => {
    setAudioDuration(0);
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    // Limpiar intervalo de duración
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    // Abortar media recorder si existe
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn('Error al detener media recorder:', err);
      }
    }

    // Detener stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Resetear estado
    setIsRecording(false);
    setError(null);
    setAudioDuration(0);
    audioChunksRef.current = [];
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    error,
    isSupported,
    audioDuration,
    resetDuration,
    cleanup,
  };
}
