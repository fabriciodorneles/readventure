import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { Bush, Butterfly, Chest, Flower, Fox, Rock, Sparkle, Tree } from './parts';

type SceneProps = {
  state: GameState;
  onOpenChest: () => void;
};

/** Missão 1: a ponte quebrada sobre o rio. */
export function BridgeScene({ state, onOpenChest }: SceneProps) {
  const { phase } = state;
  const bridgeComplete = ['transformed', 'approach', 'chest', 'reward'].includes(phase);
  const newAreaRevealed = ['approach', 'chest', 'reward'].includes(phase);
  const avatarOnRight = ['approach', 'chest', 'reward'].includes(phase);

  return (
    <>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd7f7" />
          <stop offset="0.7" stopColor="#c9ecfa" />
          <stop offset="1" stopColor="#f3f7d9" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ecf5e" />
          <stop offset="1" stopColor="#57a944" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd0ec" />
          <stop offset="1" stopColor="#3f9fd6" />
        </linearGradient>
        <linearGradient id="fogGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#243447" stopOpacity="0" />
          <stop offset="0.25" stopColor="#243447" stopOpacity="0.82" />
          <stop offset="1" stopColor="#16202e" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* céu e sol */}
      <rect x="0" y="0" width="1000" height="600" fill="url(#sky)" />
      <circle cx="870" cy="85" r="62" fill="#ffe9a1" opacity="0.5" />
      <circle cx="870" cy="85" r="42" fill="#ffd95e" />

      {/* nuvens */}
      <g className="cloud cloud-a" fill="#ffffff" opacity="0.9">
        <ellipse cx="180" cy="90" rx="52" ry="20" />
        <ellipse cx="220" cy="78" rx="38" ry="17" />
        <ellipse cx="140" cy="80" rx="30" ry="14" />
      </g>
      <g className="cloud cloud-b" fill="#ffffff" opacity="0.75">
        <ellipse cx="560" cy="60" rx="44" ry="16" />
        <ellipse cx="595" cy="50" rx="30" ry="13" />
      </g>

      {/* linha de árvores distante */}
      <path
        d="M 0 300 Q 40 230 90 280 Q 130 220 180 275 Q 230 215 285 278 Q 330 235 380 285 Q 430 240 480 290 L 480 310 L 0 310 Z"
        fill="#3f7d3a"
        opacity="0.85"
      />
      <path
        d="M 540 295 Q 590 225 645 280 Q 690 220 745 278 Q 800 225 850 282 Q 900 235 950 285 Q 975 260 1000 290 L 1000 315 L 540 315 Z"
        fill="#2f6136"
      />

      {/* torre misteriosa ao longe */}
      <g opacity={newAreaRevealed ? 1 : 0.55}>
        <rect x="885" y="185" width="46" height="120" rx="6" fill="#6d5a8e" />
        <path d="M 878 190 L 908 138 L 938 190 Z" fill="#8a6fb1" />
        <rect x="901" y="215" width="14" height="20" rx="7" fill="#f6d365" />
        <path d="M 908 138 L 908 118 L 934 126 L 908 133 Z" fill="#e74c3c" />
      </g>

      {/* chão */}
      <rect x="0" y="300" width="1000" height="300" fill="url(#ground)" />
      <ellipse cx="150" cy="305" rx="220" ry="26" fill="#9ed86e" opacity="0.7" />
      <ellipse cx="800" cy="308" rx="260" ry="30" fill="#79bd52" opacity="0.6" />

      {/* rio */}
      <path d="M 492 300 C 472 400 452 500 430 600 L 622 600 C 594 500 572 400 544 300 Z" fill="url(#water)" />
      <g stroke="#dff4fd" strokeWidth="4" strokeLinecap="round" opacity="0.7">
        <path className="ripple" d="M 480 380 q 14 6 28 0" fill="none" />
        <path className="ripple ripple-b" d="M 495 460 q 16 7 32 0" fill="none" />
        <path className="ripple ripple-c" d="M 470 530 q 18 8 36 0" fill="none" />
      </g>

      {/* margens da ponte */}
      <ellipse cx="430" cy="505" rx="34" ry="14" fill="#6b4a26" />
      <ellipse cx="622" cy="505" rx="34" ry="14" fill="#6b4a26" />

      <Bridge phase={phase} complete={bridgeComplete} />

      {/* cenário esquerdo */}
      <g className="sway slow" style={{ transformOrigin: '80px 470px' }}>
        <Tree x={40} y={310} scale={1.15} />
      </g>
      <Bush x={120} y={480} />
      <Bush x={555} y={555} small />
      <Rock x={295} y={505} />
      <Flower x={95} y={540} color="#f26d9c" />
      <Flower x={160} y={555} color="#f6c945" />
      <Flower x={265} y={545} color="#9b59d6" />
      <Butterfly />

      {/* nova área (revelada depois da travessia) */}
      <g>
        <Tree x={655} y={330} scale={0.9} />
        <Tree x={935} y={330} scale={1.0} />
        <Flower x={700} y={545} color="#f26d9c" />
        <Flower x={860} y={555} color="#f6c945" />
        <Flower x={815} y={530} color="#ff8c42" />
        <Bush x={905} y={500} small />
        <Chest
          x={822}
          y={448}
          open={phase === 'reward'}
          glowing={phase === 'chest'}
          onClick={phase === 'chest' ? onOpenChest : undefined}
        />
      </g>

      {/* névoa que esconde a nova área */}
      <path
        className="fog"
        d="M 610 285 L 1000 285 L 1000 600 L 615 600 C 640 500 630 390 610 285 Z"
        fill="url(#fogGrad)"
        style={{ opacity: newAreaRevealed ? 0 : 1 }}
        pointerEvents="none"
      />

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
            transform: avatarOnRight ? 'translate(700px, 362px)' : 'translate(175px, 366px)',
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

function Bridge({ phase, complete }: { phase: string; complete: boolean }) {
  const building = phase === 'transforming';
  const plankXs = [437, 463, 489, 515, 541, 567, 593];
  const archY = [0, -4, -7, -8, -7, -4, 0];

  if (!building && !complete) {
    return (
      <g>
        <rect x="425" y="440" width="10" height="70" rx="4" fill="#7a4a21" />
        <rect x="617" y="440" width="10" height="70" rx="4" fill="#7a4a21" />
        <g transform="rotate(24 445 505)">
          <rect x="437" y="452" width="22" height="52" rx="5" fill="#a06a33" stroke="#7a4a21" strokeWidth="2" />
        </g>
        <g transform="rotate(-18 610 505)">
          <rect x="593" y="452" width="22" height="52" rx="5" fill="#a06a33" stroke="#7a4a21" strokeWidth="2" />
        </g>
        <g className="floating-plank">
          <rect x="505" y="555" width="46" height="16" rx="5" fill="#8a5a2b" transform="rotate(9 528 563)" />
        </g>
      </g>
    );
  }

  return (
    <g>
      <rect x="425" y="440" width="10" height="70" rx="4" fill="#7a4a21" />
      <rect x="617" y="440" width="10" height="70" rx="4" fill="#7a4a21" />
      {plankXs.map((x, i) => (
        <rect
          key={x}
          className={building ? 'plank-drop' : undefined}
          style={building ? { animationDelay: `${i * 0.35}s` } : undefined}
          x={x}
          y={450 + archY[i]}
          width="23"
          height="56"
          rx="5"
          fill={i % 2 === 0 ? '#a06a33' : '#b0793d'}
          stroke="#7a4a21"
          strokeWidth="2"
        />
      ))}
      <path
        d="M 428 448 Q 526 428 624 448"
        stroke="#7a4a21"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        className={building ? 'rail-appear' : undefined}
      />
      {building && (
        <g>
          <Sparkle x={470} y={430} delay={0.8} />
          <Sparkle x={530} y={415} delay={1.4} />
          <Sparkle x={590} y={432} delay={2.0} />
        </g>
      )}
    </g>
  );
}
