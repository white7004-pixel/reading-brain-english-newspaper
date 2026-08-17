import type { ReactNode } from "react";

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "lime" }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}
