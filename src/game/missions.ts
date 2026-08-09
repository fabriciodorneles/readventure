export type MissionDef = {
  id: 'bridge' | 'garden' | 'tower' | 'cave' | 'balloon' | 'rainbow';
  /** Emoji do recurso coletado (HUD e recompensa de leitura) */
  resourceEmoji: string;
  goal: number;
  /** Cosmético destravado no baú desta missão */
  rewardId: string;
  introLines: string[];
  celebrateLine: string;
  actionLabel: string;
};

export const MISSIONS: MissionDef[] = [
  {
    id: 'bridge',
    resourceEmoji: '🪵',
    goal: 5,
    rewardId: 'hat-adventurer',
    introLines: ['A PONTE QUEBROU!', 'PRECISAMOS DE 5 MADEIRAS!'],
    celebrateLine: 'CONSEGUIMOS! 🎉',
    actionLabel: 'ATRAVESSAR A PONTE →',
  },
  {
    id: 'garden',
    resourceEmoji: '🌱',
    goal: 5,
    rewardId: 'back-explorer',
    introLines: ['O JARDIM ESTÁ SECO!', 'VAMOS PLANTAR 5 SEMENTES!'],
    celebrateLine: 'QUE LINDO! 🌼',
    actionLabel: 'PASSEAR NO JARDIM →',
  },
  {
    id: 'tower',
    resourceEmoji: '💎',
    goal: 5,
    rewardId: 'cape-magic',
    introLines: ['A TORRE ESTÁ TRANCADA!', 'PRECISAMOS DE 5 CRISTAIS!'],
    celebrateLine: 'A PORTA ABRIU! ✨',
    actionLabel: 'ENTRAR NA TORRE →',
  },
  {
    id: 'cave',
    resourceEmoji: '🏮',
    goal: 5,
    rewardId: 'boots-fast',
    introLines: ['QUE CAVERNA ESCURA!', 'VAMOS ACENDER 5 LAMPIÕES!'],
    celebrateLine: 'QUE BRILHO! ✨',
    actionLabel: 'EXPLORAR A CAVERNA →',
  },
  {
    id: 'balloon',
    resourceEmoji: '🎈',
    goal: 5,
    rewardId: 'glasses-magic',
    introLines: ['O BALÃO ESTÁ FURADO!', 'PRECISAMOS DE 5 REMENDOS!'],
    celebrateLine: 'O BALÃO ENCHEU! 🎈',
    actionLabel: 'SUBIR NO BALÃO →',
  },
  {
    id: 'rainbow',
    resourceEmoji: '🎨',
    goal: 5,
    rewardId: 'wand-stars',
    introLines: ['O ARCO-ÍRIS APAGOU!', 'VAMOS PINTAR COM 5 CORES!'],
    celebrateLine: 'QUE LINDO! 🌈',
    actionLabel: 'SEGUIR O ARCO-ÍRIS →',
  },
];
