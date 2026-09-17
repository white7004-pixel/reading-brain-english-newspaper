import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BRAND } from "../brand";
import { Eyebrow, GoldMark, Line } from "../ui";

/* 씬1 · 훅 (0~2.5초) — 학부모의 고민을 질문 한 방으로. 첫 프레임부터 읽혀야 함 */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Hook"
      style={{
        backgroundColor: BRAND.navy,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 90px",
      }}
    >
      {/* 실제 수업 사진 — 아주 은은한 배경으로 깔아 '진짜 교실'을 먼저 느끼게 */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("photos/p4-crop.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.26,
            scale: interpolate(frame, [0, 75], [1.0, 1.06], {
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
          background: `linear-gradient(to bottom, rgba(20,32,58,0.82) 0%, rgba(27,42,74,0.72) 50%, rgba(20,32,58,0.9) 100%)`,
        }}
      />

      <Eyebrow />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginTop: -60,
          position: "relative",
        }}
      >
        <Line text="영어학원 3년," size={112} weight={800} fadeFrames={5} />
        <Line
          text={
            <>
              아직도 <GoldMark delay={14} color={BRAND.white}>단어만</GoldMark>
            </>
          }
          size={112}
          weight={800}
          delay={5}
          fadeFrames={5}
        />
        <Line text="외우나요?" size={112} weight={800} delay={10} fadeFrames={5} />
      </div>
    </AbsoluteFill>
  );
};
