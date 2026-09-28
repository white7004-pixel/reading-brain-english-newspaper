import test from 'node:test';
import assert from 'node:assert/strict';
import { checkName, parseBooks } from '../public/core/student.js';

test('이름은 성+OO 또는 이니셜만', () => {
  for (const ok of ['김OO', '김○○', '남궁OO', 'KJ', 'j']) assert.equal(checkName(ok), '', ok);
  for (const bad of ['김민수', 'Kim Minsu', '']) assert.notEqual(checkName(bad), '', bad);
});

test('교재 설정: 영역, 시작 학기, 끝 학기, 교재명', () => {
  const { books, problems } = parseBooks('문법, 중2-1, 중3-2, 문법 교재, 2권\n\n단어, 고1-1, 고1-2, 단어장 A');
  assert.deepEqual(problems, []);
  assert.deepEqual(books, { grammar: [{ from: 11, to: 14, name: '문법 교재, 2권' }], vocab: [{ from: 15, to: 16, name: '단어장 A' }] });
  assert.equal(parseBooks('수학, 중1-1, 중1-2, 책').problems.length, 1);
  assert.equal(parseBooks('문법, 중3-1, 중1-1, 책').problems.length, 1);
});
