const fs = require('fs');
const assert = require('assert');

assert(fs.existsSync('assets/logo/kspace-logo.png'), '로고 파일 없음');

for (let i = 1; i <= 10; i++) {
  const name = `assets/images/kspace-${String(i).padStart(2, '0')}.jpg`;
  assert(fs.existsSync(name), `${name} 없음`);
  const sizeKB = fs.statSync(name).size / 1024;
  assert(sizeKB < 500, `${name} 용량이 500KB를 초과함 (${Math.round(sizeKB)}KB) — 리사이즈 필요`);
}

console.log('PASS: check-task3');
