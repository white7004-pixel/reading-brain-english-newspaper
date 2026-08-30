const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="location"'), 'location 섹션 id 없음');
assert(html.includes('광덕3로 178'), 'location에 주소 없음');
// 모바일에서 구글맵 embed(output=embed)가 깨지는 문제로 iframe 대신 지도앱 길찾기 링크로 대체함
assert(html.includes('location-map-card'), 'location에 지도 링크 카드 없음');
assert(html.includes('map.naver.com'), 'location에 네이버지도 링크 없음');
assert(html.includes('google.com/maps/search'), 'location에 구글지도 링크 없음');

assert(html.includes('id="faq"'), 'faq 섹션 id 없음');
const faqJsonMatch = html.match(/"@type": "FAQPage"[\s\S]*?"mainEntity": (\[[\s\S]*?\])\s*}\s*<\/script>/);
assert(faqJsonMatch, 'FAQPage JSON-LD 파싱 실패');
const faqQuestions = JSON.parse(faqJsonMatch[1]).map(q => q.name);
faqQuestions.forEach(q => assert(html.includes(q), `FAQ 화면에 "${q}" 질문 텍스트 없음 (JSON-LD와 불일치)`));
assert((html.match(/class="faq-item"/g) || []).length === 6, 'FAQ 아코디언 항목이 6개가 아님');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('initFaqAccordion'), 'script.js에 아코디언 함수 없음');

console.log('PASS: check-task8');
