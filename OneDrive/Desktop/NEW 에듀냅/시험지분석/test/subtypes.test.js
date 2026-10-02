import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS, SOURCES } from '../public/lib.js';
import { LEVELS, SUBTYPES, SOURCES_BY_LEVEL, levelOf, subtypesFor, sourcesFor } from '../public/subtypes.js';

// 세부유형은 손으로 적던 칸이었다. 중등·고등이 실제로 다르게 나오므로 학교급으로 가른다
// (2026-10-02 원장 결정). 목록이 있으면 문항표를 채우는 시간이 크게 준다.

test('학년에서 학교급을 읽는다', () => {
  assert.equal(levelOf('중1'), '중등');
  assert.equal(levelOf('중3'), '중등');
  assert.equal(levelOf('고1'), '고등');
  assert.equal(levelOf('고3'), '고등');
  assert.equal(levelOf('초6'), '중등', '모르는 학년은 중등으로 둔다');
  assert.equal(levelOf(''), '중등');
  assert.equal(levelOf(undefined), '중등');
});

test('과목마다 두 학교급이 다 있다', () => {
  for (const 과목 of Object.keys(SUBJECTS)) {
    assert.ok(SUBTYPES[과목], `${과목} 이 없다`);
    for (const 급 of LEVELS) assert.ok(SUBTYPES[과목][급], `${과목} ${급} 이 없다`);
  }
});

test('영역 이름은 SUBJECTS 와 똑같다 — 통계가 영역으로 묶이기 때문', () => {
  for (const [과목, 영역들] of Object.entries(SUBJECTS)) {
    for (const 급 of LEVELS) {
      const 적힌 = Object.keys(SUBTYPES[과목][급]);
      for (const a of 적힌) assert.ok(영역들.includes(a), `${과목} ${급}: SUBJECTS 에 없는 영역 "${a}"`);
      for (const a of 영역들) assert.ok(적힌.includes(a), `${과목} ${급}: 영역 "${a}" 가 빠졌다`);
    }
  }
});

test('목록이 비어 있지 않고 겹치는 말이 없다', () => {
  for (const 과목 of Object.keys(SUBJECTS)) {
    for (const 급 of LEVELS) {
      for (const [영역, 목록] of Object.entries(SUBTYPES[과목][급])) {
        assert.ok(Array.isArray(목록), `${과목} ${급} ${영역} 이 배열이 아니다`);
        assert.ok(목록.length >= 2, `${과목} ${급} ${영역} 이 ${목록.length}개뿐이다`);
        assert.equal(new Set(목록).size, 목록.length, `${과목} ${급} ${영역} 에 같은 말이 두 번 있다`);
        for (const t of 목록) assert.ok(t.trim() && t.length <= 24, `${과목} ${급} ${영역}: "${t}" 가 비었거나 너무 길다`);
      }
    }
  }
});

test('영어는 중등과 고등이 실제로 다르다', () => {
  const 중 = SUBTYPES.영어.중등.독해;
  const 고 = SUBTYPES.영어.고등.독해;
  assert.notDeepEqual(중, 고);
  assert.ok(고.some((t) => t.includes('빈칸추론')), '고등 독해에 빈칸추론이 없다');
  assert.ok(고.some((t) => t.includes('함의')), '고등 독해에 함의 추론이 없다');
  assert.ok(중.some((t) => t.includes('본문')), '중등 독해에 교과서 본문 유형이 없다');
});

test('수학은 영역은 같고 단원이 갈린다', () => {
  assert.ok(SUBTYPES.수학.중등['수와 연산'].some((t) => t.includes('소인수분해')));
  assert.ok(SUBTYPES.수학.고등['수와 연산'].some((t) => t.includes('복소수')));
  assert.ok(!SUBTYPES.수학.중등['수와 연산'].some((t) => t.includes('복소수')));
});

test('출처는 고등에만 모의고사와 EBS 가 있다', () => {
  assert.ok(SOURCES_BY_LEVEL.고등.includes('모의고사'));
  assert.ok(SOURCES_BY_LEVEL.고등.includes('EBS'));
  assert.ok(!SOURCES_BY_LEVEL.중등.includes('모의고사'));
  assert.ok(!SOURCES_BY_LEVEL.중등.includes('EBS'));
  // 통계는 SOURCES 차례대로 묶으므로 거기에 없는 출처를 쓰면 표에서 사라진다
  for (const 급 of LEVELS) for (const s of SOURCES_BY_LEVEL[급]) assert.ok(SOURCES.includes(s), `SOURCES 에 없는 출처 "${s}"`);
  assert.deepEqual(sourcesFor('고2'), SOURCES_BY_LEVEL.고등);
  assert.deepEqual(sourcesFor('중2'), SOURCES_BY_LEVEL.중등);
});

test('골라 쓸 목록을 과목·학년·영역으로 돌려준다', () => {
  const 목록 = subtypesFor('영어', '중2', '어법');
  assert.ok(목록.length > 3);
  assert.ok(목록.includes('시제'));
  assert.deepEqual(subtypesFor('영어', '중2', '없는영역'), []);
  assert.deepEqual(subtypesFor('없는과목', '중2', '어법'), []);
  assert.deepEqual(subtypesFor('영어', '', ''), []);
});

test('고등 영어 어법에는 네모 어법이 있고 중등에는 없다', () => {
  assert.ok(SUBTYPES.영어.고등.어법.some((t) => t.includes('네모')));
  assert.ok(!SUBTYPES.영어.중등.어법.some((t) => t.includes('네모')));
});
