const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('class="hero"'), 'hero 섹션 없음');
assert(html.includes('안산공유오피스'), 'hero에 안산공유오피스 키워드 없음');
assert(html.includes('안산스터디카페'), 'hero에 안산스터디카페 키워드 없음');
assert(html.includes('hero__slideshow'), 'hero 슬라이드쇼 컨테이너 없음');

const heroImages = ['kspace-01.jpg', 'kspace-06.jpg', 'kspace-03.jpg', 'kspace-04.jpg', 'kspace-07.jpg'];
for (const img of heroImages) {
  assert(html.includes(`assets/images/${img}`), `hero 슬라이드에 ${img} 없음`);
}
assert(html.includes('naver.me/x9Jr9zgM'), 'hero CTA에 네이버예약 링크 없음');

const css = fs.readFileSync('styles.css', 'utf8');
assert(css.includes('.hero'), 'styles.css에 .hero 스타일 없음');
assert(css.includes('.hero__slide'), 'styles.css에 .hero__slide 스타일 없음');
assert(css.includes('@keyframes heroFade'), 'styles.css에 heroFade 키프레임 없음');
assert(css.includes('prefers-reduced-motion'), '모션 최소화 대응(prefers-reduced-motion) 없음');

console.log('PASS: check-task4');
