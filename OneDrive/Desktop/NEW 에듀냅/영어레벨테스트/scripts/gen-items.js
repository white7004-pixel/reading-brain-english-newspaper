// 문항 초안 만들기:  npm run gen -- <영역> <단계> [단원당 개수]
// 예) npm run gen -- grammar 11      .env.local 에 ANTHROPIC_API_KEY 가 있어야 한다. 만든 문항은 '검수 전' 으로 들어간다.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { askJson } from '../lib/claude.js';
import { genRequest, toItems, parseWordsCsv, wordsFor } from '../lib/gen.js';
import { SECTIONS, stepData, labelOf } from '../public/core/scale.js';

const ROOT = path.join(import.meta.dirname, '..');
const BANK = path.join(ROOT, 'public', 'data', 'items.json');
const [section, stepArg, countArg] = process.argv.slice(2);
const step = Number(stepArg);
const count = Number(countArg) || 4;

if (!SECTIONS.includes(section) || !Number.isInteger(step)) {
  console.error('사용법: npm run gen -- <vocab|grammar|reading|listening> <9~20> [단원당 개수]');
  process.exit(1);
}
stepData(step); // 척도에 없는 단계면 여기서 멈춘다
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY 가 없습니다. .env.local 에 넣은 뒤 다시 실행하세요. 문항은 만들지 않았습니다.');
  process.exit(1);
}

let words = [];
if (section === 'vocab') {
  try {
    words = parseWordsCsv(await readFile(path.join(ROOT, 'data', 'words.csv'), 'utf8'));
  } catch {
    console.error('data/words.csv 가 없습니다. 능률 단어 목록(book,day,word,meaning)을 넣어 주세요.');
    process.exit(1);
  }
}

const bank = JSON.parse(await readFile(BANK, 'utf8').catch(() => '[]'));
for (const unit of [1, 2, 3, 4]) {
  const have = bank.filter((i) => i.section === section && i.step === step && i.unit === unit && i.status !== 'rejected').length;
  if (have >= count) { console.log(`${unit}단원: 이미 ${have}개 — 건너뜀`); continue; }
  const unitWords = section === 'vocab' ? wordsFor(words, stepData(step).vocab[unit - 1].src) : [];
  const json = await askJson(genRequest({ section, step, unit, count: count - have, words: unitWords }));
  const items = toItems(json, { section, step, unit }, () => `${section}-${step}-${unit}-${randomUUID().slice(0, 8)}`);
  bank.push(...items);
  await writeFile(BANK, JSON.stringify(bank, null, 1)); // 단원마다 저장해 도중에 멈춰도 남는다
  console.log(`${labelOf(step)} ${unit}단원: ${items.length}개 추가 (검수 전)`);
}
