export type ReadingPrompt = {
  id: string;
  /** Texto em caixa normal; a exibição aplica a preferência de caixa. */
  text: string;
  difficulty: 1 | 2 | 3;
  type: 'word' | 'sentence';
  tags?: string[];
};

const words: Array<[string, string[]?]> = [
  ['Borboleta', ['long_word']],
  ['Bicicleta', ['long_word']],
  ['Cachorro', ['rr', 'ch']],
  ['Floresta'],
  ['Janela'],
  ['Tesouro'],
  ['Aventura'],
  ['Pipoca'],
  ['Sapato'],
  ['Estrela'],
  ['Chuva', ['ch']],
  ['Boneca'],
  ['Girassol', ['ss']],
  ['Foguete'],
  ['Peixe'],
  ['Macaco'],
  ['Abelha', ['lh']],
  ['Castelo'],
  ['Sorvete'],
  ['Pirata'],
  ['Jacaré', ['accents']],
  ['Galinha', ['nh']],
  ['Panela'],
  ['Espelho', ['lh']],
  ['Tartaruga', ['long_word']],
  ['Coelho', ['lh']],
  ['Dinossauro', ['long_word', 'ss']],
  ['Arco-íris', ['accents']],
];

const shortSentences: Array<[string, string[]?]> = [
  ['O gato subiu na árvore.', ['accents']],
  ['A menina abriu a porta.'],
  ['O cachorro correu para fora.', ['rr']],
  ['A raposa entrou na floresta.'],
  ['O passarinho pousou na janela.', ['nh']],
  ['O sol brilha no céu.', ['accents']],
  ['A abelha voa na flor.', ['lh']],
  ['O peixe nada no rio.'],
  ['A lua apareceu à noite.', ['accents']],
  ['O sapo pulou na lagoa.'],
  ['A vaca come capim no campo.'],
  ['O bolo está no forno.', ['accents']],
  ['A chuva molhou o jardim.', ['ch', 'lh']],
  ['O menino joga bola na rua.'],
  ['A boneca dorme na cama.'],
  ['O pato nada no lago.'],
  ['A flor nasceu no jardim.'],
  ['O vento balança as folhas.', ['lh']],
  ['A estrela brilha no céu.', ['accents', 'lh']],
  ['O macaco come banana.'],
  ['A formiga carrega a folha.', ['lh']],
  ['O trem apita bem alto.'],
  ['O galo canta de manhã.', ['nh', 'accents']],
  ['O coelho come cenoura.', ['lh']],
  ['A fada mora na floresta.'],
];

const longSentences: Array<[string, string[]?]> = [
  ['A menina encontrou uma chave perto da árvore.', ['ch', 'accents']],
  ['O cachorro correu atrás da bola vermelha.', ['rr', 'accents']],
  ['A raposa atravessou a floresta e encontrou um rio.'],
  ['A borboleta pousou na flor amarela do jardim.'],
  ['O pirata escondeu o tesouro atrás da pedra grande.', ['accents']],
  ['A tartaruga andou devagar até a beira do rio.', ['accents']],
  ['O foguete subiu para o céu cheio de estrelas.', ['ch', 'accents']],
  ['A galinha achou três pintinhos no quintal.', ['nh', 'accents']],
  ['O menino guardou os brinquedos dentro da caixa.', ['nh']],
  ['A fada pequena morava dentro de uma flor.'],
  ['O cachorro escondeu o osso no fundo do quintal.', ['rr']],
  ['A menina plantou uma semente no jardim da escola.'],
  ['O gato dormiu em cima do telhado quente.', ['lh']],
  ['A coruja abriu os olhos quando a noite chegou.', ['lh', 'ch']],
  ['O barco navegou pelo rio até a cachoeira.', ['ch', 'accents']],
];

function slug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .split('-')
    .slice(0, 4)
    .join('-');
}

export const readingPrompts: ReadingPrompt[] = [
  ...words.map(
    ([text, tags]): ReadingPrompt => ({
      id: `w-${slug(text)}`,
      text,
      difficulty: 1,
      type: 'word',
      tags,
    }),
  ),
  ...shortSentences.map(
    ([text, tags]): ReadingPrompt => ({
      id: `s-${slug(text)}`,
      text,
      difficulty: 2,
      type: 'sentence',
      tags: [...(tags ?? []), 'short_sentence'],
    }),
  ),
  ...longSentences.map(
    ([text, tags]): ReadingPrompt => ({
      id: `l-${slug(text)}`,
      text,
      difficulty: 3,
      type: 'sentence',
      tags: [...(tags ?? []), 'long_sentence'],
    }),
  ),
];

/**
 * Gradação dentro de cada missão: a leitura N usa a dificuldade
 * DIFFICULTY_SEQUENCE[N] (2 palavras → 2 frases simples → 1 frase longa).
 */
const DIFFICULTY_SEQUENCE: Array<1 | 2 | 3> = [1, 1, 2, 2, 3];

/**
 * Sorteia o próximo desafio: dificuldade conforme a posição na missão,
 * evitando repetir textos já lidos até esgotar o banco daquele nível.
 */
export function getNextPrompt(completedPromptIds: string[], positionInMission: number): ReadingPrompt {
  const difficulty =
    DIFFICULTY_SEQUENCE[Math.min(positionInMission, DIFFICULTY_SEQUENCE.length - 1)];
  const ofDifficulty = readingPrompts.filter((p) => p.difficulty === difficulty);
  const fresh = ofDifficulty.filter((p) => !completedPromptIds.includes(p.id));
  const pool = fresh.length > 0 ? fresh : ofDifficulty;
  return pool[Math.floor(Math.random() * pool.length)];
}
