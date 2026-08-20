(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainGameUIModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const feedback = {
    default: { label: "함께 시작해 볼까요?", tone: "neutral" },
    guide: { label: "리브를 따라와요!", tone: "info" },
    listening: { label: "잘 듣고 있어요!", tone: "info" },
    correct: { label: "정답이에요! 별을 획득했어요!", tone: "success" },
    wrong: { label: "괜찮아요. 다시 확인해 봐요!", tone: "error" },
    complete: { label: "퀘스트 완료!", tone: "reward" },
  };

  function normalizeMascotState(value) {
    return Object.prototype.hasOwnProperty.call(feedback, value) ? value : "default";
  }

  function feedbackFor(state) {
    return feedback[normalizeMascotState(state)];
  }

  return { normalizeMascotState, feedbackFor };
});
