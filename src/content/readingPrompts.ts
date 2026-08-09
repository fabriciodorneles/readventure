export type ReadingPrompt = {
  id: string;
  /** Texto em caixa normal; a exibição aplica a preferência de caixa. */
  text: string;
  difficulty: 1 | 2 | 3;
  type: 'word' | 'sentence';
  tags?: string[];
};

export const readingPrompts: ReadingPrompt[] = [
  // Dificuldade A — palavras
  { id: 'word-floresta', text: 'Floresta', difficulty: 1, type: 'word', tags: ['forest'] },
  { id: 'word-borboleta', text: 'Borboleta', difficulty: 1, type: 'word', tags: ['long_word'] },
  { id: 'word-bicicleta', text: 'Bicicleta', difficulty: 1, type: 'word', tags: ['long_word'] },
  { id: 'word-cachorro', text: 'Cachorro', difficulty: 1, type: 'word', tags: ['rr', 'ch'] },
  { id: 'word-janela', text: 'Janela', difficulty: 1, type: 'word' },
  { id: 'word-tesouro', text: 'Tesouro', difficulty: 1, type: 'word' },
  { id: 'word-aventura', text: 'Aventura', difficulty: 1, type: 'word' },

  // Dificuldade B — frases simples
  {
    id: 'sentence-gato-arvore',
    text: 'O gato subiu na árvore.',
    difficulty: 2,
    type: 'sentence',
    tags: ['short_sentence', 'accents'],
  },
  {
    id: 'sentence-menina-porta',
    text: 'A menina abriu a porta.',
    difficulty: 2,
    type: 'sentence',
    tags: ['short_sentence'],
  },
  {
    id: 'sentence-cachorro-fora',
    text: 'O cachorro correu para fora.',
    difficulty: 2,
    type: 'sentence',
    tags: ['short_sentence', 'rr'],
  },
  {
    id: 'sentence-raposa-floresta',
    text: 'A raposa entrou na floresta.',
    difficulty: 2,
    type: 'sentence',
    tags: ['short_sentence', 'forest'],
  },
  {
    id: 'sentence-passarinho-janela',
    text: 'O passarinho pousou na janela.',
    difficulty: 2,
    type: 'sentence',
    tags: ['short_sentence', 'nh'],
  },

  // Dificuldade C — frases um pouco mais longas
  {
    id: 'long-menina-chave',
    text: 'A menina encontrou uma chave perto da árvore.',
    difficulty: 3,
    type: 'sentence',
    tags: ['long_sentence', 'ch', 'accents'],
  },
  {
    id: 'long-cachorro-bola',
    text: 'O cachorro correu atrás da bola vermelha.',
    difficulty: 3,
    type: 'sentence',
    tags: ['long_sentence', 'rr'],
  },
  {
    id: 'long-raposa-rio',
    text: 'A raposa atravessou a floresta e encontrou um rio.',
    difficulty: 3,
    type: 'sentence',
    tags: ['long_sentence', 'forest'],
  },
];

/**
 * Ordem dos desafios da missão da ponte: começa com palavras e
 * termina com uma frase mais longa.
 */
export const bridgeMissionPromptIds = [
  'word-floresta',
  'word-borboleta',
  'sentence-gato-arvore',
  'sentence-raposa-floresta',
  'long-menina-chave',
];

export function getNextBridgePrompt(completedPromptIds: string[]): ReadingPrompt {
  const nextId = bridgeMissionPromptIds.find((id) => !completedPromptIds.includes(id));
  if (nextId) {
    const prompt = readingPrompts.find((p) => p.id === nextId);
    if (prompt) return prompt;
  }
  // Reserva: qualquer prompt ainda não lido, ou um aleatório
  const remaining = readingPrompts.filter((p) => !completedPromptIds.includes(p.id));
  const pool = remaining.length > 0 ? remaining : readingPrompts;
  return pool[Math.floor(Math.random() * pool.length)];
}
