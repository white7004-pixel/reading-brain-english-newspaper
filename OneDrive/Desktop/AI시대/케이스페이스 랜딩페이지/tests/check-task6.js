const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="events"'), 'events 섹션 id 없음');
['3개월', '6개월', '12개월', '친구초대', '네이버 리뷰'].forEach(w => assert(html.includes(w), `events에 ${w} 없음`));

assert(html.includes('id="gallery"'), 'gallery 섹션 id 없음');
const galleryImageNumbers = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14];
for (const i of galleryImageNumbers) {
  const name = `assets/images/kspace-${String(i).padStart(2, '0')}.jpg`;
  assert(html.includes(name), `gallery에 ${name} 없음`);
}
assert((html.match(/class="gallery-item"/g) || []).length === galleryImageNumbers.length, `gallery-item이 ${galleryImageNumbers.length}개가 아님`);

['1인실', '2인실', '라운지', '미팅룸', '스낵바', '오픈석'].forEach(room =>
  assert(html.includes(`<span class="gallery-item__label">${room}</span>`), `갤러리에 ${room} 네이밍 라벨 없음`)
);
// alt 텍스트가 전부 동일한 제네릭 문구가 아닌지 확인 (최소한의 다양성 체크)
const alts = [...html.matchAll(/class="gallery-item"[\s\S]*?alt="([^"]+)"/g)].map(m => m[1]);
assert(new Set(alts).size >= 5, '갤러리 alt 텍스트가 지나치게 획일적임(서술형으로 다양화 필요)');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('initGalleryLightbox'), 'script.js에 라이트박스 함수 없음');

console.log('PASS: check-task6');
