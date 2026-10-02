// 아무도 부르지 않게 된 소리를 걷어낸다.
//
//   세어 보기:  node scripts/prune-tts.mjs
//   지우기:     node scripts/prune-tts.mjs --go
//
// 무엇이 죽은 소리인가: 화면(app.html)은 읽을 글을 반드시 sayLines() 로 끊어서 찾는다.
// 그래서 sayLines(문장) 이 그 문장 하나를 그대로 돌려주지 않으면, 화면은 그 문장을 통째로
// 찾을 일이 영원히 없다. 2026-10-02 에 한·영 섞인 문장을 토막으로 끊으면서 514개가 그렇게 됐다.
//
// 배포 파일 수를 줄이려고 지운다 — 버셀 무료 구간은 하루 5,000개까지만 올려 준다.
// 잘못 지워도 `node scripts/make-tts.mjs` 를 다시 돌리면 공짜로 다시 만든다.
import { readFile, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, OUT, split } from "./tts.mjs";

const idx = JSON.parse(await readFile(join(OUT, "index.json"), "utf8"));
let voices = {};
try { voices = JSON.parse(await readFile(join(OUT, "voices.json"), "utf8")); } catch { /* 없어도 된다 */ }

const dead = Object.keys(idx).filter(s => { const p = split(s); return p.length !== 1 || p[0] !== s; });
const keep = new Set(Object.keys(idx).filter(s => !dead.includes(s)).map(s => idx[s]));

console.log(`문장 ${Object.keys(idx).length}개 중 아무도 안 부르는 것 ${dead.length}개`);
dead.slice(0, 5).forEach(s => console.log(`   ${s.slice(0, 70)}  →  ${JSON.stringify(split(s).map(x => x.slice(0, 30)))}`));
if (!dead.length) process.exit(0);
if (!process.argv.includes("--go")){ console.log("지우려면 --go 를 붙이세요."); process.exit(0); }

let gone = 0;
for (const s of dead){
  const f = idx[s];
  delete idx[s];
  if (keep.has(f)) continue;                      // 다른 문장이 같은 파일을 쓰고 있다
  delete voices[f];
  try { await unlink(join(OUT, f)); gone++; } catch { /* 이미 없다 */ }
}
await writeFile(join(OUT, "index.json"), JSON.stringify(idx, null, 1));
await writeFile(join(OUT, "voices.json"), JSON.stringify(voices, null, 1));
console.log(`index.json 에서 ${dead.length}개를 빼고 mp3 ${gone}개를 지웠습니다. 남은 문장 ${Object.keys(idx).length}개`);
