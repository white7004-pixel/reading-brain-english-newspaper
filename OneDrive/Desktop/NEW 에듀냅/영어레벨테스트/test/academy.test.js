import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_ACADEMY, academyOf, logoOf } from '../public/core/academy.js';

test('학원 정보: 저장한 것이 없으면 리딩브레인영어학원', () => {
  assert.equal(academyOf(null).name, '리딩브레인영어학원');
  assert.equal(academyOf({}).phone, DEFAULT_ACADEMY.phone);
  assert.equal(academyOf({ name: '다른학원' }).name, '다른학원');
});

test('로고: 그림 데이터나 기본 로고 경로만, 리딩브레인이면 기본 로고로 채움', () => {
  assert.equal(logoOf({ name: '다른학원', logo: 'data:image/png;base64,AA' }), 'data:image/png;base64,AA');
  assert.equal(logoOf({ name: '리딩브레인영어학원' }), 'brand/rb-mark.png');
  assert.equal(logoOf({ name: '다른학원' }), '');
  assert.equal(logoOf({ name: '다른학원', logo: 'javascript:alert(1)' }), '');
});
