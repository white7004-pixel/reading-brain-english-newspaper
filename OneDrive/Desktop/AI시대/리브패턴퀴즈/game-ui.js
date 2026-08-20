(function (root) {
  function model() {
    return root.ReadingBrainGameUIModel;
  }

  function guideElement() {
    return typeof document === "undefined" ? null : document.getElementById("livGuide");
  }

  function setMascot(state, message) {
    const uiModel = model();
    if (!uiModel) return "default";

    const normalized = uiModel.normalizeMascotState(state);
    const guide = guideElement();
    const messageElement = typeof document === "undefined" ? null : document.getElementById("livMessage");

    if (guide) guide.dataset.state = normalized;
    if (messageElement) {
      messageElement.textContent = typeof message === "string" && message.trim()
        ? message
        : uiModel.feedbackFor(normalized).label;
    }

    return normalized;
  }

  function setMode(mode) {
    return setMascot(mode);
  }

  function clearReward() {
    return setMascot("default");
  }

  root.ReadingBrainGameUI = { setMascot, setMode, clearReward };
})(typeof globalThis !== "undefined" ? globalThis : this);
