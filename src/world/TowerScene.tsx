import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { Bush, Chest, Flower, Fox, Rock, Sparkle, Tree } from './parts';

type SceneProps = {
  state: GameState;
  onOpenChest: () => void;
};

/** Posições dos 5 encaixes de cristal no arco da porta */
const GEM_SLOTS: Array<{ x: number; y: number }> = [
  { x: 700, y: 352 },
  { x: 733, y: 330 },
  { x: 770, y: 322 },
  { x: 807, y: 330 },
  { x: 840, y: 352 },
];

const GEM_COLORS = ['#5ed3f0', '#f26d9c', '#8ff0b4', '#f6d365', '#c39bf0'];

/** Missão 3: a torre trancada que abre com cristais. */
export function TowerScene({ state, onOpenChest }: SceneProps) {
  const { phase, resources } = state;
  const doorOpen = ['transformed', 'approach', 'chest', 'reward', 'complete'].includes(phase);
  const opening = phase === 'transforming';
  const avatarAtDoor = ['approach', 'chest', 'reward', 'complete'].includes(phase);

  return (
    <>
      <defs>
        <linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4a8f" />
          <stop offset="0.55" stopColor="#9d7bc0" />
          <stop offset="1" stopColor="#f5b98a" />
        </linearGradient>
        <linearGradient id="tground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f9e52" />
          <stop offset="1" stopColor="#43813c" />
        </linearGradient>
        <linearGradient id="doorGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a1" />
          <stop offset="1" stopColor="#f6c945" />
        </linearGradient>
      </defs>

      {/* céu de fim de tarde */}
      <rect x="0" y="0" width="1000" height="600" fill="url(#tsky)" />
      {/* estrelas */}
      {[
        [90, 70], [220, 45], [340, 95], [480, 55], [610, 40], [140, 140], [420, 150], [60, 210],
      ].map(([x, y], i) => (
        <circle key={i} className="twinkle" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r="3" fill="#fff6d8" />
      ))}
      <circle cx="880" cy="80" r="34" fill="#fff3cf" opacity="0.9" />
      <circle cx="868" cy="72" r="9" fill="#e8d9b0" opacity="0.6" />
      <circle cx="893" cy="92" r="6" fill="#e8d9b0" opacity="0.6" />

      {/* montanhas ao fundo */}
      <path d="M 0 310 L 160 200 L 320 310 Z" fill="#4a3d78" opacity="0.7" />
      <path d="M 240 310 L 420 180 L 600 310 Z" fill="#5a4a8f" opacity="0.6" />

      {/* chão */}
      <rect x="0" y="300" width="1000" height="300" fill="url(#tground)" />
      <ellipse cx="500" cy="310" rx="430" ry="28" fill="#7fb75c" opacity="0.5" />

      {/* torre */}
      <g>
        <rect x="660" y="180" width="220" height="330" rx="14" fill="#7c6aa6" />
        <rect x="660" y="180" width="220" height="330" rx="14" fill="url(#tsky)" opacity="0.12" />
        {/* ameias e telhado */}
        <path d="M 640 190 L 770 90 L 900 190 Z" fill="#9d7bc0" />
        <path d="M 770 90 L 770 62 L 812 74 L 770 84 Z" fill="#e74c3c" />
        {/* janelas */}
        <rect x="700" y="215" width="26" height="38" rx="13" fill="#ffe9a1" opacity="0.9" />
        <rect x="814" y="215" width="26" height="38" rx="13" fill="#ffe9a1" opacity="0.9" />
        {/* pedras decorativas */}
        <g fill="#6b5a94" opacity="0.7">
          <rect x="676" y="300" width="34" height="16" rx="6" />
          <rect x="830" y="280" width="34" height="16" rx="6" />
          <rect x="690" y="420" width="30" height="14" rx="6" />
          <rect x="842" y="440" width="30" height="14" rx="6" />
        </g>

        {/* porta em arco */}
        <path d="M 712 510 L 712 400 Q 770 350 828 400 L 828 510 Z" fill="#4a3d78" />
        {doorOpen || opening ? (
          <path
            className={opening ? 'door-open' : undefined}
            d="M 718 510 L 718 402 Q 770 356 822 402 L 822 510 Z"
            fill="url(#doorGlow)"
          />
        ) : (
          <>
            <path d="M 718 510 L 718 402 Q 770 356 822 402 L 822 510 Z" fill="#5b4a2e" />
            <g stroke="#3d3220" strokeWidth="3">
              <line x1="770" y1="368" x2="770" y2="510" />
              <line x1="718" y1="440" x2="822" y2="440" />
              <line x1="718" y1="478" x2="822" y2="478" />
            </g>
            <circle cx="800" cy="452" r="6" fill="#f6c945" />
          </>
        )}

        {/* encaixes de cristal no arco */}
        {GEM_SLOTS.map((slot, i) => {
          const filled = i < resources;
          return (
            <g key={i}>
              <circle cx={slot.x} cy={slot.y} r="11" fill="#4a3d78" stroke="#38305c" strokeWidth="2" />
              {filled && (
                <g className="gem-pop">
                  <path
                    d={`M ${slot.x} ${slot.y - 8} L ${slot.x + 7} ${slot.y} L ${slot.x} ${slot.y + 8} L ${slot.x - 7} ${slot.y} Z`}
                    fill={GEM_COLORS[i]}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* cenário */}
      <g className="sway slow" style={{ transformOrigin: '80px 470px' }}>
        <Tree x={30} y={320} scale={1.05} />
      </g>
      <Tree x={420} y={350} scale={0.7} />
      <Bush x={150} y={495} />
      <Bush x={545} y={545} small />
      <Rock x={330} y={520} />
      <Flower x={110} y={550} color="#c39bf0" />
      <Flower x={240} y={560} color="#5ed3f0" />
      <Flower x={480} y={575} color="#f26d9c" />

      {/* vaga-lumes */}
      <g fill="#fff3ae">
        <circle className="firefly" cx="380" cy="430" r="4" />
        <circle className="firefly f2" cx="560" cy="390" r="3.5" />
        <circle className="firefly f3" cx="220" cy="410" r="3.5" />
      </g>

      {(opening || doorOpen) && (
        <g>
          <Sparkle x={700} y={300} delay={0.3} />
          <Sparkle x={840} y={295} delay={1.0} />
          <Sparkle x={770} y={260} delay={1.7} />
        </g>
      )}

      {/* baú na entrada iluminada */}
      {doorOpen && phase !== 'complete' && (
        <g className="pop-in-svg">
          <Chest
            x={725}
            y={445}
            open={phase === 'reward'}
            glowing={phase === 'chest'}
            onClick={phase === 'chest' ? onOpenChest : undefined}
          />
        </g>
      )}

      {/* final: fogos de brilhos */}
      {phase === 'complete' && (
        <g>
          <Sparkle x={300} y={150} delay={0} />
          <Sparkle x={520} y={100} delay={0.6} />
          <Sparkle x={150} y={250} delay={1.2} />
          <Sparkle x={640} y={200} delay={1.8} />
          <Sparkle x={900} y={140} delay={2.4} />
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
            transform: avatarAtDoor ? 'translate(600px, 362px)' : 'translate(175px, 366px)',
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
