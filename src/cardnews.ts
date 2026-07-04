// 인스타그램용 정사각(1080×1080) 카드뉴스 생성기 — 외부 라이브러리 없이 Canvas 2D로 렌더링.
// 슬라이드 구성은 학원 인스타 시험분석 게시물의 인기 형식(표지 훅 → 총평 → 난이도 → 유형 →
// 서술형 집중 분석 → 대비 전략 + 학원 CTA)을 따른다.
import type { Exam, Question } from './types'
import { byType, bySource, examStats, strategyNotes } from './analysis'

export const BRAND = '리딩브레인 영어학원'

const W = 1080
const C = {
  navy: '#0e2a4f',
  navyDeep: '#081b34',
  blue: '#2a78d6',
  blueLight: '#86b6ef',
  sky: '#eaf2fc',
  yellow: '#f5b301',
  red: '#d03b3b',
  aqua: '#1baf7a',
  ink: '#101010',
  sub: '#4c4b48',
  muted: '#8a8781',
  bg: '#f7f8fa',
  card: '#ffffff',
  line: '#e3e2dc',
}
export const DIFF_COLOR: Record<Question['difficulty'], string> = {
  하: C.blueLight,
  중: C.blue,
  상: C.red,
}

const FONT = `system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`
const f = (weight: number | string, size: number) => `${weight} ${size}px ${FONT}`

function ctx1080(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas')
  c.width = W
  c.height = W
  const g = c.getContext('2d')!
  return [c, g]
}

function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
}

function wrap(g: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w
    if (g.measureText(t).width > maxW && cur) {
      lines.push(cur)
      cur = w
    } else cur = t
  }
  if (cur) lines.push(cur)
  return lines
}

/** 시험 체감 난이도: 하1 중2 상3 평균 → 별 1~5 */
export function starRating(qs: Question[]): { stars: number; label: string } {
  if (qs.length === 0) return { stars: 0, label: '-' }
  const score = qs.reduce((s, q) => s + (q.difficulty === '상' ? 3 : q.difficulty === '중' ? 2 : 1), 0) / qs.length
  const stars = Math.min(5, Math.max(1, Math.round((score / 3) * 5)))
  const label = stars <= 2 ? '평이한 편' : stars === 3 ? '보통' : stars === 4 ? '까다로운 편' : '최상위 변별'
  return { stars, label }
}

/** 표지 훅 문구 — 가장 두드러진 지표 하나를 골라 문장으로 */
function hookLine(exam: Exam): string {
  const s = examStats(exam.questions)
  const p = (x: number) => Math.round(x * 100)
  if (s.essayPointsRatio >= 0.3) return `서술형 ${p(s.essayPointsRatio)}%가 등급을 갈랐습니다`
  if (s.hardRatio >= 0.25) return `고난도 문항 ${p(s.hardRatio)}%, 변별력 있는 시험`
  if (s.externalRatio >= 0.4) return `교과서 밖에서 ${p(s.externalRatio)}% 출제됐습니다`
  return '교과서 완벽 대비가 답이었습니다'
}

function header(g: CanvasRenderingContext2D, title: string, page: number, total: number) {
  g.fillStyle = C.bg
  g.fillRect(0, 0, W, W)
  g.fillStyle = C.navy
  g.fillRect(0, 0, W, 12)
  g.fillStyle = C.ink
  g.font = f(800, 46)
  g.textBaseline = 'alphabetic'
  g.textAlign = 'left'
  g.fillText(title, 72, 128)
  g.fillStyle = C.muted
  g.font = f(600, 26)
  g.textAlign = 'right'
  g.fillText(`${page} / ${total}`, W - 72, 126)
  g.textAlign = 'left'
}

function footer(g: CanvasRenderingContext2D, exam: Exam) {
  g.fillStyle = C.navy
  g.fillRect(0, W - 96, W, 96)
  g.fillStyle = '#ffffff'
  g.font = f(800, 30)
  g.fillText(`RB  ${BRAND}`, 72, W - 38)
  g.fillStyle = 'rgba(255,255,255,0.75)'
  g.font = f(500, 24)
  g.textAlign = 'right'
  g.fillText(`${exam.school} ${exam.grade} · ${exam.year} ${exam.kind} 영어`, W - 72, W - 38)
  g.textAlign = 'left'
}

