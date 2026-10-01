import test from 'node:test';
import assert from 'node:assert/strict';
import { ACADEMY } from '../public/core/academy.js';

test('학원 정보는 리딩브레인영어학원으로 고정 (로고 포함)', () => {
  assert.equal(ACADEMY.name, '리딩브레인영어학원');
  assert.equal(ACADEMY.phone, '02-2135-8311');
  assert.equal(ACADEMY.logo, 'brand/rb-mark.png');
});
