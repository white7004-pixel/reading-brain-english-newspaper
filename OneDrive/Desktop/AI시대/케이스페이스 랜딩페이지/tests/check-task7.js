const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="reviews"'), 'reviews 섹션 id 없음');
assert((html.match(/class="review-card(?:\s[^"]*)?"/g) || []).length === 5, '후기 카드가 5개가 아님');
assert(html.includes('네이버플레이스 방문자 리뷰'), '네이버플레이스 출처 표기 없음');
assert(html.includes('방문자 블로그 후기'), '블로그 출처 표기 없음');
assert(html.includes('스터디카페 유목민이었던 취준생'), '실제 후기 원문 1 누락');
assert(html.includes('7개월 동안 이용한 공유오피스'), '실제 블로그 후기 원문 누락');

console.log('PASS: check-task7');
