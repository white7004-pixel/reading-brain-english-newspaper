// 타입캐스트 음성 — 미리 만들기(tts-typecast.mjs)와 화면 서버의 즉석 만들기(preview-server.mjs /tts)가 같이 쓴다.
// 키는 서버 쪽에서만 읽는다: 환경변수 TYPECAST_API_KEY, 없으면 ~/typecast-audio/key.txt. 브라우저로는 절대 보내지 않는다.
// 만든 소리는 assets/tts/<sha1>.mp3 에 저장하고 index.json(문장 → 파일)·voices.json(파일 → 목소리)에 적어
// 같은 문장에 크레딧을 두 번 쓰지 않는다.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

export const ROOT = fileURLToPath(new URL("..", import.meta.url));
export const OUT = join(ROOT, "assets", "tts");
const API = "https://api.typecast.ai";
export const KEY = process.env.TYPECAST_API_KEY
  || (await readFile(join(homedir(), "typecast-audio", "key.txt"), "utf8").catch(() => "")).trim();
// 원장님이 고른 목소리 (2026-09-16): 한국어 Eunkyung, 영어 Kristen — 환경변수로 바꿀 수 있다
export const VOICE_KO = process.env.TYPECAST_VOICE_KO || "tc_6a7446c19f2d7dfed990a900";
export const VOICE_EN = process.env.TYPECAST_VOICE_EN || "tc_662a15c1e31aab9a774b3b31";

export const isKo = s => /[가-힣]/.test(s);
export const want = s => isKo(s) ? VOICE_KO : VOICE_EN;
// app.html 의 sayMix 와 똑같이 나눈다 — 나눈 문장이 그대로 열쇠가 된다
export const split = t => String(t || "").replace(/([.!?…])\s+/g, "$1\n").split(/\n+/).map(x => x.trim()).filter(Boolean);
export const nameOf = s => createHash("sha1").update(s).digest("hex").slice(0, 16) + ".mp3";

export async function speak(text, voice = want(text)) {
  const r = await fetch(API + "/v1/text-to-speech", {
    method: "POST",
    headers: { "X-API-KEY": KEY, "content-type": "application/json" },
    body: JSON.stringify({ voice_id: voice, text, model: "ssfm-v30",
      prompt: { emotion_preset: "tonedown" },   // 차분한 톤 — 샘플로 들어 보고 고른 설정
      output: { audio_format: "mp3", audio_tempo: isKo(text) ? 0.98 : 0.92 } })
  });
  if (!r.ok) throw Object.assign(new Error(`타입캐스트 오류 ${r.status}: ${(await r.text()).slice(0, 200)}`), { status: r.status });
  return Buffer.from(await r.arrayBuffer());
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
