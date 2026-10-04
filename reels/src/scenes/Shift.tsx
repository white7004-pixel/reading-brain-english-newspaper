import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
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

/* 씬3 · 전환 — 리딩브레인 관점: 읽는 힘, 한 줄→한 페이지→한 권 */
export const Shift: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
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
      {/* 실제 교실 사진 — 아주 은은한 배경 */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("photos/p1-crop.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
            scale: interpolate(frame, [0, 165], [1.0, 1.07], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              output: "perceptual-scale",
            }),
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, rgba(20,32,58,0.86) 0%, rgba(27,42,74,0.78) 50%, rgba(20,32,58,0.92) 100%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          marginTop: -50,
          position: "relative",
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
