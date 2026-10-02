// 카드뉴스 디자인 다섯을 같은 숫자로 그려 놓고 원장님이 고르는 화면.
// 고른 하나만 share.js 로 옮긴다. 제품 코드가 아니다 (2026-10-02).
//
// 여기 숫자는 실제 시험 하나를 그대로 넣은 보기다. 제품에서는 examStats 가 준다.
const 시험 = {
  학원: '리딩브레인영어학원', 영문: 'READING BRAIN',
  학교: '소래중학교', 학년: '중2', 학기: '1학기', 시험: '중간고사', 과목: '영어',
  날짜: '2026년 4월 28일', 범위: '영어2 능률(김) 3~4과 · 부교재 29지문',
  문항: 24, 배점: 100, 구성: '선택형 20문항 + 단답형 2문항 + 서술형 2문항',
  체감: '보통', 체감점수: 3,
  난이도: [
    { 이름: '하', 수: 2, 비율: 8, 번호: '1 · 서1', 설명: '교과서 본문과 기본 어휘', 색: 'var(--low)' },
    { 이름: '중', 수: 17, 비율: 71, 번호: '2~5 · 7~15 · 18~19 · 서2 · 서4', 설명: '지문 이해와 유형 적용', 색: 'var(--mid)' },
    { 이름: '상', 수: 5, 비율: 21, 번호: '6 · 16~17 · 20 · 서3', 설명: '추론·변형으로 상위권 변별', 색: 'var(--high)' },
  ],
  출처: [
    { 이름: '교과서', 수: 12, 비율: 50 },
    { 이름: '부교재', 수: 10, 비율: 42 },
    { 이름: '외부', 수: 2, 비율: 8 },
  ],
  영역: [
    { 이름: '독해', 수: 9, 점: 38, 비율: 38, 번호: '2~4, 8~10, 16~17, 20' },
    { 이름: '어법', 수: 7, 점: 30, 비율: 29, 번호: '5~7, 11, 서1~서2' },
    { 이름: '어휘', 수: 5, 점: 18, 비율: 21, 번호: '1, 12~14, 18' },
    { 이름: '대화문', 수: 3, 점: 14, 비율: 12, 번호: '15, 19, 서4' },
  ],
  // 문항 차례대로 난이도 (0 하 · 1 중 · 2 상) — difficultyFlow() 가 주는 모양
  흐름: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 0, 1, 2, 1],
  흐름번호: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '서1', '서2', '서3', '서4'],
  변별: ['6', '16', '17', '20', '서3'],
  대표: [
    { 번호: '16', 유형: '빈칸', 한줄: '앞뒤 연결어를 놓치면 걸렸습니다', 난이도: '상' },
    { 번호: '20', 유형: '요약', 한줄: '핵심 개념을 한 문장에 담아야 했습니다', 난이도: '상' },
    { 번호: '서3', 유형: '조건 영작', 한줄: '조건 세 개를 모두 지켜야 만점이었습니다', 난이도: '상' },
  ],
  한줄: '글 전체의 흐름을 읽어야 변별 문항이 보입니다',
  서답형비율: 24,
};

const E = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const 색 = ['var(--low)', 'var(--mid)', 'var(--high)'];

// ── 도넛 ──
function donut(rows, 가운데, 아래, r = 112, w = 34) {
  const C = 2 * Math.PI * r;
  let at = 0;
  const 호 = rows.map((x) => {
    const len = (x.비율 / 100) * C;
    const el = `<circle cx="150" cy="150" r="${r}" fill="none" stroke="${x.색}" stroke-width="${w}"
      stroke-dasharray="${len.toFixed(1)} ${(C - len).toFixed(1)}" stroke-dashoffset="${(-at).toFixed(1)}"
      transform="rotate(-90 150 150)"/>`;
    at += len;
    return el;
  }).join('');
  return `<svg viewBox="0 0 300 300" width="272" height="272" aria-hidden="true">
    <circle cx="150" cy="150" r="${r}" fill="none" stroke="#ece6da" stroke-width="${w}"/>${호}
    <text x="150" y="138" text-anchor="middle" font-size="24" font-weight="600" fill="#6b7a89">${E(아래)}</text>
    <text x="150" y="182" text-anchor="middle" font-size="44" font-weight="900" fill="#16202b">${E(가운데)}</text>
  </svg>`;
}

