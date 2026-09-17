import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { FONT } from "../fonts";
import { GoldMark, Line } from "../ui";

/* 한 줄 → 한 페이지 → 한 권 진행 단계 */
const Step: React.FC<{ label: string; delay: number; last?: boolean }> = ({ label, delay, last }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  return (
    <Interactive.Div
      name={`Step-${label}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 26,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 72,
        color: last ? BRAND.navy : "rgba(255,255,255,0.92)",
        opacity: interpolate(f, [0, 0.25 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: "0px " + interpolate(f, [0, 0.35 * fps], [30, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
        }) + "px",
      }}
    >
      {last ? (
        <span
          style={{
            backgroundColor: BRAND.gold,
            color: BRAND.navy,
            padding: "10px 38px",
            borderRadius: 18,
          }}
        >
          {label}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </Interactive.Div>
  );
};

const Arrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Arrow"
      style={{
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 54,
        color: BRAND.goldSoft,
        opacity: interpolate(frame, [delay, delay + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      ↓
    </Interactive.Div>
  );
};

/* 씬3 · 전환 (약 6초) — 리딩브레인 관점: 읽는 힘, 한 줄→한 페이지→한 권 */
export const Shift: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      name="Shift"
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
          gap: 16,
          alignItems: "center",
          marginTop: -50,
        }}
      >
        <Line
          text={
            <>
              리딩브레인은 <GoldMark delay={16} color={BRAND.white}>읽는 힘</GoldMark>부터
            </>
          }
          size={84}
          weight={800}
        />
        <Line text="키웁니다" size={84} weight={800} delay={Math.round(0.4 * fps)} />
        <div style={{ height: 52 }} />
        <Step label="한 줄" delay={Math.round(1.6 * fps)} />
        <Arrow delay={Math.round(2.2 * fps)} />
        <Step label="한 페이지" delay={Math.round(2.6 * fps)} />
        <Arrow delay={Math.round(3.2 * fps)} />
        <Step label="한 권" delay={Math.round(3.6 * fps)} last />
      </div>
    </AbsoluteFill>
  );
};
