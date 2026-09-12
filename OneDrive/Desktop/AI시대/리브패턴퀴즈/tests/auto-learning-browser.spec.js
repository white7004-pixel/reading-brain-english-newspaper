const { test, expect } = require("@playwright/test");

async function login(page) {
  await page.goto("http://localhost:4174/");
  await page.locator("#studentNameInput").fill("test01");
  await page.locator("#studentPinInput").fill("1234");
  await page.locator("#loginForm").getByRole("button").click();
  await expect(page.locator("body")).not.toHaveClass(/locked/);
}

test("study cards remove manual pronunciation controls and Bookquiz starts as a locked four-step path", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await login(page);

  await page.locator('[data-pmode="study"]').click();
  await expect(page.locator("#studyView")).toHaveClass(/active/);
  await expect(page.locator("#speakButton")).toHaveCount(0);

  await page.locator("#bqNavBtn").click();
  await expect(page.locator("#bookquizView")).toHaveClass(/active/);
  await expect(page.locator("#bqSpeakBtn")).toHaveCount(0);

  const nodes = page.locator("[data-bookquiz-node]");
  await expect(nodes).toHaveCount(4);
  await expect(nodes.nth(0)).toHaveAttribute("aria-current", "step");
  await expect(nodes.nth(0)).toBeEnabled();
  await expect(nodes.nth(1)).toBeDisabled();
  await expect(nodes.nth(2)).toBeDisabled();
  await expect(nodes.nth(3)).toBeDisabled();
  await expect(page.locator("#bookquizSecondRoundBtn")).toBeHidden();
  await expect(page.locator("#bookquizFinalComplete")).toBeHidden();

  expect(errors).toEqual([]);
});

test("a reloaded two-pass completion remains final and opens every node for review", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("rb-learning-profile-v1", JSON.stringify({
      version: 1,
      grade: 3,
      activeCourse: null,
      dailyStats: {},
      stars: 40,
      badges: [],
      streakDays: 0,
      pendingSync: [],
      bookquizCompletion: {
        version: 1,
        round: 2,
        maxRounds: 2,
        currentNode: "pattern-quiz",
        completedStageIds: ["word-study", "word-quiz", "pattern-study", "pattern-quiz"],
        roundCompleted: true,
        allRoundsCompleted: true,
        reviewNode: "",
        rewardApplied: true,
        completedAt: "2026-08-25T00:00:00.000Z",
      },
    }));
  });

  await login(page);
  await page.locator("#bqNavBtn").click();

  await expect(page.locator("#bookquizRoundLabel")).toHaveText("2회독");
  await expect(page.locator("#bookquizMapProgress")).toHaveText("4 / 4 단계 완료");
  await expect(page.locator("#bookquizFinalComplete")).toBeVisible();
  await expect(page.locator("#bookquizSecondRoundBtn")).toBeHidden();

  const nodes = page.locator("[data-bookquiz-node]");
  for (let index = 0; index < 4; index += 1) {
    await expect(nodes.nth(index)).toBeEnabled();
    await expect(nodes.nth(index)).toHaveAttribute("data-state", "complete");
  }

  await nodes.nth(0).click();
  await expect(nodes.nth(0)).toHaveAttribute("data-state", "review");
  await expect(page.locator("#bqCardArea")).toBeVisible();
  await expect(page.locator("#bookquizRoundLabel")).toHaveText("2회독");
  await expect(page.locator("#bookquizFinalComplete")).toBeVisible();
  await expect(page.getByText("3회독", { exact: false })).toHaveCount(0);
});

test("a verb card automatically pronounces base, past, and past participle in order", async ({ page }) => {
  await page.addInitScript(() => {
    window.__verbAudioSources = [];
    window.Audio = class TestAudio {
      constructor(src = "") {
        this.src = src;
        window.__verbAudioSources.push(src);
      }
      play() {
        queueMicrotask(() => this.onended?.());
        return Promise.resolve();
      }
      pause() {}
    };
  });

  await login(page);
  await page.locator("#verbNavBtn").click();
  await expect(page.locator("#verbView")).toHaveClass(/active/);

  await expect.poll(async () => page.evaluate(() => window.__verbAudioSources.filter((src) => src.includes("assets/verb-audio/")))).toHaveLength(3);
  const sources = await page.evaluate(() => window.__verbAudioSources.filter((src) => src.includes("assets/verb-audio/")));
  expect(sources.map((src) => src.match(/-(base|past|pp)\.mp3$/)?.[1])).toEqual(["base", "past", "pp"]);
});

test("pattern pronunciation sends the complete current sentence to neural TTS", async ({ page }) => {
  await page.addInitScript(() => {
    window.__patternAudioSources = [];
    window.Audio = class TestAudio {
      constructor(src = "") {
        this.src = src;
        window.__patternAudioSources.push(src);
      }
      play() {
        queueMicrotask(() => this.onended?.());
        return Promise.resolve();
      }
      pause() {}
    };
  });

  await login(page);

  const samples = [
    "Hello, I am Jack.",
    "What's your name?",
    "My name is Sophia.",
    "Nice to meet you.",
  ];
  for (const english of samples) {
    await page.evaluate(async (sentence) => {
      const item = window.EXPRESSIONS.find((entry) => entry.english === sentence);
      await window.speakExpression(item, 1);
    }, english);
  }

  const sources = await page.evaluate(() => window.__patternAudioSources);
  for (const english of samples) {
    expect(sources).toContain(`/api/tts?text=${encodeURIComponent(english)}`);
  }
});
