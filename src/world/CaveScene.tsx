import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { Chest, Fox, Rock, Sparkle } from './parts';

type SceneProps = {
  state: GameState;
  onOpenChest: () => void;
};

/** Posições dos 5 lampiões */
const LANTERNS: Array<{ x: number; y: number }> = [
  { x: 490, y: 420 },
  { x: 590, y: 455 },
  { x: 690, y: 420 },
  { x: 790, y: 455 },
  { x: 890, y: 420 },
];

/** Missão 4: a caverna escura que se ilumina lampião a lampião. */
export function CaveScene({ state, onOpenChest }: SceneProps) {
  const { phase, resources } = state;
  const lit = ['transforming', 'transformed', 'approach', 'chest', 'reward'].includes(phase);
  const celebrating = ['transformed', 'approach', 'chest', 'reward'].includes(phase);
  const avatarDeep = ['approach', 'chest', 'reward'].includes(phase);
  // A escuridão diminui a cada lampião aceso
  const darkness = lit ? 0 : 0.52 - resources * 0.09;

  return (
    <>
      <defs>
        <linearGradient id="cavebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241b3e" />
          <stop offset="0.6" stopColor="#3a2c52" />
          <stop offset="1" stopColor="#4a3a60" />
        </linearGradient>
        <linearGradient id="cavefloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4a6e" />
          <stop offset="1" stopColor="#443655" />
        </linearGradient>
      </defs>

      {/* fundo da caverna */}
      <rect x="0" y="0" width="1000" height="600" fill="url(#cavebg)" />

      {/* estalactites */}
      <path
        d="M 0 0 L 1000 0 L 1000 60 L 950 130 L 910 60 L 860 150 L 820 65 L 760 120 L 720 55 L 660 140 L 620 60 L 560 120 L 520 55 L 460 135 L 420 60 L 360 115 L 320 50 L 260 130 L 220 60 L 160 110 L 120 50 L 60 120 L 30 55 L 0 90 Z"
        fill="#1c1433"
      />

      {/* entrada iluminada à esquerda */}
      <path d="M 0 180 Q 90 190 110 320 Q 120 470 60 600 L 0 600 Z" fill="#9d7bc0" opacity="0.5" />
      <path d="M 0 220 Q 70 230 85 330 Q 92 460 45 600 L 0 600 Z" fill="#f5deb0" opacity="0.35" />

      {/* chão */}
      <rect x="0" y="300" width="1000" height="300" fill="url(#cavefloor)" />
      <ellipse cx="500" cy="310" rx="430" ry="26" fill="#6a5880" opacity="0.5" />

      {/* cristais nas paredes */}
      <g opacity={lit ? 1 : 0.4 + resources * 0.12} style={{ transition: 'opacity 1s ease' }}>
        <g fill="#5ed3f0">
          <path d="M 150 250 L 165 200 L 180 250 Z" />
          <path d="M 175 260 L 185 225 L 196 260 Z" opacity="0.8" />
        </g>
        <g fill="#c39bf0">
          <path d="M 840 240 L 858 185 L 876 240 Z" />
          <path d="M 870 250 L 882 215 L 894 250 Z" opacity="0.8" />
        </g>
        <g fill="#8ff0b4">
          <path d="M 350 275 L 362 235 L 374 275 Z" />
        </g>
      </g>

      {/* cogumelos brilhantes */}
      <g>
        <Mushroom x={150} y={540} color="#5ed3f0" />
        <Mushroom x={420} y={565} color="#f26d9c" />
        <Mushroom x={950} y={545} color="#8ff0b4" />
      </g>

      <Rock x={260} y={515} />
      <Rock x={560} y={555} />

      {/* morcego pendurado */}
      <g transform="translate(320 130)">
        <g className="bat-swing tb">
          <path d="M -18 8 Q -10 -6 0 4 Q 10 -6 18 8 Q 8 4 0 12 Q -8 4 -18 8 Z" fill="#2b2140" />
          <circle cx="0" cy="14" r="8" fill="#2b2140" />
          <circle cx="-3" cy="13" r="1.8" fill="#f6d365" />
          <circle cx="3" cy="13" r="1.8" fill="#f6d365" />
        </g>
      </g>

      {/* lampiões */}
      {LANTERNS.map((lantern, i) => {
        const isLit = i < resources || lit;
        return (
          <g key={i} transform={`translate(${lantern.x} ${lantern.y})`}>
            {isLit && <ellipse cx="0" cy="-18" rx="46" ry="38" fill="#ffd95e" opacity="0.18" />}
            {/* poste */}
            <rect x="-3" y="0" width="6" height="90" rx="3" fill="#3a2c52" />
            <ellipse cx="0" cy="92" rx="14" ry="5" fill="#2b2140" />
            {/* lampião */}
            <g className={isLit ? 'lantern-pop' : undefined}>
              <rect x="-13" y="-40" width="26" height="34" rx="7" fill={isLit ? '#ffe9a1' : '#55486b'} stroke="#2b2140" strokeWidth="3" />
              <rect x="-6" y="-46" width="12" height="8" rx="3" fill="#2b2140" />
              {isLit && <circle cx="0" cy="-23" r="6" fill="#ffb347" className="chest-light" />}
            </g>
          </g>
        );
      })}

      {(phase === 'transforming' || celebrating) && (
        <g>
          <Sparkle x={540} y={370} delay={0.4} />
          <Sparkle x={740} y={355} delay={1.1} />
          <Sparkle x={880} y={370} delay={1.8} />
        </g>
      )}

      {/* baú no fundo da caverna */}
      {celebrating && (
        <g className="pop-in-svg">
          <Chest
            x={700}
            y={470}
            open={phase === 'reward'}
            glowing={phase === 'chest'}
            onClick={phase === 'chest' ? onOpenChest : undefined}
          />
        </g>
      )}

      {/* raposa guia */}
      <g transform="translate(300 402)">
        <g className={phase === 'intro' ? 'fox-excited' : phase === 'transformed' ? 'fox-celebrate' : 'fox-idle'}>
          <Fox waving={phase === 'intro'} />
        </g>
      </g>

      {/* avatar */}
      {state.avatar && (
        <g
          className="avatar-mover"
          style={{
            transform: avatarDeep ? 'translate(560px, 362px)' : 'translate(175px, 366px)',
            transition: phase === 'approach' ? 'transform 2.8s ease-in-out' : undefined,
          }}
        >
          <g className={phase === 'approach' ? 'walking' : 'avatar-idle'}>
            <AvatarSprite config={state.avatar} equipped={state.equippedCosmetics} />
          </g>
        </g>
      )}

      {/* véu de escuridão que diminui a cada lampião */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="600"
        fill="#0d0a1e"
        style={{ opacity: darkness, transition: 'opacity 1.2s ease' }}
        pointerEvents="none"
      />
    </>
  );
}

function Mushroom({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-4" y="0" width="8" height="16" rx="4" fill="#d8cbb0" />
      <path d="M -16 4 Q -16 -14 0 -14 Q 16 -14 16 4 Z" fill={color} opacity="0.9" />
      <circle cx="-6" cy="-5" r="2.5" fill="#ffffff" opacity="0.7" />
      <circle cx="6" cy="-3" r="2" fill="#ffffff" opacity="0.7" />
    </g>
  );
}
