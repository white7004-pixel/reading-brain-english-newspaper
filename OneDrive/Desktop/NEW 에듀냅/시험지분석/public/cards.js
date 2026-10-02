// 카드뉴스 다섯 장 — 한 벌로 이어지는 덱.
// 만듦새(어두운 바탕 · 크림 패널 · 번호 붙은 구획)는 2026-10-03 원장님이 고르신 판.
// 숫자는 examStats 에서만 온다. 여기서 새로 세지 않는다.
// 글은 draftSchool(또는 AI)이 지은 것을 그대로 쓴다. 공개물이라 학생 정보는 받지 않는다.
//
// 04 기출 적중은 **원장님이 학원 교재 사진을 올리셨을 때만** 만든다 (2026-10-02 원장 결정).
import { to3, nosText, noText, esc } from './lib.js';
import { sheet } from './report.js';

const CLS = 'card-news deck';
const 글자 = (s) => String(s ?? '').trim();
const 점 = (n) => `${Math.round(n * 10) / 10}점`;
const 색3 = { 하: 'var(--d-low)', 중: 'var(--d-mid)', 상: 'var(--d-high)' };
const 반3 = { 하: 'a', 중: 'b', 상: 'c' };
// 카드에만 쓰는 이름 — 문항표·통계는 계속 하·중·상이다 (2026-10-03)
const 보임3 = { 하: '쉬움', 중: '보통', 상: '어려움' };
// 세 칸으로 묶었을 때 그 칸이 무엇을 묻는 자리였는지 — 문항표에 있는 사실만으로 적는다
const 설명3 = { 하: '기본 개념과 교과서 범위', 중: '지문 이해와 유형 적용', 상: '추론·변형으로 갈린 자리' };

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

