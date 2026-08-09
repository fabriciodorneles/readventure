import { useEffect, useRef, useState } from 'react';
import type { Cosmetic } from '../avatar/cosmetics';
import type { TextCasePreference } from './gameState';
import { RewardArt } from '../avatar/Avatar';
import { applyTextCase } from '../settings/settings';
import { defaultRecognizer } from '../reading/speechRecognition';
import type { SpeechSession } from '../reading/speechRecognition';
import { defaultEvaluator } from '../reading/speechEvaluator';
import { playSound } from '../audio/sounds';

type Status = 'ready' | 'listening' | 'retry' | 'unlocked';

type RewardModalProps = {
  cosmetic: Cosmetic;
  textCase: TextCasePreference;
  debugEnabled: boolean;
  onEquip: () => void;
};

/**
 * Modal do prêmio: para ganhar, a criança lê o nome do item em voz alta.
 * Se o microfone não estiver disponível, o item é liberado direto.
 */
export function RewardModal({ cosmetic, textCase, debugEnabled, onEquip }: RewardModalProps) {
  const [status, setStatus] = useState<Status>('ready');
  const [attempt, setAttempt] = useState(0);
  const sessionRef = useRef<SpeechSession | null>(null);

  const displayName = applyTextCase(cosmetic.name, textCase);
  const micAvailable = defaultRecognizer.isAvailable();

  const unlock = () => {
    setStatus('unlocked');
    playSound('success');
  };

  const handleTranscript = (transcript: string) => {
    const result = defaultEvaluator.evaluate(cosmetic.name, transcript);
    if (result.outcome === 'success' || (result.outcome === 'soft' && attempt >= 1)) {
      unlock();
    } else {
      setAttempt((a) => a + 1);
      setStatus('retry');
      playSound('retry');
    }
  };

  const startListening = () => {
    if (!micAvailable) {
      unlock();
      return;
    }
    playSound('mic-on');
    setStatus('listening');
    sessionRef.current = defaultRecognizer.listen({
      onResult: (transcript) => {
        playSound('mic-off');
        handleTranscript(transcript);
      },
      onError: (error) => {
        if (error === 'denied' || error === 'unavailable') unlock();
        else {
          setStatus('retry');
          playSound('retry');
        }
      },
    });
  };

  useEffect(
    () => () => {
      sessionRef.current?.cancel();
    },
    [],
  );

  return (
    <div className="modal-backdrop reward-backdrop">
      <div className="reward-modal pop-in">
        <div className="reward-rays" />
        <RewardArt id={cosmetic.id} />
        <p className="reward-name">✨ {displayName} ✨</p>

        {status === 'unlocked' ? (
          <button
            type="button"
            className="big-button pop-in"
            onClick={() => {
              playSound('equip');
              onEquip();
            }}
          >
            USAR!
          </button>
        ) : (
          <div className="reward-read">
            <span className="reward-read-hint">
              {status === 'listening'
                ? 'ESTOU OUVINDO... 👂'
                : status === 'retry'
                  ? 'QUASE! LEIA O NOME DE NOVO.'
                  : 'LEIA O NOME PARA GANHAR!'}
            </span>
            <button
              type="button"
              className={`mic-button small ${status === 'listening' ? 'listening' : ''}`}
              onClick={startListening}
              disabled={status === 'listening'}
              aria-label="Ler o nome do prêmio"
            >
              {status === 'listening' && (
                <>
                  <span className="mic-ring" />
                  <span className="mic-ring delay" />
                </>
              )}
              🎤
            </button>
            {debugEnabled && (
              <button type="button" className="reward-debug" onClick={unlock}>
                ✓ simular leitura
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
