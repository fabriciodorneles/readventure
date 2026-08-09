import { useEffect, useState } from 'react';
import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { playSound } from '../audio/sounds';

type WorldProps = {
  state: GameState;
  onIntroDone: () => void;
  onStartReading: () => void;
  onBuildDone: () => void;
  onCross: () => void;
  onCrossed: () => void;
  onOpenChest: () => void;
};

const INTRO_LINES = ['A PONTE QUEBROU!', 'PRECISAMOS DE 5 MADEIRAS!'];

export function World({
  state,
  onIntroDone,
  onStartReading,
  onBuildDone,
  onCross,
  onCrossed,
  onOpenChest,
}: WorldProps) {
  const { phase } = state;
  const [introStep, setIntroStep] = useState(0);

  // A ponte construída fica visível da fase de construção em diante
  const bridgeComplete = ['built', 'crossing', 'chest', 'hat', 'complete'].includes(phase);
  const newAreaRevealed = ['crossing', 'chest', 'hat', 'complete'].includes(phase);
  const avatarOnRight = ['crossing', 'chest', 'hat', 'complete'].includes(phase);

  // Animação de construção: toca o som e avança sozinha
  useEffect(() => {
    if (phase !== 'building') return;
    playSound('build');
    const timer = window.setTimeout(onBuildDone, 3600);
    return () => window.clearTimeout(timer);
  }, [phase, onBuildDone]);

  // Travessia: o avatar anda e chega do outro lado
  useEffect(() => {
    if (phase !== 'crossing') return;
    const timer = window.setTimeout(onCrossed, 3000);
    return () => window.clearTimeout(timer);
  }, [phase, onCrossed]);

  const advanceIntro = () => {
    playSound('tap');
    if (introStep < INTRO_LINES.length - 1) setIntroStep(introStep + 1);
    else onIntroDone();
  };

  return (
    <div className="world-frame">
      <svg className="world-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
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

        {/* torre misteriosa ao longe (nova área) */}
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
        <path
          d="M 492 300 C 472 400 452 500 430 600 L 622 600 C 594 500 572 400 544 300 Z"
          fill="url(#water)"
        />
        <g stroke="#dff4fd" strokeWidth="4" strokeLinecap="round" opacity="0.7">
          <path className="ripple ripple-a" d="M 480 380 q 14 6 28 0" fill="none" />
          <path className="ripple ripple-b" d="M 495 460 q 16 7 32 0" fill="none" />
          <path className="ripple ripple-c" d="M 470 530 q 18 8 36 0" fill="none" />
        </g>

        {/* margens da ponte */}
        <ellipse cx="430" cy="505" rx="34" ry="14" fill="#6b4a26" />
        <ellipse cx="622" cy="505" rx="34" ry="14" fill="#6b4a26" />

        {/* ponte */}
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
            open={phase === 'hat' || phase === 'complete'}
            glowing={phase === 'chest'}
            onClick={phase === 'chest' ? onOpenChest : undefined}
          />
          {phase === 'complete' && (
            <g className="sparkle-group">
              <Sparkle x={905} y={150} delay={0} />
              <Sparkle x={950} y={200} delay={0.5} />
              <Sparkle x={875} y={230} delay={1} />
            </g>
          )}
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
          <g className={phase === 'intro' ? 'fox-excited' : phase === 'built' || phase === 'complete' ? 'fox-celebrate' : 'fox-idle'}>
            <Fox waving={phase === 'intro'} />
          </g>
        </g>

        {/* avatar */}
        {state.avatar && (
          <g
            className="avatar-mover"
            style={{
              transform: avatarOnRight ? 'translate(700px, 362px)' : 'translate(175px, 366px)',
              transition: phase === 'crossing' ? 'transform 2.8s ease-in-out' : undefined,
            }}
          >
            <g className={phase === 'crossing' ? 'walking' : 'avatar-idle'}>
              <AvatarSprite config={state.avatar} hat={state.equippedCosmetics.hat} />
            </g>
          </g>
        )}
      </svg>

      {/* HUD de madeira */}
      {['collecting', 'building', 'built'].includes(phase) && (
        <div className="hud-wood" key={state.wood}>
          🪵 {state.wood} / {state.woodGoal}
        </div>
      )}

      {/* balões de fala */}
      {phase === 'intro' && (
        <button type="button" className="speech-bubble" style={{ left: '30%', top: '52%' }} onClick={advanceIntro}>
          {INTRO_LINES[introStep]}
          <span className="bubble-hint">▶</span>
        </button>
      )}
      {phase === 'built' && (
        <div className="speech-bubble static" style={{ left: '30%', top: '52%' }}>
          CONSEGUIMOS! 🎉
        </div>
      )}
      {phase === 'chest' && (
        <div className="speech-bubble static" style={{ left: '64%', top: '58%' }}>
          ABRA O BAÚ! ✨
        </div>
      )}
      {phase === 'complete' && (
        <div className="speech-bubble static" style={{ right: '3%', top: '16%' }}>
          NOVA AVENTURA EM BREVE ✨
        </div>
      )}

      {/* ações principais */}
      {phase === 'collecting' && (
        <button type="button" className="big-button world-action pulse" onClick={onStartReading}>
          📖 LER!
        </button>
      )}
      {phase === 'built' && (
        <button type="button" className="big-button world-action" onClick={onCross}>
          ATRAVESSAR A PONTE →
        </button>
      )}
    </div>
  );
}

