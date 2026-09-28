// 첫 화면용 가벼운 책 목록을 만든다:  node scripts/make-cards.mjs [--check]
// books/*.js 를 읽어 카드에 필요한 것만 추린다. Book No. → slug 표도 여기서 함께 만든다.
// 손으로 적지 않는 까닭: 찰리를 축약본(S2703)에 이어 놓은 적이 있다. 사람이 적으면 반드시 틀린다.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const load = async f => { const w = {}; new Function("window", await readFile(join(ROOT, f), "utf8"))(w); return w; };

const slugs = (await load("books/index.js")).BOOKS;
const cards = [], byNo = {};
for (const slug of slugs) {
  const B = (await load(`books/${slug}.js`)).BOOK;
  cards.push({
    slug, title: B.title, author: B.author, series: B.series || "",
    level: { ar: B.level.ar, lexile: B.level.lexile || "", rb: B.level.rb || "" },
    cover: B.cover || "", awards: B.awards || [], tier: "A"
  });
  if (B.bookNo) byNo[B.bookNo] = slug;
}
cards.sort((a, b) => parseFloat(a.level.ar) - parseFloat(b.level.ar));   // 쉬운 책부터 — 첫 화면이 그 차례로 그린다

const out = "// 첫 화면용 책 목록. scripts/make-cards.mjs 가 books/*.js 에서 만든다 — 손으로 고치지 않는다.\n"
  + "window.BOOK_CARDS = " + JSON.stringify(cards, null, 1) + ";\n"
  + "// Book No. → slug. 서재에서 [학습하기] 단추를 띄울 때 쓴다.\n"
  + "window.BOOK_BY_NO = " + JSON.stringify(byNo, null, 1) + ";\n";

const dst = join(ROOT, "books", "cards.js");
if (process.argv.includes("--check")) {
  const now = await readFile(dst, "utf8").catch(() => "");
  if (now !== out) { console.error("books/cards.js 가 낡았다. node scripts/make-cards.mjs 를 돌려라."); process.exit(1); }
  console.log(`make-cards --check ok — 카드 ${cards.length}장`);
} else {
  await writeFile(dst, out);
  console.log(`books/cards.js 만듦 — 카드 ${cards.length}장 · Book No. ${Object.keys(byNo).length}개 · ${(out.length / 1024).toFixed(0)}KB`);
}
