// 화면에서 읽는 문장을 mp3 로 미리 만들어 둔다 — 마이크로소프트 엣지의 무료 신경망 목소리.
//
//   무엇을 만들지만 세어 보기:  node scripts/make-tts.mjs --dry
//   만들기:                    node scripts/make-tts.mjs
//   몇 개만 만들어 보기:        node scripts/make-tts.mjs --limit 20
//
// 가입·카드·키가 없다. 목소리·빠르기를 바꾸는 법은 scripts/tts.mjs 머리말에 있다.
// 결과는 assets/tts/*.mp3 + index.json. app.html 은 index.json 에 있는 문장이면 그 mp3 를 틀고,
// 없으면 화면 서버(/tts)에 즉석으로 만들어 달라고 하고, 그것도 안 되면 브라우저 목소리로 읽는다.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createRequire } from "node:module";
import { ROOT, split, loadStore, ready, make, VOICE_EN, VOICE_KO } from "./tts.mjs";
const { lines: talkLines } = createRequire(import.meta.url)("../talk-local.js");

async function books(){
  const win = {};
  new Function("window", await readFile(join(ROOT, "books", "index.js"), "utf8"))(win);
  const out = [];
  for (const slug of win.BOOKS || []){
    const w = {};
    new Function("window", await readFile(join(ROOT, "books", slug + ".js"), "utf8"))(w);
    if (w.BOOK) out.push(w.BOOK);
  }
  return out;
}

// 화면에서 읽어 주는 문장을 모은다
async function lines(){
  const set = new Set();
  const add = t => split(t).forEach(s => set.add(s));

  // 고정 안내
  [ "설명을 다 들었어요. 확인 퀴즈를 풀어 볼까요?", "다 맞혔어요! 책을 정말 잘 읽었어요.",
    "다 맞혔어요! 정말 잘했어요.", "아직 헷갈리는 게 있어요. 설명을 한 번 더 들어 봐요.",
    "Correct!", "Not quite." ].forEach(add);
  for (let i = 1; i <= 12; i++) add(`Question ${i}.`);

  for (const b of await books()){
    talkLines(b).forEach(add);                   // AI 북토크 연습 모드가 읽는 문장
    for (const q of b.quiz || []){
      add(q.q);
      (q.a || []).forEach(add);
      // app.html speakOne / drawFix 가 읽는 모양 그대로
      add(`The answer is ${"ABCD"[q.c]}, ${q.a[q.c]}.`);
      add(`The answer is ${q.a[q.c]}.`);
      add(q.why_ko); add(q.why);
    }
  }
  return [...set].filter(s => s.length <= 2000);
}

const args = process.argv.slice(2);
const limit = args.includes("--limit") ? +args[args.indexOf("--limit") + 1] || 0 : 0;

const st = await loadStore();
let todo = (await lines()).filter(s => !ready(st, s));   // 없거나 목소리가 바뀐 문장만
const chars = todo.reduce((n, s) => n + s.length, 0);

console.log(`목소리: 영어 ${VOICE_EN} · 한국어 ${VOICE_KO}`);
console.log(`새로 만들 것 ${todo.length}개 · ${chars}글자 (무료)`);
if (args.includes("--dry") || !todo.length) process.exit(0);
if (limit) todo = todo.slice(0, limit);

let n = 0, failed = 0;
for (const s of todo){
  try {
    const file = await make(st, s);
    console.log(`(${++n}/${todo.length}) ${file}  ${s.slice(0, 40)}`);
  } catch (e) {
    failed++;
    console.log(`(${++n}/${todo.length}) !! 실패 — ${e.message.slice(0, 90)}`);
  }
}
console.log(`끝났습니다. assets/tts/ 에 들어 있습니다.${failed ? `  못 만든 것 ${failed}개 — 다시 돌리면 그것만 다시 해 봅니다.` : ""}`);
process.exit(0);
