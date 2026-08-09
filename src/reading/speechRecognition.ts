/**
 * Abstração sobre o reconhecimento de fala do navegador.
 * O resto do jogo só conhece a interface SpeechRecognizer, para que
 * um serviço de avaliação de pronúncia possa substituí-la no futuro.
 */

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } } & ArrayLike<{ transcript: string }>>;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export type SpeechError = 'unavailable' | 'denied' | 'no-speech' | 'error';

export type ListenCallbacks = {
  /** Texto parcial enquanto a criança fala (apenas para feedback visual) */
  onInterim?: (text: string) => void;
  /** Transcrição final consolidada da tentativa */
  onResult: (transcript: string) => void;
  onError: (error: SpeechError) => void;
};

export type SpeechSession = { stop(): void; cancel(): void };

export interface SpeechRecognizer {
  isAvailable(): boolean;
  listen(callbacks: ListenCallbacks): SpeechSession;
}

/** Tempo (ms) para a criança COMEÇAR a falar antes de encerrar a escuta */
const INITIAL_SPEECH_TIMEOUT_MS = 10000;
/** Silêncio (ms) após o último resultado antes de encerrar a escuta */
const SILENCE_TIMEOUT_MS = 3000;
/** Duração máxima de uma tentativa */
const MAX_LISTEN_MS = 25000;

export class BrowserSpeechRecognizer implements SpeechRecognizer {
  isAvailable(): boolean {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  listen(callbacks: ListenCallbacks): SpeechSession {
    const Impl = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Impl) {
      callbacks.onError('unavailable');
      return { stop() {}, cancel() {} };
    }

    const recognition = new Impl();
    recognition.lang = 'pt-BR';
    // continuous + interim: a criança pode ler devagar, em pedaços
    // (BOR... BORBO... BORBOLETA) sem que a escuta seja cortada.
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = '';
    let interimTranscript = '';
    let finished = false;
    let cancelled = false;
    let silenceTimer: number | undefined;
    let maxTimer: number | undefined;

    const clearTimers = () => {
      window.clearTimeout(silenceTimer);
      window.clearTimeout(maxTimer);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimers();
      if (!cancelled) {
        const best = (finalTranscript + ' ' + interimTranscript).trim();
        if (best.length > 0) callbacks.onResult(best);
        else callbacks.onError('no-speech');
      }
    };

    const armSilenceTimer = (ms: number) => {
      window.clearTimeout(silenceTimer);
      silenceTimer = window.setTimeout(() => recognition.stop(), ms);
    };

    recognition.onresult = (event) => {
      interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? '';
        if (result.isFinal) finalTranscript += ' ' + text;
        else interimTranscript += ' ' + text;
      }
      callbacks.onInterim?.((finalTranscript + ' ' + interimTranscript).trim());
      // Depois que a fala começou, basta uma pausa curta para encerrar
      armSilenceTimer(SILENCE_TIMEOUT_MS);
    };

    recognition.onerror = (event) => {
      if (finished || cancelled) return;
      finished = true;
      clearTimers();
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        callbacks.onError('denied');
      } else if (event.error === 'audio-capture') {
        callbacks.onError('unavailable');
      } else if (event.error === 'no-speech') {
        callbacks.onError('no-speech');
      } else if (event.error === 'aborted') {
        // cancelamento silencioso
      } else {
        callbacks.onError('error');
      }
    };

    recognition.onend = () => finish();

    try {
      recognition.start();
    } catch {
      callbacks.onError('error');
      return { stop() {}, cancel() {} };
    }

    armSilenceTimer(INITIAL_SPEECH_TIMEOUT_MS);
    maxTimer = window.setTimeout(() => recognition.stop(), MAX_LISTEN_MS);

    return {
      stop: () => recognition.stop(),
      cancel: () => {
        cancelled = true;
        clearTimers();
        try {
          recognition.abort();
        } catch {
          // já encerrado
        }
      },
    };
  }
}

export const defaultRecognizer: SpeechRecognizer = new BrowserSpeechRecognizer();
