// 보기(오답 후보) 고르는 규칙.
// 같은 뜻이거나 같은 영어인 후보가 보기에 끼면, 학생이 맞는 답을 고르고도 틀리게 된다.
const assert = require("node:assert/strict");
const { isConfusable, pickDistractors } = require("../quiz-options-model.js");

const 만나서A = { id: 4, english: "Nice to meet you.", korean: "만나서 반가워." };
const 만나서B = { id: 5, english: "Glad to meet you.", korean: "만나서 반가워" };
const 응좋아해 = { id: 75, english: "Yes, I do.", korean: "응, 좋아해." };
const 응있어 = { id: 103, english: "Yes, I do.", korean: "응, 있어." };
const 잘가 = { id: 9, english: "Goodbye.", korean: "잘 가." };
const 고마워 = { id: 10, english: "Thank you.", korean: "고마워." };
const 미안해 = { id: 11, english: "Sorry.", korean: "미안해." };

// 뜻이 같으면 헷갈린다 — 마침표와 띄어쓰기 차이는 무시한다
assert.equal(isConfusable(만나서A, 만나서B), true);
// 영어가 같으면 뜻이 달라도 헷갈린다
assert.equal(isConfusable(응좋아해, 응있어), true);
// 자기 자신
assert.equal(isConfusable(만나서A, { ...만나서A }), true);
// 서로 다른 표현
assert.equal(isConfusable(만나서A, 잘가), false);

// 헷갈리는 후보는 보기에서 빠진다
const picked = pickDistractors(만나서A, [만나서B, 잘가, 고마워, 미안해]);
assert.deepEqual(picked.map((p) => p.id), [9, 10, 11], "같은 뜻인 5번은 보기에 들어가면 안 된다");

// 영어가 같은 후보도 빠진다
assert.deepEqual(
  pickDistractors(응좋아해, [응있어, 잘가]).map((p) => p.id),
  [9],
  "같은 영어인 103번은 보기에 들어가면 안 된다",
);

// 보기끼리도 서로 겹치지 않는다
assert.deepEqual(
  pickDistractors(잘가, [만나서A, 만나서B, 고마워]).map((p) => p.id),
  [4, 10],
  "뜻이 같은 후보 둘이 나란히 보기에 서면 안 된다",
);

// 개수는 최대 count 개, 후보가 모자라면 있는 만큼만 준다
assert.equal(pickDistractors(잘가, [고마워, 미안해, 만나서A, 응좋아해]).length, 3);
assert.equal(pickDistractors(잘가, [고마워]).length, 1);
assert.equal(pickDistractors(잘가, []).length, 0);
assert.equal(pickDistractors(잘가, [고마워, 미안해, 만나서A], 2).length, 2);

// 준 순서를 지킨다 — 섞는 일은 부르는 쪽이 한다
assert.deepEqual(pickDistractors(잘가, [미안해, 고마워]).map((p) => p.id), [11, 10]);

// 빈 값·이상한 값이 들어와도 죽지 않는다
assert.deepEqual(pickDistractors(잘가, [null, undefined, {}, 고마워]).map((p) => p.id), [10]);
assert.equal(pickDistractors(null, [고마워]).length, 0);

console.log("quiz options model tests passed");

// 오프라인에서도 보기 고르기가 살아 있으려면, 새 스크립트가 사전 캐시에 들어 있어야 한다.
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

const src = html.match(/<script src="(quiz-options-model\.js[^"]*)"/)?.[1];
assert.ok(src, "index.html 이 보기 모델을 불러야 한다");
assert.ok(sw.includes(`"/${src}"`), `서비스워커 사전 캐시에 ${src} 가 있어야 한다`);

// 두 퀴즈(패턴·북퀴즈)가 모두 이 규칙을 쓴다
assert.equal(
  (app.match(/quizOptionsModel\.pickDistractors\(/g) || []).length,
  4,
  "보기를 만드는 곳(패턴 퀴즈·북퀴즈·표현 블라스트·북퀴즈 블라스트)은 모두 같은 규칙을 써야 한다",
);
assert.doesNotMatch(app, /\.slice\(0, 3\)\);\s*\n\s*return shuffle\(\[answer/, "옛 보기 고르기가 남아 있으면 안 된다");
