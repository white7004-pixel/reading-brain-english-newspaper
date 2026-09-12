(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainOfflineSync = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function validEvent(event) {
    return Boolean(
      event
      && typeof event.id === "string"
      && event.id
      && event.type === "progress"
      && event.payload
      && typeof event.payload === "object"
      && !Array.isArray(event.payload)
      && typeof event.createdAt === "string"
      && !Number.isNaN(Date.parse(event.createdAt)),
    );
  }

  function normalizeQueue(value) {
    const seen = new Set();
    return (Array.isArray(value) ? value : []).filter((event) => {
      if (!validEvent(event) || seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    }).map((event) => ({ ...event, payload: { ...event.payload } }));
  }

  function enqueue(queue, event) {
    const current = normalizeQueue(queue);
    return !validEvent(event) || current.some((item) => item.id === event.id)
      ? current
      : [...current, { ...event, payload: { ...event.payload } }];
  }

  function acknowledge(queue, ids) {
    const accepted = new Set(Array.isArray(ids) ? ids : []);
    return normalizeQueue(queue).filter((event) => !accepted.has(event.id));
  }

  function nextBatch(queue, limit) {
    return normalizeQueue(queue).slice(0, Math.max(1, Number(limit) || 1));
  }

  function createEventId(deviceId, sessionId, sequence) {
    return `${String(deviceId)}:${String(sessionId)}:${Math.max(1, Number(sequence) || 1)}`;
  }

  return { normalizeQueue, enqueue, acknowledge, nextBatch, createEventId };
});
