"use client";

import type { ReactNode } from "react";

export type Destination = "home" | "explore" | "learn" | "profile";

const destinations: Array<{ id: Destination; label: string; icon: string }> = [
  { id: "home", label: "홈", icon: "●" },
  { id: "explore", label: "탐험", icon: "◇" },
  { id: "learn", label: "학습", icon: "▤" },
  { id: "profile", label: "나", icon: "○" },
];

export function AppShell({ children, active, onNavigate }: { children: ReactNode; active: Destination; onNavigate: (destination: Destination) => void }) {
  return (
    <div className="app-shell">
      <main className="app-main">{children}</main>
      <nav className="bottom-nav" aria-label="주요 메뉴">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            type="button"
            className={`bottom-nav__item ${active === destination.id ? "is-active" : ""}`}
            aria-label={destination.label}
            aria-current={active === destination.id ? "page" : undefined}
            onClick={() => onNavigate(destination.id)}
          >
            <span aria-hidden="true">{destination.icon}</span>
            <span>{destination.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
