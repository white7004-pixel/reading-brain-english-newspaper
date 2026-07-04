"use client";

import { useState } from "react";

export const BRAND_NAVY = "#1b3a5c";
export const BRAND_BURGUNDY = "#8e1f23";

/**
 * 브랜드 로고 — public/logo.png(원본 파일)가 있으면 그대로 사용하고,
 * 없는 경우에만 SVG 재현본으로 대체합니다.
 */
export function BrandLogo({ size = 40 }: { size?: number }) {
  const [useFallback, setUseFallback] = useState(false);
  if (useFallback) return <LogoMark size={size} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="리딩브레인 로고"
      style={{ objectFit: "contain", display: "block" }}
      onError={() => setUseFallback(true)}
    />
  );
}

/**
 * 리딩브레인 엠블럼 — 방패 + 책/펜촉 + 월계수 (SVG 재현)
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="리딩브레인 로고"
    >
      {/* 월계수 */}
      <g fill={BRAND_BURGUNDY}>
        <g>
          <path
            d="M58 158 C40 140 30 112 34 84"
            fill="none"
            stroke={BRAND_BURGUNDY}
            strokeWidth="4"
          />
          {[
            [36, 86, -60], [38, 102, -70], [42, 118, -78],
            [48, 132, -84], [55, 144, -92], [63, 154, -100],
          ].map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx="10" ry="4.5" transform={`rotate(${r} ${x} ${y})`} />
          ))}
        </g>
        <g>
          <path
            d="M142 158 C160 140 170 112 166 84"
            fill="none"
            stroke={BRAND_BURGUNDY}
            strokeWidth="4"
          />
          {[
            [164, 86, 60], [162, 102, 70], [158, 118, 78],
            [152, 132, 84], [145, 144, 92], [137, 154, 100],
          ].map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx="10" ry="4.5" transform={`rotate(${r} ${x} ${y})`} />
          ))}
        </g>
        <path d="M92 166 L100 158 L108 166 L100 174 Z" />
      </g>

      {/* 방패 */}
      <path
        d="M100 10 L160 24 V98 C160 138 134 164 100 182 C66 164 40 138 40 98 V24 Z"
        fill={BRAND_NAVY}
      />
      <path
        d="M100 20 L151 32 V98 C151 133 128 156 100 172 C72 156 49 133 49 98 V32 Z"
        fill="#ffffff"
      />
      <path
        d="M100 28 L144 38 V98 C144 129 124 149 100 163 C76 149 56 129 56 98 V38 Z"
        fill="none"
        stroke={BRAND_NAVY}
        strokeWidth="3"
      />

      {/* 상단 아치 텍스트 */}
      <path id="rb-arc" d="M64 58 C82 46 118 46 136 58" fill="none" />
      <text
        fontSize="12.5"
        fontWeight="700"
        fill={BRAND_NAVY}
        letterSpacing="1.5"
        fontFamily="Arial, sans-serif"
      >
        <textPath href="#rb-arc" startOffset="50%" textAnchor="middle">
          READING BRAIN
        </textPath>
      </text>

      {/* 책 + 펜촉 */}
      <g fill={BRAND_BURGUNDY}>
        <path d="M95 68 C84 60 70 62 63 68 L63 122 C72 115 85 117 95 128 Z" />
        <path d="M105 68 C116 60 130 62 137 68 L137 122 C128 115 115 117 105 128 Z" />
        <path d="M100 88 L88 116 C88 132 94 142 100 150 C106 142 112 132 112 116 Z" />
      </g>
      <circle cx="100" cy="118" r="5" fill="#ffffff" />
      <rect x="98.6" y="122" width="2.8" height="24" fill="#ffffff" />
    </svg>
  );
}
