import {
  GRADE_LEVELS,
  defaultOralReadingLimitSeconds,
  gradeLabel,
} from "@/lib/grade-levels";

it("defines all twelve grades in school order", () => {
  expect(GRADE_LEVELS).toEqual([
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
  ]);
  expect(gradeLabel("elementary-1")).toBe("초1");
  expect(gradeLabel("high-3")).toBe("고3");
});

it("returns the approved oral-reading defaults", () => {
  expect(defaultOralReadingLimitSeconds("elementary-1")).toBe(90);
  expect(defaultOralReadingLimitSeconds("elementary-4")).toBe(75);
  expect(defaultOralReadingLimitSeconds("elementary-6")).toBe(60);
  expect(defaultOralReadingLimitSeconds("middle-2")).toBe(50);
  expect(defaultOralReadingLimitSeconds("high-2")).toBe(45);
});