/* ---------- peças da cena ---------- */

function Bridge({ phase, complete }: { phase: string; complete: boolean }) {
  const building = phase === 'building';
  const plankXs = [437, 463, 489, 515, 541, 567, 593];
  const archY = [0, -4, -7, -8, -7, -4, 0];

  if (!building && !complete) {
    // ponte quebrada
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
      {/* corrimão */}
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

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="34" y="110" width="18" height="60" rx="7" fill="#7a4a21" />
      <circle cx="43" cy="70" r="52" fill="#4c9440" />
      <circle cx="12" cy="95" r="34" fill="#57a944" />
      <circle cx="76" cy="95" r="34" fill="#3f7d3a" />
      <circle cx="30" cy="52" r="9" fill="#e74c3c" opacity="0.9" />
      <circle cx="62" cy="78" r="8" fill="#e74c3c" opacity="0.9" />
    </g>
  );
}

function Bush({ x, y, small }: { x: number; y: number; small?: boolean }) {
  const s = small ? 0.6 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="sway" style={{ transformOrigin: `${x}px ${y + 40}px` }}>
      <ellipse cx="0" cy="20" rx="42" ry="26" fill="#57a944" />
      <ellipse cx="-24" cy="28" rx="24" ry="18" fill="#4c9440" />
      <ellipse cx="26" cy="28" rx="24" ry="18" fill="#63b34e" />
    </g>
  );
}

function Rock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="14" rx="30" ry="18" fill="#9aa2ab" />
      <ellipse cx="-8" cy="6" rx="18" ry="12" fill="#b3bac2" />
    </g>
  );
}

