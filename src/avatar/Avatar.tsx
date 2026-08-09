import type { AvatarConfig, EquippedCosmetics } from '../game/gameState';
import { hairStyles, shirtColors, skinTones } from './cosmetics';

/**
 * Sprite do avatar em SVG, num espaço local de 120x160 (pés em y≈155).
 * Proporções "chibi": cabeça grande, olhos grandes com brilho, corpo pequeno.
 */
export function AvatarSprite({
  config,
  equipped,
}: {
  config: AvatarConfig;
  equipped?: EquippedCosmetics;
}) {
  const skin = skinTones[config.skin % skinTones.length];
  const hair = hairStyles[config.hair % hairStyles.length];
  const shirt = shirtColors[config.shirt % shirtColors.length];

  return (
    <g>
      {/* capa (atrás de tudo) */}
      {equipped?.cape === 'cape-magic' && (
        <g>
          <path d="M 40 94 Q 60 87 80 94 L 97 140 Q 60 151 23 140 Z" fill="#8e44ad" />
          <path d="M 44 96 Q 60 91 76 96 L 88 134 Q 60 142 32 134 Z" fill="#a55fc4" />
        </g>
      )}
      {/* mochila espiando pelos lados */}
      {equipped?.back === 'back-explorer' && (
        <g>
          <rect x="24" y="96" width="14" height="30" rx="7" fill="#8c5f2f" />
          <rect x="82" y="96" width="14" height="30" rx="7" fill="#8c5f2f" />
          <path d="M 40 90 Q 60 82 80 90 L 80 96 Q 60 89 40 96 Z" fill="#6b4a26" />
        </g>
      )}
      {/* pernas */}
      <rect x="45" y="122" width="12" height="28" rx="6" fill="#39516b" />
      <rect x="63" y="122" width="12" height="28" rx="6" fill="#39516b" />
      {/* sapatos */}
      <ellipse cx="51" cy="151" rx="10" ry="5.5" fill="#7a4a21" />
      <ellipse cx="69" cy="151" rx="10" ry="5.5" fill="#7a4a21" />
      {/* braços */}
      <rect x="29" y="98" width="11" height="27" rx="5.5" fill={shirt} />
      <rect x="80" y="98" width="11" height="27" rx="5.5" fill={shirt} />
      <circle cx="34.5" cy="127" r="5.5" fill={skin} />
      <circle cx="85.5" cy="127" r="5.5" fill={skin} />
      {/* corpo */}
      <rect x="37" y="92" width="46" height="36" rx="15" fill={shirt} />
      {/* alças da mochila */}
      {equipped?.back === 'back-explorer' && (
        <g fill="#6b4a26" opacity="0.9">
          <rect x="45" y="92" width="7" height="28" rx="3.5" />
          <rect x="68" y="92" width="7" height="28" rx="3.5" />
        </g>
      )}
      {/* cabelo atrás da cabeça */}
      <HairBack style={hair.style} color={hair.color} />
      {/* cabeça */}
      <circle cx="60" cy="56" r="32" fill={skin} />
      {/* cabelo na frente */}
      <HairFront style={hair.style} color={hair.color} />
      {/* olhos grandes com brilho */}
      <circle cx="48" cy="58" r="4.8" fill="#33261d" />
      <circle cx="72" cy="58" r="4.8" fill="#33261d" />
      <circle cx="49.7" cy="56.2" r="1.7" fill="#ffffff" />
      <circle cx="73.7" cy="56.2" r="1.7" fill="#ffffff" />
      {/* sobrancelhas suaves */}
      <path d="M 43 49 Q 48 46.5 53 49" stroke={hair.color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 67 49 Q 72 46.5 77 49" stroke={hair.color} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* bochechas */}
      <circle cx="40" cy="67" r="5" fill="#f7a396" opacity="0.55" />
      <circle cx="80" cy="67" r="5" fill="#f7a396" opacity="0.55" />
      {/* sorriso */}
      <path d="M 52 70 Q 60 78 68 70" stroke="#8c4a32" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* chapéu equipado */}
      {equipped?.hat === 'hat-adventurer' && <AdventurerHat />}
    </g>
  );
}

function HairBack({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'curly-long':
      // cachos caindo pelos lados até os ombros
      return (
        <g fill={color}>
          <circle cx="28" cy="56" r="10" />
          <circle cx="25" cy="71" r="9.5" />
          <circle cx="28" cy="86" r="8.5" />
          <circle cx="92" cy="56" r="10" />
          <circle cx="95" cy="71" r="9.5" />
          <circle cx="92" cy="86" r="8.5" />
        </g>
      );
    case 'long':
      return (
        <path
          d="M 28 52 Q 26 20 60 18 Q 94 20 92 52 L 92 90 Q 86 97 80 90 L 80 56 L 40 56 L 40 90 Q 34 97 28 90 Z"
          fill={color}
        />
      );
    case 'pigtails':
      return (
        <g fill={color}>
          <circle cx="24" cy="62" r="11" />
          <circle cx="96" cy="62" r="11" />
          <circle cx="27" cy="54" r="3.6" fill="#f6c945" />
          <circle cx="93" cy="54" r="3.6" fill="#f6c945" />
        </g>
      );
    default:
      return null;
  }
}

