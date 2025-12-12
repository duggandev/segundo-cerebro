import { Mic, Square, X, AlertCircle, Type } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { RecordingData } from '../../types/audio';
import { formatDurationTimer } from '../../utils/formatters';

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveText: (data: RecordingData) => void;
  onSaveAudio: (data: { audioBlob: Blob; duration: number }) => void;
}

type ModalStep = 'choose' | 'recording' | 'text' | 'review-audio' | 'review-text';

export default function RecordingModal({ isOpen, onClose, onSaveText, onSaveAudio }: RecordingModalProps) {
  const [step, setStep] = useState<ModalStep>('choose');
  const [isSaving, setIsSaving] = useState(false);
  const [editedText, setEditedText] = useState<string>('');
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);

  const audioRecorder = useAudioRecorder();

  // Limpiar cuando se cierra el modal
  useEffect(() => {
    return () => {
      if (!isOpen) {
        audioRecorder.cleanup();
      }
    };
  }, [isOpen, audioRecorder]);

  // FLUJO: ELEGIR ENTRE AUDIO O TEXTO
  const handleChooseAudio = () => {
    audioRecorder.resetDuration();
    setEditedText('');
    setRecordedAudioBlob(null);
    setStep('recording');
    setTimeout(() => {
      audioRecorder.startRecording();
    }, 100);
  };

  const handleChooseText = () => {
    audioRecorder.cleanup();
    setEditedText('');
    setRecordedAudioBlob(null);
    setStep('text');
  };

  // FLUJO: GRABAR AUDIO
  const handleStopRecording = async () => {
    const audioBlob = await audioRecorder.stopRecording();
    if (audioBlob) {
      setRecordedAudioBlob(audioBlob);
      setStep('review-audio');
    }
  };

  const handleSaveAudioIdea = async () => {
    if (!recordedAudioBlob) return;
    console.log('handleSaveAudioIdea llamado');
    setIsSaving(true);
    try {
      console.log('Llamando onSaveAudio con:', { duration: audioRecorder.audioDuration, blobSize: recordedAudioBlob.size });
      onSaveAudio({
        audioBlob: recordedAudioBlob,
        duration: audioRecorder.audioDuration,
      });
    } catch (error) {
      console.error('Error en handleSaveAudioIdea:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  // FLUJO: ESCRIBIR TEXTO
  const handleSaveTextIdea = async () => {
    if (!editedText.trim()) return;
    console.log('handleSaveTextIdea llamado');
    setIsSaving(true);
    try {
      console.log('Llamando onSaveText con:', { transcription: editedText.trim() });
      onSaveText({
        transcription: editedText.trim(),
        duration: 0, // Duración 0 para texto escrito manualmente
      });
    } catch (error) {
      console.error('Error en handleSaveTextIdea:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  const handleCancel = () => {
    audioRecorder.cleanup();
    setStep('choose');
    setEditedText('');
    setRecordedAudioBlob(null);
    onClose();
  };

  const handleBackToChoose = () => {
    audioRecorder.cleanup();
    setStep('choose');
    setEditedText('');
    setRecordedAudioBlob(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'choose' && 'Nueva Idea'}
            {step === 'recording' && 'Grabar Audio'}
            {step === 'text' && 'Escribir Idea'}
            {step === 'review-audio' && 'Revisar Audio'}
            {step === 'review-text' && 'Revisar Idea'}
          </h2>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* PASO 1: ELEGIR ENTRE AUDIO O TEXTO */}
          {step === 'choose' && (
            <>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">¿Cómo quieres capturar tu idea?</p>

                <button
                  onClick={handleChooseAudio}
                  className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Mic className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold text-gray-900">Grabar Audio</span>
                  </div>
                  <p className="text-sm text-gray-600">Captura tu idea hablando</p>
                </button>

                <button
                  onClick={handleChooseText}
                  className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Type className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">Escribir Texto</span>
                  </div>
                  <p className="text-sm text-gray-600">Escribe tu idea directamente</p>
                </button>
              </div>
            </>
          )}

          {/* PASO 2: GRABAR AUDIO */}
          {step === 'recording' && (
            <>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50 rounded-full border-2 border-red-300">
                  <div className="absolute inset-2 rounded-full bg-red-50 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <Mic className="w-10 h-10 text-red-600" />
                      <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 font-mono">
                    {formatDurationTimer(audioRecorder.audioDuration)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Grabando...</p>
                </div>
              </div>

              {audioRecorder.error && (
                <div className="flex gap-3 p-3 bg-red-50 border border-red-300 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Error</p>
                    <p className="text-xs text-red-700 mt-1">{audioRecorder.error}</p>
                  </div>
                </div>
              )}

              {!audioRecorder.isSupported && (
                <div className="flex gap-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    Tu navegador no soporta grabación de audio
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleBackToChoose}
                  disabled={isSaving}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Atrás
                </button>
                <button
                  onClick={handleStopRecording}
                  disabled={isSaving || !audioRecorder.isRecording || audioRecorder.audioDuration < 1}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <Square className="w-4 h-4" />
                  Detener
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                💡 Habla claramente. El audio se enviará tal como lo grabes.
              </p>
            </>
          )}

          {/* PASO 3: ESCRIBIR TEXTO */}
          {step === 'text' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Tu Idea</label>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder="Escribe tu idea aquí..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg text-sm leading-relaxed resize-none focus:border-blue-500 focus:outline-none"
                  rows={8}
                  disabled={isSaving}
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleBackToChoose}
                  disabled={isSaving}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSaveTextIdea}
                  disabled={isSaving || !editedText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </>
          )}

          {/* PASO 4: REVISAR AUDIO */}
          {step === 'review-audio' && (
            <>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Duración</p>
                  <p className="text-lg font-mono font-bold text-gray-900 mt-1">
                    {formatDurationTimer(audioRecorder.audioDuration)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
                  <p className="text-sm text-blue-900">
                    ✓ Audio listo para enviar. El servidor lo procesará.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 flex-col">
                <button
                  onClick={handleSaveAudioIdea}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Guardando...' : 'Enviar Audio'}
                </button>
                <button
                  onClick={handleBackToChoose}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mic className="w-4 h-4" />
                  Grabar nuevamente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