function card(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  g.fillStyle = C.card
  rr(g, x, y, w, h, 20)
  g.fill()
  g.strokeStyle = C.line
  g.lineWidth = 2
  rr(g, x, y, w, h, 20)
  g.stroke()
}

/* ---------- 슬라이드 ---------- */

function coverSlide(exam: Exam): HTMLCanvasElement {
  const [c, g] = ctx1080()
  const grad = g.createLinearGradient(0, 0, W, W)
  grad.addColorStop(0, C.navy)
  grad.addColorStop(1, C.navyDeep)
  g.fillStyle = grad
  g.fillRect(0, 0, W, W)

  // 장식 링
  g.strokeStyle = 'rgba(255,255,255,0.08)'
  g.lineWidth = 90
  g.beginPath()
  g.arc(W - 120, 150, 210, 0, Math.PI * 2)
  g.stroke()

  // 브랜드 칩
  g.fillStyle = C.yellow
  rr(g, 72, 88, 64, 64, 16)
  g.fill()
  g.fillStyle = C.navyDeep
  g.font = f(900, 30)
  g.fillText('RB', 84, 130)
  g.fillStyle = '#ffffff'
  g.font = f(700, 32)
  g.fillText(BRAND, 156, 130)

  g.fillStyle = 'rgba(255,255,255,0.85)'
  g.font = f(700, 40)
  g.fillText(`${exam.year} ${exam.kind} · 영어`, 72, 400)

  g.fillStyle = '#ffffff'
  g.font = f(900, 96)
  g.fillText(exam.school, 72, 520)
  g.font = f(900, 76)
  g.fillText(`${exam.grade} 내신 심층분석`, 72, 622)

  // 훅 배지
  const hook = hookLine(exam)
  g.font = f(800, 40)
  const hw = g.measureText(hook).width + 88
  g.fillStyle = C.yellow
  rr(g, 72, 700, hw, 88, 44)
  g.fill()
  g.fillStyle = C.navyDeep
  g.fillText(hook, 116, 758)

  const s = examStats(exam.questions)
  g.fillStyle = 'rgba(255,255,255,0.7)'
  g.font = f(600, 30)
  g.fillText(`총 ${s.total}문항 · ${s.totalPoints}점 만점 문항별 전수 분석`, 72, 880)

  g.fillStyle = 'rgba(255,255,255,0.45)'
  g.font = f(500, 26)
  g.fillText('넘겨서 확인하세요  →', 72, 990)
  return c
}

function overviewSlide(exam: Exam, page: number, total: number): HTMLCanvasElement {
  const [c, g] = ctx1080()
  header(g, '시험 한눈에 보기', page, total)
  const s = examStats(exam.questions)
  const { stars, label } = starRating(exam.questions)

  // 체감 난이도 별점
  card(g, 72, 176, W - 144, 190)
  g.fillStyle = C.sub
  g.font = f(700, 30)
  g.fillText('체감 난이도', 112, 246)
  g.font = f(700, 64)
  let sx = 112
  for (let i = 0; i < 5; i++) {
    g.fillStyle = i < stars ? C.yellow : C.line
    g.fillText('★', sx, 330)
    sx += 78
  }
  g.fillStyle = C.ink
  g.font = f(900, 52)
  g.fillText(label, sx + 40, 322)

  const pct = (x: number) => `${Math.round(x * 100)}%`
  const tiles: [string, string, string][] = [
    ['총 문항 · 배점', `${s.total}문항`, `${s.totalPoints}점 만점`],
    ['서술형 비중', pct(s.essayPointsRatio), `${s.essayCount}문항 ${s.essayPoints}점`],
    ['고난도(상) 비율', pct(s.hardRatio), `${s.hardCount}문항`],
    ['교과서 외 출처', pct(s.externalRatio), '부교재·모의고사·변형'],
  ]
  tiles.forEach(([t, v, sub], i) => {
    const x = 72 + (i % 2) * ((W - 144) / 2 + 0)
    const w = (W - 144 - 24) / 2
    const y = 406 + Math.floor(i / 2) * 250
    card(g, x + (i % 2) * 24, y, w, 226)
    const cx = x + (i % 2) * 24 + 40
    g.fillStyle = C.sub
    g.font = f(700, 28)
    g.fillText(t, cx, y + 62)
    g.fillStyle = C.blue
    g.font = f(900, 76)
    g.fillText(v, cx, y + 150)
    g.fillStyle = C.muted
    g.font = f(500, 26)
    g.fillText(sub, cx, y + 194)
  })
  footer(g, exam)
  return c
}

