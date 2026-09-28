// 화면 확인용 가짜 문항: 영역 × 단계 × 단원마다 2개.   npm run sample
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { SCALE, SECTIONS, SECTION_KO, labelOf, unitName } from '../public/core/scale.js';

const items = [];
for (const section of SECTIONS) for (const { step } of SCALE) for (const unit of [1, 2, 3, 4]) for (const n of [1, 2]) {
  const answer = (step + unit + n) % 4;
  const choices = ['오답 가', '오답 나', '오답 다', '오답 라'];
  choices[answer] = '정답';
  items.push({
    id: `sample-${section}-${step}-${unit}-${n}`, section, step, unit, kind: '샘플', sample: true, status: 'ok',
    passage: section === 'reading' ? `This is a sample passage for ${labelOf(step)}, unit ${unit}. Choose the answer marked 정답.`
      : section === 'listening' ? `W: This is a sample dialogue for unit ${unit}.\nM: Great. Choose the answer marked 정답.` : '',
    question: `[샘플] ${labelOf(step)} ${SECTION_KO[section]} ${unit}단원 · ${unitName(section, step, unit)}`,
    choices, answer, explain_ko: '화면 확인용 샘플 문항',
  });
}
await writeFile(path.join(import.meta.dirname, '..', 'public', 'data', 'items.sample.json'), JSON.stringify(items, null, 1));
console.log(`샘플 문항 ${items.length}개`);
