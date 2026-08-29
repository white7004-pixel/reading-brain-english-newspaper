const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="reviews"'), 'reviews 섹션 id 없음');
assert(html.includes('review-shot-grid'), '후기 캡처 그리드 없음');
assert((html.match(/class="gallery-item review-shot"/g) || []).length === 12, '후기 캡처 이미지가 12개가 아님');
assert(html.includes('네이버플레이스 방문자 리뷰 캡처'), '네이버플레이스 캡처 alt 표기 없음');
assert(html.includes('방문자 블로그 후기 캡처'), '블로그 캡처 alt 표기 없음');

console.log('PASS: check-task7');
