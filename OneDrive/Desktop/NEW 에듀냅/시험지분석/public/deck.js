// 업그레이드 판 카드뉴스 다섯 장 — 한 벌로 이어지는 덱 (2026-10-02 원장님이 고르신 방향).
// 참고 덱의 짜임과 분위기만 본다. 저쪽 문장·브랜드·문구는 가져오지 않는다.
// 여기 숫자는 보기다. 제품에서는 examStats / draftSchool 이 그대로 넣는다.
const 시험 = {
  학원: '리딩브레인영어학원', 영문: 'READING BRAIN',
  학교: '소래중학교', 학년: '중2', 학기: '1학기', 시험: '중간고사', 과목: '영어', 학교급: '중등',
  날짜: '2026년 4월 28일', 범위: '영어2 능률(김) 3~4과 · 부교재 29지문',
  문항: 24, 배점: 100, 구성: '선택형 20 · 단답형 2 · 서술형 2',
  체감: '보통', 체감점수: 3, 서답형비율: 24,
  난이도: [
    { 이름: '하', 수: 2, 비율: 8, 번호: '1 · 서1', 설명: '교과서 본문과 기본 어휘', 색: 'var(--low)', 반: 'a' },
    { 이름: '중', 수: 17, 비율: 71, 번호: '2~5 · 7~15 · 18~19 · 서2 · 서4', 설명: '지문 이해와 유형 적용', 색: 'var(--mid)', 반: 'b' },
    { 이름: '상', 수: 5, 비율: 21, 번호: '6 · 16~17 · 20 · 서3', 설명: '추론·변형으로 상위권 변별', 색: 'var(--high)', 반: 'c' },
  ],
  출처: [{ 이름: '교과서', 수: 12, 비율: 50 }, { 이름: '부교재', 수: 10, 비율: 42 }, { 이름: '외부', 수: 2, 비율: 8 }],
  영역: [
    { 이름: '독해', 수: 9, 점: 38, 비율: 38, 번호: '2~4, 8~10, 16~17, 20', 유형: ['내용 일치', '빈칸', '제목 찾기'] },
    { 이름: '어법', 수: 7, 점: 30, 비율: 29, 번호: '5~7, 11, 서1~서2', 유형: ['시제', 'to부정사', '어형 바꿔 쓰기'] },
    { 이름: '어휘', 수: 5, 점: 18, 비율: 21, 번호: '1, 12~14, 18', 유형: ['영영풀이', '문맥 속 뜻'] },
    { 이름: '대화문', 수: 3, 점: 14, 비율: 12, 번호: '15, 19, 서4', 유형: ['이어질 말', '조건 영작'] },
  ],
  배점: [{ 점: 5, 수: 6, 번호: '6, 16~17, 20, 서2~서3' }, { 점: 4, 수: 10, 번호: '2~5, 8~11, 18~19' }, { 점: 3, 수: 8, 번호: '1, 7, 12~15, 서1, 서4' }],
  흐름: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 0, 1, 2, 1],
  흐름번호: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '서1', '서2', '서3', '서4'],
  변별: ['6', '16', '17', '20', '서3'],
  대표: [
    { 번호: '16', 유형: '독해 · 빈칸', 한줄: '앞뒤 연결어를 놓치면 걸렸습니다', 난이도: '상' },
    { 번호: '17', 유형: '독해 · 제목 찾기', 한줄: '글 전체를 한 줄로 줄여야 했습니다', 난이도: '상' },
    { 번호: '20', 유형: '독해 · 요약', 한줄: '핵심 개념을 한 문장에 담아야 했습니다', 난이도: '상' },
    { 번호: '서3', 유형: '어법 · 조건 영작', 한줄: '조건 세 개를 모두 지켜야 만점이었습니다', 난이도: '상' },
  ],
  적중: { 맞힌: 17, 전체: 24, 자료: ['3~4과 변형문제 2회', '3~4과 변형문제 7회', '어법 집중 정리지'] },
  방향: [
    { 영역: '독해', 설명: '글의 흐름을 먼저 세우고 근거를 찾습니다.', 할것: ['문단마다 중심 문장 표시', '연결어로 흐름 따라가기'], 메모: '빈칸은 앞뒤를\n먼저 읽어요' },
    { 영역: '어법', 설명: '규칙을 외우지 말고 문장에서 고칩니다.', 할것: ['시제·수일치 틀린 문장 고치기', '조건 영작은 조건부터 세기'], 메모: '조건 개수를\n꼭 세어요' },
    { 영역: '어휘', 설명: '뜻만이 아니라 쓰이는 자리를 익힙니다.', 할것: ['영영풀이로 다시 보기', '본문 문장 그대로 외우기'], 메모: '문장째로\n외워요' },
    { 영역: '대화문', 설명: '상황을 그려 보고 이어질 말을 고릅니다.', 할것: ['역할을 나눠 소리 내 읽기', '자주 나오는 표현 모으기'], 메모: '소리 내어\n읽어요' },
  ],
  한줄: '글 전체의 흐름을 읽어야 변별 문항이 보입니다',
  마무리: '이번 시험에서 드러난 자리를 다음 시험의 기준으로 삼겠습니다.',
};

