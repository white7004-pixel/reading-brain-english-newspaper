/**
 * 패턴 영어 허브 계산 모델.
 * DOM 의존 없이 표현 목록과 마스터 id 만으로 섹션 진도를 파생 계산한다.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainPatternHub = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const TRAINING_MARK = "Training 800";

  const GROUP_LABELS = {
    basic: "기초 패턴",
    training: "Training 800",
  };

  const GROUP_ORDER = ["basic", "training"];

  function percentOf(part, whole) {
    if (!whole) return 0;
    return Math.round((part / whole) * 100);
  }

  function statusOf(percent) {
    if (percent >= 100) return "done";
    if (percent > 0) return "learning";
    return "new";
  }

  function parseSectionName(category) {
    const raw = typeof category === "string" ? category.trim() : "";
    const numbered = raw.match(/^(\d+)\.\s*(.*)$/);
    const number = numbered ? Number(numbered[1]) : null;
    let title = numbered ? numbered[2].trim() : raw;
    const group = raw.includes(TRAINING_MARK) ? "training" : "basic";

    if (group === "training" && title.startsWith(TRAINING_MARK)) {
      const stripped = title.slice(TRAINING_MARK.length).replace(/^\s*-\s*/, "");
      title = stripped.trim() || title;
    }

    return { number, title, group };
  }

  function toIdSet(masteredIds) {
    if (masteredIds instanceof Set) return masteredIds;
    return new Set(Array.isArray(masteredIds) ? masteredIds : []);
  }

  function buildSections(expressions, masteredIds) {
    const items = Array.isArray(expressions) ? expressions : [];
    const mastered = toIdSet(masteredIds);
    const byKey = new Map();

    items.forEach((item) => {
      const key = item && item.category ? item.category : "";
      if (!key) return;
      if (!byKey.has(key)) {
        const parsed = parseSectionName(key);
        byKey.set(key, {
          key,
          number: parsed.number,
          title: parsed.title,
          group: parsed.group,
          total: 0,
          mastered: 0,
        });
      }
      const section = byKey.get(key);
      section.total += 1;
      if (mastered.has(item.id)) section.mastered += 1;
    });

    return [...byKey.values()]
      .sort((a, b) => {
        const left = a.number === null ? Number.MAX_SAFE_INTEGER : a.number;
        const right = b.number === null ? Number.MAX_SAFE_INTEGER : b.number;
        if (left !== right) return left - right;
        return a.key.localeCompare(b.key, "ko");
      })
      .map((section) => {
        const percent = percentOf(section.mastered, section.total);
        return { ...section, percent, status: statusOf(percent) };
      });
  }

  function groupSections(sections) {
    const list = Array.isArray(sections) ? sections : [];
    return GROUP_ORDER.map((id) => {
      const members = list.filter((section) => section.group === id);
      const total = members.reduce((sum, section) => sum + section.total, 0);
      const mastered = members.reduce((sum, section) => sum + section.mastered, 0);
      return {
        id,
        label: GROUP_LABELS[id],
        sections: members,
        total,
        mastered,
        percent: percentOf(mastered, total),
      };
    }).filter((group) => group.sections.length > 0);
  }

  function filterSections(sections, query) {
    const list = Array.isArray(sections) ? sections : [];
    const needle = String(query || "").trim().toLowerCase();
    if (!needle) return list;
    return list.filter((section) => {
      const haystack = [
        section.key,
        section.title,
        section.number === null ? "" : String(section.number).padStart(2, "0"),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }

  function findNextSection(sections, key) {
    const list = Array.isArray(sections) ? sections : [];
    const index = list.findIndex((section) => section.key === key);
    if (index === -1 || index >= list.length - 1) return null;
    return list[index + 1];
  }

  function summarizeDaily(daily, goal) {
    const record = daily && typeof daily === "object" ? daily : {};
    const target = goal && typeof goal === "object" ? goal : {};
    const cards = Math.max(0, Number(record.cards) || 0);
    const correct = Math.max(0, Number(record.correct) || 0);
    const cardGoal = Math.max(1, Number(target.cards) || 20);
    const correctGoal = Math.max(1, Number(target.correct) || 10);
    const ratio =
      (Math.min(1, cards / cardGoal) + Math.min(1, correct / correctGoal)) / 2;
    const percent = Math.round(ratio * 100);

    return {
      cards,
      correct,
      cardGoal,
      correctGoal,
      percent,
      done: percent >= 100,
    };
  }

  // ── 듀오링고식 학습 경로 ────────────────────────────────
  //
  // 잠금 규칙: 첫 섹션은 항상 열려 있고, 그 뒤로는 바로 앞 섹션을
  // 클리어해야 열린다. 다만 이미 진도가 있는 섹션은 순서와 무관하게
  // 열어 둔다 — 경로를 도입하면서 기존 학생의 진도를 막지 않기 위해서다.
  function applyPathState(sections, clearedKeys) {
    const list = Array.isArray(sections) ? sections : [];
    const clearedSet = clearedKeys instanceof Set
      ? clearedKeys
      : new Set(Array.isArray(clearedKeys) ? clearedKeys : []);

    return list.map((section, index) => {
      const cleared = clearedSet.has(section.key);
      const previous = index > 0 ? list[index - 1] : null;
      const unlocked =
        index === 0 || cleared || section.mastered > 0 || clearedSet.has(previous.key);

      let pathStatus = "locked";
      if (cleared) pathStatus = "cleared";
      else if (unlocked) pathStatus = section.mastered > 0 ? "learning" : "available";

      return { ...section, cleared, unlocked, pathStatus };
    });
  }

  // 학생이 지금 붙어야 할 섹션 — 열려 있으면서 아직 클리어하지 않은 첫 칸.
  function findCurrentSection(sections) {
    const list = Array.isArray(sections) ? sections : [];
    return list.find((section) => section.unlocked && !section.cleared) || null;
  }

  function buildUnits(sections, size = 6) {
    const list = Array.isArray(sections) ? sections : [];
    const step = Math.max(1, Number(size) || 6);
    const units = [];

    for (let start = 0; start < list.length; start += step) {
      const members = list.slice(start, start + step);
      const index = units.length;
      const first = members[0];
      const last = members[members.length - 1];
      const label = (section) =>
        section.number === null ? "··" : String(section.number).padStart(2, "0");

      units.push({
        index,
        label: `UNIT ${index + 1}`,
        range: `${label(first)} – ${label(last)}`,
        title: first.title,
        sections: members,
        total: members.length,
        clearedCount: members.filter((section) => section.cleared).length,
        unlocked: Boolean(first.unlocked),
      });
    }

    return units;
  }

  const LEARNING_FLOW = ["study", "quiz", "interpret"];

  function nextLearningMode(mode) {
    const index = LEARNING_FLOW.indexOf(mode);
    return index >= 0 && index < LEARNING_FLOW.length - 1
      ? LEARNING_FLOW[index + 1]
      : null;
  }

  function isLearningModeUnlocked(mode, progress = {}) {
    const index = LEARNING_FLOW.indexOf(mode);
    if (mode === "quiz" || mode === "interpret") return true;
    if (index <= 0) return index === 0;
    return LEARNING_FLOW.slice(0, index).every((step) => Boolean(progress[step]));
  }

  return {
    parseSectionName,
    buildSections,
    groupSections,
    filterSections,
    findNextSection,
    summarizeDaily,
    applyPathState,
    findCurrentSection,
    buildUnits,
    nextLearningMode,
    isLearningModeUnlocked,
  };
});