function difficultyMapSlide(exam: Exam, page: number, total: number): HTMLCanvasElement {
  const [c, g] = ctx1080()
  header(g, '문항별 난이도 맵', page, total)
  const qs = exam.questions

  // 범례 (색 + 텍스트 병기)
  const legend: [Question['difficulty'], string][] = [
    ['하', '하 · 기본'],
    ['중', '중 · 표준'],
    ['상', '상 · 고난도'],
  ]
  let lx = 76
  legend.forEach(([d, t]) => {
    g.fillStyle = DIFF_COLOR[d]
    rr(g, lx, 176, 34, 34, 10)
    g.fill()
    g.fillStyle = C.sub
    g.font = f(700, 30)
    g.fillText(t, lx + 48, 204)
    lx += g.measureText(t).width + 128
  })

  // 문항 칩 그리드 (5열, 문항 수가 많으면 칩 높이를 줄여 캔버스 안에 수납)
  const cols = 5
  const gap = 16
  const cw = (W - 144 - gap * (cols - 1)) / cols
  const top = 256
  const rows = Math.ceil(qs.length / cols)
  const avail = 640 // 요약·푸터 공간을 남긴 그리드 최대 높이
  const ch = Math.min(120, Math.floor((avail - (rows - 1) * gap) / Math.max(rows, 1)))
  const showType = ch >= 88
  qs.forEach((q, i) => {
    const x = 72 + (i % cols) * (cw + gap)
    const y = top + Math.floor(i / cols) * (ch + gap)
    g.fillStyle = DIFF_COLOR[q.difficulty]
    rr(g, x, y, cw, ch, Math.min(18, ch / 4))
    g.fill()
    g.fillStyle = '#ffffff'
    g.font = f(900, showType ? 44 : Math.max(26, ch * 0.5))
    g.textAlign = 'center'
    g.fillText(q.number, x + cw / 2, showType ? y + 62 : y + ch / 2 + (showType ? 0 : 12))
    if (showType) {
      g.font = f(700, 24)
      g.fillStyle = 'rgba(255,255,255,0.9)'
      const tt = q.type.length > 7 ? q.type.slice(0, 7) + '…' : q.type
      g.fillText(tt, x + cw / 2, y + 98)
    }
    g.textAlign = 'left'
  })

  // 고난도 문항 요약
  const hard = qs.filter((q) => q.difficulty === '상')
  const sy = Math.min(top + rows * (ch + gap) + 24, W - 250)
  if (hard.length > 0) {
    g.fillStyle = C.ink
    g.font = f(800, 32)
    g.fillText(`⚠ 고난도 문항 ${hard.length}개: ${hard.map((q) => q.number + '번').join(', ')}`, 72, sy + 40)
    const typeSet = [...new Set(hard.map((q) => q.type))]
    g.fillStyle = C.sub
    g.font = f(600, 28)
    g.fillText(`${typeSet.join(' · ')} 유형에 집중`, 72, sy + 86)
  }
  footer(g, exam)
  return c
}

