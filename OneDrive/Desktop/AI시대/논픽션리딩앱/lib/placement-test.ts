export type PlacementQuestion = {
  prompt: string;
  options: string[];
  correct: number;
  level: number;
};

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  { prompt: "A bird can ___.", options: ["fly", "table", "blue"], correct: 0, level: 0.8 },
  { prompt: "Plants need sunlight to ___.", options: ["grow", "sleep", "write"], correct: 0, level: 1.5 },
  { prompt: "The word ‘ancient’ means ___.", options: ["very old", "very loud", "very fast"], correct: 0, level: 2.3 },
  { prompt: "A habitat is the place where an animal ___.", options: ["lives", "counts", "paints"], correct: 0, level: 3.2 },
  { prompt: "Evidence helps a reader ___.", options: ["support an idea", "erase a page", "avoid a topic"], correct: 0, level: 4.3 },
  { prompt: "A consequence is most similar to a ___.", options: ["result", "question", "material"], correct: 0, level: 5.4 },
];

export const AR_ENTRY_MIN = 0.1;
export const AR_ENTRY_MAX = 12.9;
export const DEFAULT_ESTIMATED_DIFFICULTY = 0.5;

export function estimateDifficulty(answers: number[]): number {
  const passed = PLACEMENT_QUESTIONS.filter((question, index) => answers[index] === question.correct);
  return passed.length ? passed[passed.length - 1].level : DEFAULT_ESTIMATED_DIFFICULTY;
}

export function isValidArEntry(value: number): boolean {
  return Number.isFinite(value) && value >= AR_ENTRY_MIN && value <= AR_ENTRY_MAX;
}
