export type TextCasePreference = 'uppercase' | 'sentence-case';

export type AvatarConfig = {
  /** Índice do tom de pele */
  skin: number;
  /** Índice do estilo de cabelo */
  hair: number;
  /** Índice da cor da camiseta */
  shirt: number;
};

export type Phase =
  | 'avatar-setup'
  | 'intro'
  | 'collecting'
  | 'building'
  | 'built'
  | 'crossing'
  | 'chest'
  | 'hat'
  | 'complete';

export type GameState = {
  phase: Phase;
  avatar: AvatarConfig | null;
  wood: number;
  woodGoal: number;
  bridgeBuilt: boolean;
  unlockedCosmetics: string[];
  equippedCosmetics: { hat?: string };
  completedPrompts: string[];
  textCase: TextCasePreference;
};

export const ADVENTURER_HAT_ID = 'hat-adventurer';

export const initialGameState: GameState = {
  phase: 'avatar-setup',
  avatar: null,
  wood: 0,
  woodGoal: 5,
  bridgeBuilt: false,
  unlockedCosmetics: [],
  equippedCosmetics: {},
  completedPrompts: [],
  textCase: 'uppercase',
};

export type GameAction =
  | { type: 'CREATE_AVATAR'; avatar: AvatarConfig }
  | { type: 'INTRO_DONE' }
  | { type: 'READING_SUCCESS'; promptId: string }
  | { type: 'BUILD_DONE' }
  | { type: 'CROSS' }
  | { type: 'CROSSED' }
  | { type: 'OPEN_CHEST' }
  | { type: 'EQUIP_HAT' }
  | { type: 'SET_TEXT_CASE'; value: TextCasePreference }
  | { type: 'RESET' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CREATE_AVATAR':
      return { ...state, avatar: action.avatar, phase: 'intro' };
    case 'INTRO_DONE':
      return state.phase === 'intro' ? { ...state, phase: 'collecting' } : state;
    case 'READING_SUCCESS': {
      if (state.phase !== 'collecting') return state;
      const wood = Math.min(state.wood + 1, state.woodGoal);
      const completedPrompts = state.completedPrompts.includes(action.promptId)
        ? state.completedPrompts
        : [...state.completedPrompts, action.promptId];
      return {
        ...state,
        wood,
        completedPrompts,
        phase: wood >= state.woodGoal ? 'building' : 'collecting',
      };
    }
    case 'BUILD_DONE':
      return state.phase === 'building' ? { ...state, bridgeBuilt: true, phase: 'built' } : state;
    case 'CROSS':
      return state.phase === 'built' ? { ...state, phase: 'crossing' } : state;
    case 'CROSSED':
      return state.phase === 'crossing' ? { ...state, phase: 'chest' } : state;
    case 'OPEN_CHEST':
      if (state.phase !== 'chest') return state;
      return {
        ...state,
        unlockedCosmetics: state.unlockedCosmetics.includes(ADVENTURER_HAT_ID)
          ? state.unlockedCosmetics
          : [...state.unlockedCosmetics, ADVENTURER_HAT_ID],
        phase: 'hat',
      };
    case 'EQUIP_HAT':
      if (state.phase !== 'hat') return state;
      return {
        ...state,
        equippedCosmetics: { ...state.equippedCosmetics, hat: ADVENTURER_HAT_ID },
        phase: 'complete',
      };
    case 'SET_TEXT_CASE':
      return { ...state, textCase: action.value };
    case 'RESET':
      return { ...initialGameState, textCase: state.textCase };
    default:
      return state;
  }
}

const STORAGE_KEY = 'readventure-save-v1';

const VALID_PHASES: Phase[] = [
  'avatar-setup',
  'intro',
  'collecting',
  'building',
  'built',
  'crossing',
  'chest',
  'hat',
  'complete',
];

export function loadGameState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialGameState;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    const state: GameState = { ...initialGameState, ...parsed };
    if (!VALID_PHASES.includes(state.phase)) state.phase = 'avatar-setup';
    if (!state.avatar) state.phase = 'avatar-setup';
    // Fases transitórias de animação voltam para um estado estável
    if (state.phase === 'building' || state.phase === 'built') state.phase = state.bridgeBuilt ? 'built' : 'building';
    if (state.phase === 'crossing') state.phase = 'built';
    if (state.phase === 'hat') state.phase = 'chest';
    return state;
  } catch {
    return initialGameState;
  }
}

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // armazenamento indisponível: o jogo continua sem persistir
  }
}
