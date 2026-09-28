// 묶음 하나의 책 목록을 파일로 뽑는다:  node scripts/act-brief.mjs M00
// 질문을 쓰는 사람(서브에이전트)이 이 파일 하나만 읽으면 되도록 요약까지 붙여 준다.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const pre = (process.argv[2] || "").toUpperCase();
if (!/^[A-Z0-9]{3}$/.test(pre)) { console.error("쓰는 법: node scripts/act-brief.mjs <앞세글자>"); process.exit(1); }

const run = async (f, name) => { const g = {}; new Function("window", await readFile(join(ROOT, f), "utf8"))(g); return g[name]; };   // catalog.js·catalog-sum.js 는 window 로 내보낸다
const C = await run("catalog.js", "CATALOG");
const SUM = await run("catalog-sum.js", "CATALOG_SUM");

const rows = [];
for (let i = 0; i < C.books.length; i++) {
  const b = C.books[i];
  if (b[0].slice(0, 3) !== pre) continue;
  rows.push({ no: b[0], title: b[1], series: C.series[b[2]], author: b[3], lexile: b[4], bl: b[5],
              nf: !!b[6], genre: C.genre[b[7]], theme: C.theme[b[8]], award: b[9], sum: SUM[i] || "" });
}
const out = join(ROOT, ".superpowers", "act", pre + ".json");
await mkdir(join(ROOT, ".superpowers", "act"), { recursive: true });
await writeFile(out, JSON.stringify(rows, null, 1));
console.log(`${out}  ${rows.length}권`);
