import test from 'node:test';
import assert from 'node:assert/strict';
import { pickBrandColor, PALETTE } from '../public/color.js';

// 로고 그림을 캔버스로 읽은 RGBA 줄(한 픽셀 4칸)에서 학원 대표색을 고른다.
const px = (list) => Uint8ClampedArray.from(list.flatMap(([r, g, b, a = 255]) => [r, g, b, a]));

test('로고에서 가장 많이 쓰인 또렷한 색을 고른다', () => {
  // 흰 바탕이 가장 많지만 바탕은 세지 않는다. 남색 셋 · 빨강 둘 → 남색
  const 남색 = [11, 44, 70];
  const 빨강 = [160, 30, 30];
  assert.equal(pickBrandColor(px([
    [255, 255, 255], [255, 255, 255], [255, 255, 255], [250, 250, 248],
    남색, 남색, 남색, 빨강, 빨강,
  ])), '#0B2C46');
});

test('투명한 자리와 거의 흰·검은 자리는 세지 않는다', () => {
  const 초록 = [3, 57, 42];
  assert.equal(pickBrandColor(px([
    [11, 44, 70, 0], [11, 44, 70, 10], // 투명 — 안 센다
    [8, 8, 8], [252, 252, 252], // 거의 검정·흰색 — 안 센다
    초록, 초록,
  ])), '#03392A');
});

test('고를 색이 없으면 리딩브레인 네이비로 둔다', () => {
  assert.equal(pickBrandColor(px([[255, 255, 255], [0, 0, 0]])), '#0B2C46');
  assert.equal(pickBrandColor(new Uint8ClampedArray(0)), '#0B2C46');
});

test('비슷한 색은 한 덩어리로 센다 — 로고가 그라데이션이어도 흩어지지 않는다', () => {
  // 남색 언저리 넷 vs 정확히 같은 빨강 셋 → 남색 덩어리가 이긴다
  assert.match(pickBrandColor(px([
    [11, 44, 70], [13, 46, 72], [10, 42, 68], [12, 45, 71],
    [160, 30, 30], [160, 30, 30], [160, 30, 30],
  ])), /^#0[AB-D]/i);
});

test('고를 수 있는 색판이 함께 온다', () => {
  assert.ok(PALETTE.length >= 6);
  PALETTE.forEach(([name, hex]) => {
    assert.ok(name.length, '이름이 있다');
    assert.match(hex, /^#[0-9A-F]{6}$/, hex);
  });
});
