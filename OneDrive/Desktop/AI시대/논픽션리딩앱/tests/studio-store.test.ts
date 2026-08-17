import {
  getPublicArticles,
  loadStudioState,
  saveStudioState,
  upsertStudioArticle,
} from "@/lib/studio-store";
import { withdrawArticle } from "@/lib/studio-workflow";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "@/tests/studio-fixtures";

describe("versioned studio content store", () => {
  it("returns only approved, published snapshots to learners", () => {
    const draft = makeStudioArticle({ id: "draft" });
    const published = makePublishedArticle({ id: "live" });
    const withdrawn = withdrawArticle(makePublishedArticle({ id: "off" }), "2026-08-18T10:00:00.000Z");

    expect(getPublicArticles({ schemaVersion: 1, articles: [draft, published, withdrawn] }).map((item) => item.id))
      .toEqual(["live"]);
  });

  it.each([
    ["invalid JSON", "{"],
    ["an empty stored value", ""],
    ["a valid JSON object with malformed articles", JSON.stringify({ schemaVersion: 1, articles: [{}] })],
    ["an unsupported schema version", JSON.stringify({ schemaVersion: 99, articles: [] })],
  ])("backs up %s and recovers with seeded reviewed content", (_description, raw) => {
    const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": raw });

    const state = loadStudioState(storage);

    expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBe(raw);
    expect(getPublicArticles(state)).toHaveLength(6);
  });

  it("hides published-looking snapshots without completed reviews and approval", () => {
    const forged = {
      ...makePublishedArticle({ id: "forged" }),
      approval: null,
      reviewRecords: {},
    };

    expect(getPublicArticles({ schemaVersion: 1, articles: [forged] })).toEqual([]);
  });

  it("backs up and rejects stored published-looking snapshots without approval evidence", () => {
    const forged = {
      ...makePublishedArticle({ id: "forged" }),
      approval: null,
      reviewRecords: {},
    };
    const raw = JSON.stringify({ schemaVersion: 1, articles: [forged] });
    const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": raw });

    const state = loadStudioState(storage);

    expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBe(raw);
    expect(getPublicArticles(state)).toHaveLength(6);
  });

  it("replaces an existing article and persists the replacement", () => {
    const original = makeStudioArticle({ id: "rainforests", title: "Original" });
    const replacement = { ...original, title: "Revised" };
    const storage = createMemoryStorage();
    const state = upsertStudioArticle({ schemaVersion: 1, articles: [original] }, replacement);

    saveStudioState(storage, state);

    expect(loadStudioState(storage).articles).toEqual([replacement]);
    expect(original.title).toBe("Original");
  });

  it("isolates stored published snapshots from public result mutations", () => {
    const storage = createMemoryStorage();
    const seeded = loadStudioState(storage);
    const originalTitle = seeded.articles[0].publishedSnapshot?.title;
    const originalPage = seeded.articles[0].publishedSnapshot?.pages[0];

    const publicArticle = getPublicArticles(seeded)[0];
    publicArticle.title = "Tampered title";
    publicArticle.pages[0] = "Tampered page";

    saveStudioState(storage, seeded);
    const loaded = loadStudioState(storage);

    expect(seeded.articles[0].publishedSnapshot?.title).toBe(originalTitle);
    expect(seeded.articles[0].publishedSnapshot?.pages[0]).toBe(originalPage);
    expect(getPublicArticles(seeded)[0].title).toBe(originalTitle);
    expect(getPublicArticles(seeded)[0].pages[0]).toBe(originalPage);
    expect(Object.isFrozen(seeded.articles[0].publishedSnapshot)).toBe(true);
    expect(Object.isFrozen(loaded.articles[0].publishedSnapshot?.pages)).toBe(true);
  });

  it("round-trips structurally valid partial draft rows without replacing unrelated articles", () => {
    const partial = makeStudioArticle({
      id: "partial",
      vocabulary: [{ word: "", pronunciation: "", meaningKo: "", definitionEn: "", exampleSentence: "" }],
      quiz: [{ id: "q-draft", type: "comprehension", prompt: "", options: [""], correctIndex: 4, explanation: "", evidence: "" }],
      sources: [{ title: "", publisher: "", url: "", publishedAt: "", materialType: "news", supportedFact: "" }],
      media: [{ provider: "youtube", embedUrl: "", alt: "", usageConfirmed: false }],
    });
    const unrelated = makeStudioArticle({ id: "unrelated", title: "Keep me" });
    const storage = createMemoryStorage();

    saveStudioState(storage, { schemaVersion: 2, articles: [partial, unrelated] });
    const loaded = loadStudioState(storage);

    expect(loaded.articles.map((article) => article.id)).toEqual(["partial", "unrelated"]);
    expect(loaded.articles[0]).toMatchObject({
      vocabulary: [{ word: "", exampleSentence: "" }],
      quiz: [{ prompt: "", correctIndex: 4, evidence: "" }],
      sources: [{ title: "", supportedFact: "" }],
      media: [{ embedUrl: "", alt: "", usageConfirmed: false }],
    });
    expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBeNull();
  });

  it("migrates schema-one articles to the complete editable schema", () => {
    const legacy = structuredClone(makeStudioArticle()) as unknown as Record<string, unknown>;
    for (const field of ["summaryEn", "subtopic", "minAge", "maxAge", "estimatedReadingSeconds", "safetyFlags", "safetyReviewed", "reconstructionConfirmed", "rightsNotes", "previewReview"]) {
      delete legacy[field];
    }
    delete (legacy.vocabulary as Array<Record<string, unknown>>)[0].exampleSentence;
    delete (legacy.quiz as Array<Record<string, unknown>>)[0].type;
    delete (legacy.quiz as Array<Record<string, unknown>>)[0].evidence;
    delete (legacy.sources as Array<Record<string, unknown>>)[0].materialType;
    delete (legacy.sources as Array<Record<string, unknown>>)[0].supportedFact;
    const raw = JSON.stringify({ schemaVersion: 1, articles: [legacy] });
    const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": raw });

    const loaded = loadStudioState(storage);

    expect(loaded.schemaVersion).toBe(2);
    expect(loaded.articles[0]).toMatchObject({
      summaryEn: "",
      subtopic: "",
      minAge: 10,
      maxAge: 12,
      estimatedReadingSeconds: 180,
      safetyFlags: [],
      safetyReviewed: false,
      reconstructionConfirmed: false,
      rightsNotes: "",
      previewReview: null,
    });
    expect(loaded.articles[0].vocabulary[0]).toMatchObject({ exampleSentence: "" });
    expect(loaded.articles[0].quiz[0]).toMatchObject({ type: "comprehension", evidence: "" });
    expect(loaded.articles[0].sources[0]).toMatchObject({ materialType: "article", supportedFact: "" });
    expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBeNull();
  });

});
