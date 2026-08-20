import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { gameReducer, loadGameState, saveGameState } from './gameState';
import type { TextCasePreference } from './gameState';
import type { Lang } from '../i18n/strings';
import { MISSIONS } from './missions';
import { AvatarCreator } from '../avatar/AvatarCreator';
import { RewardModal } from './RewardModal';
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
    setCurrentPrompt(getNextPrompt(state.completedPrompts, state.resources, state.language));
  }, [state.completedPrompts, state.resources, state.language]);

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
        <AvatarCreator lang={state.language} onDone={(avatar) => dispatch({ type: 'CREATE_AVATAR', avatar })} />
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
          lang={state.language}
          rewardEmoji={MISSIONS[state.missionIndex].resourceEmoji}
          onSuccess={handleReadingSuccess}
          onExit={() => setCurrentPrompt(null)}
          onEvaluated={setLastEval}
          debugRef={DEBUG_ENABLED ? challengeDebugRef : undefined}
        />
      )}

      {state.phase === 'reward' && rewardCosmetic && (
        <RewardModal
          cosmetic={rewardCosmetic}
          textCase={state.textCase}
          lang={state.language}
          debugEnabled={DEBUG_ENABLED}
          onEquip={() => {
            playSound('equip');
            dispatch({ type: 'EQUIP_REWARD' });
          }}
        />
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
          lang={state.language}
          onTextCaseChange={(value: TextCasePreference) => dispatch({ type: 'SET_TEXT_CASE', value })}
          onLanguageChange={(value: Lang) => dispatch({ type: 'SET_LANGUAGE', value })}
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
