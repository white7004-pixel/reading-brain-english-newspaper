import { render, screen } from "@testing-library/react";
import { LearnerApp } from "@/components/learner-app";
import { createDefaultLearnerState, loadLearnerState, saveLearnerState } from "@/lib/learner-store";
import { saveStudioState } from "@/lib/studio-store";
import { withdrawArticle } from "@/lib/studio-workflow";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "@/tests/studio-fixtures";

function createOnboardedState() {
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  return state;
}

function saveArticles(storage: Storage, articles: Parameters<typeof saveStudioState>[1]["articles"]) {
  saveStudioState(storage, { schemaVersion: 2, articles });
}

test("shows only published studio content to learners", () => {
  const storage = createMemoryStorage();
  saveArticles(storage, [
    makeStudioArticle({ id: "hidden", title: "Hidden" }),
    makePublishedArticle({ id: "visible", title: "Visible" }),
  ]);

  render(<LearnerApp initialState={createOnboardedState()} storage={storage} />);

  expect(screen.getByText("Visible")).toBeInTheDocument();
  expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
});

test("removes withdrawn content on a new render without changing saved attempts", () => {
  const storage = createMemoryStorage();
  const published = makePublishedArticle({ id: "withdrawn", title: "Withdrawn article" });
  const fallback = makePublishedArticle({ id: "available", title: "Available article" });
  const state = createOnboardedState();
  state.profile.xp = 35;
  state.attempts = [{
    id: "withdrawn-attempt",
    articleId: "withdrawn",
    completedAt: "2026-08-18T12:00:00.000Z",
    localDate: "2026-08-18",
    correct: 3,
    total: 3,
    hintsUsed: 0,
    durationSeconds: 120,
    xpAwarded: 35,
  }];
  state.completedArticleIds = ["withdrawn"];
  saveLearnerState(storage, state);
  saveArticles(storage, [published, fallback]);

  const view = render(<LearnerApp initialState={state} storage={storage} />);
  expect(screen.getByText("Withdrawn article")).toBeInTheDocument();

  saveArticles(storage, [withdrawArticle(published, "2026-08-18T13:00:00.000Z"), fallback]);
  view.rerender(<LearnerApp initialState={state} storage={storage} />);

  expect(screen.queryByText("Withdrawn article")).not.toBeInTheDocument();
  expect(loadLearnerState(storage).attempts).toEqual(state.attempts);
  expect(loadLearnerState(storage).profile.xp).toBe(35);
});
