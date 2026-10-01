// 화면에서 읽어 주는 목소리 — 미리 만들기(make-tts.mjs)와 화면 서버의 즉석 만들기(preview-server.mjs /tts)가 같이 쓴다.
//
// 마이크로소프트 엣지의 '소리내어 읽기' 신경망 목소리를 쓴다. **가입·카드·API 키가 없다.**
// 2026-09-23 부터 쪽별 낭독(make-read-audio-edge.mjs)이 이미 이걸 쓰고 있었고,
// 2026-10-01 에 설명·대화 음성까지 여기로 옮겼다 — 타입캐스트는 크레딧이 떨어져 402 를 돌려주고 있었다.
//
// 목소리를 바꾸고 싶으면 환경변수로:
//   RB_VOICE_EN  영어 (기본 en-US-JennyNeural · 다른 것: en-US-AriaNeural, en-US-AvaNeural, en-US-AndrewNeural, 아이 목소리 en-US-AnaNeural)
//   RB_VOICE_KO  한국어 (기본 ko-KR-SunHiNeural · 다른 것: ko-KR-JiMinNeural, ko-KR-InJoonNeural)
//   RB_RATE_EN / RB_RATE_KO  빠르기 (기본 영어 -10%, 한국어 0%)
// 바꾸면 index.json 의 목소리 기록과 달라져 다음 실행 때 그 문장들을 다시 만든다.
//
// 만든 소리는 assets/tts/<sha1>.mp3 에 저장하고 index.json(문장 → 파일)·voices.json(파일 → 목소리)에 적어
// 같은 문장을 두 번 만들지 않는다. 파일 이름이 문장의 sha1 이라 다시 만들어도 제자리를 덮어쓴다.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const ROOT = fileURLToPath(new URL("..", import.meta.url));
export const OUT = join(ROOT, "assets", "tts");

export const VOICE_KO = process.env.RB_VOICE_KO || "ko-KR-SunHiNeural";
export const VOICE_EN = process.env.RB_VOICE_EN || "en-US-JennyNeural";
const RATE_KO = process.env.RB_RATE_KO || "0%";
const RATE_EN = process.env.RB_RATE_EN || "-10%";   // 아이가 따라 읽을 수 있게 영어는 조금 천천히

export const isKo = s => /[가-힣]/.test(s);
export const want = s => isKo(s) ? VOICE_KO : VOICE_EN;
// app.html 의 sayMix 와 똑같이 나눈다 — 나눈 문장이 그대로 열쇠가 된다
export const split = t => String(t || "").replace(/([.!?…])\s+/g, "$1\n").split(/\n+/).map(x => x.trim()).filter(Boolean);
export const nameOf = s => createHash("sha1").update(s).digest("hex").slice(0, 16) + ".mp3";

// 목소리마다 연결을 하나씩 두고 다시 쓴다. 화면 서버는 오래 켜져 있으므로 문장마다 새로 열지 않는다.
const conn = {};
async function engine(voice) {
  if (conn[voice]) return conn[voice];
  const t = new MsEdgeTTS();
  await t.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  conn[voice] = t;
  return t;
}

export async function speak(text, voice = want(text)) {
  const rate = isKo(text) ? RATE_KO : RATE_EN;
  let t = await engine(voice);
  let buf = await pull(t, text, rate);
  if (buf.length < 400) {                       // 연결이 끊겼다 — 한 번만 새로 열고 다시 해 본다
    delete conn[voice];
    t = await engine(voice);
    buf = await pull(t, text, rate);
  }
  if (buf.length < 400) throw new Error(`소리가 너무 짧다 (${buf.length} bytes): ${text.slice(0, 40)}`);
  return buf;
}

async function pull(t, text, rate) {
  const { audioStream } = t.toStream(text, { rate });
  const chunks = [];
  for await (const c of audioStream) chunks.push(c);
  return Buffer.concat(chunks);
}

export async function loadStore() {
  await mkdir(OUT, { recursive: true });
  const read = f => readFile(join(OUT, f), "utf8").then(JSON.parse).catch(() => ({}));
  return { map: await read("index.json"), voices: await read("voices.json"), have: new Set(await readdir(OUT).catch(() => [])) };
}
export const ready = (st, s) => !!(st.map[s] && st.have.has(st.map[s]) && st.voices[st.map[s]] === want(s));

// 한 문장을 만들어 저장한다. 파일 이름을 돌려준다.
// ponytail: index.json 을 통째로 다시 쓴다 — 여러 사람이 동시에 만들면 한쪽 기록이 빠질 수 있다. 서버에 올릴 땐 DB/Storage 로.
export async function make(st, s) {
  const file = nameOf(s);
  await writeFile(join(OUT, file), await speak(s));
  st.map[s] = file; st.voices[file] = want(s); st.have.add(file);
  await writeFile(join(OUT, "index.json"), JSON.stringify(st.map, null, 1));
  await writeFile(join(OUT, "voices.json"), JSON.stringify(st.voices, null, 1));
  return file;
}