function HairFront({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'curly-long':
      // coroa de cachos por cima da testa
      return (
        <g fill={color}>
          <circle cx="35" cy="37" r="11" />
          <circle cx="47" cy="28" r="12" />
          <circle cx="61" cy="25" r="12.5" />
          <circle cx="75" cy="29" r="11.5" />
          <circle cx="86" cy="39" r="10" />
          <circle cx="29" cy="48" r="9" />
          <circle cx="91" cy="49" r="9" />
        </g>
      );
    case 'curly':
      return (
        <g fill={color}>
          <circle cx="36" cy="38" r="11" />
          <circle cx="48" cy="29" r="12" />
          <circle cx="62" cy="26" r="12" />
          <circle cx="76" cy="31" r="11" />
          <circle cx="87" cy="42" r="9.5" />
          <circle cx="31" cy="50" r="8.5" />
        </g>
      );
    case 'long':
      return (
        <path d="M 30 50 Q 30 22 60 21 Q 90 22 90 50 Q 76 34 60 34 Q 44 34 30 50 Z" fill={color} />
      );
    case 'pigtails':
      return (
        <path d="M 29 52 Q 28 22 60 21 Q 92 22 91 52 Q 76 36 60 36 Q 44 36 29 52 Z" fill={color} />
      );
    case 'spiky':
      return (
        <path
          d="M 30 50 L 27 28 L 40 38 L 42 19 L 53 33 L 60 15 L 67 33 L 78 19 L 80 38 L 93 28 L 90 50 Q 76 32 60 32 Q 44 32 30 50 Z"
          fill={color}
        />
      );
    case 'short':
    default:
      return (
        <path
          d="M 28 52 Q 26 20 60 19 Q 94 20 92 52 Q 88 40 79 41 Q 73 32 60 32 Q 47 32 41 41 Q 32 40 28 52 Z"
          fill={color}
        />
      );
  }
}

export function AdventurerHat() {
  return (
    <g>
      <ellipse cx="60" cy="31" rx="37" ry="9" fill="#8a5a2b" />
      <path d="M 38 30 Q 38 6 60 6 Q 82 6 82 30 Q 71 36 60 36 Q 49 36 38 30 Z" fill="#a06a33" />
      <path d="M 39 27 Q 60 34 81 27 L 81 31 Q 60 38 39 31 Z" fill="#c0392b" />
      <path d="M 78 13 Q 88 3 94 7 Q 90 15 82 18 Z" fill="#2e9e5b" />
    </g>
  );
}

/** Arte do cosmético isolada, para o modal de recompensa. */
export function RewardArt({ id, width = 220 }: { id: string; width?: number }) {
  if (id === 'hat-adventurer') {
    return (
      <svg viewBox="16 0 88 44" width={width} className="reward-art">
        <AdventurerHat />
      </svg>
    );
  }
  if (id === 'back-explorer') {
    return (
      <svg viewBox="0 0 100 100" width={width * 0.6} className="reward-art">
        <rect x="18" y="22" width="64" height="66" rx="18" fill="#8c5f2f" />
        <rect x="18" y="22" width="64" height="20" rx="10" fill="#a3733c" />
        <rect x="30" y="52" width="40" height="28" rx="10" fill="#6b4a26" />
        <rect x="42" y="60" width="16" height="8" rx="4" fill="#f6c945" />
        <path d="M 30 22 Q 50 6 70 22" stroke="#6b4a26" strokeWidth="7" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'cape-magic') {
    return (
      <svg viewBox="0 0 100 100" width={width * 0.6} className="reward-art">
        <path d="M 30 12 Q 50 4 70 12 L 88 84 Q 50 98 12 84 Z" fill="#8e44ad" />
        <path d="M 35 15 Q 50 9 65 15 L 78 78 Q 50 88 22 78 Z" fill="#a55fc4" />
        <circle cx="50" cy="14" r="5" fill="#f6c945" />
        <path d="M 42 45 l 3 6 6 1 -4.5 4.5 1 6.5 -5.5-3 -5.5 3 1-6.5 -4.5-4.5 6-1 Z" fill="#f6d365" />
      </svg>
    );
  }
  return null;
}

/** Prévia isolada do avatar (usada no criador e nos modais). */
export function AvatarPreview({
  config,
  equipped,
  width = 160,
}: {
  config: AvatarConfig;
  equipped?: EquippedCosmetics;
  width?: number;
}) {
  return (
    <svg viewBox="0 0 120 160" width={width} height={(width * 160) / 120} role="img" aria-label="Avatar">
      <AvatarSprite config={config} equipped={equipped} />
    </svg>
  );
}
