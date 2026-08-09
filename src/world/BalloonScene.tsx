import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { Bush, Butterfly, Chest, Flower, Fox, Sparkle, Tree } from './parts';

type SceneProps = {
  state: GameState;
  onOpenChest: () => void;
};

const PATCH_COLORS = ['#e74c3c', '#f6c945', '#22c55e', '#3b82f6', '#f26d9c'];
/** Posições dos remendos no balão murcho (deitado no chão) */
const FLAT_PATCHES: Array<{ x: number; y: number; r: number }> = [
  { x: 700, y: 470, r: -12 },
  { x: 760, y: 488, r: 8 },
  { x: 820, y: 468, r: -6 },
  { x: 880, y: 486, r: 14 },
  { x: 935, y: 470, r: -10 },
];
/** Posições dos remendos no balão cheio */
const FULL_PATCHES: Array<{ x: number; y: number; r: number }> = [
  { x: 730, y: 200, r: -14 },
  { x: 800, y: 150, r: 10 },
  { x: 860, y: 230, r: -8 },
  { x: 760, y: 280, r: 12 },
  { x: 845, y: 320, r: -12 },
];

/** Missão 5: o balão furado que ganha remendos até encher. */
export function BalloonScene({ state, onOpenChest }: SceneProps) {
  const { phase, resources } = state;
  const inflated = ['transforming', 'transformed', 'approach', 'chest', 'reward'].includes(phase);
  const celebrating = ['transformed', 'approach', 'chest', 'reward'].includes(phase);
  const avatarNear = ['approach', 'chest', 'reward'].includes(phase);

  return (
    <>
      <defs>
        <linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd7f7" />
          <stop offset="0.7" stopColor="#d3effb" />
          <stop offset="1" stopColor="#f7f3d5" />
        </linearGradient>
        <linearGradient id="bground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93cf63" />
          <stop offset="1" stopColor="#57a944" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1000" height="600" fill="url(#bsky)" />
      <circle cx="120" cy="95" r="58" fill="#ffe9a1" opacity="0.5" />
      <circle cx="120" cy="95" r="38" fill="#ffd95e" />
      <g className="cloud cloud-a" fill="#ffffff" opacity="0.9">
        <ellipse cx="480" cy="80" rx="52" ry="20" />
        <ellipse cx="520" cy="66" rx="38" ry="17" />
      </g>
      <g className="cloud cloud-b" fill="#ffffff" opacity="0.75">
        <ellipse cx="820" cy="70" rx="40" ry="15" />
      </g>

      {/* colinas */}
      <path d="M 0 310 Q 260 220 520 305 L 520 320 L 0 320 Z" fill="#7fc25c" opacity="0.8" />
      <path d="M 470 308 Q 740 230 1000 302 L 1000 320 L 470 320 Z" fill="#6ab04f" opacity="0.9" />

      <rect x="0" y="300" width="1000" height="300" fill="url(#bground)" />
      <ellipse cx="500" cy="310" rx="430" ry="28" fill="#a4da74" opacity="0.6" />

      {/* cenário */}
      <g className="sway slow" style={{ transformOrigin: '80px 470px' }}>
        <Tree x={30} y={315} scale={1.1} />
      </g>
      <Bush x={140} y={490} />
      <Bush x={460} y={555} small />
      <Flower x={110} y={548} color="#f26d9c" />
      <Flower x={230} y={560} color="#4fb0e8" />
      <Flower x={430} y={575} color="#f6c945" />
      <Butterfly />

      {/* cesto do balão */}
      <g transform="translate(600 440)">
        <rect x="0" y="0" width="90" height="66" rx="10" fill="#a3733c" stroke="#6b4a26" strokeWidth="3" />
        <path d="M 0 22 L 90 22 M 0 44 L 90 44 M 30 0 L 30 66 M 60 0 L 60 66" stroke="#6b4a26" strokeWidth="2.5" opacity="0.6" />
        {/* saco de areia */}
        <g transform="translate(-26 34)">
          <path d="M 0 0 Q 12 -6 24 0 L 20 30 Q 12 34 4 30 Z" fill="#d9b06c" stroke="#a3733c" strokeWidth="2" />
        </g>
      </g>

      {inflated ? (
        /* balão cheio */
        <g className={phase === 'transforming' ? 'balloon-inflate' : undefined}>
          {/* cordas */}
          <path d="M 700 340 L 618 445 M 800 370 L 645 445 M 890 340 L 672 445" stroke="#6b4a26" strokeWidth="3" fill="none" />
          {/* envelope */}
          <ellipse cx="795" cy="215" rx="150" ry="165" fill="#e74c3c" />
          <path d="M 795 50 Q 700 215 795 380 Q 745 215 795 50" fill="#f6c945" />
          <path d="M 795 50 Q 890 215 795 380 Q 845 215 795 50" fill="#f6c945" />
          <path d="M 795 50 Q 645 140 650 240 Q 700 120 795 50" fill="#3b82f6" opacity="0.85" />
          <path d="M 795 50 Q 945 140 940 240 Q 890 120 795 50" opacity="0.85" fill="#3b82f6" />
          {/* remendos */}
          {FULL_PATCHES.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
              <rect x="-16" y="-12" width="32" height="24" rx="6" fill={PATCH_COLORS[i]} stroke="#fff" strokeWidth="2.5" strokeDasharray="5 4" />
            </g>
          ))}
        </g>
      ) : (
        /* balão murcho no chão */
        <g>
          <path
            d="M 660 490 Q 680 450 740 462 Q 790 440 850 460 Q 920 445 955 475 Q 970 495 940 502 Q 880 512 800 508 Q 720 512 672 502 Q 650 498 660 490 Z"
            fill="#c0392b"
          />
          <path d="M 690 480 Q 760 468 850 476 M 710 495 Q 800 488 910 490" stroke="#8f2a1e" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 662 492 L 640 470 L 655 492 Z" fill="#8f2a1e" />
          {/* remendos aplicados um a um */}
          {FLAT_PATCHES.map((p, i) =>
            i < resources ? (
              <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`} className="gem-pop">
                <rect x="-15" y="-11" width="30" height="22" rx="6" fill={PATCH_COLORS[i]} stroke="#fff" strokeWidth="2.5" strokeDasharray="5 4" />
              </g>
            ) : null,
          )}
        </g>
      )}

      {(phase === 'transforming' || celebrating) && (
        <g>
          <Sparkle x={680} y={380} delay={0.4} />
          <Sparkle x={840} y={360} delay={1.1} />
          <Sparkle x={770} y={420} delay={1.8} />
        </g>
      )}

      {/* baú ao lado do cesto */}
      {celebrating && (
        <g className="pop-in-svg">
          <Chest
            x={480}
            y={470}
            open={phase === 'reward'}
            glowing={phase === 'chest'}
            onClick={phase === 'chest' ? onOpenChest : undefined}
          />
        </g>
      )}

      {/* raposa guia */}
      <g transform="translate(280 402)">
        <g className={phase === 'intro' ? 'fox-excited' : phase === 'transformed' ? 'fox-celebrate' : 'fox-idle'}>
          <Fox waving={phase === 'intro'} />
        </g>
      </g>

      {/* avatar */}
      {state.avatar && (
        <g
          className="avatar-mover"
          style={{
            transform: avatarNear ? 'translate(380px, 362px)' : 'translate(160px, 366px)',
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
