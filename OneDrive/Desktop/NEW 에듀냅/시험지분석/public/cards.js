// 카드뉴스 다섯 장 — 한 벌로 이어지는 덱 (2026-10-02 원장님이 고르신 어두운 판).
// 숫자는 examStats 에서만 온다. 여기서 새로 세지 않는다.
// 글은 draftSchool(또는 AI)이 지은 것을 그대로 쓴다. 공개물이라 학생 정보는 받지 않는다.
//
// 04 기출 적중은 **원장님이 학원 교재 사진을 올리셨을 때만** 만든다 (2026-10-02 원장 결정).
import { to3, nosText, noText, esc, DIFF5 } from './lib.js';
import { sheet } from './report.js';

const CLS = 'card-news deck';
const 글자 = (s) => String(s ?? '').trim();
const 점 = (n) => `${Math.round(n * 10) / 10}점`;
const 색3 = { 하: 'var(--d-low)', 중: 'var(--d-mid)', 상: 'var(--d-high)' };
const 반3 = { 하: 'a', 중: 'b', 상: 'c' };
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
      번호: nosText(몫.map((it) => it.no)), 설명: 설명3[이름], 색: 색3[이름], 반: 반3[이름],
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
function donut(rows, 가운데, 위) {
  const r = 104, w = 32, C = 2 * Math.PI * r;
  let at = 0;
  const 호 = rows.map((x) => {
    const len = (x.비율 / 100) * C;
    const el = `<circle cx="140" cy="140" r="${r}" fill="none" stroke="${x.색}" stroke-width="${w}"
      stroke-dasharray="${len.toFixed(1)} ${(C - len).toFixed(1)}" stroke-dashoffset="${(-at).toFixed(1)}"
      transform="rotate(-90 140 140)"/>`;
    at += len; return el;
  }).join('');
  return `<svg viewBox="0 0 280 280" width="238" height="238" aria-hidden="true">
    <circle cx="140" cy="140" r="${r}" fill="none" stroke="#ece4d4" stroke-width="${w}"/>${호}
    <text x="140" y="130" text-anchor="middle" font-size="21" font-weight="600" fill="#55616e">${esc(위)}</text>
    <text x="140" y="170" text-anchor="middle" font-size="40" font-weight="900" fill="#16202b">${esc(가운데)}</text></svg>`;
}

function vbars(rows) {
  const w = 470, h = 206, 칸 = w / Math.max(rows.length, 1), 폭 = Math.min(76, 칸 * 0.5), 바닥 = h - 46;
  const 최대 = Math.max(...rows.map((x) => x.비율), 1);
  const 톤 = ['#8e2b2d', '#b9595b', '#dba1a2', '#ead0d0'];
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" aria-hidden="true">${rows.map((x, i) => {
    const 높 = Math.max(12, (x.비율 / 최대) * (바닥 - 36)), cx = 칸 * i + 칸 / 2;
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${(바닥 - 높).toFixed(1)}" width="${폭.toFixed(1)}"
        height="${높.toFixed(1)}" rx="6" fill="${톤[i] || '#ead0d0'}"/>
      <text x="${cx.toFixed(1)}" y="${(바닥 - 높 - 11).toFixed(1)}" text-anchor="middle" font-size="21" font-weight="800" fill="#16202b">${x.비율}%</text>
      <text x="${cx.toFixed(1)}" y="${바닥 + 22}" text-anchor="middle" font-size="17" font-weight="700" fill="#16202b">${esc(x.이름)}</text>
      <text x="${cx.toFixed(1)}" y="${바닥 + 41}" text-anchor="middle" font-size="14.5" fill="#55616e">${x.수}문항</text>`;
  }).join('')}</svg>`;
}

const 점색 = ['var(--d-low)', 'var(--d-mid)', 'var(--d-high)'];

// 그래프 가로축에 쓸 짧은 번호. '서답형 4' → '서4' (긴 이름이 그대로면 끝에서 겹친다)
const 짧게 = (no) => {
  const t = 글자(no);
  if (/^\d+$/.test(t)) return t;
  const m = t.match(/^(\S)\D*([\d-]+)$/);
  return m ? `${m[1]}${m[2]}` : t.slice(0, 4);
};

