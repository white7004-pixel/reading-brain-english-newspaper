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
/* ★ 아래 세 함수는 scripts/tts.mjs 와 app.html 에 **똑같이** 들어 있다.
   미리 만들 때 끊은 자리와 화면이 찾을 때 끊는 자리가 다르면 만들어 둔 소리를 못 찾는다.
   한쪽만 고치지 않는다. 고쳤으면 `node scripts/make-tts.mjs --dry` 로 새로 만들 것이 몇 개인지 본다.
   뒤돌아보기(lookbehind) 정규식은 쓰지 않는다 — 옛 사파리·카톡 브라우저가 화면째 멈춘다. */

/* 문장 끊기. 마침표 뒤에 닫는 따옴표가 와도 거기까지 한 문장으로 본다 —
   2026-10-02 전에는 화면이 닫는 따옴표 하나만 남게 끊어서 미리 만든 소리 402개를 못 찾고 있었다. */
const saySents = t => String(t || "")
  .replace(/([.!?\u2026]+["'\u2019\u201D\u00BB)\]]*)\s+/g, "$1\n")
  .split(/\n+/).map(x => x.trim()).filter(Boolean);

/* 한 문장을 '말이 같은 토막' 으로 끊는다 — 토막마다 그 말의 목소리로 읽히게.
   영어가 두 낱말 이상 이어질 때만 끊는다. 이름 하나쯤 섞인 것은 한국어 목소리로 읽어도 자연스럽다
   ("정답은 Buzz." 는 "버즈" 가 맞다). 세 토막까지만 끊는다 — 더 부서지면 토막 사이가 끊겨 들리고
   조사 하나만 남은 토막("...와...")은 더 이상하다. */
function sayParts(text){
  const s = String(text || "").trim();
  if (!s) return [];
  if (!/[가-힣]/.test(s) || !/[A-Za-z]{2}/.test(s)) return [s];     // 한 가지 말이면 그대로
  const g = [];                                                     // [{ ko, w:[낱말] }]
  for (const w of s.replace(/\(([^()가-힣]+)\)/g, " ($1) ").split(/\s+/)){   // 괄호 안이 영어뿐이면 띄운다
    if (!w) continue;
    const ko = /[가-힣]/.test(w);
    const en = !ko && /[A-Za-z]/.test(w);
    const last = g.length ? g[g.length - 1] : null;
    if (!ko && !en && last){ last.w.push(w); continue; }             // 숫자·기호는 앞 토막에 붙인다
    if (last && last.ko === ko) last.w.push(w); else g.push({ ko: ko, w: [w] });
  }
  for (let i = 0; i < g.length; i++){                               // 영어가 한 낱말뿐인 토막은 끊지 않는다
    if (g[i].ko || g[i].w.length > 1) continue;
    const to = i > 0 ? g[i - 1] : g[1];
    if (!to) continue;
    to.w = i > 0 ? to.w.concat(g[i].w) : g[i].w.concat(to.w);
    g.splice(i, 1); i--;
  }
  for (let i = 1; i < g.length; i++){                               // 붙이고 나서 같은 말이 나란히 놓이면 이어 준다
    if (g[i].ko !== g[i - 1].ko) continue;
    g[i - 1].w = g[i - 1].w.concat(g[i].w); g.splice(i, 1); i--;
  }
  if (g.length < 2 || g.length > 3) return [s];
  const out = g.map(x => x.w.join(" "));
  // 괄호를 띄우다가 토막 안에 '마침표 + 빈칸' 이 생기면 화면이 또 끊어 못 찾는다 — 그런 문장은 그냥 둔다
  for (const x of out) if (saySents(x).length > 1) return [s];
  return out;
}

/* 읽어 줄 차례대로 — 문장으로 끊고, 섞인 문장은 토막으로 또 끊는다 */
function sayLines(t){
  const out = [];
  for (const s of saySents(t)) for (const p of sayParts(s)) out.push(p);
  return out;
}

// 나눈 토막이 그대로 열쇠(파일 이름)가 된다
export const split = sayLines;
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
