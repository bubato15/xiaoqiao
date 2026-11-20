import { createLocalStore } from "./local-store";

export interface PracticeProgress {
  /** Map of "topicId:hanzi" -> true for words the user marked as remembered */
  masteredWords: Record<string, boolean>;
  /** Map of topicId -> best quiz score */
  quizScores: Record<string, { best: number; total: number }>;
  /** Map of "topicId:sentenceId" -> true for sentences practiced */
  practicedSentences: Record<string, boolean>;
}

const DEFAULT_PRACTICE_PROGRESS: PracticeProgress = {
  masteredWords: {},
  quizScores: {},
  practicedSentences: {},
};

export const practiceProgress = createLocalStore<PracticeProgress>(
  "xq.practiceProgress",
  DEFAULT_PRACTICE_PROGRESS
);

export const wordProgressKey = (topicId: string, hanzi: string) => `${topicId}:${hanzi}`;
export const sentenceProgressKey = (topicId: string, id: number) => `${topicId}:${id}`;

export function toggleWordMastered(topicId: string, hanzi: string) {
  const current = practiceProgress.get();
  const key = wordProgressKey(topicId, hanzi);
  const next = { ...current.masteredWords };
  if (next[key]) {
    delete next[key];
  } else {
    next[key] = true;
  }
  practiceProgress.set({ ...current, masteredWords: next });
}

export function saveQuizScore(topicId: string, score: number, total: number) {
  const current = practiceProgress.get();
  const prev = current.quizScores[topicId]?.best ?? 0;
  practiceProgress.set({
    ...current,
    quizScores: {
      ...current.quizScores,
      [topicId]: {
        best: Math.max(prev, score),
        total,
      },
    },
  });
}

export function markSentencePracticed(topicId: string, sentenceId: number) {
  const current = practiceProgress.get();
  const key = sentenceProgressKey(topicId, sentenceId);
  practiceProgress.set({
    ...current,
    practicedSentences: {
      ...current.practicedSentences,
      [key]: true,
    },
  });
}
