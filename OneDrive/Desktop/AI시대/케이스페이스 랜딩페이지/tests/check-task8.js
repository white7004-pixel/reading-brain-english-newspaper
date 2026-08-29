const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="location"'), 'location 섹션 id 없음');
assert(html.includes('광덕3로 178'), 'location에 주소 없음');
assert(html.includes('<iframe'), 'location에 지도 iframe 없음');

assert(html.includes('id="faq"'), 'faq 섹션 id 없음');
const faqJsonMatch = html.match(/"@type": "FAQPage"[\s\S]*?"mainEntity": (\[[\s\S]*?\])\s*}\s*<\/script>/);
assert(faqJsonMatch, 'FAQPage JSON-LD 파싱 실패');
const faqQuestions = JSON.parse(faqJsonMatch[1]).map(q => q.name);
faqQuestions.forEach(q => assert(html.includes(q), `FAQ 화면에 "${q}" 질문 텍스트 없음 (JSON-LD와 불일치)`));
assert((html.match(/class="faq-item"/g) || []).length === 6, 'FAQ 아코디언 항목이 6개가 아님');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('initFaqAccordion'), 'script.js에 아코디언 함수 없음');

console.log('PASS: check-task8');
