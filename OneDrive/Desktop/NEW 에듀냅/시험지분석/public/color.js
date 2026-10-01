// 학원 대표색. 로고에서 뽑거나 색판에서 고른다.
// 캔버스에 의존하지 않도록 "픽셀 줄 → 색" 부분만 따로 뒀다 (test/logo-color.test.js 가 여기를 본다).

const 기본 = '#0B2C46'; // 리딩브레인 네이비

// 고를 수 있는 색판. 리포트·슬라이드의 바탕과 포인트가 모두 이 색에서 나온다.
export const PALETTE = [
  ['네이비', '#0B2C46'],
  ['버건디', '#7D1D1E'],
  ['딥그린', '#03392A'],
  ['차콜', '#23272E'],
  ['인디고', '#2B3A67'],
  ['브라운', '#4A2F21'],
  ['틸', '#115E59'],
  ['플럼', '#4C1D47'],
];

const hex = (r, g, b) => `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`.toUpperCase();

// 로고에서 대표색 하나를 고른다. 받는 것은 캔버스가 준 RGBA 줄이다.
// 바탕(거의 흰색)·글자(거의 검정)·투명한 자리는 세지 않고, 비슷한 색은 한 덩어리로 묶는다.
export function pickBrandColor(data) {
  const 덩어리 = new Map(); // 16단계로 뭉갠 색 → { n, r, g, b }
  for (let i = 0; i + 3 < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 128) continue;                                   // 투명한 자리
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max > 240 && min > 240) continue;                    // 거의 흰색 — 바탕
    if (max < 24) continue;                                  // 거의 검정 — 글자·테두리
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;             // 16단계로 묶는다
    const cur = 덩어리.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    덩어리.set(key, { n: cur.n + 1, r: cur.r + r, g: cur.g + g, b: cur.b + b });
  }
  let 으뜸 = null;
  for (const v of 덩어리.values()) if (!으뜸 || v.n > 으뜸.n) 으뜸 = v;
  return 으뜸 ? hex(으뜸.r / 으뜸.n, 으뜸.g / 으뜸.n, 으뜸.b / 으뜸.n) : 기본;
}
