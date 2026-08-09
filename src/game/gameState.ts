import { MISSIONS } from './missions';
import { cosmeticById } from '../avatar/cosmetics';

export type TextCasePreference = 'uppercase' | 'sentence-case';

export type AvatarConfig = {
  skin: number;
  hair: number;
  shirt: number;
};

export type EquippedCosmetics = {
  hat?: string;
  back?: string;
  cape?: string;
  boots?: string;
  glasses?: string;
  hand?: string;
};

/**
 * Fases genéricas de uma missão:
 * intro → collecting → transforming (animação do mundo mudando) →
 * transformed (celebração) → approach (avatar caminha) → chest → reward.
 * Depois da última missão: complete.
 */
export type Phase =
  | 'avatar-setup'
  | 'intro'
  | 'collecting'
  | 'transforming'
  | 'transformed'
  | 'approach'
  | 'chest'
  | 'reward'
  | 'complete';

export type GameState = {
  phase: Phase;
  missionIndex: number;
  avatar: AvatarConfig | null;
  /** Recursos coletados na missão atual */
  resources: number;
  unlockedCosmetics: string[];
  equippedCosmetics: EquippedCosmetics;
  completedPrompts: string[];
  textCase: TextCasePreference;
};

export const initialGameState: GameState = {
  phase: 'avatar-setup',
  missionIndex: 0,
  avatar: null,
  resources: 0,
  unlockedCosmetics: [],
  equippedCosmetics: {},
  completedPrompts: [],
  textCase: 'uppercase',
};

export type GameAction =
  | { type: 'CREATE_AVATAR'; avatar: AvatarConfig }
  | { type: 'INTRO_DONE' }
  | { type: 'READING_SUCCESS'; promptId: string }
  | { type: 'TRANSFORM_DONE' }
  | { type: 'GO' }
  | { type: 'APPROACH_DONE' }
  | { type: 'OPEN_CHEST' }
  | { type: 'EQUIP_REWARD' }
  | { type: 'SET_TEXT_CASE'; value: TextCasePreference }
  | { type: 'RESET' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  const mission = MISSIONS[state.missionIndex];
  switch (action.type) {
    case 'CREATE_AVATAR':
      return { ...state, avatar: action.avatar, phase: 'intro' };
    case 'INTRO_DONE':
      return state.phase === 'intro' ? { ...state, phase: 'collecting' } : state;
    case 'READING_SUCCESS': {
      if (state.phase !== 'collecting') return state;
      const resources = Math.min(state.resources + 1, mission.goal);
      const completedPrompts = state.completedPrompts.includes(action.promptId)
        ? state.completedPrompts
        : [...state.completedPrompts, action.promptId];
      return {
        ...state,
        resources,
        completedPrompts,
        phase: resources >= mission.goal ? 'transforming' : 'collecting',
      };
    }
    case 'TRANSFORM_DONE':
      return state.phase === 'transforming' ? { ...state, phase: 'transformed' } : state;
    case 'GO':
      return state.phase === 'transformed' ? { ...state, phase: 'approach' } : state;
    case 'APPROACH_DONE':
      return state.phase === 'approach' ? { ...state, phase: 'chest' } : state;
    case 'OPEN_CHEST':
      if (state.phase !== 'chest') return state;
      return {
        ...state,
        unlockedCosmetics: state.unlockedCosmetics.includes(mission.rewardId)
          ? state.unlockedCosmetics
          : [...state.unlockedCosmetics, mission.rewardId],
        phase: 'reward',
      };
    case 'EQUIP_REWARD': {
      if (state.phase !== 'reward') return state;
      const cosmetic = cosmeticById(mission.rewardId);
      const equippedCosmetics = cosmetic
        ? { ...state.equippedCosmetics, [cosmetic.slot]: cosmetic.id }
        : state.equippedCosmetics;
      const isLastMission = state.missionIndex >= MISSIONS.length - 1;
      return isLastMission
        ? { ...state, equippedCosmetics, phase: 'complete' }
        : {
            ...state,
            equippedCosmetics,
            missionIndex: state.missionIndex + 1,
            resources: 0,
            phase: 'intro',
          };
    }
    case 'SET_TEXT_CASE':
      return { ...state, textCase: action.value };
    case 'RESET':
      return { ...initialGameState, textCase: state.textCase };
    default:
      return state;
  }
}

const STORAGE_KEY_V1 = 'readventure-save-v1';
const STORAGE_KEY = 'readventure-save-v2';

const VALID_PHASES: Phase[] = [
  'avatar-setup',
  'intro',
  'collecting',
  'transforming',
  'transformed',
  'approach',
  'chest',
  'reward',
  'complete',
];

function sanitize(state: GameState): GameState {
  if (!VALID_PHASES.includes(state.phase)) state.phase = 'avatar-setup';
  if (!state.avatar) state.phase = 'avatar-setup';
  if (state.missionIndex < 0 || state.missionIndex >= MISSIONS.length) state.missionIndex = 0;
  // Fases transitórias de animação voltam para um estado estável
  if (state.phase === 'approach') state.phase = 'transformed';
  if (state.phase === 'reward') state.phase = 'chest';
  // Save antigo "completo" quando novas missões foram adicionadas: continua nelas
  if (state.phase === 'complete' && state.missionIndex < MISSIONS.length - 1) {
    state.missionIndex += 1;
    state.resources = 0;
    state.phase = 'intro';
  }
  return state;
}

/** Converte o save do MVP (só a ponte) para o formato com missões. */
function migrateV1(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_V1);
    if (!raw) return null;
    type V1 = {
      phase?: string;
      avatar?: AvatarConfig | null;
      wood?: number;
      bridgeBuilt?: boolean;
      unlockedCosmetics?: string[];
      equippedCosmetics?: EquippedCosmetics;
      completedPrompts?: string[];
      textCase?: TextCasePreference;
    };
    const old = JSON.parse(raw) as V1;
    const state: GameState = {
      ...initialGameState,
      avatar: old.avatar ?? null,
      unlockedCosmetics: old.unlockedCosmetics ?? [],
      equippedCosmetics: old.equippedCosmetics ?? {},
      completedPrompts: old.completedPrompts ?? [],
      textCase: old.textCase ?? 'uppercase',
    };
    if (!state.avatar) {
      state.phase = 'avatar-setup';
    } else if (old.phase === 'complete') {
      // Terminou a ponte no MVP: continua direto na missão do jardim
      state.missionIndex = 1;
      state.phase = 'intro';
    } else {
      state.missionIndex = 0;
      state.resources = old.wood ?? 0;
      const map: Record<string, Phase> = {
        intro: 'intro',
        collecting: 'collecting',
        building: 'transforming',
        built: 'transformed',
        crossing: 'transformed',
        chest: 'chest',
        hat: 'chest',
      };
      state.phase = map[old.phase ?? ''] ?? 'intro';
    }
    localStorage.removeItem(STORAGE_KEY_V1);
    return sanitize(state);
  } catch {
    return null;
  }
}

export function loadGameState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<GameState>;
      return sanitize({ ...initialGameState, ...parsed });
    }
    return migrateV1() ?? initialGameState;
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
