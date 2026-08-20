import type { Lang } from '../i18n/strings';

export type MissionDef = {
  id: 'bridge' | 'garden' | 'tower' | 'cave' | 'balloon' | 'rainbow';
  /** Emoji do recurso coletado (HUD e recompensa de leitura) */
  resourceEmoji: string;
  goal: number;
  /** Cosmético destravado no baú desta missão */
  rewardId: string;
  introLines: Record<Lang, string[]>;
  celebrateLine: Record<Lang, string>;
  actionLabel: Record<Lang, string>;
};

export const MISSIONS: MissionDef[] = [
  {
    id: 'bridge',
    resourceEmoji: '🪵',
    goal: 5,
    rewardId: 'hat-adventurer',
    introLines: {
      pt: ['A PONTE QUEBROU!', 'PRECISAMOS DE 5 MADEIRAS!'],
      en: ['THE BRIDGE IS BROKEN!', 'WE NEED 5 PIECES OF WOOD!'],
    },
    celebrateLine: { pt: 'CONSEGUIMOS! 🎉', en: 'WE DID IT! 🎉' },
    actionLabel: { pt: 'ATRAVESSAR A PONTE →', en: 'CROSS THE BRIDGE →' },
  },
  {
    id: 'garden',
    resourceEmoji: '🌱',
    goal: 5,
    rewardId: 'back-explorer',
    introLines: {
      pt: ['O JARDIM ESTÁ SECO!', 'VAMOS PLANTAR 5 SEMENTES!'],
      en: ['THE GARDEN IS DRY!', "LET'S PLANT 5 SEEDS!"],
    },
    celebrateLine: { pt: 'QUE LINDO! 🌼', en: 'HOW BEAUTIFUL! 🌼' },
    actionLabel: { pt: 'PASSEAR NO JARDIM →', en: 'WALK IN THE GARDEN →' },
  },
  {
    id: 'tower',
    resourceEmoji: '💎',
    goal: 5,
    rewardId: 'cape-magic',
    introLines: {
      pt: ['A TORRE ESTÁ TRANCADA!', 'PRECISAMOS DE 5 CRISTAIS!'],
      en: ['THE TOWER IS LOCKED!', 'WE NEED 5 CRYSTALS!'],
    },
    celebrateLine: { pt: 'A PORTA ABRIU! ✨', en: 'THE DOOR OPENED! ✨' },
    actionLabel: { pt: 'ENTRAR NA TORRE →', en: 'ENTER THE TOWER →' },
  },
  {
    id: 'cave',
    resourceEmoji: '🏮',
    goal: 5,
    rewardId: 'boots-fast',
    introLines: {
      pt: ['QUE CAVERNA ESCURA!', 'VAMOS ACENDER 5 LAMPIÕES!'],
      en: ['WHAT A DARK CAVE!', "LET'S LIGHT 5 LANTERNS!"],
    },
    celebrateLine: { pt: 'QUE BRILHO! ✨', en: 'SO BRIGHT! ✨' },
    actionLabel: { pt: 'EXPLORAR A CAVERNA →', en: 'EXPLORE THE CAVE →' },
  },
  {
    id: 'balloon',
    resourceEmoji: '🎈',
    goal: 5,
    rewardId: 'glasses-magic',
    introLines: {
      pt: ['O BALÃO ESTÁ FURADO!', 'PRECISAMOS DE 5 REMENDOS!'],
      en: ['THE BALLOON HAS HOLES!', 'WE NEED 5 PATCHES!'],
    },
    celebrateLine: { pt: 'O BALÃO ENCHEU! 🎈', en: 'THE BALLOON IS FULL! 🎈' },
    actionLabel: { pt: 'SUBIR NO BALÃO →', en: 'HOP IN THE BALLOON →' },
  },
  {
    id: 'rainbow',
    resourceEmoji: '🎨',
    goal: 5,
    rewardId: 'wand-stars',
    introLines: {
      pt: ['O ARCO-ÍRIS APAGOU!', 'VAMOS PINTAR COM 5 CORES!'],
      en: ['THE RAINBOW FADED!', "LET'S PAINT IT WITH 5 COLORS!"],
    },
    celebrateLine: { pt: 'QUE LINDO! 🌈', en: 'SO PRETTY! 🌈' },
    actionLabel: { pt: 'SEGUIR O ARCO-ÍRIS →', en: 'FOLLOW THE RAINBOW →' },
  },
];
