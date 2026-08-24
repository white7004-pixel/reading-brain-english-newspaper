import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { SAMPLE_ARTICLES } from "../lib/sample-content";

const outputDirectory = resolve(process.cwd(), "public/audio/native");
await mkdir(outputDirectory, { recursive: true });

for (const article of SAMPLE_ARTICLES) {
  for (const [pageIndex, text] of article.pages.entries()) {
    const outputPath = resolve(outputDirectory, `${article.id}-page-${pageIndex + 1}.mp3`);
    const timingPath = resolve(outputDirectory, `${article.id}-page-${pageIndex + 1}.json`);
    await new Promise<void>((accept, reject) => {
      const child = spawn("python", [
        resolve(process.cwd(), "scripts/generate_native_audio.py"),
        text,
        outputPath,
        timingPath,
      ], { stdio: "inherit" });
      child.once("error", reject);
      child.once("exit", (code) => code === 0 ? accept() : reject(new Error(`edge-tts exited with ${code}`)));
    });
  }
}
