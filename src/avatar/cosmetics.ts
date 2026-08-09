export type Cosmetic = {
  id: string;
  name: string;
  slot: 'hat';
};

export const cosmetics: Cosmetic[] = [
  { id: 'hat-adventurer', name: 'Chapéu de Aventureira', slot: 'hat' },
];

export const skinTones = ['#f8d9b4', '#d9a066', '#8d5a2b'];

export type HairStyle = {
  name: string;
  color: string;
  style: 'short' | 'long' | 'curly' | 'pigtails' | 'spiky';
};

export const hairStyles: HairStyle[] = [
  { name: 'Curto', color: '#5b3a1e', style: 'short' },
  { name: 'Comprido', color: '#2b2118', style: 'long' },
  { name: 'Cacheado', color: '#3d2a17', style: 'curly' },
  { name: 'Marias-chiquinhas', color: '#c1502e', style: 'pigtails' },
  { name: 'Arrepiado', color: '#e6b31e', style: 'spiky' },
];

export const shirtColors = ['#e74c3c', '#3b82f6', '#22c55e'];
