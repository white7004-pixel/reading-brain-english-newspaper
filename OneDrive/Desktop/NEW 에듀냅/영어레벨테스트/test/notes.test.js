import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanNotes, notesHandler } from '../lib/notes.js';

test('cleanNotes: 이름·화면을 다듬고, 잘못된 판정·id 는 버린다', () => {
  const out = cleanNotes({
    page: 'forms',
    teacher: '  박선생 ',
    notes: {
      's1-A-7': { v: 'fix', memo: ' 정답이 둘로 보임 ' },
      's1-A-8': { v: 'ok' },
      's1-A-9': { v: 'maybe', memo: '' },
      'bad id!': { v: 'ok' },
      's1-A-10': { memo: '해설만' },
    },
  });
  assert.deepEqual(out, {
    page: 'forms',
    teacher: '박선생',
    notes: { 's1-A-7': { v: 'fix', memo: '정답이 둘로 보임' }, 's1-A-8': { v: 'ok', memo: '' }, 's1-A-9': { v: '', memo: '' }, 's1-A-10': { v: '', memo: '해설만' } },
  }); // 빈 의견은 "지우기" 로 남긴다
  assert.equal(cleanNotes({ page: 'forms', teacher: '박선생', notes: {} }).teacher, '박선생'); // 한글 조합이 달라도 같은 이름
});

test('cleanNotes: 이름이 없거나 화면이 틀리면 알려 준다, 긴 의견은 500자로', () => {
  assert.throws(() => cleanNotes({ page: 'forms', teacher: ' ', notes: {} }), /이름/);
  assert.throws(() => cleanNotes({ page: 'forms', teacher: '가'.repeat(21), notes: {} }), /이름/);
  assert.throws(() => cleanNotes({ page: 'x', teacher: '박선생', notes: {} }), /화면/);
  assert.throws(() => cleanNotes({ page: 'bank', teacher: '박선생', notes: Object.fromEntries(Array.from({ length: 1001 }, (_, i) => [`i${i}`, { v: 'ok' }])) }), /많/);
  assert.equal(cleanNotes({ page: 'bank', teacher: '박선생', notes: { a: { v: 'fix', memo: 'x'.repeat(900) } } }).notes.a.memo.length, 500);
});

const memoryStore = () => {
  const files = new Map();
  return {
    files,
    put: async (path, text) => { files.set(path, text); },
    paths: async (prefix) => [...files.keys()].filter((p) => p.startsWith(prefix)),
    read: async (path) => files.get(path) ?? null,
  };
};
const call = async (handler, method, url, body) => {
  const res = { statusCode: 0, headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(t) { this.body = JSON.parse(t); } };
  await handler({ method, url, body }, res);
  return res;
};

test('notesHandler: 선생님마다 따로 저장하고, 화면별로 모두 돌려준다', async () => {
  const store = memoryStore();
  const h = notesHandler(store);
  await call(h, 'POST', '/api/notes', { page: 'forms', teacher: '박선생', notes: { 's1-A-7': { v: 'fix', memo: '오타' } } });
  await call(h, 'POST', '/api/notes', { page: 'forms', teacher: '이선생', notes: { 's1-A-7': { v: 'ok' } } });
  await call(h, 'POST', '/api/notes', { page: 'forms', teacher: '박선생', notes: { 's1-A-7': { v: 'ok' } } }); // 같은 문항은 새 의견으로
  await call(h, 'POST', '/api/notes', { page: 'bank', teacher: '박선생', notes: { q1: { v: 'ok' } } });
  assert.equal(store.files.size, 3);
  const res = await call(h, 'GET', '/api/notes?page=forms');
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.teachers.map((t) => [t.teacher, t.notes['s1-A-7'].v]).sort(), [['박선생', 'ok'], ['이선생', 'ok']]);
  assert.ok(res.body.teachers.every((t) => typeof t.at === 'string'));
});

test('notesHandler: 잘못된 요청은 400, 다른 방식은 405', async () => {
  const h = notesHandler(memoryStore());
  assert.equal((await call(h, 'POST', '/api/notes', { page: 'forms', teacher: '' })).statusCode, 400);
  assert.equal((await call(h, 'GET', '/api/notes?page=nope')).statusCode, 400);
  assert.equal((await call(h, 'DELETE', '/api/notes')).statusCode, 405);
});

test('notesHandler: 보낸 문항만 합치고(다른 기기 의견은 남는다), 빈 의견은 지운다', async () => {
  const store = memoryStore();
  const h = notesHandler(store);
  await call(h, 'POST', '/api/notes', { page: 'forms', teacher: '박선생', notes: { a: { v: 'fix', memo: '폰에서' }, b: { v: 'ok' } } });
  await call(h, 'POST', '/api/notes', { page: 'forms', teacher: '박선생', notes: { c: { v: 'ok' }, b: { v: '', memo: '' } } });
  const [t] = (await call(h, 'GET', '/api/notes?page=forms')).body.teachers;
  assert.deepEqual(t.notes, { a: { v: 'fix', memo: '폰에서' }, c: { v: 'ok', memo: '' } });
});

test('notesHandler: 한 화면에 선생님 50분까지, 망가진 파일은 건너뛴다', async () => {
  const store = memoryStore();
  const h = notesHandler(store);
  for (let i = 0; i < 50; i++) await call(h, 'POST', '/api/notes', { page: 'bank', teacher: `선생${i}`, notes: {} });
  assert.equal((await call(h, 'POST', '/api/notes', { page: 'bank', teacher: '새선생', notes: {} })).statusCode, 400);
  assert.equal((await call(h, 'POST', '/api/notes', { page: 'bank', teacher: '선생3', notes: { q: { v: 'ok' } } })).statusCode, 200); // 있던 분은 계속
  store.files.set('notes/bank/zz.json', '{깨짐');
  const res = await call(h, 'GET', '/api/notes?page=bank');
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.teachers.length, 50);
});
