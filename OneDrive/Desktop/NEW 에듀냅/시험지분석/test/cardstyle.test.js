import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SKINS, COLORS, deckCls, 기본모양, 기본색 } from '../public/cardstyle.js';

// 고를 수 있는 값은 cardstyle.js 에, 실제 색은 cards.css 에 있다.
// 둘이 어긋나면 "고를 수는 있는데 아무것도 안 바뀌는" 칸이 생기므로 여기서 묶어 둔다.
const css = readFileSync(new URL('../public/cards.css', import.meta.url), 'utf8');

test('고른 값은 그대로 클래스가 된다', () => {
  assert.equal(deckCls('band', 'teal'), 'card-news deck band c-teal');
  assert.equal(deckCls('mesh', 'plum'), 'card-news deck mesh c-plum');
});

test('모르는 값이 와도 기본으로 떨어진다', () => {
  assert.equal(deckCls('없는모양', '없는색'), `card-news deck ${기본모양} c-${기본색}`);
  assert.equal(deckCls(undefined, undefined), `card-news deck ${기본모양} c-${기본색}`);
  assert.equal(deckCls('', null), `card-news deck ${기본모양} c-${기본색}`);
});

test('색마다 cards.css 에 짝이 있다', () => {
  for (const c of COLORS) {
    assert.ok(css.includes(`.deck.c-${c.키}`), `${c.키} 색 블록이 cards.css 에 없다`);
    for (const 토큰 of ['--k-ink', '--k-wine', '--k-gold', '--b-navy', '--m1']) {
      const 블록 = css.slice(css.indexOf(`.deck.c-${c.키}`)).split('}')[0];
      assert.ok(블록.includes(토큰), `${c.키} 에 ${토큰} 이 없다`);
    }
  }
});

test('모양마다 cards.css 에 짝이 있다', () => {
  for (const s of SKINS) {
    if (s.키 === 기본모양) continue; // 기본 모양은 .deck 자체가 그 모양이다
    assert.ok(css.includes(`.deck.${s.키} `), `${s.키} 모양 블록이 cards.css 에 없다`);
  }
});

test('모양·색 이름이 비어 있지 않고 겹치지 않는다', () => {
  for (const 목록 of [SKINS, COLORS]) {
    assert.ok(목록.length >= 2);
    assert.equal(new Set(목록.map((x) => x.키)).size, 목록.length);
    assert.ok(목록.every((x) => x.이름.trim()));
  }
  assert.ok(SKINS.every((x) => x.설명.trim()), '모양에는 한 줄 설명이 있어야 고르실 수 있다');
});

test('바탕을 빌려 쓰는 모양은 그 바탕 클래스도 함께 붙는다', () => {
  // '빛' 은 '번지는 색' 의 글씨색을 그대로 쓰고 짜임만 바꾼다.
  assert.equal(deckCls('glow', 'plum'), 'card-news deck mesh glow c-plum');
  for (const s of SKINS) {
    if (!s.바탕) continue;
    assert.ok(SKINS.some((x) => x.키 === s.바탕), `${s.키} 의 바탕 ${s.바탕} 이 목록에 없다`);
  }
});
