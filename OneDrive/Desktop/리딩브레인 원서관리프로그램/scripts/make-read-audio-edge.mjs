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
// wordBoundary: 낱말마다 언제 소리 나는지 함께 받는다 → <file>.words.json. 형광펜이 이 시각을 따라간다.
// 받아쓰기(whisper)로 짐작하지 않으니 "Sam and a mat" 을 "salmon amat" 으로 잘못 듣는 일이 없다.
await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, { wordBoundaryEnabled: true });
let made = 0;
for (const { file, text } of list) {
  const path = join(out, file + ".mp3");
  if (await access(path).then(() => true, () => false)) continue;
  const { audioStream, metadataStream } = tts.toStream(text, { rate });
  // 낱말에는 마침표가 붙어 오지 않는다. 원문을 따라가며 문장 번호를 매긴다 — 화면에서 문장 전체에 연한 형광펜을 칠할 때 쓴다.
  const words = [];
  let pos = 0, sent = 0;
  if (metadataStream) metadataStream.on("data", d => {
    for (const m of JSON.parse(d.toString()).Metadata || []) {
      if (m.Type !== "WordBoundary") continue;
      const w = m.Data.text.Text;
      const t0 = m.Data.Offset / 1e7, t1 = t0 + m.Data.Duration / 1e7;   // 100나노초 단위 → 초
      words.push([w, +t0.toFixed(3), +t1.toFixed(3), sent]);
      const at = text.indexOf(w, pos);
      if (at >= 0) {
        pos = at + w.length;
        if (/^\s*['"”’]?\s*[.!?]/.test(text.slice(pos))) sent++;
      }
    }
  });
  const chunks = []; for await (const c of audioStream) chunks.push(c);
  await new Promise(r => setTimeout(r, 300));                            // 남은 낱말 정보를 기다린다
  const buf = Buffer.concat(chunks);
  if (buf.length < 2000) throw new Error(`${file}: 소리가 너무 짧다 (${buf.length} bytes)`);
  await writeFile(path, buf);
  await writeFile(join(out, file + ".words.json"), JSON.stringify(words));
  made++;
  console.log(`${file}.mp3  ${(buf.length / 1024).toFixed(0)}KB  낱말 ${words.length}개  ${text.slice(0, 40)}`);
}
console.log(`${slug}: ${made}개 만듦 (${voice}, ${rate}), ${list.length - made}개는 이미 있음`);
