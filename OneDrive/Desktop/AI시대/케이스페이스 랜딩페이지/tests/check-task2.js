const fs = require('fs');
const assert = require('assert');

const css = fs.readFileSync('styles.css', 'utf8');
['--color-mint', '--color-teal', '--color-navy', '--color-bg', '.container', '.btn', '.btn--primary', '.section__title'].forEach(token => {
  assert(css.includes(token), `styles.css에 ${token} 없음`);
});

const html = fs.readFileSync('index.html', 'utf8');
assert(/href="styles\.css(\?[^"]*)?"/.test(html), 'index.html이 styles.css를 링크하지 않음');
assert(html.includes('src="script.js"'), 'index.html이 script.js를 링크하지 않음');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('navToggle'), 'script.js에 모바일 내비 토글 로직 없음');

console.log('PASS: check-task2');
