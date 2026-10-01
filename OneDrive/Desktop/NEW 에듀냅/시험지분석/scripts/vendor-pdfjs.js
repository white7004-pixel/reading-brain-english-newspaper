// npm install 때 pdf.js 와 rhwp(한글) 를 public/vendor 로 복사한다 (postinstall). 버전은 package.json 에 고정.
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

// 한글(.hwp·.hwpx) 을 쪽 그림으로 그리는 wasm. 한글 파일을 올릴 때만 불러온다.
const hwpTo = path.join(root, 'public', 'vendor', 'rhwp');
await rm(hwpTo, { recursive: true, force: true });
for (const f of ['rhwp.js', 'rhwp_bg.wasm', 'LICENSE']) {
  await cp(path.join(root, 'node_modules', '@rhwp', 'core', f), path.join(hwpTo, f));
}
console.log('rhwp →', path.relative(root, hwpTo));
