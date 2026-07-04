import { useState } from 'react'
import type { CountRow } from '../analysis'

// 수평 막대 차트 — 단일 계열(문항 수)이므로 한 가지 색상만 사용.
// 색상은 CSS 변수(role)로 지정해 라이트/다크가 한 곳에서 전환된다.

interface Tip {
  x: number
  y: number
  text: string
}

interface BarChartProps {
  rows: CountRow[]
  color?: string // CSS 변수명 (기본: 계열 1)
  unit?: string
  /** 하→상 등 순서형이면 행별 색을 지정 */
  rowColors?: string[]
  /** 반폭 카드용 — viewBox를 줄여 글자가 실제 크기로 보이게 함 */
  compact?: boolean
}

export function HBarChart({ rows, color = 'var(--series-1)', unit = '문항', rowColors, compact = false }: BarChartProps) {
  const [tip, setTip] = useState<Tip | null>(null)
  if (rows.length === 0) return <p className="empty-note">데이터가 없습니다.</p>

  const max = Math.max(...rows.map((r) => r.count))
  const total = rows.reduce((s, r) => s + r.count, 0)
  const labelW = compact ? 66 : 118
  const valueW = 100
  const rowH = 26
  const gap = 8
  const chartW = compact ? 380 : 560
  const barMax = chartW - labelW - valueW
  const height = rows.length * (rowH + gap) - gap

  return (
    <div className="chart-wrap" onMouseLeave={() => setTip(null)}>
      <svg
        viewBox={`0 0 ${chartW} ${height}`}
        width="100%"
        role="img"
        aria-label={rows.map((r) => `${r.label} ${r.count}${unit}`).join(', ')}
      >
        {rows.map((r, i) => {
          const y = i * (rowH + gap)
          const w = max > 0 ? Math.max((r.count / max) * barMax, 2) : 2
          const fill = rowColors ? rowColors[i] : color
          const pct = total ? Math.round((r.count / total) * 100) : 0
          return (
            <g
              key={r.label}
              onMouseMove={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                setTip({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  text: `${r.label} · ${r.count}${unit} (${pct}%) · ${r.points}점`,
                })
              }}
            >
              {/* 히트 타깃: 행 전체 */}
              <rect x={0} y={y} width={chartW} height={rowH} fill="transparent" />
              <text x={labelW - 10} y={y + rowH / 2} textAnchor="end" dominantBaseline="central" className="bar-label">
                {r.label}
              </text>
              <rect x={labelW} y={y + 4} width={w} height={rowH - 8} rx={4} fill={fill} />
              <text x={labelW + w + 8} y={y + rowH / 2} dominantBaseline="central" className="bar-value">
                {r.count}
                {unit} · {pct}%
              </text>
            </g>
          )
        })}
        {/* 기준선 */}
        <line x1={labelW} y1={0} x2={labelW} y2={height} stroke="var(--axis)" strokeWidth={1} />
      </svg>
      {tip && (
        <div className="tooltip" style={{ left: tip.x + 12, top: tip.y - 8 }}>
          {tip.text}
        </div>
      )}
    </div>
  )
}

interface Segment {
  label: string
  value: number
  color: string
}