// ── 세로 막대 ──
function vbars(rows, { w = 560, h = 230, 색칠 = null } = {}) {
  const n = rows.length;
  const 칸 = w / n;
  const 폭 = Math.min(84, 칸 * 0.56);
  const 최대 = Math.max(...rows.map((x) => x.비율), 1);
  const 바닥 = h - 52;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" aria-hidden="true">${rows.map((x, i) => {
    const 높이 = Math.max(10, ((x.비율 / 최대) * (바닥 - 42)));
    const cx = 칸 * i + 칸 / 2;
    const c = 색칠 ? 색칠(x, i) : 'var(--navy)';
    return `<rect x="${(cx - 폭 / 2).toFixed(1)}" y="${(바닥 - 높이).toFixed(1)}" width="${폭.toFixed(1)}" height="${높이.toFixed(1)}" rx="5" fill="${c}"/>
      <text x="${cx.toFixed(1)}" y="${(바닥 - 높이 - 12).toFixed(1)}" text-anchor="middle" font-size="22" font-weight="800" fill="#16202b">${x.비율}%</text>
      <text x="${cx.toFixed(1)}" y="${(바닥 + 24).toFixed(1)}" text-anchor="middle" font-size="19" font-weight="700" fill="#16202b">${E(x.이름)}</text>
      <text x="${cx.toFixed(1)}" y="${(바닥 + 46).toFixed(1)}" text-anchor="middle" font-size="16" fill="#6b7a89">${x.수}문항</text>`;
  }).join('')}</svg>`;
}

// ── 문항 구성 흐름 (꺾은선). 변별 문항은 테두리를 달리한다 ──
function flow({ w = 900, h = 300, 막대 = false } = {}) {
  const 위 = 40, 아래 = h - 56, 왼 = 54, 오 = w - 16;
  const n = 시험.흐름.length;
  const 칸 = (오 - 왼) / (n - 1);
  const y = (v) => 아래 - (v / 2) * (아래 - 위);
  const 눈금 = ['하', '중', '상'].map((나, i) =>
    `<line x1="${왼 - 6}" y1="${y(i)}" x2="${오}" y2="${y(i)}" stroke="#e6e9ee" stroke-width="1" stroke-dasharray="4 5"/>
     <text x="${왼 - 16}" y="${y(i) + 7}" text-anchor="end" font-size="17" fill="#8e9bab" font-weight="600">${나}</text>`).join('');
  const 점 = 시험.흐름.map((v, i) => {
    const cx = 왼 + 칸 * i, 변 = 시험.변별.includes(시험.흐름번호[i]);
    if (막대) {
      const 높이 = 아래 - y(v) + 14;
      return `<rect x="${(cx - 13).toFixed(1)}" y="${y(v).toFixed(1)}" width="26" height="${높이.toFixed(1)}" rx="4"
        fill="${색[v]}" ${변 ? 'stroke="#d63b3b" stroke-width="3"' : ''}/>`;
    }
    return `<circle cx="${cx.toFixed(1)}" cy="${y(v).toFixed(1)}" r="${변 ? 9 : 7}" fill="${색[v]}"
      ${변 ? 'stroke="#fff" stroke-width="3"' : ''}/>`;
  }).join('');
  const 선 = 막대 ? '' : `<polyline fill="none" stroke="#9fb0c2" stroke-width="2.5" stroke-linejoin="round"
    points="${시험.흐름.map((v, i) => `${(왼 + 칸 * i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}"/>`;
  const 글 = 시험.흐름번호.map((no, i) => (i % 2 === 0 || no.startsWith('서')
    ? `<text x="${(왼 + 칸 * i).toFixed(1)}" y="${아래 + 30}" text-anchor="middle" font-size="15"
        font-weight="${시험.변별.includes(no) ? 800 : 600}" fill="${시험.변별.includes(no) ? '#d63b3b' : '#8e9bab'}">${E(no)}</text>` : '')).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    ${눈금}${선}${점}${글}</svg>`;
}

const 바닥띠 = (어둠 = false) => `<div class="foot">
  <span class="bulb">💡</span><q>${E(시험.한줄)}</q>
  <span class="who">${E(시험.학원)}<small>${E(시험.영문)}</small></span></div>`;

