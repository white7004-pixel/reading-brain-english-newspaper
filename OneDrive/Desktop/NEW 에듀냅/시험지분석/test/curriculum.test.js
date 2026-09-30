import test from 'node:test';
import assert from 'node:assert/strict';
import 국어 from '../public/curriculum/국어.js';

const 과목자료 = [국어];

test('자료는 정해진 모양을 지킨다', () => {
  for (const 자료 of 과목자료) {
    assert.ok(자료.과목, '과목');
    assert.match(자료.출처, /2022 개정 교육과정/);
    assert.match(자료.받은날, /^\d{4}-\d{2}-\d{2}$/);
    assert.deepEqual(자료.교과서, []); // 목차를 받기 전에는 비어 있다
    assert.ok(자료.과정.length >= 6, `${자료.과목} 과정 수`);
    for (const 과정 of 자료.과정) {
      assert.ok(과정.id && 과정.이름, 과정.id);
      assert.ok(과정.학년.length, `${과정.이름} 학년`);
      assert.ok(과정.영역기준.trim(), `${과정.이름} 영역기준`);
      assert.ok(과정.영역.length, `${과정.이름} 영역`);
      for (const 영역 of 과정.영역) {
        assert.ok(영역.이름.trim(), `${과정.이름} 영역 이름`);
        // 선택 과목의 domainKorean 은 영역명이 아니라 잘린 총괄 문장이다. 그것이 새어 들어오면 안 된다.
        assert.ok(영역.이름.length <= 20, `${과정.이름} 영역 이름이 너무 길다: ${영역.이름}`);
        assert.ok(영역.성취기준.length, `${과정.이름} ${영역.이름} 성취기준`);
        for (const 기준 of 영역.성취기준) {
          assert.match(기준.코드, /^\[.+\]$/, 기준.코드);
          assert.ok(기준.요약.trim().length > 5, 기준.코드);
        }
      }
    }
  }
});

test('성취기준 코드는 파일 안에서 겹치지 않는다', () => {
  for (const 자료 of 과목자료) {
    const 코드 = 자료.과정.flatMap((c) => c.영역.flatMap((d) => d.성취기준.map((s) => s.코드)));
    assert.equal(new Set(코드).size, 코드.length, `${자료.과목} 코드 중복`);
  }
});

test('여섯 학년이 모두 어느 과정엔가 걸린다', () => {
  for (const 자료 of 과목자료) {
    for (const 학년 of ['중1', '중2', '중3', '고1', '고2', '고3']) {
      assert.ok(자료.과정.some((c) => c.학년.includes(학년)), `${자료.과목} ${학년}`);
    }
  }
});

test('국어 성취기준을 받은 만큼 다 넣었다', () => {
  const 수 = (이름) => 국어.과정.find((c) => c.이름 === 이름).영역.reduce((n, d) => n + d.성취기준.length, 0);
  assert.equal(수('중학교 국어'), 51);
  assert.equal(수('공통국어1'), 14);
  assert.equal(수('공통국어2'), 15);
  assert.equal(수('화법과 언어'), 15);
  assert.equal(수('독서와 작문'), 15);
  assert.equal(수('문학'), 12);
});

// ---------- 조회 층 ----------
import { areasFor, unitsFor, pointsFor, GRADES } from '../public/curriculum.js';

test('학년으로 영역·단원 후보·세부 포인트를 찾는다', () => {
  assert.deepEqual(GRADES, ['중1', '중2', '중3', '고1', '고2', '고3']);
  assert.ok(areasFor('국어', '중2').includes('문법'));
  assert.ok(areasFor('국어', '고1').includes('매체'));
  // 교과서 목차가 없으면 단원 후보는 영역이다
  assert.deepEqual(unitsFor('국어', '중2'), areasFor('국어', '중2'));
  assert.ok(pointsFor('국어', '중2').some((p) => p.includes('음운 체계')));
});

test('한 학년에 과정이 여럿이면 합치되 겹치는 영역은 한 번만 둔다', () => {
  // 고1 은 공통국어1·2 두 과정이고 영역 이름이 같다
  assert.deepEqual(areasFor('국어', '고1'), ['듣기⋅말하기', '읽기', '쓰기', '문법', '문학', '매체']);
  // 고2 는 선택 과목 셋이고 영역이 과목 이름이다
  assert.deepEqual(areasFor('국어', '고2'), ['화법과 언어', '독서와 작문', '문학']);
  assert.ok(pointsFor('국어', '고1').length === 29, '공통국어1 14 + 공통국어2 15');
});

test('모르는 과목·학년은 빈 배열이다', () => {
  assert.deepEqual(areasFor('과학', '중2'), []);
  assert.deepEqual(areasFor('국어', '초5'), []);
  assert.deepEqual(unitsFor('국어', ''), []);
  assert.deepEqual(pointsFor('', '중2'), []);
});
