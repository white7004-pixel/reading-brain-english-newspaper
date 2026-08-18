import { render, screen } from "@testing-library/react";
import { LearnerApp } from "@/components/learner-app";
import { createDefaultLearnerState, loadLearnerState, saveLearnerState, STORAGE_KEY } from "@/lib/learner-store";
import { STUDIO_STORAGE_KEY } from "@/lib/studio-store";
import { saveStudioState } from "@/lib/studio-store";
import { applyArticleEdit, withdrawArticle } from "@/lib/studio-workflow";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "@/tests/studio-fixtures";

function createOnboardedState() {
  const state = createDefaultLearnerState();
  state.profile.onboardingComplete = true;
  return state;
}

function saveArticles(storage: Storage, articles: Parameters<typeof saveStudioState>[1]["articles"]) {
  saveStudioState(storage, { schemaVersion: 3, articles });
}

function createCorruptReadOnlyStorage(state: ReturnType<typeof createDefaultLearnerState>): Storage {
  return {
    get length() { return 2; },
    clear() {},
    getItem(key) {
      if (key === STUDIO_STORAGE_KEY) return "{corrupt studio state";
      if (key === STORAGE_KEY) return JSON.stringify(state);
      return null;
    },
    key() { return null; },
    removeItem() {},
    setItem() { throw new Error("Quota exceeded"); },
  };
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
    articleTitle: "Withdrawn article",
    articleVersion: 1,
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

test("keeps the completed title and published version after a retitle and withdrawal", () => {
  const storage = createMemoryStorage();
  const published = makePublishedArticle({ id: "history", title: "Original published title" });
  const state = createOnboardedState();
  state.attempts = [{
    id: "history-attempt",
    articleId: "history",
    articleTitle: published.versionHistory[0].snapshot.title,
    articleVersion: published.versionHistory[0].snapshot.version,
    completedAt: "2026-08-18T12:00:00.000Z",
    localDate: "2026-08-18",
    correct: 3,
    total: 3,
    hintsUsed: 0,
    durationSeconds: 120,
    xpAwarded: 35,
  }];
  saveLearnerState(storage, state);
  saveArticles(storage, [published]);
  const view = render(<LearnerApp initialState={state} storage={storage} />);

  const retitled = applyArticleEdit(
    published,
    { title: "Unpublished replacement title" },
    "2026-08-18T12:30:00.000Z",
  );
  saveArticles(storage, [retitled]);
  view.rerender(<LearnerApp initialState={state} storage={storage} />);

  expect(screen.getByText("Original published title")).toBeInTheDocument();
  expect(screen.queryByText("Unpublished replacement title")).not.toBeInTheDocument();

  saveArticles(storage, [withdrawArticle(retitled, "2026-08-18T13:00:00.000Z")]);
  view.rerender(<LearnerApp initialState={state} storage={storage} />);

  expect(loadLearnerState(storage).attempts[0]).toMatchObject({
    articleId: "history",
    articleTitle: "Original published title",
    articleVersion: 1,
  });
  expect(screen.queryByText("Original published title")).not.toBeInTheDocument();
});

test("renders seeded learner content when corrupt studio storage cannot be backed up", () => {
  const state = createOnboardedState();
  state.attempts = [{
    id: "existing-attempt",
    articleId: "old-article",
    completedAt: "2026-08-18T12:00:00.000Z",
    localDate: "2026-08-18",
    correct: 2,
    total: 3,
    hintsUsed: 1,
    durationSeconds: 120,
    xpAwarded: 25,
  }];
  const storage = createCorruptReadOnlyStorage(state);

  render(<LearnerApp initialState={state} storage={storage} />);

  expect(screen.getByText("Why Do Stars Shine?")).toBeInTheDocument();
  expect(loadLearnerState(storage).attempts).toEqual(state.attempts);
});