/** 배점 구성 등 부분-전체 비교용 단일 스택 막대 (세그먼트 사이 2px 표면 간격) */
export function StackedBar({ segments, unit = '점' }: { segments: Segment[]; unit?: string }) {
  const [tip, setTip] = useState<Tip | null>(null)
  const total = segments.reduce((s, x) => s + x.value, 0)
  if (total === 0) return <p className="empty-note">데이터가 없습니다.</p>
  const W = 560
  const H = 34
  let x = 0
  return (
    <div className="chart-wrap" onMouseLeave={() => setTip(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={segments.map((s) => `${s.label} ${s.value}${unit}`).join(', ')}>
        {segments.map((s, i) => {
          const w = (s.value / total) * W
          const seg = (
            <rect
              key={s.label}
              x={x + (i > 0 ? 2 : 0)}
              y={4}
              width={Math.max(w - (i > 0 ? 2 : 0), 0)}
              height={H - 8}
              rx={4}
              fill={s.color}
              onMouseMove={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                setTip({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  text: `${s.label} · ${s.value}${unit} (${Math.round((s.value / total) * 100)}%)`,
                })
              }}
            />
          )
          x += w
          return seg
        })}
      </svg>
      <div className="legend">
        {segments.map((s) => (
          <span key={s.label} className="legend-item">
            <span className="legend-swatch" style={{ background: s.color }} />
            {s.label} {s.value}
            {unit} ({Math.round((s.value / total) * 100)}%)
          </span>
        ))}
      </div>
      {tip && (
        <div className="tooltip" style={{ left: tip.x + 12, top: tip.y - 8 }}>
          {tip.text}
        </div>
      )}
    </div>
  )
}

export interface TrendSeries {
  label: string
  color: string
  values: number[] // 시험 순서대로의 % 값
}

/** 시험 회차별 지표 추이 라인 차트 — 2px 선, 마커 + 2px 표면 링, 호버 크로스헤어 툴팁 */
export function TrendChart({ xLabels, xSubLabels, series }: { xLabels: string[]; xSubLabels?: string[]; series: TrendSeries[] }) {
  const [hi, setHi] = useState<number | null>(null)
  const n = xLabels.length
  if (n === 0) return <p className="empty-note">데이터가 없습니다.</p>

  const W = 560
  const H = 216
  const padL = 40
  const padR = 116 // 우측 직접 레이블 공간
  const padT = 12
  const padB = 40
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const yMax = Math.max(10, Math.ceil(Math.max(...series.flatMap((s) => s.values)) / 10) * 10)
  const x = (i: number) => (n === 1 ? padL + innerW / 2 : padL + (i * innerW) / (n - 1))
  const y = (v: number) => padT + innerH - (v / yMax) * innerH

  // 우측 직접 레이블: 마지막 값 기준, 겹치면 14px 간격으로 밀어냄
  const endLabels = series
    .map((s, si) => ({ si, label: s.label, color: s.color, ty: y(s.values[n - 1] ?? 0) }))
    .sort((a, b) => a.ty - b.ty)
  for (let i = 1; i < endLabels.length; i++) {
    if (endLabels[i].ty - endLabels[i - 1].ty < 14) endLabels[i].ty = endLabels[i - 1].ty + 14
  }

  return (
    <div className="chart-wrap" onMouseLeave={() => setHi(null)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={series.map((s) => `${s.label}: ${s.values.join(', ')}%`).join('; ')}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const px = ((e.clientX - rect.left) / rect.width) * W
          const i = n === 1 ? 0 : Math.round((px - padL) / (innerW / (n - 1)))
          setHi(Math.min(Math.max(i, 0), n - 1))
        }}
      >
        {/* 그리드 + y축 눈금 */}
        {[0, yMax / 2, yMax].map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={padL + innerW} y2={y(t)} stroke="var(--grid)" strokeWidth={1} />
            <text x={padL - 6} y={y(t)} textAnchor="end" dominantBaseline="central" className="tick-label">
              {t}%
            </text>
          </g>
        ))}
        {/* x축 레이블 (연도 / 시험) */}
        {xLabels.map((l, i) => (
          <text key={i} x={x(i)} y={padT + innerH + 14} textAnchor="middle" className="tick-label">
            <tspan x={x(i)}>{l}</tspan>
            {xSubLabels && (
              <tspan x={x(i)} dy={12}>
                {xSubLabels[i]}
              </tspan>
            )}
          </text>
        ))}
        {/* 크로스헤어 */}
        {hi !== null && <line x1={x(hi)} y1={padT} x2={x(hi)} y2={padT + innerH} stroke="var(--axis)" strokeWidth={1} />}
        {/* 계열: 2px 선 + 마커(2px 표면 링) */}
        {series.map((s) => (
          <g key={s.label}>
            {n > 1 && (
              <polyline
                points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
              />
            )}
            {s.values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={4} fill={s.color} stroke="var(--surface-1)" strokeWidth={2} />
            ))}
          </g>
        ))}
        {/* 우측 직접 레이블: 색 점 + 잉크 텍스트 */}
        {endLabels.map((l) => (
          <g key={l.label}>
            <circle cx={padL + innerW + 12} cy={l.ty} r={4} fill={l.color} />
            <text x={padL + innerW + 20} y={l.ty} dominantBaseline="central" className="bar-label">
              {l.label}
            </text>
          </g>
        ))}
      </svg>
      {hi !== null && (
        <div className="tooltip" style={{ left: `${(x(hi) / W) * 100}%`, top: 0 }}>
          {xLabels[hi]} {xSubLabels?.[hi]}
          {series.map((s) => (
            <div key={s.label}>
              {s.label} {s.values[hi]}%
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="stat-tile">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  )
}
