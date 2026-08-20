import type { Lang } from '../i18n/strings';

export type CosmeticSlot = 'hat' | 'back' | 'cape' | 'boots' | 'glasses' | 'hand';

export type Cosmetic = {
  id: string;
  name: Record<Lang, string>;
  slot: CosmeticSlot;
};

export const cosmetics: Cosmetic[] = [
  { id: 'hat-adventurer', name: { pt: 'Chapéu de Aventureira', en: 'Adventurer Hat' }, slot: 'hat' },
  { id: 'back-explorer', name: { pt: 'Mochila de Exploradora', en: 'Explorer Backpack' }, slot: 'back' },
  { id: 'cape-magic', name: { pt: 'Capa Mágica', en: 'Magic Cape' }, slot: 'cape' },
  { id: 'boots-fast', name: { pt: 'Botas Velozes', en: 'Speedy Boots' }, slot: 'boots' },
  { id: 'glasses-magic', name: { pt: 'Óculos Mágicos', en: 'Magic Glasses' }, slot: 'glasses' },
  { id: 'wand-stars', name: { pt: 'Varinha de Estrelas', en: 'Star Wand' }, slot: 'hand' },
];

export function cosmeticById(id: string): Cosmetic | undefined {
  return cosmetics.find((c) => c.id === id);
}

/** Tons de pele: do mais claro ao mais escuro */
export const skinTones = ['#ffe4cf', '#f3c99f', '#c68642', '#8d5524'];

export type HairStyle = {
  name: string;
  color: string;
  style:
    | 'curly-long'
    | 'short'
    | 'long'
    | 'pigtails'
    | 'curly'
    | 'spiky'
    | 'braids'
    | 'bun'
    | 'wavy'
    | 'afro';
};

export const hairStyles: HairStyle[] = [
  { name: 'Cacheado loiro escuro', color: '#a67c33', style: 'curly-long' },
  { name: 'Curto castanho', color: '#5b3a1e', style: 'short' },
  { name: 'Comprido preto', color: '#2b2118', style: 'long' },
  { name: 'Marias-chiquinhas', color: '#c1502e', style: 'pigtails' },
  { name: 'Cacheado castanho', color: '#3d2a17', style: 'curly' },
  { name: 'Arrepiado', color: '#e6b31e', style: 'spiky' },
  { name: 'Tranças', color: '#4a2c12', style: 'braids' },
  { name: 'Coque', color: '#6b3fa0', style: 'bun' },
  { name: 'Ondulado ruivo', color: '#b8502e', style: 'wavy' },
  { name: 'Black power', color: '#241a10', style: 'afro' },
];

export const shirtColors = [
  '#e74c3c',
  '#3b82f6',
  '#22c55e',
  '#f6c945',
  '#9b59d6',
  '#f26d9c',
  '#ff8c42',
  '#2ec9b8',
];
