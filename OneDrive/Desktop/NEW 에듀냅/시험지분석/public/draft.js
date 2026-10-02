// 문항표만으로 분석지 글을 짓는다. AI 를 부르지 않는다 (2026-10-02 원장 결정).
//
// 원장님이 문항마다 적어 두신 한 줄(note)과 문항표 숫자가 재료의 전부다.
// 없는 말은 지어내지 않는다 — 한 줄이 비어 있으면 그 문항의 영역·세부유형·난이도·배점으로
// 사실만 적은 문장을 만든다. 그래서 어떤 문장이든 문항표를 가리키고, 틀릴 수가 없다.
import { to3, nosText } from './lib.js';

const 글자 = (s) => String(s ?? '').trim();
const 점 = (n) => `${Math.round(n * 10) / 10}점`;

// 한 줄이 비었을 때 문항표가 아는 것만으로 짓는 사실 문장
const 사실줄 = (it) => {
  const 무엇 = [it.area, 글자(it.subtype)].filter(Boolean).join(' · ');
  return `${무엇} ${점(it.points)} 문항입니다. 난이도는 ${it.difficulty}입니다.`;
};
const 줄 = (it) => 글자(it.note) || 사실줄(it);

// 어려운 문항부터 — 난이도가 먼저, 같으면 배점이 큰 것부터
const 어려운순 = (a, b) => ['하', '중하', '중', '중상', '상'].indexOf(b.difficulty) - ['하', '중하', '중', '중상', '상'].indexOf(a.difficulty)
  || (Number(b.points) || 0) - (Number(a.points) || 0);

const 묶기 = (list, key) => {
  const m = new Map();
  for (const it of list) {
    const k = 글자(it[key]);
    if (!k) continue;
    (m.get(k) || m.set(k, []).get(k)).push(it);
  }
  return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
};

export function draftSchool({ meta, items, stats }) {
  const 쓸것 = Array.isArray(items) ? items : [];
  const 어려움 = 쓸것.filter((it) => it.difficulty === '중상' || it.difficulty === '상');

  // ── 총평: 숫자만. 문항 수·구성·출처·고난도·체감 난이도 ──
  const 구성 = stats.byKind.filter((r) => r.count)
    .map((r) => `${r.label === '객관식' ? '선택형' : r.label} ${r.count}문항`).join(' + ');
  const 총평 = 쓸것.length ? [
    `${stats.count}문항 ${점(stats.total)}으로, ${구성}이었습니다.`,
    stats.bySource.length ? `교과서에서 나온 문항이 ${stats.textbookPct}%였고,` : '',
    `중상 이상이 ${stats.hard.count}문항 ${점(stats.hard.points)}이어서 여기서 점수가 갈렸습니다.`,
    `체감 난이도는 ${stats.overallLabel}(${stats.overallScore}/5)입니다.`,
  ].filter(Boolean).join(' ') : '문항표를 먼저 채워 주세요.';

  // ── 핵심 키워드 넷: 가장 많이 나온 단원·영역, 서답형 비중, 난이도 ──
  const 으뜸영역 = stats.byArea[0];
  const 키워드 = [
    stats.topUnit && `${stats.topUnit} 집중 출제`,
    으뜸영역 && `${으뜸영역.label} ${으뜸영역.count}문항`,
    stats.writtenCount && `서답형 ${stats.writtenPointsPct}%`,
    stats.killer.count ? `고난도 ${stats.killer.count}문항` : `체감 ${stats.overallLabel}`,
  ].filter(Boolean).slice(0, 4);

  // ── 이번 시험의 특징: 영역·배점·출처에서 드러나는 것만 ──
  const 특징 = [
    으뜸영역 && `${으뜸영역.label}이 ${으뜸영역.count}문항 ${점(으뜸영역.points)}으로 가장 큰 자리를 차지했습니다.`,
    stats.bySource[0] && `출처는 ${stats.bySource[0].label}에서 ${stats.bySource[0].count}문항으로 가장 많았습니다.`,
    stats.writtenCount && `서답형이 ${stats.writtenCount}문항 ${점(stats.total * stats.writtenPointsPct / 100)}으로 ${stats.writtenPointsPct}%를 차지했습니다.`,
  ].filter(Boolean);

  // ── 구간마다 이렇게 물었습니다: 앞·중간·뒤 세 토막의 난이도 ──
  const 토막 = Math.ceil(쓸것.length / 3) || 1;
  const 흐름 = 쓸것.length ? [0, 1, 2].map((i) => {
    const 몫 = 쓸것.slice(i * 토막, (i + 1) * 토막);
    if (!몫.length) return '';
    const 센것 = 몫.filter((it) => to3(it.difficulty) === '상').length;
    const 이름 = ['앞쪽', '중간', '뒤쪽'][i];
    return `${이름} ${nosText(몫.map((it) => it.no))}번 — ${몫.length}문항 ${점(몫.reduce((s, it) => s + (Number(it.points) || 0), 0))}, 어려운 문항 ${센것}개`;
  }).filter(Boolean) : [];

  // ── 대표 문항: 원장님이 고르셨으면 그것만. 안 고르셨으면 어려운 것부터 셋 ──
  const 고른것 = 쓸것.filter((it) => it.key);
  const 대표 = (고른것.length ? 고른것 : [...쓸것].sort(어려운순).slice(0, 3))
    .map((it) => ({ no: it.no, why: 줄(it) }));

  // ── 어려웠던 이유: 중상 이상 문항의 한 줄을 영역별로 묶는다 ──
  const 이유 = 묶기(어려움, 'area').slice(0, 3).map(([area, list]) => ({
    title: `${area} ${list.length}문항 ${점(list.reduce((s, it) => s + (Number(it.points) || 0), 0))}`,
    detail: list.map(줄).join(' '),
  }));

  // ── 학습 방향: 문항이 많은 영역부터. 그 영역에서 실제로 나온 세부유형만 적는다 ──
  const 방향 = 묶기(쓸것, 'area').slice(0, 5).map(([area, list]) => {
    const 유형 = [...new Set(list.map((it) => 글자(it.subtype)).filter(Boolean))].slice(0, 3).join(' · ');
    return {
      area,
      tip: 유형
        ? `${유형} — ${list.length}문항 ${점(list.reduce((s, it) => s + (Number(it.points) || 0), 0))}. 이 유형부터 다시 풀립니다.`
        : `${list.length}문항 ${점(list.reduce((s, it) => s + (Number(it.points) || 0), 0))}. 이 영역부터 다시 풀립니다.`,
    };
  });

  const 한마디 = 쓸것.length
    ? `${meta.subject} ${stats.count}문항 가운데 ${stats.hard.count}문항에서 점수가 갈렸습니다. 다음 시험은 그 자리부터 준비합니다.`
    : '';

  return { overview: 총평, keywords: 키워드, trends: 특징, flow: 흐름, whyHard: 이유, keyItems: 대표, strategy: 방향, message: 한마디 };
}
