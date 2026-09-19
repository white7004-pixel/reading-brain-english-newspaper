// npm install 때 pdf.js 를 public/vendor/pdfjs 로 복사한다 (postinstall). 버전은 package.json 에 고정.
// 외부 서버에서 매번 불러오지 않고 우리 주소에서 내보내기 위해서다. 복사본은 git 에 넣지 않는다.
import { cp, rm } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(import.meta.dirname, '..');
const from = path.join(root, 'node_modules', 'pdfjs-dist');
const to = path.join(root, 'public', 'vendor', 'pdfjs');

await rm(to, { recursive: true, force: true });
for (const f of ['build/pdf.min.mjs', 'build/pdf.worker.min.mjs', 'wasm', 'cmaps', 'standard_fonts', 'LICENSE']) {
  await cp(path.join(from, f), path.join(to, path.basename(f)), { recursive: true });
}
console.log('pdf.js →', path.relative(root, to));