// ── 문항표 → 카드가 쓰는 모양. 순수 함수라 따로 검사한다 ──
export function deckData({ academy, meta, items, stats }, school, opts = {}) {
  const 쓸것 = Array.isArray(items) ? items : [];
  const 구성 = stats.byKind.filter((r) => r.count)
    .map((r) => `${r.label === '객관식' ? '선택형' : r.label} ${r.count}문항`).join(' · ');

  // 다섯 단계를 셋으로 묶는다 — 학부모가 읽는 자료라 하·중·상이면 충분하다
  const 난이도 = ['하', '중', '상'].map((이름) => {
    const 몫 = 쓸것.filter((it) => to3(it.difficulty) === 이름);
    return {
      이름, 수: 몫.length, 비율: pct(몫.length, 쓸것.length), 점: 몫.reduce((s, it) => s + (Number(it.points) || 0), 0),
      번호: nosText(몫.map((it) => it.no)), 설명: 설명3[이름], 색: 색3[이름], 반: 반3[이름], 보임: 보임3[이름],
    };
  }).filter((x) => x.수);

  // 카드는 "가장 큰 자리"부터 보여 준다 — A4·슬라이드는 과목 차례대로 두고 여기서만 많은 순으로 세운다
  const 영역 = [...stats.byArea].sort((a, b) => b.count - a.count || b.points - a.points).map((r) => ({
    이름: r.label, 수: r.count, 점: r.points, 비율: r.pct, 번호: nosText(r.nos),
    유형: [...new Set(쓸것.filter((it) => it.area === r.label).map((it) => 글자(it.subtype)).filter(Boolean))].slice(0, 3),
  }));

  // 변별 문항 = 원장님이 고른 대표 문항, 없으면 상 난이도
  const 고른것 = 쓸것.filter((it) => it.key).map((it) => noText(it.no));
  const 변별 = [...new Set([...고른것, ...쓸것.filter((it) => it.difficulty === '상').map((it) => noText(it.no))])];

  const 적중 = opts.적중
    ? { 맞힌: Number(opts.적중.맞힌) || 0, 전체: 쓸것.length, 자료: opts.적중.자료 ?? [], 사진: opts.적중.사진 ?? [] }
    : null;

  // 학습 방향 — 글은 draftSchool 이 지은 것, 할 일은 그 영역에 실제로 나온 세부유형
  const 방향 = (school.strategy ?? []).slice(0, 4).map((x) => {
    const 몫 = 쓸것.filter((it) => it.area === x.area);
    const 어려운것 = 몫.filter((it) => to3(it.difficulty) === '상' && 글자(it.note))[0];
    return {
      영역: x.area,
      설명: 글자(x.tip).replace(/\s*이 (유형|영역)부터 다시 풀립니다\.?$/, ''),
      할것: [...new Set(몫.map((it) => 글자(it.subtype)).filter(Boolean))].slice(0, 3).map((t) => `${t} 유형 다시 풀기`),
      메모: 어려운것 ? 글자(어려운것.note) : '',
    };
  });

  return {
    학원: 글자(academy?.name), 로고: academy?.logo ?? '',
    학교: 글자(meta.school), 학년: 글자(meta.grade), 학기: 글자(meta.term),
    시험: 글자(meta.exam), 과목: 글자(meta.subject), 날짜: 글자(meta.date), 범위: 글자(meta.range),
    문항: stats.count, 배점: stats.total, 구성,
    체감: stats.overallLabel, 체감점수: stats.overallScore, 서답형비율: stats.writtenPointsPct,
    난이도, 영역, 적중, 방향,
    출처: stats.bySource.map((r) => ({ 이름: r.label, 수: r.count, 비율: r.pct })),
    배점나눔: stats.byPoints.slice(0, 4).map((r) => ({ 점: r.points, 수: r.count, 번호: nosText(r.nos) })),
    흐름: 쓸것.map((it) => ['하', '중', '상'].indexOf(to3(it.difficulty))),
    흐름번호: 쓸것.map((it) => noText(it.no)),
    변별,
    대표: (school.keyItems ?? []).slice(0, 3).map((k) => ({
      번호: noText(k.no), 한줄: 글자(k.why),
      유형: (() => { const it = 쓸것.find((x) => noText(x.no) === noText(k.no)); return it ? [it.area, 글자(it.subtype)].filter(Boolean).join(' · ') : ''; })(),
      난이도: 쓸것.find((x) => noText(x.no) === noText(k.no))?.difficulty ?? '',
    })),
    한줄: 글자(school.message),
    마무리: 글자(school.overview),
  };
}

/* ── 그림 조각 ── */
const 점색 = ['var(--d-low)', 'var(--d-mid)', 'var(--d-high)'];

// 그래프 가로축에 쓸 짧은 번호. '서답형 4' → '서4' (긴 이름이 그대로면 끝에서 겹친다)
const 짧게 = (no) => {
  const t = 글자(no);
  if (/^\d+$/.test(t)) return t;
  const m = t.match(/^(\S)\D*([\d-]+)$/);
  return m ? `${m[1]}${m[2]}` : t.slice(0, 4);
};

