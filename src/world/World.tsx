import { useEffect, useState } from 'react';
import type { GameState } from '../game/gameState';
import { MISSIONS } from '../game/missions';
import { BridgeScene } from './BridgeScene';
import { GardenScene } from './GardenScene';
import { TowerScene } from './TowerScene';
import { CaveScene } from './CaveScene';
import { BalloonScene } from './BalloonScene';
import { RainbowScene } from './RainbowScene';
import { playSound } from '../audio/sounds';
import { getStrings } from '../i18n/strings';

type WorldProps = {
  state: GameState;
  onIntroDone: () => void;
  onStartReading: () => void;
  onTransformDone: () => void;
  onGo: () => void;
  onApproachDone: () => void;
  onOpenChest: () => void;
};

export function World({
  state,
  onIntroDone,
  onStartReading,
  onTransformDone,
  onGo,
  onApproachDone,
  onOpenChest,
}: WorldProps) {
  const { phase, missionIndex, language } = state;
  const mission = MISSIONS[missionIndex];
  const t = getStrings(language);
  const introLines = mission.introLines[language];
  const [introStep, setIntroStep] = useState(0);

  // Nova missão: recomeça o diálogo de introdução
  useEffect(() => {
    setIntroStep(0);
  }, [missionIndex]);

  // Animação de transformação do mundo: toca o som e avança sozinha
  useEffect(() => {
    if (phase !== 'transforming') return;
    playSound('build');
    const timer = window.setTimeout(onTransformDone, 3600);
    return () => window.clearTimeout(timer);
  }, [phase, onTransformDone]);

  // Caminhada do avatar até a área nova
  useEffect(() => {
    if (phase !== 'approach') return;
    const timer = window.setTimeout(onApproachDone, 3000);
    return () => window.clearTimeout(timer);
  }, [phase, onApproachDone]);

  const advanceIntro = () => {
    playSound('tap');
    if (introStep < introLines.length - 1) setIntroStep(introStep + 1);
    else onIntroDone();
  };

  return (
    <div className="world-frame">
      <svg className="world-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        {missionIndex === 0 && <BridgeScene state={state} onOpenChest={onOpenChest} />}
        {missionIndex === 1 && <GardenScene state={state} onOpenChest={onOpenChest} />}
        {missionIndex === 2 && <TowerScene state={state} onOpenChest={onOpenChest} />}
        {missionIndex === 3 && <CaveScene state={state} onOpenChest={onOpenChest} />}
        {missionIndex === 4 && <BalloonScene state={state} onOpenChest={onOpenChest} />}
        {missionIndex === 5 && <RainbowScene state={state} onOpenChest={onOpenChest} />}
      </svg>

      {/* HUD do recurso da missão */}
      {['collecting', 'transforming', 'transformed'].includes(phase) && (
        <div className="hud-wood" key={state.resources}>
          {mission.resourceEmoji} {state.resources} / {mission.goal}
        </div>
      )}

      {/* balões de fala */}
      {phase === 'intro' && (
        <button type="button" className="speech-bubble" style={{ left: '30%', top: '52%' }} onClick={advanceIntro}>
          {introLines[introStep]}
          <span className="bubble-hint">▶</span>
        </button>
      )}
      {phase === 'transformed' && (
        <div className="speech-bubble static" style={{ left: '30%', top: '52%' }}>
          {mission.celebrateLine[language]}
        </div>
      )}
      {phase === 'chest' && (
        <div className="speech-bubble static" style={{ left: '58%', top: '55%' }}>
          {t.openChest}
        </div>
      )}
      {phase === 'complete' && (
        <div className="speech-bubble static" style={{ right: '3%', top: '10%' }}>
          {t.newAdventure}
        </div>
      )}

      {/* ações principais */}
      {phase === 'collecting' && (
        <button type="button" className="big-button world-action pulse" onClick={onStartReading}>
          {t.read}
        </button>
      )}
      {phase === 'transformed' && (
        <button type="button" className="big-button world-action" onClick={onGo}>
          {mission.actionLabel[language]}
        </button>
      )}
    </div>
  );
}
