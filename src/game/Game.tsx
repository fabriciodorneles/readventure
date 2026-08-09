import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { gameReducer, loadGameState, saveGameState } from './gameState';
import type { TextCasePreference } from './gameState';
import { MISSIONS } from './missions';
import { AvatarCreator } from '../avatar/AvatarCreator';
import { RewardArt } from '../avatar/Avatar';
import { cosmeticById } from '../avatar/cosmetics';
import { World } from '../world/World';
import { ReadingChallenge } from '../reading/ReadingChallenge';
import type { ChallengeDebugActions, EvaluationInfo } from '../reading/ReadingChallenge';
import { getNextPrompt } from '../content/readingPrompts';
import type { ReadingPrompt } from '../content/readingPrompts';
import { DebugPanel } from '../debug/DebugPanel';
import { SettingsPanel } from '../settings/SettingsPanel';
import { playSound } from '../audio/sounds';

const DEBUG_ENABLED =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true';

export function Game() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadGameState);
  const [currentPrompt, setCurrentPrompt] = useState<ReadingPrompt | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lastEval, setLastEval] = useState<EvaluationInfo | null>(null);
  const challengeDebugRef = useRef<ChallengeDebugActions | null>(null);

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const startReading = useCallback(() => {
    playSound('tap');
    setCurrentPrompt(getNextPrompt(state.completedPrompts, state.resources));
  }, [state.completedPrompts, state.resources]);

  const handleReadingSuccess = useCallback((promptId: string) => {
    setCurrentPrompt(null);
    dispatch({ type: 'READING_SUCCESS', promptId });
  }, []);

  const resetProgress = useCallback(() => {
    setCurrentPrompt(null);
    dispatch({ type: 'RESET' });
  }, []);

  if (!state.avatar || state.phase === 'avatar-setup') {
    return (
      <div className="app">
        <AvatarCreator onDone={(avatar) => dispatch({ type: 'CREATE_AVATAR', avatar })} />
      </div>
    );
  }

  const rewardCosmetic = cosmeticById(MISSIONS[state.missionIndex].rewardId);

  return (
    <div className="app">
      <World
        state={state}
        onIntroDone={() => dispatch({ type: 'INTRO_DONE' })}
        onStartReading={startReading}
        onTransformDone={() => dispatch({ type: 'TRANSFORM_DONE' })}
        onGo={() => {
          playSound('tap');
          dispatch({ type: 'GO' });
        }}
        onApproachDone={() => dispatch({ type: 'APPROACH_DONE' })}
        onOpenChest={() => {
          playSound('chest');
          dispatch({ type: 'OPEN_CHEST' });
        }}
      />

      {currentPrompt && state.phase === 'collecting' && (
        <ReadingChallenge
          prompt={currentPrompt}
          textCase={state.textCase}
          rewardEmoji={MISSIONS[state.missionIndex].resourceEmoji}
          onSuccess={handleReadingSuccess}
          onExit={() => setCurrentPrompt(null)}
          onEvaluated={setLastEval}
          debugRef={DEBUG_ENABLED ? challengeDebugRef : undefined}
        />
      )}

      {state.phase === 'reward' && rewardCosmetic && (
        <div className="modal-backdrop reward-backdrop">
          <div className="reward-modal pop-in">
            <div className="reward-rays" />
            <RewardArt id={rewardCosmetic.id} />
            <p className="reward-name">✨ {rewardCosmetic.name.toLocaleUpperCase('pt-BR')} ✨</p>
            <button
              type="button"
              className="big-button"
              onClick={() => {
                playSound('equip');
                dispatch({ type: 'EQUIP_REWARD' });
              }}
            >
              USAR!
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="settings-gear"
        onClick={() => setSettingsOpen(true)}
        aria-label="Área dos pais"
      >
        ⚙
      </button>

      {settingsOpen && (
        <SettingsPanel
          textCase={state.textCase}
          onTextCaseChange={(value: TextCasePreference) => dispatch({ type: 'SET_TEXT_CASE', value })}
          onResetProgress={resetProgress}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {DEBUG_ENABLED && (
        <DebugPanel
          state={state}
          lastEval={lastEval}
          challengeActive={Boolean(currentPrompt)}
          challengeActionsRef={challengeDebugRef}
          onResetProgress={resetProgress}
        />
      )}
    </div>
  );
}
