import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

[
  { file: "Pretendard-Medium.woff2", weight: "500" },
  { file: "Pretendard-SemiBold.woff2", weight: "600" },
  { file: "Pretendard-Bold.woff2", weight: "700" },
  { file: "Pretendard-ExtraBold.woff2", weight: "800" },
].forEach(({ file, weight }) => {
  loadFont({
    family: "Pretendard",
    url: staticFile(`fonts/${file}`),
    weight,
  });
});

export const FONT = "Pretendard";
