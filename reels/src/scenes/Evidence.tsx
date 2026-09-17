import React from "react";
import { AbsoluteFill, Easing, Interactive, Series, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { FONT } from "../fonts";
import { PhotoCard } from "../PhotoCard";

/* 씬 도입부에 한 줄 얹히는 리드 문구 (사진 위) */
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
        fontSize: 70,
        lineHeight: 1.3,
        color: BRAND.white,
        textShadow: "0 4px 24px rgba(15,24,44,0.55)",
        opacity: interpolate(frame, [0, 0.3 * fps, 2.4 * fps, 2.9 * fps], [0, 1, 1, 0], {
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
      리딩브레인 아이들의 하루
    </Interactive.Div>
  );
};

const SHOTS = [
  {
    src: "photos/p3-crop.jpg",
    caption: (
      <>
        스스로 읽고, <span style={{ color: BRAND.burgundy }}>직접 정리합니다</span>
      </>
    ),
    zoomIn: true,
  },
  {
    src: "photos/p1-crop.jpg",
    caption: (
      <>
        AI와 <span style={{ color: BRAND.burgundy }}>영어로 책 수다</span>를 떨고
      </>
    ),
    zoomIn: false,
  },
  {
    src: "photos/p2-crop.jpg",
    caption: (
      <>
        읽은 걸 <span style={{ color: BRAND.burgundy }}>영어로 써냅니다</span>
      </>
    ),
    zoomIn: true,
  },
  {
    src: "photos/p4-crop.jpg",
    caption: (
      <>
        매일 쌓인 이 시간이, <span style={{ color: BRAND.burgundy }}>독해력</span>
      </>
    ),
    zoomIn: false,
  },
];

/* 씬4 · 증거 (300프레임 = 10초) — 실제 수업 사진 4컷. 아이가 주인공. */
export const Evidence: React.FC = () => {
  const { fps } = useVideoConfig();
  const each = 75; // 2.5초씩 4컷

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
            />
            {i === 0 ? <Lead /> : null}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
