// 실제 영어 시험지 한 벌로 통계를 검사한다.
// 빛가온중학교 2학년 1학기 1차 정기시험 영어 (2026-04-23 2교시, 선택형 21문항 100점, 4쪽).
// 원장님이 가지고 계신 시험지를 쪽마다 읽어 문항표로 옮긴 것이다 — 지문은 담지 않는다.
// 이 시험에는 서술형이 없다 (선택형만 따로 100점). 그런 시험지도 깨지지 않아야 한다.
import test from 'node:test';
import assert from 'node:assert/strict';
import { examStats, nosText } from '../public/lib.js';
import { SUBJECTS } from '../public/lib.js';

const I = (no, points, area, subtype, difficulty) => ({ no, kind: '객관식', points, area, subtype, difficulty, source: '교과서', unit: '', answer: '', reason: '' });

const 빛가온중2 = [
  I(1, 4, '대화문', '대화 흐름 - 빈칸 응답', '중'),
  I(2, 5, '어법', '어법 개수 고르기', '중상'),
  I(3, 6, '어휘', '영영풀이', '중상'),
  I(4, 5, '독해', '내용 추론 - 있는 대로 고르기', '중상'),
  I(5, 4, '어휘', '숙어·표현 - 동사+전치사', '중'),
  I(6, 5, '독해', '답할 수 없는 질문', '중'),
  I(7, 6, '어법', '틀린 것 있는 대로 고르기', '상'),
  I(8, 4, '독해', '목적·심경 - 심경 변화', '중하'),
  I(9, 5, '어법', '바르게 고친 것 고르기', '중상'),
  I(10, 5, '어휘', '영영풀이', '중'),
  I(11, 6, '독해', '요약문 완성', '상'),
  I(12, 5, '독해', '밑줄 의미 추론', '중상'),
  I(13, 5, '독해', '문장 삽입', '중'),
  I(14, 5, '대화문', '대화 내용 이해 - 답할 수 없는 질문', '중'),
  I(15, 4, '어법', 'to부정사 - 용법 구분', '중'),
  I(16, 4, '어휘', '품사·파생어', '하'),
  I(17, 6, '독해', '주제·제목·요지 - 제목', '중상'),
  I(18, 4, '독해', '지칭', '중'),
  I(19, 4, '독해', '빈칸 - 연결어', '중'),
  I(20, 4, '독해', '내용 일치', '중하'),
  I(21, 4, '독해', '주제·제목·요지 - 요지', '중'),
];

test('실제 시험지의 영역이 모두 영어 분류표 안에 있다', () => {
  빛가온중2.forEach((it) => assert.ok(SUBJECTS.영어.includes(it.area), `${it.no}번 ${it.area}`));
});

test('실제 시험지 21문항 100점이 그대로 계산된다', () => {
  const s = examStats(빛가온중2);
  assert.equal(s.count, 21);
  assert.equal(s.total, 100);
  // 서술형이 없는 시험지 — 0 으로 나오고 깨지지 않는다
  assert.equal(s.essayCount, 0);
  assert.equal(s.essayPointsPct, 0);
  assert.deepEqual(s.byKind.map((r) => [r.label, r.count]), [['객관식', 21]]);
  // 영역별: 독해 11 · 어휘 4 · 어법 4 · 대화문 2
  assert.deepEqual(s.byArea.map((r) => [r.label, r.count, r.points]), [
    ['어휘', 4, 19], ['어법', 4, 20], ['대화문', 2, 9], ['독해', 11, 52],
  ]);
});

test('배점 눈금이 학교가 실제로 쓴 배점 세 칸(4·5·6점)과 그대로 맞는다', () => {
  const s = examStats(빛가온중2);
  // 평균 배점 100/21 = 4.76 → 4점은 표준, 5점은 응용, 6점은 고난도.
  // 절대 점수(에스키의 5점 이상=고난도)로 쟀다면 5점 8문항까지 고난도가 되어 과장됐을 것이다.
  assert.deepEqual(s.byWeight.map((r) => [r.label, r.count, r.points]), [
    ['표준', 9, 36], ['응용', 8, 40], ['고난도', 4, 24],
  ]);
  assert.deepEqual(s.byPoints.map((r) => [r.points, r.count]), [[6, 4], [5, 8], [4, 9]]);
  // 고난도 네 문항 번호가 분석 글에 그대로 들어간다
  assert.equal(nosText(s.byWeight[2].nos), '3, 7, 11, 17');
});
