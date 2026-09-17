import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "./brand";
import { FONT } from "./fonts";

/* 한 줄이 아래에서 올라오며 나타나는 기본 카피 라인 */
export const Line: React.FC<{
  text: React.ReactNode;
  delay?: number;
  size?: number;
  weight?: number;
  color?: string;
  fadeFrames?: number;
}> = ({ text, delay = 0, size = 84, weight = 700, color = BRAND.white, fadeFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const fadeIn = fadeFrames ?? 0.3 * fps;

  return (
    <Interactive.Div
      name="Line"
      style={{
        fontFamily: FONT,
        fontWeight: weight,
        fontSize: size,
        color,
        lineHeight: 1.28,
        textAlign: "center",
        opacity: interpolate(f, [0, fadeIn], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: "0px " + interpolate(f, [0, 0.4 * fps], [40, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }) + "px",
      }}
    >
      {text}
    </Interactive.Div>
  );
};

/* 인스타 텍스트 스티커 스타일 캡션 필 (라운드 배경 박스) */
export const Pill: React.FC<{
  text: React.ReactNode;
  delay?: number;
  size?: number;
  bg?: string;
  color?: string;
}> = ({ text, delay = 0, size = 52, bg = BRAND.white, color = BRAND.navy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;

  return (
    <Interactive.Div
      name="Pill"
      style={{
        display: "inline-block",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        color,
        backgroundColor: bg,
        padding: "18px 44px",
        borderRadius: 22,
        lineHeight: 1.3,
        boxDecorationBreak: "clone",
        opacity: interpolate(f, [0, 0.25 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(f, [0, 0.35 * fps], [0.92, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
          output: "perceptual-scale",
        }),
        translate: "0px " + interpolate(f, [0, 0.35 * fps], [34, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }) + "px",
      }}
    >
      {text}
    </Interactive.Div>
  );
};

/* gold 밑줄 박스 키워드 강조 — delay 이후 scaleX로 펼쳐짐 */
export const GoldMark: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
}> = ({ children, delay = 10, color }) => {
  const frame = useCurrentFrame();
  return (
    <span style={{ position: "relative", whiteSpace: "nowrap", color: color }}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <Interactive.Div
        name="GoldMark"
        style={{
          position: "absolute",
          left: -6,
          right: -6,
          bottom: 4,
          height: "0.42em",
          backgroundColor: BRAND.gold,
          zIndex: 0,
          transformOrigin: "left center",
          scale:
            interpolate(frame, [delay, delay + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }) + " 1",
        }}
      />
    </span>
  );
};

/* 좌상단 브랜드 눈썹 라벨 (안전영역 아래 배치) */
export const Eyebrow: React.FC<{ text?: string }> = ({ text = "리딩브레인 영어학원" }) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Eyebrow"
      style={{
        position: "absolute",
        top: 250,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 34,
        letterSpacing: "0.22em",
        color: BRAND.goldSoft,
        opacity: interpolate(frame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};
