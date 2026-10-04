import React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import "./fonts";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Shift } from "./scenes/Shift";
import { Evidence } from "./scenes/Evidence";
import { Cta } from "./scenes/Cta";

/*
 * 총 900프레임(30초 @30fps).
 * 씬 합계 940 - 전환 4회 × 10프레임 = 900.
 *  훅 75 · 문제 150 · 전환 165 · 증거 330(결과물 5컷) · CTA 220
 *
 * BGM(public/bgm.wav)은 이 타임라인에 맞춰 합성한 오리지널 트랙:
 *  0s 임팩트 → 긴장 → 6.8s 빌드업 → 12.0s 드롭(결과물 5컷에 타격)
 *  → 22.7s 장조 해소(로고) → 엔딩 페이드.
 */
const T = 10;

/** full: 내레이션 + 오리지널 BGM(더킹 믹스) · voiceonly: 내레이션만(인스타 앱에서 유행 음악을 얹는 용도) */
export type ReelsProps = { audio: "full" | "voiceonly" };

export const Reels: React.FC<ReelsProps> = ({ audio }) => {
  useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile(audio === "full" ? "soundtrack.wav" : "voiceonly.wav")} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={75}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={165}>
          <Shift />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={330}>
          <Evidence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={220}>
          <Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
