// 문항표 하나로 네이버 블로그 원고를 짓는다. AI 를 부르지 않는다 (2026-10-02 원장 결정).
//
// 받는 쪽은 이미 있는 에듀냅 블로그 엔진이다 (`에듀냅\packages\blog-engine\src\post.js`).
// 그래서 그쪽 형식을 그대로 맞춘다: 머리말 `---title/hashtags---`, 본문에 `[이미지:카드N.png]`,
// `>>` 꺾쇠·`>` 말풍선, `---` 구분선, `==형광펜==` `__밑줄__` `**굵게**`.
// 인사말·끝인사·주소·연락처·해시태그 줄·지도는 **엔진이 프로필에서 붙인다** — 여기서 쓰면 두 번 들어간다.
//
// 글의 짜임은 같은 갈래 분석글 121건에서 가져왔다 (3부 구성, 제목 `... 직후 총평`).
// 저쪽 문장은 베끼지 않는다. 호흡만 같다.
import { nosText } from './lib.js';

// 강조 개수는 blog-cloud/lib/prompts.js 가 최종 기준이다: 형광펜 5 · 밑줄 10 · 굵게 6.
// 쓸 자리를 넉넉히 표시해 두고 앞에서부터 그만큼만 살린다. 한 줄에 하나만 남긴다.
const 몫 = { 펜: 5, 줄: 10, 굵: 6 };
const 틀 = { 펜: '==', 줄: '__', 굵: '**' };
const 펜 = (s) => `\u0001펜\u0002${s}\u0003`;
const 줄 = (s) => `\u0001줄\u0002${s}\u0003`;
const 굵 = (s) => `\u0001굵\u0002${s}\u0003`;

// 표시를 실제 글자로 바꾼다. 몫이 다 떨어졌거나 그 줄에 이미 하나 있으면 표시만 지운다.
function 입히기(body) {
  const 남은 = { ...몫 };
  return body.split('\n').map((line) => {
    let 썼나 = false;
    return line.replace(/\u0001(.)\u0002([^\u0003]*)\u0003/g, (_, 종류, 글) => {
      if (썼나 || 남은[종류] <= 0) return 글;
      남은[종류] -= 1;
      썼나 = true;
      return `${틀[종류]}${글}${틀[종류]}`;
    });
  }).join('\n');
}

const 글자 = (s) => String(s ?? '').trim();
const 점 = (n) => `${Math.round(n * 10) / 10}점`;
const 번 = (no) => (/^\d+$/.test(글자(no)) ? `${no}번` : 글자(no));

export function examTitle(meta) {
  return [meta.school, meta.grade, meta.term, meta.subject, meta.exam, '직후 총평']
    .map(글자).filter(Boolean).join(' ');
}

// 해시태그는 이 시험이 실제로 가진 말로만 만든다. 고정 태그는 엔진이 프로필에서 붙인다.
function 태그({ meta, stats }) {
  return [meta.school, `${meta.school}${meta.subject}`, `${meta.grade}${meta.subject}`,
    `${meta.subject}${meta.exam}`, '내신대비', ...stats.byArea.slice(0, 3).map((r) => `${meta.subject}${r.label}`)]
    .map((t) => 글자(t).replace(/\s+/g, '')).filter(Boolean);
}

