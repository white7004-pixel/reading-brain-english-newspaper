// 쪽별 낭독 mp3 — 무료 신경망 목소리(마이크로소프트 엣지 '소리내어 읽기' 목소리)로 만든다.
//   node scripts/make-read-audio-edge.mjs <slug> <목록.json> [목소리] [속도]
//   목록.json: [{ "file": "p04", "text": "Sam and a mat. Pam and a hat." }, ...]  → assets/audio/<slug>/read/p04.mp3
//   목소리 기본 en-US-JennyNeural (아이 목소리 en-US-AnaNeural, 남성 en-US-GuyNeural). 속도 기본 -20% (첫걸음은 천천히).
// 가입·카드·키가 필요 없다. 이미 있는 파일은 건너뛴다. 타입캐스트 크레딧이 없어 2026-09-23 부터 이걸 쓴다.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const [slug, listPath, voice = "en-US-JennyNeural", rate = "-20%"] = process.argv.slice(2);
if (!slug || !listPath) { console.error("쓰는 법: node scripts/make-read-audio-edge.mjs <slug> <목록.json> [목소리] [속도]"); process.exit(1); }

const out = join(ROOT, "assets", "audio", slug, "read");
await mkdir(out, { recursive: true });
const list = JSON.parse(await readFile(listPath, "utf8"));
const tts = new MsEdgeTTS();
await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
let made = 0;
for (const { file, text } of list) {
  const path = join(out, file + ".mp3");
  if (await access(path).then(() => true, () => false)) continue;
  const { audioStream } = tts.toStream(text, { rate });
  const chunks = []; for await (const c of audioStream) chunks.push(c);
  const buf = Buffer.concat(chunks);
  if (buf.length < 2000) throw new Error(`${file}: 소리가 너무 짧다 (${buf.length} bytes)`);
  await writeFile(path, buf); made++;
  console.log(`${file}.mp3  ${(buf.length / 1024).toFixed(0)}KB  ${text.slice(0, 48)}`);
}
console.log(`${slug}: ${made}개 만듦 (${voice}, ${rate}), ${list.length - made}개는 이미 있음`);
