import { SAMPLE_ARTICLES } from "@/lib/sample-content";
import {
  CORRUPT_STUDIO_BACKUP_KEY,
  STUDIO_STORAGE_KEY,
  getPublicArticles,
  loadStudioState,
  saveStudioState,
  upsertStudioArticle,
} from "@/lib/studio-store";
import type { StudioArticle } from "@/lib/studio-types";
import type { QuestMetadata } from "@/lib/quest-types";
import { applyArticleEdit, withdrawArticle } from "@/lib/studio-workflow";
import { completeAttestedStage, createMemoryStorage, makePublishedArticle, makeStudioArticle } from "@/tests/studio-fixtures";

const heroImage = {
  src: "/article-images/ar1-batch-07/owl-flight.jpg",
  altKo: "날개를 펼쳐 낮게 나는 올빼미",
  sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
  title: "Example owl",
  creator: "Example Creator",
  licenseName: "CC BY-SA 4.0" as const,
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  isModified: false as const,
};

const quest: QuestMetadata = {
  curiosityQuestionKo: "열대우림은 왜 중요할까?", knowledgeTakeawayKo: "열대우림은 기후와 생명을 돕는다.",
  collectionId: "ar1-living-world", mapOrder: 1, prerequisiteArticleIds: [], nextArticleIds: ["ar1-ocean-tides"],
};

