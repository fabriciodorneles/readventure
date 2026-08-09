import { normalizeForComparison, tokenize } from './normalizeText';

export type ReadingOutcome = 'success' | 'soft' | 'retry';

export type WordMatch = {
  /** Palavra esperada (normalizada) */
  expected: string;
  /** Palavra reconhecida alinhada a ela, se houver */
  recognized: string | null;
  /** Similaridade 0..1 entre as duas */
  similarity: number;
  matched: boolean;
};

export type ReadingResult = {
  outcome: ReadingOutcome;
  /** Pontuação global 0..1 */
  score: number;
  expectedNormalized: string;
  transcriptNormalized: string;
  wordMatches: WordMatch[];
};

export interface SpeechEvaluator {
  evaluate(expectedText: string, transcript: string): ReadingResult;
}

/** Limiares fáceis de ajustar durante os testes. */
export const evaluationConfig = {
  successThreshold: 0.85,
  softThreshold: 0.6,
  /** Similaridade mínima para considerar uma palavra "acertada" */
  wordMatchThreshold: 0.72,
};

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

function wordSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

/**
 * Alinha as palavras esperadas com as reconhecidas (programação dinâmica,
 * estilo WER) e devolve, para cada palavra esperada, a melhor palavra
 * reconhecida correspondente.
 */
function alignWords(expected: string[], recognized: string[]): WordMatch[] {
  const n = expected.length;
  const m = recognized.length;
  const SKIP_EXPECTED = 1;
  const SKIP_RECOGNIZED = 0.25;

  // dp[i][j] = menor custo para alinhar expected[0..i) com recognized[0..j)
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) dp[i][0] = i * SKIP_EXPECTED;
  for (let j = 1; j <= m; j++) dp[0][j] = j * SKIP_RECOGNIZED;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const sim = wordSimilarity(expected[i - 1], recognized[j - 1]);
      dp[i][j] = Math.min(
        dp[i - 1][j - 1] + (1 - sim),
        dp[i - 1][j] + SKIP_EXPECTED,
        dp[i][j - 1] + SKIP_RECOGNIZED,
      );
    }
  }

  // Reconstrói o alinhamento de trás para frente
  const matches: WordMatch[] = [];
  let i = n;
  let j = m;
  while (i > 0) {
    const sim = j > 0 ? wordSimilarity(expected[i - 1], recognized[j - 1]) : 0;
    if (j > 0 && Math.abs(dp[i][j] - (dp[i - 1][j - 1] + (1 - sim))) < 1e-9) {
      matches.push({
        expected: expected[i - 1],
        recognized: recognized[j - 1],
        similarity: sim,
        matched: sim >= evaluationConfig.wordMatchThreshold,
      });
      i--;
      j--;
    } else if (j > 0 && Math.abs(dp[i][j] - (dp[i][j - 1] + SKIP_RECOGNIZED)) < 1e-9) {
      j--;
    } else {
      matches.push({ expected: expected[i - 1], recognized: null, similarity: 0, matched: false });
      i--;
    }
  }
  return matches.reverse();
}

export class TextSimilarityEvaluator implements SpeechEvaluator {
  evaluate(expectedText: string, transcript: string): ReadingResult {
    const expectedNormalized = normalizeForComparison(expectedText);
    const transcriptNormalized = normalizeForComparison(transcript);
    const expectedWords = tokenize(expectedText);
    const recognizedWords = tokenize(transcript);

    const wordMatches = alignWords(expectedWords, recognizedWords);
    const score =
      wordMatches.length === 0
        ? 0
        : wordMatches.reduce((sum, w) => sum + w.similarity, 0) / wordMatches.length;

    let outcome: ReadingOutcome;
    if (score >= evaluationConfig.successThreshold) outcome = 'success';
    else if (score >= evaluationConfig.softThreshold) outcome = 'soft';
    else outcome = 'retry';

    return { outcome, score, expectedNormalized, transcriptNormalized, wordMatches };
  }
}

export const defaultEvaluator: SpeechEvaluator = new TextSimilarityEvaluator();