const 범례 = () => `<div class="keys">${시험.난이도.map((d) => `<i><s class="dot" style="background:${d.색}"></s>${E(d.이름)} ${d.수}문항</i>`).join('')}
  <i><s class="dot" style="background:#fff;border:3px solid #d63b3b"></s>변별 문항</i></div>`;

/* ═══════════ 가 · 한눈에 ═══════════ */
const 가 = () => `<div class="card d1">
  <div class="brand"><span class="nm"><s></s>${E(시험.학원)}</span><span class="ln"></span><span class="pg">01</span></div>
  <h2>${E(시험.학교)} ${E(시험.학년)} ${E(시험.학기)} ${E(시험.시험)}</h2>
  <h3>시험 <em>한눈에 보기</em></h3>
  <div class="kicker"><span>${E(시험.과목)} · EXAM REPORT</span><s></s></div>
  <div class="grid">
    <div class="panel"><span class="pill"><i>1</i>시험 기본 정보</span>
      <div class="rowline"><span class="k">학교</span><span class="v">${E(시험.학교)} ${E(시험.학년)}</span></div>
      <div class="rowline"><span class="k">시험</span><span class="v">${E(시험.학기)} ${E(시험.시험)} (${E(시험.과목)})</span></div>
      <div class="rowline"><span class="k">시험일</span><span class="v">${E(시험.날짜)}</span></div>
      <div class="rowline"><span class="k">문항 구성</span><span class="v">${E(시험.구성)}</span></div>
      <div class="rowline"><span class="k">출제 범위</span><span class="v">${E(시험.범위)}</span></div>
    </div>
    <div class="panel"><span class="pill"><i>2</i>난이도별 문항 분포</span>
      <div style="display:flex;align-items:center;gap:16px">
        ${donut(시험.난이도, `${시험.문항}문항`, '전체')}
        <div class="legend">${시험.난이도.map((d) => `<i><s class="dot" style="background:${d.색}"></s><b>${E(d.이름)} ${d.수}문항</b><s>(${d.비율}%)</s></i>`).join('')}
          <i style="margin-top:6px;font-size:21px">전체 난이도 <b style="margin-left:4px">${E(시험.체감)}</b></i></div>
      </div>
      <div class="note" style="margin-top:auto">중상 이상이 ${시험.난이도[2].수}문항입니다. 여기서 점수가 갈렸습니다.</div>
    </div>
    <div class="panel"><span class="pill"><i>3</i>출처별 출제 비중</span>
      ${vbars(시험.출처, { 색칠: (_, i) => ['#2f6fe0', '#6fa0ef', '#b9d0f7'][i] })}
    </div>
    <div class="panel"><span class="pill"><i>4</i>난이도 단계별 구성</span>
      ${시험.난이도.map((d) => `<div style="margin-bottom:14px">
        <div style="display:flex;align-items:baseline;gap:12px">
          <b style="font-size:23px;color:${d.색};font-weight:900">${E(d.이름)}</b>
          <span style="font-size:17px;color:#6b7a89;font-weight:600">${E(d.설명)}</span>
          <b style="margin-left:auto;font-size:31px;font-weight:900;color:${d.색}">${d.수}<u style="text-decoration:none;font-size:16px;color:#6b7a89"> 문항</u></b>
        </div>
        <div style="font-size:15px;color:#8e9bab;font-weight:600;margin:3px 0 7px">${E(d.번호)}</div>
        <div class="bar"><i style="width:${d.비율}%;background:${d.색}"></i></div></div>`).join('')}
    </div>
  </div>
  ${바닥띠(true)}</div>`;

