import { advanceActiveQuest, clearActiveQuest, setActiveQuest } from "@/lib/quest-progress";
import { createDefaultLearnerState } from "@/lib/learner-store";

it("starts and explicitly clears a reader quest", () => {
  const started = setActiveQuest(createDefaultLearnerState(), "ar1-owl-flight");

  expect(started.activeQuest).toEqual({ articleId: "ar1-owl-flight", phase: "reader", pageIndex: 0 });
  expect(clearActiveQuest(started).activeQuest).toBeNull();
});

it("advances the active quest on the same article", () => {
  const started = setActiveQuest(createDefaultLearnerState(), "ar1-owl-flight");

  expect(advanceActiveQuest(started, { articleId: "ar1-owl-flight", phase: "quiz", pageIndex: 2 }).activeQuest)
    .toEqual({ articleId: "ar1-owl-flight", phase: "quiz", pageIndex: 2 });
});

it("rejects invalid page indices and cross-article transitions", () => {
  const started = setActiveQuest(createDefaultLearnerState(), "ar1-owl-flight");

  expect(() => advanceActiveQuest(started, { articleId: "ar1-owl-flight", phase: "reader", pageIndex: -1 }))
    .toThrow("non-negative integer");
  expect(() => advanceActiveQuest(started, { articleId: "ar1-forest-food", phase: "reader", pageIndex: 0 }))
    .toThrow("same article");
});
