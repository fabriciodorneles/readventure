/** Peças de cenário compartilhadas pelas cenas (SVG, viewBox 1000x600). */

export function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
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

export function Bush({ x, y, small }: { x: number; y: number; small?: boolean }) {
  const s = small ? 0.6 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="sway tb">
        <ellipse cx="0" cy="20" rx="42" ry="26" fill="#57a944" />
        <ellipse cx="-24" cy="28" rx="24" ry="18" fill="#4c9440" />
        <ellipse cx="26" cy="28" rx="24" ry="18" fill="#63b34e" />
      </g>
    </g>
  );
}

export function Rock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="14" rx="30" ry="18" fill="#9aa2ab" />
      <ellipse cx="-8" cy="6" rx="18" ry="12" fill="#b3bac2" />
    </g>
  );
}

export function Flower({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="sway slow tb">
        <rect x="-1.5" y="0" width="3" height="18" fill="#3f7d3a" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-8" rx="4.5" ry="7" fill={color} transform={`rotate(${deg} 0 -3)`} />
        ))}
        <circle cx="0" cy="-3" r="3.5" fill="#f6c945" />
      </g>
    </g>
  );
}

export function Butterfly() {
  return (
    <g className="butterfly">
      <g>
        <ellipse cx="-5" cy="0" rx="6" ry="9" fill="#f6a3c5" className="wing" />
        <ellipse cx="5" cy="0" rx="6" ry="9" fill="#f284b6" className="wing" />
        <rect x="-1.5" y="-7" width="3" height="14" rx="1.5" fill="#5b3a1e" />
      </g>
    </g>
  );
}

export function Sparkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <path
      className="sparkle"
      style={{ animationDelay: `${delay}s` }}
      d={`M ${x} ${y - 9} L ${x + 2.5} ${y - 2.5} L ${x + 9} ${y} L ${x + 2.5} ${y + 2.5} L ${x} ${y + 9} L ${x - 2.5} ${y + 2.5} L ${x - 9} ${y} L ${x - 2.5} ${y - 2.5} Z`}
      fill="#ffe27a"
    />
  );
}

export function Chest({
  x,
  y,
  open,
  glowing,
  onClick,
}: {
  x: number;
  y: number;
  open: boolean;
  glowing: boolean;
  onClick?: () => void;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        onClick={onClick}
        className={glowing ? 'chest chest-inner glow-pulse' : 'chest chest-inner'}
        style={onClick ? { cursor: 'pointer' } : undefined}
        role={onClick ? 'button' : undefined}
      >
        <ellipse cx="45" cy="77" rx="48" ry="9" fill="#1e2a1a" opacity="0.18" />
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
    </g>
  );
}

export function Fox({ waving }: { waving: boolean }) {
  return (
    <g>
      {/* cauda */}
      <g className="tail-wag tb">
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
        <g className="wave tb">
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
