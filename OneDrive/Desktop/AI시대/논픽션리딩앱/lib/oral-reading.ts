import { defaultOralReadingLimitSeconds, type GradeLevel } from "./grade-levels";

export type OralReadingResult = { durationSeconds: number; limitSeconds: number; completedWithinLimit: boolean };

export function resolveOralReadingLimit(input: { gradeLevel?: GradeLevel; oralReadingLimitSeconds?: number }) {
  return input.oralReadingLimitSeconds ?? defaultOralReadingLimitSeconds(input.gradeLevel);
}

export function buildOralReadingResult(durationSeconds: number, limitSeconds: number): OralReadingResult {
  const duration = Math.max(0, Math.ceil(durationSeconds));
  return { durationSeconds: duration, limitSeconds, completedWithinLimit: duration <= limitSeconds };
}
