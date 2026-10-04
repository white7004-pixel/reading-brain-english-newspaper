import React from "react";
import { AbsoluteFill, Easing, Interactive, Series, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { FONT } from "../fonts";
import { PhotoCard } from "../PhotoCard";

/* 씬 도입부에 한 줄 얹히는 리드 문구 (결과물 위) */
const Lead: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="EvidenceLead"
      style={{
        position: "absolute",
        top: 330,
        left: 90,
        right: 90,
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 68,
        lineHeight: 1.3,
        color: BRAND.white,
        textShadow: "0 4px 24px rgba(15,24,44,0.75)",
        opacity: interpolate(frame, [0, 0.3 * fps, 1.7 * fps, 2.1 * fps], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate:
          "0px " +
          interpolate(frame, [0, 0.4 * fps], [26, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
          }) +
          "px",
      }}
    >
      우리 아이가 남긴 것
    </Interactive.Div>
  );
};

/* 실제 학생 결과물 5컷 — 읽기 → 근거 찾기 → 문장 훈련 → 글 구성 → 완성 */
const SHOTS = [
  {
    src: "work/w1-crop.jpg",
    caption: (
      <>
        읽고, <span style={{ color: BRAND.burgundy }}>이해를 확인하고</span>
      </>
    ),
    zoomIn: true,
  },
  {
    src: "work/w4-crop.jpg",
    caption: (
      <>
        <span style={{ color: BRAND.burgundy }}>책에서 근거</span>를 찾고
      </>
    ),
    zoomIn: false,
  },
  {
    src: "work/w5-crop.jpg",
    caption: (
      <>
        문장은 <span style={{ color: BRAND.burgundy }}>직접</span> 만들고
      </>
    ),
    zoomIn: true,
  },
  {
    src: "work/w2-crop.jpg",
    caption: (
      <>
        <span style={{ color: BRAND.burgundy }}>글 한 편</span>을 씁니다
      </>
    ),
    zoomIn: false,
  },
  {
    src: "work/w3-crop.jpg",
    caption: (
      <>
        리딩브레인의 <span style={{ color: BRAND.burgundy }}>에세이 쓰기</span>
      </>
    ),
    zoomIn: true,
  },
];

/* 씬4 · 증거 (330프레임 = 11초) — 실제 결과물 5컷. 아이가 주인공. */
export const Evidence: React.FC = () => {
  const { fps } = useVideoConfig();
  const each = 66; // 2.2초씩 5컷

  return (
    <AbsoluteFill name="Evidence" style={{ backgroundColor: BRAND.navy }}>
      <Series>
        {SHOTS.map((shot, i) => (
          <Series.Sequence key={shot.src} durationInFrames={each} premountFor={1 * fps}>
            <PhotoCard
              src={shot.src}
              caption={shot.caption}
              index={i}
              total={SHOTS.length}
              zoomIn={shot.zoomIn}
              tint={0.17}
            />
            {i === 0 ? <Lead /> : null}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