function typeSlide(exam: Exam, page: number, total: number): HTMLCanvasElement {
  const [c, g] = ctx1080()
  header(g, '유형별 출제 분석 TOP 6', page, total)
  const rows = [...byType(exam.questions)].sort((a, b) => b.count - a.count).slice(0, 6)
  const totalQ = exam.questions.length || 1
  const max = Math.max(...rows.map((r) => r.count), 1)
  const top = 210
  const rh = 118
  rows.forEach((r, i) => {
    const y = top + i * rh
    g.fillStyle = C.ink
    g.font = f(800, 34)
    g.fillText(`${i + 1}. ${r.label}`, 72, y + 40)
    g.fillStyle = C.sub
    g.font = f(700, 30)
    g.textAlign = 'right'
    g.fillText(`${r.count}문항 · ${Math.round((r.count / totalQ) * 100)}%`, W - 72, y + 40)
    g.textAlign = 'left'
    g.fillStyle = C.sky
    rr(g, 72, y + 58, W - 144, 30, 15)
    g.fill()
    g.fillStyle = i === 0 ? C.yellow : C.blue
    rr(g, 72, y + 58, Math.max((W - 144) * (r.count / max), 40), 30, 15)
    g.fill()
  })
  footer(g, exam)
  return c
}

function sourceSlide(exam: Exam, page: number, total: number): HTMLCanvasElement {
  const [c, g] = ctx1080()
  header(g, '어디에서 출제됐나', page, total)
  const rows = bySource(exam.questions)
  const totalQ = exam.questions.length || 1
  const top = 220
  const rh = 128
  const max = Math.max(...rows.map((r) => r.count), 1)
  rows.forEach((r, i) => {
    const y = top + i * rh
    g.fillStyle = C.ink
    g.font = f(800, 36)
    g.fillText(r.label, 72, y + 42)
    g.fillStyle = C.sub
    g.font = f(700, 30)
    g.textAlign = 'right'
    g.fillText(`${r.count}문항 · ${Math.round((r.count / totalQ) * 100)}% · ${r.points}점`, W - 72, y + 42)
    g.textAlign = 'left'
    g.fillStyle = C.sky
    rr(g, 72, y + 62, W - 144, 34, 17)
    g.fill()
    g.fillStyle = r.label === '교과서' ? C.aqua : C.blue
    rr(g, 72, y + 62, Math.max((W - 144) * (r.count / max), 44), 34, 17)
    g.fill()
  })
  const s = examStats(exam.questions)
  const msg =
    s.externalRatio >= 0.4
      ? '교과서만 외워서는 부족했던 시험 — 부교재·모의고사 변형 대비가 필수'
      : '교과서 본문 장악이 곧 점수 — 본문 암기 + 문장 단위 어법 분석'
  g.fillStyle = C.navy
  rr(g, 72, 812, W - 144, 120, 20)
  g.fill()
  g.fillStyle = '#ffffff'
  g.font = f(700, 32)
  const lines = wrap(g, msg, W - 240)
  lines.forEach((l, i) => g.fillText(l, 112, 862 + i * 44))
  footer(g, exam)
  return c
}

function essaySlide(exam: Exam, page: number, total: number): HTMLCanvasElement {
  const [c, g] = ctx1080()
  header(g, '서술형 집중 분석', page, total)
  const essays = exam.questions.filter((q) => q.format === '서술형')
  const s = examStats(exam.questions)

  g.fillStyle = C.red
  g.font = f(900, 56)
  g.fillText(`${essays.length}문항 ${s.essayPoints}점`, 72, 240)
  g.fillStyle = C.sub
  g.font = f(700, 32)
  g.fillText(`전체 배점의 ${Math.round(s.essayPointsRatio * 100)}% — 여기서 등급이 갈립니다`, 72, 296)

  const top = 350
  const rh = 118
  essays.slice(0, 4).forEach((q, i) => {
    const y = top + i * rh
    card(g, 72, y, W - 144, 100)
    g.fillStyle = C.navy
    rr(g, 100, y + 26, 96, 48, 12)
    g.fill()
    g.fillStyle = '#ffffff'
    g.font = f(800, 28)
    g.textAlign = 'center'
    g.fillText(q.number, 148, y + 60)
    g.textAlign = 'left'
    g.fillStyle = C.ink
    g.font = f(800, 30)
    g.fillText(q.type, 224, y + 48)
    g.fillStyle = C.muted
    g.font = f(600, 26)
    g.fillText(q.note ? q.note.slice(0, 26) : `난이도 ${q.difficulty}`, 224, y + 84)
    g.fillStyle = C.red
    g.font = f(900, 34)
    g.textAlign = 'right'
    g.fillText(`${q.points}점`, W - 110, y + 62)
    g.textAlign = 'left'
  })
  if (essays.length > 4) {
    g.fillStyle = C.muted
    g.font = f(600, 28)
    g.fillText(`외 ${essays.length - 4}문항`, 72, top + 4 * rh + 40)
  }
  footer(g, exam)
  return c
}

