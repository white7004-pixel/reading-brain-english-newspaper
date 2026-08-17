import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "논픽션랩: 3분 배경지식 영어",
    short_name: "논픽션랩",
    description: "매일 3분, 영어로 세상을 읽다",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f5ef",
    theme_color: "#173f34",
    lang: "ko",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
