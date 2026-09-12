(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainDailyLearning = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const STAGES = Object.freeze({
    pattern: Object.freeze(["study", "quiz", "interpret", "review", "reward"]),
    bookquiz: Object.freeze(["word-study", "word-quiz", "pattern-study", "pattern-quiz", "review", "reward"]),
    verb: Object.freeze(["study", "listen", "speak", "quiz", "review", "reward"]),
  });

  function normalizedGrade(grade) {
    return Math.min(6, Math.max(1, Number(grade) || 1));
  }

  function gradeBand(grade) {
    const value = normalizedGrade(grade);
    if (value <= 2) return "lower";
    if (value <= 4) return "middle";
    return "upper";
  }

  function elementaryVerbs(verbs) {
    return (Array.isArray(verbs) ? verbs : []).filter((item) => item?.level === "초등");
  }

  function createCourse(section, itemIds, options = {}) {
    const stages = STAGES[section];
    if (!stages || !Array.isArray(itemIds) || itemIds.length === 0) return null;

    const resumed = {
      version: 1,
      section,
      stage: stages[0],
      stageIndex: 0,
      itemIds: itemIds.slice(),
      itemIndex: 0,
      answeredToken: "",
      reviewIds: [],
      completed: false,
      grade: normalizedGrade(options.grade),
    };
    return resumed;
  }

  function answerCurrent(course, result) {
    if (!course || !result?.token || course.answeredToken === result.token) return course;

    const reviewIds = course.reviewIds.slice();
    if (!result.correct && !reviewIds.includes(result.itemId)) reviewIds.push(result.itemId);

    const resumed = {
      ...course,
      answeredToken: result.token,
      reviewIds,
    };
    return resumed;
  }

  function advanceCourse(course) {
    if (!course || course.completed) return course;
    const stages = STAGES[course.section];
    if (!stages) return course;

    if (course.itemIndex + 1 < course.itemIds.length) {
      return { ...course, itemIndex: course.itemIndex + 1, answeredToken: "" };
    }

    if (course.stageIndex + 1 < stages.length) {
      const stageIndex = course.stageIndex + 1;
      return {
        ...course,
        stage: stages[stageIndex],
        stageIndex,
        itemIndex: 0,
        answeredToken: "",
      };
    }

    return { ...course, completed: true, answeredToken: "" };
  }

  function resumeCourse(saved, catalog) {
    if (!saved || saved.version !== 1 || !STAGES[saved.section]) return null;
    const allowedIds = catalog?.[saved.section];
    if (!(allowedIds instanceof Set)) return null;

    const itemIds = (Array.isArray(saved.itemIds) ? saved.itemIds : []).filter((id) => allowedIds.has(id));
    if (!itemIds.length) return null;

    const stages = STAGES[saved.section];
    const migratedStage = saved.section === "pattern" && saved.stage === "listen"
      ? "quiz"
      : saved.section === "pattern" && saved.stage === "speech"
        ? "interpret"
        : saved.stage;
    const savedStageIndex = stages.indexOf(migratedStage);
    const stageIndex = savedStageIndex >= 0 ? savedStageIndex : 0;
    const reviewIds = (Array.isArray(saved.reviewIds) ? saved.reviewIds : [])
      .filter((id, index, list) => allowedIds.has(id) && list.indexOf(id) === index);

    const resumed = {
      version: 1,
      section: saved.section,
      stage: stages[stageIndex],
      stageIndex,
      itemIds,
      itemIndex: Math.min(itemIds.length - 1, Math.max(0, Number(saved.itemIndex) || 0)),
      answeredToken: "",
      reviewIds,
      completed: Boolean(saved.completed),
      grade: normalizedGrade(saved.grade),
    };
    if (saved.section === "bookquiz" && saved.bookquizMap && typeof saved.bookquizMap === "object") {
      resumed.bookquizMap = { ...saved.bookquizMap };
    }
    return resumed;
  }

  function createLearningProfile(input = {}, catalog = {}) {
    const dailyStats = input.dailyStats && typeof input.dailyStats === "object" && !Array.isArray(input.dailyStats)
      ? { ...input.dailyStats }
      : {};
    const badges = [...new Set((Array.isArray(input.badges) ? input.badges : []).filter((badge) => typeof badge === "string"))];
    const pendingIds = new Set();
    const pendingSync = (Array.isArray(input.pendingSync) ? input.pendingSync : []).filter((event) => {
      const valid = event
        && typeof event.id === "string"
        && event.id
        && event.type === "progress"
        && typeof event.createdAt === "string"
        && !Number.isNaN(Date.parse(event.createdAt))
        && event.payload
        && typeof event.payload === "object"
        && !Array.isArray(event.payload)
        && !pendingIds.has(event.id);
      if (valid) pendingIds.add(event.id);
      return valid;
    }).map((event) => ({ ...event, payload: { ...event.payload } }));

    const profile = {
      version: 1,
      grade: normalizedGrade(input.grade ?? 3),
      activeCourse: input.activeCourse ? resumeCourse(input.activeCourse, catalog) : null,
      dailyStats,
      stars: Math.max(0, Number(input.stars) || 0),
      badges,
      streakDays: Math.max(0, Number(input.streakDays) || 0),
      pendingSync,
    };
    if (input.bookquizCompletion && typeof input.bookquizCompletion === "object") {
      profile.bookquizCompletion = { ...input.bookquizCompletion };
    }
    return profile;
  }

  function parseLearningProfile(raw, catalog = {}) {
    try {
      const parsed = JSON.parse(raw || "null");
      if (!parsed || parsed.version !== 1) return createLearningProfile();
      return createLearningProfile(parsed, catalog);
    } catch {
      return createLearningProfile();
    }
  }

  function createAdvanceGuard() {
    let token = "";
    return {
      run(nextToken, callback) {
        if (!nextToken || token) return false;
        token = String(nextToken);
        callback();
        return true;
      },
      cancel() {
        token = "";
      },
      pendingToken() {
        return token;
      },
    };
  }

  function courseItems(course, catalog) {
    if (!course || !Array.isArray(course.itemIds) || !Array.isArray(catalog)) return [];
    const byId = new Map(catalog.map((item) => [item.id, item]));
    return course.itemIds.map((id) => byId.get(id)).filter(Boolean);
  }

  function advanceAfterAnswer(course, result) {
    const answered = answerCurrent(course, result);
    if (answered === course) return { accepted: false, course };
    return { accepted: true, course: advanceCourse(answered) };
  }

  function assistanceForGrade(grade) {
    const band = gradeBand(grade);
    if (band === "lower") return { band, hintVisible: true, maxWords: 4 };
    if (band === "middle") return { band, hintVisible: false, maxWords: 8 };
    return { band, hintVisible: false, maxWords: 14 };
  }

  function rewardForCourse(course, stats = {}) {
    if (!course?.completed) return { stars: 0, retrySuccesses: 0, badgeId: "", streakDays: 0 };
    const retrySuccesses = Math.max(0, Number(stats.retrySuccesses) || 0);
    const streakDays = Math.max(0, Number(stats.streakDays) || 0);
    const badgeId = streakDays >= 14 ? "streak-14" : streakDays >= 7 ? "streak-7" : streakDays >= 3 ? "streak-3" : "";
    return { stars: 20 + retrySuccesses * 5, retrySuccesses, badgeId, streakDays };
  }

  function advanceStage(course) {
    if (!course || !Array.isArray(course.itemIds) || !course.itemIds.length) return course;
    return advanceCourse({ ...course, itemIndex: course.itemIds.length - 1 });
  }

  function prepareReview(course) {
    if (!course || course.stage !== "review") return course;
    const reviewIds = [...new Set(Array.isArray(course.reviewIds) ? course.reviewIds : [])];
    if (!reviewIds.length) return advanceStage({ ...course, itemIds: course.itemIds.length ? course.itemIds : [0] });
    return { ...course, itemIds: reviewIds, itemIndex: 0, answeredToken: "" };
  }

  return {
    STAGES,
    gradeBand,
    elementaryVerbs,
    createCourse,
    answerCurrent,
    advanceCourse,
    resumeCourse,
    createLearningProfile,
    parseLearningProfile,
    createAdvanceGuard,
    courseItems,
    advanceAfterAnswer,
    assistanceForGrade,
    rewardForCourse,
    advanceStage,
    prepareReview,
  };
});
