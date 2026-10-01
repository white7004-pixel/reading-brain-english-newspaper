// node supabase/test-sql.mjs — 001_academy_survey.sql 을 가짜 Postgres(PGlite)에서 돌려 본다.
// PGlite 는 원서관리프로그램 폴더에 깔린 것을 빌려 쓴다.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert';
import { pathToFileURL } from 'node:url';

const require = createRequire('C:/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램/package.json');
const { PGlite } = await import(pathToFileURL(require.resolve('@electric-sql/pglite')).href);
const { pgcrypto } = await import(pathToFileURL(require.resolve('@electric-sql/pglite/contrib/pgcrypto')).href);

const db = new PGlite({ extensions: { pgcrypto } });
await db.exec(`create role anon; create role authenticated; create schema extensions;`);
const sql = readFileSync(new URL('./001_academy_survey.sql', import.meta.url), 'utf8').replaceAll('여기에-비밀번호', 'test-pass');
await db.exec(sql);
await db.exec(sql); // 두 번 실행해도 된다

const one = async (q, p) => (await db.query(q, p)).rows[0];
await db.exec('set role anon');
assert.strictEqual((await one(`select public.survey_submit('parent', $1::jsonb) ok`, [JSON.stringify({ grade: '고등', good: 'x'.repeat(3000) })])).ok, true);
await assert.rejects(db.query(`select public.survey_submit('hack', '{}')`));
await assert.rejects(db.query(`select * from academy_survey.responses`)); // 직접 읽기 막힘
assert.strictEqual((await one(`select public.survey_results('wrong', 'parent') r`)).r, null);
const rows = (await one(`select public.survey_results('test-pass', 'parent') r`)).r;
assert.strictEqual(rows.length, 1);
assert.strictEqual(rows[0].answers.good.length, 2000);
assert.deepStrictEqual((await one(`select public.survey_results('test-pass', 'student') r`)).r, []);
console.log('SQL 시험 통과');
