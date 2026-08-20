"use client";

import type { ReactNode } from "react";

export type Destination = "today" | "map" | "explore" | "profile" | "learn";

type PersistentDestination = Exclude<Destination, "learn">;
type NavigationIcon = "today" | "map" | "explore" | "profile";

const destinations: Array<{ id: PersistentDestination; label: string; icon: NavigationIcon }> = [
  { id: "today", label: "오늘", icon: "today" },
  { id: "map", label: "지식지도", icon: "map" },
  { id: "explore", label: "탐험", icon: "explore" },
  { id: "profile", label: "나", icon: "profile" },
];

function NavigationIcon({ name }: { name: NavigationIcon }) {
  const paths: Record<NavigationIcon, ReactNode> = {
    today: <><path d="M12 3v4" /><path d="M5.64 5.64l2.83 2.83" /><path d="M3 12h4" /><path d="M5.64 18.36l2.83-2.83" /><path d="M12 17v4" /><path d="M18.36 18.36l-2.83-2.83" /><path d="M17 12h4" /><path d="M18.36 5.64l-2.83 2.83" /><circle cx="12" cy="12" r="3.5" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15" /><path d="M15 6v15" /></>,
    explore: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /><path d="M11 7.5v7" /><path d="M7.5 11h7" /></>,
    profile: <><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21c.9-4 3.4-6 7.5-6s6.6 2 7.5 6" /></>,
  };

  return <svg className="bottom-nav__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function AppShell({ children, active, onNavigate }: { children: ReactNode; active: Destination; onNavigate: (destination: PersistentDestination) => void }) {
  const isFocusedLearning = active === "learn";

  return (
    <div className={`app-shell${isFocusedLearning ? " app-shell--learning" : ""}`}>
      <main className={`app-main${isFocusedLearning ? " app-main--learning" : ""}`}>{children}</main>
      {!isFocusedLearning && (
        <nav className="bottom-nav" aria-label="주요 메뉴">
          {destinations.map((destination) => (
            <button
              key={destination.id}
              type="button"
              className={`bottom-nav__item ${active === destination.id ? "is-active" : ""}`}
              aria-current={active === destination.id ? "page" : undefined}
              onClick={() => onNavigate(destination.id)}
            >
              <NavigationIcon name={destination.icon} />
              <span>{destination.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
