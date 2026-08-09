export type MissionDef = {
  id: 'bridge' | 'garden' | 'tower';
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
];
