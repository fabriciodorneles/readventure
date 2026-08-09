import type { AvatarConfig } from '../game/gameState';
import { hairStyles, shirtColors, skinTones } from './cosmetics';

/**
 * Sprite do avatar em SVG, desenhado num espaço local de 120x160
 * (pés em y≈156). Usado tanto no criador quanto dentro do mundo.
 */
export function AvatarSprite({ config, hat }: { config: AvatarConfig; hat?: string }) {
  const skin = skinTones[config.skin % skinTones.length];
  const hair = hairStyles[config.hair % hairStyles.length];
  const shirt = shirtColors[config.shirt % shirtColors.length];

  return (
    <g>
      {/* pernas */}
      <rect x="44" y="116" width="13" height="34" rx="6" fill="#39516b" />
      <rect x="63" y="116" width="13" height="34" rx="6" fill="#39516b" />
      {/* sapatos */}
      <ellipse cx="50" cy="152" rx="10" ry="6" fill="#7a4a21" />
      <ellipse cx="70" cy="152" rx="10" ry="6" fill="#7a4a21" />
      {/* braços */}
      <rect x="26" y="90" width="12" height="32" rx="6" fill={shirt} />
      <rect x="82" y="90" width="12" height="32" rx="6" fill={shirt} />
      <circle cx="32" cy="124" r="6" fill={skin} />
      <circle cx="88" cy="124" r="6" fill={skin} />
      {/* corpo */}
      <rect x="36" y="84" width="48" height="40" rx="14" fill={shirt} />
      {/* cabeça */}
      <circle cx="60" cy="52" r="29" fill={skin} />
      {/* cabelo */}
      <Hair style={hair.style} color={hair.color} />
      {/* rosto */}
      <circle cx="50" cy="52" r="3.4" fill="#33261d" />
      <circle cx="70" cy="52" r="3.4" fill="#33261d" />
      <circle cx="44" cy="61" r="4" fill="#f79d8f" opacity="0.55" />
      <circle cx="76" cy="61" r="4" fill="#f79d8f" opacity="0.55" />
      <path d="M 52 64 Q 60 71 68 64" stroke="#8c4a32" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* chapéu equipado */}
      {hat === 'hat-adventurer' && <AdventurerHat />}
    </g>
  );
}

function Hair({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'long':
      return (
        <g fill={color}>
          <path d="M 31 52 Q 28 16 60 15 Q 92 16 89 52 L 89 84 Q 84 90 79 84 L 79 52 Q 70 34 60 34 Q 50 34 41 52 L 41 84 Q 36 90 31 84 Z" />
        </g>
      );
    case 'curly':
      return (
        <g fill={color}>
          <circle cx="38" cy="38" r="11" />
          <circle cx="50" cy="28" r="12" />
          <circle cx="64" cy="25" r="12" />
          <circle cx="78" cy="32" r="11" />
          <circle cx="86" cy="45" r="9" />
          <circle cx="33" cy="50" r="8" />
        </g>
      );
    case 'pigtails':
      return (
        <g fill={color}>
          <path d="M 32 50 Q 30 20 60 19 Q 90 20 88 50 Q 74 36 60 36 Q 46 36 32 50 Z" />
          <circle cx="27" cy="56" r="10" />
          <circle cx="93" cy="56" r="10" />
          <circle cx="30" cy="49" r="3.4" fill="#f6c945" />
          <circle cx="90" cy="49" r="3.4" fill="#f6c945" />
        </g>
      );
    case 'spiky':
      return (
        <g fill={color}>
          <path d="M 33 48 L 30 28 L 42 37 L 44 20 L 54 33 L 60 16 L 66 33 L 76 20 L 78 37 L 90 28 L 87 48 Q 74 32 60 32 Q 46 32 33 48 Z" />
        </g>
      );
    case 'short':
    default:
      return (
        <g fill={color}>
          <path d="M 31 52 Q 29 20 60 19 Q 91 20 89 52 Q 86 40 78 40 Q 72 32 60 32 Q 48 32 42 40 Q 34 40 31 52 Z" />
        </g>
      );
  }
}

export function AdventurerHat() {
  return (
    <g>
      <ellipse cx="60" cy="30" rx="34" ry="9" fill="#8a5a2b" />
      <path d="M 40 29 Q 40 8 60 8 Q 80 8 80 29 Q 70 34 60 34 Q 50 34 40 29 Z" fill="#a06a33" />
      <path d="M 41 26 Q 60 33 79 26 L 79 30 Q 60 37 41 30 Z" fill="#c0392b" />
      <path d="M 76 14 Q 86 4 92 8 Q 88 16 80 19 Z" fill="#2e9e5b" />
    </g>
  );
}

/** Prévia isolada do avatar (usada no criador e nos modais). */
export function AvatarPreview({
  config,
  hat,
  width = 160,
}: {
  config: AvatarConfig;
  hat?: string;
  width?: number;
}) {
  return (
    <svg viewBox="0 0 120 160" width={width} height={(width * 160) / 120} role="img" aria-label="Avatar">
      <AvatarSprite config={config} hat={hat} />
    </svg>
  );
}