/* ═══════════ 나 · 종이 ═══════════ */
const 나 = () => `<div class="card d2">
  <div class="head"><div class="eyebrow">${E(시험.과목)} · 내신 분석</div>
    <h3>${E(시험.학교)} ${E(시험.학년)}<br>${E(시험.학기)} ${E(시험.시험)} 총평</h3>
    <p>${E(시험.날짜)} · ${E(시험.범위)}</p></div>
  <div class="kpi">
    <div><b>${시험.문항}</b><span>전체 문항</span></div>
    <div><b>${시험.배점}<u>점</u></b><span>총 배점</span></div>
    <div><b>${시험.서답형비율}<u>%</u></b><span>서답형 배점</span></div>
    <div><b>${시험.난이도[2].수}</b><span>상 난이도 문항</span></div>
  </div>
  <div class="cols">
    <div><h4>영역별 출제</h4><table class="tbl">
      ${시험.영역.map((a) => `<tr><td>${E(a.이름)}<div class="s">${E(a.번호)}번</div></td>
        <td class="n">${a.수}문항<div class="s" style="font-weight:600">${a.점}점</div></td></tr>`).join('')}
    </table>
    <h4 style="margin-top:26px">출처별 출제</h4><table class="tbl">
      ${시험.출처.map((s) => `<tr><td>${E(s.이름)}</td><td class="n">${s.수}문항 · ${s.비율}%</td></tr>`).join('')}
    </table></div>
    <div><h4>난이도 구성</h4>
      <div class="lv">${시험.난이도.map((d, i) => `<div class="l${i + 1}"><b>${E(d.이름)}</b><u>${d.수}문항</u><s>(${d.비율}%)</s></div>`).join('')}</div>
      <div class="stack" style="margin-top:14px">${시험.난이도.map((d) => `<i style="width:${d.비율}%;background:${d.색}"></i>`).join('')}</div>
      <h4 style="margin-top:28px">점수가 갈린 문항</h4><table class="tbl">
        ${시험.대표.map((k) => `<tr><td style="width:74px;font-weight:800">${E(k.번호)}번</td>
          <td>${E(k.유형)}<div class="s">${E(k.한줄)}</div></td></tr>`).join('')}
      </table></div>
  </div>
  ${바닥띠()}</div>`;

/* ═══════════ 다 · 머리띠 ═══════════ */
const 다 = () => `<div class="card d3">
  <div class="band"><div class="top"><span>${E(시험.학원)}</span><span>${E(시험.과목)} · EXAM REPORT</span></div>
    <h3>${E(시험.학교)} ${E(시험.학년)} ${E(시험.학기)}<br>${E(시험.시험)} 출제 분석</h3>
    <p>${E(시험.날짜)} · ${E(시험.구성)}</p></div>
  <div class="body">
    <div class="big">
      <div><b>${시험.문항}<u>문항</u></b><span>전체 · ${시험.배점}점</span></div>
      <div><b>${시험.서답형비율}<u>%</u></b><span>서답형 배점</span></div>
      <div><b>${시험.체감}</b><span>체감 난이도 ${시험.체감점수}/5</span></div>
    </div>
    <div class="two">
      <div class="box"><h4>영역별 출제</h4>
        ${시험.영역.map((a) => `<div style="margin-bottom:15px">
          <div style="display:flex;align-items:baseline;font-size:20px;font-weight:700">
            <span>${E(a.이름)}</span><b style="margin-left:auto">${a.수}문항 · ${a.점}점</b></div>
          <div style="font-size:15px;color:#8e9bab;font-weight:600;margin:3px 0 6px">${E(a.번호)}번</div>
          <div class="bar"><i style="width:${a.비율}%;background:var(--wine-2)"></i></div></div>`).join('')}
      </div>
      <div class="box"><h4>난이도 구성</h4>
        <div class="lv">${시험.난이도.map((d, i) => `<div class="l${i + 1}"><b>${E(d.이름)}</b><u>${d.수}문항</u><s>(${d.비율}%)</s></div>`).join('')}</div>
        <div class="stack" style="margin:16px 0 20px">${시험.난이도.map((d) => `<i style="width:${d.비율}%;background:${d.색}"></i>`).join('')}</div>
        <h4>점수가 갈린 문항</h4>
        ${시험.대표.map((k) => `<div style="display:flex;gap:13px;align-items:flex-start;margin-bottom:13px">
          <b style="flex:none;display:grid;place-items:center;min-width:52px;height:38px;border-radius:9px;
            background:var(--wine);color:#fff;font-size:19px;font-weight:800">${E(k.번호)}</b>
          <div style="font-size:19px;font-weight:700;line-height:1.4">${E(k.유형)}
            <div style="font-size:16px;color:#6b7a89;font-weight:600;margin-top:2px">${E(k.한줄)}</div></div></div>`).join('')}
      </div>
    </div>
  </div>
  ${바닥띠()}</div>`;

