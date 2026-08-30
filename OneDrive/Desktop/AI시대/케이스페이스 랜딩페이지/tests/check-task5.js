const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="services"'), 'services 섹션 id 없음');
assert(html.includes('id="facilities"'), 'facilities 섹션 id 없음');
['공유오피스', '스터디룸', '비상주사무실'].forEach(word => assert(html.includes(word), `services에 ${word} 없음`));
['지문인식', '미팅룸 무료 이용', '아이파킹', '무인택배함'].forEach(word => assert(html.includes(word), `facilities에 ${word} 없음`));

console.log('PASS: check-task5');
