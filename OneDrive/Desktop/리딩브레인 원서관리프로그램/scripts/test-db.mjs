// 서버 규칙 확인: node scripts/test-db.mjs
// 로그인·잠금·토큰·남의 데이터 막기·선생님 권한을 진짜 Postgres 로 돌려 본다.
import assert from "node:assert/strict";
import { startDb, ANON } from "./dev-server.mjs";

const S = await startDb();
const tid = await S.addTeacher("t@test.kr", "pw", "선생님");
const T = S.signIn(tid).access_token;
const fails = async (p, code) => assert.equal((await p.then(() => null, e => e)).code, code);

// 선생님만 학생을 만든다
await fails(S.rpc(ANON, "teacher_add_student", { p_login: "kim01", p_name: "김", p_class: "A" }), "42501");
const other = S.signIn((await S.db.query("insert into auth.users (email) values ('x@x') returning id")).rows[0].id).access_token;
await fails(S.rpc(other, "teacher_students"), "42501");               // 계정은 있어도 teachers 에 없으면 막힌다

const kim = await S.rpc(T, "teacher_add_student", { p_login: " Kim01 ", p_name: "김철수", p_class: "A반" });
assert.equal(kim.login_id, "kim01");
assert.match(kim.pin, /^\d{6}$/);
assert.equal((await S.rpc(T, "teacher_add_student", { p_login: "kim01", p_name: "x", p_class: "" })).error, "login_taken");
assert.equal((await S.rpc(T, "teacher_add_student", { p_login: "김", p_name: "x", p_class: "" })).error, "bad_login_id");
const lee = await S.rpc(T, "teacher_add_student", { p_login: "lee02", p_name: "이영희", p_class: "" });

// PIN 은 늘 여섯 자리 숫자 (한때 음수가 나왔다)
const { rows: pins } = await S.db.query("select rb_private.new_pin() as p from generate_series(1, 3000)");
const badPin = pins.find(r => !/^\d{6}$/.test(r.p));
assert.ok(pins.every(r => /^\d{6}$/.test(r.p)), badPin && badPin.p);

// PIN 은 해시로만
const { rows: [row] } = await S.db.query("select pin_hash from students where login_id = 'kim01'");
assert.notEqual(row.pin_hash, kim.pin);

// 표는 직접 못 본다
await fails(S.db.transaction(async tx => { await tx.exec("set local role anon"); await tx.query("select * from public.students"); }), "42501");
await fails(S.db.transaction(async tx => { await tx.exec("set local role authenticated"); await tx.query("select * from public.answers"); }), "42501");

// 로그인
assert.equal((await S.rpc(ANON, "student_login", { p_login: "kim01", p_pin: "000000x" })).error, "bad_login");
assert.equal((await S.rpc(ANON, "student_login", { p_login: "nobody", p_pin: kim.pin })).error, "bad_login");
const s1 = await S.rpc(ANON, "student_login", { p_login: "KIM01", p_pin: kim.pin });
assert.equal(s1.name, "김철수");
assert.match(s1.token, /^[0-9a-f]{64}$/);

// 저장 · 불러오기 · 지우기
await S.rpc(ANON, "student_save", { p_token: s1.token, p_slug: "charlottes-web", p_part: "test", p_data: { score: 9, total: 12 } });
await S.rpc(ANON, "student_save", { p_token: s1.token, p_slug: "charlottes-web", p_part: "test", p_data: { score: 11, total: 12 } });
await S.rpc(ANON, "student_save", { p_token: s1.token, p_slug: "charlottes-web", p_part: "sheet", p_data: ["barn", ""] });
let got = await S.rpc(ANON, "student_load", { p_token: s1.token, p_slug: "charlottes-web" });
assert.equal(got.answers.test.data.score, 11);
assert.equal(got.submission, null);
await S.rpc(ANON, "student_drop", { p_token: s1.token, p_slug: "charlottes-web", p_part: "sheet" });
got = await S.rpc(ANON, "student_load", { p_token: s1.token, p_slug: "charlottes-web" });
assert.equal(got.answers.sheet, undefined);
await fails(S.rpc(ANON, "student_save", { p_token: s1.token, p_slug: "x", p_part: "big", p_data: { s: "a".repeat(210000) } }), "22001");

