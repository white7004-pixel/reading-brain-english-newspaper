// 학생 이름 확인과 학원 교재 설정 읽기.
import { stepOf } from './scale.js';

// 성+OO(김OO·남궁○○) 또는 영문 이니셜 1~3자만 받는다. 전체 이름은 받지 않는다.
export function checkName(name) {
  const n = String(name ?? '').trim();
  if (!n) return '이름을 적어 주세요';
  if (/^[가-힣]{1,2}(OO|○○|ㅇㅇ|\*\*)?$/.test(n) || /^[A-Za-z]{1,3}$/.test(n)) return '';
  return '성+OO(예: 김OO) 또는 이니셜(예: KJ)로만 적어 주세요';
}

const SECTION_OF = { 단어: 'vocab', 문법: 'grammar', 독해: 'reading', 듣기: 'listening' };

function semesterStep(s) {
  const m = /^(초[3-6]|중[1-3]|고[1-3])-([12])$/.exec(s ?? '');
  return m ? stepOf(m[1], Number(m[2])) : 0;
}

// 줄마다 "영역, 시작 학기, 끝 학기, 교재명"   예) 문법, 중2-1, 중3-2, 문법 교재 2권
export function parseBooks(text) {
  const books = {};
  const problems = [];
  String(text ?? '').split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    const [sec, from, to, ...name] = line.split(',').map((x) => x.trim());
    const k = SECTION_OF[sec];
    const a = semesterStep(from);
    const b = semesterStep(to);
    const nm = name.join(', ');
    if (!k || !a || !b || a > b || !nm) return problems.push(`${i + 1}번째 줄: "영역, 시작 학기, 끝 학기, 교재명" 모양으로 적어 주세요 (학기는 중2-1 처럼)`);
    (books[k] ||= []).push({ from: a, to: b, name: nm });
  });
  return { books, problems };
}