export function blogPost({ academy, meta, items, stats }, school) {
  if (!items.length) return { title: examTitle(meta), hashtags: [], body: '', chars: 0, markdown: '' };

  const 제목 = academy?.name ? `[${글자(academy.name)}] ${examTitle(meta)}` : examTitle(meta);
  const 구성 = stats.byKind.filter((r) => r.count)
    .map((r) => `${r.label === '객관식' ? '선택형' : r.label} ${r.count}문항`).join(', ');
  const 으뜸 = stats.byArea[0];
  const 쓸단원 = stats.byUnit.filter((u) => u.label);

  const 토막 = [];

  // ── 들어가며 — 무엇을 분석한 글인지 두 줄로 ──
  토막.push([
    `${글자(meta.school)} ${글자(meta.grade)} ${글자(meta.term)} ${글자(meta.subject)} ${글자(meta.exam)}가 끝났습니다.`,
    `${펜(`${stats.count}문항 ${점(stats.total)}`)}짜리 시험이었습니다.`,
    meta.range ? `출제 범위는 ${줄(글자(meta.range))}였습니다.` : '',
    `문항을 하나하나 ${굵('유형·영역·배점·난이도')}로 갈라 적었습니다.`,
    '어디서 점수가 갈렸는지 그 표에서 그대로 읽었습니다.',
  ].filter(Boolean).join('\n'), '[이미지:카드1.png]');

  // ── 1부: 이렇게 나왔습니다 ──
  const 부1 = [
    '>> 이번 시험은 이렇게 나왔습니다',
    '',
    `구성은 ${구성}이었습니다.`,
    stats.writtenCount ? `서답형이 ${펜(`배점의 ${stats.writtenPointsPct}%`)}를 차지했습니다.` : '',
    stats.writtenCount ? `${stats.writtenCount}문항에 ${점(stats.total * stats.writtenPointsPct / 100)}입니다.` : '',
    `체감 난이도는 ${펜(`${stats.overallLabel}(${stats.overallScore}/5)`)}으로 보았습니다.`,
    '배점을 함께 셈한 난이도입니다.',
    '',
    `영역으로 보면 ${굵(`${으뜸.label}이 가장 큰 자리`)}였습니다.`,
    ...stats.byArea.slice(0, 5).map((r) => `${줄(r.label)} ${r.count}문항 ${점(r.points)} — ${nosText(r.nos)}번`),
    '',
    ...(쓸단원.length ? [
      `단원은 이렇게 나뉘었습니다.`,
      ...쓸단원.slice(0, 5).map((u) => `${줄(u.label)}에서 ${u.count}문항 ${점(u.points)}입니다.`),
      '',
    ] : []),
    ...(stats.bySource.length ? [
      `출처는 ${굵(`${stats.bySource[0].label}이 ${stats.bySource[0].count}문항`)}으로 가장 많았습니다.`,
      ...stats.bySource.map((r) => `${줄(r.label)} ${r.count}문항 ${점(r.points)} — ${nosText(r.nos)}번`),
      stats.textbookPct ? `교과서에서 나온 문항이 ${stats.textbookPct}%였습니다.` : '',
      '',
    ].filter(Boolean) : []),
    ...(stats.byPoints.length > 1 ? [
      '배점은 이렇게 나뉘었습니다.',
      ...stats.byPoints.slice(0, 5).map((r) => `${점(r.points)} 문항이 ${r.count}개 — ${nosText(r.nos)}번`),
      '',
    ] : []),
    // 문항표를 그대로 글로 옮긴다. 학부모가 시험지를 펴 놓고 번호대로 맞춰 볼 수 있어야 한다.
    '문항별로는 이렇게 나왔습니다.',
    '',
    ...items.map((it) => `${번(it.no)} ${[it.area, 글자(it.subtype)].filter(Boolean).join(' · ')} · ${점(it.points)} · ${it.difficulty}`),
  ].filter((l) => l !== null).join('\n');
  토막.push(`${부1}

[이미지:카드2.png]`);

  // ── 2부: 어디서 갈렸나 ── 중상 이상과 대표 문항. 적어 둔 한 줄을 그대로 쓴다.
  const 대표 = (school.keyItems || []).slice(0, 4);
  const 어려움 = items.filter((it) => it.difficulty === '중상' || it.difficulty === '상');
  const 부2 = [
    '>> 어디서 점수가 갈렸을까요',
    '',
    `중상 이상이 ${펜(`${stats.hard.count}문항 ${점(stats.hard.points)}`)}이었습니다.`,
    `전체의 ${stats.hard.pct}%입니다.`,
    stats.killer.count ? `그 가운데 ${굵(`상 난이도가 ${stats.killer.count}문항`)}이었습니다.` : '',
    '여기서 점수가 갈렸습니다.',
    '',
    ...(school.whyHard || []).slice(0, 3).flatMap((w) => [`${줄(w.title)}`, w.detail, '']),
    ...(대표.length ? [
      `특히 들여다볼 문항은 이렇습니다.`,
      '',
      ...대표.flatMap((k) => [`${굵(`${번(k.no)} 문항`)}`, k.why, '']),
    ] : []),
    // 중상 이상 문항은 번호대로 한 줄씩 적는다. 학부모가 번호로 시험지를 다시 펴 볼 수 있어야 한다.
    ...(어려움.length ? [
      '중상 이상 문항을 번호대로 적습니다.',
      '',
      ...어려움.map((it) => `${번(it.no)} — ${[it.area, 글자(it.subtype)].filter(Boolean).join(' · ')} ${점(it.points)}, 난이도 ${it.difficulty}`),
    ] : []),
  ].filter((l) => l !== null).join('\n');
  토막.push(`${부2}

[이미지:카드3.png]`);

  // ── 3부: 다음 준비 ── 영역마다 하나씩. 문항표에 있는 세부유형만 적는다.
  const 부3 = [
    '> 다음 시험은 무엇부터 보면 될까요',
    '',
    '>> 다음 시험은 이렇게 준비합니다',
    '',
    ...(school.strategy || []).slice(0, 5).flatMap((x) => [`${줄(x.area)}`, x.tip, '']),
    ...stats.byKind.filter((r) => r.count).map((r) =>
      `${r.label === '객관식' ? '선택형' : r.label}은 ${r.count}문항 ${점(r.points)}이었습니다. ${nosText(r.nos)}번입니다.`),
    '',
    `${굵('틀린 문항의 유형')}부터 다시 풀립니다.`,
    '같은 유형이 다음 시험에도 나옵니다.',
    '번호를 적어 두고 그 유형만 모아 풀면 가장 빠릅니다.',
  ].join('\n');
  토막.push(`${부3}

[이미지:카드4.png]`);

  // ── 맺음 — 지어낸 말 없이 숫자만 다시 짚는다 ──
  토막.push([
    `${글자(meta.subject)} ${stats.count}문항 가운데`,
    `${펜(`${stats.hard.count}문항`)}에서 점수가 갈렸습니다.`,
    '다음 시험은 그 자리부터 준비합니다.',
    '',
    `문항별 분석표는 상담 때 그대로 보여 드립니다.`,
    '[이미지:카드5.png]',
  ].join('\n'));

  const body = 입히기(토막.join('\n\n---\n\n')).replace(/\n{3,}/g, '\n\n').trim();
  const hashtags = 태그({ meta, stats });
  // 글자 수는 읽는 사람이 보는 글만 센다 — 사진 줄·구분선·강조 표시는 빼고, 띄어쓰기는 한 칸으로.
  const chars = body
    .replace(/^\[이미지:[^\]]+\]$/gm, '').replace(/^---$/gm, '')
    .replace(/==|__|\*\*/g, '').replace(/^>{1,2} /gm, '')
    .replace(/\s+/g, ' ').trim().length;
  const markdown = `---\ntitle: ${제목}\nhashtags: ${hashtags.join(', ')}\n---\n\n${body}\n`;
  return { title: 제목, hashtags, body, chars, markdown };
}
