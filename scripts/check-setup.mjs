#!/usr/bin/env node
/**
 * scripts/check-setup.mjs
 *
 * 프로젝트 환경 점검 — Claude Code 가 진입 직후 실행해 빠르게 상태를 파악하기 위한 스크립트.
 * 의존성/환경변수/타입체크/빌드 가능 여부를 순서대로 확인합니다.
 *
 * 사용:
 *   node scripts/check-setup.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

const checks = [];
function check(name, fn) {
  try {
    const result = fn();
    checks.push({ name, ok: true, info: result || '' });
  } catch (e) {
    checks.push({ name, ok: false, info: e.message });
  }
}

// 1) Node 버전
check('Node 18 이상', () => {
  const v = process.versions.node.split('.').map(Number);
  if (v[0] < 18) throw new Error(`현재 Node ${process.versions.node} — 18 이상 필요`);
  return `Node ${process.versions.node}`;
});

// 2) 디렉토리 구조
check('client/ 존재', () => {
  if (!existsSync(resolve(ROOT, 'client'))) throw new Error('client 디렉토리 없음');
});
check('server/ 존재', () => {
  if (!existsSync(resolve(ROOT, 'server'))) throw new Error('server 디렉토리 없음');
});

// 3) 의존성 설치 여부
check('루트 node_modules', () => {
  if (!existsSync(resolve(ROOT, 'node_modules'))) throw new Error('npm run install:all 필요');
});
check('client/node_modules', () => {
  if (!existsSync(resolve(ROOT, 'client/node_modules'))) throw new Error('npm run install:all 필요');
});
check('server/node_modules', () => {
  if (!existsSync(resolve(ROOT, 'server/node_modules'))) throw new Error('npm run install:all 필요');
});

// 4) 환경 파일
check('server/.env 존재', () => {
  const p = resolve(ROOT, 'server/.env');
  if (!existsSync(p)) throw new Error('server/.env.example 을 server/.env 로 복사하고 키 입력 필요');
});

check('LLM 키 설정', () => {
  const p = resolve(ROOT, 'server/.env');
  if (!existsSync(p)) throw new Error('.env 없음');
  // PowerShell이 쓴 UTF-8 BOM 제거
  const env = readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  const provider = (env.match(/^LLM_PROVIDER=(.+)$/m)?.[1] || 'openai').trim().toLowerCase();
  const isAnthropic = provider === 'anthropic' || provider === 'claude';
  const keyName = isAnthropic ? 'ANTHROPIC_API_KEY' : 'OPENAI_API_KEY';
  const keyMatch = new RegExp(`^${keyName}=(.+)$`, 'm').exec(env);
  if (!keyMatch || !keyMatch[1].trim() || keyMatch[1].includes('여기에')) {
    throw new Error(`${keyName} 미설정 (provider: ${provider})`);
  }
  const len = keyMatch[1].trim().length;
  return `provider=${provider}, ${keyName}=[${len}자]`;
});

// 5) 타입체크
check('TypeScript 타입체크', () => {
  execSync('npx tsc -b --noEmit', { cwd: resolve(ROOT, 'client'), stdio: 'pipe' });
  return 'pass';
});

// 6) 서버 구문 검사
check('서버 구문 검사', () => {
  execSync('node --check src/index.js', { cwd: resolve(ROOT, 'server'), stdio: 'pipe' });
  return 'pass';
});

// 결과 출력
console.log('\n=== Reading Brain 영자신문 빌더 환경 점검 ===\n');
let allOk = true;
for (const c of checks) {
  const icon = c.ok ? '✅' : '❌';
  console.log(`${icon} ${c.name}${c.info ? ` — ${c.info}` : ''}`);
  if (!c.ok) allOk = false;
}
console.log('\n' + (allOk
  ? '🎉 모든 점검 통과! `npm run dev` 로 시작하세요. → http://localhost:5173'
  : '⚠️  일부 점검 실패. 위 메시지를 확인하세요. README.md / CLAUDE.md 참고.'));

process.exit(allOk ? 0 : 1);
