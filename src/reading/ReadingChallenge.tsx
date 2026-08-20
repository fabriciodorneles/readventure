import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import type { ReadingPrompt } from '../content/readingPrompts';
import type { TextCasePreference } from '../game/gameState';
import { applyTextCase } from '../settings/settings';
import { defaultRecognizer } from './speechRecognition';
import type { SpeechSession } from './speechRecognition';
import { defaultEvaluator } from './speechEvaluator';
import type { ReadingResult } from './speechEvaluator';
import { playSound } from '../audio/sounds';
import { getStrings, speechLocale } from '../i18n/strings';
import type { Lang } from '../i18n/strings';

export type ChallengeDebugActions = {
  simulateSuccess: () => void;
  simulateFailure: () => void;
  resetChallenge: () => void;
};

export type EvaluationInfo = {
  expected: string;
  transcript: string;
  result: ReadingResult;
};

type Status = 'ready' | 'listening' | 'success' | 'retry' | 'no-speech' | 'denied' | 'unavailable';

type ReadingChallengeProps = {
  prompt: ReadingPrompt;
  textCase: TextCasePreference;
  lang: Lang;
  /** Emoji do recurso ganho nesta missão (🪵, 🌱, 💎...) */
  rewardEmoji: string;
  onSuccess: (promptId: string) => void;
  onExit: () => void;
  onEvaluated?: (info: EvaluationInfo) => void;
  debugRef?: MutableRefObject<ChallengeDebugActions | null>;
};

export function ReadingChallenge({
  prompt,
  textCase,
  lang,
  rewardEmoji,
  onSuccess,
  onExit,
  onEvaluated,
  debugRef,
}: ReadingChallengeProps) {
  const t = getStrings(lang);
  const [status, setStatus] = useState<Status>('ready');
  const [attempt, setAttempt] = useState(0);
  const [heard, setHeard] = useState('');
  const [lastResult, setLastResult] = useState<ReadingResult | null>(null);
  const [praise] = useState(() => Math.floor(Math.random() * 3));
  const sessionRef = useRef<SpeechSession | null>(null);
  const successTimer = useRef<number | undefined>(undefined);

  const displayText = applyTextCase(prompt.text, textCase);
  const displayWords = displayText.split(/\s+/);

  const finishSuccess = () => {
    setStatus('success');
    playSound('success');
    window.clearTimeout(successTimer.current);
    successTimer.current = window.setTimeout(() => {
      playSound('wood');
      onSuccess(prompt.id);
    }, 1700);
  };

  const handleTranscript = (transcript: string) => {
    const result = defaultEvaluator.evaluate(prompt.text, transcript);
    setLastResult(result);
    onEvaluated?.({ expected: prompt.text, transcript, result });

    // 'soft' vale como acerto a partir da segunda tentativa
    if (result.outcome === 'success' || (result.outcome === 'soft' && attempt >= 1)) {
      finishSuccess();
    } else {
      setAttempt((a) => a + 1);
      setStatus('retry');
      playSound('retry');
    }
  };

  const startListening = () => {
    if (!defaultRecognizer.isAvailable()) {
      setStatus('unavailable');
      return;
    }
    playSound('mic-on');
    setStatus('listening');
    setHeard('');
    sessionRef.current = defaultRecognizer.listen(
      {
        onInterim: (text) => setHeard(text),
        onResult: (transcript) => {
          playSound('mic-off');
          handleTranscript(transcript);
        },
        onError: (error) => {
          if (error === 'no-speech') setStatus('no-speech');
          else if (error === 'denied') setStatus('denied');
          else if (error === 'unavailable') setStatus('unavailable');
          else setStatus('no-speech');
        },
      },
      speechLocale[lang],
    );
  };

  // Ações de debug (simular leitura sem microfone)
  useEffect(() => {
    if (!debugRef) return;
    debugRef.current = {
      simulateSuccess: () => handleTranscript(prompt.text),
      simulateFailure: () => handleTranscript('abacaxi roxo voando'),
      resetChallenge: () => {
        sessionRef.current?.cancel();
        window.clearTimeout(successTimer.current);
        setStatus('ready');
        setAttempt(0);
        setLastResult(null);
      },
    };
    return () => {
      debugRef.current = null;
    };
  });

  // Limpeza ao desmontar
  useEffect(
    () => () => {
      sessionRef.current?.cancel();
      window.clearTimeout(successTimer.current);
    },
    [],
  );

  const showMissedWords = (status === 'retry' || status === 'listening') && attempt > 0 && lastResult;
  const micDisabled = status === 'listening' || status === 'success';

  return (
    <div className="reading-screen">
      <button type="button" className="reading-back" onClick={onExit} aria-label="Voltar">
        ←
      </button>

      <div className="reading-card">
        <p className="reading-text" lang="pt-BR">
          {displayWords.map((word, i) => {
            const match = lastResult?.wordMatches[i];
            const missed = showMissedWords && match && !match.matched;
            return (
              <span key={`${word}-${i}`} className={missed ? 'word word-missed' : 'word'}>
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>

      <div className="reading-feedback">
        {status === 'success' && (
          <div className="feedback success pop-in">
            <span className="feedback-big">{t.praise[praise % t.praise.length]}</span>
            <span className="wood-reward">{rewardEmoji} +1</span>
          </div>
        )}
        {status === 'retry' && (
          <div className="feedback retry pop-in">
            <span className="feedback-big">{t.almost}</span>
            <span className="feedback-small">{t.tryAgain}</span>
          </div>
        )}
        {status === 'no-speech' && (
          <div className="feedback retry pop-in">
            <span className="feedback-big">{t.didntHear}</span>
            <span className="feedback-small">{t.speakClose}</span>
          </div>
        )}
        {status === 'listening' && (
          <div className="feedback listening-wrap">
            <span className="feedback listening">{t.listening}</span>
            {heard && <span className="heard-text">{heard.toLocaleLowerCase(speechLocale[lang])}</span>}
          </div>
        )}
        {status === 'ready' && <div className="feedback hint">{t.tapAndRead}</div>}
        {status === 'denied' && (
          <div className="feedback problem">
            <span className="feedback-small">{t.micBlocked}</span>
            <span className="feedback-tiny">{t.micBlockedHint}</span>
          </div>
        )}
        {status === 'unavailable' && (
          <div className="feedback problem">
            <span className="feedback-small">{t.noSpeechApi}</span>
            <span className="feedback-tiny">{t.noSpeechApiHint}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className={`mic-button ${status === 'listening' ? 'listening' : ''}`}
        onClick={startListening}
        disabled={micDisabled}
        aria-label="Falar"
      >
        {status === 'listening' && (
          <>
            <span className="mic-ring" />
            <span className="mic-ring delay" />
          </>
        )}
        🎤
      </button>
    </div>
  );
}
