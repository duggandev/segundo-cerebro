import { Mic, Square, X, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { RecordingData } from '../../types/audio';
import { formatDurationTimer } from '../../utils/formatters';

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RecordingData) => void;
}

type ModalStep = 'recording' | 'review';

export default function RecordingModal({ isOpen, onClose, onSave }: RecordingModalProps) {
  const [step, setStep] = useState<ModalStep>('recording');
  const [isSaving, setIsSaving] = useState(false);
  const [recordedData, setRecordedData] = useState<{ audioBlob: Blob; transcript: string; duration: number } | null>(null);
  const [editedTranscript, setEditedTranscript] = useState<string>('');
  const audioRecorder = useAudioRecorder();
  const speechRecognition = useSpeechRecognition({
    language: 'es-ES',
    continuous: true,
    interimResults: true,
  });

  const fullTranscript = speechRecognition.transcript + speechRecognition.interimTranscript;

  // Iniciar grabación y transcripción cuando se abre el modal
  useEffect(() => {
    if (isOpen && !audioRecorder.isRecording && step === 'recording') {
      audioRecorder.startRecording();
      speechRecognition.resetTranscript();
      speechRecognition.startListening();
    }
  }, [isOpen, step]);

  const handleStopRecording = async () => {
    speechRecognition.stopListening();
    const audioBlob = await audioRecorder.stopRecording();

    if (audioBlob && fullTranscript.trim()) {
      setRecordedData({
        audioBlob,
        transcript: fullTranscript.trim(),
        duration: audioRecorder.audioDuration,
      });
      setEditedTranscript(fullTranscript.trim());
      setStep('review');
    }
  };

  const handleSave = async () => {
    if (!recordedData) return;

    setIsSaving(true);
    try {
      onSave({
        transcription: editedTranscript,
        audioBlob: recordedData.audioBlob,
        audioDuration: recordedData.duration,
      });
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  const handleCancel = () => {
    speechRecognition.stopListening();
    audioRecorder.stopRecording();
    setStep('recording');
    setRecordedData(null);
    setEditedTranscript('');
    onClose();
  };

  const handleBackToRecording = () => {
    setStep('recording');
    setRecordedData(null);
    setEditedTranscript('');
    if (!audioRecorder.isRecording) {
      audioRecorder.startRecording();
      speechRecognition.resetTranscript();
      speechRecognition.startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'recording' ? 'Grabar idea' : 'Revisar idea'}
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
          {step === 'recording' ? (
            <>
              {/* PASO 1: GRABACIÓN */}
              {/* Recording indicator */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50 rounded-full border-2 border-red-300">
                  <div className="absolute inset-2 rounded-full bg-red-50 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <Mic className="w-10 h-10 text-red-600" />
                      <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
                    </div>
                  </div>
                </div>

                {/* Duración */}
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 font-mono">
                    {formatDurationTimer(audioRecorder.audioDuration)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Grabando...</p>
                </div>
              </div>

              {/* Transcripción en tiempo real */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Transcripción en tiempo real</label>
                <div className="relative bg-gray-50 rounded-lg border-2 border-gray-200 p-4 min-h-24 max-h-40 overflow-y-auto">
                  {/* Transcript final */}
                  {speechRecognition.transcript && (
                    <p className="text-gray-800 text-sm leading-relaxed mb-2">
                      {speechRecognition.transcript}
                    </p>
                  )}

                  {/* Interim transcript (en colores más claros) */}
                  {speechRecognition.interimTranscript && (
                    <span className="text-gray-500 italic text-sm">
                      {speechRecognition.interimTranscript}
                    </span>
                  )}

                  {/* Placeholder */}
                  {!speechRecognition.transcript && !speechRecognition.interimTranscript && (
                    <p className="text-gray-400 text-sm italic">
                      Comenzando a escuchar...
                    </p>
                  )}

                  {/* Animación de escucha */}
                  {audioRecorder.isRecording && (
                    <div className="mt-3 flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1 bg-red-600 rounded-full animate-bounce"
                          style={{
                            height: `${8 + i * 4}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Errores */}
              {(audioRecorder.error || speechRecognition.error) && (
                <div className="flex gap-3 p-3 bg-red-50 border border-red-300 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Error</p>
                    <p className="text-xs text-red-700 mt-1">
                      {audioRecorder.error || speechRecognition.error}
                    </p>
                  </div>
                </div>
              )}

              {/* Estado de soporte */}
              {(!audioRecorder.isSupported || !speechRecognition.isSupported) && (
                <div className="flex gap-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    Tu navegador no soporta grabación de audio o reconocimiento de voz
                  </p>
                </div>
              )}

              {/* Acciones - Paso 1 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleStopRecording}
                  disabled={isSaving || !audioRecorder.isRecording || !fullTranscript.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <Square className="w-4 h-4" />
                  Detener grabación
                </button>
              </div>

              {/* Tip */}
              <p className="text-xs text-gray-500 text-center">
                💡 Habla con naturalidad. La transcripción aparecerá en tiempo real.
              </p>
            </>
          ) : (
            <>
              {/* PASO 2: REVISIÓN Y DURACIÓN */}
              {/* Transcripción editable */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Transcripción (puedes editar)</label>
                <textarea
                  value={editedTranscript}
                  onChange={(e) => setEditedTranscript(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg text-sm leading-relaxed resize-none focus:border-blue-500 focus:outline-none"
                  rows={6}
                  disabled={isSaving}
                />
              </div>

              {/* Duración */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Duración</p>
                <p className="text-lg font-mono font-bold text-gray-900 mt-1">
                  {formatDurationTimer(recordedData?.duration || 0)}
                </p>
              </div>

              {/* Acciones - Paso 2 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 flex-col">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editedTranscript.trim()}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Guardando...' : 'Guardar idea'}
                </button>
                <button
                  onClick={handleBackToRecording}
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
