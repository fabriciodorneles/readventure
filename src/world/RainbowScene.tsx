import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { Chest, Fox, Sparkle } from './parts';

type SceneProps = {
  state: GameState;
  onOpenChest: () => void;
};

const BAND_COLORS = ['#e74c3c', '#ff8c42', '#f6c945', '#22c55e', '#3b82f6'];
const BAND_RADII = [350, 322, 294, 266, 238];
const BAND_WIDTH = 26;

/** Missão 6: acima das nuvens, pintando o arco-íris cor a cor. */
export function RainbowScene({ state, onOpenChest }: SceneProps) {
  const { phase, resources } = state;
  const painted = ['transforming', 'transformed', 'approach', 'chest', 'reward', 'complete'].includes(phase);
  const celebrating = ['transformed', 'approach', 'chest', 'reward', 'complete'].includes(phase);
  const avatarFar = ['approach', 'chest', 'reward', 'complete'].includes(phase);

  return (
    <>
      <defs>
        <linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6db9ea" />
          <stop offset="0.7" stopColor="#a5dcf7" />
          <stop offset="1" stopColor="#e3f4fd" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1000" height="600" fill="url(#rsky)" />
      <circle cx="875" cy="90" r="62" fill="#ffe9a1" opacity="0.5" />
      <circle cx="875" cy="90" r="42" fill="#ffd95e" />

      {/* passarinhos */}
      <g stroke="#3d5a73" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="bird" d="M 200 120 q 10 -10 20 0 q 10 -10 20 0" />
        <path className="bird b2" d="M 320 80 q 8 -8 16 0 q 8 -8 16 0" />
      </g>

      {/* arco-íris: faixas fantasma que ganham cor */}
      {BAND_RADII.map((radius, i) => {
        const isPainted = i < resources || painted;
        return (
          <path
            key={i}
            className={isPainted ? 'band-pop' : undefined}
            d={`M ${600 - radius} 560 A ${radius} ${radius} 0 0 1 ${600 + radius} 560`}
            stroke={isPainted ? BAND_COLORS[i] : 'rgba(255,255,255,0.35)'}
            strokeWidth={BAND_WIDTH}
            fill="none"
            style={{ transition: 'stroke 0.5s ease' }}
          />
        );
      })}

      {/* chão de nuvens */}
      <g fill="#ffffff">
        <ellipse cx="120" cy="560" rx="220" ry="80" />
        <ellipse cx="400" cy="580" rx="240" ry="85" />
        <ellipse cx="690" cy="560" rx="230" ry="82" />
        <ellipse cx="920" cy="585" rx="210" ry="85" />
        <ellipse cx="250" cy="530" rx="130" ry="45" opacity="0.9" />
        <ellipse cx="600" cy="535" rx="150" ry="48" opacity="0.9" />
        <ellipse cx="870" cy="528" rx="120" ry="42" opacity="0.9" />
      </g>
      <g fill="#e8f4fb">
        <ellipse cx="180" cy="595" rx="200" ry="60" />
        <ellipse cx="520" cy="605" rx="230" ry="60" />
        <ellipse cx="850" cy="598" rx="200" ry="58" />
      </g>

      {/* balão estacionado à esquerda */}
      <g transform="translate(60 330) scale(0.55)">
        <path d="M 100 170 L 62 275 M 100 185 L 100 275 M 100 170 L 138 275" stroke="#6b4a26" strokeWidth="4" fill="none" />
        <ellipse cx="100" cy="90" rx="95" ry="105" fill="#e74c3c" />
        <path d="M 100 -15 Q 40 90 100 195 Q 70 90 100 -15" fill="#f6c945" />
        <path d="M 100 -15 Q 160 90 100 195 Q 130 90 100 -15" fill="#f6c945" />
        <rect x="70" y="272" width="60" height="44" rx="8" fill="#a3733c" stroke="#6b4a26" strokeWidth="3" />
      </g>

      {(phase === 'transforming' || celebrating) && (
        <g>
          <Sparkle x={420} y={280} delay={0.3} />
          <Sparkle x={620} y={240} delay={0.9} />
          <Sparkle x={790} y={300} delay={1.5} />
          <Sparkle x={540} y={350} delay={2.1} />
        </g>
      )}

      {/* baú no fim do arco-íris */}
      {celebrating && phase !== 'complete' && (
        <g className="pop-in-svg">
          <Chest
            x={840}
            y={455}
            open={phase === 'reward'}
            glowing={phase === 'chest'}
            onClick={phase === 'chest' ? onOpenChest : undefined}
          />
        </g>
      )}

      {/* final: chuva de brilhos */}
      {phase === 'complete' && (
        <g>
          <Sparkle x={250} y={150} delay={0} />
          <Sparkle x={480} y={100} delay={0.6} />
          <Sparkle x={700} y={160} delay={1.2} />
          <Sparkle x={880} y={220} delay={1.8} />
          <Sparkle x={150} y={260} delay={2.4} />
          <Sparkle x={600} y={300} delay={3.0} />
        </g>
      )}

      {/* raposa guia */}
      <g transform="translate(300 402)">
        <g
          className={
            phase === 'intro' ? 'fox-excited' : phase === 'transformed' || phase === 'complete' ? 'fox-celebrate' : 'fox-idle'
          }
        >
          <Fox waving={phase === 'intro'} />
        </g>
      </g>

      {/* avatar */}
      {state.avatar && (
        <g
          className="avatar-mover"
          style={{
            transform: avatarFar ? 'translate(700px, 360px)' : 'translate(175px, 366px)',
            transition: phase === 'approach' ? 'transform 2.8s ease-in-out' : undefined,
          }}
        >
          <g className={phase === 'approach' ? 'walking' : 'avatar-idle'}>
            <AvatarSprite config={state.avatar} equipped={state.equippedCosmetics} />
          </g>
        </g>
      )}
    </>
  );
}
