import type { AvatarConfig, EquippedCosmetics } from '../game/gameState';
import { hairStyles, shirtColors, skinTones } from './cosmetics';

/**
 * Sprite do avatar em SVG, num espaço local de 120x160 (pés em y≈155).
 * Cabeça grande estilo chibi, mas com corpo estruturado: pescoço, ombros,
 * tronco afunilado, braços ao lado do corpo e pernas com calça.
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
          <path d="M 42 92 Q 60 85 78 92 L 96 140 Q 60 151 24 140 Z" fill="#8e44ad" />
          <path d="M 46 94 Q 60 89 74 94 L 86 134 Q 60 142 34 134 Z" fill="#a55fc4" />
        </g>
      )}
      {/* mochila espiando pelos lados */}
      {equipped?.back === 'back-explorer' && (
        <g>
          <rect x="27" y="94" width="13" height="28" rx="6.5" fill="#8c5f2f" />
          <rect x="80" y="94" width="13" height="28" rx="6.5" fill="#8c5f2f" />
          <path d="M 42 88 Q 60 81 78 88 L 78 94 Q 60 87 42 94 Z" fill="#6b4a26" />
        </g>
      )}
      {/* pernas com calça */}
      <path d="M 46 118 L 74 118 L 74 128 Q 60 132 46 128 Z" fill="#39516b" />
      <rect x="47" y="124" width="11" height="24" rx="5" fill="#39516b" />
      <rect x="62" y="124" width="11" height="24" rx="5" fill="#39516b" />
      {/* pés: botas equipadas ou sapatos */}
      {equipped?.boots === 'boots-fast' ? (
        <g>
          <path d="M 44 138 L 59 138 L 59 152 Q 51 155 42 152 Z" fill="#c0392b" />
          <path d="M 61 138 L 76 138 L 78 152 Q 69 155 61 152 Z" fill="#c0392b" />
          <rect x="42" y="150" width="18" height="5" rx="2.5" fill="#7a2318" />
          <rect x="60" y="150" width="19" height="5" rx="2.5" fill="#7a2318" />
          <rect x="44" y="138" width="15" height="4" rx="2" fill="#f6c945" />
          <rect x="61" y="138" width="15" height="4" rx="2" fill="#f6c945" />
        </g>
      ) : (
        <g>
          <ellipse cx="52" cy="150" rx="9.5" ry="5.5" fill="#7a4a21" />
          <ellipse cx="68" cy="150" rx="9.5" ry="5.5" fill="#7a4a21" />
        </g>
      )}
      {/* tronco afunilado com ombros */}
      <path
        d="M 45 92 Q 45 86 52 86 L 68 86 Q 75 86 75 92 L 73 114 Q 73 121 60 121 Q 47 121 47 114 Z"
        fill={shirt}
      />
      {/* mangas */}
      <path d="M 45 88 Q 38 89 36 96 L 36 102 L 45 102 Z" fill={shirt} />
      <path d="M 75 88 Q 82 89 84 96 L 84 102 L 75 102 Z" fill={shirt} />
      {/* braços ao lado do corpo */}
      <rect x="35" y="100" width="8.5" height="26" rx="4.2" fill={skin} />
      <rect x="76.5" y="100" width="8.5" height="26" rx="4.2" fill={skin} />
      <circle cx="39.2" cy="128" r="5" fill={skin} />
      <circle cx="80.8" cy="128" r="5" fill={skin} />
      {/* varinha na mão */}
      {equipped?.hand === 'wand-stars' && (
        <g>
          <rect x="79" y="102" width="4.5" height="30" rx="2.2" fill="#8a5a2b" transform="rotate(18 81 128)" />
          <path
            d="M 90 96 l 2.6 5.2 5.7 0.8 -4.1 4 1 5.7 -5.2-2.7 -5.2 2.7 1-5.7 -4.1-4 5.7-0.8 Z"
            fill="#f6d365"
            stroke="#e0a92e"
            strokeWidth="1"
          />
        </g>
      )}
      {/* alças da mochila */}
      {equipped?.back === 'back-explorer' && (
        <g fill="#6b4a26" opacity="0.9">
          <rect x="48" y="86" width="6.5" height="28" rx="3.2" />
          <rect x="66" y="86" width="6.5" height="28" rx="3.2" />
        </g>
      )}
      {/* pescoço */}
      <rect x="55" y="79" width="10" height="9" rx="4" fill={skin} />
      {/* cabelo atrás da cabeça */}
      <HairBack style={hair.style} color={hair.color} />
      {/* cabeça */}
      <circle cx="60" cy="54" r="30" fill={skin} />
      {/* orelhas */}
      <circle cx="31" cy="56" r="5" fill={skin} />
      <circle cx="89" cy="56" r="5" fill={skin} />
      {/* cabelo na frente */}
      <HairFront style={hair.style} color={hair.color} />
      {/* olhos grandes com brilho */}
      <circle cx="49" cy="56" r="4.6" fill="#33261d" />
      <circle cx="71" cy="56" r="4.6" fill="#33261d" />
      <circle cx="50.6" cy="54.4" r="1.6" fill="#ffffff" />
      <circle cx="72.6" cy="54.4" r="1.6" fill="#ffffff" />
      {/* sobrancelhas suaves */}
      <path d="M 44 47.5 Q 49 45 54 47.5" stroke={hair.color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 66 47.5 Q 71 45 76 47.5" stroke={hair.color} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* óculos */}
      {equipped?.glasses === 'glasses-magic' && (
        <g stroke="#d4a017" strokeWidth="2.4" fill="none">
          <circle cx="49" cy="56" r="8.5" fill="rgba(160, 216, 255, 0.25)" />
          <circle cx="71" cy="56" r="8.5" fill="rgba(160, 216, 255, 0.25)" />
          <path d="M 57.5 55 Q 60 53 62.5 55" />
          <path d="M 40.5 55 L 33 53" />
          <path d="M 79.5 55 L 87 53" />
        </g>
      )}
      {/* nariz e bochechas */}
      <circle cx="60" cy="62" r="2" fill="#e8a985" opacity="0.8" />
      <circle cx="42" cy="65" r="4.6" fill="#f7a396" opacity="0.5" />
      <circle cx="78" cy="65" r="4.6" fill="#f7a396" opacity="0.5" />
      {/* sorriso */}
      <path d="M 53 68 Q 60 75.5 67 68" stroke="#8c4a32" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* chapéu equipado */}
      {equipped?.hat === 'hat-adventurer' && <AdventurerHat />}
    </g>
  );
}