function Flower({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`} className="sway slow" style={{ transformOrigin: `${x}px ${y + 18}px` }}>
      <rect x="-1.5" y="0" width="3" height="18" fill="#3f7d3a" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="0" cy="-8" rx="4.5" ry="7" fill={color} transform={`rotate(${deg} 0 -3)`} />
      ))}
      <circle cx="0" cy="-3" r="3.5" fill="#f6c945" />
    </g>
  );
}

function Butterfly() {
  return (
    <g className="butterfly">
      <g>
        <ellipse cx="-5" cy="0" rx="6" ry="9" fill="#f6a3c5" className="wing wing-l" />
        <ellipse cx="5" cy="0" rx="6" ry="9" fill="#f284b6" className="wing wing-r" />
        <rect x="-1.5" y="-7" width="3" height="14" rx="1.5" fill="#5b3a1e" />
      </g>
    </g>
  );
}

function Sparkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <path
      className="sparkle"
      style={{ animationDelay: `${delay}s` }}
      d={`M ${x} ${y - 9} L ${x + 2.5} ${y - 2.5} L ${x + 9} ${y} L ${x + 2.5} ${y + 2.5} L ${x} ${y + 9} L ${x - 2.5} ${y + 2.5} L ${x - 9} ${y} L ${x - 2.5} ${y - 2.5} Z`}
      fill="#ffe27a"
    />
  );
}

function Chest({ open, glowing, onClick }: { open: boolean; glowing: boolean; onClick?: () => void }) {
  return (
    <g
      transform="translate(822 448)"
      onClick={onClick}
      className={glowing ? 'chest glow-pulse' : 'chest'}
      style={onClick ? { cursor: 'pointer' } : undefined}
      role={onClick ? 'button' : undefined}
    >
      {glowing && <ellipse cx="45" cy="35" rx="62" ry="45" fill="#ffe27a" opacity="0.35" />}
      {/* tampa */}
      <g transform={open ? 'rotate(-52 6 28)' : undefined} style={{ transition: 'transform 0.6s ease' }}>
        <path d="M 4 28 Q 4 4 45 4 Q 86 4 86 28 L 86 34 L 4 34 Z" fill="#a3611f" stroke="#6b4a26" strokeWidth="3" />
        <rect x="4" y="26" width="82" height="8" fill="#f6c945" />
      </g>
      {open && <ellipse cx="45" cy="30" rx="30" ry="12" fill="#ffe27a" className="chest-light" />}
      {/* corpo */}
      <rect x="4" y="34" width="82" height="40" rx="8" fill="#b8722a" stroke="#6b4a26" strokeWidth="3" />
      <rect x="4" y="44" width="82" height="8" fill="#f6c945" />
      <rect x="38" y="34" width="14" height="20" rx="4" fill="#f6c945" stroke="#c99a1e" strokeWidth="2" />
    </g>
  );
}

function Fox({ waving }: { waving: boolean }) {
  return (
    <g>
      {/* cauda */}
      <g className="tail-wag" style={{ transformOrigin: '30px 92px' }}>
        <path d="M 32 92 Q -8 80 2 56 Q 22 66 40 82 Z" fill="#e8853b" />
        <path d="M 2 56 Q 10 62 16 70 Q 6 70 0 64 Z" fill="#fff4e3" />
      </g>
      {/* corpo */}
      <ellipse cx="60" cy="88" rx="27" ry="25" fill="#e8853b" />
      <ellipse cx="60" cy="96" rx="15" ry="14" fill="#fff4e3" />
      {/* patas */}
      <ellipse cx="48" cy="112" rx="8" ry="5" fill="#c96f2d" />
      <ellipse cx="72" cy="112" rx="8" ry="5" fill="#c96f2d" />
      {/* braço acenando */}
      {waving && (
        <g className="wave" style={{ transformOrigin: '82px 84px' }}>
          <rect x="78" y="58" width="9" height="30" rx="4.5" fill="#e8853b" />
          <circle cx="83" cy="58" r="6" fill="#c96f2d" />
        </g>
      )}
      {/* orelhas */}
      <path d="M 40 32 L 46 8 L 58 26 Z" fill="#e8853b" />
      <path d="M 80 32 L 74 8 L 62 26 Z" fill="#e8853b" />
      <path d="M 45 28 L 48 15 L 55 25 Z" fill="#f4b183" />
      <path d="M 75 28 L 72 15 L 65 25 Z" fill="#f4b183" />
      {/* cabeça */}
      <circle cx="60" cy="48" r="25" fill="#e8853b" />
      <ellipse cx="60" cy="58" rx="13" ry="10" fill="#fff4e3" />
      <circle cx="60" cy="53" r="3.6" fill="#33261d" />
      <circle cx="50" cy="44" r="3.4" fill="#33261d" />
      <circle cx="70" cy="44" r="3.4" fill="#33261d" />
      <path d="M 54 62 Q 60 66 66 62" stroke="#8c4a32" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  );
}
