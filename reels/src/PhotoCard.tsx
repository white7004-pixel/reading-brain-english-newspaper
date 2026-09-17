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
import { BRAND } from "./brand";
import { FONT } from "./fonts";

/*
 * 실제 수업 사진 한 장을 풀블리드로 깔고, 위에 네이비 틴트 + 하단 그라데이션,
 * 그 위에 인스타 스티커 캡션을 얹는 카드.
 * 사진은 켄번즈(느린 확대)로 살아 있게.
 */
export const PhotoCard: React.FC<{
  src: string;
  caption: React.ReactNode;
  index: number;
  total: number;
  /** 켄번즈 방향 */
  zoomIn?: boolean;
}> = ({ src, caption, index, total, zoomIn = true }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = interpolate(
    frame,
    [0, durationInFrames],
    zoomIn ? [1.0, 1.09] : [1.09, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.33, 0, 0.67, 1),
      output: "perceptual-scale",
    },
  );

  return (
    <AbsoluteFill name="PhotoCard">
      {/* 사진 — 켄번즈 */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale,
          }}
        />
      </AbsoluteFill>

      {/* 브랜드 톤 유지용 네이비 틴트 */}
      <AbsoluteFill style={{ backgroundColor: BRAND.navy, opacity: 0.34 }} />

      {/* 하단 그라데이션 — 캡션 가독성 */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, rgba(27,42,74,0) 44%, rgba(20,32,58,0.82) 68%, rgba(20,32,58,0.97) 100%)`,
        }}
      />

      {/* 상단 진행 인디케이터 (안전영역 아래) */}
      <Interactive.Div
        name="Progress"
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 14,
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 54 : 26,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === index ? BRAND.gold : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </Interactive.Div>

      {/* 캡션 스티커 — 하단 안전영역(320px) 위쪽 */}
      <Interactive.Div
        name="PhotoCaption"
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 400,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.34,
            color: BRAND.navy,
            backgroundColor: BRAND.white,
            padding: "20px 42px",
            borderRadius: 24,
            textAlign: "center",
            opacity: interpolate(frame, [4, 4 + 0.28 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [4, 4 + 0.4 * fps], [0.93, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
              output: "perceptual-scale",
            }),
            translate:
              "0px " +
              interpolate(frame, [4, 4 + 0.4 * fps], [36, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({ damping: 200 }),
              }) +
              "px",
          }}
        >
          {caption}
        </span>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