describe("versioned studio content store", () => {
  it("keeps the last approved snapshot public while a replacement is edited", () => {
    const published = makePublishedArticle({ id: "live", title: "Approved title" });
    const replacement = applyArticleEdit(published, { title: "Replacement draft" }, "2026-08-18T09:00:00.000Z");

    expect(getPublicArticles({ schemaVersion: 3, articles: [replacement] })).toEqual([
      expect.objectContaining({ id: "live", title: "Approved title", version: 1 }),
    ]);
  });

  it("tags transient read failures without writing any replacement data", () => {
    const writes: Array<[string, string]> = [];
    const storage = {
      getItem() { throw new Error("temporary read failure"); },
      setItem(key: string, value: string) { writes.push([key, value]); },
    };

    const outcome = loadStudioState(storage);

    expect(outcome.kind).toBe("read-failed");
    expect(outcome.state.schemaVersion).toBe(3);
    expect(writes).toEqual([]);
  });

  it("tags failed corrupt backups and leaves the primary value untouched", () => {
    let primary = "{broken";
    const primaryWrites: string[] = [];
    const storage = {
      getItem(key: string) { return key === STUDIO_STORAGE_KEY ? primary : null; },
      setItem(key: string, value: string) {
        if (key === CORRUPT_STUDIO_BACKUP_KEY) throw new Error("backup quota exceeded");
        if (key === STUDIO_STORAGE_KEY) { primary = value; primaryWrites.push(value); }
      },
    };

    const outcome = loadStudioState(storage);

    expect(outcome).toMatchObject({ kind: "recovery-failed", raw: "{broken" });
    expect(outcome.state.schemaVersion).toBe(3);
    expect(primary).toBe("{broken");
    expect(primaryWrites).toEqual([]);
  });

  it("distinguishes a confirmed missing key without writing seeds itself", () => {
    const writes: Array<[string, string]> = [];
    const outcome = loadStudioState({ getItem: () => null, setItem: (key, value) => writes.push([key, value]) });

    expect(outcome.kind).toBe("missing");
    expect(getPublicArticles(outcome.state)).toHaveLength(6);
    expect(outcome.state.articles[0]).not.toHaveProperty("status");
    expect(outcome.state.articles[0]).not.toHaveProperty("version");
    expect(writes).toEqual([]);
  });

  it("round-trips a published article with no continuation through save, reload, and public lookup", () => {
    const published = makePublishedArticle({
      id: "standalone",
      title: "Standalone article",
      titleKo: "독립형 글",
      summaryKo: "모든 공개 필드를 저장 경계에서 확인합니다.",
      domain: "world-culture",
      interestBand: "teen",
      difficulty: { value: 4.7, method: "external-user-entry", label: "External AR 4.7" },
      wordCount: 287,
      pages: ["First complete page.", "Second complete page."],
      vocabulary: [{ word: "custom", pronunciation: "KUS-tum", meaningKo: "맞춤", definitionEn: "made for a specific purpose", exampleSentence: "This is custom content." }],
      quiz: [{ id: "custom-q", type: "inference", prompt: "What follows?", options: ["A", "B"], correctIndex: 1, explanation: "B follows from the text.", evidence: "Second complete page." }],
      sources: [{ title: "Source title", publisher: "Source publisher", url: "https://example.org/source", publishedAt: "2026-01-02", materialType: "paper", supportedFact: "The source supports the custom article." }],
      connectedArticleId: undefined,
      visualTheme: "ocean",
      heroImage,
      audioUrl: "https://media.example.org/custom.mp3",
      media: [{ kind: "image", url: "https://images.example.org/custom.jpg", alt: "A custom illustration", usageConfirmed: true }],
    });
    const storage = createMemoryStorage();

    saveStudioState(storage, { schemaVersion: 3, articles: [published] });
    const outcome = loadStudioState(storage);

    expect(outcome.kind).toBe("loaded");
    const publicArticle = getPublicArticles(outcome.state)[0];
    expect(publicArticle).toEqual(published.versionHistory[0].snapshot);
    expect(publicArticle.heroImage).toEqual(heroImage);
    expect(publicArticle).not.toHaveProperty("connectedArticleId");
    expect(storage.getItem(CORRUPT_STUDIO_BACKUP_KEY)).toBeNull();
  });

  it("round-trips a continuation selected from another published article", () => {
    const target = makePublishedArticle({ id: "public-target", title: "Public target" });
    const source = makePublishedArticle({ id: "public-source", title: "Public source", connectedArticleId: target.id });
    const storage = createMemoryStorage();

    saveStudioState(storage, { schemaVersion: 3, articles: [source, target] });

    expect(getPublicArticles(loadStudioState(storage).state).find((article) => article.id === source.id)?.connectedArticleId)
      .toBe(target.id);
  });

  it("persists optional quest metadata without sharing relationship arrays after reload", () => {
    const storage = createMemoryStorage();
    saveStudioState(storage, { schemaVersion: 3, articles: [makePublishedArticle({ id: "quest", quest })] });
    const loaded = loadStudioState(storage).state.articles[0];

    expect(loaded.quest).toEqual(quest);
    expect(loaded.quest?.nextArticleIds).not.toBe(quest.nextArticleIds);
    expect(getPublicArticles({ schemaVersion: 3, articles: [loaded] })[0].quest).toEqual(quest);
  });

  it("hydrates publication and audit history as append-only runtime records", () => {
    const storage = createMemoryStorage();
    saveStudioState(storage, { schemaVersion: 3, articles: [makePublishedArticle({ id: "immutable-history" })] });

    const article = loadStudioState(storage).state.articles[0];

    expect(Object.isFrozen(article.versionHistory)).toBe(true);
    expect(Object.isFrozen(article.versionHistory[0])).toBe(true);
    expect(Object.isFrozen(article.versionHistory[0].approval)).toBe(true);
    expect(Object.isFrozen(article.auditHistory)).toBe(true);
    expect(Object.isFrozen(article.auditHistory[0])).toBe(true);
    expect(() => {
      (article.versionHistory[0].approval as { actor: string }).actor = "tampered";
    }).toThrow();
  });

  it("round-trips safe tagged image media into the public snapshot", () => {
    const published = makePublishedArticle({
      id: "with-image",
      media: [{ kind: "image", url: "https://images.example.org/rainforest.jpg", alt: "Rainforest canopy", usageConfirmed: true }],
    });
    const storage = createMemoryStorage();

    saveStudioState(storage, { schemaVersion: 3, articles: [published] });
    const publicArticle = getPublicArticles(loadStudioState(storage).state)[0];

    expect(publicArticle.media).toEqual([
      { kind: "image", url: "https://images.example.org/rainforest.jpg", alt: "Rainforest canopy" },
    ]);
  });

  it("returns only active publications with complete approval evidence", () => {
    const draft = makeStudioArticle({ id: "draft" });
    const published = makePublishedArticle({ id: "live" });
    const withdrawn = withdrawArticle(makePublishedArticle({ id: "off" }), "2026-08-18T10:00:00.000Z");
    const forged = { ...makePublishedArticle({ id: "forged" }), versionHistory: [] };

    expect(getPublicArticles({ schemaVersion: 3, articles: [draft, published, withdrawn, forged] }).map((item) => item.id)).toEqual(["live"]);
  });

  it.each([
    ["invalid JSON", "{"],
    ["an empty stored value", ""],
    ["a valid JSON object with malformed articles", JSON.stringify({ schemaVersion: 1, articles: [{}] })],
    ["an unsupported schema version", JSON.stringify({ schemaVersion: 99, articles: [] })],
  ])("backs up %s before offering seeded recovery", (_description, raw) => {
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: raw });

    const outcome = loadStudioState(storage);

    expect(outcome.kind).toBe("corrupt-backed-up");
    expect(storage.getItem(CORRUPT_STUDIO_BACKUP_KEY)).toBe(raw);
    expect(getPublicArticles(outcome.state)).toHaveLength(6);
    expect(storage.getItem(STUDIO_STORAGE_KEY)).toBe(raw);
  });

  it("rejects an invalid current state before touching the primary key", () => {
    const original = JSON.stringify({ schemaVersion: 3, articles: [] });
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: original });
    const forged = { ...makePublishedArticle({ id: "forged" }), approval: null, reviewRecords: {} };

    expect(() => saveStudioState(storage, { schemaVersion: 3, articles: [forged] } as never)).toThrow("Invalid studio state");
    expect(storage.getItem(STUDIO_STORAGE_KEY)).toBe(original);
  });

  it("rejects a published continuation that was never a valid public selection", () => {
    const original = JSON.stringify({ schemaVersion: 3, articles: [] });
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: original });
    const forged = makePublishedArticle({ id: "source", connectedArticleId: "never-published" });

    expect(() => saveStudioState(storage, { schemaVersion: 3, articles: [forged] })).toThrow("Invalid studio connection");
    expect(storage.getItem(STUDIO_STORAGE_KEY)).toBe(original);
  });

  it("rejects dangling public connections while hydrating stored schema-three state", () => {
    const forged = makePublishedArticle({ id: "source", connectedArticleId: "missing-target" });
    const raw = JSON.stringify({ schemaVersion: 3, articles: [forged] });
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: raw });

    const outcome = loadStudioState(storage);

    expect(outcome.kind).toBe("corrupt-backed-up");
    expect(storage.getItem(CORRUPT_STUDIO_BACKUP_KEY)).toBe(raw);
  });

  it("rejects publication history whose attestations are bound to a different version", () => {
    const original = JSON.stringify({ schemaVersion: 3, articles: [] });
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: original });
    const published = makePublishedArticle();
    const forged = {
      ...published,
      versionHistory: [{
        ...published.versionHistory[0],
        reviewRecords: {
          ...published.versionHistory[0].reviewRecords,
          facts: { ...published.versionHistory[0].reviewRecords.facts, workingVersion: 99 },
        },
      }],
    };

    expect(() => saveStudioState(storage, { schemaVersion: 3, articles: [forged] })).toThrow("Invalid studio state");
    expect(storage.getItem(STUDIO_STORAGE_KEY)).toBe(original);
  });

  it("rejects schema-three current reviews that do not contain the exact stage checklist", () => {
    const published = makePublishedArticle({ id: "forged-current-review" });
    const forged = {
      ...published,
      reviewRecords: {
        ...published.reviewRecords,
        facts: { ...published.reviewRecords.facts!, checklistItemIds: [] },
      },
    };
    const original = JSON.stringify({ schemaVersion: 3, articles: [] });
    const saveStorage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: original });

    expect(() => saveStudioState(saveStorage, { schemaVersion: 3, articles: [forged] })).toThrow("Invalid studio state");
    expect(saveStorage.getItem(STUDIO_STORAGE_KEY)).toBe(original);

    const raw = JSON.stringify({ schemaVersion: 3, articles: [forged] });
    const loadStorage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: raw });
    expect(loadStudioState(loadStorage).kind).toBe("corrupt-backed-up");
    expect(loadStorage.getItem(CORRUPT_STUDIO_BACKUP_KEY)).toBe(raw);
  });

  it("rejects audit entries whose attested checklist does not match the recorded stage", () => {
    const published = makePublishedArticle({ id: "forged-audit" });
    const first = published.auditHistory[0];
    if (first.kind !== "stage-reviewed") throw new Error("Expected the first audit entry to be a stage review");
    const forged = {
      ...published,
      auditHistory: [
        { ...first, record: { ...first.record, checklistItemIds: ["language.grammar" as const] } },
        ...published.auditHistory.slice(1),
      ],
    };

    expect(() => saveStudioState(createMemoryStorage(), { schemaVersion: 3, articles: [forged] }))
      .toThrow("Invalid studio state");
  });

  it("replaces an existing article and persists the replacement", () => {
    const original = makeStudioArticle({ id: "rainforests", title: "Original" });
    const replacement = { ...original, title: "Revised" };
    const storage = createMemoryStorage();
    const state = upsertStudioArticle({ schemaVersion: 3, articles: [original] }, replacement);

    saveStudioState(storage, state);

    expect(loadStudioState(storage).state.articles).toEqual([replacement]);
    expect(original.title).toBe("Original");
  });

  it("isolates frozen stored snapshots from public result mutations", () => {
    const published = makePublishedArticle();
    const storage = createMemoryStorage();
    saveStudioState(storage, { schemaVersion: 3, articles: [published] });
    const loaded = loadStudioState(storage).state;
    const snapshot = loaded.articles[0].versionHistory[0].snapshot;
    const originalTitle = snapshot.title;
    const originalPage = snapshot.pages[0];

    const publicArticle = getPublicArticles(loaded)[0];
    publicArticle.title = "Tampered title";
    publicArticle.pages[0] = "Tampered page";

    expect(snapshot.title).toBe(originalTitle);
    expect(snapshot.pages[0]).toBe(originalPage);
    expect(getPublicArticles(loaded)[0].title).toBe(originalTitle);
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.pages)).toBe(true);
  });

  it("round-trips structurally valid partial drafts without replacing unrelated articles", () => {
    const partial = makeStudioArticle({
      id: "partial",
      vocabulary: [{ word: "", pronunciation: "", meaningKo: "", definitionEn: "", exampleSentence: "" }],
      quiz: [{ id: "q-draft", type: "comprehension", prompt: "", options: [""], correctIndex: 4, explanation: "", evidence: "" }],
      sources: [{ title: "", publisher: "", url: "", publishedAt: "", materialType: "news", supportedFact: "" }],
      media: [{ kind: "video", provider: "youtube", embedUrl: "", alt: "", usageConfirmed: false }],
    });
    const unrelated = makeStudioArticle({ id: "unrelated", title: "Keep me" });
    const storage = createMemoryStorage();

    saveStudioState(storage, { schemaVersion: 3, articles: [partial, unrelated] });
    const loaded = loadStudioState(storage).state;

    expect(loaded.articles.map((article) => article.id)).toEqual(["partial", "unrelated"]);
    expect(loaded.articles[0]).toMatchObject({
      vocabulary: [{ word: "", exampleSentence: "" }],
      quiz: [{ prompt: "", correctIndex: 4, evidence: "" }],
      sources: [{ title: "", supportedFact: "" }],
      media: [{ kind: "video", embedUrl: "", alt: "", usageConfirmed: false }],
    });
  });

  it("migrates schema-one drafts conservatively into the complete editable schema", () => {
    const current = makeStudioArticle();
    const legacy = toLegacyDraft(current);
    const raw = JSON.stringify({ schemaVersion: 1, articles: [legacy] });
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: raw });

    const outcome = loadStudioState(storage);

    expect(outcome.kind).toBe("migrated");
    expect(outcome.state.schemaVersion).toBe(3);
    expect(outcome.state.articles[0]).toMatchObject({
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
      reviewRecords: {},
      checklistAttestations: {},
    });
    expect(outcome.state.articles[0]).not.toHaveProperty("ageRange");
    expect(storage.getItem(STUDIO_STORAGE_KEY)).toBe(raw);
  });

  it("migrates the real schema-one seed interest band and publication history", () => {
    const seed = SAMPLE_ARTICLES[0];
    const { review, ...articleFields } = seed;
    const legacySeed = {
      ...articleFields,
      status: "published",
      workingVersion: seed.version,
      publishedSnapshot: seed,
      workflowStatus: "published",
      reviewRecords: {
        facts: { actor: review.approvedBy, completedAt: review.approvedAt },
        language: { actor: review.approvedBy, completedAt: review.approvedAt },
        age: { actor: review.approvedBy, completedAt: review.approvedAt },
      },
      approval: { actor: review.approvedBy, approvedAt: review.approvedAt },
      editor: review.approvedBy,
      updatedAt: review.approvedAt,
      changeLog: [],
      ageRange: seed.interestBand,
      learningGoal: seed.summaryKo,
      keySentence: seed.pages[0],
      keyConcept: seed.domain,
      sourceNotes: seed.sources.map((source) => source.title).join(", "),
      media: [],
    };
    const storage = createMemoryStorage({ [STUDIO_STORAGE_KEY]: JSON.stringify({ schemaVersion: 1, articles: [legacySeed] }) });

    const outcome = loadStudioState(storage);
    const article = outcome.state.articles[0];

    expect(outcome.kind).toBe("migrated");
    expect(article).toMatchObject({ minAge: 7, maxAge: 99, activePublicationVersion: 1 });
    expect(article).not.toHaveProperty("ageRange");
    expect(article.versionHistory[0]).toMatchObject({ version: 1, publishedAt: null, provenance: "legacy" });
    expect(getPublicArticles(outcome.state)).toHaveLength(1);
  });

  it("migrates a schema-two replacement without taking its approved predecessor offline", () => {
    const published = makePublishedArticle({ id: "legacy-live", title: "Approved predecessor" });
    const replacement = applyArticleEdit(published, { title: "Unreviewed replacement" }, "2026-08-18T10:00:00.000Z");
    const publication = published.versionHistory[0];
    const legacy = {
      ...replacement,
      status: "draft",
      publishedSnapshot: publication.snapshot,
      reviewRecords: Object.fromEntries(Object.entries(publication.reviewRecords).map(([stage, record]) => [stage, {
        actor: record.actor,
        completedAt: record.completedAt,
      }])),
      approval: { actor: publication.approval.actor, approvedAt: publication.approval.approvedAt },
      previewReview: { actor: publication.previewReview.actor, reviewedAt: publication.previewReview.reviewedAt },
      ageRange: "10-12",
    };
    const storage = createMemoryStorage({
      [STUDIO_STORAGE_KEY]: JSON.stringify({ schemaVersion: 2, articles: [legacy] }),
    });

    const outcome = loadStudioState(storage);

    expect(outcome).toMatchObject({ kind: "migrated", from: 2 });
    expect(outcome.state.articles[0]).toMatchObject({
      title: "Unreviewed replacement",
      workflowStatus: "draft",
      workingVersion: 2,
      activePublicationVersion: 1,
      reviewRecords: {},
      approval: null,
    });
    expect(getPublicArticles(outcome.state)).toEqual([
      expect.objectContaining({ id: "legacy-live", title: "Approved predecessor", version: 1 }),
    ]);
  });

  it("migrates the real schema-two edited-live shape after mutable review evidence was cleared", () => {
    const published = makePublishedArticle({ id: "legacy-edited", title: "Approved predecessor" });
    const legacy = toLegacyV2(published);
    legacy.title = "Unreviewed replacement";
    legacy.status = "draft";
    legacy.workingVersion = 2;
    legacy.workflowStatus = "draft";
    legacy.reviewRecords = {};
    legacy.approval = null;
    legacy.previewReview = null;
    const storage = createMemoryStorage({
      [STUDIO_STORAGE_KEY]: JSON.stringify({ schemaVersion: 2, articles: [legacy] }),
    });

    const outcome = loadStudioState(storage);

    expect(outcome).toMatchObject({ kind: "migrated", from: 2 });
    expect(outcome.state.articles[0]).toMatchObject({
      title: "Unreviewed replacement",
      workingVersion: 2,
      workflowStatus: "draft",
      activePublicationVersion: 1,
      reviewRecords: {},
      approval: null,
    });
    expect(getPublicArticles(outcome.state)).toEqual([
      expect.objectContaining({ id: "legacy-edited", title: "Approved predecessor", version: 1 }),
    ]);
  });

  it("migrates a withdrawn schema-two snapshot even when mutable review evidence is absent", () => {
    const published = makePublishedArticle({ id: "legacy-withdrawn", title: "Withdrawn predecessor" });
    const legacy = toLegacyV2(published);
    legacy.status = "withdrawn";
    legacy.workflowStatus = "withdrawn";
    legacy.reviewRecords = {};
    legacy.approval = null;
    legacy.previewReview = null;
    legacy.withdrawnAt = "2026-08-18T12:00:00.000Z";
    const storage = createMemoryStorage({
      [STUDIO_STORAGE_KEY]: JSON.stringify({ schemaVersion: 2, articles: [legacy] }),
    });

    const outcome = loadStudioState(storage);

    expect(outcome).toMatchObject({ kind: "migrated", from: 2 });
    expect(outcome.state.articles[0]).toMatchObject({
      workflowStatus: "withdrawn",
      activePublicationVersion: null,
      approval: { actor: "approver", workingVersion: 1 },
    });
    expect(outcome.state.articles[0].versionHistory[0].withdrawnAt).toBe("2026-08-18T12:00:00.000Z");
    expect(getPublicArticles(outcome.state)).toEqual([]);
  });

  it("preserves legacy reviewed-draft evidence in append-only audit history while requiring fresh attestations", () => {
    const facts = completeAttestedStage(makeStudioArticle({ id: "legacy-reviewed" }), "facts", "legacy-facts", "2026-08-18T01:00:00.000Z");
    const language = completeAttestedStage(facts, "language", "legacy-language", "2026-08-18T02:00:00.000Z");
    const legacy = toLegacyV2(language);
    legacy.status = "review";
    legacy.previewReview = null;
    const storage = createMemoryStorage({
      [STUDIO_STORAGE_KEY]: JSON.stringify({ schemaVersion: 2, articles: [legacy] }),
    });

    const outcome = loadStudioState(storage);

    expect(outcome).toMatchObject({ kind: "migrated", from: 2 });
    expect(outcome.state.articles[0]).toMatchObject({ workflowStatus: "draft", reviewRecords: {}, checklistAttestations: {} });
    expect(outcome.state.articles[0].auditHistory).toEqual([
      expect.objectContaining({ kind: "stage-reviewed", version: 1, stage: "facts", record: expect.objectContaining({ actor: "legacy-facts", provenance: "legacy" }) }),
      expect.objectContaining({ kind: "stage-reviewed", version: 1, stage: "language", record: expect.objectContaining({ actor: "legacy-language", provenance: "legacy" }) }),
    ]);
  });
});

