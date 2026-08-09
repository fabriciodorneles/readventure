import type { MutableRefObject } from 'react';
import type { GameState } from '../game/gameState';
import type { ChallengeDebugActions, EvaluationInfo } from '../reading/ReadingChallenge';

type DebugPanelProps = {
  state: GameState;
  lastEval: EvaluationInfo | null;
  challengeActive: boolean;
  challengeActionsRef: MutableRefObject<ChallengeDebugActions | null>;
  onResetProgress: () => void;
};

/** Overlay para desenvolvimento (ativado com ?debug=true). Nunca aparece para a criança. */
export function DebugPanel({
  state,
  lastEval,
  challengeActive,
  challengeActionsRef,
  onResetProgress,
}: DebugPanelProps) {
  return (
    <div className="debug-panel">
      <div className="debug-title">DEBUG</div>
      <div>
        phase: <b>{state.phase}</b> | wood: {state.wood}/{state.woodGoal} | bridge:{' '}
        {state.bridgeBuilt ? 'yes' : 'no'}
      </div>
      {lastEval ? (
        <div className="debug-eval">
          <div>
            <span className="debug-label">Expected:</span> {lastEval.result.expectedNormalized}
          </div>
          <div>
            <span className="debug-label">Recognized:</span> {lastEval.transcript}
          </div>
          <div>
            <span className="debug-label">Similarity:</span> {Math.round(lastEval.result.score * 100)}% (
            {lastEval.result.outcome})
          </div>
          <div className="debug-words">
            {lastEval.result.wordMatches.map((w, i) => (
              <span key={i} className={w.matched ? 'debug-word ok' : 'debug-word bad'}>
                {w.expected} {w.matched ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="debug-eval muted">nenhuma leitura avaliada ainda</div>
      )}
      <div className="debug-actions">
        <button
          type="button"
          disabled={!challengeActive}
          onClick={() => challengeActionsRef.current?.simulateSuccess()}
        >
          ✓ simular acerto
        </button>
        <button
          type="button"
          disabled={!challengeActive}
          onClick={() => challengeActionsRef.current?.simulateFailure()}
        >
          ✗ simular erro
        </button>
        <button
          type="button"
          disabled={!challengeActive}
          onClick={() => challengeActionsRef.current?.resetChallenge()}
        >
          ↺ reiniciar desafio
        </button>
        <button type="button" className="danger" onClick={onResetProgress}>
          🗑 zerar progresso
        </button>
      </div>
    </div>
  );
}
