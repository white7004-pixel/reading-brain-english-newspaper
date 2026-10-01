// node supabase/test-forms.mjs — 001 + 002(설문 만들기) 를 가짜 Postgres(PGlite)에서 돌려 본다.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert';
import { pathToFileURL } from 'node:url';

const require = createRequire('C:/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램/package.json');
const { PGlite } = await import(pathToFileURL(require.resolve('@electric-sql/pglite')).href);
const { pgcrypto } = await import(pathToFileURL(require.resolve('@electric-sql/pglite/contrib/pgcrypto')).href);

const db = new PGlite({ extensions: { pgcrypto } });
await db.exec(`create role anon; create role authenticated; create schema extensions;`);
const read = f => readFileSync(new URL(f, import.meta.url), 'utf8').replaceAll('여기에-비밀번호', 'pw');
await db.exec(read('./001_academy_survey.sql'));
await db.exec(`insert into academy_survey.responses (survey, answers) values ('teacher', '{"_test":"연결 확인"}')`); // 실서버에 있는 시험 답
await db.exec(read('./002_forms.sql'));
await db.exec(read('./002_forms.sql')); // 두 번 실행해도 된다

const one = async (q, p) => (await db.query(q, p)).rows[0].r;
const J = x => JSON.stringify(x);
await db.exec('set role anon');

// 처음 값: 학부모·학생 설문이 들어 있다
const parent = await one(`select public.survey_form('parent') r`);
assert.strictEqual(parent.status, 'open');
assert.strictEqual(parent.def.sections.length, 4);
assert.strictEqual(parent.def.greeting, 'Dear parents,');
assert.strictEqual((await one(`select public.survey_form('student') r`)).def.sections[1].items.length, 13);
assert.strictEqual(await one(`select public.survey_form('nope') r`), null);

// 관리 목록은 비밀번호가 있어야
assert.strictEqual(await one(`select public.survey_admin_forms('wrong') r`), null);
let list = await one(`select public.survey_admin_forms('pw') r`);
assert.deepStrictEqual(list.map(f => f.slug).sort(), ['parent', 'student']);

// 새 설문 만들기
const def = { kicker: '설명회 만족도', title: '설명회 어떠셨나요', sections: [{ title: '질문', items: [
  { id: 'q1', type: 'single', label: '도움이 되었나요', required: true, options: ['네', '아니요'] }] }] };
assert.strictEqual((await one(`select public.survey_save_form('wrong','seminar',$1::jsonb,true) r`, [J(def)])).error, 'password');
assert.strictEqual((await one(`select public.survey_save_form('pw','Bad Slug',$1::jsonb,true) r`, [J(def)])).error, 'slug');
assert.strictEqual((await one(`select public.survey_save_form('pw','parent',$1::jsonb,true) r`, [J(def)])).error, 'exists');
assert.strictEqual((await one(`select public.survey_save_form('pw','seminar',$1::jsonb,true) r`, [J({ ...def, sections: [] })])).error, 'empty');
assert.strictEqual((await one(`select public.survey_save_form('pw','seminar',$1::jsonb,true) r`, [J(def)])).ok, true);
assert.strictEqual((await one(`select public.survey_form('seminar') r`)).def.id, 'seminar');

// 응답 넣기: 있는 설문만, 열린 설문만
assert.strictEqual((await db.query(`select public.survey_submit('seminar', '{"q1":"네"}') r`)).rows[0].r, true);
await assert.rejects(db.query(`select public.survey_submit('ghost', '{}')`));

// 응답이 생기면: 글자 고치기·문항 더하기는 되고, 빼기·보기 바꾸기는 막힌다
const edited = JSON.parse(J(def));
edited.title = '설명회, 어떠셨나요?';
edited.sections[0].items[0].label = '오늘 설명회가 도움이 되었나요?';
edited.sections[0].items.push({ id: 'q2', type: 'text', label: '하고 싶은 말' });
assert.strictEqual((await one(`select public.survey_save_form('pw','seminar',$1::jsonb,false) r`, [J(edited)])).ok, true);
const changedOpts = JSON.parse(J(edited)); changedOpts.sections[0].items[0].options = ['네', '보통', '아니요'];
assert.strictEqual((await one(`select public.survey_save_form('pw','seminar',$1::jsonb,false) r`, [J(changedOpts)])).error, 'locked');
const removed = JSON.parse(J(edited)); removed.sections[0].items.shift();
assert.strictEqual((await one(`select public.survey_save_form('pw','seminar',$1::jsonb,false) r`, [J(removed)])).error, 'locked');
assert.strictEqual((await one(`select public.survey_save_form('pw','ghost',$1::jsonb,false) r`, [J(def)])).error, 'missing');

// 닫기 → 응답 막힘, 열기 → 다시 됨
assert.strictEqual((await one(`select public.survey_set_status('pw','seminar','closed') r`)).ok, true);
assert.strictEqual((await one(`select public.survey_form('seminar') r`)).status, 'closed');
await assert.rejects(db.query(`select public.survey_submit('seminar', '{"q1":"네"}')`));
assert.strictEqual((await one(`select public.survey_set_status('wrong','seminar','open') r`)).error, 'password');
await one(`select public.survey_set_status('pw','seminar','open') r`);

// 지우기: 응답 있으면 안 되고, 없으면 된다
assert.strictEqual((await one(`select public.survey_delete_form('pw','seminar') r`)).error, 'has_responses');
await one(`select public.survey_save_form('pw','draft-1',$1::jsonb,true) r`, [J(def)]);
assert.strictEqual((await one(`select public.survey_delete_form('pw','draft-1') r`)).ok, true);

// 목록에 응답 수
list = await one(`select public.survey_admin_forms('pw') r`);
assert.strictEqual(list.find(f => f.slug === 'seminar').responses, 1);

// 표는 여전히 직접 못 읽는다
await assert.rejects(db.query(`select * from academy_survey.forms`));
console.log('설문 만들기 SQL 시험 통과');
