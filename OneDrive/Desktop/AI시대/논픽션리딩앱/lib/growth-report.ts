import type { LearningAttempt } from "./learner-store";
import type { KnowledgeDomain } from "./types";

export type WeeklyGrowth = {
  startLocalDate: string;
  endLocalDate: string;
  activeDays: number;
  questCount: number;
  totalMinutes: number;
  quizAccuracyPercent: number;
  keyFinderAccuracyPercent: number | null;
  domainCounts: Partial<Record<KnowledgeDomain, number>>;
  dailyMinutes: Array<{ localDate: string; minutes: number }>;
};

export function buildWeeklyGrowth(attempts: LearningAttempt[], referenceLocalDate: string): WeeklyGrowth {
  const startLocalDate = startOfLocalWeek(referenceLocalDate);
  const endLocalDate = endOfLocalWeek(referenceLocalDate);
  const weekAttempts = attempts.filter((attempt) => attempt.localDate >= startLocalDate && attempt.localDate <= endLocalDate);
  const totalDurationSeconds = weekAttempts.reduce((sum, attempt) => sum + attempt.durationSeconds, 0);
  const totalQuestions = weekAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const correctAnswers = weekAttempts.reduce((sum, attempt) => sum + attempt.correct, 0);
  const keyFinderAttempts = weekAttempts.filter((attempt) => typeof attempt.keyFinderCorrect === "boolean");
  const correctKeyFinderAttempts = keyFinderAttempts.filter((attempt) => attempt.keyFinderCorrect).length;
  const minutesByDate = new Map<string, number>();
  const domainCounts: Partial<Record<KnowledgeDomain, number>> = {};

  for (const attempt of weekAttempts) {
    minutesByDate.set(attempt.localDate, (minutesByDate.get(attempt.localDate) ?? 0) + attempt.durationSeconds);
    if (attempt.domain) domainCounts[attempt.domain] = (domainCounts[attempt.domain] ?? 0) + 1;
  }

  return {
    startLocalDate,
    endLocalDate,
    activeDays: minutesByDate.size,
    questCount: weekAttempts.length,
    totalMinutes: Math.round(totalDurationSeconds / 60),
    quizAccuracyPercent: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
    keyFinderAccuracyPercent: keyFinderAttempts.length > 0 ? Math.round((correctKeyFinderAttempts / keyFinderAttempts.length) * 100) : null,
    domainCounts,
    dailyMinutes: localWeekDates(startLocalDate).map((localDate) => ({
      localDate,
      minutes: Math.round((minutesByDate.get(localDate) ?? 0) / 60),
    })),
  };
}

function startOfLocalWeek(localDate: string): string {
  const date = parseLocalDate(localDate);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return formatLocalDate(date);
}

function endOfLocalWeek(localDate: string): string {
  const date = parseLocalDate(localDate);
  date.setUTCDate(date.getUTCDate() + ((7 - date.getUTCDay()) % 7));
  return formatLocalDate(date);
}

function localWeekDates(startLocalDate: string): string[] {
  const date = parseLocalDate(startLocalDate);
  return Array.from({ length: 7 }, () => {
    const value = formatLocalDate(date);
    date.setUTCDate(date.getUTCDate() + 1);
    return value;
  });
}

function parseLocalDate(localDate: string): Date {
  const [year, month, day] = localDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatLocalDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