// 문항별 난이도 막대. 변별 문항은 테두리로 가린다
function bars(d) {
  const w = 940, h = 250, 위 = 22, 아래 = h - 42, 왼 = 44, 오 = w - 10;
  const n = Math.max(d.흐름.length, 1), 칸 = (오 - 왼) / n, 폭 = Math.min(30, 칸 * 0.62);
  const y = (v) => 아래 - ((v + 1) / 3) * (아래 - 위);
  const 눈 = ['하', '중', '상'].map((나, i) =>
    `<line x1="${왼 - 6}" y1="${y(i)}" x2="${오}" y2="${y(i)}" stroke="#e6ddc9" stroke-dasharray="4 5"/>
     <text x="${왼 - 14}" y="${y(i) + 6}" text-anchor="end" font-size="15" fill="#8b8372" font-weight="700">${나}</text>`).join('');
  const 띄우기 = n > 18 ? 2 : 1;
  const 막 = d.흐름.map((v, i) => {
    const cx = 왼 + 칸 * i + 칸 / 2, 변 = d.변별.includes(d.흐름번호[i]);
    const 이름 = (i % 띄우기 === 0 || 변) ? `<text x="${cx.toFixed(1)}" y="${아래 + 23}" text-anchor="middle" font-size="13"
        font-weight="${변 ? 800 : 600}" fill="${변 ? '#d63b3b' : '#8b8372'}">${esc(짧게(d.흐름번호[i]))}</text>` : '';
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${폭.toFixed(1)}"
      height="${(아래 - y(v)).toFixed(1)}" rx="5" fill="${점색[v]}"
      ${변 ? 'stroke="#d63b3b" stroke-width="3.5"' : ''}/>${이름}`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${눈}${막}</svg>`;
}

// 번호 순 난이도 꺾은선
function line(d) {
  const w = 620, h = 200, 위 = 20, 아래 = h - 34, 왼 = 38, 오 = w - 8;
  const n = Math.max(d.흐름.length, 2), 칸 = (오 - 왼) / (n - 1);
  const y = (v) => 아래 - (v / 2) * (아래 - 위);
  const 눈 = ['하', '중', '상'].map((나, i) =>
    `<line x1="${왼 - 5}" y1="${y(i)}" x2="${오}" y2="${y(i)}" stroke="#e6ddc9" stroke-dasharray="4 5"/>
     <text x="${왼 - 12}" y="${y(i) + 5}" text-anchor="end" font-size="13" fill="#8b8372" font-weight="700">${나}</text>`).join('');
  const 선 = `<polyline fill="none" stroke="#b9ae97" stroke-width="2.2" stroke-linejoin="round"
    points="${d.흐름.map((v, i) => `${(왼 + 칸 * i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}"/>`;
  const 점 = d.흐름.map((v, i) => {
    const 변 = d.변별.includes(d.흐름번호[i]);
    return `<circle cx="${(왼 + 칸 * i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${변 ? 7.5 : 5.5}"
      fill="${점색[v]}" ${변 ? 'stroke="#fff" stroke-width="2.6"' : ''}/>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${눈}${선}${점}</svg>`;
}

/* ── 틀 ── */
const 머리 = (d, n, 다) => `<div class="k-top">
  <span class="k-nm"><s></s><span>${esc(d.학원)}</span></span>
  <span class="k-rule"></span><span class="k-pg">0${n}<u> / 0${다}</u></span></div>`;

const 제목 = (d, 앞, 뒤, 쪽지) => `<div class="k-head">
  <h2 contenteditable>${esc([d.학교, d.학년, d.학기, d.시험].filter(Boolean).join(' '))}</h2>
  <h1>${esc(앞)} <em>${esc(뒤)}</em></h1>
  <div class="k-kick"><span>${esc(d.과목)} · EXAM REPORT</span><s></s></div></div>
  ${쪽지 ? `<div class="k-memo" contenteditable>${쪽지}</div>` : ''}`;

const 바닥 = (d, 말) => `<div class="k-foot">
  <span class="k-bulb">💡</span><q contenteditable>${esc(말 || d.한줄)}</q>
  <span class="k-who">${esc(d.학원)}</span></div>`;

const 패 = (no, 이름, 작게 = '') =>
  `<div class="k-ph"><b><i>${no}</i>${esc(이름)}</b>${작게 ? `<small>${esc(작게)}</small>` : ''}</div>`;

const 파일 = (d, 꼬리) => `${d.학교}-${d.학년}-${d.과목}-${꼬리}`;

/* ── 다섯 장 ── */
export function cardDeck(ctx, school, opts = {}) {
  const d = deckData(ctx, school, opts);
  if (!d.문항) return '';
  const 다 = d.적중 ? 5 : 4;
  const 장 = [];

  // 01 시험 한눈에
  장.push(sheet(파일(d, '카드1-한눈에'), `
    ${머리(d, 1, 다)}
    ${제목(d, '시험', '한눈에 보기', `${esc(d.과목)}는 <b>${esc(d.영역[0]?.이름 ?? '')}</b>에서<br>가장 많이 나왔어요`)}
    <div class="k-grid k-22">
      <div class="k-p">${패(1, '시험 기본 정보')}
        <div class="k-kv"><span class="k">학교 · 학년</span><span class="v">${esc(d.학교)} ${esc(d.학년)}</span></div>
        <div class="k-kv"><span class="k">시험</span><span class="v">${esc([d.학기, d.시험].filter(Boolean).join(' '))} · ${esc(d.과목)}</span></div>
        ${d.날짜 ? `<div class="k-kv"><span class="k">시험일</span><span class="v">${esc(d.날짜)}</span></div>` : ''}
        <div class="k-kv"><span class="k">문항 구성</span><span class="v">${esc(d.구성)}</span></div>
        ${d.범위 ? `<div class="k-kv"><span class="k">출제 범위</span><span class="v">${esc(d.범위)}</span></div>` : ''}
        <div class="k-tip">문항마다 영역·배점·난이도·출처를 적어 분석했습니다.</div>
      </div>
      <div class="k-p">${패(2, '난이도별 문항 분포')}
        <div class="k-row">
          ${donut(d.난이도, `${d.문항}문항`, '전체')}
          <div class="k-leg">${d.난이도.map((x) => `<i><s class="k-dot" style="background:${x.색}"></s>${esc(x.이름)} ${x.수}문항<s>${x.비율}%</s></i>`).join('')}
            <i class="k-feel">체감 난이도 <b>${esc(d.체감)}</b></i></div>
        </div>
        <div class="k-tip">전체 ${d.문항}문항 ${점(d.배점)}입니다.</div>
      </div>
      <div class="k-p">${패(3, '출처별 출제 비중')}${d.출처.length ? vbars(d.출처) : '<p class="k-none">출처를 적으면 여기에 그려집니다.</p>'}</div>
      <div class="k-p">${패(4, '난이도 단계별 구성')}
        ${d.난이도.map((x) => `<div class="k-step">
          <div class="k-step-h"><b style="color:${x.색}">${esc(x.이름)}</b><span>${esc(x.설명)}</span>
            <b class="n" style="color:${x.색}">${x.수}<u> 문항</u></b></div>
          <div class="k-step-no">${esc(x.번호)}번</div>
          <div class="k-bar"><i style="width:${x.비율}%;background:${x.색}"></i></div></div>`).join('')}
      </div>
    </div>
    ${바닥(d)}`, CLS));

  // 02 출제 구조
  장.push(sheet(파일(d, '카드2-출제구조'), `
    ${머리(d, 2, 다)}
    ${제목(d, '출제', '구조 분석', `${d.영역.slice(0, 2).map((a) => `<b>${esc(a.이름)}</b>`).join('과 ')}가<br>배점의 대부분이었어요`)}
    <div class="k-grid k-rows">
      <div class="k-p">${패(1, '영역별 출제', '큰 숫자 = 문항 수')}
        <div class="k-areas">${d.영역.slice(0, 4).map((a) => `<div class="k-ac">
          <span class="nm">${esc(a.이름)}</span>
          <span class="big"><b>${a.수}</b><span>문항 · ${a.비율}%</span></span>
          <div class="k-bar"><i style="width:${a.비율}%;background:var(--k-wine-hi)"></i></div>
          <ul>${a.유형.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <div class="fin">주요 문항 ${esc(a.번호)}번</div></div>`).join('')}</div>
      </div>
      <div class="k-grid k-22">
        <div class="k-p">${패(2, '배점 구성')}
          ${d.배점나눔.map((b) => `<div class="k-kv"><span class="k k-pt">${b.점}점</span>
            <span class="v">${b.수}문항 <span class="k-chip">${esc(b.번호)}번</span></span></div>`).join('')}
          <div class="k-tip">배점이 큰 ${d.배점나눔[0]?.점 ?? 0}점 문항이 ${d.배점나눔[0]?.수 ?? 0}개였습니다.</div>
        </div>
        <div class="k-p">${패(3, '문항 구성 흐름', '번호 순 난이도')}
          <div class="k-plot">${line(d)}</div>
          <div class="k-keys">${d.난이도.map((x) => `<span><s class="k-dot" style="background:${x.색}"></s>${esc(x.이름)}</span>`).join('')}
            <span><s class="k-dot k-ring"></s>변별</span></div>
        </div>
      </div>
    </div>
    ${바닥(d, '배점이 큰 자리에 어려운 문항이 몰렸습니다')}`, CLS));

  // 03 변별 구간
  장.push(sheet(파일(d, '카드3-변별구간'), `
    ${머리(d, 3, 다)}
    ${제목(d, '변별', '구간 분석', '뒤로 갈수록<br><b>어려운 문항</b>이 늘었어요')}
    <div class="k-grid k-rows">
      <div class="k-p">${패(1, '문항별 난이도', '빨간 테두리 = 점수가 갈린 문항')}
        <div class="k-plot">${bars(d)}</div></div>
      <div class="k-grid k-31">
        <div class="k-p">${패(2, '점수가 갈린 문항')}
          ${d.대표.map((k) => `<div class="k-key"><b class="no">${esc(k.번호)}</b>
            <span class="t">${esc(k.유형)}<small>${esc(k.한줄)}</small></span>
            ${k.난이도 ? `<span class="d">${esc(k.난이도)}</span>` : ''}</div>`).join('')}
        </div>
        <div class="k-p">${패(3, '난이도 구간별 특징')}
          <div class="k-lv3">${d.난이도.map((x) => `<div class="${x.반}"><b>${esc(x.이름)}</b><u>${x.수}문항</u><s>${x.비율}%</s></div>`).join('')}</div>
          <div class="k-stk">${d.난이도.map((x) => `<i style="width:${x.비율}%;background:${x.색}"></i>`).join('')}</div>
          <div class="k-tip">상 난이도 ${d.난이도.at(-1)?.수 ?? 0}문항이 ${esc(d.난이도.at(-1)?.번호 ?? '')}번에 몰려 있습니다.</div>
        </div>
      </div>
    </div>
    ${바닥(d)}`, CLS));

  // 04 기출 적중 — 사진을 올리셨을 때만
  if (d.적중) {
    장.push(sheet(파일(d, '카드4-기출적중'), `
      ${머리(d, 4, 다)}
      ${제목(d, '기출', '적중 확인', '우리 교재에서<br><b>다룬 문항</b>이에요')}
      <div class="k-grid k-rows2">
        <div class="k-p">${패(1, '시험 범위에서 미리 다룬 문항')}
          <div class="k-hit"><span class="big">${d.적중.맞힌}<u> / ${d.적중.전체}</u></span>
            <span class="r"><b>${d.적중.전체}문항 가운데 ${d.적중.맞힌}문항</b>을<br>
              시험 전에 같은 유형으로 다뤘습니다.${d.적중.자료.length ? `<br><span class="s">학원 교재 ${d.적중.자료.length}종에서 확인한 숫자입니다.</span>` : ''}</span></div>
          ${d.적중.자료.length ? `<div class="k-chips">${d.적중.자료.map((n) => `<span class="k-chip w">${esc(n)}</span>`).join('')}</div>` : ''}
        </div>
        <div class="k-p">${패(2, '학원 교재 사진')}
          <div class="k-shots">${d.적중.사진.slice(0, 4).map((src, i) => `<div class="k-shot">
            <div class="cap">${esc(d.적중.자료[i] ?? `자료 ${i + 1}`)}</div>
            <img src="${esc(src)}" alt=""></div>`).join('')}</div>
        </div>
      </div>
      ${바닥(d, '시험 범위를 먼저 다뤄 두면 시험장에서 낯설지 않습니다')}`, CLS));
  }

  // 05 이후 학습 방향
  장.push(sheet(파일(d, `카드${다}-학습방향`), `
    ${머리(d, 다, 다)}
    ${제목(d, '이후', '학습 방향', '다음 시험은<br><b>이 자리부터</b> 준비해요')}
    <div class="k-grid k-rows3">
      <div class="k-ways">${d.방향.map((w, i) => `<div class="k-way">
        <div class="h"><b>0${i + 1}</b><span>${esc(w.영역)}</span></div>
        <p>${esc(w.설명)}</p>
        <ul class="ck">${w.할것.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        ${w.메모 ? `<div class="pen">${esc(w.메모)}</div>` : ''}</div>`).join('')}</div>
      <div class="k-p k-end">
        <div>
          <div class="lb">마무리</div>
          <div class="ms" contenteditable>${esc(d.마무리)}</div>
          <div class="sb">문항별 분석표는 상담 때 그대로 보여 드립니다.</div>
        </div>
        <div class="rr">${d.영역.slice(0, 3).map((a) => `<div class="k-chip">${esc(a.이름)} ${a.수}문항</div>`).join('')}</div>
      </div>
    </div>
    ${바닥(d)}`, CLS));

  return 장.join('');
}
