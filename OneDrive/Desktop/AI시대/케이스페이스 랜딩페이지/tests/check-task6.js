const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="events"'), 'events 섹션 id 없음');
['3개월', '6개월', '12개월', '친구초대', '네이버 리뷰'].forEach(w => assert(html.includes(w), `events에 ${w} 없음`));

assert(html.includes('id="gallery"'), 'gallery 섹션 id 없음');
for (let i = 1; i <= 10; i++) {
  const name = `assets/images/kspace-${String(i).padStart(2, '0')}.jpg`;
  assert(html.includes(name), `gallery에 ${name} 없음`);
}
assert((html.match(/class="gallery-item"/g) || []).length === 10, 'gallery-item이 10개가 아님');
// alt 텍스트가 전부 동일한 제네릭 문구가 아닌지 확인 (최소한의 다양성 체크)
const alts = [...html.matchAll(/class="gallery-item"[\s\S]*?alt="([^"]+)"/g)].map(m => m[1]);
assert(new Set(alts).size >= 5, '갤러리 alt 텍스트가 지나치게 획일적임(서술형으로 다양화 필요)');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('initGalleryLightbox'), 'script.js에 라이트박스 함수 없음');

console.log('PASS: check-task6');
