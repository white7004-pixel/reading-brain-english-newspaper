const assert = require("node:assert/strict");
const pwa = require("../pwa-controller.js");

function eventTarget() {
  const handlers = new Map();
  return {
    addEventListener(type, handler) {
      if (!handlers.has(type)) handlers.set(type, []);
      handlers.get(type).push(handler);
    },
    dispatch(type, event = {}) {
      for (const handler of handlers.get(type) || []) handler(event);
    },
  };
}

(async () => {
  const windowTarget = eventTarget();
  windowTarget.matchMedia = () => ({ matches: false });
  const workerMessages = [];
  const waitingWorker = { postMessage(message) { workerMessages.push(message); } };
  const registrationTarget = eventTarget();
  const registration = { ...registrationTarget, waiting: waitingWorker, installing: null };
  const registrations = [];
  const navigatorTarget = eventTarget();
  navigatorTarget.onLine = true;
  navigatorTarget.serviceWorker = {
    ...navigatorTarget,
    controller: {},
    async register(path) { registrations.push(path); return registration; },
  };
  const states = [];
  const controller = pwa.createPwaController({
    window: windowTarget,
    navigator: navigatorTarget,
    onStateChange(value) { states.push(value); },
  });

  await controller.start();
  assert.deepEqual(registrations, ["/service-worker.js"]);
  assert.equal(controller.state().supported, true);
  assert.equal(controller.state().offlineReady, true);

  navigatorTarget.onLine = false;
  windowTarget.dispatch("offline");
  assert.equal(controller.state().online, false);

  let promptCalls = 0;
  const installEvent = {
    preventDefault() {},
    async prompt() { promptCalls += 1; },
    userChoice: Promise.resolve({ outcome: "accepted" }),
  };
  windowTarget.dispatch("beforeinstallprompt", installEvent);
  assert.equal(controller.state().installAvailable, true);
  await controller.promptInstall();
  assert.equal(promptCalls, 1);
  assert.equal(controller.state().installAvailable, false);

  assert.equal(controller.state().updateReady, true);
  await controller.applyUpdate();
  assert.deepEqual(workerMessages, [{ type: "SKIP_WAITING" }]);
  assert.ok(states.length >= 4);
  console.log("PWA controller tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
