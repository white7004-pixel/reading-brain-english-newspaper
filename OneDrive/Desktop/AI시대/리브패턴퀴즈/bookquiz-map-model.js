(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainBookquizMap = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const NODES = Object.freeze(["word-study", "word-quiz", "pattern-study", "pattern-quiz"]);

  function uniqueValidNodes(nodes) {
    return NODES.filter((node) => Array.isArray(nodes) && nodes.includes(node));
  }

  function createMap(options = {}) {
    return resumeMap({ version: 1, round: 1, maxRounds: 2, currentNode: "word-study", ...options });
  }

  function resumeMap(saved = {}) {
    const completedStageIds = uniqueValidNodes(saved.completedStageIds);
    const completionEvidence = Boolean(saved.allRoundsCompleted || saved.rewardApplied);
    const round = Number(saved.round) === 2 || completionEvidence ? 2 : 1;
    const allRoundsCompleted = round === 2 && Boolean(saved.allRoundsCompleted);
    const currentNode = NODES.includes(saved.currentNode)
      ? saved.currentNode
      : allRoundsCompleted
        ? "pattern-quiz"
        : NODES[Math.min(completedStageIds.length, NODES.length - 1)];
    return {
      version: 1,
      round,
      maxRounds: 2,
      currentNode,
      completedStageIds,
      roundCompleted: allRoundsCompleted || Boolean(saved.roundCompleted),
      allRoundsCompleted,
      reviewNode: NODES.includes(saved.reviewNode) ? saved.reviewNode : "",
      rewardApplied: allRoundsCompleted && Boolean(saved.rewardApplied),
    };
  }

  function canOpenNode(map, nodeId) {
    if (!NODES.includes(nodeId)) return false;
    if (map?.allRoundsCompleted) return true;
    return nodeId === map?.currentNode || map?.completedStageIds?.includes(nodeId);
  }

  function completeNode(map, nodeId) {
    const current = resumeMap(map);
    if (nodeId !== current.currentNode || current.allRoundsCompleted) return current;
    const index = NODES.indexOf(nodeId);
    const completedStageIds = uniqueValidNodes([...current.completedStageIds, nodeId]);
    if (index < NODES.length - 1) {
      return { ...current, completedStageIds, currentNode: NODES[index + 1], reviewNode: "" };
    }
    if (current.round === 1) {
      return { ...current, completedStageIds, roundCompleted: true, reviewNode: "" };
    }
    return {
      ...current,
      completedStageIds,
      roundCompleted: true,
      allRoundsCompleted: true,
      rewardApplied: false,
      reviewNode: "",
    };
  }

  function startSecondRound(map) {
    const current = resumeMap(map);
    if (current.round !== 1 || !current.roundCompleted || current.allRoundsCompleted) return current;
    return createMap({ round: 2 });
  }

  function openReview(map, nodeId) {
    const current = resumeMap(map);
    if (!current.allRoundsCompleted || !NODES.includes(nodeId)) return current;
    return { ...current, reviewNode: nodeId };
  }

  return { NODES, createMap, completeNode, startSecondRound, canOpenNode, openReview, resumeMap };
});
