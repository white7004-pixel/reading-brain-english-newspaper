import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { Line, Pill } from "../ui";

/* 씬4 · 증거 (약 10초) — 아이가 주인공. 실제 수업 장면을 캡션 스티커로 */
export const Evidence: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      name="Evidence"
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
          gap: 30,
          alignItems: "center",
          marginTop: -30,
        }}
      >
        <Line text="리딩브레인 아이들은 매일," size={72} weight={800} />
        <div style={{ height: 20 }} />
        <Pill text="📖 원서를 소리 내어 읽고" delay={Math.round(1.2 * fps)} size={54} />
        <Pill
          text="🤖 AI와 영어로 책 수다를 떨고"
          delay={Math.round(3.0 * fps)}
          size={54}
          bg={BRAND.paper}
        />
        <Pill text="✍️ 영어로 생각을 씁니다" delay={Math.round(4.8 * fps)} size={54} />
        <div style={{ height: 30 }} />
        <Line
          text={
            <>
              읽어낸 만큼, <span style={{ color: BRAND.gold }}>독해력</span>이 됩니다
            </>
          }
          size={62}
          weight={700}
          delay={Math.round(7.0 * fps)}
        />
      </div>
    </AbsoluteFill>
  );
};
