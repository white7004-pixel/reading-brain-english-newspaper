// 옛 브라우저(카카오톡 안 브라우저)에서 멎는 문법이 들어왔는지 본다:  node scripts/check-syntax.mjs
// ?. ?? (?<  이 셋이 화면 전체를 멎게 한 적이 있다. 주석과 글자열 안까지는 가리지 않는다 — 걸리면 사람이 본다.
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SKIP = new Set(["node_modules", ".git", "out", "assets", "assets-orig", "docs", ".superpowers", "supabase"]);
const BAD = [[/\?\./g, "?."], [/\?\?/g, "??"], [/\(\?</g, "(?<"]];

const walk = async d => {
  const out = [];
  for (const f of await readdir(d, { withFileTypes: true })) {
    if (SKIP.has(f.name)) continue;
    const p = join(d, f.name);
    if (f.isDirectory()) out.push(...await walk(p));
    else if (f.name !== "check-syntax.mjs" && [".js", ".html", ".mjs"].includes(extname(f.name))) out.push(p);   // 이 파일 자신은 검사 문구 자체를 담고 있어 거짓양성이 난다
  }
  return out;
};

let bad = 0;
for (const p of await walk(ROOT)) {
  const lines = (await readFile(p, "utf8")).split("\n");
  lines.forEach((line, i) => {
    for (const [re, name] of BAD) {
      re.lastIndex = 0;
      if (re.test(line)) { console.error(`${p.slice(ROOT.length)}:${i + 1}  ${name}  ${line.trim().slice(0, 80)}`); bad++; }
    }
  });
}
if (bad) { console.error(`옛 브라우저에서 멎는 문법 ${bad}군데`); process.exit(1); }
console.log("check-syntax ok — ?. ?? (?< 없음");