// 출처별 세로막대
function vbars(rows) {
  const w = 470, h = 212, 칸 = w / Math.max(rows.length, 1), 폭 = Math.min(72, 칸 * 0.5), 바닥 = h - 48;
  const 최대 = Math.max(...rows.map((x) => x.비율), 1);
  const 톤 = ['#9b2c2c', '#b4595a', '#cf9192', '#e0c2c2'];
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${rows.map((x, i) => {
    const 높 = Math.max(12, (x.비율 / 최대) * (바닥 - 38)), cx = 칸 * i + 칸 / 2;
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${(바닥 - 높).toFixed(1)}" width="${폭.toFixed(1)}"
        height="${높.toFixed(1)}" rx="7" fill="${톤[i] || '#e0c2c2'}"/>
      <text x="${cx.toFixed(1)}" y="${(바닥 - 높 - 11).toFixed(1)}" text-anchor="middle" font-size="20" font-weight="800" fill="#0e1b29">${x.비율}%</text>
      <text x="${cx.toFixed(1)}" y="${바닥 + 22}" text-anchor="middle" font-size="16.5" font-weight="700" fill="#0e1b29">${esc(x.이름)}</text>
      <text x="${cx.toFixed(1)}" y="${바닥 + 41}" text-anchor="middle" font-size="14" fill="#6b6557">${x.수}문항</text>`;
  }).join('')}</svg>`;
}

// 문항별 난이도 막대. 점수가 갈린 문항은 테두리로 가린다
function bars(d) {
  const w = 940, h = 250, 위 = 22, 아래 = h - 42, 왼 = 44, 오 = w - 10;
  const n = Math.max(d.흐름.length, 1), 칸 = (오 - 왼) / n, 폭 = Math.min(30, 칸 * 0.62);
  const y = (v) => 아래 - ((v + 1) / 3) * (아래 - 위);
  const 눈 = ['하', '중', '상'].map((나, i) =>
    `<line x1="${왼 - 6}" y1="${y(i)}" x2="${오}" y2="${y(i)}" stroke="#ddd3bf" stroke-dasharray="4 5"/>
     <text x="${왼 - 14}" y="${y(i) + 6}" text-anchor="end" font-size="15" fill="#7b7467" font-weight="700">${나}</text>`).join('');
  const 띄우기 = n > 18 ? 2 : 1;
  const 막 = d.흐름.map((v, i) => {
    const cx = 왼 + 칸 * i + 칸 / 2, 변 = d.변별.includes(d.흐름번호[i]);
    const 이름 = (i % 띄우기 === 0 || 변) ? `<text x="${cx.toFixed(1)}" y="${아래 + 23}" text-anchor="middle" font-size="13"
        font-weight="${변 ? 800 : 600}" fill="${변 ? '#9b2c2c' : '#7b7467'}">${esc(짧게(d.흐름번호[i]))}</text>` : '';
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${폭.toFixed(1)}"
      height="${(아래 - y(v)).toFixed(1)}" rx="5" fill="${점색[v]}"
      ${변 ? 'stroke="#9b2c2c" stroke-width="3.5"' : ''}/>${이름}`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${눈}${막}</svg>`;
}

/* ── 틀 ── */
const 머리 = (d) => `<div class="kt">
  <span class="eye">${esc(d.과목)} 내신 분석</span><span class="ln"></span><span class="who">${esc(d.학원)}</span></div>`;

const 제목 = (d, 큰) => `<div class="kh">
  <div><div class="sub">${esc([d.학교, d.학년].filter(Boolean).join(' '))}</div>
    <h1 contenteditable>${esc(큰)}</h1></div>
  <div class="rt">${esc(d.날짜)}${d.범위 ? `<br>${esc(d.범위)}` : ''}</div></div>`;

// 패널 머리 — 번호 · 이름 · 오른쪽에 한 줄 설명
const 패 = (no, 이름, 작게 = '') =>
  `<div class="lab"><b>${String(no).padStart(2, '0')}</b><span>${esc(이름)}</span>${작게 ? `<i>${esc(작게)}</i>` : ''}</div>`;

const 바닥 = (d, 말, n, 다) => `<div class="kf"><s></s>
  <p contenteditable>${esc(말 || d.한줄)}</p><span class="pg">0${n} / 0${다}</span></div>`;

const 번호판 = (d) => `<div class="map num">${d.흐름.map((v, i) =>
  `<div class="q l${v}${d.변별.includes(d.흐름번호[i]) ? ' key' : ''}">${esc(짧게(d.흐름번호[i]))}</div>`).join('')}</div>`;

// 가장 많은 영역을 100으로 두고 나머지를 견준다 — 작은 차이도 눈에 보이게
const 견줌 = (d, 비율) => (d.영역[0]?.비율 ? Math.round((비율 * 100) / d.영역[0].비율) : 0);

const 파일 = (d, 꼬리) => `${d.학교}-${d.학년}-${d.과목}-${꼬리}`;

/* ── 다섯 장 ── */
export function cardDeck(ctx, school, opts = {}) {
  const d = deckData(ctx, school, opts);
  if (!d.문항) return '';
  const 다 = d.적중 ? 5 : 4;
  const 장 = [];

  // 01 시험 한눈에
  장.push(sheet(파일(d, '카드1-한눈에'), `
    ${머리(d)}
    ${제목(d, [d.학기, d.시험].filter(Boolean).join(' '))}
    <div class="kp big">
      ${패(1, '문항 지도', `${d.문항}문항을 번호 차례로 폈습니다`)}
      ${번호판(d)}
      <div class="key num">${d.난이도.map((x) => `<i><s style="background:${x.색}"></s>${esc(x.보임)} ${x.수}문항 · ${x.비율}%</i>`).join('')}
        <i class="ring"><s></s>점수가 갈린 문항</i></div>
    </div>
    <div class="low">
      <div class="kp">${패(2, '어디서 많이 물었나')}
        ${d.영역.slice(0, 4).map((a) => `<div class="row"><span class="nm">${esc(a.이름)}</span>
          <span class="bar"><s style="width:${견줌(d, a.비율)}%"></s></span>
          <span class="n num">${a.수}문항<u>${점(a.점)}</u></span></div>`).join('')}
        <div class="mix"><div class="t">어려움 정도</div>
          <div class="b num">${d.난이도.map((x) => `<i style="width:${x.비율}%;background:${x.색}">${x.비율}%</i>`).join('')}</div>
          <div class="c2 num">${d.난이도.map((x) => `<span style="width:${x.비율}%">${esc(x.보임)} ${x.수}문항</span>`).join('')}</div>
        </div>
      </div>
      <div class="kp">${패(3, '한눈에')}
        <div class="st num">
          <div><b>${d.문항}</b><span>문항 수</span></div>
          <div><b>${d.배점}<u>점</u></b><span>만점</span></div>
          <div><b>${d.서답형비율}<u>%</u></b><span>서답형 몫</span></div>
          <div><b class="g">${d.난이도.at(-1)?.수 ?? 0}</b><span>${esc(d.난이도.at(-1)?.보임 ?? '')} 문항</span></div>
        </div>
      </div>
    </div>
    ${바닥(d, '', 1, 다)}`, CLS));

  // 02 출제 구조
  장.push(sheet(파일(d, '카드2-출제구조'), `
    ${머리(d)}
    ${제목(d, '출제 구조')}
    <div class="kp big">
      ${패(1, '영역별 출제', '큰 숫자는 문항 수입니다')}
      <div class="areas">${d.영역.slice(0, 4).map((a) => `<div class="ac">
        <span class="nm">${esc(a.이름)}</span>
        <span class="big2"><b>${a.수}</b><span>문항 · ${a.비율}%</span></span>
        <span class="bar"><s style="width:${견줌(d, a.비율)}%"></s></span>
        <ul>${a.유형.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <span class="fin">${esc(a.번호)}번</span></div>`).join('')}</div>
    </div>
    <div class="low">
      <div class="kp">${패(2, '출처별 출제 비중')}
        ${d.출처.length ? `<div class="plot">${vbars(d.출처)}</div>`
    : '<p class="none">출처를 적으면 여기에 그려집니다.</p>'}
      </div>
      <div class="kp">${패(3, '배점 구성')}
        <div class="st2">${d.배점나눔.map((b) => `<div class="row2">
          <span class="pt num">${b.점}점</span><span class="ct num">${b.수}문항</span>
          <span class="no">${esc(b.번호)}번</span></div>`).join('')}</div>
        <div class="tip">문항 구성은 ${esc(d.구성)}입니다.</div>
      </div>
    </div>
    ${바닥(d, '배점이 큰 자리에 어려운 문항이 몰렸습니다', 2, 다)}`, CLS));

  // 03 갈린 구간
  장.push(sheet(파일(d, '카드3-갈린구간'), `
    ${머리(d)}
    ${제목(d, '갈린 구간')}
    <div class="kp big fill">
      ${패(1, '문항별 난이도', '테두리가 진한 칸이 점수가 갈린 문항입니다')}
      <div class="plot">${bars(d)}</div>
    </div>
    <div class="low fix">
      <div class="kp">${패(2, '점수가 갈린 문항')}
        ${d.대표.map((k) => `<div class="kkey"><b class="no">${esc(k.번호)}</b>
          <span class="t">${esc(k.유형)}<small>${esc(k.한줄)}</small></span>
          ${k.난이도 ? `<span class="dg">${esc(k.난이도)}</span>` : ''}</div>`).join('')}
      </div>
      <div class="kp">${패(3, '난이도 구간')}
        <div class="lv3">${d.난이도.map((x) => `<div class="${x.반}"><b style="color:${x.색}">${esc(x.보임)}</b>
          <u class="num">${x.수}문항</u><s class="num">${x.비율}%</s></div>`).join('')}</div>
        <div class="tip">${esc(d.난이도.at(-1)?.보임 ?? '')} 문항은 ${esc(d.난이도.at(-1)?.번호 ?? '')}번에 있습니다.</div>
      </div>
    </div>
    ${바닥(d, '', 3, 다)}`, CLS));

  // 04 기출 적중 — 학원 교재 사진을 올리셨을 때만
  if (d.적중) {
    장.push(sheet(파일(d, '카드4-기출적중'), `
      ${머리(d)}
      ${제목(d, '기출 적중 확인')}
      <div class="kp big">
        ${패(1, '시험 전에 다룬 문항')}
        <div class="hit"><span class="bg num">${d.적중.맞힌}<u> / ${d.적중.전체}</u></span>
          <span class="r"><b>${d.적중.전체}문항 가운데 ${d.적중.맞힌}문항</b>을 시험 전에 같은 유형으로 다뤘습니다.${d.적중.자료.length ? `<br><span class="s">학원 교재 ${d.적중.자료.length}종에서 확인한 숫자입니다.</span>` : ''}</span></div>
        ${d.적중.자료.length ? `<div class="chips">${d.적중.자료.map((n) => `<span class="chip">${esc(n)}</span>`).join('')}</div>` : ''}
      </div>
      <div class="low one fill">
        <div class="kp">${패(2, '학원 교재 사진')}
          <div class="shots">${d.적중.사진.slice(0, 4).map((src, i) => `<figure>
            <img src="${esc(src)}" alt=""><figcaption>${esc(d.적중.자료[i] ?? `자료 ${i + 1}`)}</figcaption></figure>`).join('')}</div>
        </div>
      </div>
      ${바닥(d, '시험 범위를 먼저 다뤄 두면 시험장에서 낯설지 않습니다', 4, 다)}`, CLS));
  }

  // 05 다음 준비
  장.push(sheet(파일(d, `카드${다}-다음준비`), `
    ${머리(d)}
    ${제목(d, '다음 준비')}
    <div class="kp big fill">
      ${패(1, '영역별로 할 일')}
      <div class="ways">${d.방향.map((w, i) => `<div class="way">
        <div class="h"><b>${String(i + 1).padStart(2, '0')}</b><span>${esc(w.영역)}</span></div>
        <p>${esc(w.설명)}</p>
        <ul>${w.할것.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        ${w.메모 ? `<div class="memo">${esc(w.메모)}</div>` : ''}</div>`).join('')}</div>
    </div>
    <div class="low fix2">
      <div class="kp">${패(2, '마무리')}
        <div class="ms" contenteditable>${esc(d.마무리)}</div>
        <div class="tip">문항별 분석표는 상담 때 그대로 보여 드립니다.</div>
      </div>
      <div class="kp">${패(3, '이번 시험의 무게')}
        <div class="chips2">${d.영역.slice(0, 4).map((a) => `<span class="chip">${esc(a.이름)} ${a.수}문항</span>`).join('')}</div>
      </div>
    </div>
    ${바닥(d, '', 다, 다)}`, CLS));

  return 장.join('');
}
