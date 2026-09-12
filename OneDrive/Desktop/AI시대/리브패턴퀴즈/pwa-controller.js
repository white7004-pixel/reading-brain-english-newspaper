(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainPwa = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function createPwaController(env = {}) {
    const windowObject = env.window;
    const navigatorObject = env.navigator;
    const onStateChange = typeof env.onStateChange === "function" ? env.onStateChange : () => {};
    let installPrompt = null;
    let registration = null;
    let applyingUpdate = false;
    let current = {
      supported: Boolean(navigatorObject?.serviceWorker),
      installAvailable: false,
      installed: Boolean(windowObject?.matchMedia?.("(display-mode: standalone)")?.matches),
      online: navigatorObject?.onLine !== false,
      offlineReady: Boolean(navigatorObject?.serviceWorker?.controller),
      updateReady: false,
      syncing: false,
    };

    function emit(patch = {}) {
      current = { ...current, ...patch };
      onStateChange({ ...current });
    }

    function watchInstalling(worker) {
      worker?.addEventListener?.("statechange", () => {
        if (worker.state === "installed" && navigatorObject.serviceWorker.controller) {
          emit({ updateReady: true });
        }
      });
    }

    async function start() {
      windowObject?.addEventListener?.("online", () => emit({ online: true }));
      windowObject?.addEventListener?.("offline", () => emit({ online: false }));
      windowObject?.addEventListener?.("beforeinstallprompt", (event) => {
        event.preventDefault?.();
        installPrompt = event;
        emit({ installAvailable: true });
      });
      windowObject?.addEventListener?.("appinstalled", () => {
        installPrompt = null;
        emit({ installed: true, installAvailable: false });
      });

      if (!current.supported) {
        emit();
        return null;
      }

      registration = await navigatorObject.serviceWorker.register("/service-worker.js");
      emit({
        offlineReady: Boolean(navigatorObject.serviceWorker.controller),
        updateReady: Boolean(registration.waiting),
      });
      registration.addEventListener?.("updatefound", () => watchInstalling(registration.installing));
      navigatorObject.serviceWorker.addEventListener?.("controllerchange", () => {
        emit({ offlineReady: true, updateReady: false });
        if (applyingUpdate) windowObject.location?.reload?.();
      });
      return registration;
    }

    async function promptInstall() {
      if (!installPrompt) return false;
      const prompt = installPrompt;
      await prompt.prompt();
      const choice = await prompt.userChoice;
      installPrompt = null;
      emit({ installAvailable: false, installed: choice?.outcome === "accepted" || current.installed });
      return choice?.outcome === "accepted";
    }

    async function applyUpdate() {
      if (!registration?.waiting) return false;
      applyingUpdate = true;
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      return true;
    }

    function state() {
      return { ...current };
    }

    return { start, promptInstall, applyUpdate, state };
  }

  return { createPwaController };
});