const E = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const 색 = ['var(--low)', 'var(--mid)', 'var(--high)'];
const 쪽 = (n) => `<span class="pg">0${n}<u> / 05</u></span>`;

const 머리 = (n) => `<div class="top">
  <span class="nm"><s></s><span>${E(시험.학원)}<small>${E(시험.영문)}</small></span></span>
  <span class="rule"></span>${쪽(n)}</div>`;

const 제목 = (앞, 뒤, 쪽지) => `<div class="head">
  <h2>${E(시험.학교)} ${E(시험.학년)} ${E(시험.학기)} ${E(시험.시험)}</h2>
  <h1>${E(앞)} <em>${E(뒤)}</em></h1>
  <div class="kick"><span>${E(시험.과목)} · EXAM REPORT</span><s></s></div></div>
  ${쪽지 ? `<div class="memo">${쪽지}</div>` : ''}`;

const 바닥 = (말 = 시험.한줄) => `<div class="foot">
  <span class="bulb">💡</span><q>${E(말)}</q>
  <span class="who">${E(시험.학원)}<small>${E(시험.영문)}</small></span></div>`;

const 패 = (no, 제목, 작게 = '') =>
  `<div class="ph"><b><i>${no}</i>${E(제목)}</b>${작게 ? `<small>${E(작게)}</small>` : ''}</div>`;

// ── 도넛 ──
function donut(rows, 가운데, 위, r = 104, w = 32) {
  const C = 2 * Math.PI * r; let at = 0;
  const 호 = rows.map((x) => {
    const len = (x.비율 / 100) * C;
    const el = `<circle cx="140" cy="140" r="${r}" fill="none" stroke="${x.색}" stroke-width="${w}"
      stroke-dasharray="${len.toFixed(1)} ${(C - len).toFixed(1)}" stroke-dashoffset="${(-at).toFixed(1)}"
      transform="rotate(-90 140 140)" stroke-linecap="butt"/>`;
    at += len; return el;
  }).join('');
  return `<svg viewBox="0 0 280 280" width="248" height="248">
    <circle cx="140" cy="140" r="${r}" fill="none" stroke="#ece4d4" stroke-width="${w}"/>${호}
    <text x="140" y="130" text-anchor="middle" font-size="21" font-weight="600" fill="#55616e">${E(위)}</text>
    <text x="140" y="170" text-anchor="middle" font-size="40" font-weight="900" fill="#16202b">${E(가운데)}</text></svg>`;
}