// 토큰 없거나 틀리면 막힌다. 남의 것은 애초에 고를 방법이 없다(학생 id 를 받지 않는다).
await fails(S.rpc(ANON, "student_load", { p_token: "nope", p_slug: "charlottes-web" }), "28000");
await fails(S.rpc(ANON, "student_load", { p_token: null, p_slug: "charlottes-web" }), "28000");
const s2 = await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: lee.pin });
assert.deepEqual((await S.rpc(ANON, "student_load", { p_token: s2.token, p_slug: "charlottes-web" })).answers, {});

// 서술형 제출 → 첨삭 → 학생이 본다 → 다시 내도 첨삭은 남는다
const essay = { prompt: "Q", parts: ["a"], labels: ["Title"], text: "a" };
await S.rpc(ANON, "student_submit", { p_token: s1.token, p_slug: "charlottes-web", p_title: "Charlotte's Web", p_body: essay });
const subs = await S.rpc(T, "teacher_submissions");
assert.equal(subs.length, 1);
assert.equal(subs[0].who, "김철수");
await S.rpc(T, "teacher_feedback", { p_student: subs[0].student_id, p_slug: "charlottes-web", p_feedback: { overall: "좋아요" } });
await S.rpc(ANON, "student_submit", { p_token: s1.token, p_slug: "charlottes-web", p_title: "Charlotte's Web", p_body: { ...essay, text: "b" } });
got = await S.rpc(ANON, "student_load", { p_token: s1.token, p_slug: "charlottes-web" });
assert.equal(got.submission.feedback.overall, "좋아요");
assert.equal(got.submission.body.text, "b");
await fails(S.rpc(ANON, "teacher_feedback", { p_student: subs[0].student_id, p_slug: "charlottes-web", p_feedback: {} }), "42501");

// 점수판에는 점수만 (워크시트 답 전체는 안 나간다)
await S.rpc(ANON, "student_save", { p_token: s1.token, p_slug: "charlottes-web", p_part: "sheet", p_data: ["x"] });
const prog = await S.rpc(T, "teacher_progress");
assert.deepEqual(prog.map(p => p.part).sort(), ["test"]);

// 5번 틀리면 잠긴다 — 맞는 PIN 도 10분간 안 된다
for (let i = 0; i < 4; i++)
  assert.equal((await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: "999999" })).error, "bad_login");
assert.equal((await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: "999999" })).error, "bad_login");
assert.equal((await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: lee.pin })).error, "locked");
assert.equal((await S.rpc(T, "teacher_students")).find(s => s.login_id === "lee02").locked, true);

// PIN 재발급: 잠금 풀림, 옛 토큰·옛 PIN 무효
const re = await S.rpc(T, "teacher_reset_pin", { p_student: lee.id });
await fails(S.rpc(ANON, "student_load", { p_token: s2.token, p_slug: "x" }), "28000");
assert.equal((await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: lee.pin === re.pin ? "x" : lee.pin })).error, "bad_login");
assert.ok((await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: re.pin })).token);

// 사용 중지하면 로그인도, 쓰던 토큰도 막힌다
await S.rpc(T, "teacher_set_active", { p_student: kim.id, p_active: false });
await fails(S.rpc(ANON, "student_load", { p_token: s1.token, p_slug: "x" }), "28000");
assert.equal((await S.rpc(ANON, "student_login", { p_login: "kim01", p_pin: kim.pin })).error, "bad_login");

// AI 북토크는 하루 60턴까지. 토큰 없으면 막힌다.
await fails(S.rpc(ANON, "student_talk_turn", { p_token: "nope" }), "28000");
const s4 = await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: re.pin });
for (let i = 1; i <= 60; i++)
  assert.equal((await S.rpc(ANON, "student_talk_turn", { p_token: s4.token })).left, 60 - i);
assert.equal((await S.rpc(ANON, "student_talk_turn", { p_token: s4.token })).error, "limit");
await S.rpc(ANON, "student_save", { p_token: s4.token, p_slug: "hi-fly-guy", p_part: "talkScore", p_data: { times: 1 } });
assert.ok((await S.rpc(T, "teacher_progress")).some(p => p.part === "talkScore"));

// 로그아웃
const s3 = await S.rpc(ANON, "student_login", { p_login: "lee02", p_pin: re.pin });
await S.rpc(ANON, "student_logout", { p_token: s3.token });
await fails(S.rpc(ANON, "student_load", { p_token: s3.token, p_slug: "x" }), "28000");

console.log("test-db ok");
