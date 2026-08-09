/**
 * Normalização de texto para comparação de leitura.
 * O texto exibido preserva acentos; a comparação é feita sem acentos,
 * sem pontuação, em maiúsculas e com espaços colapsados.
 */
export function normalizeForComparison(text: string): string {
  return text
    .toLocaleUpperCase('pt-BR')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  const normalized = normalizeForComparison(text);
  return normalized.length === 0 ? [] : normalized.split(' ');
}
