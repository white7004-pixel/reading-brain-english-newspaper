// 오픈라이브러리에서 표지 번호를 찾는다:
//   node scripts/find-covers.mjs "The Berenstain Bears' New Neighbors" "Stan Berenstain"
//   node scripts/find-covers.mjs --file 목록.json      ([{title, author}, ...] → {제목: 주소} 를 찍는다)
// 그림을 내려받지 않는다. 주소만 가리킨다 (저작권).
import { readFile } from "node:fs/promises";

const url = (t, a) => "https://openlibrary.org/search.json?limit=5&fields=title,author_name,cover_i&title="
  + encodeURIComponent(t) + "&author=" + encodeURIComponent(a);

async function find(title, author) {
  const r = await fetch(url(title, author));
  if (!r.ok) return "";
  const d = await r.json();
  const hit = (d.docs || []).find(x => x.cover_i);
  return hit ? `https://covers.openlibrary.org/b/id/${hit.cover_i}-M.jpg` : "";
}

const args = process.argv.slice(2);
if (args[0] === "--file") {
  const list = JSON.parse(await readFile(args[1], "utf8"));
  const out = {};
  for (const { title, author } of list) {
    out[title] = await find(title, author || "");
    await new Promise(r => setTimeout(r, 400));          // 오픈라이브러리에 몰아치지 않는다
    console.error(`${out[title] ? "○" : "×"} ${title}`);
  }
  console.log(JSON.stringify(out, null, 1));
} else {
  console.log(await find(args[0], args[1] || "") || "없음");
}
