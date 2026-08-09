import type { GameState } from '../game/gameState';
import { AvatarSprite } from '../avatar/Avatar';
import { Bush, Butterfly, Chest, Flower, Fox, Sparkle, Tree } from './parts';

type SceneProps = {
  state: GameState;
  onOpenChest: () => void;
};

const BED_COLORS = ['#f26d9c', '#f6c945', '#9b59d6', '#ff8c42', '#4fb0e8'];
/** Posições dos 5 canteiros */
const BEDS: Array<{ x: number; y: number }> = [
  { x: 545, y: 495 },
  { x: 640, y: 520 },
  { x: 735, y: 490 },
  { x: 830, y: 525 },
  { x: 915, y: 492 },
];

/** Missão 2: o jardim seco que floresce a cada leitura. */
export function GardenScene({ state, onOpenChest }: SceneProps) {
  const { phase, resources } = state;
  const bloomed = ['transforming', 'transformed', 'approach', 'chest', 'reward'].includes(phase);
  const celebrating = ['transformed', 'approach', 'chest', 'reward'].includes(phase);
  const avatarInGarden = ['approach', 'chest', 'reward'].includes(phase);

  return (
    <>
      <defs>
        <linearGradient id="gsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fdcf9" />
          <stop offset="0.7" stopColor="#d9f2fb" />
          <stop offset="1" stopColor="#fdf3d5" />
        </linearGradient>
        <linearGradient id="gground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bd668" />
          <stop offset="1" stopColor="#5cad48" />
        </linearGradient>
      </defs>

      {/* céu e sol */}
      <rect x="0" y="0" width="1000" height="600" fill="url(#gsky)" />
      <circle cx="150" cy="90" r="60" fill="#ffe9a1" opacity="0.5" />
      <circle cx="150" cy="90" r="40" fill="#ffd95e" />
      <g className="cloud cloud-a" fill="#ffffff" opacity="0.85">
        <ellipse cx="620" cy="80" rx="50" ry="19" />
        <ellipse cx="660" cy="68" rx="36" ry="16" />
      </g>

      {/* colinas ao fundo */}
      <path d="M 0 310 Q 250 210 500 300 L 500 320 L 0 320 Z" fill="#7fc25c" opacity="0.8" />
      <path d="M 450 305 Q 720 215 1000 300 L 1000 320 L 450 320 Z" fill="#6ab04f" opacity="0.9" />

      {/* chão */}
      <rect x="0" y="300" width="1000" height="300" fill="url(#gground)" />
      <ellipse cx="500" cy="310" rx="420" ry="30" fill="#a8dd77" opacity="0.6" />

      {/* cerquinha do jardim */}
      <g fill="#d9a866" stroke="#a3733c" strokeWidth="2">
        {[480, 550, 620, 690, 760, 830, 900, 965].map((x) => (
          <rect key={x} x={x} y={432} width="12" height="46" rx="5" />
        ))}
        <rect x="474" y="440" width="510" height="8" rx="4" />
        <rect x="474" y="460" width="510" height="8" rx="4" />
      </g>

      {/* árvores e arbustos */}
      <g className="sway slow" style={{ transformOrigin: '80px 470px' }}>
        <Tree x={30} y={315} scale={1.1} />
      </g>
      <Tree x={380} y={345} scale={0.75} />
      <Bush x={140} y={490} />
      <Bush x={455} y={560} small />
      <Flower x={110} y={548} color="#f26d9c" />
      <Flower x={215} y={558} color="#4fb0e8" />
      <Butterfly />

      {/* regador ao lado da cerca */}
      <g transform="translate(430 495)">
        <ellipse cx="0" cy="26" rx="22" ry="7" fill="#3f7d3a" opacity="0.25" />
        <rect x="-16" y="0" width="32" height="26" rx="8" fill="#5f9ec9" />
        <path d="M -16 8 L -34 2 L -32 10 L -16 14 Z" fill="#5f9ec9" />
        <path d="M 14 6 Q 26 2 28 12" stroke="#4a83aa" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* canteiros: secos → florindo um a um */}
      {BEDS.map((bed, i) => {
        const planted = i < resources || bloomed;
        return (
          <g key={i}>
            <ellipse cx={bed.x} cy={bed.y + 18} rx="42" ry="14" fill="#9c6b3a" />
            <ellipse cx={bed.x} cy={bed.y + 14} rx="36" ry="10" fill="#7a4a21" />
            {planted ? (
              <g className="bed-bloom">
                <Flower x={bed.x - 18} y={bed.y - 8} color={BED_COLORS[i]} />
                <Flower x={bed.x + 2} y={bed.y - 16} color={BED_COLORS[(i + 2) % BED_COLORS.length]} scale={1.15} />
                <Flower x={bed.x + 20} y={bed.y - 6} color={BED_COLORS[(i + 3) % BED_COLORS.length]} />
              </g>
            ) : (
              // gravetos secos
              <g stroke="#a3733c" strokeWidth="3" strokeLinecap="round">
                <path d={`M ${bed.x - 12} ${bed.y + 8} l -4 -14`} fill="none" />
                <path d={`M ${bed.x + 4} ${bed.y + 10} l 2 -16`} fill="none" />
                <path d={`M ${bed.x + 18} ${bed.y + 8} l 6 -12`} fill="none" />
              </g>
            )}
          </g>
        );
      })}

      {/* floração completa: flores extras + borboletas + brilhos */}
      {bloomed && (
        <g className="bed-bloom">
          <Flower x={585} y={575} color="#f26d9c" scale={1.1} />
          <Flower x={775} y={580} color="#f6d365" scale={1.2} />
          <Flower x={880} y={585} color="#9b59d6" />
          <Flower x={510} y={560} color="#ff8c42" />
        </g>
      )}
      {(phase === 'transforming' || celebrating) && (
        <g>
          <Sparkle x={620} y={460} delay={0.4} />
          <Sparkle x={760} y={445} delay={1.1} />
          <Sparkle x={890} y={465} delay={1.8} />
        </g>
      )}

      {/* baú entre as flores */}
      {celebrating && (
        <g className="pop-in-svg">
          <Chest
            x={590}
            y={462}
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
            transform: avatarInGarden ? 'translate(455px, 362px)' : 'translate(175px, 366px)',
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
