import React from "react";
import { useVideoConfig } from "remotion";
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
 *  훅 75 · 문제 165 · 전환 180 · 증거 300 · CTA 220
 */
const T = 10;

export const Reels: React.FC = () => {
  useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={165}>
        <Problem />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={180}>
        <Shift />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={300}>
        <Evidence />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={220}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
