import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { FONT } from "../fonts";
import { Pill } from "../ui";

/* 씬5 · CTA (약 6초) — gold 링 엠블럼 + 워드마크 + 슬로건 + 행동 한 줄 */
export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Cta"
      style={{
        backgroundColor: BRAND.navy,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 90px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          alignItems: "center",
          marginTop: -60,
        }}
      >
        {/* gold 링 엠블럼 — 살짝 커지며 등장, 1초 안에 정지 */}
        <Interactive.Div
          name="Ring"
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: `3px solid ${BRAND.gold}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [0, 0.9 * fps], [0.86, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
              output: "perceptual-scale",
            }),
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 74,
              color: BRAND.white,
              letterSpacing: "0.02em",
            }}
          >
            RB
          </span>
        </Interactive.Div>

        <Interactive.Div
          name="Wordmark"
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 84,
            color: BRAND.white,
            letterSpacing: "0.1em",
            opacity: interpolate(frame, [0.5 * fps, 0.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: "0px " + interpolate(frame, [0.5 * fps, 0.9 * fps], [26, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
            }) + "px",
          }}
        >
          READING BRAIN
        </Interactive.Div>

        <Interactive.Div
          name="Slogan"
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 44,
            color: BRAND.goldSoft,
            letterSpacing: "0.06em",
            opacity: interpolate(frame, [1.0 * fps, 1.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {BRAND.slogan}
        </Interactive.Div>

        <div style={{ height: 34 }} />
        <Pill
          text="프로필 링크에서 레벨 테스트 신청"
          delay={Math.round(1.8 * fps)}
          size={48}
          bg={BRAND.gold}
          color={BRAND.navy}
        />
      </div>
    </AbsoluteFill>
  );
};
