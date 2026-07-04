import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "리딩브레인 콘텐츠 스튜디오 | AI 영자신문·콘텐츠 생성",
  description:
    "리딩브레인 영어학원 AI 콘텐츠 스튜디오 — 영자신문, 네이버 블로그, SNS, 소식지, 상담 문자를 AI로 자동 생성합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
