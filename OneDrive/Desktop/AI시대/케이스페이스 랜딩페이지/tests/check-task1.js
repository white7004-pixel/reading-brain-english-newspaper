const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('<title>케이스페이스 오피스앤스터디 | 안산공유오피스·안산스터디카페'), 'title에 핵심 키워드 누락');
assert(html.includes('안산공유오피스') , 'meta description에 안산공유오피스 키워드 누락');
assert(html.includes('안산스터디카페'), 'meta description에 안산스터디카페 키워드 누락');
assert(html.match(/<script type="application\/ld\+json">/g).length === 3, 'JSON-LD 스크립트가 3개(Organization, LocalBusiness, FAQPage)가 아님');

const ldJsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const organization = ldJsonBlocks.find(b => b['@type'] === 'Organization');
assert(organization, 'Organization JSON-LD 없음');
assert(organization.logo === 'https://www.kspace.ai.kr/assets/logo/kspace-logo.png', 'Organization logo 불일치');

const localBusiness = ldJsonBlocks.find(b => b['@type'] === 'LocalBusiness');
assert(localBusiness, 'LocalBusiness JSON-LD 없음');
assert(localBusiness.telephone === '+82-10-2646-0326', 'LocalBusiness 전화번호 불일치');
assert(localBusiness.address.streetAddress.includes('광덕3로 178'), 'LocalBusiness 주소 불일치');

const faqPage = ldJsonBlocks.find(b => b['@type'] === 'FAQPage');
assert(faqPage, 'FAQPage JSON-LD 없음');
assert(faqPage.mainEntity.length === 6, 'FAQ 문항이 6개가 아님');

const markers = ['SECTION:HERO','SECTION:SERVICES','SECTION:FACILITIES','SECTION:EVENTS','SECTION:GALLERY','SECTION:REVIEWS','SECTION:LOCATION','SECTION:FAQ'];
markers.forEach(m => assert(html.includes(`<!-- ${m} -->`), `마커 ${m} 없음`));

const robots = fs.readFileSync('robots.txt', 'utf8');
assert(robots.includes('Sitemap: https://www.kspace.ai.kr/sitemap.xml'), 'robots.txt에 sitemap 참조 없음');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
assert(sitemap.includes('https://www.kspace.ai.kr/'), 'sitemap.xml에 홈 URL 없음');

console.log('PASS: check-task1');