function strategySlide(exam: Exam, page: number, total: number): HTMLCanvasElement {
  const [c, g] = ctx1080()
  header(g, '리딩브레인 대비 전략', page, total)
  const notes = strategyNotes(exam)
  let y = 210
  let shown = 0
  for (const n of notes) {
    g.font = f(600, 32)
    const lines = wrap(g, n, W - 260).slice(0, 3)
    const blockH = lines.length * 46 + 44
    if (y + blockH > 760) break // CTA 영역 침범 방지
    g.fillStyle = C.yellow
    rr(g, 72, y, 52, 52, 14)
    g.fill()
    g.fillStyle = C.navyDeep
    g.font = f(900, 30)
    g.textAlign = 'center'
    g.fillText(String(++shown), 98, y + 38)
    g.textAlign = 'left'
    g.fillStyle = C.ink
    g.font = f(600, 32)
    lines.forEach((l, li) => g.fillText(l, 152, y + 38 + li * 46))
    y += blockH
  }

  // CTA (문구가 길면 폭에 맞게 글자 크기 축소)
  g.fillStyle = C.navy
  rr(g, 72, 800, W - 144, 140, 24)
  g.fill()
  g.fillStyle = '#ffffff'
  const cta = `${exam.school} 내신, ${BRAND}이 함께합니다`
  let ctaSize = 40
  g.font = f(900, ctaSize)
  while (g.measureText(cta).width > W - 240 && ctaSize > 24) {
    ctaSize -= 2
    g.font = f(900, ctaSize)
  }
  g.textAlign = 'center'
  g.fillText(cta, W / 2, 860)
  g.font = f(600, 28)
  g.fillStyle = 'rgba(255,255,255,0.8)'
  g.fillText('다음 시험 대비 상담 · 프로필 링크 참고', W / 2, 908)
  g.textAlign = 'left'
  footer(g, exam)
  return c
}

/** 시험 하나를 카드뉴스 슬라이드 캔버스 배열로 렌더링 */
export function renderCardNews(exam: Exam): { title: string; canvas: HTMLCanvasElement }[] {
  const hasEssay = exam.questions.some((q) => q.format === '서술형')
  const builders: { title: string; build: (p: number, t: number) => HTMLCanvasElement }[] = [
    { title: '표지', build: () => coverSlide(exam) },
    { title: '시험 한눈에', build: (p, t) => overviewSlide(exam, p, t) },
    { title: '난이도 맵', build: (p, t) => difficultyMapSlide(exam, p, t) },
    { title: '유형 분석', build: (p, t) => typeSlide(exam, p, t) },
    { title: '출처 분석', build: (p, t) => sourceSlide(exam, p, t) },
    ...(hasEssay ? [{ title: '서술형 분석', build: (p: number, t: number) => essaySlide(exam, p, t) }] : []),
    { title: '대비 전략', build: (p, t) => strategySlide(exam, p, t) },
  ]
  const total = builders.length
  return builders.map((b, i) => ({ title: b.title, canvas: b.build(i + 1, total) }))
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = filename
  a.click()
}

export function cardFileName(exam: Exam, index: number): string {
  const safe = `${exam.school}_${exam.grade}_${exam.year}_${exam.kind}`.replace(/[\\/:*?"<>|\s]+/g, '_')
  return `${safe}_카드뉴스_${String(index + 1).padStart(2, '0')}.png`
}
