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

  return {
    parseSectionName,
    buildSections,
    groupSections,
    filterSections,
    findNextSection,
    summarizeDaily,
  };
});
