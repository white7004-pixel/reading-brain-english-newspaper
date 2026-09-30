import test from 'node:test';
import assert from 'node:assert/strict';
import 국어 from '../public/curriculum/국어.js';
import 영어 from '../public/curriculum/영어.js';
import 수학 from '../public/curriculum/수학.js';

const 과목자료 = [국어, 영어, 수학];

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
import { areasFor, unitsFor, pointsFor, grammarFor, GRADES } from '../public/curriculum.js';
import 영어문법 from '../public/curriculum/영어문법.js';

test('학년으로 영역·단원 후보·세부 포인트를 찾는다', () => {
  assert.deepEqual(GRADES, ['중1', '중2', '중3', '고1', '고2', '고3']);
  assert.ok(areasFor('국어', '중2').includes('문법'));
  assert.ok(areasFor('국어', '고1').includes('매체'));
  // 교과서 목차를 받기 전에는 단원 후보가 없다 (영역을 단원인 척 주지 않는다)
  assert.deepEqual(unitsFor('국어', '중2'), []);
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

test('영어도 여섯 학년이 다 걸리고 받은 만큼 다 들어 있다', () => {
  for (const 학년 of GRADES) assert.ok(areasFor('영어', 학년).length, 학년);
  assert.deepEqual(areasFor('영어', '중2'), ['이해', '표현']);
  // 고2·3 은 영어Ⅰ·Ⅱ(이해·표현)와 영어 독해와 작문(독해·작문)이 겹친다
  assert.deepEqual(areasFor('영어', '고3'), ['이해', '표현', '독해', '작문']);
  const 수 = (이름) => 영어.과정.find((c) => c.이름 === 이름).영역.reduce((n, d) => n + d.성취기준.length, 0);
  assert.equal(수('중학교 영어'), 21);
  assert.equal(수('공통영어1'), 16);
  assert.equal(수('공통영어2'), 17);
  assert.equal(수('영어 I'), 16);
  assert.equal(수('영어 Ⅱ'), 17);
  assert.equal(수('영어 독해와 작문'), 17);
});

test('영어 문법표는 출처가 학원분류이고 항목이 겹치지 않는다', () => {
  assert.match(영어문법.출처, /\[학원분류\]/);
  const 항목 = 영어문법.묶음.flatMap((g) => g.항목);
  assert.equal(new Set(항목).size, 항목.length, '같은 문법 항목이 두 번 있다');
  for (const 묶음 of 영어문법.묶음) {
    assert.ok(묶음.이름.trim() && 묶음.항목.length, 묶음.이름);
    assert.ok(묶음.학년대.every((g) => GRADES.includes(g)), 묶음.이름);
  }
});

test('학년으로 문법 항목을 찾는다', () => {
  for (const 학년 of GRADES) assert.ok(grammarFor(학년).length, 학년);
  assert.ok(grammarFor('중3').includes('관계대명사 who·which·that'));
  assert.ok(!grammarFor('중1').includes('가정법 과거'), '중1 에 가정법이 나오면 안 된다');
  assert.ok(grammarFor('고2').includes('부정어 도치'));
  assert.deepEqual(grammarFor('초5'), []);
});

test('수학도 여섯 학년이 다 걸리고 받은 만큼 다 들어 있다', () => {
  for (const 학년 of GRADES) assert.ok(areasFor('수학', 학년).length, 학년);
  assert.deepEqual(areasFor('수학', '중2'), ['수와 연산', '변화와 관계', '도형과 측정', '자료와 가능성']);
  assert.ok(areasFor('수학', '고2').includes('미분'));
  // '경우의 수' 는 고1 공통수학1 에도 고2 확률과 통계에도 있다. 학년이 다르면 따로 센다.
  assert.ok(areasFor('수학', '고1').includes('경우의 수'));
  assert.ok(areasFor('수학', '고3').includes('경우의 수'));
  const 수 = (이름) => 수학.과정.find((c) => c.이름 === 이름).영역.reduce((n, d) => n + d.성취기준.length, 0);
  assert.equal(수('중학교 수학'), 60);
  assert.equal(수('공통수학1'), 19);
  assert.equal(수('공통수학2'), 20);
  assert.equal(수('대수'), 18);
  assert.equal(수('미적분Ⅰ'), 20);
  assert.equal(수('확률과 통계'), 16);
});

test('세 과목을 합쳐 받은 성취기준 수가 맞는다', () => {
  const 전체 = 과목자료.reduce((n, 자료) =>
    n + 자료.과정.reduce((m, c) => m + c.영역.reduce((k, d) => k + d.성취기준.length, 0), 0), 0);
  assert.equal(전체, 122 + 104 + 153);
});
