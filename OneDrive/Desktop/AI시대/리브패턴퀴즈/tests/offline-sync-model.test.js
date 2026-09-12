const assert = require("node:assert/strict");
const sync = require("../offline-sync-model.js");

const first = {
  id: "device-a:session-a:1",
  createdAt: "2026-08-23T00:00:00.000Z",
  type: "progress",
  payload: { score: 10 },
};
const second = {
  id: "device-a:session-a:2",
  createdAt: "2026-08-23T00:00:01.000Z",
  type: "progress",
  payload: { score: 20 },
};

assert.deepEqual(sync.normalizeQueue([first, null, { id: "", payload: {} }]), [first]);
assert.deepEqual(sync.enqueue([first], first), [first]);
assert.deepEqual(sync.enqueue([first], second), [first, second]);
assert.deepEqual(sync.nextBatch([first, second], 1), [first]);
assert.deepEqual(sync.acknowledge([first, second], [first.id]), [second]);
assert.equal(sync.createEventId("device-a", "session-a", 3), "device-a:session-a:3");

console.log("offline sync model tests passed");