function HairBack({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'curly-long':
      return (
        <g fill={color}>
          <circle cx="30" cy="54" r="9.5" />
          <circle cx="27" cy="68" r="9" />
          <circle cx="30" cy="82" r="8" />
          <circle cx="90" cy="54" r="9.5" />
          <circle cx="93" cy="68" r="9" />
          <circle cx="90" cy="82" r="8" />
        </g>
      );
    case 'long':
      return (
        <path
          d="M 30 50 Q 28 20 60 18 Q 92 20 90 50 L 90 88 Q 84 95 78 88 L 78 54 L 42 54 L 42 88 Q 36 95 30 88 Z"
          fill={color}
        />
      );
    case 'wavy':
      return (
        <path
          d="M 30 50 Q 28 20 60 18 Q 92 20 90 50 Q 94 60 89 68 Q 94 76 89 84 Q 93 92 86 96 L 78 90 L 78 54 L 42 54 L 42 90 L 34 96 Q 27 92 31 84 Q 26 76 31 68 Q 26 60 30 50 Z"
          fill={color}
        />
      );
    case 'braids':
      return (
        <g fill={color}>
          <circle cx="29" cy="60" r="7.5" />
          <circle cx="27" cy="73" r="6.8" />
          <circle cx="26" cy="85" r="6" />
          <circle cx="91" cy="60" r="7.5" />
          <circle cx="93" cy="73" r="6.8" />
          <circle cx="94" cy="85" r="6" />
          <circle cx="26" cy="94" r="3" fill="#f26d9c" />
          <circle cx="94" cy="94" r="3" fill="#f26d9c" />
        </g>
      );
    case 'pigtails':
      return (
        <g fill={color}>
          <circle cx="26" cy="60" r="10.5" />
          <circle cx="94" cy="60" r="10.5" />
          <circle cx="29" cy="52" r="3.4" fill="#f6c945" />
          <circle cx="91" cy="52" r="3.4" fill="#f6c945" />
        </g>
      );
    case 'afro':
      return <circle cx="60" cy="42" r="41" fill={color} />;
    default:
      return null;
  }
}