/* ═══════════ 라 · 흐름 ═══════════ */
const 라 = () => `<div class="card d4">
  <div class="head"><div>
    <div class="eyebrow">${E(시험.과목)} · EXAM REPORT</div>
    <h3>문항 구성 흐름</h3>
    <p>${E(시험.학교)} ${E(시험.학년)} ${E(시험.학기)} ${E(시험.시험)} · 번호 순 난이도</p></div>
    <div class="tag">${E(시험.학원)}<br>${E(시험.날짜)}</div></div>
  <div class="strip">
    <div><b>${시험.문항}<u>문항</u></b><span>전체 · ${시험.배점}점</span></div>
    <div><b>${시험.난이도[2].수}<u>문항</u></b><span>상 난이도</span></div>
    <div><b>${시험.서답형비율}<u>%</u></b><span>서답형 배점</span></div>
    <div><b>${시험.체감}</b><span>체감 난이도</span></div>
  </div>
  <div class="plot"><h4>번호가 뒤로 갈수록 어떻게 물었나</h4>
    <p>빨간 테두리 = 점수가 갈린 변별 문항</p>
    <div style="flex:1;min-height:0">${flow({ w: 900, h: 300 })}</div>
    ${범례()}</div>
  <div class="strip" style="grid-template-columns:repeat(3,1fr)">
    ${시험.대표.map((k) => `<div><b style="font-size:26px">${E(k.번호)}번 <u style="font-size:17px">${E(k.유형)}</u></b>
      <span style="margin-top:5px;line-height:1.45">${E(k.한줄)}</span></div>`).join('')}
  </div>
  ${바닥띠()}</div>`;

/* ═══════════ 마 · 밤 ═══════════ */
const 마 = () => `<div class="card d5">
  <div class="head"><div>
    <div class="eyebrow">${E(시험.과목)} · EXAM REPORT</div>
    <h3>${E(시험.학교)} ${E(시험.학년)}<br>${E(시험.학기)} ${E(시험.시험)}</h3></div>
    <div class="pg">${E(시험.학원)}<br>${E(시험.날짜)}</div></div>
  <div class="hero"><b>${시험.문항}</b><span class="u">문항 · ${시험.배점}점</span>
    <div class="r">체감 난이도 <em>${E(시험.체감)}</em> (${시험.체감점수}/5)<br>
      상 난이도 <em>${시험.난이도[2].수}문항</em> · 서답형 배점 <em>${시험.서답형비율}%</em></div></div>
  <div class="rows">
    ${시험.영역.map((a) => `<div class="r2">
      <div class="nm">${E(a.이름)}<small>${E(a.번호)}번</small></div>
      <div class="bar"><i style="width:${a.비율}%;background:linear-gradient(90deg,var(--wine-2),#d9a441)"></i></div>
      <div class="n">${a.수}<u>문항 · ${a.점}점</u></div></div>`).join('')}
    ${시험.난이도.map((d) => `<div class="r2">
      <div class="nm" style="color:${d.색}">난이도 ${E(d.이름)}<small style="color:#7e95ab">${E(d.설명)}</small></div>
      <div class="bar"><i style="width:${d.비율}%;background:${d.색}"></i></div>
      <div class="n">${d.수}<u>문항 · ${d.비율}%</u></div></div>`).join('')}
  </div>
  ${바닥띠(true)}</div>`;

const 목록 = [
  ['가', '한눈에 — 네이비 바탕에 크림 패널 넷', 가],
  ['나', '종이 — 베이지 바탕, 버건디 선. 차분한 편집 디자인', 나],
  ['다', '머리띠 — 버건디 띠 + 흰 바탕, 큰 숫자 셋', 다],
  ['라', '흐름 — 꺾은선 하나를 주인공으로', 라],
  ['마', '밤 — 아주 어두운 바탕, 선과 숫자만', 마],
];

document.getElementById('lab').innerHTML = 목록.map(([표, 설명, 그리기]) => `
  <section class="pick"><h2><b>${표}</b>${E(설명.split(' — ')[0])}<small>${E(설명.split(' — ')[1] || '')}</small></h2>
    <div class="hold"><div class="scale">${그리기()}</div></div></section>`).join('');

// 1080 짜리를 칸 너비에 맞춰 줄인다 (PNG 로 뽑을 땐 1 로 두면 그대로 나온다)
const 맞추기 = () => document.querySelectorAll('.scale').forEach((box) => {
  const card = box.firstElementChild;
  if (card) card.style.transform = `scale(${box.clientWidth / 1080})`;
});
맞추기();
addEventListener('resize', 맞추기);
document.fonts?.ready.then(맞추기);
