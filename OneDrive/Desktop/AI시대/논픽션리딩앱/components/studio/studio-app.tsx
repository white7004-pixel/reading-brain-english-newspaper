"use client";

import { useEffect, useState } from "react";
import { StudioDashboard } from "@/components/studio/studio-dashboard";
import { loadStudioState, saveStudioState, type StudioState } from "@/lib/studio-store";

export function StudioApp({ storage }: { storage?: Storage }) {
  const [state, setState] = useState<StudioState | null>(null);

  useEffect(() => {
    const activeStorage = storage ?? window.localStorage;
    const loadedState = loadStudioState(activeStorage);
    saveStudioState(activeStorage, loadedState);
    setState(loadedState);
  }, [storage]);

  if (!state) return <div className="studio-loading" role="status">콘텐츠 스튜디오를 불러오는 중이에요.</div>;

  return <StudioDashboard
    articles={state.articles}
    onCreate={() => {}}
    onOpen={() => {}}
  />;
}