function HairFront({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'curly-long':
      return (
        <g fill={color}>
          <circle cx="36" cy="36" r="10.5" />
          <circle cx="47" cy="28" r="11.5" />
          <circle cx="61" cy="25" r="12" />
          <circle cx="74" cy="29" r="11" />
          <circle cx="85" cy="38" r="9.5" />
          <circle cx="31" cy="46" r="8.5" />
          <circle cx="89" cy="47" r="8.5" />
        </g>
      );
    case 'curly':
      return (
        <g fill={color}>
          <circle cx="37" cy="37" r="10.5" />
          <circle cx="48" cy="29" r="11.5" />
          <circle cx="62" cy="26" r="11.5" />
          <circle cx="75" cy="30" r="10.5" />
          <circle cx="86" cy="40" r="9" />
          <circle cx="32" cy="48" r="8" />
        </g>
      );
    case 'long':
    case 'wavy':
      return (
        <path d="M 32 48 Q 32 22 60 21 Q 88 22 88 48 Q 74 33 60 33 Q 46 33 32 48 Z" fill={color} />
      );
    case 'pigtails':
    case 'braids':
      return (
        <path d="M 31 50 Q 30 22 60 21 Q 90 22 89 50 Q 74 35 60 35 Q 46 35 31 50 Z" fill={color} />
      );
    case 'bun':
      return (
        <g fill={color}>
          <circle cx="60" cy="17" r="12" />
          <rect x="48" y="26" width="24" height="6" rx="3" fill="#f6c945" />
          <path d="M 31 50 Q 30 24 60 23 Q 90 24 89 50 Q 74 35 60 35 Q 46 35 31 50 Z" />
        </g>
      );
    case 'afro':
      return (
        <path d="M 30 52 Q 28 26 60 25 Q 92 26 90 52 Q 75 38 60 38 Q 45 38 30 52 Z" fill={color} />
      );
    case 'spiky':
      return (
        <path
          d="M 31 48 L 28 27 L 41 37 L 43 18 L 54 32 L 60 14 L 66 32 L 77 18 L 79 37 L 92 27 L 89 48 Q 75 31 60 31 Q 45 31 31 48 Z"
          fill={color}
        />
      );
    case 'short':
    default:
      return (
        <path
          d="M 30 50 Q 28 19 60 18 Q 92 19 90 50 Q 86 39 78 40 Q 72 31 60 31 Q 48 31 42 40 Q 34 39 30 50 Z"
          fill={color}
        />
      );
  }
}

export function AdventurerHat() {
  return (
    <g>
      <ellipse cx="60" cy="30" rx="36" ry="9" fill="#8a5a2b" />
      <path d="M 39 29 Q 39 6 60 6 Q 81 6 81 29 Q 70 35 60 35 Q 50 35 39 29 Z" fill="#a06a33" />
      <path d="M 40 26 Q 60 33 80 26 L 80 30 Q 60 37 40 30 Z" fill="#c0392b" />
      <path d="M 77 13 Q 87 3 93 7 Q 89 15 81 18 Z" fill="#2e9e5b" />
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
  if (id === 'boots-fast') {
    return (
      <svg viewBox="0 0 120 100" width={width * 0.7} className="reward-art">
        <path d="M 18 20 L 46 20 L 46 62 Q 62 66 64 78 L 16 78 Z" fill="#c0392b" />
        <rect x="14" y="76" width="52" height="10" rx="5" fill="#7a2318" />
        <rect x="18" y="20" width="28" height="9" rx="4" fill="#f6c945" />
        <path d="M 70 20 L 98 20 L 98 62 Q 114 66 116 78 L 68 78 Z" fill="#c0392b" />
        <rect x="66" y="76" width="52" height="10" rx="5" fill="#7a2318" />
        <rect x="70" y="20" width="28" height="9" rx="4" fill="#f6c945" />
        <path d="M 30 8 l 4 8 M 40 6 l 2 10 M 84 8 l 4 8" stroke="#f6c945" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'glasses-magic') {
    return (
      <svg viewBox="0 0 120 70" width={width * 0.75} className="reward-art">
        <circle cx="35" cy="38" r="22" fill="rgba(160,216,255,0.35)" stroke="#d4a017" strokeWidth="5" />
        <circle cx="85" cy="38" r="22" fill="rgba(160,216,255,0.35)" stroke="#d4a017" strokeWidth="5" />
        <path d="M 55 34 Q 60 29 65 34" stroke="#d4a017" strokeWidth="5" fill="none" />
        <path d="M 13 32 L 2 26 M 107 32 L 118 26" stroke="#d4a017" strokeWidth="5" strokeLinecap="round" />
        <path d="M 28 30 l 2.5 5 5.5 0.8 -4 3.9 1 5.5 -5-2.6 -5 2.6 1-5.5 -4-3.9 5.5-0.8 Z" fill="#fff" opacity="0.9" />
      </svg>
    );
  }
  if (id === 'wand-stars') {
    return (
      <svg viewBox="0 0 100 100" width={width * 0.6} className="reward-art">
        <rect x="44" y="34" width="10" height="60" rx="5" fill="#8a5a2b" transform="rotate(20 49 64)" />
        <path
          d="M 62 8 l 5.5 11 12 1.7 -8.7 8.5 2 12 -10.8-5.7 -10.8 5.7 2-12 -8.7-8.5 12-1.7 Z"
          fill="#f6d365"
          stroke="#e0a92e"
          strokeWidth="2"
        />
        <circle cx="30" cy="30" r="3.5" fill="#f6d365" />
        <circle cx="86" cy="46" r="3" fill="#f6d365" />
        <circle cx="74" cy="66" r="2.5" fill="#f6d365" />
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
