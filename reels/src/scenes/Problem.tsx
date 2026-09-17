import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { Line, Pill } from "../ui";

/* 씬2 · 문제 공감 (약 5.5초) — 단어는 아는데 지문이 안 읽히는 아이 */
export const Problem: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      name="Problem"
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
          gap: 20,
          alignItems: "center",
          marginTop: -40,
        }}
      >
        <Line text="단어는 아는데," size={92} weight={800} />
        <Line text="지문이 안 읽힌다면" size={92} weight={800} delay={Math.round(0.5 * fps)} />
        <div style={{ height: 46 }} />
        <Pill
          text={
            <>
              문제는 암기가 아니라, <span style={{ color: BRAND.burgundy }}>독해력</span>
            </>
          }
          delay={Math.round(1.8 * fps)}
          size={50}
        />
      </div>
    </AbsoluteFill>
  );
};
