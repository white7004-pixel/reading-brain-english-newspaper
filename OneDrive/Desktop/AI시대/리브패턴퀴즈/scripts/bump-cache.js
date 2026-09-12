// index.html 의 정적 자산 버전을 올리고 service-worker.js 의 사전 캐시 목록을
// 같은 값으로 맞춘다. 둘이 어긋나면 오프라인에서 옛 파일이 잡힌다.
//
// 사용: node scripts/bump-cache.js 20260912-adventure-map
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const tag = process.argv[2];
if (!tag) {
  console.error("태그를 넣어 주세요. 예) node scripts/bump-cache.js 20260912-adventure-map");
  process.exit(1);
}

const assets = ["styles.css", "mint-galaxy.css", "app.js"];
const QUOTES = "\"'";

// `<asset>?v=` 뒤의 값을 따옴표 직전까지 갈아 끼운다. 정규식을 쓰지 않는 이유는
// 자산 이름에 점이 들어 있어 이스케이프를 틀리기 쉽기 때문이다.
function bumpQuery(text, needle, version) {
  let out = text;
  let count = 0;
  let from = 0;
  for (;;) {
    const hit = out.indexOf(needle, from);
    if (hit === -1) break;
    const start = hit + needle.length;
    let end = start;
    while (end < out.length && !QUOTES.includes(out[end])) end += 1;
    out = out.slice(0, start) + version + out.slice(end);
    from = start + version.length;
    count += 1;
  }
  return { out, count };
}

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
let sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

for (const asset of assets) {
  const inHtml = bumpQuery(html, `${asset}?v=`, tag);
  if (!inHtml.count) throw new Error(`index.html 에 ${asset} 버전이 없다`);
  html = inHtml.out;

  const inSw = bumpQuery(sw, `/${asset}?v=`, tag);
  if (!inSw.count) throw new Error(`service-worker.js 에 ${asset} 항목이 없다`);
  sw = inSw.out;

  console.log(`${asset} -> ${tag} (html ${inHtml.count} · sw ${inSw.count})`);
}

const marker = "const CACHE_VERSION = \"";
const at = sw.indexOf(marker);
if (at === -1) throw new Error("service-worker.js 에 CACHE_VERSION 이 없다");
const vStart = at + marker.length;
const vEnd = sw.indexOf("\"", vStart);
sw = sw.slice(0, vStart) + tag + sw.slice(vEnd);

fs.writeFileSync(path.join(root, "index.html"), html);
fs.writeFileSync(path.join(root, "service-worker.js"), sw);
console.log(`CACHE_VERSION -> ${tag}`);
