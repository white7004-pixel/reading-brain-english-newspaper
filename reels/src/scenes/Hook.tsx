import React from "react";
import { AbsoluteFill } from "remotion";
import { BRAND } from "../brand";
import { Eyebrow, GoldMark, Line } from "../ui";

/* 씬1 · 훅 (0~2.5초) — 학부모의 고민을 질문 한 방으로. 첫 프레임부터 읽혀야 함 */
export const Hook: React.FC = () => {
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
      <Eyebrow />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: -60 }}>
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
