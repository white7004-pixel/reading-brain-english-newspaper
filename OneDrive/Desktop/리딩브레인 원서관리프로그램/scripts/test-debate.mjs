// 북디베이트 AI 분석 요청 확인: node scripts/test-debate.mjs
// 진짜 AI 는 부르지 않는다. 가짜 클라이언트로 "무엇을 어떻게 보내는지"만 본다.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { analyzeDebate, systemPrompt, CRITERIA, MODEL } from "../supabase/functions/book-debate/debate.mjs";

const w = {};
new Function("window", await readFile(new URL("../books/holes.js", import.meta.url), "utf8"))(w);
const book = w.BOOK;

const reply = { scores: { knowledge: 3, reasoning: 4, evidence: 2, perspectives: 3, language: 3 },
  strengths_ko: ["이유를 잘 말했어요."], next_ko: ["For example, in the book, ___."], better: [],
  summary_ko: "잘했어요.", summary_en: "Good job." };
const calls = [];
const client = { beta: { messages: { create: async req => { calls.push(req); return { stop_reason: "end_turn", content: [{ type: "text", text: JSON.stringify(reply) }] }; } } } };

const out = await analyzeDebate(client, { book, question: book.ib.debatable[0], stance: "disagree",
  transcript: "I think it is not fair because Stanley did not steal the shoes.", seconds: 62 });
assert.equal(out.mode, "ai");
assert.equal(out.scores.reasoning, 4);

const req = calls[0];
assert.equal(req.model, MODEL);
assert.equal(req.output_config.format.type, "json_schema");
assert.deepEqual(req.output_config.format.schema.properties.scores.required, CRITERIA);
assert.ok(req.system.includes("Holes") && req.system.includes("<book_notes>"));
assert.ok(req.messages[0].content.includes(book.ib.debatable[0]));
assert.ok(req.messages[0].content.includes("62 seconds"));
assert.ok(req.messages[0].content.includes("did not steal the shoes"));
assert.ok(!("thinking" in req) && !("temperature" in req));
assert.ok(systemPrompt(book).includes("assess only the student"));

// 빈 녹음도 요청은 간다 (AI 가 낮은 점수와 다음 할 일을 준다)
await analyzeDebate(client, { book, question: "Q?", stance: "", transcript: "", seconds: 0 });
assert.ok(calls[1].messages[0].content.includes("(nothing was recognized)"));
console.log("test-debate ok");
