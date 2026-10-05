/* 문법 만화 에피소드 스펙 — audio/episode.py 가 만든 timeline.json 의 형태.
 * 학원별로 바꾸는 것: academy(이름·로고·CTA·색), cast(이름·색·목소리), art(컷 이미지), beats(대사) */
export type Cast = { name: string; voice: string; speed?: number; color?: string };

export type Line = {
  who: string;
  text: string; // *단어* 로 강조
  start: number; // 초 (영상 전체 기준)
  dur: number;
  focus?: [number, number]; // 컷 이미지에서 확대할 지점(0~1)
  lang?: string;
};

type Base = { start: number; end: number; lines: Line[] };

export type Beat =
  | (Base & { type: "hook"; title: string; diary: string[]; art: string })
  | (Base & { type: "panel"; art: string })
  | (Base & { type: "swap"; stamp: string; pairs: [string, string, string][] })
  | (Base & { type: "quiz"; label: string; sentence: string; hint: string })
  | (Base & { type: "cta" });

export type Timeline = {
  id: string;
  fps: number;
  frames: number;
  duration: number;
  academy: { name: string; logo: string; cta: string; colors: { bg: string; accent: string; paper: string } };
  series: string;
  episode: string;
  topic: string;
  cast: Record<string, Cast>;
  beats: Beat[];
};

export type ComicProps = { timeline: Timeline; audio: "full" | "voiceonly" };
