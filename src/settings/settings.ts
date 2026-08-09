import type { TextCasePreference } from '../game/gameState';

/** Aplica a preferência de caixa ao texto exibido para a criança. */
export function applyTextCase(text: string, preference: TextCasePreference): string {
  return preference === 'uppercase' ? text.toLocaleUpperCase('pt-BR') : text;
}
