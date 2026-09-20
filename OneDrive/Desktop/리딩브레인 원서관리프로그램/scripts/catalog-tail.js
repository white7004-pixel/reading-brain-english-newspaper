// ── 읽는 법 ──
CATALOG.F = { no:0, title:1, series:2, author:3, lexile:4, bl:5, nf:6, genre:7, theme:8, award:9, cover:10 };
// 한 권을 이름 붙은 객체로 편다
CATALOG.at = function (i) {
  var b = CATALOG.books[i];
  if (!b) return null;
  return { i: i, no: b[0], title: b[1], series: CATALOG.series[b[2]], author: b[3],
           lexile: b[4], bl: b[5], nf: !!b[6], genre: CATALOG.genre[b[7]],
           theme: CATALOG.theme[b[8]], award: b[9], cover: b[10] };
};
// 거르기. q 는 낱말을 띄어 쓰면 모두 들어간 책만 (제목·저자·시리즈·번호에서 찾는다).
// ar 은 [최소, 최대] 또는 null. g·t 는 genre·theme 첨자 또는 -1(전체).
CATALOG.pick = function (q, ar, g, t) {
  var words = String(q || "").toLowerCase().split(/\s+/).filter(Boolean), out = [];
  for (var i = 0; i < CATALOG.books.length; i++) {
    var b = CATALOG.books[i];
    if (ar && (b[5] < ar[0] || b[5] > ar[1])) continue;
    if (g >= 0 && b[7] !== g) continue;
    if (t >= 0 && b[8] !== t) continue;
    if (words.length) {
      var hay = (b[1] + " " + b[3] + " " + CATALOG.series[b[2]] + " " + b[0]).toLowerCase(), ok = true;
      for (var w = 0; w < words.length; w++) if (hay.indexOf(words[w]) < 0) { ok = false; break; }
      if (!ok) continue;
    }
    out.push(i);
  }
  return out;
};
if (typeof window !== "undefined") window.CATALOG = CATALOG;
// 확인: node catalog.js
if (typeof module !== "undefined" && require.main === module) {
  var assert = require("assert"), B = CATALOG.books;
  assert.ok(B.length > 4000, "책이 너무 적다: " + B.length);
  var seen = {};
  for (var i = 0; i < B.length; i++) {
    var b = B[i];
    assert.ok(b[0] && !seen[b[0]], "Book No. 가 비었거나 겹친다: " + b[0]);
    seen[b[0]] = 1;
    assert.ok(b[1], "제목이 없다: " + b[0]);
    assert.ok(typeof b[5] === "number" && b[5] > 0 && b[5] < 20, "AR 이 이상하다: " + b[0] + " " + b[5]);
    assert.ok(CATALOG.series[b[2]] !== undefined, "시리즈 번호가 범위 밖: " + b[0]);
    assert.ok(CATALOG.genre[b[7]] !== undefined, "장르 번호가 범위 밖: " + b[0]);
    assert.ok(CATALOG.theme[b[8]] !== undefined, "주제 번호가 범위 밖: " + b[0]);
  }
  var one = CATALOG.at(0);
  assert.strictEqual(one.no, B[0][0]); assert.strictEqual(one.title, B[0][1]);
  assert.ok(CATALOG.pick("", [1, 1.99], -1, -1).length > 100, "AR 1점대가 100권은 넘어야 한다");
  assert.ok(CATALOG.pick("fly guy", null, -1, -1).length > 0, "'fly guy' 가 찾아져야 한다");
  assert.strictEqual(CATALOG.pick("존재하지않는제목xyz", null, -1, -1).length, 0, "없는 말은 0권");
  var t0 = CATALOG.pick("", null, -1, 0).length;
  assert.ok(t0 > 0 && t0 < B.length, "주제로 거르면 일부만 남아야 한다");
  console.log("catalog.js ok — " + B.length + "권");
}
