"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        const announceWaitingUpdate = () => window.dispatchEvent(new CustomEvent("nonfiction-lab:update-ready"));
        if (registration.waiting) announceWaitingUpdate();
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) announceWaitingUpdate();
          });
        });
      }).catch(() => undefined);
    }
  }, []);
  return null;
}