// ── 문항별 난이도 막대. 변별 문항은 테두리로 가린다 ──
function bars({ w = 940, h = 258 } = {}) {
  const 위 = 26, 아래 = h - 44, 왼 = 44, 오 = w - 10;
  const n = 시험.흐름.length, 칸 = (오 - 왼) / n, 폭 = Math.min(30, 칸 * 0.62);
  const y = (v) => 아래 - ((v + 1) / 3) * (아래 - 위);
  const 눈 = ['하', '중', '상'].map((나, i) =>
    `<line x1="${왼 - 6}" y1="${y(i)}" x2="${오}" y2="${y(i)}" stroke="#e6ddc9" stroke-dasharray="4 5"/>
     <text x="${왼 - 14}" y="${y(i) + 6}" text-anchor="end" font-size="15" fill="#8b8372" font-weight="700">${나}</text>`).join('');
  const 막 = 시험.흐름.map((v, i) => {
    const cx = 왼 + 칸 * i + 칸 / 2, 변 = 시험.변별.includes(시험.흐름번호[i]);
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${폭.toFixed(1)}"
      height="${(아래 - y(v)).toFixed(1)}" rx="5" fill="${색[v]}"
      ${변 ? 'stroke="#d63b3b" stroke-width="3.5"' : ''}/>
      <text x="${cx.toFixed(1)}" y="${아래 + 24}" text-anchor="middle" font-size="13.5"
        font-weight="${변 ? 800 : 600}" fill="${변 ? '#d63b3b' : '#8b8372'}">${E(시험.흐름번호[i])}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">${눈}${막}</svg>`;
}

// ── 번호 순 난이도 꺾은선 ──
function line({ w = 620, h = 210 } = {}) {
  const 위 = 22, 아래 = h - 38, 왼 = 38, 오 = w - 8;
  const n = 시험.흐름.length, 칸 = (오 - 왼) / (n - 1);
  const y = (v) => 아래 - (v / 2) * (아래 - 위);
  const 눈 = ['하', '중', '상'].map((나, i) =>
    `<line x1="${왼 - 5}" y1="${y(i)}" x2="${오}" y2="${y(i)}" stroke="#e6ddc9" stroke-dasharray="4 5"/>
     <text x="${왼 - 12}" y="${y(i) + 5}" text-anchor="end" font-size="13" fill="#8b8372" font-weight="700">${나}</text>`).join('');
  const 선 = `<polyline fill="none" stroke="#b9ae97" stroke-width="2.2" stroke-linejoin="round"
    points="${시험.흐름.map((v, i) => `${(왼 + 칸 * i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}"/>`;
  const 점 = 시험.흐름.map((v, i) => {
    const 변 = 시험.변별.includes(시험.흐름번호[i]);
    return `<circle cx="${(왼 + 칸 * i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${변 ? 7.5 : 5.5}"
      fill="${색[v]}" ${변 ? 'stroke="#fff" stroke-width="2.6"' : ''}/>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">${눈}${선}${점}</svg>`;
}

// ── 세로 막대 (출처) ──
function vbars(rows, { w = 470, h = 212 } = {}) {
  const 칸 = w / rows.length, 폭 = Math.min(76, 칸 * 0.5), 바닥 = h - 48;
  const 최대 = Math.max(...rows.map((x) => x.비율), 1);
  const 톤 = ['#8e2b2d', '#b9595b', '#dba1a2'];
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}">${rows.map((x, i) => {
    const 높 = Math.max(12, (x.비율 / 최대) * (바닥 - 38)), cx = 칸 * i + 칸 / 2;
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${(바닥 - 높).toFixed(1)}" width="${폭.toFixed(1)}"
        height="${높.toFixed(1)}" rx="6" fill="${톤[i] || '#dba1a2'}"/>
      <text x="${cx}" y="${(바닥 - 높 - 11).toFixed(1)}" text-anchor="middle" font-size="21" font-weight="800" fill="#16202b">${x.비율}%</text>
      <text x="${cx}" y="${바닥 + 23}" text-anchor="middle" font-size="17" font-weight="700" fill="#16202b">${E(x.이름)}</text>
      <text x="${cx}" y="${바닥 + 42}" text-anchor="middle" font-size="14.5" fill="#55616e">${x.수}문항</text>`;
  }).join('')}</svg>`;
}

/* ══════════ 01 시험 한눈에 ══════════ */
const 장1 = () => `<div class="card">
  ${머리(1)}
  ${제목('시험', '한눈에 보기', `${E(시험.과목)}는 <b>교과서 본문</b>에서<br>가장 많이 나왔어요`)}
  <div class="grid g22">
    <div class="p">${패(1, '시험 기본 정보')}
      <div class="kv"><span class="k">학교 · 학년</span><span class="v">${E(시험.학교)} ${E(시험.학년)}</span></div>
      <div class="kv"><span class="k">시험</span><span class="v">${E(시험.학기)} ${E(시험.시험)} · ${E(시험.과목)}</span></div>
      <div class="kv"><span class="k">시험일</span><span class="v">${E(시험.날짜)}</span></div>
      <div class="kv"><span class="k">문항 구성</span><span class="v">${E(시험.구성)}</span></div>
      <div class="kv"><span class="k">출제 범위</span><span class="v">${E(시험.범위)}</span></div>
      <div class="tip">문항마다 영역·배점·난이도·출처를 적어 분석했습니다.</div>
    </div>
    <div class="p">${패(2, '난이도별 문항 분포')}
      <div style="display:flex;align-items:center;gap:14px">
        ${donut(시험.난이도, `${시험.문항}문항`, '전체')}
        <div class="leg">${시험.난이도.map((d) => `<i><s class="dot" style="background:${d.색}"></s>${E(d.이름)} ${d.수}문항<s>${d.비율}%</s></i>`).join('')}
          <i style="margin-top:7px;font-size:19px">체감 난이도 <b style="margin-left:4px;color:var(--wine)">${E(시험.체감)}</b></i></div>
      </div>
      <div class="tip">중상 이상 ${시험.난이도[2].수}문항에서 점수가 갈렸습니다.</div>
    </div>
    <div class="p">${패(3, '출처별 출제 비중')}${vbars(시험.출처)}</div>
    <div class="p">${패(4, '난이도 단계별 구성')}
      ${시험.난이도.map((d) => `<div style="margin-bottom:13px">
        <div style="display:flex;align-items:baseline;gap:11px">
          <b style="font-size:21px;font-weight:900;color:${d.색}">${E(d.이름)}</b>
          <span style="font-size:16px;color:var(--ink-2);font-weight:700">${E(d.설명)}</span>
          <b style="margin-left:auto;font-size:29px;font-weight:900;color:${d.색}">${d.수}<u style="text-decoration:none;font-size:15px;color:var(--ink-2)"> 문항</u></b></div>
        <div style="font-size:14px;color:#8b8372;font-weight:600;margin:3px 0 7px">${E(d.번호)}</div>
        <div class="bar"><i style="width:${d.비율}%;background:${d.색}"></i></div></div>`).join('')}
    </div>
  </div>
  ${바닥()}</div>`;

/* ══════════ 02 출제 구조 ══════════ */
const 장2 = () => `<div class="card">
  ${머리(2)}
  ${제목('출제', '구조 분석', `<b>어법</b>과 <b>독해</b>가<br>배점의 대부분이었어요`)}
  <div class="grid" style="grid-template-rows:1.25fr 1fr">
    <div class="p">${패(1, '영역별 출제', '큰 숫자 = 문항 수')}
      <div class="areas">${시험.영역.map((a) => `<div class="ac">
        <span class="nm">${E(a.이름)}</span>
        <span class="big"><b>${a.수}</b><span>문항 · ${a.비율}%</span></span>
        <div class="bar"><i style="width:${a.비율}%;background:var(--wine-hi)"></i></div>
        <ul>${a.유형.map((t) => `<li>${E(t)}</li>`).join('')}</ul>
        <div class="fin">주요 문항 ${E(a.번호)}번</div></div>`).join('')}</div>
    </div>
    <div class="grid g22" style="display:grid">
      <div class="p">${패(2, '배점 구성')}
        ${시험.배점.map((b) => `<div class="kv"><span class="k" style="width:76px;font-weight:800;color:var(--wine)">${b.점}점</span>
          <span class="v">${b.수}문항 <span class="chip" style="margin-left:6px">${E(b.번호)}번</span></span></div>`).join('')}
        <div class="tip">배점이 큰 ${시험.배점[0].점}점 문항이 ${시험.배점[0].수}개였습니다.</div>
      </div>
      <div class="p">${패(3, '문항 구성 흐름', '번호 순 난이도')}
        <div style="flex:1;min-height:0">${line()}</div>
        <div style="display:flex;gap:16px;justify-content:center;font-size:15px;font-weight:700;padding-top:6px">
          ${시험.난이도.map((d) => `<span style="display:flex;align-items:center;gap:7px"><s class="dot" style="background:${d.색}"></s>${E(d.이름)}</span>`).join('')}
          <span style="display:flex;align-items:center;gap:7px"><s class="dot" style="background:#fff;box-shadow:0 0 0 2.5px #d63b3b inset"></s>변별</span>
        </div>
      </div>
    </div>
  </div>
  ${바닥('배점이 큰 자리에 어려운 문항이 몰렸습니다')}</div>`;

/* ══════════ 03 변별 구간 ══════════ */
const 장3 = () => `<div class="card">
  ${머리(3)}
  ${제목('변별', '구간 분석', `뒤로 갈수록<br><b>추론 문항</b>이 늘었어요`)}
  <div class="grid" style="grid-template-rows:1.15fr 1fr">
    <div class="p">${패(1, '문항별 난이도', '빨간 테두리 = 점수가 갈린 문항')}
      <div style="flex:1;min-height:0">${bars()}</div></div>
    <div class="grid g31" style="display:grid">
      <div class="p">${패(2, '점수가 갈린 문항')}
        ${시험.대표.slice(0, 3).map((k) => `<div class="keyrow"><b class="no">${E(k.번호)}</b>
          <span class="t">${E(k.유형)}<small>${E(k.한줄)}</small></span>
          <span class="d">${E(k.난이도)}</span></div>`).join('')}
      </div>
      <div class="p">${패(3, '난이도 구간별 특징')}
        <div class="lv3">${시험.난이도.map((d) => `<div class="${d.반}"><b>${E(d.이름)}</b><u>${d.수}문항</u><s>${d.비율}%</s></div>`).join('')}</div>
        <div class="stk" style="margin:14px 0 15px">${시험.난이도.map((d) => `<i style="width:${d.비율}%;background:${d.색}"></i>`).join('')}</div>
        <div class="tip">상 난이도 ${시험.난이도[2].수}문항이 ${시험.난이도[2].번호}에 몰려 있습니다.</div>
      </div>
    </div>
  </div>
  ${바닥()}</div>`;

/* ══════════ 04 기출 적중 (선택 — 사진을 안 올리면 이 장은 빠진다) ══════════ */
const 장4 = (사진 = []) => `<div class="card">
  ${머리(4)}
  ${제목('기출', '적중 확인', `우리 교재에서<br><b>다룬 문항</b>이에요`)}
  <div class="grid" style="grid-template-rows:auto 1fr">
    <div class="p">${패(1, '시험 범위에서 미리 다룬 문항')}
      <div class="hit">
        <span class="big">${시험.적중.맞힌}<u> / ${시험.적중.전체}</u></span>
        <span class="r"><b>${시험.적중.전체}문항 가운데 ${시험.적중.맞힌}문항</b>을<br>
          시험 전에 같은 유형·같은 지문으로 다뤘습니다.<br>
          <span style="font-size:16px;color:#6b7580;font-weight:600">학원 교재 ${시험.적중.자료.length}종에서 확인한 숫자입니다.</span></span>
      </div>
      <div style="display:flex;gap:9px;margin-top:14px;flex-wrap:wrap">
        ${시험.적중.자료.map((n) => `<span class="chip w">${E(n)}</span>`).join('')}</div>
    </div>
    <div class="p">${패(2, '학원 교재 사진', '선택 — 올리지 않으면 이 장은 만들지 않습니다')}
      <div class="shots">${[0, 1, 2, 3].map((i) => `<div class="shot">
        <div class="cap">${['변형문제 2회', '변형문제 7회', '어법 정리지', '서술형 대비지'][i]}</div>
        ${사진[i] ? `<img src="${E(사진[i])}" alt="">` : '<div class="ph2">사진 자리</div>'}</div>`).join('')}</div>
    </div>
  </div>
  ${바닥('시험 범위를 먼저 다뤄 두면 시험장에서 낯설지 않습니다')}</div>`;

/* ══════════ 05 이후 학습 방향 ══════════ */
const 장5 = () => `<div class="card">
  ${머리(5)}
  ${제목('이후', '학습 방향', `다음 시험은<br><b>이 자리부터</b> 준비해요`)}
  <div class="grid" style="grid-template-rows:1fr auto">
    <div class="ways">${시험.방향.map((w, i) => `<div class="way">
      <div class="h"><b>0${i + 1}</b><span>${E(w.영역)}</span></div>
      <p>${E(w.설명)}</p>
      <ul class="ck">${w.할것.map((t) => `<li>${E(t)}</li>`).join('')}</ul>
      <div class="pen">${E(w.메모).replace(/\n/g, '<br>')}</div></div>`).join('')}</div>
    <div class="p soft" style="flex-direction:row;align-items:center;gap:22px">
      <div style="flex:1">
        <div style="font-size:14px;font-weight:800;letter-spacing:.24em;color:var(--wine);margin-bottom:8px">마무리</div>
        <div style="font-size:25px;font-weight:800;line-height:1.42;letter-spacing:-.02em">${E(시험.마무리)}</div>
        <div style="font-size:17px;color:var(--ink-2);font-weight:600;margin-top:7px">문항별 분석표는 상담 때 그대로 보여 드립니다.</div>
      </div>
      <div style="flex:none;text-align:right">
        ${시험.영역.slice(0, 3).map((a) => `<div class="chip" style="display:block;margin-bottom:7px">${E(a.이름)} ${a.수}문항</div>`).join('')}
      </div>
    </div>
  </div>
  ${바닥()}</div>`;

const 덱 = [
  ['01', '시험 한눈에', 장1],
  ['02', '출제 구조', 장2],
  ['03', '변별 구간', 장3],
  ['04', '기출 적중 (선택)', () => 장4([])],
  ['05', '이후 학습 방향', 장5],
];

document.getElementById('lab').innerHTML = 덱.map(([no, 이름, 그리기]) => `
  <section><h2 style="display:flex;align-items:center;gap:10px;margin:0 0 10px;font-size:18px;font-weight:800">
    <b style="display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:#06192b;color:#fff;font-size:13px">${no}</b>${E(이름)}</h2>
  <div class="hold"><div class="scale">${그리기()}</div></div></section>`).join('');

const 맞추기 = () => document.querySelectorAll('.scale').forEach((b) => {
  const c = b.firstElementChild;
  if (c) c.style.transform = `scale(${b.clientWidth / 1080})`;
});
맞추기();
addEventListener('resize', 맞추기);
document.fonts?.ready.then(맞추기);