function toLegacyDraft(article: StudioArticle): Record<string, unknown> {
  const legacy = structuredClone(article) as unknown as Record<string, unknown>;
  for (const field of [
    "summaryEn", "subtopic", "minAge", "maxAge", "estimatedReadingSeconds", "safetyFlags", "safetyReviewed",
    "reconstructionConfirmed", "rightsNotes", "previewReview", "checklistAttestations", "activePublicationVersion",
    "versionHistory", "auditHistory",
  ]) delete legacy[field];
  legacy.status = "draft";
  legacy.version = 1;
  legacy.ageRange = "10-12";
  delete (legacy.vocabulary as Array<Record<string, unknown>>)[0].exampleSentence;
  delete (legacy.quiz as Array<Record<string, unknown>>)[0].type;
  delete (legacy.quiz as Array<Record<string, unknown>>)[0].evidence;
  delete (legacy.sources as Array<Record<string, unknown>>)[0].materialType;
  delete (legacy.sources as Array<Record<string, unknown>>)[0].supportedFact;
  return legacy;
}

function toLegacyV2(article: StudioArticle): Record<string, unknown> {
  const legacy = structuredClone(article) as unknown as Record<string, unknown>;
  const publication = article.versionHistory[0];
  legacy.status = article.workflowStatus === "published" ? "published" : "draft";
  legacy.version = publication?.version ?? article.workingVersion;
  legacy.publishedSnapshot = publication?.snapshot ?? null;
  legacy.withdrawnAt = publication?.withdrawnAt ?? null;
  legacy.ageRange = `${article.minAge}-${article.maxAge}`;
  legacy.reviewRecords = Object.fromEntries(Object.entries(article.reviewRecords).map(([stage, record]) => [stage, {
    actor: record.actor,
    completedAt: record.completedAt,
  }]));
  legacy.media = article.media.map((item) => item.kind === "video"
    ? { provider: item.provider, embedUrl: item.embedUrl, alt: item.alt, usageConfirmed: item.usageConfirmed }
    : item);
  for (const field of ["checklistAttestations", "activePublicationVersion", "versionHistory", "auditHistory"]) delete legacy[field];
  return legacy;
}
