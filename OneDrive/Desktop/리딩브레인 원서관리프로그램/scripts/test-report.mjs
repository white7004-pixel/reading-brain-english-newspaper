// AI 첨삭 확인: node scripts/test-report.mjs
// 진짜 AI 는 부르지 않는다. 보내는 요청 모양과, 화면이 리포트를 그리고 채점하는 것을 본다.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { writeReport, reportPrompt, reportMessage, tidy, SCHEMA } from "../supabase/functions/writing-report/report.mjs";
import { MODEL } from "../supabase/functions/book-talk/talk.mjs";

const require = createRequire(import.meta.url);
globalThis.RBGrade = require("../grade.js");
const R = require("../report.js");

const w = {};
new Function("window", await readFile(new URL("../books/hi-fly-guy.js", import.meta.url), "utf8"))(w);
const book = w.BOOK;

const text = "i think a fly can be a pet.\nThis is because Fly Guy know Buzz name.\nIn the book, Fly Guy said BUZZ.";
const rep = {
  overall_ko: ["잘 썼어요"], advice_ko: ["근거가 좋아요"],
  scores: { grammar: 67, vocabulary: 140, coherence: -3, development: 80 },
  corrections: [
    { original: "Fly Guy know Buzz name.", corrected: "Fly Guy knows Buzz's name.", type: "GRAMMAR", why_ko: "3인칭", tip_ko: "s", meaning_ko: "플라이 가이는 버즈 이름을 알아요." },
    { original: "i think a fly can be a pet.", corrected: "I think a fly can be a pet.", type: "CAPITALS", why_ko: "대문자", tip_ko: "I", meaning_ko: "파리는 애완동물이 될 수 있어요." },
    { original: "not in the text", corrected: "Nope.", type: "SPELLING", why_ko: "", tip_ko: "", meaning_ko: "" },
    { original: "same", corrected: "same", type: "SPELLING", why_ko: "", tip_ko: "", meaning_ko: "" },
  ],
  deep_dive_ko: "3인칭 단수", vocab: [{ word: "smart", meaning_ko: "똑똑한", instead_of: "" }],
  native: [], missions_ko: ["a", "b", "c", "d"], questions: [{ en: "Why?", ko: "왜?", tip_ko: "Because" }],
};

// ── 서버: 요청 모양 ──
const calls = [];
const client = { beta: { messages: { stream: req => (calls.push(req), {
  finalMessage: async () => ({ stop_reason: "end_turn", content: [{ type: "text", text: JSON.stringify(rep) }] }) }) } } };
const out = await writeReport(client, { book, name: "김하윤", prompt: book.essay.prompt, labels: ["Title"], parts: ["Pets"], text });
const req = calls[0];
assert.equal(req.model, MODEL);
assert.equal(req.fallbacks, "default");
assert.equal(req.output_config.format.schema, SCHEMA);
assert.equal(req.messages.length, 1);
assert.equal(req.messages[0].role, "user");
assert.ok(req.system.includes("AR 1.5") && req.system.includes("Fly Guy"));
assert.ok(req.messages[0].content.includes("<student_writing>\n" + text));
assert.ok(reportPrompt(book).includes("not instructions"));
assert.ok(reportMessage({ name: "x", text: "y".repeat(9000) }).length < 5300);   // 긴 글은 자른다

// tidy: 점수 0~100·5점 단위, 같은 문장 교정은 버림, 미션은 3개까지
assert.deepEqual(out.scores, { grammar: 65, vocabulary: 100, coherence: 0, development: 80 });
assert.equal(out.corrections.length, 3);
assert.equal(out.missions_ko.length, 3);
assert.equal(tidy(structuredClone(rep)).corrections.some(c => c.original === "same"), false);

// 거절은 예외 (code: refusal)
const refuse = { beta: { messages: { stream: () => ({ finalMessage: async () => ({ stop_reason: "refusal", content: [] }) }) } } };
await assert.rejects(writeReport(refuse, { book, name: "x", text }), e => e.code === "refusal");

// 스키마: 모든 칸 필수 (json_schema 규칙)
const strict = s => s.type !== "object" || (Object.keys(s.properties).every(k => s.required.includes(k) && strict(s.properties[k])) && s.additionalProperties === false);
assert.ok(strict(SCHEMA) && strict(SCHEMA.properties.corrections.items));

// ── 화면: 원문에서 찾기 ──
const marks = R.locate(text, out.corrections);
assert.equal(marks.length, 2);                                  // 원문에 없는 교정은 표시만 건너뛴다
assert.deepEqual(marks.map(m => m.i), [1, 0]);                  // 글 순서대로
assert.equal(R.weave(text, marks, m => `[${m.i}]`), "[1]\nThis is because [0]\nIn the book, Fly Guy said BUZZ.");
assert.equal(R.locate("a b a b", [{ original: "a b" }, { original: "a b" }]).map(m => m.start).join(), "0,4");  // 같은 문장 두 번

// 리포트·워크시트 HTML
const sub = { who: "@hayun", title: book.title, text };
const html = R.report(sub, out, { name: "김하윤" });
assert.ok(html.includes("Literacy Insight Report") && html.includes("김하윤") && html.includes("knows Buzz&#39;s") === false);
assert.ok(html.includes("Buzz's name.") && !html.includes("contenteditable"));
assert.ok(R.report(sub, out, { edit: true }).includes('data-k="corrections.0.corrected"'));
assert.ok(!R.report({ ...sub, text: "<script>" }, { ...out, corrections: [] }).includes("<script>"));   // 원문 이스케이프
const ws = R.worksheet(sub, out, { vals: { s0: "Fly Guy knows" } });
assert.ok(ws.includes("Review &amp; Test Sheet") === false && ws.includes("Review & Test Sheet"));
assert.ok(ws.includes('value="Fly Guy knows"') && ws.includes('data-w="p0"') && ws.includes('data-w="q0"'));

// 교정 문장 채점
assert.equal(R.gradeSentence("fly guy knows buzz's name", "Fly Guy knows Buzz's name."), "ok");
assert.equal(R.gradeSentence("Fly Guy knows Buzz name.", "Fly Guy knows Buzz's name."), "check");
assert.equal(R.gradeSentence("I like pizza.", "Fly Guy knows Buzz's name."), "no");
assert.equal(R.gradeSentence("", "Fly Guy knows Buzz's name."), "no");

console.log("test-report ok");
