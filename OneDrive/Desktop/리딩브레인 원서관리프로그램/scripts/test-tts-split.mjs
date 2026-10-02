// 문장·토막 끊는 규칙 검사.
//
// 지키려는 것 두 가지:
//  ① 규칙이 scripts/tts.mjs 와 app.html 에 **글자까지 똑같이** 들어 있다.
//     한쪽만 고치면 미리 만들어 둔 소리를 화면이 못 찾는다 (2026-10-02 에 402개가 그랬다).
//  ② 끊은 토막을 다시 넣어도 더 안 끊긴다. 안 그러면 만든 파일 이름과 화면이 찾는 이름이 어긋난다.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert";
import { ROOT, split } from "./tts.mjs";

// ── ① 두 파일의 규칙이 같은가 ───────────────────────────────────────────
const MARK = "/* \u2605 아래 세 함수는";
function rule(src, where){
  const i = src.indexOf(MARK);
  assert.ok(i >= 0, `${where} 에 끊는 규칙이 없다 — 지웠거나 머리말을 바꿨다`);
  const j = src.indexOf("function sayLines(t){", i);
  assert.ok(j > i, `${where} 에 sayLines 가 없다`);
  const k = src.indexOf("\n}", j);
  return src.slice(i, k + 2);
}
const a = rule(await readFile(join(ROOT, "scripts", "tts.mjs"), "utf8"), "scripts/tts.mjs");
const b = rule(await readFile(join(ROOT, "app.html"), "utf8"), "app.html");
assert.strictEqual(a, b, "scripts/tts.mjs 와 app.html 의 끊는 규칙이 다르다 — 한쪽만 고쳤다");

// ── ② 끊은 자리가 맞는가 ────────────────────────────────────────────────
const same = (t, want) => assert.deepStrictEqual(split(t), want, JSON.stringify(t));

// 섞인 문장은 말이 같은 토막으로 갈린다
same("정답은 B, Friendship can mean giving up something for someone else.",
     ["정답은", "B, Friendship can mean giving up something for someone else."]);
same("Human-animal communication 이에요.", ["Human-animal communication", "이에요."]);
same("소개글에 \"Eight-year-old Jack\" 이라고 적혀 있어요.",
     ["소개글에", "\"Eight-year-old Jack\"", "이라고 적혀 있어요."]);
same("중세(the Middle Ages)예요.", ["중세", "(the Middle Ages)", "예요."]);

// 영어가 한 낱말뿐이면 끊지 않는다 — 한국어 목소리로 "버즈" 라고 읽는 게 자연스럽다
same("정답은 Buzz.", ["정답은 Buzz."]);
same("애완동물 대회에 나갈 pet 을 찾으려던 거예요.", ["애완동물 대회에 나갈 pet 을 찾으려던 거예요."]);

// 네 토막 이상으로 부서지는 문장은 그냥 둔다 — 조사 하나만 남은 토막은 더 이상하다
same("주제어 목록에도 Tree houses 와 Time travel 이 있어요.",
     ["주제어 목록에도 Tree houses 와 Time travel 이 있어요."]);

// 한 가지 말이면 손대지 않는다
same("The answer is B, Friendship can mean giving up.", ["The answer is B, Friendship can mean giving up."]);
same("다 맞혔어요!", ["다 맞혔어요!"]);

// 마침표 뒤 닫는 따옴표까지 한 문장이다
same("\"Terrific!\"", ["\"Terrific!\""]);
// 마침표 앞에서 안 끊었으니 문장이 통째로 남고, 그 뒤에 말로 갈린다
same("정답은 C, \"Salutations!\".", ["정답은", "C, \"Salutations!\"."]);
same("Her very first word is \"Salutations!\" It surprises Wilbur.",
     ["Her very first word is \"Salutations!\"", "It surprises Wilbur."]);

// 토막을 다시 넣어도 더 안 끊긴다 — 실제로 만들어 둔 문장 전부로 확인한다
let n = 0;
const idx = JSON.parse(await readFile(join(ROOT, "assets", "tts", "index.json"), "utf8"));
for (const s of Object.keys(idx)){
  for (const p of split(s)){
    const again = split(p);
    assert.ok(again.length === 1 && again[0] === p, `토막이 또 끊긴다: ${JSON.stringify(p)}`);
    n++;
  }
}
console.log(`test-tts-split ok — 규칙이 두 파일에 같고, 토막 ${n}개가 제자리다`);
