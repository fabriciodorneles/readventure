export type CosmeticSlot = 'hat' | 'back' | 'cape';

export type Cosmetic = {
  id: string;
  name: string;
  slot: CosmeticSlot;
};

export const cosmetics: Cosmetic[] = [
  { id: 'hat-adventurer', name: 'Chapéu de Aventureira', slot: 'hat' },
  { id: 'back-explorer', name: 'Mochila de Exploradora', slot: 'back' },
  { id: 'cape-magic', name: 'Capa Mágica', slot: 'cape' },
];

export function cosmeticById(id: string): Cosmetic | undefined {
  return cosmetics.find((c) => c.id === id);
}

/** Tons de pele: do mais claro ao mais escuro */
export const skinTones = ['#ffe4cf', '#f3c99f', '#c68642', '#8d5524'];

export type HairStyle = {
  name: string;
  color: string;
  style: 'curly-long' | 'short' | 'long' | 'pigtails' | 'curly' | 'spiky';
};

export const hairStyles: HairStyle[] = [
  { name: 'Cacheado loiro escuro', color: '#a67c33', style: 'curly-long' },
  { name: 'Curto castanho', color: '#5b3a1e', style: 'short' },
  { name: 'Comprido preto', color: '#2b2118', style: 'long' },
  { name: 'Marias-chiquinhas', color: '#c1502e', style: 'pigtails' },
  { name: 'Cacheado castanho', color: '#3d2a17', style: 'curly' },
  { name: 'Arrepiado', color: '#e6b31e', style: 'spiky' },
];

export const shirtColors = ['#e74c3c', '#3b82f6', '#22c55e'];
