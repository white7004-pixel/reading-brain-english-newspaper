"use client";

import { useState } from "react";
import { AppShell, type Destination } from "@/components/app-shell";

export default function Page() {
  const [active, setActive] = useState<Destination>("home");
  return (
    <AppShell active={active} onNavigate={setActive}>
      <p className="eyebrow">Nonfiction Lab</p>
      <h1 className="brand">논픽션<em>랩.</em></h1>
      <p>매일 3분, 영어로 세상을 읽다</p>
    </AppShell>
  );
}
