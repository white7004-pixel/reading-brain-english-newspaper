export const GRADE_LEVELS = [
  "elementary-1",
  "elementary-2",
  "elementary-3",
  "elementary-4",
  "elementary-5",
  "elementary-6",
  "middle-1",
  "middle-2",
  "middle-3",
  "high-1",
  "high-2",
  "high-3",
] as const;

export type GradeLevel = (typeof GRADE_LEVELS)[number];
export type GradeGroup = "elementary" | "middle" | "high";

export const GRADE_GROUPS: ReadonlyArray<{
  id: GradeGroup;
  label: string;
  grades: readonly GradeLevel[];
}> = [
  { id: "elementary", label: "초등", grades: GRADE_LEVELS.slice(0, 6) },
  { id: "middle", label: "중등", grades: GRADE_LEVELS.slice(6, 9) },
  { id: "high", label: "고등", grades: GRADE_LEVELS.slice(9, 12) },
];

export function gradeLabel(level: GradeLevel): string {
  const [school, year] = level.split("-");
  const prefix = school === "elementary" ? "초" : school === "middle" ? "중" : "고";
  return `${prefix}${year}`;
}

export function defaultOralReadingLimitSeconds(level?: GradeLevel): number {
  if (!level) return 60;
  if (level === "elementary-1" || level === "elementary-2") return 90;
  if (level === "elementary-3" || level === "elementary-4") return 75;
  if (level === "elementary-5" || level === "elementary-6") return 60;
  if (level.startsWith("middle-")) return 50;
  return 45;
}

export function isGradeLevel(value: unknown): value is GradeLevel {
  return typeof value === "string" && (GRADE_LEVELS as readonly string[]).includes(value);
}
