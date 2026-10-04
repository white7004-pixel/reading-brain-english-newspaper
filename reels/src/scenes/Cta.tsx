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
import { Pill } from "../ui";

/* 씬5 · CTA (220프레임 ≈ 7.3초) — 실제 학원 로고 + 한글 학원명 + 행동 한 줄 */
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
          gap: 40,
          alignItems: "center",
          marginTop: -70,
        }}
      >
        {/* 실제 로고 — 흰 카드가 길게 올라오며 정착 */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <Interactive.Div
            name="LogoCard"
            style={{
              backgroundColor: BRAND.white,
              borderRadius: 32,
              padding: "44px 56px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              scale: interpolate(frame, [0, 0.85 * fps], [0.88, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({ damping: 200 }),
                output: "perceptual-scale",
              }),
              translate:
                "0px " +
                interpolate(frame, [0, 0.85 * fps], [30, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({ damping: 200 }),
                }) +
                "px",
            }}
          >
            <Img src={staticFile("logo.png")} style={{ width: 470, height: "auto" }} />
          </Interactive.Div>
        </div>

        <Interactive.Div
          name="KoreanName"
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 66,
            color: BRAND.white,
            letterSpacing: "0.02em",
            opacity: interpolate(frame, [0.9 * fps, 1.25 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate:
              "0px " +
              interpolate(frame, [0.9 * fps, 1.3 * fps], [24, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({ damping: 200 }),
              }) +
              "px",
          }}
        >
          리딩브레인 영어학원
        </Interactive.Div>

        <Pill
          text="프로필 링크에서 레벨 테스트 신청"
          delay={Math.round(1.9 * fps)}
          size={48}
          bg={BRAND.gold}
          color={BRAND.navy}
        />
      </div>
    </AbsoluteFill>
  );
};
